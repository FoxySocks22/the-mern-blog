/* eslint-disable */

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { TfiWrite } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import signOut from '../factory/signOut';
import { useDispatch } from 'react-redux';

export default function dashSidebar({ tab, user }) {
    const dispatch = useDispatch();
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={ tab === 'profile' } icon={ HiUser } label={ "user" } labelColor="dark" as="div">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        user.isAdmin && (
                            <Link to='/create-post'>
                                <Sidebar.Item active={ tab === 'post' } icon={ TfiWrite } as="div">
                                    Create post
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    <Sidebar.Item className="cursor-pointer" 
                        icon={ HiArrowSmRight }
                        onClick={() => signOut(dispatch) }>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
