import "./NoEcontrado.css"
import React from 'react';

function NoEncontrado() {
    
    return(
    <>
        <div className="NoEncontrado_div_father">
            <div className="error-content">
                {/* Código de error grande y destacado */}
                <span className="error-code">404</span>
                
                {/* Mensaje principal (título original) */}
                <h1 className="main-message">
                    Página No Encontrada
                </h1>
                
                {/* Mensaje secundario con contexto */}
                <p className="sub-message">
                    Lo sentimos, la URL que estás buscando no existe. ¿Es correcta la dirección?
                </p>

                {/* Botón de acción */}
                <a href="/" className="home-button">
                    Ir a la Página de Inicio
                </a>
            </div>
        </div>
    </>
    )
}

export default NoEncontrado;