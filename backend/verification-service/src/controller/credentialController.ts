import { Request, Response } from "express";

// // URL of Issuance Service
// const ISSUANCE_API_URL =
//   process.env.ISSUANCE_API_URL || "http://localhost:5001";

// GET endpoint to display verification form
export const getCredentials = (req: Request, res: Response) => {
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

// POST endpoint to verify credentials via Issuance service
export const verifyCredential = async (req: Request, res: Response) => {
  try {
    const { employeeID, email } = req.body;

    const ISSUANCE_API_URL = "http://issuance-service:5001";
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
    } else {
      return res.status(404).json({
        status: "error",
        message: "Credential not found",
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      status: "error",
      message: "Verification failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};
