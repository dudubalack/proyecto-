import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-blue" to={"/"}>
          <img 
          width={100}
          src="https://www.heart.org/-/media/Images/News/2021/May-2021/0525BHDepressionHeart_SC.jpg"/>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-blue" aria-current="page" to={"/"}>
              INICIO
              </Link>
            </li>
            <li className="nav-item">
                  <button
                    className="nav-link btn btn-light text-blue"
                    onClick={() => {
                      navigate("/listado-post");
                    }}
                  >
                    VER POST
                  </button>
                </li>
            {!store.token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-blue" to={"/register"}>
                  REGISTRO
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-blue" to={"/login"}>
                  LOG IN
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-light text-blue"
                    onClick={() => {
                      navigate("/crear-post");
                    }}
                  >
                    CREAR POST
                  </button>
                </li>
                <li className="nav-item">
                <button
                  className="nav-link btn btn-light text-blue"
                  onClick={() => {
                    actions.Logout();
                    navigate("/");
                  }}
                >
                  SIGN OFF
                </button>
              </li>
            </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
