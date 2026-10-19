// src/data/portfolioData.js

export const personalInfo = {
    name: "Akshat Dange",
    title: "Akshat Dange",
    role: "Content Creator, Social Media Manager, Video & Photography | Pune, Maharashtra",
    location: "Pune, Maharashtra, India",
    address: "Tathawade / Wakad, Pune, Maharashtra 411033, India",
    email: "dange.akshat2107@gmail.com",
    secondaryEmail: "creativelenses07@gmail.com",
    phone: "+91-8482872105",
    whatsapp: "+918482872105",
    whatsappLink: "https://wa.me/918482872105",
    mapsUrl: "https://maps.google.com/?q=Pune,+Maharashtra,+India",
    instagram: "https://instagram.com/dangeakshat?exln=MnFvMTduYms0M3lj",
    linkedin: "https://www.linkedin.com/in/akshat-dange/",
    instagramHandles: [
        { name: "@dangeakshat", url: "https://instagram.com/dangeakshat?exln=MnFvMTduYms0M3lj" },
        { name: "@creativelylensed", url: "https://instagram.com/creativelylensed?obrf=MWVub3V0bm92aWZxbg%3D%3D" },
        { name: "@gymophilic", url: "https://instagram.com/gymophilic?cplk=MW9wNHl2c2tsYjl4Zw%3D%3D" },
        { name: "@carclubofsambhajinagar", url: "https://www.instagram.com/carclubofsambhajinagar?obrf=YXV0em1idHZsZW9h" }
    ],
    available: true,
    storeUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STORE_URL) || "https://store.creativelylensed.com",
    subTagline: "Filmmaker • Editor • Visual Storyteller",

    bio: [
        "Content creator and founder who owns the <strong>full pipeline</strong>: idea, hook, shoot, edit, caption, post, iterate.",
        "Runs <strong>two brand content presences</strong> of his own, has delivered video work for client brands through a marketing agency, and has led media for a college's flagship entrepreneurship events.",
        "Shoots and edits across <strong>smartphones, mirrorless and DSLR</strong>, and focuses on what holds attention rather than what only looks polished."
    ]
};

// HEADLINE STATS / COUNTERS
export const stats = [
    { number: "9+ Yrs", label: "Experience" },
    { number: "4.5M", label: "Top Reel Views" },
    { number: "3", label: "Ventures" }
];

// SERVICES (Exact Cards 01-09 + Banner)
export const services = [
    {
        id: 1,
        num: "01",
        title: "Reels & Short-Form Video",
        description: "Hook-driven scripting, trend-led concepts and cuts timed to music.",
        tags: ["Reels", "Short-Form", "Scripting"],
        iconType: "clapperboard"
    },
    {
        id: 2,
        num: "02",
        title: "Long-Form Video",
        description: "Storytelling-led films, event coverage and brand videos, shot and edited end to end.",
        tags: ["Brand Films", "Events", "Storytelling"],
        iconType: "film"
    },
    {
        id: 3,
        num: "03",
        title: "Photography & Videography",
        description: "Portrait, product, street and event shoots, planned and delivered on time.",
        tags: ["Portrait", "Product", "Street", "Events"],
        iconType: "camera"
    },
    {
        id: 4,
        num: "04",
        title: "Video Editing & Color Grading",
        description: "Clean cuts, sound-aware pacing and cinematic color grades in Premiere Pro and DaVinci Resolve.",
        tags: ["Premiere Pro", "DaVinci Resolve", "Color Grading"],
        iconType: "scissors"
    },
    {
        id: 5,
        num: "05",
        title: "Social Media Management",
        description: "Content strategy, calendars, captions and brand voice, posted and tracked consistently.",
        tags: ["Strategy", "Content Calendar", "Brand Voice"],
        iconType: "share-2"
    },
    {
        id: 6,
        num: "06",
        title: "Brand Establishment",
        description: "Launching and aligning your brand identity across every social platform.",
        tags: ["Positioning", "Visual Identity", "All Platforms"],
        iconType: "badge"
    },
    {
        id: 7,
        num: "07",
        title: "Meta & Google Ads",
        description: "Running Meta Ads (Facebook and Instagram) and Google Ads campaigns.",
        tags: ["Meta Ads", "Google Ads", "Campaigns"],
        iconType: "megaphone"
    },
    {
        id: 8,
        num: "08",
        title: "Website Development",
        description: "Fast, clean websites built for your brand and your customers.",
        tags: ["Design", "Development", "Launch"],
        iconType: "globe"
    },
    {
        id: 9,
        num: "09",
        title: "Performance Analysis",
        description: "Reading what the numbers say about reach, engagement and ad results, and what to do next.",
        tags: ["Analytics", "Insights", "Reporting"],
        iconType: "bar-chart-3"
    }
];

export const servicesBanner = {
    title: "Complete Online Presence",
    description: "Everything a startup or business needs to show up online: branding, content, marketing and a website, handled in one place.",
    tags: ["Branding", "Marketing", "Content", "Web"],
    iconType: "layers"
};

// PROJECTS / WORK WITH SUB-CARDS AND CONTENT COLLECTIONS
export const projects = [
    {
        id: "nextgen",
        num: "01",
        title: "NextGen Fitness Studio",
        category: "Fitness & Lifestyle",
        type: "End-to-End Video & Media Production",
        coverImage: "/assets/Nextgen.png",
        mediaType: "video",
        description: "High-intensity fitness reels, workout form guides, and brand commercial content for NextGen Fitness Studio.",
        items: [
            { id: 1, title: "NextGen Promo Reel 01", src: "/videos/nextgen/Video-49952.mp4", type: "video" },
            { id: 2, title: "Workout Cut 02", src: "/videos/nextgen/Video-74767.mp4", type: "video" },
            { id: 3, title: "Fitness Highlight 03", src: "/videos/nextgen/Video-85124.mp4", type: "video" },
            { id: 4, title: "Trainer Spotlight 04", src: "/videos/nextgen/Video-88247.mp4", type: "video" },
            { id: 5, title: "Gym Aesthetics 05", src: "/videos/nextgen/Video-95416.mp4", type: "video" },
            { id: 6, title: "Social Reel 06", src: "/videos/nextgen/snapgram.io_d7j9drnk9myh.mp4", type: "video" }
        ]
    },
    {
        id: "visdom",
        num: "02",
        title: "Visdom Studios (Clients & Agency Work)",
        category: "Commercial Agency",
        type: "Branding, Photography & Creative Media Workflows",
        coverImage: "/assets/Visdom.png",
        mediaType: "client_showcase",
        description: "Co-run a creative agency delivering branding, marketing and content to clients, managing projects end to end.",
        clients: [
            {
                id: "aeramide",
                name: "Aeramide Jewelry",
                category: "Luxury Jewelry Brand",
                tagline: "High-End Product & Studio Editorial Photography",
                description: "Studio shoot collection capturing intricate gold & diamond jewelry with precision lighting.",
                coverImage: "/photography/visdom/Aeramide client/DSC01054.jpg",
                items: [
                    { id: 1, title: "Aeramide Studio Cut 01", src: "/photography/visdom/Aeramide client/DSC00884.jpg" },
                    { id: 2, title: "Aeramide Studio Cut 02", src: "/photography/visdom/Aeramide client/DSC01026.jpg" },
                    { id: 3, title: "Aeramide Studio Cut 03", src: "/photography/visdom/Aeramide client/DSC01034.jpg" },
                    { id: 4, title: "Aeramide Studio Cut 04", src: "/photography/visdom/Aeramide client/DSC01043.jpg" },
                    { id: 5, title: "Aeramide Studio Cut 05", src: "/photography/visdom/Aeramide client/DSC01054.jpg" },
                    { id: 6, title: "Aeramide Studio Cut 06", src: "/photography/visdom/Aeramide client/DSC01065.jpg" },
                    { id: 7, title: "Aeramide Studio Cut 07", src: "/photography/visdom/Aeramide client/DSC01095.jpg" },
                    { id: 8, title: "Aeramide Studio Cut 08", src: "/photography/visdom/Aeramide client/DSC01107.jpg" },
                    { id: 9, title: "Aeramide Studio Cut 09", src: "/photography/visdom/Aeramide client/DSC01121.jpg" },
                    { id: 10, title: "Aeramide Studio Cut 10", src: "/photography/visdom/Aeramide client/DSC01143.jpg" },
                    { id: 11, title: "Aeramide Studio Cut 11", src: "/photography/visdom/Aeramide client/DSC01171.jpg" },
                    { id: 12, title: "Aeramide Studio Cut 12", src: "/photography/visdom/Aeramide client/DSC01204.jpg" },
                    { id: 13, title: "Aeramide Studio Cut 13", src: "/photography/visdom/Aeramide client/DSC01213.jpg" },
                    { id: 14, title: "Aeramide Studio Cut 14", src: "/photography/visdom/Aeramide client/DSC01223.jpg" },
                    { id: 15, title: "Aeramide Studio Cut 15", src: "/photography/visdom/Aeramide client/DSC01239-2.jpg" },
                    { id: 16, title: "Aeramide Studio Cut 16", src: "/photography/visdom/Aeramide client/DSC01261.jpg" },
                    { id: 17, title: "Aeramide Studio Cut 17", src: "/photography/visdom/Aeramide client/DSC01272.jpg" }
                ]
            },
            {
                id: "upcoming",
                name: "Many More To Come...",
                category: "Your Brand Could Be Next",
                isUpcoming: true,
                tagline: "Elevate your brand with Visdom Studios",
                description: "We bring high-converting short-form videos, product photography, and brand identity to ambitious businesses.",
                coverImage: "/assets/Stylized Crimson Portrait of a Smiling Man.png"
            }
        ]
    },
    {
        id: "gymophilic",
        num: "03",
        title: "Gymophilic Reels",
        category: "Fitness Apparel Brand",
        type: "Full Instagram Reel Strategy & Production",
        coverImage: "/assets/gymophilic.png",
        mediaType: "video",
        description: "Hook-driven fitness clothing reels blending stacked handwritten captions, aesthetic night shoots, and fast cuts.",
        items: [
            { id: 1, title: "Gymophilic Reel 01", src: "/videos/gymophilic/Video-22920.mp4", type: "video" },
            { id: 2, title: "Gymophilic Reel 02", src: "/videos/gymophilic/Video-27226.mp4", type: "video" },
            { id: 3, title: "Gymophilic Reel 03", src: "/videos/gymophilic/Video-44311.mp4", type: "video" },
            { id: 4, title: "Gymophilic Reel 04", src: "/videos/gymophilic/Video-68637.mp4", type: "video" },
            { id: 5, title: "Gymophilic Reel 05", src: "/videos/gymophilic/Video-87129.mp4", type: "video" },
            { id: 6, title: "Gymophilic Reel 06", src: "/videos/gymophilic/Video-88725.mp4", type: "video" }
        ]
    },
    {
        id: "creativelylensed",
        num: "04",
        title: "Creatively Lensed",
        category: "Street, Portrait & Event",
        type: "Cinematic Content & Short-Form Storytelling",
        coverImage: "/assets/creatively lensed.jpeg",
        mediaType: "video",
        description: "Flagship media page with viral short-form edits reaching 4.5M+ views across cinematic street, lifestyle, and motor reels.",
        items: [
            { id: 1, title: "Main Showreel Edit", src: "/videos/creative lenses/creative lenses reel.mp4", type: "video" },
            { id: 2, title: "DIO Scooty Edit", src: "/videos/creative lenses/DIO SCOOTY.mp4", type: "video" },
            { id: 3, title: "Hotwheels Cinematic", src: "/videos/creative lenses/hotwheels.mp4", type: "video" },
            { id: 4, title: "Street Cut 04", src: "/videos/creative lenses/Video-43683.mp4", type: "video" },
            { id: 5, title: "Urban Reel 05", src: "/videos/creative lenses/Video-77340.mp4", type: "video" },
            { id: 6, title: "Cinematic Short 06", src: "/videos/creative lenses/Video-85715.mp4", type: "video" },
            { id: 7, title: "Well Cinematic Edit", src: "/videos/creative lenses/Well.mp4", type: "video" }
        ]
    },
    {
        id: "ecell",
        num: "05",
        title: "E-Summit (E-Cell RSCOE)",
        category: "Campus Entrepreneurship Event",
        type: "Branding, Media & Event Promotions",
        coverImage: "/assets/Ecell.jpeg",
        mediaType: "video",
        description: "Led end-to-end media coverage, promos, and visual branding for 250+ attendee flagship entrepreneurship summit.",
        items: [
            { id: 1, title: "E-Summit Promo 01", src: "/videos/ecell/snapgram.io_4lr0vqs4dpqc.mp4", type: "video" },
            { id: 2, title: "Speaker Highlight 02", src: "/videos/ecell/snapgram.io_j8chmvxt0jku.mp4", type: "video" },
            { id: 3, title: "Event Aftermovie 03", src: "/videos/ecell/snapgram.io_kb3ixapxofda.mp4", type: "video" },
            { id: 4, title: "Teaser Edit 04", src: "/videos/ecell/snapgram.io_qip27q6jx052.mp4", type: "video" },
            { id: 5, title: "Summit Recap 05", src: "/videos/ecell/snapgram.io_z7dmxpzus3k9.mp4", type: "video" }
        ]
    },
    {
        id: "automotive",
        num: "06",
        title: "Automotive Edits & Motors",
        category: "Automotive & Lifestyle",
        type: "High-Energy Cut, Sound Design & Color Grade",
        coverImage: "/assets/Automotive.png",
        mediaType: "video",
        description: "Adrenaline-fueled automotive edits featuring exhaust note sync, speed ramps, and crisp color grades.",
        items: [
            { id: 1, title: "Automotive Cut 01", src: "/videos/automotive/Video-14007.mp4", type: "video" },
            { id: 2, title: "Motor Edit 02", src: "/videos/automotive/Video-35305.mp4", type: "video" },
            { id: 3, title: "Exhaust Sync 03", src: "/videos/automotive/Video-7392.mp4", type: "video" },
            { id: 4, title: "Night Drive 04", src: "/videos/automotive/Video-74961.mp4", type: "video" },
            { id: 5, title: "Speed Ramp 05", src: "/videos/automotive/Video-85269.mp4", type: "video" },
            { id: 6, title: "Track Edit 06", src: "/videos/automotive/Video-92845.mp4", type: "video" }
        ]
    }
];

// PHOTOGRAPHY GALLERY (From public/photography/photography)
export const photographyGallery = [
    { id: 1, title: "Nature & Wildlife", category: "Nature", src: "/photography/photography/nature.jpg" },
    { id: 2, title: "Urban Dance Portrait", category: "Street", src: "/photography/photography/dance.jpg" },
    { id: 3, title: "Jewelry Editorial I", category: "Product", src: "/photography/photography/jwellery_1.jpg" },
    { id: 4, title: "Jewelry Editorial II", category: "Product", src: "/photography/photography/jwellery_2.jpg" },
    { id: 5, title: "Diet Coke Commercial Shoot", category: "Product", src: "/photography/photography/Diet coke.jpg" },
    { id: 6, title: "City Architecture", category: "Urban", src: "/photography/photography/Buildings.jpg" },
    { id: 7, title: "Diwali Lights Festival", category: "Culture", src: "/photography/photography/Diwali.jpg" },
    { id: 8, title: "Monks in Reflection", category: "Documentary", src: "/photography/photography/monks.jpg" },
    { id: 9, title: "Lunar Night Shot", category: "Night Sky", src: "/photography/photography/Moon.jpg" },
    { id: 10, title: "Macro Bee Shot", category: "Macro", src: "/photography/photography/bee.jpg" },
    { id: 11, title: "Portrait - Meher Kaur", category: "Portrait", src: "/photography/photography/Meher kaur.jpg" },
    { id: 12, title: "Portrait - Capt. Ritu Singh", category: "Portrait", src: "/photography/photography/Captain Ritu singh.jpg" },
    { id: 13, title: "Portrait - Pooja Patel", category: "Portrait", src: "/photography/photography/Pooja patel.jpg" },
    { id: 14, title: "E-Cell Event Moment", category: "Event", src: "/photography/photography/e_cell_rscoe_14050211_233021653.jpg" }
];

// GRAPHICS & DESIGN GALLERY (From public/graphics)
export const graphicsGallery = [
    { id: 1, title: "CCOS Brand Poster", category: "Brand Design", src: "/graphics/ccos.jpg" },
    { id: 2, title: "E-Cell Summit Identity", category: "Event Branding", src: "/graphics/ecell.png" },
    { id: 3, title: "Electronova Poster Art", category: "Graphic Art", src: "/graphics/electronova.jpg" },
    { id: 4, title: "CCOS Creative Cut", category: "UI/Graphic Design", src: "/graphics/Screenshot ccos.png" }
];

// SKILLS / TOOLS & GEAR (Swept of AI mentions)
export const skills = [
    {
        name: "Video Editing & Color Grading",
        level: 95,
        desc: "Adobe Premiere Pro, DaVinci Resolve Studio — cinematic grades, cut timing to music"
    },
    {
        name: "Design & Creative Workflows",
        level: 90,
        desc: "Photoshop, Lightroom, Figma, Canva, Premiere Pro, DaVinci Resolve"
    },
    {
        name: "Camera Systems & Gear",
        level: 92,
        desc: "Sony a7 III, Nikon D5100, iPhone 15 / 16 / 17, Samsung S25 FE"
    },
    {
        name: "Reels & Short-Form Strategy",
        level: 95,
        desc: "Full pipeline: hook, shoot, edit, caption, post, iterate"
    }
];

// BEFORE / AFTER EXAMPLES (Dual Lightroom Develop Panels)
export const beforeAfterExamples = [
    {
        id: "portrait",
        title: "PORTRAIT RETOUCHING",
        label1: "RAW",
        label2: "Graded",
        before: "/photography/before_2.jpeg",
        after: "/photography/after_2.jpeg",
        description: "Color grading and dodging & burning breathe life into a flat RAW file."
    },
    {
        id: "landscape",
        title: "LANDSCAPE GRADING",
        label1: "Before",
        label2: "After",
        before: "/photography/before_1.jpeg",
        after: "/photography/after_1.jpeg",
        description: "Atmospheric depth and cinematic lighting balance on fine sculptural details."
    }
];

// EXPERIENCE / TIMELINE (Arranged Oldest to Newest with Exact Dates)
export const timeline = [
    {
        year: "2019 to Present",
        title: "Founder, Photographer & Videographer — Creatively Lensed",
        desc: "Cinematic street, portrait, and automotive work. Built and scaled flagship media channel reaching 4.5M+ views on best-performing viral reels."
    },
    {
        year: "2024 to Present",
        title: "Founder — Gymophilic (Fitness Clothing Brand)",
        desc: "Writes, shoots, and edits the complete Instagram reel strategy. Developed a high-retention visual identity blending night shoots, stacked captions, and rhythmic cut timing."
    },
    {
        year: "March 2024 to Oct 2025",
        title: "Media Creation & Conversion Lead — E-Cell RSCOE",
        desc: "Led visual branding, promo shoots, and social media campaigns for the flagship entrepreneurship summit, aligning media across a 250+ attendee campus event."
    },
    {
        year: "25/07/2025 to Present",
        title: "Co-Founder — Visdom Studios (Creative & Marketing Agency)",
        desc: "Co-running a creative agency delivering end-to-end commercial branding, luxury product photography, and high-converting video workflows to clients."
    }
];

// HEADLINE STATS / IMPACT (SOCIAL PROOF)
export const socialProof = [
    {
        number: "9+ Years",
        label: "Content Creation Experience",
        desc: "Hands-on experience in video, photo, and social media strategy."
    },
    {
        number: "4.5M",
        label: "Best Reel Views",
        desc: "Views on best-performing reel (@creativelylensed)."
    },
    {
        number: "11k+",
        label: "Gymophilic Best Reel Views",
        desc: "Views on best-performing Gymophilic reel (@notsoakshat)."
    },
    {
        number: "AIR 17",
        label: "IIT Bombay NEC Rank",
        desc: "National Entrepreneurship Challenge among 1,000+ colleges."
    },
    {
        number: "250+",
        label: "E-Summit Attendees",
        desc: "Attendees at the flagship event media was led for."
    },
    {
        number: "3 Ventures",
        label: "Founded / Co-Founded",
        desc: "Gymophilic, Creatively Lensed, Visdom Studios."
    }
];