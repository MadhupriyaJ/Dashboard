import React, { useState } from 'react';
import { FaSpinner, FaCheck, FaPlay, FaPause, FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import logo from '../Assets/Call center image.png'
import DownloadComponent from '../ReusableComponents/DownloadComponent';
import Loader from '../ReusableComponents/Loader';


const BASE_URL = process.env.REACT_APP_API_URL;

const Text = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transcriptions, setTranscriptions] = useState({});
  const [processingStatus, setProcessingStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [emotionResults, setEmotionResults] = useState({});
  const [topicModel, setTopicModel] = useState({})
  const [viewMode, setViewMode] = useState('transcription'); // 'transcription' or 'sentiment'
  const [showLogo, setShowLogo] = useState(false);
  const [audioStatus, setAudioStatus] = useState({});

  const filesPerPage = 10;

  const handleFileChange = (e) => {
    setShowLogo(true);
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);

    // Initialize audio status for each file
    const initialAudioStatus = {};
    filesArray.forEach(file => {
      initialAudioStatus[file.name] = { isPlaying: false, audio: new Audio(URL.createObjectURL(file)) };
    });
    setAudioStatus(initialAudioStatus);
  };

  const togglePlayPause = (fileName) => {
    const audioData = audioStatus[fileName];

    if (audioData.isPlaying) {
      audioData.audio.pause();
    } else {
      audioData.audio.play();
    }

    setAudioStatus(prevStatus => ({
      ...prevStatus,
      [fileName]: { ...audioData, isPlaying: !audioData.isPlaying }
    }));
  };

  const handleFileUpload = async () => {
    setShowLogo(true); // Show the logo when processing starts
    setLoading(true);
    const results = {};
    const statusUpdates = {};
    const emotionResults = {};

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('audioFile', file);
      statusUpdates[file.name] = 'loading';
      setProcessingStatus({ ...statusUpdates });

      try {
        // Call /startRecognition
        const recognitionResponse = await fetch(`${BASE_URL}/startRecognition`, {
          method: 'POST',
          body: formData,
        });
        const recognitionResult = await recognitionResponse.json();

        if (recognitionResult.results && recognitionResult.results.length > 0) {
          const fileData = recognitionResult.results[0];
          results[fileData.fileName] = fileData;
          statusUpdates[fileData.fileName] = 'done';
        }

        // Call /predict for emotion detection
        const predictResponse = await fetch(`http://127.0.0.1:5000/predict`, {
          method: 'POST',
          body: formData,
        });
        const predictResult = await predictResponse.json();

        if (predictResult.emotion) {
          emotionResults[file.name] = {
            emotion: predictResult.emotion,
            confidence: predictResult.confidence,
          };
        }

      } catch (error) {
        console.error('Error processing file:', file.name, error);
        statusUpdates[file.name] = 'error';
      }

      // Update processing status and results after each file is processed
      setProcessingStatus({ ...statusUpdates });
      setTranscriptions(results);
      setEmotionResults(emotionResults);
    }
    // After processing all files, send transcriptions to /topic-modeling
    try {

      const topicModelingResponse = await fetch(`http://127.0.0.1:5000/topic-modeling`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ textDocuments: Object.values(results) }),
      });
      const topicModelingResult = await topicModelingResponse.json();
      console.log('Topic Modeling Result:', topicModelingResult);


      // Ensure the topics are correctly associated with each file
      const topicData = {};
      selectedFiles.forEach((file, index) => {
        const topics = topicModelingResult.results[index]?.topics || [];
        topicData[file.name] = topics;
      });

      setTopicModel(topicData); // Store the topics in the topicModel state
    } catch (error) {
      console.error('Error sending to topic modeling:', error);
    }

    setLoading(false);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, });
  };

  const handleOutputClick = () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');

    if (allProcessed) {
      setViewMode('transcription'); // Show transcriptions when Output button is clicked
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      alert('Processing not completed yet. Please wait until all files are processed.');
    }
  };

  const handleSentimentClick = () => {
    try {
      setViewMode('sentiment'); // Switch to sentiment view 
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      alert('sentiment data not available');
    }
  };

  const handleClickProununciation = () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
    if (allProcessed) {
      setViewMode('PronunciationAssessment')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      alert('Processing not completed yet.please wait untill all files are processed.')
    }
  }
  const handleClickPIIentity = () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
    if (allProcessed) {
      setViewMode('PII')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      alert('Processing not completed yet.please wait untill all files are processed.')
    }
  }
  const handleSummaryClick = async () => {
    setViewMode('summary'); // Set the view mode to 'summary' when the summary tab is clicked
    setLoading(true); // Show the spinner

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const summaries = {};
    console.log("Transcriptions before sending:", transcriptions);

    for (const file of selectedFiles) {
      const transcriptionText = transcriptions[file.name]?.transcription;

      if (!transcriptionText) {
        console.warn(`No transcription available for file: ${file.name}`);
        continue; // Skip this file if there's no transcription
      }

      try {
        console.log(`Sending transcription for file: ${file.name}`, transcriptionText);

        const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text_documents: [transcriptionText] }),
        });

        console.log(`Sending transcription for file: ${file.name}`, {
          textDocuments: [transcriptionText]
        });

        const result = await response.json();
        console.log(`Received summary for file: ${file.name}`, result);

        summaries[file.name] = {
          extractSummary: result.extract_summaries?.[0] || '[No extract summary available]',
          abstractSummary: result.abstract_summaries?.[0] || '[No abstract summary available]',
        };

      } catch (error) {
        console.error('Error generating summaries for file:', file.name, error);
      }
    }

    // Update transcriptions state to include the new summaries
    setTranscriptions(prevState => {
      const updatedTranscriptions = { ...prevState };
      for (const fileName in summaries) {
        updatedTranscriptions[fileName].extractSummary = summaries[fileName].extractSummary;
        updatedTranscriptions[fileName].abstractSummary = summaries[fileName].abstractSummary;
      }
      return updatedTranscriptions;
    });

    setLoading(false); // Hide the spinner after the process completes
  };

  const handleEmotionalToneClick = async () => {
    try {
      setViewMode('DetectEmotionalTone')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      alert('sentiment data not available');
    }

  }

  const handleClickTopicModel = async () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
    if (allProcessed) {
      setViewMode('topicModel');  // Set the viewMode to topicModel for display
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, });
      console.log('topic model:', topicModel);
    } else {
      alert('Processing not completed yet. Please wait until all files are processed.');
    }
  };


  // pagination
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = selectedFiles.slice(indexOfFirstFile, indexOfLastFile);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(selectedFiles.length / filesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Set up props for DownloadComponent based on viewMode
  const fileName = viewMode === 'sentiment' ? 'sentiment_analysis'
    : viewMode === 'PronunciationAssessment' ? 'pronunciation_assessment'
      : viewMode === 'summary' ? 'summarization'
        : viewMode === 'DetectEmotionalTone' ? 'emotion detection'
          : viewMode === "PII" ? 'topic'
            : viewMode === 'topicModel' ? 'topic_modeling_results'
              : 'transcriptions';
  const headers = viewMode === 'sentiment'
    ? ['File Name', 'Sentiment', 'Confidence Scores (Positive)', 'Confidence Scores (Neutral)', 'Confidence Scores (Negative)']
    : viewMode === 'PronunciationAssessment'
      ? ['File Name', 'Accuracy Score', 'Fluency Score', 'Comprehensibility Score', 'Prosody Score', 'Pronunciation Score']
      : viewMode === 'summary'
        ? ['File Name', 'Abstract Summary', 'Extract Summary']
        : viewMode === 'DetectEmotionalTone'
          ? ['fileName', 'emotion', 'confidence']
          : viewMode === "PII"
            ? ['fileName', 'Topics']
            : viewMode === 'topicModel' ? ['File Name', 'Topics']
              : ['File Name', 'Transcription'];


  const data = selectedFiles.map((file) => {
    if (viewMode === 'sentiment') {
      const sentimentData = transcriptions[file.name]?.sentiment || 'N/A';
      const confidenceScores = transcriptions[file.name]?.confidenceScores || {};
      return [
        file.name,
        sentimentData,
        confidenceScores.positive || 'N/A',
        confidenceScores.neutral || 'N/A',
        confidenceScores.negative || 'N/A'
      ];
    } else if (viewMode === 'PronunciationAssessment') {
      const assessment = transcriptions[file.name]?.pronunciationAssessment || {};
      return [
        file.name,
        assessment.accuracyScore || 'N/A',
        assessment.fluencyScore || 'N/A',
        assessment.compScore || 'N/A',
        assessment.prosodyScore || 'N/A',
        assessment.pronScore || 'N/A'
      ];
    } else if (viewMode === 'summary') {
      const abstractSummary = transcriptions[file.name]?.abstractSummary || '[No abstract summary available]';
      const extractSummary = transcriptions[file.name]?.extractSummary || '[No extract summary available]';
      return [
        file.name,
        abstractSummary,
        extractSummary,
      ];
    } else if (viewMode === 'DetectEmotionalTone') {
      const emotion = emotionResults[file.name]?.emotion || '[No emotion]'
      const confidence = emotionResults[file.name]?.confidence || '[No emotion]';
      return [
        file.name,
        emotion,
        confidence
      ]
    } else if (viewMode === "PII") {
      const topic = transcriptions[file.name]?.piiEntities || '[No Entities]'
      return [
        file.name,
        topic
      ]
    } else if (viewMode === 'topicModel') {
      const topics = topicModel[file.name] || '[No Topics]';
      return [file.name, Array.isArray(topics) ? topics.join(', ') : '[No Topics]'];
    } else {
      return [
        file.name,
        transcriptions[file.name]?.transcription || 'No transcription available'
      ];
    }
  });
  const handleButtonAction = (action) => {
    switch (action) {
      case 'process':
        handleFileUpload();
        break;
      case 'transcribe':
        handleOutputClick();
        break;
      case 'sentiment':
        handleSentimentClick();
        break;
      case 'pronunciation':
        handleClickProununciation();
        break;
      case 'summary':
        handleSummaryClick();
        break;
      case 'emotion':
        handleEmotionalToneClick();
        break;
      case 'pii':
        handleClickPIIentity();
        break;
      case 'topicModel':
        handleClickTopicModel();
        break;
      default:
        break;
    }
  };

  return (
    <div className='p-4 bg- dark:bg-gray-900 dark:text-slate-200'>
      {/* file selection and buttons */}
      <div className='flex justify-around items-center'>
        {/* select files */}
        <div className='mb-4'>
          <label htmlFor='file-input' className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:[background:linear-gradient(45deg,#9369c7,theme(colors.blue.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            Select Files
          </label>
          <input
            id="file-input"
            type="file"
            accept=".wav"
            multiple
            className='hidden'
            onChange={handleFileChange}
          />
          <span className='ml-2 text-gray-500'>{selectedFiles.length} file(s) selected</span>
        </div>
        {/* Dropdown button for smaller screens */}
        <div className='lg:hidden '>
          <label htmlFor='button-dropdown' className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'>
            Select Action
          </label>
          <select id='button-dropdown' className='bg-white text-black border border-gray-300 rounded px-4 py-2 mt-2 w-full'
            onChange={(e) => handleButtonAction(e.target.value)} >
            <option value='process'>Process</option>
            <option value='transcribe'>Transcribe</option>
            <option value='sentiment'>Sentiment</option>
            <option value='pronunciation'>Pronunciation</option>
            <option value='summary'>Summary</option>
            <option value='emotion'>Detect Emotional Tone</option>
            <option value='pii'>PII</option>
            <option value='topicModel'>Topic Modeling</option>
          </select>
        </div>
        {/* button */}
        <div className='hidden lg:flex  flex-wrap gap-4'>
          <button onClick={handleFileUpload} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
            Process
          </button>
          <button onClick={handleOutputClick} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Transcribe
          </button>
          <button onClick={handleSentimentClick} className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'>
            Sentiment
          </button>
          <button onClick={handleClickProununciation} className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600'>
            Pronunciation
          </button>
          <button onClick={handleSummaryClick} className='bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600'>
            Summary
          </button>
          <button onClick={handleEmotionalToneClick} className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'>
            Detect Emotional Tone
          </button>
          <button onClick={handleClickPIIentity} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            PII
          </button>
          <button onClick={handleClickTopicModel} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Topic Modeling
          </button>
        </div>
      </div>

      {/* grid table */}


      {/* Grid Section with responsive design */}
      <div
        className="flex flex-row gap-4 container relative"
        style={{
          backgroundImage: showLogo ? `url(${logo})` : "none",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "70vh", // Adjust height as needed
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={logo}
            alt="call center logo"
            className={`w-full h-full object-contain transition-opacity duration-500 ${showLogo ? "opacity-20" : "opacity-0"
              }`}
          />
        </div>

        {/* Adjust the grid based on screen size */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 mb-4 container shadow-2xl shadow-slate-500 min-h-[70vh] overflow-y-auto backdrop-blur-sm"
        >
          {selectedFiles.length === 0 && (
            // Call center logo image
            <div className="flex justify-center items-center h-full w-full ml-96 sm:ml-40 md:ml-56">
              <img
                className="max-w-[100%] max-h-[100%] object-contain opacity-50 transition-opacity duration-500 hover:opacity-100 contrast-100"
                src={logo}
                alt="call center logo"
              />
            </div>
          )}

          {currentFiles.map((file, index) => (
            <React.Fragment key={index}>
              <div className="border border-gray-300 px-4 py-4 mb-1 hover:bg-white hover:shadow-md transition transform hover:-translate-y-1 flex justify-between items-start flex-wrap">
                <div className="flex items-center w-full sm:w-auto">
                  <strong>
                    <span className="font-bold mr-2">{indexOfFirstFile + index + 1}.</span>
                    <span className="mr-4">{file.name}</span>
                  </strong>
                </div>

                {/* Processing Status Icons */}
                <div className="flex items-center justify-between w-60">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => togglePlayPause(file.name)}
                    className="text-blue-500 hover:text-blue-700 ml-2"
                  >
                    {audioStatus[file.name]?.isPlaying ? (
                      <FaPauseCircle size={25} />
                    ) : (
                      <FaPlayCircle size={25} />
                    )}
                  </button>
                  {processingStatus[file.name] === "loading" && (
                    <FaSpinner className="animate-spin text-gray-500 mr-2" />
                  )}
                  {processingStatus[file.name] === "done" && (
                    <FaCheck className="text-green-500 mr-2" />
                  )}
                  {processingStatus[file.name] === "error" && (
                    <span className="text-red-500">Error</span>
                  )}
                </div>
              </div>

              {/* View Modes: Transcription, Sentiment, etc. */}
              <div className="border border-gray-300 px-4 py-2 mb-1 hover:bg-white hover:shadow-md flex flex-col w-full">
                <strong className="w-full text-left">
                  {viewMode === "transcription" ? (
                    transcriptions[file.name]?.transcription || "[No transcription available yet]"
                  ) : viewMode === "sentiment" ? (
                    transcriptions[file.name]?.sentiment && transcriptions[file.name]?.confidenceScores ? (
                      <div className="h-full flex flex-col items-start justify-center">
                        <p>Sentiment: {transcriptions[file.name].sentiment}</p>
                        <br />
                        <p>
                          Confidence Scores: Positive -{" "}
                          {transcriptions[file.name].confidenceScores.positive}, Neutral -{" "}
                          {transcriptions[file.name].confidenceScores.neutral}, Negative -{" "}
                          {transcriptions[file.name].confidenceScores.negative}
                        </p>
                      </div>
                    ) : (
                      "[No sentiment data available yet]"
                    )
                  ) : viewMode === "PronunciationAssessment" ? (
                    transcriptions[file.name]?.pronunciationAssessment ? (
                      <div className="text-left flex flex-wrap gap-5 items-start w-full">
                        <p>
                          {" "}
                          <strong className="text-blue-600">accuracyScore </strong>{" "}
                          {transcriptions[file.name].pronunciationAssessment.accuracyScore}
                        </p>
                        <p>
                          {" "}
                          <strong className="text-blue-600">fluencyScore</strong>{" "}
                          {transcriptions[file.name].pronunciationAssessment.fluencyScore}
                        </p>
                        <p>
                          {" "}
                          <strong className="text-blue-600">compScore</strong>{" "}
                          {transcriptions[file.name].pronunciationAssessment.compScore}
                        </p>
                        <p>
                          {" "}
                          <strong className="text-blue-600">prosodyScore</strong>{" "}
                          {transcriptions[file.name].pronunciationAssessment.prosodyScore}
                        </p>
                        <p>
                          {" "}
                          <strong className="text-blue-600">pronScore </strong>{" "}
                          {transcriptions[file.name].pronunciationAssessment.pronScore}
                        </p>
                      </div>
                    ) : (
                      "[No pronunciation available yet]"
                    )
                  ) : viewMode === "summary" ? (
                    <div className="h-full flex flex-col items-start">
                      {loading ? (
                        // Display spinner while processing
                        <div className="flex justify-center items-center">
                          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                          <p className="ml-2">Summarizing, please wait...</p>
                        </div>
                      ) : (
                        // Show summaries once summarization is complete
                        <>
                          <p>
                            <strong>Abstract Summary:</strong>{" "}
                            {transcriptions[file.name]?.abstractSummary || "[No abstract summary available]"}
                          </p>
                          <p>
                            <strong>Extract Summary:</strong>{" "}
                            {transcriptions[file.name]?.extractSummary || "[No extract summary available]"}
                          </p>
                        </>
                      )}
                    </div>
                  ) : loading ? (
                    <Loader />
                  ) : viewMode === "DetectEmotionalTone" ? (
                    <div>
                      {emotionResults[file.name] ? (
                        <div className="flex flex-col items-start justify-center">
                          <p>
                            {" "}
                            <strong>Emotion:</strong> {emotionResults[file.name].emotion}
                          </p>
                          <p>
                            {" "}
                            <strong>Confidence:</strong> {emotionResults[file.name].confidence}
                          </p>
                        </div>
                      ) : (
                        <p>No emotion data available</p>
                      )}
                    </div>
                  ) : viewMode === "PII" ? (
                    <div className="flex flex-col justify-start items-start">
                      <p>
                        <strong className="">Topics:</strong>
                      </p>
                      {Array.isArray(transcriptions[file.name]?.piiEntities) ? (
                        transcriptions[file.name].piiEntities.map((entity, index) => (
                          <div className="flex justify-between items-center w-full" key={index}>
                            <p>text : {entity.text}</p>
                            <p>category : {entity.category}</p>
                          </div>
                        ))
                      ) : (
                        <p>No PII Data</p>
                      )}
                    </div>
                  ) : viewMode === 'topicModel' && (
                    <div className="border border-gray-300 px-4 py-2 mb-1 hover:bg-white hover:shadow-md flex flex-col w-full">
                      <strong className="w-full text-left">
                        <div>
                          <h2 className='flex justify-center'>Topic Modeling</h2>
                          <p className="font-semibold text-blue-600 flex items-center justify-center">Topics for {file.name}:</p>
                          <ul>
                            {Array.isArray(topicModel[file.name]) && topicModel[file.name].length > 0 ? (
                              topicModel[file.name].map((topic, topicIndex) => (
                                <li key={topicIndex} className="font-semibold text-chinese_black flex justify-center">{topic}</li>
                              ))
                            ) : (
                              <li className="text-gray-500">No topics available for this file.</li>
                            )}
                          </ul>
                        </div>
                      </strong>
                    </div>
                  )}
                  
                </strong>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <DownloadComponent fileName={fileName} headers={headers} data={data} />
      </div>

      {selectedFiles.length > filesPerPage && (
        <div className='flex justify-center mt-4'>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handleClick(number)}
              className={`px-4 py-2 mx-1 border border-gray-300 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Text;
