import { SearchOutlined } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import axios from './axios';
import './Chat.css';

function Chat({ messages }) {
  const [input, setInput] = useState('');

  const sendMessage = async e => {
    e.preventDefault();

    setInput('');

    await axios.post('/messages/new', {
      name: 'Simba',
      message: input,
      timestamp: 'Just now!',
      received: false,
    });
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />

        <div className='chat__headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map(message => (
          <p
            key={message._id}
            className={`chat__message ${message.received && 'chat__reciever'}`}
          >
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
