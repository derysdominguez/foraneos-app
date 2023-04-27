import { useEffect, useState } from "react";
import GradoSelect from "../../components/GradoSelect";
import { TablaAlumnos } from "./TablaAlumnos";
import { Button, Form, Modal } from "react-bootstrap";
import { BiBookAdd } from "react-icons/bi";
const URL = "http://localhost:4000/alumnos";
import Swal from "sweetalert2";

export function Body() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [alumnosModal, setAlumnosModal] = useState();

  const handleShowModal = () => setAlumnosModal(true);

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
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        const alumnos = res.map((item) => {
          return {
            id: item.id,
            nombre: item.nombre,
            codigo: item.codigo,
            becaid: item.becaid,
            grado: item.grado,
            estado: item.activo ? "Activo" : "Inactivo",
          };
        });
        setData(alumnos);
        setFilteredData(alumnos);
      });
  }, [data]);

  const handleGradoChange = (selectedGrado) => {
    const filter = data.filter((item) => {
      if (selectedGrado === "todos") {
        return item;
      } else {
        console.log(item.grado.toLowerCase() === selectedGrado);
        return item.grado.toLowerCase() === selectedGrado;
      }
    });
    console.log(data);
    setFilteredData(filter);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { codigo, nombre, grado, becaid } = modelAlumnos;
    let errorMsg = "";

    if (codigo && nombre && grado && becaid) {
      if (codigo.startsWith("20222023") && codigo.length === 11) {
        if (nombre.length <= 50) {
          /***
           * ? se Cumple todo, proceder a la peticion
           */
          const exists = data.some((item) =>
            Object.values(item).includes(codigo)
          );

          if (exists === false) {
            const response = await fetch("http://localhost:4000/alumnos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(modelAlumnos),
            });
            const dataCenter = await response.json();
          } else {
            errorMsg = "Codigo ya existe";
          }
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
      title: "Asiento Agregado",
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

  return (
    <>
      <div className="bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly">
        <div className="bg-color-brand w-100 p-3 rounded text-white d-flex gap-2 justify-content-between align-items-center">
          <span className="col-8 fs-5 fw-bold">Alumnos </span>
          <GradoSelect onGradoChange={handleGradoChange} opcionTodos={true} />
          <Button
            className="d-flex w-100 align-items-center fw-bold"
            variant="light"
            onClick={handleShowModal}
          >
            <BiBookAdd className="me-2" />
            <span>Nuevo alumno</span>
          </Button>
        </div>
        <div className="w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center">
          <div className="col-12 mt-1 w-100 h-libroContable">
            {filteredData.length > 0 ? (
              <TablaAlumnos data={filteredData} />
            ) : (
              <div className="w-100 h-100 p-5 d-flex align-items-center justify-content-center fs-5">
                Sin datos
              </div>
            )}
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
                        Finalizar
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
