/* ============================================================
   PIXORA — Seed content data (starter demo content)
   26 posts with human-written titles, descriptions and tags.
   In the admin panel the owner can add/replace all content,
   and visitors can suggest new content which appears here
   after approval.
   ============================================================ */

const PIXORA_CATEGORIES = [
  { id: 'tech',    name: 'Tech',    emoji: '💻' },
  { id: 'game',    name: 'Gaming',  emoji: '🎮' },
  { id: 'anime',   name: 'Anime',   emoji: '🌸' },
  { id: 'news',    name: 'News',    emoji: '📰' },
  { id: 'music',   name: 'Music',   emoji: '🎵' },
  { id: 'movies',  name: 'Movies',  emoji: '🎬' },
  { id: 'sports',  name: 'Sports',  emoji: '⚽' },
  { id: 'travel',  name: 'Travel',  emoji: '✈️' },
  { id: 'food',    name: 'Food',    emoji: '🍜' },
  { id: 'art',     name: 'Art',     emoji: '🎨' },
  { id: 'city',    name: 'City',    emoji: '🌃' },
  { id: 'nature',  name: 'Nature',  emoji: '🌿' },
  { id: 'pets',    name: 'Pets',    emoji: '🐶' },
  { id: 'fun',     name: 'Fun',     emoji: '🎉' }
];

/* type: 'video' | 'image' ; yt = YouTube video id (for videos) */
const PIXORA_SEED = [
  /* ---------- ORIGINAL 6 ---------- */
  {
    id: 'seed-1',
    type: 'video',
    title: 'Big Buck Bunny — The Feel-Good Movie Everyone Needed',
    category: 'fun',
    thumb: 'assets/img/art.jpg',
    yt: 'aqz-KE-bpKQ',
    duration: '9:56',
    views: 128400,
    likes: 8210,
    age: '2 days ago',
    tags: ['animation', 'fun', 'classic'],
    desc: 'A cheerful open-movie classic that still makes us smile. Bright colors, big laughs and pure good vibes — the perfect way to start your day.',
    featured: true
  },
  {
    id: 'seed-2',
    type: 'image',
    title: 'Neon City Nights — When The Whole Street Starts Glowing',
    category: 'city',
    thumb: 'assets/img/city.jpg',
    views: 42300,
    likes: 3120,
    age: '5 hours ago',
    tags: ['neon', 'night', 'cinematic'],
    desc: 'Walked downtown after the rain and honestly could not stop taking photos. Every corner glows in purple, pink and blue — the city never sleeps.'
  },
  {
    id: 'seed-3',
    type: 'video',
    title: 'Costa Rica In 4K — This Place Looks Too Real To Be Earth',
    category: 'travel',
    thumb: 'assets/img/travel.jpg',
    yt: 'LXb3EKWsInQ',
    duration: '5:14',
    views: 215700,
    likes: 15400,
    age: '1 week ago',
    tags: ['travel', 'nature', '4k'],
    desc: 'Turquoise waterfalls, green rainforests and golden sunlight. Watched this three times in a row and immediately wanted to book a flight.',
    featured: true
  },
  {
    id: 'seed-4',
    type: 'image',
    title: 'Rainbow Smoothie Bowls — Food This Pretty Should Be Illegal 🍓',
    category: 'food',
    thumb: 'assets/img/food.jpg',
    views: 18900,
    likes: 2450,
    age: '1 day ago',
    tags: ['food', 'colorful', 'healthy'],
    desc: 'Fresh fruit, bright colors and glossy toppings everywhere. Made these at home over the weekend — they taste even better than they look.'
  },
  {
    id: 'seed-5',
    type: 'image',
    title: 'The New Neon Gadget Setup Trend — Totally Worth The Hype?',
    category: 'tech',
    thumb: 'assets/img/tech.jpg',
    views: 33200,
    likes: 4180,
    age: '3 days ago',
    tags: ['tech', 'gadgets', 'setup'],
    desc: 'We tested the glossy purple-pink setup everyone is talking about. Here is our honest take — and yes, it really does look this good in person.'
  },
  {
    id: 'seed-6',
    type: 'image',
    title: 'I Tried Painting With Just Three Colors — Here Is What Happened 🎨',
    category: 'art',
    thumb: 'assets/img/art.jpg',
    views: 27600,
    likes: 3900,
    age: '4 days ago',
    tags: ['art', 'painting', 'creative'],
    desc: 'Just me, acrylic paint and zero plan. The swirls came out way better than expected — sometimes accidents make the best art.'
  },

  /* ---------- 20 NEW POSTS ---------- */
  {
    id: 'new-1',
    type: 'video',
    title: 'Never Gonna Give You Up — The Song That Absolutely Never Gets Old 🎵',
    category: 'music',
    thumb: 'assets/img/music.jpg',
    yt: 'dQw4w9WgXcQ',
    duration: '3:33',
    views: 987000,
    likes: 64200,
    age: '6 hours ago',
    tags: ['music', 'classic', 'throwback'],
    desc: 'You clicked this and you know it. Decades later and this one still refuses to leave our playlists — some songs are simply immortal.',
    featured: true
  },
  {
    id: 'new-2',
    type: 'video',
    title: 'The Dance That Broke The Entire Internet — Still Iconic In 2026',
    category: 'fun',
    thumb: 'assets/img/city.jpg',
    yt: '9bZkp7q19f0',
    duration: '4:13',
    views: 4800000,
    likes: 210000,
    age: '1 day ago',
    tags: ['dance', 'viral', 'iconic'],
    desc: 'The video that turned the whole world into dancers overnight. We went back to watch it again and it still goes unbelievably hard.'
  },
  {
    id: 'new-3',
    type: 'image',
    title: '3AM Gaming Sessions Just Hit Different 🎮',
    category: 'game',
    thumb: 'assets/img/game.jpg',
    views: 51200,
    likes: 6800,
    age: '8 hours ago',
    tags: ['gaming', 'latenight', 'vibes'],
    desc: 'Quiet room, glowing keyboard, snacks on standby. If you know this feeling, you know — night gaming is a whole different universe.',
    featured: true
  },
  {
    id: 'new-4',
    type: 'image',
    title: 'This Anime Art Style Is Pure Eye Candy 🌸',
    category: 'anime',
    thumb: 'assets/img/anime.jpg',
    views: 76400,
    likes: 11200,
    age: '4 hours ago',
    tags: ['anime', 'sakura', 'art'],
    desc: 'Sakura petals, soft colors and that dreamy anime glow. Spent way too long just staring at this one — no regrets at all.'
  },
  {
    id: 'new-5',
    type: 'image',
    title: 'Breaking: The Tech World Is Moving Faster Than Ever',
    category: 'news',
    thumb: 'assets/img/news.jpg',
    views: 29800,
    likes: 2100,
    age: '2 hours ago',
    tags: ['news', 'tech', 'breaking'],
    desc: 'New gadgets, new chips, new AI tools — this week alone felt like a whole year of news. Here is everything that actually matters.'
  },
  {
    id: 'new-6',
    type: 'video',
    title: 'Despacito — One Song, The Whole World Singing Along',
    category: 'music',
    thumb: 'assets/img/music.jpg',
    yt: 'kJQP7kiw5Fk',
    duration: '4:42',
    views: 8200000,
    likes: 390000,
    age: '2 days ago',
    tags: ['music', 'global', 'summer'],
    desc: 'The song that proved music has no borders. Put it on at any party anywhere on earth and watch everyone start moving.'
  },
  {
    id: 'new-7',
    type: 'image',
    title: 'Somewhere Out There — A Nebula 4,000 Light Years Away 🌌',
    category: 'nature',
    thumb: 'assets/img/space.jpg',
    views: 44100,
    likes: 5900,
    age: '9 hours ago',
    tags: ['space', 'nature', 'wow'],
    desc: 'Sometimes you look up and remember how tiny we all are. This glowing cloud of stars is bigger than our whole solar system.'
  },
  {
    id: 'new-8',
    type: 'image',
    title: 'Last Night Final Was Absolute Chaos (In The Best Way) 🏟️',
    category: 'sports',
    thumb: 'assets/img/sports.jpg',
    views: 88600,
    likes: 9400,
    age: '12 hours ago',
    tags: ['sports', 'football', 'final'],
    desc: 'Two last-minute goals, a packed stadium and pure screaming at the screen. Instant classic — we are still not over it.'
  },
  {
    id: 'new-9',
    type: 'video',
    title: 'Bohemian Rhapsody — 6 Minutes Of Pure Genius',
    category: 'movies',
    thumb: 'assets/img/cinema.jpg',
    yt: 'fJ9rUzIMcZQ',
    duration: '5:59',
    views: 1300000,
    likes: 98000,
    age: '3 days ago',
    tags: ['music', 'classic', 'queen'],
    desc: 'Opera, rock and absolute madness in one song. Every time it comes on, nobody talks — we just sing every single word.'
  },
  {
    id: 'new-10',
    type: 'image',
    title: 'Found This Little Guy Today — Instant Mood Booster 🐶',
    category: 'pets',
    thumb: 'assets/img/pet.jpg',
    views: 120400,
    likes: 18700,
    age: '7 hours ago',
    tags: ['pets', 'cute', 'dogs'],
    desc: 'Was having the longest day until this fluffy ball of happiness showed up. Science says pets lower stress — we believe it now.',
    featured: true
  },
  {
    id: 'new-11',
    type: 'image',
    title: 'Movie Night Rules That Everyone Secretly Agrees On 🍿',
    category: 'movies',
    thumb: 'assets/img/cinema.jpg',
    views: 35700,
    likes: 4600,
    age: '1 day ago',
    tags: ['movies', 'fun', 'movienight'],
    desc: 'Phones down, snacks ready, no talking during the good part. These are the unwritten laws of a perfect movie night.'
  },
  {
    id: 'new-12',
    type: 'video',
    title: 'Alan Walker — Faded | Still Gives Chills After All These Years',
    category: 'music',
    thumb: 'assets/img/space.jpg',
    yt: '60ItHLz5WEA',
    duration: '3:32',
    views: 3600000,
    likes: 172000,
    age: '5 days ago',
    tags: ['music', 'edm', 'chills'],
    desc: 'That drop still hits the same way it did the first time. Some songs follow you around for years — this is one of them.'
  },
  {
    id: 'new-13',
    type: 'image',
    title: 'Street Food At Night Is A Whole Different Universe 🍜',
    category: 'food',
    thumb: 'assets/img/food.jpg',
    views: 41200,
    likes: 5300,
    age: '2 days ago',
    tags: ['food', 'streetfood', 'night'],
    desc: 'Steam, neon lights and that smell from two stalls away. Honestly, night markets just taste better than any fancy restaurant.'
  },
  {
    id: 'new-14',
    type: 'image',
    title: 'Rainy Night Walks Downtown Feel Like A Movie 🌃',
    category: 'city',
    thumb: 'assets/img/city.jpg',
    views: 26400,
    likes: 3700,
    age: '3 days ago',
    tags: ['city', 'rain', 'cinematic'],
    desc: 'Wet streets turning every sign into a colorful reflection. Put headphones on and suddenly you are the main character.'
  },
  {
    id: 'new-15',
    type: 'video',
    title: 'The Very First YouTube Video Ever — A Piece Of Internet History',
    category: 'news',
    thumb: 'assets/img/news.jpg',
    yt: 'jNQXAC9IVRw',
    duration: '0:19',
    views: 310000,
    likes: 24000,
    age: '6 days ago',
    tags: ['news', 'internet', 'history'],
    desc: 'Nineteen seconds at a zoo that started a revolution. Funny to think this little clip is the great-grandfather of everything we watch today.'
  },
  {
    id: 'new-16',
    type: 'image',
    title: 'This Hidden Waterfall Is Real — And Even Better In Person',
    category: 'travel',
    thumb: 'assets/img/travel.jpg',
    views: 57800,
    likes: 7900,
    age: '4 days ago',
    tags: ['travel', 'waterfall', 'hidden'],
    desc: 'Took three hours of hiking and one wrong turn to find it. Completely worth it — photos honestly do not do this place justice.'
  },
  {
    id: 'new-17',
    type: 'video',
    title: 'Counting Stars — The Song Everyone Knows By Heart',
    category: 'music',
    thumb: 'assets/img/sports.jpg',
    yt: 'hT_nvWreIhg',
    duration: '4:44',
    views: 1900000,
    likes: 121000,
    age: '1 week ago',
    tags: ['music', 'feelgood', 'anthem'],
    desc: 'The kind of song that makes a boring car ride feel like a road trip movie. Still on every summer playlist we make.'
  },
  {
    id: 'new-18',
    type: 'image',
    title: 'My Honest Take On The New RGB Gaming Setup Trend 💡',
    category: 'game',
    thumb: 'assets/img/game.jpg',
    views: 33900,
    likes: 4200,
    age: '5 days ago',
    tags: ['gaming', 'setup', 'rgb'],
    desc: 'Is all this neon actually worth it? After two weeks with it — yeah, kind of. The vibe alone makes the games feel better.'
  },
  {
    id: 'new-19',
    type: 'video',
    title: 'Adele — Hello | The Voice That Stops Time',
    category: 'movies',
    thumb: 'assets/img/cinema.jpg',
    yt: 'YQHsXMglC9A',
    duration: '6:07',
    views: 2700000,
    likes: 189000,
    age: '1 week ago',
    tags: ['music', 'emotional', 'voice'],
    desc: 'One note in and the whole room goes quiet. Some voices do not just sing — they reach in and rearrange your feelings.'
  },
  {
    id: 'new-20',
    type: 'image',
    title: 'Sakura Season Is Coming — Are You Ready? 🌸',
    category: 'anime',
    thumb: 'assets/img/anime.jpg',
    views: 62500,
    likes: 8800,
    age: '11 hours ago',
    tags: ['anime', 'spring', 'sakura'],
    desc: 'Pink skies, falling petals and that soft anime feeling in real life. Saving these colors for the whole year — spring is undefeated.'
  }
];

/* Local storage keys
   pixora_posts      -> custom posts added via admin
   pixora_suggestions-> visitor suggestions
   pixora_likes      -> array of liked post ids
   pixora_ads        -> { top, left, right, video, inline, bottom } ad codes
*/
const PIXORA_STORE = {
  posts: 'pixora_posts',
  suggestions: 'pixora_suggestions',
  likes: 'pixora_likes',
  ads: 'pixora_ads'
};

function pixoraLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function pixoraSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function getPosts() {
  const custom = pixoraLoad(PIXORA_STORE.posts, []);
  return [...custom, ...PIXORA_SEED];
}

function getSuggestions() {
  return pixoraLoad(PIXORA_STORE.suggestions, []);
}

function getLikedIds() {
  return pixoraLoad(PIXORA_STORE.likes, []);
}

function getAdCodes() {
  return pixoraLoad(PIXORA_STORE.ads, {});
}

/* ============================================================
   DEFAULT AD CODES — owner's ad network (live by default)
   Codes saved in the admin panel override these per slot.
   ============================================================ */
const PIXORA_SMARTLINK = 'https://www.profitableratecpmnetwork.com/ew6f2npa?key=90d9873b4d7c482d0b750b2f9f2b5366';

function pixoraSmartBanner(size) {
  return '<a class="smart-banner ' + size + '" href="' + PIXORA_SMARTLINK + '" target="_blank" rel="noopener noreferrer nofollow sponsored">' +
    '<span class="sb-tag">ADVERTISEMENT</span>' +
    '<span class="sb-text">✨ Sponsored — Tap to Discover More</span>' +
    '<span class="sb-cta">Open →</span>' +
  '</a>';
}

/* Banner 300x250 (highrevenueformat) */
const PIXORA_AD_BANNER_300 =
  '<script>atOptions = {"key":"4093815dc3a516054c437d85c1f82b79","format":"iframe","height":250,"width":300,"params":{}};</' + 'script>' +
  '<script src="https://www.highrevenueformat.com/4093815dc3a516054c437d85c1f82b79/invoke.js"></' + 'script>';

/* Native Banner (profitableratecpmnetwork) */
const PIXORA_AD_NATIVE =
  '<script async="async" data-cfasync="false" src="https://pl31531332.profitableratecpmnetwork.com/73531b2519011baeccbe89da0b376634/invoke.js"></' + 'script>' +
  '<div id="container-73531b2519011baeccbe89da0b376634"></div>';

const PIXORA_DEFAULT_ADS = {
  top: pixoraSmartBanner('wide'),
  left: PIXORA_AD_BANNER_300,
  right: PIXORA_AD_BANNER_300,
  video: pixoraSmartBanner('video'),
  inline: PIXORA_AD_NATIVE,
  bottom: pixoraSmartBanner('wide')
};
