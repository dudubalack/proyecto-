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
				<h2>STUCK ON YOU</h2>
				<img className="img-fluid" src="https://us.123rf.com/450wm/vectorlab/vectorlab1903/vectorlab190300070/123179662-grupo-de-cient%C3%ADficos-de-laboratorio-estudio-del-cerebro-humano-y-la-psicolog%C3%ADa-microscopio-de-invest.jpg"/>
			</div>
			<div className="col-12 col-md-10 mx-auto">
			<div className="row">
				<h3>¿QUIENES SOMOS?</h3>
				
				<div className="col-12 col-md-3">
				<img className="img-fluid" src="https://psicologiaonline.com.mx/wp-content/uploads/2020/05/15991605473_cda10ef99a_z.jpg"/>
				</div>
				<div className="col-12 col-md-9">
				¿Quienes somos nosotros? 
				Nosotros somos, una pagina de ayuda para personas que sufren de depresión que se llama STUCK ON YOU .
				¿Que significa? en Español PEGADO EN TI, el título surgió para que cuando el usuario busque saber el por qué del título de la página, pueda desde ese momento reflexionar y 
				comenzar con esta idea una nueva etapa para pensar su punto de ubicarse en el mundo en la vida. 
				Estar pegado en ti, y quedar pegado o hacerte prisionero de ti mismo, "porque esto que para mi significa" culpándote de alguna injusticia contra ti, contra alguien y 
				olvidando que hay varias personas que están pasando por lo mismo que tú, es decir, si das tu testimonio de vida, 
				comparte tu problema tal vez no, estoy seguro de que ayudes o hagas que alguien sea menos injusto consigo misma.
				</div>
			</div>
			</div>
			
			<UltimoPost/>
		</div>
		
	);
};

