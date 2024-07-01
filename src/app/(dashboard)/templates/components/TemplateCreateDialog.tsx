
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, MoreVertical, Palette, Plus, PlusIcon, Trash2, X } from "lucide-react"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const teams = [
    { id: 1, name: 'Team AAA', participants: 4 },
    {
        id: 2, name: 'Team BBBBB', participants: 5, members: [
            { name: 'Vitou', role: 'Business Manager', image: '/api/placeholder/40/40' },
            { name: 'Vitou', role: 'Business Manager', image: '/api/placeholder/40/40' },
        ]
    },
    { id: 3, name: 'Team CCCC', participants: 6 },
    { id: 4, name: 'CEO', participants: 1 },
];

export default function TemplateCreateDialog() {
    const [open, setOpen] = useState(false)
    const [teams, setTeams] = useState([
        { id: 1, name: 'Team AAA', members: 4 },
        { id: 2, name: 'Team BBBBB', members: 5 },
        { id: 3, name: 'Team CCCC', members: 6 },
        { id: 4, name: 'CEO', members: 1 },
    ]);
    const [selectedColor, setSelectedColor] = useState('Blue');
    // const [templateTitle, setTemplateTitle] = useState('untitled template')
    // const [form, setForm] = useState<Document>({ title: '', description: '', content: '' });
    // const [levels, setLevels] = useState<Level[]>([]);
    // const [settings, setSettings] = useState<Settings>({ setting1: false, setting2: 'option1' });
    // const [formFields, setFormFields] = useState<FormField[]>([
    //     { id: uuidv4(), label: '', inputType: 'text' }
    // ]);
    const handleAddMember = (teamId: any) => {
        setTeams(
            teams.map((team) =>
                team.id === teamId
                    ? { ...team, members: team.members + 1 }
                    : team
            )
        );
    };

    const handleRemoveMember = (teamId: any) => {
        setTeams(
            teams.map((team) =>
                team.id === teamId && team.members > 0
                    ? { ...team, members: team.members - 1 }
                    : team
            )
        );
    };

    const handleTeamNameChange = (id: any, newName: any) => {
        setTeams(
            teams.map((team) =>
                team.id === id ? { ...team, name: newName } : team
            )
        );
    };
    const handleAddTeam = () => {
        setTeams([...teams, { id: teams.length + 1, name: 'New Team', members: 0 }]);
    };
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Blake'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Davis'];
    const generateRandomName = () => {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    };
    return (
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Add template </Button> */}
                <Button variant="default" size="icon" className='rounded-full h-12 w-12'>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="h-[calc(100%-3rem)] min-w-[calc(100%-3rem)] p-0 overflow-hidden">
                <DialogHeader className="flex-row max-h-16 items-center p-6 border-b bg-white z-10" >
                    <h6 className="font-medium text-xl">New Template</h6>
                    <div className="ml-auto"></div>
                    <div className="flex gap-2">
                        <Button variant={'secondary'} onClick={() => {
                            setOpen(false)
                        }}>
                            Cancel
                        </Button>
                        <Button variant={'default'}>
                            Create
                        </Button>
                    </div>
                </DialogHeader>
                <div className="grid grid-cols-2 h-full overflow-y-scroll gap-3">
                    <ScrollArea className="h-full overflow-y-auto p-4 pt-0">
                        <div className="p-4 space-y-2">
                            <h2 className="font-medium">Form Data</h2>
                            <div className="border">
                                <div className={`bg-${selectedColor.toLowerCase()}-500 p-2 flex items-center justify-center`}>
                                    {/* Optional: Add content or icon here */}
                                </div>
                                <div className="p-4">
                                    <div className="grid gap-4">  {/* Add a gap for row spacing */}
                                        <div className="grid w-full items-center gap-1">
                                            <Label htmlFor="email" className="text-xs font-normal">Color</Label>
                                            <div>
                                                {/* <Button size={'sm'} variant={'secondary'} className="text-green-600 bg-green-50"><Palette className="h-5 w-5" /></Button> */}
                                                <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                                            </div>
                                        </div>
                                        <div className="grid items-center gap-1 max-w-[400px]">
                                            <Label htmlFor="email" className="text-xs font-normal">Type</Label>
                                            <Select>
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Select a fruit" className="text-xs" />
                                                </SelectTrigger>
                                                <SelectContent className="text-xs">
                                                    <SelectGroup>
                                                        <SelectLabel>Fruits</SelectLabel>
                                                        <SelectItem value="apple">Apple</SelectItem>
                                                        <SelectItem value="banana">Banana</SelectItem>
                                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                                        <SelectItem value="grapes">Grapes</SelectItem>
                                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid w-full items-center gap-1 max-w-[400px]"> {/* Add a gap for column spacing */}
                                            <Label htmlFor="email" className="text-xs font-normal">Title</Label>
                                            <Input type="text" className="text-xs min-w-full h-9" placeholder="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <FormField />
                            <FormField />
                        </div>
                    </ScrollArea>
                    <ScrollArea className="h-full w-full">
                        <div className="p-4 space-y-2">
                            <h2 className="font-medium">Participants</h2>
                            {teams.map((team) => (
                                <div key={team.id} className="bg-white rounded-lg border p-4">
                                    <div className="flex justify-between items-center border-gray-200 pb-3 mb-3">
                                        <input
                                            type="text"
                                            className="font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm"
                                            value={team.name}
                                            onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                                        />
                                        <Button
                                            size={'icon'}
                                            variant="secondary"
                                            className="rounded-full h-8 w-8"
                                            onClick={() => handleAddMember(team.id)}
                                        >
                                            <PlusIcon className="h-4 w-4 text-gray-600" />
                                        </Button>
                                    </div>
                                    {team.members > 0 && (
                                        <div className="space-y-1">
                                            {[...Array(team.members)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="border flex items-center justify-between p-2  rounded-md"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${generateRandomName()}&background=random`} alt="@shadcn" />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">{generateRandomName()}</p>
                                                            <p className="text-xs text-gray-500">Role</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="link"
                                                        className="text-xs font-normal text-red-600"
                                                        onClick={() => handleRemoveMember(team.id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                onClick={handleAddTeam}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" /> New Level/Team
                            </Button>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}



function FormField() {
    return <>
        <div className="bg-white rounded-lg shadow-md p-6 border mt-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" className="w-full" placeholder="Enter text" />
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Input placeholder="Short answer" className="w-full" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <Switch id="required" />
                    <label htmlFor="required" className="text-sm text-gray-600">Required</label>
                </div>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    </>
}

function ColorPicker({
    selectedColor,
    setSelectedColor
}: any) {


    const colors = [
        { name: 'Zinc', bg: 'bg-zinc-950' },
        { name: 'Slate', bg: 'bg-slate-400' },
        { name: 'Stone', bg: 'bg-stone-500' },
        { name: 'Gray', bg: 'bg-gray-400' },
        { name: 'Neutral', bg: 'bg-neutral-500' },
        { name: 'Red', bg: 'bg-red-500' },
        { name: 'Rose', bg: 'bg-rose-500' },
        { name: 'Orange', bg: 'bg-orange-500' },
        { name: 'Green', bg: 'bg-green-500' },
        { name: 'Blue', bg: 'bg-blue-500' },
        { name: 'Yellow', bg: 'bg-yellow-400' },
        { name: 'Violet', bg: 'bg-violet-500' }
    ];

    return <>
        <Popover>
            <PopoverTrigger asChild>
                <Button size={'sm'} variant={'secondary'} className={`text-${selectedColor.toLowerCase()}-600 bg-${selectedColor.toLowerCase()}-50`}><Palette className="h-5 w-5" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => (
                        <Button
                            key={color.name}
                            variant="outline"
                            className={`flex items-center justify-start space-x-2 ${selectedColor === color.name ? 'ring-2 ring-blue-500' : ''
                                }`}
                            onClick={() => setSelectedColor(color.name)}
                        >
                            <div className={`w-4 h-4 rounded-full ${color.bg}`} />
                            <span>{color.name}</span>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    </>
}