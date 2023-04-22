import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import BarraLateral from '../components/barraLateral'
import HeaderTitle from '../components/Reportes/header'
import BodyReportes from '../components/Reportes/bodyReportes'
import FooterReportes from '../components/Reportes/footerReportes'


function Reportes() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-control min-vh-100 min-vh d-flex rounded-end-nav " xs sm={3} md={3} lg={3} xl={2}>
                        <BarraLateral></BarraLateral>
                    </Col>
                    <Col className="min-vh-100 min-vh d-flex px-5 py-4" xs sm={9} md={9} lg={9} xl={10} >
                        <div className='d-flex flex-column w-100 align-items-center gap-4'>
                            <HeaderTitle titulo="Reportes" usuario="Admin"></HeaderTitle>
                            <BodyReportes></BodyReportes>
                            <FooterReportes></FooterReportes>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Reportes