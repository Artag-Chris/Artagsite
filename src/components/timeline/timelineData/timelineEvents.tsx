import {
  Calendar,
  Code,
  Award,
  Briefcase,
  Lightbulb,
  Rocket,
  GraduationCap,
  Heart,
  BookOpen,
  MapPin,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2006",
    title: "English Studies and Exploration",
    description:
      "After high school, I pursued English studies at university. This period was marked by exploring diverse interests and learning new skills, but I hadn't yet found a stable career path or defined a clear professional direction.",
    icon: <BookOpen className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748870454/DALL_E_2025-06-02_08.20.22_-_A_detailed_manga-style_illustration_of_a_light-skinned_man_inspired_by_a_real_person__he_has_short_dark_hair_styled_upwards_a_trimmed_goatee_beard_a_s8hake.webp",
    imageAlt: "First coding experience",
    category: "education",
    chapterNumber: 1,
    chapterTitle: "The Beginning",
    emotionalArc: "discovery",
    quote: "Every journey begins with a single step into the unknown.",
    narrative: {
      setup: "After finishing high school, I enrolled in English studies at university, searching for academic direction and purpose.",
      conflict: "The path felt disconnected from my real interests. I attended classes and completed assignments, but lacked genuine passion or a clear professional vision for my future.",
      resolution: "These exploratory years taught me the value of self-discovery and that it's okay if not every path leads where you expect. This foundation of exploration would serve me well later."
    },
    themes: ["education", "discovery", "self-reflection"],
    impact: "medium",
    location: "Colombia"
  },
  {
    id: 2,
    year: "2018",
    title: "A Transformative Encounter",
    description:
      "Met an extraordinary woman who profoundly changed my worldview. Her kindness, work ethic, and beautiful spirit inspired me to reevaluate my path and approach life with greater seriousness and purpose. This period became a cherished turning point in my personal growth journey.",
    icon: <Heart className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748873481/3intento_mzvnrz.jpg",
    imageAlt: "Transformative relationship experience",
    category: "personal",
    chapterNumber: 2,
    chapterTitle: "A Meeting of Souls",
    emotionalArc: "transformation",
    quote: "The right person can change your entire perspective on life.",
    narrative: {
      setup: "In 2018, I met an extraordinary woman whose kindness, work ethic, and beautiful spirit captured my heart and my imagination.",
      conflict: "Her presence challenged everything I thought I knew about myself. She saw potential in me that I couldn't see in myself, and her example of dedication and purpose made my own path feel aimless.",
      resolution: "This meeting became the turning point. Her influence inspired me to reevaluate my life with greater seriousness. I realized I wanted to become worthy of her belief in me."
    },
    themes: ["personal-growth", "transformation", "inspiration"],
    impact: "high",
    location: "Colombia"
  },
  {
    id: 3,
    year: "2018",
    title: "Urban Odyssey in Bogotá",
    description:
      "Inspired to reshape my life, I moved to Bogotá seeking new opportunities. I navigated the city's vibrant energy, trying various roles from car sales to call center agent. Despite my efforts, I struggled to find stable footing in the bustling metropolis, facing both professional uncertainty and personal growth.",
    icon: <MapPin className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748875536/4intento_xqus5g.jpg",
    imageAlt: "Job searching in Bogotá",
    category: "work",
    chapterNumber: 3,
    chapterTitle: "The City of Trials",
    emotionalArc: "challenge",
    quote: "In uncertainty lies the opportunity to discover who you truly are.",
    narrative: {
      setup: "Motivated by my desire to build a better life, I moved to Bogotá, Colombia's capital, seeking new opportunities and professional growth.",
      conflict: "The city tested me relentlessly. I tried car sales, worked as a call center agent, and searched desperately for stability. Every role felt temporary, every door seemed to close just as it opened.",
      resolution: "Though I didn't find my breakthrough in Bogotá, I gained resilience and clarity. The struggle taught me that I needed to find my true calling, not just any job."
    },
    themes: ["struggle", "persistence", "self-discovery"],
    impact: "high",
    location: "Bogotá"
  },
  {
    id: 4,
    year: "2019",
    title: "Awakening to Code & Fatherhood",
    description:
      "After a friend noticed my natural problem-solving abilities (honed from hacking video games as a child), I pursued web application design through a government scholarship. This transformative journey of technical discovery coincided with another life-changing revelation: preparing to become a father, which deepened my sense of purpose and responsibility.",
    icon: <Lightbulb className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748875949/5intentop_muv3yv.jpg",
    imageAlt: "Dual journey of coding studies and impending fatherhood",
    category: "personal",
    chapterNumber: 4,
    chapterTitle: "Awakening",
    emotionalArc: "triumph",
    quote: "When passion meets purpose, magic happens.",
    narrative: {
      setup: "A friend recognized my natural problem-solving abilities and encouraged me to pursue programming. Through a government scholarship, I was accepted into a web application design bootcamp.",
      conflict: "Learning to code was intense and challenging, but something felt different—this was the first time my work felt like play. Simultaneously, I learned I was going to be a father, which doubled my sense of responsibility.",
      resolution: "These two forces converged into pure determination. I wasn't learning code for myself anymore—I was learning for my family's future. This clarity transformed how I approached my studies."
    },
    themes: ["breakthrough", "coding", "fatherhood", "purpose"],
    impact: "high",
    location: "Colombia"
  },
  {
    id: 5,
    year: "2020",
    title: "Resilience Through Loss",
    description:
      "Faced profound professional and personal challenges: endured multiple software company rejections despite promising interviews, while simultaneously processing the heartbreaking loss of our expected child. Through this darkness, I found strength in continued learning and preparation, holding onto an unwavering conviction that perseverance in my passion would eventually lead to breakthrough.",
    icon: <Shield className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748876334/6intento_niymlm.jpg",
    imageAlt: "Perseverance through professional and personal adversity",
    category: "personal",
    chapterNumber: 5,
    chapterTitle: "The Darkest Hour",
    emotionalArc: "challenge",
    quote: "Strength is not the absence of struggle, but perseverance through it.",
    narrative: {
      setup: "By early 2020, I was completing my bootcamp, interviewing at promising software companies, and preparing for the arrival of our first child. Everything seemed to be aligning.",
      conflict: "Then everything broke at once. Rejection after rejection from companies. And more painfully: we lost our baby. The weight was crushing—professional failure paired with personal tragedy that shattered our hopes.",
      resolution: "In the darkness, something crystallized. Instead of giving up, I doubled down. Every rejection became fuel. I kept learning, kept building, kept believing. I had to. My family's future depended on it. That stubborn determination became my anchor."
    },
    themes: ["resilience", "loss", "perseverance", "struggle"],
    impact: "high",
    location: "Colombia"
  },
  {
    id: 6,
    year: "2020",
    title: "Renewed Purpose: Fatherhood & Relocation",
    description:
      "Amidst continued studies and temporary work, a monumental blessing arrived - the birth of my daughter. Her presence lifted my depression and reignited my determination. After her arrival, we relocated to the calmer city of Pereira, where I dedicated myself fully to securing a career that could provide the future she deserves, intensifying my job search with newfound focus.",
    icon: <Sparkles className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748876599/7intento_hhofhn.jpg",
    imageAlt: "New beginnings with daughter in Pereira",
    category: "personal",
    chapterNumber: 6,
    chapterTitle: "A New Light",
    emotionalArc: "triumph",
    quote: "Sometimes the greatest blessing comes at the moment when hope feels lost.",
    narrative: {
      setup: "During the darkest period of rejections and grief, amidst temporary work and continued coding studies, something miraculous happened: my daughter was born.",
      conflict: "The weight of loss and disappointment had been suffocating. But her arrival shifted everything. I couldn't stay depressed—she needed me. We couldn't raise her in Bogotá; the city felt too chaotic for new fatherhood.",
      resolution: "We relocated to Pereira, a calmer city. With my daughter as my anchor and my newfound purpose as fuel, I intensified my job search with unprecedented focus and determination. Every rejection became less painful, every interview became more meaningful."
    },
    themes: ["fatherhood", "new-beginning", "determination", "hope"],
    impact: "high",
    location: "Pereira"
  },
  {
    id: 7,
    year: "2024",
    title: "Full-Stack Breakthrough & Family Drive",
    description:
      "Achieved my first developer role starting as front-end, but quickly impressed my employer with full-stack capabilities (APIs, databases, server management) thanks to relentless self-study. While my daughter continues to grow and light up my days, I'm now focused on sharpening my skills to build a better future for my family and help more businesses digitize and thrive through technology.",
    icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748877349/8intento_k0isga.jpg",
    imageAlt: "Developer working with family photo nearby",
    category: "work",
    chapterNumber: 7,
    chapterTitle: "The Breakthrough",
    emotionalArc: "triumph",
    quote: "Dreams deferred are not dreams denied, only dreams with deeper roots.",
    narrative: {
      setup: "After years of perseverance, sacrifice, and relentless learning, I finally landed my first developer role. It started as a front-end position, but I saw an opportunity to prove myself more comprehensively.",
      conflict: "The job was demanding and the imposter syndrome was real. I was surrounded by developers with years more experience. Every day felt like swimming upstream—but I kept learning, kept building, kept growing.",
      resolution: "My dedication paid off. Within months, I demonstrated full-stack capabilities beyond what was expected. My employer recognized my potential and my commitment. But more importantly, I recognized my own. The breakthrough wasn't just landing a job—it was finally becoming the developer I'd always believed I could be."
    },
    themes: ["breakthrough", "full-stack", "growth", "dedication", "success"],
    impact: "high",
    location: "Pereira"
  },
];

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  category: "education" | "work" | "project" | "achievement" | "personal";
  chapterNumber: number;
  chapterTitle: string;
  emotionalArc: "challenge" | "triumph" | "transformation" | "discovery";
  quote: string;
  
  // NEW: 3-act narrative structure
  narrative: {
    setup: string;
    conflict: string;
    resolution: string;
  };
  
  // NEW: Metadata for exploration
  themes: string[];
  impact: "low" | "medium" | "high";
  location?: string;
}
