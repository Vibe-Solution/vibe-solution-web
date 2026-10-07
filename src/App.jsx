import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Team from './components/Team'
import HomePortfolio from './components/HomePortfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PortfolioListing from './components/portfolio/PortfolioListing'
import MemberPortfolio from './components/portfolio/MemberPortfolio'
import MemberPortfolioAdmin from './components/portfolio/MemberPortfolioAdmin'
import vibeLogo from './assets/vibe-logo.jpg'

// Automatic scroll-to-top when navigating between routes
function ScrollToTop() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            const element = document.querySelector(hash)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [pathname, hash])

    return null
}

function HomePage() {
    return (
        <>
            <Hero logoSrc={vibeLogo} />
            <Services />
            <About />
            <Team />
            <HomePortfolio />
            <Contact />
        </>
    )
}

export default function App() {
    return (
        <div className="min-h-screen bg-[#141414] font-sans overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/portfolio" element={<PortfolioListing />} />
                    <Route path="/portfolio/:slug" element={<MemberPortfolio />} />
                    <Route path="/portfolio/:slug/admin" element={<MemberPortfolioAdmin />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}
