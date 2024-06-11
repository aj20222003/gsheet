import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=QlMyezgn_-zr_4p1kG28s0TZgTua7kw9pdnBs83n6CdDcNPhHltoREbuWUn8nkWPDPfJ8Xodr0CPWrNKQNhKhoWlln27P1Z1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCO9vjtPVsmDEzJqgXsXf6GJS5VFfmSbHWAE5OV9l3bnGYlZbVWzecxWXMzV5AS_7bQSmQus9qSgGACertGK-lk_u_yhI34Oe9z9Jw9Md8uu&lib=MFAQCMxUobzql8Kg0k1y7QhM4YcrHRl_e");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        console.log("Fetched data:", result); // Log the fetched data
        if (result.data && Array.isArray(result.data)) {
          setMenuItems(result.data);
        } else {
          throw new Error("Fetched data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Menu</h1>
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {menuItems.map(item => (
              <li key={item.item}>{item.item} - {item.price}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
