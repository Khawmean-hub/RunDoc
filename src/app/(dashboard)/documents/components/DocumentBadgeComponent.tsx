import { FileText, Layers2 } from "lucide-react";
import { useRouter } from "next/navigation";

const getRandomColor = () => {
    const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
        'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
interface DocumentBadgeComponentProps {
    document: any
}

export default function DocumentBadgeComponent({
    document
}: DocumentBadgeComponentProps) {
    const router = useRouter()
    return <>
        <div className="bg-white relative overflow-hidden rounded-lg border shadow-lg flex hover:shadow-xl hover:transition-all cursor-pointer"  onClick={() => router.push(`/documents/${document.id}`)}>
            <div className={`w-3 ${getRandomColor()}`}></div>
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-2xl mr-2">★</span>
                    <h2 className="text-lg font-bold overflow-hidden whitespace-break-spaces text-ellipsis" style={{width:200}}>
                        {document?.name}
                        </h2>
                </div>
                <div className="mt-auto flex justify-between items-center text-gray-600">
                    <div className="flex items-start flex-col gap-3">
                        <div className="flex justify-center items-center gap-3">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">Start Document</span>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                            <Layers2 className="h-4 w-4" />
                            <span className="text-sm">{document?.levels?.length}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xl">🔒</span>
                    </div>
                </div>
            </div>
        </div>
        {/* {documents.map((document) => (
                    <div
                        key={document.id}
                        className={`p-4 border rounded shadow hover:shadow-lg cursor-pointer transition-shadow duration-200 ${isDocumentCompleted(document.level_completed) ? 'bg-green-100 border-green-400' : ''}`}
                        onClick={() => router.push(`/documents/${document.id}`)}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(document.owner.username)}&background=random`}
                                    alt={`${document.owner.username}'s avatar`}
                                    className="w-10 h-10 rounded-full border"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{document.name}</h3>
                                    <p className="text-sm text-gray-600">{document.owner.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                {document.is_owner && <StarIcon className="h-5 w-5 text-yellow-500" />}
                                {document.is_involved && !document.is_owner && <UsersIcon className="h-5 w-5 text-blue-500" />}
                            </div>
                        </div>
                        <p className="text-sm"><b>Modified:</b> {moment(document.modifyDate).format("YYYY-MM-DD hh:mm:ss A")}</p>
                        <p className="text-sm"><b>Level completed:</b> {document.level_completed}</p>
                    </div>
                ))} */}
    </>
}