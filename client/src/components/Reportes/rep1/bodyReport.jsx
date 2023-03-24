import React from "react";
import TableRep1 from "./dataTable";

function BodyReport1() {
    
    return(
        <div className='w-100 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-control-divTables overflow-auto'>
                <TableRep1 nombre={'Ingresos'} />
                <TableRep1 nombre={'Egresos'}/>
            </div>
        </div>
    )
}

export default BodyReport1;