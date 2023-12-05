const employees = require("../model/user")


// all logics

// register logic

employeeRegister = async (req, res) => {

    const file = req.file.filename

    const { fname, email, mobile,dob, gender, status,district, address } = req.body

    if(!fname  || !email || !file || !mobile || !dob || !gender || !status || !district || !address){
        res.status(404).json("all inputs are required")
    }

    try {
        const preEmployee = await employees.findOne({ email })

        if (preEmployee) {
            res.status(403).json("employee already present")
        }
        else {
            // create object for new employee
            const newEmployee = new employees({ fname, email, mobile,dob, gender, status,district, profile: file, address })
            await newEmployee.save()

            res.status(200).json(newEmployee)

        }
    }
    catch {
        res.status(400).json("logic error")
    }

}

// get all employees
getAllEmployees=async(req,res)=>{
    // access search data from request query
    const search=req.query.search
    

    // reqular expresion query
    const query={
        fname:{$regex:search,$options:'i'}
    }

    try{
        const allEmployees=await employees.find(query)
        res.status(200).json(allEmployees)
    }
    catch(err){
        res.status(400).json(err)
    }

}

// logic to get single employee
getEmployee= async (req,res)=>{
    const param=req.params.id
    try{

        const employee=await employees.findOne({_id:param})
        res.status(200).json(employee)
    }
    catch(err){
        res.status(410).json(err)
    }
}

// logic to remove employee
removeEmployee=async(req,res)=>{
    const param=req.params.id
    try{
                                  // return object if deleted
        const removedEmp=await employees.findByIdAndDelete({_id:param})
        res.status(200).json(removedEmp)
    }
    catch(err){
        res.status(400).json(err)
    }
}

// logic to update employee
editEmployee = async (req, res) => {
    const id = req.params.id;
    const { fname, email, mobile, dob, gender, status, district, address, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile;
  
    if (!fname || !email || !mobile || !dob || !gender || !status || !district || !address) {
      return res.status(400).json("All inputs are required");
    }
  
    try {
      const user = await employees.findOne({ _id: id });
  
      if (user) {
        // Update all values with new data
        user.fname = fname;
        user.email = email;
        user.mobile = mobile;
        user.dob = dob; // Fixed: Assigning the correct value for dob
        user.gender = gender;
        user.status = status;
        user.district = district;
        user.address = address;
        user.profile = file;
  
        // Save the updated user
        await user.save();
  
        res.status(200).json(user);
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
module.exports={employeeRegister,getAllEmployees,getEmployee,removeEmployee,editEmployee}