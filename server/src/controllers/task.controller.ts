import mongoose from "mongoose";
import { Task } from "../models/task.model";
import type { Request, Response } from "express";
import { Table } from "../models/table.model";
import { createTableTitle } from "../utils/TableTitle";
import { PAGE_LIMIT } from "../constants";


const getTableTask = async (req: Request<{ tableId: string }>, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 0;
        const limit = parseInt(req.query.limit as string) || PAGE_LIMIT;
        // console.log(page, limit);
        const { tableId } = req.params;
        // const { accessToken } = req.cookies;

        if (!tableId) {
            return res.status(400).json({ message: "Table id is required." })
        }


        const table = await Table.findOne({
            owner: req.user._id,
            _id: tableId
        })

        if (!table || table === null) {
            return res.status(400).json({ message: "No table found." });
        }

        // console.log(table);

        const totalTasks = await Task.countDocuments({ table: table._id });
        const totalCompletedTasks = await Task.countDocuments({
            table: table._id,
            isCompleted: true,
        });
        const totalPages = Math.ceil(totalTasks / limit);

        const task = await Table.aggregate([
            {
                $match: {
                    owner: req.user._id,
                    _id: table._id,
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "table",
                    as: "allTasks",
                    pipeline: [
                        {
                            $sort: { createdAt: -1 }
                        }, {
                            $skip: page * limit,
                        }, {
                            $limit: limit,
                        }
                    ]
                }
            }
        ]);

        // console.log(task);

        if (!task || task.length === 0) {
            return res.status(400).json({ message: "No tasks associated with this table." });
        }

        return res.status(200).json({
            task,
            totalTasks,
            totalCompletedTasks,
            totalPages,
            // hasMore: page < totalPages, 
            message: "Tasks fetched successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error while fetching tasks." });
    }
}

const createTask = async (req: Request<{ tableId: string }>, res: Response) => {
    try {
        const { title, description } = req.body;
        // const { accessToken } = req.cookies;
        const { tableId } = req.params;

        if (!title) {
            return res.status(400).json({ message: "Title required." });
        }


        let table;

        if (tableId && tableId.length != 0) {
            const existingTable = await Table.findOne({
                owner: req.user._id,
                _id: tableId,
            })

            if (!existingTable) {
                return res.status(404).json({ message: "No table found." });
            }

            table = existingTable;
        } else {
            const currDate = new Date();
            const tableTitle = createTableTitle(currDate);

            const existingTable = await Table.findOne({
                owner: req.user._id,
                title: tableTitle,
            })

            if (existingTable) {
                table = existingTable;
            } else {
                const newTable = await Table.create({
                    owner: req.user._id,
                    title: tableTitle,
                })

                console.log(newTable);

                if (!newTable) {
                    return res.status(404).json({ message: "Some error occurred while creating table." });
                }

                table = newTable;
            }
        }


        // let table = await Table.findOne({
        //     owner: user._id, 
        //     title: tableTitle,
        // });

        // if (!table) {
        //     const newTable = await Table.create({
        //         owner: user._id,
        //         title: tableTitle,
        //     })

        //     console.log(newTable);

        //     if (!newTable) {
        //         return res.status(404).json({message: "Some error occurred while creating table."});
        //     }

        //     table = newTable;
        // }

        // console.log(table);

        const task = await Task.create({
            table: table._id,
            title,
            description,
        })

        return res.status(200).json({ task, message: "Task created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error while creating tasks." });
    }
}

const deleteTask = async (req: Request<{ taskId: string }>, res: Response) => {
    try {
        const { taskId } = req.params;
        const { accessToken } = req.cookies;

        if (!taskId) {
            return res.status(400).json({ message: "Task Id required." });
        }


        const task = await Task.findById(taskId).populate("table");

        if (!task) {
            return res.status(404).json({ message: "task not found." });
        }

        const table = await Table.findOne({
            owner: req.user._id,
            _id: task.table,
        })

        if (!table) {
            return res.status(403).json({ message: "forbidden" });
        }

        const deletedTask = await Task.deleteOne({ _id: new mongoose.Types.ObjectId(taskId) });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task deletion error." });
        }

        return res.status(200).json({ deletedTask, message: "Task has been deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error while deleting tasks." });
    }
}

const updateTask = async (req: Request<{ taskId: string }>, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title } = req.body;
        // const { accessToken } = req.cookies;

        if (!taskId || !title) {
            return res.status(400).json({ message: "Task Id and Title required." });
        }


        // console.log(taskId, title);

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "No task found." })
        }

        const table = await Table.findOne({
            _id: task.table,
            owner: req.user._id,
        })

        if (!table) {
            return res.status(403).json({ message: "forbidden" });
        }

        if (task.isCompleted) {
            return res.status(404).json({ message: "Task already completed." })
        }

        const updatedTask = await Task.findByIdAndUpdate(task._id, { title: title });

        if (!updatedTask) {
            return res.status(404).json({ message: "Some error occurred while updating task." })
        }

        return res.status(200).json({ message: "Task has been updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

const toggleTaskComplete = async (req: Request<{ taskId: string }>, res: Response) => {
    try {
        const { taskId } = req.params;

        console.log(taskId);

        if (!taskId) {
            return res.status(400).json({ message: "Task Id required." });
        }

        // const { accessToken } = req.cookies;


        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Not found." });
        }

        const table = await Table.findOne({
            _id: task.table,
            owner: req.user._id,
        })

        if (!table) {
            return res.status(403).json({ message: "forbidden" });
        }

        const updatedTask = await Task.updateOne(
            { _id: task._id },
            [
                {
                    $set: {
                        isCompleted: { $not: ["$isCompleted"] }
                    }
                }
            ],
            { updatePipeline: true }
        )

        if (!updatedTask) {
            return res.status(404).json({ message: "Some error occurred while updating task." })
        }

        return res.status(200).json({ message: "Task has been updated successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
export {
    getTableTask,
    createTask,
    deleteTask,
    toggleTaskComplete,
    updateTask,
}