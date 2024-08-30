export default function SelectInformation({
  collection,
  selection,
  setSelection,
}) {
  function handleChange(e) {
    if (e.target.checked === true) {
      setSelection([...selection, e.target.value]);
    } else {
      const newSelection = selection.filter(
        (select) => select != e.target.value
      );
      setSelection(newSelection);
    }
  }

  return (
    <section>
      <h2>Information</h2>
      <p>None selected = Returns all info</p>
      <div style={styles.div}>
        {collection === "games" ? (
          <>
          <div>
            <input
              type="checkbox"
              name="releaseDate"
              id="releaseDate"
              value="releaseDate"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="releaseDate">Release Date</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="genre"
              id="genre"
              value="genre"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="genre">Genre(s)</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="averageScore"
              id="averageScore"
              value="averageScore"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="averageScore">Average Score</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="studio"
              id="studio"
              value="studio"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="studio">Studio</label>
          </div>
          </>
        ) : (
          <>
          <div>
            <input
              type="checkbox"
              name="yearEstablished"
              id="yearEstablished"
              value="yearEstablished"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="yearEstablished">Year Established</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="country"
              id="country"
              value="country"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="country">Country</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="status"
              id="status"
              value="status"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="status">Status</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="games"
              id="gamesSelect"
              value="games"
              onChange={handleChange}
            />
            <label style={styles.label} htmlFor="gamesSelect">Games</label>
          </div>
          </>
        )}
      </div>
    </section>
  );
}

const styles = {
  div: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0.5rem"
  },
  label: {
    marginLeft: "4px",
  }
}