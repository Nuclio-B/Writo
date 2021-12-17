const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    date :{
        type: Date,
        default: Date.now
    },
    fullname :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    password_confirm:{
        type:String,
        required:true

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

//generating token
userSchema.methods.generateAuthToken = async function(){

    try{
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch{
        res.send("error occured" +error);
        console.log("error occured"+ error);
    }

}


//save hashed password
userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        
        this.password = await bcrypt.hash(this.password, 10);
        this.password_confirm = await bcrypt.hash(this.password, 10);
    }
    
    next();
})





//create collections
const Register = new mongoose.model("Register", userSchema);

module.exports = Register;