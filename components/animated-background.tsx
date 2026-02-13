  "use client";

  import { motion } from "framer-motion";

  export function AnimatedBackground() {
    const circles = [
      { size: 120, x: "5%", y: "10%", delay: 0, filled: true },
      { size: 80, x: "12%", y: "5%", delay: 0.5, filled: false },
      { size: 100, x: "8%", y: "18%", delay: 1, filled: false },
      { size: 60, x: "15%", y: "12%", delay: 1.5, filled: true },
    ];

    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full ${
              circle.filled 
                ? "bg-primary/10" 
                : "border-2 border-primary/20 bg-transparent"
            }`}
            style={{
              width: circle.size,
              height: circle.size,
              left: circle.x,
              top: circle.y,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              delay: circle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }
