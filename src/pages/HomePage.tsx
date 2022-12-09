import { FC, FormEvent, useState } from "react"
import { ChatWindow } from "../components/ChatWindow"
import { Button } from "../components/UI/Button"
import { nickValidation } from "../auxiliaryFuctions"
import { useSnackbar } from "notistack"

export const HomePage: FC = () => {
  const { enqueueSnackbar: snackbar } = useSnackbar()
  const [penPalNick, setPenPalNick] = useState(sessionStorage.getItem('penPal'))
  const [penPalInp, setPenPalInp] = useState('')


  const findPenPal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (penPalInp && nickValidation(penPalInp)) {
      sessionStorage.setItem('penPal', penPalInp)
      setPenPalNick(penPalInp)
    } else {
      snackbar('The nickname does not meet the requirements of [a-z . _], min length 4, max 30')
    }
  }

  const removePenPalHandler = () => {
    sessionStorage.removeItem('penPal')
    setPenPalNick('')
    setPenPalInp('')
  }

  return (
    <div className="max-w-3xl mx-auto py-4">

      {
        !penPalNick
          ? <div className={`pt-2 pb-4 px-4 mx-2 rounded bg-gray-100`}>
            <p className="text-base text-gray-500 mb-2 ">Enter the nickname of the user you want to write to</p>
            <form onSubmit={(e) => findPenPal(e)}>
              <input className="outline-none w-1/2 px-4 py-1 rounded"
                     value={penPalInp}
                     onChange={(e) => setPenPalInp(e.target.value)}
                     autoFocus
              />
              <Button type="submit" className="ml-4">Найти</Button>
            </form>
          </div>
          : <ChatWindow penPalNick={penPalNick} removePenPal={removePenPalHandler}/>
      }

    </div>
  )
}
