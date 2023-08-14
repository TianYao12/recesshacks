import Head from "next/head";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrapedData, setScrapedData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${searchQuery}`);
        setScrapedData(response.data.scraped_data);
        console.log("done")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Medication Scraper</title>
      </Head>
      <h1>Medication Scraper</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter medication name"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {scrapedData.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <p>
              URL:{" "}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </p>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
