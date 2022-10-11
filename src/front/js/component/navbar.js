import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          LOGO
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
              <Link className="nav-link active" aria-current="page" to={"/"}>
                INICIO
              </Link>
            </li>
            <li className="nav-item">
                  <button
                    className="nav-link btn btn-light"
                    onClick={() => {
                      navigate("/listado-post");
                    }}
                  >
                    VISUALIZAR POST
                  </button>
                </li>
            {!store.token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    REGISTRO
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-light"
                    onClick={() => {
                      navigate("/crear-post");
                    }}
                  >
                    CREAR POST
                  </button>
                </li>
                <li className="nav-item">
                <button
                  className="nav-link btn btn-light"
                  onClick={() => {
                    actions.Logout();
                    navigate("/");
                  }}
                >
                  CERRAR SESION
                </button>
              </li>
            </>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
