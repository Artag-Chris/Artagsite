"use client"

import { Heart, Zap, Shield, Lightbulb, ExternalLink } from "lucide-react"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function MyFaithPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Animate main title
      gsap.from(".main-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      })

      // Animate subtitle
      gsap.from(".subtitle", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3,
      })

      // Animate faith journey items
      gsap.utils.toArray(".faith-card").forEach((card, index) => {
        gsap.from(card as Element, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 80%",
          },
          delay: index * 0.1,
        })
      })

      // Animate church section
      gsap.from(".church-section", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".church-section",
          start: "top 75%",
        },
      })

      // Animate testimonial quote
      gsap.from(".testimonial-main", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5,
      })
    },
    { scope: containerRef },
  )

  const journeySteps = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "When I Was Alone",
      description:
        "In my loneliest moments, God gave me a family—a wife and a daughter. They became His tangible presence in my life, reminding me that I was never truly alone.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "When I Had Nothing",
      description:
        "When I had no income and no clear direction, God provided employment and a profession. He gave me skills and opportunities I never thought possible.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "When I Felt Lost",
      description:
        "In my times of doubt and despair, God accompanied me with His presence. His silent comfort reminded me that He walks with me through every valley.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "When I Doubted",
      description:
        "Every time I lost faith, God proved me wrong. He demonstrated His faithfulness again and again, turning my doubts into deeper conviction.",
      color: "from-purple-500 to-indigo-500",
    },
  ]

  return (
    <main ref={containerRef} className="bg-gradient-to-b from-zinc-900 via-blue-900/20 to-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-10 pt-32 md:pt-40 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="main-title text-6xl md:text-7xl font-bold mb-8 text-white leading-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
              Faith
            </span>
          </h1>
          <p className="subtitle text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            A testimony of God's endless faithfulness in my life
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="testimonial-main bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/30 rounded-2xl p-8 md:p-12 mb-20 backdrop-blur-sm">
          <p className="text-lg md:text-xl text-zinc-100 leading-relaxed font-light">
            I have walked through seasons where I lost faith—moments where I felt I was not advancing in life. But my God
            always proved me wrong. When I was alone, He gave me family: a beloved wife and a daughter who fill my days
            with purpose. When I had nothing to eat, He provided employment and a profession. When loneliness threatened
            to consume me, He accompanied me with His presence and silence—a comforting reminder that I was never
            forsaken.
          </p>
          <p className="text-lg md:text-xl text-blue-300 leading-relaxed font-light mt-6">
            I owe everything I am to my God. I will not force you to believe as I do—I respect where you stand. But I
            will not remain silent about His goodness to me and to my family.
          </p>
        </div>

        {/* Faith Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {journeySteps.map((step, index) => (
            <div
              key={index}
              className="faith-card bg-gradient-to-br from-zinc-800 to-zinc-900 border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${step.color} mb-6 text-white`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">{step.description}</p>

              {/* Decorative line */}
              <div className={`h-0.5 w-8 bg-gradient-to-r ${step.color} mt-6`} />
            </div>
          ))}
        </div>

        {/* Centered Quote */}
        <div className="text-center py-16 border-y border-blue-500/20">
          <p className="text-2xl md:text-3xl font-light text-blue-200 italic leading-relaxed max-w-3xl mx-auto">
            "I owe everything to my God. Not because I must, but because His faithfulness transformed my life."
          </p>
        </div>

        {/* Personal Reflection */}
        <div className="my-20 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">My Journey of Faith</h2>
          <div className="space-y-6 text-zinc-300">
            <p className="text-lg leading-relaxed">
              Every time I felt abandoned, God showed me I was surrounded by love. Every time I felt inadequate, He
              equipped me with the skills I needed. Every moment of despair became a classroom for deeper faith.
            </p>
            <p className="text-lg leading-relaxed">
              My faith is not perfect. There are days when doubt creeps in, when challenges seem insurmountable. But in
              those moments, I look back at what God has done—at my family, at my profession, at the doors He has
              opened—and I am reminded that He is faithful.
            </p>
            <p className="text-lg leading-relaxed">
              This is why I speak of His goodness. Not to judge those who believe differently, but to testify that His
              presence in my life has been real, tangible, and transformative. My story is evidence of His grace.
            </p>
          </div>
        </div>

        {/* Church Section */}
        <div className="church-section bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 border-2 border-blue-500/40 rounded-2xl p-8 md:p-12 backdrop-blur-sm my-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Church Community</h2>
              <p className="text-lg text-zinc-200 mb-6 max-w-2xl leading-relaxed">
                I am part of{" "}
                <span className="font-semibold text-blue-300">
                  Iglesia del Ministerio de Jesucristo Internacional (IDMJI)
                </span>
                , where I grow in faith, find community, and serve alongside brothers and sisters in Christ.
              </p>
              <p className="text-sm md:text-base text-zinc-300 mb-6">
                If you're curious about our faith community or would like to learn more about IDMJI, I invite you to visit our website.
              </p>
              <a
                href="https://idmji.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Visit IDMJI
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Decorative element */}
            <div className="hidden md:flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30"
                  style={{
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light">
              This is my faith: real, honest, and transformative. Not perfect, but authentic. Not demanded, but offered.
            </p>
            <div className="mt-12 w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating animation style */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </main>
  )
}
