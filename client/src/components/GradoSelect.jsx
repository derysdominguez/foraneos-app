import React, { useState } from 'react';
import {FormSelect} from 'react-bootstrap';
function GradoSelect(props) {

  const handleChange = (event) => {
    const selectedGrado = event.target.value;
    props.onGradoChange(selectedGrado);
  }

  return (
      <FormSelect className="mb-3" onChange={handleChange}>
        <option disabled selected value="00">Seleccione un grado</option>
        {props.opcionTodos? <option value="todos">Mostrar todos</option> : "" }
        <option value="kinder">Kinder</option>
        <option value="preparatoria">Preparatoria</option>
        <option value="primero">Primero</option>
        <option value="segundo">Segundo</option>
        <option value="tercero">Tercero</option>
        <option value="cuarto">Cuarto</option>
        <option value="quinto">Quinto</option>
        <option value="sexto">Sexto</option>
        <option value="septimo">Séptimo</option>
        <option value="octavo">Octavo</option>
        <option value="noveno">Noveno</option>
        <option value="decimo">Décimo</option>
        <option value="undecimo">Undécimo</option>
      </FormSelect >
  );
}

export default GradoSelect;