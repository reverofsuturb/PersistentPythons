import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { DragDropContext } from "react-beautiful-dnd";
import { thunkAuthenticate } from "../store/session";
import { thunkPatchCard } from "../store/cards";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination || destination.index === source.index) return;
    console.log("listid", destination.droppableId, "cardid", draggableId)
    dispatch(thunkPatchCard(destination.droppableId, draggableId));
  };

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ModalProvider>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
        </ModalProvider>
      </DragDropContext>
    </>
  );
}
