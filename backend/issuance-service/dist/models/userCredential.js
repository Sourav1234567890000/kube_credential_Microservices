"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const pathUtils_1 = require("../utils/pathUtils");
const FILE_PATH = (0, pathUtils_1.getDataPath)("issuanceCredentials.json");
class UserCredential {
    constructor(name, email, employeeID, worker, issuedAt) {
        this.name = name;
        this.email = email;
        this.employeeID = employeeID;
        this.worker = worker;
        this.issuedAt = issuedAt;
    }
    save() {
        let credentials = [];
        if (fs_1.default.existsSync(FILE_PATH)) {
            const data = fs_1.default.readFileSync(FILE_PATH, "utf-8");
            credentials = JSON.parse(data);
        }
        // Check duplicates by email or employeeID
        const exists = credentials.find((c) => c.email === this.email || c.employeeID === this.employeeID);
        if (exists) {
            return { success: false, message: "Credential already exists" };
        }
        credentials.push(this);
        fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(credentials, null, 2));
        return { success: true, message: "Credential issued successfully" };
    }
    static check(employeeID, email) {
        if (!fs_1.default.existsSync(FILE_PATH))
            return null;
        const data = fs_1.default.readFileSync(FILE_PATH, "utf-8");
        const credentials = JSON.parse(data);
        const found = credentials.find((c) => c.employeeID === employeeID || c.email === email);
        if (!found)
            return null;
        return new UserCredential(found.name, found.email, found.employeeID, found.worker, found.issuedAt);
    }
}
exports.default = UserCredential;
//# sourceMappingURL=userCredential.js.map