import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton: React.FC = () => {

    const { logout } = useAuth0();

  return (
    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={() => logout()}>Logout</button>
  )
}

export default LogoutButton