import React, { useState } from 'react';
import {FormSelect} from 'react-bootstrap';
function BecaSelect(props) {

  const handleChange = (event) => {
    const selectedBeca = event.target.value;
    props.onBecaChange(selectedBeca);
  }

  return (
      <FormSelect className="mb-3" onChange={handleChange}>
        <option disabled selected value="00">Seleccione un tipo de beca</option>
        {props.opcionTodos? <option value="todos">Mostrar todos</option> : "" }
        <option value="Completa">Completa</option>
        <option value="Media Beca">Media Beca</option>
        <option value="Sin Beca">Sin Beca</option>
      </FormSelect >
  );
}

export default BecaSelect;