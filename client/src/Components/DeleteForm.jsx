import { useContext, useState } from "react"
import API from "../API";
import { popUpContext } from "../App"


export default function DeleteForm({ isGame }) {
  const { selectedData, setSelectedData, refresh, setRefresh, setPopUpMode } = useContext(popUpContext);

  async function handleSubmit(e) {
    e.preventDefault();

    let collection = "games";
    if (!isGame) {
      collection = "studios";
    }

    try {
      await API.deleteData(collection, selectedData._id);
      setRefresh(~refresh);
      setSelectedData({});
      setPopUpMode("");
    } catch (err) {
      console.log(err);
    }
  }

  function handleCancel() {
    setSelectedData({});
    setPopUpMode("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4 style={styles.h4}>Are you sure you want to delete {selectedData.name}?</h4>
      <div style={styles.buttonContainer}>
        <button style={styles.delete} type="submit">Delete</button>
        <button style={styles.cancel} onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginTop: "1rem"
  },
  delete: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#dc2626",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#f4f4f4",
    fontWeight: "bold"
  },
  cancel: {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    background: "#2563eb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#f4f4f4",
    fontWeight: "bold"
  },
}