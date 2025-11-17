import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Leaf, ShieldCheck } from "lucide-react";

const complianceMetrics = [
  {
    label: "Regulatory alignment",
    value: 92,
    caption: "Iowa OSHA 1928 & EPA Ag Worker Protection",
  },
  {
    label: "Training completion",
    value: 86,
    caption: "Crew refreshers past 12 months",
  },
  {
    label: "Equipment inspections",
    value: 74,
    caption: "Preventive checks this quarter",
  },
];

const hazardHighlights = [
  {
    title: "Heat stress watch",
    description:
      "Felt temperature expected above 95°F. AI recommends rotating field crews every 75 minutes.",
    icon: Flame,
    tone: "warning",
  },
  {
    title: "Manure lagoon berm",
    description:
      "Sensor drift detected. Schedule drone imagery to confirm no breakthrough after the storm.",
    icon: ShieldCheck,
    tone: "default",
  },
  {
    title: "Cover crop benefit",
    description:
      "Prairie AI estimates 12% reduction in slip incidents after rye cover seeding.",
    icon: Leaf,
    tone: "success",
  },
];

export function SiteOverview() {
  return (
    <div className="grid gap-4 lg:grid-cols-7 xl:gap-6">
      <Card className="lg:col-span-4 rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-emerald-900">
                Site readiness snapshot
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Prairie AI watches sensors, incidents, and tasks 24/7.
              </p>
            </div>
            <Badge className="bg-emerald-600 text-white">Live</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceMetrics.map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>{metric.label}</span>
                <span className="text-emerald-600">{metric.value}%</span>
              </div>
              <Progress
                value={metric.value}
                className="mt-2 h-2 rounded-full bg-emerald-100"
                indicatorClassName="bg-emerald-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {metric.caption}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="lg:col-span-3 space-y-3">
        {hazardHighlights.map((hazard) => {
          const Icon = hazard.icon;
          return (
            <Card
              key={hazard.title}
              className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm"
            >
              <CardContent className="flex items-start gap-3 px-5 py-4">
                <div className="rounded-2xl bg-emerald-600/10 p-2 text-emerald-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-emerald-900">
                    {hazard.title}
                  </CardTitle>
                  <p className="mt-1 text-xs text-slate-600">
                    {hazard.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

