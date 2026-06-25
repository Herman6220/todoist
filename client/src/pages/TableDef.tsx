import { useEffect, useState } from "react"
import { createTableTitle } from "../utils/TableTitle";
import { useUserContext } from "../context/AuthContext";
import {Sidebar} from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import { PAGE_LIMIT } from "../constants";

interface Task {
    table: string;
    title: string;
    _id: string;
    isCompleted: Boolean;
}

interface TableInterface {
    owner: string;
    title: string;
    _id: string;
}


const TableDef = () => {
    const { user, loading } = useUserContext();

    const [task, setTask] = useState<Task[]>([
        // { title: "hello world" },
    ]);
    const [tables, setTables] = useState<TableInterface[]>([]);
    const [input, setInput] = useState<string>("");
    const [creatingTask, setCreatingTask] = useState<boolean>(false);
    const [updatingTask, setUpdatingTask] = useState(false);
    const [taskInUpdation, setTaskInUpdation] = useState<Task | null>(null);
    const [taskLoading, setTaskLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);


    const fetchTables = async () => {
        try {
            if (loading || !user || user === null) {
                return;
            }
            console.log(user);

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/table`, {
                credentials: "include",
            });

            if (!response.ok) {
                console.log(`Failed to fetch tables. Status: ${response.status}`);
                return;
            }

            const data = await response.json();

            // console.log(data.tables);

            setTables(data.tables);
        } catch (error) {
            console.log("Some error occurred while fetching tables.");
        }
    }

    const fetchTableId = async (tableTitle: string): Promise<String | null> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/table/title/${encodeURIComponent(tableTitle)}`, {
                credentials: "include"
            });

            if (!response.ok) {
                console.log(`Failed to fetch tables. Status ${response.status}`);
                return null;
            }

            const data = await response.json();

            // console.log(data.table._id);

            return data.table._id || null;

        } catch (error) {
            console.log("Unknown error occured while fetching table: ", error);
            return null;
        }
    }

    const fetchTask = async () => {
        try {
            setTaskLoading(true);
            // console.log(currentPage);
            const currDate = new Date();
            const tableTitle = createTableTitle(currDate);
            const tableIdByTitle = await fetchTableId(tableTitle);
            if (!tableIdByTitle || tableIdByTitle === null) {
                console.log("No table found.");
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/task/table/${tableIdByTitle}?page=${page}&limit=${PAGE_LIMIT}`, {
                credentials: "include"
            });
            const data = await response.json();
            const fetchedTasks = data.task[0].allTasks;
            console.log(data);
            if (fetchedTasks && fetchedTasks.length > 0) {
                setTask(fetchedTasks);
            }
            setTotalPages(data.totalPages);
            setTotalTasks(data.totalTasks);
            setTotalCompletedTasks(data.totalCompletedTasks);
        } catch (error) {
            console.log("Some error occurred while fetching tasks: ", error);
        } finally {
            setTaskLoading(false);
        }
    }

    const handleAddTask = async () => {
        try {
            setCreatingTask(true);
            const trimmed = input.trim();
            if (trimmed.length === 0) {
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/task/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: trimmed }),
                credentials: "include",
            })
            if (!response.ok) {
                console.log(`Some error ocurred while creating task. Status: ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log(data);
            console.log("Task created successfully");
            setTask((prev) => [data.task, ...prev]);
            setTotalTasks((prev) => prev+1);
        } catch (error) {
            console.log("Task addiing error: ", error);
        } finally {
            setInput("");
            setCreatingTask(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        try {
            if (e.code === "Enter") {
                if (taskInUpdation) {
                    handleUpdateTask();
                } else {
                    handleAddTask();
                }
            }
        } catch (error) {
            console.log("Task updation/creation error: ", error);
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            console.log(taskId);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/task/${taskId}/`, {
                method: "DELETE",
                credentials: "include",
            })

            if (!response.ok) {
                console.log(`Some error ocuurred while creating task. Status: ${response.status}`);
                return;
            }

            const data = await response.json();

            console.log(data);
            setTask((prev) => prev.filter((t) => {
                if(t._id === taskId){
                    if(t.isCompleted){
                        setTotalCompletedTasks((prev) => prev-1);
                    }
                    setTotalTasks((prev) => prev-1);

                    return false;
                }

                return true;
            }));
        } catch (error) {
            console.log("Task deletion error: ", error);
        }
    }

    const handleCompleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/task/toggleComplete/${taskId}`, {
                method: "PATCH",
                credentials: "include",
            });

            if (!response.ok) {
                console.log(`Failed to update task. Status: ${response.status}`);
                return;
            }
            const data = await response.json();
            console.log(data);
            setTask((prev) => prev.map((t) =>{
                if(t._id === taskId){
                    setTotalCompletedTasks((prev) => t.isCompleted ? prev-1 : prev+1);

                    return {
                        ...t,
                        isCompleted: !t.isCompleted
                    }
                }

                return t;
            }))
        } catch (error) {
            console.log("Task completion error: ", error);
        }
    }


    const handleTaskInUpdation = (t: Task) => {
        if (taskInUpdation) {
            console.log("Task already in updation state.");
            return;
        }
        if (t.isCompleted) {
            console.log("Task already completed.")
            return;
        }
        setInput(t.title);
        setTaskInUpdation(t);
        setTask((prev) => prev.filter((p) => p._id != t._id));
    }

    const handleUpdateTask = async () => {
        if (!taskInUpdation) {
            return;
        }

        const trimmed = input.trim();
        if (!trimmed || trimmed.length === 0) {
            return;
        }

        try {
            setUpdatingTask(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/task/${taskInUpdation._id.toString()}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: trimmed,
                }),
                credentials: "include",
            })

            if (!response.ok) {
                console.log("Failed to update task. Status: ", response.status);
            }

            const data = await response.json();
            console.log(data);

            setTask((prev) => [...prev, {...taskInUpdation, title: trimmed}]);
        } catch (error) {
            console.log("Some error occurred while updating task", error);
        } finally {
            setInput("");
            setTaskInUpdation(null);
            setUpdatingTask(false);
        }
    }

    const handleCancelUpdateTask = () => {
        if (!taskInUpdation) {
            return;
        }
        setInput("");
        setTask((prev) => [...prev, taskInUpdation]);
        setTaskInUpdation(null);
    }


    useEffect(() => {
        fetchTables();
    }, [user]);

    useEffect(() => {
        fetchTask();
    }, [user, page])


    return (
        <>
            <div className="h-screen w-full bg-black flex justify-center items-center">
                <Sidebar tables={tables} />
                <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
                    <Navbar />
                    <div className="h-full px-10 p-4 text-white flex flex-col gap-10 w-full flex-1 min-h-0">
                        <div className="flex justify-between">
                            <div className="flex items-end gap-8">
                                <h1 className="text-4xl">Today</h1>
                                <p>{new Date().toISOString().slice(0, 10)}</p>
                            </div>
                            <div className="flex flex-col gap-1 items-end justify-end w-full max-w-40">
                                <p>{totalCompletedTasks}/{totalTasks}</p>
                                <div className="w-full h-2 bg-neutral-800 rounded-full relative">
                                    <div
                                        style={{ width: `${(totalCompletedTasks / totalTasks) * 100}%` }}
                                        className={`absolute h-full bg-blue-500 rounded-full transition-all duration-300`}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center w-full flex-1 min-h-0">
                            <div className="flex items-center justify-center w-full gap-2">
                                <input
                                    className="rounded-lg p-2 px-4 w-full bg-neutral-800"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Add your goals..."
                                />
                                {
                                    taskInUpdation && (
                                        <>
                                            <button
                                                onClick={handleCancelUpdateTask}
                                                className="p-2 px-4 min-w-fit transition-all duration-300 bg-red-500 rounded-lg [box-shadow:inset_0px_0px_4px_#300] hover:[box-shadow:inset_0px_-2px_10px_#300]"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )
                                }
                                <button
                                    onClick={taskInUpdation ? handleUpdateTask : handleAddTask}
                                    className="p-2 px-4 min-w-fit transition-all duration-300 bg-blue-500 rounded-lg [box-shadow:inset_0px_0px_4px_#003] hover:[box-shadow:inset_0px_-2px_10px_#003]"
                                >
                                    {taskInUpdation
                                        ? updatingTask ? "Saving..." : "Save"
                                        : creatingTask ? "Adding..." : "Add"
                                    }
                                </button>
                            </div>
                            <div className="w-full border-b"></div>

                            <TaskList
                                tasks={task}
                                handleTaskInUpdation={handleTaskInUpdation}
                                handleCompleteTask={handleCompleteTask}
                                handleDeleteTask={handleDeleteTask}
                                // fetchTask={fetchTask} 
                                // hasMore={hasMore} 
                                setPage={setPage}
                                totalPages={totalPages}
                                page={page}
                                taskLoading={taskLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableDef