import { asynchandler } from "../utils/asynchandler.js";
import{ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import{uploadOncloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser= asynchandler(async (req,res)=>{

     
        //1get user details from frontend
        //2validation-check email is not empty or format
        // 3check email already exists or not
        // 4check for images,check for avatar
        // 5upload in cloudinary 
        //6 create user object - create entry in db
        //7 remove password and refresh token field from response
        //8 check for user creation
        //return res
//1
        const {fullname,email,username,password}=req.body
        console.log("email:",email);
//2
        if(
            [fullname,email,password,username].some((field)=>
         field?.trim()==="")
        )
        {
            throw new ApiError(400,"ALl fiels are required")
        }
//3
     const existedUser=   User.findOne({ // checking multi valeues
            $or:[{username},{email}]
        })
        if(existedUser==true){
            throw new ApiError(409,"User with email already exist ")
        }
        //4
        const avatarLocalPath=req.files?.avatar[0]?.path;
        const coverImageLocalPath=req.files?.coverImage[0]?.path;

        if(!avatarLocalPath){
            throw new ApiError(409,"Avatar field is required");
        }
        //5
        const avatar= await uploadOncloudinary(avatarLocalPath)
        const coverImage=await uploadOncloudinary(coverImageLocalPath)


            if(!avatar){
                throw new ApiError(409,"Avatar field is required");

            }
            //6

           const user= await User.create({
                fullname,
                avatar:avatar.url,
                coverImage:coverImage?.url||"",
                email,
                password,
                username:username.toLowerCase()
            })
          //7  
            const createdUser=await User.findById(user.id).select(
                "-password - refreshtoken"
            )
            //8
            if(!createdUser){
            throw new ApiError(500,"something want wrogn while registring user");
                
            //9
            }
            return res.status(201).json(
                new ApiResponse(200,createdUser,"user registered successfully")
            )
    
        })
export {registerUser}