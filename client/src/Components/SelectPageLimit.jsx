export default function SelectPageLimit({ setPage, setLimit }) {
  function handleChange(e) {
    if (e.target.name === "page") {
      setPage(e.target.value);
    } else {
      setLimit(e.target.value);
    }
  }

  return (
    <section>
      <h2>Page & Limit</h2>
      <div style={styles.div}>
        <div>
          <label style={styles.label} htmlFor="page">Page:</label>
          <input style={styles.input} type="number" name="page" id="page" min="1" defaultValue={1} onChange={handleChange} />
        </div>
        <div>
          <label style={styles.label} htmlFor="limit">Limit: </label>
          <input style={styles.input} type="number" name="limit" id="limit" min="1" defaultValue={2} onChange={handleChange} />
        </div>
      </div>
    </section>
  );
}

const styles = {
  div: {
    display: "flex",
    padding: "0.5rem",
    gap: "0.8rem"
  },
  label: {
    display: "block",
    marginBottom: "4px"
  },
  input: {
    width: "85px",
    padding: "0.4rem",
  }
}