const mongoose = require("mongoose")

const connectDatabase = () => {
    console.log(`connectDatabase:.......${process.env.DB_URI}`);
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=> {
        console.log("Error:.....",err);
    })

    // Also we can connect with.
    // const db = mongoose.connection;
    // db.on("error", console.error.bind(console, "connection error:..... "));
    // db.once("open", function () {
    // console.log("Connected successfully......");
    // });
};

module.exports = connectDatabase;