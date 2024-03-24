import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkGetCardImage } from "../../../store/card_images"





export default function GetImagesForCards({card}) {
    const cardId = card.id
    console.log("🚀 ~ GetImagesForCards ~ cardId:", cardId)

    const dispatch = useDispatch()

    const cardImages = useSelector((state) => state.cardImages)
    console.log("🚀 ~ GetImagesForCards ~ cardImages:", cardImages)

    useEffect(() => {

        dispatch(thunkGetCardImage(cardId))
    }, [dispatch])




    return(
        <>
            <h2>Hello from card images!</h2>
        </>
    )

}
