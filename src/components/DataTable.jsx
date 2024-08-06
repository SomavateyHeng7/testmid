import React from 'react';
import { Table, Container, Button, Row, Col } from 'react-bootstrap';

const DataTable = ({ data, onDelete, onSearch, onSortAscending, onSortDescending }) => {
  const sRef = React.useRef();

  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={8}>
          <input type="text" placeholder="Search..." ref={sRef} className="form-control" />
        </Col>
        <Col xs={2}>
          <Button variant="dark" onClick={handleSearch} className="w-100">
            <i className="bi bi-search"></i> Search
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Button variant="dark" onClick={onSortAscending} className="w-100 mb-2">Sort Ascending</Button>
        </Col>
        <Col xs={6}>
          <Button variant="dark" onClick={onSortDescending} className="w-100">Sort Descending</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <i className="bi bi-trash" onClick={() => onDelete(index)}></i>
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;
