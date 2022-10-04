import {Photo} from "./hooks/usePhoto";

export type GalleryProps = {
    photos: Photo[]
}

export default function Gallery(props: GalleryProps) {

    return (
        <section>
            <article>
                <h1>Photo Gallery</h1>
            </article>
            <article className="projectList">
                {props.photos.map(photo => (
                        <img src={"data:image/jpg;base64," + photo.photo} alt={"photo: " + photo.id} key={photo.id}/>
                    )
                )}
            </article>
        </section>
    )
}
