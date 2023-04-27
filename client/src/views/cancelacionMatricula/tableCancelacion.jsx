import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiOutlineDeleteRow } from "react-icons/ai";
import Swal from "sweetalert2";

function TableCancelacion(props) {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState(null);
  const [cancelInfo, setCancelInfo] = useState({});
  const today = new Date();

  const handleSubmit = () => {
    setCancelInfo({ ...cancelInfo, estudiante: student.nombre });
    console.log(cancelInfo);

    cancelInfo.razon
      ? cancelInfo.fecha_cancelacion
        ? Swal.fire({
            title: "¿Seguro que desea cancelar la matricula de este alumno?",
            text: "Al continuar, se eliminara totalmente la matricula del alumno.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cancelar Matricula",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('aqui se cancela la matricula del estudiante, esta es la informacion: ', cancelInfo);
              setShowModal(false);
            }
          })
        : Swal.fire({
            title: "Error!",
            text: "Tiene que ingresar una fecha de cancelación.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          })
      : Swal.fire({
          title: "Error!",
          text: "Tiene que ingresar una razon para la cancelación de la matrícula.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ok",
        });

    // Swal.fire({
    //   title: "Seguro que desea cancelar la operación?",
    //   text: "Se descartaran los datos ingresados actualmente del formulario!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Abandonar",
    //   cancelButtonText: "Cancelar",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     handleSuccess();
    //     setCuenta(false);
    //   }
    // });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCancelInfo({ ...cancelInfo, [name]: value });
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => {
            return (
              <th key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Datos del alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex col-4 align-items-center m-0">
                <span>Alumno:</span>
              </Form.Label>
              <Form.Control
                className="col"
                type="text"
                name="estudiante"
                defaultValue={student ? student.nombre : null}
                readOnly
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex col-4 align-items-center m-0">
                <span>Especifique una razon para la cancelación:</span>
              </Form.Label>
              <Form.Control
                className="col"
                as="textarea"
                name="razon"
                rows={3}
                onChange={handleChange}
                // defaultValue={dateMen[propiedad] ? dateMen[propiedad] : "-"}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex col-4 align-items-center m-0">
                <span>Fecha de cancelación de matrícula:</span>
              </Form.Label>
              <Form.Control
                className="col"
                type="datetime-local"
                name="fecha_cancelacion"
                max={today.toISOString().slice(0, -5)}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setShowModal(false)}>
            Regresar
          </Button> */}
          <Button type="submit" variant="danger" onClick={handleSubmit}>
            Retirar alumno
          </Button>
        </Modal.Footer>
      </Modal>
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
              <td className="d-flex gap-1 justify-content-center">
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowModal(true);
                    setStudent(item);
                  }}
                >
                  <AiOutlineDeleteRow />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <Table striped bordered hover>
      {renderTableHeader()}
      {renderTableRows()}
      {renderModal()}
    </Table>
  );
}

export default TableCancelacion;
