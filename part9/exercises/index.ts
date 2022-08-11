import express from "express";
import "dotenv/config";
const app = express();

app.get("/hello", (_req: any, res: any) => {
  res.send("Hello Full Stack!");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}`);
});
