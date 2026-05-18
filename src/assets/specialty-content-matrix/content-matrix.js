/**
 * SPECIALTY PAGE CONTENT MATRIX  v2
 * 34 pages across 5 categories, slugs aligned with /who-we-help/:specialty
 *
 * Categories & counts:
 *   A. WHO_SURGICAL    7 pages
 *   B. WHO_AESTHETIC   5 pages
 *   C. WHO_DENTAL      4 pages
 *   D. WHO_MEDICAL     12 pages
 *   E. WHO_PRACTICE    6 pages
 *
 * Each export is the complete `data` prop for <SpecialtyPage />.
 * Proof figures are realistic-but-fictional placeholders  replace with
 * real client data before publishing.
 */

// ─────────────────────────────────────────────────────────────
// A. SURGICAL SPECIALISTS  (7)
// ─────────────────────────────────────────────────────────────

export const orthopaedicSurgeons = {
    specialtyLabel: 'Orthopaedic Surgeons',
    practiceNoun: 'orthopaedic surgery',
    ctaHref: '/contact/orthopaedic-surgeons',
    hero: {
      headline: 'More of the surgical cases you want. Less dependence on one hospital or one referrer.',
      subcopy: [
        'Private orthopaedic surgery is a high-demand, high-trust specialty, but most practices grow slowly because they rely on a handful of GP referrers and a single hospital network. One change in those relationships and the list empties.',
        'We build patient acquisition and referral development systems that give orthopaedic surgeons a resilient, growing private practice, with the case mix they actually want.',
      ],
    },
    insights: [
      {
        title: 'Elective joint replacement patients self-refer when they know you exist',
        body: 'Patients tired of NHS waiting lists for hip or knee replacement actively search for private surgeons. Practices with strong local SEO and procedure-specific content capture this stream without any active marketing effort.',
      },
      {
        title: 'Sports injury patients are your fastest-converting self-referral segment',
        body: 'Athletes and active patients with ACL tears, rotator cuff injuries, and meniscal damage search urgently and decide quickly. Practices with visible sports surgery content and fast booking pathways see some of the highest enquiry-to-appointment rates in orthopaedics.',
      },
      {
        title: 'Physiotherapist and sports clinic referral relationships are underused in most practices',
        body: 'Physios, osteopaths, and sports medicine clinics regularly need a trusted orthopaedic surgeon to refer on. Most practices have no formal programme for building these relationships, despite the high quality of the patients they generate.',
      },
      {
        title: 'Second-opinion seekers are a motivated, high-converting segment',
        body: 'Patients who have been told they need surgery, or told they don\'t, frequently seek a second opinion privately. A clear second-opinion pathway converts these patients at exceptional rates.',
      },
    ],
    painPoints: {
      headline: 'What orthopaedic surgeons tell us before we start working together.',
      items: [
        { quote: 'My private list is solid but it\'s entirely driven by two or three GP practices. If any of them changed their patterns I\'d be in trouble.' },
        { quote: 'I do excellent joint replacement work but I\'m not getting the volume of elective cases I want. They seem to be going to surgeons with more marketing presence.' },
        { quote: 'I want to attract more sports cases but I don\'t know how to position for that without it sounding like I\'m abandoning my elective practice.' },
        { quote: 'I\'ve tried Google Ads before and got enquiries from patients who had no idea what private surgery cost. It wasted a lot of consultation time.' },
      ],
    },
    pillars: {
      build: 'We audit your full patient pipeline, referral sources, direct enquiries, conversion rates, and build the infrastructure to improve each: procedure-specific content, a referral development programme, and tracking that shows you exactly where every booking comes from.',
      grow: 'We grow your local and national search presence for your highest-value procedures, run paid acquisition campaigns targeting patients with surgical intent rather than early-stage symptom searches, and build a systematic physiotherapy and sports clinic referral network.',
      brand: 'We establish your surgical authority, in your subspecialty of choice, in your patient outcomes, and in your community, through content, media placements, and a digital presence that communicates the standard of your practice to the patients and referrers you most want.',
    },
    proof: {
      clientName: 'Mr. Daniel Farouk',
      specialty: 'Orthopaedic Surgeon',
      location: 'London, UK',
      quote: 'The sports surgery programme was transformational. Within six months it had become our largest source of new private patients, people who were motivated, fast-moving, and referred everyone they trained with.',
      metrics: [
        { value: '3.4×', label: 'Sports case enquiries' },
        { value: '+58%', label: 'Private surgical volume' },
        { value: '+19', label: 'New physio referral relationships' },
      ],
      talkToHref: '/references/daniel-farouk',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Spine Surgeons', slug: 'spine-surgeons' },
      { label: 'Sports Medicine Doctors', slug: 'sports-medicine-doctors' },
      { label: 'Vascular Surgeons', slug: 'vascular-surgeons' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'A private orthopaedic practice built on more than goodwill. Let\'s build the system.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const plasticSurgeons = {
    specialtyLabel: 'Plastic Surgeons',
    practiceNoun: 'plastic surgery',
    ctaHref: '/contact/plastic-surgeons',
    hero: {
      headline: 'More of the right patients. Less time explaining yourself to the wrong ones.',
      subcopy: [
        'Your work speaks for itself in the operating room. Outside it, you\'re competing with practices that out-market you regardless of their outcomes.',
        'We build patient acquisition systems for plastic surgeons who want a full schedule of pre-qualified, procedure-ready patients and the authority positioning to charge what their results deserve.',
      ],
    },
    insights: [
      {
        title: 'Procedure complexity demands educated patients',
        body: 'Rhinoplasty, facelifts, and body contouring carry long decision cycles. Patients research for months before booking. You need to be present and credible at every stage of that journey.',
      },
      {
        title: 'Before-and-after content is your strongest asset and your biggest liability',
        body: 'When used correctly, visual proof converts. When used carelessly it attracts price-shoppers and undermines clinical authority. Most practices get this balance wrong.',
      },
      {
        title: 'Revision anxiety drives consultations as much as desire',
        body: 'A significant share of incoming patients have had surgery elsewhere and want it corrected. How your practice handles that conversation, from first click to consultation, determines who you attract.',
      },
      {
        title: 'Geography matters less than it used to',
        body: 'High-value plastic surgery patients routinely travel for the right surgeon. Your digital footprint needs to work nationally, not just locally.',
      },
    ],
    painPoints: {
      headline: 'What plastic surgeons tell us before they work with us.',
      items: [
        { quote: 'I\'m getting enquiries but they\'re not my ideal patient. They just want the cheapest option.' },
        { quote: 'My results are excellent but I can\'t communicate that online the way I want to.' },
        { quote: 'I\'ve spent money on ads and got a flood of tyre-kickers with no surgical intent.' },
        { quote: 'My practice runs on word-of-mouth but I have no predictable pipeline beyond that.' },
      ],
    },
    pillars: {
      build: 'We audit your current funnel and build the infrastructure most practices are missing: a content ecosystem that educates, a website that converts procedure-specific traffic, and tracking that tells you which channel is producing booked consultations.',
      grow: 'We run paid and organic acquisition programmes calibrated to your highest-margin procedures, every campaign built to surface patients who have already committed to surgery and are choosing their surgeon, not patients still deciding whether to have it.',
      brand: 'We position you as the clinical authority in your procedures of choice, through SEO content, press placements, and a visual brand that reflects the standard of your work. Patients who arrive already trust you before the consultation begins.',
    },
    proof: {
      clientName: 'Dr. Sarah Holt',
      specialty: 'Plastic Surgeon',
      location: 'London, UK',
      quote: 'Within four months we had stopped discounting entirely. The patients coming in already knew what they wanted and had already decided on me.',
      metrics: [
        { value: '3.1×', label: 'Return on ad spend' },
        { value: '+68%', label: 'Consultation bookings' },
        { value: '-40%', label: 'No-show rate' },
      ],
      talkToHref: '/references/sarah-holt',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Cosmetic Surgeons', slug: 'cosmetic-surgeons' },
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'Aesthetic Practitioners', slug: 'aesthetic-practitioners' },
      { label: 'Hair Transplant Surgeons', slug: 'hair-transplant-surgeons' },
    ],
    finalCta: {
      headline: 'A full schedule of procedure-ready patients is a system problem. Let\'s fix it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const cosmeticSurgeons = {
    specialtyLabel: 'Cosmetic Surgeons',
    practiceNoun: 'cosmetic surgery',
    ctaHref: '/contact/cosmetic-surgeons',
    hero: {
      headline: 'Attract patients who value the result, not patients who\'re shopping the price.',
      subcopy: [
        'Cosmetic surgery is one of the most competitive elective markets online. Practices that win on price attract patients who\'ll leave for someone cheaper. Practices that win on authority attract patients who stay, refer, and return.',
        'We build acquisition systems that position your cosmetic practice at the quality end of the market, so your schedule fills with the right people.',
      ],
    },
    insights: [
      {
        title: 'The cosmetic surgery decision cycle averages 6–18 months',
        body: 'Patients researching breast augmentation, tummy tuck, or liposuction spend months comparing surgeons before committing. A content strategy that holds the relationship across that journey is your primary acquisition tool.',
      },
      {
        title: 'Medical credentials visibly reduce price sensitivity',
        body: 'Patients who understand a surgeon\'s training, board certifications, and facility standards are significantly less likely to negotiate on fee. Communicating credentials clearly is one of the highest-ROI changes any cosmetic practice can make.',
      },
      {
        title: 'Combination procedure patients are your highest-value segment',
        body: 'Patients combining mummy makeovers, face and neck lifts, or multiple body procedures account for a disproportionate share of cosmetic surgery revenue. Your marketing should speak explicitly to multi-procedure planning.',
      },
      {
        title: 'Social proof hierarchy matters: outcomes beat testimonials beat ratings',
        body: 'Clinical before-and-afters with context convert better than star ratings. Detailed patient journey testimonials convert better than brief reviews. Most practices invert this hierarchy in their marketing.',
      },
    ],
    painPoints: {
      headline: 'What cosmetic surgeons say when they come to us.',
      items: [
        { quote: 'I lose patients to practices with bigger Instagram followings even though my outcomes are objectively better.' },
        { quote: 'I get lots of enquiries but the conversion rate at consultation is poor, patients arrive with completely wrong expectations about cost.' },
        { quote: 'I want to stop taking every case that walks in and start being selective, but I don\'t feel I can afford to be yet.' },
        { quote: 'My patient satisfaction scores are excellent but I have no system for turning happy patients into visible social proof.' },
      ],
    },
    pillars: {
      build: 'We build a conversion-optimised practice presence: procedure-specific landing pages with clear credential positioning, a before-and-after gallery system, and an enquiry qualification process that filters for intent before the consultation.',
      grow: 'We run acquisition campaigns targeting patients in the decision phase of their cosmetic surgery journey, not early-stage researchers, and build organic search authority for the procedure terms your ideal patients use.',
      brand: 'We craft your surgical identity into a coherent, premium public brand: your patient philosophy, your selection process, your outcomes standard, communicated in a way that attracts patients who want exactly what you offer.',
    },
    proof: {
      clientName: 'Dr. Marcus Webb',
      specialty: 'Cosmetic Surgeon',
      location: 'Manchester, UK',
      quote: 'I cut my consultation volume by 20% and increased revenue by 35%. The patients we filtered out were never going to book anyway. We just hadn\'t built a way to know that before they arrived.',
      metrics: [
        { value: '+35%', label: 'Revenue on fewer consultations' },
        { value: '2.7×', label: 'Consultation-to-surgery conversion' },
        { value: '+62%', label: 'Combination procedure bookings' },
      ],
      talkToHref: '/references/marcus-webb',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Plastic Surgeons', slug: 'plastic-surgeons' },
      { label: 'Aesthetic Practitioners', slug: 'aesthetic-practitioners' },
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'Hair Transplant Surgeons', slug: 'hair-transplant-surgeons' },
    ],
    finalCta: {
      headline: 'The patients who choose on quality are out there. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const vascularSurgeons = {
    specialtyLabel: 'Vascular Surgeons',
    practiceNoun: 'vascular surgery',
    ctaHref: '/contact/vascular-surgeons',
    hero: {
      headline: 'Build a private vascular practice that grows beyond hospital waiting list overflow.',
      subcopy: [
        'Private vascular surgery serves patients who need answers faster than the NHS can provide and patients whose conditions are serious enough to justify paying for a surgeon they trust.',
        'We build referral development and patient acquisition systems that give vascular surgeons a resilient, growing private practice with the case mix they want.',
      ],
    },
    insights: [
      {
        title: 'Varicose vein patients self-refer in large numbers, if you\'re visible',
        body: 'Varicose vein treatment is one of the most directly searched private vascular procedures. Patients with symptomatic veins search for local specialists and book quickly. Practices with strong local SEO for this condition capture significant direct volume.',
      },
      {
        title: 'Carotid and aortic patients require different referral pathways to peripheral vascular cases',
        body: 'Complex arterial cases come through cardiologists, neurologists, and vascular radiologists. Peripheral and venous cases come through GPs and phlebologists. A growth programme needs to work on all pathways simultaneously.',
      },
      {
        title: 'Diabetic foot and wound care patients represent a growing, underserved private segment',
        body: 'Patients with diabetic complications seeking faster specialist access than NHS pathways allow represent a motivated self-referral audience. Content addressing this specific journey converts at high rates.',
      },
      {
        title: 'Endovascular expertise is a differentiator patients will travel for',
        body: 'EVAR, TAVI-adjacent vascular cases, and complex endovascular work are performed by a small number of specialists. Surgeons with these capabilities who communicate them clearly attract patients nationally.',
      },
    ],
    painPoints: {
      headline: 'What vascular surgeons tell us when they reach out.',
      items: [
        { quote: 'My private list is almost entirely NHS overflow. I want to build something that stands independently.' },
        { quote: 'I want more venous work privately but I can\'t seem to get visibility for it alongside my arterial reputation.' },
        { quote: 'My referral relationships are with three cardiologists. It works, but it\'s fragile.' },
        { quote: 'I do complex endovascular work that very few surgeons in the country can do and nobody outside my hospital knows about it.' },
      ],
    },
    pillars: {
      build: 'We audit your private practice infrastructure and build the tools to grow it independently of NHS activity: procedure pathways for venous and arterial cases, GP and specialist referral programmes, and a digital presence that works for both.',
      grow: 'We build your search visibility for varicose vein and vascular condition searches, develop your specialist referral network, and create content that positions your endovascular expertise to the patients who need to know about it.',
      brand: 'We establish your authority as the leading private vascular specialist in your region, with a clinical identity, patient-facing content, and peer-facing positioning that builds both direct and referred case volume.',
    },
    proof: {
      clientName: 'Mr. Kwame Asante',
      specialty: 'Vascular Surgeon',
      location: 'Birmingham, UK',
      quote: 'The varicose vein SEO programme delivered results faster than anything I\'d expected. We went from two or three private referrals a month to booking a full list within eight months.',
      metrics: [
        { value: '4.1×', label: 'Private venous enquiries' },
        { value: '+44%', label: 'Private surgical volume' },
        { value: '+22', label: 'New GP referral relationships' },
      ],
      talkToHref: '/references/kwame-asante',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Varicose Vein Specialists', slug: 'varicose-vein-specialists' },
      { label: 'Orthopaedic Surgeons', slug: 'orthopaedic-surgeons' },
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'A private vascular practice that grows on its own terms starts with the right system.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const spineSurgeons = {
    specialtyLabel: 'Spine Surgeons',
    practiceNoun: 'spine surgery',
    ctaHref: '/contact/spine-surgeons',
    hero: {
      headline: 'More patients who are ready to commit to surgery and fewer who aren\'t.',
      subcopy: [
        'Spine surgery carries one of the longest and most complex patient decision journeys in surgery. Patients research obsessively, seek multiple opinions, and frequently delay or abandon the decision entirely.',
        'We build acquisition systems that reach patients earlier, educate them more effectively, and reduce the drop-off between enquiry and booked surgery.',
      ],
    },
    insights: [
      {
        title: 'Back pain patients are the highest-volume, lowest-converting search audience in orthopaedics',
        body: 'Most back pain searchers are not surgical candidates, but those who are have very high intent once identified. Content that helps patients self-qualify (and disqualifies those who aren\'t surgical candidates) dramatically improves conversion quality.',
      },
      {
        title: 'Second-opinion seeking before spine surgery is nearly universal',
        body: 'Patients recommended for spinal fusion, disc replacement, or decompression almost always seek at least one second opinion. A clear, accessible second-opinion pathway positions your practice at this critical decision moment.',
      },
      {
        title: 'Pain management and physiotherapy referral relationships feed the highest-quality surgical leads',
        body: 'Pain specialists and physios manage patients conservatively until surgery becomes necessary. Building relationships in this referral pathway puts you first in line when their patients are ready.',
      },
      {
        title: 'Minimally invasive spine surgery is a powerful patient-facing differentiator',
        body: 'Patients are acutely aware of recovery time and surgical risk. Surgeons who clearly communicate MIS capabilities, shorter hospital stays, and faster return to activity attract patients who have already decided they want surgery.',
      },
    ],
    painPoints: {
      headline: 'What spine surgeons tell us when they reach out.',
      items: [
        { quote: 'I get a lot of enquiries but the patients are often early-stage and not surgical candidates, it wastes a lot of consultation time.' },
        { quote: 'I want to be known for minimally invasive techniques but my website was written ten years ago and still leads with open surgery.' },
        { quote: 'My pain management colleagues refer well but inconsistently. I\'d love to have a more structured relationship with more of them.' },
        { quote: 'I have strong outcomes data but I\'ve never found a way to use it in marketing that doesn\'t feel inappropriate.' },
      ],
    },
    pillars: {
      build: 'We build a patient qualification content system that helps surgical candidates self-identify while filtering out non-surgical enquiries early, improving your consultation conversion rate and reducing wasted time.',
      grow: 'We develop your search presence for surgical-intent spine terms, build referral relationships with pain specialists and physiotherapists, and create a second-opinion pathway that positions you at the moment patients are most ready to decide.',
      brand: 'We establish your minimally invasive expertise, outcomes standard, and patient care philosophy as a compelling public brand, through content, patient case studies, and a digital identity that separates you clearly from less specialist competitors.',
    },
    proof: {
      clientName: 'Mr. Tariq Rashid',
      specialty: 'Spine Surgeon',
      location: 'London, UK',
      quote: 'The patient qualification content was the key change. We went from 40% surgical candidates at consultation to 72% in under a year. That changed everything about how the practice felt to run.',
      metrics: [
        { value: '+32pp', label: 'Surgical candidate rate at consultation' },
        { value: '2.9×', label: 'Second-opinion enquiries' },
        { value: '+51%', label: 'Private surgical bookings' },
      ],
      talkToHref: '/references/tariq-rashid',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Orthopaedic Surgeons', slug: 'orthopaedic-surgeons' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
      { label: 'Neurologists', slug: 'neurologists' },
      { label: 'Physiotherapists', slug: 'physiotherapists' },
    ],
    finalCta: {
      headline: 'The right spine surgery patients are out there and they\'re ready. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const sportsMedicineDoctors = {
    specialtyLabel: 'Sports Medicine Doctors',
    practiceNoun: 'sports medicine',
    ctaHref: '/contact/sports-medicine-doctors',
    hero: {
      headline: 'More athletes, active patients, and clubs who trust you with their performance.',
      subcopy: [
        'Sports medicine sits at the intersection of clinical expertise and performance culture. The patients and organisations that value it most are intensely loyal once they find the right doctor and they refer within tight networks.',
        'We build the acquisition and positioning systems that get you in front of those networks and make you the obvious choice when performance and health intersect.',
      ],
    },
    insights: [
      {
        title: 'Club and team medical contracts are the highest-leverage client you can acquire',
        body: 'A contract with a professional or semi-professional sports organisation brings consistent caseload, credibility, and access to an athlete network that generates private referrals for years. Most sports medicine doctors don\'t have a systematic approach to winning these.',
      },
      {
        title: 'Injury prevention content attracts athletes before injury, your highest-value acquisition moment',
        body: 'Active patients who find you through performance and prevention content are easier to retain, more likely to refer, and more open to ongoing care relationships than those who find you only after injury.',
      },
      {
        title: 'Return-to-sport timelines are the conversion metric patients care about most',
        body: 'Athletes comparing practitioners always ask one question first: how fast will I be back? Surgeons and doctors who make this evidence explicit, with realistic, condition-specific return-to-sport data, convert at significantly higher rates.',
      },
      {
        title: 'Female athlete health is an underserved and rapidly growing subspecialty',
        body: 'RED-S, ACL injury patterns, and menstrual health in sport are receiving more media attention than ever. Sports medicine doctors with visible expertise in female athlete health attract a growing, grateful, and underserved patient group.',
      },
    ],
    painPoints: {
      headline: 'What sports medicine doctors tell us when they first reach out.',
      items: [
        { quote: 'I want to work with professional sports organisations but I don\'t know how to position for those relationships, I\'ve never been shown how.' },
        { quote: 'I get great word-of-mouth from athletes but it\'s inconsistent. A quiet month feels very quiet.' },
        { quote: 'I want to be known for a specific sport or patient type but I don\'t want to close doors to other referrals.' },
        { quote: 'My practice is growing but it\'s entirely based on my personal reputation. I don\'t know what happens if I want to take time off or expand.' },
      ],
    },
    pillars: {
      build: 'We map the sporting ecosystem in your area, clubs, academies, gyms, and performance centres, and build the outreach strategy, content tools, and digital presence to position you as the medical partner of choice for performance-focused organisations and athletes.',
      grow: 'We build your organic search presence for sports injury and performance search terms, develop content that attracts athletes at every stage of their season, and create the referral infrastructure that connects physios, coaches, and club staff to your practice.',
      brand: 'We establish your sports medicine identity, your performance philosophy, your subspecialty expertise, your team and club relationships, as a public brand that attracts both individual athletes and the organisations that send them your way.',
    },
    proof: {
      clientName: 'Dr. Joanna Kirby',
      specialty: 'Sports Medicine Doctor',
      location: 'Manchester, UK',
      quote: 'Within a year we had three academy contracts and a professional club partnership. The pipeline those relationships created changed our practice from reactive to fully booked.',
      metrics: [
        { value: '+3', label: 'Academy/club medical contracts' },
        { value: '3.6×', label: 'Private athlete consultations' },
        { value: '+74%', label: 'Practice revenue year-on-year' },
      ],
      talkToHref: '/references/joanna-kirby',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Orthopaedic Surgeons', slug: 'orthopaedic-surgeons' },
      { label: 'Physiotherapists', slug: 'physiotherapists' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
      { label: 'Spine Surgeons', slug: 'spine-surgeons' },
    ],
    finalCta: {
      headline: 'The athletes looking for the best care are already searching. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const oralSurgeons = {
    specialtyLabel: 'Oral Surgeons',
    practiceNoun: 'oral surgery',
    ctaHref: '/contact/oral-surgeons',
    hero: {
      headline: 'Build the referral network and direct patient pipeline your surgical expertise deserves.',
      subcopy: [
        'Oral surgery sits at the intersection of dental and medical referral pathways. A practice that relies entirely on one source is one relationship away from a capacity crisis.',
        'We build practice development systems that diversify and deepen your referral relationships and build a direct patient presence for your most searchable procedures.',
      ],
    },
    insights: [
      {
        title: 'Dental implant patients are your most searchable self-referring segment',
        body: 'Patients seeking implants research extensively before approaching any practitioner. Practices with strong local implant content capture these patients directly, without a GDP referral.',
      },
      {
        title: 'Wisdom tooth removal is a high-volume, direct-search procedure with a fast decision cycle',
        body: 'Patients with wisdom tooth pain or anxiety search directly and expect to book quickly. A fast, frictionless booking pathway fills surgical list gaps and builds patient relationships that generate wider referrals.',
      },
      {
        title: 'Referring dentist relationships need active maintenance to stay productive',
        body: 'A referring dentist who stops sending cases usually hasn\'t gone elsewhere by choice, they\'ve been won by a competitor who maintained contact more consistently. A structured outreach programme prevents this.',
      },
      {
        title: 'Orthognathic surgery patients require the most complex patient journey in oral surgery',
        body: 'Jaw surgery patients need deep trust, long educational relationships, and careful expectation management. Practices with a dedicated orthognathic content pathway reduce consultation attrition and improve case acceptance.',
      },
    ],
    painPoints: {
      headline: 'What oral surgeons tell us when they first speak to us.',
      items: [
        { quote: 'I have good relationships with about six dental practices but I know there are fifty within ten miles I\'ve never contacted.' },
        { quote: 'I want to grow my implant work but the GDPs I rely on for referrals seem to be doing more of it themselves now.' },
        { quote: 'My website is essentially a brochure from ten years ago. I know it\'s not helping.' },
        { quote: 'I\'m turning away wisdom tooth referrals because of capacity, but the higher-value implant and surgical cases I want aren\'t filling that space.' },
      ],
    },
    pillars: {
      build: 'We audit your referral network, build the gap map of dental practices in your area, and develop the tools and outreach programme to systematically grow new referral relationships.',
      grow: 'We build your direct patient acquisition presence for implants and high-volume procedures, and develop a structured referral programme that keeps existing relationships productive and adds new ones every quarter.',
      brand: 'We establish your authority as the oral surgeon of choice in your area, through procedure-specific content, case studies, and a digital profile that communicates your surgical scope clearly to both patients and referring practitioners.',
    },
    proof: {
      clientName: 'Mr. Andrew Blake',
      specialty: 'Oral Surgeon',
      location: 'Leeds, UK',
      quote: 'We mapped every dental practice within fifteen miles and built a systematic outreach programme. Within a year, 28 of them were active referrers. That changed the practice entirely.',
      metrics: [
        { value: '+28', label: 'New active referral practices' },
        { value: '+47%', label: 'Implant case volume' },
        { value: '2.1×', label: 'Direct patient enquiries' },
      ],
      talkToHref: '/references/andrew-blake',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Dental Implant Specialists', slug: 'dental-implant-specialists' },
      { label: 'Orthodontists', slug: 'orthodontists' },
      { label: 'Periodontists', slug: 'periodontists' },
      { label: 'Dentists', slug: 'dentists' },
    ],
    finalCta: {
      headline: 'A full surgical list starts with a full referral network. Let\'s build both.',
    },
  }
  
  // ─────────────────────────────────────────────────────────────
  // B. AESTHETIC + SKIN  (5)
  // ─────────────────────────────────────────────────────────────
  
  export const dermatologists = {
    specialtyLabel: 'Dermatologists',
    practiceNoun: 'dermatology',
    ctaHref: '/contact/dermatologists',
    hero: {
      headline: 'Fill your dermatology list with patients who came looking for you specifically.',
      subcopy: [
        'Dermatology sits at the junction of medical and cosmetic, serving acne patients, eczema sufferers, skin cancer patients, and aesthetic seekers from the same practice. Each segment finds you differently and needs a different message.',
        'We build acquisition systems that route the right patients to the right appointments and grow the side of your practice you most want to grow.',
      ],
    },
    insights: [
      {
        title: 'Medical dermatology patients convert from search; cosmetic patients convert from social proof',
        body: 'These are two distinct acquisition channels requiring two distinct strategies. A single homepage and a single campaign serves neither well.',
      },
      {
        title: 'Skin cancer anxiety is a large, underserved direct-search market',
        body: 'Patients who notice a changing mole or lesion typically search before seeking a GP referral. Practices with search visibility in this moment capture patients who convert within days, not months.',
      },
      {
        title: 'Acne and eczema patients have the highest lifetime value when treated holistically',
        body: 'Chronic skin conditions require ongoing management. Practices that build a holistic treatment relationship, rather than episodic prescribing, see dramatically higher patient retention and revenue per head.',
      },
      {
        title: 'Cosmetic cross-sell to existing medical dermatology patients is a revenue lever most practices ignore',
        body: 'Your current medical patients are your warmest cosmetic prospects. Most practices have no structured pathway to introduce cosmetic services to them. Building one typically adds 20–30% to revenue without a single new patient.',
      },
    ],
    painPoints: {
      headline: 'What dermatologists say when they come to us.',
      items: [
        { quote: 'I have a long NHS list and my private practice is fine, but I know it could be significantly more productive.' },
        { quote: 'I keep attracting cosmetic patients who want a quick fix rather than patients who want genuine clinical management.' },
        { quote: 'I\'ve built a real specialism in skin cancer management but no one outside my existing referrers knows about it.' },
        { quote: 'My waiting list is long and patients are going private elsewhere. I don\'t know where I\'m losing them.' },
      ],
    },
    pillars: {
      build: 'We build separate acquisition pathways for medical and cosmetic patients, with messaging, landing pages, and intake funnels calibrated to each patient type\'s specific decision drivers.',
      grow: 'We grow your visibility for urgent skin concern searches, build chronic condition authority through long-form content, and develop the cosmetic cross-sell pathway that converts existing patients to aesthetic treatment.',
      brand: 'We establish your dermatological authority, in your subspecialty, your community, and the media, so patients and referrers who find you already know why you\'re the right choice.',
    },
    proof: {
      clientName: 'Dr. Amara Nwosu',
      specialty: 'Dermatologist',
      location: 'Atlanta, US',
      quote: 'The cosmetic cross-sell programme was something I\'d thought about but never had the system for. It now accounts for 30% of practice revenue without a single new patient.',
      metrics: [
        { value: '+30%', label: 'Revenue from existing patients' },
        { value: '2.4×', label: 'Cosmetic new patient volume' },
        { value: '+49%', label: 'Patient retention at 12 months' },
      ],
      talkToHref: '/references/amara-nwosu',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Aesthetic Practitioners', slug: 'aesthetic-practitioners' },
      { label: 'MedSpa Owners', slug: 'medspa-owners' },
      { label: 'Laser Clinic Owners', slug: 'laser-clinic-owners' },
      { label: 'Plastic Surgeons', slug: 'plastic-surgeons' },
    ],
    finalCta: {
      headline: 'The dermatology practice you want to run is a system away. Let\'s build it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const medspaOwners = {
    specialtyLabel: 'MedSpa Owners',
    practiceNoun: 'med spa',
    ctaHref: '/contact/medspa-owners',
    hero: {
      headline: 'More loyal, high-spend patients. Less fighting over discounts.',
      subcopy: [
        'Med spas compete in the most commoditised corner of aesthetics. If your growth strategy is built on promotions, you\'re in a race to the bottom with every other practice in your city.',
        'We build systems that attract patients who buy on trust and clinical credibility and spend more with every visit.',
      ],
    },
    insights: [
      {
        title: 'Package sales are the single strongest revenue lever for med spas',
        body: 'Patients who buy treatment packages have 4–6× the lifetime value of single-treatment buyers. The pathway from first appointment to package sale is a system, not luck and most med spas have never built it.',
      },
      {
        title: 'Your referral programme is almost certainly underperforming',
        body: 'Most med spas have informal referral approaches. Practices with a structured programme, clear incentives, an active ask, and a follow-up mechanism, see 30–50% more new patients from this source.',
      },
      {
        title: 'Male aesthetics is a fast-growing and first-mover market',
        body: 'Men seeking aesthetic treatments are the fastest-growing segment in aesthetics. Practices that explicitly market to and design experiences for male patients capture outsized demand that most competitors are ignoring.',
      },
      {
        title: 'Membership models dramatically increase predictable revenue',
        body: 'Monthly membership programmes convert single-treatment patients into reliable revenue streams. The offer design, pricing, and communication all matter and most practices get at least one of them wrong.',
      },
    ],
    painPoints: {
      headline: 'What med spa owners tell us before we work together.',
      items: [
        { quote: 'I\'m always busy but I\'m not making the money the revenue figures suggest I should be making.' },
        { quote: 'Every time I stop promotions, bookings fall off a cliff. I feel trapped by my own marketing.' },
        { quote: 'I have a loyal core of patients but I can\'t seem to grow beyond my existing network.' },
        { quote: 'My team is excellent but our retention rate is poor and I don\'t know why patients stop returning.' },
      ],
    },
    pillars: {
      build: 'We audit your patient journey, identify the drop-off points in your conversion and retention funnel, and build the systems, CRM, follow-up sequences, booking flow, that close the gaps.',
      grow: 'We build acquisition campaigns targeting your highest-value treatment areas, develop your local search presence, implement a structured referral programme, and launch the membership model that makes your revenue predictable.',
      brand: 'We position your med spa as the premium, medically credible destination in your market, not just another aesthetics provider, with a visual identity, content strategy, and authority positioning that reflects the clinical standard you hold.',
    },
    proof: {
      clientName: 'Christina Moore',
      specialty: 'MedSpa Owner',
      location: 'Miami, US',
      quote: 'The membership programme changed everything. We now have predictable monthly revenue and our patients\' average spend has nearly doubled since they joined.',
      metrics: [
        { value: '1.9×', label: 'Average patient spend' },
        { value: '+220', label: 'Active membership subscribers' },
        { value: '+66%', label: 'Retention rate at 12 months' },
      ],
      talkToHref: '/references/christina-moore',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Aesthetic Practitioners', slug: 'aesthetic-practitioners' },
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'Laser Clinic Owners', slug: 'laser-clinic-owners' },
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
    ],
    finalCta: {
      headline: 'Build a med spa that grows on loyalty, not promotions. The system exists.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const aestheticPractitioners = {
    specialtyLabel: 'Aesthetic Practitioners',
    practiceNoun: 'aesthetic medicine',
    ctaHref: '/contact/aesthetic-practitioners',
    hero: {
      headline: 'More high-value aesthetic patients. Fewer one-and-done treatment seekers.',
      subcopy: [
        'The aesthetic medicine market is saturated. Patients can get Botox on every high street. What they can\'t get everywhere is a medically-led, outcomes-focused practitioner who treats them as an individual.',
        'We build patient acquisition systems that attract patients who value clinical expertise and keep them returning.',
      ],
    },
    insights: [
      {
        title: 'Treatment loyalty is built in the first 90 days',
        body: 'Patients who return three or more times in the first year have dramatically higher lifetime value and referral rates. The early patient experience, from first contact to follow-up, determines whether this happens.',
      },
      {
        title: 'Medical credentials are an underused differentiator',
        body: 'Most aesthetic patients don\'t know to ask about clinical training. Practitioners who make their medical background explicit in their marketing attract a higher-value, more loyal patient segment.',
      },
      {
        title: 'Treatment plan consultations generate 2–3× more revenue than single-treatment bookings',
        body: 'Practices where the consultation naturally leads to a multi-treatment plan, rather than a single procedure booking, generate significantly more revenue per patient without increasing patient volume.',
      },
      {
        title: 'Social media drives awareness but not high-value bookings on its own',
        body: 'Instagram and TikTok attract large audiences but they skew price-conscious. High-value patients find you through search, peer referral, and perceived clinical authority. Your system needs to work on all three.',
      },
    ],
    painPoints: {
      headline: 'What aesthetic practitioners tell us before we start.',
      items: [
        { quote: 'I spent a fortune on Instagram ads and attracted exactly the patients I didn\'t want, price shoppers who disappear after one treatment.' },
        { quote: 'My patients love me but they keep getting discounted treatment elsewhere and I have no way to stop them drifting.' },
        { quote: 'I know my clinical results are better than the competition but patients can\'t see that from my website.' },
        { quote: 'I want to grow without discounting. Everyone I\'ve spoken to just tells me to do more promotions.' },
      ],
    },
    pillars: {
      build: 'We audit your patient acquisition, consultation, and retention touchpoints and build the infrastructure to optimise each, from website to booking system to post-treatment follow-up sequence.',
      grow: 'We run acquisition campaigns targeting patients seeking medically-led aesthetic care, and build SEO authority for high-intent treatment and condition search terms in your catchment area.',
      brand: 'We position your clinical background and treatment philosophy as your primary differentiator, through content, press placements, and a visual identity that communicates authority, not just aesthetics.',
    },
    proof: {
      clientName: 'Dr. Leila Shah',
      specialty: 'Aesthetic Practitioner',
      location: 'London, UK',
      quote: 'We stopped running promotions entirely eighteen months ago. Our revenue went up. That tells you everything about the patients we were attracting before.',
      metrics: [
        { value: '3.8×', label: 'Patient lifetime value increase' },
        { value: '+61%', label: 'New patient bookings' },
        { value: '-55%', label: 'Patient churn rate' },
      ],
      talkToHref: '/references/leila-shah',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'MedSpa Owners', slug: 'medspa-owners' },
      { label: 'Laser Clinic Owners', slug: 'laser-clinic-owners' },
      { label: 'Plastic Surgeons', slug: 'plastic-surgeons' },
    ],
    finalCta: {
      headline: 'Build a practice full of patients who value what you do. The system exists.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const hairTransplantSurgeons = {
    specialtyLabel: 'Hair Transplant Surgeons',
    practiceNoun: 'hair transplant surgery',
    ctaHref: '/contact/hair-transplant-surgeons',
    hero: {
      headline: 'More FUE and FUT bookings. Fewer patients who go to Turkey instead.',
      subcopy: [
        'Hair transplant surgery is one of the most competitive elective markets online, with overseas clinics undercutting on price and over-promising on outcomes. Your job is to reach patients before they make a decision they\'ll regret.',
        'We build practice growth systems that position your quality, qualifications, and outcomes ahead of the price-led market.',
      ],
    },
    insights: [
      {
        title: 'The medical tourism comparison is unavoidable, so address it, don\'t avoid it',
        body: 'Patients researching hair transplants will find overseas options. Practices that directly explain why UK/US surgical standards, aftercare, and revision risk justify the price premium convert patients who would otherwise leave.',
      },
      {
        title: 'FUE vs FUT education content is one of your highest-converting organic traffic sources',
        body: 'Patients in the research phase obsess over procedure choice. A genuinely useful guide that helps them understand which procedure suits their pattern and goals builds trust and search visibility simultaneously.',
      },
      {
        title: 'Hairline design is an underused emotional purchase driver',
        body: 'Patients aren\'t just buying hair density, they\'re buying a specific visual outcome. Surgeons who communicate hairline design philosophy and show the artistry of their work attract patients who have moved beyond price comparison.',
      },
      {
        title: 'Post-surgery support content drives referrals better than almost any other channel',
        body: 'Patients who receive detailed, reassuring post-op content share it with friends considering the same procedure. This is a high-quality, low-cost acquisition channel most practices overlook.',
      },
    ],
    painPoints: {
      headline: 'What hair transplant surgeons say when they find us.',
      items: [
        { quote: 'I lose patients to overseas clinics and then they come back eighteen months later with complications I have to fix.' },
        { quote: 'I have excellent results but my website looks identical to every other hair transplant clinic online.' },
        { quote: 'I want patients to understand why they should choose me, but I can\'t say it without sounding defensive about the overseas market.' },
        { quote: 'My patient satisfaction is outstanding but I have no system for turning happy patients into active referrers.' },
      ],
    },
    pillars: {
      build: 'We build a content and conversion system that meets patients at the research stage, addresses the overseas cost comparison honestly and confidently, and guides patients toward consultation through genuine education.',
      grow: 'We develop your organic search presence for high-intent hair transplant terms and run targeted paid campaigns to reach patients actively comparing UK or US surgeons to overseas alternatives.',
      brand: 'We craft your surgical identity, your hairline design philosophy, your patient selection standards, your post-op care protocol, into a compelling public brand that attracts patients choosing quality over price.',
    },
    proof: {
      clientName: 'Dr. Ravi Patel',
      specialty: 'Hair Transplant Surgeon',
      location: 'London, UK',
      quote: 'We stopped competing on price and started competing on philosophy. Within a year, our average case value had increased by 40% and our patient satisfaction was the highest it had ever been.',
      metrics: [
        { value: '+40%', label: 'Average case revenue' },
        { value: '2.7×', label: 'Website consultation requests' },
        { value: '+58%', label: 'Patient referral rate' },
      ],
      talkToHref: '/references/ravi-patel',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'Plastic Surgeons', slug: 'plastic-surgeons' },
      { label: 'Aesthetic Practitioners', slug: 'aesthetic-practitioners' },
      { label: 'MedSpa Owners', slug: 'medspa-owners' },
    ],
    finalCta: {
      headline: 'The patients choosing quality over price are out there. Let\'s reach them.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const laserClinicOwners = {
    specialtyLabel: 'Laser Clinic Owners',
    practiceNoun: 'laser clinic',
    ctaHref: '/contact/laser-clinic-owners',
    hero: {
      headline: 'More laser treatment bookings from clients who come back, not just clients who respond to deals.',
      subcopy: [
        'Laser clinics compete in a market crowded with Groupon offers, flash sales, and price-matching. If your growth is built on promotions, you\'re building loyalty to your discount, not to your clinic.',
        'We build the client acquisition and retention systems that fill your treatment diary with clients who invest in their results and keep investing.',
      ],
    },
    insights: [
      {
        title: 'Laser hair removal clients are your highest-volume and highest-retention opportunity',
        body: 'LHR clients require multiple sessions across 12–18 months, creating a long treatment relationship. Practices that structure this experience well, with great communication, consistent results, and natural upsell pathways, build their most loyal client base from this single treatment.',
      },
      {
        title: 'Skin rejuvenation and resurfacing search volumes are growing year-on-year',
        body: 'Patient awareness of laser resurfacing, IPL, and RF microneedling is increasing significantly, driven by social media and mainstream media coverage. Clinics with strong local SEO and treatment-specific content are capturing growing direct demand.',
      },
      {
        title: 'Your existing client database is your most underused asset',
        body: 'Most laser clinics have hundreds of clients who completed one course of treatment and went quiet. A structured reactivation programme targeting this group outperforms cold acquisition at a fraction of the cost.',
      },
      {
        title: 'Treatment course financing removes the single largest conversion barrier',
        body: 'The upfront cost of multi-session laser treatment is the primary reason motivated clients don\'t book. Clinics with clear, accessible finance options see significantly higher course conversion and lower single-session attrition.',
      },
    ],
    painPoints: {
      headline: 'What laser clinic owners say when they reach out to us.',
      items: [
        { quote: 'I run promotions every month and my diary is full, but my margins are terrible and clients disappear the moment I stop discounting.' },
        { quote: 'I\'ve invested in equipment that should be generating serious revenue but I can\'t seem to fill the treatment slots for it.' },
        { quote: 'My LHR clients love the results but very few of them go on to try anything else, there\'s clearly more on the table.' },
        { quote: 'I have no idea which marketing activities are actually driving bookings. I\'m spending money in too many places.' },
      ],
    },
    pillars: {
      build: 'We audit your client acquisition and retention infrastructure, identify the leaks in your booking funnel, and build the systems, reactivation campaigns, post-treatment follow-up, upsell pathways, that close them.',
      grow: 'We develop your local SEO for laser treatment search terms, run acquisition campaigns targeting clients with treatment intent rather than deal-seeking behaviour, and build a structured referral programme.',
      brand: 'We position your clinic as the credible, results-led laser destination in your market, with a visual identity, content strategy, and review management programme that makes your reputation visible and your authority clear.',
    },
    proof: {
      clientName: 'Zara Hennessy',
      specialty: 'Laser Clinic Owner',
      location: 'Dublin, IE',
      quote: 'The reactivation campaign was extraordinary. We brought back 140 clients who had finished a laser course and gone quiet. Most of them booked a new treatment within two weeks.',
      metrics: [
        { value: '+140', label: 'Reactivated clients (first campaign)' },
        { value: '+63%', label: 'Multi-treatment course uptake' },
        { value: '2.2×', label: 'Revenue per active client' },
      ],
      talkToHref: '/references/zara-hennessy',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'MedSpa Owners', slug: 'medspa-owners' },
      { label: 'Aesthetic Practitioners', slug: 'aesthetic-practitioners' },
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
    ],
    finalCta: {
      headline: 'A laser clinic built on loyal clients and results is a system problem. Let\'s solve it.',
    },
  }
  
  // ─────────────────────────────────────────────────────────────
  // C. DENTAL + ORAL HEALTH  (4)
  // ─────────────────────────────────────────────────────────────
  
  export const dentists = {
    specialtyLabel: 'Dentists',
    practiceNoun: 'private dental',
    ctaHref: '/contact/dentists',
    hero: {
      headline: 'A full private dental practice built on patients who stay, spend, and refer.',
      subcopy: [
        'Private dentistry is a relationship business. Patients who feel genuinely cared for return every year, invest in elective work, and bring their families. Building a practice full of them is the goal and it\'s a system, not luck.',
        'We build patient acquisition and retention systems for private dental practices that want predictable, growing revenue without constant discounting or patient churn.',
      ],
    },
    insights: [
      {
        title: 'Practice membership plans are the single most powerful retention tool in private dentistry',
        body: 'Patients on a membership plan attend twice as frequently, spend more per visit on elective treatment, and churn at a fraction of the rate of pay-per-visit patients. Most practices underinvest in growing their membership base.',
      },
      {
        title: 'New mover marketing is a low-competition, high-conversion acquisition channel',
        body: 'Families who have recently moved to an area actively look for a new dentist in the first 90 days. Practices with visibility in this moment acquire loyal, multi-year patients at low cost.',
      },
      {
        title: 'Elective treatment case acceptance is your largest revenue lever within existing patients',
        body: 'Most practices leave significant revenue on the table in existing patient conversations. A structured approach to elective treatment presentation increases case acceptance by 20–40% without acquiring a single new patient.',
      },
      {
        title: 'Google reviews are the primary trust signal for new dental patient acquisition',
        body: 'Over 80% of new dental patients check reviews before choosing a practice. Practices with an active review generation system outperform on conversion regardless of other marketing activity.',
      },
    ],
    painPoints: {
      headline: 'What private dentists tell us when they reach out.',
      items: [
        { quote: 'I\'m always seeing new patients but I feel like I\'m filling a leaky bucket. I can\'t work out why people aren\'t staying.' },
        { quote: 'I want to grow my whitening, veneers, and Invisalign work but I can\'t get patients engaged at the check-up stage.' },
        { quote: 'I came off NHS two years ago and my pipeline is inconsistent. Word of mouth works but it\'s not reliable enough.' },
        { quote: 'I\'ve tried Google Ads and just got NHS patients who wanted free treatment.' },
      ],
    },
    pillars: {
      build: 'We build your patient acquisition and retention infrastructure: a membership programme, a referral system, an active review pipeline, and tracking that tells you exactly where your growth is coming from.',
      grow: 'We develop your local SEO presence for private dentistry search terms, run targeted acquisition campaigns for your elective services, and create the new-patient experience that turns first visits into long-term relationships.',
      brand: 'We build a practice brand that communicates warmth, clinical expertise, and the private standard your patients are paying for, through a website, visual identity, and content strategy that sets you apart from NHS and budget alternatives.',
    },
    proof: {
      clientName: 'Dr. Clare Murphy',
      specialty: 'Private Dentist',
      location: 'Bristol, UK',
      quote: 'Our membership grew from 180 to 620 in 18 months. The stability that brought to our revenue meant we could plan properly for the first time since going fully private.',
      metrics: [
        { value: '+440', label: 'Membership plan patients' },
        { value: '+52%', label: 'Elective treatment revenue' },
        { value: '4.9★', label: 'Average Google review score' },
      ],
      talkToHref: '/references/clare-murphy',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Orthodontists', slug: 'orthodontists' },
      { label: 'Dental Implant Specialists', slug: 'dental-implant-specialists' },
      { label: 'Periodontists', slug: 'periodontists' },
      { label: 'Oral Surgeons', slug: 'oral-surgeons' },
    ],
    finalCta: {
      headline: 'A thriving private dental practice is a system problem. Let\'s solve it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const orthodontists = {
    specialtyLabel: 'Orthodontists',
    practiceNoun: 'orthodontics',
    ctaHref: '/contact/orthodontists',
    hero: {
      headline: 'More adult aligner starts and clear brace bookings, without competing on price.',
      subcopy: [
        'Orthodontics has changed. Adult aligner treatment is now a significant market, but it\'s also the most competitive, with direct-to-consumer brands undercutting on price and convenience.',
        'We build practice growth systems that position your clinical oversight, outcomes, and patient care as the premium choice over mail-order alternatives.',
      ],
    },
    insights: [
      {
        title: 'Adult aligner patients are the highest-growth and highest-LTV segment in orthodontics',
        body: 'Adults seeking orthodontic treatment for aesthetic reasons have higher fee tolerance, refer more enthusiastically, and are more likely to pursue additional cosmetic dentistry. They\'re worth acquiring at a premium.',
      },
      {
        title: 'Direct-to-consumer brands are your strongest differentiator opportunity',
        body: 'Patients who have considered Smile Direct or similar services are already motivated. Content that honestly explains the clinical limitations of unsupervised treatment converts these patients without being dismissive.',
      },
      {
        title: 'The GDP referral relationship is the most underused growth lever in orthodontics',
        body: 'Most orthodontists receive occasional referrals from GP dentists but have no formal programme to develop these relationships. A structured approach typically increases referral volume by 30–60% within six months.',
      },
      {
        title: 'Parent-child combined consultations improve conversion and adult treatment starts',
        body: 'Practices that frame the consultation as a family conversation, addressing both adolescent and adult treatment in one appointment, see higher case acceptance and significantly more adult aligner starts.',
      },
    ],
    painPoints: {
      headline: 'What orthodontists say when they reach out to us.',
      items: [
        { quote: 'I\'m losing adult aligner patients to direct-to-consumer brands and I have no effective way to address it in my marketing.' },
        { quote: 'My referral relationships with GDPs are random, some send a lot, most send nothing. I\'ve never had a system for it.' },
        { quote: 'I want to grow my adult caseload but most of my marketing infrastructure is aimed at parents of teenagers.' },
        { quote: 'My case acceptance is around 50% and I know it should be higher. I just don\'t know where patients are dropping out.' },
      ],
    },
    pillars: {
      build: 'We build dual patient pathways, one for adolescent cases, one for adult aligner patients, with the content, consultation design, and follow-up sequences each segment requires.',
      grow: 'We develop your GDP referral programme and build your organic and paid presence for adult aligner search terms that attract patients who are ready to invest in proper clinical oversight.',
      brand: 'We position your clinical expertise and outcome quality as the premium alternative to direct-to-consumer treatment, with content, patient case studies, and media presence that makes the difference visible.',
    },
    proof: {
      clientName: 'Dr. Sandra Williams',
      specialty: 'Orthodontist',
      location: 'Boston, US',
      quote: 'The adult aligner campaign attracted patients who had looked at direct-to-consumer options and rejected them. They were the easiest case acceptances I\'d ever had.',
      metrics: [
        { value: '+88%', label: 'Adult aligner case starts' },
        { value: '+22', label: 'New GDP referral relationships' },
        { value: '+34%', label: 'Overall practice revenue' },
      ],
      talkToHref: '/references/sandra-williams',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Dentists', slug: 'dentists' },
      { label: 'Dental Implant Specialists', slug: 'dental-implant-specialists' },
      { label: 'Periodontists', slug: 'periodontists' },
      { label: 'Oral Surgeons', slug: 'oral-surgeons' },
    ],
    finalCta: {
      headline: 'The adult aligner market is growing fast. Let\'s make sure your practice is capturing it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const dentalImplantSpecialists = {
    specialtyLabel: 'Dental Implant Specialists',
    practiceNoun: 'dental implants',
    ctaHref: '/contact/dental-implant-specialists',
    hero: {
      headline: 'More implant cases from patients who chose you specifically, not the first result they clicked.',
      subcopy: [
        'Dental implants are one of the most searched private dental procedures online. Patients comparing options spend weeks in the research phase, reading, comparing, and building trust before they ever book a consultation.',
        'We build the content and acquisition system that puts you in front of that research process and makes you the obvious choice when they\'re ready to commit.',
      ],
    },
    insights: [
      {
        title: 'Implant patients convert from trust and clarity, not from price comparison',
        body: 'Patients who truly understand implants, the procedure, the timeline, the long-term value over dentures, convert at much higher rates and negotiate on price much less. Patient education content is your primary conversion tool.',
      },
      {
        title: 'All-on-4 and full-arch restoration patients represent your highest single-case revenue opportunity',
        body: 'Full-arch implant patients are a growing, motivated, and high-value segment. Most implant websites don\'t address this patient group with the depth and specificity they need to make a decision.',
      },
      {
        title: 'Implant-related GDP referrals are declining as more GDPs place their own',
        body: 'Specialists who rely on GDP referrals for implant cases are feeling the compression. Building a direct-to-patient acquisition stream alongside your referral network is now a practice resilience essential.',
      },
      {
        title: 'Implant complication and replacement patients self-refer with high urgency',
        body: 'Patients experiencing implant failure or complications from another practice search urgently and convert quickly. A clear pathway for this patient group captures motivated cases most competitors aren\'t marketing to.',
      },
    ],
    painPoints: {
      headline: 'What dental implant specialists tell us when they contact us.',
      items: [
        { quote: 'I\'m getting enquiries but they\'ve been to three other practices already and they\'re basically price-shopping. I can\'t seem to attract patients who just want the best.' },
        { quote: 'My GDP referrals for implants have dropped significantly over the last two years and I haven\'t built an alternative.' },
        { quote: 'I want to do more full-arch cases but patients come in not knowing what All-on-4 is and the consultation takes three times as long.' },
        { quote: 'My case photography is excellent but nobody sees it, it\'s buried in a gallery page that gets almost no traffic.' },
      ],
    },
    pillars: {
      build: 'We build a patient education ecosystem, procedure guides, case studies, comparison content, and FAQ architecture, that turns your website into the most trusted implant resource in your area and converts research-phase patients before they visit a competitor.',
      grow: 'We develop your search presence for high-intent implant terms, build a full-arch patient acquisition campaign, and create the GDP referral programme that keeps your existing relationships strong while adding new ones.',
      brand: 'We establish your implant authority, in your clinical approach, your outcome standards, your patient experience, as a compelling public brand that wins patients who are choosing their specialist on merit, not proximity.',
    },
    proof: {
      clientName: 'Dr. Yusuf Okafor',
      specialty: 'Dental Implant Specialist',
      location: 'London, UK',
      quote: 'The All-on-4 content programme brought in patients who arrived at consultation already fully informed and committed. Our full-arch conversion went from 28% to 61% in eight months.',
      metrics: [
        { value: '+33pp', label: 'Full-arch consultation conversion' },
        { value: '3.2×', label: 'Direct patient implant enquiries' },
        { value: '+£420k', label: 'Annual revenue uplift' },
      ],
      talkToHref: '/references/yusuf-okafor',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Oral Surgeons', slug: 'oral-surgeons' },
      { label: 'Periodontists', slug: 'periodontists' },
      { label: 'Dentists', slug: 'dentists' },
      { label: 'Orthodontists', slug: 'orthodontists' },
    ],
    finalCta: {
      headline: 'The patients looking for their implant specialist are already searching. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const periodontists = {
    specialtyLabel: 'Periodontists',
    practiceNoun: 'periodontics',
    ctaHref: '/contact/periodontists',
    hero: {
      headline: 'More gum disease referrals and implant cases. A practice that doesn\'t depend on three GDPs.',
      subcopy: [
        'Periodontics is almost entirely referral-driven, but most practices have a thin, concentrated referral network and no systematic way to grow it.',
        'We build referral development systems and patient-facing acquisition tools that diversify your pipeline and make your practice genuinely resilient.',
      ],
    },
    insights: [
      {
        title: 'The typical periodontist relies on fewer than ten active referrers',
        body: 'In a specialty where relationships are everything, concentration risk is the biggest vulnerability. Broadening to twenty or thirty active referrers transforms stability and case volume.',
      },
      {
        title: 'Gum disease is dramatically under-diagnosed, patient education content captures self-referrals',
        body: 'Patients with bleeding gums, recession, or mobility frequently don\'t know specialist periodontal care exists. Educational content that helps them self-identify creates a direct-to-patient acquisition stream most periodontists don\'t have.',
      },
      {
        title: 'Implant-maintaining colleagues are an underused referral source for peri-implantitis cases',
        body: 'Periodontists who cultivate relationships with implant-placing GDPs and specialists build a consistently growing peri-implantitis and complex maintenance caseload. Most don\'t market to this group explicitly.',
      },
      {
        title: 'Cosmetic periodontal procedures are undersold despite strong patient demand',
        body: 'Crown lengthening, gum contouring, and connective tissue grafts address aesthetic concerns most patients don\'t know they could treat. Most periodontist websites barely mention them.',
      },
    ],
    painPoints: {
      headline: 'What periodontists tell us when they contact us.',
      items: [
        { quote: 'I know my three best referrers well and everyone else is a stranger. That feels fragile.' },
        { quote: 'I want to grow but I don\'t know how to approach GDPs I\'ve never met, cold calling feels wrong for a clinical relationship.' },
        { quote: 'Patients don\'t know periodontists exist until a GDP mentions it. I\'d love to be findable before that.' },
        { quote: 'I do excellent cosmetic periodontal work but it\'s barely mentioned on my website. I get almost no enquiries for it.' },
      ],
    },
    pillars: {
      build: 'We build your referrer map, design your outreach programme, and create the clinical communication tools, case reports, educational content, practice updates, that make you a valued contact rather than a cold approach.',
      grow: 'We build patient-facing content for gum disease self-identification, cosmetic periodontal procedures, and implant maintenance that creates a direct-to-patient stream alongside your referral pipeline.',
      brand: 'We position you as the periodontal authority in your area, through content, relationships, and a digital presence that makes you the natural first call for GDPs and motivated patients alike.',
    },
    proof: {
      clientName: 'Dr. Elena Torres',
      specialty: 'Periodontist',
      location: 'Los Angeles, US',
      quote: 'The referral programme gave me a framework to approach GDPs I\'d never spoken to. It felt natural rather than salesy. Within six months I had fourteen new referral relationships.',
      metrics: [
        { value: '+14', label: 'New active referral relationships' },
        { value: '+62%', label: 'New patient referrals' },
        { value: '3.1×', label: 'Cosmetic periodontal enquiries' },
      ],
      talkToHref: '/references/elena-torres',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Dental Implant Specialists', slug: 'dental-implant-specialists' },
      { label: 'Oral Surgeons', slug: 'oral-surgeons' },
      { label: 'Dentists', slug: 'dentists' },
      { label: 'Orthodontists', slug: 'orthodontists' },
    ],
    finalCta: {
      headline: 'A thriving periodontal practice starts with a referral network that works for you. Let\'s build it.',
    },
  }
  
  // ─────────────────────────────────────────────────────────────
  // D. MEDICAL SPECIALISTS  (12)
  // ─────────────────────────────────────────────────────────────
  
  export const ophthalmologists = {
    specialtyLabel: 'Ophthalmologists',
    practiceNoun: 'ophthalmology',
    ctaHref: '/contact/ophthalmologists',
    hero: {
      headline: 'More private ophthalmology patients. A practice that grows beyond optometrist referrals.',
      subcopy: [
        'Private ophthalmology serves patients who want faster diagnosis, premium lens choices, and a surgeon they can trust for one of the most precious senses they have.',
        'We build patient acquisition and referral development systems that give your practice a growing, diversified pipeline, not one that stalls when a key optometrist retires.',
      ],
    },
    insights: [
      {
        title: 'Premium IOL patients are your highest-value segment and they need education to find you',
        body: 'Patients who are candidates for premium intraocular lenses frequently don\'t know the option exists until the consultation. Practices that market premium lens options directly to patients see dramatically higher conversion to premium-grade procedures.',
      },
      {
        title: 'LASIK and LASEK patients are younger, more digital, and highly comparison-driven',
        body: 'Laser vision correction patients spend significant time online before choosing a surgeon. Video content, patient testimonials, and surgeon-specific outcome data are the primary conversion tools for this segment.',
      },
      {
        title: 'Optometrist co-management relationships are a warm referral channel most practices under-develop',
        body: 'Optometrists who co-manage surgical patients represent a consistent, high-quality referral source. Most ophthalmologists have no formal programme for building these relationships systematically.',
      },
      {
        title: 'Dry eye and ocular surface disease are growing direct-to-patient service lines',
        body: 'Patient awareness of specialist dry eye management is increasing. Practices with visible, specific content for this condition capture motivated patients who have often been unsuccessfully managed elsewhere.',
      },
    ],
    painPoints: {
      headline: 'What ophthalmologists tell us when we first meet.',
      items: [
        { quote: 'My surgical list is entirely dependent on referrals from one optometry group. That feels like a structural risk I need to address.' },
        { quote: 'I want to grow my premium IOL caseload but patients don\'t know the difference between standard and premium lenses until we\'re already in the consultation.' },
        { quote: 'I\'ve tried PPC for laser eye surgery and just got burned, wrong patients, terrible conversion, no ROI.' },
        { quote: 'My outcomes are excellent but I have almost no online presence and I know I\'m losing patients to competitors who market better.' },
      ],
    },
    pillars: {
      build: 'We build a patient education system for your surgical procedures and premium services, and develop a structured optometrist co-management programme that diversifies and deepens your referral pipeline.',
      grow: 'We build your search presence for elective procedure terms, run paid campaigns targeting patients with vision correction intent, and optimise your consultation conversion for premium procedure acceptance.',
      brand: 'We establish your authority as the trusted ophthalmic surgeon in your area, through patient outcome content, press coverage, and a digital presence that reflects the standard of your care.',
    },
    proof: {
      clientName: 'Mr. Aarav Mishra',
      specialty: 'Ophthalmologist',
      location: 'Birmingham, UK',
      quote: 'The premium IOL education content changed my consultation dynamics entirely. Patients now arrive knowing what they want. My premium lens conversion went from 18% to 47%.',
      metrics: [
        { value: '+29pp', label: 'Premium IOL conversion rate' },
        { value: '+42%', label: 'Elective surgical volume' },
        { value: '3.2×', label: 'Optometrist referral network size' },
      ],
      talkToHref: '/references/aarav-mishra',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Otolaryngologists (ENT)', slug: 'otolaryngologists-ent' },
      { label: 'Plastic Surgeons', slug: 'plastic-surgeons' },
      { label: 'Varicose Vein Specialists', slug: 'varicose-vein-specialists' },
      { label: 'Neurologists', slug: 'neurologists' },
    ],
    finalCta: {
      headline: 'Your private ophthalmology practice has more growth in it. Let\'s find it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const varicoseVeinSpecialists = {
    specialtyLabel: 'Varicose Vein Specialists',
    practiceNoun: 'varicose vein treatment',
    ctaHref: '/contact/varicose-vein-specialists',
    hero: {
      headline: 'More varicose vein patients who came looking for you and booked without shopping around.',
      subcopy: [
        'Varicose vein treatment is one of the most self-referred private procedures in vascular medicine. Patients are motivated, their symptoms are visible, and they actively research treatment options before choosing a specialist.',
        'We build the acquisition systems that capture this search demand and convert it into booked consultations.',
      ],
    },
    insights: [
      {
        title: 'Varicose vein patients are active searchers with short decision cycles',
        body: 'Unlike many surgical specialties with long research windows, varicose vein patients typically move from symptom awareness to consultation within weeks. Local SEO and fast booking pathways are your primary conversion tools.',
      },
      {
        title: 'Endothermal ablation vs open surgery is the most common patient education gap',
        body: 'Most patients don\'t know that modern varicose vein treatment is day-case, minimally invasive, and requires little recovery. Clinics that educate on this clearly reduce consultation drop-off and increase booking intent dramatically.',
      },
      {
        title: 'Venous insufficiency is significantly under-diagnosed, creating a patient education opportunity',
        body: 'Many patients with chronic leg heaviness, swelling, or aching haven\'t connected their symptoms to venous disease. Content that helps them self-identify brings in patients who had no idea they were a candidate for treatment.',
      },
      {
        title: 'Patient photography and outcome content converts better in vein treatment than almost any other channel',
        body: 'Before-and-after imagery of varicose vein treatment, showing both aesthetic and symptomatic improvement, drives higher engagement and enquiry rates than any other content type for this specialty.',
      },
    ],
    painPoints: {
      headline: 'What varicose vein specialists say when they reach out.',
      items: [
        { quote: 'I know patients are looking for exactly what I do but I\'m not showing up in the searches that matter.' },
        { quote: 'I get a lot of NHS overflow enquiries from patients expecting to be seen for free. I can\'t seem to attract patients who are genuinely ready to pay privately.' },
        { quote: 'My clinical results are excellent, the legs look great, but I don\'t have a way to show that online that actually converts.' },
        { quote: 'I want to grow my private practice but my marketing is three steps behind where it needs to be.' },
      ],
    },
    pillars: {
      build: 'We build a procedure-specific acquisition funnel, with condition education content, a patient self-assessment pathway, and a booking process that filters for private intent and surgical suitability before the consultation.',
      grow: 'We develop your local and regional search visibility for varicose vein and venous insufficiency terms, run paid campaigns targeting patients with symptomatic and aesthetic vein concerns, and build GP and phlebology referral relationships to supplement direct enquiries.',
      brand: 'We establish your authority as the trusted varicose vein specialist in your area, through treatment outcome content, patient testimonials, and a digital presence that communicates the clinical and aesthetic standard of your results.',
    },
    proof: {
      clientName: 'Mr. Patrick Olusegun',
      specialty: 'Vascular Surgeon',
      location: 'London, UK',
      quote: 'The local SEO work for varicose veins was the single most impactful thing we did. Within three months we were the top result for our area and we\'ve never looked back.',
      metrics: [
        { value: '4.8×', label: 'Varicose vein enquiries' },
        { value: '-60%', label: 'Cost per booked consultation' },
        { value: '+78%', label: 'Private procedure volume' },
      ],
      talkToHref: '/references/patrick-olusegun',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Vascular Surgeons', slug: 'vascular-surgeons' },
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'Physiotherapists', slug: 'physiotherapists' },
    ],
    finalCta: {
      headline: 'The patients looking for varicose vein treatment are already searching. Let\'s make you their answer.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const otolaryngologistsEnt = {
    specialtyLabel: 'Otolaryngologists (ENT)',
    practiceNoun: 'ENT surgery',
    ctaHref: '/contact/otolaryngologists-ent',
    hero: {
      headline: 'More private ENT patients. A surgical list that doesn\'t depend on hospital overflow.',
      subcopy: [
        'Private ENT serves a wide patient mix, parents of children with glue ear, adults seeking sinus surgery, hearing restoration patients, and rhinoplasty candidates. Each finds you differently and needs a different message.',
        'We build acquisition systems that serve each patient pathway efficiently and give your practice a diversified, growing pipeline.',
      ],
    },
    insights: [
      {
        title: 'Paediatric ENT is a high-volume, parent-driven self-referral category',
        body: 'Parents seeking private grommets or tonsillectomy for their children actively search and self-refer. Practices with fast, clear paediatric ENT pathways capture significant direct demand with minimal advertising spend.',
      },
      {
        title: 'Hearing loss patients are a large and underserved direct-search audience',
        body: 'Adults experiencing hearing difficulties frequently self-research before seeking professional review. Practices with strong hearing loss content and a clear private assessment pathway capture this high-intent audience upstream of GP referral.',
      },
      {
        title: 'Septoplasty and rhinoplasty crossover creates a unique dual-benefit marketing opportunity',
        body: 'ENT surgeons performing functional rhinoplasty are often invisible to patients seeking combined functional and cosmetic nasal procedures. A dual-benefit messaging approach captures both audiences from one content investment.',
      },
      {
        title: 'Chronic sinusitis and allergy patients represent a large, treatment-frustrated self-referral segment',
        body: 'Patients who have been symptomatic for years and inadequately managed on antihistamines and nasal sprays are highly motivated to seek specialist review privately. Condition-specific content addressing this frustration converts at exceptional rates.',
      },
    ],
    painPoints: {
      headline: 'What ENT surgeons tell us when they come to us.',
      items: [
        { quote: 'My surgical list is mostly NHS overflow and I want to build something that stands independently as a genuine private practice.' },
        { quote: 'I do functional rhinoplasty but I can\'t get in front of patients who want both functional correction and an improved appearance.' },
        { quote: 'I have parents of children who need grommets waiting months on the NHS. They could book privately tomorrow, but I don\'t know how to reach them.' },
        { quote: 'My marketing still reads like a GP referral letter. I don\'t know how to make it work for patients approaching me directly.' },
      ],
    },
    pillars: {
      build: 'We build condition and procedure-specific patient pathways, for paediatric ENT, adult elective surgery, functional rhinoplasty, and allergy, with dedicated content and frictionless booking flows for each.',
      grow: 'We develop your search visibility for ENT condition and procedure searches, run acquisition campaigns for your highest-value private patient segments, and build a GP referral programme to supplement direct enquiries.',
      brand: 'We build your ENT authority, positioning your surgical scope, subspecialty interests, and patient care philosophy in a brand that attracts both self-referring patients and referring practitioners with confidence.',
    },
    proof: {
      clientName: 'Mr. Christopher Asante',
      specialty: 'ENT Surgeon',
      location: 'London, UK',
      quote: 'The paediatric pathway brought in families who had been waiting eight months on the NHS. Within three months it was our fastest-growing source of new private patients, driven almost entirely by organic search.',
      metrics: [
        { value: '4.4×', label: 'Paediatric ENT enquiries' },
        { value: '+66%', label: 'Private surgical volume' },
        { value: '+£230k', label: 'Annual revenue uplift' },
      ],
      talkToHref: '/references/christopher-asante',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Ophthalmologists', slug: 'ophthalmologists' },
      { label: 'Plastic Surgeons', slug: 'plastic-surgeons' },
      { label: 'Neurologists', slug: 'neurologists' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'A private ENT practice full of patients who chose you starts with the right system.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const urologists = {
    specialtyLabel: 'Urologists',
    practiceNoun: 'urology',
    ctaHref: '/contact/urologists',
    hero: {
      headline: 'More private urology patients. A practice not built around waiting for referrals.',
      subcopy: [
        'Private urology patients are often highly motivated, they\'ve been waiting too long on the NHS, they\'ve researched their symptoms online, or they need a sensitive conversation they\'d prefer not to have in a busy NHS clinic.',
        'We build patient acquisition systems that reach these patients at the moment they\'re looking.',
      ],
    },
    insights: [
      {
        title: 'Men\'s health is the fastest-growing area of self-directed health spending',
        body: 'Testosterone, erectile dysfunction, and prostate health are increasingly discussed openly. Men actively seeking private care for these conditions are a large and growing audience, and the practices that speak to them directly win significant organic traffic.',
      },
      {
        title: 'PSA testing and prostate screening are high-intent, direct-search procedures',
        body: 'Men researching prostate cancer risk frequently search for private PSA testing and specialist review. A clear, frictionless pathway for this drives self-referrals from a motivated, high-conversion patient group.',
      },
      {
        title: 'Female urology is dramatically underserved in most private markets',
        body: 'Women with overactive bladder, prolapse, and incontinence are a large, underserved, and undermarketed patient group. Practices with visible, non-stigmatising content for female urological conditions see strong conversion from a grateful audience.',
      },
      {
        title: 'Kidney stone patients search with urgency and convert within days',
        body: 'Patients experiencing renal colic or managing recurrent stone disease search urgently. A fast, clear booking pathway for private stone assessment fills surgical list gaps and builds a returning patient relationship.',
      },
    ],
    painPoints: {
      headline: 'What urologists tell us when they reach out.',
      items: [
        { quote: 'I want to grow my men\'s health work but I\'m not sure how to market something sensitive without it looking cheap.' },
        { quote: 'Half my practice is waiting-list private, and the other half is very thin. I want to stop being so dependent on hospital channels.' },
        { quote: 'I have a strong interest in female urology but almost no enquiries for it. I don\'t think women know they could see me privately.' },
        { quote: 'I tried PPC and it brought in patients expecting NHS care. I need a way to attract genuine private patients.' },
      ],
    },
    pillars: {
      build: 'We build separate patient pathways for men\'s health, female urology, stone disease, and oncological urology, with the content, booking flows, and intake processes each requires.',
      grow: 'We develop your search presence for urological condition and procedure terms, run acquisition campaigns for your highest-value patient segments, and build a GP referral programme that diversifies your pipeline.',
      brand: 'We establish your authority as the trusted private urologist in your area, with a brand identity and content strategy that communicates expertise and discretion in equal measure.',
    },
    proof: {
      clientName: 'Mr. James Oluwole',
      specialty: 'Urologist',
      location: 'Manchester, UK',
      quote: 'The men\'s health content was something I\'d hesitated over, it felt like advertising. But the patients it brought in were exactly who I wanted to see, and they were incredibly loyal.',
      metrics: [
        { value: '3.7×', label: 'Men\'s health patient enquiries' },
        { value: '+48%', label: 'Private surgical volume' },
        { value: '2.2×', label: 'Female urology enquiries' },
      ],
      talkToHref: '/references/james-oluwole',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Gastroenterologists', slug: 'gastroenterologists' },
      { label: 'Vascular Surgeons', slug: 'vascular-surgeons' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'Private urology demand is underserved in most markets. Make sure your practice is the answer.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const cardiologists = {
    specialtyLabel: 'Cardiologists',
    practiceNoun: 'cardiology',
    ctaHref: '/contact/cardiologists',
    hero: {
      headline: 'Build a private cardiology practice that grows beyond hospital networks.',
      subcopy: [
        'Private cardiology patients are high-value, long-term, and relationship-driven. But most practices have no system to attract them directly, relying entirely on hospital channels or a handful of GP referrers.',
        'We build practice development programmes that create predictable private cardiology growth through diversified referral networks and direct patient acquisition.',
      ],
    },
    insights: [
      {
        title: 'Executive cardiac screening is the highest-leverage entry point into private cardiology',
        body: 'Self-paying executives seeking comprehensive cardiac assessment represent a large, motivated segment. They are also the most efficient pathway to an ongoing private cardiology relationship with a patient who invests in their health.',
      },
      {
        title: 'GP referral development is undersystematic in most private cardiology practices',
        body: 'The average private cardiologist has a referral relationship with a fraction of the GPs in their catchment area. A structured development programme typically doubles referral sources within twelve months.',
      },
      {
        title: 'Palpitation and chest symptom patients self-refer in large numbers',
        body: 'Patients experiencing palpitations, shortness of breath, or chest tightness often self-refer for private consultations before seeing their GP. Practices with search visibility for cardiac symptoms capture this stream with no active advertising.',
      },
      {
        title: 'Patient education content on heart health builds trust and search authority simultaneously',
        body: 'Long-form content about atrial fibrillation, hypertension, and cardiac risk converts both as an SEO asset and as the trust-building resource that drives high case acceptance rates at consultation.',
      },
    ],
    painPoints: {
      headline: 'What cardiologists say when they reach out to us.',
      items: [
        { quote: 'I\'m reliant on two referring physicians and my private list suffers every time their referral patterns change.' },
        { quote: 'I run private cardiac screening but it\'s almost an invisible service. I don\'t know how to market a screening programme without it feeling clinical.' },
        { quote: 'I want to grow my private practice but it feels inappropriate to market myself the way cosmetic practices do.' },
        { quote: 'My NHS reputation is excellent but it doesn\'t automatically translate into private referrals.' },
      ],
    },
    pillars: {
      build: 'We build your GP referral programme, executive health screening pathway, and patient-facing digital infrastructure, with content and tracking systems that make every growth channel visible and manageable.',
      grow: 'We grow your local search presence for cardiac symptom and private cardiology terms and build a systematic GP outreach programme that expands your referral base month by month.',
      brand: 'We establish your reputation as the trusted, accessible private cardiologist in your area, through patient-facing content, peer relationships, and a digital presence that reflects the standard of your practice.',
    },
    proof: {
      clientName: 'Dr. Femi Adeyemi',
      specialty: 'Cardiologist',
      location: 'London, UK',
      quote: 'The executive screening programme was something I\'d been thinking about for years. Within three months of launching it was running; within six it was full.',
      metrics: [
        { value: '+34', label: 'New GP referral relationships' },
        { value: '3.2×', label: 'Private consultation volume' },
        { value: '+£290k', label: 'Annual revenue uplift' },
      ],
      talkToHref: '/references/femi-adeyemi',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Neurologists', slug: 'neurologists' },
      { label: 'Gastroenterologists', slug: 'gastroenterologists' },
      { label: 'Rheumatologists', slug: 'rheumatologists' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'Your private cardiology practice has more capacity for growth than your current system is using. Let\'s find it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const neurologists = {
    specialtyLabel: 'Neurologists',
    practiceNoun: 'neurology',
    ctaHref: '/contact/neurologists',
    hero: {
      headline: 'More private neurology patients who found you at the moment they needed you most.',
      subcopy: [
        'Neurological symptoms are often frightening and urgent. Patients who can\'t wait for an NHS appointment actively search for private neurologists and convert quickly when they find a practice that communicates clarity and reassurance.',
        'We build the acquisition systems that put your practice in front of those patients at the right moment.',
      ],
    },
    insights: [
      {
        title: 'Headache and migraine patients are your highest-volume, most searchable patient segment',
        body: 'Chronic migraine sufferers who have been inadequately managed elsewhere represent a large, self-referring, and highly loyal patient group. Practices with specific, empathetic migraine content see exceptional direct-to-patient conversion.',
      },
      {
        title: 'Multiple sclerosis and neurodegenerative condition patients seek specialist ongoing management',
        body: 'Patients with MS, Parkinson\'s, or motor neurone disease who want to supplement or replace NHS management with private specialist involvement represent a high-value, long-term patient group that most neurology practices don\'t market to directly.',
      },
      {
        title: 'Functional neurological disorder is severely underserved by most private neurology practices',
        body: 'FND patients are often dismissed by NHS services and actively seek specialist private care. Practices with visible, non-dismissive content for this condition attract a patient group with very high conversion rates and deep loyalty.',
      },
      {
        title: 'GP referral relationships in neurology are warmer than most specialists assume',
        body: 'GPs managing complex neurological patients are under significant pressure and want a reliable private neurologist to refer to. A structured, low-effort outreach programme converts many of them quickly.',
      },
    ],
    painPoints: {
      headline: 'What neurologists tell us when they first reach out.',
      items: [
        { quote: 'My NHS practice is busy but my private list is thin. I\'m not sure how to bridge the reputation gap.' },
        { quote: 'I get patients with straightforward migraine diagnoses but I want to be known for more complex cases. I don\'t know how to signal that.' },
        { quote: 'I keep hearing about patients who couldn\'t find a private neurologist quickly, but they didn\'t find me. I must not be visible enough.' },
        { quote: 'Traditional marketing feels completely wrong for neurology. I don\'t know what appropriate looks like for my specialty.' },
      ],
    },
    pillars: {
      build: 'We build condition-specific patient pathways for your highest-demand presentations, migraine, MS, epilepsy, functional disorders, with content that communicates specialist expertise clearly and compassionately.',
      grow: 'We develop your search visibility for neurological condition and symptom searches, build a GP referral programme for complex case management, and create the patient education content that converts self-referring patients.',
      brand: 'We establish your neurological authority, your subspecialty, your approach to diagnosis, your patient care philosophy, as a public brand that attracts both direct patients and referrers seeking a genuinely expert specialist.',
    },
    proof: {
      clientName: 'Dr. Priya Verma',
      specialty: 'Neurologist',
      location: 'London, UK',
      quote: 'The migraine content brought in more patients in three months than I\'d had from any other channel in three years. And they were exactly the kind of patient I most wanted to help.',
      metrics: [
        { value: '5.1×', label: 'Migraine patient enquiries' },
        { value: '+53%', label: 'Private consultation volume' },
        { value: '+28', label: 'New GP referral relationships' },
      ],
      talkToHref: '/references/priya-verma',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Spine Surgeons', slug: 'spine-surgeons' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Rheumatologists', slug: 'rheumatologists' },
    ],
    finalCta: {
      headline: 'Patients who need a neurologist aren\'t browsing, they\'re searching with urgency. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const fertilityClinics = {
    specialtyLabel: 'Fertility Clinics',
    practiceNoun: 'fertility clinic',
    ctaHref: '/contact/fertility-clinics',
    hero: {
      headline: 'More patients who chose your clinic and fewer who chose on price alone.',
      subcopy: [
        'The fertility treatment decision is one of the most emotionally loaded and financially significant a person or couple will make. Clinics that win on clinical credibility, transparency, and empathy attract patients who are more committed, better prepared, and more loyal.',
        'We build patient acquisition and experience systems for fertility clinics that want to grow on the right terms.',
      ],
    },
    insights: [
      {
        title: 'Success rate transparency is now a baseline patient expectation and a differentiator when done well',
        body: 'Patients comparing fertility clinics scrutinise success rates carefully. Clinics that present their outcomes transparently, with appropriate context about patient mix, age groups, and treatment types, build more trust than those who bury the data.',
      },
      {
        title: 'Fertility preservation is the fastest-growing, youngest-converting patient segment',
        body: 'Egg freezing for social and medical reasons is driving a new cohort of younger, self-referring patients. Clinics with clear, non-clinical content for this group are building a patient pipeline that converts immediately and refers widely.',
      },
      {
        title: 'Unexplained infertility patients are your most research-intensive and highest-loyalty segment',
        body: 'Couples who have received no clear diagnosis research exhaustively before choosing a clinic. Practices with deep diagnostic and treatment philosophy content attract these patients during their longest and most open phase of decision-making.',
      },
      {
        title: 'The emotional experience of treatment is as important as clinical outcomes in patient referral behaviour',
        body: 'Patients who feel psychologically supported throughout treatment refer with extraordinary enthusiasm. Clinics with visible psychological support, clear communication standards, and a human patient experience design see referral rates far above the market average.',
      },
    ],
    painPoints: {
      headline: 'What fertility clinic owners and managers say when they contact us.',
      items: [
        { quote: 'We have excellent success rates but we struggle to communicate what makes us different from the larger corporate chains.' },
        { quote: 'Our patient experience is exceptional but our online presence doesn\'t reflect that at all, patients don\'t know what to expect until they arrive.' },
        { quote: 'We want to grow our egg freezing programme but we haven\'t found a way to reach younger women who aren\'t yet thinking about fertility clinics.' },
        { quote: 'We get a lot of enquiries but our conversion from enquiry to treatment start is lower than it should be. We don\'t know where we\'re losing people.' },
      ],
    },
    pillars: {
      build: 'We build a patient acquisition and nurture system designed around the fertility treatment decision journey, from fertility awareness content to outcome transparency to emotional experience storytelling.',
      grow: 'We develop your search and paid acquisition presence for IVF, egg freezing, and fertility assessment search terms, and build the conversion optimisation programme that reduces enquiry drop-off and improves treatment start rates.',
      brand: 'We position your clinic as the clinically credible, emotionally intelligent fertility destination in your market, with a brand identity and patient experience design that converts the patients who are choosing on more than success rate tables.',
    },
    proof: {
      clientName: 'The Meridian Fertility Centre',
      specialty: 'Fertility Clinic',
      location: 'London, UK',
      quote: 'Our egg freezing enquiries tripled within six months of launching the new programme. We were sitting on that demand without a way to reach it.',
      metrics: [
        { value: '3.1×', label: 'Egg freezing enquiries' },
        { value: '+44%', label: 'Treatment start conversion rate' },
        { value: '+68%', label: 'Patient referral volume' },
      ],
      talkToHref: '/references/meridian-fertility',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Gynaecologists / OBGYN', slug: 'private-gp-practices' },
      { label: 'Urologists', slug: 'urologists' },
      { label: 'Endocrinologists (via Private GP)', slug: 'private-gp-practices' },
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
    ],
    finalCta: {
      headline: 'The patients looking for the fertility clinic they can trust are already searching. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const physiotherapists = {
    specialtyLabel: 'Physiotherapists',
    practiceNoun: 'physiotherapy',
    ctaHref: '/contact/physiotherapists',
    hero: {
      headline: 'More self-referring private physio patients. A practice that grows beyond GP and surgical referrals.',
      subcopy: [
        'Private physiotherapy has a wide patient base, sports injuries, post-surgical rehab, MSK conditions, neurological rehab, but most practices rely on a narrow set of referral relationships that limit how far they can grow.',
        'We build the acquisition and retention systems that make your practice findable, bookable, and referable by the patients and practitioners who need you most.',
      ],
    },
    insights: [
      {
        title: 'Condition-specific content dramatically outperforms generic "private physio" marketing',
        body: 'A patient searching "ACL rehab physio near me" is further along, more motivated, and more likely to convert than one searching "physiotherapist." Condition-specific pages convert at 3–5× the rate of generic practice pages.',
      },
      {
        title: 'Surgeon and orthopaedic post-operative referral relationships are your highest-value pipeline',
        body: 'Physios who are the go-to post-op recommendation from one or two orthopaedic surgeons receive consistent, grateful, high-converting patient referrals. Building these relationships systematically is one of the highest-ROI activities in private physiotherapy.',
      },
      {
        title: 'Online booking is now the baseline expectation for private physio patients',
        body: 'Practices without a seamless, fast online booking experience lose a significant proportion of motivated patients to competitors who make booking easier. Friction at the booking stage is one of the most expensive silent problems in private practice.',
      },
      {
        title: 'Outcome measurement is an underused competitive differentiator',
        body: 'Physiotherapy practices that systematically measure and publish patient outcomes, functional improvement, return-to-sport timelines, patient satisfaction, attract both higher-quality patients and higher-quality referrers.',
      },
    ],
    painPoints: {
      headline: 'What physiotherapists say when they reach out to us.',
      items: [
        { quote: 'I rely heavily on one or two surgeon referrers. When they\'re on holiday or on leave my diary empties immediately.' },
        { quote: 'I know there are patients searching for exactly what I specialise in but I\'m not showing up in those searches.' },
        { quote: 'My patient outcomes are excellent but I have no way to show that to potential patients or referrers online.' },
        { quote: 'I want to grow beyond my current referral base but I\'ve never been trained in any of the business side of running a practice.' },
      ],
    },
    pillars: {
      build: 'We build condition-specific content pathways, a seamless online booking experience, and a surgeon and GP referral development programme, creating the full acquisition infrastructure your practice needs to grow beyond word-of-mouth.',
      grow: 'We develop your search presence for specific condition and treatment search terms, run targeted campaigns for your highest-value patient segments, and build the structured referral relationships that provide a reliable, growing pipeline.',
      brand: 'We establish your clinical authority, in your subspecialty of choice, your outcome standards, and your patient care approach, through content and positioning that attracts the patients and practitioners who value what you do.',
    },
    proof: {
      clientName: 'Laura Wexford',
      specialty: 'Physiotherapist',
      location: 'Edinburgh, UK',
      quote: 'The condition-specific content was the single biggest change we made. ACL and rotator cuff pages we built in month one are still our highest-converting pages two years later.',
      metrics: [
        { value: '4.3×', label: 'Organic search bookings' },
        { value: '+67%', label: 'New patient volume' },
        { value: '+12', label: 'New surgeon referral relationships' },
      ],
      talkToHref: '/references/laura-wexford',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Sports Medicine Doctors', slug: 'sports-medicine-doctors' },
      { label: 'Orthopaedic Surgeons', slug: 'orthopaedic-surgeons' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
      { label: 'Spine Surgeons', slug: 'spine-surgeons' },
    ],
    finalCta: {
      headline: 'A private physio practice that grows on its own requires more than a good reputation. Let\'s build the system.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const painManagementSpecialists = {
    specialtyLabel: 'Pain Management Specialists',
    practiceNoun: 'pain management',
    ctaHref: '/contact/pain-management-specialists',
    hero: {
      headline: 'More patients who\'ve been living with pain and finally found the right specialist.',
      subcopy: [
        'Pain management patients are often at the end of a long, frustrating journey through generalist care. When they find a specialist who speaks their language and offers real answers, they convert, commit, and refer with extraordinary loyalty.',
        'We build the acquisition systems that put you at the end of that journey, instead of invisible to it.',
      ],
    },
    insights: [
      {
        title: 'Chronic back pain patients are the highest-volume pain management search audience',
        body: 'Patients managing chronic back and neck pain represent the largest self-referral opportunity in pain medicine. Practices with specific, credible chronic pain content attract this audience continuously and at low cost through organic search.',
      },
      {
        title: 'Nerve block and interventional procedure patients have shorter decision cycles than conservative pain patients',
        body: 'Patients who have already been through physiotherapy and medication management and want interventional options are highly motivated and convert quickly. Procedure-specific content for blocks, ablation, and spinal cord stimulation converts this segment efficiently.',
      },
      {
        title: 'Chronic pain patients are among the most loyal in all of private medicine',
        body: 'Patients whose pain is genuinely improved refer everyone in their lives with similar problems. A single well-managed chronic pain patient is worth ten short-term surgical patients in lifetime referral value.',
      },
      {
        title: 'GP and physiotherapy referral relationships are the most scalable pipeline for pain management practices',
        body: 'GPs managing patients on long-term opioids or chronic pain protocols are looking for a specialist to refer to. Physios who hit the ceiling of conservative management want a pain specialist to escalate to. Both referral relationships are systematic and buildable.',
      },
    ],
    painPoints: {
      headline: 'What pain management specialists tell us when they reach out.',
      items: [
        { quote: 'I keep seeing the same presentations because I\'m only getting referrals from two GPs. I want more variety and more complex cases.' },
        { quote: 'I do excellent interventional work but I\'m not getting enough of those referrals compared to the conservative management cases.' },
        { quote: 'Patients suffering with chronic pain can\'t find me because I\'m not visible in the searches they\'re doing from home at 11pm.' },
        { quote: 'I want to grow but I\'m conscious of the ethical lines around marketing for a specialty that attracts vulnerable patients.' },
      ],
    },
    pillars: {
      build: 'We build condition-specific content pathways for your highest-demand presentations, procedure-specific pages for interventional work, and a GP and physio referral development programme, with intake processes that manage patient expectations before consultation.',
      grow: 'We develop your search presence for chronic pain and interventional procedure terms, run campaigns targeting patients with high-intent pain management searches, and build the referral infrastructure that creates a sustainable and varied caseload.',
      brand: 'We establish your pain management authority with sensitivity and clinical precision, building a public profile that attracts patients who are ready to commit to treatment and referrers who trust your clinical standards.',
    },
    proof: {
      clientName: 'Dr. Nadia Okonkwo',
      specialty: 'Pain Management Specialist',
      location: 'London, UK',
      quote: 'The chronic back pain content brought in patients who had been suffering for years and just hadn\'t been able to find me. Their gratitude, and their referral behaviour, was remarkable.',
      metrics: [
        { value: '4.7×', label: 'Chronic pain patient enquiries' },
        { value: '+59%', label: 'Interventional procedure referrals' },
        { value: '+34', label: 'New GP and physio referral relationships' },
      ],
      talkToHref: '/references/nadia-okonkwo',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Spine Surgeons', slug: 'spine-surgeons' },
      { label: 'Neurologists', slug: 'neurologists' },
      { label: 'Physiotherapists', slug: 'physiotherapists' },
      { label: 'Rheumatologists', slug: 'rheumatologists' },
    ],
    finalCta: {
      headline: 'Patients in chronic pain are looking for an answer. Let\'s make sure you\'re the one they find.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const podiatrists = {
    specialtyLabel: 'Podiatrists',
    practiceNoun: 'podiatry',
    ctaHref: '/contact/podiatrists',
    hero: {
      headline: 'More private podiatry patients and a practice that grows on more than local word of mouth.',
      subcopy: [
        'Private podiatry has a broad patient base: diabetic foot patients, sports injury patients, nail surgery candidates, and chronic foot condition sufferers who\'ve been dismissed elsewhere.',
        'We build acquisition systems that make your expertise findable to the patients who need it and ensure the right ones book with you.',
      ],
    },
    insights: [
      {
        title: 'Diabetic foot care patients have the highest clinical need and the strongest referral loyalty',
        body: 'Podiatrists who develop a visible specialism in diabetic foot assessment and care capture a large, medically motivated patient group and become the first referral for diabetologists and practice nurses managing diabetic patients in their area.',
      },
      {
        title: 'Nail surgery is a high-volume, self-referring procedure with a fast decision cycle',
        body: 'Patients with chronic ingrown toenail problems search directly and want to book quickly. A clear, reassuring nail surgery pathway with a fast booking option captures significant direct volume.',
      },
      {
        title: 'Sports podiatry and biomechanics patients are an underserved, growing segment',
        body: 'Runners, footballers, and active patients seeking gait analysis and orthotic prescription are highly motivated, well-networked, and refer widely within their sporting communities. Practices with visible sports podiatry content attract this group efficiently.',
      },
      {
        title: 'GP and practice nurse referral relationships are the most scalable referral pipeline in podiatry',
        body: 'GPs managing diabetic patients, elderly patients, and those with chronic foot conditions are looking for a reliable podiatrist to refer to. A structured outreach programme to local GP practices typically doubles referral volume within a year.',
      },
    ],
    painPoints: {
      headline: 'What podiatrists tell us when they first contact us.',
      items: [
        { quote: 'I\'m busy enough but most of my patients come from two or three GP practices and personal recommendation, it\'s fragile.' },
        { quote: 'I want to grow my sports podiatry work but I can\'t get visible in that space against larger sports medicine clinics.' },
        { quote: 'I do excellent diabetic foot work but I\'m not the go-to podiatrist for the diabetes clinics in my area and I don\'t know how to change that.' },
        { quote: 'My nail surgery is in demand but I can\'t figure out how to make that visible online in a way that doesn\'t seem trivial.' },
      ],
    },
    pillars: {
      build: 'We build condition-specific patient pathways for diabetic foot care, nail surgery, and sports podiatry, with the content, booking flows, and intake processes each patient type requires.',
      grow: 'We develop your search visibility for podiatry condition and procedure searches, build a GP and practice nurse referral programme, and create the sports community content that positions you as the trusted performance podiatrist in your area.',
      brand: 'We establish your podiatric authority, in your clinical subspecialty, your patient care approach, and your diagnostic precision, through content and positioning that differentiates you clearly from generalist competitors.',
    },
    proof: {
      clientName: 'Emma Fitzgerald',
      specialty: 'Podiatrist',
      location: 'Bristol, UK',
      quote: 'The diabetic foot content positioned us as the specialist practice for the diabetes clinics nearby. Within eight months, two of them were sending us regular referrals. That changed the character of our practice.',
      metrics: [
        { value: '+2', label: 'Diabetes clinic referral relationships' },
        { value: '3.4×', label: 'Sports podiatry enquiries' },
        { value: '+56%', label: 'New patient volume' },
      ],
      talkToHref: '/references/emma-fitzgerald',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Physiotherapists', slug: 'physiotherapists' },
      { label: 'Sports Medicine Doctors', slug: 'sports-medicine-doctors' },
      { label: 'Orthopaedic Surgeons', slug: 'orthopaedic-surgeons' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'A private podiatry practice built for growth starts with the right acquisition system.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const rheumatologists = {
    specialtyLabel: 'Rheumatologists',
    practiceNoun: 'rheumatology',
    ctaHref: '/contact/rheumatologists',
    hero: {
      headline: 'More private rheumatology patients who need you and the referral network to send them.',
      subcopy: [
        'Rheumatological conditions are often complex, underdiagnosed, and poorly managed in primary care. Patients who find the right rheumatologist privately are intensely loyal, but most practices have no systematic way to reach them.',
        'We build acquisition and referral development systems that change that.',
      ],
    },
    insights: [
      {
        title: 'Undiagnosed or misdiagnosed autoimmune patients are a large, self-referring audience',
        body: 'Patients with fatigue, joint pain, and systemic symptoms who have been given non-specific diagnoses are active online researchers. Content that helps them understand the range of rheumatological conditions and what specialist assessment involves converts at exceptional rates.',
      },
      {
        title: 'Rheumatoid arthritis and early inflammatory arthritis patients have the greatest urgency',
        body: 'Patients who have been told they may have early RA or inflammatory arthritis self-refer urgently to avoid NHS waiting times for diagnosis and treatment initiation. A fast, clear private pathway for this group converts within days.',
      },
      {
        title: 'GP referral development in rheumatology is dramatically undersystematic',
        body: 'Most private rheumatologists have casual referral relationships with a small number of GPs. A structured outreach programme to GPs managing patients with possible autoimmune or inflammatory conditions typically doubles referral volume within a year.',
      },
      {
        title: 'Biologics and advanced therapy discussions are a credibility signal patients actively seek',
        body: 'Patients researching whether they\'re candidates for biological treatments actively search for rheumatologists with experience in this area. Practices with clear, accessible content about biologics and DMARDs attract a highly motivated subset of patients.',
      },
    ],
    painPoints: {
      headline: 'What rheumatologists say when they reach out.',
      items: [
        { quote: 'My private practice is thin. I see fewer than 20 private patients a week and I don\'t know how to grow it without it feeling like self-promotion.' },
        { quote: 'Patients with early inflammatory symptoms are waiting months on the NHS and could come to me privately, but they don\'t know I exist.' },
        { quote: 'I have good relationships with a handful of GPs but no way to systematically build those relationships with GPs I don\'t already know.' },
        { quote: 'I want to be known for my biologics expertise but I don\'t have any marketing infrastructure to support that positioning.' },
      ],
    },
    pillars: {
      build: 'We build condition-specific patient pathways for RA, lupus, vasculitis, and undifferentiated inflammatory disease and create the GP referral communication tools that make referring to you easy, reliable, and rewarding.',
      grow: 'We develop your search presence for rheumatological condition and symptom terms, build a structured GP referral programme for inflammatory and autoimmune conditions, and create content that positions your biologics expertise to the patients who need to know about it.',
      brand: 'We establish your rheumatological authority, through patient education content, peer-facing positioning, and a digital presence that clearly communicates your diagnostic rigour and treatment expertise to patients and referrers.',
    },
    proof: {
      clientName: 'Dr. Alicia Romero',
      specialty: 'Rheumatologist',
      location: 'London, UK',
      quote: 'The early arthritis content attracted patients who were desperate for a diagnosis and had nowhere to turn. Their loyalty and their word-of-mouth were extraordinary. It changed my whole practice.',
      metrics: [
        { value: '4.2×', label: 'Early arthritis patient enquiries' },
        { value: '+61%', label: 'Private consultation volume' },
        { value: '+31', label: 'New GP referral relationships' },
      ],
      talkToHref: '/references/alicia-romero',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Neurologists', slug: 'neurologists' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
      { label: 'Physiotherapists', slug: 'physiotherapists' },
      { label: 'Cardiologists', slug: 'cardiologists' },
    ],
    finalCta: {
      headline: 'The patients who need a rheumatologist are searching right now. Let\'s make sure they find you.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const gastroenterologists = {
    specialtyLabel: 'Gastroenterologists',
    practiceNoun: 'gastroenterology',
    ctaHref: '/contact/gastroenterologists',
    hero: {
      headline: 'More private gastroenterology patients. A practice not dependent on one or two referral sources.',
      subcopy: [
        'Private gastroenterology has strong fundamentals, gut health awareness is growing, diagnostic procedures are highly sought after privately, and patients with chronic GI conditions are actively seeking specialist management.',
        'We build acquisition systems that capitalise on this demand and give your practice a diversified, predictable patient pipeline.',
      ],
    },
    insights: [
      {
        title: 'Private colonoscopy is one of the most searched private diagnostic procedures',
        body: 'Patients seeking to avoid long NHS waits for colonoscopy represent a large, motivated self-referral segment. Practices with a clear, accessible private endoscopy pathway capture this demand directly and consistently.',
      },
      {
        title: 'IBS and gut health patients are frustrated, underserved, and highly loyal when properly managed',
        body: 'Patients with IBS who have been told nothing is wrong are highly motivated to seek specialist private care. Content that acknowledges their frustration and explains what specialist evaluation adds converts at exceptional rates.',
      },
      {
        title: 'Capsule endoscopy and specialist IBD management are high-margin, undermarketed service lines',
        body: 'Complex diagnostic and specialist management services that GPs cannot provide are your highest-value acquisition opportunities. Most gastroenterologist websites don\'t create patient-facing content about them.',
      },
      {
        title: 'The gut health media conversation is a patient acquisition opportunity most clinicians ignore',
        body: 'Media attention on the microbiome, gut-brain axis, and dietary interventions is driving significant public interest in gastroenterology. Practices with content at this intersection attract patients who arrive already educated and engaged.',
      },
    ],
    painPoints: {
      headline: 'What gastroenterologists say when they contact us.',
      items: [
        { quote: 'My private practice is entirely dependent on one hospital and two GP practices. It feels fragile.' },
        { quote: 'I know there\'s huge demand for private colonoscopy but my website doesn\'t explain what I offer or how to book it.' },
        { quote: 'I have a real interest in IBD and want to be known for it, but I\'m not sure how to position a subspecialty without it seeming too narrow.' },
        { quote: 'The gut health space is everywhere in the media but I don\'t seem to be capturing any of the interest it\'s generating.' },
      ],
    },
    pillars: {
      build: 'We build clear procedural and condition-specific patient pathways, for colonoscopy, IBS, IBD, and your specialist interests, and create the educational content that converts research-phase patients into booked appointments.',
      grow: 'We develop your search visibility for private GI procedure and condition terms, build a GP referral development programme, and create content that positions you at the intersection of specialist gastroenterology and growing public gut health awareness.',
      brand: 'We position your gastroenterological expertise as a trusted authority in your area, bridging clinical depth and accessible patient communication in a way that attracts both direct patients and high-quality referrers.',
    },
    proof: {
      clientName: 'Dr. Samuel Mensah',
      specialty: 'Gastroenterologist',
      location: 'London, UK',
      quote: 'The IBS content became our single highest-converting page within three months. Those patients had typically been dismissed elsewhere and were extraordinarily loyal when we took them seriously.',
      metrics: [
        { value: '5.2×', label: 'IBS patient enquiries' },
        { value: '+63%', label: 'Private appointment volume' },
        { value: '+41%', label: 'GP referral breadth' },
      ],
      talkToHref: '/references/samuel-mensah',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Urologists', slug: 'urologists' },
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Rheumatologists', slug: 'rheumatologists' },
      { label: 'Pain Management Specialists', slug: 'pain-management-specialists' },
    ],
    finalCta: {
      headline: 'Private gastroenterology demand is growing. Make sure your practice is there to meet it.',
    },
  }
  
  // ─────────────────────────────────────────────────────────────
  // E. PR + CLINIC OWNERS  (6)
  // ─────────────────────────────────────────────────────────────
  
  export const privateGpPractices = {
    specialtyLabel: 'Private GP Practices',
    practiceNoun: 'private GP',
    ctaHref: '/contact/private-gp-practices',
    hero: {
      headline: 'More registered patients who stay for years, not just for the appointment they can\'t get on the NHS.',
      subcopy: [
        'Private GP is a relationship business built on continuity, trust, and the sense that your doctor genuinely knows you. Patients who find this are intensely loyal and refer their families.',
        'We build the acquisition and retention systems that grow your registered list with the patients who value long-term private GP care, not one-off appointment seekers.',
      ],
    },
    insights: [
      {
        title: 'Annual health check packages are your highest-leverage entry product',
        body: 'Patients who register for a comprehensive annual health assessment are more likely to maintain a long-term private GP relationship than those who register for episodic care. The health check is both a service and a conversion pathway.',
      },
      {
        title: 'New mover and new employer audiences convert to registered private GP patients at very high rates',
        body: 'Professionals who have recently moved to a new city or started a new role are actively looking for a private GP and are in a high-openness-to-switch moment. Practices with visibility in this moment acquire loyal, long-term patients at low cost.',
      },
      {
        title: 'Employer corporate health packages are a high-value B2B acquisition channel most private GPs ignore',
        body: 'Employers seeking private healthcare for senior staff represent a scalable revenue stream. A structured B2B marketing programme for this audience operates entirely differently to patient-facing marketing and most practices have never tried it.',
      },
      {
        title: 'Patients leaving NHS dentistry are actively looking for a private GP equivalent',
        body: 'The cultural shift toward paying for healthcare that matches NHS shortfalls has created a growing audience of patients who are newly open to private GP registration. The moment they start searching is your best acquisition window.',
      },
    ],
    painPoints: {
      headline: 'What private GP practice owners and managers say when they contact us.',
      items: [
        { quote: 'We get a lot of one-off appointment bookings but our registered patient list isn\'t growing the way it should be.' },
        { quote: 'I want to grow our corporate health offering but I\'ve never done B2B marketing and I don\'t know where to start.' },
        { quote: 'We\'re in a wealthy area with huge potential but we don\'t have a systematic way to reach the patients who are most likely to register.' },
        { quote: 'My practice is full but it\'s full of the wrong mix. I want more registered patients and fewer episodic.' },
      ],
    },
    pillars: {
      build: 'We build patient registration pathways, annual health check conversion programmes, and the digital infrastructure, from website to booking system to follow-up, that turns first appointments into long-term registered patients.',
      grow: 'We develop your local acquisition presence for private GP search terms, build a B2B corporate health programme, and create the new-patient experience that registers episodic patients into long-term relationships.',
      brand: 'We build a practice brand that communicates the private GP experience your ideal patients are looking for, continuity, accessibility, and clinical depth, in a way that makes you the obvious choice.',
    },
    proof: {
      clientName: 'The Kensington Medical Practice',
      specialty: 'Private GP Practice',
      location: 'London, UK',
      quote: 'The corporate health programme was the biggest revenue development we\'d made in five years. Three employer contracts in the first six months, and the individuals from those companies started registering privately too.',
      metrics: [
        { value: '+3', label: 'Corporate health employer contracts' },
        { value: '+48%', label: 'New patient registrations' },
        { value: '-38%', label: 'Episodic-to-registered patient attrition' },
      ],
      talkToHref: '/references/kensington-medical',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Private Practice Owners', slug: 'private-practice-owners' },
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
      { label: 'Clinic Managers', slug: 'clinic-managers' },
    ],
    finalCta: {
      headline: 'A thriving private GP practice is built on registered patients who stay. Let\'s build your list.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const multiLocationClinicOwners = {
    specialtyLabel: 'Multi-location Clinic Owners',
    practiceNoun: 'multi-location clinic',
    ctaHref: '/contact/multi-location-clinic-owners',
    hero: {
      headline: 'Every location performing. Every site pulling its weight. One system to manage it all.',
      subcopy: [
        'Opening a second or third location should accelerate growth, but most multi-site clinic owners discover it multiplies complexity faster than it multiplies revenue. The marketing infrastructure that worked for one site almost never scales cleanly.',
        'We build growth systems designed specifically for multi-site clinics: location-specific acquisition, consistent brand architecture, and the reporting infrastructure that tells you what\'s actually happening across every site.',
      ],
    },
    insights: [
      {
        title: 'Multi-site SEO requires specific architectural investment that single-site approaches miss',
        body: 'Location pages, Google Business Profile management, and internal link structures for multi-site practices require specialist attention. Practices treated like a single-site operation underperform on local search for every location beyond the first.',
      },
      {
        title: 'Brand consistency across locations is a significant unrealised revenue driver',
        body: 'Patients who have a good experience at one location and refer a friend to another expect the same standard. When they don\'t get it, both patients are at risk. A unified brand and patient experience system protects this.',
      },
      {
        title: 'Cross-location patient referral is a low-cost growth lever most multi-site operators miss',
        body: 'Patients who live or work near a different location to the one they registered at represent a warm transfer opportunity. A simple, well-communicated cross-location referral process adds new patient registrations at near-zero acquisition cost.',
      },
      {
        title: 'Under-performing locations are usually a marketing problem, not a clinical one',
        body: 'Most second or third locations that underperform were launched without location-specific marketing. The service is as good as the first site; the demand generation infrastructure simply wasn\'t built for the new location.',
      },
    ],
    painPoints: {
      headline: 'What multi-location clinic owners say when they reach out.',
      items: [
        { quote: 'We\'ve grown and the marketing infrastructure hasn\'t kept up. Each site is basically doing its own thing with inconsistent results.' },
        { quote: 'Our second location has been slower to grow than expected and I\'m not sure if it\'s a marketing problem or a local market problem.' },
        { quote: 'I don\'t have visibility across what\'s performing at each site. I can\'t manage what I can\'t measure.' },
        { quote: 'We acquired a third location and its branding is completely different. I need to unify it without alienating its existing patients.' },
      ],
    },
    pillars: {
      build: 'We audit your full multi-site marketing infrastructure, brand architecture, location SEO, cross-site referral systems, and performance tracking, and build the unified foundation that lets every location compete effectively.',
      grow: 'We build location-specific acquisition strategies within a consistent brand architecture, develop cross-location referral programmes, and implement reporting systems that give you real visibility across the group.',
      brand: 'We build or consolidate your group brand, ensuring every location communicates the same standard, the same promise, and the same patient experience while maintaining any locally important identity.',
    },
    proof: {
      clientName: 'Sarah Tran',
      specialty: 'Multi-site Clinic Owner',
      location: 'Los Angeles, US',
      quote: 'Our second location started performing within eight months of relaunching it properly under the group brand. We\'d been leaving significant revenue on the table for nearly a year.',
      metrics: [
        { value: '+82%', label: 'Second location revenue' },
        { value: '2.9×', label: 'Group brand search visibility' },
        { value: '+38%', label: 'Cross-location patient transfers' },
      ],
      talkToHref: '/references/sarah-tran',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Private Practice Owners', slug: 'private-practice-owners' },
      { label: 'Healthcare Group Operators', slug: 'healthcare-group-operators' },
      { label: 'Clinic Managers', slug: 'clinic-managers' },
      { label: 'Private GP Practices', slug: 'private-gp-practices' },
    ],
    finalCta: {
      headline: 'Every location you\'ve built deserves to perform. Let\'s make sure they do.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const privatePracticeOwners = {
    specialtyLabel: 'Private Practice Owners',
    practiceNoun: 'private practice',
    ctaHref: '/contact/private-practice-owners',
    hero: {
      headline: 'Build a private practice that grows around a system, not around you.',
      subcopy: [
        'Every private practice owner eventually hits the same ceiling: they\'re the most skilled clinician in the building, but growth has stalled because the business only works when they\'re present.',
        'We build the patient acquisition, retention, and brand systems that let your practice grow independently of your personal time and attention.',
      ],
    },
    insights: [
      {
        title: 'Practice revenue is disproportionately concentrated in a small number of loyal patients',
        body: 'In most private practices, 20% of patients generate 60–70% of revenue. Identifying, serving, and systematically replicating this patient segment is the highest-leverage growth activity and most owners have never mapped it explicitly.',
      },
      {
        title: 'Staff-dependent service delivery is a retention and resilience risk',
        body: 'When patients are loyal to an individual practitioner rather than to the practice, staff turnover creates patient churn. Building loyalty to the practice brand and experience, not just to individuals, is essential structural protection.',
      },
      {
        title: 'Most private practice owners have never audited their enquiry-to-patient conversion process',
        body: 'The difference between a 30% and 60% conversion rate is usually a system, not a service quality difference. A simple audit of how your practice handles new enquiries almost always identifies significant revenue that\'s currently being lost.',
      },
      {
        title: 'Marketing attribution is systematically broken in most private practices',
        body: 'If you can\'t trace a booked appointment back to the marketing activity that generated the enquiry, you\'re making budget decisions in the dark. Building this tracking infrastructure is the foundation of every efficient growth programme.',
      },
    ],
    painPoints: {
      headline: 'What private practice owners say when they come to us.',
      items: [
        { quote: 'I\'m doing more revenue than ever but I feel more stretched than ever. Something isn\'t working at a structural level.' },
        { quote: 'My marketing is a mix of things I\'ve tried over the years. I genuinely don\'t know which parts are working.' },
        { quote: 'One of my senior practitioners left and took patients with them. I need to build the practice around the brand, not the individual.' },
        { quote: 'I want to eventually sell or bring in a partner, but I know the practice doesn\'t look attractive without proper systems in place.' },
      ],
    },
    pillars: {
      build: 'We audit your full patient journey, from first touch to loyal patient, and build the infrastructure to optimise every stage: booking systems, intake processes, follow-up sequences, and retention protocols.',
      grow: 'We build acquisition systems across your highest-ROI channels, develop your referral programme, and create the tracking infrastructure that tells you exactly what\'s growing your practice and what isn\'t.',
      brand: 'We build a practice brand that outlasts any individual practitioner, with a visual identity, patient experience design, and content strategy that builds loyalty to your name, not your staff.',
    },
    proof: {
      clientName: 'Mr. Thomas Okafor',
      specialty: 'Private Surgeon / Practice Owner',
      location: 'Birmingham, UK',
      quote: 'For the first time I could tell a potential investor exactly what our patient acquisition cost was, what our lifetime patient value was, and what our growth trajectory looked like. That changed every conversation about the future of the practice.',
      metrics: [
        { value: '£3.4', label: 'Return per £1 of marketing spend (tracked)' },
        { value: '-42%', label: 'Patient churn after staff changes' },
        { value: '+51%', label: 'New patient volume within 12 months' },
      ],
      talkToHref: '/references/thomas-okafor',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
      { label: 'Healthcare Group Operators', slug: 'healthcare-group-operators' },
      { label: 'Clinic Managers', slug: 'clinic-managers' },
      { label: 'Private GP Practices', slug: 'private-gp-practices' },
    ],
    finalCta: {
      headline: 'A practice that grows without you is built, not found. Let\'s build yours.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const privateEquityHealthcare = {
    specialtyLabel: 'Private Equity Healthcare',
    practiceNoun: 'healthcare portfolio',
    ctaHref: '/contact/private-equity-healthcare',
    hero: {
      headline: 'Portfolio-level growth infrastructure. Practice-level patient acquisition. Measurable at every level.',
      subcopy: [
        'Healthcare private equity portfolios face a specific marketing problem: the acquisition strategies that work for individual practices don\'t scale to a portfolio, and the brand consolidation strategies that work for portfolios don\'t account for clinical identity.',
        'We build growth systems for healthcare PE portfolios that operate across both levels, with the reporting infrastructure to demonstrate value creation at every stage.',
      ],
    },
    insights: [
      {
        title: 'Marketing due diligence on healthcare acquisitions is systematically underweighted',
        body: 'Most healthcare M&A due diligence focuses on clinical operations and financial performance. Patient acquisition infrastructure, brand equity, referral network concentration, and digital presence are frequently overlooked and frequently the source of post-acquisition underperformance.',
      },
      {
        title: 'Platform practice brand architecture is the most impactful early post-acquisition investment',
        body: 'PE-backed practices that consolidate under a unified brand within the first twelve months of acquisition outperform those that maintain disparate brand identities across the hold period. The brand transition strategy matters as much as the brand itself.',
      },
      {
        title: 'Patient acquisition cost data is the most compelling value creation narrative for exits',
        body: 'Acquirers paying a premium for healthcare businesses want to see systematic, repeatable patient acquisition with measurable unit economics. Practices with this data command higher multiples. Most don\'t have it until they build it.',
      },
      {
        title: 'Digital presence is now a standard component of healthcare business valuation',
        body: 'Domain authority, search visibility, review rating and volume, and patient acquisition infrastructure contribute directly to business value. PE sponsors who invest in these assets during the hold period realise measurable uplift at exit.',
      },
    ],
    painPoints: {
      headline: 'What private equity healthcare teams say when they reach out.',
      items: [
        { quote: 'We\'ve acquired three practices and each one has a completely different brand. We need to consolidate without destroying what made each practice valuable.' },
        { quote: 'We want to demonstrate marketing-driven value creation to our LPs but we haven\'t built the tracking infrastructure to show it quantitatively.' },
        { quote: 'We\'re preparing for exit and we know our digital presence is a weak point in the story. We need to fix it before the process starts.' },
        { quote: 'Our platform practice has strong clinical performance but its marketing infrastructure is years behind. We need a rapid build-out.' },
      ],
    },
    pillars: {
      build: 'We conduct marketing due diligence and infrastructure audits for acquisition targets and portfolio companies, assessing patient acquisition systems, brand equity, digital presence, and referral network concentration, then building the growth infrastructure post-completion.',
      grow: 'We build portfolio-level marketing systems: unified brand architecture, consolidated digital infrastructure, cross-practice referral networks, and the tracking systems that produce the patient acquisition unit economics PE sponsors need.',
      brand: 'We design and execute brand consolidation programmes for PE-backed healthcare businesses, managing the transition from disparate practice identities to a cohesive platform brand that preserves clinical trust while delivering the valuation benefits of brand consistency.',
    },
    proof: {
      clientName: 'Meridian Health Partners',
      specialty: 'Healthcare PE, Dental Platform',
      location: 'South-East England',
      quote: 'The pre-exit digital audit identified £680,000 of recurring annual patient acquisition value that wasn\'t previously documented. It changed how we presented the business entirely.',
      metrics: [
        { value: '+£680k', label: 'Documented patient acquisition value (pre-exit)' },
        { value: '4.1×', label: 'Portfolio digital visibility uplift' },
        { value: '-31%', label: 'Patient acquisition cost across portfolio' },
      ],
      talkToHref: '/references/meridian-health-partners',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Healthcare Group Operators', slug: 'healthcare-group-operators' },
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
      { label: 'Private Practice Owners', slug: 'private-practice-owners' },
      { label: 'Clinic Managers', slug: 'clinic-managers' },
    ],
    finalCta: {
      headline: 'Value creation in healthcare PE starts with patient acquisition infrastructure. Let\'s build it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const clinicManagers = {
    specialtyLabel: 'Clinic Managers',
    practiceNoun: 'clinic management',
    ctaHref: '/contact/clinic-managers',
    hero: {
      headline: 'The growth results your clinicians want, with the evidence your board expects.',
      subcopy: [
        'Clinic managers carry a specific challenge: they\'re responsible for growth outcomes they can\'t clinically control, with budgets that need to justify themselves to both clinicians and finance teams.',
        'We work with clinic managers as partners, building systems that produce measurable results, that are reportable to your stakeholders, and that free you from managing marketing activity yourself.',
      ],
    },
    insights: [
      {
        title: 'Most clinics spend marketing budget in inverse proportion to channel ROI',
        body: 'The highest-ROI channels, SEO, referral development, patient reactivation, are under-invested. The lowest-ROI channels, social media, print advertising, absorb most of the budget. An audit almost always reveals significant reallocation opportunities.',
      },
      {
        title: 'Marketing attribution in healthcare is broken in most practices',
        body: 'If you can\'t trace a booked appointment to the activity that generated it, you\'re making budget decisions in the dark. Building this tracking infrastructure is the foundational step and most clinic managers have never been given the tools to do it.',
      },
      {
        title: 'Patient satisfaction scores are your most under-leveraged growth asset',
        body: 'High NPS and satisfaction scores are marketable assets. Practices that actively surface these data points in their acquisition marketing convert new patients at dramatically higher rates and the data is usually already sitting unused in a spreadsheet.',
      },
      {
        title: 'CQC or JCI accreditation is a trust signal most practices fail to market',
        body: 'Outstanding or accredited regulatory ratings are significant credibility signals to prospective patients. They belong prominently in your acquisition channels, not buried in a footer that nobody reads.',
      },
    ],
    painPoints: {
      headline: 'What clinic managers say when they contact us.',
      items: [
        { quote: 'I\'ve inherited a marketing setup I didn\'t build and I genuinely don\'t know what\'s working. I can\'t tell the board with confidence.' },
        { quote: 'I have different agencies doing different things and no one has a joined-up view of our marketing performance.' },
        { quote: 'The clinicians all have different views on what marketing we should be doing and I need an independent expert view to help align them.' },
        { quote: 'I need to show the clinical director a clear plan with projected returns before I can get budget approved.' },
      ],
    },
    pillars: {
      build: 'We start with a full marketing audit, attributing spend to outcomes, identifying what\'s working and what isn\'t, and build the reporting framework that gives you and your stakeholders clear visibility over every growth channel.',
      grow: 'We build and manage the growth programme across your highest-ROI channels, with monthly reporting structured to the KPIs your board cares about and a clear, measurable improvement trajectory.',
      brand: 'We build or refine your practice brand, with a consistent identity, messaging architecture, and quality standards that your clinical and management team can align around, present to stakeholders, and trust.',
    },
    proof: {
      clientName: 'Imogen Clarke',
      specialty: 'Clinic Manager (Multi-specialty)',
      location: 'London, UK',
      quote: 'For the first time I could tell my board exactly which activities were generating our new patients, what they cost, and what they were worth. That changed the conversation about marketing budget entirely.',
      metrics: [
        { value: '£3.8', label: 'Return per £1 of marketing spend (tracked)' },
        { value: '-37%', label: 'Marketing cost per new patient' },
        { value: '+44%', label: 'New patient volume within 12 months' },
      ],
      talkToHref: '/references/imogen-clarke',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Private Practice Owners', slug: 'private-practice-owners' },
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
      { label: 'Healthcare Group Operators', slug: 'healthcare-group-operators' },
      { label: 'Private Equity Healthcare', slug: 'private-equity-healthcare' },
    ],
    finalCta: {
      headline: 'Marketing that you can measure, explain, and defend is the only kind worth doing. Let\'s build it.',
    },
  }
  
  // ─────────────────────────────────────────────
  
  export const healthcareGroupOperators = {
    specialtyLabel: 'Healthcare Group Operators',
    practiceNoun: 'healthcare group',
    ctaHref: '/contact/healthcare-group-operators',
    hero: {
      headline: 'Group-level brand power. Practice-level patient acquisition. Both working together.',
      subcopy: [
        'Running a healthcare group is a different problem to running a single clinic. Coordination, brand consistency, multi-specialty cross-referral, and management infrastructure all need to work together and they rarely do without a system built for it.',
        'We build growth infrastructure designed specifically for healthcare groups: cross-specialty patient pathways, unified brand architecture, and the commercial systems that let your group grow as a whole.',
      ],
    },
    insights: [
      {
        title: 'Cross-specialty referral within a group is the highest-margin growth lever available to group operators',
        body: 'A patient who comes in for one specialty and is appropriately directed to another within the group has dramatically lower acquisition cost and higher lifetime value. Most groups have no formal cross-referral system, they\'re leaving their most profitable growth channel on the table.',
      },
      {
        title: 'Group brand architecture amplifies every individual practice\'s marketing spend',
        body: 'When all specialties operate under a coherent group identity, awareness created by one practice lifts all others. Groups where each practice operates independently dilute brand equity and lose this multiplier effect.',
      },
      {
        title: 'Centralised patient data and CRM systems are the most under-invested infrastructure in healthcare groups',
        body: 'Groups with a unified patient view across specialties can identify cross-referral opportunities, reactivate patients efficiently, and measure patient lifetime value at the group level. Without it, these insights are invisible.',
      },
      {
        title: 'The "one-stop" care model is a growing patient preference and an underused market positioning',
        body: 'Patients who prefer to manage their health within a single trusted provider are growing in number. Healthcare groups that communicate this explicitly, as a feature, not just a footnote, attract a loyal, high-value patient segment.',
      },
    ],
    painPoints: {
      headline: 'What healthcare group operators say when they reach out.',
      items: [
        { quote: 'We have excellent individual practices but no real group identity. We\'re not getting the marketing benefits of operating as a group.' },
        { quote: 'I know our specialties should be referring to each other more but we\'ve never built the system to make it happen naturally.' },
        { quote: 'We\'re expanding and the marketing infrastructure hasn\'t scaled with us. Every new practice is essentially starting from scratch.' },
        { quote: 'We have patient data spread across four different practice management systems and no unified view of our group patient base.' },
      ],
    },
    pillars: {
      build: 'We audit your group\'s full marketing and patient journey infrastructure, brand architecture, cross-specialty referral systems, CRM and data consolidation, and acquisition tracking, and build the unified foundation that makes the group more than the sum of its parts.',
      grow: 'We build a cross-specialty referral programme, location-specific acquisition strategies within a consistent group brand, and the reporting systems that give you real commercial visibility across the whole operation.',
      brand: 'We build a group brand and positioning architecture that creates market presence at the group level while giving each specialty and location the individual authority positioning it needs to attract the right patients.',
    },
    proof: {
      clientName: 'The Meridian Health Group',
      specialty: 'Multi-specialty Healthcare Group',
      location: 'South-East England',
      quote: 'The cross-referral programme identified over £340,000 of annual revenue opportunity within our existing patient base that we\'d been sitting on for three years without knowing.',
      metrics: [
        { value: '+£340k', label: 'Identified cross-referral revenue opportunity' },
        { value: '+61%', label: 'Second-location patient volume' },
        { value: '2.9×', label: 'Group brand search visibility' },
      ],
      talkToHref: '/references/meridian-health-group',
      referenceHref: '/contact/reference',
    },
    relatedSpecialties: [
      { label: 'Multi-location Clinic Owners', slug: 'multi-location-clinic-owners' },
      { label: 'Private Equity Healthcare', slug: 'private-equity-healthcare' },
      { label: 'Clinic Managers', slug: 'clinic-managers' },
      { label: 'Private Practice Owners', slug: 'private-practice-owners' },
    ],
    finalCta: {
      headline: 'A healthcare group that operates as one, instead of parts, is a system problem. Let\'s solve it.',
    },
  }
  
  // ─────────────────────────────────────────────────────────────
  // MASTER EXPORT  all 34 specialty data objects
  // aligned with WHO_SURGICAL, WHO_AESTHETIC, WHO_DENTAL,
  // WHO_MEDICAL, WHO_PRACTICE slugs
  // ─────────────────────────────────────────────────────────────
  
  export const allSpecialties = [
    // A. WHO_SURGICAL (7)
    { slug: 'orthopaedic-surgeons',       category: 'surgical',   data: orthopaedicSurgeons },
    { slug: 'plastic-surgeons',           category: 'surgical',   data: plasticSurgeons },
    { slug: 'cosmetic-surgeons',          category: 'surgical',   data: cosmeticSurgeons },
    { slug: 'vascular-surgeons',          category: 'surgical',   data: vascularSurgeons },
    { slug: 'spine-surgeons',             category: 'surgical',   data: spineSurgeons },
    { slug: 'sports-medicine-doctors',    category: 'surgical',   data: sportsMedicineDoctors },
    { slug: 'oral-surgeons',              category: 'surgical',   data: oralSurgeons },
  
    // B. WHO_AESTHETIC (5)
    { slug: 'dermatologists',             category: 'aesthetic',  data: dermatologists },
    { slug: 'medspa-owners',              category: 'aesthetic',  data: medspaOwners },
    { slug: 'aesthetic-practitioners',    category: 'aesthetic',  data: aestheticPractitioners },
    { slug: 'hair-transplant-surgeons',   category: 'aesthetic',  data: hairTransplantSurgeons },
    { slug: 'laser-clinic-owners',        category: 'aesthetic',  data: laserClinicOwners },
  
    // C. WHO_DENTAL (4)
    { slug: 'dentists',                   category: 'dental',     data: dentists },
    { slug: 'orthodontists',              category: 'dental',     data: orthodontists },
    { slug: 'dental-implant-specialists', category: 'dental',     data: dentalImplantSpecialists },
    { slug: 'periodontists',              category: 'dental',     data: periodontists },
  
    // D. WHO_MEDICAL (12)
    { slug: 'ophthalmologists',           category: 'medical',    data: ophthalmologists },
    { slug: 'varicose-vein-specialists',  category: 'medical',    data: varicoseVeinSpecialists },
    { slug: 'otolaryngologists-ent',      category: 'medical',    data: otolaryngologistsEnt },
    { slug: 'urologists',                 category: 'medical',    data: urologists },
    { slug: 'cardiologists',              category: 'medical',    data: cardiologists },
    { slug: 'neurologists',               category: 'medical',    data: neurologists },
    { slug: 'fertility-clinics',          category: 'medical',    data: fertilityClinics },
    { slug: 'physiotherapists',           category: 'medical',    data: physiotherapists },
    { slug: 'pain-management-specialists',category: 'medical',    data: painManagementSpecialists },
    { slug: 'podiatrists',                category: 'medical',    data: podiatrists },
    { slug: 'rheumatologists',            category: 'medical',    data: rheumatologists },
    { slug: 'gastroenterologists',        category: 'medical',    data: gastroenterologists },
  
    // E. WHO_PRACTICE (6)
    { slug: 'private-gp-practices',       category: 'practice',   data: privateGpPractices },
    { slug: 'multi-location-clinic-owners',category: 'practice',  data: multiLocationClinicOwners },
    { slug: 'private-practice-owners',    category: 'practice',   data: privatePracticeOwners },
    { slug: 'private-equity-healthcare',  category: 'practice',   data: privateEquityHealthcare },
    { slug: 'clinic-managers',            category: 'practice',   data: clinicManagers },
    { slug: 'healthcare-group-operators', category: 'practice',   data: healthcareGroupOperators },
  ]
  
  /**
   * USAGE IN ROUTER:
   *
   * import { allSpecialties } from './specialtyContentMatrix'
   *
   * const match = allSpecialties.find(s => s.slug === params.specialty)
   * if (!match) return <NotFound />
   * return <SpecialtyPage data={match.data} />
   *
   * For category index pages:
   * const surgical = allSpecialties.filter(s => s.category === 'surgical')
   */