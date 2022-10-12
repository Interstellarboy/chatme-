import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useLocation } from "react-router-dom"

function Room() {
    const state = useLocation()
    const username = state.state.username
    const room = state.state.room
    // const room = useRef()
    // console.log(username)
    const [loginMessage, setLoginMessage] = useState([])
    const input = useRef()
    const [chatValue, setChatValue] = useState([])
    const [joined, setJoined] = useState([])
    const socket = io('http://localhost:9000')
    function readInput(e) {
        // console.log(inputValue)
        // const roomValue = room.current.value
        // socket.emit('chat message', inputValue)
        // socket.emit('message', inputValue)
        // socket.emit('room', roomValue)
        e.preventDefault()
        socket.emit('room join', username, room)
        const inputValue = input.current.value
        socket.emit('get-message', inputValue)

        socket.on('message', (msg) => {
            console.log(msg)
            setChatValue([...chatValue, msg])

        })
    }
    useEffect(() => {
        // socket.on("room joined", (msg) => {
        //     setLoginMessage([...loginMessage, msg])
        //     console.log(loginMessage)
        // })
        socket.on('joined', (msg) => { setJoined([...joined, msg]) })
        socket.on("room join", (msg) => { console.log(msg); setJoined([...joined, msg]) })
    }, [chatValue, loginMessage])

    return (
        <div>
            <h1>{room}</h1>
            <form onSubmit={readInput}>
                <input ref={input} type="text" placeholder='chat' />
                <button type='submit' onClick={readInput} >Submit</button>
            </form>
            <div>
                {chatValue.map((chat) =>
                    <li key={uuidv4}>{username}:{chat}</li>
                )}
            </div>
            <div>

                {joined.map((chat) =>
                    <li key={uuidv4}>bot:{chat}</li>
                )}
            </div>
        </div >

    )
}

export default Room