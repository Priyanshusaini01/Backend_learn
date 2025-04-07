import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.js"
const router= Router();

    router.route("/register").post(
       //here we are injecting the middleware just before execution 
        upload.fields([
            {
                name:"avatar",
                maxcount:1
            },
            {
                name:"coverImage",
                maxcount:1  
            }
        ]),
        
        registerUser);

    // router.route("/login").post(login);

export default router;
