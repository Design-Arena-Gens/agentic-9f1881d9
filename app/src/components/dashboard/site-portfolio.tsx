import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, MapPin, Tractor } from "lucide-react";

const sites = [
  {
    id: "story-01",
    name: "Story County – North Prairie",
    acres: 480,
    focus: "Corn & soybean rotation",
    crew: "Field crew A (12)",
    completion: 88,
    hazards: ["Grain bin entry", "Tile intake", "Chemical shed"],
  },
  {
    id: "boone-02",
    name: "Boone County – Riverbend",
    acres: 320,
    focus: "Cow-calf pairs & hay",
    crew: "Livestock crew (9)",
    completion: 76,
    hazards: ["Slip/fall milking parlor", "Manure lagoon", "Heat stress"],
  },
  {
    id: "monroe-05",
    name: "Monroe County – Uplands",
    acres: 640,
    focus: "Organic corn + prairie strips",
    crew: "Regenerative team (6)",
    completion: 64,
    hazards: ["PTO entanglement", "Dust inhalation", "Slope rollover"],
  },
];

export function SitePortfolio() {
  return (
    <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
      <CardContent className="p-0">
        <ScrollArea className="h-[380px] px-6 py-5">
          <div className="space-y-4">
            {sites.map((site) => (
              <div
                key={site.id}
                className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <p className="text-sm font-semibold text-emerald-900">
                        {site.name}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {site.acres} acres · {site.focus}
                    </p>
                  </div>
                  <Badge className="bg-emerald-600 text-white">
                    {site.completion}% ready
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <Leaf className="h-4 w-4 text-emerald-500" />
                  Prairie AI syncs weather, soil, and crew fatigue for this site.
                </div>
                <div className="mt-4 space-y-2">
                  <Progress
                    value={site.completion}
                    className="h-2 rounded-full bg-white"
                    indicatorClassName="bg-emerald-500"
                  />
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Tractor className="h-3.5 w-3.5 text-emerald-500" />
                    Crew in charge: {site.crew}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {site.hazards.map((hazard) => (
                    <Badge
                      key={hazard}
                      variant="outline"
                      className="border-emerald-200 text-[11px] font-medium text-emerald-700"
                    >
                      {hazard}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

