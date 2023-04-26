import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
function TableGenerator(props) {
    const { data } = props;

    const [valorCuenta, setValorCuentas] = useState({
        'codigo' : '', 
        'nombre' : '', 
        'clasificacion' : ''
    })

    /**
     * ? Modals config 
     */


    const [showModal, setShowModal] = useState(false);
    const handleCloseCuenta = () => {
        Swal.fire({
            title: 'Seguro que desea cancelar la operación?',
            text: "Se descartaran los datos ingresados actualmente del formulario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Abandonar', 
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleSuccess()
                setShowModal(false)
            }
        })
    }

    const handleShow =  (dataVer) => {
        setValorCuentas(data[dataVer])
        setShowModal(true)
    }

    /**
     * ? configuraciones de forms
     */

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValorCuentas((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    /**
     * ? Datos Actualizados
     */

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { codigo, nombre, clasificacion } = valorCuenta;
        let errorMsg = '';
        const equivalencias = {
            '100': 'activo',
            '200': 'pasivo',
            '300': 'patrimonio',
            '400': 'ingreso',
            '500': 'gastos-admin',
            '600': 'gastos-ventas'
        }

        if (!nombre || !clasificacion) {
            errorMsg = 'Rellene el dato de nombre y clasificación';
        } else {
            if (equivalencias[codigo.slice(0, 3)] === clasificacion) {
                if(codigo.length>=4 && codigo.length<=20){
                    try {
                        const response = await fetch(`http://localhost:4000/cuentas/${codigo}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(valorCuenta),
                        });
                        const dataCenter = await response.json();
                        console.log(dataCenter.message)
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    errorMsg = 'El codigo debe tener un tamaño minimo de 4 y maximo de 20';
                }
            }else{
                errorMsg = `El codigo no es de la clasificacion ${clasificacion}`
            }
        }
    
        if (errorMsg) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMsg,
            });
        }
    
        Swal.fire({
            icon: 'success',
            title: 'Cuenta modificada con exito',
            text: 'Revisa la tabla para mas detalles.',
        }).then(handleSuccess);    
    };

    
    const handleSuccess = () =>{
        setValorCuentas({
            'codigo' : '', 
            'nombre' : '', 
            'clasificacion' : 'pasivo'
        })
        setShowModal(false)
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

    const handleDelete = async (index) => { 
        Swal.fire({
            title: 'Eliminar',
            text: "Estas seguro de eliminar esta cuenta?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar', 
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:4000/cuentas/${data[index].codigo}`, {
                        method: 'DELETE',
                    });
                    const dataCenter = await response.json();
                } catch (error) {
                    console.log(error)
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado con exito',
                    text: 'Revisa la tabla para mas detalles.',
                })
            }
        })
    }

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
                        <Button variant='danger' onClick={()=>handleDelete(index)} ><BsFillEraserFill/></Button>
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
                                <Form.Control name='codigo' disabled value={valorCuenta.codigo} type='text' onChange={handleChange} placeholder="Ingrese "></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control name='nombre' type='text' value={valorCuenta.nombre} onChange={handleChange} placeholder="Ingrese "></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Clasificacion</Form.Label>
                                <Form.Select disabled name='clasificacion' value={valorCuenta.clasificacion} onChange={handleChange} >
                                    <option value={'activo'}>Activos</option>
                                    <option value={'pasivo'}>Pasivos</option>
                                    <option value={'patrimonio'}>Patrimonios</option>
                                    <option value={'ingreso'}>Ingresos</option>
                                    <option value={'gasto-admin'}>Gastos de administracion</option>
                                    <option value={'gasto-ventas'}>Gastos de ventas</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3 d-flex gap-2'>
                                <Button className='col' variant="danger" type="button" onClick={handleCloseCuenta}>
                                    Cancelar
                                </Button>
                                <Button className='col' variant="success" type="submit" onClick={handleSubmit}>
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
            {renderModal(valorCuenta ? valorCuenta : [{}])}
        </div>
    );
}

export default TableGenerator;