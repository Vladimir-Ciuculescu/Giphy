import React, { useState } from "react";
import HomePage from "./components/HomePage";

export const AppContext = React.createContext();

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [idItemToDelete, setIdItemToDelete] = useState(0);
  const [modalMode, setModalMode] = useState("");
  const [item, setItem] = useState({});

  return (
    <AppContext.Provider
      value={{
        openDeleteModal,
        setOpenDeleteModal,
        idItemToDelete,
        setIdItemToDelete,
        openModal,
        setOpenModal,
        modalMode,
        setModalMode,
        item,
        setItem,
      }}
    >
      <HomePage />
    </AppContext.Provider>
  );
}

export default App;
