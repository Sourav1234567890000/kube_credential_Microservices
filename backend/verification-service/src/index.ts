import express from "express";
import cors from "cors";
import credentialRoutes from "./routes/credentialRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(credentialRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
