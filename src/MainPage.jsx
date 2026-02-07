import "./MainPage.css";
import YogaImg from "./assets/yoga.jpg";

function MainPage() {
  return (
    <div className="main-page">
      <div className="features">
        <div className="feature-box">
          <img src={YogaImg} alt="yoga" />
          <h3>Yoga Classes</h3>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
