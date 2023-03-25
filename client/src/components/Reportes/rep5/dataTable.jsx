import Table from 'react-bootstrap/Table';

function TableRep5() {
    return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Ingresos</th>
                    <th>Egresos</th>
                    <th>Ganancias</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Enero</td>
                    <td>2000</td>
                    <td>1200</td>
                    <td>800</td>
                </tr>
                <tr>
                    <td>Febreo</td>
                    <td>2000</td>
                    <td>1200</td>
                    <td>800</td>
                </tr>
            </tbody>
        </Table>
    </>
    );
}

export default TableRep5;