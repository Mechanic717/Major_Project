import React, { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";

function App() {
  const [transcribedText, setTranscribedText] = useState("");
  const [prescriptionText, setPrescriptionText] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTranscribedText(`Transcribed text from the file: ${file.name}`);
      setPrescriptionText("Concise prescription based on transcription...");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Prescription:", 10, 10);
    doc.text(prescriptionText, 10, 20);
    doc.save("prescription.pdf");
  };

  return (
    <div className="container">
      <h1>Medical Transcription</h1>

      {/* Centered Upload Button */}
      <div className="button-container">
        <button className="upload-btn">
          Upload & Transcribe
          <input type="file" onChange={handleFileUpload} accept=".txt, .doc, .docx, .pdf" />
        </button>
      </div>

      <div className="content">
        <div className="text-container">
          {/* Transcribed Text Section */}
          <div className="text-section">
            <textarea className="text-box" placeholder="Full Transcription" value={transcribedText} readOnly></textarea>
            <button className="convert-btn">Convert</button>
          </div>

          {/* Prescription Section */}
          <div className="text-section">
            <textarea className="text-box" placeholder="Concise Prescription" value={prescriptionText} readOnly></textarea>
            <button className="convert-btn" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
