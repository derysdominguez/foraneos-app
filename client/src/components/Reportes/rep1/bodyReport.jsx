import React from "react";
import TableRep1 from "./dataTable";

function BodyReport1() {
    
    return(
        <div className=' hsizing-control w-100 h-50 overflow-auto p-2 d-flex flex-wrap rounded align-items-center justify-content-center'>
            <div className=' col-12 mt-1 h-100'>
                <TableRep1 nombre={'Ingresos'} />
                <TableRep1 nombre={'Egresos'}/>
            </div>
        </div>
    )
}

export default BodyReport1;