import { CheckIcon, LoaderCircleIcon, SquarePenIcon, Trash2Icon, XIcon } from "lucide-react"
import { useState } from "react";

interface Task {
    table: string;
    title: string;
    _id: string;
    isCompleted: Boolean;
}

interface TeaskElementProps {
    task: Task;
    handleTaskInUpdation: (t: Task) => void;
    handleDeleteTask: (tid: string) => void;
    handleCompleteTask: (tid: string) => void;
}

const TaskElement = ({
    task,
    handleTaskInUpdation,
    handleDeleteTask,
    handleCompleteTask,
}: TeaskElementProps) => {
    const [deletingTask, setDeletingTask] = useState(false);
    const [togglingTaskCompletion, setTogglingTaskCompletion] = useState(false);

    const delTask = async (taskId: string) => {
        try {
            setDeletingTask(true);
            await handleDeleteTask(taskId);
        } catch (error) {
            console.log(error);
        } finally {
            setDeletingTask(false);
        }
    }

    const toggleComplete = async (taskId: string) => {
        try {
            setTogglingTaskCompletion(true);
            await handleCompleteTask(taskId);
        } catch (error) {
            console.log(error);
        } finally {
            setTogglingTaskCompletion(false);
        }
    }

    return (
        <div key={task._id} className={`${task.isCompleted ? "bg-green-500 [box-shadow:inset_0px_0px_4px_#030]" : "bg-neutral-800"} p-2 md:px-4 rounded-lg flex md:gap-4 items-center justify-center`}>
            <p className="w-full max-w-20 truncate text-neutral-200 md:block hidden">#{task._id}</p>
            <p className="w-full text-xs md:text-base truncate">{task.title}</p>
            <p className="p-0.5 px-4 md:text-base text-xs hidden md:block rounded-lg bg-neutral-500/50">{task.isCompleted ? "Completed" : "Pending"}</p>
            <button
                onClick={() => handleTaskInUpdation(task)}
                className="hover:bg-neutral-500/50 p-1 rounded-md"
            >
                <SquarePenIcon className="size-5" strokeWidth="1" />
            </button>
            <button
                onClick={() => delTask(task._id)}
                disabled={deletingTask}
                className="hover:bg-neutral-500/50 p-1 rounded-md disabled:opacity-50"
            >
                {deletingTask ? (
                    <LoaderCircleIcon className="size-5 animate-spin" strokeWidth="1" />
                ) : (
                    <Trash2Icon className="size-5" strokeWidth="1" />
                )}
            </button>
            <button
                onClick={() => toggleComplete(task._id)}
                disabled={togglingTaskCompletion}
                className="hover:bg-neutral-500/50 p-1 rounded-md disabled:opacity-50"
            >
                {togglingTaskCompletion ? (
                    <LoaderCircleIcon className="size-5 animate-spin" strokeWidth="1" />
                ) : (
                    <>
                        {task.isCompleted ? (
                            <XIcon className="size-5" strokeWidth="1" />
                        ) : (
                            <CheckIcon className="size-5" strokeWidth="1" />
                        )}
                    </>
                )}
            </button>
        </div>
    )
}

export default TaskElement