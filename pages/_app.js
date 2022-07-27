import '../styles/globals.css'
import '../styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from '/components/Shared/Drawer';

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Drawer/>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
