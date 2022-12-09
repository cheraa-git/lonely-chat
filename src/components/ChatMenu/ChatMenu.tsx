import { FC, RefObject, useEffect, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import './ChatMenu.css'

interface ChatMenuProps {
  isOpen: boolean
  onClose: () => void
  items: { label: string; action: () => void }[]
  parentRef: RefObject<any>
}

export const ChatMenu: FC<ChatMenuProps> = ({ isOpen, items, onClose, parentRef }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const listenerHandler = (e: MouseEvent) => {
    if (menuRef.current && isOpen && parentRef.current) {
      const isDivClick = e.composedPath().includes(menuRef.current)
      const isParentClick = e.composedPath().includes(parentRef.current)
      if (!isDivClick && !isParentClick) {
        onClose()
        document.removeEventListener('click', listenerHandler)
      }
    }
  }

  useEffect(() => document.addEventListener('click', listenerHandler))

  return (
    <div className="relative">
      <CSSTransition in={isOpen} timeout={200} classNames="menu" nodeRef={menuRef} unmountOnExit mountOnEnter>
        <div
          className="absolute w-max bg-white right-0 text-base rounded-lg text-gray-600 mt-3 mr-3"
          ref={menuRef}>
          {items.map((item, index) => (
            <p className="border py-2 px-4 transition-all hover:text-orange-400 cursor-pointer"
               onClick={item.action}
               key={index}
            >
              {item.label}
            </p>
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}

