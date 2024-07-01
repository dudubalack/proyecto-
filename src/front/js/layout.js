import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Register from "../pages/register"; // Ajusta la ruta según la ubicación real de Register.js
import { Login } from "./pages/login";
import Crearpost from "./pages/crearpost";
import ListadoPost from "./pages/listadopost";
import DetalleDePost from "./pages/detalledepost";
import EditPost from "./pages/editpost";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Crearpost />} path="/crear-post" />
                        <Route element={<ListadoPost />} path="/listado-post" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<DetalleDePost />} path="/post/:id" />
                        <Route element={<EditPost />} path="/edit/:id" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
