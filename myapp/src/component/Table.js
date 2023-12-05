import React from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../service/base_url'



function Table({ employees, removeEmp }) {

  return (
    <div>
      <div className='w-75 container mt-5' style={{ color: '#2d0d80' }}>
        <h2 class='text-start mb-4'>Employee Details</h2>

        <table id='d'
          class="table fs-5 table-primary mt-3 table-striped">
          <thead>
            <tr >
              <th style={{ backgroundColor: '#2d0d80', color: 'white' }} scope="col">No</th>
              <th style={{ backgroundColor: '#2d0d80', color: 'white' }} scope="col">Full Name</th>
              <th style={{ backgroundColor: '#2d0d80', color: 'white' }} scope="col">Mobile</th>
              <th style={{ backgroundColor: '#2d0d80', color: 'white' }} scope="col">Status</th>
              <th style={{ backgroundColor: '#2d0d80', color: 'white' }} scope="col">Profile</th>
              <th style={{ backgroundColor: '#2d0d80', color: 'white' }} scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            {
              employees?.length > 0 ? employees.map((i, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{i.fname}</td>
                  <td>{i.mobile}</td>
                  <td>
                    <div style={{ backgroundColor: '#2d0d80', color: 'white', borderRadius: '20px' }}
                      class='w-50 text-center p-2'>{i.status}</div>
                  </td>
                  <td>
                    <img id='d' style={{ height: '50px', borderTopRightRadius: '20px' }}
                      src={`${BASE_URL}/uploads/${i.profile}`} alt="" />
                  </td>
                  <td>
                    <div className='dropdown'>

                      <div id="myDropdown" class="dropdown-content">
                        <Link to={`/view/${i._id}`}>
                          <a style={{ textDecoration: 'none', color: 'green' }} class="dropdown-item"  >
                             <b>View </b>
                          </a>
                        </Link>

                        <Link to={`/edit/${i._id}`}>
                          <a style={{ textDecoration: 'none', color: 'blue' }} class="dropdown-item" >
                            <b>Edit </b>
                          </a>
                        </Link>
                        <a  style={{ textDecoration: 'none', color: 'red' }} onClick={() => removeEmp(i._id)} >Delete </a>
                      </div>
                    </div>
                  </td>
                </tr>

              )) : <p> No Employees Are Present</p>}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Table
