"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useSpring, animated } from "react-spring"
import { FaXTwitter, FaTelegram, FaDiscord } from 'react-icons/fa6'
import { content } from './contentar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawX = (x: number, y: number, size: number) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1

      // Draw the main X
      ctx.beginPath()
      ctx.moveTo(x - size / 2, y - size / 2)
      ctx.lineTo(x + size / 2, y + size / 2)
      ctx.moveTo(x + size / 2, y - size / 2)
      ctx.lineTo(x - size / 2, y + size / 2)
      ctx.stroke()

      // Draw the border of the X
      const borderSize = size * 0.1
      ctx.beginPath()
      ctx.moveTo(x - size / 2 - borderSize, y - size / 2 - borderSize)
      ctx.lineTo(x, y - borderSize)
      ctx.lineTo(x + size / 2 + borderSize, y - size / 2 - borderSize)
      ctx.lineTo(x + borderSize, y)
      ctx.lineTo(x + size / 2 + borderSize, y + size / 2 + borderSize)
      ctx.lineTo(x, y + borderSize)
      ctx.lineTo(x - size / 2 - borderSize, y + size / 2 + borderSize)
      ctx.lineTo(x - borderSize, y)
      ctx.closePath()
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const xSize = Math.min(canvas.width, canvas.height) * 0.2
      const xSpacing = xSize * 1.5

      for (let y = -xSize; y < canvas.height + xSize; y += xSpacing) {
        for (let x = -xSize; x < canvas.width + xSize; x += xSpacing) {
          drawX(x, y, xSize)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ filter: 'blur(1px)' }}
    />
  )
}

const ContributorsNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [avatars, setAvatars] = useState<{ x: number; y: number; image: string }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      createAvatarPositions()
    }

    const createAvatarPositions = () => {
      const width = canvas.width
      const height = canvas.height
      const newAvatars = []
      const customAvatars = [
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727143002/SARIE_hmdkwq.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727143001/MRAWEG_ca42n6.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727143001/WISSAL_pupsnl.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727143000/MOAYED_yop15m.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142999/RISKY_gggbfg.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142998/TRUE6667_z5imkf.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142998/HESHAM_ocmbxa.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142997/AZIZ_yccani.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142996/IBRA_osun3c.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142996/BO_M7MED86_xxqdmu.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142995/MJ4ED_sulnns.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142994/ABRA_jab96u.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142994/LORDVON_r9uxye.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142992/ABDLRAHMAN_jwhlom.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142992/IBRAHIM_fpqh4v.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142992/BEN_GRAVIS_daubxm.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142992/D3_iocskq.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142991/BARON_ufo1bd.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1728474866/Mohammed_zwnncn.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1728474866/Ismaeil__v8tqqz.png",
        "https://res.cloudinary.com/ddbjj6er3/image/upload/v1728474866/TAMAZA_pjd1mw.png"
      ]
      const numAvatars = customAvatars.length
      const radius = Math.min(width, height) * 0.4
      const centerX = width / 2
      const centerY = height / 2

      for (let i = 0; i < numAvatars; i++) {
        const angle = (i / numAvatars) * Math.PI * 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        const image = customAvatars[i]
        newAvatars.push({ x, y, image })
      }
      setAvatars(newAvatars)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw static connections
      ctx.strokeStyle = 'rgba(255, 197, 0, 0.2)'
      ctx.lineWidth = 0.5

      avatars.forEach((avatar, i) => {
        avatars.forEach((otherAvatar, j) => {
          if (i !== j) {
            ctx.beginPath()
            ctx.moveTo(avatar.x, avatar.y)
            ctx.lineTo(otherAvatar.x, otherAvatar.y)
            ctx.stroke()
          }
        })
      })

      // Draw static curves
      ctx.strokeStyle = 'rgba(255, 197, 0, 0.4)'
      avatars.forEach((avatar, i) => {
        const nextAvatar = avatars[(i + 1) % avatars.length]
        const midX = (avatar.x + nextAvatar.x) / 2
        const midY = (avatar.y + nextAvatar.y) / 2
        const offset = 10 // Static offset

        ctx.beginPath()
        ctx.moveTo(avatar.x, avatar.y)
        ctx.quadraticCurveTo(midX, midY + offset, nextAvatar.x, nextAvatar.y)
        ctx.stroke()
      })
    }

    drawNetwork()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [avatars])

  return (
    <div className="relative w-full h-96 sm:h-[32rem] md:h-[40rem]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden"
          style={{
            left: `${avatar.x}px`,
            top: `${avatar.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Image
            src={avatar.image}
            alt={`Contributor ${index + 1}`}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142609/ax2_dwd5vx.png"
          alt="Central Logo"
          width={160}
          height={160}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.testimonials.list.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.testimonials.list.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + content.testimonials.list.length) % content.testimonials.list.length)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${currentIndex * 100}%)` }}
        >
          {content.testimonials.list.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4" style={{ direction: 'rtl' }}>
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl italic mb-4">
                &quot;{testimonial.text}&quot;
              </blockquote>
              <p className="text-sm sm:text-base md:text-lg font-semibold">{testimonial.name}</p>
              <p className="text-xs sm:text-sm text-gray-400">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    </div>
  )
}

const LanguageSelector = () => {
  const openPdfInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white text-black border-2 border-white rounded-none hover:bg-gray-100"
        >
          Whitepaper
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => openPdfInNewTab('https://cdn.prod.website-files.com/6367ab5fcaac032543037e7d/67066310688e87b11b14d3d6_Alphadhad%20-%20EN_V1.pdf')}
          className="cursor-pointer"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => openPdfInNewTab('https://cdn.prod.website-files.com/6367ab5fcaac032543037e7d/6706631d40d3f27ba3319fe3_Alphadhad%20-%20AR_V1.pdf')}
          className="cursor-pointer"
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function LandingPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const lightProps = useSpring({
    from: { strokeDashoffset: 0 },
    to: { strokeDashoffset: 2000 },
    config: { duration: 30000 },
    loop: true,
  })

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative overflow-hidden">
      <BackgroundEffect />
      <animated.svg
        className="fixed inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ ...lightProps, strokeDasharray: 2000 }}
      >
        <path
          d={`M ${dimensions.width / 2 - dimensions.height * 0.44} ${dimensions.height * 0.1}
             L ${dimensions.width / 2} ${dimensions.height * 0.4}
             L ${dimensions.width / 2 + dimensions.height * 0.44} ${dimensions.height * 0.1}
             L ${dimensions.width / 2 + dimensions.height * 0.04} ${dimensions.height / 2}
             L ${dimensions.width / 2 + dimensions.height * 0.44} ${dimensions.height * 0.9}
             L ${dimensions.width / 2} ${dimensions.height * 0.6}
             L ${dimensions.width / 2 - dimensions.height * 0.44} ${dimensions.height * 0.9}
             L ${dimensions.width / 2 - dimensions.height * 0.04} ${dimensions.height / 2}
             Z`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
        />
      </animated.svg>
      <div className="relative z-10">
        <header className="container mx-auto px-4 pt-4 pb-2 flex justify-center">
          <Image
            src="https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142609/ax2_dwd5vx.png"
            alt="(ض, a) Logo"
            width={300}
            height={300}
            className="w-auto h-32 sm:h-48"
          />
        </header>
        <main className="container mx-auto px-4 pt-2 pb-12 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
            {content.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mb-10">
            {content.hero.subtitle}
          </p>
          {/* Block 1 */}
          <div className="flex flex-col items-center mb-36">
            <div className="flex flex-col items-center">
              <p className="text-yellow-400 text-2xl font-bold mb-8">
                مجتمع الفــاضـــاد x حصري لملاك عملة AX فقط .. اذا كنت منهم ، قم بربط محفظتك عن طريق بوت التيليجرام
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-[#008000] text-white border-2 border-white rounded-none hover:bg-[#FFC500] hover:text-black hover:border-[#FFC500]"
                onClick={() => window.open('https://t.me/Alphadhad_X_Token_bot/', '_blank')}
              >
                {content.hero.cta}
              </Button>
            </div>
          </div>

          {/* Block 2 (modified with iframe) */}
          <div className="flex flex-col items-center mb-36">
            <div className="flex flex-col items-center">
              <p className="text-white text-2xl font-bold mb-8">
                لشــراء عملة AX ، يمكنك استخدام المنصة اللامركزية Stonfi من خلال النافذة ادناه
              </p>
              <div className="w-full max-w-[600px] min-w-[300px]">
                <iframe
                  src="https://app.ston.fi/swap?chartVisible=false&ft=TON&tt=EQCHtLuEy6Oh2mLclUwC9yoHn2dWuvMYjyRaqt3EgP_jX_xN"
                  height="660"
                  width="100%"
                  style={{
                    border: 0,
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '10px',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-36">
            <LanguageSelector />
          </div>

          <section className="w-full max-w-4xl mx-auto mb-36">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{content.features.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12">{content.features.subtitle}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {content.features.list.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC500] mr-6 flex-shrink-0 mt-4" />
                  <div className="flex-grow bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold">{feature}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-6xl mx-auto mb-36">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{content.contributors.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12">
              {content.contributors.subtitle}
            </p>
            <ContributorsNetwork />
          </section>

          <section className="w-full max-w-6xl mx-auto mb-36">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{content.testimonials.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12">
              {content.testimonials.subtitle}
            </p>
            <TestimonialCarousel />
          </section>

          <section className="w-full max-w-6xl mx-auto mb-36">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-center">{content.process.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 text-center">
              {content.process.subtitle}
            </p>
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center w-full">
                <Image
                  src="https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142585/01_dfrzzy.png"
                  alt="Operation Data Form"
                  width={800}
                  height={600}
                  className="w-full h-auto mb-4"
                />
                <p className="text-sm sm:text-base text-gray-300">
                  {content.process.steps[0].description}
                </p>
              </div>
              <div className="flex flex-col items-center w-full">
                <Image
                  src="https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142585/02_fcnpkf.png"
                  alt="Second Image"
                  width={800}
                  height={600}
                  className="w-full h-auto mb-4"
                />
                <p className="text-sm sm:text-base text-gray-300">
                  {content.process.steps[1].description}
                </p>
              </div>
              <div className="flex flex-col items-center w-full">
                <Image
                  src="https://res.cloudinary.com/ddbjj6er3/image/upload/v1727142594/03_ew3c6c.png"
                  alt="Third Image"
                  width={800}
                  height={600}
                  className="w-full h-auto mb-4"
                />
                <p className="text-sm sm:text-base text-gray-300">
                  {content.process.steps[2].description}
                </p>
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="w-full max-w-4xl mx-auto mb-36">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-center">{content.faq.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 text-center">
              {content.faq.subtitle}
            </p>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto rtl">
              {content.faq.questions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-gray-700">
                  <AccordionTrigger className="text-right py-4 px-2">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="py-4 px-2 text-right text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* New "Learn More" button below FAQ section */}
          <div className="flex flex-col items-center mb-36">
            <p className="text-yellow-400 text-2xl font-bold">
            مجتمع الفــاضـــاد x حصري لملاك عملة AX فقط .. اذا كنت منهم ، قم بربط محفظتك عن طريق بوت التيليجرام
            </p>
            <div className="mt-8">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-[#008000] text-white border-2 border-white rounded-none hover:bg-[#FFC500] hover:text-black hover:border-[#FFC500]"
                onClick={() => window.open('https://t.me/Alphadhad_X_Token_bot', '_blank')}
              >
                {content.hero.cta}
              </Button>
            </div>
          </div>
        </main>
      </div>
      <footer className="container mx-auto px-4 py-6 flex flex-col items-center relative z-10 text-gray-400">
        <Link 
          href="https://www.alphadhad.com/disclaimer" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 underline mb-4 hover:text-white"
        >
          Disclaimer
        </Link>
        <div className="flex justify-center gap-6">
          <Link href="https://x.com/alphadhad" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">{content.footer.xTwitter}</span>
          </Link>
          <Link href="https://t.me/Alphadhad" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTelegram className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">{content.footer.telegram}</span>
          </Link>
          <Link href="https://discord.gg/alphadhad" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaDiscord className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">{content.footer.discord}</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
