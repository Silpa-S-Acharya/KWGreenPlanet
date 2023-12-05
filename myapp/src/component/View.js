import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getProfile } from '../service/allApis'
import BASE_URL from '../service/base_url'



function View() {
  const [user,setUser]=useState({})

  const {id}=useParams()

  const getUser=async()=>{
    const {data}=await getProfile(id)
    setUser(data)
  }

  console.log(user);

  useEffect(()=>{
    getUser()
  },[])
  return (
    <div>
      {
        user?<div  className='container w-50 mt-5 '>
        <div class='row px-2 py-4' id='d'>
          <div className="col-lg-6 col-12">
            <img class='ms-0' id='d' style={{ width: '100%',height:'400px' }}src={`${BASE_URL}/uploads/${user.profile}`} alt="" />
          </div>
          <div className="col-lg-6 col-12 py-4 mt-3 fs-5">
            <ul class="list-group">
              <li id='d' class="list-group-item mt-2">
                <span><i class="fa-solid fa-user px-3"></i> Full Name</span> <strong class='ms-2'>{user.fname}</strong> 
                </li>
              <li id='d' class="list-group-item mt-2">
                <span><i class="fa-solid fa-user-shield px-3"></i> Status</span> <strong class='ms-2'>{user.status}</strong> 
                </li>
              <li id='d' class="list-group-item mt-2">
                <span> <i class="fa-solid fa-phone-volume px-3"></i> Mobile Number</span> <strong class='ms-2'>{user.mobile}</strong> 
                </li>
              <li id='d' class="list-group-item mt-2">
                <span><i class="fa-solid fa-envelope px-3"></i>Email </span> <strong class='ms-2'>{user.email}</strong> 
                </li>
              <li id='d' class="list-group-item mt-2">
                <span> <i class="fa-solid fa-person-half-dress px-3"></i> Gender</span> <strong class='ms-2'>{user.gender}</strong>
                 </li>
              <li id='d' class="list-group-item mt-2">
                <span><i class="fa-solid fa-location-dot px-3"></i> Location</span> <strong class='ms-2'>{user.location}</strong>
                 </li>
            </ul>

          </div>
        </div>

      </div>:
      <h1>NO EMPLOYEE DATA PRESENT</h1>
      }
      
    </div>
  )
}

export default View
