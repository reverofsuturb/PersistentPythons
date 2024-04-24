import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetCardImage } from "../../../store/card_images";
import "./GetCardImage.css";
import { thunkPatchCard } from "../../../store/cards";

export default function GetImagesForCards({ card, setEditing, coverPhoto, setCoverPhoto }) {
  const cardId = card.id;

  const dispatch = useDispatch();

  const cardImages = useSelector((state) => state.cardImages);

  const allImages = Object.values(cardImages).flat();

  const handleCoverPhoto = async(image) => {

    setEditing(true)

    await dispatch(thunkPatchCard(cardId, image))

    setEditing(false)
  }

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
            <div>
              {coverPhoto !== image.image_file ? <button onClick={() => {handleCoverPhoto(image.image_file); setCoverPhoto(image.image_file);}} className="coverphotobutton">Make Cover Photo</button> : ""}
            </div>
          </div>
        ))}
    </>
  );
}
