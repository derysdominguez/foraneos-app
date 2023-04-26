import React from "react";
import {Container, Row, Col} from "react-bootstrap";

/* import { Link } from "react-router-dom"; */
import {BsPersonCircle} from 'react-icons/bs'


function HeaderTitle({titulo, usuario}) {
    return (
        <div className='headerTitle bg-white w-100 p-4 rounded d-flex align-items-center'>
            <Container fluid>
                <Row>
                    <Col xs={9}>
                        <h5>{titulo}</h5>
                    </Col>
                    <Col xs={3} className='d-flex flex-row align-items-center justify-content-end'>
                        <BsPersonCircle className='fs-3 me-3'/>
                        <span>{usuario}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderTitle;