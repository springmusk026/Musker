import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 150, // Increase particle density
                        density: {
                            enable: true,
                            area: 800
                        }
                    },
                    color: {
                        value: ["#4f46e5", "#06b6d4", "#8b5cf6"], // Soft glowing colors
                        animation: {
                            enable: true,
                            speed: 4,
                            sync: false
                        }
                    },
                    shape: {
                        type: "circle", // Use circle shape for a neuron-like look
                    },
                    opacity: {
                        value: 0.7, // More visible particles
                        animation: {
                            enable: true,
                            speed: 0.5,
                            minimumValue: 0.3
                        }
                    },
                    size: {
                        value: { min: 2, max: 6 }, // Larger particles for visibility
                        animation: {
                            enable: true,
                            speed: 2,
                            minimumValue: 2,
                            sync: false
                        }
                    },
                    links: {
                        enable: true,
                        distance: 120, // Shorter distance for more connections
                        color: {
                            value: "#06b6d4"
                        },
                        opacity: 0.4, // Increase visibility of links
                        width: 1,
                        triangles: {
                            enable: true, // Show triangular links for a more network-like appearance
                        }
                    },
                    move: {
                        enable: true,
                        speed: 1, // Slightly faster movement for a dynamic feel
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "bounce"
                        },
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: ["grab", "bubble"]
                        },
                        onClick: {
                            enable: true,
                            mode: "push"
                        }
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            links: {
                                opacity: 0.6, // Enhance interaction opacity for a more visible effect
                                color: "#06b6d4"
                            }
                        },
                        bubble: {
                            distance: 200,
                            size: 8,
                            duration: 0.3,
                            opacity: 0.9
                        },
                        push: {
                            quantity: 4 // Increase the number of particles pushed
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        }
                    }
                },
                themes: [
                    {
                        name: "neural",
                        default: {
                            value: true,
                            mode: "light"
                        },
                        options: {
                            particles: {
                                links: {
                                    enable: true,
                                    distance: 120, // More connections
                                    opacity: 0.4,
                                    width: 1,
                                    triangles: {
                                        enable: true,
                                    }
                                },
                                move: {
                                    enable: true,
                                    speed: 1,
                                    direction: "none",
                                    random: true,
                                    straight: false,
                                    outModes: {
                                        default: "bounce"
                                    },
                                    attract: {
                                        enable: true,
                                        rotateX: 600,
                                        rotateY: 1200
                                    }
                                }
                            }
                        }
                    }
                ],
                detectRetina: true
            }}
        />
    );
};
