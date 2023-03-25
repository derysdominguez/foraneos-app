import Table from 'react-bootstrap/Table';

function TableRep7() {
    return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Grado</th>
                    <th>Cantidad de alumnos con mora</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Kinder</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td className='bg-secondary text-white'>Total</td>
                    <td className='bg-secondary text-white'>25</td>
                </tr>
            </tbody>
        </Table>
    </>
    );
}

export default TableRep7;