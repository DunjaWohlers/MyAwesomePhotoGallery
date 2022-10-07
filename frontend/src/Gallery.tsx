import {Photo} from "./hooks/usePhoto";
import './Gallery.css';
import {Link} from "react-router-dom";

export type GalleryProps = {
    photos: Photo[]
}

export default function Gallery(props: GalleryProps) {

    return (
        <section className="gallery">
            <article>
                <h1>Gallery</h1>
            </article>
            <article className="image">
                {props.photos.map(photo => ( <Link to={"/photo/" + photo.id} key={photo.id}>
                        <img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} width="300" height="auto"/>
                    </Link>
                    )
                )}
            </article>
        </section>
    )
}
