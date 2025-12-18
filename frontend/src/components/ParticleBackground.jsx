import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = ({ theme = "default" }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const configs = {
    default: {
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: "#a855f7" },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
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
          color: "#a855f7",
          opacity: 0.4,
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
      background: { color: "#000000" },
    },
    matrix: {
      particles: {
        number: { value: 100 },
        color: { value: "#00ff00" },
        shape: { type: "char", character: { value: ["0", "1"], font: "Courier New", weight: "400" } },
        opacity: { value: 0.8 },
        size: { value: 14 },
        move: { enable: true, speed: 5, direction: "bottom", outModes: { default: "out" } },
      },
      background: { color: "#000000" },
    },
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={configs[theme] || configs.default}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
