/* eslint-disable */

import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function dashProfile() {
    const { currentUser } = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                <img 
                src={ currentUser.profilePicture } 
                alt={`${currentUser.username.split(' ')[0]}'s profile image.`} 
                className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>
            <TextInput
                type='text'
                id='username'
                name='username'
                defaultValue={ currentUser.username }
            />
            <TextInput
                type='email'
                id='email'
                name='email'
                defaultValue={ currentUser.email }
            />
            <TextInput
                type='password'
                id='password'
                name='password'
                placeholder='********'
            />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}