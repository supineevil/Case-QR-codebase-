import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import logo from './undo-arrow.png';
import jsPDF from 'jspdf';

export default function Textform(props) {
    
    const [array,setArray]=useState([]);
    const [text,setText]=useState("");
    const handleupper=()=>{
        setArray(oldarr=>[...oldarr,text]);
        console.log(text,array);
        let ans=text.toUpperCase();
        setText(ans)
    }
    const handlelower=()=>{  
        setArray(oldarr=>[...oldarr,text]);
        console.log(text,array); 
        let ans=text.toLowerCase();
        setText(ans)
    }
    const handletitle=()=>{
        setArray(oldarr=>[...oldarr,text]);
        let str = text.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        setText(str.join(' '));
    }
    const handlesentence=()=>{ 
            setArray(oldarr=>[...oldarr,text]);    
            let str=text;
            if (str.length === 0) return str; 
            let arr=str.toLowerCase().split(".")
            arr.forEach((word, index) => {
                const firstLetter = word.charAt(0).toUpperCase();
                const rest = word.slice(1).toLowerCase();
                arr[index] = firstLetter + rest;
            }); 
            setText( arr.join("."));   
    }
    
    const handlecamel=()=>{
        let str=text;
        setArray(oldarr=>[...oldarr,text]);
        if (str.length === 0) return str; 
        const words = str.split(/[ _-]+/); 
        const firstWord = words[0].toLowerCase();
        const remainingWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()); 
        const camelCaseWords = [firstWord, ...remainingWords]; 
        setText(camelCaseWords.join("")); 
    }
    const handlepascal=()=>{
        let str=text;
        setArray(oldarr=>[...oldarr,text]);
        if (str.length === 0) return str; 
        const words = str.split(/[ _-]+/); 
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        setText(capitalizedWords.join("")); 
    }
    const handlespace=()=>{ 
        setArray(oldarr=>[...oldarr,text]);
        let newtext=text.split(/[ ]+/);
        setText(newtext.join(" "));
    }
    const handleclear=() => {
        setArray(oldarr=>[...oldarr,text]);   
        setText("");
    }

    const handlesort=() =>{
        setArray(oldarr=>[...oldarr,text]);
        if(text.split(" ").length===1){
            let t=text;
            setText(t.split("").sort().join(""));
            return;
        }
        let temp=text;
        let ans=temp.split(" ");
        ans.sort();
        setText(ans.join(" "));
    }
    const handlecopy=() => {
        let copyText=document.getElementById("mybox");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            alert('Copying text ' + msg);
          } catch (err) {
            alert('Oops, unable to copy');
          }
    }

    const handledoc=()=>{
        //var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
          //  "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            //"xmlns='http://www.w3.org/TR/REC-html40'>"+
           // "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
      // var footer = "</body></html>";
       var sourceHTML = document.getElementById("mybox").innerHTML;
       var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
       var fileDownload = document.createElement("a");
       document.body.appendChild(fileDownload);
       fileDownload.href = source;
       fileDownload.download = 'document.doc';
       fileDownload.click();
       document.body.removeChild(fileDownload);
    }
    
    const handlepdf=()=>{
       const content=document.getElementById("mybox").innerHTML;
       console.log(content);
       const doc = new jsPDF();
        let pageHeight = doc.internal.pageSize.height;
        doc.text(content, 50, 50);
        const textLines = doc.splitTextToSize(content, doc.internal.pageSize.width - 20);
        if (pageHeight < doc.getTextDimensions(textLines).h + 20) {
        doc.addPage();
        }
        doc.text(textLines, 50, 50,50,50);
        doc.save('example.pdf');
    }
    const handleundo=()=>{
        if(array.length===0) setText("");
        else setText(array.pop());
    }   
    const changetext=(event)=>{
        setText(event.target.value);
    }
    
    return (
    <>
    <div className={`container text-${props.mode==='light'?'black':'white'}`}>
    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/RichEditor">RICH EDITOR</Link></button>
    &nbsp;&nbsp;
    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/Hashgenerator">QR Generator</Link></button> 
    &nbsp;&nbsp;
    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/Voicetotext">Voice-to-text</Link></button>  
      
        <h2><b> {props.heading} </b> 
        </h2>
        <div className="alert alert-warning" role="alert">
          The (.pdf) functionality is under construction ^_^ , Please stay tuned for future
          updates!
        </div>
         <div className="mb-3 my-3">
            <textarea className={`form-control text-${props.mode==='light'?'black':'white'}`} id="mybox" rows="10" value={text} style={{backgroundColor: props.mode==='light'? 'white':'black'}} placeholder="Enter your text here" onChange={changetext} >  
            </textarea>
        </div>
      
        <button className="btn btn-danger mx-1 my-2 bg-black " onClick={handleupper}>Upper case</button>
        <button className="btn btn-primary mx-1 my-2 bg-white text-black" onClick={handlelower}>Lower case</button>
        <button className="btn btn-danger mx-1 my-2 bg-black" onClick={handletitle}>Title case</button>
        <button className="btn btn-primary mx-1 my-2 bg-white text-black" onClick={handlesentence}>Sentence case</button>
        <button className="btn btn-danger mx-1 my-2 bg-black" onClick={handlecamel}>Camel case</button>
        <button className="btn btn-primary mx-1 my-2 bg-white text-black" onClick={handlepascal}>Pascal case</button>
        <button className="btn btn-danger mx-1 my-2 bg-black" onClick={handlespace}>Remove space</button>
        <button className="btn btn-primary mx-1 my-2 bg-white text-black" onClick={handlesort}> Sort String</button>
        <button className="btn btn-danger mx-1 my-2 bg-black " onClick={handleclear}>Clear</button>
        <button className="btn mx-2 my-2 btn-circle" onClick={handleundo} ><img src={logo} alt="undo"></img></button>  

    </div>
    <div className={`container text-${props.mode==='light'?'black':'white'} my-4`}>
            <h2> YOUR STRING SUMMARY</h2>
            <p>{text.split(/\s+/).filter((ele)=>{return ele.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").filter((ele)=>{return ele.length!==0}).length} Minutes read</p> 
            <h2>YOUR TEXT PREVIEW</h2>
            <p>{text.length>0?text.length>500?text.slice(0,500)+`.....(more)`:text:"---- ENTER TEXT TO PREVIEW ----"}</p>
            <button className = "btn btn-warning mx-2 my-2 " onClick={handlecopy} >COPY TEXT</button>
            <button className = "btn mx-2 my-2 btn-success" onClick={handledoc} >GET (.doc)</button>
            <button className = "btn mx-2 my-2 btn-danger" onClick={handlepdf} >GET (.pdf)</button>
    </div>
    </>
  )
}