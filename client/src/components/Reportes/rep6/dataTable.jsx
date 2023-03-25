import Table from 'react-bootstrap/Table';

function TableRep6() {
    return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Grado</th>
                    <th>Beca Completa</th>
                    <th>Media Beca</th>
                    <th>Sin beca</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Kinder</td>
                    <td>3</td>
                    <td>2</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td colSpan={3} className='bg-secondary text-white'>Total</td>
                    <td className='bg-secondary text-white'>25</td>
                </tr>
            </tbody>
        </Table>
    </>
    );
}

export default TableRep6;