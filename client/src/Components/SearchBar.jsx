export default function SearchBar({ setSearchQuery }) {
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <section style={styles.section}>
      <h2>Search</h2>
      <div style={styles.div}>
        <label style={styles.label} htmlFor="search">Search by name</label>
        <input
          style={styles.input}
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
        />
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%"
  },
  div: {
    padding: "0.5rem",
  },
  label: {
    display: "block",
    marginBottom: "4px",
  },
  input: {
    padding: "0.4rem",
    width: "100%"
  },
};
