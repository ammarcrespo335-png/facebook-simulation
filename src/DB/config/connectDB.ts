import mongoose from "mongoose";

export const DBconnection = async () => {
    return await mongoose.connect(process.env.LOCAL_DB_URI as string).then(() => {
        console.log("DB is Connected");
        
    }).catch((err) => {
        console.log("DB is failed",err);
        
    })
}