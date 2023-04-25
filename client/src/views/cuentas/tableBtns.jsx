import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AiOutlineEdit } from 'react-icons/ai';

function TableGenerator(props) {
    const { data } = props;
    const [dataSelected, setDataSelected] = useState()
    
    /**
     * ? Modals config 
     */


    const [showModal, setShowModal] = useState(false);
    const handleCloseCuenta = () => {
        setShowModal(false)
    }

    const handleShow =  (dataVer) => {
        setDataSelected(data[dataVer])
        setShowModal(true)
    }

    /**
     * ? configuraciones de forms
     */

    const handleChange = () =>{

    }

    /**
     * ? Datos Actualizados
     */

    const handleSubmit = () => {

    }

    const renderTableHeader = () => {
        return (
        <thead>
            <tr>
            {Object.keys(data[0]).map((key) => {
                return <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</th>;
            })}
            <th className='text-center'>Acciones</th>
            </tr>
        </thead>
        );
    };

    const renderTableRows = () => {
        return (
        <tbody>
            {data.map((item, index) => {
            // Generar una clave única
            const key = `row-${index}`;
    
            return (
                <tr key={key}>
                    {Object.values(item).map((value, index) => {
                        const key = `col-${index}`;
                        return <td key={key}>{value}</td>;
                    })}
                    <td className='d-flex gap-1 justify-content-center'>
                        <Button variant='warning' onClick={()=>handleShow(index)}><AiOutlineEdit/></Button>
                        <Button variant='warning' ><AiOutlineEdit/></Button>
                    </td>
                </tr>
            );
            })}
        </tbody>
        );
    };

    
    const renderModal = () => {
        return (
            <Modal show={showModal} onHide={handleCloseCuenta} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Creacion de cuentas</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-3'>
                    <div className='col py-2 px-4'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control name='codigo' value={dataSelected ? dataSelected.codigo : 'Cargando'} type='text' placeholder="Ingrese "></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control name='nombre' type='text' value={dataSelected ? dataSelected.nombre : 'Cargando'} placeholder="Ingrese "></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Clasificacion</Form.Label>
                                <Form.Select name='clasificacion' value={dataSelected ? dataSelected.clasificacion : 'Cargando'}>
                                    <option value={'activo'}>Activos</option>
                                    <option value={'pasivo'}>Pasivos</option>
                                    <option value={'patrimonio'}>Patrimonios</option>
                                    <option value={'ingreso'}>Ingresos</option>
                                    <option value={'gasto-admin'}>Gastos de administracion</option>
                                    <option value={'gasto-ventas'}>Gastos de ventas</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3 d-flex gap-2'>
                                <Button className='col' variant="danger" type="button">
                                    Cancelar
                                </Button>
                                <Button className='col' variant="success" type="submit" >
                                    Finalizar 
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    
    return (
        <div>
            <Table striped bordered hover>
                {renderTableHeader()}
                {renderTableRows()}
            </Table>
            {renderModal(dataSelected ? dataSelected : [{}])}
        </div>
    );
}

export default TableGenerator;