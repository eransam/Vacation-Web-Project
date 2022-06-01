import "./Home.css";
import image from "../../../Assets/Images/gif2.gif";
import Menu from "../../LayoutArea/Menu/Menu";
import Header from "../../LayoutArea/Header/Header";
import Footer from "../../LayoutArea/Footer/Footer";


function Home(): JSX.Element {

    return (
            
            
            <div className="Layout">
            <header>
                <Header />
            </header>
            <aside >
                <Menu />
            </aside>
            <main>
            <img src={image} alt="image1" className="beachImg" />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Home;
