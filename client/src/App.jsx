import { useState, useEffect, createContext } from "react";
import API from "./API";
import { SideBar, Card, PopUp } from './Components';
import './App.css'

export const popUpContext = createContext();

function App() {
  const [query, setQuery] = useState("games");
  const [data, setData] = useState({});
  const [collection, setCollection] = useState("games");
  const [popUpMode, setPopUpMode] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await API.fetchData(query);
      setData(response.data.data);
    }
    getData();
  }, [query, refresh])

  return (
    <>
      <header style={styles.header}>
        <h1>Game & Studio DB</h1>
      </header>
      <main style={styles.main}>
        <SideBar setQuery={setQuery} collection={collection} setCollection={setCollection} setPopUpMode={setPopUpMode} />
        <section style={styles.wrapper}>
          {data.length > 0 ? data.map(entry => <Card key={entry._id} data={entry} setSelectedData={setSelectedData} setPopUpMode={setPopUpMode} />) : (<><h3 style={styles.noResults}>No results found</h3></>) }
        </section>
        <popUpContext.Provider value={{popUpMode, setPopUpMode, selectedData, refresh, setRefresh}}>
          <PopUp collection={collection} popUpMode={popUpMode} selectedData={selectedData} />
        </popUpContext.Provider>
      </main>
    </>
  )
}

const styles = {
  header: {
    padding: "2rem",
    fontSize: "1.2em"
  },
  main: {
    display: "flex",
    alignItems: "start",
    padding: "0 3rem"
  },
  wrapper: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "2rem",
    paddingLeft: "2rem"
  },
  noResults: {
    fontSize: "2rem",
  }
}

export default App
