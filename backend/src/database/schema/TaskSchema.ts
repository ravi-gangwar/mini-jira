import { model, Model, models, Schema, type InferSchemaType } from "mongoose";
import { TaskPriority, TaskStatus } from "../../types/types.js";

const TaskSchema = new Schema({
    projectId: {type: Schema.Types.ObjectId, required: true, ref: "Project"},
    title: {type: String, required: true, minlength: 4},
    status: {type: String, enum: TaskStatus},
    priority: {type: String, enum: TaskPriority},
    deadline: {type: Date, required: true},
})

type TaskDocument = InferSchemaType<typeof TaskSchema>;

const TaskModel : Model<TaskDocument> = (models.Task as Model<TaskDocument>) ?? model<TaskDocument>("Task", TaskSchema);

export default TaskModel;