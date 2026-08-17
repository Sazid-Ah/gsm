/**
 * ============================================================================
 *  GSM PATNA — SINGLE DATA MODULE
 * ============================================================================
 *
 *  Every piece of static content in this site lives in this file: site config,
 *  navigation, categories and the product catalog. Nothing else in the app
 *  hardcodes catalog data.
 *
 *  HOW TO SWAP IN A REAL BACKEND
 *  -----------------------------
 *  Every exported function below is `async` and returns plain JSON-shaped data,
 *  so each one maps 1:1 onto an HTTP endpoint. To go live, replace the body of
 *  a function and delete the matching constant — no call site has to change:
 *
 *      export async function getProducts(options = {}) {
 *        const qs = new URLSearchParams(clean(options));
 *        const res = await fetch(`${API_BASE}/products?${qs}`, { next: { revalidate: 60 } });
 *        if (!res.ok) throw new Error("Failed to load products");
 *        return res.json();
 *      }
 *
 *  Suggested endpoint mapping:
 *      getSiteConfig()        ->  GET  /site/config
 *      getNavigation()        ->  GET  /navigation
 *      getCategories()        ->  GET  /categories
 *      getCategory(path)      ->  GET  /categories/:slug
 *      getProducts(options)   ->  GET  /products?category=&subcategory=&q=&sort=
 *      getProduct(id)         ->  GET  /products/:id
 *      getRelatedProducts(id) ->  GET  /products/:id/related
 *      createOrder(payload)   ->  POST /orders
 *
 * ============================================================================
 */

/**
 * @typedef {Object} ProductFile
 * @property {string} name         Filename as downloaded.
 * @property {string} version
 * @property {string} size
 * @property {string} updated      ISO date.
 * @property {string} requirements
 *
 * @typedef {Object} ProductLicense
 * @property {string} type     e.g. "One-time use".
 * @property {string} scope    What a single key covers.
 * @property {string} delivery How the key reaches the buyer.
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category      Category slug.
 * @property {string} subcategory   Subcategory slug.
 * @property {string} brand
 * @property {string|null} tag
 * @property {boolean} isNew
 * @property {number} price         Cost of ONE one-time-use license.
 * @property {number|null} originalPrice
 * @property {number} rating
 * @property {number} reviews
 * @property {string} image
 * @property {string[]} images
 * @property {string} summary
 * @property {string} description
 * @property {ProductFile} file     Always a free download.
 * @property {ProductLicense} license
 * @property {string[]} supports
 * @property {string[]} highlights
 * @property {Record<string, string>} specifications
 *
 * @typedef {Object} Subcategory
 * @property {string} slug
 * @property {string} name
 *
 * @typedef {Object} Category
 * @property {string} slug
 * @property {string} name
 * @property {string} blurb
 * @property {Subcategory[]} subcategories
 * @property {Subcategory|null} [subcategory] Set by getCategory() when a sub is resolved.
 */

/** Simulated network latency (ms). Set to 0 for instant local data. */
const API_LATENCY_MS = 0;

const tick = () =>
  API_LATENCY_MS > 0
    ? new Promise((resolve) => setTimeout(resolve, API_LATENCY_MS))
    : Promise.resolve();

/** Deep clone so callers can never mutate the module-level source data. */
const clone = (value) => (value == null ? value : JSON.parse(JSON.stringify(value)));

/* ==========================================================================
 *  SITE CONFIG
 * ========================================================================== */

const SITE_CONFIG = {
  name: "GSM Patna",
  brand: { prefix: "GSM", suffix: "PATNA" },
  tagline: "Tools & Licenses",
  description:
    "Download GSM repair tools and flash files for free. Buy a one-time-use license only when you need to run them.",
  phone: "+91 89237 44131",
  phoneHref: "tel:+918923744131",
  whatsapp: "918923744131",
  telegram: "https://t.me",
  currency: "₹",
  ticker: [
    "Every file on this site downloads free — you only pay per use",
    "One-time-use licenses are delivered instantly after payment",
    "Need help choosing a tool? Ask us on WhatsApp before you buy",
    "New flash files and tool builds added every week",
  ],
  trustPoints: [
    { icon: "download", title: "Free File Downloads", note: "No account, no signup" },
    { icon: "key", title: "One-Time-Use License", note: "Pay only for what you run" },
    { icon: "zap", title: "Instant Key Delivery", note: "Issued the moment you pay" },
    { icon: "headphones", title: "24/7 Support Desk", note: "WhatsApp us anytime" },
  ],
  howItWorks: [
    { step: "1", title: "Download free", note: "No account, no payment, no limits" },
    { step: "2", title: "Buy a license", note: "One key per device operation" },
    { step: "3", title: "Run the tool", note: "Key delivered instantly at checkout" },
  ],
};

/** Payment options offered at checkout. `icon` is resolved to a component in the UI. */
const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / PhonePe", icon: "smartphone", desc: "GPay, Paytm, PhonePe, QR" },
  { id: "card", label: "Credit / Debit Card", icon: "card", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: "bank", desc: "All major banks" },
];

/* ==========================================================================
 *  CATEGORIES
 *  `slug` drives the URL: /category/<slug> and /category/<slug>/<subcategory>
 * ========================================================================== */

const CATEGORIES = [
  {
    slug: "software-tools",
    name: "Software Tools",
    blurb: "Multi-brand unlock, FRP and repair suites. Installer is free; each run needs one license.",
    subcategories: [
      { slug: "multi-tool", name: "Multi Tools" },
      { slug: "frp-unlock", name: "FRP & Unlock" },
      { slug: "flashing-repair", name: "Flashing & Repair" },
    ],
  },
  {
    slug: "server-credits",
    name: "Server Credits",
    blurb: "Authorised server operations billed per single use. Client tool downloads free.",
    subcategories: [
      { slug: "samsung-frp", name: "Samsung FRP" },
      { slug: "xiaomi-auth", name: "Xiaomi Auth" },
      { slug: "oppo-realme", name: "Oppo / Realme" },
      { slug: "multi-brand", name: "Multi Brand" },
    ],
  },
  {
    slug: "flash-files",
    name: "Flash Files",
    blurb: "Stock firmware and fastboot ROMs. Free to download, one license per flash.",
    subcategories: [
      { slug: "samsung", name: "Samsung" },
      { slug: "xiaomi", name: "Xiaomi / Redmi" },
      { slug: "vivo-oppo", name: "Vivo / Oppo" },
    ],
  },
  {
    slug: "schematics",
    name: "Schematics",
    blurb: "Boardview files and service manuals for board-level repair.",
    subcategories: [
      { slug: "boardview", name: "Boardview Files" },
      { slug: "service-manuals", name: "Service Manuals" },
    ],
  },
  {
    slug: "rentals",
    name: "Tool Rentals",
    blurb: "Short-window access to premium tools without buying a full license.",
    subcategories: [{ slug: "hourly", name: "Hourly Access" }],
  },
];

/* ==========================================================================
 *  PRODUCTS
 *
 *  Every product is a downloadable file. Two prices are in play:
 *    - the FILE is always free (`file`)
 *    - the LICENSE to run it costs `price` (`originalPrice` = pre-discount)
 *  Quantity at checkout = how many one-time uses the customer is buying.
 * ========================================================================== */

const PRODUCTS = [
  /* ----------------------------- Software Tools ---------------------------- */
  {
    id: "unlocktool-suite",
    name: "UnlockTool — Multi Brand Repair Suite",
    category: "software-tools",
    subcategory: "multi-tool",
    brand: "UnlockTool",
    tag: "Most Used",
    isNew: false,
    price: 1850,
    originalPrice: 2100,
    rating: 5.0,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Multi-brand Android FRP, Mi Account and flashing suite with a huge device database.",
    description:
      "UnlockTool is a desktop suite covering FRP removal, Mi Account bypass, network repair and firmware flashing across Qualcomm, MediaTek and Unisoc chipsets. Download and install the full build for free — the interface, device database and driver pack are all included. A one-time-use license is consumed only when you execute an operation on a device, so there is nothing to pay while you are testing connectivity or reading device info.",
    file: {
      name: "UnlockTool_Setup_v3.7.2.exe",
      version: "3.7.2",
      size: "48.2 MB",
      updated: "2026-07-28",
      requirements: "Windows 10 / 11 (64-bit)",
    },
    license: {
      type: "One-time use",
      scope: "Single device operation",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung", "Xiaomi", "Oppo", "Vivo", "Realme"],
    highlights: [
      "Free full installer — no trial limits on browsing",
      "One license = one successful device operation",
      "Qualcomm, MediaTek and Unisoc coverage",
      "Driver pack bundled with the download",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Delivery": "Instant digital key",
      "Supported OS": "Windows 10 / 11 (64-bit)",
      "Connection": "USB 2.0 / 3.0",
    },
  },
  {
    id: "galaxy-multi-tool",
    name: "Galaxy Multi Tool",
    category: "software-tools",
    subcategory: "multi-tool",
    brand: "Galaxy Tool",
    tag: "Popular",
    isNew: true,
    price: 1499,
    originalPrice: 1800,
    rating: 5.0,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Advanced FRP bypass and network flashing for current Samsung and Xiaomi models.",
    description:
      "Galaxy Multi Tool focuses on modern Samsung and Xiaomi devices, handling FRP bypass, network unlock and partition-level flashing. The client is a free download and updates itself automatically; each repair operation draws a single one-time-use license.",
    file: {
      name: "GalaxyMultiTool_v5.1.0.zip",
      version: "5.1.0",
      size: "112 MB",
      updated: "2026-08-02",
      requirements: "Windows 10 / 11 (64-bit)",
    },
    license: {
      type: "One-time use",
      scope: "Single device operation",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung", "Xiaomi"],
    highlights: [
      "Auto-updating client, free to download",
      "Covers the latest Samsung security patches",
      "One license per successful operation",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Activation": "Username / serial activation",
      "Supported OS": "Windows 10 / 11 (64-bit)",
    },
  },
  {
    id: "umt-pro-suite",
    name: "UMT Pro — Ultimate Multi Tool Suite",
    category: "software-tools",
    subcategory: "multi-tool",
    brand: "UMT",
    tag: "Pro",
    isNew: false,
    price: 3850,
    originalPrice: 4200,
    rating: 4.9,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "QC Fire and Ultimate GSM modules in one suite for deep chipset-level repair.",
    description:
      "UMT Pro bundles the QC Fire and Ultimate GSM modules, covering Qualcomm EDL operations, MediaTek boot-rom work and Unisoc repair. The complete suite installs free; licenses are consumed per operation, which keeps costs predictable for low-volume workshops.",
    file: {
      name: "UMTPro_Suite_v9.4.exe",
      version: "9.4",
      size: "268 MB",
      updated: "2026-06-19",
      requirements: "Windows 10 / 11 (64-bit), 4 GB RAM",
    },
    license: {
      type: "One-time use",
      scope: "Single device operation",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Qualcomm", "MediaTek", "Unisoc"],
    highlights: [
      "QC Fire + Ultimate GSM modules included",
      "EDL and boot-rom level operations",
      "Free suite download, pay per operation",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Modules": "QC Fire, Ultimate GSM",
      "Supported OS": "Windows 10 / 11 (64-bit)",
    },
  },
  {
    id: "samsung-kg-bypass",
    name: "Samsung KG Lock Bypass Tool",
    category: "software-tools",
    subcategory: "frp-unlock",
    brand: "Samsung",
    tag: "Hot",
    isNew: true,
    price: 3150,
    originalPrice: 3500,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Clears active Knox Guard and KG lock states without root access.",
    description:
      "A focused utility for removing Knox Guard / KG lock states on Exynos and Snapdragon Samsung devices. No root is required and the device keeps its warranty flags intact. Download the tool free to check device compatibility; a license is spent only on a successful bypass.",
    file: {
      name: "Samsung_KG_Bypass_v2.8.zip",
      version: "2.8",
      size: "36.5 MB",
      updated: "2026-08-05",
      requirements: "Windows 10 / 11 (64-bit)",
    },
    license: {
      type: "One-time use",
      scope: "Single device bypass",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung Exynos", "Samsung Snapdragon"],
    highlights: [
      "Removes active Knox Guard state",
      "Works without root",
      "Free compatibility check before you buy",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Supported Brand": "Samsung Exynos & Snapdragon",
      "Root Required": "No",
    },
  },

  /* ----------------------------- Server Credits ---------------------------- */
  {
    id: "penguin-multi-tool-credits",
    name: "Penguin Multi Tool — Server Operation",
    category: "server-credits",
    subcategory: "multi-brand",
    brand: "Penguin",
    tag: "Instant",
    isNew: true,
    price: 999,
    originalPrice: 1299,
    rating: 5.0,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Authorised server unlock, flash and repair operations across modern brand protocols.",
    description:
      "Penguin Multi Tool talks to the authorised servers for unlocking, flashing and repairing across the major Android brands. The client application is free to download and install. Each server operation you run consumes one license, processed automatically 24/7.",
    file: {
      name: "PenguinMultiTool_Client_v4.2.exe",
      version: "4.2",
      size: "74.8 MB",
      updated: "2026-08-09",
      requirements: "Windows 10 / 11 (64-bit), internet connection",
    },
    license: {
      type: "One-time use",
      scope: "Single server operation",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung", "Xiaomi", "Oppo", "Realme", "Vivo"],
    highlights: [
      "Automated 24/7 server processing",
      "Free client download and device diagnostics",
      "One license per server operation",
      "Typical turnaround 1 – 5 minutes",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Processing Time": "1 – 5 minutes",
      "Supported OS": "Windows 10 / 11 (64-bit)",
      "Availability": "24/7 automated",
    },
  },
  {
    id: "samsung-frp-server",
    name: "Samsung FRP Server Operation",
    category: "server-credits",
    subcategory: "samsung-frp",
    brand: "Samsung",
    tag: "Instant",
    isNew: false,
    price: 320,
    originalPrice: 450,
    rating: 4.9,
    reviews: 61,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Single-device Samsung FRP removal through the authorised server queue.",
    description:
      "Removes the Factory Reset Protection lock on a single Samsung device through the authorised server. Download the free client, connect the handset and read its details at no cost — a license is consumed only when the removal is submitted.",
    file: {
      name: "SamsungFRP_Client_v1.9.zip",
      version: "1.9",
      size: "22.4 MB",
      updated: "2026-08-11",
      requirements: "Windows 10 / 11 (64-bit), internet connection",
    },
    license: {
      type: "One-time use",
      scope: "Single device FRP removal",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung"],
    highlights: [
      "Free client and free device read",
      "One license per FRP removal",
      "Automated queue, no waiting for support",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Processing Time": "2 – 10 minutes",
      "Supported Brand": "Samsung",
    },
  },
  {
    id: "xiaomi-auth-server",
    name: "Xiaomi Auth Server Operation",
    category: "server-credits",
    subcategory: "xiaomi-auth",
    brand: "Xiaomi",
    tag: "Instant",
    isNew: false,
    price: 850,
    originalPrice: 1000,
    rating: 4.8,
    reviews: 17,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Authorised EDL-mode flashing and system recovery for global Xiaomi models.",
    description:
      "Runs an authorised Xiaomi EDL session for flashing and system recovery on locked devices. The auth client downloads free and can read device information without charge; the license is spent when the authorised session opens.",
    file: {
      name: "XiaomiAuth_Client_v3.3.exe",
      version: "3.3",
      size: "41.0 MB",
      updated: "2026-07-30",
      requirements: "Windows 10 / 11 (64-bit), internet connection",
    },
    license: {
      type: "One-time use",
      scope: "Single authorised EDL session",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Xiaomi", "Redmi", "POCO"],
    highlights: [
      "Authorised EDL mode flashing",
      "Global Xiaomi model coverage",
      "Free device read before purchase",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Processing Time": "1 – 3 minutes",
      "Supported Brand": "Xiaomi / Redmi / POCO",
    },
  },
  {
    id: "oppo-realme-server",
    name: "Oppo / Realme Server Operation",
    category: "server-credits",
    subcategory: "oppo-realme",
    brand: "Oppo",
    tag: "Instant",
    isNew: true,
    price: 640,
    originalPrice: 800,
    rating: 4.7,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Pattern, FRP and demo-lock removal for Oppo and Realme handsets.",
    description:
      "Handles user-lock, FRP and demo-mode removal on Oppo and Realme devices through the authorised server. Free client download with unlimited device reads; one license per completed removal.",
    file: {
      name: "OppoRealme_Client_v2.4.zip",
      version: "2.4",
      size: "29.7 MB",
      updated: "2026-08-08",
      requirements: "Windows 10 / 11 (64-bit), internet connection",
    },
    license: {
      type: "One-time use",
      scope: "Single device operation",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Oppo", "Realme"],
    highlights: [
      "Pattern, FRP and demo lock removal",
      "Free client with unlimited device reads",
      "One license per completed removal",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Processing Time": "3 – 15 minutes",
      "Supported Brand": "Oppo / Realme",
    },
  },
  {
    id: "dalseg-server-credits",
    name: "Dalseg Multi Tool — Server Operation",
    category: "server-credits",
    subcategory: "multi-brand",
    brand: "Dalseg",
    tag: null,
    isNew: false,
    price: 99,
    originalPrice: 150,
    rating: 4.7,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Low-cost per-operation server access for everyday repair jobs.",
    description:
      "Dalseg Multi Tool covers the common day-to-day repair operations at the lowest per-use cost in the catalog. Free client download, instant API processing, one license per operation.",
    file: {
      name: "DalsegMultiTool_v2.0.zip",
      version: "2.0",
      size: "18.3 MB",
      updated: "2026-07-14",
      requirements: "Windows 10 / 11 (64-bit), internet connection",
    },
    license: {
      type: "One-time use",
      scope: "Single server operation",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung", "Vivo", "Realme"],
    highlights: [
      "Lowest per-operation cost in the catalog",
      "Instant API processing",
      "Free client download",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Processing Time": "Instant",
      "Availability": "24/7 automated",
    },
  },

  /* ------------------------------- Flash Files ----------------------------- */
  {
    id: "samsung-a15-firmware",
    name: "Samsung Galaxy A15 (SM-A155F) Stock Firmware",
    category: "flash-files",
    subcategory: "samsung",
    brand: "Samsung",
    tag: "Firmware",
    isNew: true,
    price: 149,
    originalPrice: 250,
    rating: 4.8,
    reviews: 37,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Four-file stock ROM for the SM-A155F, ready for Odin flashing.",
    description:
      "Complete four-file stock firmware package (AP, BL, CP, CSC) for the Samsung Galaxy A15 SM-A155F. The archive downloads free so you can verify the build number and region before committing. One license covers a single authorised flash session.",
    file: {
      name: "SM-A155F_INS_U4_Stock.zip",
      version: "A155FXXU4CXG1",
      size: "6.4 GB",
      updated: "2026-07-22",
      requirements: "Odin 3.14+ / Windows 10 / 11",
    },
    license: {
      type: "One-time use",
      scope: "Single flash session",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["SM-A155F"],
    highlights: [
      "Full AP / BL / CP / CSC package",
      "Free download — verify build before you flash",
      "One license per flash session",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Model": "SM-A155F",
      "Build": "A155FXXU4CXG1",
      "Flash Tool": "Odin 3.14+",
    },
  },
  {
    id: "xiaomi-note13-firmware",
    name: "Redmi Note 13 (sapphire) Fastboot ROM",
    category: "flash-files",
    subcategory: "xiaomi",
    brand: "Xiaomi",
    tag: "Firmware",
    isNew: true,
    price: 149,
    originalPrice: 250,
    rating: 4.9,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Global fastboot ROM for the Redmi Note 13, flashable with MiFlash.",
    description:
      "Global fastboot ROM package for the Redmi Note 13 (codename sapphire), including the flash scripts used by MiFlash. Download and inspect the package for free; a license is required for the authorised flash session on locked units.",
    file: {
      name: "sapphire_global_images_V816.zip",
      version: "V816.0.3.0",
      size: "5.9 GB",
      updated: "2026-08-04",
      requirements: "MiFlash 2020+ / Windows 10 / 11",
    },
    license: {
      type: "One-time use",
      scope: "Single flash session",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Redmi Note 13"],
    highlights: [
      "Official global fastboot package",
      "Includes MiFlash flash scripts",
      "Free download, license per flash",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Codename": "sapphire",
      "Build": "V816.0.3.0",
      "Flash Tool": "MiFlash 2020+",
    },
  },
  {
    id: "vivo-y28-firmware",
    name: "Vivo Y28 Stock Firmware Package",
    category: "flash-files",
    subcategory: "vivo-oppo",
    brand: "Vivo",
    tag: "Firmware",
    isNew: false,
    price: 149,
    originalPrice: 220,
    rating: 4.6,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Stock firmware for the Vivo Y28, including the required flash loader.",
    description:
      "Factory firmware package for the Vivo Y28 with the matching loader file for MediaTek flashing. Free to download and verify; one license per authorised flash.",
    file: {
      name: "Vivo_Y28_PD2350F_Stock.zip",
      version: "PD2350F_A_1.18.6",
      size: "4.2 GB",
      updated: "2026-06-30",
      requirements: "SP Flash Tool / Windows 10 / 11",
    },
    license: {
      type: "One-time use",
      scope: "Single flash session",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Vivo Y28"],
    highlights: [
      "Includes matching MediaTek loader",
      "Free download and verification",
      "One license per flash session",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Model": "PD2350F",
      "Flash Tool": "SP Flash Tool",
    },
  },
  {
    id: "oppo-a78-firmware",
    name: "Oppo A78 Flash File + Loader",
    category: "flash-files",
    subcategory: "vivo-oppo",
    brand: "Oppo",
    tag: "Firmware",
    isNew: false,
    price: 149,
    originalPrice: 220,
    rating: 4.7,
    reviews: 21,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "OFP firmware and loader pair for the Oppo A78 4G.",
    description:
      "OFP format firmware for the Oppo A78 4G together with the loader needed for EDL flashing. The package is free to download; the license covers one authorised flash on a locked device.",
    file: {
      name: "Oppo_A78_CPH2565_OFP.zip",
      version: "CPH2565_11_A.18",
      size: "5.1 GB",
      updated: "2026-07-05",
      requirements: "MSM / EDL tool, Windows 10 / 11",
    },
    license: {
      type: "One-time use",
      scope: "Single flash session",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Oppo A78 4G"],
    highlights: [
      "OFP firmware with matching loader",
      "EDL flashing supported",
      "Free download, license per flash",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Model": "CPH2565",
      "Format": "OFP",
    },
  },

  /* ------------------------------- Schematics ------------------------------ */
  {
    id: "borneo-schematics",
    name: "Borneo Schematics Library",
    category: "schematics",
    subcategory: "boardview",
    brand: "Borneo",
    tag: "Reference",
    isNew: false,
    price: 3400,
    originalPrice: 3800,
    rating: 4.9,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Thousands of motherboard PCB layouts with diode values and hardware solutions.",
    description:
      "The industry-standard schematic and boardview library for smartphone board-level repair. The viewer application and a sample device set download free; a one-time-use license unlocks a full device schematic of your choice from the database.",
    file: {
      name: "Borneo_Viewer_v4.6_with_samples.zip",
      version: "4.6",
      size: "310 MB",
      updated: "2026-08-01",
      requirements: "Windows 10 / 11 (64-bit)",
    },
    license: {
      type: "One-time use",
      scope: "One full device schematic unlock",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung", "Apple", "Xiaomi", "Oppo", "Vivo"],
    highlights: [
      "Thousands of motherboard PCB layouts",
      "Hardware solutions and diode values",
      "Free viewer plus sample schematics",
      "Database updated daily",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Scope": "One device schematic unlock",
      "Supported OS": "Windows 10 / 11 (64-bit)",
    },
  },
  {
    id: "boardview-service-manuals",
    name: "Board-Level Service Manual Pack",
    category: "schematics",
    subcategory: "service-manuals",
    brand: "GSM Patna",
    tag: null,
    isNew: true,
    price: 249,
    originalPrice: 400,
    rating: 4.6,
    reviews: 9,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Disassembly and component-level repair manuals for common service-centre models.",
    description:
      "A curated PDF pack of disassembly guides, connector pinouts and component-level repair notes for the models that come through a repair counter most often. The index and two sample manuals are free; a license unlocks the full pack.",
    file: {
      name: "GSMPatna_ServiceManuals_2026.pdf",
      version: "2026.2",
      size: "184 MB",
      updated: "2026-08-10",
      requirements: "Any PDF reader",
    },
    license: {
      type: "One-time use",
      scope: "Full pack unlock",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Multi brand"],
    highlights: [
      "Disassembly and reassembly steps",
      "Connector pinouts and test points",
      "Free index plus two sample manuals",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Format": "PDF",
      "Edition": "2026.2",
    },
  },

  /* --------------------------------- Rentals ------------------------------- */
  {
    id: "tsm-tool-rent-3h",
    name: "TSM Tool — 3 Hour Rental Access",
    category: "rentals",
    subcategory: "hourly",
    brand: "TSM",
    tag: "3 Hour Access",
    isNew: true,
    price: 100,
    originalPrice: 150,
    rating: 4.8,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
    summary: "Three hours of unlimited TSM Tool access without buying a full license.",
    description:
      "Rent TSM Tool for a three-hour window instead of buying an annual license. Download the client free, then redeem a one-time-use key to open your session — the clock starts when the session is first opened, not at purchase.",
    file: {
      name: "TSMTool_Client_v6.0.exe",
      version: "6.0",
      size: "95.6 MB",
      updated: "2026-07-18",
      requirements: "Windows 10 / 11 (64-bit), internet connection",
    },
    license: {
      type: "One-time use",
      scope: "One 3-hour session",
      delivery: "Instant key on the confirmation screen",
    },
    supports: ["Samsung", "Xiaomi", "Vivo", "Oppo"],
    highlights: [
      "3 hours of unlimited usage",
      "Clock starts when you open the session",
      "Free client download",
    ],
    specifications: {
      "License Type": "One-time use key",
      "Access Duration": "3 hours",
      "Supported OS": "Windows 10 / 11 (64-bit)",
    },
  },
];

/* ==========================================================================
 *  INTERNAL HELPERS
 * ========================================================================== */

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
];

function sortProducts(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "newest":
      return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return sorted.sort((a, b) => b.reviews - a.reviews);
  }
}

function matchesQuery(product, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    product.name,
    product.brand,
    product.summary,
    product.category,
    product.subcategory,
    ...(product.supports || []),
  ]
    .join(" ")
    .toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

/* ==========================================================================
 *  PUBLIC "ENDPOINTS"
 * ========================================================================== */

/** GET /site/config */
export async function getSiteConfig() {
  await tick();
  return clone(SITE_CONFIG);
}

/**
 * GET /categories
 * @returns {Promise<Category[]>}
 */
export async function getCategories() {
  await tick();
  return clone(CATEGORIES);
}

/**
 * GET /categories/:slug
 * Accepts a category slug, optionally with a subcategory:
 *   getCategory("server-credits")
 *   getCategory(["server-credits", "xiaomi-auth"])
 * Returns null when the path does not resolve.
 *
 * @param {string|string[]} path
 * @returns {Promise<Category|null>}
 */
export async function getCategory(path) {
  await tick();
  const segments = Array.isArray(path) ? path : [path];
  const [categorySlug, subcategorySlug] = segments;

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return null;

  if (!subcategorySlug) return clone({ ...category, subcategory: null });

  const subcategory = category.subcategories.find((s) => s.slug === subcategorySlug);
  if (!subcategory) return null;

  return clone({ ...category, subcategory });
}

/**
 * GET /navigation
 * Built from CATEGORIES so the header can never drift from the catalog.
 * Each menu carries a live product count per entry.
 */
export async function getNavigation() {
  await tick();
  return clone({
    primary: CATEGORIES.map((category) => ({
      key: category.slug,
      label: category.name,
      href: `/category/${category.slug}`,
      count: PRODUCTS.filter((p) => p.category === category.slug).length,
      items: category.subcategories.map((sub) => ({
        label: sub.name,
        href: `/category/${category.slug}/${sub.slug}`,
        count: PRODUCTS.filter(
          (p) => p.category === category.slug && p.subcategory === sub.slug
        ).length,
      })),
    })),
    quickLinks: [
      { label: "All Tools", href: "/tools", icon: "grid" },
      { label: "Free Downloads", href: "/tools?sort=price-low", icon: "download" },
    ],
  });
}

/** Sort options for listing pages. */
export async function getSortOptions() {
  await tick();
  return clone(SORT_OPTIONS);
}

/** GET /checkout/payment-methods */
export async function getPaymentMethods() {
  await tick();
  return clone(PAYMENT_METHODS);
}

/**
 * @typedef {Object} ProductQuery
 * @property {string} [category]    Category slug.
 * @property {string} [subcategory] Subcategory slug.
 * @property {string} [q]           Free-text search across name, brand and support list.
 * @property {string} [sort]        One of SORT_OPTIONS.
 * @property {number} [limit]       Max results.
 */

/**
 * GET /products?category=&subcategory=&q=&sort=&limit=
 * All filters are optional and combine with AND.
 *
 * @param {ProductQuery} [options]
 * @returns {Promise<Product[]>}
 */
export async function getProducts(options = {}) {
  const { category, subcategory, q = "", sort = "featured", limit } = options;
  await tick();

  let results = PRODUCTS.filter((product) => {
    if (category && product.category !== category) return false;
    if (subcategory && product.subcategory !== subcategory) return false;
    if (q && !matchesQuery(product, q)) return false;
    return true;
  });

  results = sortProducts(results, sort);
  if (limit) results = results.slice(0, limit);

  return clone(results);
}

/**
 * GET /products/:id — returns null when not found (callers should 404).
 * @param {string} id
 * @returns {Promise<Product|null>}
 */
export async function getProduct(id) {
  await tick();
  return clone(PRODUCTS.find((product) => product.id === id)) ?? null;
}

/** All product ids, for generateStaticParams. */
export async function getProductIds() {
  await tick();
  return PRODUCTS.map((product) => product.id);
}

/**
 * GET /products/:id/related — same subcategory first, then same category.
 * @param {string} id
 * @param {number} [limit]
 * @returns {Promise<Product[]>}
 */
export async function getRelatedProducts(id, limit = 5) {
  await tick();
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return [];

  const scored = PRODUCTS.filter((p) => p.id !== id)
    .map((p) => ({
      product: p,
      score:
        (p.category === product.category ? 2 : 0) +
        (p.subcategory === product.subcategory ? 3 : 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.product.reviews - a.product.reviews)
    .slice(0, limit);

  return clone(scored.map((entry) => entry.product));
}

/**
 * POST /orders
 * Issues one single-use license key per unit purchased. Replace this with the
 * real order + key-issuing endpoint; the response shape is what the checkout
 * confirmation screen renders.
 */
export async function createOrder(payload = {}) {
  const { customer, items = [], paymentMethod } = payload;
  await tick();

  const reference = `GSM-${Math.floor(100000 + Math.random() * 900000)}`;
  const licenses = items.flatMap((item) =>
    Array.from({ length: item.quantity || 1 }, () => ({
      productId: item.id,
      productName: item.name,
      key: generateLicenseKey(),
      type: "One-time use",
    }))
  );
  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  return {
    reference,
    createdAt: new Date().toISOString(),
    status: "paid",
    paymentMethod,
    customer,
    licenses,
    total,
  };
}

function generateLicenseKey() {
  const block = () =>
    Math.random().toString(36).replace(/[^a-z0-9]/g, "").slice(0, 4).toUpperCase().padEnd(4, "X");
  return `${block()}-${block()}-${block()}-${block()}`;
}
