import { useModal } from "../../../context/Modal";

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
  console.log(card)
  return (
    <div onClick={onClick}>
      <div className="open-modal-menu-item_list">{itemText}</div>
      <div>
        {card?.cardimages?.length && <img src={card?.cardimages[0]?.image_file} />}
      </div>
    </div>
  );
}

export default OpenCardModalMenuItem;
