import React, {FormEvent, useState} from 'react';
import './Upload.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';

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

    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                 setNewTag(event.target.value)
             }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPhoto !== undefined) {
            props.addPhoto(newPhoto, newTag)
                .then(() => setNewPhoto(undefined))
                .catch(() => toast.error("File could not be saved."))
        } else toast.error("Please chose a photo.")
    }

    const showPhoto = ()=> {
      if (newPhoto !== undefined) {
          return newPhoto
      }
    }

    return (
        <section className="upload">
            <h1>Upload a photo!</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="upload photo" className="whatToDo">Select a file:</label>
                <input type="file" id="input" accept="image/jpeg" onChange={onFileChange}/>
            <article>
                <label htmlFor="chose tag">Tag it to find it!</label>
                <input type="text" id="tag" onChange={onTagChange}
                       value={newTag}/>
            </article>
                <button>Upload</button>
            </form>
        </section>
    );
}


//            <img src={showPhoto()} alt={"chosen Photo"} width="300" height="auto"/>