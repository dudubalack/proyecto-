import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>crea un post</h1>
			<Link to={"/crear-post"}>
			<button className="btn btn-secondary">crear post</button>
			</Link>
		</div>
	);
};
