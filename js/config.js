/**
 * ====================================================================
 *  ADITI'S 21st BIRTHDAY SURPRISE — CENTRAL CONFIGURATION
 * ====================================================================
 * 
 * Recipient: Aditi (Ishaa)
 * Sender: Mani
 * Inside Phrase: "To Billie from Billoute"
 * Birthday: September 6, 2005 (Chapter 21)
 * 
 * Features ONLY Aditi's 6 authentic personal photos!
 * ====================================================================
 */

const birthdayConfig = {
  // ------------------------------------------------------------------
  // 1. RECIPIENT & SENDER DETAILS
  // ------------------------------------------------------------------
  recipientName: "Aditi",
  nickname: "Ishaa",
  senderName: "Mani",
  relationship: "bestest friend",
  birthDate: "2005-09-06", // YYYY-MM-DD
  milestoneAge: 21,
  
  // The iconic inside phrase / secret code between you two:
  insideJoke: "To Billie from Billoute",
  
  // ------------------------------------------------------------------
  // 2. AUDIO SETTINGS — APNA BANA LE
  // ------------------------------------------------------------------
  audio: {
    songTitle: "Apna Bana Le — Arijit Singh",
    artist: "Sachin-Jigar • Dedicated to Ishaa by Mani",
    songFile: "audio/apna-bana-le.mp3",
    fallbackSongFile: "audio/birthday-song.mp3",
    youtubeVideoId: "e-ORhEE9VVg", // Official "Apna Bana Le" (Bhediya)
    enableYouTubePlayback: true,
    enableProceduralFallback: true // Plays dreamy music-box rendition of Apna Bana Le if offline
  },

  // ------------------------------------------------------------------
  // 3. CINEMATIC OPENING (CHAPTER 0)
  // ------------------------------------------------------------------
  intro: {
    greeting: "Hey Aditi...",
    subGreeting: "Take a deep breath and turn your sound on 🎧",
    lines: [
      "Today isn't just another day on the calendar.",
      "Because 21 years ago today, someone truly irreplaceable entered this world.",
      "Someone who laughs with wholehearted joy, listens with genuine warmth,",
      "and makes life so much brighter just by being in it."
    ],
    highlightName: "Happy 21st Birthday, Ishaa ❤️",
    buttonText: "Open Your Surprise ✨"
  },

  // ------------------------------------------------------------------
  // 4. HERO BIRTHDAY SECTION (CHAPTER 1 & 2)
  // ------------------------------------------------------------------
  hero: {
    badge: "✨ CHAPTER 21 • SEPTEMBER 6, 2026 ✨",
    heading: "Happy Birthday, Aditi!",
    tagline: "Today is all about celebrating the wonderful human you are.",
    dedication: "To Billie from Billoute — with endless love & laughter.",
    heartfeltMessage: `Some friendships happen by chance, but staying this close and sharing so much of life is something I treasure every single day. From the wildest laughs that made our stomachs ache to the quiet, honest conversations when everything felt overwhelming — you've been my constant anchor and my favorite partner-in-crime. Turning 21 isn't just a milestone; it's a celebration of every smile you've given the world, every challenge you've overcome with quiet grace, and the unforgettable story we keep writing together.`
  },

  // ------------------------------------------------------------------
  // 5. PHOTO MEMORY WALL (CHAPTER 3)
  // ONLY the 5 real photos of Aditi!
  // ------------------------------------------------------------------
  memories: [
    {
      id: "mem-1",
      image: "images/photo-01.jpg",
      title: "Grace in Every Detail",
      date: "Traditional Elegance",
      caption: "Looking absolutely ethereal — quiet grace and that gentle smile that warms everyone's heart.",
      story: "Every time you dress up, you carry yourself with such effortless poise. You don't just look stunning; you radiate genuine peace, kindness, and beauty from within.",
      tag: "Ethereal",
      rotation: -2.5
    },
    {
      id: "mem-2",
      image: "images/photo-02.jpg",
      title: "The Effortless Glow",
      date: "Candid Perfection",
      caption: "Unfiltered, authentic, and naturally radiant — you don't even have to try.",
      story: "This is the Ishaa I know best — real, expressive, and always lighting up any room with just a glance. Never let anyone dim this spark of yours.",
      tag: "Natural Radiance",
      rotation: 2
    },
    {
      id: "mem-3",
      image: "images/photo-03.jpg",
      title: "Iconic & Unstoppable",
      date: "Classic Monochrome",
      caption: "A mood, a vibe, and pure confidence. Looking like a frame straight out of a classic movie.",
      story: "There's a quiet strength in you that commands respect without ever saying a loud word. Seeing you here reminds me how fiercely capable, resilient, and bold you are.",
      tag: "Timeless",
      rotation: -3
    },
    {
      id: "mem-4",
      image: "images/photo-04.jpg",
      title: "Wild, Free & Full of Life",
      date: "Ocean Memories",
      caption: "Waves at your feet, arms open to the world, and that genuine million-dollar smile.",
      story: "This photo captures your spirit at its purest — joyful, free, and embracing life with both hands. I hope your 21st year feels just like this moment: light, limitless, and full of sunshine.",
      tag: "Pure Joy",
      rotation: 3
    },
    {
      id: "mem-5",
      image: "images/photo-05.jpg",
      title: "Bloom Wherever You Go",
      date: "Garden Serenity",
      caption: "Standing amidst blossoms, looking every bit as lovely as the scenery around you.",
      story: "No matter where life takes you, you bring life and warmth wherever you stand. Here's to blooming even brighter in Chapter 21, Billie!",
      tag: "Chapter 21",
      rotation: -1.5
    },
    {
      id: "mem-6",
      image: "images/photo-06.jpg",
      title: "That Thoughtful Sweet Smile",
      date: "Everyday Magic",
      caption: "Glasses on, thoughtful gaze, and that quiet smile that shows your beautiful soul.",
      story: "There's an effortless charm in how you look at the world. Behind those stylish specs is a sharp mind, a golden heart, and someone who always sees the best in others. Never change this adorable, wonderful side of you, Ishaa!",
      tag: "Pure Soul",
      rotation: 2.5
    }
  ],

  // ------------------------------------------------------------------
  // 6. HER JOURNEY TIMELINE (CHAPTER 4)
  // ------------------------------------------------------------------
  timeline: [
    {
      year: "2005",
      date: "September 6, 2005",
      title: "The Star Arrives ✨",
      description: "The world welcomed Aditi — bringing unmatched kindness, a sparkling smile, and a heart destined to touch so many lives.",
      icon: "baby"
    },
    {
      year: "The Beginning",
      date: "When Destiny Played Its Card",
      title: "The Birth of Billie & Billoute",
      description: "Two chaotic souls crossed paths. Little did we know that a simple introduction would blossom into the most unconditional, legendary friendship.",
      icon: "handshake"
    },
    {
      year: "The Growth",
      date: "Uncounted Cups of Chai & Talks",
      title: "Late Nights & Life Conspiracies",
      description: "From sharing our deepest anxieties to laughing at the most absurd memes until tears rolled down our cheeks. You became family.",
      icon: "coffee"
    },
    {
      year: "The Storms",
      date: "Through Every High & Low",
      title: "The Constant Anchor",
      description: "People come and go, but whenever life felt like a hurricane, having you by my side was the one certainty I could always count on.",
      icon: "shield"
    },
    {
      year: "2026",
      date: "September 6, 2026",
      title: "Chapter 21 • Golden & Glowing 🎂",
      description: "21 years of being wonderful, inspiring, kind, and uniquely YOU. The world is yours to conquer, and I'm cheering for you every step of the way.",
      icon: "sparkles"
    }
  ],

  // ------------------------------------------------------------------
  // 7. THINGS I ADMIRE ABOUT YOU (CHAPTER 5)
  // ------------------------------------------------------------------
  admirations: [
    {
      id: "adm-1",
      title: "Your Pure Kindness",
      subtitle: "The way you treat people",
      icon: "heart",
      description: "You have a natural empathy that is so rare today. You genuinely care about how others feel and never hesitate to offer warmth without asking for anything in return.",
      secretNote: "It's one of the things that makes being around you so comforting."
    },
    {
      id: "adm-2",
      title: "Your Infectious Laugh",
      subtitle: "The ultimate mood lifter",
      icon: "smile",
      description: "Your laugh is completely contagious. Half the time, I'm not even laughing at the joke — I'm laughing because hearing you crack up makes it impossible not to smile.",
      secretNote: "Even on the gloomiest days, it lights up everything."
    },
    {
      id: "adm-3",
      title: "Your Quiet Strength",
      subtitle: "Resilience in its truest form",
      icon: "feather",
      description: "You carry so much with elegance. Even when situations get difficult or exhausting, you pick yourself up with grace, dust off, and keep moving forward.",
      secretNote: "I have so much respect for how strong you truly are."
    },
    {
      id: "adm-4",
      title: "The Way You Listen",
      subtitle: "A true sanctuary",
      icon: "message-circle",
      description: "You don't just wait for your turn to speak — you actually listen with your whole heart. With you, no thought is too trivial, and no worry is too silly to share.",
      secretNote: "You are the safest space I know."
    },
    {
      id: "adm-5",
      title: "Making Hard Days Lighter",
      subtitle: "An effortless superpower",
      icon: "sun",
      description: "A single text or five-minute conversation with you has the supernatural ability to turn a terrible day completely around. That's a genuine gift.",
      secretNote: "Don't ever underestimate the positive impact you have."
    },
    {
      id: "adm-6",
      title: "Your Unfiltered Honesty",
      subtitle: "Always 100% real",
      icon: "compass",
      description: "You're always genuine. No pretense, no masks. If I'm making a silly decision, you'll tell me straight — but you'll stand right beside me while I figure it out.",
      secretNote: "Best friends tell you the truth, and you do it with love."
    }
  ],

  // ------------------------------------------------------------------
  // 8. THE HEARTFELT LETTER (CHAPTER 6)
  // ------------------------------------------------------------------
  letter: {
    envelopeTitle: "A Little Something From My Heart...",
    sealText: "B & B",
    letterDate: "September 6, 2026",
    letterRecipient: "Dearest Ishaa (Billie),",
    paragraphs: [
      "How do I even begin to explain how important you are to me?",
      "Sometimes I think about how fast time flies. It feels like just yesterday we were sharing our first random conversation, and now, here you are, stepping into 21 — radiating poise, beauty, and incredible wisdom.",
      "Friendship isn't about who you've known the longest; it's about who walked into your life, said 'I'm here for you,' and proved it every single day. Through all our inside jokes, spontaneous tangents, late-night existential talks, and unspoken understandings across crowded rooms — you have been that person for me.",
      "Some people enter our lives for a fleeting reason. Some become bittersweet memories. And a very, very few become an inseparable part of who we are. You are that rare gem in my life, Aditi.",
      "As you blow out your 21 candles, I hope you take a moment to look at how far you've come. I hope you know how deeply you are appreciated, how proud I am of the person you're growing into, and how much happiness you bring into my world.",
      "Never doubt your worth, never dim your spark, and never change the gentle, fierce, beautiful soul you are. Whatever mountains you choose to climb this year, know that your biggest cheerleader is right here in your corner.",
      "Happy 21st Birthday, my bestest friend."
    ],
    closing: "Forever and always,",
    signature: "— Mani (Billoute)"
  },

  // ------------------------------------------------------------------
  // 9. THE MEMORY VAULT / SECRET FLIP CARDS (CHAPTER 7)
  // ------------------------------------------------------------------
  secretCards: [
    {
      id: "vault-1",
      number: "01",
      hint: "The Origin Story",
      frontTitle: "Why 'Billie & Billoute'?",
      icon: "sparkles",
      revealedTitle: "Our Secret Code",
      revealedText: "It started as a random ridiculous joke that made no sense to anyone else, but became our trademark. Whenever you hear it, remember you have a lifelong teammate.",
      bgGradient: "from-pink-500/20 to-purple-500/20"
    },
    {
      id: "vault-2",
      number: "02",
      hint: "Emergency Dial",
      frontTitle: "The 2 AM Panic Button",
      icon: "phone-call",
      revealedTitle: "No Matter The Time",
      revealedText: "Whether it's happy news, life drama, or you just saw a funny dog video at 3 AM — your name lighting up my screen will always be welcomed.",
      bgGradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      id: "vault-3",
      number: "03",
      hint: "Comfort Food",
      frontTitle: "Cravings & Debates",
      icon: "coffee",
      revealedTitle: "The Food Chronicles",
      revealedText: "We have spent an ungodly amount of time debating what to eat, only to end up with the same favorite comfort food every single time.",
      bgGradient: "from-amber-500/20 to-rose-500/20"
    },
    {
      id: "vault-4",
      number: "04",
      hint: "Silent Telepathy",
      frontTitle: "The Unspoken Glance",
      icon: "eye",
      revealedTitle: "Friendship Telepathy",
      revealedText: "The ability to look at each other in a room full of people and instantly know exactly what the other is thinking without uttering a single syllable.",
      bgGradient: "from-fuchsia-500/20 to-pink-500/20"
    },
    {
      id: "vault-5",
      number: "05",
      hint: "Ab Workout",
      frontTitle: "Tears of Laughter",
      icon: "laugh",
      revealedTitle: "Laughing Till We Choked",
      revealedText: "Those moments where someone said something so dumb that we couldn't breathe, clutching our stomachs, with no sound coming out except silent wheezes.",
      bgGradient: "from-violet-500/20 to-purple-500/20"
    },
    {
      id: "vault-6",
      number: "06",
      hint: "The Vow",
      frontTitle: "The Lifelong Contract",
      icon: "heart-handshake",
      revealedTitle: "Terms & Conditions",
      revealedText: "Warning: There is no refund, no exchange, and no cancellation policy on this friendship. You are stuck with me for at least the next 80 years!",
      bgGradient: "from-pink-500/20 to-amber-500/20"
    }
  ],

  // ------------------------------------------------------------------
  // 10. SCIENTIFIC FRIENDSHIP ANALYSIS (CHAPTER 8)
  // ------------------------------------------------------------------
  scientificStats: {
    sectionTitle: "A Very Serious Scientific Analysis...",
    subtitle: "Peer-reviewed data collected over years of friendship",
    stats: [
      {
        label: "Laughs Shared",
        value: 9999,
        suffix: "+",
        subtext: "Approximately 80% occurred at inappropriate times",
        icon: "laugh"
      },
      {
        label: "2 AM Life Talks",
        value: "∞",
        isText: true,
        subtext: "Covering philosophy, food, and existential crisis",
        icon: "moon"
      },
      {
        label: "Unnecessary Debates",
        value: "Classified 🤫",
        isText: true,
        subtext: "We were both wrong, but neither will ever admit it",
        icon: "zap"
      },
      {
        label: "Shared Braincells",
        value: "1.5",
        isText: true,
        subtext: "And that's on a particularly productive Tuesday",
        icon: "cpu"
      },
      {
        label: "Memories Made",
        value: "Countless",
        isText: true,
        subtext: "And the best ones are still yet to come",
        icon: "camera"
      },
      {
        label: "Friendship Level",
        value: "LEGENDARY ❤️",
        isText: true,
        subtext: "Permanent, certified, unbreakable tier",
        icon: "award"
      }
    ]
  },

  // ------------------------------------------------------------------
  // 11. WISHES FOR THE YEAR AHEAD (CHAPTER 9)
  // ------------------------------------------------------------------
  futureWishes: [
    {
      id: "wish-1",
      icon: "sun",
      title: "Endless Reasons to Smile",
      wish: "May your days be filled with little moments of unexpected joy, warm sunshine, and people who make your heart feel light."
    },
    {
      id: "wish-2",
      icon: "compass",
      title: "Dreams Taking Flight",
      wish: "May every goal you've quietly whispered to yourself this past year find its wings and turn into reality."
    },
    {
      id: "wish-3",
      icon: "heart",
      title: "People Who Value Your Heart",
      wish: "May you always be surrounded by those who appreciate your kindness, respect your boundaries, and match your loyalty."
    },
    {
      id: "wish-4",
      icon: "anchor",
      title: "Gentleness on Heavy Days",
      wish: "May your hardest moments be brief, and may you remember that even on tough days, you are stronger than you realize."
    },
    {
      id: "wish-5",
      icon: "sparkles",
      title: "Unforgettable Adventures",
      wish: "May your 21st year be a tapestry of new places, sweet surprises, cozy evenings, and core memories you'll treasure forever."
    }
  ],

  // ------------------------------------------------------------------
  // 12. GRAND FINALE & COLLAGE (CHAPTER 10)
  // ------------------------------------------------------------------
  finale: {
    suspense1: "Wait... there's just one more thing.",
    suspense2: "I couldn't fit everything I wanted to say into one page...",
    grandRevealBig: "Thank You For Being YOU.",
    grandRevealBirthday: "Happy 21st Birthday, Aditi! ❤️",
    collageQuote: "More memories. More laughter. More adventures.",
    collageSub: "This is only the beginning.",
    buttonConfetti: "Celebrate Ishaa! 🎉"
  },

  // ------------------------------------------------------------------
  // 13. SECRET EASTER EGG
  // ------------------------------------------------------------------
  easterEgg: {
    hintTooltip: "Psst... click the golden star ✨",
    modalTitle: "Secret Note Unlocked! 🤫",
    message: "P.S. You're officially stuck with me for at least the next 80 years. No refunds, no exchanges, and absolutely no cancellations! 😌❤️",
    signoff: "— To Billie from Billoute, always."
  }
};

// Expose globally to window
if (typeof window !== "undefined") {
  window.birthdayConfig = birthdayConfig;
}
