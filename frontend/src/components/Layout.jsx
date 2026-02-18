import { Outlet, useLocation } from 'react-router-dom'
import './Layout.css'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  const isHeroPage = pathname === '/'

  return (
    <div className="layout">
      <div className="layout__bg" aria-hidden="true" />
      <Header />
      <main className={`main ${isHeroPage ? 'main--fullpage' : ''}`}>
        <Outlet />
      </main>
      {!isHeroPage && <Footer />}
    </div>
  )
}
