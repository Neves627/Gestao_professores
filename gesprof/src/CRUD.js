import React, { useEffect, useState } from 'react'

const CRUD = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [salary, setSalary] = useState(0);
    const [address, setAddress] = useState('');

    const [editID, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editSubject, setEditSubject] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState('');
    const [editSalary, setEditSalary]


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
            
        })
    }


  return (
    <div>CRUD</div>
  )

};

export default CRUD;
