import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://vikashsaini:YnUe59HdVqgqKO7s@cluster0.49g55fk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
export const JSON_SECRET ="password@000";

export const connectDB=async()=>{

   await mongoose.connect(MONGO_URL).then(()=>{
        console.log("connected to db successfully");
    
    }).catch(error=>{
        console.log("Error in Db connectrion: ",error);
        
    })
    
}
