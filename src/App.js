import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [alphas, setAlphas] = useState([]);
  const [selectedAlpha, setSelectedAlpha] = useState("");
  const [numericOptions, setNumericOptions] = useState([]);
  const [selectedNumeric, setSelectedNumeric] = useState("");
  const [romanOptions, setRomanOptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/alphas").then((res) => {
      setAlphas(res.data);
    });
  }, []);

  const handleAlphaChange = (e) => {
    const selected = e.target.value;
    setSelectedAlpha(selected);
    const numericSet = alphas.find((a) => a.alpha === selected);
    setNumericOptions(numericSet ? numericSet.numeric : []);
    setRomanOptions([]);
    setSelectedNumeric("");
  };

  const handleNumericChange = (e) => {
    const selected = e.target.value;
    setSelectedNumeric(selected);
    axios
      .get(`http://localhost:5000/romans/${selected}`)
      .then((res) => setRomanOptions(res.data));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dropdown Selector</h2>

      <label>Alpha: </label>
      <select value={selectedAlpha} onChange={handleAlphaChange}>
        <option value="">Select Alpha</option>
        {alphas.map((a) => (
          <option key={a.alpha} value={a.alpha}>
            {a.alpha}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Numeric: </label>
      <select value={selectedNumeric} onChange={handleNumericChange}>
        <option value="">Select Numeric</option>
        {numericOptions.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Roman: </label>
      <select>
        <option value="">Select Roman</option>
        {romanOptions.map((r, i) => (
          <option key={i} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
