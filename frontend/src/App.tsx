import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import usePhoto from "./hooks/usePhoto";
import Navigation from "./Navigation";
import Upload from "./Upload";
import Gallery from "./Gallery";

export default function App() {

    const {photos, addPhoto} = usePhoto();

    if (!photos) return (<>Loading...</>)
        return (
            <HashRouter>
                <Navigation/>
                <Routes>
                    <Route path={"/"}
                           element={<Gallery photos={photos} />}/>
                    <Route path={"upload/"}
                           element={<Upload addPhoto={addPhoto}/>}/>
                </Routes>
            </HashRouter>

        )
    }
