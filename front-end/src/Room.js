import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useLocation } from "react-router-dom"

function Room() {
    const state = useLocation()
    const username = state.state.username
    const room = state.state.room
    let loggedUsername
    const input = useRef()
    const [flag, setFlag] = useState(true)
    const [chatValue, setChatValue] = useState([])
    const [joined, setJoined] = useState([])
    const socket = io('http://localhost:9000')

    function readInput(e) {
        e.preventDefault()
        const inputValue = input.current.value
        socket.emit('get-message', inputValue, username)
        socket.on('message', (recievedMessage) => {
            // const { username, text, time } = recievedMessage
            setChatValue(recievedMessage)
            console.log(recievedMessage)
            localStorage.setItem('local', JSON.stringify(recievedMessage))
        })
        // setFlag(!flag)
    }
    // useEffect(() => {
    //     socket.on('message', (recievedMessage) => {
    //         setChatValue(recievedMessage)
    //     })
    // }, [flag])
    useEffect(() => {
        socket.emit('room join', username, room)
        const messages = localStorage.getItem('local')
        setChatValue(JSON.parse(messages))
    }, [])

    useEffect(() => {
        socket.on('joined', (msg) => { setJoined([...joined, msg]) })
        // socket.on("room join", (msg) => { console.log(msg); setJoined([...joined, msg]) })
    }, [joined])

    return (
        <div>
            <h1>{room}</h1>

            <form onSubmit={readInput}>
                <input ref={input} type="text" placeholder='chat' />
                <button type='submit' onClick={readInput} >Submit</button>
            </form>

            <div>
                {chatValue?.map((chat) =>
                    <li key={uuidv4()}>{chat.username}:{chat.text}</li>
                )}
            </div>

            <div>
                {joined?.map((chat) =>
                    <li key={uuidv4()}>bot:{chat}</li>
                )}
            </div>

        </div >

    )
}

export default Room