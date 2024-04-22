import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { DragDropContext } from "react-beautiful-dnd";
import { thunkAuthenticate } from "../store/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <DragDropContext>
        <ModalProvider>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
        </ModalProvider>
      </DragDropContext>
    </>
  );
}
