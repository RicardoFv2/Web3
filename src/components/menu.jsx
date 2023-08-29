import React from "react";
import './css/menu.css';
import cerdo from './img/cerdoIcon.png';

export default function Menu(props) {


    return (
        <div>
            <header className="header">
                <img src={cerdo} alt="" className="logo" />
                <nav className="nav-bar">
                    <ul className="nav-links">
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">NTFs</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="#" id="direccion" >Dirección: {props.mostrarDireccion}</a></li>
                        <li><a href="#" id="balance" >Balance: {props.mostrarBalance}</a></li>
                        
                        <li><button className="connect-button" onClick={props.conectarWallet}>Connect Wallet</button></li>
                    </ul>
                </nav>
            </header>

        </div>
    )
};
