import {useNavigate, useParams} from "react-router-dom";
import {Photo} from "./hooks/usePhoto";
import './ShowPhoto.css';
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";

export type PhotoProps = {
    photos: Photo[]
    updatePhoto: (photoId: string, newTag: string) => Promise<void>,
    deletePhoto: (photoId: string) => Promise<void>,
}

export default function ShowPhoto(props: PhotoProps) {
    const [newTag, setNewTag] = useState<string>("");
    const navigate = useNavigate();
    const {photoId} = useParams()
    if (!photoId) {
        return (<>error: photoId not found</>)
    }
    const photo = props.photos.find((photo) => photo.id === photoId)
    if (!photo) return (<>error: photo not found</>)

    const handleClick = () => {
        navigate("/")
    }

    const deleteIt = () => {
        props.deletePhoto(photoId)
            .then(() => toast.success("Photo was deleted!."))
            .catch(() => toast.error("Photo could not be deleted."))
        navigate("/")
    }

    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value)
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newTag !== undefined && newTag !== "") {
            props.updatePhoto(photoId, newTag)
                .then(() => setNewTag(""))
                .then(() => toast.success("Tag was saved!."))
                .catch(() => toast.error("Tag could not be saved."))
        } else toast.error("Please input a tag.")
    }

    return (
        <section className="showPhoto">
            <article className="actions">
                current tags: {photo.tags.map(tag => (<p key={tag}>{tag}</p>))}
                <form onSubmit={onSubmit} className="form">

                    <label htmlFor="chose tag">Add a new tag!</label>
                    <input type="text" id="tag" onChange={onTagChange}
                           value={newTag}/>
                    <button className="sendAway">send</button>
                </form>
                <button onClick={deleteIt} className="delete">Delete photo!</button>

            </article>
            <article><img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} className="photo"/>
                <button onClick={handleClick} className="back">back to gallery</button>
            </article>
        </section>
    )
}
