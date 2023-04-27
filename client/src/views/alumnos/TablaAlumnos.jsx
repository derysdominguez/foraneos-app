import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { BsEraserFill } from "react-icons/bs";

export function TablaAlumnos(props) {
  const { data } = props;

  const dataCompleta = data.map(({ id, becaid, ...resto }) => resto);

  const [alumnosModal, setAlumnosModal] = useState();
  const [codigoID, setCodigoID] = useState();
  const handleShowModal = (index) => {
    const { id, estado, ...enviarAlModelo } = data[index];
    setModelAlumnos(enviarAlModelo);
    setCodigoID(data[index].id);
    setAlumnosModal(true);
  };

  const grados = {
    1: "Kinder",
    2: "Preparatoria",
    3: "Primero",
    4: "Segundo",
    5: "Tercero",
    6: "Cuarto",
    7: "Quinto",
    8: "Sexto",
    9: "Séptimo",
    10: "Octavo",
    11: "Noveno",
    12: "Décimo",
    13: "Undécimo",
  };

  const handleCloseAlumnosModal = () => {
    Swal.fire({
      title: "Seguro que desea cancelar la operación?",
      text: "Se descartaran los datos ingresados actualmente del formulario!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Abandonar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setAlumnosModal(false);
        setModelAlumnos({
          nombre: "",
          codigo: "",
          grado: "",
          becaid: "",
        });
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setModelAlumnos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [modelAlumnos, setModelAlumnos] = useState({
    nombre: "",
    codigo: "",
    grado: "",
    becaid: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { codigo, nombre, grado, becaid } = modelAlumnos;
    let errorMsg = "";
    console.log(modelAlumnos);
    if (codigo && nombre && grado && becaid) {
      if (codigo.startsWith("20222023") && codigo.length === 11) {
        if (nombre.length <= 50) {
          /***
           * ? se Cumple todo, proceder a la peticion
           */
          const response = await fetch(
            `http://localhost:4000/alumnos/${codigoID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(modelAlumnos),
            }
          );
        } else {
          errorMsg = "Nombre sobrepaso los 50 caracteres";
        }
      } else {
        errorMsg = "Codigo debe empezar con 20222023 y tener 11 digitos";
      }
    } else {
      errorMsg = "Rellene todos los campos, antes agregar un alumno";
    }
    console.log(modelAlumnos);
    if (errorMsg) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }

    Swal.fire({
      icon: "success",
      title: "Alumno modificado con exito",
      text: "Revisa la tabla para mas detalles.",
    }).then(handleSuccess);
  };

  const handleSuccess = () => {
    setModelAlumnos({
      nombre: "",
      codigo: "",
      grado: "",
      becaid: "",
    });
    setAlumnosModal(false);
  };
  const handleDelete = async (index) => {
    Swal.fire({
      title: "Eliminar",
      text: "Estas seguro de eliminar este elemento?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(codigoID);
          const response = await fetch(
            `http://localhost:4000/alumnos/${codigoID}`,
            {
              method: "DELETE",
            }
          );
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          icon: "success",
          title: "Eliminado con exito",
          text: "Revisa la tabla para mas detalles.",
        });
      }
    });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Grado</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dataCompleta.map((item, index) => {
            // Generar una clave única
            const key = `row-${index}`;

            return (
              <tr key={key}>
                {Object.values(item).map((value, index) => {
                  const key = `col-${index}`;
                  return (
                    <td key={key}>{key !== "col-2" ? value : grados[value]}</td>
                  );
                })}
                <td className="d-flex gap-1 justify-content-center">
                  <Button
                    variant="warning"
                    onClick={() => handleShowModal(index)}
                  >
                    <AiOutlineEdit />
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    <BsEraserFill />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        show={alumnosModal}
        onHide={handleCloseAlumnosModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Creacion de alumnos</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-3">
          <div className="col py-2 px-4">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Codigo</Form.Label>
                <Form.Control
                  disabled
                  name="codigo"
                  value={modelAlumnos.codigo}
                  onChange={handleChange}
                  type="number"
                  placeholder="Ingrese codigo del alumno"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={modelAlumnos.nombre}
                  onChange={handleChange}
                  type="text"
                  placeholder="Ingrese nombre del alumno"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Grado</Form.Label>
                <Form.Select
                  name="grado"
                  value={modelAlumnos.grado}
                  onChange={handleChange}
                >
                  <option value={""} disabled>
                    Seleccione el grado del alumno
                  </option>
                  <option value={1}>Kinder</option>
                  <option value={2}>Preparatoria</option>
                  <option value={3}>Primero</option>
                  <option value={4}>Segundo</option>
                  <option value={5}>Tercero</option>
                  <option value={6}>Cuarto</option>
                  <option value={7}>Quinto</option>
                  <option value={8}>Sexto</option>
                  <option value={9}>Séptimo</option>
                  <option value={10}>Octavo</option>
                  <option value={11}>Noveno</option>
                  <option value={12}>Décimo</option>
                  <option value={13}>Undécimo</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Beca</Form.Label>
                <Form.Select
                  name="becaid"
                  value={modelAlumnos.becaid}
                  onChange={handleChange}
                >
                  <option value={""} disabled>
                    Seleccione una opción
                  </option>
                  <option value={1}>Beca Completa</option>
                  <option value={2}>Media Beca</option>
                  <option value={3}>Sin Beca</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 d-flex gap-2">
                <Button
                  className="col"
                  variant="danger"
                  type="button"
                  onClick={handleCloseAlumnosModal}
                >
                  Cancelar
                </Button>
                <Button
                  className="col"
                  variant="success"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Modificar
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
