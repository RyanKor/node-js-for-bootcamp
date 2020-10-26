import mongoose from 'mongoose'

const {Schema} = mongoose;

const favoriteSchema = new Schema({
    placeId : {
        type: String,
        unique: true,
        required: true,
    },
    name : {
        type:String,
        required:true,
    },
    location : {
        type:[Number], 
        // 위치를 표기하는 값을 DB에 저장할 때, 배열로 저장한다.
        // 이 뜻은 곧 위도, 경도 2개의 좌표값을 저장하는 구글맵의 특성상, 여러개의 값을
        // 하나의 document 내부 값으로 저장한다는 뜻이다.
        index: '2dsphere'
    },
    createdAt :{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Favorite", favoriteSchema)