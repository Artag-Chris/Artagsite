import { motion } from "framer-motion"

// Geometric shapes for the background
export const GeometricBackground = () => {
    // Colors to transition between (emerald shades and complementary colors)
    const colors = [
        "#10B981", // emerald-500
        "#059669", // emerald-600
        "#0D9488", // teal-600
        "#0891B2", // cyan-600
        "#6366F1", // indigo-500
        "#8B5CF6", // violet-500
    ]

    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            {/* Triangle 1 */}
            <motion.div
                className="absolute"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "60px solid transparent",
                    borderRight: "60px solid transparent",
                    borderBottom: "120px solid",
                    left: "5%",
                    top: "15%",
                }}
                animate={{
                    borderBottomColor: colors,
                    rotate: [0, 15, -5, 10, 0],
                    x: [0, 20, 40, 10, 0],
                    y: [0, 30, 10, 40, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />

            {/* Triangle 2 */}
            <motion.div
                className="absolute"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "40px solid transparent",
                    borderRight: "40px solid transparent",
                    borderBottom: "80px solid",
                    right: "10%",
                    top: "20%",
                }}
                animate={{
                    borderBottomColor: [...colors].reverse(),
                    rotate: [0, -20, 5, -15, 0],
                    x: [0, -30, -10, -50, 0],
                    y: [0, 40, 20, 60, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                }}
            />

            {/* Square */}
            <motion.div
                className="absolute w-24 h-24"
                style={{
                    left: "15%",
                    bottom: "15%",
                }}
                animate={{
                    backgroundColor: colors,
                    rotate: [0, 45, 90, 45, 0],
                    x: [0, 40, 20, 60, 0],
                    y: [0, -30, -60, -20, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 2,
                }}
            />

            {/* Circle 1 */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: "100px",
                    height: "100px",
                    right: "20%",
                    bottom: "25%",
                }}
                animate={{
                    backgroundColor: [...colors].reverse(),
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    x: [0, -50, -20, -70, 0],
                    y: [0, 30, 60, 20, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 3,
                }}
            />

            {/* Pentagon (approximated with CSS) */}
            <motion.div
                className="absolute"
                style={{
                    width: "80px",
                    height: "80px",
                    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    left: "40%",
                    top: "10%",
                }}
                animate={{
                    backgroundColor: colors,
                    rotate: [0, 30, 60, 30, 0],
                    x: [0, 60, 30, 90, 0],
                    y: [0, 50, 100, 50, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 4,
                }}
            />

            {/* Hexagon (approximated with CSS) */}
            <motion.div
                className="absolute"
                style={{
                    width: "70px",
                    height: "60px",
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    right: "30%",
                    top: "60%",
                }}
                animate={{
                    backgroundColor: [...colors].reverse(),
                    rotate: [0, -20, -40, -20, 0],
                    x: [0, -40, -80, -40, 0],
                    y: [0, -30, -60, -30, 0],
                }}
                transition={{
                    duration: 28,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 5,
                }}
            />

            {/* Small Triangle */}
            <motion.div
                className="absolute"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "25px solid transparent",
                    borderRight: "25px solid transparent",
                    borderBottom: "50px solid",
                    left: "70%",
                    bottom: "10%",
                }}
                animate={{
                    borderBottomColor: colors,
                    rotate: [0, 60, 120, 180, 240, 300, 360],
                    x: [0, 30, 60, 30, 0],
                    y: [0, -20, -40, -20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 6,
                }}
            />

            {/* Small Circle */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: "40px",
                    height: "40px",
                    left: "25%",
                    top: "50%",
                }}
                animate={{
                    backgroundColor: colors,
                    scale: [1, 1.5, 1, 0.8, 1],
                    x: [0, 50, 100, 50, 0],
                    y: [0, 30, 0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 7,
                }}
            />

            {/* Diamond */}
            <motion.div
                className="absolute"
                style={{
                    width: "60px",
                    height: "60px",
                    right: "15%",
                    top: "40%",
                }}
                animate={{
                    backgroundColor: [...colors].reverse(),
                    rotate: [45, 90, 135, 180, 225, 270, 315, 360],
                    x: [0, -40, -80, -40, 0],
                    y: [0, 40, 80, 40, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 8,
                }}
            />

            <motion.div
                className="absolute"
                style={{
                    width: "60px",
                    height: "60px",
                    right: "15%",
                    top: "40%",
                }}
                animate={{
                    backgroundColor: [...colors].reverse(),
                    rotate: [45, 90, 135, 180, 225, 270, 315, 360],
                    x: [0, -40, -80, -40, 0],
                    y: [0, 40, 80, 40, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 8,
                }}
            />
        </div>
    )
}
