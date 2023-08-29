import React from "react";
import "./css/listarData.css";

const Listados = (props) => {
  console.log("props en listar registros =>", props.mostrarListados);
  return (
    <div>
      {props.mostrarListados.map((item) => (
        <div>
          <p>{item.lugarDeFormación}</p>
          <p>{item.categoria}</p>
          <p>{item.fechaInicio}</p>
          <p>{item.fechaFin}</p>
          <p>{item.tituloEstudio}</p>
        </div>
      ))}
    </div>
  );
};

export default Listados;
