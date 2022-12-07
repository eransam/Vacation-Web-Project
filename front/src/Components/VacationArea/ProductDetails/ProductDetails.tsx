import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import store from "../../../redux/Store";
import notify from "../../../service/NotifyService";
import productService from "../../../service/productService";
import config from "../../../utils/Config";
import Loading from "../../SharedArea/Loading/Loading";
import "./ProductDetails.css";

function ProductDetails(): JSX.Element {

    // Get Route Parameter: 
    const params = useParams();
    const id = +params.id;

    // Create state for the product to display: 
    const [product, setProduct] = useState<ProductModel>();
    const [user, setUser] = useState<any>("null");


    // AJAX request that product:
    useEffect(() => {
        productService.getOneProduct(id)
            .then(product => setProduct(product))
            .catch(err => notify.error(err));
            setUser(store.getState().authState.user);

    }, []);

    const navigate = useNavigate();

    async function deleteProduct() {
        try {

            // Are you sure message: 
            const confirmDelete = window.confirm("Are you sure?");
            if (!confirmDelete) return;

            // Delete this product: 
            await productService.deleteOneProduct(id);
            notify.success("product deleted");

            navigate("/ProductList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="ProductDetails">

            <h2>product Details</h2>

            {!product && <Loading />}

            {product &&
                <>
                    <h3>Name: {product.Name}</h3>
                    <h3>Description: {product.Description}</h3>
                    <h3>CreationDate: {product.CreationDate}</h3>
                    <h3>Price: {product.Price}</h3>
                    <img src={config.vacationsImageUrl + product.imageName} width="450px" height="450px" />

                    <br />


                     <button onClick={() => navigate(-1)}>Back</button>
                     <button onClick={() => navigate("/product/update/" + product.productId)}>Edit</button>
                     <button onClick={() => deleteProduct()}>Delete</button>
                    

                </>
            }

        </div>
    );
}

export default ProductDetails;
