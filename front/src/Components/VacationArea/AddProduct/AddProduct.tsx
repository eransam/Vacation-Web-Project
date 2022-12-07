import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../service/NotifyService";
import ProductService from "../../../service/productService";
import config from "../../../utils/Config";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<ProductModel>();

    const navigate = useNavigate();

    async function submit(product: ProductModel) {
        try {
            console.log("product: " ,product);
            
            await ProductService.addNewProduct(product);
            
            notify.success("product has been added!");

            
            navigate("/ProductList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddProduct Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Add product</h2>

                <label>Name: </label>
                <input type="text" {...register("Name", {
                    required: { value: true, message: "Missing Name " }
                })} />
                <span>{formState.errors.Name?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("Description", {
                    required: { value: true, message: "Missing Description " }
                })} />
                <span>{formState.errors.Description?.message}</span>


                <label>Price: </label>
                <input type="number" {...register("Price", {
                    required: { value: true, message: "Missing Price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 100000, message: "Price can't exceed 1000" },
                })} />




                <label>CreationDate: </label>
                <input type="datetime-local" {...register("CreationDate", {
                    required: { value: true, message: "Missing endDate" }
                })} />
                <span>{formState.errors.CreationDate?.message}</span>



                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />



                <button>Add</button>
                <button onClick={() => navigate(-1)}>Back</button>


            </form>

        </div>
    );
}

export default AddProduct;