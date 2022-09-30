import React, {FormEvent, useState} from 'react';
import './App.css';
import usePhotos from './hooks/usePhoto';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';

export default function App() {

    const {addPhoto} = usePhotos();
    const [newPhoto, setNewPhoto] = useState<File | undefined>(undefined);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const photo = ()=> {if (event.target.files !== null) {
            return event.target.files[0]
        }}
        setNewPhoto(photo())
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPhoto !== undefined) {
            addPhoto(newPhoto)
                .then(() => setNewPhoto(undefined))
                .catch((error) => toast.error("File could not be saved."))
        } else toast.error("Please chose a photo.")
    }
 //   if (!photos) {
 //       return (<>error: photos undefined</>)
 //   }
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


// <article>
//                 {photos.map(photo => (
//                         <p key={photo.id} className="venues">
//                             {photo.id}
//                         </p>
//                     )
//                 )}
//             </article>