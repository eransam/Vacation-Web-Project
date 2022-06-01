import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../redux/Store";
import notify from "../../../service/NotifyService";
import VacationService from "../../../service/VacationService";
import config from "../../../utils/Config";
import Loading from "../../SharedArea/Loading/Loading";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    // Get Route Parameter: 
    const params = useParams();
    const id = +params.id;

    // Create state for the product to display: 
    const [vacation, setVacation] = useState<VacationModel>();
    const [user, setUser] = useState<any>("null");


    // AJAX request that product:
    useEffect(() => {
        VacationService.getOneVacotion(id)
            .then(vacation => setVacation(vacation))
            .catch(err => notify.error(err));
            setUser(store.getState().authState.user);

    }, []);

    const navigate = useNavigate();

    async function deleteVacation() {
        try {

            // Are you sure message: 
            const confirmDelete = window.confirm("Are you sure?");
            if (!confirmDelete) return;

            // Delete this product: 
            await VacationService.deleteOneVacotion(id);
            notify.success("Vacation deleted");

            navigate("/VacationList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationDetails">

            <h2>vacation Details</h2>

            {!vacation && <Loading />}

            {vacation &&
                <>
                    <h3>description: {vacation.description}</h3>
                    <h3>startDate: {vacation.startDate}</h3>
                    <h3>startDate: {vacation.startDate}</h3>
                    <h3>endDate: {vacation.endDate}</h3>
                    <h3>price: {vacation.price}</h3>
                    <img src={config.vacationsImageUrl + vacation.imageName} width="450px" height="450px" />

                    <br />



                    {/* Navigate Back: */}
                    {/* <NavLink to="/products">Back</NavLink> */}

                    {/* Navigate Back: */}
                    {user.role === "admin" ?
                     (<>
                     <button onClick={() => navigate(-1)}>Back</button>
                     <button onClick={() => navigate("/vacation/update/" + vacation.vacationId)}>Edit</button>
                     <button onClick={() => deleteVacation()}>Delete</button>
                     </> ) 
                     :
                      (console.log("false"))}

                    

                </>
            }

        </div>
    );
}

export default VacationDetails;
