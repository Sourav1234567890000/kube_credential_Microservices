"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCredential = exports.getCredentials = void 0;
// // URL of Issuance Service
// const ISSUANCE_API_URL =
//   process.env.ISSUANCE_API_URL || "http://localhost:5001";
// GET endpoint to display verification form
const getCredentials = (req, res) => {
    res.send(`
    <form action="/verify-credential" method="POST">
      <label>Name:</label>
      <input type="text" name="name" required /><br/><br/>
      <label>Email:</label>
      <input type="email" name="email" required /><br/><br/>
      <label>Employee ID:</label>
      <input type="text" name="employeeID" required /><br/><br/>
      <button type="submit">Verify</button>
    </form>
  `);
};
exports.getCredentials = getCredentials;
// POST endpoint to verify credentials via Issuance service
const verifyCredential = async (req, res) => {
    try {
        const { employeeID, email } = req.body;
        const ISSUANCE_API_URL = "http://localhost:5001";
        const response = await fetch(`${ISSUANCE_API_URL}/check-credential`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeID, email }),
        });
        const data = await response.json();
        if (data.valid) {
            return res.json({
                status: "success",
                message: "Credential is valid",
                worker: data.worker,
                issuedAt: data.issuedAt,
                data: data.data,
            });
        }
        else {
            return res.status(404).json({
                status: "error",
                message: "Credential not found",
            });
        }
    }
    catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({
            status: "error",
            message: "Verification failed",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.verifyCredential = verifyCredential;
