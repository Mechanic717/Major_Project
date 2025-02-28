import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "./Output_text_box.css"; // Ensure correct CSS file path

const OutputTextBox = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("https://api.example.com/patient-data") // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Define table columns
  const columns = [
    { accessorKey: "disease", header: "Disease Detected" },
    { accessorKey: "medication", header: "Suggested Medication" },
    { accessorKey: "dosage", header: "Dosage" },
    { accessorKey: "suggestion", header: "Doctor's Suggestion" },
    { accessorKey: "patientName", header: "Patient Name" },
    { accessorKey: "age", header: "Age" },
  ];

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button className="next-btn" onClick={() => navigate("/patient-info")}>
          Add Patient Info
        </button>
      </div>
    </div>
  );
};

export default OutputTextBox;
