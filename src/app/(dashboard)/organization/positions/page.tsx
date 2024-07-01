"use client"
import React, { useEffect, useState } from 'react';
import { positionService } from '@/services/position.service';
import Link from 'next/link';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type Position = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function PositionList() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState<string | null>(null);

  useEffect(() => {
    positionService.list().then(response => setPositions(response.data));
  }, []);

  const handleDelete = async (id: string) => {
    await positionService.remove(id);
    setPositions(positions.filter(position => position.id !== id));
    setDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Positions</h1>
        <Button asChild>
          <Link href="/organization/positions/create">
            <Plus className="mr-2 h-4 w-4" /> Create Position
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {positions.map(position => (
          <Card key={position.id}>
            <CardHeader>
              <CardTitle>{position.title}</CardTitle>
              <CardDescription>{position.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Created: {format(new Date(position.createdAt), 'PPp')}
              </p>
              <p className="text-sm text-gray-500">
                Updated: {format(new Date(position.updatedAt), 'PPp')}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between gap-1">
              <Button variant="outline" asChild size={'sm'}>
                <Link href={`/organization/positions/${position.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </Link>
              </Button>
              <Button variant="outline" asChild size={'sm'}>
                <Link href={`/organization/positions/${position.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                  size={'sm'}
                    variant="destructive"
                    onClick={() => setPositionToDelete(position.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this position? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(positionToDelete!)}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
