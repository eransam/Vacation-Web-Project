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
import ProductModel from '../../../Models/ProductModel';
import { NavLink, useNavigate } from 'react-router-dom';
import notify from '../../../service/NotifyService';
import productService from '../../../service/productService';
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

interface ProductCardProps {
    product: ProductModel;
  }


//פונ' אשר מקבלת חופשה כפרמטר
export default function RecipeReviewCard(props: ProductCardProps): JSX.Element {
    const [user, setUser] = useState<any>(store.getState().authState.user);
    const [TheProducts, setTheProducts] = useState<ProductModel[]>([]);


    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [erer, setErer] = useState<string>("");

    useEffect(() => {
        productService.fetchProduct(false)
        .then(product => setTheProducts(product))
        if (props.product.isFollowing){
            setErer("red")
            setIsFollow(true);
        }
         //של החופשה שהוכנסה followersCount את הערך שיש בתוך הפרופרטי  followersCount ואנו נזין כערך למשתנה 
         setFollowersCount(props.product.followersCount);
         
         const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
            setTheProducts(store.getState().productState.Product);
          });
    
          return () => {
            unsubscribe();
          };

      }, []);

      //ומכניסה אליה בתור משתנה את ProductService.followProduct אנו מכניסים לתוך המשתנה שלנו פונ' אשר מזמנת את הפונ' 
      //האיידי של החופשה שהוכנסה 
      const followProduct = async () => {
        try {
            productService.followProduct(props.product.productId);
          setIsFollow(!isFollow);
          setFollowersCount(followersCount + 1);
          setIsFollow(!isFollow);
          setErer("red");
          // notify.success("Follow!")
        } catch (error: any) {
          notify.error(error);
        }
      };
    
      const unFollowProduct = () => {
        try {
            productService.unFollowProduct(props.product.productId);
          setIsFollow(!isFollow);
          setFollowersCount(followersCount - 1);
          setErer("");


    
          // notify.success("Un-Follow!")
        } catch (error: any) {
          notify.error(error);
        }
      };


    const [ProductId, setProductId] = useState<any>();
    function formatDateTime(dateTime: string): string {
        const d = new Date(dateTime);
        return d.toLocaleString();
    }




    
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

    async function deleteProduct() {
        try {

            // Are you sure message: 
            const confirmDelete = window.confirm("Are you sure?");
            if (!confirmDelete) return;

            // Delete this product: 
            await productService.deleteOneProduct(props.product.productId);
            notify.success("product deleted");

            navigate("/ProductList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

  return (

    <div className="BoxCard">

    <Card className={classes.root}>
    <NavLink to={"/product/details/" + props.product.productId}>
      <CardMedia
        className={classes.media}
        image={Config.vacationsImageUrl + props.product.imageName}
        title="Paella dish"
      />
     </NavLink>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.product.Name}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
        Description: {formatDateTime(props.product.Description)}
        </Typography>


        <Typography variant="body2" color="textSecondary" component="p">
        CreationDate: {formatDateTime(props.product.CreationDate)}
     
        
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
        Price: {props.product.Price}
        </Typography>


      </CardContent>
      <CardActions disableSpacing>

 
         (<><button onClick={() => navigate("/product/update/" + props.product.productId)}>🖊</button>
        <button onClick={() => deleteProduct()}>🧺</button></>)

      <div className='actionsOnCard'>
      {isFollow ? (
        <IconButton aria-label="add to favorites" style={{color:erer}}  onClick={() => unFollowProduct()}>
        <FavoriteIcon className="Eran"/>Follow
        </IconButton>
      ) : (
        <IconButton aria-label="add to favorites" style={{color:erer}} onClick={() =>followProduct()}>
        <FavoriteIcon className="Eran"/>
        </IconButton>
        )}
            </div>

        
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
