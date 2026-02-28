import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
    return (
        <div className="min-h-screen bg-[#141414] font-sans overflow-x-hidden">
            <Navbar />
            <main>
                <Hero logoSrc={null} />
                <Services />
                <About />
                <Team />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
