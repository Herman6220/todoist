import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import TaskElement from './TaskElement';
import Skeleton from './Skeleton';

interface Task {
    table: string;
    title: string;
    _id: string;
    isCompleted: Boolean;
}

interface TaskListProps {
    tasks: Task[];
    handleTaskInUpdation: (t: Task) => void;
    handleDeleteTask: (tid: string) => void;
    handleCompleteTask: (tid: string) => void;
    // fetchTask: () => void;
    // hasMore: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number;
    page: number;
    taskLoading: boolean;
}

const TaskList = ({
    tasks,
    handleTaskInUpdation,
    handleDeleteTask,
    handleCompleteTask,
    // fetchTask,
    // hasMore
    setPage,
    totalPages,
    page,
    taskLoading,
}: TaskListProps) => {

    return (
        <div className='flex flex-col gap-2 w-full h-full relative flex-1 min-h-0'>
            <div className='flex flex-col gap-2 w-full h-full overflow-y-auto scrollbar-thin [scrollbar-color:#888_#171717]  [scrollbar-width:thin]'>
                {taskLoading ? (
                    <>
                    <div className='w-full h-10'>
                        <Skeleton />
                    </div>
                    <div className='w-full h-10'>
                        <Skeleton />
                    </div>
                    <div className='w-full h-10'>
                        <Skeleton />
                    </div>
                    <div className='w-full h-10'>
                        <Skeleton />
                    </div>
                    <div className='w-full h-10'>
                        <Skeleton />
                    </div>
                    </>
                ): (
                    <>
                        {tasks.length != 0 ? (
                            <>
                            {tasks?.map((t) => (
                                <TaskElement task={t} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} handleTaskInUpdation={handleTaskInUpdation}/>
                            ))}
                            </>
                        ) : (
                            <div className="w-full p-2 px-4 flex items-center justify-center ">
                            <p>No more tasks...</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* <div className='w-full h-20'>
                <Skeleton/>
            </div> */}
            {
        totalPages > 1 && (
            <div className='absolute left-[50%] -translate-x-[50%] flex items-center justify-center bottom-0 pb-4 gap-1'>
                <div className='p-4 bg-neutral-950/50 rounded-2xl [box-shadow:inset_0px_0px_10px_#aaa] backdrop-blur-md flex gap-2 items-center justify-center'>
                    <button
                        onClick={() => setPage((prev) => prev = Math.max(0, prev - 1))}
                        className='p-2 bg-neutral-800/20 rounded-lg hover:bg-neutral-500/20 [box-shadow:inset_0px_0px_4px_#aaa] backdrop-blur-md'
                    >
                        <ChevronLeftIcon />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            onClick={() => setPage(i)}
                            className={`p-2 px-4 bg-neutral-800/20 hover:bg-neutral-500/20 rounded-lg backdrop-blur-md ${page === i ? "[box-shadow:inset_0px_0px_4px_#aaa,0px_0px_20px_#777]" : "[box-shadow:inset_0px_0px_4px_#aaa]"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((prev) => prev = Math.min(totalPages - 1, prev + 1))}
                        className='p-2 bg-neutral-800/20 rounded-lg hover:bg-neutral-500/20 [box-shadow:inset_0px_0px_4px_#aaa] backdrop-blur-md'
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        )
    }
        </div >
    )
}

export default TaskList