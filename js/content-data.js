/**
 * Global Hyperloop Competition (GHC) - Official Dataset & Content Registry
 * Source: ghciitm.com (IIT Madras)
 */

window.GHC_DATA = {
  info: {
    title: "Global Hyperloop Competition",
    edition: "GHC 2026 / 3.0",
    organizer: "Indian Institute of Technology, Madras",
    partner: "IIT Madras Alumni Association (IITMAA)",
    supporters: ["Ministry of Railways, Govt. of India", "ArcelorMittal", "National Centre for Combustion R&D (NCCRD)"],
    venue: "Discovery Campus, IIT Madras, Thaiyur, Chennai, India",
    dates: "January 4th, 5th & 6th",
    registrationLink: "https://forms.gle/jgFNPaJzrB8H8jyM6",
    youtubeHighlights: "https://www.youtube.com/watch?v=osvB0QDUzH0&t=1s",
    socials: {
      instagram: "https://www.instagram.com/ghc_india/",
      linkedin: "https://www.linkedin.com/company/global-hyperloop-competition-iitm/mycompany/",
      twitter: "https://twitter.com/GHCIITM",
      youtube: "https://www.youtube.com/@GHCIITM"
    },
    contacts: {
      email: "ghc@smail.iitm.ac.in",
      coordinators: [
        { name: "Sashank", phone: "+91 96661 10425", role: "Event Lead & Technical Operations" },
        { name: "Nizamuddin", phone: "+91 70349 43826", role: "Team Relations & Logistics" }
      ]
    }
  },

  visionPillars: [
    {
      id: "innovation",
      title: "Innovation",
      tagline: "Breakthrough R&D and Prototyping",
      desc: "Foster a culture of relentless creativity and engineering audacity in Hyperloop systems. We encourage rapid experimentation, advanced mathematical modeling, and functional hardware prototyping to solve real-world transportation barriers.",
      stats: "Mach 1.0 Target",
      icon: "cpu"
    },
    {
      id: "inclusion",
      title: "Inclusion",
      tagline: "Global Platform for Diverse Minds",
      desc: "Provide an open international proving ground where students, researchers, industrial leaders, and governmental bodies synergize. GHC connects academic research with heavy industrial manufacturing.",
      stats: "30+ Global Teams",
      icon: "globe"
    },
    {
      id: "implementation",
      title: "Implementation",
      tagline: "Industrial Scalability & Safety Standards",
      desc: "Moving beyond theoretical concepts to build, test, and deploy sustainable vacuum transportation. Establishing global safety benchmarks, commercialization frameworks, and regulatory standards for next-generation mobility.",
      stats: "422m Vacuum Tube",
      icon: "shield-check"
    }
  ],

  tubeSpecs: {
    length: "422 Meters",
    lengthNumeric: 422,
    diameter: "2.0 Meters",
    wallThickness: "6 mm (IITM / Avishkar breakthrough vs 16-18 mm industry standard)",
    pressure: "0.001 - 0.01 atm (Sub-millibar vacuum)",
    material: "High-grade structural vacuum steel with expansion bellows",
    trackType: "Dual-sided aluminum reaction rail with magnetic levitation guide plates",
    safetySystems: "Emergency repressurization valves, optical telemetry gates, laser velocity traps, thermal cameras",
    location: "IIT Madras Discovery Campus, Thaiyur, Tamil Nadu, India"
  },

  categories: [
    {
      id: "demonstration",
      name: "Pod Demonstration",
      badge: "Flagship Arena",
      tagline: "Live Vacuum Run in the 422m Tube",
      description: "Compete with functional subscale prototype systems inside Asia's first 422m vacuum-compatible test tube, designed to replicate real-world supersonic hyperloop conditions.",
      scope: [
        "Vacuum compatibility & hermetic sealing (down to sub-millibar levels)",
        "Magnetic levitation stability & dynamic pitch/roll compensation",
        "Linear induction propulsion & high-speed acceleration profile",
        "Eddy-current fail-safe braking & deceleration under 2.5G",
        "Autonomous high-bandwidth telemetry & telemetry handshake"
      ],
      deliverables: [
        { code: "DPD", name: "Demonstration Proposal Document", pages: "6 pages/subsystem (24 pages total)", deadline: "Tue 8 Dec" },
        { code: "SBT", name: "Safety Briefing & Testing Document", pages: "40 pages total", deadline: "Mon 21 Dec" },
        { code: "CDR", name: "Comprehensive Demonstration Report", pages: "80 pages (+20 appendix)", deadline: "Thu 24 Dec" }
      ],
      scoring: {
        total: 100,
        breakdown: [
          { item: "Peak Velocity & Acceleration Profile", points: 30 },
          { item: "Levitation Stability & Airgap Control", points: 25 },
          { item: "Fail-Safe Deceleration & Braking", points: 20 },
          { item: "Safety Compliance & Scrutineering", points: 15 },
          { item: "Telemetry Integrity & GUI Telemetry", points: 10 }
        ]
      }
    },
    {
      id: "designx",
      name: "DesignX Blueprint",
      badge: "Simulation & Theory",
      tagline: "Next-Gen Engineering & Multi-Physics Jury",
      description: "Present high-fidelity engineering architectures, FEA/CFD aerodynamic simulations, propulsion modeling, and software designs to an elite international jury of Hyperloop pioneers.",
      scope: [
        "Full-scale pod design & structural chassis finite element analysis",
        "Aerodynamic boundary layer simulations & transonic shockwave mitigation",
        "Thermal dissipation in near-vacuum environments",
        "Battery energy storage thermal runaway mitigation & 800V bus architecture",
        "Scalable civil infrastructure proposals"
      ],
      deliverables: [
        { code: "PDS", name: "Preliminary Design Specification", pages: "30 pages", deadline: "Tue 8 Dec" },
        { code: "FDS", name: "Final Design Specification", pages: "75 pages", deadline: "Thu 24 Dec" }
      ],
      scoring: {
        total: 100,
        breakdown: [
          { item: "Engineering Rigor & Mathematical Models", points: 35 },
          { item: "Simulation Fidelity (FEA / CFD / EM)", points: 25 },
          { item: "Novelty & Intellectual Property Potential", points: 20 },
          { item: "Safety & Failure Mode Analysis (FMEA)", points: 20 }
        ]
      }
    },
    {
      id: "innoquest",
      name: "Hyperloop Innoquest",
      badge: "Industry Bridge",
      tagline: "Commercial Scale & Real-World Implementation",
      description: "Tackle macro-scale challenges of hyperloop commercialization: vacuum pump logistics, station design, land acquisition, seismic resilience, economic route viability, and passenger safety protocols.",
      scope: [
        "Techno-economic feasibility studies for inter-city high-speed corridors",
        "Vacuum tube thermal expansion management across 500+ km",
        "Renewable energy integration (Solar canopy & regenerative power recapture)",
        "Regulatory & standardization framework authoring",
        "Emergency passenger evacuation procedures in vacuum"
      ],
      deliverables: [
        { code: "RPD", name: "Research & Proposal Document", pages: "25 pages", deadline: "Tue 8 Dec" },
        { code: "FRR", name: "Final Regulatory & Feasibility Report", pages: "60 pages", deadline: "Thu 24 Dec" }
      ],
      scoring: {
        total: 100,
        breakdown: [
          { item: "Economic Viability & CapEx/OpEx Analysis", points: 30 },
          { item: "Civil & Infrastructure Practicality", points: 30 },
          { item: "Safety Regulations & Evacuation Strategy", points: 25 },
          { item: "Sustainability & Carbon Offsetting", points: 15 }
        ]
      }
    },
    {
      id: "cabin",
      name: "Cabin Design",
      badge: "Human Factors",
      tagline: "3D Ergonomics, Accessibility & Passenger Luxury",
      description: "Demonstrate optimal spatial ergonomics, passenger psychological comfort during high-acceleration travel, atmospheric pressurization, augmented virtual windows, and universal accessibility.",
      scope: [
        "Full 3D CAD/physical mockup of passenger interior",
        "Human factors, acceleration ergonomics & vibration dampening",
        "Simulated digital windows & claustrophobia alleviation",
        "Rapid egress mechanisms & oxygen life-support systems",
        "Aesthetic styling & luxury travel experience"
      ],
      deliverables: [
        { code: "CDP", name: "Cabin Design Proposal", pages: "20 pages + 3D Render Models", deadline: "Tue 8 Dec" },
        { code: "FCD", name: "Final Cabin Ergonomics Dossier", pages: "50 pages", deadline: "Thu 24 Dec" }
      ],
      scoring: {
        total: 100,
        breakdown: [
          { item: "Passenger Ergonomics & G-Force Comfort", points: 35 },
          { item: "Safety, Egress & Life Support Integration", points: 30 },
          { item: "Universal Accessibility (WCAG / ADA)", points: 20 },
          { item: "Sensory Design & Digital Window Tech", points: 15 }
        ]
      }
    }
  ],

  keyDates: [
    { date: "Sun 08 Nov", event: "Global Registration Portal Opens", desc: "Teams register team profile, mentor endorsements, and chosen category tracks.", status: "completed" },
    { date: "Wed 25 Nov", event: "Registration Closes (23:59 IST)", desc: "Strict deadline for preliminary team roster and institutional sign-off.", status: "current" },
    { date: "Tue 08 Dec", event: "DPD, PDS & RPD Submissions Due", desc: "Demonstration Proposal, Preliminary Design Spec, and Innoquest research due.", status: "upcoming" },
    { date: "Mon 21 Dec", event: "Safety Briefing & Testing (SBT) Due", desc: "40-page comprehensive hazard identification and battery test certifications.", status: "upcoming" },
    { date: "Thu 24 Dec", event: "Comprehensive Demonstration Report (CDR)", desc: "Full 80-page engineering dossier, FEA, CFD, electrical schematics.", status: "upcoming" },
    { date: "Mon 28 Dec", event: "Paperwork, T&C, Letter of Promise Due", desc: "Signed insurance waivers, team arrival schedules, pod freight manifests.", status: "upcoming" },
    { date: "04 - 06 Jan", event: "GHC Finals @ IIT Madras Discovery Campus", desc: "Rigorous scrutineering, live vacuum runs, keynote addresses & awards.", status: "grand-finale" }
  ],

  associatedTeams: [
    {
      name: "Avishkar Hyperloop",
      institution: "Indian Institute of Technology, Madras",
      founded: 2017,
      domain: "Infrastructure & Thin-Wall Vacuum Tube",
      highlights: "Top 3 at European Hyperloop Week 2023. Engineered the breakthrough 6mm thin-wall vacuum steel tube (world standard 16-18mm). Behind Asia's first 422m vacuum facility.",
      link: "https://avishkarhyperloop.com/",
      color: "#00f0ff"
    },
    {
      name: "loopMIT",
      institution: "Manipal Institute of Technology (MAHE)",
      founded: 2018,
      domain: "Propulsion & Magnetic Levitation",
      highlights: "Pioneering single-sided linear induction motors (SLIM) and Halbach magnetic levitation arrays. Specializes in electromagnetic coil winding and reactive stator plate integration.",
      link: "https://loopmit.in/",
      color: "#ff007f"
    },
    {
      name: "Vegapod Hyperloop",
      institution: "MIT-WPU Pune / Quintrans",
      founded: 2018,
      domain: "Mechanical Systems & Aerodynamics",
      highlights: "World Top 6 at European Hyperloop Week 2023. Sole Asian team to pass rigorous Testing & Safety Documentation (TSD). Founders spun out Quintrans Hyperloop startup.",
      link: "https://www.linkedin.com/company/teamvegapodhyperloop/",
      color: "#8b5cf6"
    },
    {
      name: "Nirmaan Hyperloop",
      institution: "Thakur College of Engineering & Tech (TCET), Mumbai",
      founded: 2019,
      domain: "Sense, Control & Real-time GUI",
      highlights: "Ultra-low-latency inter-process communications (IPC), vacuum-grade sensor suites, custom real-time telemetry GUI, and fail-safe microcontroller failover architecture.",
      link: "https://www.nirmaanhyperloop.com/",
      color: "#10b981"
    },
    {
      name: "Infinity Hyperloop",
      institution: "Indian Institute of Technology, Delhi",
      founded: 2019,
      domain: "Power Systems & Energy Storage",
      highlights: "25+ undergraduate engineers designing high-density 800V battery architectures, electromagnetic sensors, intelligent BMS with active cell balancing, and rapid recharge banks.",
      link: "https://infinityhyperloop.iitd.ac.in/",
      color: "#f59e0b"
    }
  ],

  conferenceParivahan: {
    title: "Parivahan - Global Hyperloop Conference",
    subtitle: "India's First International Hyperloop Summit",
    summary: "Parivahan marked India's historic entry into the international hyperloop summit arena, bringing together government dignitaries, Fortune 500 industrial partners, and hyperloop visionaries.",
    days: [
      {
        day: "Day 0",
        title: "Track Unveiling & Avishkar Pod Run",
        description: "Held at the Discovery Campus of IIT Madras in Thaiyur. The 200m+ initial vacuum tube was showcased to international delegates. Special statements of support delivered by Naresh Sharma (ArcelorMittal), Vijay Pratap Singh, Sudeep Shrivastava, and Rajesh Kumar Jain. Concluded with a successful live Pod-Run by Avishkar Hyperloop!"
      },
      {
        day: "Day 1",
        title: "Inauguration & Global Technical Keynotes",
        description: "Inaugurated by Prof. V. Kamakoti (Director, IIT Madras), Prof. Satya Chakravarthy, and Guests of Honor from Indian Railways. Keynotes delivered by world titans: Mars Geuze (Chief Hyperloop Officer, Hardt Hyperloop), Gabriele Semino (TUM Hyperloop), Osama Amin K (KAUST), Dr. Denis Tudor (Swisspod), Harj Dhaliwal (Nevomo), and Dr. Ravindra Kumar (CSIR-CRRI)."
      },
      {
        day: "Day 2",
        title: "The Indian Hyperloop Ecosystem & The Hyperloop Effect",
        description: "Panel discussions led by Prof. Satyanarayan Chakravarthy and Mr. Pranit Mehta. Winners of 'The Hyperloop Effect' case study competition honored: Force Hyperloop, The Wizzers, Arambh, SPD, and Levitators. Historic joint resolution on developing standardized Indian hyperloop regulatory frameworks."
      }
    ],
    distinguishedSpeakers: [
      { name: "Shri Ashwini Vaishnaw", role: "Hon'ble Union Minister for Railways, Electronics & IT, Govt of India" },
      { name: "Prof. V. Kamakoti", role: "Director, Indian Institute of Technology Madras" },
      { name: "Prof. Satya Chakravarthy", role: "Head, NCCRD & Aerospace Engg., IIT Madras" },
      { name: "Mars Geuze", role: "Chief Hyperloop Officer, Hardt Hyperloop (Netherlands)" },
      { name: "Gabriele Semino", role: "Project Lead, TUM Hyperloop (Germany)" },
      { name: "Osama Amin K", role: "Senior Research Scientist, KAUST (Saudi Arabia)" },
      { name: "Dr. Denis Tudor", role: "Founder & CEO, Swisspod Technologies (Switzerland)" },
      { name: "Dr. Harj Dhaliwal", role: "Capital Programs Officer, Nevomo (Poland / UK)" },
      { name: "Dr. Ravindra Kumar", role: "Chief Scientist, CSIR - Central Road Research Institute" },
      { name: "Naresh Sharma", role: "Vice President & Representative, ArcelorMittal" },
      { name: "Rajesh Kumar Jain", role: "Executive Director, Ministry of Railways" }
    ]
  },

  advisors: [
    {
      name: "Shri Ashwini Vaishnaw",
      role: "Chief Patron",
      affiliation: "Hon'ble Union Minister for Railways, Communications, Electronics and Information Technology of India",
      image: "assets/ashwini.png"
    },
    {
      name: "Professor Satya Chakravarthy",
      role: "Faculty Advisor & Visionary",
      affiliation: "Head, National Centre for Combustion R&D (NCCRD) & Dept. of Aerospace Engg., IIT Madras",
      image: "assets/satya.png"
    },
    {
      name: "Professor TM Muruganandam",
      role: "Technical Advisor",
      affiliation: "Dept. of Aerospace Engineering, IIT Madras",
      image: "assets/muruganandam.png"
    },
    {
      name: "Ravi Santhanam",
      role: "Strategic Leadership Mentor",
      affiliation: "Executive Coach - Leaders & Teams, Former Exec at Mahindra",
      image: "assets/ravi.png"
    },
    {
      name: "Seshan Rammohan",
      role: "International Relations Advisor",
      affiliation: "President Emeritus and Founding Board Member at IIT Madras Foundation",
      image: "assets/seshan.png"
    },
    {
      name: "Arpit Garg",
      role: "Founder, GHC",
      affiliation: "Global Hyperloop Competition & Avishkar Hyperloop Alum",
      image: "assets/arpit.png"
    }
  ],

  faqs: [
    {
      q: "What is the Global Hyperloop Competition (GHC)?",
      a: "GHC is Asia's flagship hyperloop engineering competition and symposium hosted by IIT Madras. It brings together student engineers, academic researchers, and industrial aerospace leaders worldwide to design, construct, and launch functional subscale hyperloop pods in a 422-meter vacuum-compatible test tube."
    },
    {
      q: "What makes the IIT Madras 422m track unique globally?",
      a: "The GHC tube at Discovery Campus (Thaiyur) is 422 meters long with a 2-meter internal diameter. Developed in collaboration with Avishkar Hyperloop and Indian Railways, it features an extraordinary 6mm steel wall thickness—vastly lighter and more cost-effective than global 16-18mm standards, setting a world precedent for scalable hyperloop infrastructure."
    },
    {
      q: "Can international university teams participate?",
      a: "Yes! GHC is a truly global open competition. Teams from Europe, the Americas, Asia, and Australasia are invited to participate in both hardware (Pod Demonstration, Cabin Design) and research categories (DesignX Blueprint, Hyperloop Innoquest)."
    },
    {
      q: "What are the key submission documents and deadlines?",
      a: "Key deliverables include DPD (Demonstration Proposal Document - due Dec 8), SBT (Safety Briefing and Testing Document - due Dec 21), and CDR (Comprehensive Demonstration Report - due Dec 24). Submissions must follow the naming convention: GHC3_<TeamID>_<CODE>.pdf."
    },
    {
      q: "What safety requirements must pods satisfy before vacuum runs?",
      a: "Every pod undergoes multi-stage scrutineering: mechanical inspection, pressure vessel leak testing, 800V electrical isolation, battery thermal runaway chamber certification, and low-speed eddy current brake testing before entering the main tube."
    },
    {
      q: "How can industry partners and sponsors get involved?",
      a: "Organizations can partner as track sponsors, technical jury members, or test infrastructure contributors by contacting the GHC secretariate at ghc@smail.iitm.ac.in."
    }
  ]
};
