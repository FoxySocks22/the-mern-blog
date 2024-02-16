/* eslint-disable */

import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function dashProfile() {
    const filePickerRef = useRef();
    const { currentUser } = useSelector(state => state.user);
    const [ image, setImage ] = useState(null);
    const [ tempImgUrl, setTempImgUrl ] = useState(null);
    const [ uploadProgress, setUploadProgress ] = useState(null);
    const [ uploadError, setUploadError ] = useState(null);
    const handleImageUpdate = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(e.target.files[0]);
            setTempImgUrl(URL.createObjectURL(file));
        }
    }
    useEffect(() => {
        if(image) uploadImage()
    }, [image]);
    const uploadImage = () => {
        setUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setUploadError(error.message);
                setUploadProgress(null);
                setImage(null);
                setTempImgUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setTempImgUrl(downloadURL);
                })
            }
        )
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input hidden type='file' accept='image/*' onChange={ handleImageUpdate } ref={ filePickerRef }/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                { uploadProgress && (
                    <CircularProgressbar 
                        value={uploadProgress || 0} 
                        text={`${uploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: {
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0
                            },
                            path: {
                                stroke: `rgba(62, 152, 199, ${uploadProgress / 100})`
                            }
                        }}
                    />
                )}
                <img 
                src={ tempImgUrl || currentUser.profilePicture }
                alt={`${currentUser.username.split(' ')[0]}'s profile image.`}
                className={
                    `rounded-full w-full h-full object-cover border-8 border-[lightgray] 
                    ${uploadProgress && uploadProgress < 100 && 'opacity-60'}`}
                />
            </div>
            { uploadError && <Alert color='failure'>{ uploadError }</Alert> }
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