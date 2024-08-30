import { useContext, useEffect, useState } from "react";
import { popUpContext } from "../App";
import API from "../API";

export default function GameForm() {
  const { popUpMode, setPopUpMode, selectedData, refresh, setRefresh } = useContext(popUpContext);
  const [name, setName] = useState(selectedData.name || "");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState(selectedData.genre || []);
  const [averageScore, setAverageScore] = useState(selectedData.averageScore || 5);
  const [studio, setStudio] = useState(selectedData.studio || "");
  const [studios, setStudios] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    async function getStudios() {
      const response = await API.fetchData("studios?limit=50");
      setStudios(response.data.data);
    }
    getStudios();

    if (genre.length > 0) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(box => {
        const checked = genre.includes(box.value);
        box.checked = checked;
      })
    }
  }, [])

  function handleChange(e) {
    switch(e.target.name) {
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
          const newGenre = genre.filter(g => g !== e.target.value);
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
          studio
        }
      }
      
      let request;
      try {
          if (popUpMode === "Create") {
            request = await API.postData("games", data);
          } else {
            request = await API.updateData("games", selectedData._id, data.game);
          }
          setResult(request.data.message);
          e.target.reset();
          setRefresh(!refresh);
        } catch (error) {
          if (error.status === 422) {
            setResult("Check inputs and try again.");
          } else {
            setResult("Server error has occurred.")
            console.log(error);
          }
        }
      } else {
        setResult("Genre(s) cannot be empty.")
      }
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" defaultValue={name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="releaseDate">Release date: </label>
        <input type="date" name="releaseDate" id="releaseDate" defaultValue={releaseDate} onChange={handleChange} required />
      </div>
      <div>
        <h3>Genre(s)</h3>
        <input type="checkbox" name="Shooter" id="Shooter" value="Shooter" onChange={handleChange} />
        <label htmlFor="Shooter">Shooter</label>
        <input
          type="checkbox"
          name="Platformer"
          id="Platformer"
          value="Platformer"
          onChange={handleChange}
        />
        <label htmlFor="Platformer">Platformer</label>
        <input type="checkbox" name="Racing" id="Racing" value="Racing" onChange={handleChange} />
        <label htmlFor="Racing">Racing</label>
        <input type="checkbox" name="RPG" id="RPG" value="RPG" onChange={handleChange} />
        <label htmlFor="RPG">RPG</label>
        <input type="checkbox" name="Sport" id="Sport" value="Sport" onChange={handleChange} />
        <label htmlFor="Sport">Sport</label>
        <input type="checkbox" name="MMO" id="MMO" value="MMO" onChange={handleChange} />
        <label htmlFor="MMO">MMO</label>
        <input type="checkbox" name="Stealth" id="Stealth" value="Stealth" onChange={handleChange} />
        <label htmlFor="Stealth">Stealth</label>
        <input
          type="checkbox"
          name="Adventure"
          id="Adventure"
          value="Adventure"
          onChange={handleChange}
        />
        <label htmlFor="Adventure">Adventure</label>
        <input type="checkbox" name="Horror" id="Horror" value="Horror" onChange={handleChange} />
        <label htmlFor="Horror">Horror</label>
      </div>
      <div>
        <label htmlFor="averageScore">Average score: </label>
        <input
          type="number"
          name="averageScore"
          id="averageScore"
          min="0"
          max="10"
          defaultValue={averageScore}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="studio">Studio: </label>
        { studios.length > 0 && (<select name="studio" id="studio" onChange={handleChange} defaultValue={studio._id || ""} required>
          <option value=""></option>
          {studios.map(s => <option key={s._id} value={s._id}>{s.name}</option>) }
        </select>
        )}
      </div>
      <div>
        <span>{result}</span>
        <button type="submit">{ popUpMode === "Create" ? "Create" : "Update" } game</button>
        <button type="reset" onClick={() => setPopUpMode("")}>Cancel</button>
      </div>
    </form>
  );
}
