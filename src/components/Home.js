import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Button, Spinner, Container, Navbar, Nav, Form, ListGroup, Modal, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useFetch from './FetchData';
import { reducer, initialState } from '../redux-store/reducer';

function Home(props) {
    const [show, setShow] = useState(false);
    const [productSelected, setProductSelected] = useState({});
    const { loading, error, products } = useFetch();
    const loader = useRef(null);
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (history.location.state === undefined && history.location.state.invalidUser) {
            history.push('/login');
        } else {
            dispatch({ type: 'clear', payload: [] });
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        }
    }, [history]);

    const logoutUser = () => {
        history.push({
            pathname: '/login',
            state: { invalidUser: true }
        });
    }

    const onListItemClick = (product) => {
        setProductSelected(product);
        setShow(!show);
    }

    return (
        <Container fluid className='home-page'>
            {
                (history.location.state !== undefined && !history.location.state.invalidUser) ?
                    <div >
                        <Navbar bg="primary" variant="dark">
                            <Navbar.Brand>iConnect E-com</Navbar.Brand>
                            <Nav className="mr-auto">
                            </Nav>
                            <Form inline>
                                <span className='mr-2 product-num'><img className='mr-1 imgLogo' alt=""></img><strong className='jewel'>{state.products.length}</strong></span>
                                <Button variant="outline-light" type='submit' onClick={logoutUser}>Logout</Button>
                            </Form>
                        </Navbar>
                        {showAlert &&
                            <Alert className='mt-3' variant={'success'} dismissible>
                                Login successfully
                            </Alert>
                        }
                        <div className='container' style={{ padding: '5px' }}>
                            {Object.keys(productSelected).length > 0 ? <Popup dispatch={dispatch} productSelected={productSelected} show={show} toggle={setShow} /> : null}
                            <ListGroup>
                                {products && products.data && products.data.length > 0 && products.data.map((product, idx) => (
                                    <ListGroup.Item key={idx} variant={idx % 2 === 0 ? 'primary' : ''} onClick={() => onListItemClick(product)}>
                                        <div style={idx % 2 === 0 ? { color: 'white' } : {}}>
                                            <span className='product-text'>Name: </span><span>{product.name}</span> <br></br>
                                            <span className='product-text' >Price: </span><span>{product.price}</span>
                                            <img
                                                src={product.image}
                                                alt='imgUrl'
                                                height='60px'
                                                width='60px'
                                                style={{ float: 'right' }}
                                            />
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                        {loading &&
                            <Spinner animation="border" variant="primary" className="spinner">
                                <span className='sr-only'>Loading...</span>
                            </Spinner>
                        }
                        {error && <p>Error!</p>}
                        <div ref={loader} />
                    </div>
                    :
                    null
            }
        </Container>
    );
}

function Popup({ productSelected, show, toggle, ...props }) {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [val, setVal] = useState(1);
    const [showCartAlert, setShowCartAlert] = useState(false);
    return (
        <Modal
            {...props}
            show={show}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            centered
            onHide={() => toggle(!show)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    <div><img src={productSelected.image} className="rounded mr-2" alt="" height='200px' width='200px' /></div>
                    <div><strong>Name: {productSelected.name}</strong></div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Price: {productSelected.price}<br></br>
                Quantity: <input type="number" value={val} id="quantity" name="quantity" min="1" className="mr-2" onChange={(e) => setVal(e.target.value)} /><Button variant="secondary"
                onClick={() => {
                    props.dispatch({ type: 'increment', payload: productSelected });
                    setShowCartAlert(true);
                    setTimeout(() => {setShowCartAlert(false)}, 1000);
                }}>Add to Cart</Button><br></br>
                {showCartAlert &&
                    <Alert className='mt-3' variant={'info'} dismissible>
                        Product Added
                    </Alert>
                }
            </Modal.Body>
        </Modal>
    );
}

export default Home;
