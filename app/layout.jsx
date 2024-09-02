import "@styles/globals.css"

import Nav from "@components/Nav"
import Provider from "@components/Provider"

/* Layout.jsx is applied on EVERY Page !!! e.g. for Navbars, Footers etc. */

export const metadata = {
    title: "Promptopia",
    description: "Discover and share AI Prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout