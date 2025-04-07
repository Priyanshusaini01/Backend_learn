import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
    });

    const uploadOncloudinary= async (localFilePath)=>{
        try{
            if(!localFilePath)return null;
            const response= await cloudinary.uploader.upload(
                localFilePath,{
                    resource_type:"auto"
                }
            )
            console.log("file is Uploaded on cloudinary",response.url);
            return response;
        }
        catch(error){
            fs.unlink(localFilePath) //remove the locally saved temp file as the upload operation got faield
        return null;
        }
    }

    
 