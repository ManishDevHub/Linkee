
"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle
} from "@/components/ui/card"
import { Separator } from '@radix-ui/react-separator'
import { Input } from '@/components/ui/input'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useState } from 'react'


export default function RegisterPage() {

const [form , setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

})
const [pending, setPending] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/register", {
        method: 'POST' ,
        headers: { "Content-Type": "application/josn" },
        body: JSON.stringify(form),
    })
}

  return (
    <div className='h-full flex items-center justify-center bg-[#1b0918]'>
        <Card className='md:h-auto w-[80%] sm:w-[420px] p-4 sm: p-8 bg-white'>
            <CardHeader>
                <CardTitle className='text-center text-2xl font-semibold'>
                       Register
                </CardTitle>
                <CardDescription className='text-sm text-center text-accent-foreground'>
Use email or service, to create account
                </CardDescription>
            </CardHeader>
            <CardContent className='px-2 sm:px-6'>
                <form onSubmit={handleSubmit} className='space-y-3'>
                    <Input
                    type='text'
                    disabled={pending}
                    placeholder='Full Name'
                    value={form.name}
                onChange={(e)=>setForm({...form, name:e.target.value})}
                required
                    />
                            <Input
                    type='Email'
                    disabled={pending}
                    placeholder='email'
                    value={form.email}
                onChange={(e)=> setForm({...form,email:e.target.value})}
                required
                    />
                            <Input
                    type='Password'
                    disabled={pending}
                    placeholder='password'
                    value={form.password}
                onChange={(e)=> setForm({...form, password:e.target.value})}
                required
                    />
                            <Input
                    type='password'
                    disabled={pending}
                    placeholder='confirm password'
                    value={form.confirmPassword}
                onChange={(e)=> setForm({...form, confirmPassword: e.target.value})}
                required
                    />
                    <Button className='w-full bg-black text-white'
                    size="lg"
                    disabled={pending}
                    >
Continue
                    </Button>
                </form>
                <Separator/>
                <div className='flex my-2 justify-evenly mx-auto items-center'>
<Button
disabled={false}
onClick={()=>{ }}
variant='outline'
size="lg"
className='bg-slate-300 hover:bg-slate-400 hover:scale-110'
>
<FcGoogle className='size-6 m-5 left-2.5 top-2.5' />
</Button>
<Button
disabled={false}
onClick={()=>{ }}
variant='outline'
size="lg"
className='bg-slate-300 hover:bg-slate-400 hover:scale-110'
>
<FaGithub className='size-6 m-5 left-2.5 top-2.5  ' />
</Button>
                </div>
                <p className='text-center text-sm mt-2 text-muted-foreground'>
                    Already have an account?
                    <Link className='text-sky-700 ml-4 hover:underline cursor-pointer' href='login'>Sign in</Link>

                </p>

            </CardContent>
        </Card>
    </div>
  )
}
