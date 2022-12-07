import "./Routing.css";
import { Route, Routes } from "react-router";
import PageNotFound from "../../LayoutArea/PageNotFound/PageNotFound"; 
import About from "../../HomeArea/About/About"; 
import { Navigate } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import ProductList from "../../VacationArea/ProductList/ProductList";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import HomeEnter from "../../HomeArea/homeEnter/homeEnter";
import Layout from "../../LayoutArea/Layout/Layout";
import Menu from "../../LayoutArea/Menu/Menu";
import LayoutCopy from "../Layout/Layout";
import Logout from "../../AuthArea/Logout/Logout";
import RecipeReviewCard from "../../VacationArea/ProductCardCopy/ProductCardCopy";
import ProductModel from "../../../Models/ProductModel";
import ProductDetails from "../../VacationArea/ProductDetails/ProductDetails";
import AddProduct from "../../VacationArea/AddProduct/AddProduct";
import UpdateProduct from "../../VacationArea/UpdateProduct/UpdateProduct";
import Home from "../../HomeArea/Home/Home";








function Routing(): JSX.Element {
    return (
    <Routes>

        <Route path="/home" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/product" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AuthMenu" element={<AuthMenu />} />
        <Route path="/homeEnter" element={<HomeEnter />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/homeEnter" element={<HomeEnter />} />
        <Route path="/LayoutCopy" element={<LayoutCopy />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/RecipeReviewCard" element={<RecipeReviewCard product={new ProductModel} />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/product/new" element={<AddProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />



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
