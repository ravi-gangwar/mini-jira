import { model, Model, models, Schema, type InferSchemaType } from "mongoose"

const ProjectSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
}, {timestamps: true, })

type ProjectDocument = InferSchemaType<typeof ProjectSchema>;

const ProjectModel : Model<ProjectDocument> = (models.Project as Model<ProjectDocument>) ?? model<ProjectDocument>("Project", ProjectSchema);

export default ProjectModel;