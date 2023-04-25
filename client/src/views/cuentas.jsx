import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BarraLateral from '../components/barraLateral';
import Body from './cuentas/body';
import HeaderTitle from '../components/Reportes/header'

const Cuentas = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-control min-vh-100 min-vh d-flex rounded-end-nav " xs sm={3} md={3} lg={3} xl={2}>
                        <BarraLateral/>
                    </Col>
                    <Col className="min-vh-100 min-vh d-flex px-5 py-4" xs sm={9} md={9} lg={9} xl={10} >
                        <div className='d-flex flex-column w-100 align-items-center gap-4'>
                            <HeaderTitle/>
                            <Body></Body>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Cuentas;
