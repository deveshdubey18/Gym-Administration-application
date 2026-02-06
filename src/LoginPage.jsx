import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        {/* Animated background elements */}
        <div className="bg-sphere sphere-1"></div>
        <div className="bg-sphere sphere-2"></div>
        <div className="bg-sphere sphere-3"></div>

        {/* Floating cubes */}
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="cube cube-3"></div>

        <div className="btns-box">
          <button className="btn" onClick={() => navigate("./UserLogin")}>
            User Login
          </button>
          <button className="btn" onClick={() => navigate("./AdminLogin")}>
            Admin Login
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
