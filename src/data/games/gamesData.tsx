import { Trophy, Gamepad2, Heart, Star, Calendar, Zap } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

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
   description: "Xenoblade X was my escape and my teacher. Navigating Mira's uncharted territories mirrored my own search for direction - each quest a lesson in adaptability, each alien creature a reminder that difference isn't danger. When earthbound problems weighed me down, piloting my Skell at sunset across the Primordia became meditation in motion, proving that perspective changes everything. This game didn't just offer an open world; it gave me mental space to breathe and grow.",
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
    achievements: 102, // ¡Por esos bonus ocultos!
  },
];

export const GameCard = ({ game, index }: { game: Game; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "playing":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      case "favorite":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Trophy className="h-4 w-4" />;
      case "playing":
        return <Gamepad2 className="h-4 w-4" />;
      case "favorite":
        return <Heart className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="game-card group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-pink-500/50 transition-all duration-500"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent z-10"></div>
        <Image
          src={game.imageUrl || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Status badge */}
        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            game.status
          )} backdrop-blur-sm flex items-center gap-1`}
        >
          {getStatusIcon(game.status)}
          {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-zinc-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < game.rating
                  ? "text-pink-400 fill-pink-400"
                  : "text-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {game.year}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              {game.hours}
            </span>
          </div>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">Genre</div>
            <div className="text-sm font-medium text-pink-300">
              {game.genre}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-xs text-zinc-500">Platform</div>
            <div className="text-sm font-medium text-pink-300">
              {game.platform}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Achievements</span>
            <span>{game.achievements}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-1000 achievement-bar"
              style={{ width: `${game.achievements}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};
