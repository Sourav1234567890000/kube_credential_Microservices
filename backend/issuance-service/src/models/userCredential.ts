import fs from "fs";
import { getDataPath } from "../utils/pathUtils";

interface CredentialData {
  name: string;
  email: string;
  employeeID: string;
  worker: string;
  issuedAt: string;
}

const FILE_PATH = getDataPath("issuanceCredentials.json");

export default class UserCredential {
  name: string;
  email: string;
  employeeID: string;
  issuedAt: string;
  worker: string;

  constructor(
    name: string,
    email: string,
    employeeID: string,
    worker: string,
    issuedAt: string
  ) {
    this.name = name;
    this.email = email;
    this.employeeID = employeeID;
    this.worker = worker;
    this.issuedAt = issuedAt;
  }

  save(): { success: boolean; message: string } {
    let credentials: CredentialData[] = [];

    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, "utf-8");
      credentials = JSON.parse(data);
    }

    // Checking duplicates by email or employeeID
    const exists = credentials.find(
      (c) => c.email === this.email || c.employeeID === this.employeeID
    );

    if (exists) {
      return { success: false, message: "Credential already exists" };
    }

    credentials.push(this);

    fs.writeFileSync(FILE_PATH, JSON.stringify(credentials, null, 2));

    return { success: true, message: "Credential issued successfully" };
  }

  static check(employeeID: string, email: string): UserCredential | null {
    if (!fs.existsSync(FILE_PATH)) return null;

    const data = fs.readFileSync(FILE_PATH, "utf-8");
    const credentials: CredentialData[] = JSON.parse(data);

    const found = credentials.find(
      (c) => c.employeeID === employeeID && c.email === email
    );

    if (!found) return null;

    return new UserCredential(
      found.name,
      found.email,
      found.employeeID,
      found.worker,
      found.issuedAt
    );
  }
}
