// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const BentoGrid = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">

            {/* Hero Card - Large */}
            <motion.div
                className="col-span-full md:col-span-4 lg:col-span-4 h-80 rounded-2xl glass-effect p-8 flex flex-col justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-empire-purple to-empire-cyan bg-clip-text text-transparent">
                    Digital Empire
                </h1>
                <p className="text-xl text-empire-text/80">
                    Full Stack Developer | AI/ML Scientist | Blockchain Enthusiast
                </p>
                <p className="mt-4 text-empire-text/60">
                    Building the future, one project at a time
                </p>
            </motion.div>

            {/* Status Card */}
            <div className="col-span-full md:col-span-2 lg:col-span-2 h-80 rounded-2xl glass-effect p-6">
                <h3 className="text-empire-cyan font-semibold mb-4">Current Focus</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Portfolio Development</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">AI Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Learning DevOps</span>
                    </div>
                </div>
            </div>

            {/* Project Cards - Dynamic */}
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    className={`rounded-2xl glass-effect p-6 ${
                        index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-2 lg:col-span-2'
                    }`}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)" }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'In Development' ? 'bg-green-500/20 text-green-400' :
                            project.status === 'Planned' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                        }`}>
                            {project.status}
                        </span>
                    </div>
                    <p className="text-sm text-empire-text/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                            <span key={i} className="text-xs bg-empire-purple/20 text-empire-purple px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Footer Card */}
            <div className="col-span-full rounded-2xl glass-effect p-6 text-center">
                <p className="text-empire-text/60">More projects coming soon...</p>
            </div>
        </div>
    );
};

export default BentoGrid;