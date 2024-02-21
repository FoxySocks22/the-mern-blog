/* This file will contain the universal signout method, as apposed to one bound
to multiple individual components, soon as I figure out how to make this actually
work. Running into hook issues atm. */

/* eslint-disable */

import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export const test = async() => {
    const dispatch = useDispatch();
    try {
        const res = await fetch('/api/user/signout', {
            method: 'POST'
        })
        !res.ok ? console.log(data.message) : dispatch(signoutSuccess());
        const data = res.json();
    } catch(error) {
        console.log(data.message)
    }
}