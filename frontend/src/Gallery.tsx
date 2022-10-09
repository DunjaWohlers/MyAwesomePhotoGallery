import {Photo} from "./hooks/usePhoto";
import './Gallery.css';
import {Link} from "react-router-dom";
import React, {useState} from "react";

export type GalleryProps = {
    photos: Photo[]
}

export default function Gallery(props: GalleryProps) {
    const [tag, setTag] = useState<string>("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value)
    }

    const photoData = () => {
        let dataToShow: Photo[] = []
        if (tag === "") {
            dataToShow = props.photos
        } else {
            props.photos.forEach(photo => {
                if (photo.tags.includes(tag)) {
                    dataToShow.push(photo)
                }
            })
            if (dataToShow.length === 0) {
                dataToShow = props.photos
            }
        }
        return dataToShow
    }

    return (
        <section className="gallery">
            <article>
                <h1>Gallery</h1>
            </article>
            <article>
                <label htmlFor="chose tag">Search for Tags!</label>
                <input type="text" id="tag" onChange={onChange}
                       value={tag}/>
            </article>
            <article className="image">
                {photoData().map(photo => (<Link to={"/photo/" + photo.id} key={photo.id}>
                            <img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} width="300"
                                 height="auto"/>
                        </Link>
                    )
                )}
            </article>
        </section>
    )
}
