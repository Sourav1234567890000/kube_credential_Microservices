import express from "express";
import cors from "cors";

import credentialRoutes from "./routes/credentialRoutes";
import { errorHandler } from "./controller/error";

const app = express();

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.urlencoded());
app.use(credentialRoutes);
app.use(errorHandler);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
