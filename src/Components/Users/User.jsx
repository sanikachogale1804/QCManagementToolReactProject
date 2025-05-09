import React, { useEffect, useState } from 'react'
import { getUsers } from '../Services/UserService'

function User() {

    let [users,setUsers]=useState([])
    useEffect(()=>{
        getUsers().then(data=>{
            console.log(data);
            setUsers(data)
        })
    })
  return (
    <div>
        
    </div>
  )
}

export default User
