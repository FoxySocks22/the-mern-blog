import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [ formData, setFormData ] = useState({});
  const [ message, setMessage ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false) return setMessage(data.message);
      if(res.ok) navigate('/sign-in');
      setLoading(false);
    } catch(error) {
      setMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>The Foxy</span>
            Blog
          </Link>
          <p className="text-sm mt-5">Sign up using email and password, or using Google.</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={ handleSubmit }>
            <div>
              <Label value="Your username" htmlFor="username" />
              <TextInput 
                type="text"
                autoComplete="name"
                placeholder="Username"
                id="username"
                name="username"
                onChange={ handleChange } 
                required />
            </div>
            <div>
              <Label value="Your email" htmlFor="email" />
              <TextInput 
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                id="email" 
                name="email"
                onChange={ handleChange }
                required />
            </div>
            <div>
              <Label value="Your password" htmlFor="password" />
              <TextInput 
                type="password"
                placeholder="********"
                id="password"
                name="password"
                onChange={ handleChange } 
                required />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={ loading }>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            message && (
              <Alert className="mt-5" color="failure">
               { message }
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}