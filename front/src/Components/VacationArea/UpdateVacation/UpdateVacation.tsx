import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../redux/Store";
import notify from "../../../service/NotifyService";
import VacationService from "../../../service/VacationService";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {
    const [user, setUser] = useState<any>(store.getState().authState.user);


    const params = useParams();
    const id = +params.id;
    var imgName:string = "";

    const navigate = useNavigate();

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    useEffect(() => {
        //updataVacation זה בעצם מה שיוצג כערכים ראשוניים בתיבות הטקסט  בקובץ ה 
        //בדומה לפלייס הולדר
        VacationService.getOneVacotion(id)
            .then(vacation => {
                imgName = vacation.imageName;
                console.log("vacation123: ", imgName);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                //setValue("imageName", vacation.imageName);                
                
                const unsubscribe = store.subscribe(() => {
                    setUser(store.getState().authState.user);
                  });
            
                  return () => {
                    unsubscribe();
                  };
                

            })
            .catch(err => notify.error(err));
    }, []);


    async function submit(vacation: VacationModel) {
        try {
            console.log("imageName",vacation.imageName);            
            vacation.vacationId = id;

            console.log("vacation in update vacation: " ,vacation);
            
            const updatedVacation =  await VacationService.updateVacotion(vacation);
            console.log("updatedVacation" + updatedVacation);
            

            notify.success("vacation updated.");

            // Navigate back to all products: 
            navigate("/VacationList");
            
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    console.log("user123: " , user );
    

    return (<>
        {user.role === "admin" ?
        (
        <div className="UpdateVacation Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Update vacation</h2>

                <label>description: </label>
                <input type="text" {...register("description", {
                    required: { value: true, message: "Missing description" }
                })} />
                <span>{formState.errors.description?.message}</span>



                <label>startDate: </label>
                <input type="string"  {...register("startDate", {
                    required: { value: true, message: "Missing price" },
                })} />
                <span>{formState.errors.startDate?.message}</span>


                <label>endDate: </label>
                <input type="string"  {...register("endDate", {
                    required: { value: true, message: "Missing endDate" },
                })} />
                <span>{formState.errors.endDate?.message}</span>




                <label>price: </label>
                <input type="number" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Stock can't be negative" },
                    max: { value: 1000, message: "Stock can't exceed 1000" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>
                <button onClick={() => navigate(-1)}>Back</button>


            </form>

        </div>
        
    )
    :
    (
        notify.error("Sorry you do not have permission to access this page")
    )
     
            }
    </>)
}



export default UpdateVacation;
