import React from 'react';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import RichEditor from './components/RichEditor';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Hashgenerator from './components/Hashgenerator';
import Voicetotext from './components/Voicetotext';

function App() { 
  const [mode,setMode]=useState('light');
  const toggleMode=()=>{
    if(mode==='light') {
      setMode('dark');
      document.body.style.backgroundColor='grey';
    }
    else{
       setMode('light');
      document.body.style.backgroundColor='white';
    }
  }
  return (
    <>
    <BrowserRouter>
    <Navbar title="Case Changer & QR " mode={mode} toggleMode={toggleMode} />
    <div className="container my-5">
    <Routes> 
      <Route path="/" element={<Textform heading="ENTER THE TEXT YOU WANT TO CHANGE" mode={mode}/>}/>
      <Route path="/richeditor" element={<RichEditor id="editor" heading="YOUR PERSONAL RICH TEXT EDITOR " mode={mode}/>}/>
      <Route path="/hashgenerator" element={<Hashgenerator heading="YOUR PERSONAL QR CODE GENERATOR" mode={mode}/>}/>
      <Route path="/voicetotext" element={<Voicetotext heading="" mode={mode}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}
export default App;

