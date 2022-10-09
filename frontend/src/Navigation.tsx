import {NavLink} from "react-router-dom";
import React from "react";
import './Navigation.css';

export default function Navigation() {
    return (
        <section className="navigation">
            <NavLink to={"/"}>
                <p>Photo Gallery</p>
            </NavLink>
            <NavLink to={"/upload"}>
                <p className="uploadLink">Upload Photo</p>
            </NavLink>
        </section>
    )
}
