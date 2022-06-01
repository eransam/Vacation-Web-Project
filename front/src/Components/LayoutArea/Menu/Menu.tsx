import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import store from "../../../redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<any>("null");

    useEffect(() => {
    setUser(store.getState().authState.user);

    // Subscribe to store changes
    const unsubscribe = store.subscribe(() => {
        setUser(store.getState().authState.user);
      });

      return () => {
        unsubscribe();
      };
    }, []);
    
    return (
        <div className="Menu">
        {user?.role === "admin" ? <>
        
        <p className="borderBottum"><b>תפריט מנהל</b></p>
        <NavLink to="/AdminGraf">גרף עוקבים</NavLink>
        <NavLink to="/vacation/new">הוספת חופשה</NavLink>
        <NavLink to="/VacationList">רשימת חופשות</NavLink>
        <br/>

        <p className="borderBottum"><b>תפריט לקוחות</b></p>
            <NavLink to="/home">דף הבית</NavLink>
            <NavLink to="/about">עלינו</NavLink>
            <NavLink to="/productsVacation">מוצרים שכדאי לקחת לחופשה המושלמת</NavLink>
            <NavLink to="/storyseccses">סיפורי הצלחה</NavLink>
            <NavLink to="/YoutubeVideo">הכנסו למסע אל תוך החופשות המדהימות שלנו</NavLink>  
             
            </> : <>
                <NavLink to="/home">דף הבית</NavLink>
                <NavLink to="/about">עלינו</NavLink>
                <NavLink to="/productsVacation">מוצרים שכדאי לקחת לחופשה המושלמת</NavLink>
                 <NavLink to="/VacationList">רשימת חופשות</NavLink>
                <NavLink to="/storyseccses">סיפורי הצלחה</NavLink>
                <NavLink to="/YoutubeVideo">הכנסו למסע אל תוך החופשות המדהימות שלנו</NavLink> 

                </> }
     
{/*
תגית זו היא בעצם קומפוננטה והיא מרנדרת את הפעולה מבלי ללכת לשרת ולאתחל שוב את כל 
דף האיצטיאמאל הראשי שלנו
וכך אנו יוצרים סינגל פייז טהור */}

{/*<NavLink to="/home">NavLink home</NavLink>*/}
            

        </div>
    );
}
export default Menu;
