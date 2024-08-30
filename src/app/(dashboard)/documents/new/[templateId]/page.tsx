"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { documentService, documentTemplateService } from '@/services';

interface Option {
  id: string;
  value: string;
}

interface Question {
  id: string;
  type: 'shortAnswer' | 'paragraph' | 'multipleChoice' | 'checkbox' | 'dropdown';
  title: string;
  required: boolean;
  options?: Option[];
}

interface FormData {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

interface Member {
  id: string;
  username: string;
  email: string;
  profilePictureUrl?: string;
}

interface Team {
  name: string;
  levelNumber: number;
  users: Member[];
  remark: string;
}

interface Template {
  _id: string;
  title: string;
  formData: FormData;
  levels: Team[];
}

interface FormDataFieldset {
  label: string;
  value: string | string[];
  type: 'shortAnswer' | 'paragraph' | 'multipleChoice' | 'checkbox' | 'dropdown';
}

interface DocumentCreationFormProps {
  params: { templateId: string };
}

const DocumentCreationForm: React.FC<DocumentCreationFormProps> = ({ params }) => {
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<FormDataFieldset[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await documentTemplateService.get(params.templateId);
        setTemplate(response.data);
        const initialFormData: FormDataFieldset[] = response.data.formData.questions.map((question: Question) => ({
          label: question.title,
          value: question.type === 'checkbox' ? [] : '',
          type: question.type
        }));
        setFormData(initialFormData);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    if (params.templateId) {
      fetchTemplate();
    }
  }, [params.templateId]);

  const handleInputChange = (index: number, value: string | string[]) => {
    setFormData(prevData => {
      const newData = [...prevData];
      newData[index].value = value;
      return newData;
    });
  };

  const handleCheckboxChange = (index: number, optionId: string, checked: boolean) => {
    setFormData(prevData => {
      const newData = [...prevData];
      const currentValues = newData[index].value as string[];
      if (checked) {
        newData[index].value = [...currentValues, optionId];
      } else {
        newData[index].value = currentValues.filter(id => id !== optionId);
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const documentCreationRequest = {
        name: template?.title || 'Untitled Document',
        template_id: params.templateId,
        formData: {
          fieldsets: formData.map(field => ({
            label: field.label,
            value: field.value === '' ? null : field.value,
            type: field.type
          }))
        },
        status: 'draft',
        remark: null
      };

      const response = await documentService.create(documentCreationRequest);
      
      console.log('Document created successfully:', response);
      alert('Document created successfully!');
      router.push('/documents');
    } catch (error) {
      console.error('Error creating document:', error);
      alert('Error creating document: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!template) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center">{template.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Data Section */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Form Data</CardTitle>
            <CardDescription>{template.formData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <form id="documentForm">
                {formData.map((field, index) => (
                  <div key={index} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {template.formData.questions[index].required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'shortAnswer' && (
                      <Input
                        type="text"
                        value={field.value as string}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        required={template.formData.questions[index].required}
                        className="mt-1"
                      />
                    )}
                    {field.type === 'paragraph' && (
                      <Textarea
                        value={field.value as string}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        required={template.formData.questions[index].required}
                        className="mt-1"
                      />
                    )}
                    {field.type === 'multipleChoice' && (
                      <Select
                        value={field.value as string}
                        onValueChange={(value) => handleInputChange(index, value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {template.formData.questions[index].options?.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {field.type === 'checkbox' && (
                      <div className="space-y-2 mt-1">
                        {template.formData.questions[index].options?.map((option) => (
                          <div key={option.id} className="flex items-center">
                            <Checkbox
                              id={`${index}-${option.id}`}
                              checked={(field.value as string[]).includes(option.id)}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(index, option.id, checked as boolean)
                              }
                            />
                            <label
                              htmlFor={`${index}-${option.id}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {option.value}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {field.type === 'dropdown' && (
                      <Select
                        value={field.value as string}
                        onValueChange={(value) => handleInputChange(index, value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {template.formData.questions[index].options?.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </form>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Teams and Members Section */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Teams and Members</CardTitle>
            <CardDescription>Review the teams and members involved in this document.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              {template.levels.map((team, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Badge variant="secondary" className="mr-2">Level {team.levelNumber + 1}</Badge>
                    {team.name}
                  </h3>
                  <div className="space-y-2">
                    {team.users.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.profilePictureUrl} alt={member.username} />
                          <AvatarFallback>{member.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.username}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {team.remark && (
                    <p className="text-sm text-gray-600 mt-2 italic">{team.remark}</p>
                  )}
                  {index < template.levels.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Submission Area */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-yellow-500" />
            <p className="text-sm text-gray-600">Please review all information before submitting.</p>
          </div>
          <Button 
            type="submit" 
            form="documentForm" 
            className="px-6" 
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Submit Document
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCreationForm;