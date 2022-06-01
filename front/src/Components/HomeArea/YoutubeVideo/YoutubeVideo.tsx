import Footer from "../../LayoutArea/Footer/Footer";
import Header from "../../LayoutArea/Header/Header";
import Menu from "../../LayoutArea/Menu/Menu";
import "./YoutubeVideo.css";

// Interpolation

function YoutubeVideo(): JSX.Element {

    return (



<div className="Layout">
<header>
    <Header />
</header>
<aside >
    <Menu />
</aside>
<main>
<div className="Discount Box">
            <iframe width="1264" height="655" src="https://www.youtube.com/embed/O_9TgmIg1nA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            <iframe width="1264" height="655" src="https://www.youtube.com/embed/R-07lW6jsDw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        </div>  
    </main>
<footer>
    <Footer />
</footer>
</div>
    );
}

export default YoutubeVideo;
