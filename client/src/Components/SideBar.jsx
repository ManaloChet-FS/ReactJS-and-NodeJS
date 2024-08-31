import { useState } from "react";
import { SelectCollection, SelectInformation, SelectSort, SelectPageLimit, SearchBar } from "./index";

function SideBar({ setQuery, collection, setCollection, setPopUpMode }) {
  const [selection, setSelection] = useState([]);
  const [sortMethod, setSortMethod] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  function handleSubmit(e) {
    e.preventDefault();
    let selectionString = "select=name";
    let sortString = "";
    let queryString = [];

    if (searchQuery !== "") {
      queryString.push(`name=${searchQuery}`);
    }

    if (selection.length !== 0) {
      selectionString += `,${selection.join(",")}`;
      queryString.push(selectionString);
    }

    if (sortMethod !== "") {
      sortString = `sort=${sortMethod}`;
      queryString.push(sortString);
    }

    queryString.push(`page=${page}`);
    queryString.push(`limit=${limit}`);

    queryString = queryString.join("&");

    setQuery(`${collection}?${queryString}`);
  }

  return (
    <section>
      <form onSubmit={handleSubmit} style={styles.form}>
        <SelectCollection setCollection={setCollection} setSelection={setSelection} />
        <SearchBar setSearchQuery={setSearchQuery} />
        <SelectInformation collection={collection} selection={selection} setSelection={setSelection} />
        <SelectSort collection={collection} selection={selection} setSortMethod={setSortMethod} />
        <SelectPageLimit setPage={setPage} setLimit={setLimit} />
        <button style={styles.button} type="submit">Submit</button>
        <div style={styles.createDiv}> 
          <p onClick={() => setPopUpMode("Create")} style={styles.createText}>Create {collection === "games" ? "Game" : "Studio"}</p>
        </div>
      </form>
    </section>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "0.8rem",
    padding: "2rem",
    background: "rgba(0,0,0,0.5)",
    width: "300px"
  },
  button: {
    display: "block",
    fontSize: "1.3rem",
    padding: "0.5rem 1.5rem",
    margin: "0.5rem auto 0 auto",
    cursor: "pointer"
  },
  createDiv: {
    textAlign: "center",
    marginTop: "0.5rem",
    width: "100%"
  },
  createText: {
    textDecoration: "underline",
    cursor: "pointer",
  }
}

export default SideBar;
