import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/dashSidebar';
import DashPost from '../components/dashPost';
import DashProfile from '../components/dashProfile';
import DashHome from '../components/dashHome';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'flowbite-react';
import { clearMessage } from '../redux/message/messageSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [ tab, setTab ] = useState('');
  const { currentUser } = useSelector(state => state.user);
  const { type, message } = useSelector(state => state.message);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar 
          tab={ tab }
          user={ currentUser }
        />
      </div>
      <div className='max-w-lg mx-auto p-3 w-full'>
        {
          message && (
            <Alert className='text-center' color={ type } onDismiss={() => dispatch(clearMessage())} rounded>
              { message }
            </Alert>
          )
        }
        { tab === 'profile' && <DashProfile /> }
        { tab === 'post' && <DashPost /> }
        { 
          tab === 'home' && currentUser.isAdmin && <DashHome />
        }
      </div>
    </div>
  )
}