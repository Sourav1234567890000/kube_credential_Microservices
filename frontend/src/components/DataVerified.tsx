import React, { useState, useEffect } from "react";
import styles from "./DataVerified.module.css";

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

interface DataVerifiedProps {
  result: VerificationResult | null;
}

const DataVerified: React.FC<DataVerifiedProps> = ({ result }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (result) setVisible(true);
  }, [result]);

  if (!result || !visible) return null;

  const getStatusClass = () => {
    switch (result.status) {
      case "success":
        return styles.success;
      case "error":
      case "failed":
        return styles.error;
      default:
        return styles.neutral;
    }
  };

  return (
    <div className={`${styles.dataVerifiedContainer} ${getStatusClass()}`}>
      <h2>Result</h2>
      <p>
        <strong>Message:</strong> {result.message}
      </p>
      <p>
        <strong>Status:</strong> {result.status}
      </p>

      {result.worker && (
        <p>
          <strong>Worker:</strong> {result.worker}
        </p>
      )}

      {result.issuedAt && (
        <p>
          <strong>Issued At:</strong> {new Date(result.issuedAt).toLocaleString()}
        </p>
      )}

      {result.data && (
        <div className={styles.userData}>
          <h3>User Info</h3>
          <p>
            <strong>Name:</strong> {result.data.name}
          </p>
          <p>
            <strong>Email:</strong> {result.data.email}
          </p>
          {result.data.sex && (
            <p>
              <strong>Sex:</strong> {result.data.sex}
            </p>
          )}
          <p>
            <strong>Employee ID:</strong> {result.data.employeeID}
          </p>
        </div>
      )}

      <button
        className={styles.closeButton}
        onClick={() => setVisible(false)}
      >
        Close
      </button>
    </div>
  );
};

export default DataVerified;
