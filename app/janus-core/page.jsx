"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavBar } from "@/components/ui/navbar";

function Dropdown({
  label,
  value = "",
  onChange,
  options,
  compact = false,
  multiple = false,
}) {
  const [open, setOpen] = useState(false);
  const spanRef = useRef(null);
  const gsapRef = useRef(null);
  const [display, setDisplay] = useState(value ? `[${value}]` : "[########]");
  const [selectedItems, setSelectedItems] = useState(
    value ? value.split(",").map((item) => item.trim()) : []
  );

  useEffect(() => {
    if (multiple) {
      if (value) {
        const items = value.split(",").map((item) => item.trim());
        setSelectedItems(items);
        const newDisplay =
          items.length > 0 ? `[${items.join(", ")}]` : "[########]";
        animateTo(newDisplay);
      } else {
        setSelectedItems([]);
        animateTo("[########]");
      }
    } else {
      const newDisplay = value ? `[${value}]` : "[########]";
      animateTo(newDisplay);
    }
  }, [value, label, multiple]);

  const handleSelect = (option) => {
    if (multiple) {
      const newSelected = selectedItems.includes(option)
        ? selectedItems.filter((item) => item !== option)
        : [...selectedItems, option];

      onChange(newSelected.join(", "));
    } else {
      onChange(option);
      setOpen(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const gsapModule = await import("gsap");
        const pluginModule = await import("gsap/ScrambleTextPlugin");
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
        const ScrambleTextPlugin =
          pluginModule.ScrambleTextPlugin || pluginModule.default;
        if (gsap && ScrambleTextPlugin) {
          gsap.registerPlugin(ScrambleTextPlugin);
          if (mounted) gsapRef.current = gsap;
        }
      } catch (e) {
        // gsap not installed yet; quietly ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const animateTo = (nextText) => {
    const gsap = gsapRef.current;
    const el = spanRef.current;
    if (gsap && el) {
      gsap.to(el, {
        duration: 0.6,
        ease: "power1.out",
        scrambleText: {
          text: nextText,
          chars: "░_ø¤",
          revealDelay: 0.3,
          tweenLength: true,
        },
        onComplete: () => setDisplay(nextText),
      });
    } else {
      setDisplay(nextText);
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center ${
          compact ? "gap-1" : "gap-1.5 sm:gap-2"
        }`}
      >
        <span
          className={`${
            compact
              ? "text-[9px] sm:text-[10px]"
              : "text-[10px] sm:text-xs md:text-sm"
          } font-bold text-white/85 whitespace-nowrap`}
        >
          {label}:
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`group inline-flex items-center ${
            compact
              ? "gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px]"
              : "gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm"
          } rounded-md ${
            compact
              ? "border-transparent bg-transparent"
              : "border border-white/30 bg-white/5 hover:border-white/50"
          } text-white transition-colors`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span
            ref={spanRef}
            className={`tracking-wide sm:tracking-widest ${
              value ? "text-[#00C8FF] font-bold" : "text-[#00C8FF] font-bold"
            }`}
          >
            {display}
          </span>
          <svg
            className={`${
              compact ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-3 w-3 sm:h-4 sm:w-4"
            } text-[#00C8FF]`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
          </svg>
        </button>
      </div>
      {open && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-10 mt-1 w-full min-w-[200px] rounded-md bg-[#0a0a0f] shadow-lg ring-1 ring-white/10 overflow-hidden"
        >
          <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00C8FF]/80 scrollbar-track-transparent hover:scrollbar-thumb-[#00C8FF]/50 scrollbar-thumb-rounded-full">
            {options.map((opt) => {
              const isSelected = multiple
                ? selectedItems.includes(opt)
                : value === opt;
              return (
                <div
                  key={opt}
                  className="w-full"
                  onClick={() => handleSelect(opt)}
                >
                  <div className="flex items-center w-full font-technor font-bold text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs hover:bg-white/10 transition-colors cursor-pointer">
                    {multiple && (
                      <div className="mr-2 flex items-center justify-center w-4 h-4 border border-white/30 rounded-sm">
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-[#00C8FF]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                    <span
                      className={
                        isSelected ? "text-[#00C8FF]" : "text-white/90"
                      }
                    >
                      {opt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const Page = () => {
  const [query, setQuery] = useState("");
  const [searchOperator, setSearchOperator] = useState("AND");
  const [organism, setOrganism] = useState("");
  const [projectType, setProjectType] = useState("");
  const [minimized, setMinimized] = useState(false);

  // Available options for filters
  const organismOptions = [
    "Algae",
    "Bacteria",
    "Cellular Organisms",
    "Fish",
    "Fruit Fly",
    "Fungus",
    "Human (Homo sapiens)",
    "Literature",
    "Microbiota",
    "Plant",
    "Rodent",
    "Snail",
    "Squid",
    "Squirrel",
    "Worm",
  ];

  // Handle multiple selections for organism
  const handleOrganismChange = (selected) => {
    const currentOrganisms = organism
      ? organism.split(",").map((o) => o.trim())
      : [];

    if (currentOrganisms.includes(selected)) {
      // Remove if already selected
      setOrganism(currentOrganisms.filter((o) => o !== selected).join(", "));
    } else {
      // Add to selection
      setOrganism([...currentOrganisms, selected].join(", "));
    }
  };
  const [showCursor, setShowCursor] = useState(false);
  const [showHolo, setShowHolo] = useState(false);
  const [typeKey, setTypeKey] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const [typingTitle, setTypingTitle] = useState(false);
  const [typingDesc, setTypingDesc] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [booted, setBooted] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllSearchResults, setShowAllSearchResults] = useState(false);
  const lastSearchRef = useRef({ query: "", organism: "", projectType: "" });

  // Calculate visible search results after state is defined - show only 3 articles at a time
  const visibleSearchResults = searchResults?.articles?.important
    ? showAllSearchResults
      ? searchResults.articles.important
      : searchResults.articles.important.slice(0, 3)
    : [];

  // Datos de ejemplo para los artículos con enlaces de ejemplo
  const carouselItems = [
    {
      id: 1,
      title: "Genomic Analysis",
      description:
        "Recent advances in genomic sequencing and analysis techniques",
    },
    {
      id: 2,
      title: "Proteomics",
      description:
        "Exploring the complex world of proteins and their functions",
    },
    {
      id: 3,
      title: "Metabolomics",
      description: "Studying chemical processes involving metabolites",
    },
    {
      id: 4,
      title: "Imaging",
      description: "Advanced imaging techniques in biological research",
    },
    {
      id: 5,
      title: "Neuroscience",
      description: "Understanding the brain and nervous system",
    },
  ];

  const handleCarouselNavigation = (direction) => {
    setCurrentCarouselIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % carouselItems.length;
      } else {
        return (prev - 1 + carouselItems.length) % carouselItems.length;
      }
    });
  };

  const pageGsapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const mod = await import("gsap");
        pageGsapRef.current = mod.gsap || mod.default || mod;
      } catch {}
    })();
  }, []);

  const isChanged = useMemo(() => {
    const current = { query, organism, projectType };
    return JSON.stringify(current) !== JSON.stringify(lastSearchRef.current);
  }, [query, organism, projectType]);

  const isDisabled = !isChanged;

  const expandedRef = useRef(null);
  const minimizedRef = useRef(null);
  const holoBackdropRef = useRef(null);
  const holoBackdropSweepRef = useRef(null);
  const holoBackdropTlRef = useRef(null);
  const holoStaticRef = useRef(null);
  const holoStaticTlRef = useRef(null);
  const holoRef = useRef(null);

  const buildApiUrl = () => {
    const baseUrl = "https://s9qw26hg-8000.use2.devtunnels.ms/studies";
    const params = new URLSearchParams();

    // Add organism filter if selected
    if (organism) {
      organism.split(",").forEach((org) => {
        if (org.trim()) params.append("organism", org.trim());
      });
    }

    // Add project type filter if selected
    if (projectType) {
      projectType.split(",").forEach((type) => {
        if (type.trim()) params.append("project_type", type.trim());
      });
    }

    // Add keywords if provided
    if (query) {
      params.append("keywords", query);
    }

    // Add search operator (AND/OR)
    params.append("q_mode", searchOperator.toLowerCase());

    // Add pagination and other required parameters
    params.append("page", "1");
    params.append("page_size", "20");
    params.append("mode", "heuristico");
    params.append("emerging_topics_n", "5");
    params.append("compact", "false");

    return `${baseUrl}?${params.toString()}`;
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setResultsReady(false);

    try {
      const url = buildApiUrl();
      console.log("Making API request to:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      // Update the last search ref with current search parameters
      lastSearchRef.current = { query, organism, projectType };

      setSearchResults(data);
      setResultsReady(true);

      // If minimized, expand to show results
      if (minimized) {
        setMinimized(false);
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
      setResultsReady(false);
    } finally {
      setIsLoading(false);
    }

    // Original GSAP animation code
    let gsap = pageGsapRef.current;
    if (!gsap) {
      try {
        const mod = await import("gsap");
        gsap = mod.gsap || mod.default || mod;
        pageGsapRef.current = gsap;
      } catch {
        setMinimized(true);
        setResultsReady(true);
        setTypeKey((k) => k + 1);
        return;
      }
    }

    const tl = gsap.timeline();

    tl.add(() => {
      setResultsReady(false);
      setTypedTitle("");
      setTypedDesc("");
      setTypingTitle(false);
      setTypingDesc(false);
    });

    if (expandedRef.current) {
      tl.to(expandedRef.current, {
        duration: 0.45,
        ease: "power2.in",
        clipPath: "inset(0 100% 0 0)",
        opacity: 0.0,
      });
    }

    tl.add(() => {
      setMinimized(true);
      setShowCursor(true);
    });

    if (minimizedRef.current) {
      tl.fromTo(
        minimizedRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          duration: 0.8,
          ease: "power2.out",
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
        }
      );
      tl.set(minimizedRef.current, { clearProps: "clipPath" });
    }

    const snapshot = { query, organism, projectType };
    const makeTitle = (s) =>
      s.organism || s.projectType
        ? `${s.organism || "Human"} research in ${
            s.projectType || "various fields"
          }`
        : "Top findings for your selection";
    const makeDesc = () =>
      "Curated highlights and key research related to the selected filters. Explore summaries, methods, and actionable insights derived from the latest literature.";

    tl.to({}, { duration: 0.05 });

    tl.add(() => {
      if (booted) {
        setDisplayTitle(makeTitle(snapshot));
        setDisplayDesc(makeDesc());
        setShowCursor(false);
        setResultsReady(true);
        setTypeKey((k) => k + 1);
        return;
      }
      gsap.delayedCall(0, () => {
        const el = holoBackdropRef.current;
        const sweep = holoBackdropSweepRef.current;
        if (!el || !sweep) return;
        const bootTl = gsap.timeline();
        bootTl.set(el, { opacity: 0 });
        bootTl.fromTo(
          el,
          {
            opacity: 0,
            boxShadow: "0 0 6px var(--holo), inset 0 0 4px var(--holo)",
          },
          {
            duration: 0.18,
            opacity: 0.9,
            boxShadow: "0 0 18px var(--holo), inset 0 0 12px var(--holo)",
            ease: "power2.out",
          }
        );
        bootTl.to(el, {
          opacity: 0.35,
          duration: 0.06,
          yoyo: true,
          repeat: 5,
          ease: "steps(2)",
        });
        bootTl.to(el, {
          opacity: 0.85,
          duration: 0.12,
          yoyo: true,
          repeat: 3,
          ease: "steps(2)",
        });
        const H = el.offsetHeight || el.getBoundingClientRect().height || 0;
        const bandH =
          sweep.offsetHeight || sweep.getBoundingClientRect().height || 0;
        bootTl.fromTo(
          sweep,
          { y: 0, opacity: 1 },
          {
            duration: 2,
            y: Math.max(0, H - bandH),
            opacity: 1,
            ease: "power2.inOut",
          }
        );
        bootTl.set(sweep, { opacity: 0, y: 0 });
        bootTl.add(() => {
          setBooted(true);
          setDisplayTitle(makeTitle(snapshot));
          setDisplayDesc(makeDesc());
          setShowCursor(true);
          setResultsReady(true);
          setTypeKey((k) => k + 1);
          gsap.delayedCall(0.35, () => setShowCursor(false));
        });
      });
    });
    tl.add(() => {
      lastSearchRef.current = snapshot;
    });
  };

  useEffect(() => {
    const gsap = pageGsapRef.current;
    if (!gsap) return;
    if (holoBackdropTlRef.current) {
      holoBackdropTlRef.current.kill();
      holoBackdropTlRef.current = null;
    }
    if (holoStaticTlRef.current) {
      holoStaticTlRef.current.kill();
      holoStaticTlRef.current = null;
    }
    if (minimized && booted && holoBackdropRef.current) {
      const tl = gsap.timeline();
      tl.set(holoBackdropRef.current, {
        opacity: 0.85,
        boxShadow: "0 0 16px var(--holo), inset 0 0 12px var(--holo)",
      });
      holoBackdropTlRef.current = tl;
    }
    return () => {
      if (holoBackdropTlRef.current) {
        holoBackdropTlRef.current.kill();
        holoBackdropTlRef.current = null;
      }
      if (holoStaticTlRef.current) {
        holoStaticTlRef.current.kill();
        holoStaticTlRef.current = null;
      }
    };
  }, [minimized, booted]);

  useEffect(() => {
    if (!minimized) return;
    let clearFns = [];
    setTypedTitle("");
    setTypedDesc("");
    setTypingTitle(true);
    setTypingDesc(false);
    const TITLE_SPEED = 8;
    const DESC_SPEED = 4;
    let i = 0;
    const t1 = setInterval(() => {
      i++;
      setTypedTitle(displayTitle.slice(0, i));
      if (i >= displayTitle.length) {
        clearInterval(t1);
        setTypingTitle(false);
        const wait = setTimeout(() => {
          setTypingDesc(true);
          let j = 0;
          const t2 = setInterval(() => {
            j++;
            setTypedDesc(displayDesc.slice(0, j));
            if (j >= displayDesc.length) {
              clearInterval(t2);
              setTypingDesc(false);
            }
          }, DESC_SPEED);
          clearFns.push(() => clearInterval(t2));
        }, 220);
        clearFns.push(() => clearTimeout(wait));
      }
    }, TITLE_SPEED);
    clearFns.push(() => clearInterval(t1));
    return () => {
      clearFns.forEach((fn) => fn());
    };
  }, [typeKey, minimized, displayTitle, displayDesc]);

  return (
    <div className="font-supreme">
      <section className="relative w-[100svw] h-[100svh] overflow-hidden">
        <Image
          src="https://exnfgivtduajcmskhmrl.supabase.co/storage/v1/object/public/janus-ship/janus-core.png"
          alt="Janus Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* Background gradient overlay - made more transparent to show the background image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/900 via-blue-900/900 to-slate-900/900" />

        <div
          className="relative z-10 flex w-full h-full"
          style={{
            "--glass-bg": "rgba(255,255,255,0.08)",
            "--glass-border": "rgba(255,255,255,0.18)",
            "--glass-shadow": "0 8px 30px rgba(0,0,0,0.25)",
            "--accent": "#00C8FF",
            "--holo": "#00C8FF",
            "--accent-2": "#FFFFFF",
            "--text-dim": "rgba(255,255,255,0.75)",
          }}
        >
          <NavBar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Hologram container - RESPONSIVE */}
            {minimized && (
              <div
                ref={holoBackdropRef}
                className="pointer-events-auto absolute z-[35] rounded-lg sm:rounded-xl overflow-hidden"
                style={{
                  top: "clamp(70px, 20vw, 88px)",
                  left: "clamp(8px, 2vw, 18px)",
                  right: "clamp(8px, 2vw, 18px)",
                  bottom: "clamp(8px, 2vw, 18px)",
                  outline: `1px solid rgba(0, 200, 255, 0.3)`,
                  boxShadow:
                    "0 0 12px rgba(0, 200, 255, 0.4), inset 0 0 8px rgba(0, 200, 255, 0.25)",
                  background: "rgba(0, 200, 255, 0.06)", // tono sutil sin mezclar
                  backdropFilter: "blur(6px)",
                }}
              >
                {/* Visual overlay layer */}
                <div className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl">
                  <div
                    ref={holoBackdropSweepRef}
                    className="pointer-events-none absolute left-0 right-0 opacity-0"
                    style={{
                      top: 0,
                      height: "10%",
                      background:
                        "linear-gradient(180deg, rgba(0,200,255,0) 0%, rgba(0,200,255,0.45) 50%, rgba(0,200,255,0) 100%)",
                      filter: "blur(3px)",
                    }}
                  />
                  <div
                    ref={holoStaticRef}
                    className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl"
                    style={{
                      opacity: 0.07,
                      mixBlendMode: "screen",
                      backgroundRepeat: "repeat",
                      backgroundSize: "200px 200px",
                      backgroundImage:
                        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0.8  0 0 0 0 1  0 0 0 0.75 0"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>\')',
                    }}
                  />
                </div>

                {/* Content layer - RESPONSIVE */}
                <div className="relative z-[2] h-full w-full text-white overflow-y-auto">
                  {/* Minimized menu - RESPONSIVE */}
                  <div
                    ref={minimizedRef}
                    className={`pointer-events-auto absolute left-2 sm:left-4 top-2 sm:top-4 z-[60] overflow-visible flex flex-col gap-2 w-[calc(100%-1rem)] sm:w-auto ${
                      minimized && booted
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                    style={{
                      clipPath: minimized ? undefined : "inset(0 100% 0 0)",
                    }}
                  >
                    {/* Filters row */}
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 font-technor">
                      <div className="relative flex flex-wrap items-center gap-1 sm:gap-2 font-technor">
                        <div className="relative flex-1">
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSearch()
                            }
                            placeholder="Search for topics..."
                            className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200"
                          />
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 rounded-md p-0.5">
                          <button
                            onClick={() => setSearchOperator("AND")}
                            className={`px-2 py-1 text-xs rounded transition-colors ${
                              searchOperator === "AND"
                                ? "bg-white/20 text-white"
                                : "text-white/50 hover:text-white"
                            }`}
                          >
                            AND
                          </button>
                          <button
                            onClick={() => setSearchOperator("OR")}
                            className={`px-2 py-1 text-xs rounded transition-colors ${
                              searchOperator === "OR"
                                ? "bg-white/20 text-white"
                                : "text-white/50 hover:text-white"
                            }`}
                          >
                            OR
                          </button>
                        </div>
                        <button
                          onClick={handleSearch}
                          disabled={isDisabled || isLoading}
                          aria-disabled={isDisabled || isLoading}
                          className={`inline-flex items-center justify-center font-bold rounded-md px-4 py-1.5 text-xs transition-colors duration-200 font-technor whitespace-nowrap
                        ${
                          isDisabled || isLoading
                            ? "bg-white/30 text-white/80 cursor-not-allowed"
                            : "bg-[var(--accent)] text-white"
                        }`}
                        >
                          {isLoading ? (
                            <svg
                              className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            "Search:"
                          )}
                        </button>
                        <Dropdown
                          compact
                          label="Organism"
                          value={organism}
                          onChange={handleOrganismChange}
                          options={[
                            "Algae",
                            "Bacteria",
                            "Cellular Organisms",
                            "Fish",
                            "Fruit Fly",
                            "Fungus",
                            "Human (Homo sapiens)",
                            "Literature",
                            "Microbiota",
                            "Plant",
                            "Rodent",
                            "Snail",
                            "Squid",
                            "Squirrel",
                            "Worm",
                          ]}
                          className="bg-white/5 hover:bg-white/10 border-white/10"
                        />
                        <Dropdown
                          compact
                          label="Project type"
                          value={projectType}
                          onChange={setProjectType}
                          options={[
                            "Flight",
                            "Ground",
                            "Ground study",
                            "High Altitude Study",
                            "Parabolic Flight Study",
                            "Spaceflight Project",
                            "Spaceflight Study",
                            "Suborbital Flight Study",
                            "pmc",
                          ]}
                          className="bg-white/5 hover:bg-white/10 border-white/10"
                          multiple
                        />
                        {showCursor && (
                          <span
                            aria-hidden
                            className="h-3 sm:h-4 w-1.5 sm:w-2 bg-[var(--accent)] animate-pulse"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Results content - RESPONSIVE GRID */}
                  {resultsReady && (
                    <div className="absolute inset-x-2 sm:inset-x-4 lg:inset-x-6 top-16 sm:top-20 lg:top-16 bottom-4 z-[40] text-white overflow-y-auto scrollbar-thin scrollbar-thumb-[#00C8FF]/30 scrollbar-track-transparent hover:scrollbar-thumb-[#00C8FF]/50 scrollbar-thumb-rounded-full transition-colors duration-300">
                      {/* Layout: Stack on mobile, side-by-side on desktop */}
                      <div className="flex justify-evenly flex-col lg:flex-row gap-4 lg:gap-6">
                        {/* Left section: Title, description, articles - 65% on desktop */}
                        <div className="flex-1 lg:flex-[0.99] space-y-4">
                          {/* Title and description - Only show when there are search results */}
                          {searchResults?.articles?.important?.length > 0 && (
                            <div>
                              <h1 className="font-technor font-bold text-base sm:text-xl lg:text-2xl leading-tight break-words">
                                {typedTitle}
                                <span
                                  aria-hidden
                                  className={`ml-0.5 ${
                                    typingTitle
                                      ? "inline-block animate-pulse"
                                      : "hidden"
                                  } text-[var(--accent)]`}
                                >
                                  _
                                </span>
                              </h1>
                              <div className="mt-2 max-w-2xl">
                                <div className="text-xs sm:text-sm text-[var(--text-dim)]">
                                  <span className="font-bold font-technor">
                                    Description
                                  </span>
                                  <div className="mt-1">
                                    {searchResults?.generated?.description && (
                                      <div className="p-3 mb-3">
                                        <p className="text-xs sm:text-sm text-white/80 font-supreme">
                                          {searchResults.generated.description}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Articles grid - RESPONSIVE */}
                          <div className="relative w-full">
                            <h3 className="text-xs sm:text-sm font-bold tracking-wide mb-3">
                              {searchResults
                                ? "Search Results"
                                : "Important Articles"}
                              {searchResults?.counts?.total_studies > 0 && (
                                <span className="ml-2 text-[var(--accent)]">
                                  ({searchResults.counts.important} of{" "}
                                  {searchResults.counts.total_studies} studies)
                                </span>
                              )}
                            </h3>

                            {isLoading ? (
                              <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00C8FF]"></div>
                              </div>
                            ) : error ? (
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-xs">
                                {error}
                              </div>
                            ) : searchResults &&
                              searchResults.articles?.important?.length ===
                                0 ? (
                              <div className="bg-white/5 border border-white/20 rounded-lg p-6 text-center">
                                <div className="flex flex-col items-center gap-3">
                                  <svg
                                    className="w-12 h-12 text-white/40"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <div>
                                    <h4 className="text-sm sm:text-base font-bold text-white mb-1 font-technor">
                                      No results found
                                    </h4>
                                    <p className="text-xs sm:text-sm text-white/70 font-technor">
                                      Try adjusting the filters or using
                                      different keywords
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : searchResults?.articles?.important?.length >
                              0 ? (
                              <>
                                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                  {visibleSearchResults.map(
                                    (article, index) => {
                                      // Find the full study data for description
                                      const fullStudy =
                                        searchResults?.data?.studies_full?.find(
                                          (study) =>
                                            study["Study Identifier"] ===
                                            article.id
                                        );

                                      return (
                                        <div
                                          key={`${article.id}-${index}`}
                                          className="group"
                                        >
                                          <a
                                            href={
                                              article.url ||
                                              (article.DOI
                                                ? `https://doi.org/${article.DOI}`
                                                : "#")
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                          >
                                            <div className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                                              <div className="flex flex-col sm:flex-row gap-3">
                                                {/* Left side - Thumbnail */}
                                                <div className="w-full sm:w-1/3 font-technor">
                                                  <div className="aspect-video rounded-md bg-white/10 border border-white/10 overflow-hidden relative">
                                                    {article.organism && (
                                                      <img
                                                        src={`/imgs/${article.organism
                                                          .toLowerCase()
                                                          .replace(
                                                            /\s+/g,
                                                            "_"
                                                          )}.webp`}
                                                        alt={article.organism}
                                                        className="absolute inset-0 w-full h-full object-contain opacity-40 p-1"
                                                        onError={(e) => {
                                                          // Fallback to cellular_fungus for bacteria, fungus, cellular
                                                          if (
                                                            article.organism
                                                              .toLowerCase()
                                                              .includes(
                                                                "human"
                                                              ) ||
                                                            article.organism
                                                              .toLowerCase()
                                                              .includes("homo")
                                                          ) {
                                                            e.target.src =
                                                              "/imgs/human.webp";
                                                          }
                                                          // Fallback to cellular_fungus for bacteria, fungus, cellular
                                                          else if (
                                                            [
                                                              "bacteria",
                                                              "fungus",
                                                              "cellular",
                                                            ].includes(
                                                              article.organism.toLowerCase()
                                                            )
                                                          ) {
                                                            e.target.src =
                                                              "/imgs/cellular_fungus.webp";
                                                          } else {
                                                            e.target.style.display =
                                                              "none";
                                                          }
                                                        }}
                                                      />
                                                    )}
                                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 text-center">
                                                      <span className="text-xs font-medium text-white/80 mb-1">
                                                        {article.organism ||
                                                          "Study"}
                                                      </span>
                                                      <span className="text-[10px] text-white/50">
                                                        {article.project_type ||
                                                          "Research"}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Right side - Content */}
                                                <div className="flex-1">
                                                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 group-hover:text-[var(--accent)] transition-colors font-technor">
                                                    {article.title}
                                                  </h3>

                                                  {/* Metadata */}
                                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-white/60 mb-2 font-technor">
                                                    <div>
                                                      <span className="font-medium text-white/70">
                                                        ID:
                                                      </span>{" "}
                                                      {article.id}
                                                    </div>
                                                    <div>
                                                      <span className="font-medium text-white/70">
                                                        Score:
                                                      </span>{" "}
                                                      {(
                                                        article.rank_score * 100
                                                      ).toFixed(1)}
                                                      %
                                                    </div>
                                                    <div>
                                                      <span className="font-medium text-white/70">
                                                        Date:
                                                      </span>{" "}
                                                      {new Date(
                                                        article.release_date
                                                      ).toLocaleDateString()}
                                                    </div>
                                                    {article.DOI && (
                                                      <div className="col-span-2 sm:col-span-3 truncate">
                                                        <span className="font-medium text-white/70">
                                                          DOI:
                                                        </span>{" "}
                                                        {article.DOI}
                                                      </div>
                                                    )}
                                                  </div>

                                                  {/* Description */}
                                                  {fullStudy?.[
                                                    "Study Description"
                                                  ] && (
                                                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2 font-supreme">
                                                      {
                                                        fullStudy[
                                                          "Study Description"
                                                        ]
                                                      }
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>

                                {/* Show More/Less button for search results */}
                                {searchResults.articles.important.length >
                                  3 && (
                                  <div className="mt-3 text-center font-technor">
                                    <button
                                      onClick={() =>
                                        setShowAllSearchResults(
                                          !showAllSearchResults
                                        )
                                      }
                                      className="text-[10px] sm:text-xs font-bold text-[var(--accent)] hover:text-white transition-colors px-3 py-1.5 rounded-md border border-[var(--accent)]/30 hover:bg-[var(--accent)]/10"
                                    >
                                      {showAllSearchResults
                                        ? "Show Less"
                                        : `Show More (${
                                            searchResults.articles.important
                                              .length - 3
                                          })`}
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                  {visibleArticles.map((article) => (
                                    <div
                                      key={article.id}
                                      className="h-full group"
                                    >
                                      <a
                                        href={article.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block h-full"
                                      >
                                        <div className="relative rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-1.5 sm:p-2 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                                          <div className="aspect-[16/9] rounded-md bg-white/20 border border-white/25 mb-1.5 overflow-hidden">
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                                              <span className="text-white/40 text-[10px]">
                                                Preview
                                              </span>
                                            </div>
                                          </div>
                                          <div className="px-0.5">
                                            <div className="text-[10px] sm:text-xs font-bold leading-tight mb-0.5 group-hover:text-[var(--accent)] transition-colors">
                                              {article.title}
                                            </div>
                                            <div className="text-[9px] sm:text-[10px] text-white/60 group-hover:text-white/80 line-clamp-2 transition-colors">
                                              {article.description}
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                                {articles.length > 3 && (
                                  <div className="mt-3 text-center">
                                    <button
                                      onClick={() =>
                                        setShowAllArticles(!showAllArticles)
                                      }
                                      className="text-[10px] sm:text-xs font-medium text-[var(--accent)] hover:text-white transition-colors px-3 py-1.5 rounded-md border border-[var(--accent)]/30 hover:bg-[var(--accent)]/10"
                                    >
                                      {showAllArticles
                                        ? "Show Less"
                                        : `Show More (${articles.length - 3})`}
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Right section: Carousel - 35% on desktop, full width on mobile - Only show when there are search results */}
                        {/* Right section: Data Visualizations - 35% on desktop, full width on mobile - Only show when there are search results */}
                        {searchResults?.articles?.important?.length > 0 && (
                          <div className="w-full lg:w-[35%] space-y-4 font-technor">
                            {/* Search Overview Card */}
                            <div className="rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-4">
                              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-[var(--accent)]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                  />
                                </svg>
                                Search Overview
                              </h3>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-md p-3 border border-white/10">
                                  <div className="text-2xl font-bold text-[var(--accent)]">
                                    {searchResults.counts.total_studies}
                                  </div>
                                  <div className="text-xs text-white/60 mt-1">
                                    Total Studies
                                  </div>
                                </div>
                                <div className="bg-white/5 rounded-md p-3 border border-white/10">
                                  <div className="text-2xl font-bold text-[var(--accent)]">
                                    {searchResults.counts.important}
                                  </div>
                                  <div className="text-xs text-white/60 mt-1">
                                    Important
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Emerging Topics */}
                            {searchResults?.topics?.emerging &&
                              searchResults.topics.emerging.length > 0 && (
                                <div className="rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-4">
                                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                    <svg
                                      className="w-4 h-4 text-[var(--accent)]"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                      />
                                    </svg>
                                    Emerging Topics
                                  </h3>
                                  <div className="space-y-2">
                                    {searchResults.topics.emerging
                                      .slice(0, 5)
                                      .map((topic, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center justify-between bg-white/5 rounded-md p-2 border border-white/10 hover:bg-white/10 transition-colors"
                                        >
                                          <span className="text-xs font-medium text-white capitalize">
                                            {topic.topic}
                                          </span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs text-white/60">
                                              {topic.subset_occurrences}x
                                            </span>
                                            <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                              <div
                                                className="h-full bg-[var(--accent)] rounded-full"
                                                style={{
                                                  width: `${
                                                    (topic.subset_occurrences /
                                                      Math.max(
                                                        ...searchResults.topics.emerging.map(
                                                          (t) =>
                                                            t.subset_occurrences
                                                        )
                                                      )) *
                                                    100
                                                  }%`,
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}

                            {/* Frequent Terms */}
                            {searchResults?.topics?.frequent_subset &&
                              searchResults.topics.frequent_subset.length >
                                0 && (
                                <div className="rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-4">
                                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                    <svg
                                      className="w-4 h-4 text-[var(--accent)]"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                      />
                                    </svg>
                                    Frequent Terms
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {searchResults.topics.frequent_subset
                                      .slice(0, 8)
                                      .map((term, idx) => (
                                        <div
                                          key={idx}
                                          className="px-2.5 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                                        >
                                          <span className="text-xs text-white font-medium">
                                            {term.token}
                                          </span>
                                          <span className="text-xs text-[var(--accent)] ml-1.5">
                                            ×{term.occurrences}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}

                            {/* Active Filters */}
                            {(organism || projectType || query) && (
                              <div className="rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-4">
                                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4 text-[var(--accent)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                  </svg>
                                  Active Filters
                                </h3>
                                <div className="space-y-2">
                                  {query && (
                                    <div className="text-xs">
                                      <span className="text-white/60">
                                        Keywords:
                                      </span>
                                      <span className="ml-2 text-white font-medium">
                                        {query}
                                      </span>
                                    </div>
                                  )}
                                  {organism && (
                                    <div className="text-xs">
                                      <span className="text-white/60">
                                        Organism:
                                      </span>
                                      <span className="ml-2 text-white font-medium">
                                        {organism}
                                      </span>
                                    </div>
                                  )}
                                  {projectType && (
                                    <div className="text-xs">
                                      <span className="text-white/60">
                                        Project Type:
                                      </span>
                                      <span className="ml-2 text-white font-medium">
                                        {projectType}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Study Distribution by Project Type */}
                            {searchResults?.data?.studies_full && (
                              <div className="rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm p-4">
                                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4 text-[var(--accent)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                    />
                                  </svg>
                                  Distribution
                                </h3>
                                <div className="space-y-2">
                                  {(() => {
                                    const projectCounts = {};
                                    searchResults.data.studies_full.forEach(
                                      (study) => {
                                        const type =
                                          study.project_label || "Unknown";
                                        projectCounts[type] =
                                          (projectCounts[type] || 0) + 1;
                                      }
                                    );
                                    const total = Object.values(
                                      projectCounts
                                    ).reduce((a, b) => a + b, 0);
                                    return Object.entries(projectCounts).map(
                                      ([type, count]) => (
                                        <div key={type} className="space-y-1">
                                          <div className="flex justify-between text-xs">
                                            <span className="text-white/80">
                                              {type}
                                            </span>
                                            <span className="text-[var(--accent)] font-medium">
                                              {count}
                                            </span>
                                          </div>
                                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                              className="h-full bg-gradient-to-r from-[var(--accent)] to-blue-400 rounded-full transition-all duration-500"
                                              style={{
                                                width: `${
                                                  (count / total) * 100
                                                }%`,
                                              }}
                                            />
                                          </div>
                                        </div>
                                      )
                                    );
                                  })()}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Expanded centered panel - RESPONSIVE */}
          <div
            id="heroTitlesContainer"
            ref={expandedRef}
            className={`w-full max-w-5xl px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-4 sm:gap-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              minimized ? "pointer-events-none" : ""
            }`}
            style={{
              clipPath: minimized ? "inset(0 100% 0 0)" : undefined,
              opacity: minimized ? 0 : 1,
              pointerEvents: minimized ? "none" : "auto",
            }}
          >
            {showHolo && (
              <div
                ref={holoRef}
                className="pointer-events-none absolute inset-0 rounded-xl ring-2"
                style={{
                  ringColor: "var(--holo)",
                  boxShadow: "0 0 0px rgba(0,0,0,0)",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(0,200,255,0.06) 0px, rgba(0,200,255,0.06) 1px, transparent 3px, transparent 6px)",
                  mixBlendMode: "screen",
                  borderColor: "var(--holo)",
                  borderWidth: 0,
                }}
              />
            )}
            {/* Lead text - RESPONSIVE */}
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm md:text-base font-technor font-semibold tracking-wide text-[var(--text-dim)]">
                What topics interest you?
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-[var(--text-dim)] font-supreme">
                To find new information, you just have to select specific
                keywords. I'll search in our database for relevant information
                for your research.
              </p>
            </div>
            <div className="w-full flex gap-2">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type keywords..."
                  className="w-full text-sm sm:text-base text-white placeholder-white/50 bg-white/5 border border-white/30 rounded-md px-3 md:px-4 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setSearchOperator((prev) => (prev === "AND" ? "OR" : "AND"))
                  }
                  className="h-full px-3 md:px-4 py-2 text-sm sm:text-base text-[#00C8FF] font-bold font-technor bg-white/5 border border-white/30 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {searchOperator}
                </button>
              </div>
            </div>
            {/* Buttons and dropdowns - RESPONSIVE WRAP */}
            <div className="w-full flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 bg-transparent font-technor">
              <button
                onClick={handleSearch}
                disabled={isDisabled || isLoading}
                aria-disabled={isDisabled || isLoading}
                className={`inline-flex items-center justify-center rounded-md px-8 sm:px-10 md:px-12 py-2 font-bold text-xs sm:text-sm transition-colors duration-200
                  ${
                    isDisabled || isLoading
                      ? "bg-white/30 text-white/80 cursor-not-allowed"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-[#00C8FF] hover:brightness-110 active:brightness-95 border-[1px] border-[var(--accent)]"
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  "/Search:"
                )}
              </button>

              <Dropdown
                label="Organism"
                value={organism}
                onChange={setOrganism}
                options={[
                  "Algae",
                  "Bacteria",
                  "Cellular Organisms",
                  "Fish",
                  "Fruit Fly",
                  "Fungus",
                  "Human (Homo sapiens)",
                  "Literature",
                  "Microbiota",
                  "Plant",
                  "Rodent",
                  "Snail",
                  "Squid",
                  "Squirrel",
                  "Worm",
                ]}
                className="bg-white/5 hover:bg-white/10 border-white/10"
                multiple
              />
              <Dropdown
                label="Project type"
                value={projectType}
                onChange={setProjectType}
                options={[
                  "Flight",
                  "Ground",
                  "Ground study",
                  "High Altitude Study",
                  "Parabolic Flight Study",
                  "Spaceflight Project",
                  "Spaceflight Study",
                  "Suborbital Flight Study",
                  "pmc",
                ]}
                className="bg-white/5 hover:bg-white/10 border-white/10"
                multiple
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Page;
