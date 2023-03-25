import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BarraLateral from "../../components/barraLateral";
import HeaderTitle from "../../components/Reportes/header";
import HeaderReport from "../../components/Reportes/headerReport";
import BodyReport8 from "../../components/Reportes/rep8/bodyReport8";

import BtnInferiores from "./imprimir";

function Rep9() {
    const Title = 'Informe de alumnos con pago perfecto'
    const Subtitle = 'Anio lectivo 2022-2023'
    const fechaEmision = '25/3/2023'
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
                                <HeaderReport title={Title} subtitle={Subtitle} dateReport={fechaEmision} />
                                {/* Cuerpo del report */}
                                <BodyReport8 />
                                {/* Botones inferiores */}
                                <BtnInferiores />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rep9;