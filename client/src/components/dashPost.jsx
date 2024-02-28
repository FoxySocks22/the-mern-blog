/* eslint-disable */

import { Button, FileInput, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MultiSelect from "../components/multiSelect";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";

export default function dashPost() {
    const options = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React.js', label: 'React.js' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'Shopify', label: 'Shopify' },
        { value: 'WordPress', label: 'WordPress' },
        { value: 'PHP', label: 'PHP' },
        { value: 'SASS', label: 'SASS' },
        { value: 'Front-end', label: 'Front-end' },
        { value: 'Back-end', label: 'Back-end' }
    ]
    const [ file, setFile ] = useState(null);
    const [ imageUploadProgress, setImageUploadProgress  ] = useState(null);
    const [ imageUploadError, setImageUploadError  ] = useState(null);
    const [ imageUploaded, setImageUploaded ] = useState({});
    const handleImageUpload = async () => {
        try {
            if(!file){
                setImageUploadError('Please upload a file.');
                return;
            } 
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date.now() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setImageUploadProgress(progress.toFixed(0));
                }, 
                (error) => {
                    setImageUploadError(error);
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setImageUploaded({...imageUploaded, blogCoverImage: downloadURL});
                    })
                }
            )
        } catch(error) {
            setImageUploadError('Image upload failed.');
            setImageUploadProgress(null);
        }
    }
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>
                Create Post
            </h1>
            <form className='flex flex-col gap-4'>
                <TextInput 
                    type='text'
                    placeholder='title'
                    required
                    id='title'
                    className='flex-1'/>
                <MultiSelect options={options} />
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='images/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button type='button' gradientDuoTone='purpleToBlue' 
                            size='sm' 
                            outline
                            onClick={ handleImageUpload }>
                        Upload Image
                    </Button>
                </div>
                <ReactQuill theme='snow' placeholder='Write somethig...' className='h-72 mb-12' required />
                <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
            </form>
        </div>        
    )
}