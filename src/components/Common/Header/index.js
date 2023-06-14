
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import TemporaryDrawer from "./drawer";
import "./styles.css";

function Header() {
  return (
    <div className="navbar">
<h1 className="logo">
    CryptoTracker <span style={{color:"var(--blue)"}}>.</span></h1>
    <div className="links">
        <Link to="/">
        <p className="link">Home</p>
        </Link>
        <Link Link to="/compare">
        <p className="link">Compare</p>
        </Link>
        <Link Link to="/watchlist">
        <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
           <Button text={"Dashboard"} 
           outlined={true}
           onclick={()=>console.log("Btn clicked")}></Button>
            </Link>
    </div>
    <div className="mobile-drawer">
        <TemporaryDrawer />
    </div>
    </div>
  );
}

export default Header;