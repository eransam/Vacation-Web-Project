import "./productsVacation.css";
import pic1 from "../../../Assets/Images/pro11.jpg";
import pic2 from "../../../Assets/Images/pro22.jpg";
import pic3 from "../../../Assets/Images/pro33.jpg";
import pic4 from "../../../Assets/Images/pro44.jpg";
import pic5 from "../../../Assets/Images/pro55.jpg";
import pic6 from "../../../Assets/Images/pro66.jpg";
import pic7 from "../../../Assets/Images/pro77.jpg";
import { NavLink } from "react-router-dom";
import Footer from "../../LayoutArea/Footer/Footer";
import Menu from "../../LayoutArea/Menu/Menu";
import Header from "../../LayoutArea/Header/Header";

function productsVacation(): JSX.Element {
    return (


            <div className="Layout">
<header>
    <Header />
</header>
<aside >
    <Menu />
</aside>
<main>
<div className="productsVacation">
            <h2>מוצרים...</h2>
            <img src={pic1} alt="pic1" />
            <img src={pic2} alt="pic2" />
            <img src={pic3} alt="pic3" />
            <br />
            <img src={pic4} alt="pic4" />
            <img src={pic5} alt="pic5" />
            <img src={pic6} alt="pic6" />

            <br />
            <img src={pic7} alt="pic6" />    
        </div>  
    </main>
<footer>
    <Footer />
</footer>
</div>







    );
}

export default productsVacation;
