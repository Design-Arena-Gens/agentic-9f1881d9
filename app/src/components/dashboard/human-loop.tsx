import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ClipboardList, Clock, Edit3 } from "lucide-react";

const reviewQueue = [
  {
    id: "plan-grain-bin",
    title: "Grain bin rescue drill refresh",
    summary:
      "AI drafted drill outline referencing Iowa State Extension checklist. Needs supervisor sign-off.",
    due: "Due today",
    items: [
      "Verify rescue team roster and roles",
      "Confirm harness inspections logged",
      "Schedule walk-through for FFA volunteers",
    ],
  },
  {
    id: "audit-epa",
    title: "EPA Pesticide Use Audit – Site 3",
    summary:
      "Prairie AI compiled chemical inventory, SDS links, and storage photos. Human review required before submission.",
    due: "Due in 2 days",
    items: [
      "Confirm applicator certifications current",
      "Attach irrigation run-off sensor trends",
      "Add notes on pollinator buffer signs",
    ],
  },
  {
    id: "brief-harvest",
    title: "Corn harvest tailgate briefing",
    summary:
      "Auto-generated talk track covering powerline clearance, fatigue breaks, and school bus routes.",
    due: "Ready to send",
    items: [
      "Personalize with crew shout-outs",
      "Add weather-specific PPE reminders",
      "Confirm radio channel assignments",
    ],
  },
];

export function HumanLoopReview() {
  return (
    <Card className="rounded-3xl border-emerald-100 bg-white/80 shadow-sm">
      <CardHeader className="flex flex-col space-y-2 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-emerald-900">
            Human-in-the-loop queue
          </CardTitle>
          <Badge className="bg-emerald-100 text-emerald-700">
            {reviewQueue.length} items
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Review, tweak, and approve AI-generated plans before they roll out to
          the field.
        </p>
      </CardHeader>
      <CardContent className="pb-6">
        <Accordion type="single" collapsible className="space-y-3">
          {reviewQueue.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="rounded-2xl border border-emerald-100 bg-emerald-50/40 px-3"
            >
              <AccordionTrigger className="py-3 text-left text-sm font-semibold text-emerald-900">
                <div className="flex flex-1 flex-col gap-1 pr-4 text-left">
                  {item.title}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-emerald-500" />
                    {item.due}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4 text-sm text-slate-600">
                <p className="rounded-xl bg-white/80 p-3 shadow-sm">
                  {item.summary}
                </p>
                <div className="space-y-2">
                  {item.items.map((task) => (
                    <div
                      key={task}
                      className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-white/80 p-3 text-xs shadow-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-2 bg-emerald-600 text-white">
                    <ClipboardList className="h-4 w-4" />
                    Approve & publish
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Edit3 className="h-4 w-4" />
                    Edit draft
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

