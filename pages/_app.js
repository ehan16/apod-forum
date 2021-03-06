import '../styles/index.css'
import { UserContextProvider } from './../util/auth'

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}