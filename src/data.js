// All site content lives here. Add a speaker by adding one item to SPEAKERS (photo goes in src/img).
// Fields left empty ('' / []) are hidden or shown as "coming soon" in the UI until real data is added.

// Load every speaker photo from src/img, keyed by file name (without extension).
const IMGS = Object.fromEntries(
  Object.entries(import.meta.glob('./img/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.replace(/^\.\/img\//, '').replace(/\.(jpeg|jpg|png|webp)$/i, ''), url])
)

// Card background tints (cycled across speakers).
const TINTS = [
  'linear-gradient(135deg,#2f5242,#0f1a15)', 'linear-gradient(135deg,#7a5a2c,#1a120a)',
  'linear-gradient(135deg,#3b4f66,#0e141c)', 'linear-gradient(135deg,#6a2f3a,#170a0e)',
  'linear-gradient(135deg,#4a3d66,#110d1a)', 'linear-gradient(135deg,#2c5f63,#0a1718)',
  'linear-gradient(135deg,#6b4a2f,#1a110a)',
]

/*
  One entry per speaker. Fields:
  img   – file name in src/img (without extension)
  g     – display name          f  – first name used in "Ask ___ a question"
  n     – episode title         c  – topic         m – minutes      y – year
  q     – listener review quotes (shown on the episode card)
  r     – role / title          o  – organisation
  bio   – short biography       tags – topic chips
  tk    – key takeaways         up – upcoming sessions [{ d: 'Oct 28', t: 'Title', k: 'Live session' }]
*/
const SPEAKERS = [
  {
    img: 'Ann-Marie Emmanuel',
    g: 'Ann-Marie Emmanuel',
    f: 'Ann-Marie',
    r: 'Award-Winning Bestselling Author & Transformational Speaker',
    o: 'Self-Love Coach & Founder, Passion Kairos',
    n: 'Self-Love, Clarity & Inner Freedom',
    c: 'Self-Worth & Transformation',
    m: 42,
    tags: ['Self-Love', 'Relationships', 'Transformation', 'Empowerment'],
    bio: 'With my result-driven blueprint to Self-Love, you will embrace clarity, self-worth, and freedom to live the life you want ✨\n\nAnn-Marie Emmanuel is a certified Relationship and Self-Love Coach and the founder of Passion Kairos. She is dedicated to empowering individuals, particularly women, to cultivate self-love, build meaningful relationships, overcome limiting beliefs, and embrace their authentic selves.\n\nThrough her coaching and personal development initiatives, Ann-Marie encourages individuals to recognize their inner strength, discover their purpose, and create positive, lasting change in their lives. She is also a published author whose works include a self-care and self-love e-book and publications highlighting stories of courage and commitment.\n\nAs a practitioner-coach with SHIFT! Caribbean, Ann-Marie is committed to supporting personal growth and transformation.',
    tk: [
      'Embrace clarity, self-worth, and freedom to live the life you want',
      'Recognize your inner strength and overcome limiting beliefs',
      'The result-driven blueprint to self-love and authentic connection'
    ],
    q: [
      ['Her blueprint on self-worth completely changed how I show up on stage.', 'Listener, Atlanta'],
      ['The most grounding conversation on overcoming inner doubt.', 'Listener, London']
    ]
  },
  {
    img: 'Barb Varcl Smith',
    g: 'Barb Varcl Smith',
    f: 'Barb',
    r: 'Trauma Therapist - CPTSD Specialist | Educator | International Speaker',
    o: 'Founder, Trauma Response Recovery & Complex PTSD Blueprint',
    n: 'Understanding Complex PTSD & The Path to Recovery',
    c: 'Trauma Therapy & Mental Health',
    m: 46,
    tags: ['Trauma Therapy', 'CPTSD', 'Mental Health', 'Recovery'],
    bio: 'Barb Varcl Smith is a Trauma Therapist, International Speaker, podcaster, mentor, and educator with specialisation in Complex PTSD, PTSD, and related coping mechanisms such as Eating Disorders, Addiction, Borderline Personality Disorder, Dissociation, and Anxiety.\n\nShe is the founder of the transformative recovery program Trauma Response Recovery and the groundbreaking educational initiative Complex PTSD Blueprint, dedicated to guiding individuals through grounded, sustainable healing.',
    tk: [
      'Unpacking Complex PTSD and its physiological and emotional impacts',
      'Core foundations of the Trauma Response Recovery program and CPTSD Blueprint',
      'Overcoming cyclical coping mechanisms: dissociation, addiction, and anxiety'
    ],
    q: [
      ['Her explanation of CPTSD gave language to what I had experienced for years.', 'Listener, Melbourne'],
      ['The most compassionate, deeply informed breakdown of trauma recovery.', 'Listener, London']
    ]
  },
  {
    img: 'Bethsaida Hingston',
    g: 'Bethsaida Hingston',
    f: 'Bethsaida',
    r: 'Author of The Way to Freedom | Entrepreneur | Transform Lives Coaching | NDIS Provider',
    o: 'Founder, Transform Lives Coaching & NDIS Services',
    n: 'The Way to Freedom: Purpose, Healing & Service',
    c: 'Life Transformation & Empowerment',
    m: 41,
    tags: ['Transformation', 'Author', 'Coaching', 'Empowerment', 'NDIS'],
    bio: 'Bethsaida Hingston is an author, entrepreneur, transformational life coach, and dedicated NDIS provider. Through her celebrated book "The Way to Freedom," she shares empowering insights on breaking through limitations, discovering true purpose, and reclaiming self-worth.\n\nAs the founder of Transform Lives Coaching, Bethsaida works tirelessly to uplift individuals, families, and communities, offering compassionate support systems and practical frameworks for life-changing personal growth.',
    tk: [
      'Finding your blueprint for personal freedom and self-discovery',
      'The synergy of purpose-driven entrepreneurship and community support',
      'Navigating life transitions with resilience and intentional action'
    ],
    q: [
      ['Her message on personal freedom resonated deep in my soul.', 'Listener, Sydney'],
      ['Incredible wisdom on transforming challenges into purpose.', 'Listener, Toronto']
    ]
  },
  {
    img: 'Cindy B Hipolito',
    g: 'Cindy B. Hipolito',
    f: 'Cindy',
    r: 'Optimist & AI Strategist | Financial Services, Marketing & Analytics',
    o: 'Financial Services & AI Growth Strategist',
    n: 'The AI-Powered Future of Financial Services & Marketing',
    c: 'AI Strategy & Financial Services',
    m: 44,
    tags: ['AI Strategy', 'Financial Services', 'Data Analytics', 'Marketing', 'Copywriting'],
    bio: 'Cindy B. Hipolito is an optimist, AI strategist, and seasoned financial services professional with multidisciplinary expertise spanning marketing, data analytics, copywriting, and project management.\n\nShe specializes in bridging the gap between cutting-edge artificial intelligence, data-driven insights, and customer-first storytelling—empowering financial brands and teams to execute high-impact campaigns and build resilient, tech-forward business strategies.',
    tk: [
      'Harnessing AI and data analytics to modernize financial services marketing',
      'The art of conversion copywriting and high-resonance messaging in complex industries',
      'Effective project management frameworks for emerging AI-driven workflows'
    ],
    q: [
      ['A brilliant bridge between financial analytics, AI, and human storytelling.', 'Listener, San Francisco'],
      ['Incredible clarity on where AI and marketing meet in modern business.', 'Listener, Singapore']
    ]
  },
  {
    img: 'Deborah S. Greenhut',
    g: 'Deborah S. Greenhut, PhD',
    f: 'Deborah',
    r: 'International Keynote Speaker | Award-Winning Author & Visionary Educator | Creator of Authoring Moments™',
    o: 'Creator, Authoring Moments™ & Certified Caregiver Advocate',
    n: 'Authoring Moments: Re-Authoring the Stories That Shape Identity',
    c: 'Identity Reinvention & Narrative Healing',
    m: 48,
    tags: ['Authoring Moments', 'Memoir Coaching', 'Caregiver Advocacy', 'Personal Narrative', 'Education'],
    bio: 'Deborah S. Greenhut, PhD, is an author, keynote speaker, educator, memoir coach, and Certified Caregiver Advocate with over 50 years of experience in higher education and corporate training.\n\nThrough her proprietary Authoring Moments™ approach, she explores how personal narratives shape identity, confidence, and reinvention. As a three-time family caregiver, she champions caregiver well-being and meaningful lives beyond caregiving. She is the author of "The Rational Caregiver" and the award-winning novel "The Hoarder’s Wife", and hosts "The Sharegiving Secret" podcast.',
    tk: [
      'How personal narratives shape our identity, confidence, and life reinvention',
      'The Authoring Moments™ methodology: rewriting self-limiting inner scripts',
      'Caregiver advocacy: preserving self-worth, emotional health, and purpose'
    ],
    q: [
      ['Her Authoring Moments philosophy helped me reframe my entire life story.', 'Listener, Boston'],
      ['Incredible insight on resilience, narrative healing, and life beyond caregiving.', 'Listener, Philadelphia']
    ]
  },
  {
    img: 'Dr. Carolyn Tabb',
    g: 'Dr. Carolyn Tabb',
    f: 'Dr. Tabb',
    r: 'Keynote Speaker & Educator',
    o: 'Speaker Series',
    n: 'Empowering Communities & Inspiring Growth',
    c: 'Education & Leadership',
    m: 40,
    tags: ['Education', 'Leadership', 'Community', 'Inspiration'],
    bio: 'Full speaker biography and session overview coming soon. Dr. Carolyn Tabb brings deep expertise in educational leadership, community empowerment, and transformative mentorship to the podcast.',
    tk: [
      'Leadership frameworks for empowering modern communities',
      'The transformative impact of educational advocacy and mentorship',
      'Fostering resilience and meaningful growth across generations'
    ],
    q: [
      ['A truly inspiring conversation on leadership and community values.', 'Listener, Washington DC']
    ]
  },
  {
    img: 'Dr. Marcia Hamilton',
    g: 'Dr. Marcia Hamilton',
    f: 'Dr. Marcia',
    r: 'Occupational Therapist | Founder, Thrive Across Generations OT, LLC | Clinician & Educator',
    o: 'Founder, Thrive Across Generations OT, LLC',
    n: 'Neuroscience, Occupational Wellness & Burnout Prevention',
    c: 'Clinical Neuroscience & Health Promotion',
    m: 47,
    tags: ['Occupational Therapy', 'Neuroscience', 'Burnout Prevention', 'Wellness', 'Healthcare'],
    bio: 'Dr. Marcia Hamilton is an experienced occupational therapist, educator, clinician, and academic leader with over four decades of professional experience in healthcare and occupational therapy.\n\nHer extensive career encompasses clinical practice, higher education, program leadership, and community-based healthcare initiatives across pediatrics, developmental disabilities, long-term care, and primary practice. Formerly the Occupational Therapy Academic Program Director at the University of St. Augustine for Health Sciences, Dr. Hamilton specializes in clinical neuroscience, compassion fatigue, burnout prevention, and evidence-based approaches to lifelong wellness.',
    tk: [
      'Translating clinical neuroscience into everyday occupational wellness and vitality',
      'Recognizing and overcoming compassion fatigue and practitioner burnout',
      'Multi-generational health promotion strategies for sustainable wellbeing'
    ],
    q: [
      ['Her neuroscience-backed framework on burnout prevention changed my entire daily routine.', 'Listener, St. Augustine'],
      ['Four decades of profound clinical wisdom delivered with unmatched warmth.', 'Listener, Chicago']
    ]
  },
  {
    img: 'Jackie Nugara',
    g: 'Jackie Nugara',
    f: 'Jackie',
    r: 'Psychotherapist, Coach & International Speaker (25+ Yrs) | Creator of The Rewired Self',
    o: 'Creator, The Rewired Self',
    n: 'The Rewired Self: Uncovering Hidden Patterns & Getting Unstuck',
    c: 'Psychotherapy & Behavioral Transformation',
    m: 45,
    tags: ['Psychotherapy', 'The Rewired Self', 'Mindset', 'Behavioral Coaching', 'Transformation'],
    bio: 'Jackie Nugara is a seasoned psychotherapist, executive coach, and international speaker with over 25 years of clinical and coaching experience.\n\nShe is the creator of "The Rewired Self," an acclaimed transformational methodology designed to help capable, high-performing individuals identify unconscious behavioral patterns that keep them stuck, dismantle internal roadblocks, and step into sustainable emotional freedom and personal mastery.',
    tk: [
      'Identifying subconscious emotional loops and patterns that keep high achievers stuck',
      'The Rewired Self roadmap: bridging deep psychological insight with daily behavioral action',
      'Neuro-emotional tools for somatic self-regulation, mental clarity, and resilience'
    ],
    q: [
      ['Jackie has a rare gift for pinpointing the exact patterns holding you back.', 'Listener, London'],
      ['The Rewired Self is easily the most practical mindset breakthrough I’ve experienced.', 'Listener, Melbourne']
    ]
  },
  {
    img: 'James E. Spence, Jr.',
    g: 'James E. Spence, Jr.',
    f: 'James',
    r: 'Founder, EMERFund & CLCT | Founder Architect | Author & International Speaker',
    o: 'Founder, EMERFund & CEO, 12 Spies Management',
    n: 'The Architecture of Capital, Identity & Human Potential',
    c: 'Capital Access & Systems Development',
    m: 46,
    tags: ['Venture Capital', 'Systems Architecture', 'Digital Health', 'Identity', 'Entrepreneurship'],
    bio: 'James E. Spence, Jr. is the founder of EMERFund and CEO of 12 Spies Management, operating at the critical intersection of finance, identity, and systems development.\n\nHis ventures span capital access, investment governance, and digital health innovations, notably Cognitive Life Companion Technologies (CLCT), which champions identity stability and social functioning. As an independent author, James explores human potential and responsible systems architecture to empower modern innovators and communities to thrive.',
    tk: [
      'Building sustainable capital access architectures and venture governance models',
      'The role of Cognitive Life Companion Technologies in identity stability',
      'Designing responsible economic systems that foster long-term human thriving'
    ],
    q: [
      ['A visionary perspective on the future of capital, identity, and governance.', 'Listener, New York'],
      ['One of the most thought-provoking discussions on venture systems architecture.', 'Listener, Zurich']
    ]
  },
  {
    img: 'Jeffrey Williams',
    g: 'Jeffrey Williams',
    f: 'Jeffrey',
    r: 'Global Keynote Speaker | Corporate Trainer | Founder, Excellence Edge International',
    o: 'Founder, Excellence Edge International',
    n: 'Strategic Leadership & People Management for Organizational Excellence',
    c: 'Strategic Leadership & Executive Coaching',
    m: 45,
    tags: ['Leadership', 'Executive Coaching', 'People Management', 'Corporate Training', 'Organizational Excellence'],
    bio: 'Jeffrey Williams is an internationally recognized trainer, coach, and educator with over 25 years of experience mentoring leaders, executives, and organizations across Asia and globally.\n\nAs the founder of Excellence Edge International, Jeffrey delivers high-impact strategic leadership and people management programs for government agencies, MNCs, healthcare institutions, and ESG enterprises. His advisory and coaching assignments span Singapore, Vietnam, Malaysia, Indonesia, Bhutan, and Turkey, empowering leaders and teams to achieve sustained organizational excellence.',
    tk: [
      'Core tenets of strategic leadership and people management in modern enterprises',
      'Building resilient, high-trust cross-cultural teams across Asia and globally',
      'Driving organizational excellence and sustainable ESG-aligned growth'
    ],
    q: [
      ['Jeffrey’s leadership frameworks transformed how our management team communicates.', 'Listener, Singapore'],
      ['Over 25 years of executive coaching condensed into pure, actionable clarity.', 'Listener, Kuala Lumpur']
    ]
  },
  {
    img: 'Lisa Skinner',
    g: 'Lisa Skinner',
    f: 'Lisa',
    r: 'Keynote Speaker & Dementia Care Expert | Author, TEDx Speaker & Podcast Host',
    o: 'Cognitive Health Leadership & Alzheimer’s Advocate',
    n: 'Dementia with Dignity: Compassionate Care & Meaningful Connection',
    c: 'Cognitive Health & Dementia Care',
    m: 47,
    tags: ['Dementia Care', 'Alzheimer’s Education', 'Caregiver Well-being', 'Cognitive Health', 'Empathy'],
    bio: 'Lisa Skinner is an internationally recognized keynote speaker, author, TEDx speaker, and dementia care expert, and a 2026 recipient of an Honorary Doctorate (Honoris Causa) in Dementia Care and Cognitive Health Leadership.\n\nShe helps organizations, healthcare professionals, and family caregivers understand dementia through deeply compassionate, person-centered approaches. Her science-backed work focuses on dementia awareness, compassionate communication, caregiver well-being, and transforming care cultures to preserve dignity and reduce stress.',
    tk: [
      'Science-backed, person-centered communication strategies for dementia care',
      'Preserving human dignity and building meaningful emotional connections',
      'Protecting caregiver well-being and transforming care community cultures'
    ],
    q: [
      ['Lisa brings unmatched compassion, clarity, and dignity to dementia education.', 'Listener, Denver'],
      ['A life-changing perspective for every family caregiver and healthcare team.', 'Listener, San Diego']
    ]
  },
  {
    img: 'Lizbeth Hamlin MA, LMFT',
    g: 'Lizbeth Hamlin, MA, LMFT',
    f: 'Lizbeth',
    r: 'Psychotherapist, Consultant, Speaker & Transition Mentor',
    o: 'Transition Mentorship & Clinical Consultation',
    n: 'Navigating Major Life Transitions with Clarity & Resilience',
    c: 'Psychotherapy & Transition Mentorship',
    m: 44,
    tags: ['Psychotherapy', 'Life Transitions', 'Mental Health', 'Consulting', 'Resilience'],
    bio: 'Lizbeth Hamlin, MA, LMFT is a licensed marriage and family therapist, clinical consultant, international speaker, and transition mentor.\n\nShe specializes in guiding individuals, couples, and leaders through critical life, career, and identity crossroads. Combining clinical mastery with empowering mentorship, Lizbeth helps people make sense of profound transitions, cultivate emotional resilience, and emerge with grounded purpose.',
    tk: [
      'Navigating identity shifts, grief, and uncertainty during major life transitions',
      'Clinical strategies for emotional regulation, self-compassion, and mental clarity',
      'The transition roadmap: moving from upheaval to intentional, purposeful living'
    ],
    q: [
      ['Lizbeth’s guidance through my career and personal pivot was nothing short of life-saving.', 'Listener, Seattle'],
      ['Incredible clarity on how to hold space for yourself during times of intense change.', 'Listener, Portland']
    ]
  },
  {
    img: 'Mary Ann Francis',
    g: 'Mary Ann Francis',
    f: 'Mary Ann',
    r: 'Executive Strategist | Global Payments & Strategic Initiatives | ABA Top 20 Women in Payments',
    o: 'Global Payments & Strategic Initiatives LLC',
    n: 'The Global Payments Ecosystem: Making the Complicated Simple',
    c: 'Global Payments, Treasury & FinTech Strategy',
    m: 48,
    tags: ['Global Payments', 'Treasury', 'FinTech', 'Commercial Banking', 'Strategy'],
    bio: 'Mary Ann Francis is a globally respected and awarded thought leader, executive strategist, and mentor in the financial services industry, recognized among the ABA Top 20 Most Influential Women in Payments and as a Money20/20 Gold Visionary.\n\nWith over 35 years of leadership across retail and commercial banking, she served as Global Head of Trade & Treasury for what is now a top-5 US bank and led strategy and product divisions at Symcor, Wipro, DXC, and IBM Global Payments. Renowned as an expert at "making the complicated simple," Mary Ann advises global financial institutions, boards, and FinTech ecosystems on modern payment architectures, trade, FX, and cash management.',
    tk: [
      'Demystifying global payments infrastructure: treasury, FX, and cash management',
      'Strategic modernization: transitioning legacy banking into agile FinTech ecosystems',
      'Executive leadership lessons from 35+ years at the helm of commercial banking'
    ],
    q: [
      ['Mary Ann has the rare superpower of making the most complex payment systems instantly understandable.', 'Listener, New York'],
      ['A masterclass from one of the most influential minds in global treasury and banking.', 'Listener, London']
    ]
  },
  {
    img: 'Michele LaFemina',
    g: 'Michele LaFemina',
    f: 'Michele',
    r: 'Clinical Director | Author & Keynote Speaker | Breaking Barriers Through Grit, Building Bridges Through Grace',
    o: 'Clinical Director & Leadership Consultant',
    n: 'Grit & Grace: Breaking Barriers & Building Bridges',
    c: 'Clinical Leadership, Resilience & Empathy',
    m: 43,
    tags: ['Clinical Leadership', 'Resilience', 'Grit & Grace', 'Mental Health', 'Empowerment'],
    bio: 'Michele LaFemina is an experienced Clinical Director, author, and keynote speaker dedicated to breaking barriers through grit and building bridges through grace.\n\nWith extensive clinical leadership and advocacy experience, Michele champions resilience, empathetic communication, and organizational healing. She empowers healthcare teams, leaders, and communities to overcome adversity, dismantle systemic barriers, and cultivate compassionate, high-trust environments where people can thrive.',
    tk: [
      'Balancing grit and grace: leading through adversity with fierce compassion',
      'Clinical leadership strategies for building psychological safety and trust',
      'Breaking interpersonal barriers and building bridges in high-stress environments'
    ],
    q: [
      ['Michele’s concept of Grit and Grace gave our entire leadership team a fresh perspective.', 'Listener, Philadelphia'],
      ['Inspirational, grounded, and deeply human. A must-listen conversation.', 'Listener, Washington DC']
    ]
  },
  {
    img: 'Paula Andersen',
    g: 'Paula Andersen',
    f: 'Paula',
    r: 'Transformational Facilitator for Women in Leadership | Founder, C.O.R.E. Upgrade',
    o: 'Founder, C.O.R.E. Upgrade',
    n: 'Lead From Within: The C.O.R.E. Upgrade for Conscious Leadership',
    c: 'Conscious Leadership & Self-Transformation',
    m: 46,
    tags: ['Women in Leadership', 'C.O.R.E. Upgrade', 'Conscious Leadership', 'Self-Transformation', 'Resilience'],
    bio: 'Paula Andersen is the creator of the C.O.R.E. Upgrade framework, empowering high-achieving women to transform internal patterns, lead with unshakeable clarity, and unlock their full leadership potential.\n\nHer work bridges self-leadership, personal transformation, and conscious leadership—helping women navigate an accelerating world with authenticity and alignment. Through keynotes and immersion experiences, Paula equips leaders to move beyond pressure-driven performance, embrace intentional leadership, and cultivate presence and resilience.',
    tk: [
      'The C.O.R.E. Upgrade framework: dismantling internal patterns of pressure-driven performance',
      'Cultivating conscious presence, alignment, and authentic authority in leadership',
      'Sustaining personal resilience and clarity in rapidly accelerating corporate environments'
    ],
    q: [
      ['Paula’s C.O.R.E. Upgrade completely shifted my relationship with leadership and pressure.', 'Listener, Copenhagen'],
      ['The most grounding, empowering conversation on leading from within.', 'Listener, Stockholm']
    ]
  },
  {
    img: 'Pauline Corea',
    g: 'Pauline Corea',
    f: 'Pauline',
    r: 'Founder, Sayaga Wellness | Master Hypnotherapist & NLP Trainer | Transformational Practitioner',
    o: 'Founder, Sayaga Wellness',
    n: 'The Subconscious Blueprint: Rewriting Beliefs with Hypnotherapy & NLP',
    c: 'Subconscious Reprogramming & Transformational Wellbeing',
    m: 45,
    tags: ['Hypnotherapy', 'NLP', 'Time Line Therapy', 'Subconscious Mind', 'Wellbeing'],
    bio: 'Pauline Corea is a Sydney, Australia-based hypnotherapist, trainer, and transformational practitioner, and the founder of Sayaga Wellness.\n\nHer practice integrates clinical hypnotherapy, Neuro-Linguistic Programming (NLP), Time Line Therapy®, and transformational wellbeing. A certified Master Practitioner through The Tad James Co and a Heal Your Life workshop leader, Pauline empowers individuals to explore subconscious beliefs, resolve emotional imprints, and cultivate lasting self-awareness and personal freedom.',
    tk: [
      'Harnessing the subconscious mind to dismantle limiting belief patterns',
      'Integrating Neuro-Linguistic Programming (NLP) and Time Line Therapy®',
      'Practical daily rituals for emotional alignment and self-empowerment'
    ],
    q: [
      ['Pauline has an incredible ability to help you access and heal subconscious blocks.', 'Listener, Sydney'],
      ['A transformative episode that demystifies hypnotherapy and emotional healing.', 'Listener, Brisbane']
    ]
  },
  {
    img: 'Phoebe Wasfy',
    g: 'Phoebe Wasfy',
    f: 'Phoebe',
    r: 'Principal, Philopateer Christian College | Maxwell Leadership Certified Speaker & Coach',
    o: 'Principal, Philopateer Christian College (Ontario, Canada)',
    n: 'Servant Leadership, Resilience & Empowering Future Generations',
    c: 'Educational Leadership & Youth Empowerment',
    m: 46,
    tags: ['Educational Leadership', 'Maxwell Leadership', 'Youth Empowerment', 'Servant Leadership', 'Resilience'],
    bio: 'Phoebe Wasfy is the Principal of Philopateer Christian College in Ontario, Canada, with over 25 years of experience in school leadership, educational development, and mentorship. A certified member of the Maxwell Leadership Team, she has built award-winning campus cultures rooted in excellence, resilience, servant leadership, and student empowerment.\n\nUnder her leadership, the college expanded across multiple physical campuses and established an accredited global online high school. An internationally recognized keynote speaker, Phoebe leads global partnerships and educational initiatives designed to nurture character, purpose, and future-ready leadership in the next generation.',
    tk: [
      'The foundations of servant leadership and building values-driven school cultures',
      'Empowering the next generation through global educational partnerships and mentorship',
      'Cultivating resilience, character, and vision in rapidly evolving academic landscapes'
    ],
    q: [
      ['Phoebe’s philosophy on servant leadership is deeply inspiring and actionable.', 'Listener, Toronto'],
      ['A phenomenal educator who proves that values-driven leadership transforms lives.', 'Listener, Montreal']
    ]
  },
  {
    img: 'Rebecca Dillon',
    g: 'Rebecca Dillon',
    f: 'Rebecca',
    r: 'Career Coach | Centrepoint Career Coaching (UK) | Inclusive Career Development',
    o: 'Career Coach, Centrepoint Career Coaching',
    n: 'Navigating Career Crossroads: Strength, Purpose & Confidence',
    c: 'Career Development & Inclusive Coaching',
    m: 42,
    tags: ['Career Coaching', 'Confidence', 'Professional Growth', 'Inclusive Development', 'Mentorship'],
    bio: 'Rebecca Dillon is an empowering Career Coach at Centrepoint Career Coaching in the United Kingdom. She is dedicated to helping individuals identify their inherent strengths, cultivate unshakable self-confidence, and pursue fulfilling, high-impact careers.\n\nThrough a compassionate, people-centered approach, Rebecca guides clients through career pivots, dismantling self-doubt and institutional barriers. She champions inclusive career development, equipping emerging and seasoned professionals to navigate their paths with clarity, resilience, and genuine purpose.',
    tk: [
      'Recognizing your core strengths and converting them into professional confidence',
      'Overcoming imposter syndrome and navigating critical career transitions',
      'Building an inclusive, purpose-aligned blueprint for sustainable career success'
    ],
    q: [
      ['Rebecca helped me uncover strengths I didn’t even realize I had. Truly transformative.', 'Listener, London'],
      ['The most encouraging, practical career conversation you will hear this year.', 'Listener, Manchester']
    ]
  },
  {
    img: 'Sharon Josef. Ph.D',
    g: 'Sharon Josef, Ph.D.',
    f: 'Sharon',
    r: 'Life Coach through Channeling, Teacher & Healer | Animal Communicator & Intuitive at MLC',
    o: 'Life Coach, Teacher & Intuitive Practitioner, MLC',
    n: 'Intuitive Channeling, Energy Healing & Interspecies Communication',
    c: 'Intuitive Coaching, Healing & Animal Communication',
    m: 43,
    tags: ['Intuitive Coaching', 'Energy Healing', 'Animal Communication', 'Spiritual Teacher', 'Channeling'],
    bio: 'Sharon Josef, Ph.D. is an intuitive life coach, spiritual teacher, energy healer, animal communicator, and psychic practitioner at MLC.\n\nWorking through intuitive channeling, energetic alignment, and profound interspecies communication, Dr. Sharon guides individuals to reconnect with their innate intuitive wisdom, heal deep emotional wounds, and bridge harmonious, empathetic bonds with both people and animal companions.',
    tk: [
      'Understanding intuitive channeling as a grounded tool for personal healing and guidance',
      'The sacred art and practice of interspecies communication and animal empathy',
      'Reconnecting with your intuitive wisdom and clearing persistent energetic blocks'
    ],
    q: [
      ['Dr. Sharon’s intuitive reading brought me a level of peace I hadn’t felt in years.', 'Listener, Los Angeles'],
      ['A breathtaking episode on animal communication and deep energetic healing.', 'Listener, Sedona']
    ]
  },
  {
    img: 'Vanessa Hariparsad',
    g: 'Vanessa Hariparsad, MBA, PCC',
    f: 'Vanessa',
    r: 'Award-Winning Leadership & Resilience Coach | Founder & CEO, Shankara People Solutions',
    o: 'Founder & CEO, Shankara People Solutions',
    n: 'Building Resilient Leaders Through Neuroscience & Self-Awareness',
    c: 'Neuroscience-Informed Leadership & Workplace Wellbeing',
    m: 46,
    tags: ['Resilient Leadership', 'Neuroscience', 'Workplace Wellbeing', 'Executive Coaching', 'Organizational Culture'],
    bio: 'Vanessa Hariparsad, MBA, PCC, is a multiple global award-winning transformational leadership and resilience coach, international keynote speaker, Global Advisory Board member, and the founder and CEO of Shankara People Solutions.\n\nSpecializing in building resilient leaders through applied neuroscience, Vanessa works with executives, multinational teams, and organizations to strengthen self-awareness, elevate workplace wellbeing, and foster inclusive, high-performance cultures that thrive amid complexity and change.',
    tk: [
      'Applying neuroscience-informed coaching to build deep emotional resilience in leaders',
      'Fostering psychological safety, inclusion, and high performance in workplace cultures',
      'Strengthening self-awareness and cognitive agility in high-stakes environments'
    ],
    q: [
      ['Vanessa’s neuroscience approach to resilience completely transformed how I lead under pressure.', 'Listener, Johannesburg'],
      ['A truly masterclass episode on authentic leadership and workplace wellbeing.', 'Listener, Cape Town']
    ]
  },
]

// Episodes (one per speaker). Title falls back to the speaker's name until a real title is added.
export const E = SPEAKERS.map((s, i) => ({
  n: s.n || s.g, g: s.g, f: s.f, img: IMGS[s.img], c: s.c || '', m: s.m || 0, y: s.y || '2026',
  b: s.b || TINTS[i % TINTS.length], q: s.q || [],
}))

// Speaker profiles (same order as E). `up` = upcoming sessions shown on the profile and in "Coming up".
export const S = SPEAKERS.map((s) => ({
  r: s.r || '', o: s.o || '', bio: s.bio || '', tags: s.tags || [], tk: s.tk || [], up: s.up || [],
}))

export const P = [
  ['Like sitting on the sofa twenty minutes before the keynote.', 'Listener, Lisbon'],
  ['I rewrote my opening line after one of these episodes.', 'Listener, Austin'],
  ['The only podcast I replay before I speak.', 'Listener, Mumbai'],
  ['Honest, unpolished, and exactly what first-timers need.', 'Listener, Berlin'],
  ['Short clips on the commute, full tapes on the weekend.', 'Listener, Toronto'],
]

export const CREDITS = [['Host', 'Maya Linden'], ['Producer', 'Sam Okoye'], ['Guest', E[0].g], ['Editor', 'Nora Feld'], ['Sound', 'Theo Bright'], ['Recorded at', 'Dr. P Podcast Studio']]
export const GALLERY = ['#2a3b40', '#3a2c28', '#1f2c33', '#45342e', '#243038', '#3a3a34']
export const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0')
