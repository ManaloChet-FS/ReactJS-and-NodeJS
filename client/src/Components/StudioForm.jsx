import { useContext, useState, useEffect } from "react";
import { popUpContext } from "../App";
import API from "../API";

export default function StudioForm() {
  const { popUpMode, setPopUpMode, selectedData, setSelectedData, refresh, setRefresh } = useContext(popUpContext);
  const [name, setName] = useState(selectedData.name || "");
  const [yearEstablished, setYearEstablished] = useState(
    selectedData.yearEstablished || ""
  );
  const [country, setCountry] = useState(selectedData.country || "");
  const [status, setStatus] = useState(selectedData.status || "Active");
  const [result, setResult] = useState("");

  useEffect(() => {
    const radioBtns = document.querySelectorAll('.studioRadio');
    radioBtns.forEach(radioBtn => {
      const selected = radioBtn.value === status;
      radioBtn.checked = selected;
    })
  })

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

  function handleCancel() {
    setSelectedData({});
    setPopUpMode("");
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div>
        <label style={styles.label} htmlFor="name">Name:</label>
        <input style={styles.input} type="text" name="name" id="name" onChange={handleChange} defaultValue={name} required />
      </div>
      <div>
        <label style={styles.label} htmlFor="yearEstablished">Year established: </label>
        <input
          style={styles.input}
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
        <label style={styles.label} htmlFor="country">Country:</label>
        <input style={styles.input} type="text" name="country" id="country" onChange={handleChange} defaultValue={country} required />
      </div>
      <div>
        <label style={styles.label}>Status:</label>
        <div style={styles.row}>
          <div>
            <input className="studioRadio" type="radio" name="status" id="Active" value="Active" onChange={handleChange} defaultChecked />
            <label style={styles.radioLabel} htmlFor="Active">Active</label>
          </div>
          <div>
            <input className="studioRadio" type="radio" name="status" id="Merged" value="Merged" onChange={handleChange} />
            <label style={styles.radioLabel} htmlFor="Merged">Merged</label>
          </div>
          <div>
            <input className="studioRadio" type="radio" name="status" id="Closed" value="Closed" onChange={handleChange} />
            <label style={styles.radioLabel} htmlFor="Closed">Closed</label>
          </div>
        </div>
      </div>
      <div>
        <p style={styles.result}>{result}</p>
        <button style={styles.submit} type="submit">{popUpMode === "Create" ? "Create" : "Update"} studio</button>
        <button style={styles.cancel} type="reset" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "250px"
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
    width: "100%"
  },
  row: {
    display: "flex",
    gap: "0.5rem"
  },
  radioLabel: {
    marginLeft: "4px"
  },
  submit: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#2563eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#f4f4f4"
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
    marginLeft: "8px"
  },
  result: {
    margin: "1rem 0"
  }
};
