"use client"
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RTE from "@/components/RTE";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";


const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long, Only 100 characters allowed'),
    content: z.string().min(1, 'Content is required').max(5000, 'Content is too long, Only 5000 characters allowed'),
});


export default function BlogForm2() {
    // const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    //     defaultValues: {
    //         title: post?.title || "",
    //         slug: post?.$id || "",
    //         content: post?.content || "",
    //         status: post?.status || "active",
    //     },
    // });

    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    return (
        <div className='border p-5 rounded-lg  w-3/4 mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className="flex gap-5">
                        <div className='space-y-2 w-full'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter Title...' {...field}
                                                className='bg-transparent/10'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className='space-y-2'>
                                <FormLabel>Image</FormLabel>
                                <input
                                    type="file"
                                    className=' rounded-md p-2 my-5 w-full bg-transparent/10'
                                    onChange={handleFileChange}
                                />
                            </div>


                            {/* image preview */}

                            <div className='my-2 w-full flex justify-center'>
                                {previewUrl && <Image src={previewUrl} alt="File preview" width={"300"} height={"100"} />}
                            </div>

                            <div>
                                <FormLabel>Select Category</FormLabel>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            {/* <SelectItem value=" ">Select a Category</SelectItem> */}
                                            <SelectItem value="food">Food</SelectItem>
                                            <SelectItem value="travel">Travel</SelectItem>
                                            <SelectItem value="culture">Culture</SelectItem>
                                            <SelectItem value="music">Music</SelectItem>
                                            <SelectItem value="creativity">Creativity</SelectItem>
                                            <SelectItem value="humor">Humor</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <FormLabel>Content</FormLabel>
                                <RTE name="content" control={form.control} defaultValue="" />
                            </div>
                        </div>
                        {/* <div className="w-1/4 p-5 bg-secondary">
                            <p className='text-2xl text-center font-bold '>Select Categories</p>
                        </div> */}
                    </div>
                    <Button className='w-fit mt-6 ' type='submit'
                        disabled={loading}
                    >
                        {
                            loading ? 'Creating...' : 'Create Blog'
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
}