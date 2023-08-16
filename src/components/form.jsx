import React from "react";
import "./form.css"; // Archivo de estilos CSS

const Formulario = () => {
  return (
    <div className="App">

      <div className="container">
        <form>
          <label htmlFor="nombre">Lugar de formación</label>
          <input type="text" id="nombre" required />
          
          <br />

          <label htmlFor="categoria">Categoria</label>
          <input type="text" id="categoria" required />
          <br />

          <label htmlFor="titulo">Titulo</label>
          <input type="text" id="titulo" required></input>
          <br />

          <label htmlFor="fechaInicio">Fecha de Inicio</label>
          <input type="date" id="fechaInicio" required></input>
          <br />

          <label htmlFor="fechaFinal">Fecha de finalización</label>
          <input type="date" id="fechaFinal" required></input>
          <br />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
};

export default Formulario;
