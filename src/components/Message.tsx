import { FC } from "react"
import { IMessage } from "../types"
import { formatDate } from "../auxiliaryFuctions"

interface MessageProps {
  message: IMessage
}



export const Message: FC<MessageProps> = (props) => {
  const { message, from, date } = props.message
  const userName = sessionStorage.getItem('userName')

  const style = {
    jsfEnd: from.toLowerCase() === userName?.toLowerCase() ? "justify-end" : '',
    bgColor: from.toLowerCase() === userName?.toLowerCase() ? 'bg-orange-100' : 'bg-orange-50'
  }

  return (
    <div className={`my-5 pl-6 pr-4 flex items-center ${style.jsfEnd}`}>
      <div className={`p-3 ${style.bgColor} flex-col rounded-3xl max-w-[80%]`}>
        <p className="text-base text-gray-800">{message}</p>
        <p className="text-xs text-gray-400 text-end w-max">{formatDate(date)}</p>
      </div>
    </div>
  )
}
