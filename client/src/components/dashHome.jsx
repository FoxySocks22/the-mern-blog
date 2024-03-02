/* eslint-disable */

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage, setMessageType } from "../redux/message/messageSlice";

export default function dashHome() {
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({});

  useEffect(() => {
    getContent();
    console.log(`useEffect: ${formData}`);
  })
  
  const getContent = () => {
    fetch('/api/content/65e08988e8b595c293d3a498')
    .then((res) => res.json())
    .then((data) => {
      setFormData(data);
      console.log(`method: ${formData}`);
      // setFormData({ ...formData, content: data });
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/65e08988e8b595c293d3a498', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok) {
        dispatch(setMessageType('failure'));
        dispatch(setMessage(data.message));
        return;
      }
      if(res.ok) {
        dispatch(setMessageType('success'));
        dispatch(setMessage('Page content updated.'));
      }
    } catch(error) {
      dispatch(setMessageType('failure'));
      dispatch(setMessage(error));
    }
  };
  return (
    <div>
      <h1 className='text-center text-3xl my-7 font-semibold'>Edit Homepage Content</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          value={ formData }
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }} 
          />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  );
}