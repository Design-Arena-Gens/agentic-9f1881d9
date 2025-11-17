import { useState } from "react";
import { useRouter } from "next/router";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AIAssistant } from "@/components/ai-assistant";
import { HumanLoopReview } from "@/components/dashboard/human-loop";
import { SitePortfolio } from "@/components/dashboard/site-portfolio";
import { ArrowLeft, Compass, Factory, Workflow } from "lucide-react";

const dashboardSites = [
  { id: "site-1", name: "Story County · North Prairie" },
  { id: "site-2", name: "Boone County · Riverbend" },
  { id: "site-3", name: "Monroe County · Uplands" },
];

const sectionDetails: Record<
  string,
  {
    title: string;
    description: string;
    aiPrompt: string;
    stat: string;
    statLabel: string;
  }
> = {
  planner: {
    title: "AI Planning Studio",
    description:
      "Define compliance goals, feed Prairie AI the constraints, and let it assemble drills, recordkeeping, and training plans aligned to Iowa regulations.",
    aiPrompt:
      "Draft a 7-day harvest safety plan for Site 1 considering forecast winds and powerline clearances.",
    stat: "23",
    statLabel: "Active AI blueprints",
  },
  compliance: {
    title: "Compliance Control Center",
    description:
      "Track OSHA 1928, EPA Worker Protection, Iowa DNR, and county requirements in one place. Prairie AI keeps the paperwork ready for inspection.",
    aiPrompt:
      "Review pesticide storage logs and flag gaps before the DNR visit next Tuesday.",
    stat: "98%",
    statLabel: "Docs ready for audit",
  },
  audits: {
    title: "Audit Command Post",
    description:
      "Plan walkthroughs, assign observers, and use Prairie AI’s smart checklists to capture photos, hazards, and corrective actions in real time.",
    aiPrompt:
      "Create an AI-guided audit for the dairy parlor focusing on slip risks and LOTO compliance.",
    stat: "4",
    statLabel: "Audits scheduled this month",
  },
  hazards: {
    title: "Hazard Registry",
    description:
      "Map hazards across fields, barns, and shops. Sensors feed auto-updates while crews submit observations via radio or text.",
    aiPrompt:
      "Summarize open hazards at North Prairie and group them by severity for the morning briefing.",
    stat: "12",
    statLabel: "Open hazard entries",
  },
  crews: {
    title: "Crew Roster & Readiness",
    description:
      "Monitor certifications, fatigue risk, and readiness for every crew. Prairie AI suggests staffing shifts before problems surface.",
    aiPrompt:
      "Draft a rotation that keeps CDL drivers under 60 hours during harvest week.",
    stat: "86%",
    statLabel: "Crew compliance score",
  },
  equipment: {
    title: "Equipment Safety Hub",
    description:
      "Tie maintenance logs, IoT sensor data, and lockout records together so nothing runs without clearance.",
    aiPrompt:
      "Build a pre-harvest inspection workflow for the 9760 STS combines.",
    stat: "18",
    statLabel: "Units under monitoring",
  },
  knowledge: {
    title: "Knowledge & Training",
    description:
      "Deploy micro-trainings, policy updates, and rural emergency playbooks. Prairie AI keeps lessons Iowa-specific.",
    aiPrompt:
      "Write a quick tailgate talk on PTO safety referencing Iowa State Extension tips.",
    stat: "34",
    statLabel: "Playbooks published",
  },
  sites: {
    title: "Site Management",
    description:
      "Centralize every farm, field, and livestock site. AI benchmarks each against Iowa compliance baselines and sensor data.",
    aiPrompt:
      "Compare Site 1 and Site 3 readiness for storm season and recommend mitigation steps.",
    stat: "3",
    statLabel: "Managed sites",
  },
};

export default function SectionPage() {
  const router = useRouter();
  const [activeSite, setActiveSite] = useState(dashboardSites[0].id);
  const slug = typeof router.query.section === "string" ? router.query.section : "";
  const detail = sectionDetails[slug] ?? sectionDetails.sites;

  return (
    <AppShell
      sites={dashboardSites}
      activeSiteId={activeSite}
      onSiteChange={setActiveSite}
    >
      <div className="space-y-6 xl:space-y-8">
        <Button
          variant="ghost"
          className="w-fit gap-2 px-0 text-emerald-700"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Button>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
            <CardHeader className="space-y-3 pb-6">
              <Badge className="w-fit bg-emerald-100 text-emerald-700">
                {detail.stat} · {detail.statLabel}
              </Badge>
              <CardTitle className="text-2xl font-semibold text-emerald-900">
                {detail.title}
              </CardTitle>
              <p className="text-sm text-slate-600">{detail.description}</p>
            </CardHeader>
            <CardContent className="space-y-5 text-sm text-slate-700">
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  <Compass className="h-4 w-4" />
                  Prairie AI’s take
                </div>
                <p className="mt-3 leading-relaxed">
                  {detail.description} Prairie AI gives you the paperwork,
                  playbooks, and action lists while you keep the farming
                  judgment in the loop.
                </p>
              </div>
              <div className="rounded-3xl border border-dashed border-emerald-200 bg-white/70 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase text-emerald-600">
                  Try this with AI
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  “{detail.aiPrompt}”
                </p>
              </div>
              <Separator className="bg-emerald-100" />
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Factory className="h-4 w-4 text-emerald-500" />
                  Sites stay central—crews switch with one click.
                </span>
                <span className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-emerald-500" />
                  Human approvals required before AI actions go live.
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <AIAssistant />
            <HumanLoopReview />
          </div>
        </section>

        <SitePortfolio />
      </div>
    </AppShell>
  );
}
