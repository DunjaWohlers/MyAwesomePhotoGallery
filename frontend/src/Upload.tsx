import React, {FormEvent, useState} from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';

type UploadProps = {
    addPhoto: (newPhoto: File) => Promise<void>,
}

export default function Upload(props: UploadProps) {
    const [newPhoto, setNewPhoto] = useState<File | undefined>(undefined);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const photo = () => {
            if (event.target.files !== null) {
                return event.target.files[0]
            }
        }
        setNewPhoto(photo())
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPhoto !== undefined) {
            props.addPhoto(newPhoto)
                .then(() => setNewPhoto(undefined))
                .catch((error) => toast.error("File could not be saved."))
        } else toast.error("Please chose a photo.")
    }

    return (
        <section>
            Upload a photo!
            <form onSubmit={onSubmit}>
                <label htmlFor="upload photo">Select a file:</label>
                <input type="file" id="input" accept="image/png, image/jpeg" onChange={onChange}/>
                <button>Upload</button>
            </form>


            <ToastContainer closeButton={false} position="bottom-right" hideProgressBar={true} closeOnClick={true}
                            autoClose={2000}/>
        </section>
    );
}
