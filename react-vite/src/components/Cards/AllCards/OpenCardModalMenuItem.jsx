import { useModal } from "../../../context/Modal";
import { BiNotepad } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdLabelImportantOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegComments } from "react-icons/fa";
import "./OpenCardModalMenuItem.css";

function OpenCardModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  card, // set card for rendering
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <div className="ocmmi-container" onClick={onClick}>
      <div className="open-modal-menu-item_list">{itemText}</div>
      <div className="image-files-in-ocmmi-container">
        {card?.cardimages?.length ? (
          <img className="image-files-in-ocmmi" src={card?.cover_photo} />
        ) : (
          ""
        )}
      </div>
      <div className="ocmmi-icons">
        {card.description ||
        card.checklist ||
        card.start_date ||
        card.end_date ||
        card.labels ||
        card.notification ||
        card?.comments?.length ? (
          <>
            {card.description && <BiNotepad />}
            {card.checklist && <GoChecklist />}
            {(card.end_date || card.start_date) && <IoCalendarNumberOutline />}
            {card.labels && <MdLabelImportantOutline />}
            {card.notification && <IoMdNotificationsOutline />}
            {card.comments?.length ? <FaRegComments /> : ""}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OpenCardModalMenuItem;
