import LoginForm from './login-form'
import LogoutButton from './logout-button'

interface LoginProps {
  loggedIn: boolean
}

function Login({ loggedIn }: LoginProps) {
  return loggedIn ? <LogoutButton /> : <LoginForm />
}

export default Login
