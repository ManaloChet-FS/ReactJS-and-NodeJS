export default function SelectCollection({ setCollection, setSelection }) {
  function handleChange(e) {
    setCollection(e.target.value);
    const selectBoxes = document.querySelectorAll('input[type="checkbox"]');
    selectBoxes.forEach((box) => (box.checked = false));
    setSelection([]);
  }

  return (
    <section>
      <h2>Collection</h2>
      <div style={styles.div}>
        <div>
          <input
            type="radio"
            name="collection"
            id="games"
            value="games"
            defaultChecked
            onChange={handleChange}
          />
          <label style={styles.label} htmlFor="games">Games</label>
        </div>
        <div>
          <input
            type="radio"
            name="collection"
            id="studios"
            value="studios"
            onChange={handleChange}
          />
          <label style={styles.label} htmlFor="studios">Studios</label>
        </div>
      </div>
    </section>
  );
}

const styles = {
  div: {
    display: "flex",
    gap: "0.8rem",
    padding: "0.5rem"
  },
  label: {
    marginLeft: "4px"
  }
}