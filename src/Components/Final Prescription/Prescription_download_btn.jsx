import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Prescription_download_btn.css";

function FinalPrescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData, refinedText } = location.state || {
    patientData: {},
    refinedText: "No text available",
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Medical Prescription", 10, 10);
    doc.setFont("helvetica", "normal");

    doc.text("Dr. John Doe", 10, 20);
    doc.text("Senior Physician", 10, 30);

    doc.text(`Patient Name: ${patientData.anonymize ? "Anonymous" : patientData.name}`, 120, 20);
    doc.text(`Age: ${patientData.anonymize ? "N/A" : patientData.age}`, 120, 30);
    doc.text(`Date of Birth: ${patientData.anonymize ? "N/A" : patientData.dob}`, 120, 40);
    doc.text(`Time of Visit: ${patientData.timeOfVisit}`, 120, 50);
    doc.text(`Date of Visit: ${patientData.dateOfVisit}`, 120, 60);

    doc.text("Prescription Summary:", 10, 80);
    doc.text(refinedText, 10, 90, { maxWidth: 180 });

    doc.save("Medical_Prescription.pdf");
  };

  return (
    <div className="prescription-container">
      <h1 className="prescription-title">Final Prescription Summary</h1>

      <div className="summary-box">
        <h2>Patient Details</h2>
        <p><strong>Name:</strong> {patientData.anonymize ? "Anonymous" : patientData.name}</p>
        <p><strong>Age:</strong> {patientData.anonymize ? "N/A" : patientData.age}</p>
        <p><strong>Date of Birth:</strong> {patientData.anonymize ? "N/A" : patientData.dob}</p>
        <p><strong>Time of Visit:</strong> {patientData.timeOfVisit}</p>
        <p><strong>Date of Visit:</strong> {patientData.dateOfVisit}</p>
      </div>

      <div className="summary-box">
        <h2>Prescription Summary</h2>
        <p>{refinedText}</p>
      </div>

      <button className="download-btn" onClick={downloadPDF}>Download PDF</button>

    </div>
  );
}

export default FinalPrescription;