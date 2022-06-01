import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import "./AdminGraf.css";
import store from "../../../redux/Store";
import { useEffect } from "react";
import vacationService from "../../../service/VacationService";
import Footer from "../../LayoutArea/Footer/Footer";
import Header from "../../LayoutArea/Header/Header";
import Menu from "../../LayoutArea/Menu/Menu";

function AdminGraf(): JSX.Element {
  //פה אני מכניס לסטור את רשימת החופשות כך שרשימת החופשות יוצגו בקומפוננטה גם לאחר ריפרוש הדף
  useEffect(() => {
    vacationService.fetchVacotion(false);
  }, []);

  ChartJS.register(...registerables);

  //פה אני מכניס את החופשות מהסטור למשתנה שלי
  const vacationList = store.getState().vacationState.Vacotion;

  const graph = {
    //פה אנו קובעים את הכותרת של העמודות בגרף
    labels: vacationList.map((v) => v.description),
    //פה אנו קובעים את נתוני הגרף שלנו
    datasets: [
      {
        //כותרת הגרפים
        label: "Followers number",
        //נתוני הגרף
        data: vacationList.map((v) => v.followersCount),
        //צבע הגרף
        backgroundColor: ["#6FA2A6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <div>
          <Bar
            data={graph}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Vacation followers graphs",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>{" "}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminGraf;
