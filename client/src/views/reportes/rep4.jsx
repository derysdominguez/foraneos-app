import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BarraLateral from "../../components/barraLateral";
import HeaderTitle from "../../components/Reportes/header";
import HeaderReport from "../../components/Reportes/headerReport";
import BodyReport4 from "../../components/Reportes/rep4/bodyReport4";
import BtnInferiores from "./imprimir";

function Rep4() {
    const Title = 'Reporte de mensualidades'
    const Subtitle = 'Por grado'
    const fechaEmision = '28/3/2023'
    return(
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
                                <BodyReport4></BodyReport4>
                                {/* Botones inferiores */}
                                <BtnInferiores></BtnInferiores>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rep4;