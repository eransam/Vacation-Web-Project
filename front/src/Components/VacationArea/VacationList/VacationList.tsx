import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../service/NotifyService";
import vacationService from "../../../service/VacationService";
import Loading from "../../SharedArea/Loading/Loading";
import RecipeReviewCard from "../VacationCardCopy/VacationCardCopy";

import "./VacationList.css";
import Config from "../../../utils/Config";
import UserModel from "../../../Models/UserModel";
import store from "../../../redux/Store";
import socketService from "../../../service/SocketService";
import SocketService from "../../../service/SocketService";
import Footer from "../../LayoutArea/Footer/Footer";
import Menu from "../../LayoutArea/Menu/Menu";
import Header from "../../LayoutArea/Header/Header";

function VacationList(): JSX.Element {
    const navigate = useNavigate();


    console.log("image url: " + Config.vacationsImageUrl);

    // Create products state: 
    const [TheVacotions, setTheVacotions] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<any>("null");
    const [role, setRole] = useState<any>("");



    // Do side-effect once: 
    useEffect(() => {
        try {
            vacationService.fetchVacotion(false)
            .then(vacotions => setTheVacotions(vacotions))
            setUser(store.getState().authState.user);
            const unsubscribe = store.subscribe(() => {
                setTheVacotions(store.getState().vacationState.Vacotion);
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



    console.log("user: " , user);
    

    console.log("token: " , store.getState().authState.token);


    

    
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

            {TheVacotions.length === 0 && <Loading />}

            {console.log("erererer" ,user.role)}


            {user.role === "admin" ? (<NavLink to="/vacation/new">➕</NavLink>) : (console.log("false")) }
            

            {TheVacotions.map(p => <RecipeReviewCard key={p.vacationId} vacation={p} />)}



        </div>        </main>
        <footer>
            <Footer />
        </footer>
    </div>



    );
}

export default VacationList;
