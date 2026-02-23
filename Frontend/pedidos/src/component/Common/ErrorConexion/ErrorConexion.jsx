
function ErrorConexion({ onRetry }) {
    return (
        <div className="NoEncontrado_div_father">
            <div className="error-content">
                <span className="error-code">503</span>
                
                <h1 className="main-message">
                    ¡Vaya! El horno está apagado
                </h1>
                
                <p className="sub-message">
                    No hemos podido conectar con el servidor. Revisa tu conexión a internet o intenta recargar la página.
                </p>
            
                <button 
                    onClick={onRetry} 
                    className="home-button" 
                    style={{ border: 'none', cursor: 'pointer' }}
                >
                    Intentar de nuevo
                </button>
            </div>
        </div>
    );
}

export default ErrorConexion;