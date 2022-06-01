import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../service/NotifyService";
import VacationService from "../../../service/VacationService";
import config from "../../../utils/Config";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    async function submit(vacation: VacationModel) {
        try {

            await VacationService.addNewVacation(vacation);
            
            notify.success("vacation has been added!");

            
            navigate("/VacationList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Add vacation</h2>

                <label>description: </label>
                <input type="text" {...register("description", {
                    required: { value: true, message: "Missing description name" }
                })} />
                <span>{formState.errors.description?.message}</span>

                <label>startDate: </label>
                <input type="datetime-local" {...register("startDate", {
                    required: { value: true, message: "Missing startDate" }
                })} />
                <span>{formState.errors.endDate?.message}</span>

                <label>endDate: </label>
                <input type="datetime-local" {...register("endDate", {
                    required: { value: true, message: "Missing endDate" }
                })} />
                <span>{formState.errors.endDate?.message}</span>

                <label>price: </label>
                <input type="number" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "price can't be negative" },
                    max: { value: 100000, message: "price can't exceed 1000" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>
                <button onClick={() => navigate(-1)}>Back</button>


            </form>

        </div>
    );
}

export default AddVacation;