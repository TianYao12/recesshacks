import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import symptomsData from "../data/symptoms.json";

export default function Home() {
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);

  const handleSymptomChange = (e) => {
    setSelectedSymptom(e.target.value);
  };

  const handleAnalyze = () => {
    const newHashMap = {};
    for (let i = 0; i < symptoms.length; i++) {
      const selectedSymptom = symptoms[i];
      const symptomData = symptomsData.symptoms.find(
        (symptom) => symptom.name === selectedSymptom
      );
      const diseases = symptomData.diseases;
      for (let j = 0; j < diseases.length; j++) {
        const disease = diseases[j];
        newHashMap[disease] = newHashMap[disease] ? newHashMap[disease] + 1 : 1;
      }
    }
  
    const sortedDiseases = Object.entries(newHashMap)
      .sort((a, b) => b[1] - a[1])
      .map(([disease, _]) => disease);
  
    for (const disease of sortedDiseases) {
      console.log(`${disease} has ${newHashMap[disease]} instances`);
      diseases.push(disease);
    }
    setDiseases(sortedDiseases.slice(0, 4));
  };

  const handleAddSymptom = () => {
    if (symptoms[symptoms.length - 1] !== selectedSymptom) {
      setSymptoms([...symptoms, selectedSymptom]);
    }
    console.log(symptoms);
  };

  const clearSymptoms = () => {
    setSymptoms([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Symptom Analyzer</h1>

      <label htmlFor="symptomDropdown">Select a Symptom:</label>
      <select
        id="symptomDropdown"
        value={selectedSymptom}
        onChange={handleSymptomChange}
      >
        <option value="">Select a symptom...</option>
        {symptomsData.symptoms.map((symptom, index) => (
          <option key={index} value={symptom.name}>
            {symptom.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddSymptom}>Add</button>
      <button onClick={handleAnalyze}>Analyze</button>
      <button onClick={clearSymptoms}>Clear</button>

      <div>
        {symptoms.map((symptom, index) => (
          <div key={index}>
            <h1>{symptom}</h1>
          </div>
        ))}
      </div>
      <div>
        {diseases.map((disease, index) => (
          <div key={index}>
            <h3>{disease}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
