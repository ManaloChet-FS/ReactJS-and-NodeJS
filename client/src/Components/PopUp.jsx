import { DeleteForm, GameForm, StudioForm } from "./index";

export default function PopUp({ collection, popUpMode, selectedData }) {

  // If yearEstablished doesn't exist, it's a game
  const isGame = !selectedData.hasOwnProperty("yearEstablished");

  return (
    <>
      {popUpMode !== "" && (
        <div style={styles.div}>
          <section style={styles.section}>
            <h2 style={styles.h2}>{popUpMode}</h2>
            {popUpMode === "Create" && collection === "games" && <GameForm />}
            {popUpMode === "Update" && isGame && <GameForm />}
            {popUpMode === "Create" && collection === "studios" && <StudioForm />}
            {popUpMode === "Update" && !isGame && <StudioForm />}
            {popUpMode === "Delete" && <DeleteForm isGame={isGame} />}
          </section>
        </div>
      )}
    </>
  );
}

const styles = {
  div: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: "2",
  },
  section: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#f4f4f4",
    zIndex: "3",
    color: "#16161b",
    padding: "2rem",
    borderRadius: "5px"
  },
  h2: {
    marginBottom: "0.5rem"
  }
};
