const mongoose = require('mongoose');

const Teacher = new mongoose.model('Teacher',{
    name:{
        type:String,
        trim:true,
        required:true
    },
    salary:{
        type:Number,
        trim:true,
        minlength:4
    },
    class:[
        {
            classNum:{
                type:String,
                trim:true,
                required:true
            }, 
            studentsNum:{
                type:Number
            },
            subject:{
                type:String,
                trim:true,
                required:true
            }
        }
    ]
});

module.exports= Teacher;
