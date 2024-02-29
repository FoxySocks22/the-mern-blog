/* eslint-disable */

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser, HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { AiFillCloseCircle, AiFillSetting } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import signOut from '../factory/signOut';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import Test from './test';
import { useState } from 'react';

export default function dashSidebar({ tab, user }) {
    const dispatch = useDispatch();
    const [ deleteAccount, setDeleteAccount ] = useState(false);
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={ tab === 'profile' } icon={ HiUser } label="user" labelColor="dark" as="div">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=post'>
                        <Sidebar.Item active={ tab === 'post' } icon={ TfiWrite } label="blog" labelColor="dark" as="div">
                            Create
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=my-posts'>
                        <Sidebar.Item active={ tab === 'my-posts' } icon={ TfiWrite } as="div">
                            My blogs
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Collapse
                        icon={ AiFillSetting }
                        label="Account"
                        renderChevronIcon={(theme, open) => {
                            const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                            return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                        }}>
                        <Sidebar.Item className="cursor-pointer" 
                            icon={ HiArrowSmRight }
                            onClick={() => signOut(dispatch) }>
                            Sign Out
                        </Sidebar.Item>
                        <Sidebar.Item 
                            icon={ AiFillCloseCircle }
                            className="cursor-pointer text-red-500"
                            onClick={ () => setDeleteAccount(true) }>
                            Delete Account
                            {
                                deleteAccount && (
                                    <Test user={ user }/>
                                )
                            }
                        </Sidebar.Item> 
                    </Sidebar.Collapse>
                </Sidebar.ItemGroup>
                { user.isAdmin && (
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=all-posts'>
                        <Sidebar.Item active={ tab === 'all-posts' } icon={ HiUser } as="div">
                            All Posts
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=project'>
                        <Sidebar.Item active={ tab === 'project' } icon={ TfiWrite } label="projet" labelColor="dark" as="div">
                            Create
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                )}
            </Sidebar.Items>
        </Sidebar>
    )
}
