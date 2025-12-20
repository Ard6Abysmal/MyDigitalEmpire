// ============================================
// CENTRALIZED TECH ICON MAPPING
// Only uses VERIFIED icons from react-icons
// ============================================

import { 
  SiPython, SiPytorch, SiTensorflow, SiOpencv, SiNumpy, SiJupyter,
  SiReact, SiNodedotjs, SiFastapi, SiMongodb, SiPostgresql, SiRedis,
  SiArduino, SiRaspberrypi, SiEspressif,
  SiSolidity, SiEthereum, SiWeb3Dotjs,
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiDocker, SiKubernetes, SiGit, SiLinux,
  SiCplusplus, SiC,
  SiFirebase, SiSupabase, SiVercel, SiNetlify,
  SiMqtt, SiGraphql, SiVite, SiNpm, SiSqlite
} from 'react-icons/si';

import { 
  FaMicrochip, FaRobot, FaGamepad, FaBrain, FaDatabase, 
  FaCloud, FaCode, FaJava, FaMicrosoft, FaTerminal,
  FaCogs, FaMemory, FaMicrophone, FaWifi, FaBolt
} from 'react-icons/fa';

import { AiOutlineThunderbolt } from 'react-icons/ai';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc'; // ✅ VS Code icon

export const techIcons = {
  // ==================== Programming Languages ====================
  'Python': SiPython,
  'C++': SiCplusplus,
  'C': SiC,
  'Java': FaJava,
  'C#': TbBrandCSharp,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Bash': SiLinux,
  'MATLAB': FaMicrosoft,
  'Shell': FaTerminal,
  
  // ==================== AI/ML ====================
  'PyTorch': SiPytorch,
  'TensorFlow': SiTensorflow,
  'OpenCV': SiOpencv,
  'NumPy': SiNumpy,
  'Jupyter': SiJupyter,
  'Computer Vision': SiOpencv,
  'AI': FaBrain,
  'ML': FaBrain,
  'Deep Learning': FaBrain,
  'Groq AI': FaBrain,
  'Machine Learning': FaBrain,
  'Neural Networks': FaBrain,
  
  // ==================== Web Development ====================
  'React': SiReact,
  'Node.js': SiNodedotjs,
  'FastAPI': SiFastapi,
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'Tailwind': SiTailwindcss,
  'TailwindCSS': SiTailwindcss,
  'Vite': SiVite,
  'Express': SiNodedotjs,
  'Next.js': SiReact,
  
  // ==================== Databases ====================
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Redis': SiRedis,
  'SQLite': SiSqlite,
  'Database': FaDatabase,
  'SQL': FaDatabase,
  'NoSQL': FaDatabase,
  
  // ==================== Embedded & Electronics ====================
  'Arduino': SiArduino,
  'Raspberry Pi': SiRaspberrypi,
  'ESP32': SiEspressif,
  'ESP8266': SiEspressif,
  'Embedded C': SiC,
  'MPU6050': FaMicrochip,
  'GSM800L': FaMicrochip,
  'Neo-6M': FaMicrochip,
  'GPS': FaMicrochip,
  'GSM': FaMicrochip,
  'Sensors': FaMicrochip,
  'IoT': FaWifi,
  'Robotics': FaRobot,
  'Microcontroller': FaMicrochip,
  'PCB Design': FaMicrochip,
  
  // ==================== VLSI & Hardware ====================
  'VLSI': FaMicrochip,
  'Neuromorphic': FaBrain,
  'Graphene': FaMicrochip,
  'Edge AI': FaBrain,
  'CUDA': AiOutlineThunderbolt,
  'GPU': AiOutlineThunderbolt,
  'GPU Optimization': AiOutlineThunderbolt,
  'FPGA': FaMicrochip,
  'ASIC': FaMicrochip,
  'RTL Design': FaMicrochip,
  'Verilog': FaCode,
  'VHDL': FaCode,
  
  // ==================== Blockchain ====================
  'Solidity': SiSolidity,
  'Ethereum': SiEthereum,
  'Web3.js': SiWeb3Dotjs,
  'Smart Contracts': SiEthereum,
  'Blockchain': SiEthereum,
  'Crypto': SiEthereum,
  
  // ==================== DevOps & Tools ====================
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Git': SiGit,
  'GitHub': SiGit,
  'Linux': SiLinux,
  'Firebase': SiFirebase,
  'Supabase': SiSupabase,
  'Vercel': SiVercel,
  'Netlify': SiNetlify,
  'VS Code': VscCode, // ✅ FIXED - Using VscCode
  'npm': SiNpm,
  'CI/CD': FaCogs,
  
  // ==================== Protocols & APIs ====================
  'MQTT': SiMqtt,
  'GraphQL': SiGraphql,
  'REST API': FaCloud,
  'WebSocket': FaWifi,
  'HTTP': FaCloud,
  'UART': FaBolt,
  'I2C': FaBolt,
  'SPI': FaBolt,
  
  // ==================== Misc ====================
  'Cloud': FaCloud,
  'Gaming': FaGamepad,
  'Game Dev': FaGamepad,
  'Audio': FaMicrophone,
  'Memory': FaMemory,
  'Performance': FaBolt,
  'Optimization': FaBolt,
  'Testing': FaCogs,
  'Debugging': FaCogs,
  
  // ==================== Default Fallback ====================
  'default': FaCode,
};

/**
 * Get the icon component for a given technology
 * @param {string} tech - Technology name
 * @returns {React.Component} Icon component
 */
export const getTechIcon = (tech) => {
  if (!tech) return techIcons['default'];
  
  // Direct match
  if (techIcons[tech]) {
    return techIcons[tech];
  }
  
  // Case-insensitive match
  const lowerTech = tech.toLowerCase();
  const matchedKey = Object.keys(techIcons).find(
    key => key.toLowerCase() === lowerTech
  );
  
  if (matchedKey) {
    return techIcons[matchedKey];
  }
  
  // Partial match (e.g., "TensorFlow 2.0" matches "TensorFlow")
  const partialMatch = Object.keys(techIcons).find(
    key => lowerTech.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerTech)
  );
  
  if (partialMatch) {
    return techIcons[partialMatch];
  }
  
  // Fallback to default icon
  return techIcons['default'];
};

/**
 * Get icon as JSX element
 * @param {string} tech - Technology name
 * @param {string} className - CSS classes for icon
 * @returns {JSX.Element} Icon element
 */
export const getTechIconElement = (tech, className = 'w-4 h-4') => {
  const IconComponent = getTechIcon(tech);
  return <IconComponent className={className} />;
};

export default techIcons;
