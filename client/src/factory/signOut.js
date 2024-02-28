import { signoutSuccess } from '../redux/user/userSlice';

export default async function signOut(dispatch) {
    try {
        const res = await fetch('/api/user/signout', {
            method: 'POST'
        })
        !res.ok ? console.log(data.message) : dispatch(signoutSuccess());
        const data = res.json();
    } catch(error) {
        console.log(error.message); // Will be replaced by global error state
    }
}

/* Could this be made into a JSX component that returns a signout link? 
useDispatch would still need propping though... */