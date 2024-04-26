import { thunkPostCardImage } from "../../../store/cards";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./PostCardImage.css";

export default function PostCardImage({ card, isUploading }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create a URL for image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    isUploading(false);
    closeModal();
  };

  return (
    <div className="post-card-contatiner">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="post-card-image-form"
      >
        <label>
          <input id="post-image-url" type="file" onChange={updateFile} />
        </label>
        {imagePreview && (
          <img
            id="preview-image"
            src={imagePreview}
            alt="preview of uploaded image"
            style={{ maxWidth: "300px" }}
          />
        )}

        {Object.values(errors).map((error) => (
          <p key={error} className="p-error">
            {error}
          </p>
        ))}
        <button type="submit" className="post-card-image-submit">
          Submit
        </button>
        {imageLoading && <p className="loading">Loading...</p>}
      </form>
    </div>
  );
}
