import React, { useState } from 'react'
import { io } from 'socket.io-client'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'


function Room() {
    const input = useRef()
    const room = useRef()
    const [chatValue, setChatValue] = useState([])
    const socket = io('http://localhost:9000')
    function readInput() {
        const inputValue = input.current.value
        const roomValue = room.current.value
        socket.emit('chat message', inputValue, roomValue)
        // socket.emit('message', inputValue)
        // socket.emit('room', roomValue)
        socket.on('get-message', (msg) => {
            console.log(msg)
            setChatValue([...chatValue, msg])

        })

    }
    return (
        <div>
            <div>
                <input ref={input} type="text" placeholder='chat' />
                <input ref={room} type="text" placeholder='room' />
                <button type='submit' onClick={readInput}>Submit</button>
            </div>
            <div>
                {chatValue.map((chat) =>
                    <li key={uuidv4}>{chat}</li>
                )}
            </div>
        </div >

    )
}

export default Room