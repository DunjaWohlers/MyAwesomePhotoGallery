import {useEffect, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

export type Photo = {
    id: string,
    photo: readonly string[]
}

export default function usePhotos() {

    const [photos, setPhotos] = useState<Photo[]>()

    const getPhotos = () => {
        axios.get("/photos")
            .then(response => {
                return response.data
            })
            .then(data => setPhotos(data))
            .catch(error => console.error(error))
    }

    useEffect(
        () => getPhotos(), []
    )

    const id = uuidv4();

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
