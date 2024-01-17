import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import CheckBox from "../../components/Checkbox/Checkbox";
import "./HomePage.scss";
import Table from "../../components/Table/Table";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userData");

  if (!user) {
    window.location.href = "/";
    alert("Please fill the details to access this page");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <section className="data-container">
      <div className="data-container__main">
        <div className="data-container__btn-container">
          <Button onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </div>
        <div className="components">
          <div className="component__table">
            <h3>Table</h3>
            <Table />
          </div>
          <div className="component__checkbox">
            <h3>Checkbox Tree</h3>
            <CheckBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
