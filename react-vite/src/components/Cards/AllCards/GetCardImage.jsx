import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkGetCardImage } from "../../../store/card_images"
import './GetCardImage.css'





export default function GetImagesForCards({card}) {
    const cardId = card.id
    console.log("🚀 ~ GetImagesForCards ~ cardId:", cardId)

    const dispatch = useDispatch()

    const cardImages = useSelector((state) => state.cardImages)
    // console.log("🚀 ~ GetImagesForCards ~ cardImages:", cardImages)
    const allImages = Object.values(cardImages).flat();

    useEffect(() => {
        dispatch(thunkGetCardImage(cardId))
    }, [dispatch])


    return(
        <>

            {allImages.map((image) => (
                <div key={image.id} className="card_images">
                    <img className="images" src={image.image_file} alt="Card" />
                </div>
            ))}
        </>
    )
}
