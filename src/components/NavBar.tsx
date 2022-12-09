import { FC } from "react"
import logoutIcon from '../assets/logout.svg'
import { useNavigate } from "react-router-dom"

export const NavBar: FC = () => {
  const navigate = useNavigate()
  const userName = sessionStorage.getItem('userName')


  const logout = () => {
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('penPal')
    navigate('/auth')
  }
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center text-white block">
          <div className="block sm:flex min-w-[200px]">
            <h1 className="text-center text-3xl text-start">Lonely chat</h1>
            <p className="mt-0 text-start mt-auto ml-0 sm:ml-4">talk to the best of people</p>
          </div>
          <div className="ml-auto flex">
            <p className="text-xl mr-3 capitalize">{userName}</p>
            {
              userName
              && <img className="text-white transition-opacity hover:opacity-70 cursor-pointer"
                      src={logoutIcon}
                      width={30}
                      alt="logout-icon"
                      onClick={logout}
              />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}
