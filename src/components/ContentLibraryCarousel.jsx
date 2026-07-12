'use client'
import { useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ContentLibraryCarousel.css'

const REELS = [
  { id: "001", title: "Ortho Patient Journey", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/1_trjeza.mp4" },
  { id: "002", title: "Shoulder Procedure — Surgical Walkthrough", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/0214_2_1_sebosk.mov" },
  { id: "003", title: "Med Spa Treatment Experience", vertical: "Med Spa", url: "https://res.cloudinary.com/us5bum0a/video/upload/544_trqke3.mp4" },
  { id: "004", title: "Aesthetic Results — Before & After", vertical: "Med Spa", url: "https://res.cloudinary.com/us5bum0a/video/upload/547_jjr43o.mp4" },
  { id: "005", title: "A mis 41 años — piernas sanas", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/A_mis_41_an%CC%83os_estoy_contenta_con_la_salud_de_mis_piernas_gracias_a_nymetrovein_que_me_elimin_1_hiqai2.mp4" },
  { id: "006", title: "Animated Patient Education Explainer", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/Animated_1_ahdv1f.mp4" },
  { id: "007", title: "Vascular Patient — Life After Treatment", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/AQPlFdom17VsWLVOxSM4qlVxKrghIv-PFTFZ4fUVLPm7QgbKyRmrs_BDUCT5hD3gtXEzfHa17S_nXzC_67HX5JUg_nnlr6x.mp4" },
  { id: "008", title: "Cómo lucir unas piernas hermosas", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/Co%CC%81mo_lucir_unas_piernas_hermosas_gracias_a_nymetrovein_elimi%CC%81nalas_sin_dolor_y_en_manos_de_me%CC%81dic_m39d0n.mp4" },
  { id: "009", title: "¿Listo para eliminar tus várices?", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/Listo_para_eliminar_tus_varices_Deja_que_los_expertos_se_encarguen_de_ello_En_nymetrovein_qdhn8b.mp4" },
  { id: "010", title: "Miami Clinic — English Ad", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/Miami_Eng_1_qiwqgw.mp4" },
  { id: "011", title: "Miami Clinic — Spanish Ad", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/Miami_esp_1_eirbqp.mp4" },
  { id: "012", title: "MSI Patient Story — Testimonial 1", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/Msi_Testimonial_1_ukfkvn.mov" },
  { id: "013", title: "MSI Patient Story — Testimonial 2", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/Msi_testimonial_2_nisd5i.mov" },
  { id: "014", title: "Online Course — Practice Growth", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/Online_course_2_k8kmhj.mp4" },
  { id: "015", title: "Respétame — @maicolnova", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/Respe%CC%81tame_maicolnova_que%CC%81_lo_mi%CC%81o_ha_sido_palo_y_palo_desde_el_8_de_enero_pero_ninguno_como_wptezw.mp4" },
  { id: "016", title: "Scripted Ad — Final Cut", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/Script_2_Changes_Final_rj0ykb.mp4" },
  { id: "017", title: "Remedios vs. Resultados Reales", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/Si_piensas_que_los_remedios_untados_te_van_a_eliminar_las_varices_pues_no_pierdas_tu_tiempo_ombe_ctn15r.mp4" },
  { id: "018", title: "Ciudadana Sin Venas Varicosas", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/Si_soy_una_ciudadana_seria_pero_sin_venas_varicosas_tambie%CC%81n_un_chin_atrevida_gracias_a_nyme_1_dyqydi.mp4" },
  { id: "019", title: "Socket Grafting — Dental Procedure", vertical: "Dental", url: "https://res.cloudinary.com/us5bum0a/video/upload/Socket_grafting_2_fwflin.mp4" },
  { id: "020", title: "Vein Treatment — Clinical Results", vertical: "Vascular", url: "https://res.cloudinary.com/us5bum0a/video/upload/Veins_3_1_dhwe22.mp4" },
  { id: "021", title: "Ortho Ad Campaign — Cut 1", vertical: "Orthopaedics", url: "https://res.cloudinary.com/us5bum0a/video/upload/Video_1_llff7d.mp4" },
  { id: "022", title: "Patient Testimonial — Aug 14", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/WhatsApp_Video_2025-08-14_at_2.28.13_PM_fgj6qi.mp4" },
  { id: "023", title: "Patient Testimonial — Aug 21", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/WhatsApp_Video_2025-08-21_at_10.53.43_PM_1_zsfipq.mp4" },
  { id: "024", title: "Patient Testimonial — Aug 21 (Alt)", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/WhatsApp_Video_2025-08-21_at_5.53.49_PM_1_xqgno8.mp4" },
  { id: "025", title: "Patient Testimonial — Aug 21 (Alt 2)", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/WhatsApp_Video_2025-08-21_at_5.53.49_PM_xoyvng.mp4" },
  { id: "026", title: "Patient Testimonial — Sep 4", vertical: "Testimonials", url: "https://res.cloudinary.com/us5bum0a/video/upload/WhatsApp_Video_2025-09-04_at_1.18.04_PM_d4dvn3.mp4" },
];

function buildUrls(rawUrl) {
  if (!rawUrl || rawUrl === "REPLACE_ME" || !rawUrl.includes("/upload/")) {
    return { thumb: null, video: null };
  }
  const [prefix, rest] = rawUrl.split("/upload/");
  const video = `${prefix}/upload/f_mp4,q_auto,vc_h264/${rest}`;
  const thumb = `${prefix}/upload/f_jpg,q_auto,so_0/${rest}`.replace(
    /\.(mp4|mov|MP4|MOV)$/,
    ".jpg"
  );
  return { thumb, video };
}

function CarouselCard({ reel }) {
  const { thumb, video } = buildUrls(reel.url);
  const isReady = Boolean(video);

  if (!isReady) {
    return (
      <div className="clc-card">
        <div className="clc-card__media">
          <div className="clc-card__placeholder" />
        </div>
      </div>
    );
  }

  return (
    <div className="clc-card">
      <div className="clc-card__media">
        <video
          className="clc-card__video"
          src={video}
          poster={thumb}
          controls
          playsInline
          muted
          preload="metadata"
        />
      </div>
      <div className="clc-card__info">
        <span className="clc-card__title">{reel.title}</span>
        <span className="clc-card__tag">{reel.vertical}</span>
      </div>
    </div>
  );
}

export default function ContentLibraryCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    // Update after scroll
    setTimeout(updateScrollState, 400);
  }, [updateScrollState]);

  return (
    <section className="clc">
      <div className="clc__inner">
        <header className="clc__header">
          <p className="clc__overline">CONTENT LIBRARY</p>
          <h2 className="clc__title">
            Ads we&rsquo;ve shot, cut, and shipped for clinics.
          </h2>
          <p className="clc__desc">
            Every reel below ran as a live acquisition ad. Browse the full library by specialty.
          </p>
        </header>

        <div className="clc__carousel-wrapper">
          <button
            className={`clc__arrow clc__arrow--left ${canScrollLeft ? "clc__arrow--visible" : ""}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            ref={scrollRef}
            className="clc__track"
            onScroll={updateScrollState}
          >
            {REELS.map((reel) => (
              <CarouselCard key={reel.id} reel={reel} />
            ))}
          </div>

          <button
            className={`clc__arrow clc__arrow--right ${canScrollRight ? "clc__arrow--visible" : ""}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="clc__cta">
          <Link to="/services/brand/content-library" className="clc__cta-btn">
            See the whole content library
            <svg
              className="clc__cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
