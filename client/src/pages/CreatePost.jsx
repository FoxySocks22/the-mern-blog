import { Button, FileInput, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MultiSelect from "../components/multiSelect";

export default function CreatePost() {
    const options = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React.js', label: 'React.js' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'Shopify', label: 'Shopify' },
        { value: 'WordPress', label: 'WordPress' },
        { value: 'PHP', label: 'PHP' },
        { value: 'SASS', label: 'SASS' },
        { value: 'Back-end', label: 'Back-end' }
    ]
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
                className='flex-1'
            />
            <MultiSelect options={options} />
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='images/*' />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
                    Upload Image
                </Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write somethig...' className='h-72 mb-12' required />
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
    )
}