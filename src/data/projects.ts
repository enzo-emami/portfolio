export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  cats: string[];
  img: string | null;
  modalImg: string | null;
  blurb: string;
  tags: string[];
  meta?: string;
  video?: string;
  text: string[];
  links: ProjectLink[];
};

const ASSETS = "assets/";

export const projects: Project[] = [
  {
    id: "frc",
    title: "FRC 2024 Robot — Team 6036",
    year: "2024",
    cats: ["robots"],
    img: ASSETS + "frc-card.png",
    modalImg: ASSETS + "frc-modal.png",
    blurb:
      "Swerve drive, rotating turret, flywheel shooter, AprilTag auto-aim. Archimedes Division finalist at Worlds — #4 globally.",
    tags: ["mechanism design", "CNC", "vision"],
    meta: "CAD Lead · FIRST Robotics Competition · Crescendo",
    video: "https://www.youtube-nocookie.com/embed/xgZRuODJkmU",
    text: [
      "120 lb of competition robot, designed and built in 6–8 weeks. For Crescendo, ours drives on a highly agile swerve system, picks up Notes, and launches them into tall targets from anywhere on the field.",
      "A rotating turret and pivoting flywheel shooter give full aiming flexibility; Limelight cameras with AprilTag tracking make it automatic. Fast, accurate, and genuinely fun to drive.",
      "As CAD Lead I owned the robot's CAD end to end, built alongside Rohit Seshadri and the 6036 CAD team. This robot took us to the Archimedes Division Finals at the World Championship.",
    ],
    links: [
      {
        label: "CAD release (Onshape) ↗",
        href: "https://cad.onshape.com/documents/b8e6794afb3a0d96fa312ae1/v/a47e847b9518dc43066543ac/e/1d767442ba2af50a6d55f05b?renderMode=0&uiState=66399353ce2b4002220e7e06",
      },
      { label: "team6036.com ↗", href: "https://www.team6036.com/robots/acoustic" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
  {
    id: "ftc",
    title: "FTC 2024 Robot — 5773 Ink & Metal",
    year: "2024",
    cats: ["robots"],
    img: ASSETS + "ftc-card.png",
    modalImg: ASSETS + "ftc-modal.png",
    blurb:
      "Five integrated subsystems, iterated through CAD + CNC. Won the San Mateo Regional and the RTX Innovate Award.",
    tags: ["mechanism design", "CNC", "team lead"],
    meta: "Lead Designer · FIRST Tech Challenge · CENTERSTAGE",
    text: [
      "Built with Ink & Metal 5773, a 15-member team in Fremont, CA. For CENTERSTAGE we engineered five integrated subsystems — chassis, intake, outtake, hang, and drone launcher. Every mechanism ran the same pipeline: 3D-printed proof of concept, full CAD, then aluminum CNC manufacturing for reliable cycling under match pressure.",
      "The hardest problem was the end effector: a two-claw deposit mechanism riding a virtual four-bar on three stages of diagonal linear slides, gripping game pieces by internal tension. It drops two pixels side-by-side in the time a generic dump drops one, and rotates to any orientation to score mosaic bonuses — the full iteration story is in the portfolio below.",
      "The robot performed across California, winning the San Mateo Regional and the 2024 RTX Innovate Sponsored Award.",
    ],
    links: [
      { label: "2024 States portfolio (PDF)", href: "assets/ftc-2024-states-portfolio.pdf" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
  {
    id: "drone",
    title: "AI-Powered Drone — Infineon",
    year: "2025",
    cats: ["robots", "aero", "cad"],
    img: ASSETS + "infineon-preview.png",
    modalImg: ASSETS + "infineon-extra.png",
    blurb:
      "Car-rooftop drone that deploys to find parking autonomously — it flew. Sole mechanical designer among 5 picked from 20,000+ students.",
    tags: ["enclosure design", "embedded", "R&D"],
    meta: "R&D Hardware Designer · Infineon PSOC 6 sponsored project",
    text: [
      "Each quarter, De Anza selects a handful of students out of 20,000+ to build on a company-sponsored prototype AI chip (PSOC 6). Ours: a drone that rides on your car's roof, deploys at the press of a button, finds an open spot using YOLO-based vision, and your car self-drives to it. By the time it lands, you're long gone shopping.",
      "As the sole mechanical/visual designer, I built the manufacturable NURBS enclosure on the HAWK'S WORK F450 platform — fastener strategy, PCB mounting, print-ready geometry — designed in Onshape. Making it work wasn't enough: the shell went through printed and painted iterations until it was as sleek as it was flyable.",
      "It flew. With Mei Kuyusama, Nancy Ta, Aayush Sugali, and Isaac Zhi Kang.",
    ],
    links: [
      { label: "Project deck (PDF)", href: "assets/ai-drone-deck.pdf" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
  {
    id: "neurofocus",
    title: "NeuroFocus — BCI Headset",
    year: "2025 — now",
    cats: ["robots", "cad"],
    img: ASSETS + "neurofocus-card.png",
    modalImg: ASSETS + "neurofocus-modal.png",
    blurb:
      "Consumer EEG headset attachment for real-time focus tracking. I lead all mechanical & industrial design — working units, pre-orders open.",
    tags: ["product design", "NURBS", "wearables"],
    meta: "Chief Design Officer · backed by Founders, Inc. · sponsored by SPARTUP (SJSU) & Foothill Innovation Challenge",
    text: [
      "NeuroFocus is a sleek headset attachment that uses BCI technology to monitor EEG data, so gaming teams (and anyone chasing peak performance) can track focus levels in real time. Working with T1 Team Korea.",
      "I own the hardware end to end: full NURBS-based product geometry, sensor integration into a lightweight ergonomic headset-mountable system, and every prototype iteration — ~350 hours of CAD and dozens of iterations, documented in the hardware journey below.",
      "Backed by Founders, Inc. Working units are real — pre-orders are open at neurofocus.dev. With Elijah Chen & Inky Ganbold.",
    ],
    links: [
      { label: "Hardware journey (PDF)", href: "assets/neurofocus-hardware-journey.pdf" },
      { label: "neurofocus.dev ↗", href: "https://www.neurofocus.dev/" },
      { label: "GitHub ↗", href: "https://github.com/da-bigbrain" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
  {
    id: "tbd",
    title: "TBD Consulting",
    year: "2025 — now",
    cats: ["cad"],
    img: ASSETS + "tbd.png",
    modalImg: ASSETS + "tbd.png",
    blurb:
      "Design consulting & custom fabrication I co-founded — paid client work for Pinkbike, AMD, and Autodesk, from concept CAD to physical production.",
    tags: ["NURBS surfacing", "fabrication", "co-founder"],
    meta: "Co-founder · tbdmoto.com",
    text: [
      "TBD is a CAD and custom fabrication business I co-founded with Dylan Banera — design consulting that takes client parts from concept through CAD to physical production. All of it paid client work, for Pinkbike, AMD, Autodesk, and others.",
      "Pictured: a titanium frame junction for carbon-fiber tubing — a multi-constraint parametric NURBS surfacing problem balancing curvature continuity, fit tolerances, and a manufacturable interface between titanium and composite members, produced across 3D-printed and machined parts.",
    ],
    links: [
      { label: "tbdmoto.com ↗", href: "https://tbdmoto.com" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
  {
    id: "rahip",
    title: "RAHIP — Crawlspace Robot",
    year: "in progress",
    cats: ["robots"],
    img: ASSETS + "rahip-card.png",
    modalImg: ASSETS + "rahip-modal.png",
    blurb: "Crawlspace inspection robot built on the Magni platform, developed through the Foothill Incubator.",
    tags: ["mobile robot", "integration"],
    meta: "Foothill Incubator",
    text: [
      "A crawlspace inspection robot built on the Magni mobile platform, developed through the Foothill Incubator.",
      "My work spans the platform conversion for tracked locomotion, the BOM, wiring diagrams, and BLE setup.",
    ],
    links: [],
  },
  {
    id: "fireflight",
    title: "Fire-Flight — Wildfire UAV",
    year: "2025",
    cats: ["aero", "robots"],
    img: ASSETS + "fireflight-card.png",
    modalImg: ASSETS + "fireflight-modal.png",
    blurb:
      "Fixed-wing UAV for early wildfire detection — Pixhawk, Pi 4 vision, IR + PM2.5 sensing planned. Presented at UC Berkeley.",
    tags: ["avionics", "sensing", "integration"],
    meta: "Foothill Engineering Club · 2025 Bay Area Honors Research Symposium @ UC Berkeley",
    text: [
      "Any potential fire in Los Altos Hills, this plane will find it. An ASA Aero aircraft demonstrating how advanced sensing and autonomous flight apply to wildfire detection.",
      "The aircraft integrates a Pixhawk flight controller and GPS for navigation, with a Raspberry Pi 4 running a camera for real-time imaging. Future iterations add an infrared camera for hotspot detection and a PM2.5 sensor for smoke and air quality.",
      "With Daniel Martinez, Francisco Plans, and Yahya Mirza.",
    ],
    links: [
      { label: "Symposium deck (PDF)", href: "assets/fire-flight-deck.pdf" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
];

export const community: Project[] = [
  {
    id: "era",
    title: "ERA — Intercollegiate Combat Robotics",
    year: "2025 — now",
    cats: ["community"],
    img: ASSETS + "era-card.png",
    modalImg: ASSETS + "era-modal.png",
    blurb:
      "Intercollegiate combat-robotics competition I founded and funded — De Anza, Foothill, Mission, West Valley, Stanford — ~200 students, $10k first-season grant.",
    tags: ["combat robotics", "founder", "events"],
    meta: "Founder & Director · President, RAI Club @ De Anza",
    text: [
      "ERA is an intercollegiate combat-robotics competition I started — currently spanning De Anza College, Foothill College, Mission College, West Valley College, and Stanford University, and growing every quarter.",
      "I funded it by unlocking grants — rewriting how my district processes them — landing a $10k grant for our first season. From there it's competition architecture: technical rules, safety systems, and event infrastructure for roughly 200 students across FHDA. I also serve as President of De Anza's Robotics & AI (RAI) Club.",
      "Competition website under construction.",
    ],
    links: [
      { label: "deanzaexpo.org ↗", href: "https://deanzaexpo.org/#about-section" },
      { label: "More details ↗", href: "https://emamienzo.wixstudio.com/my-site-2/about" },
    ],
  },
  {
    id: "dahacks",
    title: "DAHacks — Director",
    year: "2025",
    cats: ["community"],
    img: ASSETS + "dahacks-card.webp",
    modalImg: ASSETS + "dahacks-modal.png",
    blurb:
      "Cupertino's largest intercollegiate hackathon — funded, designed, and ran the event for 200 students and industry mentors.",
    tags: ["events", "leadership"],
    meta: "Director · De Anza College",
    text: [
      "DAHacks is Cupertino's largest intercollegiate hackathon, hosted yearly by De Anza College. As Director, I worked with a team of organizers and district admin to fund, design, and run the event — bringing together 200 students and field professionals.",
      "More than a competition, it's a platform: workshops, mentors, and networks that outlast the weekend. With Manuel Moya and the De Anza Hacks team.",
    ],
    links: [
      { label: "Event site ↗", href: "https://hackathon-horizon-website.vercel.app/" },
      { label: "live.deanzahacks.com ↗", href: "https://live.deanzahacks.com/" },
    ],
  },
  {
    id: "k12",
    title: "K12 Robotics — Founder & Teacher",
    year: "2024 — now",
    cats: ["community"],
    img: ASSETS + "k12-card.png",
    modalImg: ASSETS + "k12-modal.png",
    blurb:
      "Built a year-long LEGO SPIKE robotics program from scratch — self-made curriculum, dozens of students, an FLL competition team.",
    tags: ["teaching", "curriculum", "FLL"],
    meta: "Founder · Little Scholar after-school academy",
    text: [
      "Starting with just an idea, I launched a robotics program from scratch inside an after-school K12 academy — designing the curriculum, marketing the class, and growing enrollment until it became one of the center's most popular offerings.",
      "Using LEGO SPIKE kits, I taught dozens of students the fundamentals of robotics and problem-solving through progressive, self-made challenges blending mechanical design, programming logic, and teamwork — and established a FIRST LEGO League (FLL) competition team.",
      "The program still runs today and continues to grow.",
    ],
    links: [{ label: "littlescholar.school ↗", href: "https://www.littlescholar.school/" }],
  },
];
