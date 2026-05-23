# Graph Report - weather_app  (2026-05-23)

## Corpus Check
- 59 files · ~23,817 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 489 nodes · 656 edges · 46 communities (27 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27ca5d42`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Weather Metrics & Utilities|Weather Metrics & Utilities]]
- [[_COMMUNITY_Skills Registry|Skills Registry]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Location & Favorites|Location & Favorites]]
- [[_COMMUNITY_Core Weather Display|Core Weather Display]]
- [[_COMMUNITY_App Shell & Layout|App Shell & Layout]]
- [[_COMMUNITY_Forecast & API Layer|Forecast & API Layer]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Agent Skills Methodology|Agent Skills Methodology]]
- [[_COMMUNITY_UI Primitives & Alerts|UI Primitives & Alerts]]
- [[_COMMUNITY_Weather Visual Effects|Weather Visual Effects]]
- [[_COMMUNITY_Project Docs & Branding|Project Docs & Branding]]
- [[_COMMUNITY_Prototyping Skill|Prototyping Skill]]
- [[_COMMUNITY_Triage Labels|Triage Labels]]
- [[_COMMUNITY_HITL Loop Script|HITL Loop Script]]
- [[_COMMUNITY_Claude Settings|Claude Settings]]
- [[_COMMUNITY_HITL Registry Link|HITL Registry Link]]
- [[_COMMUNITY_Meta Communication Skills|Meta Communication Skills]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Skeleton Component|Skeleton Component]]
- [[_COMMUNITY_PostCSS Config Alias|PostCSS Config Alias]]
- [[_COMMUNITY_ESLint Config Alias|ESLint Config Alias]]
- [[_COMMUNITY_TS Config Alias|TS Config Alias]]
- [[_COMMUNITY_Package Config Alias|Package Config Alias]]
- [[_COMMUNITY_File Icon|File Icon]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]
- [[_COMMUNITY_Window Icon|Window Icon]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `What You Must Do When Invoked` - 16 edges
3. `/graphify` - 15 edges
4. `HomePage()` - 13 edges
5. `MetricInfoConfig` - 13 edges
6. `useWeatherStore` - 12 edges
7. `Diagnose` - 11 edges
8. `WeatherDetails` - 9 edges
9. `celsiusToFahrenheit()` - 9 edges
10. `To Issues` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Logo` --semantically_similar_to--> `Next.js`  [INFERRED] [semantically similar]
  public/next.svg → README.md
- `Vercel Logo` --semantically_similar_to--> `Vercel`  [INFERRED] [semantically similar]
  public/vercel.svg → README.md
- `City` --shares_data_with--> `City Search`  [INFERRED]
  types/weather.ts → components/weather/city-search.tsx
- `DailyForecast` --shares_data_with--> `Daily Forecast`  [INFERRED]
  types/weather.ts → components/weather/daily-forecast.tsx
- `AirQuality` --shares_data_with--> `Air Quality`  [INFERRED]
  types/weather.ts → components/weather/air-quality.tsx

## Hyperedges (group relationships)
- **Weather Dashboard Component Composition** — app_page_homepage, components_weather_dailyforecast, components_weather_weatheralerts, components_weather_airquality, components_weather_citysearch [EXTRACTED 1.00]
- **Shared UI Primitive Layer** — components_ui_glasscard, components_ui_animatedcontainer, components_ui_metricinfopopover, components_ui_skeleton, components_ui_weatherskeleton [EXTRACTED 1.00]
- **Weather Data Type Hierarchy** — types_weather_weatherdata, types_weather_currentweather, types_weather_hourlyforecast, types_weather_dailyforecast, types_weather_airquality, types_weather_weatheralert, types_weather_city [EXTRACTED 1.00]
- **Weather Data Display Components** — weather_sunrise_sunset_sunrisesunset, weather_forecast_chart_forecastchart, weather_current_weather_currentweather, weather_hourly_forecast_hourlyforecast, weather_weather_details_weatherdetails [INFERRED 0.85]
- **Metric Info Configuration Functions** — lib_metric_info_configs_feelslikeconfig, lib_metric_info_configs_uvindexconfig, lib_metric_info_configs_windconfig, lib_metric_info_configs_humidityconfig, lib_metric_info_configs_pressureconfig, lib_metric_info_configs_visibilityconfig, lib_metric_info_configs_sunrisesunsetconfig, lib_metric_info_configs_precipitationconfig, lib_metric_info_configs_airqualityconfig, types_metrics_metricinfoconfig [EXTRACTED 1.00]
- **Weather Data Fetch and State Management Pipeline** — store_weather_useweatherstore, hooks_use_weather_useweather, lib_api_fetchweatherdata, lib_retry_retrywithbackoff, lib_weather_cache_saveweathercache, lib_weather_cache_getweathercache [INFERRED 0.85]
- **Triage Label System** — setup_matt_pocock_skills_triage_labels_system, setup_matt_pocock_skills_triage_labels_needs_triage, setup_matt_pocock_skills_triage_labels_needs_info, setup_matt_pocock_skills_triage_labels_ready_for_agent, setup_matt_pocock_skills_triage_labels_ready_for_human, setup_matt_pocock_skills_triage_labels_wontfix [EXTRACTED 1.00]
- **Setup Configuration Areas** — setup_matt_pocock_skills_skill_setup, setup_matt_pocock_skills_skill_issue_tracker, setup_matt_pocock_skills_skill_triage_labels, setup_matt_pocock_skills_skill_domain_docs [EXTRACTED 1.00]
- **Prototype Branches** — prototype_skill_prototype, prototype_logic_prototype, prototype_ui_prototype [EXTRACTED 1.00]

## Communities (46 total, 19 thin omitted)

### Community 0 - "Weather Metrics & Utilities"
Cohesion: 0.07
Nodes (51): WEATHER_CONDITIONS, airQualityConfig(), feelsLikeConfig(), humidityConfig(), precipitationConfig(), pressureConfig(), sunriseSunsetConfig(), uvIndexConfig() (+43 more)

### Community 1 - "Skills Registry"
Cohesion: 0.06
Nodes (32): computedHash, skillPath, source, sourceType, computedHash, skillPath, source, sourceType (+24 more)

### Community 2 - "Package Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, clsx, date-fns, framer-motion, lucide-react, next, react, react-dom (+20 more)

### Community 3 - "Location & Favorites"
Cohesion: 0.13
Nodes (29): HomePage(), Animated Container, Glass Card, Metric Info Popover, Weather Skeleton, Air Quality, City Search, Daily Forecast (+21 more)

### Community 4 - "Core Weather Display"
Cohesion: 0.06
Nodes (36): code:bash (mkdir -p graphify-out), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash (LOCAL_PATH=$(graphify clone <github-url> [--branch <branch>]), code:bash (graphify export obsidian), code:bash (graphify export html  # auto-aggregates to community view if), code:bash (graphify export wiki), code:bash (graphify export neo4j), code:bash (graphify export neo4j --push bolt://localhost:7687 --user ne) (+28 more)

### Community 5 - "App Shell & Layout"
Cohesion: 0.29
Nodes (6): inter, metadata, RootLayout(), viewport, Providers(), Next.js Config

### Community 6 - "Forecast & API Layer"
Cohesion: 0.11
Nodes (20): clampVisibility(), fetchWeatherData(), generateMockAlerts(), retryWithBackoff(), celsiusToFahrenheit(), formatHour(), getWeatherCache(), saveWeatherCache() (+12 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Agent Skills Methodology"
Cohesion: 0.10
Nodes (19): GitHub Issue Tracker, GitLab Issue Tracker, Local Markdown Issue Tracker, Issue Tracker Config, Setup Matt Pocock Skills, Triage Labels Config, 1. Gather context, 2. Explore the codebase (optional) (+11 more)

### Community 9 - "UI Primitives & Alerts"
Cohesion: 0.06
Nodes (34): code:block1 (/graphify                                             # full), code:bash (if [ ! -f graphify-out/.graphify_python ]; then), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash (if [ ! -f graphify-out/.graphify_extract.json ]; then), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash ($(cat graphify-out/.graphify_python) -c ") (+26 more)

### Community 10 - "Weather Visual Effects"
Cohesion: 0.22
Nodes (8): BACKGROUND_GRADIENTS, Particle, RainParticlesComponent(), RainParticlesProps, dayGradients, nightGradients, Props, WeatherBackground()

### Community 11 - "Project Docs & Branding"
Cohesion: 0.22
Nodes (9): Breaking Changes Warning, next/dist Docs Guide, AGENTS.md Include Directive, Next.js Logo, Vercel Logo, Geist Font, Next.js, Vercel (+1 more)

### Community 12 - "Prototyping Skill"
Cohesion: 0.18
Nodes (10): Logic Prototype, Pure Reducer, State Machine, Terminal UI (TUI), Pick a branch, Prototype, Rules that apply to both, When done (+2 more)

### Community 13 - "Triage Labels"
Cohesion: 0.33
Nodes (6): Needs Info, Needs Triage, Ready for Agent, Ready for Human, Triage Label System, Won't Fix

### Community 14 - "HITL Loop Script"
Cohesion: 0.83
Nodes (3): capture(), step(), hitl-loop.template.sh script

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (17): Diagnose, Feedback Loop, Falsifiable Hypothesis, Iterate on the loop itself, Non-deterministic bugs, Phase 1 — Build a feedback loop, Phase 2 — Reproduce, Phase 3 — Hypothesise (+9 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (14): 1. State the question and pick N, 2. Generate radically different variants, 3. Wire them together, 4. Build the floating switcher, 5. Hand it over, 6. Capture the answer and clean up, Anti-patterns, code:tsx (// pseudo-code — adapt to the project's framework) (+6 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (13): code:bash ($(cat graphify-out/.graphify_python) -c "), code:block11 ([Agent tool call 1: files 1-15, subagent_type="general-purpo), code:bash (PROJECT_ROOT=$(cat graphify-out/.graphify_root)), code:block13 (You are a graphify extraction subagent. Read the files liste), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash ($(cat graphify-out/.graphify_python) -c "), code:bash ($(cat graphify-out/.graphify_python) -c ") (+5 more)

### Community 32 - "Community 32"
Cohesion: 0.17
Nodes (11): 1. State the question, 2. Pick the language, 3. Isolate the logic in a portable module, 4. Build the smallest TUI that exposes the state, 5. Make it runnable in one command, 6. Hand it over, 7. Capture the answer, Anti-patterns (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (8): 1. Explore, 2. Present findings and ask, 3. Confirm and edit, 4. Write, 5. Done, code:markdown (## Agent skills), Process, Setup Matt Pocock's Skills

### Community 34 - "Community 34"
Cohesion: 0.25
Nodes (7): Before exploring, read these, code:block1 (/), code:block2 (/), Domain Docs, File structure, Flag ADR conflicts, Use the glossary's vocabulary

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (5): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More, weather-app

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (4): Auto-Clarity Exception, Examples, Persistence, Rules

### Community 37 - "Community 37"
Cohesion: 0.40
Nodes (4): Conventions, Issue tracker: GitHub, When a skill says "fetch the relevant ticket", When a skill says "publish to the issue tracker"

### Community 38 - "Community 38"
Cohesion: 0.40
Nodes (4): Conventions, Issue tracker: GitLab, When a skill says "fetch the relevant ticket", When a skill says "publish to the issue tracker"

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): Conventions, Issue tracker: Local Markdown, When a skill says "fetch the relevant ticket", When a skill says "publish to the issue tracker"

## Knowledge Gaps
- **275 isolated node(s):** `version`, `source`, `sourceType`, `skillPath`, `computedHash` (+270 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `What You Must Do When Invoked` connect `Core Weather Display` to `UI Primitives & Alerts`, `Community 31`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `/graphify` connect `UI Primitives & Alerts` to `Core Weather Display`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `HomePage()` connect `Location & Favorites` to `App Shell & Layout`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `version`, `source`, `sourceType` to the rest of the system?**
  _275 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Weather Metrics & Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.06564364876385337 - nodes in this community are weakly interconnected._
- **Should `Skills Registry` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._