import { useState } from 'react'
import { Container, Row, Form, Button, FormGroup, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(credentials.username !== 'admin'){
      return setError('Usuario incorrecto')
    }
    if(credentials.password !== 'admin'){
      return setError('Contrasena incorrecta')
    }
    navigate('/reportes')
  }

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center vh-100'>
        <Row className='h-control bg-light align-items-center text-center px-4 py-4'>
          <Col>
            <Form onSubmit={handleSubmit} method='POST'>
              <h2>Bienvenido a Foraneos-App</h2>

              <Form.Group className='mt-5 mb-3' controlId='formBasicEmail'>
                <Form.Control
                  onChange={handleChange}
                  name='username'
                  placeholder='Usuario'
                  value={credentials.username}
                />
              </Form.Group>

              <Form.Group className='mb-2' controlId='formBasicPassword'>
                <Form.Control
                  onChange={handleChange}
                  name='password'
                  type='password'
                  placeholder='Contraseña'
                  value={credentials.password}
                />
              </Form.Group>

              <p className='text-danger'>{error}</p>

              <Button type='submit' variant='primary' className='w-100'>
                Iniciar Sesion
              </Button>
              <p className='mt-3 mb-5 fs-6'>
                ¿No tienes cuenta? <b>Consulta con soporte.</b>
              </p>

              <Form.Text className='text-muted mb-5'>
                ¿Olvidaste tu contraseña?
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
