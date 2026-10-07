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
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'
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
    const location = useLocation()
    const isAdminRoute = location.pathname.endsWith('/admin')

    return (
        <div className="min-h-screen bg-[#141414] font-sans overflow-x-hidden">
            <ScrollToTop />
            {/* Hide standard navbar on member admin portal to avoid double-navbar collision */}
            {!isAdminRoute && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/portfolio" element={<PortfolioListing />} />
                    <Route path="/portfolio/:slug" element={<MemberPortfolio />} />
                    <Route path="/portfolio/:slug/admin" element={<MemberPortfolioAdmin />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    )
}
