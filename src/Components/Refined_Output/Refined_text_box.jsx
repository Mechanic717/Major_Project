import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Refined_text_box.css";

function RefinedTextBox({ transcribedText }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  useEffect(() => {
    // Ensure the transcribed text updates when received
    if (transcribedText) {
      setText(transcribedText);
    }
  }, [transcribedText]);

  return (
    <div className="result-container">
      <h1 className="result-title">Transcription Result</h1>
      <textarea className="result-textarea" value={text} readOnly />
      <button className="next-btn" onClick={() => navigate("/entities")}>Highlight Entities</button>
    </div>
  );
}

export default RefinedTextBox;
