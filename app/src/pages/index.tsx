import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AIAssistant } from "@/components/ai-assistant";
import { SiteOverview } from "@/components/dashboard/site-overview";
import { RiskIntelligence } from "@/components/dashboard/risk-intelligence";
import { SitePortfolio } from "@/components/dashboard/site-portfolio";
import { HumanLoopReview } from "@/components/dashboard/human-loop";
import { ConditionsBoard } from "@/components/dashboard/conditions-board";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Lightbulb, MapPin, Mic } from "lucide-react";

const dashboardSites = [
  { id: "site-1", name: "Story County · North Prairie" },
  { id: "site-2", name: "Boone County · Riverbend" },
  { id: "site-3", name: "Monroe County · Uplands" },
];

export default function Home() {
  const [activeSiteId, setActiveSiteId] = useState(dashboardSites[0].id);

  const headlineCopy = useMemo(() => {
    switch (activeSiteId) {
      case "site-2":
        return {
          title: "Riverbend livestock safety control room",
          subtitle:
            "AI watches barn ventilation, lagoon berms, and crew fatigue so you can stay ahead of Iowa DNR inspections.",
        };
      case "site-3":
        return {
          title: "Uplands regenerative field intelligence",
          subtitle:
            "Prairie AI blends cover crop telemetry, slope risk, and organic cert rules to keep harvest teams safe.",
        };
      default:
        return {
          title: "North Prairie operations pulse",
          subtitle:
            "Your AI field steward monitors machine health, weather, and hazards across Story County acreage.",
        };
    }
  }, [activeSiteId]);

  return (
    <AppShell
      sites={dashboardSites}
      activeSiteId={activeSiteId}
      onSiteChange={setActiveSiteId}
    >
      <div className="space-y-6 xl:space-y-8">
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card className="rounded-3xl border-emerald-100 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 text-white shadow-lg">
            <CardContent className="flex flex-col gap-5 p-6 sm:p-10">
              <Badge className="w-fit bg-white/20 text-white">Story County</Badge>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                {headlineCopy.title}
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-emerald-50/90">
                {headlineCopy.subtitle}
              </p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium">
                  <Bot className="h-4 w-4" />
                  AI preps compliance, audits, and safety briefs automatically.
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Mic className="h-4 w-4" />
                  Speak your requests—hands stay free for the work.
                </div>
              </div>
              <Separator className="bg-white/30" />
              <div className="flex flex-wrap gap-3 text-xs text-emerald-50/80">
                <span className="flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  OSHA 1928 + EPA Ag Worker Protection
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Iowa-specific weather + policy guidance
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3 rounded-3xl border border-emerald-100 bg-white/70 p-4 text-sm shadow-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              AI handoff checklist
            </p>
            <div className="rounded-2xl bg-emerald-50/80 p-4 text-slate-700">
              Prairie AI drafted your OSHA 300 incident log update. Review the
              flagged entries and hit approve to sync with your insurer.
            </div>
            <Button className="w-full bg-emerald-600 text-white">
              Review and publish update
            </Button>
            <Button variant="outline" className="w-full border-emerald-200">
              Ask Prairie AI for a briefing
            </Button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr] xl:items-start">
          <div className="space-y-6">
            <SiteOverview />
            <RiskIntelligence />
            <ConditionsBoard />
          </div>
          <div className="space-y-6 xl:sticky xl:top-24">
            <AIAssistant />
            <HumanLoopReview />
            <SitePortfolio />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
