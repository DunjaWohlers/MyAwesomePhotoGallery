import {useEffect, useState} from "react";
import axios from "axios";

export type Photo = {
    id: string,
    photo: string
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

    const addPhoto = (newPhoto: File) => {
        let formData = new FormData()
        formData.append("newPhoto", newPhoto)

        return axios.post("photos/", formData)
            .then((response) => {
                getPhotos()
                return response.data
                }
            );
    }

    return {photos, addPhoto}
}
