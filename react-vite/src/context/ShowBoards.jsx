import { createContext, useState, useContext } from "react";

export const ShowBoardsContext = createContext();

export const ShowBoardsProvider = ({ children }) => {
  const [showBoards, setShowBoards] = useState(null);

  return (
    <ShowBoardsContext.Provider value={{ showBoards, setShowBoards }}>
      {children}
    </ShowBoardsContext.Provider>
  );
};

export const useShowBoards = () => useContext(ShowBoardsContext);
