import { NavLink } from "react-router-dom";
import img from "../../assets/pictures/img.jpeg"

interface CardProps {
    name: string;
    difficults: string;
    id: string;
    image?: string;
}

const Card: React.FC<CardProps> = ({ name, difficults, id, image }) => {
    return (
        <div>
            <div>
                <img
                    src={image ? image: img }
                    alt="Imagen"
                />
                <div>
                    <p>{id}</p>
                    <h1>{name}</h1>
                    <p>{difficults}</p>
                    {/* <NavLink to={`/detail/${id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                        <button>Detail</button>
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
};

export default Card;