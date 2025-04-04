// import { mongo } from "mongoose";
import mongoose,{Schema} from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema= new Schema(
    
    {
        videofile:{
            type:String,
            required:true

        },
        thumbnail:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        Description:{
            type:String, //cloundnary
            required:true,
        },
        views:{
            type:Number,
            default:0
        },
        ifPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        }

    },


    {timestamp:true}

)
    videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema );
