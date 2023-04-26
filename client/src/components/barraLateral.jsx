import React from "react";
import {Nav} from "react-bootstrap";
/* import { Link } from "react-router-dom"; */
import {BsFolderFill, BsHouseDoorFill, BsClipboardDataFill, BsFillPeopleFill, BsFillCalendarCheckFill, BsLayersFill} from 'react-icons/bs'
import Logo from "../assets/styles/img/logo.png"

function BarraLateral() {
    

    return (
        <Nav style={{width: '100%'}} defaultActiveKey="/" as="ul" className="d-flex flex-column">
            <Nav.Item as="li" className="mt-3 mb-5 d-flex justify-content-center">
                <Nav.Link href="/home" className="text-white d-flex justify-content-center">
                    <img className="fluid" style={{width: '70%'}} src={Logo}></img>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/home" eventKey="link-1" className="text-white fs-6 d-flex align-items-center">
                    <BsHouseDoorFill className="me-3"/>
                    Inicio
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/libroContable" eventKey="link-1" className="text-white fs-6 d-flex align-items-center">
                    <BsFolderFill className="me-3"/>
                    Libro Contable
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/reportes" eventKey="link-2" className="text-white fs-6 d-flex align-items-center">
                    <BsClipboardDataFill className="me-3"/>
                    Reportes
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/mensualidad" eventKey="link-2" className="text-white fs-6 d-flex align-items-center">
                    <BsFillCalendarCheckFill className="me-3"/>
                    Mensualidades
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/cuentas" eventKey="link-2" className="text-white fs-6 d-flex align-items-center">
                    <BsFillCalendarCheckFill className="me-3"/>
                    Cuentas contables
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/cancelacion" eventKey="link-2" className="text-white fs-6 d-flex align-items-center">
                    <BsFillCalendarCheckFill className="me-3"/>
                    Cancelacion de Matrícula
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/deudas" eventKey="link-2" className="text-white fs-6 d-flex align-items-center">
                    <BsFillCalendarCheckFill className="me-3"/>
                    Deudas
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="mb-3 ms-2 b-sizing">
                <Nav.Link href="/alumnos" eventKey="link-2" className="text-white fs-6 d-flex align-items-center">
                    <BsFillCalendarCheckFill className="me-3"/>
                    Alumnos
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default BarraLateral;
