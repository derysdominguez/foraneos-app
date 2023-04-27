import React, { useState } from 'react';
import {Table, Button, Modal, Form} from 'react-bootstrap';
import {AiOutlineEdit} from 'react-icons/ai'

function TableBtn(props) {
    const { valor } = props;
    const [showModal, setShowModal] = useState(false);
    const [dateMen, setDateMen] = useState([{}])

    const data = valor.map(({ codigo, nombre ,mensualidad,...resto}) =>
        ({codigo, nombre, mensualidad})
    )

    const meses = valor.map(({grado, codigo, nombre ,mensualidad,...resto}) =>
        ({...resto})
    )   

    
    const handleClose = () => setShowModal(false);

    const handleShow = (va) => {
        setDateMen(meses[va])
        setShowModal(true)
    }

    const renderTableHeader = () => {
        return (
        <thead>
            <tr>
            {Object.keys(data[0]).map((key) => {
                return <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</th>;
            })}
            <th className='text-center'>Accion</th>
            </tr>
        </thead>
        );
    };

    const renderTableRows = () => {
        return (
            <tbody>
                {data.map((item, index) => {
                    const key = `row-${index}`;
                    return (
                        <tr key={key}>
                            {Object.values(item).map((value, index) => {
                                const key = `col-${index}`;
                                return <td key={key}>{value}</td>;
                            })}
                            <td className='d-flex gap-1 justify-content-center'>
                                <Button variant='warning' onClick={()=> handleShow(index)}><AiOutlineEdit/></Button>
                            </td>
                        </tr>
                        
                    );
                })}
            </tbody>
        );
    };
    
    const renderModal = () => {
        return(
            <Modal show={showModal} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Datos del alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(dateMen).map((propiedad, index) => (
                            <Form.Group key={index} className='mb-3 d-flex'>
                                <Form.Label className='d-flex col-2 align-items-center m-0'><span>{propiedad}</span></Form.Label>
                                <Form.Control className='col' type="date" value={dateMen[propiedad] ? dateMen[propiedad] : '-'}/>
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <>
            <Table striped bordered hover>
                {renderTableHeader()}
                {renderTableRows()}
            </Table>
            {renderModal()}
        </>
    );
}

export default TableBtn;
