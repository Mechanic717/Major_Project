import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./upload_btn.css";

function UploadBtn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setLoading(true);

      // Simulate file processing delay (e.g., API call)
      setTimeout(() => {
        navigate("/result");
      }, 2000);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Medical Transcription</h1>
      <p className="upload-subtext">Upload your medical recording for AI transcription.</p>

      <button className="upload-btn">
        {loading ? "Processing..." : "Upload & Transcribe"}
        <input type="file" accept=".mp3, .wav, .m4a, .mp4, .pdf, .docx" onChange={handleFileUpload} />
      </button>
    </div>
  );
}

export default UploadBtn;
