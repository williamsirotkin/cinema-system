import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Image, Form } from 'react-bootstrap';
import './ManageUsers.css'
import React, { useState, useEffect } from 'react';
import { round } from 'lodash';
import axios from 'axios';
import emailjs from '@emailjs/browser';


export default function ManageUsers() {


    const [users, setUsers] = useState([]);

    
    async function fetchUsers() {
        try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/profile/get-users');
        setUsers(response.data);
        } catch (error) {
        console.error(error);
        }
    }
    useEffect(() => {
        fetchUsers();
    },[]);
    

    const handleBan = async (_id) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/profile/banStatus/' + _id);
            console.log("Changed Ban Status!");
            fetchUsers();
            //setPromo(promo.filter((promo) => promo._id !== _id));
            } catch (error) {
            console.error(error);
            }  
    };
    
    // function BanButton(props) {
    //     const handleBan = async (_id) => {
    //         alert("Yo")
    //         try {
    //             const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/profile/banStatus/' + _id);
    //             console.log("Changed Ban Status!");
    //             //setPromo(promo.filter((promo) => promo._id !== _id));
    //             } catch (error) {
    //             console.error(error);
    //             }  
    //     };
      
    //     return (
    //       <Button variant={props.isBanned ? 'success' : 'danger'} onClick={() => handleBan(users._id)}>
    //         {props.isBanned ? 'Unban' : 'Ban'}
    //       </Button>
    //     );
    // }
    // const handleDelete = async (_id) => {
    // try {
    //     const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + '/promotions/delete/' + _id);
    //     console.log("Deleted!");
    //     setPromo(promo.filter((promo) => promo._id !== _id));
    //     } catch (error) {
    //     console.error(error);
    //     }  
    // };

    // function sendEmail(email) {
    //     emailjs.send('service_96npu8c', 'template_ie2brcl', {'email': email, 'promoName': promoName, 'discountAmnt': discountAmnt + discountType}, 'm8yxyvLLbYsPK3HRZ')
    //     .then(function(response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //   }, function(error) {
    //     console.log('FAILED...', error);
    //   });
    // }

  return (
      <div className = "movieCard">
          <br></br>
          <Card  style={{ width: '68rem' }}>
              <Card.Header as="h5">User List</Card.Header>
              <Card.Body>
                  <Card.Text>
                      {users.map(users => (
                          <div key={users.id}>
                              <span>
                              {users.email} &nbsp;&nbsp;&nbsp;{users.active} &nbsp;&nbsp;&nbsp;
                              {/* <BanButton isBanned={users.active === 'banned'} /> */}
                              
                              <Button onClick={() => handleBan(users._id)} variant={users.active === 'banned' ? 'success' : 'danger'} size="sm">
                                {users.active === 'banned' ? 'Unban' : 'Ban'}
                              </Button>
                              
                              </span>
                              &nbsp;
                              <br></br>
                              <br></br>
                          </div>
                      ))}
                      <hr />
                  </Card.Text>
              </Card.Body>
              <div>
              </div>

          </Card>
      </div>
  );

}

//export default PromoPage;