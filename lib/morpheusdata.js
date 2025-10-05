const morpheusData = [
  {
    "target": "mars",
    "environment": {
      "gravity": "0.38g, resulting in partial mechanical unloading with intermediate effects on musculoskeletal and cardiovascular systems compared to microgravity, reducing osteogenic stimulation and muscle protein synthesis compared to Earth gravity but providing more loading stimulus than microgravity",
      "radiation": "0.5-1.9 mSv/day from galactic cosmic rays and solar particle events, with HZE particles causing significant biological damage despite low flux, leading to cumulative DNA damage and increased cancer risk over long-duration missions",
      "atmosphere": "95% CO\u2082, 0.13-0.16% O\u2082, 2.7% N\u2082, 1.6% Ar at <1 kPa pressure, requiring pressurized habitats with artificial atmosphere maintenance for biological survival",
      "surface_conditions": "-153\u00b0C to +20\u00b0C temperature range, pervasive fine regolith dust (JSC-1A simulant) with electrostatic properties, low light levels, rocky terrain requiring specialized EVA suits, and 24.6-hour sol length with seasonal variations",
      "habitat_challenges": "Radiation shielding requirements, dust mitigation against abrasion, closed-loop life support systems, psychological isolation during 20-minute communication delays, limited medical intervention capabilities, and life support system reliability for multi-year missions"
    },
    "human_risks": [
      {
        "category": "Bone Loss",
        "risk_level": "high",
        "mechanism": "Partial gravity (0.38g) reduces mechanical loading on osteocytes, altering mechanotransduction pathways and promoting bone resorption through sclerostin upregulation and altered RANKL/OPG signaling. Osteoblast activity decreases while osteoclast-mediated resorption increases, leading to net bone demineralization",
        "observed_effects": "Microgravity induces 1-2% bone mineral density loss per month in weight-bearing bones. Martian gravity may show intermediate degradation with altered vertebral microarchitecture and reduced trabecular connectivity based on murine models showing 30-40% reduction in trabecular bone volume after 30 days microgravity exposure",
        "countermeasures": [
          "Resistive exercise protocols",
          "Bisphosphonate medications",
          "Dietary calcium and vitamin D supplementation",
          "Pharmacological interventions targeting osteocyte signaling pathways"
        ]
      },
      {
        "category": "Muscle Atrophy",
        "risk_level": "high",
        "mechanism": "Reduced mechanical loading in partial gravity downregulates contractile proteins and promotes mitochondrial dysfunction through ubiquitin-proteasome pathway activation. Myostatin/activin signaling pathways are activated, leading to increased MuRF1 and atrogin-1 expression and protein degradation",
        "observed_effects": "Decreased muscle fiber cross-sectional area and mass, particularly in weight-bearing muscles. Murine studies demonstrate 15-25% reduction in quadriceps muscle mass after 30 days spaceflight. Human bedrest analogs show 20-30% decrease in muscle fiber cross-sectional area. Transcriptomic profiles show dysregulation of YAP1 and HIF-1\u03b1 pathways in skeletal muscle tissue",
        "countermeasures": [
          "Flywheel and resistance exercise equipment",
          "Essential amino acid supplementation",
          "SRT2104 compound to mitigate oxidative damage"
        ]
      },
      {
        "category": "Radiation Effects",
        "risk_level": "high",
        "mechanism": "Galactic cosmic rays containing high-LET HZE particles cause complex DNA double-strand breaks through direct ionization and indirect oxidative stress that overwhelm cellular repair mechanisms. Combined with partial gravity, radiation impairs cellular repair mechanisms, increases mutation rates, and induces synergistic oxidative stress through ROS generation",
        "observed_effects": "Increased chromosomal aberration frequency, DNA damage markers (\u03b3-H2AX foci), elevated cancer risk projections (3-5% increased cancer mortality risk per year of Mars mission), and persistent genomic instability observed in radiation biology studies",
        "countermeasures": [
          "Hydrogen-rich shielding materials",
          "Radioprotective compounds (Rutin, Quercetin)",
          "Vehicle and habitat shielding optimization",
          "Vehicle storm shelters for solar particle events",
          "DNA repair pathway modulation"
        ]
      },
      {
        "category": "Cardiovascular Adaptation",
        "risk_level": "medium",
        "mechanism": "Partial gravity induces fluid shifts and reduces venous return through chronic unloading, leading to cardiac atrophy through reduced ventricular wall stress. NADPH oxidase and p47phox pathways contribute to cardiac dysfunction, altered hemodynamics, and baroreceptor resetting",
        "observed_effects": "Cardiac output reduction, altered cerebral blood flow patterns, increased arrhythmia susceptibility observed in head-down tilt bedrest studies. Murine tail-suspension models show 10-15% reduction in cardiac mass. Human studies demonstrate T-wave alternans and reduced exercise capacity in microgravity",
        "countermeasures": [
          "Lower body negative pressure devices",
          "Sub-maximal exercise regimens",
          "Hemodynamic monitoring systems"
        ]
      },
      {
        "category": "Immune Dysregulation",
        "risk_level": "medium",
        "mechanism": "Space stressors synergistically impair T-cell function through altered protein kinase C signaling and reduced PHA response. Cortisol elevation modulates immune responses, reduces lymphocyte proliferation capacity, and induces thymic involution. Microgravity modulates cytokine production, particularly reducing IL-2 and IFN-\u03b3 while increasing anti-inflammatory cytokines",
        "observed_effects": "Reduced PHA response in T-cells, altered neutrophil-to-lymphocyte ratio, and cytokine profile shifts observed in long-duration spaceflight analogs. Astronaut data shows 50% reduction in T-cell proliferation capacity. Rodent hypergravity studies demonstrate persistent changes in stress defense mechanisms",
        "countermeasures": [
          "Immune monitoring protocols",
          "Probiotic supplementation",
          "Stress reduction interventions",
          "Phorbol ester restoration of PKC signaling"
        ]
      },
      {
        "category": "Neurovestibular Alterations",
        "risk_level": "medium",
        "mechanism": "Partial gravity disrupts vestibular otolith function and sensorimotor integration through altered intracranial pressure, reduced cerebral blood flow regulation, and adaptive neuroplasticity in brain regions processing spatial orientation. Microglial activation may contribute to cognitive dysfunction",
        "observed_effects": "Altered EEG alpha power and functional connectivity, impaired postural control, persistent size-mass illusions in variable gravity environments. MRI studies show brain volume changes and altered functional connectivity after long-duration spaceflight. Dry immersion models demonstrate impaired sensorimotor function",
        "countermeasures": [
          "Sensorimotor training protocols",
          "Artificial gravity centrifugation",
          "Cognitive performance monitoring",
          "EEG monitoring of neuroplastic changes"
        ]
      },
      {
        "category": "Ocular Changes",
        "risk_level": "medium",
        "mechanism": "Fluid shifts in partial gravity contribute to Spaceflight-Associated Neuro-ocular Syndrome (SANS) through altered intracranial pressure and vascular remodeling in retinal tissues. Cephalad fluid shifts increase intracranial pressure, potentially compromising blood-brain barrier and affecting retinal vascular patterning",
        "observed_effects": "Decreased vascular patterning in astronaut retinas, altered optic nerve structure, and visual impairment documented in long-duration ISS crew members. Approximately 30% of long-duration crew members experience visual impairment with retinal vascular changes and choroidal folding",
        "countermeasures": [
          "Artificial gravity interventions",
          "Ocular pressure monitoring",
          "Pharmacological countermeasures",
          "CO\u2082 scrubbing to prevent elevated concentrations",
          "Optical coherence tomography monitoring",
          "Pressure-regulation garments"
        ]
      },
      {
        "category": "Gut Microbiome Alterations",
        "risk_level": "medium",
        "mechanism": "Spaceflight conditions shift microbial communities through altered environmental conditions, dietary changes, and enhanced biofilm formation. Combined radiation exposure further perturbs microbiome composition and function. Microgravity increases bacterial motility, chemotaxis, and horizontal gene transfer of antimicrobial resistance genes",
        "observed_effects": "Murine studies show significant changes in gut metabolome, reduced microbial diversity, and shifts in microbial communities during simulated Mars mission conditions. ISS microbiome isolates demonstrate genomic adaptations to space conditions",
        "countermeasures": [
          "Prebiotic and probiotic regimens",
          "Dietary diversity maintenance",
          "Microbiome monitoring protocols",
          "Antimicrobial surface coatings"
        ]
      },
      {
        "category": "Sleep and Circadian Disruption",
        "risk_level": "medium",
        "mechanism": "Altered light-dark cycles and absence of natural Zeitgebers disrupt circadian regulation of cortisol and melatonin rhythms. Microgravity affects core clock gene expression in skeletal muscle and neural tissues",
        "observed_effects": "Astronaut sleep logs show reduced sleep quality and duration. EEG studies demonstrate changes in alpha power and sleep architecture",
        "countermeasures": [
          "LED lighting systems simulating diurnal cycles",
          "Sleep hygiene protocols",
          "Melatonin supplementation"
        ]
      },
      {
        "category": "Psychological Stress",
        "risk_level": "medium",
        "mechanism": "Confinement, isolation, and communication delays activate hypothalamic-pituitary-adrenal axis, leading to elevated cortisol levels that modulate immune responses and cognitive function",
        "observed_effects": "Antarctic analog studies show increased stress biomarkers and altered gastrointestinal microbiota diversity. Isolation affects T-cell proliferation and cytokine production",
        "countermeasures": [
          "Virtual reality environments",
          "Regular communication protocols",
          "Psychological support systems"
        ]
      },
      {
        "category": "Endocrine Disruption",
        "risk_level": "low",
        "mechanism": "Partial gravity and radiation exposure alter hormonal regulation, particularly affecting thyroid and testis function through stress response pathways",
        "observed_effects": "Hormonal panel data shows disruption in endocrine function during long-duration spaceflight, though Martian gravity may show intermediate effects",
        "countermeasures": [
          "Endocrine monitoring",
          "Hormone replacement therapy when indicated",
          "Stress management protocols"
        ]
      }
    ],
    "plant_and_microbe_factors": [
      {
        "category": "Plant Growth",
        "impact": "Partial gravity alters gravitropism, phototropism responses, and plant architecture while radiation induces mutations and modifies biochemical pathways. Martian regolith (JSC-1A simulant) requires nutrient amendments and organic fertilization for sustainable growth and nutrient bioavailability",
        "solutions": [
          "Pectin methylesterase gene modulation for cell wall adaptation",
          "Cyanobacteria-based biofertilization systems",
          "Horse/swine manure fertilization of regolith simulants",
          "Intracanopy lighting systems to reduce energy consumption",
          "LED lighting optimization for photosynthesis"
        ]
      },
      {
        "category": "Microbial Behavior",
        "impact": "Microgravity analogs show increased bacterial motility, chemotaxis, enhanced horizontal gene transfer of antimicrobial resistance genes, and enhanced biofilm formation. Fungal isolates from ISS demonstrate adapted growth characteristics. Combined magnetic forces may synergize with microgravity to alter microbial physiology and increase virulence factor expression",
        "solutions": [
          "Advanced sterilization protocols",
          "Microbial monitoring systems",
          "Surface material engineering to reduce biofilm formation",
          "Antimicrobial resistance monitoring",
          "Engineering microbial communities for life support"
        ]
      }
    ],
    "research_opportunities": [
      "How does Martian gravity (0.38g) specifically affect osteoblast function compared to microgravity and lunar gravity?",
      "What are the optimal planting densities and lighting configurations for food crops in Martian gravity conditions and closed systems?",
      "How do HZE particles from cosmic radiation affect chromosomal integrity in human stem cells under partial gravity?",
      "What are the combined effects of radiation and Martian gravity on T-cell function and immune response?",
      "Can cyanobacteria-based systems effectively fertilize Martian regolith for sustainable crop production?",
      "How do hematopoietic stem cells versus mature cells respond to combined radiation and partial gravity?",
      "What microbial life forms could potentially survive in Martian subsurface environments and contaminate habitats?",
      "How does partial gravity affect cardiovascular responses to exercise compared to Earth and lunar gravity?"
    ]
  },
  {
    "target": "moon",
    "environment": {
      "gravity": "0.16g, producing significant mechanical unloading that reduces osteogenic stimulation to approximately 16% of Earth values, with effects intermediate between microgravity and Martian gravity",
      "radiation": "0.3-1.2 mSv/day with reduced atmospheric protection but closer to Earth's magnetosphere, featuring solar particle events and galactic cosmic rays",
      "atmosphere": "Effectively vacuum with trace gases (He, Ar, Ne, H\u2082) at <10\u207b\u00b9\u2070 kPa, requiring fully sealed habitats with 100% artificial atmosphere maintenance",
      "surface_conditions": "-173\u00b0C to +127\u00b0C temperature range, abrasive regolith dust with sharp particles, 14 Earth-day light/dark cycles, extreme UV radiation during daylight periods",
      "habitat_challenges": "Extreme thermal cycling, abrasive dust mitigation, radiation protection using regolith shielding, prolonged night power management, EVA system durability, and psychological adaptation to Earth-visible but inaccessible environment"
    },
    "human_risks": [
      {
        "category": "Bone Loss",
        "risk_level": "high",
        "mechanism": "Severe mechanical unloading at 0.16g dramatically reduces osteoblast activity while increasing osteoclast-mediated resorption through altered osteocyte mechanotransduction. Sclerostin upregulation and impaired GATA1 signaling pathways promote bone demineralization",
        "observed_effects": "Rodent studies show 40-50% reduction in trabecular bone volume after 30 days microgravity exposure. Embryonic chick bone cell cultures exhibit reduced calcification and altered gene expression. Studies indicate 1-2% monthly bone mineral density loss in microgravity, with lunar gravity expected to show similar degradation patterns",
        "countermeasures": [
          "High-intensity resistive exercise with flywheel devices",
          "Bisphosphonate therapies",
          "Scaffold-based tissue engineering approaches",
          "Dietary interventions with calcium and vitamin D"
        ]
      },
      {
        "category": "Muscle Atrophy",
        "risk_level": "high",
        "mechanism": "Minimal loading at 0.16g causes rapid disuse atrophy through p38 MAPK and calpain activation pathways. Microgravity induces mitochondrial dysfunction, increased ROS production, upregulation of myostatin/activin signaling, and increased MuRF1 expression driving protein degradation",
        "observed_effects": "Murine studies demonstrate 25-35% reduction in quadriceps mass after 30 days spaceflight. Human dry immersion models show 20-30% decrease in muscle strength within 3 days. Reduced muscle mass and fiber cross-sectional area, particularly in gastrocnemius and quadriceps muscles",
        "countermeasures": [
          "Resistance training protocols with flywheel devices",
          "Essential amino acid supplementation",
          "Vitamin E antioxidant protocols",
          "Oxidative stress mitigation compounds"
        ]
      },
      {
        "category": "Cardiovascular Adaptation",
        "risk_level": "medium",
        "mechanism": "Significant unloading at 0.16g leads to cardiac atrophy through reduced ventricular wall stress, affecting contractility and electrophysiological properties. Fluid shifts cause reduced venous return and orthostatic intolerance through baroreceptor resetting, affecting cerebral blood flow regulation",
        "observed_effects": "Murine tail-suspension models show 12-18% reduction in cardiac mass. Human studies demonstrate T-wave alternans and reduced orthostatic tolerance. Cardiac atrophy and altered ECG parameters observed with potential anti-arrhythmic benefits from reduced cardiac workload",
        "countermeasures": [
          "Lower body negative pressure training",
          "Cardiovascular exercise regimens",
          "Cardiac output monitoring",
          "Hemodynamic monitoring systems"
        ]
      },
      {
        "category": "Radiation Effects",
        "risk_level": "high",
        "mechanism": "Lunar surface exposure to galactic cosmic rays and solar particle events causes complex DNA damage through direct ionization and oxidative stress. Heavy ion radiation induces chromosomal aberrations and overwhelms cellular repair mechanisms, with potential synergistic effects with partial gravity",
        "observed_effects": "Human fibroblast studies show increased \u03b3-H2AX foci formation indicating DNA damage. Arabidopsis seed experiments demonstrate chromosomal aberration frequency increases. Increased DNA strand breaks and chromosomal aberrations, with neutron contributions adding to total radiation dose complexity",
        "countermeasures": [
          "Regolith-based habitat shielding",
          "Radioprotective pharmaceuticals including rutin compounds",
          "Solar storm shelter systems during events",
          "Radiation monitoring protocols"
        ]
      },
      {
        "category": "Neurovestibular Alterations",
        "risk_level": "high",
        "mechanism": "Reduced gravity input disrupts vestibular function and sensory integration, leading to adaptive neuroplasticity in brain regions processing spatial orientation. Lunar gravity disrupts sensorimotor integration, leading to impaired locomotion and postural control. Altered intracranial pressure affects brain fluid distribution",
        "observed_effects": "MRI studies show brain volume changes and functional connectivity alterations after spaceflight. 70-day bed rest affects sensorimotor function and head posture dynamics during gait. EEG changes showing altered alpha power, impaired gait dynamics, and adaptive neural reorganization",
        "countermeasures": [
          "Artificial gravity centrifugation",
          "Sensorimotor adaptation training",
          "Vestibular rehabilitation protocols",
          "fMRI monitoring of neural changes"
        ]
      },
      {
        "category": "Immune Dysregulation",
        "risk_level": "medium",
        "mechanism": "Space stressors including partial gravity and radiation impair T-cell function through altered protein kinase C signaling and suppressed PHA response. Microgravity induces thymic cellularity changes and alters cytokine production, particularly reducing IL-2 and IFN-\u03b3 while increasing anti-inflammatory cytokines",
        "observed_effects": "Astronaut data shows 50-60% reduction in lymphocyte proliferation capacity. Rodent studies demonstrate persistent changes in neutrophil-to-lymphocyte ratio. Reduced lymphocyte proliferation, altered neutrophil-to-lymphocyte ratios, and compromised stress defense mechanisms",
        "countermeasures": [
          "Immune function monitoring systems",
          "Phorbol ester restoration of PKC signaling",
          "Probiotic supplementation",
          "Stress management interventions"
        ]
      },
      {
        "category": "Ocular Changes",
        "risk_level": "medium",
        "mechanism": "Cephalad fluid shifts increase intracranial pressure, potentially compromising blood-brain barrier and affecting retinal vascular patterning. Fluid shifts contribute to Spaceflight-Associated Neuro-ocular Syndrome through altered intracranial pressure and retinal vascular changes",
        "observed_effects": "Astronaut data shows retinal vascular changes and choroidal folding. Approximately 25% of crew members experience visual impairment during long-duration missions. Decreased vascular patterning in astronaut retinas and structural changes in optic nerve tissue",
        "countermeasures": [
          "Artificial gravity countermeasures",
          "Ocular pressure management",
          "Regular ophthalmological monitoring with optical coherence tomography",
          "CO\u2082 concentration control",
          "Pressure-regulation garments"
        ]
      },
      {
        "category": "EVA-Related Risks",
        "risk_level": "high",
        "mechanism": "Lunar dust exposure during EVAs causes mechanical abrasion and potential chemical reactivity. Reduced pressure suit environments affect mobility and metabolic cost",
        "observed_effects": "Dust contamination issues observed in Apollo missions, with suit pressure limitations affecting crew performance and safety",
        "countermeasures": [
          "Advanced dust mitigation systems",
          "Low-pressure suit design optimization",
          "EVA duration and frequency management"
        ]
      },
      {
        "category": "Microbial Adaptation",
        "risk_level": "medium",
        "mechanism": "Lunar habitat conditions may promote microbial adaptation through horizontal gene transfer and altered virulence expression. Microgravity increases bacterial motility and chemotaxis while enhancing biofilm formation. Enclosed environments facilitate microbial community shifts",
        "observed_effects": "Increased antibiotic resistance gene transfer observed in simulated microgravity. ISS isolates show adapted growth characteristics. Murine studies show shifts in microbial communities and metabolomic profiles",
        "countermeasures": [
          "Advanced sterilization protocols",
          "Microbial monitoring systems",
          "Antimicrobial surface technologies",
          "Probiotic supplementation regimens"
        ]
      },
      {
        "category": "Sleep and Circadian Disruption",
        "risk_level": "high",
        "mechanism": "28-day light-dark cycles disrupt circadian regulation of cortisol and melatonin rhythms. Microgravity affects core clock gene expression in multiple tissues and alters sleep architecture. 14-day light/dark cycles and artificial lighting conditions disrupt circadian rhythms",
        "observed_effects": "Astronaut sleep logs show significant sleep quality reduction during lunar daylight periods. EEG studies demonstrate changes in alpha power and sleep efficiency. Sleep cycle disturbances and altered cortisol rhythms observed",
        "countermeasures": [
          "Circadian lighting systems with blackout capabilities",
          "Sleep hygiene protocols",
          "Melatonin supplementation when indicated",
          "Sleep quality monitoring"
        ]
      },
      {
        "category": "Psychological Stress",
        "risk_level": "medium",
        "mechanism": "Confinement, isolation, and Earth-proximity psychological factors activate HPA axis, leading to elevated cortisol levels that modulate immune responses and cognitive function",
        "observed_effects": "Antarctic analog studies show increased stress biomarkers and altered gastrointestinal function. Isolation affects T-cell proliferation and cytokine production patterns",
        "countermeasures": [
          "Virtual reality Earth environments",
          "Regular communication schedules",
          "Psychological support systems"
        ]
      }
    ],
    "plant_and_microbe_factors": [
      {
        "category": "Plant Growth",
        "impact": "Lunar gravity significantly alters gravitropism and plant architecture development. Radiation exposure induces mutations while regolith simulants require extensive organic amendments for nutrient bioavailability. 14-day night periods challenge photosynthetic systems",
        "solutions": [
          "Pectin methylesterase gene engineering for cell wall adaptation",
          "Hydroponic and aeroponic systems with nutrient delivery",
          "Radiation-shielded growth chambers",
          "Organic waste fertilization of regolith",
          "Intracanopy LED lighting systems"
        ]
      },
      {
        "category": "Microbial Behavior",
        "impact": "Microgravity analogs show enhanced bacterial motility, increased horizontal gene transfer rates, and enhanced biofilm formation. Lunar conditions may alter microbial secondary metabolism, antibiotic resistance gene transfer mechanisms, and potential pathogenicity changes. Fungal isolates demonstrate adapted growth characteristics",
        "solutions": [
          "Advanced environmental monitoring",
          "Surface material engineering to reduce biofilm formation",
          "Regular microbial community assessment",
          "Antimicrobial resistance monitoring",
          "Surface sterilization protocols",
          "Engineering microbial systems for waste processing"
        ]
      }
    ],
    "research_opportunities": [
      "How does lunar gravity (0.16g) affect osteoblast gene expression and bone mineralization compared to microgravity and Martian gravity?",
      "What are the optimal EVA protocols for lunar surface operations considering dust and radiation constraints?",
      "How do plant gravitropic responses differ in lunar gravity compared to Earth and Martian gravity?",
      "What microbial contamination risks are posed by lunar regolith and how can they be mitigated?",
      "Can lunar regolith provide effective radiation shielding for biological systems?",
      "What are the optimal crop varieties for 14-day light/14-day dark cycles in lunar agriculture?",
      "How do combined radiation and partial gravity affect DNA repair efficiency in plant systems?",
      "What are the effectiveness limits of lunar regolith as radiation shielding for habitats?",
      "How does 0.16g affect gastrocnemius muscle contractility during running and locomotion?"
    ]
  }
]

export default morpheusData