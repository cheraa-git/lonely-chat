import { FC, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import './ChatRemoveAlert.css'

interface ChatRemoveAlertProps {
  onRemove: () => void
  isOpen: boolean
  onClose: () => void
}

export const ChatRemoveAlert: FC<ChatRemoveAlertProps> = ({ isOpen, onClose, onRemove }) => {
  const alertRef = useRef<HTMLDivElement>(null)

  const removeHandler = () => {
    onRemove()
    onClose()
  }


  return (
    <CSSTransition in={isOpen} timeout={200} classNames="alert" nodeRef={alertRef} unmountOnExit mountOnEnter>
      <div className="absolute bg-gray-800 opacity-60 left-0 right-0 top-0 bottom-0">
        <div className="absolute bg-white top-[20vh] left-[40vw] p-6 rounded-lg" ref={alertRef}>
          <p className="mb-4">Do you really want to delete the chat?</p>
          <div className="flex justify-between">
            <button
              className=" text-base transition-opacity hover:opacity-70"
              onClick={onClose}
            >Cancel
            </button>
            <button
              className="text-orange-600 text-base transition-opacity hover:opacity-70"
              onClick={removeHandler}
            >Remove
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
