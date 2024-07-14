"use client"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { AlignLeft, CheckSquare, ChevronDown, ChevronUp, Copy, Image, List, MessageSquare, MoreVertical, Trash2, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@headlessui/react';
import Teams from './Teams';
import UserSelectionModal from './UserSelectDialog';

type QuestionType = 'shortAnswer' | 'paragraph' | 'multipleChoice' | 'checkbox' | 'dropdown' | 'section';

interface Question {
    id: string;
    type: QuestionType;
    title: string;
    required: boolean;
    description?: string;
    options?: { id: string; value: string }[];
}

interface RunDocForm {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
}

export default function FunDocFormComponent() {
    const [form, setForm] = useState<RunDocForm>({
        id: uuidv4(),
        title: 'Untitled Form',
        description: '',
        questions: []
    });

    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

    const addQuestion = (type: QuestionType) => {
        const newQuestion: Question = {
            id: uuidv4(),
            type,
            title: type === 'section' ? 'Untitled Section' : 'Untitled Question',
            required: false,
            options: type === 'multipleChoice' || type === 'checkbox' || type === 'dropdown'
                ? [{ id: uuidv4(), value: 'Option 1' }]
                : undefined
        };
        setForm(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
        setActiveQuestion(newQuestion.id);
    };

    const updateQuestion = (questionId: string, updates: Partial<Question>) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? { ...q, ...updates } : q
            )
        }));
    };

    const deleteQuestion = (questionId: string) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== questionId)
        }));
        if (activeQuestion === questionId) {
            setActiveQuestion(null);
        }
    };

    const duplicateQuestion = (questionId: string) => {
        const questionToDuplicate = form.questions.find(q => q.id === questionId);
        if (questionToDuplicate) {
            const newQuestion = { ...questionToDuplicate, id: uuidv4() };
            setForm(prev => ({
                ...prev,
                questions: [...prev.questions, newQuestion]
            }));
            setActiveQuestion(newQuestion.id);
        }
    };

    const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
        const index = form.questions.findIndex(q => q.id === questionId);
        if ((direction === 'up' && index > 0) || (direction === 'down' && index < form.questions.length - 1)) {
            const newQuestions = [...form.questions];
            const [removed] = newQuestions.splice(index, 1);
            newQuestions.splice(direction === 'up' ? index - 1 : index + 1, 0, removed);
            setForm(prev => ({ ...prev, questions: newQuestions }));
        }
    };

    const addOption = (questionId: string) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId
                    ? { ...q, options: [...(q.options || []), { id: uuidv4(), value: `Option ${(q.options?.length || 0) + 1}` }] }
                    : q
            )
        }));
    };

    const updateOption = (questionId: string, optionId: string, value: string) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId
                    ? { ...q, options: q.options?.map(o => o.id === optionId ? { ...o, value } : o) }
                    : q
            )
        }));
    };

    const deleteOption = (questionId: string, optionId: string) => {
        setForm(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId
                    ? { ...q, options: q.options?.filter(o => o.id !== optionId) }
                    : q
            )
        }));
    };


    const renderQuestionEditor = (question: Question) => {
        const isActive = activeQuestion === question.id;

        return (
            <>
                <Card
                    key={question.id}
                    className={`mb-4 transition-shadow ${isActive ? 'shadow-lg' : 'shadow'}`}
                    onClick={() => setActiveQuestion(question.id)}
                >
                    <CardContent className="p-4">
                        <div className="flex justify-center items-center space-x-2 mb-2">
                            {question.type === 'section' ? (
                                <Input
                                    value={question.title}
                                    onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                                    className="text-xl font-semibold"
                                />
                            ) : (
                                <Input
                                    value={question.title}
                                    onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                                    className="font-semibold"
                                    placeholder="Question"
                                />
                            )}
                            {/* <Image /> */}
                            {question.type !== 'section' && (
                                <Select
                                    value={question.type}
                                    onValueChange={(value: QuestionType) => updateQuestion(question.id, { type: value })}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Question Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="shortAnswer">Short Answer</SelectItem>
                                        <SelectItem value="paragraph">Paragraph</SelectItem>
                                        <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                                        <SelectItem value="checkbox">Checkbox</SelectItem>
                                        <SelectItem value="dropdown">Dropdown</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}

                        </div>
                        {/* {question.type !== 'section' && (
                            <Textarea
                                value={question.description || ''}
                                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                placeholder="Description (optional)"
                                className="mb-2"
                            />
                        )} */}

                        {(question.type === 'multipleChoice' || question.type === 'checkbox' || question.type === 'dropdown') && (
                            <div className="space-y-2 mb-2">
                                {question.options?.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        {question.type == 'multipleChoice' && <div>
                                            <input type='radio' disabled className='border-gray-200' />
                                        </div>}
                                        {question.type == 'checkbox' && <div>
                                            <input type='checkbox' disabled className='border-gray-200' />
                                        </div>}
                                        <Input
                                            value={option.value}
                                            onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                                            placeholder="Option"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteOption(question.id, option.id)}
                                        >
                                            <X className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </div>
                                ))}
                                <Button size={'sm'} className='m-2 text-blue-500 text-xs' variant={'link'} onClick={() => addOption(question.id)}>
                                    + Add Option
                                </Button>
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            {question.type !== 'section' && (
                                <>
                                    <Switch

                                        checked={question.required}
                                        onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                                    />
                                    <span>Required</span>
                                </>

                            )}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => duplicateQuestion(question.id)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Duplicate</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => deleteQuestion(question.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => moveQuestion(question.id, 'up')}>
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Move Up</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => moveQuestion(question.id, 'down')}>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Move Down</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardContent>
                </Card>
            </>
        );

    };



    return (
        <>
            <div className="flex max-h-16 items-center p-6 border-b bg-white z-10" >
                <h6 className="font-medium text-xl">New Template</h6>
                <div className="ml-auto"></div>
                <div className="flex gap-2">
                    <Button variant={'secondary'} onClick={() => {
                    }}>
                        Cancel
                    </Button>
                    <Button variant={'default'}>
                        Create
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-2'>
                <ScrollArea className="rounded-md border max-h-[calc(100vh-4rem)] relative border-none">
                    <div className="absolute right-5 top-10 flex flex-col space-y-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => addQuestion('shortAnswer')} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <MessageSquare className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Short Answer</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => addQuestion('paragraph')} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <AlignLeft className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Paragraph</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => addQuestion('multipleChoice')} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <List className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Multiple Choice</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => addQuestion('checkbox')} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <CheckSquare className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Checkbox</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => addQuestion('dropdown')} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <ChevronDown className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Dropdown</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => addQuestion('section')} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Section</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex p-6">
                        <div className="flex-1 p-8 overflow-auto mr-10">
                            <Card className="mb-6">
                                <CardContent className="p-4">
                                    <Input
                                        value={form.title}
                                        onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="text-3xl font-bold mb-2"
                                        placeholder="Form Title"
                                    />
                                    <Textarea
                                        value={form.description || ''}
                                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Form Description"
                                        className="text-gray-600"
                                    />
                                </CardContent>
                            </Card>
                            {form.questions.map(renderQuestionEditor)}
                            <Button onClick={() => console.log(JSON.stringify(form, null, 2))} className="mt-4">
                                Save Form
                            </Button>
                        </div>
                    </div>
                </ScrollArea>

                <Teams />
            </div>
            <UserSelectionModal/>
        </>
    );
}