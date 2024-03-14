import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CRUD = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');

    const [editID, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editSubject, setEditSubject] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState('');
    const [editSalary, setEditSalary] = useState('');
    const [editAddress, setEditAddress] = useState('');


    const [data, setData] = useState([]);

    useEffect(() =>{
        getdata()
    },[]
    )

    const getdata = () =>{
        axios.get(`https://localhost:7021/api/Professor`)
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        }
        )
    }

    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7021/api/Professor/${id}`)
        .then((result)=>{
            setEditId(id);
            setEditName(result.data.name);
            setEditSubject(result.data.subject);
            setEditEmail(result.data.email);
            setEditPhoneNumber(result.data.phonenumber);
            setEditSalary(result.data.salary);
            setEditAddress(result.data.address);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (id) =>{
        if(window.confirm("Deseja mesmo apagar um registro de um professor?") == true){
            axios.delete(`https://localhost:7021/api/Professor/${id}`)
            .then((result)=>{
                if(result.status = 200){
                    toast.success('O registo foi apagado com sucesso.');
                    getdata();
                }
            })
            .catch((error)=>{
                toast.log(error);
            })
        }
    }
    
    const handleUpdate = () =>{
        const url = `https://localhost:7021/api/Professor/${editID}`;
        const data = {
            "id": editID,
            "name": editName,
            "subject": editSubject,
            "email": editEmail,
            "phonenumber": editPhoneNumber,
            "salary": editSalary,
            "address": editAddress
        }
        axios.put(url, data)
        .then((result)=>{
            handleClose();
            getdata();
            clear();
            toast.success('O Professor foi modificado com sucesso')
        })
        .catch((error)=>{
            toast.log(error)
        })
    }

    const handleSave= () =>{
        const url = `https://localhost:7021/api/Professor`
        const data ={
            "name": name,
            "subject": subject,
            "email": email,
            "phonenumber": phoneNumber,
            "salary": salary,
            "address": address
        }
        axios.post(url, data)
        .then((result)=>{
            getdata();
            clear();
            toast.success('O Professor foi adicionado.');
        })
        .catch((error)=>{
            toast.log(error);
        })
    }

    const clear = () =>{
        setName('');
        setSubject('');
        setEmail('');
        setPhoneNumber('');
        setSalary(0);
        setAddress('');
    }


  return (
    <Fragment>
        <ToastContainer />
        <Container>
            <Row>
                <Col>
                <br></br>
                <p style={{marginTop:'6px'}}>Criar Professor: </p>
                </Col>
                <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Nome' value={name} onChange={(e)=> setName(e.target.value)}/>
                </Col>
                <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Disciplina(s)' value={subject} onChange={(e)=> setSubject(e.target.value)}/>
                </Col>
                <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </Col>
                <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Nº telemovel' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
                </Col>
                <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Salario' value={salary} onChange={(e)=> setSalary(e.target.value)}/>
                </Col>
                <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Morada' value={address} onChange={(e)=> setAddress(e.target.value)}/>
                </Col>
                <Col>
                    <br></br>
                    <button className="btn btn-primary" onClick={() => handleSave()}>Confirmar</button>
                </Col>
            </Row>
        </Container>
        <br></br>
        <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Disciplina</th>
                        <th>Email</th>
                        <th>NºTelemovel</th>
                        <th>Salario</th>
                        <th>Morada</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>    
                                <td>{item.name}</td>
                                <td>{item.subject}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.salary}</td>
                                <td>{item.address}</td>
                                <td colSpan={2}>
                                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Editar</button> &nbsp;
                                    <button className="btn btn-danger"  onClick={() => handleDelete(item.id)}>Apagar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={show} size="lg" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Professor</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        
                        <Col>
                    <br></br>
                    <input type="text" className='form-control' placeholder='Nome' value={editName} onChange={(e)=> setEditName(e.target.value)}/>
                        </Col>
                        <Col>
                            <br></br>
                            <input type="text" className='form-control' placeholder='Disciplina(s)' value={editSubject} onChange={(e)=> setEditSubject(e.target.value)}/>
                        </Col>
                        <Col>
                            <br></br>
                            <input type="text" className='form-control' placeholder='Email' value={editEmail} onChange={(e)=> setEditEmail(e.target.value)}/>
                        </Col>
                        <Col>
                            <br></br>
                            <input type="text" className='form-control' placeholder='Nº telemovel' value={editPhoneNumber} onChange={(e)=> setEditPhoneNumber(e.target.value)}/>
                        </Col>
                        <Col>
                            <br></br>
                            <input type="text" className='form-control' placeholder='Salario' value={editSalary} onChange={(e)=> setEditSalary(e.target.value)}/>
                        </Col>
                        <Col>
                            <br></br>
                            <input type="text" className='form-control' placeholder='Morada' value={editAddress} onChange={(e)=> setEditAddress(e.target.value)}/>
                        </Col>
        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Guardar
                        </Button>
                        </Modal.Footer>
                </Modal>
    </Fragment>
  )
};

export default CRUD;
