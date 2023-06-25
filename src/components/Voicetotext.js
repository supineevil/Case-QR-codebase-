import React from 'react'
import { Link } from "react-router-dom";
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition';import './vt.css'

export default function Voicetotext() {

  const { transcript,resetTranscript,listening,browserSupportsSpeechRecognition } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null
  }
  const copytext=()=>{
    navigator.clipboard.writeText(transcript).then(() => {
      alert('Content copied to clipboard');
      
    },() => {
      alert('Failed to copy');

    });
  }
  
  return (
  <>

    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/RichEditor">RICH EDITOR</Link></button>
    &nbsp;&nbsp;
    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/Hashgenerator">QR Generator</Link></button> 
    &nbsp;&nbsp;
    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/">CASE EDITOR</Link> </button>

    <div className="Voice-box">
      <p>Your Personal Speech to text Converter(This may not be compatible with all devices)</p>
      <p>Microphone:{listening?'ON':'OFF'}</p>
      <div className="voice-to-text" >
        <p>{transcript}</p>
      </div>
        <div className="button-box">
        <button className="btn btn-info mx-4 " onClick={copytext}> COPY</button>
        <button className='btn btn-info mx-4' onClick={SpeechRecognition.startListening}>speak</button>
        <button className='btn btn-info mx-4' onClick={SpeechRecognition.stopListening}>stop</button>
        <button className='btn btn-info mx-4' onClick={resetTranscript}>Reset</button>
      </div>
    </div>
  </>
  )
}
