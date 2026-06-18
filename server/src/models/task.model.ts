import mongoose, {Schema} from "mongoose";

export interface TaskInterface{
    table: mongoose.Types.ObjectId,
    title: string,
    description: string,
    isCompleted: boolean,
}

const taskSchema = new Schema<TaskInterface>({
    table: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Table",
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

export const Task = mongoose.model("Task", taskSchema);