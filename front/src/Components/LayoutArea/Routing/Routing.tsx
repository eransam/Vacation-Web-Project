import "./Routing.css";
import { Route, Routes } from "react-router";
import PageNotFound from "../../LayoutArea/PageNotFound/PageNotFound"; 
import About from "../../HomeArea/About/About"; 
import StorySeccses from "../../HomeArea/StorySeccses/StorySeccses"; 
import { Navigate } from "react-router-dom";
import ProductsShose from "../../HomeArea/productsVacation/productsVacation";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationList from "../../VacationArea/VacationList/VacationList";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import HomeEnter from "../../HomeArea/homeEnter/homeEnter";
import Layout from "../../LayoutArea/Layout/Layout";
import Menu from "../../LayoutArea/Menu/Menu";
import LayoutCopy from "../Layout/Layout";
import Logout from "../../AuthArea/Logout/Logout";
import RecipeReviewCard from "../../VacationArea/VacationCardCopy/VacationCardCopy";
import VacationModel from "../../../Models/VacationModel";
import VacationDetails from "../../VacationArea/VacationDetails/VacationDetails";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";
import Home from "../../HomeArea/Home/Home";
import AdminGraf from "../../AdminArea/AdminGraf/AdminGraf";
import YoutubeVideo from "../../HomeArea/YoutubeVideo/YoutubeVideo";








function Routing(): JSX.Element {
    return (
    <Routes>

        <Route path="/home" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/storyseccses" element={<StorySeccses />} /> 
        <Route path="/productsVacation" element={<ProductsShose />} /> 
        <Route path="/VacationList" element={<VacationList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AuthMenu" element={<AuthMenu />} />
        <Route path="/homeEnter" element={<HomeEnter />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/homeEnter" element={<HomeEnter />} />
        <Route path="/LayoutCopy" element={<LayoutCopy />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/RecipeReviewCard" element={<RecipeReviewCard vacation={new VacationModel} />} />
        <Route path="/vacation/details/:id" element={<VacationDetails />} />
        <Route path="/vacation/new" element={<AddVacation />} />
        <Route path="/vacation/update/:id" element={<UpdateVacation />} />
        <Route path="/AdminGraf" element={<AdminGraf />} />
        <Route path="/YoutubeVideo" element={<YoutubeVideo />} />



          {/* יש לנו 2 דרכים לקבוע מה יהיה מוצג בכתובת הריקה(/) דרך אחת ביא לרשום עוד נתיב כרגיל כך:
                    Default route - first way: */}
            {/* <Route path="/" element={<Home />} /> */}

            {/*והדרך השנייה היא לרשום כך את הקוד שהוא שברגע שיכניסו כתובת ריקה תנווט לדף המבוקש
             Default route - second way: */}
            <Route path="/" element={<Navigate to="/homeEnter" />} />

                     {/*כוכבית מתייחסת לכל שאר הכתובות שלא כתובות פה וכך במידה 
                     ומשתמש יקליד כתובת לא קיימת הוא יגיע להודעה שהדף לא קיים */}
        <Route path="*" element={<PageNotFound />} /> 


    </Routes>
    );
}

export default Routing;
