import { thunkPostCardImages } from "../../../store/cards"
import { useDispatch } from "react-redux"
import React, {useState} from "react";
// import { useHistory } from "react-router-dom";


export default function PostCardImage({card}){
    const dispatch = useDispatch()
    // const history = useHistory();
    const [image, setImage] = useState(null);
    const [cover, setCover] = useState(true)
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("image", image)

        console.log("🚀 ~ handleSubmit ~ formData:", formData)
        const res = await dispatch(thunkPostCardImages(card.id,formData))
        if (res && res.errors){
            return setErrors(res.errors)
        }

        closeModal()
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <input
                type='file'
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>}
                <input type="checkbox" value={cover} onChange={() => setCover(!cover)}/>
            </form>
        </>
    )
}
