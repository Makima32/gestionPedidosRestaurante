import "./NoEcontrado.css"
import React from 'react';

function NoEncontrado() {
    
    return(
    <>
    
        <div className="NoEncontrado_div_father">
            <div className="error-content">
                <span className="error-code">404</span>
                
                <h1 className="main-message">
                    Página No Encontrada
                </h1>
                
                <p className="sub-message">
                    Lo sentimos, la URL que estás buscando no existe. ¿Es correcta la dirección?
                </p>

                <a href="/" className="home-button">
                    Ir a la Página de Inicio
                </a>
            </div>
        </div>
    </>
    )
}

export default NoEncontrado;