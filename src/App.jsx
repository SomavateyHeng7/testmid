import { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import productList from './accessory-products.json';
import DataTable from './components/DataTable';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate] = useState(0.1); // 10% tax rate
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setFilteredSelectedItems(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    // Calculate the subtotal
    const newSubtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setSubtotal(newSubtotal);

    // Calculate the tax amount
    const newTaxAmount = newSubtotal * taxRate;
    setTaxAmount(newTaxAmount);

    // Calculate the total amount
    const newTotal = newSubtotal + newTaxAmount;
    setTotal(newTotal);
  }, [selectedItems, taxRate]);

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find(p => p.id == pid);
    const qty = parseInt(qRef.current.value, 10);

    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(item => item.id == pid);
      if (existingItem) {
        // If item already exists, update its quantity
        return prevItems.map(item =>
          item.id == pid ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        // If item does not exist, add it to the list
        return [...prevItems, { ...product, qty }];
      }
    });
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;
    const product = productList.find(p => p.id == pid);
    const p = product.price;
    setPrice(p);
  };

  const deleteItemByIndex = (index) => {
    setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const search = (keyword) => {
    setFilteredSelectedItems(selectedItems.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())));
  };

  const sortAscending = () => {
    setFilteredSelectedItems(prevItems => [...prevItems].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortDescending = () => {
    setFilteredSelectedItems(prevItems => [...prevItems].sort((a, b) => b.name.localeCompare(a.name)));
  };

  return (
    <>
      <Container>
        <Row className="mb-3">
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Form.Select ref={pRef} onChange={handleProductChanged}>
              {productList.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            Price:
          </Col>
          <Col>
            {price}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            <span>Quantity:</span>
          </Col>
          <Col>
            <input type="number" ref={qRef} defaultValue={1} className="form-control" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="dark" onClick={handleAdd}>Add</Button>
          </Col>
        </Row>
        <DataTable
          data={filteredSelectedItems}
          onDelete={deleteItemByIndex}
          onSearch={search}
          onSortAscending={sortAscending}
          onSortDescending={sortDescending}
        />
        <Row className="mt-3">
          <Col>
            <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
            <h5>Tax (10%): ${taxAmount.toFixed(2)}</h5>
            <h5>Total: ${total.toFixed(2)}</h5>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
