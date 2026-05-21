"use client";

import { Suspense, lazy } from "react";
import {
  BookOpen,
  Users,
  Package,
  Swords,
  Gem,
  WandSparkles,
  Stars,
  CalendarClock,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://durin.wiki";
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Durin Wiki",
    description: "Durin wiki for builds, teams, materials, weapons, artifacts, talents, constellations, and banner updates.",
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("best-build")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://genshin.hoyoverse.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId="MOkyO-PYAGY" title="Character Trailer - Durin: A Story Born for This" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span></h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <a href="#best-build" onClick={(event) => { event.preventDefault(); scrollToSection("best-build"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><BookOpen className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[0].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>
            <a href="#best-teams" onClick={(event) => { event.preventDefault(); scrollToSection("best-teams"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><Users className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[1].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>
            <a href="#materials" onClick={(event) => { event.preventDefault(); scrollToSection("materials"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><Package className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[2].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>
            <a href="#weapons" onClick={(event) => { event.preventDefault(); scrollToSection("weapons"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><Swords className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[3].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>
            <a href="#artifacts" onClick={(event) => { event.preventDefault(); scrollToSection("artifacts"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><Gem className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[4].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>
            <a href="#talents-kit" onClick={(event) => { event.preventDefault(); scrollToSection("talents-kit"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><WandSparkles className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[5].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>
            <a href="#constellations" onClick={(event) => { event.preventDefault(); scrollToSection("constellations"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><Stars className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[6].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>
            <a href="#banner-release-guide" onClick={(event) => { event.preventDefault(); scrollToSection("banner-release-guide"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><CalendarClock className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[7].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <section id="best-build" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinBestBuild.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinBestBuild.intro}</p><div className="grid gap-4 md:grid-cols-2">{t.modules.durinBestBuild.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-2">{item.title}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      <section id="best-teams" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinBestTeams.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinBestTeams.intro}</p><div className="grid gap-4 md:grid-cols-2">{t.modules.durinBestTeams.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-2">{item.name}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      <section id="materials" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinMaterials.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinMaterials.intro}</p><ul className="space-y-2">{t.modules.durinMaterials.items.map((item: any, i: number) => <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1" /><span className="text-sm text-muted-foreground">{item}</span></li>)}</ul></div>
      </section>

      <section id="weapons" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinWeapons.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinWeapons.intro}</p><div className="grid gap-4 md:grid-cols-3">{t.modules.durinWeapons.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-2">{item.name}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      <section id="artifacts" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinArtifacts.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinArtifacts.intro}</p><div className="grid gap-4 md:grid-cols-2">{t.modules.durinArtifacts.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-2">{item.name}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      <section id="talents-kit" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinTalentsAndKit.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinTalentsAndKit.intro}</p><div className="space-y-3">{t.modules.durinTalentsAndKit.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-1">{item.step}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      <section id="constellations" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinConstellations.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinConstellations.intro}</p><div className="grid gap-4 md:grid-cols-2">{t.modules.durinConstellations.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-2">{item.name}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      <section id="banner-release-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><h2 className="text-3xl md:text-5xl font-bold mb-4">{t.modules.durinBannerReleaseGuide.title}</h2><p className="text-muted-foreground mb-6">{t.modules.durinBannerReleaseGuide.intro}</p><div className="grid gap-4 md:grid-cols-2">{t.modules.durinBannerReleaseGuide.items.map((item: any, i: number) => <div key={i} className="p-5 rounded-xl border border-border bg-white/5"><h3 className="font-semibold mb-2">{item.name}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>)}</div></div>
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection title={t.cta.title} description={t.cta.description} joinCommunity={t.cta.joinCommunity} joinGame={t.cta.joinGame} />
      </Suspense>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div><h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3><p className="text-sm text-muted-foreground">{t.footer.description}</p></div>
            <div><h4 className="font-semibold mb-4">{t.footer.community}</h4><ul className="space-y-2 text-sm"><li><a href="https://discord.com/invite/genshinimpact" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.discord}</a></li><li><a href="https://x.com/GenshinImpact" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.twitter}</a></li><li><a href="https://www.reddit.com/r/Genshin_Impact/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.steamCommunity}</a></li><li><a href="https://genshin.hoyoverse.com/en/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.steamStore}</a></li></ul></div>
            <div><h4 className="font-semibold mb-4">{t.footer.legal}</h4><ul className="space-y-2 text-sm"><li><Link href="/about" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.about}</Link></li><li><Link href="/privacy-policy" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.privacy}</Link></li><li><Link href="/terms-of-service" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.terms}</Link></li><li><Link href="/copyright" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.copyrightNotice}</Link></li></ul></div>
            <div><p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p><p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
