import React, { SyntheticEvent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Config from '../../../utils/Config';
import VacationModel from '../../../Models/VacationModel';
import { NavLink, useNavigate } from 'react-router-dom';
import notify from '../../../service/NotifyService';
import VacationService from '../../../service/VacationService';
import { useForm } from 'react-hook-form';
import store from '../../../redux/Store';
import config from '../../../utils/Config';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

interface VacationCardProps {
    vacation: VacationModel;
  }


//פונ' אשר מקבלת חופשה כפרמטר
export default function RecipeReviewCard(props: VacationCardProps): JSX.Element {
    const [user, setUser] = useState<any>(store.getState().authState.user);
    const [TheVacotions, setTheVacotions] = useState<VacationModel[]>([]);


    //false משתנה מסוג בוליאן אשר הערך ההתחלתי שלו הוא 
    const [isFollow, setIsFollow] = useState<boolean>(false);
    //משתנה מסוג מספר אשר הערך ההתחלתי שלו הוא אפס
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [erer, setErer] = useState<string>("");

    //שזאת אומרת שהמשתמש  true של החופשה שהוכנסה הוא  isFollowing בעת טעינת הקומפוננטה אנו נבדוק האם הפרופרטי 
    //true ל isFollow בעצם עוקב אחר החופשה הזו אנו נשתה את ערך המשתנה שלנו 
    useEffect(() => {
        VacationService.fetchVacotion(false)
        .then(vacotions => setTheVacotions(vacotions))
        if (props.vacation.isFollowing){
            setErer("red")
            setIsFollow(true);
        }
         //של החופשה שהוכנסה followersCount את הערך שיש בתוך הפרופרטי  followersCount ואנו נזין כערך למשתנה 
         setFollowersCount(props.vacation.followersCount);
         
         const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
            setTheVacotions(store.getState().vacationState.Vacotion);
          });
    
          return () => {
            unsubscribe();
          };

      }, []);

      //ומכניסה אליה בתור משתנה את VacationService.followVacation אנו מכניסים לתוך המשתנה שלנו פונ' אשר מזמנת את הפונ' 
      //האיידי של החופשה שהוכנסה 
      const followVacation = async () => {
        try {
          VacationService.followVacation(props.vacation.vacationId);
          setIsFollow(!isFollow);
          setFollowersCount(followersCount + 1);
          setIsFollow(!isFollow);
          setErer("red");
          // notify.success("Follow!")
        } catch (error: any) {
          notify.error(error);
        }
      };
    
      const unFollowVacation = () => {
        try {
            VacationService.unFollowVacation(props.vacation.vacationId);
          setIsFollow(!isFollow);
          setFollowersCount(followersCount - 1);
          setErer("");


    
          // notify.success("Un-Follow!")
        } catch (error: any) {
          notify.error(error);
        }
      };


    const [vacationId, setVacationId] = useState<any>();
    function formatDateTime(dateTime: string): string {
        const d = new Date(dateTime);
        return d.toLocaleString();
    }

    //function eransam(): string {
        //if(isFollow)
        //return "red";
        //else
      //  return "black"
    //}

   // erer:string = eransam();


    
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };  

  const [colors, setColors] = useState<any>("red");

  
  const red:string = "red";
  const noColor:string = "";
  const [trr, setTrr] = useState<boolean>(true);
  const checkFalse:boolean = false;
  const checktrue:boolean = true;

  const navigate = useNavigate();

    async function deleteVacation() {
        try {

            // Are you sure message: 
            const confirmDelete = window.confirm("Are you sure?");
            if (!confirmDelete) return;

            // Delete this product: 
            await VacationService.deleteOneVacotion(props.vacation.vacationId);
            notify.success("Vacation deleted");

            navigate("/VacationList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
                // <div>
            //  <button onClick={() => followVacation()}>followVacation</button>
             // <br/>
            //  <button onClick={() => unFollowVacation()}>unFollowVacation</button>
        //  </div>
  return (

    <div className="BoxCard">

    <Card className={classes.root}>
    <NavLink to={"/vacation/details/" + props.vacation.vacationId}>
      <CardMedia
        className={classes.media}
        image={Config.vacationsImageUrl + props.vacation.imageName}
        title="Paella dish"
      />
     </NavLink>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.vacation.description}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
        startDate: {formatDateTime(props.vacation.startDate)}
        </Typography>


        <Typography variant="body2" color="textSecondary" component="p">
        endDate: {formatDateTime(props.vacation.endDate)}
     
        
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
        price: {props.vacation.price}
        </Typography>


      </CardContent>
      <CardActions disableSpacing>

 
      {user.role === "admin" ?
         (<><button onClick={() => navigate("/vacation/update/" + props.vacation.vacationId)}>🖊</button>
        <button onClick={() => deleteVacation()}>🧺</button></>)
        :
         (console.log("false")) }

      {user.role !== "admin" ? (   
      <div className='actionsOnCard'>
      {isFollow ? (
        <IconButton aria-label="add to favorites" style={{color:erer}}  onClick={() => unFollowVacation()}>
        <FavoriteIcon className="Eran"/>Follow
        </IconButton>
      ) : (
        <IconButton aria-label="add to favorites" style={{color:erer}} onClick={() =>followVacation()}>
        <FavoriteIcon className="Eran"/>
        </IconButton>
        )}
            </div>
      ) : (console.log("eran"))}
       


        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <p dir="rtl"><b>דמי ביטול:</b></p>
            <p dir="rtl">במידה ותזמינו חופשה זו, תוכלו לבטל את העסקה תוך 14 ימי עסקים ללא דמי ביטול</p>
          </Typography>
          <Typography paragraph>
          <p dir="rtl"><b>מדיניות ביטוח:</b></p>
          <p dir="rtl">יש להציג ביטוח נסיעות לפני קניית חבילת חופשת אקסטרים </p>

          </Typography>
          <Typography>
          <p dir="rtl"><b>למידע נוסף יש לפנות אלינו במייל :</b></p>
          <p dir="rtl">eransam21@gmail.com</p>

          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
