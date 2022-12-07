import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../service/NotifyService";
import productService from "../../../service/productService";
import Loading from "../../SharedArea/Loading/Loading";
import RecipeReviewCard from "../ProductCardCopy/ProductCardCopy";

import "./ProductList.css";
import Config from "../../../utils/Config";
import store from "../../../redux/Store";
import SocketService from "../../../service/SocketService";
import Footer from "../../LayoutArea/Footer/Footer";
import Menu from "../../LayoutArea/Menu/Menu";
import Header from "../../LayoutArea/Header/Header";

function ProductList(): JSX.Element {
    const navigate = useNavigate();



    // Create products state: 
    const [TheProducts, setTheProducts] = useState<ProductModel[]>([]);
    const [user, setUser] = useState<any>("null");
    const [role, setRole] = useState<any>("");



    // Do side-effect once: 
    useEffect(() => {
        try {
            productService.fetchProduct(false)
            .then(products => setTheProducts(products))
            setUser(store.getState().authState.user);
            const unsubscribe = store.subscribe(() => {
                setTheProducts(store.getState().productState.Product);
                setUser(store.getState().authState.user);
              });
              if (store.getState().authState.user === null) {
                notify.error("u are not loggin")
                navigate("/homeEnter");

            }
              return () => {
                unsubscribe();
              };



        } catch (error) {
            
        }
      
    }, []);

    //ברגע שאנו ניפתח את הקומפוננטה הזו יפתח לנו חיבור עם הסוקט
    useEffect(() => {
        SocketService.connect();
      }, []);





    

    
    return (

        <div className="Layout">
        <header>
            <Header />
        </header>
        <aside >
            <Menu />
        </aside>
        <main>
        <div className="VacationList">

            {TheProducts.length === 0 && <Loading />}

            {console.log("erererer" ,user.role)}


            <NavLink to="/product/new">➕</NavLink> 
            

            {TheProducts.map(p => <RecipeReviewCard key={p.productId} product={p} />)}



        </div>        </main>
        <footer>
            <Footer />
        </footer>
    </div>



    );
}

export default ProductList;
