import type { PropsWithChildren } from "react"
import Header from "../Header/Header"

const Layout = ({children}: PropsWithChildren) => {
  return (
    <>
    <header>
      <Header/>
    </header>
    <main className="container mt-4">
      {children}
    </main>
    </>
  )
}

export default Layout