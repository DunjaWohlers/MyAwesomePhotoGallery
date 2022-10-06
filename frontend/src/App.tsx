import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import usePhoto from "./hooks/usePhoto";
import Navigation from "./Navigation";
import Upload from "./Upload";
import Gallery from "./Gallery";
import Header from "./Header";
import {ToastContainer} from "react-toastify";

export default function App() {

    const {photos, addPhoto} = usePhoto();

    if (!photos) return (<>Loading...</>)
        return (
            <HashRouter>
                <Header/>
                <Navigation/>
                <Routes>
                    <Route path={"/"}
                           element={<Gallery photos={photos} />}/>
                    <Route path={"upload/"}
                           element={<Upload addPhoto={addPhoto}/>}/>
                </Routes>
                <ToastContainer closeButton={false} position="bottom-right" hideProgressBar={true} closeOnClick={true}
                                autoClose={2000}/>
            </HashRouter>

        )
    }
