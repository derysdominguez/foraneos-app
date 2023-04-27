import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableRep7 from "./dataTable";
import BarChart2 from "./graficoBarra";
import TableGenerator from "../tablaGenerator";
import { Table } from "react-bootstrap";

function BodyReport7() {
  /* Solo debes de llenar con los datos de la bd */
  const url = "http://localhost:4000/mensualidades/reporte/morosos";
  const [data, setData] = useState();
  const [morosos, setMorosos] = useState();
  const [totalMora, setTotalMora] = useState();
  let sum = 0;

  const api = async () => {
    try {
      const response = await fetch(url);
      const lblJSON = await response.json();

      const mora = lblJSON.map((item) => {
        return item.cantidad;
      });

      mora.forEach((element) => {
        sum += element;
      });
      
      setMorosos(mora);
      setTotalMora(sum);
      setData(lblJSON);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    api();
  }, []);

  const value1 = [1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center">
      <div className="col-12 mt-1 h-100 w-100">
        <Container>
          <Row>
            <Col>
              <TableGenerator
                data={data ? data : [{ Estado: "Cargando..." }]}
              />
              <Table striped bordered hover className="mb-5">
                <tbody>
                  <tr className="bg-secondary">
                    <td className="text-center text-white">
                      Total alumnos morosos:{" "}
                      {totalMora ? totalMora : "Cargando..."}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center flex-column align-items-center">
              <h6 className="mt-1">Comparacion alumnos becados por grado</h6>
              <div className="w-50 d-flex align-items-center justify-content-center">
                <BarChart2 cantidad={morosos?morosos:[0]} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BodyReport7;
