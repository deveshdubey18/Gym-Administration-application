import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        
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
