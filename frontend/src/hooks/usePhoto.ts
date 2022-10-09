import {useEffect, useState} from "react";
import axios from "axios";

export type Photo = {
    id: string,
    photo: string,
    tags: string[]
}

export default function usePhotos() {

    const [photos, setPhotos] = useState<Photo[]>()

    const getPhotos = () => {
        axios.get("photos/")
            .then(response => {
                return response.data
            })
            .then(data => setPhotos(data))
            .catch(error => console.error(error))
    }

    useEffect(
        () => getPhotos(), []
    )

    const addPhoto = (photoData: File, tag: string) => {
        let photoForm = new FormData()
        photoForm.append("photo", photoData)
        photoForm.append("tag", tag)
        return axios.post("photos/", photoForm)
            .then((response) => {
                    getPhotos()
                    return response.data
                }
            );
    }

    const addTag = (tag: string) => {
        const newTag = {tag: tag}
        return axios.put("photos/", newTag)
            .then((response) => {
                    getPhotos()
                    return response.data
                }
            );
    }

    return {photos, addPhoto, addTag}
}
