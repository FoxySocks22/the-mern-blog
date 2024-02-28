import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/dashSidebar';
import DashProfile from '../components/dashProfile';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const location = useLocation();
  const [ tab, setTab ] = useState('');
  const { currentUser } = useSelector(state => state.user);
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
      { tab === 'profile' && <DashProfile /> }
    </div>
  )
}
