import express from "express";
const app = express();
app.use(express.json());

const PORT = 3003;

app.get("/ping", (_req: any, res: any) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
