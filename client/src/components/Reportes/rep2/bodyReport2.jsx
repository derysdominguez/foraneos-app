import React from "react";
import TableRep2 from "./dataTableReport";

function BodyReport2() {
    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100'>
                <TableRep2></TableRep2>
            </div>
        </div>
    )
}

export default BodyReport2