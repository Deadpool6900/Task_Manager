import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
    title:{
        type :String,
        default :"Untitled"
    },
    description:{
        type :String,
        default :"No description."
    },
    dueDate :{
        type :Date,
    },
    status :{
        type:String,
        enum :['completed','in-progress','pending'],
        default : 'pending'
    },
    priority:{
        type:String,
        enum :["high","medium","low"],
        default:'medium',
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true,
    }
},{timestamps:true});  
// timestamp will add created at and updated at properties automatically


const Task = mongoose.model("tasks",TaskSchema);

export default Task;