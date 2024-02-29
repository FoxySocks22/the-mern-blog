/* eslint-disable */

import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { setMessage, setMessageType, clearMessage } from "../redux/message/messageSlice";

export default function test({ user }) {
  const [ match, setMatch ] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteUser = async() => {
    if(!match){
      dispatch(setMessageType('failure'));
      dispatch(setMessage('Input must match username.'));
      return;
    }
    try {
      dispatch(clearMessage());
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${user._id}`, {
          method: "DELETE"
      });
      const data = await res.json();
      if(!res.ok){ 
        dispatch(setMessageType('failure'));
        dispatch(setMessage(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch(error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const checkForMatch = (input) => {
    if(input === user.username) setMatch(true);
  }

  return (
    <form>
      <TextInput
        type='text'
        id='title'
        placeholder='Username'
        onChange={(e) => checkForMatch(e.target.value) }
        >
      </TextInput>
      <Button
        type='button'
        className='bg-red-500 color-white'
        size='sm'
        onClick={ handleDeleteUser }
        disabled={ !match }>
        Confirm
      </Button>
    </form>
  )
}


/* Some additional work to do on styling and presentation, but I much prefer 
this solution to the original. */