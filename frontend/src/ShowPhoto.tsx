import {useNavigate, useParams} from "react-router-dom";
import {Photo} from "./hooks/usePhoto";
import './ShowPhoto.css';
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";

export type PhotoProps = {
    photos: Photo[]
    addTag: (newTag: string) => Promise<void>,
}

export default function ShowPhoto(props: PhotoProps) {
    const [newTag, setNewTag] = useState<string>("");
    const {photoId} = useParams()
    const navigate = useNavigate();
    const photo = props.photos.find((photo) => photo.id === photoId)
    if (!photo) return (<>error: photo not found</>)

    const handleClick = () => {
        navigate("/")
    }
    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value)
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newTag !== undefined) {
            props.addTag(newTag)
                .then(() => setNewTag(""))
                .then(() => toast.success("Tag was saved!."))
                .catch(() => toast.error("Tag could not be saved."))
        } else toast.error("Please input a tag.")
    }

    return (
        <section className="showPhoto">
            <article>
                current tags: {photo.tags.map(tag => (<p key={photo.id}>{tag}</p>))}
            </article>
            <article>
                <form onSubmit={onSubmit}>

                    <label htmlFor="chose tag">Add a new tag!</label>
                    <input type="text" id="tag" onChange={onTagChange}
                           value={newTag}/>
                    <button>send</button>
                </form>
            </article>
            <article><img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} width="auto"
                          height="500" className="photo"/>
                <button onClick={handleClick} className="back">back to gallery</button>
            </article>
        </section>
    )
}
