import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import store from "../../../redux/Store";
import notify from "../../../service/NotifyService";
import productService from "../../../service/productService";
import "./UpdateProduct.css";


function UpdateProduct(): JSX.Element {
    const [user, setUser] = useState<any>(store.getState().authState.user);

    const params = useParams();
    const id = +params.id;
    var imgName:string = "";

    

    const navigate = useNavigate();

    const { register, handleSubmit, formState, setValue } = useForm<ProductModel>();

    useEffect(() => {
        //updataproduct זה בעצם מה שיוצג כערכים ראשוניים בתיבות הטקסט  בקובץ ה 
        //בדומה לפלייס הולדר
        productService.getOneProduct(id)
            .then(product => {
                imgName = product.imageName;
                setValue("Name", product.Name);
                setValue("Description", product.Description);
                setValue("Price", product.Price);
                setValue("CreationDate", product.CreationDate);
                //setValue("imageName", product.imageName);                
                
                const unsubscribe = store.subscribe(() => {
                    setUser(store.getState().authState.user);
                  });
            
                  return () => {
                    unsubscribe();
                  };
                

            })
            .catch(err => notify.error(err));
    }, []);


    async function submit(product: ProductModel) {
        try {
            console.log("imageName",product.imageName);            
            product.productId = id;

            console.log("product in update product: " ,product);
            
            const updatedproduct =  await productService.updateProduct(product);
            

            notify.success("product updated.");

            // Navigate back to all products: 
            navigate("/ProductList");
            
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    

    return (<>
        <div className="Updateproduct Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Update product</h2>

                <label>Name: </label>
                <input type="text" {...register("Name", {
                    required: { value: true, message: "Missing Name" }
                })} />
                <span>{formState.errors.Name?.message}</span>



                <label>Description: </label>
                <input type="string"  {...register("Description", {
                    required: { value: true, message: "Missing Description" },
                })} />
                <span>{formState.errors.Description?.message}</span>


                <label>CreationDate: </label>
                <input type="string"  {...register("CreationDate", {
                    required: { value: true, message: "Missing CreationDate" },
                })} />
                <span>{formState.errors.CreationDate?.message}</span>




                <label>Price: </label>
                <input type="number" {...register("Price", {
                    required: { value: true, message: "Missing Price" },
                    min: { value: 0, message: "Stock can't be negative" },
                    max: { value: 1000, message: "Stock can't exceed 1000" },
                })} />
                <span>{formState.errors.Price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>
                <button onClick={() => navigate(-1)}>Back</button>


            </form>

        </div>
        
    </>)
}



export default UpdateProduct;
