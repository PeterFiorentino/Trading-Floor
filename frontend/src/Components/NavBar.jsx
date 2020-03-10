import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ logoutUser, isUserLoggedIn }) => {
    //Delivers this NavBar if the user is not logged in
    if (isUserLoggedIn) {
        return (
            <nav className='app-nav'>
                <Link id="portfolioLink" to='/portfolio'>Portfolio</Link>
                <Link to='/transactions'>Transactions</Link>
                
                <button className='logout-button' onClick={logoutUser}>Log Out</button>
            </nav>
        )
    }

    //If the user is not logged in, they will get this NavBar instead
    return (
        <nav className='signIn-nav'>
            <Link to='/login'>Sign-In</Link>{"   "}
            <Link to='/signup'>Register</Link>{"   "}
        </nav>
    )
}

export default NavBar;