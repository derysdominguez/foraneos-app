import React from "react";
import {Container, Row, Col} from "react-bootstrap";

import { Link } from "react-router-dom";
import {BsFillClipboard2DataFill} from 'react-icons/bs'


function BodyReportes() {
    return (
        <div className='bodyText bg-white w-100 h-50 p-4 rounded d-flex align-items-center d-flex gap-2 flex-wrap justify-content-evenly'>
            <div className="rounded shadow-lg border border-dark-subtle p-1">
                <Link to={'/reportes/rep1'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 1</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep2'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 2</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep3'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 3</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep4'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 4</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep5'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 5</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep6'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 6</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep1'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 7</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep1'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 8</h3>
                </Link> 
            </div>
            <div className="rounded shadow-lg border border-dark-subtle p-1 ">
                <Link to={'/reportes/rep1'} className="p-2 text-decoration-none text-black w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <BsFillClipboard2DataFill className="fs-1 mb-3"/>
                    <h3 className="fs-6">Reporte 9</h3>
                </Link> 
            </div>
        </div>
    );
}

export default BodyReportes;