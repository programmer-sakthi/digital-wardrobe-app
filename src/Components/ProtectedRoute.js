import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user && !props.user.emailVerified) {
      navigate("/");
      toast.error("Email not verified");
      toast.info("Check your mail for verfication link");
    }
  }, [props.user, navigate]);
  if (!props.user) {
    return <NotLoggedIn />;
  }

  if (props.user?.emailVerified) {
    return props.children;
  }

  return null;
};

const NotLoggedIn = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "black",
      color: "white",
      fontFamily: "Arial, sans-serif",
      animation: "fadeIn 1s ease-out",
    },
    content: {
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "#333",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      animation: "scaleUp 0.5s ease-out",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "1rem",
    },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      padding: "0.75rem 1.5rem",
      border: "none",
      borderRadius: "30px",
      fontSize: "1.2rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    icon: {
      fontSize: "3rem",
      marginBottom: "1rem",
      color: "#f44336",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>
          <i className="fa fa-lock" />
        </div>
        <h1 style={styles.heading}>You are not logged in!</h1>
        <p>Please log in to access this page.</p>
        <div style={{ marginTop: "2rem" }}>
          <button
            style={styles.button}
            onClick={() => navigate("/")}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Go to Login page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
