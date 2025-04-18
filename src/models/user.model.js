import mongoose ,{Schema}from "mongoose";

import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt" 
const userSchema= new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        
        trim:true,
        index:true,
    },
    avatar:{
        type:String, //cloundinary url
        required:true,
    },
    coverImage:{ 
    type: String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",
        }
    ],

    password:{
        type: String,
        required:[true, 'Password is required']
    },
    refreshtoken:{
        type:String,
    },

},
    {timestamps:true}


)
//pre use to bycrt the code just before to save // for security purposes
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});
    // cheking pass using bycypt via compare method 
    userSchema.methods.isPasswordCorrect= async function (password) {
         
       return await bcrypt.compare(password,this.password);
                                         // taking access from methods 
    }
    userSchema.methods.generateAccessToken=function(){
        jwt.sign({
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
   ) }

   userSchema.methods.generateRefreshToken=function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
) }

    userSchema.methods.generateRefreshToken=function(){}

// this user directlu contact from mongoose
export const User= mongoose.model("User",userSchema);
