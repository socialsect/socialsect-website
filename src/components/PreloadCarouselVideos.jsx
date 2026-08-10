'use client'
import { useEffect } from 'react'
import { preloadAll } from '../lib/videoPreloader'

const CAROUSEL_VIDEO_URLS = [
  "https://aquamarine-bee-678141.hostingersite.com/videos/%231.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/0214%20(2)(1).mov",
  "https://aquamarine-bee-678141.hostingersite.com/videos/544.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/547.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Animated_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/%C2%BFListo%20para%20eliminar%20tus%20varices%20%F0%9F%92%89%C2%A1Deja%20que%20los%20expertos%20se%20encarguen%20de%20ello!%20En%20@nymetrovein%20.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Miami%20Eng_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Miami%20esp_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Msi%20Testimonial%201.mov",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Msi%20testimonial%202.mov",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Online%20course_2.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Si%20piensas%20que%20los%20remedios%20untados%20te%20van%20a%20eliminar%20las%20varices%20pues%20no%20pierdas%20tu%20tiempo%20ombe.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Socket%20grafting_2.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Veins_3_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Video%201.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-14%20at%202.28.13%20PM.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%2010.53.43%20PM%20(1).mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%205.53.49%20PM%20(1).mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%205.53.49%20PM.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-09-04%20at%201.18.04%20PM.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/A%20mis%2041%20a%C3%B1os%20estoy%20contenta%20con%20la%20salud%20de%20mis%20piernas%20%F0%9F%A6%B5%20gracias%20a%20@nymetrovein%20que%20me%20elimin%20(1).mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/AQPIFdom17VsWLVOxSM4qlVxKrghIv-PFTFZ4fUVLPm7QgbKyRmrs_BDUCT5hD3gtXEzfHa17S_nXzC_67HX5JUg.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/C%C3%B3mo%20lucir%20unas%20piernas%20hermosas%20gracias%20a%20@nymetrovein%20elim%C3%ADnalas%20sin%20dolor%20y%20en%20manos%20de%20m%C3%A9dic.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Resp%C3%A9tame%20@maicolnova%20,%20qu%C3%A9%20lo%20m%C3%ADo%20ha%20sido%20palo%20y%20palo%20desde%20el%208%20de%20enero%20,%20pero%20ninguno%20como%20.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Si%20soy%20una%20ciudadana%20seria%20,%20pero%20sin%20venas%20varicosas%20tambi%C3%A9n%20un%20chin%20atrevida%20,%20gracias%20a%20@nyme%20(1).mp4"
]

export default function PreloadCarouselVideos() {
  useEffect(() => {
    preloadAll(CAROUSEL_VIDEO_URLS, { batchSize: 3, delayMs: 400 })
  }, [])

  return null
}
