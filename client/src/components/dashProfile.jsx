/* eslint-disable */
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';

export default function dashProfile() {
    const filePickerRef = useRef();
    const { currentUser, loading } = useSelector(state => state.user);
    const [ image, setImage ] = useState(null);
    const [ tempImgUrl, setTempImgUrl ] = useState(null);
    const [ uploadProgress, setUploadProgress ] = useState(null);
    const [ uploadMessage, setUploadMessage ] = useState(null);
    const [ formData, setFormData ] = useState({});
    const [ imageUploading, setImageUploading ] = useState(false);
    const dispatch = useDispatch();

    const handleImageUpdate = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(e.target.files[0]);
            setTempImgUrl(URL.createObjectURL(file));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.keys(formData).length === 0) {
            setUploadMessage('FAILED: No fields were changed.');
            return;
        }
        if(imageUploading) {
            setUploadMessage('FAILED: Your profile image is still uploading.');
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            !res.ok ? dispatch(updateFailure(date.message)) : dispatch(updateSuccess(data));
        } catch(error){
            dispatch(updateFailure(error.message));
            setUploadMessage('FAILED: Something went wrong, please try again.');
        }
    }
    useEffect(() => {
        if(image) uploadImage()
    }, [image]);
    const uploadImage = () => {
        setImageUploading(true);
        setUploadMessage(null);
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
                setUploadMessage(`Failed: ${error.message}`);
                setUploadProgress(null);
                setImage(null);
                setTempImgUrl(null);
                setImageUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setTempImgUrl(downloadURL);
                    setFormData({...formData, profilePicture: downloadURL}); //Spread here preserves any data that may already have existed
                    setImageUploading(false);
                    setUploadMessage('SUCCESS: Your profile image was updated.');
                })
            }
        )
    }
  return (
    <div>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
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
            { uploadMessage && <Alert color='blue'>{ uploadMessage }</Alert> }
            <TextInput
                type='text'
                id='username'
                name='username'
                defaultValue={ currentUser.username }
                onChange={ handleChange }
            />
            <TextInput
                type='email'
                id='email'
                name='email'
                defaultValue={ currentUser.email }
                onChange={ handleChange }
            />
            <TextInput
                type='password'
                id='password'
                name='password'
                placeholder='********'
                onChange={ handleChange }
            />
            <Button type='submit' gradientDuoTone='purpleToBlue' disabled={ loading || imageUploading } outline>
                {
                    loading || imageUploading ? 'Loading' : 'Update'
                }
            </Button>
        </form>
    </div>
  )
}