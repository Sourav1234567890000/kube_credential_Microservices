import express from "express";
import { getCredentials, verifyCredential } from "../controller/credentialController";

const router = express.Router();

router.get("/get-credentials", getCredentials);

router.post("/verify-credential", verifyCredential);

export default router;





