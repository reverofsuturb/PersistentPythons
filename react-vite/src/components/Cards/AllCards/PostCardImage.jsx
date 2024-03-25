import { thunkPostCardImage } from "../../../store/cards"
import { useDispatch } from "react-redux"
import React, {useState} from "react";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./PostCardImage.css"


export default function PostCardImage({card}){
    const dispatch = useDispatch()
    // const history = useHistory();
    const { closeModal } = useModal();
    const [image, setImage] = useState(null);
    console.log("🚀 ~ PostCardImage ~ image:", image)
    const [cover, setCover] = useState(true)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({})

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors({})

        const formData = new FormData()
        formData.append("image_file", image)
        formData.append("card_id", card.id)

        console.log("🚀 ~ handleSubmit ~ formData:", formData)


        setImageLoading(true)

        const res = await dispatch(thunkPostCardImage(card.id,formData))
        console.log("🚀 ~ handleSubmit ~ res:", res)
        if (res && res.errors){
            setTimeout(() => {
                setImageLoading(false)
                setErrors(res.errors)
            }, 500)

            return

        }

        closeModal()
    }

    return (
        <div className="post-card-contatiner">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="post-card-image-form"
            >
                <input
                type='file'
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="post-card-image-input"
                />
                {Object.values(errors).map((error) => <p className="p-error">{error}</p>)}
                <button type="submit" className="post-card-image-submit">Submit</button>
                {(imageLoading) && <p className="loading">Loading...</p>}
                <div>
                    <input type="checkbox" value={cover} onChange={() => setCover(!cover)} className="post-card-image-checkbox"/>
                    <span>
                        Make this photo the cover?
                    </span>

                </div>

            </form>
        </div>
    )

}
