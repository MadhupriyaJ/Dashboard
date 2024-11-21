import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

const DownloadComponent = ({ fileName = 'download', headers = [], data = [] }) => {
  
  const handleDownload = () => {
    const doc = new jsPDF();

    // Create table structure with dynamic headers and data
    doc.autoTable({
      head: [headers],
      body: data,
    });

    // Save the PDF with the provided filename
    doc.save(`${fileName}.pdf`);
  };

  return (
    <button 
      onClick={handleDownload} 
      className=" text-white  rounded animate-bounce">
        <FontAwesomeIcon icon={faCircleArrowDown} size='3x' color='blue' />
      {/* Download PDF */}
    </button>
  );
};

export default DownloadComponent;
