import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [productId, SetproductId] = useState({});

  useEffect(() => {
    /*
    axios
      .get(`https://pf-back-deploy.onrender.com/product/${id}`)
      .then(({ data }) => {
        SetproductId(data);
      })
      .catch((error) => {
        alert("Error al obtener los detalles de videogame:", error);
      });
    */
      axios
      .get(`http://localhost:3001/product/${id}`)
      .then(({ data }) => {
        console.log("LA DATA: " + JSON.stringify(data));
        SetproductId(data);
      })
      .catch((error) => {
        alert("Error al obtener los detalles de videogame:", error);
      });

  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="product-name">{productId.name}</h1>
        <img
          className="product-image"
          src={productId.image}
          alt={productId.id}
        />
        <h3 className="product-brand">{productId.brand}</h3>
        <h3 className="product-category">{productId.category}</h3>
        <h3 className="product-description">{productId.description}</h3>
        <h3 className="product-price">{productId.price}</h3>
      </div>
    </div>
  );
};

export default Detail;
