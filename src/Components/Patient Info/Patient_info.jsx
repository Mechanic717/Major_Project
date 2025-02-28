import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Patient_info.css";

function PatientInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const refinedText = location.state?.refinedText || "No text available";

  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    dob: "",
    timeOfVisit: "",
    dateOfVisit: "",
    anonymize: false,
  });

  useEffect(() => {
    const now = new Date();
    setPatientData((prev) => ({
      ...prev,
      timeOfVisit: now.toLocaleTimeString(),
      dateOfVisit: now.toLocaleDateString(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    navigate("/final-prescription", { state: { patientData, refinedText } });
  };

  return (
    <div className="patient-container">
      <h1 className="title">Patient Information</h1>

      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleChange}
          disabled={patientData.anonymize}
          placeholder={patientData.anonymize ? "Anonymous" : "Enter patient's name"}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={patientData.age}
          onChange={handleChange}
          disabled={patientData.anonymize}
          placeholder={patientData.anonymize ? "Anonymous" : "Enter age"}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={patientData.dob}
          onChange={handleChange}
          disabled={patientData.anonymize}
          placeholder={patientData.anonymize ? "Anonymous" : ""}
        />

        <label>Time of Visit:</label>
        <input type="text" value={patientData.timeOfVisit} readOnly />

        <label>Date of Visit:</label>
        <input type="text" value={patientData.dateOfVisit} readOnly />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="anonymize"
            checked={patientData.anonymize}
            onChange={handleChange}
          />
          Make Data Anonymous
        </label>

        <button className="save-btn" onClick={handleSubmit}>
          Save & Generate Prescription
        </button>
      </div>
    </div>
  );
}

export default PatientInfo;
