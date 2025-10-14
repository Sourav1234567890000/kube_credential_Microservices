import React, { useState } from "react";
import "./App.css";
import IssuanceForm from "./components/IssuanceForm";
import VerificationForm from "./components/VerificationForm";
import DataVerified from "./components/DataVerified";


interface CredentialData {
  name: string;
  email: string;
  sex?: string;
  employeeID: string;
}

interface VerificationResult {
  status: string;
  message: string;
  worker?: string;
  issuedAt?: string;
  data?: CredentialData;
}


const ISSUANCE_API_URL =
  import.meta.env.REACT_APP_ISSUANCE_URL || "http://localhost:5001";
const VERIFICATION_API_URL =
  import.meta.env.REACT_APP_VERIFICATION_URL || "http://localhost:3001";

function App() {
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleFormData = async (
    event: React.FormEvent<HTMLFormElement>,
    endpoint: string,
    service: "issuance" | "verification"
  ) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      sex: { value: string };
      employeeID: { value: string };
    };

    const formData: CredentialData = {
      name: target.name.value,
      email: target.email.value,
      sex: target.sex.value,
      employeeID: target.employeeID.value,
    };

    target.name.value = "";
    target.email.value = "";
    target.sex.value = "";
    target.employeeID.value = "";

    const apiUrl =
      service === "issuance" ? ISSUANCE_API_URL : VERIFICATION_API_URL;

    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="App">
      <IssuanceForm
        handleFormData={handleFormData}
        endpoint="submit-details"
        service="issuance"
      />

      <VerificationForm
        handleFormData={handleFormData}
        endpoint="verify-credential"
        service="verification"
      />

      {result && <DataVerified result={result} />}
    </div>
  );
}

export default App;
