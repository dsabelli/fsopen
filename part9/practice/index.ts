import express from "express";
import calculator from "./calculator";
const app = express();

app.get("/ping", (_req: any, res: any) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;
  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "..." });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
