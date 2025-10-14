"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCredential = exports.postCredentials = exports.getCredentials = void 0;
const userCredential_1 = __importDefault(require("../models/userCredential"));
const getCredentials = (req, res) => {
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
exports.getCredentials = getCredentials;
let workerCounter = 0; // global worker counter
// POST /issue - to issue a new credential
const postCredentials = (req, res) => {
    const { name, email, employeeID } = req.body;
    if (!name || !email || !employeeID) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields",
        });
    }
    // increment worker count for each new credential
    workerCounter++;
    const workerId = `worker-${workerCounter}`;
    const issuedAt = new Date().toISOString();
    // create new credential
    const credential = new userCredential_1.default(name, email, employeeID, workerId, new Date().toISOString());
    const result = credential.save();
    if (!result.success) {
        return res.status(409).json({
            status: "error",
            message: result.message,
            data: { name, email, employeeID },
        });
    }
    // success response
    res.status(200).json({
        status: "success",
        message: result.message,
        worker: workerId,
        issuedAt,
        data: { name, email, employeeID },
    });
};
exports.postCredentials = postCredentials;
// POST /check-credential - to verify credentials (used by Verification service)
const checkCredential = (req, res) => {
    const { employeeID, email } = req.body;
    if (!employeeID || !email) {
        return res.status(400).json({
            valid: false,
            message: "EmployeeID and Email are required",
        });
    }
    const found = userCredential_1.default.check(employeeID, email);
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
exports.checkCredential = checkCredential;
//# sourceMappingURL=credentialController.js.map