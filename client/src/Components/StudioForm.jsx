import { useContext, useState } from "react";
import { popUpContext } from "../App";
import API from "../API";

export default function StudioForm() {
  const { popUpMode, setPopUpMode, selectedData, refresh, setRefresh } = useContext(popUpContext);
  const [name, setName] = useState(selectedData.name || "");
  const [yearEstablished, setYearEstablished] = useState(
    selectedData.yearEstablished || ""
  );
  const [country, setCountry] = useState(selectedData.country || "");
  const [status, setStatus] = useState(selectedData.status || "Active");
  const [result, setResult] = useState("");

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "yearEstablished":
        setYearEstablished(e.target.value);
        break;
      case "country":
        setCountry(e.target.value);
        break;
      default:
        setStatus(e.target.value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      studio: {
        name,
        yearEstablished,
        country,
        status,
      },
    };

    let request;
    try {
      if (popUpMode === "Create") {
        request = await API.postData("studios", data);
      } else {
        request = await API.updateData(
          "studios",
          selectedData._id,
          data.studio
        );
      }
      setResult(request.data.message);
      setRefresh(!refresh);
    } catch (error) {
      if (error.status === 422) {
        setResult("Check inputs and try again.");
      } else {
        setResult("Server error has occurred.");
        console.log(error);
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" onChange={handleChange} defaultValue={name} required />
      </div>
      <div>
        <label htmlFor="yearEstablished">Year established: </label>
        <input
          type="number"
          name="yearEstablished"
          id="yearEstablished"
          min="1500"
          max="2024"
          onChange={handleChange}
          defaultValue={yearEstablished}
          required
        />
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input type="text" name="country" id="country" onChange={handleChange} defaultValue={country} required />
      </div>
      <div>
        <h3>Status</h3>
        <input type="radio" name="status" id="Active" value="Active" onChange={handleChange} defaultChecked />
        <label htmlFor="Active">Active</label>
        <input type="radio" name="status" id="Merged" value="Merged" onChange={handleChange} />
        <label htmlFor="Merged">Merged</label>
        <input type="radio" name="status" id="Closed" value="Closed" onChange={handleChange} />
        <label htmlFor="Closed">Closed</label>
      </div>
      <div>
        <p>{result}</p>
        <button type="submit">{popUpMode === "Create" ? "Create" : "Update"} studio</button>
        <button type="reset" onClick={() => setPopUpMode("")}>Cancel</button>
      </div>
    </form>
  );
}
