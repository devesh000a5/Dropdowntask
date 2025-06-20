const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
});


const AlphaSchema = new mongoose.Schema({
  alpha: String,
  numeric: [Number],
});
const NumericSchema = new mongoose.Schema({
  numeric: Number,
  roman: [String],
});

const AlphaModel = mongoose.model("Alpha", AlphaSchema);
const NumericModel = mongoose.model("Numeric", NumericSchema);

app.get("/alphas", async (req, res) => {
  const alphas = await AlphaModel.find();
  res.json(alphas);
});

app.get("/romans/:numeric", async (req, res) => {
  const data = await NumericModel.findOne({ numeric: req.params.numeric });
  res.json(data ? data.roman : []);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
