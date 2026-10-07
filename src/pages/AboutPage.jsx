import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import About from '../components/About'

export default function AboutPage() {
    return (
        <div className="pt-24 min-h-screen bg-[#141414]">
            {/* Top Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 text-xs text-slate-500 mb-6"
                >
                    <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-cyan-400 font-medium">About Us</span>
                </motion.div>
            </div>

            {/* Main About Section */}
            <About />
        </div>
    )
}
