import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/medications.module.css";

export default function Page() {
  const router = useRouter();
  const { page } = router.query;
  const [scrapedData, setScrapedData] = useState([]);

  useEffect(() => {
    if (page) {
      fetchScrapedData(page);
    }
  }, [page]);

  const fetchScrapedData = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/${searchQuery}`
      );
      setScrapedData(response.data.scraped_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Medications for {page}</title>
      </Head>
      <div className={styles.container}>
        <h1 style={{ textAlign: "center" }}>Medications for {page}</h1>
        {scrapedData.map((item, index) => (
          <div className={styles.outer}>
            <div className={styles.inner}>
              <div key={index}>
                <h2>{item.name}</h2>
                <div className={styles.content}>
                  <div>
                    <p style={{margin:"10px 0px 10px 0px"}}>
                      <b>Price:</b> {item.price}
                    </p>
                    <p>
                      <b>URL: </b>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <u>{item.url}</u>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img src={item.image} alt={item.name} className={styles.img}/>
          </div>
        ))}
      </div>
    </>
  );
}
