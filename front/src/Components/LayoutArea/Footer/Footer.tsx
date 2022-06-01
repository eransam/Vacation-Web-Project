import "./Footer.css";

function Footer(): JSX.Element {
    return (
        
        <div className="Footer">
            <p>All Rights Reserved &copy;{TheDatenow()}</p>
        </div>
    )

}



function TheDatenow() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return date
}


export default Footer;


