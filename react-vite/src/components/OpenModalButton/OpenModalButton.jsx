import { useModal } from '../../context/Modal';
import "./OpenModalButton.css"
function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  css, // optional css prop for individual styling
  id, // optional id prop
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className={ css ? css : "omb-button"} id={ id ? id : ""} onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
