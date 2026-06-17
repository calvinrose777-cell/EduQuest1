import { Lesson, Grade, ActiveMeetEvent } from "../types";

export const GRADES_LIST: Grade[] = [
  {
    id: "grade-5",
    name: "Grade 5: Cosmic Science Exploration",
    description: "Launch into the stars! Discover the solar system, planetary gravity, stars, rovers, and the universe beyond.",
    lessonsCount: 10,
    accentColor: "blue"
  },
  {
    id: "grade-6",
    name: "Grade 6: Earth Ecology & Biodiversity",
    description: "Connect with nature! Learn about ecosystems, dynamic rain forests, depths of the ocean, water cycle, and renewable energy.",
    lessonsCount: 10,
    accentColor: "emerald"
  },
  {
    id: "grade-7",
    name: "Grade 7: Ancient Civilizations & Mysteries",
    description: "Travel through time! Uncover the stories of the Pharaohs, Roman roads, Silk Road trading routes, and Greek philosophy.",
    lessonsCount: 10,
    accentColor: "amber"
  }
];

export const LESSONS_DATA: Record<string, Lesson[]> = {
  "grade-5": [
    {
      id: "g5-l1",
      title: "Our Neighborhood Star: The Sun",
      topic: "Solar Core & Corona",
      duration: "30 mins",
      summary: "Understand the star at the center of our Solar System, how hot it gets, and how its light gives life to Earth.",
      content: `The Sun is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. It radiates this energy mainly as light, ultraviolet, and infrared radiation, providing the primary source of energy for life on Earth.

Key Facts:
- Core Temperature: Over 15 million degrees Celsius (27 million Fahrenheit).
- Light Travel Time: It takes about 8 minutes and 20 seconds for sunlight to reach Earth.
- Size Comparison: The Sun's diameter is about 109 times that of Earth, and it contains 99.8% of the total mass of the solar system.

Scientists study the Sun using special space telescopes. It has dark patches called "sunspots" which are cooler regions of intense magnetic activity. Solar flares sometimes erupt, sending charged particles whistling past Earth, creating the beautiful Northern and Southern Lights (auroras).`,
      meetUrl: "https://meet.google.com/abc-defg-hij",
      meetTime: "Tuesday, 10:00 AM - 10:30 AM",
      questions: [
        {
          id: "g5-l1-q1",
          text: "How long does it take for sunlight to travel from the Sun to Earth?",
          options: ["8 seconds", "8 minutes and 20 seconds", "24 hours", "Instantaneous"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g5-l1-q2",
          text: "What causes auroras on Earth?",
          options: ["Reflections off solar panels", "Solar flares and charged particles", "Earth's clouds matching solar heat", "Moonlight eclipses"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g5-l2",
      title: "Atmospheres of the Rocky Planets",
      topic: "Mercury, Venus, Earth, and Mars",
      duration: "35 mins",
      summary: "Explore why Venus is a runaway greenhouse furnace, why Mars is a freezing desert, and how Earth remains perfect.",
      content: `The four inner planets of our solar system are known as rocky or terrestrial planets. While they are made of similar materials, their atmospheres couldn't be more different!

1. Mercury: Almost no atmosphere. It has extreme temperatures—scorching during the day (430°C) and freezing during the night (-180°C) because there is no gas blanket to trap heat.
2. Venus: A thick toxic breeze of sulfuric acid and carbon dioxide. Its runaway greenhouse effect traps immense heat, making the surface over 460°C—hot enough to melt lead!
3. Earth: The perfect recipe of nitrogen (78%), oxygen (21%), and argon, forming a protective atmosphere that shields life from cosmic rays.
4. Mars: A very thin carbon dioxide atmosphere. Due to low pressure, liquid water cannot exist easily on its freezing surface today.`,
      meetUrl: "https://meet.google.com/bcd-efgh-ijk",
      meetTime: "Wednesday, 10:00 AM - 10:30 AM",
      questions: [
        {
          id: "g5-l2-q1",
          text: "Which rocky planet has the hottest surface temperature due to a thick greenhouse atmosphere?",
          options: ["Mercury", "Venus", "Mars", "Earth"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g5-l2-q2",
          text: "What is the primary gas in Earth's atmosphere?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g5-l3",
      title: "The Gas Giants and Their Rings",
      topic: "Jupiter & Saturn",
      duration: "40 mins",
      summary: "Dive deep into the massive swirling gas worlds of Jupiter and the beautiful icy rings of Saturn.",
      content: `Jupiter and Saturn are the giants of our solar system. Instead of solid rock surfaces, these planets are composed primarily of hydrogen and helium gas, enveloping dense, super-hot cores.

Jupiter: The largest planet. It is famous for the Great Red Spot, a massive storm wider than Earth that has raged for hundreds of years. Jupiter has more than 90 moons, including Io (which has active volcanoes) and Europa (which shields a subsurface liquid ocean).

Saturn: Known as the jewel of the Solar System. It possesses a spectacular ring system composed of billions of pieces of water ice, dust particles, and rocky debris ranging from microscopic grains to house-sized boulders. Saturn is so light that if there were a bathtub big enough, it would float!`,
      meetUrl: "https://meet.google.com/cde-fghi-jkl",
      meetTime: "Thursday, 10:00 AM - 10:30 AM",
      questions: [
        {
          id: "g5-l3-q1",
          text: "What is the Great Red Spot on Jupiter?",
          options: ["A planetary mountain", "A massive liquid lava ocean", "A persistent high-pressure storm", "An active volcano"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g5-l3-q2",
          text: "Saturn's magnificent ring system is made mostly of what substance?",
          options: ["Liquid mercury", "Solid gold dust", "Water ice and rocky debris", "Glowing carbon gases"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g5-l4",
      title: "The Ice Giants & Outer Reaches",
      topic: "Uranus and Neptune",
      duration: "30 mins",
      summary: "Study Uranus, which rolls sideways, and Neptune, home to supersonic winds.",
      content: `In the freezing outskirts of our planetary system lie Uranus and Neptune. Scientists call them 'Ice Giants' because their composition is heavy in methane, water, and ammonia ice under massive pressure.

Uranus: Unlike other planets that spin like tops, Uranus rotates on its side. Imagine a planet rolling around the Sun like a bowling ball! This eccentric spin causes extreme seasonal patterns lasting decades.

Neptune: The furthest official planet from the Sun. It appears deep royal blue due to atmospheric gases. Neptune has the fastest winds recorded in our solar system, reaching supersonic speeds of up to 2,100 kilometers per hour (1,300 mph).`,
      meetUrl: "https://meet.google.com/def-ghij-kla",
      meetTime: "Friday, 11:00 AM - 11:30 AM",
      questions: [
        {
          id: "g5-l4-q1",
          text: "Why does Uranus stand out from other planets?",
          options: ["It rotates on its side", "It is the hottest planet in the Solar System", "It has thousands of green forests", "It spins faster than any other planet"],
          correctAnswer: 0,
          points: 10
        },
        {
          id: "g5-l4-q2",
          text: "What makes Neptune's winds extremely unique?",
          options: ["They carry gold coins", "They are the fastest recorded, reaching supersonic speeds", "Wind never blows on Neptune", "They smell like sweet flowers"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g5-l5",
      title: "Gravity: The Invisible cosmic Glue",
      topic: "Universal Gravitation Explained",
      duration: "35 mins",
      summary: "Discover how gravity keeps our feet on the ground and guides planets around stars.",
      content: `Gravity is an invisible pull force that attracts two objects toward each other. Sir Isaac Newton first formulated gravity mathematically while watching an apple fall. Albert Einstein later explained that mass bends the fabric of space and time around it, creating what we feel as gravity.

Gravity depends on two major factors:
1. Mass: The more matter an object has, the stronger its gravitational pull. That's why the massive Sun rules the planets.
2. Distance: The farther apart objects are, the weaker the gravitational attraction.

Without gravity, there would be no planets, atmosphere, or solar system—everything would simply wander off into cold dark deep space.`,
      meetUrl: "https://meet.google.com/efg-hijk-lmn",
      meetTime: "Monday, 2:00 PM - 2:30 PM",
      questions: [
        {
          id: "g5-l5-q1",
          text: "Which two factors determine the strength of gravity between objects?",
          options: ["Size and Color", "Mass and Distance", "Age and Rotation speed", "Temperature and Atmosphere"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g5-l5-q2",
          text: "What would happen to the planets if the Sun's gravity suddenly disappeared?",
          options: ["They would fall into the Sun", "They would stay in exact perfect orbits", "They would fly straight off into deep space", "They would instantly expand"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g5-l6",
      title: "Earth's Lunar Companion",
      topic: "Moon Phases and Tides",
      duration: "30 mins",
      summary: "How the Moon was formed, why it shows different faces, and how it pulls Earth's oceans.",
      content: `The Moon is Earth's only natural satellite. Scientists believe that 4.5 billion years ago, a Mars-sized planet cataloged as 'Theia' crashed into early Earth, creating a ring of fiery debris that slowly clumped together to form our Moon.

The Moon doesn't create its own light; it reflects sunlight. As the Moon orbits Earth once every 29.5 days, we see varying parts of its illuminated half, producing Lunar Phases (New Moon, Crescent, Quarter, Gibbous, Full).

In addition, the Moon's gravitational pull creates the ocean tides. High tide occurs on the side of Earth facing the Moon as well as on the direct opposite side.`,
      meetUrl: "https://meet.google.com/fgh-ijkl-mno",
      meetTime: "Tuesday, 2:00 PM - 2:30 PM",
      questions: [
        {
          id: "g5-l6-q1",
          text: "What cosmic event is believed to have formed the Moon?",
          options: ["A solar flare explosion", "A collision with a Mars-sized planet called Theia", "A capture of an asteroid from Jupiter", "The condensation of carbon clouds"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g5-l6-q2",
          text: "What regular oceanic cycle is directly caused by the Moon's gravity?",
          options: ["Hurricanes", "Tides", "Tsunamis", "Underwater volcanic currents"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g5-l7",
      title: "The Asteroid Belt & Other Debris",
      topic: "Space Rocks",
      duration: "30 mins",
      summary: "Uncover the cosmic ring of rubble that orbits between the inner and outer planets.",
      content: `Between Mars and Jupiter lies a wide ring filled with billions of rocky bodies left over from the formation of the solar system: the Asteroid Belt.

Asteroids are primitive fragments and boulders of rock, clay, ice, and metals. Scientists suggest that Jupiter's massive gravity prevented these stray pieces from ever joining together to form a fully grown planet.

Other cosmic wanderers include Comets. Coming from the freezing edges of space, comets are frozen balls of water ice, carbon dioxide, dust, and rock. When a comet's orbit brings it close to the Sun, heat vaporizes the ice, producing a glowing bright dusty white tail that stretches for millions of miles.`,
      meetUrl: "https://meet.google.com/ghi-jklm-nop",
      meetTime: "Wednesday, 2:00 PM - 2:30 PM",
      questions: [
        {
          id: "g5-l7-q1",
          text: "Where is the major Asteroid Belt located in our solar system?",
          options: ["Between Earth and Mars", "Between Mars and Jupiter", "Past Neptune's orbit", "Encircling the Sun's core"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g5-l7-q2",
          text: "What makes a comet develop a brilliant glowing tail?",
          options: ["Friction with orbital dust", "Sunlight vaporizing its frozen ice as it approaches", "Atomic engines firing on command", "Volcanic explosions in its center"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g5-l8",
      title: "Exploring Mars: Robotic Rovers",
      topic: "Sojourner to Perseverance",
      duration: "35 mins",
      summary: "Explore the wheeled scientific laboratories we sent to investigate the red planet.",
      content: `Human astronauts have not set foot on Mars yet, but we've sent mechanical scouts! Since 1997, interplanetary missions have successfully landed sophisticated robotic rovers on Mars' rusty crust.

The Pioneers:
- Sojourner (1997): The first rover, small like a microwave.
- Spirit and Opportunity (2004): Designed for a 90-day mission, Opportunity survived for 15 years, proving Mars was once warm and wet!
- Curiosity (2012): A car-sized nuclear rover studying ancient lakebeds.
- Perseverance (2021): Searching for ancient microscopic fossil signatures and dropping experimental sample containers for future retrieval!

Rovers run on solar arrays or nuclear power cells. They take photos, dig soil samples, and fire lasers to analyze chemicals.`,
      meetUrl: "https://meet.google.com/hij-klmn-opq",
      meetTime: "Thursday, 2:00 PM - 2:30 PM",
      questions: [
        {
          id: "g5-l8-q1",
          text: "Which rover landed in 2021 to search for ancient microscopic life footprints on Mars?",
          options: ["Sojourner", "Opportunity", "Perseverance", "Explorer 1"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g5-l8-q2",
          text: "What valuable truth did rover missions confirm about ancient Mars?",
          options: ["It once had liquid water and warm climates", "It has oceans of liquid oil", "It is made of pure solid silver", "It has cities of green aliens"],
          correctAnswer: 0,
          points: 10
        }
      ]
    },
    {
      id: "g5-l9",
      title: "Constellations and Map of the Sky",
      topic: "Stargazing and Celestial Navigation",
      duration: "30 mins",
      summary: "Learn how ancient civilizations mapped the stars and how travelers use them to find north.",
      content: `A constellation is a group of stars that forms a recognized pattern or outline when viewed from Earth. Throughout human history, travelers, sailors, and farmers have used these cosmic pictures as maps and agricultural calendars.

International astronomers officially recognize 88 constellations. Some of the most famous patterns are:
- Ursa Major: Contains the Big Dipper. The outer stars of the Dipper point straight to Polaris, the North Star.
- Orion: The Hunter, with his recognizable three-star Belt visible globally around winter.
- Cassiopeia: A striking W-shaped constellation in northern skies.

Because Earth rotates on its axis and orbits the Sun, the stars visible in our backyard change with the seasons.`,
      meetUrl: "https://meet.google.com/ijk-lmno-pqr",
      meetTime: "Friday, 2:00 PM - 2:30 PM",
      questions: [
        {
          id: "g5-l9-q1",
          text: "How many official constellations are recognized by international astronomers today?",
          options: ["12", "50", "88", "365"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g5-l9-q2",
          text: "Which star can be easily found using the pointer stars of the Big Dipper?",
          options: ["Sirius, the Dog Star", "Betelgeuse", "Polaris, the North Star", "Proxima Centauri"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g5-l10",
      title: "The Ultimate Death of Stars: Supernovas",
      topic: "Star Life Cycle & Nebulas",
      duration: "40 mins",
      summary: "Understand stellar lives, from dusty clouds to brilliant hyper energetic explosions.",
      content: `Stars aren't immortal. They are born in vast swirling clouds of dust and hydrogen gas called Nebulas. For millions or billions of years, a star burns hydrogen fuel, keeping itself stable.

When high-mass supergiant stars run completely out of fuel, their gravity collapses their core in a fraction of a second. This trigger produces a colossal cosmic explosion: a Supernova.

A supernova is briefly brighter than an entire galaxy of stars! The blast disperses heavy atoms like iron, carbon, and gold across space, seeds the formation of new solar systems, and leaves behind a super-dense Neutron Star or a Black Hole.`,
      meetUrl: "https://meet.google.com/jkl-mnop-qrs",
      meetTime: "Saturday, 11:30 AM - 12:00 PM",
      questions: [
        {
          id: "g5-l10-q1",
          text: "What is a nebula?",
          options: ["A dead planet", "A swirling stellar nursery cloud of dust and gas", "The core of a black hole", "An asteroid moon"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g5-l10-q2",
          text: "What cosmic remnants can a high-mass massive star leave behind after a supernova?",
          options: ["White dwarfs or gas planets", "A liquid rock ring", "A neutron star or a black hole", "An empty frozen vacuum"],
          correctAnswer: 2,
          points: 10
        }
      ]
    }
  ],
  "grade-6": [
    {
      id: "g6-l1",
      title: "What is an Ecosystem?",
      topic: "Biotic and Abiotic Factors",
      duration: "30 mins",
      summary: "An introduction to ecosystems and the dynamic dance between living organisms and physical environments.",
      content: `An ecosystem is a biological community of interacting organisms (biotic ingredients) and their physical, non-living environment (abiotic ingredients). Everything in an ecosystem is connected!

Biotic Factors: Living parts of the ecosystem, such as plants, trees, birds, insects, mammals, fungi, and bacteria.

Abiotic Factors: Crucial non-living structures, which include sunlight, water, air, soil quality, temperature, and altitude.

A perfect example is a forest. The trees (biotic) need sunlight and carbon dioxide (abiotic) to make food. The insects (biotic) eat the tree leaves, and birds (biotic) nesting in those trees drink water (abiotic) from a stream. If you pollute the stream, the entire chain suffers.`,
      meetUrl: "https://meet.google.com/ecosystem-g6-l1",
      meetTime: "Tuesday, 11:00 AM - 11:30 AM",
      questions: [
        {
          id: "g6-l1-q1",
          text: "Which of the following is considered an abiotic factor in an ecosystem?",
          options: ["Fungi", "A rabbit", "Sunlight", "Oak tree"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g6-l1-q2",
          text: "What makes up the 'biotic' portion of an ecosystem?",
          options: ["The rivers and stones", "The temperature and altitude", "All living organisms and biological life", "The gaseous ozone layer"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g6-l2",
      title: "Photosynthesis: Solar-Powered Life",
      topic: "Chloroplasts & Glucose Production",
      duration: "35 mins",
      summary: "Learn how green leaves trap sunlight, extract water, and cook food for planet Earth.",
      content: `Photosynthesis is the chemical process by which green plants, algae, and some bacteria capture solar sunlight energy and convert it into chemical energy (glucose sugar), releasing oxygen gas as a byproduct.

The Secret Ingredient: Chlorophyll. This is the green pigment stored inside plant cell organs called Chloroplasts. Chlorophyll absorbs blue and red wavelengths of solar light but reflects green light!

The Equation:
Carbon Dioxide (from air) + Water (from soil) + Solar Light energy yields Glucose + Oxygen.

Plants use glucose to grow stems, leaves, and fruits. In doing so, plants act as the planetary lungs, purifying our air and forming the base of every food chain.`,
      meetUrl: "https://meet.google.com/photosynth-g6-l2",
      meetTime: "Wednesday, 11:00 AM - 11:30 AM",
      questions: [
        {
          id: "g6-l2-q1",
          text: "Where inside plant cells does photosynthesis take place?",
          options: ["In the cell walls", "In the chloroplasts", "In the nucleus", "In the vacuoles"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g6-l2-q2",
          text: "What key gas is released into the atmosphere by plants during photosynthesis?",
          options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Methane"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g6-l3",
      title: "Food Webs and Trophic Cascades",
      topic: "Producers, Consumers & Apex Predators",
      duration: "35 mins",
      summary: "Understand trophic levels, energy loss, and why keeping apex predators around is vital.",
      content: `Energy flows through an ecosystem in structured pathways called Food Chains, which cross-connect to form highly complex Food Webs.

Trophic Levels:
- Primary Producers: Green plants making solar sugars.
- Primary Consumers: Herbivores (plant-eaters like deer, grasshoppers).
- Secondary Consumers: Carnivores (meat-eaters like frogs, bluebirds).
- Apex Predators: Top predators (wolves, sharks, hawks) with no natural enemies.

An ecosystem requires balance. When an apex predator is removed from an environment, we observe a Trophic Cascade. For example, when wolves were hunted out of Yellowstone Park, elk populations multiplied unchecked, overeating river willows, which caused soil erosion and drove beavers away!`,
      meetUrl: "https://meet.google.com/foodweb-g6-l3",
      meetTime: "Thursday, 11:00 AM - 11:30 AM",
      questions: [
        {
          id: "g6-l3-q1",
          text: "What trophic role does a deer eating grass perform?",
          options: ["Primary Producer", "Primary Consumer / Herbivore", "Apex Predator", "Decomposer"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g6-l3-q2",
          text: "What is a 'trophic cascade'?",
          options: ["A waterfall in a forest", "An unchecked change across food chain levels when a key species is lost", "A method of measuring mountain height", "The rapid evaporation of river channels"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g6-l4",
      title: "The Silent Workers: Decomposers",
      topic: "Fungi, Bacteria, and Detritivores",
      duration: "30 mins",
      summary: "Meet the environmental clean-up crew that breaks down organic waste and fertilizes soil.",
      content: `What happens when a tree falls or an animal dies in a forest? Without the cleanup crew, the Earth would be buried in layers of organic waste. Decomposers are the essential organisms that recycle dead material back into basic chemical nutrients.

Key Players:
1. Fungi: Release chemical enzymes to break down tough wood fibers (lignin) that other organisms cannot digest.
2. Bacteria: Microscopically recycle softer tissues in soils.
3. Detritivores: Worms, beetles, slugs, and millipedes that physically chew up debris into smaller packages.

By breaking down organic compounds, decomposers release vital nitrogen, phosphorus, and potassium molecules back into the soil, feeding new saplings. They are nature's circular economy!`,
      meetUrl: "https://meet.google.com/decom-g6-l4",
      meetTime: "Friday, 11:00 AM - 11:30 AM",
      questions: [
        {
          id: "g6-l4-q1",
          text: "Why are decomposers absolutely critical to life cycles?",
          options: ["They produce light", "They recycle organic waste and release vital nutrients into soils", "They hunt apex predators", "They generate atmospheric wind"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g6-l4-q2",
          text: "Which organisms are examples of fungi and detritivores?",
          options: ["Eagles and foxes", "Sunflowers and algae", "Mushrooms and earthworms", "Bacteria and mosquitoes"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g6-l5",
      title: "The Water Cycle in Action",
      topic: "Evaporation, Condensation & Transpiration",
      duration: "30 mins",
      summary: "Understand how the exact same water molecules have recycled through Earth for billions of years.",
      content: `The water in your drinking glass might have once been drunk by a Tyrannosaurus Rex! The water cycle is a continuous planetary loop of water vapor, liquid, and ice.

The Steps:
- Evaporation: Solar heat warms oceans, turning liquid water into vapor gas rising into the sky.
- Transpiration: Plants sweat water vapor from their leaves into the air.
- Condensation: Cold air high up turns vapor gas back into liquid droplets, building fluffy clouds.
- Precipitation: Rain, snow, sleet, or hail falls from clouds back to earth, recharging lakes and underground water reserves.`,
      meetUrl: "https://meet.google.com/watercycle-g6-l5",
      meetTime: "Monday, 3:00 PM - 3:30 PM",
      questions: [
        {
          id: "g6-l5-q1",
          text: "What term describes plants releasing water vapor into the atmosphere?",
          options: ["Evaporation", "Condensation", "Transpiration", "Precipitation"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g6-l5-q2",
          text: "How are clouds formed high in our sky?",
          options: ["Through condensation of rising water vapor in colder air", "By mechanical atmospheric dust mixing", "By leaves catching solar rays", "Through chemical salt reactions"],
          correctAnswer: 0,
          points: 10
        }
      ]
    },
    {
      id: "g6-l6",
      title: "Rainforests: Earth's Richest Biospheres",
      topic: "Tropical Canopy & Diversity",
      duration: "40 mins",
      summary: "Step inside tropical rainforests that house over 50% of Earth's biological land species.",
      content: `Tropical rainforests cover only 6% of Earth's land, but they are hyper-diverse biospheres. They are hot, humid, and receive over 200 centimeters of rainfall annually!

Living in layers:
- Emergent Layer: Giant trees reaching 70 meters high, home to eagles and monkeys.
- Canopy: A dense leaf layer 30 meters up, functioning like a massive green roof. Most rainforest creatures (90%!) live here in the lush tree branches.
- Understory: Darker, quiet layer with large-leaved shrubs, jaguars, and tree frogs.
- Forest Floor: Deep shade, where decomposers operate and anteaters walk.

Many modern medicines are discovered of active chemicals found only in rare rainforest plants!`,
      meetUrl: "https://meet.google.com/rainforest-g6-l6",
      meetTime: "Tuesday, 3:00 PM - 3:30 PM",
      questions: [
        {
          id: "g6-l6-q1",
          text: "In which layer of the rainforest do the vast majority of animals live, forming a leafy green roof?",
          options: ["Forest Floor", "Understory", "Canopy", "Emergent Layer"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g6-l6-q2",
          text: "What percentage of Earth's land surface is covered by tropical rainforests?",
          options: ["6%", "25%", "50%", "78%"],
          correctAnswer: 0,
          points: 10
        }
      ]
    },
    {
      id: "g6-l7",
      title: "Marine Biomes and Dark Ocean Depths",
      topic: "Kelps to Hydrothermal Vents",
      duration: "35 mins",
      summary: "Explore the ocean layers, from thriving sunlit coral reefs to deep abyssal plains.",
      content: `The ocean covers 71% of our planet. It is separated into distinct light depth zones that dictate how ocean life has adapted:

Sunlight Zone (Epipelagic): The top 200 meters. Phytoplankton grow here, fueling coral reefs, dolphins, and turtles.

Twilight Zone (Mesopelagic): Up to 1000m. Dim light. Weird animals like the lanternfish migrate vertically every night to feed.

Midnight Zone (Bathypelagic): Complete ink-black freezing waters. Organisms make their own light (bioluminescence) to find prey! On the dark oceanic floor, tectonic cracks form Hydrothermal Vents, spitting super-hot minerals where blind tube worms survive without any sunlight!`,
      meetUrl: "https://meet.google.com/marine-g6-l7",
      meetTime: "Wednesday, 3:00 PM - 3:30 PM",
      questions: [
        {
          id: "g6-l7-q1",
          text: "What unique survival strategy do midnight zone deep-sea animals use to glow and hunt?",
          options: ["Absorbing battery signals", "Bioluminescence (chemical light)", "Solar-storing skin cells", "Geothermal infrared lenses"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g6-l7-q2",
          text: "What structures on the ocean floor support life without relying on sunlight?",
          options: ["Plastic shipwrecks", "Hydrothermal mineral vents", "Frozen ice caps", "Coral desert islands"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g6-l8",
      title: "Fossils: Earth's Stone Records",
      topic: "Sedimentation & Stratigraphy",
      duration: "30 mins",
      summary: "How ancient bones and leaf prints transform into solid stone over millions of years.",
      content: `Fossils are preserved remains, impressions, or tracks of ancient organisms that lived millions of years ago.

The Magic of Sedimentary Rock:
When a dinosaur dies near a river, water washes sand and mud (sediment) over its bones. Over millions of years, weight presses these sediments into heavy layers of stone.

Underground water rich in mineral silica slowly seeps into the calcium bones. Over centuries, these minerals replace the original organic bone molecules, molecularly carving a exact stone replica! This is called Petrifaction.

Fossil records help paleontologists build timelines of ancient climates, continental shifts, and extinct dinosaur lineages.`,
      meetUrl: "https://meet.google.com/fossils-g6-l8",
      meetTime: "Thursday, 3:00 PM - 3:30 PM",
      questions: [
        {
          id: "g6-l8-q1",
          text: "What rock type is famous for preserving layers of fossils?",
          options: ["Metamorphic rock", "Igneous lava rock", "Sedimentary mudstone or limestone", "Granite tiles"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g6-l8-q2",
          text: "What is petrifaction?",
          options: ["Bones turning into gold", "Minerals replacing organic bone matter to make a stone copy", "Fossils dissolving in battery acid", "Bones turning into oil instantly"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g6-l9",
      title: "Pollinators and Global Agriculture",
      topic: "Sustaining Plant Reproduction",
      duration: "30 mins",
      summary: "Understand the busy bees, bats, and butterflies that make 1 out of every 3 bites of food possible.",
      content: `Plants cannot walk around to find mates. Flowers rely on busy animal couriers—Pollinators—to transfer yellow pollen grains from male flower organs (anthers) to female organs (stigmas) for reproduction.

Key Pollinators:
- Honeybees: Unrivaled agricultural workers, pollen stick to their fuzzy legs.
- Butterflies: Sip nectar using straw-like mouths, pollinating wildflowers.
- Hummingbirds: Reach deep inside tubular blossoms.
- Fruit Bats: Critically pollinate large cacti and tropical wild crops.

If pollinators disappear due to chemical pesticides, crucial crops like apples, almonds, broccoli, strawberries, and coffee would vanish entirely from grocery store shelves. Protecting bees protects our dinner!`,
      meetUrl: "https://meet.google.com/bees-g6-l9",
      meetTime: "Friday, 3:00 PM - 3:30 PM",
      questions: [
        {
          id: "g6-l9-q1",
          text: "Roughly how much of the food we cultivate relies directly on animal pollinators?",
          options: ["1 out of every 100 bites", "1 out of every 3 bites", "Only weed grass", "None at all"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g6-l9-q2",
          text: "What part of a flower contains the pollen grains that need transport?",
          options: ["The petal leaf", "The root hair", "The male anther", "The green sepals"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g6-l10",
      title: "Renewable Energy Solutions",
      topic: "Wind, Solar, and Hydroelectric power",
      duration: "35 mins",
      summary: "Explore how our cities can generate electrical power cleanly without burning polluting fossil fuels.",
      content: `To protect Earth's climate, we are transitioning away from burning dirty coal and gas. Renewable energy solutions harness natural processes that replenish themselves infinitely and generate near-zero carbon pollution.

1. Solar Power: Photovoltaic panels absorb light energy, instantly shifting electrons in silicon to generate clean current electricity.
2. Wind Power: Massive sky-high turbines trap the air streams running across hills, mechanical rotating spins a copper alternator behind the propeller.
3. Hydroelectric: Fast rushing river flows spinning turbines inside dams, generating vast megawatt power grids.
4. Geothermal: Digging deep wells to capture steam vapor boiling in tectonic earth layers. Saving earth means adopting tech that echoes nature!`,
      meetUrl: "https://meet.google.com/renew-g6-l10",
      meetTime: "Saturday, 12:30 PM - 1:00 PM",
      questions: [
        {
          id: "g6-l10-q1",
          text: "How do photovoltaic solar panels produce green electricity?",
          options: ["They burn coal internally", "They capture solar rays to move electrons in silicon", "They melt lead in sulfuric acid", "They spin heavy physical gears"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g6-l10-q2",
          text: "Which of the following is an example of renewable energy?",
          options: ["Diesel fuel", "Lignite coal", "Geothermal volcanic steam", "Underground crude oil"],
          correctAnswer: 2,
          points: 10
        }
      ]
    }
  ],
  "grade-7": [
    {
      id: "g7-l1",
      title: "Pharaohs and the Pyramids of Giza",
      topic: "Ancient Egyptian Engineering",
      duration: "40 mins",
      summary: "Discover the architectural engineering, written hieroglyphs, and burial kingdoms of the Nile.",
      content: `Across the hot sands of Northeast Africa, the Nile River nurtured one of history's longest-lasting empires: Ancient Egypt.

The Pharaoh: Regarded as both a divine monarch and high priest who governed with total political authority.

The Monumental Feat: The Great Pyramid of Giza was built around 2560 BCE as a tomb for Pharaoh Khufu. It was assembled using 2.3 million interlocking limestone blocks—each weighing an average of 2.5 tons! The builders aligned the four pyramid faces to the compass directions with near-perfect geometric precision.

Egyptians used Hieroglyphics, writing with beautiful pictures engraved on stone walls or written with ink on papyrus scrolls.`,
      meetUrl: "https://meet.google.com/egypt-g7-l1",
      meetTime: "Tuesday, 1:00 PM - 1:30 PM",
      questions: [
        {
          id: "g7-l1-q1",
          text: "For which Egyptian Pharaoh was the massive Great Pyramid of Giza built?",
          options: ["Pharaoh Tutankhamun", "Pharaoh Khufu", "Pharaoh Ramesses II", "Queen Cleopatra"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l1-q2",
          text: "What medium did Egyptians invent to paint hieroglyphs on, made from papyrus river reeds?",
          options: ["Parchment sheets", "Clay tablets", "Papyrus paper scrolls", "Wooden boards"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g7-l2",
      title: "Cradle of Writing: Mesopotamia",
      topic: "Ur & Cuneiform Scripts",
      duration: "35 mins",
      summary: "Explore the Fertile Crescent, Tigris-Euphrates valleys, and Hammurabi's legal codes.",
      content: `The Greek word 'Mesopotamia' translates to 'the land between rivers.' Nestled between the Tigris and Euphrates rivers (modern Iraq), this Fertile Crescent mud flat saw the dawn of human agricultural urbanization.

Cuneiform Writing (3200 BCE): The Sumerians invented cuneiform, using wedge-shaped styluses pressed into wet clay tablets. It was used to record sheep inventories, temple taxes, and royal epic tales.

Hammurabi's Code: The Babylonian King Hammurabi wrote down 282 absolute laws on a massive black stone column. It includes the famous legal principle 'an eye for an eye, a tooth for a tooth,' ensuring standardized legal rulings across his kingdom.`,
      meetUrl: "https://meet.google.com/meso-g7-l2",
      meetTime: "Wednesday, 1:00 PM - 1:30 PM",
      questions: [
        {
          id: "g7-l2-q1",
          text: "What name is given to Sumer's ancient wedge-shaped writing printed on wet clay tablets?",
          options: ["Demotic", "Sanskrit", "Cuneiform", "Phoenician Alphabet"],
          correctAnswer: 2,
          points: 10
        },
        {
          id: "g7-l2-q2",
          text: "Between which two historical major rivers did Mesopotamia blossom?",
          options: ["Nile and Amazon", "Tigris and Euphrates", "Yellow and Ganges", "Danube and Rhine"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g7-l3",
      title: "All Roads Lead to Rome",
      topic: "Aqueducts, Concrete, and Empire",
      duration: "35 mins",
      summary: "How a small mountain republic built a system of roads and channels that ruled the Mediterranean.",
      content: `The Romans were masterful structural builders. At its height, Rome's empire stretched across Britain, parts of Europe, North Africa, and the Middle East, housing 50 million citizens.

Engineering Marvels:
- Volcanic Concrete: Romans developed a water-proof formula containing volcanic ash, allowing massive stone arch domes like the Pantheon to endure for 2,000 years!
- Roman Roads: Built 80,000 kilometers of paved stone military highways, allowing rapid messenger postal delivery and army maneuvers.
- Aqueducts: Sloping stone arches carrying sparkling fresh mountain water to cities using gravity alone. These enabled massive public baths and flowing street fountains!`,
      meetUrl: "https://meet.google.com/rome-g7-l3",
      meetTime: "Thursday, 1:00 PM - 1:30 PM",
      questions: [
        {
          id: "g7-l3-q1",
          text: "What unique material allowed Roman architects to build water-proof arches and durable domes?",
          options: ["Tempered steel bands", "Volcanic concrete", "Sun-dried bricks", "Laminated timber"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l3-q2",
          text: "How did Roman aqueducts transfer mountain water down to bustling dry cities?",
          options: ["Using steam-powered water pumps", "Using a steady downward slope pulled by gravity alone", "Using bucket relays by manual laborers", "In massive copper pressurized containers"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g7-l4",
      title: "Ancient Greek Agora & Philosophers",
      topic: "Socrates, Plato, and Aristotle",
      duration: "30 mins",
      summary: "Walk through the birth of public voting and the questioning minds of Athens.",
      content: `In the sunny city-state of Athens, Greek thinkers launched two ideas that transformed history: Direct Democracy and Western Philosophy.

The Agora was a bustling open marketplace. Here, male citizens gathered to debate politics and cast physical votes using scratch marked clay shards!

The Philosophers:
- Socrates: Walked the agora questioning citizens about justice and virtue (The Socratic Method).
- Plato (his student): Founded the Academy and wrote books on the perfect Republic.
- Aristotle (Plato's student): Studied biology, logic, and physics, later tutoring the legendary Alexander the Great. These thinkers pioneered scientific observation!`,
      meetUrl: "https://meet.google.com/greece-g7-l4",
      meetTime: "Friday, 1:00 PM - 1:30 PM",
      questions: [
        {
          id: "g7-l4-q1",
          text: "Which philosopher was famous for asking deep questions in the Athens Agora, creating the Socratic Method?",
          options: ["Socrates", "Aristotle", "Pythagoras", "Julius Caesar"],
          correctAnswer: 0,
          points: 10
        },
        {
          id: "g7-l4-q2",
          text: "What administrative system did Athens pioneer, allowing citizens to vote on laws in public?",
          options: ["Absolute Monarchy", "Direct Democracy", "Feudal Shogunate", "Military Oligarchy"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g7-l5",
      title: "The Silk Road Trading Networks",
      topic: "Cultural Exchange & Commerce",
      duration: "30 mins",
      summary: "Learn how silk, spices, inventions, and stories traveled 4,000 miles between East and West.",
      content: `The Silk Road was not a single paved road. It was an extensive 6,400-kilometer (4,000-mile) web of desert pathways and maritime sea routes connecting China, India, Persia, and the Roman Empire.

The Goods:
- From China: Precious mulberry silk, tea, paper notebooks, and gunpowder formulas.
- From Rome & West: Glassware, olive oil, silver bullion, and woolen rugs.

Travelers moved in camel Caravans to defend against desert bandits. Along the routes, rest houses called Caravanserais let traders eat, sleep, and share stories. This massive network distributed not just products, but mathematics, medicine, and religions globally!`,
      meetUrl: "https://meet.google.com/silk-g7-l5",
      meetTime: "Monday, 4:00 PM - 4:30 PM",
      questions: [
        {
          id: "g7-l5-q1",
          text: "Which country kept the secret recipe of making soft mulberry silk, trading it across the route?",
          options: ["Great Britain", "Ancient China", "Carthage", "Egypt"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l5-q2",
          text: "What was a caravanserai?",
          options: ["A fast sea vessel", "An oasis inn where caravan traders rested and exchanged stories", "A massive stone wall block", "A type of camel saddle"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g7-l6",
      title: "Mesoamerican Astronomy: The Maya",
      topic: "Astrological calendars & Step Pyramids",
      duration: "35 mins",
      summary: "Uncover the mathematical calendars, rain forests architectures, and glyphs of Central America.",
      content: `Deep within the dense tropical forests of modern Mexico, Guatemala, and Belize, the Maya civilization built towering stone kingdoms without metal tools, horses, or wheels!

Master Astronomers: The Maya built immense stone observatories like El Caracol to align with the movements of Venus and the Sun.

The Calendar: Their astronomers mapped the solar year to 365 days, a calculation incredibly close to modern digital satellites!

They also invented a sophisticated Base-20 number system that included a symbol for 'zero' (an advanced mathematical concept that Western Europe didn't adopt until centuries later!).`,
      meetUrl: "https://meet.google.com/maya-g7-l6",
      meetTime: "Tuesday, 4:00 PM - 4:30 PM",
      questions: [
        {
          id: "g7-l6-q1",
          text: "What advanced mathematical concept did Maya scholars pioneer, using shell drawings?",
          options: ["Fractions", "The concept of Zero", "Calculus formulas", "Geometry angles and pi"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l6-q2",
          text: "The Maya carefully aligned their stone monuments with the orbit of which glowing planet?",
          options: ["Jupiter", "Mars", "Venus", "Neptune"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g7-l7",
      title: "Ships of the North: Viking Navigators",
      topic: "Longships and Sunstones",
      duration: "30 mins",
      summary: "Study Viking longships and navigation tactics in misty northern seas.",
      content: `The Vikings were seafaring warriors and traders from Scandinavia (Norway, Sweden, Denmark). Between 800 and 1100 CE, they sailed across the Atlantic Ocean, exploring Britain, Iceland, Greenland, and even landing in North America (Vinland) 500 years before Columbus!

Longships: Light, wooden, and double-ended vessels with shallow hulls, enabling them to navigate deep oceans and glide up shallow forest rivers.

The Sunstone: To navigate cloudy Atlantic seas, Vikings utilized translucent calcite crystals known as Iceland spar. By holding the crystal to a cloudy sky, they could find the exact position of the Sun even after dusk!`,
      meetUrl: "https://meet.google.com/vikings-g7-l7",
      meetTime: "Wednesday, 4:00 PM - 4:30 PM",
      questions: [
        {
          id: "g7-l7-q1",
          text: "What maritime vessel feature allowed Viking longships to sail up shallow interior rivers?",
          options: ["Heavy iron keels", "Drafting shallow draft hulls", "Giant steam paddle wheels", "Magnetic compass poles"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l7-q2",
          text: "How did Vikings find the position of the sun on thick foggy or cloudy sea voyages?",
          options: ["By listening to seabird song keys", "By looking through a crystallized calcite Sunstone", "Using radio wave locators", "Following floating whale paths"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g7-l8",
      title: "The Great Wall of ancient China",
      topic: "Dynasties and Frontier Defense",
      duration: "35 mins",
      summary: "Learn how the Qin and Han Dynasties built a defensive shield stretching thousands of miles.",
      content: `To protect their farming empires from nomadic northern horse raiders (like the Xiongnu), ancient Chinese emperors undertook one of the largest construction projects in human history.

Qin Shi Huang, the first overall Emperor of unified China, merged and rebuilt regional stone walls into a massive defensive system around 221 BCE.

Han and Ming Dynasties expanded this wall system using brick, rammed soil, and mortar made sticky with sweet glutinous rice soup! Guard towers were built every 150 meters, allowing defenders to send puff smoke signals during the day and fiery torches at night to alert royal capitals of approaching armies.`,
      meetUrl: "https://meet.google.com/wall-g7-l8",
      meetTime: "Thursday, 4:00 PM - 4:30 PM",
      questions: [
        {
          id: "g7-l8-q1",
          text: "Which Emperor first connected regional walls into a single fortified system around 221 BCE?",
          options: ["Emperor Wu of Han", "Emperor Qin Shi Huang", "Sun Tzu", "Kublai Khan"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l8-q2",
          text: "What structural warning tactic did Great Wall guards use to communicate invasions rapidly across miles?",
          options: ["Paper letters written in ink", "Sounding high-pitched horn whistles", "Puff smoke flags during day and torches at night", "Setting off atomic firecrackers"],
          correctAnswer: 2,
          points: 10
        }
      ]
    },
    {
      id: "g7-l9",
      title: "Indus Valley: Built on Grids",
      topic: "Harappa, Mohenjo-Daro, and Sanitation",
      duration: "30 mins",
      summary: "Discover the highly organized cities of India that possessed advanced indoor plumbings.",
      content: `While Egypt built royal pyramids, the ancient Indus Valley Civilization (modern Pakistan and India, 2600 BCE) invested in urban infrastructure, grid-based planning, and clean sanitation!

Mohenjo-Daro & Harappa:
- Grid layout: Streets were laid out in clean North-South and East-West grid blocks, like modern Manhattan!
- Standardized Weights: They used precisely carved weight cubes to balance scales for honest trading.
- Public Bath: 'The Great Bath' of Mohenjo-Daro was a public swimming pool sealed watertight with natural tar.
- Indoor Plumbing: Homes had brick-lined toilets connected to a system of covered street sewers—thousands of years before Europe!`,
      meetUrl: "https://meet.google.com/indus-g7-l9",
      meetTime: "Friday, 4:00 PM - 4:30 PM",
      questions: [
        {
          id: "g7-l9-q1",
          text: "What major urban feature distinguished Harappa and Mohenjo-Daro from other ancient empires?",
          options: ["Massive gold towers", "Grid-based streets and advanced indoor sanitation plumbing", "Floating botanical islands", "Volcanic iron mines"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l9-q2",
          text: "How did Indus traders ensure honest measurements in open markets?",
          options: ["They let priests guess weight levels", "By utilizing standardized precisely-carved cubic weight stones", "They didn't trade goods", "By measuring with finger counts"],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: "g7-l10",
      title: "The Mystery of Stonehenge",
      topic: "Neolithic Stone Circles",
      duration: "35 mins",
      summary: "Ponder the construction, astronomy alignment, and neolithic cultures of ancient Britain.",
      content: `On Salisbury Plain in England stands Stonehenge, a massive prehistoric stone circle built over a span of 1,500 years, beginning around 3000 BCE.

Engineering Feat:
The monument is composed of large sarsen sandstone blocks (weighing 25 tons) and smaller bluestones. Archeologists discovered that some of the bluestones were dragged from mountains in Wales—over 140 miles away! The builders had no metal saws, transport tracks, or animal cranes.

Aligning the Sky:
At the Summer Solstice, the rising solar sun aligns perfectly with the entrance Heel Stone, shining rays directly into the center circle. This suggests the site functioned as a cosmic calendar, tracking seasons for crop planting and celestial festivals.`,
      meetUrl: "https://meet.google.com/stone-g7-l10",
      meetTime: "Saturday, 1:30 PM - 2:00 PM",
      questions: [
        {
          id: "g7-l10-q1",
          text: "What solar event aligns perfectly with the entrance stone at Stonehenge every year?",
          options: ["The lunar eclipse", "The Summer Solstice sunrise", "The Winter Equinox breeze", "A periodic comet passing"],
          correctAnswer: 1,
          points: 10
        },
        {
          id: "g7-l10-q2",
          text: "From how far away did neolithic builders drag some of the heavy blue stones?",
          options: ["From just 5 feet away", "Over 140 miles away from Wales mountains", "From a shipyard across the channel", "They were dropped by volcanoes in place"],
          correctAnswer: 1,
          points: 10
        }
      ]
    }
  ]
};

export const MOCK_MEET_EVENTS: ActiveMeetEvent[] = [
  {
    title: "Cosmic Science - Solar System Intro",
    lessonId: "g5-l1",
    time: "Tuesday at 10:00 AM",
    duration: "30 mins",
    gradeId: "grade-5"
  },
  {
    title: "Earth Ecology - Biodiversity & Food Webs",
    lessonId: "g6-l3",
    time: "Thursday at 11:00 AM",
    duration: "35 mins",
    gradeId: "grade-6"
  },
  {
    title: "Ancient Egypt - Pyramid Engineering",
    lessonId: "g7-l1",
    time: "Tuesday at 1:00 PM",
    duration: "40 mins",
    gradeId: "grade-7"
  }
];
