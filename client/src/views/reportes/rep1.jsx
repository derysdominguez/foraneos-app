import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import BarraLateral from '../../components/barraLateral'
import HeaderTitle from '../../components/Reportes/header'
import HeaderReport from '../../components/Reportes/headerReport'
import BodyReport1 from '../../components/Reportes/rep1/bodyReport'
import {BsPrinter, BsArrowLeftCircle} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import BtnInferiores from './imprimir'

function Rep1() {
    const Title = 'Listado de ingresos y egresos'
    const Subtitle = 'Mes de marzo'
    const fechaEmision = '25/3/2023'
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-control min-vh-100 min-vh d-flex rounded-end-nav " xs md={3} lg={3} xl={2}>
                        <BarraLateral></BarraLateral>
                    </Col>
                    <Col className="min-vh-100 min-vh d-flex px-5 py-4" xs md={9} lg={9} xl={10} >
                        <div className='d-flex flex-column w-100 align-items-center gap-4'>
                            <HeaderTitle></HeaderTitle>
                            <div className='bodyText bg-white w-100 h-control p-4 rounded d-flex align-items-center d-flex gap-2 flex-wrap justify-content-evenly'>
                                {/* Hacer a componente body report */}
                                <HeaderReport title={Title} subtitle={Subtitle} dateReport={fechaEmision}></HeaderReport>
                                {/* Cuerpo del report */}
                                <BodyReport1 ></BodyReport1>
                                {/* Convertir a componente */}
                                <BtnInferiores></BtnInferiores>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rep1