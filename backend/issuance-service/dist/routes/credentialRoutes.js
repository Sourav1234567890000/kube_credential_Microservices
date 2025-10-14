"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const credentialController_1 = require("../controller/credentialController");
const router = express_1.default.Router();
// GET form to issue credentials
router.get("/", credentialController_1.getCredentials);
// POST new credential
router.post("/submit-details", credentialController_1.postCredentials);
// POST endpoint for Verification service to check credential
router.post("/check-credential", credentialController_1.checkCredential);
exports.default = router;
//# sourceMappingURL=credentialRoutes.js.map