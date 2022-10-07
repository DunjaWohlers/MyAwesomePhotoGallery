import './Header.css';
import logo from "./logo.png";

export default function Navigation() {
    return (
        <section>
            <img src={logo} className="logo" alt="MyAwesomePhotoGallery-Logo"/>
        </section>
    )
}
