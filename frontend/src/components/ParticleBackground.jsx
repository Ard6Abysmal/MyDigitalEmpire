import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from '../context/ThemeContext'; // NEW

const ParticleBackground = ({ theme = "default" }) => {
  const { isDark } = useTheme(); // NEW - Get theme state
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Theme-aware colors
  const particleColor = isDark ? '#a855f7' : '#06b6d4'; // Purple for dark, Cyan for light
  const linkColor = isDark ? '#a855f7' : '#06b6d4';
  const bgColor = isDark ? '#000000' : '#ffffff';
  const particleOpacity = isDark ? 0.5 : 0.3;
  const linkOpacity = isDark ? 0.4 : 0.2;

  const configs = {
    default: {
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: particleColor }, // Theme-aware color
        shape: { type: "circle" },
        opacity: {
          value: particleOpacity, // Theme-aware opacity
          random: true,
          animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false },
        },
        links: {
          enable: true,
          distance: 150,
          color: linkColor, // Theme-aware link color
          opacity: linkOpacity, // Theme-aware link opacity
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 1 } },
          push: { quantity: 4 },
        },
      },
      background: { color: bgColor }, // Theme-aware background
    },
    matrix: {
      particles: {
        number: { value: 100 },
        color: { value: "#00ff00" }, // Matrix theme stays green
        shape: { 
          type: "char", 
          character: { 
            value: ["0", "1"], 
            font: "Courier New", 
            weight: "400" 
          } 
        },
        opacity: { value: isDark ? 0.8 : 0.4 }, // Theme-aware opacity for matrix
        size: { value: 14 },
        move: { 
          enable: true, 
          speed: 5, 
          direction: "bottom", 
          outModes: { default: "out" } 
        },
      },
      background: { color: bgColor }, // Theme-aware background
    },
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={configs[theme] || configs.default}
      className="absolute inset-0 -z-10 transition-opacity duration-300"
    />
  );
};

export default ParticleBackground;
