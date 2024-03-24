import { thunkPostCardImage } from "../../../store/cards"
import { useDispatch } from "react-redux"
import React, {useState} from "react";
// import { useHistory } from "react-router-dom";


export default function PostCardImage({card}){
    const dispatch = useDispatch()
    // const history = useHistory();
    const [image, setImage] = useState(null);
    console.log("🚀 ~ PostCardImage ~ image:", image)
    const [cover, setCover] = useState(true)
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("image_file", image)
        formData.append("card_id", card.id)

        console.log("🚀 ~ handleSubmit ~ formData:", formData)


        setImageLoading(true)

        const res = await dispatch(thunkPostCardImage(card.id,formData))
        console.log("🚀 ~ handleSubmit ~ res:", res)
        if (res && res.errors){
            return setErrors(res.errors)
        }

        // closeModal()
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
