import React from "react";
import TableGenerator from "../tablaGenerator";
import TableRep2 from "./dataTableReport";

function BodyReport2() {
    /* Es ejemplo, mandas el arreglo de objetos   */
    const data = [
        {
            'No.': 1,
            'Acreedor': 'Banco Ficohsa', 
            'Cuota': 6500, 
            'Tasa de intereses' : '5%', 
            'Fecha de adquisicion' : '18/06/2022', 
            'Fecha de finalizacion' : '30/06/2022',
            'Valor' : 6000
        }
    ];

    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100'>
                {/* <TableRep2></TableRep2> */}
                <TableGenerator data = {data}/>
            </div>
        </div>
    )
}

export default BodyReport2