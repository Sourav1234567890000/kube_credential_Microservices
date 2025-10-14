import React from "react";
import styles from "./VerificationForm.module.css";

interface VerificationFormProps {
  handleFormData: (
      event: React.FormEvent<HTMLFormElement>,
      endpoint: string,
      service: "issuance" | "verification"
    ) => void;
    endpoint: string;
    service: "issuance" | "verification";
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  handleFormData,
  endpoint,
  service,
}) => {
  return (
    <div className={styles.verificationFormContainer}>
      <h2>Verification Form</h2>
      <form onSubmit={(e) => handleFormData(e, endpoint, service)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="sex">Sex:</label>
        <select id="sex" name="sex" required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="employeeID">Employee ID:</label>
        <input type="text" id="employeeID" name="employeeID" required />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerificationForm;
