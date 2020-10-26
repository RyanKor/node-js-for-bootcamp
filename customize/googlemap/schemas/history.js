import mongoose from 'mongoose'

const {Schema} = mongoose;

const historySchema = new Schema({
    query:{
        type: String,
        // 사용자가 검색한 기록을 DB에 기록하고, 유저 정보에 따라 저장된 기록을 보여준다.
        required: true,
    },
    createdAt :{
        type:Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("History", historySchema)