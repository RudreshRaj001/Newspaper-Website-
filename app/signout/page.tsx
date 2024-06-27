"use client"
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const page = () => {
    return (
        <div className=' flex items-center justify-center pt-20'>
            <Button
                onClick={() => signOut({
                    callbackUrl: '/'
                })}
            >
                Do you really want to signOut!!
            </Button>
        </div>
    )
}

export default page