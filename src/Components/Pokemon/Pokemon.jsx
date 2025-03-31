import "./Pokemon.css";
import { Link } from "react-router-dom";

function Pokemon({ name, image,id }) {
  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${id}`} className="pokemon-card-link">
      <div className="pokemon-card-image">
        <img src={image} />
      </div>
      <div className="pokemon-card-name">{name}</div>
      </Link>
    </div>
  );
}

export default Pokemon;
