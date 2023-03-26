import React from "react";
import TableRep3 from "./tableData";


function BodyReport3() {
    /* Es ejemplo, mandas el arreglo de objetos   */
    const dataTable = {
        'ingresosMensualidad': 300000,
        'ingresoMatriculas': 20000, 
        'diasDeColor': 5000, 
        'otros': 1200, 
        'sueldosYsalariosAdmin': 60000, 
        'comunicacionAdmin': 3000, 
        'gastosPublicos': 8000, 
        'materialDidacticoAdmin': 1500, 
        'gastosPorViajes': 4000, 
        'honorariosAdmin': 2000, 
        'otrosGastosDeAdministracion': 560, 
        'sueldosYsalariosVentas': 200000, 
        'comunicacionVentas': 1200, 
        'materialDidacticoVentas': 10000, 
        'gastosPorViajesVentas': 8000, 
        'honorariosVentas': 4000, 
        'otrosGastosDeVentas': 4656, 
        'otrosGastos': 3000
    };
    
    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100'>
                <TableRep3 dataTable = {dataTable} />
            </div>
        </div>
    )
}

export default BodyReport3