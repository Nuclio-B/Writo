const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//save user content
const contentSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default:()=>Date.now(),
    },
    tag:{
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

contentSchema.methods = async function(){

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

const Content = new mongoose.model("Content", contentSchema);
module.exports = Content;