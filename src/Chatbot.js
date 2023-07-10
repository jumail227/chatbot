import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css'
const socket = io('http://localhost:3001');
// import { FaTelegramPlane } from 'react-icons/fa/FaTelegramPlane';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up event listener on component unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (messageInput.trim() !== '') {
      // Emit the chat message event to the server
      socket.emit('chat message', messageInput);
      setMessageInput('');
    }
  };

 
  
  return (
    <div  className='chat-container'>
<div className=' users'>
  <h1>ChatGram</h1>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
{/* <FaTelegramPlane/> */}

<div className='allitem'>
      <h1 className='chat-header'>
        Chat
      </h1>
      <div className='border'></div>
     <div className='chatitem'>
        {messages.map((message, index) => (
          <div className='chat-message'>
          <li  key={index}>{message}</li>
          </div>
        ))}

</div>

      <div>
<div className='secborder'></div>
      <form onSubmit={sendMessage} className='chat-form' >
        <input className='chat-input'
          type="text"
          value={messageInput}
          placeholder='Type message...'
          onChange={(e) => setMessageInput(e.target.value)}
          />
        
        <button type="submit" className='send-button'>SEND </button>
    
      </form>
          </div>
      

      </div>
     </div>
  )
}

export default Chatbot
