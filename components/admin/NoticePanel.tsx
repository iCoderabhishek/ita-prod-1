"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Trash2, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const noticeFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  label: z.string().min(1, "Please select a label"),
  fileLink: z
    .string()
    .url("Please enter a valid URL")
    .or(z.string().length(0))
    .optional(),
});

type NoticeFormValues = z.infer<typeof noticeFormSchema>;

type Notice = {
  id: string;
  title: string;
  description: string;
  label: string;
  fileLink: string | null;
  createdAt: string;
  updatedAt: string;
};

const LABELS = [
  "Exam",
  "Admission",
  "Faculty",
  "Students",
  "Sports",
  "College",
];

export default function NoticesPanel() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const { toast } = useToast();

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      label: "",
      fileLink: "",
    },
  });

  const fetchNotices = useCallback(async () => {
    // Use useCallback
    try {
      setIsLoading(true);
      const response = await fetch("/api/notices");

      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }

      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast({
        title: "Error",
        description: "Failed to load notices. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setNotices, setIsLoading, toast]); // Add dependencies if needed

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]); // Added fetchNotices to the dependency array

  useEffect(() => {
    if (editingNotice) {
      form.reset({
        title: editingNotice.title,
        description: editingNotice.description,
        label: editingNotice.label,
        fileLink: editingNotice.fileLink || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        label: "",
        fileLink: "",
      });
    }
  }, [editingNotice, form]);

  const onSubmit = async (values: NoticeFormValues) => {
    try {
      setIsSubmitting(true);

      const url = editingNotice
        ? `/api/notices/${editingNotice.id}`
        : "/api/notices";

      const method = editingNotice ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editingNotice ? "update" : "create"} notice`
        );
      }

      toast({
        title: "Success",
        description: `Notice ${
          editingNotice ? "updated" : "created"
        } successfully.`,
      });

      fetchNotices();
      setIsDialogOpen(false);
      setEditingNotice(null);
    } catch (error) {
      console.error("Error submitting notice:", error);
      toast({
        title: "Error",
        description: `Failed to ${
          editingNotice ? "update" : "create"
        } notice. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) {
      return;
    }

    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notice");
      }

      toast({
        title: "Success",
        description: "Notice deleted successfully.",
      });

      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast({
        title: "Error",
        description: "Failed to delete notice. Please try again.",
      });
    }
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingNotice(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 sm: m-5 ">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold ">Manage Notices</h2>
        <Button
          onClick={handleAddNew}
          className="bg-[#318CE7] hover:bg-[#318CE7]/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Notice
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading notices...</p>
        </div>
      ) : notices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground mb-4">No notices available.</p>
            <Button
              onClick={handleAddNew}
              className="bg-[#318CE7] hover:bg-[#318CE7]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Your First Notice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notices.map((notice) => (
            <Card key={notice.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#318CE7] text-white">
                    {notice.label}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {notice.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(notice.createdAt), "PPP")}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(notice)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingNotice ? "Edit Notice" : "Create New Notice"}
            </DialogTitle>
            <DialogDescription>
              {editingNotice
                ? "Update the notice details below."
                : "Fill in the details to create a new notice."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter notice title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter notice description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LABELS.map((label) => (
                          <SelectItem key={label} value={label}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fileLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Notice Link (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Google Drive or other file link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#318CE7] hover:bg-[#318CE7]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingNotice
                    ? "Update Notice"
                    : "Publish Notice"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
