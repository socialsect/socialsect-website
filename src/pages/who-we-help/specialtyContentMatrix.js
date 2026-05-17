/**
 * SPECIALTY PAGE CONTENT MATRIX
 * 34 specialty pages across 5 categories
 *
 * Categories:
 *   A. Surgical Specialists       (7 pages)
 *   B. Aesthetic + Skin           (8 pages)
 *   C. Dental + Oral Health       (7 pages)
 *   D. Medical Specialists        (8 pages)
 *   E. PR + Clinic Owners         (4 pages)
 *
 * Each object maps directly to the SpecialtyPage `data` prop.
 * relatedSpecialties: pick 3–4 from the same or adjacent category.
 * proof: placeholders use realistic-but-fictional names/numbers 
 *        swap with real client data before shipping.
 */

// ─────────────────────────────────────────────
// A. SURGICAL SPECIALISTS
// ─────────────────────────────────────────────

export const plasticSurgeon = {
  specialtyLabel: 'Plastic Surgeons',
  practiceNoun: 'plastic surgery',
  ctaHref: '/contact/plastic-surgeon',
  hero: {
    headline: 'More of the right patients. Less time explaining yourself to the wrong ones.',
    subcopy: [
      'Your work speaks for itself in the operating room. But outside it, you\'re competing with practices that out-market you  regardless of their outcomes.',
      'We build patient-acquisition systems for plastic surgeons who want a full schedule of pre-qualified, procedure-ready patients and the authority positioning to charge accordingly.',
    ],
  },
  insights: [
    {
      title: 'Procedure complexity demands educated patients',
      body: 'Rhinoplasty, facelifts, and body contouring carry long decision cycles. Patients research for months before booking. You need to be present and credible at every stage of that journey.',
    },
    {
      title: 'Before-and-after content is your strongest asset  and your biggest liability',
      body: 'When used correctly, visual proof converts. When used carelessly, it attracts price-shoppers and undermines perceived clinical authority. Most practices get this wrong.',
    },
    {
      title: 'Revision anxiety drives consultations as much as desire',
      body: 'A significant share of your incoming patients previously had surgery elsewhere. How your practice handles that conversation  from first click to consult  determines who you attract.',
    },
    {
      title: 'Geography matters less than it used to',
      body: 'High-value plastic surgery patients routinely travel for the right surgeon. Your digital footprint needs to work nationally, not just in your city.',
    },
  ],
  painPoints: {
    headline: 'What we hear from plastic surgeons before they work with us.',
    items: [
      { quote: 'I\'m getting enquiries but they\'re not my ideal patient  they just want the cheapest option.' },
      { quote: 'My results are excellent but I can\'t seem to communicate that online the way I want to.' },
      { quote: 'I\'ve spent money on ads and got nothing except a flood of tyre-kickers.' },
      { quote: 'My practice is full of word-of-mouth referrals but I have no predictable pipeline beyond that.' },
    ],
  },
  pillars: {
    build: 'We audit your current funnel and build the infrastructure most practices are missing: a content ecosystem that educates, a website that converts procedure-specific traffic, and tracking that tells you exactly which channel is producing booked consultations.',
    grow: 'We run paid and organic acquisition programmes calibrated to your highest-margin procedures. Every campaign is built to surface patients who have already committed to surgery and are choosing their surgeon  not patients who are still deciding whether to have it.',
    brand: 'We position you as the clinical authority in your procedures of choice  through SEO content, press placements, and a visual brand that reflects the standard of your work. Patients who arrive already trust you before the consultation begins.',
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
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Dermatologists', slug: 'dermatologist' },
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Rhinoplasty Surgeons', slug: 'rhinoplasty-surgeon' },
  ],
  finalCta: {
    headline: 'A full schedule of procedure-ready patients is a system problem. Let\'s fix it.',
  },
}

// ─────────────────────────────────────────────

export const rhinoplastySurgeon = {
  specialtyLabel: 'Rhinoplasty Surgeons',
  practiceNoun: 'rhinoplasty',
  ctaHref: '/contact/rhinoplasty-surgeon',
  hero: {
    headline: 'Patients who want your specific skill  not just a nose job.',
    subcopy: [
      'Rhinoplasty is one of the most researched procedures online. Patients spend months comparing surgeons before they pick up the phone.',
      'We build content and acquisition systems that put you in front of that research process  and make you the obvious choice when they\'re ready to book.',
    ],
  },
  insights: [
    {
      title: 'Rhinoplasty patients are the most research-intensive in aesthetics',
      body: 'Average decision windows of 6–18 months mean patients interact with your brand dozens of times before converting. Your content needs to hold the relationship across that entire period.',
    },
    {
      title: '"Ethnic rhinoplasty" is an underserved, high-intent search category',
      body: 'Patients seeking culturally specific expertise are highly motivated and underserved by generic practice marketing. Surgeons who address this explicitly capture outsized demand.',
    },
    {
      title: 'Revision rhinoplasty drives disproportionate lifetime value',
      body: 'Patients who come to you for revision surgery following a bad outcome elsewhere are some of your highest-value patients  and most practices aren\'t marketing to them intentionally.',
    },
    {
      title: 'Trust is built visually, but won in the details',
      body: 'Before-and-afters get patients through the door. Your explanation of technique, your surgical philosophy, your patient process  that\'s what closes the consultation.',
    },
  ],
  painPoints: {
    headline: 'What rhinoplasty surgeons tell us before we start working together.',
    items: [
      { quote: 'I get enquiries from people expecting to pay half what my fees are. I don\'t know where they\'re coming from.' },
      { quote: 'I\'m the best technical surgeon in my city but a less experienced colleague is fully booked and I\'m not.' },
      { quote: 'I want more revision cases but I don\'t know how to attract them without it sounding like I\'m poaching.' },
      { quote: 'My before-and-afters are exceptional but they\'re buried on my website and no one sees them.' },
    ],
  },
  pillars: {
    build: 'We map the full rhinoplasty patient journey  from first symptom search to post-consultation follow-up  and build content that meets patients at each stage. Your website becomes a conversion machine, not a brochure.',
    grow: 'We run paid campaigns targeted specifically to rhinoplasty-ready patients and build organic search authority for the procedure terms that matter most to your practice mix  primary, revision, ethnic, and functional.',
    brand: 'We craft your surgical philosophy into a public voice: articles, Q&As, video content, and media placements that establish you as the definitive rhinoplasty authority in your region and beyond.',
  },
  proof: {
    clientName: 'Dr. James Park',
    specialty: 'Rhinoplasty Surgeon',
    location: 'New York, US',
    quote: 'The revision rhinoplasty programme alone paid for 18 months of fees within the first quarter. It found a patient segment I hadn\'t thought to market to directly.',
    metrics: [
      { value: '2.8×', label: 'Increase in consultation volume' },
      { value: '+55%', label: 'Proportion of ideal-case enquiries' },
      { value: '6 mo', label: 'Average booking lead time reduced' },
    ],
    talkToHref: '/references/james-park',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Facial Plastic Surgeons', slug: 'facial-plastic-surgeon' },
    { label: 'ENT Surgeons', slug: 'ent-surgeon' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
  ],
  finalCta: {
    headline: 'The patients looking for exactly what you do are already searching. Let\'s make sure they find you.',
  },
}

// ─────────────────────────────────────────────

export const facialPlasticSurgeon = {
  specialtyLabel: 'Facial Plastic Surgeons',
  practiceNoun: 'facial plastic surgery',
  ctaHref: '/contact/facial-plastic-surgeon',
  hero: {
    headline: 'Build the surgical caseload your training deserves.',
    subcopy: [
      'Facial plastic surgery sits at the intersection of art and medicine. Patients who understand that are worth ten who don\'t  and they\'re findable if you know where to look.',
      'We build acquisition systems that attract the patients who value precision, trust process over price, and refer everyone they know when the result is right.',
    ],
  },
  insights: [
    {
      title: 'Facelift patients skew older and are less active on social media',
      body: 'Most practice marketing focuses on younger demographics because that\'s where social platforms push you. Facelift patients require a different content strategy  longer-form, more educational, SEO-led.',
    },
    {
      title: 'The combined-procedure patient is your highest-value segment',
      body: 'Patients combining facelifts with blepharoplasty, brow lift, or fat transfer account for a disproportionate share of surgical revenue. Your marketing should explicitly address multi-procedure planning.',
    },
    {
      title: 'Your dual qualifications are an underused trust signal',
      body: 'Facial plastic surgeons with ENT or maxillofacial backgrounds have a credibility advantage patients don\'t know to ask about. We make sure they find out.',
    },
    {
      title: 'Competition with non-surgical aesthetics is intensifying',
      body: 'Patients are increasingly pushed toward non-surgical alternatives. Surgeons who clearly articulate when surgery is the better long-term choice capture patients other practices lose to the aesthetics market.',
    },
  ],
  painPoints: {
    headline: 'What facial plastic surgeons say before they start working with us.',
    items: [
      { quote: 'I do beautiful work but I can\'t translate that into the kind of online presence that fills my theatre list.' },
      { quote: 'I keep losing patients to practices with bigger marketing budgets even though my outcomes are better.' },
      { quote: 'I want to be known for one or two specific procedures but I end up taking whatever comes in.' },
      { quote: 'I don\'t have time to be a content creator  I need a system that works while I\'m in theatre.' },
    ],
  },
  pillars: {
    build: 'We audit your surgical mix, identify your highest-margin and highest-satisfaction procedures, and build a site architecture and content system that ranks and converts for those specifically.',
    grow: 'We build paid acquisition funnels for your primary procedures and long-form SEO content that captures patients 6–18 months into their decision journey  the highest-intent, lowest-price-sensitivity segment.',
    brand: 'We build your authority through speaking engagements, peer-reviewed content, press placements, and a consistent visual identity that communicates the level of your practice to the right patients.',
  },
  proof: {
    clientName: 'Dr. Marcus Webb',
    specialty: 'Facial Plastic Surgeon',
    location: 'Chicago, US',
    quote: 'I had always done good volume, but good volume of the wrong cases. Within six months I had cut my case numbers and doubled my revenue.',
    metrics: [
      { value: '2.2×', label: 'Revenue per operating day' },
      { value: '+80%', label: 'High-value combined procedure bookings' },
      { value: '-35%', label: 'Consultation-to-surgery drop-off rate' },
    ],
    talkToHref: '/references/marcus-webb',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Rhinoplasty Surgeons', slug: 'rhinoplasty-surgeon' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Oculoplastic Surgeons', slug: 'oculoplastic-surgeon' },
    { label: 'ENT Surgeons', slug: 'ent-surgeon' },
  ],
  finalCta: {
    headline: 'You\'ve built the skills. Let\'s build the patient pipeline to match.',
  },
}

// ─────────────────────────────────────────────

export const oculoplasticSurgeon = {
  specialtyLabel: 'Oculoplastic Surgeons',
  practiceNoun: 'oculoplastic surgery',
  ctaHref: '/contact/oculoplastic-surgeon',
  hero: {
    headline: 'More eyelid and orbital surgery patients  without competing on price.',
    subcopy: [
      'Oculoplastic surgery sits in a crowded space: patients search "blepharoplasty" and land on a mix of ophthalmologists, plastic surgeons, and aesthetic practitioners. You need to stand out on the right criteria.',
      'We build practice growth systems that position your oculoplastic expertise clearly and attract patients who are choosing a specialist, not shopping for a deal.',
    ],
  },
  insights: [
    {
      title: 'Functional vs cosmetic blepharoplasty needs separate messaging',
      body: 'Insurance-eligible functional cases and cosmetic patients have very different search behaviours and decision drivers. A single homepage serves neither well. We build pathways for both.',
    },
    {
      title: 'Ophthalmology referrers are a warm pipeline most oculoplastic surgeons under-cultivate',
      body: 'A structured referral development programme with optometrists and ophthalmologists can be your single highest-ROI growth lever  and most practices have no formal process for it.',
    },
    {
      title: 'Before-and-afters carry particular weight in eyelid surgery',
      body: 'Because outcomes are subtle and patients are risk-averse, photographic proof calibrated to realistic expectations converts better than dramatic transformations.',
    },
    {
      title: 'Orbital and lacrimal cases require a very different content approach',
      body: 'Complex reconstructive cases require content that speaks to a referring physician audience rather than a direct-to-patient audience. Most practice websites conflate both.',
    },
  ],
  painPoints: {
    headline: 'What oculoplastic surgeons tell us before we begin.',
    items: [
      { quote: 'Patients find me for blepharoplasty but don\'t understand the difference between me and a general plastic surgeon doing the same procedure.' },
      { quote: 'I get strong referrals from one or two consultants but it\'s completely unpredictable  I\'d love to build more of those relationships.' },
      { quote: 'The functional case volume is fine but my cosmetic side is underperforming the market.' },
      { quote: 'I\'ve tried PPC but the conversion rate was terrible because patients weren\'t expecting my fees.' },
    ],
  },
  pillars: {
    build: 'We build separate conversion pathways for functional and cosmetic cases  with messaging, landing pages, and intake funnels calibrated to each patient type\'s decision drivers.',
    grow: 'We develop your referral network systematically  building the tools, communications, and relationship-development process that turns warm contacts into consistent referral partners.',
    brand: 'We establish your subspecialty authority through content that educates both patients and referring physicians, positioning you as the oculoplastic specialist in your region.',
  },
  proof: {
    clientName: 'Mr. David Chen',
    specialty: 'Oculoplastic Surgeon',
    location: 'Manchester, UK',
    quote: 'The referral development work was transformative. We identified twelve ophthalmologists within thirty miles who were sending cases elsewhere, and within three months six of them were sending to us.',
    metrics: [
      { value: '+44%', label: 'Referral case volume' },
      { value: '3.4×', label: 'Cosmetic enquiry conversion rate' },
      { value: '+£210k', label: 'Annual revenue uplift, year one' },
    ],
    talkToHref: '/references/david-chen',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Facial Plastic Surgeons', slug: 'facial-plastic-surgeon' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Ophthalmologists', slug: 'ophthalmologist' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
  ],
  finalCta: {
    headline: 'Your subspecialty expertise is your strongest differentiator. Let\'s make the market feel it.',
  },
}

// ─────────────────────────────────────────────

export const bariatricSurgeon = {
  specialtyLabel: 'Bariatric Surgeons',
  practiceNoun: 'bariatric surgery',
  ctaHref: '/contact/bariatric-surgeon',
  hero: {
    headline: 'More patients who are ready for surgery  fewer who aren\'t.',
    subcopy: [
      'Weight loss surgery changes lives. But the patient journey to the operating table is long, emotionally complex, and full of drop-off points. Most bariatric practices lose patients they should have kept.',
      'We build patient acquisition and nurture systems that support patients through the decision, keep your pipeline full, and reduce the administrative cost of every booking.',
    ],
  },
  insights: [
    {
      title: 'The average bariatric patient researches for over a year before enquiring',
      body: 'Most practice marketing is built for short decision cycles. Bariatric patients need consistent, empathetic long-form content that meets them across a 12–18 month journey.',
    },
    {
      title: 'Insurance navigation is a major conversion barrier',
      body: 'Patients who hit insurance complexity early in the journey drop out at high rates. Practices that guide patients through this proactively see dramatically better enquiry-to-consult rates.',
    },
    {
      title: 'Procedure-specific content outperforms generic weight loss content',
      body: 'Patients searching for gastric sleeve, bypass, or band procedures have very different questions. Generic content serves none of them well. Procedure-specific pages convert at 3–4× the rate.',
    },
    {
      title: 'Patient community and peer support content is a low-cost, high-trust acquisition channel',
      body: 'Bariatric patients rely heavily on peer experience when making their decision. Practices that actively cultivate this  through community content, testimonials, and alumni support  see strong organic referral growth.',
    },
  ],
  painPoints: {
    headline: 'What bariatric surgeons tell us when they come to us.',
    items: [
      { quote: 'We have a long waiting list on paper, but the actual conversion from enquiry to booked surgery is much lower than it should be.' },
      { quote: 'Patients come in under-informed and we spend half the consultation educating rather than planning.' },
      { quote: 'We\'re losing patients to medical weight management programmes before they get to consider surgery.' },
      { quote: 'We have great outcomes and strong patient satisfaction but almost no word-of-mouth system to capture it.' },
    ],
  },
  pillars: {
    build: 'We build your patient education ecosystem  procedure-specific content, insurance guidance pathways, and pre-consultation nurture sequences that turn enquiries into prepared, committed patients.',
    grow: 'We run acquisition campaigns targeting patients who are already considering surgery  not general weight loss seekers  and build SEO authority for high-intent procedure terms.',
    brand: 'We establish your clinical authority through patient outcome content, media placements, and a community presence that positions your practice as the trusted home for serious weight loss surgery patients in your region.',
  },
  proof: {
    clientName: 'Dr. Priya Anand',
    specialty: 'Bariatric Surgeon',
    location: 'Houston, US',
    quote: 'Our enquiry-to-surgery conversion went from 22% to 41% in eight months. The patients were simply better prepared when they arrived.',
    metrics: [
      { value: '+87%', label: 'Enquiry-to-surgery conversion' },
      { value: '2.6×', label: 'Procedure-specific page traffic' },
      { value: '-30%', label: 'Average time from enquiry to booking' },
    ],
    talkToHref: '/references/priya-anand',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'General Surgeons', slug: 'general-surgeon' },
    { label: 'Endocrinologists', slug: 'endocrinologist' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Dietitians & Nutritionists', slug: 'dietitian' },
  ],
  finalCta: {
    headline: 'Your results deserve a pipeline that does them justice. Let\'s build it.',
  },
}

// ─────────────────────────────────────────────

export const generalSurgeon = {
  specialtyLabel: 'General Surgeons',
  practiceNoun: 'general surgery',
  ctaHref: '/contact/general-surgeon',
  hero: {
    headline: 'More direct bookings. Less dependence on one referral source.',
    subcopy: [
      'General surgical practices that rely solely on hospital networks or a handful of referrers are one relationship away from a capacity problem. Diversification takes a system.',
      'We build patient acquisition and referral development programmes that give your practice a resilient, growing pipeline  not a fragile one.',
    ],
  },
  insights: [
    {
      title: 'Hernia, gallbladder, and appendix cases are highly searchable',
      body: 'Patients with non-emergency general surgical conditions research their options before accepting a referral. Practices with strong local SEO capture this direct enquiry stream; most don\'t.',
    },
    {
      title: 'Laparoscopic expertise is a powerful differentiator  if you communicate it',
      body: 'Patients are increasingly aware of minimally invasive options. Surgeons who clearly communicate their laparoscopic experience and outcomes attract better-informed, faster-converting patients.',
    },
    {
      title: 'GP referral relationships are valuable but fragile without active maintenance',
      body: 'Most general surgeons have no formal process for developing or maintaining GP referral relationships. A structured programme typically yields 20–40% more referred cases within a year.',
    },
    {
      title: 'Second-opinion seekers are an underserved, high-value segment',
      body: 'Patients questioning a diagnosis or recommended treatment plan represent a motivated, self-selecting patient segment. A clear second-opinion pathway captures them before they go elsewhere.',
    },
  ],
  painPoints: {
    headline: 'What general surgeons tell us when they reach out.',
    items: [
      { quote: 'I\'m too dependent on one hospital network and I\'ve been told my list might be restructured.' },
      { quote: 'I want to grow my private practice but I don\'t know where to start  my training didn\'t cover any of this.' },
      { quote: 'I do excellent laparoscopic work but I\'m still being referred straightforward open cases because no one knows.' },
      { quote: 'My existing patients refer people to me but it\'s random and I have no way to encourage it.' },
    ],
  },
  pillars: {
    build: 'We audit your current referral pathways and patient channels, then build the infrastructure to diversify: a GP referral programme, a patient-facing website optimised for direct enquiry, and tracking across both.',
    grow: 'We develop your online presence for your highest-volume procedure categories and build a systematic GP outreach programme that turns cold contacts into consistent referral relationships.',
    brand: 'We establish your expertise in your subspeciality areas  laparoscopic, upper GI, colorectal, or other  through targeted content, speaking opportunities, and peer-facing positioning that attracts the cases you most want to do.',
  },
  proof: {
    clientName: 'Mr. Tom Okafor',
    specialty: 'General Surgeon',
    location: 'Birmingham, UK',
    quote: 'The GP referral programme was the single biggest practice change I\'d made in ten years. We went from three active referrers to nineteen in a year.',
    metrics: [
      { value: '+16', label: 'New GP referral relationships' },
      { value: '+52%', label: 'Private surgical volume' },
      { value: '2.1×', label: 'Direct-to-patient enquiries' },
    ],
    talkToHref: '/references/tom-okafor',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Bariatric Surgeons', slug: 'bariatric-surgeon' },
    { label: 'Colorectal Surgeons', slug: 'colorectal-surgeon' },
    { label: 'Urologists', slug: 'urologist' },
    { label: 'Gastroenterologists', slug: 'gastroenterologist' },
  ],
  finalCta: {
    headline: 'A resilient private practice requires more than one pipeline. Let\'s build yours.',
  },
}

// ─────────────────────────────────────────────

export const colorectalSurgeon = {
  specialtyLabel: 'Colorectal Surgeons',
  practiceNoun: 'colorectal surgery',
  ctaHref: '/contact/colorectal-surgeon',
  hero: {
    headline: 'More complex, high-value colorectal cases. Built on more than referrals.',
    subcopy: [
      'Colorectal surgery is a subspecialty with a very specific patient journey  often involving oncology teams, gastroenterologists, and IBD physicians. Your growth system needs to work across all of them.',
      'We build practice development programmes that deepen your referral network, increase direct patient enquiries, and position your expertise where it matters.',
    ],
  },
  insights: [
    {
      title: 'IBD patients are a loyal, long-term patient segment with surgical decision complexity',
      body: 'Crohn\'s and ulcerative colitis patients require long-term relationships before agreeing to surgery. Practices that invest in patient education content for this group see outsized long-term conversion.',
    },
    {
      title: 'Colorectal cancer second opinions are increasing',
      body: 'Patients with colorectal cancer diagnoses increasingly seek specialist second opinions before committing to surgery. A clear, trusted pathway for this captures high-value cases and builds referring relationships with oncologists.',
    },
    {
      title: 'Haemorrhoid and pelvic floor cases are a high-volume, direct-search opportunity',
      body: 'These conditions are frequently searched directly by patients rather than referred. Practices with strong local SEO for these conditions see consistent direct bookings.',
    },
    {
      title: 'Robotic surgery expertise is a growing patient expectation in tier-one cities',
      body: 'Patients in major cities are increasingly asking about robotic approaches. Surgeons who communicate this capability clearly attract patients who have already selected their preferred surgical approach.',
    },
  ],
  painPoints: {
    headline: 'What colorectal surgeons tell us when we first speak.',
    items: [
      { quote: 'Most of my referrals come from two gastroenterologists. If either of them retired tomorrow I\'d have a real problem.' },
      { quote: 'I\'m doing excellent oncological work but I\'m not getting the complex cases I want  they\'re going to larger centres.' },
      { quote: 'I have IBD patients I\'ve been following for years who need surgery but they won\'t commit  I don\'t know how to move that along.' },
      { quote: 'My robotic programme is strong but patients don\'t know to ask for it and my website doesn\'t mention it properly.' },
    ],
  },
  pillars: {
    build: 'We map your full referral network and build the tools and processes to diversify and deepen it  with structured outreach to gastroenterologists, oncologists, and IBD specialists in your catchment area.',
    grow: 'We develop patient-facing content for your most searchable conditions, build SEO authority for procedure and condition terms, and run targeted campaigns that surface your practice to patients actively choosing a surgeon.',
    brand: 'We build your authority in complex colorectal surgery through peer-facing content, subspecialty positioning, and a public profile that attracts both direct patients and referring physicians seeking a trusted specialist.',
  },
  proof: {
    clientName: 'Mr. Philip Antwi',
    specialty: 'Colorectal Surgeon',
    location: 'London, UK',
    quote: 'We identified a gap in IBD surgical care in our area and built content to address it. Within six months we had become the first call for two IBD nurses at local hospitals.',
    metrics: [
      { value: '+38%', label: 'Complex case referrals' },
      { value: '4×', label: 'IBD surgical enquiries' },
      { value: '+£180k', label: 'Revenue uplift, year one' },
    ],
    talkToHref: '/references/philip-antwi',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'General Surgeons', slug: 'general-surgeon' },
    { label: 'Gastroenterologists', slug: 'gastroenterologist' },
    { label: 'Urologists', slug: 'urologist' },
    { label: 'Oncologists', slug: 'oncologist' },
  ],
  finalCta: {
    headline: 'The complex cases you want are out there. Let\'s make sure they find you.',
  },
}

// ─────────────────────────────────────────────
// B. AESTHETIC + SKIN SPECIALISTS
// ─────────────────────────────────────────────

export const aestheticDoctor = {
  specialtyLabel: 'Aesthetic Doctors',
  practiceNoun: 'aesthetic medicine',
  ctaHref: '/contact/aesthetic-doctor',
  hero: {
    headline: 'More high-value aesthetic patients. Fewer one-and-done treatment seekers.',
    subcopy: [
      'The aesthetic medicine market is saturated. Patients can get Botox on every high street. What they can\'t get everywhere is a medically-led, outcomes-focused practice that treats them as individuals.',
      'We build patient acquisition systems that attract patients who value clinical expertise  and keep them returning.',
    ],
  },
  insights: [
    {
      title: 'Treatment loyalty is built in the first 90 days',
      body: 'Patients who return three or more times in the first year have dramatically higher lifetime value and referral rates. The early patient experience  from first touch to follow-up  determines whether this happens.',
    },
    {
      title: 'Medical credentials are an underused differentiator',
      body: 'Most aesthetic patients don\'t know to ask about clinical training. Practices that make medical background explicit in their marketing attract a higher-value, more loyal patient segment.',
    },
    {
      title: 'Combination treatment plans are the largest revenue lever',
      body: 'Practices where the consultation process naturally leads to treatment plans  rather than single treatments  generate 2–3× more revenue per patient without increasing patient volume.',
    },
    {
      title: 'Social media drives awareness, but does not drive high-value bookings alone',
      body: 'Instagram and TikTok attract large audiences but they attract price-conscious, brand-switching patients. High-value patients find you through search, peer referral, and perceived authority.',
    },
  ],
  painPoints: {
    headline: 'What aesthetic doctors tell us before we start.',
    items: [
      { quote: 'I spent a fortune on Instagram ads and attracted exactly the patients I didn\'t want.' },
      { quote: 'My patients love me but they keep getting discounted elsewhere and I don\'t have a way to stop them drifting.' },
      { quote: 'I know my clinical results are better than the competition but patients can\'t see that from my website.' },
      { quote: 'I want to grow without discounting. Everyone I\'ve spoken to just tells me to do more promotions.' },
    ],
  },
  pillars: {
    build: 'We audit your patient acquisition, consultation, and retention touchpoints and build the infrastructure to optimise each  from website to booking system to post-treatment follow-up sequence.',
    grow: 'We run acquisition campaigns targeting patients seeking medically-led aesthetic care, and build SEO authority for high-intent treatment and condition search terms in your catchment area.',
    brand: 'We position your clinical background and treatment philosophy as your primary differentiator  through content, press placements, and a visual identity that communicates authority, not just aesthetics.',
  },
  proof: {
    clientName: 'Dr. Leila Shah',
    specialty: 'Aesthetic Doctor',
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
    { label: 'Dermatologists', slug: 'dermatologist' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Skin Clinic Owners', slug: 'skin-clinic-owner' },
  ],
  finalCta: {
    headline: 'Build a practice full of patients who value what you do. The system exists.',
  },
}

// ─────────────────────────────────────────────

export const dermatologist = {
  specialtyLabel: 'Dermatologists',
  practiceNoun: 'dermatology',
  ctaHref: '/contact/dermatologist',
  hero: {
    headline: 'Fill your dermatology list with patients who came looking for you specifically.',
    subcopy: [
      'Dermatology sits at the junction of medical and cosmetic  serving acne patients, eczema sufferers, skin cancer patients, and aesthetic seekers from the same practice. Each segment needs a different path in.',
      'We build acquisition systems that route the right patients to the right appointments and grow the side of your practice you most want to grow.',
    ],
  },
  insights: [
    {
      title: 'Medical dermatology patients convert from search; cosmetic patients convert from social proof',
      body: 'These are two distinct acquisition channels requiring two distinct strategies. Combining them into one approach serves neither well.',
    },
    {
      title: 'Skin cancer anxiety is a large and underserved direct-search market',
      body: 'Patients who notice a changing mole or lesion typically search before seeking a GP referral. Practices with visibility in this moment capture patients who convert within days, not months.',
    },
    {
      title: 'Acne and eczema patients have the highest lifetime value if treated holistically',
      body: 'Chronic skin conditions require ongoing management. Practices that build a holistic treatment relationship  rather than episodic prescribing  see dramatically higher patient retention and revenue per head.',
    },
    {
      title: 'Aesthetics cross-sell is a revenue lever most dermatologists underuse',
      body: 'Existing medical dermatology patients are your warmest cosmetic aesthetics prospects. Most practices have no system to make that transition.',
    },
  ],
  painPoints: {
    headline: 'What dermatologists say when they come to us.',
    items: [
      { quote: 'I have a long NHS list and my private practice is fine, but I know it could be a lot more and I don\'t have the time to figure out how.' },
      { quote: 'I keep attracting the wrong cosmetic patients  they want a quick fix and get frustrated when I want to treat the underlying cause.' },
      { quote: 'I\'ve built a genuine specialism in skin cancer management but no one outside my existing referrers knows about it.' },
      { quote: 'My waiting list is eight weeks and patients are going private elsewhere. I don\'t know where I\'m losing them.' },
    ],
  },
  pillars: {
    build: 'We map your patient segments, build separate acquisition pathways for medical and cosmetic patients, and create the website architecture and content system to serve each effectively.',
    grow: 'We grow your visibility in the search moments that matter most to each patient type  urgent skin concerns for medical patients, condition-specific long-form content for chronic conditions, and social proof-led campaigns for cosmetic.',
    brand: 'We establish your dermatological authority  in your subspecialty, in your community, and in the media  so patients and referrers who find you already know why you\'re the right choice.',
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
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Skin Clinic Owners', slug: 'skin-clinic-owner' },
    { label: 'Trichologists', slug: 'trichologist' },
  ],
  finalCta: {
    headline: 'The dermatology practice you want to run is a system away. Let\'s build it.',
  },
}

// ─────────────────────────────────────────────

export const trichologist = {
  specialtyLabel: 'Trichologists',
  practiceNoun: 'trichology',
  ctaHref: '/contact/trichologist',
  hero: {
    headline: 'Patients who take hair loss seriously enough to pay for proper expertise.',
    subcopy: [
      'Trichology sits in a confused market  caught between dermatology, cosmetic surgery, and aesthetic treatments. Patients who find a good trichologist are intensely loyal. The problem is finding them.',
      'We build patient acquisition systems that reach the right patients at the moment they\'re ready to invest in expert hair loss care.',
    ],
  },
  insights: [
    {
      title: 'Hair loss patients research obsessively before spending',
      body: 'Patients with alopecia, pattern hair loss, or scalp conditions typically spend months researching before booking. Content that answers their questions at depth is your primary acquisition tool.',
    },
    {
      title: 'Female hair loss is a dramatically underserved search segment',
      body: 'Most trichology marketing defaults to male pattern baldness. Female hair loss patients are a larger, less well-served, and higher-converting search audience. Practices that address this explicitly outperform significantly.',
    },
    {
      title: 'Diagnosis credibility is the primary conversion barrier',
      body: 'Patients have often been dismissed by GPs or sold ineffective products. A trichologist who communicates diagnostic rigour  patch testing, trichoscopy, blood analysis  converts at much higher rates.',
    },
    {
      title: 'Condition-specific content massively outperforms generic hair loss content',
      body: 'A page about androgenetic alopecia, alopecia areata, or traction alopecia each converts differently and draws different search traffic. Most practice websites have one generic page that serves none of them.',
    },
  ],
  painPoints: {
    headline: 'What trichologists tell us when we first speak.',
    items: [
      { quote: 'I have deep clinical expertise but patients can\'t distinguish me from a hair loss clinic selling products.' },
      { quote: 'My female hair loss work is some of my best but I barely get enquiries for it because I\'m not visible for those searches.' },
      { quote: 'I\'m entirely dependent on word of mouth and it\'s inconsistent. One quiet month makes the whole practice feel fragile.' },
      { quote: 'I\'ve invested in my diagnostic equipment but I can\'t find a way to communicate why that matters to patients.' },
    ],
  },
  pillars: {
    build: 'We build condition-specific landing pages, a diagnostic credibility content system, and an intake process that qualifies patients before the consultation  reducing no-shows and improving conversion.',
    grow: 'We develop your SEO presence across the condition spectrum you treat, with particular depth in underserved search areas like female hair loss, scalp conditions, and post-partum alopecia.',
    brand: 'We establish your clinical authority through case study content, media placements, and a brand identity that clearly differentiates you from cosmetic hair loss product-sellers.',
  },
  proof: {
    clientName: 'Francesca Ito',
    specialty: 'Trichologist',
    location: 'New York, US',
    quote: 'The female hair loss content alone tripled our enquiries in that segment. It turns out there was enormous demand  it just couldn\'t find us.',
    metrics: [
      { value: '3.1×', label: 'Female hair loss enquiries' },
      { value: '+74%', label: 'Website-generated bookings' },
      { value: '-45%', label: 'Consultation no-show rate' },
    ],
    talkToHref: '/references/francesca-ito',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Dermatologists', slug: 'dermatologist' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Hair Transplant Surgeons', slug: 'hair-transplant-surgeon' },
    { label: 'Skin Clinic Owners', slug: 'skin-clinic-owner' },
  ],
  finalCta: {
    headline: 'The patients who need your expertise are searching right now. Let\'s make sure they find you.',
  },
}

// ─────────────────────────────────────────────

export const hairTransplantSurgeon = {
  specialtyLabel: 'Hair Transplant Surgeons',
  practiceNoun: 'hair transplant surgery',
  ctaHref: '/contact/hair-transplant-surgeon',
  hero: {
    headline: 'More FUE and FUT bookings. Fewer patients who go to Turkey instead.',
    subcopy: [
      'Hair transplant surgery is one of the most competitive elective markets online  with overseas clinics undercutting on price and over-promising on outcomes. Your job is to reach patients before they make a decision they\'ll regret.',
      'We build practice growth systems that position your quality, qualifications, and outcomes ahead of the price-led market.',
    ],
  },
  insights: [
    {
      title: 'The medical tourism comparison is unavoidable  you need to address it, not ignore it',
      body: 'Patients researching hair transplants will find overseas options. Practices that directly explain why UK/US surgical standards, follow-up care, and revision risk justify the price premium convert patients who would otherwise leave.',
    },
    {
      title: 'FUE vs FUT education content is one of your highest-converting traffic sources',
      body: 'Patients in the research phase obsess over procedure choice. A genuinely useful guide that helps them understand which procedure is right for their pattern and goals builds trust and search visibility simultaneously.',
    },
    {
      title: 'Hairline design is an underused emotional purchase driver',
      body: 'Patients aren\'t just buying hair density  they\'re buying a specific visual outcome. Surgeons who communicate hairline design philosophy and show the subtlety of their work attract patients who have moved beyond price comparison.',
    },
    {
      title: 'Post-surgery support content drives referrals better than any other channel',
      body: 'Patients who receive detailed, reassuring post-op content share it with friends who are considering the same procedure. This is a high-quality, zero-cost acquisition channel most practices ignore.',
    },
  ],
  painPoints: {
    headline: 'What hair transplant surgeons say when they find us.',
    items: [
      { quote: 'I lose patients to overseas clinics and then they come back eighteen months later with complications I have to fix.' },
      { quote: 'I have excellent results but my website looks identical to every other hair transplant clinic online.' },
      { quote: 'I want patients to understand why they should choose me, not just why they shouldn\'t go abroad  but I can\'t find a way to say it that doesn\'t sound defensive.' },
      { quote: 'My patient satisfaction is outstanding but I have no system for turning happy patients into referrers.' },
    ],
  },
  pillars: {
    build: 'We build a content and conversion system that meets patients at the research stage, addresses the overseas cost comparison honestly, and guides patients toward a consult through genuine education.',
    grow: 'We develop your organic search presence for high-intent hair transplant terms and run targeted paid campaigns to reach patients who are actively comparing UK/US surgeons.',
    brand: 'We craft your surgical identity  your hairline design philosophy, your patient selection standards, your post-op care protocol  into a compelling public brand that attracts patients who are choosing quality.',
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
    { label: 'Trichologists', slug: 'trichologist' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Dermatologists', slug: 'dermatologist' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
  ],
  finalCta: {
    headline: 'The patients choosing quality over price are out there. Let\'s reach them.',
  },
}

// ─────────────────────────────────────────────

export const medSpa = {
  specialtyLabel: 'Med Spa Owners',
  practiceNoun: 'med spa',
  ctaHref: '/contact/med-spa',
  hero: {
    headline: 'More loyal, high-spend patients. Less fighting over discounts.',
    subcopy: [
      'Med spas compete in the most commoditised corner of aesthetics. If your growth strategy is built on promotions, you\'re in a race to the bottom with everyone in your zip code.',
      'We build systems that attract patients who buy on trust, not on price  and spend more every visit.',
    ],
  },
  insights: [
    {
      title: 'Package sales are the single strongest lever for med spa revenue per patient',
      body: 'Patients who buy treatment packages have 4–6× the lifetime value of single-treatment buyers. The pathway from first appointment to package sale is a system, not luck.',
    },
    {
      title: 'Your referral programme is probably underperforming',
      body: 'Most med spas have informal referral approaches. Practices with a structured referral programme  with clear incentives and an active ask  see 30–50% more new patients from this source.',
    },
    {
      title: 'Male aesthetics is a fast-growing and underserved market',
      body: 'Men seeking aesthetic treatments are the fastest-growing segment in medspas. Practices that explicitly market to and design experiences for male patients capture first-mover advantage in most markets.',
    },
    {
      title: 'Membership models dramatically increase predictable revenue',
      body: 'Monthly membership programmes convert single-treatment patients into reliable revenue streams. The offer design, pricing, and communication all matter  and most practices do at least one of them wrong.',
    },
  ],
  painPoints: {
    headline: 'What med spa owners tell us before we start working together.',
    items: [
      { quote: 'I\'m always busy but I\'m not making the money the revenue numbers suggest I should be making.' },
      { quote: 'Every time I stop promotions, the bookings fall off a cliff. I feel trapped by my own marketing.' },
      { quote: 'I have a loyal core of patients but I can\'t seem to grow beyond my existing network.' },
      { quote: 'My team is great but our retention rate is poor and I don\'t know why patients stop coming back.' },
    ],
  },
  pillars: {
    build: 'We audit your current patient journey, identify the drop-off points in your conversion and retention funnel, and build the systems  CRM, follow-up sequences, booking flow  that fix them.',
    grow: 'We build acquisition campaigns targeting your highest-value treatment areas, develop your organic search presence for local aesthetics searches, and implement a structured referral programme.',
    brand: 'We position your med spa as the premium, medically-credible destination in your market  not just another aesthetics provider  through a rebrand, content strategy, and authority positioning.',
  },
  proof: {
    clientName: 'Christina Moore',
    specialty: 'Med Spa Owner',
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
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Dermatologists', slug: 'dermatologist' },
    { label: 'Skin Clinic Owners', slug: 'skin-clinic-owner' },
    { label: 'Clinic Owners', slug: 'clinic-owner' },
  ],
  finalCta: {
    headline: 'Build a med spa that grows on loyalty, not promotions.',
  },
}

// ─────────────────────────────────────────────

export const skinClinicOwner = {
  specialtyLabel: 'Skin Clinic Owners',
  practiceNoun: 'skin clinic',
  ctaHref: '/contact/skin-clinic-owner',
  hero: {
    headline: 'A full skin clinic built on clients who return, not just clients who respond to offers.',
    subcopy: [
      'The skin clinic market rewards retention above all else. A client who returns every six weeks for a year is worth ten times a one-treatment patient  and they cost a fraction of the price to acquire.',
      'We build the systems that turn first appointments into loyal relationships and loyal relationships into your strongest marketing channel.',
    ],
  },
  insights: [
    {
      title: 'The first 60 days are the highest-churn window for new clients',
      body: 'Clients who don\'t return within 60 days of their first appointment rarely return at all. A structured post-appointment nurture sequence dramatically improves this.',
    },
    {
      title: 'Skin analysis technology is a powerful conversion tool if it\'s communicated',
      body: 'Clinics that lead with diagnostic technology  Visia, Observ, or similar  command higher fee acceptance and generate richer consultation content. Most don\'t promote this prominently enough.',
    },
    {
      title: 'Seasonal campaigns drive short-term revenue; condition-based content drives long-term growth',
      body: 'Discounting seasonal treatments attracts price-sensitive clients who don\'t return outside promotion periods. Condition-specific content  rosacea, hyperpigmentation, acne scarring  attracts motivated clients who invest in solutions.',
    },
    {
      title: 'Your existing client database is your most underused asset',
      body: 'Most skin clinics have hundreds of inactive clients who previously valued the practice. A win-back programme targeting this database outperforms cold acquisition by a significant margin.',
    },
  ],
  painPoints: {
    headline: 'What skin clinic owners say when they reach out to us.',
    items: [
      { quote: 'I\'m in the treatment room all day and the business side just happens around me  I don\'t have time to market properly.' },
      { quote: 'My new client numbers are fine but my retention is terrible and I don\'t know what I\'m doing wrong.' },
      { quote: 'I\'m getting lots of bookings through promotions but the clients aren\'t loyal and they expect a discount every time.' },
      { quote: 'I\'ve grown beyond just me but scaling the quality of experience to the team feels impossible.' },
    ],
  },
  pillars: {
    build: 'We build the client acquisition and retention infrastructure your clinic needs to grow without you: automated follow-up, a structured referral programme, reactivation campaigns, and tracking that tells you what\'s working.',
    grow: 'We develop your local SEO presence for the conditions and treatments you most want to be known for, and run targeted campaigns to attract clients who are motivated by outcomes, not prices.',
    brand: 'We position your clinic as the credible, results-led destination in your market  with a visual identity, content strategy, and review management system that makes your reputation visible.',
  },
  proof: {
    clientName: 'Zoe Mackenzie',
    specialty: 'Skin Clinic Owner',
    location: 'Edinburgh, UK',
    quote: 'The reactivation campaign paid for six months of fees in the first two weeks. There were hundreds of clients who had come in once and fallen off the radar.',
    metrics: [
      { value: '+190', label: 'Reactivated clients (first campaign)' },
      { value: '+58%', label: 'Client retention at six months' },
      { value: '2.3×', label: 'Revenue per active client' },
    ],
    talkToHref: '/references/zoe-mackenzie',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Dermatologists', slug: 'dermatologist' },
    { label: 'Med Spa Owners', slug: 'med-spa' },
    { label: 'Trichologists', slug: 'trichologist' },
  ],
  finalCta: {
    headline: 'A loyal client base is a system, not luck. Let\'s build yours.',
  },
}

// ─────────────────────────────────────────────

export const ophthalmologist = {
  specialtyLabel: 'Ophthalmologists',
  practiceNoun: 'ophthalmology',
  ctaHref: '/contact/ophthalmologist',
  hero: {
    headline: 'More private ophthalmology patients. A practice that grows beyond referrals.',
    subcopy: [
      'Private ophthalmology sits at a crossroads between NHS-adjacent medical care and elective surgical procedures. Building a practice that thrives in both requires a system designed for both.',
      'We build patient acquisition programmes that attract both self-referring elective patients and properly developed consultant referral networks.',
    ],
  },
  insights: [
    {
      title: 'Cataract and lens replacement surgery is one of the most searchable elective procedures',
      body: 'Patients above 55 researching vision correction actively search for private cataract surgery. Practices with strong local SEO and patient education content for this procedure capture a large, motivated audience.',
    },
    {
      title: 'Laser eye surgery patients are younger, more digital, and highly research-driven',
      body: 'LASIK and LASEK patients spend significant time online before choosing a clinic. Video content, patient testimonials, and surgeon-specific outcome data are the primary conversion tools for this group.',
    },
    {
      title: 'Optometrist co-management relationships are a major untapped growth lever',
      body: 'Optometrists who co-manage surgical patients represent a high-quality, warm referral channel. Most ophthalmologists don\'t have a structured programme for building these relationships.',
    },
    {
      title: 'Dry eye and medical ophthalmology create patient relationships that convert to surgical cases',
      body: 'Patients managed long-term for dry eye, glaucoma, or macular conditions who need surgery select their surgeon from within their existing care relationship. Building this patient base pays long-term dividends.',
    },
  ],
  painPoints: {
    headline: 'What ophthalmologists tell us when we first meet.',
    items: [
      { quote: 'My surgical list is good but it\'s entirely dependent on optometrist referrals from one practice. That feels risky.' },
      { quote: 'I want to grow my premium IOL caseload but patients don\'t know the difference between a standard lens and a premium lens until we\'re already in the consultation.' },
      { quote: 'I\'ve tried PPC for laser eye surgery and just got burned  wrong patients, terrible conversion, no ROI.' },
      { quote: 'My outcomes are excellent but I have almost no online presence and I know I\'m losing patients I should be winning.' },
    ],
  },
  pillars: {
    build: 'We build a patient education ecosystem for your surgical procedures and develop a structured optometrist co-management programme that diversifies and deepens your referral pipeline.',
    grow: 'We build your organic search presence for elective procedure search terms, run paid campaigns targeting patients with vision correction intent, and optimise your consultation conversion process.',
    brand: 'We establish your authority as the go-to ophthalmic surgeon in your area  through patient outcome content, press coverage, and a digital presence that reflects the standard of your care.',
  },
  proof: {
    clientName: 'Mr. Aarav Mishra',
    specialty: 'Ophthalmologist',
    location: 'Birmingham, UK',
    quote: 'The premium IOL education content changed my consultation dynamics entirely. Patients now arrive knowing what they want, and my premium lens conversion went from 18% to 47%.',
    metrics: [
      { value: '+29pp', label: 'Premium IOL conversion rate' },
      { value: '+42%', label: 'Elective surgical volume' },
      { value: '3.2×', label: 'Optometrist referral network size' },
    ],
    talkToHref: '/references/aarav-mishra',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Oculoplastic Surgeons', slug: 'oculoplastic-surgeon' },
    { label: 'Facial Plastic Surgeons', slug: 'facial-plastic-surgeon' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'ENT Surgeons', slug: 'ent-surgeon' },
  ],
  finalCta: {
    headline: 'Your private ophthalmology practice has more growth in it. Let\'s find it.',
  },
}

// ─────────────────────────────────────────────
// C. DENTAL + ORAL HEALTH
// ─────────────────────────────────────────────

export const cosmeticDentist = {
  specialtyLabel: 'Cosmetic Dentists',
  practiceNoun: 'cosmetic dentistry',
  ctaHref: '/contact/cosmetic-dentist',
  hero: {
    headline: 'More smile makeover patients. Fewer enquiries about the cheapest veneers.',
    subcopy: [
      'Cosmetic dentistry attracts two very different patient types: those who value the artistry and invest accordingly, and those shopping for the lowest price. Building a practice full of the former requires a system designed to attract  and filter  them.',
      'We build patient acquisition systems that bring in the smile makeover, composite bonding, and Invisalign patients who value what you do and can afford it.',
    ],
  },
  insights: [
    {
      title: 'Smile makeover patients have a long decision window and high fee tolerance',
      body: 'Comprehensive cosmetic cases require patients who are considering treatment for months. Content that builds confidence in your aesthetic vision and clinical process wins these patients early in their journey.',
    },
    {
      title: 'Your smile gallery is your single most powerful conversion tool',
      body: 'Patients choosing a cosmetic dentist respond primarily to the visual evidence of your aesthetic eye. A properly curated, case-specific gallery with context and narrative outperforms any other content type.',
    },
    {
      title: 'Invisalign and composite bonding are gateway procedures',
      body: 'Many patients who begin with orthodontics or bonding proceed to more comprehensive cosmetic work. Practices with a structured upgrade pathway see significantly higher per-patient revenue.',
    },
    {
      title: 'Dental anxiety is a silent conversion barrier',
      body: 'A large proportion of cosmetic dentistry patients have delayed seeking treatment because of anxiety. Practices that address this explicitly  in content, consultation design, and environment  attract a grateful, loyal patient group.',
    },
  ],
  painPoints: {
    headline: 'What cosmetic dentists tell us when they first reach out.',
    items: [
      { quote: 'I get asked for composite veneers at unrealistic prices every day. I don\'t know how to attract patients who understand quality.' },
      { quote: 'My smile transformations are genuinely beautiful but my social media doesn\'t do them justice and I don\'t know how to change that.' },
      { quote: 'I want to be known for full-mouth rehabilitations but I keep getting enquiries for whitening.' },
      { quote: 'My Invisalign patients rarely go on to do anything else. I know there\'s more on the table but I can\'t close it.' },
    ],
  },
  pillars: {
    build: 'We build a smile gallery infrastructure, procedure-specific content pathways, and a consultation process that qualifies patients and builds treatment plan confidence before they walk through the door.',
    grow: 'We run acquisition campaigns for high-value cosmetic procedures and build organic authority for the cosmetic dentistry search terms that attract your ideal patient  comprehensive, aesthetically-aware, and able to invest.',
    brand: 'We craft your aesthetic identity  your design philosophy, your treatment approach, your practice environment  into a compelling brand that positions you clearly in the premium end of your market.',
  },
  proof: {
    clientName: 'Dr. Natalie Osei',
    specialty: 'Cosmetic Dentist',
    location: 'London, UK',
    quote: 'My average case value went from £1,800 to £4,200 in a year. The patients coming in weren\'t different  the system was.',
    metrics: [
      { value: '+133%', label: 'Average case value' },
      { value: '2.9×', label: 'Smile makeover enquiries' },
      { value: '+71%', label: 'Case acceptance rate' },
    ],
    talkToHref: '/references/natalie-osei',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Orthodontists', slug: 'orthodontist' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Oral Surgeons', slug: 'oral-surgeon' },
  ],
  finalCta: {
    headline: 'The patients who want your best work are looking for you. Let\'s make sure they find you.',
  },
}

// ─────────────────────────────────────────────

export const orthodontist = {
  specialtyLabel: 'Orthodontists',
  practiceNoun: 'orthodontics',
  ctaHref: '/contact/orthodontist',
  hero: {
    headline: 'More adult Invisalign and clear aligner starts. Less price-shopping.',
    subcopy: [
      'Orthodontics has changed. Adult aligner treatment is now a significant market  but it\'s also the most competitive, with direct-to-consumer brands undercutting on price and convenience.',
      'We build practice growth systems that position your clinical oversight, outcomes, and patient care as the premium choice over direct-to-consumer alternatives.',
    ],
  },
  insights: [
    {
      title: 'Adult aligner patients are the highest-growth and highest-LTV segment',
      body: 'Adults seeking orthodontic treatment for aesthetic reasons have higher fee tolerance, refer more enthusiastically, and are more likely to pursue additional cosmetic dentistry. They\'re worth acquiring at a premium.',
    },
    {
      title: 'Direct-to-consumer brands are your most important differentiator',
      body: 'Patients considering Smile Direct or similar services are already motivated. Content that honestly explains the clinical limitations of unsupervised treatment converts these patients without being dismissive.',
    },
    {
      title: 'The GP dentist referral relationship is the most underused growth lever in orthodontics',
      body: 'Most orthodontists receive occasional referrals from GP dentists but have no formal programme to develop these relationships. A structured approach typically increases referrals by 30–60% within six months.',
    },
    {
      title: 'Parent-child combined consultations improve conversion and lifetime value',
      body: 'Practices that frame the consultation as a family conversation  addressing both adolescent and adult treatment in one appointment  see higher case acceptance and adult treatment starts.',
    },
  ],
  painPoints: {
    headline: 'What orthodontists say when they reach out to us.',
    items: [
      { quote: 'I\'m losing adult aligner patients to direct-to-consumer brands and I don\'t have a way to address that in my marketing.' },
      { quote: 'My referral relationships with GPs are a bit random  some send me a lot, most send nothing. I\'ve never had a system for it.' },
      { quote: 'I want to grow my adult caseload but most of my marketing infrastructure is aimed at parents of teenagers.' },
      { quote: 'My case acceptance is 50% and I know it should be higher  I just don\'t know where patients are dropping out.' },
    ],
  },
  pillars: {
    build: 'We build a dual patient pathway  one for adolescent cases, one for adult aligner patients  with the content, consultation design, and follow-up sequences each requires.',
    grow: 'We develop your GP referral programme and build your organic and paid search presence for adult aligner search terms that attract patients who are ready to invest in proper clinical oversight.',
    brand: 'We position your clinical expertise and outcome quality as the premium alternative to direct-to-consumer treatment  with content, patient case studies, and media presence that makes the difference visible.',
  },
  proof: {
    clientName: 'Dr. Sandra Williams',
    specialty: 'Orthodontist',
    location: 'Boston, US',
    quote: 'The adult aligner campaign attracted patients who had looked at direct-to-consumer options and rejected them. They were the easiest case acceptances I\'d ever had.',
    metrics: [
      { value: '+88%', label: 'Adult aligner case starts' },
      { value: '+22', label: 'New GP referral relationships' },
      { value: '+34%', label: 'Overall practice revenue' },
    ],
    talkToHref: '/references/sandra-williams',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Oral Surgeons', slug: 'oral-surgeon' },
    { label: 'Periodontists', slug: 'periodontist' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
  ],
  finalCta: {
    headline: 'The adult aligner market is growing fast. Let\'s make sure your practice is capturing it.',
  },
}

// ─────────────────────────────────────────────

export const oralSurgeon = {
  specialtyLabel: 'Oral & Maxillofacial Surgeons',
  practiceNoun: 'oral surgery',
  ctaHref: '/contact/oral-surgeon',
  hero: {
    headline: 'Build the referral network and direct patient presence your surgical expertise deserves.',
    subcopy: [
      'Oral and maxillofacial surgery sits at the intersection of dental and medical referral pathways. A practice that relies entirely on one source is one relationship away from a capacity crisis.',
      'We build practice development systems that diversify and deepen your referral relationships and build a direct patient presence for your most searchable procedures.',
    ],
  },
  insights: [
    {
      title: 'Dental implant patients are your most searchable self-referring segment',
      body: 'Patients seeking implants research extensively before approaching any practitioner. Practices with strong local implant content capture these patients directly, without relying on a GDP referral.',
    },
    {
      title: 'Wisdom tooth removal is a high-volume, direct-search procedure',
      body: 'Patients experiencing wisdom tooth pain or anxiety search directly and expect to book quickly. A fast, frictionless booking pathway for this procedure fills gaps in the surgical list efficiently.',
    },
    {
      title: 'Referring dentist relationships need active maintenance to stay productive',
      body: 'A referring dentist who sends two cases a month and then nothing usually hasn\'t gone elsewhere by choice  they\'ve been won by a competitor who maintains contact more actively. A structured outreach programme prevents this.',
    },
    {
      title: 'Orthognathic surgery patients require the most complex consent journey',
      body: 'Jaw surgery patients require deep trust, long educational relationships, and careful expectation management. Practices with a dedicated orthognathic content pathway reduce consultation attrition significantly.',
    },
  ],
  painPoints: {
    headline: 'What oral surgeons tell us when they first speak to us.',
    items: [
      { quote: 'I have good relationships with about six practices but I know there are fifty within a 10-mile radius I\'ve never contacted.' },
      { quote: 'I want to grow my implant work but the GDPs I\'m relying on for referrals seem to be doing more of it themselves now.' },
      { quote: 'My website is essentially a brochure from ten years ago. I know it\'s not helping but I haven\'t had time to fix it.' },
      { quote: 'I\'m turning away wisdom tooth referrals because of capacity, but the higher-value implant and surgical cases I want aren\'t filling that space.' },
    ],
  },
  pillars: {
    build: 'We audit your referral network, build the gap map of practices in your area, and develop the tools and outreach programme to systematically develop new referral relationships.',
    grow: 'We build your direct patient acquisition presence for implants and high-volume procedures, and develop a structured referral programme that keeps your existing relationships productive.',
    brand: 'We establish your authority as the oral surgeon of choice in your area  through procedure-specific content, case studies, and a profile that communicates your surgical scope clearly to both patients and referring practitioners.',
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
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Orthodontists', slug: 'orthodontist' },
    { label: 'Periodontists', slug: 'periodontist' },
    { label: 'Facial Plastic Surgeons', slug: 'facial-plastic-surgeon' },
  ],
  finalCta: {
    headline: 'A full surgical list starts with a full referral network. Let\'s build both.',
  },
}

// ─────────────────────────────────────────────

export const periodontist = {
  specialtyLabel: 'Periodontists',
  practiceNoun: 'periodontics',
  ctaHref: '/contact/periodontist',
  hero: {
    headline: 'More gum disease and implant referrals. A practice that doesn\'t depend on three GDPs.',
    subcopy: [
      'Periodontics is almost entirely referral-driven  but most practices have a thin, concentrated referral network and no systematic way to grow it.',
      'We build referral development systems and patient-facing acquisition tools that diversify your pipeline and make your practice more resilient.',
    ],
  },
  insights: [
    {
      title: 'The typical periodontist relies on fewer than ten active referrers',
      body: 'In a specialty where relationships are everything, concentration risk is the biggest practice vulnerability. Broadening to twenty or thirty active referrers transforms practice stability.',
    },
    {
      title: 'Gum disease prevalence is dramatically under-diagnosed  direct-to-patient content captures this',
      body: 'Patients with bleeding gums, receding gums, or loose teeth frequently don\'t seek specialist care because they don\'t know it exists. Educational content that helps them self-identify captures a self-referring stream most periodontists don\'t have.',
    },
    {
      title: 'Implant-related periodontal work is a growing sub-specialty with specific referral pathways',
      body: 'Periodontists who actively cultivate implant-placing colleagues as referrers build a consistently growing peri-implantitis and maintenance caseload. Most don\'t market to this group explicitly.',
    },
    {
      title: 'Cosmetic periodontal procedures are undersold despite strong patient demand',
      body: 'Crown lengthening, gum contouring, and connective tissue grafts are procedures that can be marketed directly to patient aesthetics concerns. Most periodontist websites don\'t mention them prominently.',
    },
  ],
  painPoints: {
    headline: 'What periodontists tell us when they contact us.',
    items: [
      { quote: 'I know my three best referrers really well and everyone else is a complete stranger. That feels fragile.' },
      { quote: 'I want to grow but I don\'t know how to approach GDPs I\'ve never met  cold calling feels wrong for a clinical relationship.' },
      { quote: 'Patients don\'t know periodontists exist until a GDP mentions us. I\'d love to be findable before that.' },
      { quote: 'I do beautiful cosmetic periodontal work but it\'s almost an afterthought on my website. I don\'t get enquiries for it.' },
    ],
  },
  pillars: {
    build: 'We build your referrer map, design your outreach programme, and create the clinical communication tools  case reports, educational content, practice updates  that make you a valued contact rather than a cold approach.',
    grow: 'We build patient-facing content for gum disease self-identification, cosmetic periodontal procedures, and implant maintenance that creates a direct-to-patient acquisition stream alongside your referral pipeline.',
    brand: 'We position you as the periodontal authority in your area  through content, relationships, and a digital presence that makes you the natural first call for GDPs and patients alike.',
  },
  proof: {
    clientName: 'Dr. Elena Torres',
    specialty: 'Periodontist',
    location: 'Los Angeles, US',
    quote: 'The referral programme gave me a structure to reach out to GDPs I\'d never spoken to. It felt natural rather than salesy, and within six months I had fourteen new referral relationships.',
    metrics: [
      { value: '+14', label: 'New active referral relationships' },
      { value: '+62%', label: 'New patient referrals' },
      { value: '3.1×', label: 'Cosmetic periodontal enquiries' },
    ],
    talkToHref: '/references/elena-torres',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Oral Surgeons', slug: 'oral-surgeon' },
    { label: 'Orthodontists', slug: 'orthodontist' },
    { label: 'Prosthodontists', slug: 'prosthodontist' },
  ],
  finalCta: {
    headline: 'A thriving periodontal practice starts with a network that works for you. Let\'s build it.',
  },
}

// ─────────────────────────────────────────────

export const prosthodontist = {
  specialtyLabel: 'Prosthodontists',
  practiceNoun: 'prosthodontics',
  ctaHref: '/contact/prosthodontist',
  hero: {
    headline: 'More full-mouth rehabilitation and complex implant cases. Less competition on single crowns.',
    subcopy: [
      'Prosthodontics is the specialty patients don\'t know they need until they\'ve been failed by a general dentist trying to do your job. Reaching them requires both referral development and direct patient education.',
      'We build practice growth systems that attract the complex restorative cases your training was built for.',
    ],
  },
  insights: [
    {
      title: 'Full-mouth rehabilitation patients are worth 10–20× a single crown patient',
      body: 'These cases require a long, trust-building patient journey. Practices that invest in patient education content for full-mouth rehab attract patients who arrive pre-committed to the process.',
    },
    {
      title: 'Implant-retained dentures are a growing and underserved direct-to-patient search category',
      body: 'Denture wearers searching for implant-supported solutions represent a large, highly motivated search audience. Most prosthodontist websites don\'t address this search explicitly.',
    },
    {
      title: 'Complex GDP referrals require clinical confidence and relationship warmth simultaneously',
      body: 'GDPs refer their most complex cases to a prosthodontist they trust clinically and feel comfortable communicating with. Your marketing to referring colleagues needs to address both.',
    },
    {
      title: 'Patient photography and case documentation is your most powerful marketing material',
      body: 'Full-mouth rehabilitation outcomes, properly photographed and presented, convert at rates that no other content type approaches for this patient segment.',
    },
  ],
  painPoints: {
    headline: 'What prosthodontists say when they first contact us.',
    items: [
      { quote: 'I keep getting referred single-unit cases when my training is really for the multi-unit, full-arch work. I don\'t know how to change the perception.' },
      { quote: 'My case photography is excellent but it\'s essentially hidden in a gallery page no one visits.' },
      { quote: 'I want to grow my all-on-four and implant bridge work but I\'m not sure how to position that without it looking like I\'m chasing trends.' },
      { quote: 'The GDPs who refer to me regularly are a tiny fraction of the practices near me. I\'ve never had a systematic way to develop more.' },
    ],
  },
  pillars: {
    build: 'We build a case study architecture around your full-mouth rehabilitation, implant, and complex restorative work  creating the content engine that attracts ideal cases and educates patients through the decision process.',
    grow: 'We develop your GDP referral programme for complex cases and build patient-facing SEO content for your highest-value procedures and patient segments.',
    brand: 'We establish you as the complex restorative authority in your area  with a visual identity, content strategy, and peer-facing presence that communicates the depth of your specialty clearly.',
  },
  proof: {
    clientName: 'Dr. Michael Carew',
    specialty: 'Prosthodontist',
    location: 'Dublin, IE',
    quote: 'The shift in the complexity of my caseload over 18 months was remarkable. I went from half general restorative to 80% complex cases. The revenue difference is significant.',
    metrics: [
      { value: '+60pp', label: 'Complex case proportion' },
      { value: '2.8×', label: 'Average case value' },
      { value: '+34%', label: 'GDP referral volume' },
    ],
    talkToHref: '/references/michael-carew',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Oral Surgeons', slug: 'oral-surgeon' },
    { label: 'Periodontists', slug: 'periodontist' },
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Orthodontists', slug: 'orthodontist' },
  ],
  finalCta: {
    headline: 'The complex cases you trained for deserve a system that finds them. Let\'s build it.',
  },
}

// ─────────────────────────────────────────────

export const dentist = {
  specialtyLabel: 'Private Dentists',
  practiceNoun: 'private dental',
  ctaHref: '/contact/dentist',
  hero: {
    headline: 'A full private dental practice built on patients who stay, spend, and refer.',
    subcopy: [
      'Private dentistry is a relationship business. Patients who feel cared for return every year, spend on elective work, and bring their families. Building a practice full of them is the goal  and it\'s a system, not luck.',
      'We build patient acquisition and retention systems for private dental practices that want predictable, growing revenue without constant discounting or patient churn.',
    ],
  },
  insights: [
    {
      title: 'Practice membership plans are the single most powerful retention tool in private dentistry',
      body: 'Patients on a membership plan attend 2× more frequently, spend more per visit on elective treatment, and churn at a fraction of the rate of pay-per-visit patients. Most practices underinvest in growing their membership base.',
    },
    {
      title: 'New mover marketing is a low-competition, high-conversion patient acquisition channel',
      body: 'Families who have recently moved to an area actively look for a new dentist in the first 90 days. Practices with visibility in this moment acquire loyal, multi-year patients at low cost.',
    },
    {
      title: 'Elective treatment case acceptance is your single biggest revenue lever',
      body: 'Most practices leave significant revenue on the table in existing patient conversations. A structured approach to elective treatment presentation increases case acceptance by 20–40% without acquiring a single new patient.',
    },
    {
      title: 'Google reviews are the primary trust signal for new patient acquisition in dentistry',
      body: 'Over 80% of new dental patients check reviews before choosing a practice. Practices with an active review generation system outperform on conversion, regardless of other marketing spend.',
    },
  ],
  painPoints: {
    headline: 'What private dentists tell us when they reach out.',
    items: [
      { quote: 'I\'m always seeing new patients but I feel like I\'m filling a leaky bucket  I can\'t work out why people aren\'t staying.' },
      { quote: 'I want to grow my whitening, veneers, and Invisalign work but I can\'t get patients interested in it at the check-up.' },
      { quote: 'I came off NHS two years ago and my pipeline is inconsistent. Word of mouth works but it\'s not reliable enough.' },
      { quote: 'I\'ve tried Google Ads and Facebook but I just got a lot of NHS patients who wanted free treatment.' },
    ],
  },
  pillars: {
    build: 'We build your patient acquisition and retention infrastructure: a membership programme, a referral system, an active review pipeline, and tracking that tells you exactly where your growth is coming from.',
    grow: 'We develop your local SEO presence for private dentistry search terms, run targeted acquisition campaigns for your elective treatment services, and create the new-patient experience that turns first visits into long-term relationships.',
    brand: 'We build a practice brand that communicates warmth, expertise, and the private standard your patients are paying for  through a website, visual identity, and content strategy that sets you apart from NHS and budget alternatives.',
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
    { label: 'Cosmetic Dentists', slug: 'cosmetic-dentist' },
    { label: 'Orthodontists', slug: 'orthodontist' },
    { label: 'Oral Surgeons', slug: 'oral-surgeon' },
    { label: 'Clinic Owners', slug: 'clinic-owner' },
  ],
  finalCta: {
    headline: 'A thriving private practice is a system problem. Let\'s solve it.',
  },
}

// ─────────────────────────────────────────────
// D. MEDICAL SPECIALISTS
// ─────────────────────────────────────────────

export const cardiologist = {
  specialtyLabel: 'Cardiologists',
  practiceNoun: 'cardiology',
  ctaHref: '/contact/cardiologist',
  hero: {
    headline: 'Build a private cardiology practice that grows beyond hospital networks.',
    subcopy: [
      'Private cardiology patients are high-value, long-term, and relationship-driven. But most practices have no system to attract them directly  relying entirely on hospital channels or a handful of GP referrers.',
      'We build practice development programmes that create predictable private cardiology growth through diversified referral networks and direct patient acquisition.',
    ],
  },
  insights: [
    {
      title: 'Executive health check patients are a gateway to ongoing cardiology relationships',
      body: 'Self-paying executives seeking comprehensive cardiac screening represent a high-value, low-friction acquisition channel. Practices that market this service directly capture patients who often become long-term private cardiology patients.',
    },
    {
      title: 'GP referral development is undersystematic in most private cardiology practices',
      body: 'The average private cardiologist has a referral relationship with a fraction of the GPs in their catchment area. A structured development programme typically doubles referral sources within a year.',
    },
    {
      title: 'Cardiac anxiety is a high-search, high-conversion patient segment',
      body: 'Patients experiencing palpitations, shortness of breath, or chest tightness often self-refer for private consultations. Practices with strong local search visibility for cardiac symptoms capture this stream without any active marketing effort.',
    },
    {
      title: 'Patient education content on heart health is a trust-building SEO engine',
      body: 'Long-form content about atrial fibrillation, hypertension management, and cardiac risk builds both search visibility and the kind of pre-consultation trust that drives high case acceptance.',
    },
  ],
  painPoints: {
    headline: 'What cardiologists say when they reach out to us.',
    items: [
      { quote: 'I\'m reliant on one or two referring physicians and my private list suffers every time they change their referral patterns.' },
      { quote: 'I do private executive cardiac screening but it\'s almost an invisible service  I don\'t know how to market a screening programme.' },
      { quote: 'I want to grow my private practice but it feels inappropriate to market myself the way cosmetic practices do.' },
      { quote: 'My NHS reputation is excellent but it doesn\'t automatically translate into private referrals and I don\'t know how to bridge that.' },
    ],
  },
  pillars: {
    build: 'We build your GP referral programme, executive health screening pathway, and patient-facing digital infrastructure  with content and tracking systems that make every growth channel visible and manageable.',
    grow: 'We grow your local search presence for cardiac symptom and private cardiology search terms and build a systematic GP outreach programme that expands your referral base month by month.',
    brand: 'We establish your reputation as the trusted, accessible private cardiologist in your area  through patient-facing content, peer relationships, and a digital presence that reflects the standard of your care.',
  },
  proof: {
    clientName: 'Dr. Femi Adeyemi',
    specialty: 'Cardiologist',
    location: 'London, UK',
    quote: 'The executive screening programme was something I\'d been thinking about for years but couldn\'t see how to launch. Within three months it was running, within six it was full.',
    metrics: [
      { value: '+34', label: 'New GP referral relationships' },
      { value: '3.2×', label: 'Private consultation volume' },
      { value: '+£290k', label: 'Annual revenue uplift' },
    ],
    talkToHref: '/references/femi-adeyemi',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Physicians / Internists', slug: 'physician' },
    { label: 'Endocrinologists', slug: 'endocrinologist' },
    { label: 'Respiratory Physicians', slug: 'respiratory-physician' },
    { label: 'General Surgeons', slug: 'general-surgeon' },
  ],
  finalCta: {
    headline: 'Your private cardiology practice has more capacity for growth than your current system is using. Let\'s find it.',
  },
}

// ─────────────────────────────────────────────

export const endocrinologist = {
  specialtyLabel: 'Endocrinologists',
  practiceNoun: 'endocrinology',
  ctaHref: '/contact/endocrinologist',
  hero: {
    headline: 'More private endocrinology patients who understand the value of specialist management.',
    subcopy: [
      'Endocrinology is an undermarketed specialty  most patients don\'t know the difference between GP management and specialist endocrine care until they\'ve experienced both.',
      'We build practice development systems that make your specialist expertise visible to patients and referrers who need it.',
    ],
  },
  insights: [
    {
      title: 'Thyroid disease is one of the most self-researched conditions in endocrinology',
      body: 'Patients with thyroid conditions are active online researchers who frequently seek second opinions or specialist management. Practices with strong thyroid content visibility capture a large, motivated self-referring audience.',
    },
    {
      title: 'The weight management space intersects with endocrinology in ways most practices don\'t capitalise on',
      body: 'The rise of GLP-1 medications has dramatically increased patient interest in metabolic and hormonal factors in weight management. Endocrinologists who address this positioning explicitly capture a rapidly growing patient segment.',
    },
    {
      title: 'Diabetes specialist management is valued by patients  but finding an endocrinologist for it is surprisingly hard',
      body: 'Type 1 and complex Type 2 patients who want specialist involvement in their diabetes management represent a motivated, underserved private patient segment.',
    },
    {
      title: 'GP referrers need clinical confidence and responsive communication to refer consistently',
      body: 'GPs are more likely to refer consistently to an endocrinologist who provides prompt, useful clinic letters and is accessible for a quick clinical question. Your referral programme should address both.',
    },
  ],
  painPoints: {
    headline: 'What endocrinologists tell us when we first speak.',
    items: [
      { quote: 'My waiting list is long on the NHS side and my private list is thinner than I\'d like. I can\'t quite explain why.' },
      { quote: 'I get thyroid referrals but not enough  I know there are hundreds of patients managing poorly on standard GP prescribing who don\'t know they could do better.' },
      { quote: 'The GLP-1 conversation is everywhere in the media but I\'m not capturing the interest it\'s generating.' },
      { quote: 'I want to attract more complex diabetes patients but most GPs seem to default to sending them to the hospital clinic rather than my private practice.' },
    ],
  },
  pillars: {
    build: 'We build your patient-facing content for thyroid, diabetes, adrenal, and metabolic conditions  and construct GP communication tools that make referring to you the obvious, easy choice.',
    grow: 'We develop your search presence for high-intent endocrine condition terms and build a GP referral programme that expands your referral network systematically.',
    brand: 'We position your specialist expertise in the context of growing patient interest in metabolic and hormonal health  making your practice visible and trusted at the intersection of patient need and media attention.',
  },
  proof: {
    clientName: 'Dr. Hannah Kessler',
    specialty: 'Endocrinologist',
    location: 'New York, US',
    quote: 'We built content around thyroid under-treatment and the GLP-1 conversation. Both drove significant direct patient enquiries from people who didn\'t even know endocrinologists took private patients.',
    metrics: [
      { value: '4.1×', label: 'Direct patient enquiries' },
      { value: '+58%', label: 'Private consultation volume' },
      { value: '+27', label: 'New GP referral relationships' },
    ],
    talkToHref: '/references/hannah-kessler',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Cardiologists', slug: 'cardiologist' },
    { label: 'Bariatric Surgeons', slug: 'bariatric-surgeon' },
    { label: 'Physicians / Internists', slug: 'physician' },
    { label: 'Gastroenterologists', slug: 'gastroenterologist' },
  ],
  finalCta: {
    headline: 'Specialist endocrine care changes patient outcomes. More patients deserve access to it. Let\'s grow your reach.',
  },
}

// ─────────────────────────────────────────────

export const gastroenterologist = {
  specialtyLabel: 'Gastroenterologists',
  practiceNoun: 'gastroenterology',
  ctaHref: '/contact/gastroenterologist',
  hero: {
    headline: 'More private gastroenterology patients. Less dependence on one or two referral sources.',
    subcopy: [
      'Private gastroenterology has strong fundamentals  gut health awareness is growing, diagnostic procedures are highly sought after privately, and patients with chronic GI conditions are actively seeking specialist management.',
      'We build acquisition systems that help your practice capitalise on this demand with a diversified, predictable patient pipeline.',
    ],
  },
  insights: [
    {
      title: 'Private colonoscopy is one of the most searched private diagnostic procedures',
      body: 'Patients seeking to avoid long NHS colonoscopy waits represent a large, motivated self-referring segment. Practices with clear private endoscopy pathway information capture this demand directly.',
    },
    {
      title: 'IBS and gut health are high-search, high-frustration patient categories',
      body: 'Patients with IBS who have been told "nothing is wrong" are highly motivated to seek specialist care privately. Content that acknowledges their frustration and explains what specialist evaluation adds converts at exceptional rates.',
    },
    {
      title: 'Capsule endoscopy and specialist IBD management are high-margin service lines most practices under-market',
      body: 'Complex diagnostic and specialist management services that GPs cannot offer are your highest-value acquisition opportunities. Most practices don\'t create patient-facing content about them.',
    },
    {
      title: 'Post-COVID gut symptoms created a new self-referring patient segment',
      body: 'Long COVID GI symptoms continue to drive a significant self-referral stream for gastroenterologists. Practices with content addressing this continue to see strong conversion from it.',
    },
  ],
  painPoints: {
    headline: 'What gastroenterologists say when they contact us.',
    items: [
      { quote: 'My private practice is full but it\'s entirely dependent on one hospital and two GP practices. It feels fragile.' },
      { quote: 'I know there\'s huge demand for private colonoscopy but my website doesn\'t really explain what I offer and how to book it.' },
      { quote: 'I have a real interest in IBD and want to be known for it, but I\'m not sure how to position that without it seeming niche.' },
      { quote: 'The gut health space is everywhere in the media but I don\'t seem to be capturing any of the interest it\'s generating.' },
    ],
  },
  pillars: {
    build: 'We build clear procedural and condition-specific patient pathways  for colonoscopy, IBS, IBD, and your specialist interests  and create the educational content that converts research-phase patients into booked appointments.',
    grow: 'We develop your search visibility for private GI procedure and condition terms, build a GP referral development programme, and help you capitalise on the growing direct-to-patient demand for gut health expertise.',
    brand: 'We position your gastroenterological expertise in the context of growing public awareness of gut health  building a digital presence that bridges specialist clinical authority and the mainstream conversation patients are already having.',
  },
  proof: {
    clientName: 'Dr. Samuel Mensah',
    specialty: 'Gastroenterologist',
    location: 'London, UK',
    quote: 'The IBS content was our single highest-converting page within three months of publication. Those patients had typically been dismissed elsewhere and were intensely loyal when we took them seriously.',
    metrics: [
      { value: '5.2×', label: 'IBS patient enquiries' },
      { value: '+63%', label: 'Private appointment volume' },
      { value: '+41%', label: 'GP referral breadth' },
    ],
    talkToHref: '/references/samuel-mensah',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Colorectal Surgeons', slug: 'colorectal-surgeon' },
    { label: 'General Surgeons', slug: 'general-surgeon' },
    { label: 'Endocrinologists', slug: 'endocrinologist' },
    { label: 'Physicians / Internists', slug: 'physician' },
  ],
  finalCta: {
    headline: 'Private gastroenterology demand is growing. Make sure your practice is there to meet it.',
  },
}

// ─────────────────────────────────────────────

export const urologist = {
  specialtyLabel: 'Urologists',
  practiceNoun: 'urology',
  ctaHref: '/contact/urologist',
  hero: {
    headline: 'More private urology patients. A practice not built around waiting for referrals.',
    subcopy: [
      'Private urology patients are often highly motivated  they\'ve been waiting too long on the NHS, they\'ve Googled their symptoms and want an expert, or they need a sensitive conversation they\'d rather not have in an NHS setting.',
      'We build patient acquisition systems that reach these patients at the moment they\'re looking.',
    ],
  },
  insights: [
    {
      title: 'Men\'s health is the fastest-growing area of self-directed health spending',
      body: 'Testosterone, erectile dysfunction, and prostate health are increasingly discussed openly. Men are actively seeking private care for these conditions and the practices that speak to them clearly win significant organic traffic.',
    },
    {
      title: 'PSA testing and prostate cancer screening are high-intent, direct-search procedures',
      body: 'Men researching prostate cancer risk frequently search for private PSA testing and specialist review. A clear, frictionless pathway for this drives self-referrals from a high-anxiety, highly motivated patient group.',
    },
    {
      title: 'Female urology is dramatically under-served in most markets',
      body: 'Women with overactive bladder, pelvic organ prolapse, and incontinence are a large, underserved, and undermarketed patient group. Practices with visible, non-stigmatising content for female urological conditions see strong conversion.',
    },
    {
      title: 'Stone disease and kidney health are high-search, relatively low-complexity acquisition areas',
      body: 'Kidney stones drive urgent private searches. A fast, clear booking pathway for stone assessment and management fills surgical list gaps and builds a base of returning patients.',
    },
  ],
  painPoints: {
    headline: 'What urologists tell us when they reach out.',
    items: [
      { quote: 'I want to grow my men\'s health work but I\'m not sure how to market something that feels sensitive without it looking tacky.' },
      { quote: 'Half my practice is waiting-list private, and the other half is very thin. I want to stop being so dependent on hospital channels.' },
      { quote: 'I have a strong interest in female urology but almost no enquiries for it  I don\'t think women know they could see me privately.' },
      { quote: 'I tried PPC and it brought in patients who needed NHS care. I need a way to attract patients who genuinely want to pay privately.' },
    ],
  },
  pillars: {
    build: 'We build separate patient pathways for men\'s health, female urology, stone disease, and oncological urology  with the content, booking flows, and intake processes each requires.',
    grow: 'We develop your search presence for urological condition and procedure terms, run acquisition campaigns for your highest-value patient segments, and build a GP referral programme that diversifies your pipeline.',
    brand: 'We establish your authority as the trusted private urologist in your area  with a brand identity and content strategy that communicates expertise and discretion in equal measure.',
  },
  proof: {
    clientName: 'Mr. James Oluwole',
    specialty: 'Urologist',
    location: 'Manchester, UK',
    quote: 'The men\'s health content was something I\'d been hesitant to do  it felt like advertising. But the patients it brought in were exactly who I wanted to see. They were grateful and incredibly loyal.',
    metrics: [
      { value: '3.7×', label: 'Men\'s health patient enquiries' },
      { value: '+48%', label: 'Private surgical volume' },
      { value: '2.2×', label: 'Female urology enquiries' },
    ],
    talkToHref: '/references/james-oluwole',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'General Surgeons', slug: 'general-surgeon' },
    { label: 'Colorectal Surgeons', slug: 'colorectal-surgeon' },
    { label: 'Oncologists', slug: 'oncologist' },
    { label: 'Physicians / Internists', slug: 'physician' },
  ],
  finalCta: {
    headline: 'Private urology demand is underserved in most markets. Make sure your practice is the answer.',
  },
}

// ─────────────────────────────────────────────

export const oncologist = {
  specialtyLabel: 'Oncologists',
  practiceNoun: 'oncology',
  ctaHref: '/contact/oncologist',
  hero: {
    headline: 'A private oncology practice that patients find when they need specialist expertise most.',
    subcopy: [
      'Private oncology patients are navigating the most high-stakes decision of their lives. The practice they choose is built on trust, accessibility, and the sense that they are being treated as an individual.',
      'We build the digital presence and referral infrastructure that positions your practice as that trusted choice  with sensitivity to the nature of the specialty throughout.',
    ],
  },
  insights: [
    {
      title: 'Second opinion seeking in oncology is a growing and underserved patient need',
      body: 'Patients who have received a cancer diagnosis or treatment recommendation increasingly seek a private second opinion. A clear, compassionate pathway for this service converts patients who are actively searching for it.',
    },
    {
      title: 'Genomic testing and precision medicine are differentiators most patients don\'t know to look for',
      body: 'Patients informed about precision oncology approaches are more likely to seek specialist private consultation. Content that explains what specialist cancer care adds  beyond what they\'d receive in a standard pathway  drives informed self-referrals.',
    },
    {
      title: 'Palliative care and quality-of-life conversations are a service patients want but rarely find online',
      body: 'Patients and families seeking proactive palliative planning represent an underserved group. Practices that address this sensitively online become trusted destinations for some of the most grateful patients you\'ll work with.',
    },
    {
      title: 'Multidisciplinary team relationships drive the highest-quality complex case referrals',
      body: 'Oncologists with active MDT relationships  with radiologists, surgeons, and specialist nurses  receive the most complex and clinically interesting private referrals. Supporting and developing these relationships matters.',
    },
  ],
  painPoints: {
    headline: 'What oncologists tell us when they reach out.',
    items: [
      { quote: 'I want to grow my private practice but traditional marketing feels entirely wrong for oncology. I don\'t know what the appropriate version looks like.' },
      { quote: 'I know there are patients seeking second opinions who can\'t find me because I\'m not visible for that specific search.' },
      { quote: 'My practice has grown entirely through MDT relationships and word of mouth. Both are great but neither is predictable.' },
      { quote: 'I want to be better known for a specific tumour type but I don\'t know how to communicate subspecialty expertise without alienating general referrers.' },
    ],
  },
  pillars: {
    build: 'We build a patient-facing presence designed specifically for oncology  with the sensitivity, depth, and trust signals that cancer patients need  alongside a referral infrastructure for the MDT and GP relationships that matter to your practice.',
    grow: 'We develop your visibility for second-opinion and specialist oncology searches, and build a systematic approach to maintaining and deepening your MDT and GP referral relationships.',
    brand: 'We establish your subspecialty authority  in your tumour type of choice, in your approach to precision medicine, or in your patient care philosophy  through carefully crafted content that builds trust before the first consultation.',
  },
  proof: {
    clientName: 'Dr. Victoria Holloway',
    specialty: 'Oncologist',
    location: 'London, UK',
    quote: 'The second-opinion pathway was quiet for the first month and then it exploded. Those patients were incredibly grateful and the word-of-mouth it generated was remarkable.',
    metrics: [
      { value: '6.3×', label: 'Second-opinion enquiries' },
      { value: '+44%', label: 'Private consultation volume' },
      { value: '+38%', label: 'MDT referral relationships' },
    ],
    talkToHref: '/references/victoria-holloway',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Colorectal Surgeons', slug: 'colorectal-surgeon' },
    { label: 'Urologists', slug: 'urologist' },
    { label: 'Physicians / Internists', slug: 'physician' },
    { label: 'General Surgeons', slug: 'general-surgeon' },
  ],
  finalCta: {
    headline: 'Patients navigating cancer need a specialist they trust. Let\'s make sure they can find you.',
  },
}

// ─────────────────────────────────────────────

export const respiratoryPhysician = {
  specialtyLabel: 'Respiratory Physicians',
  practiceNoun: 'respiratory medicine',
  ctaHref: '/contact/respiratory-physician',
  hero: {
    headline: 'More private respiratory patients. A practice that grows beyond hospital waiting lists.',
    subcopy: [
      'Private respiratory medicine serves patients who are tired of waiting for a definitive diagnosis, athletes who need peak performance assessment, or long COVID patients struggling without specialist support.',
      'We build acquisition systems that reach each of these patient groups with the message that actually converts them.',
    ],
  },
  insights: [
    {
      title: 'Long COVID respiratory symptoms continue to drive significant self-referral demand',
      body: 'Patients with persistent breathlessness, cough, and exercise intolerance following COVID infection are highly motivated to seek private specialist review. The search demand for this remains strong.',
    },
    {
      title: 'Asthma and COPD patients undervalue specialist review  until you show them why it matters',
      body: 'Patients who have been managed on standard protocols for years frequently don\'t know what specialist respiratory review would add. Content that makes this case specifically and practically converts at high rates.',
    },
    {
      title: 'Sleep disordered breathing is a high-search, high-prevalence, underdiagnosed condition',
      body: 'Patients experiencing symptoms of sleep apnoea frequently self-research and seek private diagnosis rather than waiting for NHS referral pathways. Respiratory practices with sleep content visibility capture significant self-referral volume.',
    },
    {
      title: 'Sports and exercise physiologists refer high-value performance respiratory patients',
      body: 'Athletes with exercise-induced symptoms represent a niche but high-value and growing patient segment. Practices with relationships in the sports medicine and performance world capture this group effectively.',
    },
  ],
  painPoints: {
    headline: 'What respiratory physicians tell us when they reach out.',
    items: [
      { quote: 'I have good NHS practice but my private list is thin and entirely dependent on a few GP referrers I\'ve known for years.' },
      { quote: 'There are long COVID patients out there who need exactly what I do but I\'m not visible to them.' },
      { quote: 'I want to grow my sleep medicine work but my website doesn\'t mention it in any meaningful way.' },
      { quote: 'I know my patients are waiting too long for NHS spirometry and bronchoscopy  I could offer private slots but I don\'t know how to fill them.' },
    ],
  },
  pillars: {
    build: 'We build patient-facing content and pathways for your key conditions and procedures  with specific depth in long COVID, sleep disorders, and performance respiratory medicine  and a GP referral programme to support systematic growth.',
    grow: 'We develop your organic search presence for respiratory symptom and condition searches, build your private procedure pathway visibility, and run targeted campaigns for your highest-value patient segments.',
    brand: 'We establish your respiratory authority  in your area of clinical interest, in your patient philosophy, and in the growing public conversation about lung health  with a digital presence that connects clinical credibility with patient accessibility.',
  },
  proof: {
    clientName: 'Dr. Eleanor Barnes',
    specialty: 'Respiratory Physician',
    location: 'Oxford, UK',
    quote: 'The long COVID programme brought in 40 patients in the first two months. Those patients were so grateful for specialist involvement that virtually every one of them referred someone within six months.',
    metrics: [
      { value: '+40', label: 'Long COVID patients (first 2 months)' },
      { value: '2.9×', label: 'Private appointment volume' },
      { value: '+71%', label: 'Patient referral rate' },
    ],
    talkToHref: '/references/eleanor-barnes',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Cardiologists', slug: 'cardiologist' },
    { label: 'Physicians / Internists', slug: 'physician' },
    { label: 'Oncologists', slug: 'oncologist' },
    { label: 'ENT Surgeons', slug: 'ent-surgeon' },
  ],
  finalCta: {
    headline: 'Private respiratory medicine is growing. Let\'s make sure your practice is part of that growth.',
  },
}

// ─────────────────────────────────────────────

export const physician = {
  specialtyLabel: 'Physicians & Internists',
  practiceNoun: 'internal medicine',
  ctaHref: '/contact/physician',
  hero: {
    headline: 'A private internal medicine practice built on patients who trust you with everything.',
    subcopy: [
      'The private physician is one of the most trusted roles in medicine. Patients who find the right physician refer their families, stay for decades, and resist offers from competitors.',
      'We build acquisition systems that find these patients  and the structures that keep them.',
    ],
  },
  insights: [
    {
      title: 'Executive health assessments are the highest-leverage entry point into private internal medicine',
      body: 'Comprehensive health checks for senior professionals are a large, self-paying market segment. They are also the most efficient conversion pathway to an ongoing private physician relationship.',
    },
    {
      title: 'Preventive medicine and longevity are growing patient interests driving new physician relationships',
      body: 'Patients seeking proactive health management  biological age testing, micronutrient optimisation, cardiovascular risk reduction  are a growing, high-paying segment that practices with the right content capture early.',
    },
    {
      title: 'International patients seeking a UK/US physician create a premium self-referral stream',
      body: 'Internationally mobile patients who want a private physician aligned to NHS or US medical standards are a high-value, under-targeted segment. Practices with international patient content capture this group.',
    },
    {
      title: 'The GP-to-private-physician journey is triggered by a waiting list experience or feeling unheard',
      body: 'Most private physician patients converted from NHS general practice following a specific, memorable negative experience. Content that speaks directly to this moment converts at high rates.',
    },
  ],
  painPoints: {
    headline: 'What physicians and internists tell us when they reach out.',
    items: [
      { quote: 'I have a loyal list but almost no new patient acquisition system. My growth is entirely dependent on existing patient referrals.' },
      { quote: 'I want to build an executive health programme but I\'ve been trying to start it for two years and haven\'t had the time or know-how to launch it.' },
      { quote: 'My patients are very loyal but they\'re ageing. I need to be building a patient list that will sustain the practice for the next twenty years.' },
      { quote: 'I\'ve thought about the longevity medicine space but I\'m not sure how to position it without it sounding gimmicky.' },
    ],
  },
  pillars: {
    build: 'We build your executive health programme, patient acquisition funnel, and the systems  from booking to follow-up  that convert first consultations into long-term patient relationships.',
    grow: 'We develop your search and referral presence for executive health, preventive medicine, and private GP services, and build the acquisition infrastructure to reach self-paying patients at the moment they\'re looking.',
    brand: 'We establish your physician brand  through content, media presence, and a digital identity that communicates the premium, personal standard of care that defines the private physician relationship.',
  },
  proof: {
    clientName: 'Dr. Hugo Sinclair',
    specialty: 'Physician',
    location: 'London, UK',
    quote: 'The executive health programme launched and was fully subscribed in its first year. The patients it brought in were everything I\'d hoped  engaged, proactive, and wonderful to work with.',
    metrics: [
      { value: '100%', label: 'Executive programme subscription in year one' },
      { value: '+56%', label: 'New patient registrations' },
      { value: '4.8★', label: 'Average patient satisfaction score' },
    ],
    talkToHref: '/references/hugo-sinclair',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Cardiologists', slug: 'cardiologist' },
    { label: 'Endocrinologists', slug: 'endocrinologist' },
    { label: 'Gastroenterologists', slug: 'gastroenterologist' },
    { label: 'Respiratory Physicians', slug: 'respiratory-physician' },
  ],
  finalCta: {
    headline: 'Build the private physician practice you went into medicine to run.',
  },
}

// ─────────────────────────────────────────────

export const entSurgeon = {
  specialtyLabel: 'ENT Surgeons',
  practiceNoun: 'ENT surgery',
  ctaHref: '/contact/ent-surgeon',
  hero: {
    headline: 'More private ENT patients. A surgical list that isn\'t rationed by one hospital.',
    subcopy: [
      'Private ENT serves a wide patient mix  from parents of children with glue ear to adults seeking sinus surgery, hearing restoration, or rhinoplasty. Each group finds you differently and needs a different message.',
      'We build acquisition systems that serve each pathway efficiently and give your practice a diversified, growing pipeline.',
    ],
  },
  insights: [
    {
      title: 'Paediatric ENT is a high-volume, parent-driven direct-referral category',
      body: 'Parents seeking private grommets or tonsillectomy for their children actively search and self-refer. Practices with fast, clear private paediatric ENT pathways capture significant direct demand.',
    },
    {
      title: 'Hearing loss and audiology pathways are an underserved patient gateway',
      body: 'Adults experiencing hearing loss frequently begin with self-diagnosis and online search before seeking professional review. Practices with strong hearing loss content and a clear private pathway capture this upstream.',
    },
    {
      title: 'Septoplasty and rhinoplasty crossover creates unique dual-pathway marketing opportunities',
      body: 'ENT surgeons who perform functional rhinoplasty are often undermarketed to patients seeking combined functional and cosmetic nasal procedures. A clear dual-benefit messaging approach captures both audiences.',
    },
    {
      title: 'Allergy and ENT overlap is a growing patient segment with strong search behaviour',
      body: 'Patients with allergic rhinitis, chronic sinusitis, and related conditions actively research private ENT care. Condition-specific content for this group drives consistent self-referral volume.',
    },
  ],
  painPoints: {
    headline: 'What ENT surgeons tell us when they come to us.',
    items: [
      { quote: 'My surgical list is full of NHS overspill and I want to build a genuinely private practice that stands on its own.' },
      { quote: 'I do beautiful functional rhinoplasty but I can\'t seem to get in front of patients who are considering both functional and cosmetic surgery.' },
      { quote: 'I have parents of children who need grommets waiting months on the NHS who could book privately tomorrow, but I don\'t know how to reach them.' },
      { quote: 'I want to grow my adult elective work but my marketing still reads like a GP referral letter.' },
    ],
  },
  pillars: {
    build: 'We build condition and procedure-specific patient pathways  for paediatric ENT, adult elective surgery, functional rhinoplasty, and allergy  with dedicated content and booking flows for each.',
    grow: 'We develop your search visibility for ENT condition and procedure searches, run acquisition campaigns for your highest-value private patient segments, and build a GP referral programme to supplement direct enquiries.',
    brand: 'We build your ENT authority  positioning your surgical scope, subspecialty interests, and patient care approach in a brand that attracts both self-referring patients and referring practitioners.',
  },
  proof: {
    clientName: 'Mr. Christopher Asante',
    specialty: 'ENT Surgeon',
    location: 'London, UK',
    quote: 'The paediatric pathway brought in families who had been waiting eight months on the NHS. Within three months it was our fastest-growing referral source  and almost entirely through organic search.',
    metrics: [
      { value: '4.4×', label: 'Paediatric ENT enquiries' },
      { value: '+66%', label: 'Private surgical volume' },
      { value: '+£230k', label: 'Annual revenue uplift' },
    ],
    talkToHref: '/references/christopher-asante',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Rhinoplasty Surgeons', slug: 'rhinoplasty-surgeon' },
    { label: 'Facial Plastic Surgeons', slug: 'facial-plastic-surgeon' },
    { label: 'Respiratory Physicians', slug: 'respiratory-physician' },
    { label: 'Ophthalmologists', slug: 'ophthalmologist' },
  ],
  finalCta: {
    headline: 'A private ENT practice full of patients who chose you is a system problem. Let\'s solve it.',
  },
}

// ─────────────────────────────────────────────
// E. PR + CLINIC OWNERS
// ─────────────────────────────────────────────

export const clinicOwner = {
  specialtyLabel: 'Clinic Owners',
  practiceNoun: 'clinic',
  ctaHref: '/contact/clinic-owner',
  hero: {
    headline: 'Build a clinic that grows around a system, not around you.',
    subcopy: [
      'Every clinic owner eventually hits the same ceiling: they\'re the best practitioner in the building, but growth has stalled because the business only works when they\'re present.',
      'We build the patient acquisition, retention, and brand systems that let your clinic grow independently of your personal time and attention.',
    ],
  },
  insights: [
    {
      title: 'Clinic revenue is disproportionately concentrated in a small number of loyal patients',
      body: 'In most clinics, 20% of patients generate 60–70% of revenue. Identifying, serving, and replicating this patient segment is the highest-leverage growth activity  and most clinics have never mapped it.',
    },
    {
      title: 'Staff-dependent service delivery is a retention risk',
      body: 'When patients are loyal to an individual practitioner rather than to the clinic, staff turnover creates patient churn. Building loyalty to the clinic brand and experience  not just to individuals  is a structural practice protection.',
    },
    {
      title: 'Multi-location clinics need centralized brand management and location-specific acquisition',
      body: 'Expanding to a second or third location without proper brand architecture and location-specific SEO strategies results in each location underperforming against its potential. Most multi-site owners discover this too late.',
    },
    {
      title: 'Clinic owners rarely have formal systems for converting walk-ins and inbound enquiries',
      body: 'The difference between a 30% and 60% enquiry-to-patient conversion rate is usually a system, not a service quality difference. Most clinics have never audited this process.',
    },
  ],
  painPoints: {
    headline: 'What clinic owners say when they come to us.',
    items: [
      { quote: 'I\'m doing more revenue than ever but I feel more stretched than ever. Something isn\'t working at a structural level.' },
      { quote: 'We opened a second location and it\'s been slower to grow than expected. I\'m not sure if we\'re approaching the marketing correctly.' },
      { quote: 'One of my senior practitioners left and took a chunk of patients with her. I need to make the clinic less dependent on individuals.' },
      { quote: 'My marketing is a mix of things I\'ve tried over the years and I genuinely don\'t know which parts are working.' },
    ],
  },
  pillars: {
    build: 'We audit your full patient journey  from first touch to loyal client  and build the infrastructure to optimise every stage: booking systems, intake processes, follow-up sequences, and retention protocols.',
    grow: 'We build location-specific acquisition systems for each site, develop your referral programme, and create the tracking infrastructure that tells you exactly what\'s growing your clinic and what isn\'t.',
    brand: 'We build a clinic brand that outlasts any individual practitioner  with a visual identity, patient experience design, and content strategy that builds loyalty to your name, not your staff.',
  },
  proof: {
    clientName: 'Sarah Tran',
    specialty: 'Clinic Owner (Multi-site)',
    location: 'Los Angeles, US',
    quote: 'The brand architecture work was the missing piece. Our second location started performing within eight months of relaunching it properly. We\'d been leaving money on the table for nearly a year.',
    metrics: [
      { value: '+82%', label: 'Second location revenue' },
      { value: '-40%', label: 'Patient churn after staff changes' },
      { value: '2.4×', label: 'Enquiry-to-patient conversion rate' },
    ],
    talkToHref: '/references/sarah-tran',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Med Spa Owners', slug: 'med-spa' },
    { label: 'Skin Clinic Owners', slug: 'skin-clinic-owner' },
    { label: 'Private Dentists', slug: 'dentist' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
  ],
  finalCta: {
    headline: 'A clinic that grows without you is built, not found. Let\'s build yours.',
  },
}

// ─────────────────────────────────────────────

export const prSpecialist = {
  specialtyLabel: 'Healthcare PR Specialists',
  practiceNoun: 'healthcare PR',
  ctaHref: '/contact/pr-specialist',
  hero: {
    headline: 'Media authority that patients find before they book  and that referrers respect.',
    subcopy: [
      'Press coverage, thought leadership, and media presence do something paid advertising can\'t: they transfer credibility from trusted publications to your name, before a patient has ever interacted with you.',
      'We build healthcare PR programmes that position private practitioners as the media\'s go-to clinical voice  and turn that authority into a consistent, compounding patient acquisition channel.',
    ],
  },
  insights: [
    {
      title: 'A single well-placed national media mention generates the equivalent of months of SEO authority',
      body: 'Coverage in national health media  The Times, The Guardian, Forbes Health, Health.com  creates backlink authority, direct patient traffic, and a credibility signal that no paid channel replicates.',
    },
    {
      title: 'Journalists need clinical sources on very short notice and most doctors are impossible to reach',
      body: 'Practitioners who are known to be responsive, media-trained, and able to comment clearly are contacted repeatedly. Becoming this source takes a system, not luck.',
    },
    {
      title: 'Thought leadership content amplifies every other marketing channel',
      body: 'A practitioner with published articles, media appearances, and speaking credits converts more patients from every source  organic, paid, and referral  than one without.',
    },
    {
      title: 'Healthcare PR requires a different approach to general PR',
      body: 'Medical accuracy, GMC/AMA compliance, conflict of interest management, and patient privacy obligations mean general PR agencies frequently cause more problems than they solve for private practitioners.',
    },
  ],
  painPoints: {
    headline: 'What practitioners say before they work with our PR team.',
    items: [
      { quote: 'I know I should be doing press but I don\'t know where to start and I\'m worried about saying something that gets me in trouble.' },
      { quote: 'I had a piece in a national newspaper last year and the response was incredible  I just can\'t replicate it without knowing how it happened.' },
      { quote: 'My competitors seem to be everywhere in the media and I don\'t understand how they\'re doing it.' },
      { quote: 'I want to position myself as a thought leader in my specialty but I don\'t want it to look self-promotional.' },
    ],
  },
  pillars: {
    build: 'We build your media profile from the ground up  identifying your story angles, preparing your media toolkit, and placing you with the right journalists and publications for your specialty and patient audience.',
    grow: 'We run an ongoing reactive and proactive press programme that keeps your name in front of journalists, secures consistent media coverage, and builds the authority that compounds across every other growth channel.',
    brand: 'We create a public thought leadership presence  through articles, commentary, podcast appearances, and speaking opportunities  that establishes you as the defining voice in your specialty and market.',
  },
  proof: {
    clientName: 'Dr. Camille Laurent',
    specialty: 'Aesthetic Doctor / PR Client',
    location: 'London, UK',
    quote: 'After six months of consistent press coverage, I stopped needing to explain my expertise to new patients. They arrived already knowing who I was. That changed every consultation.',
    metrics: [
      { value: '38', label: 'Media placements in 12 months' },
      { value: '4.2×', label: 'Website traffic from press sources' },
      { value: '+47%', label: 'Consultation-to-booking conversion' },
    ],
    talkToHref: '/references/camille-laurent',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Plastic Surgeons', slug: 'plastic-surgeon' },
    { label: 'Aesthetic Doctors', slug: 'aesthetic-doctor' },
    { label: 'Clinic Owners', slug: 'clinic-owner' },
    { label: 'Cardiologists', slug: 'cardiologist' },
  ],
  finalCta: {
    headline: 'Media authority is a compounding asset. The sooner you start building it, the faster it works.',
  },
}

// ─────────────────────────────────────────────

export const groupPracticeOwner = {
  specialtyLabel: 'Group Practice Owners',
  practiceNoun: 'group practice',
  ctaHref: '/contact/group-practice-owner',
  hero: {
    headline: 'Grow your group practice with a system that scales across every location and specialty.',
    subcopy: [
      'Running a group practice is a fundamentally different problem to running a single-practitioner clinic. Coordination, brand consistency, multi-site acquisition, and management infrastructure all have to work in concert.',
      'We build growth systems designed specifically for multi-practitioner, multi-specialty, or multi-site practices that want sustainable, scalable growth.',
    ],
  },
  insights: [
    {
      title: 'Cross-referral between specialties within a group is the highest-margin growth lever',
      body: 'A patient who comes in for one specialty and is appropriately referred to another within the same group has a dramatically higher lifetime value and lower acquisition cost. Most groups have no formal system for this.',
    },
    {
      title: 'Brand consistency across practitioners is a significant unrealised value driver',
      body: 'Groups where each practitioner has an independent online presence dilute brand equity and reduce cross-referral trust. A unified brand architecture outperforms a loose federation on every acquisition metric.',
    },
    {
      title: 'Multi-site SEO requires specific architectural investment to work correctly',
      body: 'Location pages, Google Business Profiles, and link structures for multi-site practices require specialist management. Most agencies treat them like single-site practices and underperform as a result.',
    },
    {
      title: 'Acquisition cost per patient falls significantly with scale  if the system is built for it',
      body: 'Group practices have significant marketing efficiency advantages over single-practitioner competitors. Most fail to realise them because their marketing infrastructure was never built to take advantage of scale.',
    },
  ],
  painPoints: {
    headline: 'What group practice owners say when they find us.',
    items: [
      { quote: 'We\'ve grown organically and the marketing infrastructure hasn\'t kept up. Each site is basically doing its own thing.' },
      { quote: 'I know our practitioners should be referring to each other more but we\'ve never built a system for it.' },
      { quote: 'We acquired a third location and its performance is dragging the group average down. I\'m not sure if it\'s a marketing problem or a local market problem.' },
      { quote: 'Our individual practitioners have strong personal brands but there\'s almost no group brand. I don\'t know if that\'s a problem or not.' },
    ],
  },
  pillars: {
    build: 'We audit your group\'s full marketing infrastructure  brand architecture, multi-site SEO, cross-referral systems, and acquisition tracking  and build the unified foundation that lets every location perform against its potential.',
    grow: 'We build location-specific acquisition strategies within a consistent brand architecture, develop cross-specialty referral programmes, and implement tracking systems that give you visibility across the whole group.',
    brand: 'We build a group brand that creates market presence and patient trust at the group level  while giving individual practitioners the authority positioning they need within that framework.',
  },
  proof: {
    clientName: 'The Meridian Health Group',
    specialty: 'Multi-specialty Group Practice',
    location: 'South-East England',
    quote: 'The cross-referral programme identified £340,000 of annual revenue opportunity within our existing patient base. We\'d been sitting on it for three years without knowing.',
    metrics: [
      { value: '+£340k', label: 'Identified cross-referral revenue opportunity' },
      { value: '+61%', label: 'Second-location patient volume' },
      { value: '2.9×', label: 'Group brand search visibility' },
    ],
    talkToHref: '/references/meridian-health-group',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Clinic Owners', slug: 'clinic-owner' },
    { label: 'Private Dentists', slug: 'dentist' },
    { label: 'Med Spa Owners', slug: 'med-spa' },
    { label: 'Physicians / Internists', slug: 'physician' },
  ],
  finalCta: {
    headline: 'A group practice should be greater than the sum of its parts. Let\'s make sure yours is.',
  },
}

// ─────────────────────────────────────────────

export const practiceManager = {
  specialtyLabel: 'Practice Managers',
  practiceNoun: 'practice management',
  ctaHref: '/contact/practice-manager',
  hero: {
    headline: 'The growth results your clinicians want  with the evidence your board expects.',
    subcopy: [
      'Practice managers carry a unique challenge: they\'re responsible for growth outcomes they can\'t directly control, using budgets that need to justify themselves to clinicians and finance teams simultaneously.',
      'We work with practice managers as partners  building systems that produce measurable results, are reportable to your stakeholders, and free you from managing marketing activity yourself.',
    ],
  },
  insights: [
    {
      title: 'Most practices spend marketing budget in inverse proportion to channel ROI',
      body: 'The highest-ROI channels  SEO, referral development, patient reactivation  are under-invested. The lowest-ROI channels  social media, print advertising  absorb most of the budget. An audit almost always reveals significant reallocation opportunities.',
    },
    {
      title: 'Marketing attribution in healthcare is systematically broken in most practices',
      body: 'If you can\'t trace a booked appointment back to the marketing activity that generated the enquiry, you\'re flying blind. Most practices can\'t. Building this tracking infrastructure is the foundational step.',
    },
    {
      title: 'Patient satisfaction scores and Net Promoter Score are your most under-leveraged growth metrics',
      body: 'High NPS and satisfaction scores are marketable assets. Practices that actively surface these data points in their acquisition marketing convert new patients at dramatically higher rates.',
    },
    {
      title: 'CQC / JCI ratings are trust signals most practices don\'t market adequately',
      body: 'Outstanding or accredited ratings are a significant credibility signal to prospective patients and are systematically under-used in practice marketing. They belong in your acquisition channels, not buried in a footer.',
    },
  ],
  painPoints: {
    headline: 'What practice managers say when they contact us.',
    items: [
      { quote: 'I\'ve inherited a marketing setup I didn\'t build and I genuinely don\'t know if it\'s working. I can\'t tell the board what\'s producing results.' },
      { quote: 'I have three different agencies doing three different things and no one has a joined-up view of our marketing performance.' },
      { quote: 'The clinicians all have different views on what marketing we should be doing and I need an independent, expert view to help align them.' },
      { quote: 'I know we\'re leaving growth on the table but I need to show the clinical director a clear plan with projected returns before we can approve budget.' },
    ],
  },
  pillars: {
    build: 'We start with a full marketing audit  attributing spend to outcomes, identifying what\'s working and what isn\'t  and build the reporting framework that gives you and your stakeholders visibility over every growth channel.',
    grow: 'We build and manage the growth system across your highest-ROI channels  with monthly reporting structured to the KPIs your board cares about, and a clear, measurable improvement trajectory.',
    brand: 'We build or refine your practice brand  with a consistent identity, messaging architecture, and quality standards that your clinical and management team can align around and trust.',
  },
  proof: {
    clientName: 'Imogen Clarke',
    specialty: 'Practice Manager (Multi-specialty)',
    location: 'London, UK',
    quote: 'For the first time, I could tell my board exactly which activities were generating our new patients, what they cost, and what they were worth. That changed the conversation entirely.',
    metrics: [
      { value: '£3.8', label: 'Return per £1 of marketing spend (tracked)' },
      { value: '-37%', label: 'Marketing cost per new patient' },
      { value: '+44%', label: 'New patient volume within 12 months' },
    ],
    talkToHref: '/references/imogen-clarke',
    referenceHref: '/contact/reference',
  },
  relatedSpecialties: [
    { label: 'Clinic Owners', slug: 'clinic-owner' },
    { label: 'Group Practice Owners', slug: 'group-practice-owner' },
    { label: 'Private Dentists', slug: 'dentist' },
    { label: 'Cardiologists', slug: 'cardiologist' },
  ],
  finalCta: {
    headline: 'Marketing that you can measure, explain, and defend is the only kind worth doing. Let\'s build it.',
  },
}

// ─────────────────────────────────────────────
// MASTER EXPORT  all 34 specialty data objects
// ─────────────────────────────────────────────

export const allSpecialties = [
  // A. Surgical Specialists
  { slug: 'plastic-surgeon',          data: plasticSurgeon },
  { slug: 'rhinoplasty-surgeon',      data: rhinoplastySurgeon },
  { slug: 'facial-plastic-surgeon',   data: facialPlasticSurgeon },
  { slug: 'oculoplastic-surgeon',     data: oculoplasticSurgeon },
  { slug: 'bariatric-surgeon',        data: bariatricSurgeon },
  { slug: 'general-surgeon',         data: generalSurgeon },
  { slug: 'colorectal-surgeon',       data: colorectalSurgeon },

  // B. Aesthetic + Skin
  { slug: 'aesthetic-doctor',         data: aestheticDoctor },
  { slug: 'dermatologist',            data: dermatologist },
  { slug: 'trichologist',             data: trichologist },
  { slug: 'hair-transplant-surgeon',  data: hairTransplantSurgeon },
  { slug: 'med-spa',                  data: medSpa },
  { slug: 'skin-clinic-owner',        data: skinClinicOwner },
  { slug: 'ophthalmologist',          data: ophthalmologist },

  // C. Dental + Oral Health
  { slug: 'cosmetic-dentist',         data: cosmeticDentist },
  { slug: 'orthodontist',             data: orthodontist },
  { slug: 'oral-surgeon',             data: oralSurgeon },
  { slug: 'periodontist',             data: periodontist },
  { slug: 'prosthodontist',           data: prosthodontist },
  { slug: 'dentist',                  data: dentist },

  // D. Medical Specialists
  { slug: 'cardiologist',             data: cardiologist },
  { slug: 'endocrinologist',          data: endocrinologist },
  { slug: 'gastroenterologist',       data: gastroenterologist },
  { slug: 'urologist',                data: urologist },
  { slug: 'oncologist',               data: oncologist },
  { slug: 'respiratory-physician',    data: respiratoryPhysician },
  { slug: 'physician',                data: physician },
  { slug: 'ent-surgeon',              data: entSurgeon },

  // E. PR + Clinic Owners
  { slug: 'clinic-owner',             data: clinicOwner },
  { slug: 'pr-specialist',            data: prSpecialist },
  { slug: 'group-practice-owner',     data: groupPracticeOwner },
  { slug: 'practice-manager',         data: practiceManager },
]

/**
 * USAGE EXAMPLE in your router / data layer:
 *
 * import { allSpecialties } from './specialtyContentMatrix'
 *
 * const match = allSpecialties.find(s => s.slug === params.slug)
 * if (!match) return <NotFound />
 * return <SpecialtyPage data={match.data} />
 *
 * NOTE: allSpecialties currently contains 32 named entries above.
 * Add the remaining 2 specialty objects to reach your target of 34.
 * Suggested additions based on common private practice adjacencies:
 *   - 'dietitian'  (Dietitians & Nutritionists)
 *   - 'physiotherapist' (Physiotherapists)
 * Templates for both follow the exact same schema as all objects above.
 */
