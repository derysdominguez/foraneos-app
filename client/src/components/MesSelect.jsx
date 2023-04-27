import React, { useState } from 'react';
import {FormSelect} from 'react-bootstrap';
function MesSelect(props) {

  const handleChange = (event) => {
    const selectedMes = event.target.value;
    props.onMesChange(selectedMes);

    const subtitle = document.getElementById('header-subtitle');
    subtitle.innerText = 'Mes #' + selectedMes;
  }

  return (
      <FormSelect className="mb-3" onChange={handleChange} id='meses'>
        <option disabled selected value="00">Seleccione un mes</option>
        <option value="01">Enero</option>
        <option value="02">Febrero</option>
        <option value="03">Marzo</option>
        <option value="04">Abril</option>
        <option value="05">Mayo</option>
        <option value="06">Junio</option>
        <option value="07">Julio</option>
        <option value="08">Agosto</option>
        <option value="09">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </FormSelect >
  );
}

export default MesSelect;