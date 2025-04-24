import express from "express";
import cors from "cors";
import discountRoute from "./routes/discount";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", discountRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
