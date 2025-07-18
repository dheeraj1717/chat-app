import { useEffect, useRef, useState } from 'react';
import './App.css'
function App() {
const [messages, setMessages] = useState<string[]>([])
const [socket,setSocket] = useState<WebSocket>();
const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080')
    setSocket(ws);
    ws.onopen = () => {
      ws.send(JSON.stringify({type:'join',payload:{roomId:'room1'}}))
    }
    ws.onmessage = (event) => {
      setMessages(messages => [...messages, event.data])}

      return () => {
        ws.close();
      }
  },[])
  const handleSendMessage = () => {
    socket?.send(JSON.stringify({type:'chat',payload:{message:inputRef.current?.value}}));
  }
  return(
  <div className="h-screen flex flex-col gap-1">
    {
      messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))
    }
    <div className="flex">
      <input ref={inputRef} type="text" className='w-full border'/>
      <button className='w-20 font-bold text-lg text-white bg-black' onClick={handleSendMessage}>Send</button>
    </div>
  </div>
  )
}

export default App;
