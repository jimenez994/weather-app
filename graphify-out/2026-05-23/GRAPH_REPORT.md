# Graph Report - .  (2026-05-22)

## Corpus Check
- Corpus is ~16,787 words - fits in a single context window. You may not need a graph.

## Summary
- 297 nodes · 480 edges · 29 communities (15 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.91)
- Token cost: 175,420 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `HomePage()` - 13 edges
3. `MetricInfoConfig` - 13 edges
4. `useWeatherStore` - 12 edges
5. `WeatherDetails` - 9 edges
6. `celsiusToFahrenheit()` - 9 edges
7. `skills` - 7 edges
8. `City` - 7 edges
9. `WeatherData` - 7 edges
10. `getWeatherIconComponent()` - 7 edges

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

## Communities (29 total, 14 thin omitted)

### Community 0 - "Weather Metrics & Utilities"
Cohesion: 0.11
Nodes (28): airQualityConfig(), humidityConfig(), precipitationConfig(), pressureConfig(), sunriseSunsetConfig(), uvIndexConfig(), visibilityConfig(), windConfig() (+20 more)

### Community 1 - "Skills Registry"
Cohesion: 0.06
Nodes (32): computedHash, skillPath, source, sourceType, computedHash, skillPath, source, sourceType (+24 more)

### Community 2 - "Package Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, clsx, date-fns, framer-motion, lucide-react, next, react, react-dom (+20 more)

### Community 3 - "Location & Favorites"
Cohesion: 0.22
Nodes (15): useGeolocation(), useWeather(), DEFAULT_CITY, GeocodingResult, reverseGeocode(), searchCities(), FavoritesState, useFavoritesStore (+7 more)

### Community 4 - "Core Weather Display"
Cohesion: 0.13
Nodes (19): WEATHER_CONDITIONS, feelsLikeConfig(), formatDay(), formatHour(), formatTemperature(), getWeatherCondition(), getWeatherIconComponent(), getWeatherLabel() (+11 more)

### Community 5 - "App Shell & Layout"
Cohesion: 0.14
Nodes (18): inter, metadata, RootLayout(), viewport, HomePage(), Providers(), Animated Container, Glass Card (+10 more)

### Community 6 - "Forecast & API Layer"
Cohesion: 0.14
Nodes (16): clampVisibility(), fetchWeatherData(), generateMockAlerts(), retryWithBackoff(), celsiusToFahrenheit(), CartesianGrid, ChartDataPoint, ForecastChart (+8 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Agent Skills Methodology"
Cohesion: 0.12
Nodes (16): Diagnose Skill, Feedback Loop, Falsifiable Hypothesis, Regression Test, Architecture Decision Record, Domain Glossary, GitHub Issue Tracker, GitLab Issue Tracker (+8 more)

### Community 9 - "UI Primitives & Alerts"
Cohesion: 0.18
Nodes (10): cn(), WeatherAlert, GlassCard(), GlassCardProps, Skeleton(), SkeletonProps, WeatherSkeleton(), severityColors (+2 more)

### Community 10 - "Weather Visual Effects"
Cohesion: 0.22
Nodes (8): BACKGROUND_GRADIENTS, Particle, RainParticlesComponent(), RainParticlesProps, dayGradients, nightGradients, Props, WeatherBackground()

### Community 11 - "Project Docs & Branding"
Cohesion: 0.22
Nodes (9): Breaking Changes Warning, next/dist Docs Guide, AGENTS.md Include Directive, Next.js Logo, Vercel Logo, Geist Font, Next.js, Vercel (+1 more)

### Community 12 - "Prototyping Skill"
Cohesion: 0.29
Nodes (7): Logic Prototype, Pure Reducer, State Machine, Terminal UI (TUI), Prototype Skill, UI Prototype, Variant Switcher

### Community 13 - "Triage Labels"
Cohesion: 0.33
Nodes (6): Needs Info, Needs Triage, Ready for Agent, Ready for Human, Triage Label System, Won't Fix

### Community 14 - "HITL Loop Script"
Cohesion: 0.83
Nodes (3): capture(), step(), hitl-loop.template.sh script

## Knowledge Gaps
- **152 isolated node(s):** `version`, `source`, `sourceType`, `skillPath`, `computedHash` (+147 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `HomePage()` connect `App Shell & Layout` to `Location & Favorites`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `version`, `source`, `sourceType` to the rest of the system?**
  _152 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Weather Metrics & Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.11470985155195682 - nodes in this community are weakly interconnected._
- **Should `Skills Registry` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Core Weather Display` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Should `App Shell & Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._