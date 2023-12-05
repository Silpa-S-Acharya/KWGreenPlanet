import React, { useContext, useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { registerContext } from '../employeeContext/ContextShare';
import { registerApi } from '../service/allApis';


function Add() {

    // to get context
    const { registerData, setRegisterData } = useContext(registerContext);

    // state to hold error response
    const [errorMsg, setErrorMsg] = useState("")

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
        dob:"",
        status: "",
        district: "",
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

    console.log(userData);


    // create a function to store image
    const setProfile = (e) => {
        setImage(e.target.files[0]);
    }

    // console.log(Image);

    useEffect(() => {

        if (Image) {
            setPreview(URL.createObjectURL(Image))
        }

    }, [Image])

    // console.log(preview);

    // create a function for submit button
    const handleSubmit = async (e) => {
        e.preventDefault()

        // header  - contentType:multipart/formData
        const headerConfig = {
            "Content-Type": "multipart/form-data"
        }

        // body form data
        const data = new FormData()

        // access datas from userData
        const { fname, email, gender, mobile,dob, status,district, address } = userData

        if (fname === "") {
            toast.error('fname required')
        }

        else if (email === "") {
            toast.error('email required')

        }
        else if (gender === "") {
            toast.error('gender required')

        }
        else if (mobile === "") {
            toast.error('mobile required')

        }
        else if (dob === "") {
            toast.error('mobile required')

        }
        else if (status === "") {
            toast.error('status required')

        }
        else if (district === "") {
            toast.error('district required')

        }
        else if (Image === "") {
            toast.error('Image required')

        }
        else if (address === "") {
            toast.error('address required')

        }

        else {
            // add datas in formdata
            data.append('user_profile', Image)
            data.append('fname', fname)
            data.append('email', email)
            data.append('gender', gender)
            data.append('mobile', mobile)
            data.append('dob', dob)
            data.append('status', status)
            data.append('district', district)
            data.append('address', address)

            // api call
            const response = await registerApi(headerConfig, data)
            console.log(response);
            if (response && response.status === 200) {

                // update context
                setRegisterData(response.data)

                // reset userData and image
                setUserData({
                    ...userData,
                    fname: "",
                    email: "",
                    gender: "",
                    mobile: "",
                    dob: "",
                    status: "",
                    district:"",
                    address: ""

                })
                setImage("")

                // redierect to home
                navigate('/')


            }
            else {

                //console.log(response?.response?.data);
                setErrorMsg(response?.response?.data || 'Unknown error');

            }
        }
    }



    return (
        <div>

            {
                errorMsg ? <div class="alert alert-danger  w-50 container" role="alert"
                    onClose={() => setErrorMsg("")} >
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    {errorMsg}
                </div> : ""
            }


            <h3 style={{ color: '#2d0d80' }} className='text-center mt-3'>Create New Employee</h3>

            <form id='d' class='container  p-5 w-75 mt-2'>
                <div class=' p-2 text-center'>
                    <img id='d' class="rounded-circle " style={{ height: '140px', width: '15%' }}

                        src={preview ? preview : "https://i.postimg.cc/hvphnxx8/profile.png"} alt="" />

                </div>

                <div className="row">
                    <div className="col-6">
                        <label for="exampleInputFname" class="form-label mt-3">First Name</label>
                        <input onChange={userDetails} name='fname' required type="text" class="form-control" id="exampleInputFname" />
                        <label for="exampleInputEmail" class="form-label mt-3">Email</label>
                        <input onChange={userDetails} name='email' required type="email" class="form-control" id="exampleInputEmail" />

                        <label class='mt-3' htmlFor="">gender</label> <br />
                        <div className='ms-3'>
                            <input onChange={userDetails} name='gender' value={'male'} type="radio" id='m' /> <label class="form-label mt-2 ms-2" htmlFor="m">male</label> <br />
                            <input onChange={userDetails} name='gender' value={'female'} type="radio" id='f' /><label class="form-label mt-1 ms-2" htmlFor="f">female</label>

                        </div>
                        <label class="form-label mt-3" htmlFor="">Choose Profile Picture</label> <br />
                        <input onChange={setProfile} required type="file" className='form-control' />

                    </div>
                    <div className="col-6">


                        <label for="exampleInputMobile" class="form-label mt-3">Mobile Number</label>
                        <input onChange={userDetails} name='mobile' required type="text" class="form-control" id="exampleInputMobile" />
                        
                        <label for="exampleInputMobile" class="form-label mt-3">Date of birth</label>
                        <input onChange={userDetails} name='dob' required type="date" class="form-control" id="exampleInputMobile" />


                        {/* dropdown */}
                        <label for="exampleI" class="form-label mt-4">Employee Status</label>

                        <select onChange={userDetails} name='status' class="dropdown w-100 form-control" id="s1" >
                            <option class="dropdown-item disabled" aria-disabled="true" value="">Select ...</option>

                            <option class="dropdown-item" value={'active'}>Active</option>
                            <option class="dropdown-item" value={'inactive'}>Inactive</option>
                        </select>   <br />
                        <label for="exampleI" class="form-label mt-4">District</label>

                        <select onChange={userDetails} name='district' class="dropdown w-100 form-control" id="s1" >
                            <option class="dropdown-item disabled" aria-disabled="true" value="">Select ...</option>
                            <option className="dropdown-item" value={'Trivandrum'}>Trivandrum</option>
                            <option className="dropdown-item" value={'Kollam'}>Kollam</option>
                            <option className="dropdown-item" value={'Pathanamthitta'}>Pathanamthitta</option>
                            <option className="dropdown-item" value={'Alappuzha'}>Alappuzha</option>
                            <option className="dropdown-item" value={'Kottayam'}>Kottayam</option>
                            <option className="dropdown-item" value={'Idukki'}>Idukki</option>
                            <option className="dropdown-item" value={'Ernakulam'}>Ernakulam</option>
                            <option className="dropdown-item" value={'Thrissur'}>Thrissur</option>
                            <option className="dropdown-item" value={'Palakkad'}>Palakkad</option>
                            <option className="dropdown-item" value={'Malappuram'}>Malappuram</option>
                            <option className="dropdown-item" value={'Kozhikode'}>Kozhikode</option>
                            <option className="dropdown-item" value={'Wayanad'}>Wayanad</option>
                            <option className="dropdown-item" value={'Kannur'}>Kannur</option>
                            <option className="dropdown-item" value={'Kasaragod'}>Kasaragod</option>
                        </select>   <br />

                        <label for="exampleInputLoc" class="form-label mt-3">Address</label>
                        <input required type="text" name='address'    onChange={userDetails} class="form-control" id="exampleInputLoc" />



                    </div>
                </div>
                <div className='text-center mt-5'>
                    <button onClick={handleSubmit} style={{ backgroundColor: '#2d0d80', color: 'white' }}
                        type="submit" class="btn btn-primary w-50">Submit</button>

                </div>
            </form>

            <ToastContainer position="top-center" theme="light" />
        </div>
    )
}

export default Add