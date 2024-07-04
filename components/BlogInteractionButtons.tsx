import { BookmarkPlus, ExternalLink, Heart, MessageCircle } from 'lucide-react'
import React from 'react'

const BlogInteractionButtons = () => {
    return (
        <div className='flex justify-between max-w-lg w-full mx-auto bg-secondary p-5 rounded-full'>
            <div className='flex gap-5'>
                <div className='flex gap-2'>
                    <Heart size={20} />
                    <span>100</span>
                </div>
                <div className='flex gap-2'>
                    <MessageCircle size={20} />
                    <span>24</span>
                </div>
            </div>
            <div>
                <span>5 min read</span>
            </div>
            <div className='flex gap-5'>
                <BookmarkPlus size={20} />
                <ExternalLink size={20} />
            </div>
        </div>
    )
}

export default BlogInteractionButtons