import { useContext, useEffect, useState } from "react";
import { popUpContext } from "../App";
import API from "../API";

export default function GameForm() {
  const {
    popUpMode,
    setPopUpMode,
    selectedData,
    setSelectedData,
    refresh,
    setRefresh,
  } = useContext(popUpContext);
  const [name, setName] = useState(selectedData.name || "");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState(selectedData.genre || []);
  const [averageScore, setAverageScore] = useState(
    selectedData.averageScore || 5
  );
  const [studio, setStudio] = useState(selectedData.studio || "");
  const [studios, setStudios] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Getting studios to put on select input
    async function getStudios() {
      const response = await API.fetchData("studios?limit=50");
      setStudios(response.data.data);
    }
    getStudios();

    // Checks boxes that match game's genres
    if (genre.length > 0) {
      const checkboxes = document.querySelectorAll(".gameCheckbox");
      checkboxes.forEach((box) => {
        const checked = genre.includes(box.value);
        box.checked = checked;
      });
    }
  }, []);

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "releaseDate":
        setReleaseDate(new Date(e.target.value + "T04:00:00Z").toISOString());
        break;
      case "averageScore":
        setAverageScore(e.target.value);
        break;
      case "studio":
        setStudio(e.target.value);
        break;
      default:
        if (e.target.checked === true) {
          setGenre([...genre, e.target.value]);
        } else {
          const newGenre = genre.filter((g) => g !== e.target.value);
          setGenre(newGenre);
        }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (genre.length !== 0) {
      const data = {
        game: {
          name,
          releaseDate,
          genre,
          averageScore,
          studio,
        },
      };

      let request;
      try {
        if (popUpMode === "Create") {
          request = await API.postData("games", data);
        } else {
          request = await API.updateData("games", selectedData._id, data.game);
        }
        setResult(request.data.message);
        e.target.reset();
        setRefresh(~refresh);
      } catch (error) {
        if (error.status === 422) {
          setResult("Check inputs and try again.");
        } else {
          setResult("Server error has occurred.");
        }
      }
    } else {
      setResult("Genre(s) cannot be empty.");
    }
  }

  function handleCancel() {
    setSelectedData({});
    setPopUpMode("");
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.row}>
        <div>
          <label style={styles.label} htmlFor="name">
            Name:{" "}
          </label>
          <input
            style={styles.input}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="releaseDate">
            Release date:{" "}
          </label>
          <input
            style={styles.input}
            type="date"
            name="releaseDate"
            id="releaseDate"
            defaultValue={releaseDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label style={styles.label}>Genre(s)</label>
        <div style={styles.checkboxContainer}>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Shooter"
              id="Shooter"
              value="Shooter"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Shooter">
              Shooter
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Platformer"
              id="Platformer"
              value="Platformer"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Platformer">
              Platformer
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Racing"
              id="Racing"
              value="Racing"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Racing">
              Racing
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="RPG"
              id="RPG"
              value="RPG"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="RPG">
              RPG
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Sport"
              id="Sport"
              value="Sport"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Sport">
              Sport
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="MMO"
              id="MMO"
              value="MMO"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="MMO">
              MMO
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Stealth"
              id="Stealth"
              value="Stealth"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Stealth">
              Stealth
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Adventure"
              id="Adventure"
              value="Adventure"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Adventure">
              Adventure
            </label>
          </div>
          <div>
            <input
              className="gameCheckbox"
              type="checkbox"
              name="Horror"
              id="Horror"
              value="Horror"
              onChange={handleChange}
            />
            <label style={styles.checkboxLabel} htmlFor="Horror">
              Horror
            </label>
          </div>
        </div>
      </div>
      <div style={styles.row}>
        <div>
          <label style={styles.label} htmlFor="averageScore">
            Average score:{" "}
          </label>
          <input
            style={styles.input}
            type="number"
            name="averageScore"
            id="averageScore"
            min="0"
            max="10"
            step="0.1"
            value={averageScore}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="studio">
            Studio:{" "}
          </label>
          {studios.length > 0 && (
            <select
              style={styles.input}
              name="studio"
              id="studio"
              onChange={handleChange}
              defaultValue={studio._id || ""}
              required
            >
              <option value="">Select Studio</option>
              {studios.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div>
        <p style={styles.result}>{result}</p>
        <button style={styles.submit} type="submit">
          {popUpMode === "Create" ? "Create" : "Update"} game
        </button>
        <button style={styles.cancel} type="reset" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "450px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "4px",
  },
  input: {
    height: "2rem",
    padding: "0.5rem",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  checkboxContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.8rem",
  },
  checkboxLabel: {
    marginLeft: "4px",
  },
  submit: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#2563eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#f4f4f4",
  },
  cancel: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#dc2626",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#f4f4f4",
    marginLeft: "0.5rem",
  },
  result: {
    margin: "1rem 0",
  },
};
