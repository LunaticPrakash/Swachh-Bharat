import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';

const HeaderLayout = ({ hideHeaderPaths = [] }) => {
    const { pathname } = useLocation();

    return (
        <>
            {!hideHeaderPaths.includes(pathname) && <Header />}
            <Outlet />
        </>
    );
}

export default HeaderLayout