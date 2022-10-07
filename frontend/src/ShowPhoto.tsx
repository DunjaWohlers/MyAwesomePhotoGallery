import {useNavigate, useParams} from "react-router-dom";
import {Photo} from "./hooks/usePhoto";
import './ShowPhoto.css';

export type PhotoProps = {
    photos: Photo[]
}

export default function ShowPhoto(props: PhotoProps) {
    const {photoId} = useParams()
    const navigate = useNavigate();
    const photo = props.photos.find((photo) => photo.id === photoId)
    if (!photo) return (<>error: photo not found</>)
    const handleClick = () => {
        navigate("/")
    }

    return (
        <section className="showPhoto">
            <img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} width="auto" height="500" className="photo"/>
            <button onClick={handleClick} className="back">zurück</button>
        </section>
    )
}
