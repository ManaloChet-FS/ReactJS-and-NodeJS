export default function SelectSort({ collection, selection, setSortMethod }) {
  function handleChange(e) {
    setSortMethod(e.target.value);
  }

  return (
    <section style={styles.section}>
      <h2>Sort</h2>
      <div style={styles.div}>
        <label style={styles.label} htmlFor="sortBy">Sort by:</label>
        <select style={styles.select} name="sortBy" id="sortBy" onChange={handleChange}>
          <option value="">None</option>
          {collection === "games" ? (
            <>
              {selection.includes("averageScore") && (
                <>
                  <option value="-averageScore">Highest score</option>
                  <option value="averageScore">Lowest score</option>
                </>
              )}
              {selection.includes("releaseDate") && (
                <>
                  <option value="-releaseDate">Recent Releases</option>
                  <option value="releaseDate">Oldest Releases</option>
                </>
              )}
            </>
          ) : (
            <>
              {selection.includes("yearEstablished") && (
                <>
                  <option value="-yearEstablished">Recently Established</option>
                  <option value="yearEstablished">Oldest Established</option>
                </>
              )}
            </>
          )}
        </select>
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%"
  },
  div: {
    padding: "0.5rem"
  },
  label: {
    display: "block",
    marginBottom: "4px"
  },
  select: {
    padding: "0.4rem",
    width: "100%"
  }
}
