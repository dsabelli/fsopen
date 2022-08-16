import cors from "cors";
import express from "express";
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 3001;

app.get("/api/ping", (_req: any, res: any) => {
  console.log("someone pinged here");
  res.json("pong");
});

app.get("/api/patients", (_req: any, res: any) => {
  console.log("someone is requesting patients here");
  res.json("patients");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
