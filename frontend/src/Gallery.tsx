import {Photo} from "./hooks/usePhoto";
import './Gallery.css';

export type GalleryProps = {
    photos: Photo[]
}

export default function Gallery(props: GalleryProps) {

    return (
        <section className="gallery">
            <article>
                <h1>Photo Gallery</h1>
            </article>
            <article className="image">
                {props.photos.map(photo => (
                        <img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} key={photo.id} width="300" height="auto"/>
                    )
                )}
            </article>
        </section>
    )
}
