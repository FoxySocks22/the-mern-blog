import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function dashSidebar({ tab }) {
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={ tab === 'profile' } icon={ HiUser } label={ "user" } labelColor="dark" as="div">
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item className="cursor-pointer" icon={ HiArrowSmRight }>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
