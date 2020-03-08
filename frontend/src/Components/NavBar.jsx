import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ logoutUser, isUserLoggedIn, user }) => {
    if (isUserLoggedIn) {
        return (
            <nav className='main-nav'>
                <Link to='/'>Home</Link>{" "}
                <Link to='/about'>About</Link>
                <Link to='/portfolio'>Portfolio</Link>
                <Link to='/transactions'>Transactions</Link>
                
                <button className='logout-button' onClick={logoutUser}>Log Out</button>
            </nav>
        )
    }

    return (
        <nav className='main-nav'>
            <Link to='/'>Home</Link>{" "}
            <Link to='/login'>Log-In</Link>{" "}
            <Link to='/signup'>Sign-Up</Link>{" "}
            <Link to='/about'>About</Link>
            {/* <Link to='/portfolio'>Portfolio</Link>
            <Link to='/transactions'>Transactions</Link> */}
        </nav>
    )
}

export default NavBar;