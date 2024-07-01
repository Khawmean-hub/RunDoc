import { FileText, Layers2 } from "lucide-react";

interface TemplateComponentProps {
    template: any
}

const getRandomColor = () => {
    const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
        'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};


export default function TemplateComponent({
    template
}: TemplateComponentProps) {
    return <>
        <div className="bg-white rounded-lg border shadow-lg overflow-hidden flex hover:shadow-xl hover:transition-all cursor-pointer">
            <div className={`w-3 ${getRandomColor()}`}></div>
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-2xl mr-2">★</span>
                    <h2 className="text-lg font-bold">{template?.title}</h2>
                </div>
                <div className="mt-auto flex justify-between items-center text-gray-600">
                    <div className="flex items-start flex-col gap-3">
                        <div className="flex justify-center items-center gap-3">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">Start Document</span>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                            <Layers2 className="h-4 w-4" />
                            <span className="text-sm">{template?.levels?.length}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xl">🔒</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}