import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetCardImage } from "../../../store/card_images";
import "./GetCardImage.css";

export default function GetImagesForCards({ card }) {
  const cardId = card.id;

  const dispatch = useDispatch();

  const cardImages = useSelector((state) => state.cardImages);

  const allImages = Object.values(cardImages).flat();

  useEffect(() => {
    dispatch(thunkGetCardImage(cardId));
  }, [dispatch]);

  return (
    <>
      {allImages
        .filter((image) => image.card_id === card.id)
        .map((image) => (
          <div key={image.id} className="card_images">
            <img className="images" src={image.image_file} alt="Card" />
          </div>
        ))}
    </>
  );
}
