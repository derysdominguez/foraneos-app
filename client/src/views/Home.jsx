import React from 'react'
import BarraLateral from '../components/barraLateral'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderTitle from '../components/Reportes/header'
import BodyReport5 from '../components/Reportes/rep5/bodyReport5'

function Home() {
  return (
    <>
            <Container fluid>
                <Row>
                    <Col className="bg-control min-vh-100 min-vh d-flex rounded-end-nav " xs sm={3} md={3} lg={3} xl={2}>
                        <BarraLateral></BarraLateral>
                    </Col>
                    <Col className="px-5 py-4" xs sm={9} md={9} lg={9} xl={10} >
                      <HeaderTitle titulo="Reportes" usuario="Admin"></HeaderTitle>

                      <div className="container bg-white mt-4">
                          <h1>ganancias</h1>
                          <BodyReport5 />
                      </div>
                    </Col>
                </Row>

                
            </Container>
        </>
  )
}

export default Home