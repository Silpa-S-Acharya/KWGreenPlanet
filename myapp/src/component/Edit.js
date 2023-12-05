import React, { useEffect, useState } from 'react'
import { editEmployee, getProfile, registerApi } from '../service/allApis'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router';
import { registerContext } from '../employeeContext/ContextShare';
import BASE_URL from '../service/base_url';


function Edit() {

  //State to hold error
  const [errorMsg, setErrorMsg] = useState("")
  // state to hold existing image
  const [existingImg, setExistImg] = useState("")

  // access data of single employee

  const { id } = useParams()
  // console.log(id);

  const getEmployeeData = async () => {
    let { data } = await getProfile(id)
    setUserData(data)

    setExistImg(data.profile)
    // setImage(data.profile)
  }
  //   console.log(existingImg);

  useEffect(() => {
    getEmployeeData()
  }, [])


  // state to hold image data
  const [Image, setImage] = useState("")

  // state to store preview image
  const [preview, setPreview] = useState("")

  // state to hold all other input datas enter by user
  const [userData, setUserData] = useState({
    fname: "",
    email: "",
    gender: "",
    mobile: "",
    status: "",
    address: ""
  })

  // create an object for usenavigate 
  const navigate = useNavigate()

  // function to update userData 
  const userDetails = (e) => {
    // let value=e.target.value
    // let name=e.target.name 
    let { value, name } = e.target

    setUserData({ ...userData, [name]: value })

  }

  //   console.log(userData);


  // create a function to store image
  const setProfile = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, user_profile: file });
  
    // Update the preview
    setPreview(URL.createObjectURL(file));
  };

  // console.log(Image);


  useEffect(() => {

    if (Image) {
      // if user input new image then reset the existing image
      setExistImg("")
      console.log(URL.createObjectURL(Image))
      setPreview(URL.createObjectURL(Image))

    }

  }, [Image])

  // console.log(preview);

  // create a function for submit button
const handleEdit = async (e) => {
  e.preventDefault();

  // header  - contentType:multipart/formData
  const headerConfig = {
    "Content-Type": "multipart/form-data",
  };

  // body form data
  const data = new FormData();

  // access datas from userData
  const { fname, email, gender, mobile, status, address, user_profile } = userData;

  if (fname === "") {
    toast.error("fname required");
  } else if (email === "") {
    toast.error("email required");
  } else if (gender === "") {
    toast.error("gender required");
  } else if (mobile === "") {
    toast.error("mobile required");
  } else if (status === "") {
    toast.error("status required");
  } else if (!user_profile && !existingImg) {
    toast.error("Image required");
  } else if (address === "") {
    toast.error("address required");
  } else {
    // add datas in formdata
    data.append("user_profile", user_profile || existingImg);
    data.append("fname", fname);
    
    data.append("email", email);
    data.append("gender", gender);
    data.append("mobile", mobile);
    data.append("status", status);
    data.append("address", address);

    console.log(data);

    // api call
    const response = await editEmployee(id, headerConfig, data);

    if (response && response.status === 200) {
      // alert("updated")
      navigate("/");
    } else {
      setErrorMsg(response?.response?.data || "Unknown error");
    }
  }
};


  return (
    <div>

      <h3 style={{ color: '#2d0d80' }} className='text-center mt-3'>Update Employee Details</h3>

      <form id='d' class='container  p-5 w-75 mt-2'>
        <div class=' p-2 text-center'>
          <img id='d' class="rounded-circle " style={{ height: '140px', width: '15%' }}

            src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`} alt="" />

        </div>

        <div className="row">
          <div className="col-6">
            <label for="exampleInputFname" class="form-label mt-3"> Name</label>
            <input value={userData.fname} onChange={userDetails} name='fname' required type="text" class="form-control" id="exampleInputFname" />
            <label for="exampleInputEmail" class="form-label mt-3">Email</label>
            <input value={userData.email} onChange={userDetails} name='email' required type="email" class="form-control" id="exampleInputEmail" />

            <label class='mt-3' htmlFor="">gender</label> <br />
            <div className='ms-3'>

              <input checked={userData.gender == "male" ? true : false} onChange={userDetails} name='gender' value={'male'} type="radio" id='m' /> <label class="form-label mt-2 ms-2" htmlFor="m">male</label> <br />
              <input checked={userData.gender == "female" ? true : false} onChange={userDetails} name='gender' value={'female'} type="radio" id='f' /><label class="form-label mt-1 ms-2" htmlFor="f">female</label>

            </div>
            <label class="form-label mt-3" htmlFor="">Choose Profile Picture</label> <br />
            <input onChange={setProfile} required type="file" className='form-control' />

          </div>
          <div className="col-6">
            
            <label for="exampleInputMobile" class="form-label mt-3">Mobile Number</label>
            <input value={userData.mobile} onChange={userDetails} name='mobile' required type="text" class="form-control" id="exampleInputMobile" />

            {/* dropdown */}
            <label for="exampleI" class="form-label mt-4">Employee Status</label>

            <select value={userData.status} onChange={userDetails} name='status' class="dropdown w-100 form-control" id="s1" >
              <option class="dropdown-item disabled" aria-disabled="true" value="">Select ...</option>

              <option class="dropdown-item" value={'active'}>Active</option>
              <option class="dropdown-item" value={'inactive'}>Inactive</option>
            </select>   <br />

            <label for="exampleInputLoc" class="form-label mt-3">Address</label>
            <input value={userData.address} onChange={userDetails} name='address' required type="text" class="form-control" id="exampleInputLoc" />



          </div>
        </div>
        <div className='text-center mt-5'>
          <button onClick={handleEdit} style={{ backgroundColor: '#2d0d80', color: 'white' }}
            type="submit" class="btn btn-primary w-50">Update</button>

        </div>
      </form>

      <ToastContainer position="top-center" theme="light" />
    </div>
  )
}

export default Edit
