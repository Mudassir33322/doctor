import {
  Dentist,
  Service,
  Patient,
  Appointment,
  TreatmentPlan,
  Invoice,
  PaymentRecord,
  FollowUp,
  Lead,
  PatientReview,
  BlogPost,
  ClinicCMSConfig,
  AuditLog,
  User,
} from '../types';

export const initialCMSConfig: ClinicCMSConfig = {
  clinicName: 'SMILORA Dental Care',
  tagline: 'Healthy Smiles. Confident Lives.',
  phone: '+92 42 3578 9100',
  emergencyPhone: '+92 300 847 2299',
  whatsapp: '+92 300 847 2299',
  email: 'care@smiloradental.com',
  address: 'Suite 402, Al-Hafeez Heights, Gulberg III, Lahore, Pakistan',
  branchWestAddress: 'Phase 5 Commercial Avenue, DHA, Lahore, Pakistan',
  openingHours: 'Mon - Sat: 9:00 AM - 9:00 PM | Sun: 11:00 AM - 5:00 PM',
  heroHeadline: 'Your Smile Deserves Expert Care.',
  heroSubheadline: 'Modern dentistry, personalized treatment plans, and compassionate dental specialists under one roof.',
  announcementText: 'Now open in DHA Phase 5! Schedule your comprehensive smile assessment today.',
  announcementActive: true,
};

export const defaultUsers: User[] = [
  { id: 'usr-admin', name: 'Dr. Tariq Al-Hassan', email: 'admin@smiloradental.com', role: 'super_admin' },
  { id: 'usr-clinic', name: 'Nadia Kamran', email: 'manager@smiloradental.com', role: 'clinic_admin' },
  { id: 'usr-reception', name: 'Zeeshan Latif', email: 'frontdesk@smiloradental.com', role: 'receptionist' },
  { id: 'usr-dentist-1', name: 'Dr. Sarah Ahmed', email: 'dr.sarah@smiloradental.com', role: 'dentist', dentistId: 'dent-1' },
  { id: 'usr-dentist-2', name: 'Dr. Hamza Khan', email: 'dr.hamza@smiloradental.com', role: 'dentist', dentistId: 'dent-2' },
  { id: 'usr-accountant', name: 'Farhan Sheikh', email: 'accounts@smiloradental.com', role: 'accountant' },
  { id: 'usr-content', name: 'Mahnoor Ali', email: 'content@smiloradental.com', role: 'content_manager' },
  { id: 'usr-patient-1', name: 'Omar Farooq', email: 'omar.farooq@example.com', role: 'patient', patientId: 'pat-1', phone: '+92 321 4455667' },
];

export const sampleDentists: Dentist[] = [
  {
    id: 'dent-1',
    slug: 'dr-sarah-ahmed',
    name: 'Dr. Sarah Ahmed',
    title: 'BDS, MSc Cosmetic & Restorative Dentistry (UK)',
    specialty: 'Cosmetic Dentistry & Smile Design',
    qualification: 'King’s College London Alumni, Certified Digital Smile Architect',
    experienceYears: 10,
    languages: ['English', 'Urdu', 'Punjabi'],
    bio: 'Specializing in minimally invasive porcelain veneers, composite bonding, and full-mouth aesthetic rehabilitations with over a decade of clinical precision.',
    servicesOffered: ['srv-whitening', 'srv-cosmetic', 'srv-checkup', 'srv-fillings', 'srv-crowns'],
    image: '/assets/images/dentist_doctor_lead_1791148494509.jpg',
    rating: 4.9,
    reviewCount: 148,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00 AM', end: '05:00 PM' },
    location: 'Gulberg Main Branch',
    featured: true,
    status: 'active',
  },
  {
    id: 'dent-2',
    slug: 'dr-hamza-khan',
    name: 'Dr. Hamza Khan',
    title: 'BDS, FCPS Oral & Maxillofacial Surgery',
    specialty: 'Implantology & Surgical Extractions',
    qualification: 'Fellow of College of Physicians and Surgeons Pakistan, ITI Member',
    experienceYears: 12,
    languages: ['English', 'Urdu', 'Pashto'],
    bio: 'Expert in guided 3D dental implant placements, bone grafting, and gentle surgical wisdom tooth extractions with conscious sedation options.',
    servicesOffered: ['srv-implants', 'srv-wisdom', 'srv-emergency', 'srv-crowns', 'srv-bridges'],
    image: '/assets/images/dentist_doctor_lead_1791148494509.jpg',
    rating: 4.95,
    reviewCount: 182,
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    workingHours: { start: '11:00 AM', end: '07:00 PM' },
    location: 'Gulberg Main Branch & DHA',
    featured: true,
    status: 'active',
  },
  {
    id: 'dent-3',
    slug: 'dr-ayesha-malik',
    name: 'Dr. Ayesha Malik',
    title: 'BDS, MOrth (RCSEd), Invisalign Certified',
    specialty: 'Orthodontics & Clear Aligners',
    qualification: 'Royal College of Surgeons Edinburgh, Diamond Invisalign Provider',
    experienceYears: 8,
    languages: ['English', 'Urdu'],
    bio: 'Dedicated to designing balanced occlusions and harmonic facial profiles for teens and adults through discreet aligner therapy and precision bracket systems.',
    servicesOffered: ['srv-braces', 'srv-aligners', 'srv-checkup'],
    image: '/assets/images/dentist_doctor_lead_1791148494509.jpg',
    rating: 4.88,
    reviewCount: 116,
    workingDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    workingHours: { start: '10:00 AM', end: '06:00 PM' },
    location: 'DHA Phase 5 Branch',
    featured: true,
    status: 'active',
  },
  {
    id: 'dent-4',
    slug: 'dr-bilal-tariq',
    name: 'Dr. Bilal Tariq',
    title: 'BDS, FCPS Endodontics',
    specialty: 'Microscopic Endodontics (Root Canal)',
    qualification: 'Certified Micro-Endodontist, Specialist in Single-Visit Painless RCT',
    experienceYears: 9,
    languages: ['English', 'Urdu'],
    bio: 'Utilizes high-magnification surgical operating microscopes and rotary nickel-titanium instrumentation for painless, long-lasting root canal therapies.',
    servicesOffered: ['srv-root-canal', 'srv-emergency', 'srv-fillings', 'srv-crowns'],
    image: '/assets/images/dentist_doctor_lead_1791148494509.jpg',
    rating: 4.92,
    reviewCount: 134,
    workingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    workingHours: { start: '01:00 PM', end: '09:00 PM' },
    location: 'Gulberg Main Branch',
    featured: false,
    status: 'active',
  },
  {
    id: 'dent-5',
    slug: 'dr-zainab-farooq',
    name: 'Dr. Zainab Farooq',
    title: 'BDS, MSc Pediatric Dentistry',
    specialty: 'Pediatric Dentistry & Preventive Care',
    qualification: 'Specialist in Child Behavior Guidance and Preventive Dental Health',
    experienceYears: 7,
    languages: ['English', 'Urdu'],
    bio: 'Creates joyful, fear-free clinic experiences for infants, children, and young adolescents with gentle touch, fluoride therapies, and space maintainers.',
    servicesOffered: ['srv-pediatric', 'srv-cleaning', 'srv-checkup', 'srv-fillings'],
    image: '/assets/images/dentist_doctor_lead_1791148494509.jpg',
    rating: 4.96,
    reviewCount: 94,
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    workingHours: { start: '09:00 AM', end: '04:00 PM' },
    location: 'DHA Phase 5 Branch',
    featured: false,
    status: 'active',
  },
  {
    id: 'dent-6',
    slug: 'dr-usman-riaz',
    name: 'Dr. Usman Riaz',
    title: 'BDS, Dip Periodontology (Bern, Switzerland)',
    specialty: 'Periodontics & Gum Health',
    qualification: 'Certified Laser Periodontist and Soft Tissue Regeneration Specialist',
    experienceYears: 11,
    languages: ['English', 'Urdu', 'Punjabi'],
    bio: 'Focused on treating gingivitis, advanced periodontitis, gum recession, and cosmetic gummy smiles using minimally invasive laser technology.',
    servicesOffered: ['srv-gum', 'srv-cleaning', 'srv-checkup', 'srv-implants'],
    image: '/assets/images/dentist_doctor_lead_1791148494509.jpg',
    rating: 4.87,
    reviewCount: 89,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    workingHours: { start: '10:00 AM', end: '06:00 PM' },
    location: 'Gulberg Main Branch',
    featured: false,
    status: 'active',
  },
];

export const sampleServices: Service[] = [
  {
    id: 'srv-checkup',
    slug: 'dental-checkup',
    name: 'Comprehensive Dental Checkup',
    category: 'Preventive & Diagnostics',
    shortDescription: 'In-depth digital exam including 3D intraoral scan, high-definition digital X-rays, and oral cancer screening.',
    fullDescription: 'Our foundational examination includes digital intraoral diagnostics, periodontal depth charting, cavity risk assessment, and personalized preventative counseling to identify issues before symptoms arise.',
    durationMinutes: 30,
    startingPrice: 3500,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Full digital mouth mapping', 'Zero-radiation intraoral imaging', 'Early cavity & gum disease detection', 'Bespoke preventive plan'],
    processSteps: [
      { step: 1, title: 'Medical & Dental Review', description: 'Discussion of current symptoms, habits, and dental health goals.' },
      { step: 2, title: 'Digital Visual & Sensor Scan', description: 'Intraoral 3D photography and low-dose digital radiographic imaging.' },
      { step: 3, title: 'Gingival & Structural Charting', description: 'Measuring gum pocket depths and checking existing restorations.' },
      { step: 4, title: 'Doctor Consultation & Report', description: 'Reviewing findings on-screen with customized care recommendations.' },
    ],
    faqs: [
      { question: 'How often should I get a dental checkup?', answer: 'We advise routine checkups every 6 months for adults and children to maintain optimal oral health.' },
      { question: 'Are dental X-rays safe?', answer: 'Yes, our digital sensors reduce radiation exposure by up to 90% compared to traditional film X-rays.' },
    ],
    iconName: 'Stethoscope',
  },
  {
    id: 'srv-cleaning',
    slug: 'teeth-cleaning',
    name: 'Professional Teeth Cleaning & Scaling',
    category: 'Preventive & Diagnostics',
    shortDescription: 'Ultrasonic calculus removal, deep stain polishing, and remineralizing fluoride therapy for fresh, protected teeth.',
    fullDescription: 'Gentle ultrasonic scaling eliminates hardened tartar and bacterial biofilm from hard-to-reach subgingival spaces, followed by micro-polishing to restore natural tooth enamel smoothness.',
    durationMinutes: 45,
    startingPrice: 6500,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Removes stubborn coffee & tea stains', 'Stops bleeding gums and halitosis', 'Prevents bone loss and periodontal damage', 'Leaves teeth feeling ultra smooth'],
    processSteps: [
      { step: 1, title: 'Plaque & Tartar Assessment', description: 'Inspecting supragingival and subgingival calculus buildup.' },
      { step: 2, title: 'Ultrasonic Piezo Scaling', description: 'Water-cooled ultrasonic vibrations gently dislodge hardened calculus.' },
      { step: 3, title: 'Prophy-Jet Micro-Air Polishing', description: 'Gentle buffing with specialized paste to remove surface stains.' },
      { step: 4, title: 'Fluoride Shield Application', description: 'Protective mineral glaze to strengthen enamel and prevent sensitivity.' },
    ],
    faqs: [
      { question: 'Does professional teeth cleaning weaken enamel?', answer: 'No, ultrasonic scaling only removes harmful calculus deposits without scratching natural enamel.' },
      { question: 'Will I feel pain during cleaning?', answer: 'Most patients feel zero pain, only mild vibration. We also offer topical desensitizing gel for sensitive gums.' },
    ],
    iconName: 'Sparkles',
  },
  {
    id: 'srv-whitening',
    slug: 'teeth-whitening',
    name: 'In-Clinic Laser Teeth Whitening',
    category: 'Cosmetic Dentistry',
    shortDescription: 'Brighten your smile up to 8 shades in a single 60-minute session with advanced cold-light LED activation.',
    fullDescription: 'Our premier cosmetic teeth whitening protocol pairs medical-grade carbamide/hydrogen peroxide formulations with cold-light photoactivation to dissolve deep-seated intrinsic stains without causing nerve trauma.',
    durationMinutes: 60,
    startingPrice: 28000,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Up to 8 shades lighter in 60 minutes', 'Specialized gingival barrier prevents gum burn', 'Includes desensitizing post-treatment glaze', 'Includes custom home touch-up maintenance kit'],
    processSteps: [
      { step: 1, title: 'Shade Matching & Photography', description: 'Recording baseline enamel shade using high-precision VITA guides.' },
      { step: 2, title: 'Gingival Barrier Application', description: 'Careful isolation and light-cured protection of your delicate gum tissue.' },
      { step: 3, title: 'Whitening Gel & LED Cycles', description: '3 to 4 sequential 15-minute cycles under our cool dental activation lamp.' },
      { step: 4, title: 'Post-Whitening Nourishing Glaze', description: 'Applying potassium nitrate and fluoride to prevent thermal sensitivity.' },
    ],
    faqs: [
      { question: 'How long do whitening results last?', answer: 'With good oral hygiene and moderate coffee/tea intake, results typically last 12 to 24 months.' },
      { question: 'Will my teeth feel sensitive afterwards?', answer: 'Mild sensitivity may occur for 24 hours. Our included remineralization serum resolves this rapidly.' },
    ],
    iconName: 'Sun',
  },
  {
    id: 'srv-root-canal',
    slug: 'root-canal-treatment',
    name: 'Microscopic Root Canal Treatment',
    category: 'Endodontics',
    shortDescription: 'Single-visit pain relief using digital rotary files, continuous irrigation, and 3D biocompatible obturation.',
    fullDescription: 'Save infected or severely decayed teeth from extraction. Under high surgical magnification, infected pulp tissue is thoroughly cleansed, disinfected, and hermetically sealed to preserve your natural tooth root for life.',
    durationMinutes: 60,
    startingPrice: 18000,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Instant relief from throbbing dental pain', 'Preserves your natural tooth root and bone height', 'Single-visit modern rotary protocol', 'Performed under high-definition surgical microscope'],
    processSteps: [
      { step: 1, title: 'Painless Local Anesthesia', description: 'Computer-controlled local numbing ensures absolute comfort.' },
      { step: 2, title: 'Microscopic Canal Access', description: 'Isolating the tooth with dental dam and opening minute canal paths.' },
      { step: 3, title: 'Rotary Cleaning & Disinfection', description: 'Flexible titanium instruments eliminate all bacteria and tissue.' },
      { step: 4, title: 'Warm 3D Gutta-Percha Sealing', description: 'Hermetically sealing canals with biocompatible sealer to stop reinfection.' },
    ],
    faqs: [
      { question: 'Is root canal treatment painful?', answer: 'Modern anesthesia and rotary technology make the procedure as comfortable as getting a routine filling.' },
      { question: 'Do I need a crown after a root canal?', answer: 'Yes, treated teeth lose moisture and become brittle; a crown protects against structural fracture.' },
    ],
    iconName: 'Activity',
  },
  {
    id: 'srv-implants',
    slug: 'dental-implants',
    name: 'Precision 3D Guided Dental Implants',
    category: 'Implantology',
    shortDescription: 'Permanent titanium tooth root replacement with custom zirconia crowns for lifelong chewing strength and aesthetics.',
    fullDescription: 'The gold standard for missing teeth. Using 3D cone-beam computed tomography (CBCT) and surgical guide templates, we place biocompatible Swiss/German titanium implants with sub-millimeter surgical accuracy.',
    durationMinutes: 75,
    startingPrice: 95000,
    priceType: 'consultation_required',
    featured: true,
    active: true,
    benefits: ['Looks, feels, and chews exactly like a natural tooth', 'Prevents jawbone shrinkage and facial collapse', 'Does not grind down adjacent healthy teeth', 'Lifetime manufacturer warranty on implant fixtures'],
    processSteps: [
      { step: 1, title: 'CBCT 3D Bone Scan & Planning', description: 'Digital evaluation of bone density and vital nerve anatomy.' },
      { step: 2, title: 'Computer-Guided Placement', description: 'Minimally invasive insertion of titanium implant fixture.' },
      { step: 3, title: 'Osseointegration Healing', description: 'Natural biological fusion of implant with bone over 8 to 12 weeks.' },
      { step: 4, title: 'Custom Zirconia Crown Delivery', description: 'Affixing permanent handcrafted ceramic crown matching adjacent teeth.' },
    ],
    faqs: [
      { question: 'Who is a good candidate for dental implants?', answer: 'Anyone with healthy gums and sufficient jawbone density. Bone grafts are available if bone is deficient.' },
      { question: 'How long do dental implants last?', answer: 'With regular hygiene and checkups, dental implants have a clinical success rate >98% and can last a lifetime.' },
    ],
    iconName: 'ShieldCheck',
  },
  {
    id: 'srv-aligners',
    slug: 'clear-aligners',
    name: 'Invisalign & Clear Aligners',
    category: 'Orthodontics',
    shortDescription: 'Virtually invisible removable aligners that straighten crooked teeth without metal wires or food restrictions.',
    fullDescription: 'Custom-manufactured clear plastic aligners that apply calculated micro-forces to reposition teeth gradually. Removable for eating, brushing, and special events.',
    durationMinutes: 45,
    startingPrice: 180000,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Nearly invisible in daily conversation', 'Removable for easy brushing and unrestricted dining', 'Fewer clinic visits than traditional brackets', 'Preview your final smile in 3D before starting'],
    processSteps: [
      { step: 1, title: 'iTero 3D Digital Scan', description: 'Scanning full dental arches without messy impression putty.' },
      { step: 2, title: 'ClinCheck 3D Simulation', description: 'Interactive visual preview mapping every tooth movement and timeline.' },
      { step: 3, title: 'Aligner Trays Delivery', description: 'Receiving your custom medical-grade SmartTrack aligner series.' },
      { step: 4, title: 'Progress Checks & Refinement', description: 'Brief check-ins every 6–8 weeks to verify optimal tracking.' },
    ],
    faqs: [
      { question: 'How many hours a day must I wear aligners?', answer: 'Aligners must be worn 20 to 22 hours daily, removing only for meals and brushing.' },
      { question: 'How long does clear aligner treatment take?', answer: 'Most cases take between 6 to 14 months depending on individual tooth movement complexity.' },
    ],
    iconName: 'Smile',
  },
  {
    id: 'srv-braces',
    slug: 'braces',
    name: 'Advanced Orthodontic Braces',
    category: 'Orthodontics',
    shortDescription: 'Ceramic clear or low-profile metallic brackets for complex bite corrections, crowding, and jaw alignments.',
    fullDescription: 'Comprehensive fixed orthodontic therapy utilizing self-ligating low-friction brackets and shape-memory archwires for efficient tooth movement in teens and adults.',
    durationMinutes: 60,
    startingPrice: 120000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Resolves severe crowding and jaw discrepancies', 'Choice of tooth-colored ceramic or sleek metal brackets', 'Predictable long-term structural bite stability', 'Flexible zero-interest monthly installment plans'],
    processSteps: [
      { step: 1, title: 'Cephalometric Analysis', description: 'Measuring facial bone angles and dental relationships.' },
      { step: 2, title: 'Precision Bracket Bonding', description: 'Adhering brackets onto tooth enamel with light-cured adhesive.' },
      { step: 3, title: 'Archwire Adjustments', description: 'Periodic tightening and wire sequencing every 4 to 6 weeks.' },
      { step: 4, title: 'Debonding & Retainer Fit', description: 'Removing brackets, polishing enamel, and fitting clear retainers.' },
    ],
    faqs: [
      { question: 'At what age can braces be started?', answer: 'Consultations can begin from age 7, but active treatment usually begins between ages 11 and 15, or any time in adulthood.' },
    ],
    iconName: 'Grid',
  },
  {
    id: 'srv-fillings',
    slug: 'dental-fillings',
    name: 'Biocompatible Composite Tooth Fillings',
    category: 'Restorative Dentistry',
    shortDescription: 'Tooth-colored composite resins that bond seamlessly to treat cavities and replace obsolete dark amalgam.',
    fullDescription: 'Mercury-free nano-hybrid composite restorations that match your natural enamel hue and translucency precisely while reinforcing remaining tooth architecture.',
    durationMinutes: 40,
    startingPrice: 5000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Invisible tooth-colored aesthetic match', 'Chemically bonds to tooth structure for strength', 'Preserves more natural enamel than silver metal fillings', '100% mercury-free and biocompatible'],
    processSteps: [
      { step: 1, title: 'Decay Removal & Conditioning', description: 'Clearing bacterial decay and preparing microscopic enamel pores.' },
      { step: 2, title: 'Bonding Primer Application', description: 'Applying resin adhesive for strong chemical retention.' },
      { step: 3, title: 'Layered Resin Sculpting', description: 'Artfully sculpting anatomical tooth cusps and fissures.' },
      { step: 4, title: 'High-Gloss Polishing', description: 'Buffing margins for ultra-smooth tongue comfort and bite balance.' },
    ],
    faqs: [
      { question: 'Can I eat immediately after a composite filling?', answer: 'Yes, composite resin cures instantly under blue LED light, though we suggest waiting for anesthesia to wear off.' },
    ],
    iconName: 'CheckCircle',
  },
  {
    id: 'srv-crowns',
    slug: 'dental-crowns',
    name: 'High-Translucency Zirconia & E.max Crowns',
    category: 'Restorative Dentistry',
    shortDescription: 'Custom-milled ceramic caps that restore broken or root-canal treated teeth with life-like beauty and durability.',
    fullDescription: 'Custom-crafted by master dental ceramists using CAD/CAM multi-layered zirconia or lithium disilicate (E.max) to replicate natural tooth contour and chewing durability.',
    durationMinutes: 60,
    startingPrice: 22000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Zero dark metal margin at the gumline', 'Extreme fracture resistance and flexural strength', 'Custom shade gradations matching adjacent teeth', 'Precision optical digital scanning fit'],
    processSteps: [
      { step: 1, title: 'Tooth Preparation & Scan', description: 'Conservative shaping of tooth and high-resolution 3D optical scan.' },
      { step: 2, title: 'Temporary Protective Crown', description: 'Placement of a comfortable temporary cap while the lab mills the crown.' },
      { step: 3, title: 'Custom CAD/CAM Milling', description: 'Precision ceramic crafting matching exact shade and anatomy.' },
      { step: 4, title: 'Resin Bonding & Bite Check', description: 'Permanent cementation with microscopic margin verification.' },
    ],
    faqs: [
      { question: 'How long do zirconia crowns last?', answer: 'With good oral hygiene, zirconia and E.max crowns routinely last 15 to 25+ years.' },
    ],
    iconName: 'Crown',
  },
  {
    id: 'srv-bridges',
    slug: 'dental-bridges',
    name: 'Fixed Ceramic Dental Bridges',
    category: 'Restorative Dentistry',
    shortDescription: 'Non-removable aesthetic bridge units that bridge the gap created by one or more missing teeth.',
    fullDescription: 'Anchored onto neighboring healthy teeth or implants, fixed dental bridges restore chewing function and prevent neighboring teeth from tilting into empty spaces.',
    durationMinutes: 60,
    startingPrice: 45000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Restores chewing ability and speech clarity', 'Fixed in place (no removable dentures needed)', 'Maintains proper facial contours', 'Prevents neighboring teeth from shifting'],
    processSteps: [
      { step: 1, title: 'Abutment Preparation', description: 'Recontouring supporting teeth on either side of the space.' },
      { step: 2, title: 'Optical 3D Impression', description: 'Digital capture sent to digital milling laboratory.' },
      { step: 3, title: 'Temporary Bridge Fit', description: 'Protecting exposed teeth and preserving gum architecture.' },
      { step: 4, title: 'Final Cementation', description: 'Bonding the solid ceramic bridge and verifying contact tightness.' },
    ],
    faqs: [
      { question: 'How do I clean under a dental bridge?', answer: 'We demonstrate special floss threaders and interdental brushes to keep the underside clean.' },
    ],
    iconName: 'Layers',
  },
  {
    id: 'srv-pediatric',
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry & Kids Smile Care',
    category: 'Pediatric Care',
    shortDescription: 'Fun, gentle, stress-free dental visits for children, including preventive sealants, cavity fills, and habit coaching.',
    fullDescription: 'Designed around warmth and positive reinforcement, our pediatric suite ensures your child grows up loving the dentist. We prioritize early cavity prevention, fissure sealants, and healthy airway development.',
    durationMinutes: 40,
    startingPrice: 4000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Compassionate child-psychology trained specialists', 'Painless gentle techniques & tell-show-do approach', 'Cavity-stopping pit and fissure sealants', 'Prizes, stickers, and joyful certificate for every child'],
    processSteps: [
      { step: 1, title: 'Warm Welcome & Chair Tour', description: 'Introducing the child to the chair and instruments in playful terms.' },
      { step: 2, title: 'Gentle Plaque Count & Exam', description: 'Checking tooth eruption and counting little teeth.' },
      { step: 3, title: 'Gentle Cleaning & Polish', description: 'Flavored prophy paste polish for sparkling clean teeth.' },
      { step: 4, title: 'Protective Mineral Coating', description: 'Fluoride varnish application to shield growing enamel.' },
    ],
    faqs: [
      { question: 'When should a child first visit the dentist?', answer: 'The American and British Pediatric Dental Associations recommend a first visit by age 1 or when the first tooth appears.' },
    ],
    iconName: 'HeartHandshake',
  },
  {
    id: 'srv-cosmetic',
    slug: 'cosmetic-dentistry',
    name: 'Porcelain Veneers & Smile Makeover',
    category: 'Cosmetic Dentistry',
    shortDescription: 'Ultra-thin, handcrafted ceramic veneers that transform discolored, chipped, or uneven teeth into a magazine-worthy smile.',
    fullDescription: 'Bespoke smile design crafted by Dr. Sarah Ahmed. Custom porcelain facings (0.3mm to 0.5mm) bonded to front teeth to refine proportions, brightness, and symmetry.',
    durationMinutes: 90,
    startingPrice: 38000,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Customized to your facial geometry and lips', 'Stain-resistant high-luster porcelain', 'Corrects gaps, chips, uneven length, and dark tetracycline staining', 'Physical mock-up preview in your mouth before final placement'],
    processSteps: [
      { step: 1, title: 'Digital Smile Design & Photography', description: 'High-res portrait photography and 3D facial aesthetic analysis.' },
      { step: 2, title: 'Trial Smile Mockup', description: 'Testing the shape and smile line directly in your mouth.' },
      { step: 3, title: 'Micro-Preparation & Impression', description: 'Conservative enamel prep and high-accuracy optical scan.' },
      { step: 4, title: 'Permanent Veneer Bonding', description: 'Adhesive cementation under isolated rubber dam conditions.' },
    ],
    faqs: [
      { question: 'Do veneers ruin your natural teeth?', answer: 'Our ultra-thin prep technique preserves 90%+ of natural tooth enamel, ensuring long-term vitality.' },
    ],
    iconName: 'Sparkle',
  },
  {
    id: 'srv-gum',
    slug: 'gum-treatment',
    name: 'Laser Gum Therapy & Deep Scaling',
    category: 'Periodontics',
    shortDescription: 'Advanced treatment for bleeding gums, gingivitis, and bone-destroying periodontitis using gentle dental lasers.',
    fullDescription: 'Targeted deep periodontal debridement and diode laser bacterial decontamination to restore firm, healthy pink gums and stop progressive bone loss around teeth.',
    durationMinutes: 50,
    startingPrice: 12000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Stops chronic bleeding and foul breath', 'Reverses active pocket depth degeneration', 'Laser sterilization eliminates deep anaerobic bacteria', 'Promotes gum re-attachment to root surfaces'],
    processSteps: [
      { step: 1, title: 'Periodontal Pocket Depth Map', description: '6-point millimeter probing around each individual tooth.' },
      { step: 2, title: 'Deep Subgingival Root Planing', description: 'Micro-instrumentation smoothing calculus from tooth roots.' },
      { step: 3, title: 'Laser Bacterial Decontamination', description: 'Painless laser energy eliminating remaining pathogens.' },
      { step: 4, title: 'Antimicrobial Irrigation', description: 'Flushing pockets with chlorhexidine and healing peptide gels.' },
    ],
    faqs: [
      { question: 'Can loose teeth become firm again?', answer: 'With timely gum therapy, reducing inflammation and arresting bone loss frequently stabilizes loose teeth.' },
    ],
    iconName: 'Waves',
  },
  {
    id: 'srv-wisdom',
    slug: 'wisdom-tooth-treatment',
    name: 'Surgical Wisdom Tooth Removal',
    category: 'Oral Surgery',
    shortDescription: 'Safe, comfortable extraction of impacted, painful, or misaligned third molars with modern sedation options.',
    fullDescription: 'Impacted wisdom teeth can cause severe infection, damage adjacent molars, and shift orthodontic alignment. Our oral surgeons perform atraumatic surgical removals with rapid recovery protocols.',
    durationMinutes: 45,
    startingPrice: 15000,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Resolves swelling, lockjaw, and recurrent pericoronitis', 'Performed under profound local anesthesia or IV twilight sedation', 'Atraumatic surgical sectioning speeds post-op healing', 'Includes comprehensive post-operative prescription kit'],
    processSteps: [
      { step: 1, title: 'Panoramic 3D Nerve Assessment', description: 'Checking proximity of roots to the inferior alveolar nerve.' },
      { step: 2, title: 'Profound Surgical Anesthesia', description: 'Ensuring zero sensation during the entire procedure.' },
      { step: 3, title: 'Atraumatic Tooth Sectioning', description: 'Dividing tooth into small pieces for gentle socket release.' },
      { step: 4, title: 'Collagen Plug & Resorbable Sutures', description: 'Placing healing collagen and self-dissolving stitches.' },
    ],
    faqs: [
      { question: 'How long is recovery after wisdom tooth extraction?', answer: 'Most patients return to school or work within 2 to 3 days following our post-op protocol.' },
    ],
    iconName: 'Zap',
  },
  {
    id: 'srv-emergency',
    slug: 'emergency-dentistry',
    name: 'Same-Day Emergency Dental Care',
    category: 'Emergency Care',
    shortDescription: 'Urgent immediate care for severe toothaches, knocked-out teeth, broken crowns, dental trauma, and facial swelling.',
    fullDescription: 'Dental emergencies cannot wait. Our dedicated emergency slots ensure you are seen promptly by an experienced clinician to relieve acute pain, control bleeding, and stabilize dental trauma.',
    durationMinutes: 45,
    startingPrice: 5000,
    priceType: 'starting_from',
    featured: true,
    active: true,
    benefits: ['Guaranteed same-day priority appointments', 'Immediate diagnostic X-rays and pain relief', 'Trauma splinting for knocked-out or loose teeth', 'Direct line for out-of-hours dental guidance'],
    processSteps: [
      { step: 1, title: 'Immediate Triage & Pain Control', description: 'Rapid assessment and administration of targeted local pain relief.' },
      { step: 2, title: 'Urgent Digital Radiography', description: 'Pinpointing abscess, root fracture, or nerve involvement.' },
      { step: 3, title: 'Emergency Intervention', description: 'Drainage, nerve extirpation, temporary bonding, or tooth stabilization.' },
      { step: 4, title: 'Stabilization & Prescriptions', description: 'Prescription antibiotics/analgesics and permanent treatment plan.' },
    ],
    faqs: [
      { question: 'What should I do if a tooth is knocked out?', answer: 'Keep it moist in cold milk or saliva, do not touch the root, and reach our clinic within 60 minutes for highest re-implantation success.' },
    ],
    iconName: 'AlertTriangle',
  },
  {
    id: 'srv-general',
    slug: 'general-dentistry',
    name: 'General & Preventative Family Dentistry',
    category: 'General Care',
    shortDescription: 'Complete oral maintenance for the whole family, from routine checkups to nightguards and preventative seals.',
    fullDescription: 'Comprehensive oral healthcare providing conservative dental solutions, custom nightguards for teeth grinding (bruxism), mouthguards for sports, and customized maintenance schedules.',
    durationMinutes: 45,
    startingPrice: 4500,
    priceType: 'starting_from',
    featured: false,
    active: true,
    benefits: ['Whole-family preventive healthcare', 'Custom 3D nightguards for jaw clenching and headaches', 'Conservative treatment philosophy', 'Long-term maintenance tracking and automatic reminders'],
    processSteps: [
      { step: 1, title: 'Comprehensive Evaluation', description: 'Assessing teeth, jaw joints (TMJ), and soft tissues.' },
      { step: 2, title: 'Preventive Intervention', description: 'Fluoride, sealants, or minor restorative maintenance.' },
      { step: 3, title: 'Oral Hygiene Instruction', description: 'Tailoring flossing techniques and electric brush recommendations.' },
      { step: 4, title: '6-Month Recall Setup', description: 'Scheduling next preventive visit for continuous smile protection.' },
    ],
    faqs: [
      { question: 'Why do I wake up with jaw pain or headaches?', answer: 'You may be grinding or clenching teeth while sleeping. A custom digital nightguard prevents tooth wear and relaxes jaw muscles.' },
    ],
    iconName: 'UserCheck',
  },
];

// Helper to generate realistic sample patients
const sampleNames = [
  'Omar Farooq', 'Fatima Zahra', 'Bilal Mansoor', 'Amina Siddiqui', 'Hamza Tariq',
  'Zainab Qureshi', 'Usman Butt', 'Hira Nadeem', 'Saad Rafiq', 'Mariam Shah',
  'Ali Raza', 'Sana Mir', 'Danish Iqbal', 'Rabia Aslam', 'Mustafa Cheema',
  'Sara Bokhari', 'Waqas Javed', 'Noor Fatima', 'Ahsan Malik', 'Kiran Gillani',
  'Adnan Baig', 'Mehwish Hayat', 'Taimoor Alam', 'Zoya Paracha', 'Faisal Mehmood',
  'Ayesha Noman', 'Farrukh Zia', 'Bushra Rehman', 'Sikandar Hayat', 'Mahira Khan',
  'Haris Rauf', 'Kinza Hashmi', 'Shahid Afridi', 'Sadia Imam', 'Junaid Jamshed',
  'Nida Yasir', 'Atif Aslam', 'Momina Mustehsan', 'Fawad Khan', 'Sajal Aly',
  'Hassan Ali', 'Iqra Aziz', 'Yasir Hussain', 'Saboor Aly', 'Sheheryar Munawar',
  'Maya Ali', 'Mikaal Zulfiqar', 'Ayeza Khan', 'Danish Taimoor', 'Hania Aamir'
];

export const samplePatients: Patient[] = sampleNames.map((name, idx) => {
  const idNum = idx + 1;
  const isFemale = idx % 2 === 1;
  const year = 1975 + (idx % 25);
  const month = String((idx % 12) + 1).padStart(2, '0');
  const day = String((idx % 28) + 1).padStart(2, '0');
  const bloodGroups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-'];
  const allergiesList = ['Penicillin', 'Latex', 'Aspirin', 'Sulfa drugs', 'None reported'];

  return {
    id: `pat-${idNum}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: `+92 3${(10 + (idx % 35))} ${1000000 + idx * 13579}`.slice(0, 15),
    gender: isFemale ? 'Female' : 'Male',
    dob: `${year}-${month}-${day}`,
    bloodGroup: bloodGroups[idx % bloodGroups.length],
    allergies: idx % 4 === 0 ? [allergiesList[idx % allergiesList.length]] : ['None reported'],
    address: `House #${(idx * 7) % 150 + 12}, Street ${(idx % 15) + 1}, DHA Phase ${(idx % 8) + 1}, Lahore`,
    emergencyContact: {
      name: isFemale ? `${name.split(' ')[0]} Father/Spouse` : `${name.split(' ')[0]} Family Member`,
      relation: isFemale ? 'Spouse' : 'Brother',
      phone: `+92 300 ${(9000000 + idx * 7891).toString().slice(0, 7)}`,
    },
    createdAt: `2025-${String((idx % 11) + 1).padStart(2, '0')}-15`,
    lastVisit: `2026-09-${String((idx % 28) + 1).padStart(2, '0')}`,
    nextAppointment: idx % 3 === 0 ? `2026-10-${String((idx % 25) + 5).padStart(2, '0')}` : undefined,
    totalVisits: (idx % 7) + 1,
    status: 'active',
  };
});

// Helper to create 80 realistic appointments
export const sampleAppointments: Appointment[] = Array.from({ length: 80 }).map((_, idx) => {
  const idNum = idx + 1;
  const patient = samplePatients[idx % samplePatients.length];
  const dentist = sampleDentists[idx % sampleDentists.length];
  const service = sampleServices[idx % sampleServices.length];
  const times = ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:30 PM', '06:15 PM'];
  const timeSlot = times[idx % times.length];

  // Distribute across past 14 days, today (2026-10-04), and next 14 days
  let dateStr = '2026-10-04';
  let status: Appointment['status'] = 'confirmed';

  if (idx < 20) {
    // Past appointments
    const day = String(Math.max(1, 4 - (idx % 4) - 1)).padStart(2, '0');
    dateStr = `2026-10-${day}`;
    status = idx % 5 === 0 ? 'no_show' : idx % 6 === 0 ? 'cancelled' : 'completed';
  } else if (idx < 45) {
    // Today's appointments (2026-10-04)
    dateStr = '2026-10-04';
    if (idx < 25) status = 'completed';
    else if (idx < 30) status = 'in_consultation';
    else if (idx < 35) status = 'checked_in';
    else if (idx < 40) status = 'confirmed';
    else status = 'requested';
  } else {
    // Future appointments
    const day = String(5 + (idx % 20)).padStart(2, '0');
    dateStr = `2026-10-${day}`;
    status = idx % 8 === 0 ? 'requested' : 'confirmed';
  }

  const fee = service.startingPrice;
  const isPaid = status === 'completed' ? fee : idx % 2 === 0 ? 0 : fee / 2;

  return {
    id: `apt-${1000 + idNum}`,
    patientId: patient.id,
    patientName: patient.name,
    patientPhone: patient.phone,
    patientEmail: patient.email,
    isNewPatient: idx % 3 === 0,
    dentistId: dentist.id,
    dentistName: dentist.name,
    serviceId: service.id,
    serviceName: service.name,
    location: dentist.location,
    date: dateStr,
    timeSlot,
    status,
    reason: `Routine evaluation for ${service.name.toLowerCase()}`,
    notes: idx % 2 === 0 ? 'Patient requested morning slot; sensitivity reported on lower quadrant.' : undefined,
    createdAt: '2026-09-28T10:00:00Z',
    feeEstimated: fee,
    paidAmount: isPaid,
  };
});

// Sample Treatment Plans (25 realistic dental plans)
export const sampleTreatmentPlans: TreatmentPlan[] = Array.from({ length: 25 }).map((_, idx) => {
  const idNum = idx + 1;
  const patient = samplePatients[idx % 25];
  const dentist = sampleDentists[idx % sampleDentists.length];
  const titles = [
    'Comprehensive Full Smile Restoration',
    'Root Canal Therapy & Crown Restorations',
    'Invisalign Clear Aligner Orthodontic Plan',
    'Implant Fixed Molar Replacement Protocol',
    'Periodontal Laser Rehabilitation Program',
    'Cosmetic Porcelain Veneer Makeover (6 Units)',
    'Pediatric Cavity Arrest & Sealant Treatment',
    'Bite Realignment & Nightguard Protocol'
  ];
  const title = titles[idx % titles.length];
  const totalCost = 35000 + (idx * 8500);
  const visits = (idx % 4) + 2;
  const completed = Math.min(visits, (idx % 3));
  const statuses: TreatmentPlan['status'][] = ['proposed', 'accepted', 'in_progress', 'completed', 'in_progress'];

  return {
    id: `tp-${500 + idNum}`,
    patientId: patient.id,
    patientName: patient.name,
    dentistId: dentist.id,
    dentistName: dentist.name,
    title,
    diagnosis: 'Generalized mild chronic gingivitis, localized deep dentin carious lesions, and aesthetic shade disharmony.',
    totalCost,
    numberOfVisits: visits,
    completedVisits: completed,
    status: statuses[idx % statuses.length],
    items: [
      { id: `tpi-1`, procedureName: 'Digital CBCT 3D Diagnostic Mapping', estimatedCost: 4500, status: 'completed' },
      { id: `tpi-2`, procedureName: 'Ultrasonic Debridement & Laser Sterilization', estimatedCost: 8500, status: completed > 0 ? 'completed' : 'pending' },
      { id: `tpi-3`, procedureName: 'Composite Nano-Hybrid Restoration #16, #17', toothNumber: '#16', estimatedCost: 12000, status: completed > 1 ? 'completed' : 'pending' },
      { id: `tpi-4`, procedureName: 'Custom CAD/CAM Ceramic Crown Delivery', toothNumber: '#16', estimatedCost: 22000, status: completed >= visits ? 'completed' : 'pending' },
    ],
    createdAt: `2026-09-${String((idx % 20) + 1).padStart(2, '0')}`,
    updatedAt: '2026-10-02',
    notes: 'Patient advised to maintain strict chlorhexidine rinsing for 7 days post-treatment.',
  };
});

// 60 Invoices
export const sampleInvoices: Invoice[] = Array.from({ length: 60 }).map((_, idx) => {
  const idNum = idx + 1;
  const patient = samplePatients[idx % samplePatients.length];
  const dentist = sampleDentists[idx % sampleDentists.length];
  const service = sampleServices[idx % sampleServices.length];
  const subtotal = service.startingPrice;
  const discount = idx % 5 === 0 ? subtotal * 0.1 : 0;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% provincial sales tax
  const total = subtotal - discount + tax;

  const statuses: Invoice['status'][] = ['paid', 'paid', 'partial', 'pending', 'paid'];
  const status = statuses[idx % statuses.length];
  const paidAmount = status === 'paid' ? total : status === 'partial' ? Math.round(total / 2) : 0;
  const methods: Invoice['paymentMethod'][] = ['Cash', 'Card', 'Bank Transfer', 'Easypaisa', 'JazzCash'];

  return {
    id: `inv-${2000 + idNum}`,
    invoiceNumber: `SML-2026-${(100 + idNum).toString()}`,
    patientId: patient.id,
    patientName: patient.name,
    dentistId: dentist.id,
    dentistName: dentist.name,
    date: `2026-09-${String((idx % 25) + 1).padStart(2, '0')}`,
    dueDate: `2026-10-${String((idx % 25) + 5).padStart(2, '0')}`,
    items: [
      { id: `ii-1`, description: service.name, quantity: 1, unitPrice: subtotal, total: subtotal }
    ],
    subtotal,
    discount,
    tax,
    total,
    paidAmount,
    status,
    paymentMethod: status !== 'pending' ? methods[idx % methods.length] : undefined,
    paymentDate: status !== 'pending' ? '2026-10-01' : undefined,
  };
});

// 40 Payments
export const samplePayments: PaymentRecord[] = sampleInvoices.filter(i => i.paidAmount > 0).slice(0, 40).map((inv, idx) => ({
  id: `pay-${3000 + idx + 1}`,
  invoiceId: inv.id,
  invoiceNumber: inv.invoiceNumber,
  patientId: inv.patientId,
  patientName: inv.patientName,
  amount: inv.paidAmount,
  method: inv.paymentMethod || 'Card',
  date: `2026-09-${String((idx % 28) + 1).padStart(2, '0')}`,
  referenceNumber: `TXN-${880000 + idx * 37}`,
  status: 'completed',
}));

// Follow-Ups & Recalls
export const sampleFollowUps: FollowUp[] = Array.from({ length: 30 }).map((_, idx) => {
  const patient = samplePatients[idx % 30];
  const dentist = sampleDentists[idx % sampleDentists.length];
  const types: FollowUp['type'][] = [
    'cleaning_recall',
    'treatment_follow_up',
    'missed_appointment',
    'consultation_follow_up',
    'treatment_continuation'
  ];
  const type = types[idx % types.length];
  const statuses: FollowUp['status'][] = ['pending', 'contacted', 'appointment_booked', 'completed'];

  return {
    id: `fu-${400 + idx + 1}`,
    patientId: patient.id,
    patientName: patient.name,
    patientPhone: patient.phone,
    type,
    dueDate: idx < 12 ? '2026-10-04' : `2026-10-${String(5 + (idx % 15)).padStart(2, '0')}`,
    dentistId: dentist.id,
    dentistName: dentist.name,
    status: statuses[idx % statuses.length],
    notes: type === 'cleaning_recall'
      ? '6-Month preventative scaling and polish recall due.'
      : 'Check post-operative healing and sensitivity on upper left quadrant.',
    createdAt: '2026-09-25',
  };
});

// CRM Leads (20 realistic incoming enquiries)
export const sampleLeads: Lead[] = Array.from({ length: 20 }).map((_, idx) => {
  const names = [
    'Zubair Akhtar', 'Khadija Bibi', 'Haroon Rasheed', 'Maha Siddique',
    'Rehan Sheikh', 'Amna Tariq', 'Kamran Akmal', 'Samina Pirzada',
    'Adeel Chaudhry', 'Laiba Khan', 'Babar Azam', 'Sanam Jung',
    'Waseem Badami', 'Urwa Hocane', 'Hamza Abbasi', 'Sajal Noor',
    'Danish Aziz', 'Naveed Raza', 'Rabia Kulsoom', 'Hammad Farooq'
  ];
  const sources: Lead['source'][] = ['website_enquiry', 'appointment_request', 'emergency_call', 'whatsapp', 'contact_form'];
  const statuses: Lead['status'][] = ['new', 'contacted', 'appointment_booked', 'visited', 'converted', 'lost'];
  const services = ['Invisalign Clear Aligners', 'Teeth Whitening', 'Dental Implants', 'Smile Makeover', 'Wisdom Tooth Pain'];

  return {
    id: `lead-${600 + idx + 1}`,
    name: names[idx % names.length],
    phone: `+92 301 ${4000000 + idx * 2948}`.slice(0, 15),
    email: `${names[idx % names.length].toLowerCase().replace(/\s+/g, '')}@gmail.com`,
    source: sources[idx % sources.length],
    status: statuses[idx % statuses.length],
    serviceInterested: services[idx % services.length],
    notes: idx % 2 === 0 ? 'Inquired about monthly installment plans for braces/aligners.' : 'Urgent consultation for tooth sensitivity and cosmetic bonding.',
    createdAt: `2026-10-0${(idx % 4) + 1}T11:30:00Z`,
  };
});

// Reviews (20 verified demo testimonials)
export const sampleReviews: PatientReview[] = [
  {
    id: 'rev-1',
    patientName: 'Omar F.',
    serviceName: 'In-Clinic Laser Teeth Whitening',
    dentistName: 'Dr. Sarah Ahmed',
    rating: 5,
    comment: 'Spectacular results! My teeth were noticeably 6 shades whiter within an hour. Dr. Sarah was remarkably gentle and ensured zero sensitivity.',
    date: '2026-09-28',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-2',
    patientName: 'Fatima Z.',
    serviceName: 'Precision 3D Guided Dental Implants',
    dentistName: 'Dr. Hamza Khan',
    rating: 5,
    comment: 'I was nervous about getting a dental implant after losing a molar, but Dr. Hamza’s guided 3D scan procedure felt completely painless. Truly world-class standards.',
    date: '2026-09-22',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-3',
    patientName: 'Bilal M.',
    serviceName: 'Invisalign & Clear Aligners',
    dentistName: 'Dr. Ayesha Malik',
    rating: 5,
    comment: 'Halfway through my aligner treatment and the difference is unbelievable. The clinic environment is exceptionally clean and comfortable.',
    date: '2026-09-18',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-4',
    patientName: 'Amina S.',
    serviceName: 'Microscopic Root Canal Treatment',
    dentistName: 'Dr. Bilal Tariq',
    rating: 5,
    comment: 'Painless root canal! I arrived with severe throbbing toothache and walked out completely relieved. The surgical microscope made all the difference.',
    date: '2026-09-15',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-5',
    patientName: 'Hamza T.',
    serviceName: 'Professional Teeth Cleaning & Scaling',
    dentistName: 'Dr. Usman Riaz',
    rating: 5,
    comment: 'Very thorough cleaning without any gum bleeding or soreness. My teeth feel extraordinarily fresh. Highly recommend SMILORA!',
    date: '2026-09-10',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-6',
    patientName: 'Zainab Q.',
    serviceName: 'Pediatric Dentistry & Kids Smile Care',
    dentistName: 'Dr. Zainab Farooq',
    rating: 5,
    comment: 'Dr. Zainab is magical with children. My 5-year-old daughter was smiling and laughing throughout her cavity seal visit. No fear at all.',
    date: '2026-09-04',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-7',
    patientName: 'Usman B.',
    serviceName: 'Porcelain Veneers & Smile Makeover',
    dentistName: 'Dr. Sarah Ahmed',
    rating: 5,
    comment: 'The digital smile design mock-up let me see my new smile before touching a single tooth. The ceramic veneers look indistinguishable from natural teeth.',
    date: '2026-08-30',
    status: 'approved',
    featured: true,
  },
  {
    id: 'rev-8',
    patientName: 'Hira N.',
    serviceName: 'Surgical Wisdom Tooth Removal',
    dentistName: 'Dr. Hamza Khan',
    rating: 5,
    comment: 'Both lower impacted wisdom teeth were removed in under 40 minutes. Barely any swelling the next day thanks to their collagen graft protocol.',
    date: '2026-08-25',
    status: 'approved',
    featured: false,
  },
  {
    id: 'rev-9',
    patientName: 'Saad R.',
    serviceName: 'Comprehensive Dental Checkup',
    dentistName: 'Dr. Sarah Ahmed',
    rating: 5,
    comment: 'The 3D intraoral camera view on the large screen showed me every detail. Complete transparency with no unnecessary treatments recommended.',
    date: '2026-08-20',
    status: 'approved',
    featured: false,
  },
  {
    id: 'rev-10',
    patientName: 'Mariam S.',
    serviceName: 'Same-Day Emergency Dental Care',
    dentistName: 'Dr. Bilal Tariq',
    rating: 5,
    comment: 'Broke a front tooth during sports on Sunday morning. SMILORA took me in immediately and restored the tooth with aesthetic composite. Lifesavers!',
    date: '2026-08-16',
    status: 'approved',
    featured: false,
  },
];

// 15 Blog Posts
export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'clear-aligners-vs-metal-braces-which-is-right-for-you',
    title: 'Clear Aligners vs. Metal Braces: Which Is Right For Your Smile?',
    category: 'Orthodontics',
    excerpt: 'An unbiased clinical comparison between Invisalign clear aligners and modern low-profile brackets regarding comfort, aesthetics, and treatment speed.',
    content: `Choosing the right orthodontic solution is a significant decision. While traditional metal braces have been the clinical standard for decades, modern 3D clear aligners have revolutionized modern orthodontics. 

### Aesthetic Discretion
The most noticeable advantage of clear aligners is their near-invisibility. Engineered from medical-grade thermoplastic polyurethane, aligner trays fit snugly over your dental arch, making them virtually imperceptible during conversations, presentations, and social gatherings.

### Dietary Freedom and Oral Hygiene
With fixed brackets, patients must avoid sticky, crunchy, and hard foods that could pop a bracket or bend archwires. In contrast, aligners are removed for eating and drinking, allowing you to enjoy your favorite meals without hesitation. Furthermore, routine brushing and flossing are unaffected, dramatically reducing the risk of decalcification spots and plaque gingivitis during treatment.

### Complex Bite Corrections
While aligners excel at resolving mild-to-moderate crowding, rotations, and spacing, complex skeletal discrepancies or severe vertical bite issues may still require fixed brackets. Consult Dr. Ayesha Malik for an iTero 3D digital scan to see exactly which system suits your unique dental anatomy.`,
    author: 'Dr. Ayesha Malik',
    authorTitle: 'Specialist Orthodontist (MOrth RCSEd)',
    date: '2026-09-26',
    readTime: '5 min read',
    tags: ['Invisalign', 'Braces', 'Smile Design', 'Orthodontics'],
    published: true,
  },
  {
    id: 'blog-2',
    slug: 'why-teeth-whitening-at-the-dentist-beats-over-the-counter-kits',
    title: 'Why Professional In-Clinic Teeth Whitening Beats Over-the-Counter Strips',
    category: 'Cosmetic Dentistry',
    excerpt: 'Discover why medical-grade photo-activated whitening delivers dramatic, uniform, and nerve-safe results that drugstore kits cannot replicate.',
    content: `Every drugstore aisle now features whitening strips, pens, and LED mouthpieces promising pearl-white teeth. However, over-the-counter products are legally restricted to very weak peroxide concentrations to prevent widespread consumer injury.

### Medical Grade Formulation with Gingival Protection
In-clinic whitening utilizes potent, buffered hydrogen peroxide (up to 35%) paired with a light-cured gingival dam. This barrier hermetically seals your gum margins, allowing the active whitening serum to penetrate deep enamel rods and oxidize stubborn intrinsic tetracycline and coffee stains without burning delicate soft tissue.

### Guarding Against Enamel Demineralization
Unregulated whitening kits often feature acidic pH profiles that erode surface enamel and induce acute dentinal hypersensitivity. At SMILORA, our protocol includes a post-treatment desensitizing remineralization glaze infused with potassium nitrate and amorphous calcium phosphate to rebuild enamel crystal density immediately.`,
    author: 'Dr. Sarah Ahmed',
    authorTitle: 'Cosmetic Dental Specialist',
    date: '2026-09-20',
    readTime: '4 min read',
    tags: ['Teeth Whitening', 'Cosmetic Dentistry', 'Enamel Health'],
    published: true,
  },
  {
    id: 'blog-3',
    slug: 'dental-implants-the-lifetime-solution-for-missing-teeth',
    title: 'Dental Implants: Why They Are Considered The Lifetime Standard for Missing Teeth',
    category: 'Implantology',
    excerpt: 'Understand the biological magic of osseointegration and why dental implants preserve facial structure far better than traditional removable dentures.',
    content: `When a permanent tooth is lost to trauma or decay, the bone beneath begins to resorb almost immediately due to a lack of functional chewing stimulation. Over time, this bone loss causes adjacent teeth to drift and leads to premature facial hollowing.

### The Science of Osseointegration
Dental implants are crafted from grade-4 pure titanium or titanium-zirconium alloys. Living bone osteoblasts treat this biocompatible metal like natural tissue, knitting microscopically into the textured fixture surface over 8 to 12 weeks.

### Lifelong Chewing Strength
Once integrated and fitted with a precision zirconia crown, a dental implant restores over 95% of natural bite force—compared to only 20–30% with conventional removable dentures. You can bite into apples, steak, and nuts with absolute confidence.`,
    author: 'Dr. Hamza Khan',
    authorTitle: 'Consultant Oral & Maxillofacial Surgeon',
    date: '2026-09-12',
    readTime: '6 min read',
    tags: ['Dental Implants', 'Oral Surgery', 'Restorative Dentistry'],
    published: true,
  },
  {
    id: 'blog-4',
    slug: 'the-truth-about-root-canals-painless-modern-endodontics',
    title: 'The Truth About Root Canals: Why Modern Endodontics Is Virtually Painless',
    category: 'Endodontics',
    excerpt: 'Debunking the outdated myth that root canals hurt. Learn how high-magnification microscopes and digital rotary files ensure complete comfort.',
    content: `For decades, the phrase "root canal" has been mistakenly associated with severe pain. In reality, the root canal procedure does not cause pain—it relieves the excruciating pain caused by infected, inflamed dental pulp.

### Advanced Rotary Nickel-Titanium Instruments
Old-fashioned manual hand files have been replaced with motorized, computer-torqued flexible rotary files. These instruments glide through curved microscopic canals smoothly, cleansing bacteria in a fraction of the time.

### High-Power Surgical Operating Microscope
At SMILORA, our endodontists operate under high surgical magnification. This illuminates minute auxiliary canals that traditional naked-eye dentistry often misses, preventing recurrent post-operative flare-ups.`,
    author: 'Dr. Bilal Tariq',
    authorTitle: 'Consultant Endodontist (FCPS)',
    date: '2026-09-05',
    readTime: '5 min read',
    tags: ['Root Canal', 'Painless Dentistry', 'Endodontics'],
    published: true,
  },
  {
    id: 'blog-5',
    slug: 'gum-disease-and-systemic-health-the-mouth-body-connection',
    title: 'The Mouth-Body Connection: How Gum Health Impacts Heart Disease & Diabetes',
    category: 'Periodontics',
    excerpt: 'Medical research reveals that chronic periodontal inflammation directly influences cardiovascular health and glycemic control.',
    content: `Bleeding gums while brushing is not normal—it is the cardinal symptom of active gingivitis or periodontitis. What happens in the mouth does not stay in the mouth.

### The Bacterial Pipeline
Ulcerated periodontal pockets allow aggressive oral pathogens like Porphyromonas gingivalis to enter the general bloodstream, triggering systemic inflammatory cascades that can contribute to arterial plaque instability and insulin resistance. Routine 6-month professional scaling and diode laser decontamination stop this bacterial cycle before it affects your overall health.`,
    author: 'Dr. Usman Riaz',
    authorTitle: 'Periodontology Specialist',
    date: '2026-08-28',
    readTime: '4 min read',
    tags: ['Gum Health', 'Periodontics', 'Preventive Health'],
    published: true,
  },
  {
    id: 'blog-6',
    slug: 'parents-guide-to-preventing-early-childhood-cavities',
    title: 'A Parent’s Guide: How to Prevent Childhood Cavities and Dental Phobia',
    category: 'Pediatric Care',
    excerpt: 'Expert tips on establishing positive oral care habits, understanding baby bottle tooth decay, and the role of dental fissure sealants.',
    content: `Baby teeth matter immensely. They reserve vital space for permanent adult teeth, allow proper speech articulation, and support healthy early nutrition. Dr. Zainab Farooq shares key advice for happy, cavity-free childhood smiles.`,
    author: 'Dr. Zainab Farooq',
    authorTitle: 'Pediatric Dental Specialist',
    date: '2026-08-19',
    readTime: '4 min read',
    tags: ['Kids Dental Care', 'Pediatric Dentistry', 'Fluoride'],
    published: true,
  },
];

// Initial Audit Logs
export const sampleAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userName: 'Dr. Tariq Al-Hassan',
    userRole: 'super_admin',
    action: 'SYSTEM_BOOTSTRAP',
    module: 'System',
    details: 'Initialized clinic management platform and seeded clinical templates.',
    timestamp: '2026-10-04 09:00:12',
  },
  {
    id: 'log-2',
    userName: 'Nadia Kamran',
    userRole: 'clinic_admin',
    action: 'SERVICE_UPDATED',
    module: 'Services',
    details: 'Updated base pricing and duration for In-Clinic Laser Whitening.',
    timestamp: '2026-10-04 10:14:45',
  },
  {
    id: 'log-3',
    userName: 'Zeeshan Latif',
    userRole: 'receptionist',
    action: 'APPOINTMENT_CONFIRMED',
    module: 'Appointments',
    details: 'Confirmed appointment APT-1025 for patient Omar Farooq with Dr. Sarah Ahmed.',
    timestamp: '2026-10-04 11:22:01',
  },
  {
    id: 'log-4',
    userName: 'Farhan Sheikh',
    userRole: 'accountant',
    action: 'PAYMENT_RECORDED',
    module: 'Billing',
    details: 'Recorded PKR 28,000 payment via Card for Invoice SML-2026-104.',
    timestamp: '2026-10-04 12:45:10',
  },
  {
    id: 'log-5',
    userName: 'Dr. Sarah Ahmed',
    userRole: 'dentist',
    action: 'TREATMENT_PLAN_CREATED',
    module: 'Treatment Plans',
    details: 'Created Full Smile Restoration plan TP-501 for Omar Farooq.',
    timestamp: '2026-10-04 13:10:33',
  },
];
