import type { Request, Response } from "express"
import { Table } from "../models/table.model";
import { Task } from "../models/task.model";

const getUserTables = async (req: Request, res: Response) => {
    try {
        // console.log(user._id);

        const tables = await Table.find({ owner: req.user._id }).sort({ createdAt: -1 });

        // console.log("tables: ", tables);

        if (!tables || tables.length === 0) {
            return res.status(404).json({ message: "No table available." });
        }

        return res.status(200).json({ tables, message: "Tables fetched successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." })
    }
}

const createUserTable = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;


        if (!title) {
            return res.status(400).json({ message: "Table title required." })
        }

        const existingTable = await Table.findOne({ title });

        if (existingTable != null) {
            return res.status(400).json({ message: "Table already exists." })
        }

        const table = await Table.create({
            owner: req.user._id,
            title,
        })

        if (!table) {
            return res.status(404).json({ message: "Something went wrong while creating the table." });
        }

        return res.status(200).json({
            table,
            message: "Table created successfully."
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

const deleteUserTable = async (req: Request<{ tableId: string }>, res: Response) => {
    try {
        const { tableId } = req.params;


        if (!tableId) {
            return res.status(400).json({ message: "Table id required." })
        }

        const task = await Table.aggregate([
            {
                $match: {
                    owner: req.user._id,
                    _id: tableId,
                }
            },
            {
                $lookup: {
                    from: "task",
                    localField: "_id",
                    foreignField: "table",
                    as: "allTasks"
                }
            }
        ])

        if (task) {
            const deletedTask = await Task.deleteMany({ table: tableId });
            if (!deletedTask) {
                return res.status(404).json({ message: "Some error occured while deleting tasks associated with this table." });
            }
        }

        const deletedTable = await Table.deleteOne({ _id: tableId });

        if (!deletedTable) {
            return res.status(404).json({ message: "Some error occured while deleting table." });
        }

        return res.status(200).json({ deletedTable, message: "Table deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

const getTableByTitle = async (req: Request<{ tableTitle: string }>, res: Response) => {
    try {
        const { tableTitle } = req.params;

        if (!tableTitle) {
            return res.status(400).json({ message: "Table title required." });
        }

        const table = await Table.findOne({
            owner: req.user._id,
            title: tableTitle,
        });

        if (!table) {
            return res.status(404).json({ message: "This table does not exist." });
        }

        return res.status(200).json({ table, message: "Table fetched successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error while fetching table." })
    }
}

export {
    createUserTable,
    deleteUserTable,
    getTableByTitle,
    getUserTables,
}