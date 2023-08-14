import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import symptomsData from "../data/symptoms.json";
import Link from "next/link";
import Logo from "../public/logo.png";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [isAppearActive, setIsAppearActive] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [areDiseasesVisible, setAreDiseasesVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppearActive(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsButtonActive(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSymptomChange = (e) => {
    setSelectedSymptom(e.target.value);
  };

  useEffect(() => {
    if (isButtonActive) {
      const diseasesTimeout = setTimeout(() => {
        setAreDiseasesVisible(true);
      }, 200); 

      return () => {
        clearTimeout(diseasesTimeout);
      };
    }
  }, [isButtonActive]);

  const handlePost = async (disease) => {
    const current = new Date();
    const temp_month = current.getMonth();
    const temp_day = current.getDate();
    const temp_hour = current.getHours();
    const now = {
      temp_month,
      temp_day,
      temp_hour,
    };

    try {
      const userSession = await getSession();
      console.log(userSession);

      const userID = userSession.user.id;

      const commentData = {
        disease,
        now,
        userID,
      };

      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ commentData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Failed to save comment");
      }
    } catch (error) {
      console.error("Error fetching session: ", error);
    }
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
    if (!symptoms.includes(selectedSymptom)) {
      setSymptoms([...symptoms, selectedSymptom]);
    }
    console.log(symptoms);
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setDiseases([]);
  };

  return (
    <div className="parent-container">
      <div className={`appear ${isAppearActive ? "active" : ""}`}>
        <Image
          className="logo-image"
          src={Logo}
          width={300}
          height={150}
          alt="logo"
        />
        <h1 className="home-title">Medifind</h1>
      </div>
      <div className={`button-appear ${isButtonActive ? "active" : ""}`}>
        <select
          id="symptomDropdown"
          value={selectedSymptom}
          onChange={handleSymptomChange}
          className={styles.select}
        >
          <option value="">Select...</option>
          {symptomsData.symptoms.map((symptom, index) => (
            <option key={index} value={symptom.name}>
              {symptom.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddSymptom} className={styles.buttonstyles}>
          <AiOutlinePlus />
        </button>
        <button onClick={clearSymptoms} className={styles.buttonstyles}>
          <BsTrash3 />
        </button>
        <button onClick={handleAnalyze} className={styles.buttonstyles}>
          Analyze
        </button>

        <div className="symptoms-parent">
          <h1>Symptoms</h1>
          {symptoms.map((symptom, index) => (
            <>
              <div key={index} className="symptom-container">
                <h2 className="symptom-header">{symptom}</h2>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={`disease-grid ${!areDiseasesVisible ? "appear" : ""}`}>
        {diseases.map((disease, index) => (
          <div key={index} className={`disease-item ${areDiseasesVisible ? "appear":""}`}>
            <Link href={`/medications/${disease}`}>
              <h3>{disease}</h3>
            </Link>
            <button onClick={async () => await handlePost(disease)}>
              Add to history
            </button>
          </div>
        ))}
                  <p>Be sure to consult your physician</p>
      </div>
    </div>
  );
}
