import {NavLink} from "react-router-dom";
import React from "react";

export default function Navigation() {
    return (
        <section className="navigation">
            <NavLink to={"/"}>
                <p>Photo Gallery</p>
            </NavLink>
            <NavLink to={"/upload"}>
                <p>Upload Photo</p>
            </NavLink>
        </section>
    )
}
