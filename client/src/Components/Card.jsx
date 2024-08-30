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
      <div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
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
  }
}