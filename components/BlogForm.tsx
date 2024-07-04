'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Textarea } from './ui/textarea';
import { Loader2Icon } from 'lucide-react';

const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long, Only 100 characters allowed'),
    content: z.string().min(1, 'Content is required').max(5000, 'Content is too long, Only 5000 characters allowed'),
});

const BlogForm = () => {
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

    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!file) {
                toast({
                    title: "Error",
                    description: "File is required",
                    variant: 'destructive'
                })
                setUploading(false);
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            const values = form.getValues();
            formData.append('title', values.title);
            formData.append('content', values.content);

            const response = await fetch('api/blog', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json()
            if (response.ok) {
                toast({
                    title: "Success",
                    description: data.message,
                })
                router.push('/')
            }
            else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
                variant: 'destructive'
            })
        }
        finally {
            setLoading(false)
        }
    }

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        handleSubmit();

    };

    // handleFileChange

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className='border p-5 rounded-lg max-w-lg w-full mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-2'>
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
                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Enter Content...'
                                            className='bg-transparent/10'
                                            {...field}
                                            rows={8}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* image upload input */}

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

                    </div>
                    <Button className='w-full mt-6' type='submit'
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
};

export default BlogForm;