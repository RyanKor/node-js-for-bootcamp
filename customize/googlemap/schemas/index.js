import mongoose from 'mongoose'
import favoriteSchema from './favorite'
import historySchema from './history'



module.exports = ()=>{
    const {MONGO_ID, MONGO_PASSWORD, NODE_ENV} = process.env
    const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;
    const connect = ()=>{
        if(NODE_ENV !== "production"){
            mongoose.set('debug', true)
        }
        mongoose.connect(MONGO_URL, {
            dbName: "google-map",
        }, (error)=>{
            if(error){
                console.log("Mongo DB Connection Error", error)
            }else{
                console.log("Mongo DB Connection Success")
            }
        })
    }
    connect()
    mongoose.connection.on("Error", (error)=>{
        console.error("Mongo DB Connection Error", error)
    })
    mongoose.connection.on('disconnected', ()=>{
        console.error('MongoDB Connection Stopped. Try Reconnection!')
        connect()
    })
    historySchema
    favoriteSchema
}

