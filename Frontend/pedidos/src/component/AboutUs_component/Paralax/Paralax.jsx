import "./Paralax.css";

function Paralax({ img }) {
    return (
        <div className="paralax" style={{ backgroundImage: `url(${img})` }}>
        </div>
    );
}

export default Paralax;
