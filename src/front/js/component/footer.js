import React, { Component } from "react";

export const Footer = () => (
	<div class="footer-dark">
		<footer>
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-3 item">
					<h3>SERVICIOS</h3>
					<ul>
						<li><a href="#">Web design</a></li>
						<li><a href="#">Development</a></li>
						<li><a href="#">Hosting</a></li>
					</ul>
				</div>
				<div class="col-sm-6 col-md-3 item">
					<h3>ACERCA</h3>
					<ul>
						<li><a href="#">COMPAÑIA</a></li>
						<li><a href="#">EQUIPO</a></li>
						<li><a href="#">CARRERAS</a></li>
					</ul>
				</div>
				<div class="col-md-6 item text">
					<h3>PROYECTO FINAL 4geeks.com</h3>
					<p>Un centro de ayuda para personas que sufren de depresión, donde el usuario puede encontrar la siguiente ayuda en nuestra página:
grupos profesionales y de apoyo donde estas personas puedan estar ayudándose e indicando esta pequeña ayuda.</p>
				</div>
				<div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
			</div>
			<p class="copyright">PROYECTO FINAL 4geeks.com © 2023</p>
			</div>
        </footer>
    </div>
);
