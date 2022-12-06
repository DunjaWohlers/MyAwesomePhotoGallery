import React, {FormEvent, useState} from 'react';
import './Upload.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

type UploadProps = {
    addPhoto: (newPhoto: File, newTag: string) => Promise<void>,
}

export default function Upload(props: UploadProps) {
    const [newPhoto, setNewPhoto] = useState<File | undefined>(undefined);
    const [newTag, setNewTag] = useState<string>("");

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const photo = () => {
            if (event.target.files !== null) {
                return event.target.files[0]
            }
        }
        setNewPhoto(photo())
    }

    const showPhoto = () => {
        if (newPhoto) {
            return URL.createObjectURL(newPhoto)
        }
    }

    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value)
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPhoto !== undefined) {
            props.addPhoto(newPhoto, newTag)
                .then(() => setNewPhoto(undefined))
                .then(() => setNewTag(""))
                .then(() => toast.success("Photo was saved!."))
                .catch(() => toast.error("File could not be saved."))
        } else toast.error("Please choose a photo.")
    }

    return (
        <section className="upload">

                <h1 className="title">Upload a photo!</h1>
            <article className="content">
                <form onSubmit={onSubmit} className="uploadForm">
                    <label htmlFor="upload photo" className="whatToDo">Select a file:</label>
                    <input type="file" id="input" accept="image/jpeg" onChange={onFileChange} className="input"/>
                    <label htmlFor="choose tag" className="tagIt">Tag it to find it! </label>
                    <input type="text" id="tag" onChange={onTagChange}
                           value={newTag}/>
                    <p><button className="uploadTag">Upload</button></p>
                </form>
                <img src={showPhoto()} className="photoPreview" alt="Photo Preview" />
            </article>
        </section>
    );
}



