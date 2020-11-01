import mongoose from 'mongoose'
import Chat from './chat'
import Room from './room'
module.exports = () => {
    const {MONGO_ID, MONGO_PASSWORD, NODE_ENV} = process.env
    const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`
  const connect = () => {
    if (NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(MONGO_URL,
      {
        dbName: "gifchat",
      },
      (error) => {
        if (error) {
          console.log("mongodb error", error);
        } else {
          console.log("mongodb success");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", (error) => {
    console.error("mongodb error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("mongodb disconnected");
    connect();
  });
  Chat,
  Room
};
