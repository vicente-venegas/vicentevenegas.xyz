// lib/projects.ts
import type { Block } from "@/components/project-blocks";

export type Project = {
  slug: string;
  title: string;
  tags: string;
  cover: string;   // path under /public
  cardImage?: string; // optional grid/card image
  alt: string;
  date?: string;   // "YYYY-MM"
  draft?: boolean;
  blocks?: Block[]; // 👈 flexible page content
};

export const parseDate = (value?: string) => {
  if (!value) return 0;
  const [year, month = "01"] = value.split("-");
  return Number(new Date(Number(year), Number(month) - 1, 1));
};

export function getRelatedProjects(currentSlug: string, count = 3) {
  const ordered = [...projects]
    .filter((p) => !p.draft)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const currentIndex = ordered.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return ordered.slice(0, count);

  const nextNewer = ordered[currentIndex - 1];
  const older = ordered.slice(currentIndex + 1);

  if (!nextNewer) {
    const remaining = count - older.length;
    if (remaining <= 0) return older.slice(0, count);
    const fallbackNewer = ordered.slice(0, currentIndex).slice(0, remaining);
    return [...older, ...fallbackNewer].slice(0, count);
  }

  const related: Project[] = [nextNewer];
  const desiredOlder = older.slice(0, count - 1);
  related.push(...desiredOlder);

  if (related.length < count) {
    const remaining = count - related.length;
    const fallbackNewer = ordered.slice(0, currentIndex - 1).slice(0, remaining);
    related.push(...fallbackNewer);
  }

  return related.slice(0, count);
}

export const projects: Project[] = [
  // djavu
  {
    slug: "djavu",
    title: "Djavu",

    cover: "/images/projects/djavu/cover.png",
    alt: "Djavu DIY audio kit assembled with knobs and pads on a table.",
    date: "2024-11",
    tags: "Product Design, Interaction, CAD/CAM",

    blocks: [
      // Big assembled unit (optional hero follow-up)

      // What it is
      {
        type: "text",
        heading: "What it is",
        body:
          "Djavu is a hands-on recording kit for learning and experimenting with sound. Designed primarily for students, but equally useful for musicians and teachers, it makes audio tangible—no DAW required.",
      },
      {
        type: "spacer",
      },
      // How it was shaped
      {
        type: "text",
        heading: "How it was shaped",
        body:
          "I co-designed the feature set with music professors, borrowing from Ableton Live’s Session view, classic four-track recorders, and looper pedals. The goal is a minimal surface that encourages exploration while teaching core concepts—tempo, time signature, layering, and signal flow.",
      },

      // Two-up: parts + UI icons
      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/djavu/01-parts.png",
            alt: "3D-printed parts with brass inserts",
            w: 1024, h: 768,
          },
          {
            src: "/images/projects/djavu/02-ui-icons.png",
            alt: "OLED UI icon studies and screen layouts",
            w: 1024, h: 768,
          },
        ],
      },

      // Interaction model
      {
        type: "text",
        heading: "Interaction model",
        body:
          "Six loop slots to record, overdub, mute/unmute, and clear; microphone input for quick capture; setup for tempo (BPM) and time signature with optional quantization; simple transport (arm, record, play/stop); concise OLED feedback for slot states and levels.",
      },
      {
        type: "spacer",
      },
      // Text + image (image right): field test
      {
        type: "textImage",
        side: "right",
        heading: "Making audio tangible",
        body:
          "Students assemble the device and learn by experimenting—from wiring to basic code—connecting what they hear with how it’s built.",
        image: {
          src: "/images/projects/djavu/03-field-test.png",
          alt: "Early classroom test using the prototype",
          w: 1024, h: 768,
        },
      },
      {
        type: "spacer",
      },
      // Internals photo
      {
        type: "image",
        image: {
          src: "/images/projects/djavu/05-internals.png",
          alt: "Internals: Raspberry Pi, wiring and controls",
          w: 1024, h: 768,
        },
      },

      // Hardware prototype + roadmap
      {
        type: "text",
        heading: "Hardware prototype",
        body:
          "This prototype runs on a Raspberry Pi with a small OLED, 3D-printed controls, and a rotary/press encoder. The planned final version migrates to a Pi Zero or a smaller microcontroller with a custom PCB for durability, lower cost, and simpler assembly.",
      },
      {
        type: "spacer",
      },
      // Why it's useful
      {
        type: "text",
        heading: "Why it’s useful",
        body:
          "Djavu turns recording into something you can see, touch, and reconfigure. It supports STEAM by exposing the electronics, code, and audio path, while remaining fun for rapid composition, sampling, and live demos.",
      },
    ],
  },

  // Carvuk
  {
    slug: "carvuk",
    title: "Carvuk",

    cover: "/images/projects/carvuk/cover.png",
    alt: "Carvuk app interface mockups and research artifacts.",
    date: "2023-1",
    tags: "UX Research, Service Design",

    // blocks: [...]  // add when ready
    blocks: [
        {
            type: "text",
            heading: "What it is",
            body:
            "A research-led project with Carvuk mapping the vehicle-maintenance journey to find where confidence drops—so the product can guide clearer, calmer decisions.",
        },

        // 01 — hero (unused)
        {
          type: "spacer",
        },
        {
            type: "text",
            heading: "Research approach",
            body:
            "Interviews with customers and drivers, short polls, and ride-along shadowing during real services. Findings were synthesized into personas and journey maps across pre and during service.",
        },

        // 02–03 — personas + interview theme
        {
            type: "twoUp",
            images: [
            {
                src: "/images/projects/carvuk/02-personas-quadrant.png",
                alt: "Four personas positioned by knowledge and apprehension",
            },
            {
                src: "/images/projects/carvuk/03-interview-driver-comms.png",
                alt: "Communication model between cliente, driver, servicio and Carvuk",
            },
            ],
        },
        {
          type: "spacer",
        },
        {
            type: "text",
            heading: "Key insights",
            body:
            "Trust dips at three moments: before service (vague expectations and timing), during service (opaque status and split channels), and after service (evidence and next steps scattered). The app should deliver the immediacy of face-to-face clarity without spawning off-platform chats.",
        },

        // 04–05 — journey maps
        {
            type: "twoUp",
            images: [
            {
                src: "/images/projects/carvuk/04-journey-pre-service.png",
                alt: "Pre-service journey showing emotions, touchpoints, and opportunities",
            },
            {
                src: "/images/projects/carvuk/05-journey-during-service.png",
                alt: "During-service journey with handoffs, additional services, and emotion line",
            },
            ],
        },

        // 06 — strategy pillars
        {
            type: "image",
            image: {
            src: "/images/projects/carvuk/06-strategy-pillars.png",
            alt: "Strategy pillars: mentor not assistant, contagious trust, open window on processes, spread the benefit",
            },
        },
        {
          type: "spacer",
        },
        {
            type: "text",
            heading: "Design directions",
            body:
            "Stage-based notifications with clear next actions; a single progress tracker from pickup → workshop → return; verifiable driver/workshop profiles; photo evidence and checklists; and bite-sized explanations right at decision points.",
        },

        // 07 — recommendations (full)
        {
            type: "image",
            image: {
            src: "/images/projects/carvuk/07-concept-recommendations.png",
            alt: "Recommendations flow with scheduling and suggested workshops",
            },
        },

        // 08 — live tracking (full)
        {
            type: "image",
            image: {
            src: "/images/projects/carvuk/08-concept-live-tracking.png",
            alt: "Live status with map, service chat, and task details",
            },
        },
        {
          type: "spacer",
        },
        {
            type: "text",
            heading: "Outcome",
            body:
            "Personas, journey maps, and interface concepts that turn scattered updates into a guided path—improving transparency and confidence for customers and drivers.",
        },
        ]

  },

  // Wirun
  {
    slug: "wirun",
    title: "Wirun",

    cover: "/images/projects/wirun/cover.png",
    alt: "Wirun platformer screens with macroalgae environments.",
    date: "2022-10",
    tags: "Videogame, Education, Animation",

    // blocks: [...]
    blocks: [
        // What it is
        {
            type: "text",
            heading: "What it is",
            body:
            "Wirun is a pixel-art platformer for science outreach. Players learn about macroalgae and coastal ecosystems by exploring, experimenting, and noticing patterns—knowledge emerges through play rather than pop-up tutorials (tangential learning).",
        },

        // 01 — gameplay video (autoplay, muted, loop, no controls)
        {
            type: "video",
            src: "/images/projects/wirun/01-gameplay-video.mp4",
            poster: "/images/projects/wirun/01-gameplay-video-poster.jpg",
            label: "Gameplay loop in a kelp forest area",
            autoplay: true,
            muted: true,
            loop: true,
            playsInline: true,
            // controls off by default
        },
        {
          type: "spacer",
        },
        // Background / ECIM collaboration
        {
            type: "text",
            heading: "Background",
            body:
            "The game’s ideas were shaped after a field trip to the Estación Costera de Investigaciones Marinas (ECIM). Concepts we discussed with researchers—kelp morphology, currents, grazing, pollution, and habitat resilience—guided the mechanics, enemies, collectibles, and level goals.",
        },

        // 02–03 — ECIM exterior + classroom session
        {
            type: "twoUp",
            images: [
            { src: "/images/projects/wirun/02-ecim-station-exterior.png",  alt: "ECIM coastal research station exterior", w: 1024, h: 768 },
            { src: "/images/projects/wirun/03-ecim-classroom-workshop.png", alt: "Workshop session with students at ECIM",  w: 1024, h: 768 },
            ],
        },
        {
          type: "spacer",
        },
        // How it teaches
        {
            type: "text",
            heading: "How it teaches",
            body:
            "Short, replayable levels reward observation. Environmental rules—like light, depth, and shelter—surface via cause-and-effect. UI and pickups mirror ecology, and players practice systems thinking: collect, protect, and restore habitats under changing conditions.",
        },

        // 04 — close-up sprite & VFX
        {
            type: "image",
            image: {
            src: "/images/projects/wirun/04-gameplay-closeup-diver-jet.png",
            alt: "Close-up of the diver character and interaction effects",
            w: 1200, h: 675,
            },
        },
        {
          type: "spacer",
        },
        // Mechanics (concise)
        {
            type: "text",
            heading: "Core loop",
            body:
            "Move, jet, and interact to collect items, avoid or calm grazers, and complete micro-goals that restore local balance. Feedback is readable at a glance; difficulty scales with each area’s rules.",
        },

        // 05–06 — sprite sheet + wordmark
        {
            type: "twoUp",
            images: [
            { src: "/images/projects/wirun/05-sprite-run-cycle.png",  alt: "Sprite sheet with run cycle and backpack biome", w: 1200, h: 675 },
            { src: "/images/projects/wirun/06-wordmark-sprout.png",   alt: "Wirun wordmark with sprout accent",             w: 1200, h: 768 },
            ],
        },
        {
          type: "spacer",
        },
        // Status and roadmap
        {
            type: "text",
            heading: "Status & next steps",
            body:
            "This is a working prototype used in outreach demos. Next steps: co-design lesson hooks with ECIM educators, add localized text, and expand level variety for a short classroom module and a web build.",
        },
        ]

  },

  // Cabron
  {
    slug: "cabron",
    title: "Cabrón",

    cover: "/images/projects/cabron/BAG.png",
    alt: "Cabrón charcoal bag photographed on a dark background.",
    date: "2022-5",
    tags: "Branding, Identity, Packaging",

    blocks: [
      {
        type: "text",
        heading: "What it is",
        body:
          "Personal branding/packaging concept for a Chilean charcoal line. Scope: naming, customized wordmark, horn mark, color/type system, information hierarchy, and photo direction. Brand direction: bold, slightly irreverent, grounded in the essentials of fire and material.",
      },

      // Wordmark + mark (two-up)

      {
        type: "spacer",
      },

      {
        type: "text",
        heading: "Identity",
        body:
          "Wordmark based on Hudson NY and customized for a denser rhythm with flat cuts that echo charcoal facets. The horn mark reads first as attitude and also as an ignition gesture; the pair balances recognition and utility at small sizes.",
      },
      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/cabron/WORDMARK.png",
            alt: "Cabrón wordmark (modified Hudson NY) on black",
          },
          {
            src: "/images/projects/cabron/MARK.png",
            alt: "Cabrón horn mark used as a compact ignition cue",
          },
        ],
      },

      {
        type: "spacer",
      },

      // Color & type (two-up)
      {
        type: "text",
        heading: "Color & type",
        body:
          "Palette: black base, red as primary, white as accent. Typography: Oswald for auxiliary/body copy; the customized Hudson NY wordmark for display and primary branding moments.",
      },
      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/cabron/COLOR.png",
            alt: "Type specimen and claims layout",
          },
          {
            src: "/images/projects/cabron/TYPE.png",
            alt: "Palette and scale specimen (alternate crop)",
          },
        ],
      },

      {
        type: "spacer",
      },

      // Bag — full width
      {
        type: "text",
        heading: "Packaging hero",
        body:
          "Front panel organized for quick read: brand first, weight second, then a concise promise. Minimal elements keep the shelf read clean.",
      },
      {
        type: "image",
        image: {
          src: "/images/projects/cabron/BAG.png",
          alt: "Front view of the Cabrón bag with high-contrast layout",
        },
      },

      {
        type: "spacer",
      },

      // Matchbooks — full width
      {
        type: "text",
        heading: "Brand extensions",
        body:
          "Matchbooks test the identity at small scale. Short, direct copy keeps the tone consistent.",
      },
      {
        type: "image",
        image: {
          src: "/images/projects/cabron/MATCH.png",
          alt: "Cabrón branded matchbooks with horn mark",
        },
      },

      {
        type: "image",
        image: {
          src: "/images/projects/cabron/CLOSEUP.png",
          alt: "Label closeup showing texture and material details",
        },
      },

      {
        type: "spacer",
      },

      // Texture — closing frame (full width)


      {
        type: "text",
        heading: "Outcome",
        body:
          "Naming, modified wordmark, symbol, color/type guidelines, and a packaging hierarchy explored through hero, macro, and accessory shots. Concept-stage work aimed at clarity, cohesion, and scalability.",
      },
      {
        type: "image",
        image: {
          src: "/images/projects/cabron/TEXTURE.png",
          alt: "Cabrón mark over a charcoal texture background",
        },
      },
    ],
  }, 

  // Blitz
  {
    slug: "blitz",
    title: "Blitz",

    cover: "/images/projects/blitz/cover.png",
    alt: "Blitz triangular box with crowned logotype and checker accents.",
    date: "2021-1",
    tags: "Branding, Identity, Packaging",

    // blocks: [...]
    blocks: [
        {
            type: "text",
            heading: "What it is",
            body:
            "Blitz is a playful snack brand built around the speed and energy of casual chess. The identity is chunky, friendly, and instantly readable—made to feel fun on shelf and social.",
        },

        // Logo + pattern
        {
            type: "twoUp",
            images: [
            {
                src: "/images/projects/blitz/02-logotype.png",
                alt: "Blitz logotype with crowned ü and bold shadow",
            },
            {
                src: "/images/projects/blitz/03-pattern.png",
                alt: "Repeating pattern of piece-shaped letterforms used as a brand texture",
            },
            ],
        },
        {
          type: "spacer",
        },
        {
            type: "text",
            heading: "Identity system",
            body:
            "A crown-topped “l” nods to pieces and quick wins. Warm cookie browns with cream form the core palette; simple piece-shaped glyphs become icons and repeatable patterns for packs, POS, and digital.",
        },

        // Social motion (vertical, side-by-side)
        {
            type: "twoUp",
            videos: [
            {
                src: "/images/projects/blitz/09-social-spot-logo.mp4",
                poster: "/images/projects/blitz/09-social-spot-logo.jpg",
                label: "Logo build + crown bounce",
                autoplay: true,
                muted: true,
                loop: true,
                playsInline: true,
            },
            {
                src: "/images/projects/blitz/10-social-spot-pack.mp4",
                poster: "/images/projects/blitz/10-social-spot-pack.jpg",
                label: "Pack reveal + checker motion",
                autoplay: true,
                muted: true,
                loop: true,
                playsInline: true,
            },
            ],
        },

        {
          type: "spacer",
        },

        {
            type: "text",
            heading: "Packaging concept",
            body:
            "The triangular box is a brand moment: bold logo panel for shelf impact, checker accents for motion, and an unfold-to-board interior that invites quick play at the table.",
        },
        // Pack structure (full width)
        {
            type: "image",
            image: {
            src: "/images/projects/blitz/01-pack-unfold-board.png",
            alt: "Pack unfolded into a checkerboard surface for casual play",
            },
        },
        {
          type: "spacer",
        },
        {
            type: "text",
            heading: "Outcome",
            body:
            "Naming, logotype, color system, icon/pattern library, and a structural pack concept—ready for mockups, POS pilots, and in-store testing.",
        },
        ]

  },

  // Studio Hot Hand
  {
      slug: "studio-hot-hand",
      title: "Studio Hot Hand",

      cover: "/images/projects/studio-hot-hand/FLYER.jpg",
      alt: "Studio Hot Hand flyer on hot pink paper with bold black type.",
      date: "2025-01",
      tags: "Creative Direction, Graphic Design, Illustration",

      blocks: [
        {
          type: "text",
          heading: "What it is",
          body:
            "In 2025 I co-founded Studio Hot Hand with Javiera Melo, a boutique design studio where we provide creative services and produce original work. From editorial and graphic design to animation, 3D, illustration, and creative direction — these are selected projects.",
        },



        {
          type: "spacer",
        },

        {
          type: "text",
          heading: "Brand & worldbuilding",
          body:
            "The flyer and hand illustration are part of our own visual world — bold, direct, and slightly self-aware. Hot Hand blends humor, tactile design, and clear communication into a visual language that feels alive both online and in print.",
        },

        // Typographic hand (two-up)
        {
          type: "twoUp",
          images: [
            {
              src: "/images/projects/studio-hot-hand/HAND1.jpg",
              alt: "Typographic hand illustration built from repeating HOT/HAND letterforms.",
            },
            {
              src: "/images/projects/studio-hot-hand/HAND2.jpg",
              alt: "Process overlay showing construction of the typographic hand.",
            },
          ],
        },

        {
          type: "spacer",
        },
        {
          type: "text",
          heading: "Micro Amarilla",
          body:
            "A risograph print made for Día del Patrimonio, illustrating the front of Santiago’s classic micros amarillas. Focused on texture, signage, and the layered graphics that define everyday city identity.",
        },
        // Micro Amarilla
        {
          type: "image",
          image: {
            src: "/images/projects/studio-hot-hand/MICRO.png",
            alt: "Risograph print of classic Santiago micro bus front.",
          },
        },

        {
          type: "spacer",
        },
        // Rocket Man (two-up)
        {
          type: "text",
          heading: "Rocket Man",
          body:
            "Posters for Laurel Bath House’s fragrance Rocket Man. Illustration and creative direction merge ’70s retro-futurism with pulp print style — halftones, bold linework, and worn paper textures.",
        },
        {
          type: "twoUp",
          images: [
            {
              src: "/images/projects/studio-hot-hand/ROCKETMAN1.png",
              alt: "Retro comic key art for Rocket Man fragrance concept.",
            },
            {
              src: "/images/projects/studio-hot-hand/ROCKETMAN2.png",
              alt: "Campaign frame showing perfume bottle in astronaut cockpit.",
            },
          ],
        },
        {
          type: "spacer",
        },

        // Severance
        {
          type: "text",
          heading: "Severance",
          body:
            "A poster inspired by vintage plastic model kits — the kind you assemble piece by piece. Focus on illustration and texture details, built around the theme of construction and control.",
        },
        {
          type: "image",
          image: {
            src: "/images/projects/studio-hot-hand/SEVERANCE.png",
            alt: "Poster inspired by vintage model kit packaging with computer illustration.",
          },
        },
        {
          type: "twoUp",
          images: [
            {
              src: "/images/projects/studio-hot-hand/SEVERANCE1.png",
              alt: "Closeup severance poster detail showing texture and linework.",
            },
            {
              src: "/images/projects/studio-hot-hand/SEVERANCE2.png",
              alt: "Closeup severance poster detail showing texture and linework.",
            },
          ],
        },
        {
          type: "spacer",
        },

        // 3D Room — video loop
        {
          type: "text",
          heading: "Isometric interior",
          body:
            "A 3D animated room that shifts from day to night. Built to capture personality through scale and detail — textures, light, and atmosphere define its tone more than movement itself.",
        },
        {
          type: "video",
          src: "/images/projects/studio-hot-hand/ROOMVID.mp4",
          poster: "/images/projects/studio-hot-hand/final_0002_Layer-1.png",
          label: "Day ↔ Night loop",
          autoplay: true,
          muted: true,
          loop: true,
          playsInline: true,
        },
        {
          type: "twoUp",
          images: [
            {
              src: "/images/projects/studio-hot-hand/ROOM1.png",
              alt: "Closeup room detail showing texture and linework.",
            },
            {
              src: "/images/projects/studio-hot-hand/ROOM2.png",
              alt: "Closeup room detail showing texture and linework.",
            },
          ],
        },

        {
          type: "spacer",
        },

        // Outcome
        {
          type: "text",
          heading: "Outcome",
          body:
            "Studio Hot Hand mixes commissioned and self-initiated work — balancing clear, functional design with playful experimentation across media. These projects show the mix of worlds we like to build: tactile, direct, and slightly surreal.",
        },
      ],
  },

  // La Piel Tejida
  {
    slug: "la-piel-tejida",
    title: "La Piel Tejida",

    cover: "/images/projects/la-piel-tejida/COVER.png",
    alt: "Interactive textile installation showing woven surface with embedded electronics.",
    date: "2025-7",
    tags: "Art & Technology, Sound Design, Programming",

    blocks: [
      {
        type: "text",
        heading: "Overview",
        body:
          "La Piel Tejida is an interactive textile installation that transforms touch into audiovisual expression. I worked on bridging the physical and digital layers — programming the interactive logic, developing the sound design, and shaping how the piece responds to touch.",
      },
      {
        type: "spacer",
      },
      {
        type: "text",
        heading: "Concept",
        body:
          "La Piel Tejida operates through a set of internal rules combined with external interaction. Its structure is defined by conductive zones that respond to contact, each with pre-defined behavioral parameters. Although the system follows a logical framework, it remains open — every touch alters its state in real time and reveals new sound or visual responses. Over time, this dynamic could evolve into a system that learns from interaction patterns.",
      },

      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/la-piel-tejida/CLOSEUP1.png",
            alt: "Close-up of conductive woven textile showing material transitions.",
          },
          {
            src: "/images/projects/la-piel-tejida/CLOSEUP2.png",
            alt: "Process image showing integration of sensors within textile structure.",
          },
        ],
      },
      {
        type: "spacer",
      },
      {
        type: "text",
        heading: "Process",
        body:
          "Early explorations focused on conductive weaving and material mapping. Each woven section contained unique response parameters linked to sensors and microcontrollers, allowing the textile to function as both interface and medium.",
      },

      {
        type: "spacer",
      },
      {
        type: "text",
        heading: "Installation",
        body:
          "Exhibited as a tactile surface on a custom wooden frame, the piece integrates embedded circuitry and dual display feedback. Visitors activated sounds and visuals through direct contact, making each interaction distinct and unpredictable.",
      },
      
      {
        type: "image",
        image: {
          src: "/images/projects/la-piel-tejida/EXHIBITION.png",
          alt: "People at the exhibition.",
        },
      },
      {
        type: "spacer",
      },
      {
        type: "text",
        heading: "Outcome",
        body:
          "La Piel Tejida explores the intersection between craft and computation — how a woven surface can become both interface and performer. By combining physical weaving with algorithmic behavior, the piece invites a dialogue between structure, touch, and sound.",
      },
    ],
  },

  // Loop Bench
  {
      slug: "loop-bench",
      title: "Loop Bench",

      cover: "/images/projects/loop-bench/cover.png",
      alt: "Two-seat plywood bench assembled with zip ties.",
      date: "2021-11",
      tags: "Industrial Design, Prototyping, CAD/CAM",

      // blocks: [...]
      blocks: [
          {
            type: "text",
            heading: "What it is",
            body:
              "A two-person bench cut from 3 mm plywood and stitched together with zip ties. The flowing profile uses curvature and tension for strength while keeping the build lightweight and tool-free.",
          },
          {
            type: "spacer",
          },
          {
            type: "text",
            heading: "Build approach",
            body:
              "Panels are CNC-routed with slotted tabs that accept standard zip ties. The geometry locks under tension, so assembly is quick, reversible, and easy to repair. Parts nest efficiently on sheets to minimize waste.",
          },
          {
            type: "text",
            heading: "Assembly & use",
            body:
              "Flat parts + ~200 zip ties. Slot, lace, and cinch—no clamps or hardware required. The form’s waist adds stiffness and a natural hand-hold for moving the piece.",
          },
          // CAD + assembly manual
          {
            type: "twoUp",
            images: [
              {
                src: "/images/projects/loop-bench/02-cad-views.png",
                alt: "CAD renders: perspective, front elevation, and plan view of the bench.",
              },
              {
                src: "/images/projects/loop-bench/03-assembly-manual.png",
                alt: "Assembly booklet with part callouts and zip-tie count.",
              },
            ],
          },


          {
            type: "spacer",
          },
          // Companion lamp
          {
            type: "text",
            heading: "Companion piece",
            body:
              "A small desk lamp explores the same language—three materials layered to cast shifting light through a rotating aluminum ring. It echoes the bench’s curves and stitched construction.",
          },
          {
            type: "twoUp",
            images: [
              {
                src: "/images/projects/loop-bench/04-lamp-prototype.jpg",
                alt: "Desk lamp prototype with laminated wood, acrylic ring, and LEDs.",
              },
              {
                src: "/images/projects/loop-bench/05-lamp-detail.jpg",
                alt: "Detail of acrylic ring projecting soft light and curves echoing the bench.",
              },
            ],
          },


      ],
      
  },

  // Registro Civil
  {
    slug: "registro-civil",
    title: "Registro Civil",
    cardImage: "/images/projects/registrocivil/cover.png",
    cover: "/images/projects/registrocivil/hero.png",
    alt: "Redesigned Registro Civil trámites homepage with improved information architecture.",
    date: "2025-11",
    tags: "UX Research, UI Design, Public Services",

    blocks: [
      {
        type: "text",
        heading: "Overview",
        body:
          "RegistroCivil.cl is one of Chile’s most widely used public service platforms. It centralizes identity and civil-status services, digital certificates, and appointment scheduling. Because many procedures require ClaveÚnica — the country’s digital identity credential — the platform is critical to millions of residents and Chileans abroad. This redesign was my capstone project, where I led the entire process end-to-end: research, heuristic evaluation, surveys, IA redesign, wireframing, UI system, prototyping, and usability testing.",
      },

      {
        type: "spacer",
      },

      // Problem
      {
        type: "text",
        heading: "The problem",
        body:
          "Although the site handles essential tasks, its experience had grown fragmented and inconsistent. Users struggled with: Unclear appointment availability and low visibility of confirmations. Repeated data entry, especially with ClaveÚnica and personal details. Disjointed navigation between domains (Registro Civil, ChileAtiende), breaking flow. Poor information hierarchy, with mixed categories and action labels that did not match user mental models. The result: longer task times, unnecessary errors, and significant drop-off during key procedures.",
      },

      {
        type: "spacer",
      },
      {
        type: "text",
        heading: "Heuristic Evaluation",
        body:
          "I evaluated the platform using Nielsen’s 10 heuristics and relevant UX laws (Fitts, Miller, Jakob’s Law, Von Restorff, Aesthetic-Usability Effect). Key findings included: Fragmented login and no way to undo or edit steps (Control & Freedom). Inconsistent labeling and mixed icon styles (Consistency & Standards). Small action targets, especially critical buttons (Fitts’ Law). Overloaded pages with dozens of items and no categorization (Miller’s Law). Red used for low-priority actions, hurting visual hierarchy (Von Restorff).",
      },
      // Original UI reference
      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/07-original-ui-1.png",
          alt: "Existing Registro Civil certificate interface with inconsistent layout.",
        },
      },

      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/08-original-ui-2.png",
          alt: "Existing appointment scheduling screen with limited filtering.",
        },
      },

      {
        type: "spacer",
      },

      // Survey
      {
        type: "text",
        heading: "Survey (40 respondents)",
        body:
          "Goals: understand user behavior, trust, and pain points. Insights: 75% had used the site in the last 6 months. 73% took more than 5 minutes to complete their last task. Nearly half had to repeat steps or re-enter data. One-third struggled to compare offices and appointment times. Users described the experience as “starting from zero every time.”",
      },
      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/02-survey-time-to-complete.png",
          alt: "User survey results showing time required to complete a task on the old Registro Civil platform.",
        },
      },

      {
        type: "spacer",
      },

      // Tree testing
      {
        type: "text",
        heading: "Tree testing",
        body:
          "Two tasks: find a birth certificate and book an ID renewal appointment. Results showed deep navigation mismatches: 50% success for certificate flow, and only 20% for appointments. Most failures originated from misleading labels (e.g., ‘Trámites’ acting as a guide instead of an actionable section).",
      },
      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/registrocivil/03-tree-test-certificates.png",
            alt: "Tree test visualization for certificate task — 50% completion.",
          },
          {
            src: "/images/projects/registrocivil/04-tree-test-appointments.png",
            alt: "Tree test visualization for appointment task — 20% completion.",
          },
        ],
      },

      {
        type: "spacer",
      },



      {
        type: "text",
        heading: "Design Goals",
        body:
          "From the research, I established four goals: Reduce repetition through unified login and data persistence. Align navigation with user objectives, not internal categories. Simplify appointment scheduling with filters, maps, and clearer availability. Create a consistent, accessible visual system that matches government standards.",
      },

      {
        type: "spacer",
      },
      // IA redesign
      {
        type: "text",
        heading: "Information architecture",
        body:
          "The IA was reorganized around user goals, not actions. Examples: “Cédula de Identidad” replaces “Agendar Hora” as the entry point. Certificates, appointments, and identity services are grouped by intention. The misleading “Trámites” label was replaced, eliminating a major source of failed navigation. I also added: Shortcuts for high-frequency tasks Integrated explanations directly inside user flows, instead of sending users to separate pages Clear hierarchy for pages containing legal or process information",
      },
      
      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/05-ia-original.png",
          alt: "Original Registro Civil information architecture diagram showing mixed categories and deep nesting.",
        },
      },
      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/06-ia-redesign.png",
          alt: "Redesigned information architecture organized by user intent.",
        },
      },

      {
        type: "spacer",
      },

      {
        type: "text",
        heading: "Interaction & Flow Improvements",
        body:
          "Reduced steps to five. Added autofill where appropriate. Consolidated instructions and action into one screen. Appointment Scheduling Added filters (city, region, morning/afternoon, “next available”). Introduced a map view to compare offices visually. Made availability more transparent and easier to scan. UI & Design System I built a complete UI kit inspired by government guidelines: Museo Sans for legibility and institutional coherence. 12-column layout for responsive behavior. Accessible color palette with semantic states (success, warning, error). Material Design iconography with unified style. Components for forms, buttons, navigation, pop-ups, breadcrumbs, search, and date pickers. I also defined voice and tone guidelines: clear, brief, neutral, and formally correct — essential for government services.",
      },

      // Hi-fi redesign
      {
        type: "spacer",
      },

      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/09-hifi-tramites.png",
          alt: "Redesigned trámites landing page with categorized shortcuts.",
        },
      },

      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/registrocivil/10-hifi-identidad.png",
            alt: "Redesigned identity document page with clear hierarchy.",
          },
          {
            src: "/images/projects/registrocivil/11-hifi-cedula.png",
            alt: "Office selection screen with map-based comparison.",
          },
        ],
      },

      {
        type: "image",
        image: {
          src: "/images/projects/registrocivil/12-hifi-oficina.png",
          alt: "Redesigned office selection screen with map-based comparison.",
        },
      },

      {
        type: "twoUp",
        images: [
          {
            src: "/images/projects/registrocivil/13-hifi-hora.png",
            alt: "Day and time selection with improved availability scanning.",
          },
          {
            src: "/images/projects/registrocivil/14-hifi-exito.png",
            alt: "Identity category layout with reorganized labels and tasks.",
          },
        ],
      },

      {
        type: "spacer",
      },
      {
        type: "text",
        heading: "Usability testing",
        body:
          "I conducted 4 moderated and 10 remote usability tests on both redesigned flows. Results: 100% success on both tasks. Certificate flow: 22 seconds average, down from >1 minute. Appointment flow: 36 seconds average, down significantly from baseline. Key insights: Users preferred starting via shortcuts. The new category-based IA was immediately understood. Combining instructions + action in one page reduced friction. A few users requested more visibility in confirmation screens (easily fixable).",
      },

      {
        type: "spacer",
      },

      // Outcome
      {
        type: "text",
        heading: "Outcome",
        body:
          "The redesign delivered measurable improvements: Clearer navigation aligned to user intent Reduced cognitive load Faster completion of critical tasks Stronger trust through consistent UI and integrated help Better accessibility and mobile responsiveness This project demonstrated how UX design can elevate public digital services by reducing friction and empowering users to complete essential procedures with confidence.",
      },

      {
        type: "spacer",
      },

      {
        type: "text",
        heading: "Reflection",
        body:
          "Working end-to-end allowed me to understand the full depth of public-sector UX: complex logic, high stakes, broad user diversity, and the need for clarity and trust. Key learnings: Small labeling decisions can drastically influence task success. Integrating information directly into the flow reduces confusion. Accessibility and visual consistency aren’t just aesthetic; they build legitimacy. Public services benefit greatly from transparency in scheduling and availability. If I continued, I would explore: A more advanced appointment system with real-time availability Multilingual support Mobile-first refinements for users with lower digital proficiency",
      },
    ],
  },

  // Copec Immersive History Room
  {
    slug: "copec-immersive",
    title: "Copec Immersive History",
    cover: "/images/projects/copec/cover.png",
    alt: "Immersive Copec installation with historical graphics and LED lighting.",
    date: "2025-11",
    tags: "Graphic Design, Environmental Design, Visual Storytelling",

    blocks: [
      {
        type: "text",
        heading: "What it is",
        body:
          "A full-room graphic installation for Copec’s 90-year immersive stand experience. The project involved unifying archival photos, timelines, and energy-transition imagery into a cohesive spatial narrative across five walls and multiple cutouts.",
      },

      // 01 — video
      {
          type: "video",
          src: "/images/projects/copec/video.mp4",
          label: "Walkrough of the Copec immersive history room",
          autoplay: true,
          muted: true,
          loop: true,
          playsInline: true,
          // controls off by default
      },

      { type: "spacer" },

      {
        type: "text",
        heading: "Visual system",
        body:
          "A mix of archival photography, custom illustrations, and modular timeline elements were brought into a single visual language. Transitions between decades were unified through consistent use of Copec’s brand cues while still allowing each era to feel distinct. Because the archive varied widely in resolution and condition, the project required a combination of AI enhancement, manual retouching, and selective colorization to achieve a balanced look across large-scale surfaces.",
      },

      // Full-width image: energy transition wall
      {
        type: "image",
        image: {
          src: "/images/projects/copec/02-history.png",
          alt: "Large-format digital and printed wall showcasing Copec’s solar and electromobility era.",
        },
      },

      {
        type: "image",
        image: {
          src: "/images/projects/copec/03-cutout.png",
          alt: "Large-format digital and printed wall showcasing Copec’s solar and electromobility era.",
        },
      },

      { type: "spacer" },

      {
        type: "text",
        heading: "Approach",
        body:
          "The experience is structured as a chronological walk-through: early stations and attendants, infrastructure growth, and finally the transition to electromobility and clean energy. LED accents and screen content help separate eras while keeping the environment cohesive.",
      },

      {
        type: "image",
        image: {
          src: "/images/projects/copec/01-room.png",
          alt: "Copec's electromobility wall with large-format historical graphics and LED accents.",
        },
      },



      { type: "spacer" },

      {
        type: "text",
        heading: "Outcome",
        body:
          "The result is an environment that feels part museum, part playful brand experience—designed to inform without becoming heavy. The full package included production-ready wall graphics, cutouts, and a cohesive content structure adapted for fabrication and installation.",
      },
    ],
  },

  
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug && !p.draft);
}
