import React, { useState } from 'react'
import { useRef } from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from "uuid"
import Room from './Room'
import { Outlet, Link, useNavigate } from "react-router-dom"

function Authenticate() {
    const navigate = useNavigate()
    const username = useRef()
    const room = useRef()

    const handleAuth = () => {

        let user = username.current.value
        let roomName = room.current.value
        // const fetch = fetch('http://localhost:9000', {
        //     method: "POST",
        //     header: { Content: "application/json" },
        //     body: { user: user, room: roomName }
        // })
        // const socket = io('http://localhost:9000')

    }
    // }
    return (
        <div>
            <div>Authenticate</div>
            <Link to='/Room'>Room</Link>
            <form onSubmit={(e) => { e.preventDefault(); navigate('/Room', { state: { username: username.current.value, room: room.current.value } }) }}>
                <input ref={username} type="text" placeholder='Username' />
                <input ref={room} type="text" placeholder='Room' />
                <button type='submit' onClick={handleAuth}>submit</button>
            </form>
            <div>
                {/* {loginMessage.map((login) => <div key={uuidv4()}>{login}</div>)} */}
            </div>
            <Outlet />
        </div >
    )
}
export default Authenticate