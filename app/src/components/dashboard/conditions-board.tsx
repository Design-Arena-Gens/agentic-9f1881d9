import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Info,
  Shield,
  SprayCan,
  ThermometerSun,
  Wind,
} from "lucide-react";

const weatherWatch = [
  {
    label: "Heat index",
    value: "Feels like 98°F at 2 PM",
    icon: ThermometerSun,
    severity: "high",
    detail:
      "AI suggests 20 min cooling breaks each hour, with electrolyte coolers at rows 12 and 24.",
  },
  {
    label: "Wind gusts",
    value: "25 mph SW after 4 PM",
    icon: Wind,
    severity: "medium",
    detail: "Delay crop dusting until after 7 PM to avoid drift across the creek.",
  },
  {
    label: "Humidity",
    value: "72% overnight",
    icon: Droplets,
    severity: "low",
    detail: "Monitor for bin condensation; AI scheduled a morning aeration cycle.",
  },
];

const crewChecklist = [
  "Lockout-tagout verified on dryer fans",
  "Respirators staged in chemical shed",
  "Hydration trailer ice restocked",
  "Emergency numbers posted in bunkhouse",
  "First aid kits replenished in service trucks",
];

const pesticideNotice = {
  product: "Atrazine blend 4L",
  status: "Restricted",
  action:
    "Prairie AI populated EPA Form 7202 with weather windows and buffer zones. Human signature pending.",
};

export function ConditionsBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-5 xl:gap-6">
      <Card className="lg:col-span-3 rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-emerald-900">
            Weather watch · Story County
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weatherWatch.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3"
              >
                <div className="rounded-xl bg-white p-2 text-emerald-600 shadow">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-sm text-slate-700">
                  <div className="flex items-center justify-between font-semibold text-emerald-900">
                    <span>{item.label}</span>
                    <Badge
                      variant="outline"
                      className={
                        item.severity === "high"
                          ? "border-red-200 text-red-600"
                          : item.severity === "medium"
                          ? "border-amber-200 text-amber-600"
                          : "border-emerald-200 text-emerald-600"
                      }
                    >
                      {item.value}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-4">
        <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-900">
              Crew readiness checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-[220px] pr-2">
              <div className="space-y-3">
                {crewChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Checkbox
                      id={item}
                      className="mt-0.5 border-emerald-200 text-emerald-600"
                    />
                    <Label
                      htmlFor={item}
                      className="cursor-pointer text-sm text-slate-700"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                <SprayCan className="h-4 w-4 text-emerald-600" />
                Restricted use pesticide
              </div>
              <Badge className="bg-amber-100 text-amber-700">Action</Badge>
            </div>
            <p className="text-sm text-slate-700">
              {pesticideNotice.product} · {pesticideNotice.status}
            </p>
            <p className="rounded-2xl bg-emerald-50/60 p-3 text-xs text-slate-600">
              {pesticideNotice.action}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Info className="h-4 w-4 text-emerald-600" />
                  View buffer map
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 text-xs text-slate-600">
                Prairie AI cross-checked wind, field edges, and pollinator
                habitats. Spray window opens at 7:10 PM with 3 mph drift risk.
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              Prairie AI logged compliance evidence for audit trail.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
