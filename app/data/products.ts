export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number | null;
    rating: number;
    reviews: number;
    tag?: string;
    image: string;
    images?: string[];
    isNew?: boolean;
    description?: string;
    highlights?: string[];
    specifications?: Record<string, string>;
}

export const ALL_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Penguin Multi Tool (Server Credit)",
        category: "Server Credits",
        price: 999.0,
        originalPrice: 1299.0,
        rating: 5.0,
        reviews: 14,
        tag: "Server Credit",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "Penguin Multi Tool provides fast, reliable server credit auto-refills for unlocking, flashing, and repairing mobile devices seamlessly across modern brand protocols.",
        highlights: [
            "Automated 24/7 instant server delivery",
            "Compatible with major Android repair tools",
            "Zero registration fee required",
            "Direct API sync with instant credit refill"
        ],
        specifications: {
            "Delivery Type": "Instant Server Credit",
            "Validity": "Lifetime / No Expiry",
            "Supported OS": "Windows 10 / 11 (64-bit)",
            "Refill Time": "1 - 5 Minutes"
        }
    },
    {
        id: "2",
        name: "TSM TOOL RENT 3 HOUR",
        category: "Rentals",
        price: 100.0,
        originalPrice: 150.0,
        rating: 4.8,
        reviews: 5,
        tag: "3 Hour Access",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "Temporary 3-hour full access login for TSM Tool. Instant account credentials delivered right after purchase.",
        highlights: [
            "3 Hours Unlimited Usage",
            "Auto credentials via WhatsApp/SMS",
            "Fast Server Connection"
        ],
        specifications: {
            "Access Duration": "3 Hours",
            "Delivery": "Instant Login ID & Password"
        }
    },
    {
        id: "3",
        name: "Luckes 1W-F4T Smart Error Checker",
        category: "Hardware Tools",
        price: 1599.0,
        originalPrice: 2095.0,
        rating: 4.9,
        reviews: 28,
        tag: "Hardware",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "Industrial grade error diagnostic hardware tool designed for motherboard-level short circuit detection and smart voltage measurement.",
        highlights: [
            "High accuracy digital LED display",
            "Includes short circuit isolation probes",
            "Compact aluminum alloy casing",
            "1 Year Official Replacement Warranty"
        ],
        specifications: {
            "Brand": "Luckes",
            "Model": "1W-F4T",
            "Operating Voltage": "5V - 24V DC",
            "Warranty": "12 Months"
        }
    },
    {
        id: "4",
        name: "Galaxy Multi Tool 6 Month Activation",
        category: "Software Activations",
        price: 1499.0,
        originalPrice: 1800.0,
        rating: 5.0,
        reviews: 19,
        tag: "6 Month",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "6 Months official license activation for Galaxy Multi Tool. Unlocks advanced FRP bypass and network flashing functions.",
        highlights: [
            "Full digital key activation",
            "Supports latest Samsung & Xiaomi models",
            "Includes free software updates"
        ],
        specifications: {
            "Validity": "6 Months",
            "Activation Method": "Username / Serial Activation"
        }
    },
    {
        id: "5",
        name: "Dalseg Multi Tool Server Credits (10 Credits)",
        category: "Server Credits",
        price: 99.0,
        originalPrice: 150.0,
        rating: 4.7,
        reviews: 8,
        tag: "Server Credit",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        description: "Direct server credit pack for Dalseg Multi Tool users. Fast online API processing.",
        highlights: [
            "Instant Credit Top-Up",
            "Low consumption per device",
            "24/7 Auto Refill"
        ],
        specifications: {
            "Credits": "10 Credits",
            "Processing Time": "Instant"
        }
    },
    {
        id: "6",
        name: "Samsung KG Lock Bypass 1 Year License",
        category: "Software Activations",
        price: 3150.0,
        originalPrice: 3500.0,
        rating: 4.9,
        reviews: 42,
        tag: "Activation",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "1 Year full license for Samsung KG Lock Bypass Tool. Removes active KG status and lock states.",
        highlights: [
            "Supports Knox Guard Bypass",
            "Works without root requirement",
            "1 Year official updates included"
        ],
        specifications: {
            "Validity": "12 Months",
            "Supported Brand": "Samsung Exynos & Snapdragon"
        }
    },
    {
        id: "7",
        name: "UnlockTool 3 Months Official License",
        category: "Software Activations",
        price: 1850.0,
        originalPrice: 2100.0,
        rating: 5.0,
        reviews: 128,
        tag: "HOT DEAL",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        description: "3 Months digital key license for UnlockTool. Leading multi-brand Android FRP, Mi Account, and flashing solution.",
        highlights: [
            "Top selling Android repair software",
            "Instant account activation",
            "Huge supported device database"
        ],
        specifications: {
            "Validity": "3 Months",
            "Delivery": "Instant Digital Key"
        }
    },
    {
        id: "8",
        name: "Borneo Schematics 1 Year License (1 User)",
        category: "Schematics",
        price: 3400.0,
        originalPrice: 3800.0,
        rating: 4.9,
        reviews: 95,
        tag: "Schematics",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        description: "Industry standard hardware schematic diagram library for smartphone hardware technicians and PCB repairers.",
        highlights: [
            "Thousands of motherboard PCB layouts",
            "Hardware solutions & diode values",
            "Daily database updates"
        ],
        specifications: {
            "Validity": "1 Year",
            "Users": "1 User Activation Code"
        }
    },
    {
        id: "9",
        name: "Sunshine MC75T Trinocular Stereo Microscope",
        category: "Hardware Tools",
        price: 18500.0,
        originalPrice: 21000.0,
        rating: 4.9,
        reviews: 31,
        tag: "Hardware",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "High-precision 7X-45X continuous zoom trinocular microscope for micro-soldering and IC repair.",
        highlights: [
            "7X to 45X continuous optical zoom",
            "Trinocular port for camera mount",
            "Includes LED ring light"
        ],
        specifications: {
            "Brand": "Sunshine",
            "Magnification": "7X - 45X",
            "Eyepiece": "WF10X/20mm"
        }
    },
    {
        id: "10",
        name: "Xiaomi Auth Server Instant Credits (5 Credits)",
        category: "Server Credits",
        price: 850.0,
        originalPrice: 1000.0,
        rating: 4.8,
        reviews: 17,
        tag: "Server Credit",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        description: "Official Xiaomi Authorized flashing credits for EDL mode flashing and system recovery.",
        highlights: [
            "EDL mode authorized flashing",
            "Instant server response",
            "Global Xiaomi model support"
        ],
        specifications: {
            "Credits": "5 Credits",
            "Refill Time": "1 - 3 Minutes"
        }
    },
    {
        id: "11",
        name: "Sugon 8620DX 1000W Hot Air Rework Station",
        category: "Hardware Tools",
        price: 14200.0,
        originalPrice: 16500.0,
        rating: 5.0,
        reviews: 53,
        tag: "Hardware",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        description: "1000W professional high-power hot air station with digital temperature control and 4 working channels.",
        highlights: [
            "1000W Ultra High Heating Power",
            "4 Memory Channel settings",
            "Auto cooling standby handle"
        ],
        specifications: {
            "Power": "1000W",
            "Temp Range": "100°C - 500°C",
            "Airflow": "1 - 200 Levels"
        }
    },
    {
        id: "12",
        name: "UMT Pro Dongle (Ultimate Multi Tool)",
        category: "Software Activations",
        price: 3850.0,
        originalPrice: 4200.0,
        rating: 4.9,
        reviews: 84,
        tag: "Dongle",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        description: "Hardware USB security dongle for UMT Pro suite. Includes QC Fire and Ultimate GSM modules.",
        highlights: [
            "Includes hardware USB dongle",
            "Supports Qualcomm, MediaTek, and Unisoc",
            "1 Year included activation"
        ],
        specifications: {
            "Interface": "USB 2.0 / 3.0 Dongle",
            "Warranty": "1 Year Hardware Warranty"
        }
    }
];

// Helper Functions
export function getProductById(id: string): Product | undefined {
    return ALL_PRODUCTS.find((p) => p.id === String(id));
}

export function getProductsByCategory(category: string): Product[] {
    return ALL_PRODUCTS.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
    );
}