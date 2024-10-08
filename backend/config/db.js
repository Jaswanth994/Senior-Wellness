const mongoose = require('mongoose');
let uri='mongodb+srv://Jaswanth123:Jaswanth@123@cluster0.hk9ti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
