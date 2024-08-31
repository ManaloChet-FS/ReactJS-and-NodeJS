export default function Card({ data, setSelectedData, setPopUpMode }) {

  function handleUpdate() {
    setSelectedData(data);
    setPopUpMode("Update");
  }

  function handleDelete() {
    setSelectedData(data);
    setPopUpMode("Delete");
  }
  
  return (
    <div style={styles.card}>
      <h3>{data.name}</h3>
      <p>
        { data.releaseDate && `Release date: ${new Date(data.releaseDate).toLocaleDateString()}` }
        { data.yearEstablished && `Year established: ${data.yearEstablished}` }
      </p>
      <p>
        { data.genre && `Genre(s): ${data.genre.join(", ")}` }
        { data.country && `Country: ${data.country}` }
      </p>
      <p>
        { data.averageScore && `Average Score: ${data.averageScore}` }
        { data.status && `Status: ${data.status}` }
      </p>
      <p>
        { data.studio && `Studio: ${data.studio.name}` }
        { data.games && `Games:${data.games.map(game => " " + game.name)}` }
      </p>
      <div style={styles.buttonContainer}>
        <button style={styles.update} onClick={handleUpdate}>Update</button>
        <button style={styles.delete} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    lineHeight: "1.5",
    padding: "1.5rem",
    color: "#16161b",
    background: "#f4f4f4",
    borderRadius: "5px",
    width: "300px"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "1rem"
  },
  update: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#2563eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#f4f4f4"
  },
  delete: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#dc2626",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#f4f4f4"
  }
}