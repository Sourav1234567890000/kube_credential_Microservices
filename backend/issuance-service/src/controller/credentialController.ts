import { Request, Response } from "express";
import UserCredential from "../models/userCredential";

export const getCredentials = (req: Request, res: Response) => {
  res.send(`
    <form action="/submit-details" method="POST">
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

let workerCounter = 0; // global worker counter

export const postCredentials = (req: Request, res: Response) => {
  const { name, email, employeeID } = req.body;

  if (!name || !email || !employeeID) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  workerCounter++;
  const workerId = `worker-${workerCounter}`;
  const issuedAt = new Date().toISOString();

  const credential = new UserCredential(
    name,
    email,
    employeeID,
    workerId,
    new Date().toISOString()
  );

  const result = credential.save();

  if (!result.success) {
    return res.status(409).json({
      status: "error",
      message: result.message,
      data: { name, email, employeeID },
    });
  }

  res.status(200).json({
    status: "success",
    message: result.message,
    worker: workerId,
    issuedAt,
    data: { name, email, employeeID },
  });
};

export const checkCredential = (req: Request, res: Response) => {
  const { employeeID, email } = req.body;

  if (!employeeID && !email) {
    return res.status(400).json({
      valid: false,
      message: "EmployeeID and Email are required",
    });
  }

  const found = UserCredential.check(employeeID, email);

  if (found) {
    return res.json({
      valid: true,
      worker: found.worker,
      issuedAt: found.issuedAt,
      data: {
        name: found.name,
        email: found.email,
        employeeID: found.employeeID,
      },
    });
  }

  res.json({
    valid: false,
    message: "Credential not found",
  });
};
