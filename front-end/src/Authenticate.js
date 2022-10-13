import React, { useState } from 'react'
import { useRef } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom"

function Authenticate() {

    const navigate = useNavigate()
    const username = useRef()
    const room = useRef()

    return (
        <div>
            <div>Authenticate</div>

            <Link to='/Room'>Room</Link>

            <form onSubmit={(e) => { e.preventDefault(); navigate('/Room', { state: { username: username.current.value, room: room.current.value } }) }}>
                <input ref={username} type="text" placeholder='Username' />
                <input ref={room} type="text" placeholder='Room' />
                <button type='submit' >submit</button>
            </form>

            <div>
            </div>

            <Outlet />
        </div >
    )
}
export default Authenticate