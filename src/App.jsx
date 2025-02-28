import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import UploadButton from "./Components/Upload Button/UploadButton";
import RefinedTextBox from "./Components/Refined_Output/Refined_text_box";
import OutputTextBox from "./Components/Output Text Box/Output_text_box";
import PatientInfo from "./Components/Patient Info/Patient_info";
import FinalPrescription from "./Components/Final Prescription/Prescription_download_btn";
import "./Navbar.css";

function Navbar({ visitedPages }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { path: "/", label: "Upload" },
    { path: "/result", label: "Refined Output" },
    { path: "/entities", label: "Output" },
    { path: "/patient-info", label: "Patient Info" },
    { path: "/final-prescription", label: "Final Prescription" },
  ];

  return (
    <nav className="navbar">
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => {
              if (visitedPages.includes(page.path)) navigate(page.path);
            }}
            className={`nav-button ${location.pathname === page.path ? "active" : ""} ${
              visitedPages.includes(page.path) ? "" : "disabled"
            }`}
            disabled={!visitedPages.includes(page.path)}
          >
            {page.label}
          </button>
          {index < pages.length - 1 && <span className="arrow"> → </span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

function App() {
  const [visitedPages, setVisitedPages] = useState(["/"]);

  return (
    <Router>
      <AppContent visitedPages={visitedPages} setVisitedPages={setVisitedPages} />
    </Router>
  );
}

function AppContent({ visitedPages, setVisitedPages }) {
  const location = useLocation();

  useEffect(() => {
    if (!visitedPages.includes(location.pathname)) {
      setVisitedPages((prev) => [...prev, location.pathname]);
    }
  }, [location.pathname, visitedPages, setVisitedPages]);

  return (
    <>
      <Navbar visitedPages={visitedPages} />
      <Routes>
        <Route path="/" element={<UploadButton />} />
        <Route path="/result" element={<RefinedTextBox />} />
        <Route path="/entities" element={<OutputTextBox />} />
        <Route path="/patient-info" element={<PatientInfo />} />
        <Route path="/final-prescription" element={<FinalPrescription />} />
      </Routes>
    </>
  );
}

export default App;
