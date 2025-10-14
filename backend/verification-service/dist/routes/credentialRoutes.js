"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const credentialController_1 = require("../controller/credentialController");
const router = express_1.default.Router();
// GET endpoint to display verification form
router.get("/get-credentials", credentialController_1.getCredentials);
// POST endpoint to verify credentials by calling Issuance service
router.post("/verify-credential", credentialController_1.verifyCredential);
exports.default = router;
