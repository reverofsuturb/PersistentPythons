import { thunkPostCardImage } from "../../../store/cards";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import "./PostCardImage.css";

export default function PostCardImage({ card }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [image, setImage] = useState(null);

  const [cover, setCover] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("card_id", card.id);

    setImageLoading(true);

    const res = await dispatch(thunkPostCardImage(card.id, formData));

    if (res && res.errors) {
      setTimeout(() => {
        setImageLoading(false);
        setErrors(res.errors);
      }, 500);

      return;
    }

    // closeModal()
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="post-card-image-form"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="post-card-image-input"
        />
        <button type="submit" className="post-card-image-submit">
          Submit
        </button>
        {imageLoading && <p className="loading">Loading...</p>}
        <input
          type="checkbox"
          value={cover}
          onChange={() => setCover(!cover)}
          className="post-card-image-checkbox"
        />
        Make this photo the cover?
        {Object.values(errors).map((error) => (
          <p className="p-error">{error}</p>
        ))}
      </form>
    </>
  );
}
