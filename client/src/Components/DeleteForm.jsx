import { useContext, useState } from "react"
import API from "../API";
import { popUpContext } from "../App"


export default function DeleteForm({ isGame }) {
  const { selectedData, refresh, setRefresh, setPopUpMode } = useContext(popUpContext);

  async function handleSubmit(e) {
    e.preventDefault();

    let collection = "games";
    if (!isGame) {
      collection = "studios";
    }

    try {
      await API.deleteData(collection, selectedData._id);
      setRefresh(~refresh);
      setPopUpMode("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Are you sure you want to delete {selectedData.name}?</h4>
      <div>
        <button type="submit">Delete</button>
        <button onClick={() => setPopUpMode("")}>Cancel</button>
      </div>
    </form>
  )
}