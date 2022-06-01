import "./Logo.css";
import logoSource from "../../../Assets/Images/LogoMakr.png";
function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logoSource} alt="Logo" />
        </div>
    );
}

export default Logo;


