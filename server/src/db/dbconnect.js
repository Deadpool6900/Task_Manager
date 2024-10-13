import mongoose from 'mongoose';

const connectdb = async() =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/task_manager");
        console.log('connected to database !')
    } catch (err) {
        console.log('database connection failed !')
        process.exit(1);
    }
}

export default connectdb;