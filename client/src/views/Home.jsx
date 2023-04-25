import React,{ useState, useEffect } from 'react'
import BarraLateral from '../components/barraLateral'
import { Col, Container, ListGroup, Row, Toast, ToastContainer } from 'react-bootstrap'
import HeaderTitle from '../components/Reportes/header'
import LineChart from '../components/Reportes/rep5/graficoLinea'

function Home() {
  const url = 'https://apimocha.com/foraneos-app/rep5'
  const [ganancias, setGanancias] = useState()
  const [showMsg, setShowMsg] = useState(true)

  const toggleShowMsg = () => setShowMsg(!showMsg);

  const api = async () => {
    try {
        const response = await fetch(url);
        const lbJSON = await response.json();

        const soloGanancias = lbJSON.map(item => {
            const {ingresos, egresos, ...resto} = item
            return resto
        })

        setGanancias(soloGanancias)
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=> {
    api()
  }, []) 

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="bg-control min-vh-100 min-vh d-flex rounded-end-nav " xs sm={3} md={3} lg={3} xl={2}>
            <BarraLateral></BarraLateral>
          </Col>
          <Col className="min-vh-100 min-vh d-flex px-5 py-4" xs sm={9} md={9} lg={9} xl={10} >
            <div className='d-flex flex-column w-100 align-items-center gap-4'>
              <HeaderTitle/>      
              {/* Este es el body */}
              <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
                <Container>
                  <Row className='mb-4'>
                    <Col className='bg-color-brand text-white w-100 p-3 rounded d-flex justify-content-between align-items-center'>
                      <h4 className='fs-4 m-0 fw-bold'>Actividades recientes</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={8} md={8} className='shadow-lg p-3 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
                      <div className='overflow-auto mt-1 w-100'>
                        <LineChart data={ganancias ? ganancias : [{'Estado': 0}]} />
                      </div>
                    </Col>
                    <Col sm={4} md={4}>
                      <div className='shadow-lg p-4 rounded'>
                        <h4 className='fs-5 m-0 fw-bold mb-3'>Ingresos recientes</h4>
                        <div className='shadow bg-color-brand p-3 text-white rounded'>
                          <ListGroup>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                          </ListGroup>
                        </div>
                        <h4 className='fs-5 m-0 fw-bold my-3'>Egresos recientes</h4>
                        <div className='shadow bg-color-brand p-3 text-white rounded'>
                          <ListGroup>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                            <ListGroup.Item className='list-group-item list-group-item-action d-flex justify-content-between align-items-start'>An item<span className="badge bg-primary rounded-pill">L. 12000</span></ListGroup.Item>
                          </ListGroup>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div> 
            </div>
          </Col>
        </Row>
        <ToastContainer
          className="p-3"
          position={'bottom-end'}
          style={{ zIndex: 1 }}
        >
          <Toast show={showMsg} onClose={toggleShowMsg}>
            <Toast.Header closeButton={true} >
              <strong className="me-auto">Bienvenido</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Ya puedes empezar a usar SJBS Contable </Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  )
}

export default Home