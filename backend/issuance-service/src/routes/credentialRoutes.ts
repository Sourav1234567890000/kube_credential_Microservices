import express from "express";
import { getCredentials, postCredentials, checkCredential } from "../controller/credentialController";

const router = express.Router();

router.get("/", getCredentials);

router.post("/submit-details", postCredentials);

router.post("/check-credential", checkCredential);

export default router;
