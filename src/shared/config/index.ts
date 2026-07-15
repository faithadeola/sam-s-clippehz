export interface ServiceConfig {
  readonly id: string;
  readonly guard: string;
  readonly name: string;
  readonly mins: number;
  readonly blurb: string;
  readonly price?: number;
  readonly photo?: string;
}

export interface ProductConfig {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  readonly photo?: string;
}

export interface HoursEntry {
  readonly mon: [string, string];
  readonly tue: [string, string];
  readonly wed: [string, string];
  readonly thu: [string, string];
  readonly fri: [string, string];
  readonly sat: [string, string];
  readonly sun: [string, string] | null;
}

export interface Config {
  readonly brand: {
    readonly name: string;
    readonly owner: string;
    readonly tagline: string;
    readonly since: number;
    readonly city: string;
  };
  readonly contact: {
    readonly whatsapp: string;
    readonly phone: string;
    readonly address: string;
    readonly mapsUrl: string;
    readonly facebook: string;
    readonly instagram: string;
    readonly tiktok: string;
  };
  readonly hours: HoursEntry;
  readonly timezone: string;
  readonly showPrices: boolean;
  readonly services: readonly ServiceConfig[];
  readonly products: readonly ProductConfig[];
  readonly homeService: {
    readonly enabled: boolean;
    readonly surcharge: number | null;
    readonly radiusNote: string;
  };
  readonly loyalty: {
    readonly enabled: boolean;
    readonly stampsRequired: number;
    readonly reward: string;
  };
  readonly referral: {
    readonly enabled: boolean;
    readonly reward: string;
  };
  readonly reminders: {
    readonly defaultIntervalDays: number;
  };
  readonly academy: {
    readonly enabled: boolean;
    readonly blurb: string;
  };
}

export const CONFIG: Config = {
  brand: {
    name: "Sam's Clipperhz",
    owner: "Adewole 'Sam'",
    tagline: "Ibadan's finest cut. Orisunbare Street.",
    since: 2015,
    city: "Ibadan",
  },

  contact: {
    whatsapp: "2349134339192",
    phone: "0913 433 9192",
    address: "9 Orisunbare Street, Ibadan, Oyo State",
    mapsUrl: "https://maps.app.goo.gl/MUFSZfgCiKuNeyv26",
    facebook: "https://web.facebook.com/people/Sams-clipperhz/100044996085547/",
    instagram: "sams_clipperhz",
    tiktok: "sams_clipperhz2020",
  },

  hours: {
    mon: ["08:00", "22:00"],
    tue: ["08:00", "22:00"],
    wed: ["08:00", "22:00"],
    thu: ["08:00", "22:00"],
    fri: ["08:00", "22:00"],
    sat: ["08:00", "22:00"],
    sun: ["13:00", "22:00"],
  },
  timezone: "Africa/Lagos",

  showPrices: false,

  services: [
    { id: "low-cut",   guard: "2",   name: "Low cut",           mins: 30, blurb: "Clean, even, sharp line-up.",           photo: "/images/cuts/low-cut.jpg" },
    { id: "skin-fade", guard: "0",   name: "Skin fade",         mins: 45, blurb: "Bald at the base, blended to the top.", photo: "/images/cuts/skin-fade.jpg" },
    { id: "taper",     guard: "1",   name: "Taper fade",        mins: 40, blurb: "Soft gradient, no hard line.",           photo: "/images/cuts/taper.jpg" },
    { id: "beard",     guard: "0.5", name: "Beard sculpt",      mins: 20, blurb: "Shaped, lined, oiled.",                 photo: "/images/cuts/beard.jpg" },
    { id: "combo",     guard: "✦",   name: "Cut + beard",       mins: 60, blurb: "The full reset.",                       photo: "/images/cuts/combo.jpg" },
    { id: "kids",      guard: "3",   name: "Kids cut",          mins: 25, blurb: "Under 12. Patient hands.",              photo: "/images/cuts/kids.jpg" },
    { id: "dye",       guard: "✦",   name: "Colour / dye",      mins: 60, blurb: "Black, brown, or bold.",                photo: "/images/cuts/dye.jpg" },
    { id: "locs",      guard: "✦",   name: "Dreadlock retwist", mins: 90, blurb: "Neat roots, tight twist.",              photo: "/images/cuts/locs.jpg" },
  ],

  products: [
    { id: "clippers",   name: "Professional clippers", blurb: "The same tools Sam uses. Available to take home.", photo: "/images/products/clippers.jpg" },
    { id: "pomade",     name: "Hair pomade",            blurb: "Hold and shine. Barber-grade.",                   photo: "/images/products/pomade.jpg" },
    { id: "beard-oil",  name: "Beard oil",              blurb: "Conditions, softens, and scents the beard.",      photo: "/images/products/beard-oil.jpg" },
    { id: "shampoo",    name: "Barber shampoo",         blurb: "Deep clean for scalp and hair.",                  photo: "/images/products/shampoo.jpg" },
    { id: "hair-spray", name: "Hair moisturiser",       blurb: "Locks in moisture between cuts.",                 photo: "/images/products/hair-spray.jpg" },
  ],

  homeService: {
    enabled: true,
    surcharge: null,
    radiusNote: "Within Ibadan.",
  },

  loyalty: {
    enabled: true,
    stampsRequired: 6,
    reward: "Your 6th cut is on the house.",
  },

  referral: {
    enabled: true,
    reward: "Bring a friend, get a discount on your next cut.",
  },

  reminders: {
    defaultIntervalDays: 16,
  },

  academy: {
    enabled: true,
    blurb: "Want to learn the craft? Sam offers one-on-one barbering sessions for beginners and intermediates in Ibadan.",
  },
};
