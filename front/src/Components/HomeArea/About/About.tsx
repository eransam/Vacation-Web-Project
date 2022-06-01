import Footer from "../../LayoutArea/Footer/Footer";
import Header from "../../LayoutArea/Header/Header";
import Menu from "../../LayoutArea/Menu/Menu";
import "./About.css"; 

function About(): any {
    


    return(

        <div className="Layout">
        <header>
            <Header />
        </header>
        <aside >
            <Menu />
        </aside>
        <main>
        <div>
            <p>
                    אנו אתר החופשות הגדול בארץ, אצלנו תוכלו למצוא מגוון חופשות במחירים מוזלים
            </p>
        </div>
                </main>
        <footer>
            <Footer />
        </footer>
    </div>



    ) ;
}
         

export default About;

 
 

 
