import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export type Photo = {
    id: string,
    photo: string,
    tags: string[]
}

export default function usePhotos() {

    const [photos, setPhotos] = useState<Photo[]>([])

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


    const addTag = (photoId: string, newTag: string) => {
        let photoToUpdate = photos.find((photo) => photo.id === photoId)
        if (!photoToUpdate) {
            return (console.log("error: photo not found"))
        }
        photoToUpdate.tags.push(newTag)
        return photoToUpdate
    }

    const updatePhoto = (photoId: string, newTag: string) => {
        const dataToSend = addTag(photoId, newTag)
        return axios.put("photos/", dataToSend)
            .then((response) => {
                return response.data
            })
            .then(getPhotos)
            .catch(
                error => {
                    toast.error(error.message)
                })
    }


    const deletePhoto = (photoId: string) => {
        return axios.delete("photos/" + photoId)
            .then(getPhotos)
            .catch(
                error => {
                    toast.error(error.message)
                })
    }

    return {photos, addPhoto, updatePhoto, deletePhoto}
}
