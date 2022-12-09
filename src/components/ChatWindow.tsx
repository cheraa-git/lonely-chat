import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react"
import sendIcon from '../assets/send.svg'
import userIcon from '../assets/user.svg'
import { Message } from "./Message"
import { IMessage } from "../types"
import barsIcon from '../assets/bars.svg'
import { ChatMenu } from "./ChatMenu/ChatMenu"
import { ChatRemoveAlert } from "./ChatRemoveAlert/ChatRemoveAlert"


interface ChatWindowProps {
  penPalNick: string | null
  removePenPal: () => void
}

export const ChatWindow: FC<ChatWindowProps> = ({ penPalNick, removePenPal }) => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<IMessage[]>(fetchInitMessages())
  const scrollBlock = useRef<HTMLDivElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [alertIsOpen, setAlertIsOpen] = useState(false)
  const menuBtnRef = useRef(null)

  const menuItems = [
    { label: 'Find another chat', action: removePenPal },
    { label: 'Clear this chat', action: () => setAlertIsOpen(true) },
  ]

  useEffect(() => {
    if (alertIsOpen) setMenuIsOpen(false)
  }, [alertIsOpen])

  const storageEventHandler = useCallback((e: StorageEvent) => {
    setMessages(JSON.parse(e.newValue || ''))
    window.removeEventListener('storage', storageEventHandler)
  }, [])

  useEffect(() => {
    window.addEventListener('storage', storageEventHandler)
  }, [messages, storageEventHandler])

  useEffect(() => {
    if (scrollBlock.current) {
      scrollBlock.current.scrollTop = scrollBlock.current.scrollHeight
    }
  }, [scrollBlock, messages, penPalNick])

  function fetchInitMessages() {
    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem('messages') || '')
  }

  function sendMessage(event?: FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault()
    if (!inputValue) return
    const newMessage = {
      id: `${Date.now()}`,
      message: inputValue,
      from: sessionStorage.getItem('userName') || '',
      to: sessionStorage.getItem('penPal') || '',
      date: `${new Date()}`
    }
    localStorage.setItem('messages', JSON.stringify([...messages, newMessage]))
    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
  }

  function removeChat() {
    const remainingMessages = messages.filter(mess => !filterMessages().includes(mess))
    localStorage.setItem('messages', JSON.stringify(remainingMessages))
    setMessages(remainingMessages)
  }

  function filterMessages(): IMessage[] {
    return messages.filter(mess => {
      const userNick = sessionStorage.getItem('userName')?.toLowerCase()
      const penPalNick = sessionStorage.getItem('penPal')?.toLowerCase()
      const from = mess.from.toLowerCase()
      const to = mess.to.toLowerCase()
      if ((from === userNick || from === penPalNick) && ((to === userNick || to === penPalNick))) {
        return mess
      }
      return false
    })
  }

  return (
    <div className="mx-2 rounded bg-gray-100">
      <div>
        <div className="w-full bg-orange-400 rounded-t text-white h-9 flex items-center pl-4">
          <img src={userIcon} alt="user-icon" width={30}/>
          <span className="ml-1 capitalize">{penPalNick}</span>
          <img className="ml-auto mr-4 transition-opacity hover:opacity-70 cursor-pointer"
               onClick={() => setMenuIsOpen(prev => !prev)}
               src={barsIcon} alt="menu"
               width={30}
               ref={menuBtnRef}
          />

        </div>

        <ChatMenu isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)} items={menuItems} parentRef={menuBtnRef}/>
        <ChatRemoveAlert onRemove={removeChat} isOpen={alertIsOpen} onClose={() => setAlertIsOpen(false)}/>

        <div className="h-[60vh] overflow-y-scroll snap-end" ref={scrollBlock}>
          {filterMessages().map(mess => <Message message={mess} key={mess.id}/>)}
        </div>

        <form className="flex bg-white rounded-b py-1" onSubmit={(event) => sendMessage(event)}>
          <input type="text"
                 className="w-full outline-none py-1 px-4 rounded-b"
                 placeholder="Message..."
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 autoFocus
          />
          <img className="mr-2 hover:opacity-50 transition-opacity cursor-pointer text-orange-400"
               src={sendIcon} alt="send-icon" width={30} onClick={() => sendMessage()}/>
        </form>
      </div>
    </div>
  )
}
