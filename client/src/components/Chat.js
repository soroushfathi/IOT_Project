import React, { useState } from 'react';
import { fetchChatResponse } from '../helpers/fetchHelper';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {

      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setIsLoading(true);

      try {

        const aiResponse = await fetchChatResponse(input);
        setMessages((prev) => [
          ...prev,
          { text: aiResponse, sender: 'ai' },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: 'Error: Unable to fetch response.', sender: 'ai' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          borderBottom: '1px solid #ccc',
          padding: '1rem',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '0.5rem 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '10px',
                backgroundColor: msg.sender === 'user' ? '#007bff' : '#f4f4f4',
                color: msg.sender === 'user' ? '#fff' : '#000',
                borderRadius: '10px',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </span>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '10px',
                backgroundColor: '#f4f4f4',
                color: '#000',
                borderRadius: '10px',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              Typing...
            </span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '10px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
