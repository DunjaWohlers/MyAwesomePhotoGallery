import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import usePhoto from "./hooks/usePhoto";
import Navigation from "./Navigation";
import Upload from "./Upload";
import Gallery from "./Gallery";
import Header from "./Header";
import './App.css';
import {ToastContainer} from "react-toastify";
import ShowPhoto from "./ShowPhoto";

export default function App() {

    const {photos, addPhoto, addTag} = usePhoto();

    if (!photos) return (<>Loading...</>)
        return (
            <HashRouter>
                <Header/>
                <Navigation/>
                <Routes>
                    <Route path={"/"}
                           element={<Gallery photos={photos}/>}/>
                    <Route path={"upload/"}
                           element={<Upload addPhoto={addPhoto}/>}/>
                    <Route path={"/photo/:photoId/"}
                           element={<ShowPhoto photos={photos} addTag={addTag}/>}/>
                </Routes>
                <ToastContainer closeButton={false} position="bottom-right" hideProgressBar={true} closeOnClick={true}
                                autoClose={2000}/>
            </HashRouter>

        )
    }
