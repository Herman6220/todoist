import { Link } from "react-router"

interface TableInterface {
    owner: string;
    title: string;
    _id: string;
}

const Sidebar = ({ tables }: { tables: TableInterface[] }) => {
    return (
        <div className="w-full max-w-xs h-full p-4 hidden lg:block">
            <div className="rounded-3xl bg-neutral-800 w-full h-full text-white overflow-hidden">
                <div className="flex flex-col p-4 px-8 gap-2 w-full">
                    <div className="flex p-2 w-full border-b mb-2">
                        <p>History</p>
                    </div>
                    {tables && tables.map((t) => (
                        <div className="w-full flex" key={t._id}>
                            <Link className="hover:bg-neutral-500 w-full h-full px-4 p-1 rounded-lg" to={`/task/${t._id}`}>{t.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar