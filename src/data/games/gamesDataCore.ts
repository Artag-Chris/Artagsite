/**
 * Server-safe game data.
 * Plain data (no React imports) so both client components and API routes can import it.
 * Used as the static fallback when live API integrations (Steam Web API / RAWG) aren't configured.
 */

export interface Game {
  id: number;
  title: string;
  genre: string;
  year: string;
  rating: number;
  hours: string;
  description: string;
  imageUrl: string;
  platform: string;
  status: "completed" | "playing" | "favorite";
  achievements: number;
}

export const favoriteGames: Game[] = [
  {
    id: 1,
    title: "Final Fantasy IX",
    genre: "JRPG",
    year: "2000",
    rating: 5,
    hours: "100+",
    description:
      "This journey taught me that helping others needs no justification - it showed me true mercy while revealing life's transient nature. Yet through Vivi's eyes, I learned that impermanence makes every moment more precious: to live fiercely with wonder, joy, and unguarded emotion.",
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748882927/Screenshot_2025-06-02_114817_b6loy6.png",
    platform: "PlayStation",
    status: "completed",
    achievements: 100,
  },
  {
    id: 2,
    title: "Final Fantasy VII",
    genre: "JRPG",
    year: "1997",
    rating: 5,
    hours: "120+",
    description:
      "Cloud's journey became my mirror: a powerful lesson that true strength comes not from manufactured identities, but from embracing our imperfect selves. His struggle taught me that we fall when pretending to be someone else, but rise when we accept our flaws and value those who stand with us - for only in authenticity do we find power to face our personal Sephiroths.",
    imageUrl:
      "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748883215/Screenshot_2025-06-02_115314_b88tkg.png",
    platform: "PlayStation",
    status: "completed",
    achievements: 98,
  },
  {
    id: 3,
    title: "Xenoblade Chronicles X",
    genre: "Sci-Fi RPG",
    year: "2015",
    rating: 5,
    hours: "200+",
    description:
      "Xenoblade X was my escape and my teacher. Navigating Mira's uncharted territories mirrored my own search for direction - each quest a lesson in adaptability, each alien creature a reminder that difference isn't danger. When earthbound problems weighed me down, piloting my Skell at sunset across the Primordia became meditation in motion, proving that perspective changes everything. This game didn't just offer an open world; it gave me mental space to breathe and grow.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748883463/Screenshot_2025-06-02_115722_u8xue3.png",
    platform: "Wii U",
    status: "favorite",
    achievements: 85,
  },
  {
    id: 4,
    title: "Monster Hunter: Rise",
    genre: "Action RPG",
    year: "2020",
    rating: 5,
    hours: "300+",
    description:
      "Where preparation meets execution - each hunt a puzzle demanding pattern recognition and adaptability.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748883669/Screenshot_2025-06-02_120046_gkadhc.png",
    platform: "PC",
    status: "playing",
    achievements: 92,
  },
  {
    id: 5,
    title: "Hades",
    genre: "Roguelike",
    year: "2020",
    rating: 5,
    hours: "80+",
    description:
      "Perfection in repetition - where each escape attempt taught me that failure is just progress in disguise.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748883784/Screenshot_2025-06-02_120245_hi84ck.png",
    platform: "PC",
    status: "completed",
    achievements: 100,
  },
  {
    id: 6,
    title: "Batman: Arkham City",
    genre: "Action Adventure",
    year: "2011",
    rating: 5,
    hours: "50+",
    description:
      "Becoming the Dark Knight - predator mechanics that made me feel like a tactical genius in every encounter.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748883867/Screenshot_2025-06-02_120403_k7kkuj.png",
    platform: "PlayStation",
    status: "completed",
    achievements: 100,
  },
  {
    id: 7,
    title: "Devil May Cry 5",
    genre: "Character Action",
    year: "2019",
    rating: 5,
    hours: "70+",
    description:
      "Style is everything - where mastering combos became a dance of precision and creative expression.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748883984/Screenshot_2025-06-02_120606_wefnz9.png",
    platform: "PC",
    status: "completed",
    achievements: 88,
  },
  {
    id: 8,
    title: "Resident Evil 4",
    genre: "Survival Horror",
    year: "2005",
    rating: 5,
    hours: "20+",
    description:
      "Tension perfected - taught me resource management under pressure and that a well-placed shot changes everything.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748884056/Screenshot_2025-06-02_120719_j9jqzs.png",
    platform: "GameCube",
    status: "favorite",
    achievements: 100,
  },
  {
    id: 9,
    title: "Donkey Kong Country 2",
    genre: "Platformer",
    year: "1995",
    rating: 5,
    hours: "30+",
    description:
      "Pure platforming perfection - where every jump and barrel blast felt like solving a rhythmic puzzle.",
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1748884143/Screenshot_2025-06-02_120849_pn2mwk.png",
    platform: "SNES",
    status: "completed",
    achievements: 102,
  },
];