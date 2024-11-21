import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Dashboard from './component/Dashboard';
import SpeechToText from './callcenter/SpeechToText';
import Account from './component/Account';


function App() {
const [darkMode,setDarkMode]=useState(false)

useEffect(()=>{
let savedMode = localStorage.getItem("displayMode")
if(!savedMode){
  const newMode = "light"
  setDarkMode(false)
  localStorage.setItem("displayMode",savedMode)
}
setDarkMode(savedMode === 'dark' ? true :false)
},[])
  return (
    <>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<Account/>} />
          <Route path="/speech-to-text" element={<SpeechToText />} />
        </Routes>
      </Layout>
    </Router>
    </>
  );
}

export default App;