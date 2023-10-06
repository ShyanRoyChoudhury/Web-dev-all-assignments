import mongoose from 'mongoose';
let alreadyDone = false;

export async function ensuredbConnected() {
    if(alreadyDone){
        return;
    }
    await mongoose.connect('mongodb+srv://shyanroy:Geforce1050@cluster0.pp8temp.mongodb.net/', { dbName: "courses" });
    alreadyDone = true
}