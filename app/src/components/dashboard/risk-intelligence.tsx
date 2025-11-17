import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const riskTrendData = [
  { week: "May 5", incidents: 2, risk: 38 },
  { week: "May 12", incidents: 1, risk: 34 },
  { week: "May 19", incidents: 4, risk: 52 },
  { week: "May 26", incidents: 3, risk: 49 },
  { week: "Jun 2", incidents: 1, risk: 33 },
  { week: "Jun 9", incidents: 2, risk: 41 },
];

const insights = [
  {
    title: "Top driver",
    body: "Field #7 slope ratio + wet soils predicts a 3.1x higher rollover risk this week.",
  },
  {
    title: "Crew fatigue",
    body: "Planting crew logged 58 hrs average last week. AI suggests adding a relief operator for 2nd shift.",
  },
  {
    title: "AI action queue",
    body: "Drafting confined space rescue drill using Iowa State templates. Ready for review by 2:30 PM.",
  },
];

const incidentLog = [
  {
    type: "Near miss",
    detail: "PTO guard missing on 6120R, caught during AI-assisted inspection.",
    time: "Today · 6:40 AM",
  },
  {
    type: "Observation",
    detail: "Corn head knife swap completed. Torque values validated by Prairie AI checklist.",
    time: "Yesterday · 3:12 PM",
  },
  {
    type: "Incident",
    detail: "Slip injury in dairy parlor. Root cause: algae film. AI scheduled sanitation rinse for tonight.",
    time: "Mon · 5:25 PM",
  },
];

type RiskTooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

const CustomTooltip = (props: RiskTooltipProps) => {
  const { active, payload, label } = props;
  if (!active || !payload?.length || label === undefined) return null;
  const [{ value }] = payload;
  return (
    <div className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs shadow-sm">
      <p className="font-semibold text-emerald-700">{label}</p>
      <p className="text-slate-600">Risk index: {value}</p>
    </div>
  );
};

export function RiskIntelligence() {
  return (
    <div className="grid gap-4 lg:grid-cols-7 xl:gap-6">
      <Card className="lg:col-span-4 rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-semibold text-emerald-900">
                Risk intelligence
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Prairie AI blends weather, equipment telemetry, and OSHA history
                to predict tomorrow’s hotspots.
              </p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700">
              12 hr forecast
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-60 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#047857" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#065f46" }}
                  domain={[0, 60]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#047857"
                  strokeWidth={2.5}
                  fill="url(#colorRisk)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {riskTrendData.slice(-3).map((item) => (
              <div
                key={item.week}
                className="rounded-2xl border border-emerald-100 bg-white/90 p-3 text-xs shadow-sm"
              >
                <p className="font-semibold text-emerald-700">{item.week}</p>
                <p className="mt-1 text-slate-600">
                  Risk index <span className="font-semibold">{item.risk}</span>
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {item.incidents} incidents logged
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="lg:col-span-3 space-y-4">
        <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-900">
              Prairie insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight) => (
              <div
                key={insight.title}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3"
              >
                <p className="text-xs font-semibold uppercase text-emerald-700">
                  {insight.title}
                </p>
                <p className="mt-1 text-sm text-slate-700">{insight.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-900">
              Incident log review
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-56 px-5 py-4">
              <div className="space-y-3">
                {incidentLog.map((incident) => (
                  <div key={incident.detail} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
                      <span>{incident.type}</span>
                      <span className="text-muted-foreground">
                        {incident.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{incident.detail}</p>
                    <Separator className="bg-emerald-100" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
