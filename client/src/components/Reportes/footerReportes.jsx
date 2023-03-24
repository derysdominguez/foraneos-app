import React from "react";
import BarChart from "../graficaReportes";


function FooterReportes() {
    return (
        <div className='bodyText bg-white w-100 h-30 p-4 rounded d-flex flex-column'>
            <h5 className="mb-3">Flujo de ganancias actual:</h5>
            <div className="h-100">
                <BarChart></BarChart>
            </div>
        </div>
    );
}

export default FooterReportes;