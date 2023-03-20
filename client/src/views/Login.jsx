import React from "react";
import { Container, Row, Form, Button, FormGroup, Col} from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  const handleSubmit = () => {};

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="h-control bg-light align-items-center text-center px-4 py-4">
          <Col>
            <Form onSubmit={handleSubmit}>
              <h2>Bienvenido a Foraneos-App</h2>
              <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Usuario" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group>

              <Link to='/home'>
                <Button variant="primary" type="submit" className="w-100">
                  Iniciar Sesion
                </Button>
              </Link>
              <p className="mt-3 mb-5 fs-6">
                ¿No tienes cuenta?  <b>Consulta con soporte.</b>
              </p>

              <Form.Text className="text-muted mb-5">
                ¿Olvidaste tu contraseña?
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
