import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichEditor(props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [warning,setWarning] = useState(' This site is under construction ^_^ , Please stay tuned for future updates!')
  setTimeout(function () {
    setWarning("Thanks for Visiting ! You can still use the basic functionalities")
  },3000)

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  return (
    <>
      <div
        className={`container text-${
          props.mode === "light" ? "black" : "white"
        }`}
      >
        <button className="btn btn-info my-4">
          <Link className="navbar-brand  " to="/">
            CASE EDITOR
          </Link>
        </button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-info my-4">
          <Link className="navbar-brand  " to="/Hashgenerator">
            QR Generator
          </Link>
        </button>
        <h2>
          <b> {props.heading} </b>
        </h2>
        <div className="alert alert-warning" role="alert">
         {warning}
        </div>
        <div className="App">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{ options: ["inline", "history"] }}
            hashtag={{
              separator: " ",
              trigger: "#",
            }}
            mention={{
              separator: " ",
              trigger: "@",
              suggestions: [
                { text: "JavaScript", value: "javascript", url: "js" },
                { text: "React", value: "react", url: "js" },
              ],
            }}
          />
        </div>
        <div className="container my-4">
          <h2> YOUR TEXT PREVIEW</h2>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(convertedContent)}
          ></div>
          {/* <button className="btn btn-primary" onClick={handleprint}>print</button> */}
        </div>
      </div>
    </>
  );
}
