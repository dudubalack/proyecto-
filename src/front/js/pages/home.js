import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import UltimoPost from "../component/ultimopost";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="col-6 mx-auto">
				<img className="img-fluid" src="https://us.123rf.com/450wm/vectorlab/vectorlab1903/vectorlab190300070/123179662-grupo-de-cient%C3%ADficos-de-laboratorio-estudio-del-cerebro-humano-y-la-psicolog%C3%ADa-microscopio-de-invest.jpg"/>
			</div>
			<UltimoPost/>
		</div>
	);
};
