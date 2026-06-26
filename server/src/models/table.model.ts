import mongoose, { Schema, type HydratedDocument } from "mongoose";

interface TableInterface{
    owner: mongoose.Types.ObjectId,
    title: string,
}

const tableSchema = new Schema<TableInterface>({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true })

tableSchema.index({owner: 1, title: 1}, {unique: true});

export const Table = mongoose.model("Table", tableSchema);