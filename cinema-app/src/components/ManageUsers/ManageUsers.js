import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ManageUsers.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


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