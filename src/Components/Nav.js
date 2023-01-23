import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
            return (
                window.removeEventListener('scroll')
            );
        })
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className='nav__logo'
                src='https://netflix-clone-react-typescript.vercel.app/assets/netflix-logo.png'
                alt='Netflix Logo'
            />
            <img
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
                alt='Netflix Avatar'
            />
        </div>
    )
}

export default Nav