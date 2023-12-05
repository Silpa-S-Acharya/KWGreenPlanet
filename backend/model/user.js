const mongoose=require('mongoose')

// schema
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:10,
        maxlength:13
    },
    gender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    }

})

// model
const employee=new mongoose.model('users',userSchema)
//const emp= new mongoose.model('details',h)
module.exports=employee
//module.exports={employee,emp}