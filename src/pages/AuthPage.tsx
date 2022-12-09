import { FC, FormEvent, useEffect, useRef, useState } from "react"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/UI/Button"
import { nickValidation } from "../auxiliaryFuctions"

export const AuthPage: FC = () => {
  const { enqueueSnackbar: snackbar } = useSnackbar()
  const navigate = useNavigate()
  const [inpValue, setInpValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  const singInUserHandler = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }
    if (inpValue && nickValidation(inpValue)) {
      sessionStorage.setItem('userName', inpValue.toLowerCase())
      navigate('/')
    } else {
      snackbar('The nickname does not meet the requirements of [a-z . _], min length 4, max 30')
    }
  }

  return (
    <div className=" max-w-[460px] sm:mx-auto mt-8 text-center bg-gray-100 p-5 rounded-2xl mx-4">
      <p className="text-gray-500 mb-2 text-center">Enter nickname</p>
      <form onSubmit={(e) => singInUserHandler(e)}>
        <input className="outline-none rounded mb-3 px-4 py-2 sm:w-2/3 w-full"
               value={inpValue}
               onChange={(e) => setInpValue(e.target.value)}
               ref={inputRef}
        />
      </form>

      <div className="text-end">
        <Button onClick={() => singInUserHandler()}>Sing in</Button>
      </div>
    </div>
  )
}
