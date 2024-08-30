"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { documentService, commentService } from '@/services';
import { ChatBubbleLeftIcon, DocumentArrowDownIcon, DocumentIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DocumentView from './components/DocumentView';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"; // Add skeleton for loading states

const TestDocumentPage: React.FC = ({
  params
}: any) => {
  const [document, setDocument] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [levelStatus, setLevelStatus] = useState<string>(''); 
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    getDocument(params.id);
  }, [params.id]);

  function getDocument(id: string) {
    documentService.get(id).then(response => {
      setDocument(response.data);
      if (response.data.levels && response.data.levels.length > 0) {
        const initialSelectedLevel = selectedLevel < response.data.levels.length ? selectedLevel : 0;
        const initialLevelId = response.data.levels[initialSelectedLevel].id;
        getComments(initialLevelId);
        setLevelStatus(response.data.levels[initialSelectedLevel].status);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  function getComments(levelId: string) {
    commentService.getCommentsByLevel(levelId).then(response => {
      setComments(response.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleLevelChange = (index: number, levelId: string) => {
    setSelectedLevel(index);
    getComments(levelId);
    if (document?.levels?.[index]) {
      setLevelStatus(document.levels[index].status);
    }
  };

  const postComment = () => {
    if (newComment.trim() === '') return;

    commentService.postComment({
      documentLevelId: document?.levels?.[selectedLevel]?.id,
      content: newComment,
    }).then(response => {
      setComments([...comments, response.data]);
      setNewComment('');
    }).catch(err => {
      console.log(err);
    });
  };

  const changeStatus = (status: any, levelId: string) => {
    documentService.updateStatus(status, params.id, levelId).then(response => {
      setLevelStatus(status);
      getDocument(params.id);
    }).catch(() => {
      console.log("Something went wrong");
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROGRESS':
        return 'bg-yellow-200 text-yellow-800';
      case 'HOLD':
        return 'bg-red-200 text-red-800';
      case 'COMPLETE':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const isPreviousLevelComplete = () => {
    if (selectedLevel > 0) {
      return document?.levels?.[selectedLevel - 1]?.status === 'COMPLETE';
    }
    return true;
  };

  return (
    <div className="container mx-auto p-4 pt-0">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="account" className="w-1/2"><DocumentIcon width={20} />Form data</TabsTrigger>
          <TabsTrigger value="password" className="w-1/2"><DocumentArrowDownIcon width={20} />Level</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <DocumentView fieldsets={document?.form?.fields || []} />
        </TabsContent>
        <TabsContent value="password">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">{document ? document.name : <Skeleton className="w-32 h-6" />}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {document?.levels?.map((level: any, index: number) => (
                <div
                  key={level.id}
                  className={`relative border-2 shadow-md p-4 cursor-pointer rounded-lg ${selectedLevel === index ? 'border-blue-600' : ''}`}
                  onClick={() => handleLevelChange(index, level.id)}
                >
                  <h3 className={`font-semibold text-lg ${level.status === 'PENDING' ? 'text-gray-200' : ''}`}>{level.name}</h3>
                  <div className={`absolute bottom-2 right-2 px-2 py-1 rounded text-sm ${getStatusColor(level.status)}`}>
                    {level.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isPreviousLevelComplete() && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center"><DocumentArrowDownIcon width={20} /> Level Status</h2>
              <div className="flex gap-4">
                <Button variant="outline" className={`w-32 ${levelStatus === 'PROGRESS' ? 'bg-blue-600 text-white' : ''}`} onClick={() => changeStatus('PROGRESS', document?.levels?.[selectedLevel]?.id)}>Progress</Button>
                <Button variant="outline" className={`w-32 ${levelStatus === 'HOLD' ? 'bg-blue-600 text-white' : ''}`} onClick={() => changeStatus('HOLD', document?.levels?.[selectedLevel]?.id)}>Hold</Button>
                <Button variant="outline" className={`w-32 ${levelStatus === 'COMPLETE' ? 'bg-blue-600 text-white' : ''}`} onClick={() => changeStatus('COMPLETE', document?.levels?.[selectedLevel]?.id)}>Complete</Button>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 flex gap-2 items-center"><ChatBubbleLeftIcon width={20} /> Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="p-4 border rounded shadow mb-2">
                  <div className="flex items-center mb-2 gap-2">
                    <Avatar>
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${comment.user?.username}&background=random`} alt="Avatar" />
                      <AvatarFallback>{comment.user?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{comment.user?.username} <span className="text-gray-500 text-sm">{comment.role}</span></h3>
                      <p className="text-gray-600 text-xs">{moment(comment.timestamp).format('YYYY-MM-DD hh:mm:ss A')}</p>
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
            <div className="flex items-center gap-2 mt-4">
              <Input
                type="text"
                className="w-full"
                placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={postComment}>Send</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestDocumentPage;
