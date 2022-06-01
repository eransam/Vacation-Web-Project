import { Parallax } from "react-parallax";
import { NavLink } from "react-router-dom";
import vacationPic from '../../../Assets/Images/vacation1.jpg'
import { Button } from "@material-ui/core";
import "./homeEnter.css";
import { useEffect } from "react";
import vacationService from "../../../service/VacationService";
import store from "../../../redux/Store";



function HomeEnter(): JSX.Element {
    useEffect(() => {
        try {
            if (store.getState().authState.user !== null) {
            vacationService.fetchVacotion(false)
            }
        }
         catch (error) {
            
        }
      
    }, []);

    return (


        <div >     
    <Parallax className='image' blur={0} bgImage={vacationPic} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className='content'>
            <span className="img-txt">
                סיור באתר החופשות הגדול בישראל
                <br />
                
                
                <Button variant="contained" ><NavLink to="/login">Login</NavLink></Button>
                <Button variant="outlined" className="Bcolor"><NavLink to="/register">register</NavLink></Button>

                </span>
            </div> 
    </Parallax>
    <div className='text-box'>
            <h3 dir="rtl">אודות Fly to..™</h3>
            <p dir="rtl">
 fly too..., שנוסדה בשנת 2022, צמחה מסטארט-אפ  קטן לאחת מחברות הנסיעות הדיגיטליות המובילות . כחלק מקבוצת fly too... , חברת fly too... שואפת לעזור לכולם לחוות את העולם.

חברת  fly too... יש לנו מגוון אלגוריתמים שעוזרים לכם למצוא את החופשה הזולה והמתאימה ביותר לצרכים שלכם , וכך מקשרת בין קהל הלקוחות שלנו לחוויות מדהימות , מגוון של אפשרויות תחבורה ומקומות אירוח. בתור אחד משווקי התיירות הגדולים ביותר בעולם,  fly too... עובדת עם המון חברות וסוכני נסיעות מכל הסוגים , ועוזרת למלונות  בכל רחבי העולם להגיע לקהל הישראלי ולהעצים את הרווחים  שלהם.

. זמינה בכל העולם ומציעה המון יחידות אירוח.  -  fly too... ושירות הלקוחות שלה , זה פשוט משתלם יותר.
        </p>
        </div>

        <div>

        </div>

        

        </div>
        
            
        
        
    );
}

export default HomeEnter;
