import React, { useState } from "react";
import "./css/form.css"; // Archivo de estilos CSS

const Formulario = (props) => {
  const estadoInicialFormulario = {
    lugar: "",
    categoria: "",
    titulo: "",
    fechaInicio: "",
    fechaFin: "",
  };

  const registrarInformacion = async (e) => {
    e.preventDefault();
    console.log(formulario);

    try {
      const result = await props.contrato.methods
        .crearRegistro(
          formulario.categoria,
          formulario.fechaInicio,
          formulario.fechaFin,
          formulario.lugar,
          formulario.titulo
        )
        .send({ from: props.direccion });
      console.log(result);
    } catch (error) {
      console.error(error);
      
    }
  };

  const ManejarFormulario = ({ target: { name, value } }) => {
    console.log(name, value);
    setFormulario({ ...formulario, [name]: value });
  };

  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={registrarInformacion}>
          <label htmlFor="lugar">Lugar de formación</label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            onChange={ManejarFormulario}
            value={formulario.lugar}
            required
          />
          <span id="alert">
            {formulario.lugar.length >= 8 ? "" : "Campo requerido"}
          </span>

          <br />

          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            onChange={ManejarFormulario}
            value={formulario.categoria}
            required
          />
          <span id="alert">
            {formulario.categoria.length >= 8 ? "" : "Campo requerido"}
          </span>

          <br />

          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            onChange={ManejarFormulario}
            value={formulario.titulo}
            required
          ></input>
          <span id="alert">
            {formulario.titulo.length >= 8 ? "" : "Campo requerido"}
          </span>

          <br />

          <label htmlFor="fechaInicio">Fecha de Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            onChange={ManejarFormulario}
            value={formulario.fechaInicio}
            required
          ></input>
          <br />

          <label htmlFor="fechaFin">Fecha de finalización</label>
          <input
            type="date"
            id="fechaFin"
            name="fechaFin"
            onChange={ManejarFormulario}
            value={formulario.fechaFin}
            required
          ></input>
          <br />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
