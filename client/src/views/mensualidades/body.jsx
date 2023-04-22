import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { BiBookAdd } from "react-icons/bi";
import TableBtn from '../tablas';

const Body = () => {
    const [showModal, setShowModal] = useState(false);
    const [valor, setValor] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const url = 'https://apimocha.com/foraneos-app/rep4'
    const [data, setData] = useState()

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();
            const filter = lbJSON.map(({grado, codigo, nombre ,mensualidad,...resto}) =>
                ({grado, nombre, codigo, mensualidad})
            )
            setData(filter)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {
        api()
    }, []) 



    return (
        <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
            <div className='bg-color-brand w-100 p-3 rounded text-white d-flex justify-content-between align-items-center'>
                <span>Pago de mensualidades</span>
                <Button className='d-flex align-items-center fw-bold' variant="light" onClick={handleShow}>
                    <BiBookAdd className='me-2'/>
                    <span>
                        Nuevo mensualidad
                    </span>
                </Button>
            </div>
            <div className='w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
                <div className='col-12 mt-1 w-100 h-libroContable'>
                    <TableBtn data={data ?  data : [{'Estado': 'Cargando...'}]}/>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo ingreso de mensualidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type='text'  placeholder="Nombre del asiento"></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Ingrese una descripcion completa del asiento"></Form.Control>
                        </Form.Group> 
                        <Form.Group className='mb-3'>
                            <Form.Label>Movimiento</Form.Label>
                            <Form.Select>
                                <option>Deudor</option>
                                <option>Acreedor</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Monto</Form.Label>
                            <Form.Control type='text' placeholder="2500 < Monto < 7500" min={2500} max={75000}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Ingresar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Body;
