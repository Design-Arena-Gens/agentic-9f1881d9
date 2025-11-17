import { ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCheck,
  BookOpenCheck,
  BotMessageSquare,
  ClipboardCheck,
  ClipboardPen,
  Factory,
  Home,
  Menu,
  Settings,
  Tractor,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "AI Planner", icon: BotMessageSquare, href: "/planner" },
  { label: "Compliance", icon: ClipboardCheck, href: "/compliance" },
  { label: "Audits", icon: ClipboardPen, href: "/audits" },
  { label: "Hazards", icon: BadgeCheck, href: "/hazards" },
  { label: "Crews", icon: Users, href: "/crews" },
  { label: "Equipment", icon: Tractor, href: "/equipment" },
  { label: "Knowledge Base", icon: BookOpenCheck, href: "/knowledge" },
  { label: "Sites", icon: Factory, href: "/sites" },
];

type NavLinksProps = {
  currentPath: string;
  onNavigate?: () => void;
};

function NavLinks({ currentPath, onNavigate }: NavLinksProps) {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-emerald-600 text-white shadow"
                : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-700"
            )}
            onClick={onNavigate}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

type SiteSwitcherProps = {
  sites: { id: string; name: string }[];
  activeSiteId: string;
  onSiteChange: (siteId: string) => void;
  onSelect?: () => void;
};

function SiteSwitcher({
  sites,
  activeSiteId,
  onSiteChange,
  onSelect,
}: SiteSwitcherProps) {
  const activeSite = useMemo(
    () => sites.find((site) => site.id === activeSiteId),
    [activeSiteId, sites]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between rounded-lg border border-emerald-100 bg-white text-left text-sm font-medium text-emerald-900 shadow-sm hover:bg-emerald-50"
        >
          <div>
            <p className="text-sm font-semibold leading-tight">
              {activeSite?.name ?? "Select a site"}
            </p>
            <p className="text-xs text-muted-foreground">
              Manage fields, crews, and safety plans
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {sites.map((site) => (
          <DropdownMenuItem
            key={site.id}
            onClick={() => {
              onSiteChange(site.id);
              onSelect?.();
            }}
          >
            {site.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AppShellProps = {
  children: ReactNode;
  sites: { id: string; name: string }[];
  activeSiteId: string;
  onSiteChange: (siteId: string) => void;
};

export function AppShell({
  children,
  sites,
  activeSiteId,
  onSiteChange,
}: AppShellProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currentPath = useMemo(() => {
    const asPath = router.asPath;
    if (router.pathname === "/[section]") {
      return asPath.split("?")[0];
    }
    return router.pathname.split("?")[0];
  }, [router.asPath, router.pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <aside className="hidden w-64 border-r border-emerald-100 bg-white/80 pt-6 pl-6 pr-4 lg:block">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-emerald-600/10 p-2 text-emerald-700">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-900">
              PrairieSafe EHS
            </p>
            <p className="text-xs text-muted-foreground">
              Iowa farm safety AI
            </p>
          </div>
        </div>
        <div className="my-6">
          <SiteSwitcher
            sites={sites}
            activeSiteId={activeSiteId}
            onSiteChange={onSiteChange}
          />
        </div>
        <NavLinks currentPath={currentPath} />
        <div className="mt-auto flex flex-col gap-3 pb-6 pt-8">
          <Separator />
          <div className="rounded-lg bg-emerald-600/10 p-4 text-sm text-emerald-800">
            <p className="font-semibold">Need a hand?</p>
            <p className="text-xs text-emerald-700">
              Tap the AI assistant for custom safety plans, reports, and audits
              tuned for Iowa regulations.
            </p>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center gap-4 px-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="lg:hidden"
                  aria-label="Toggle navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex items-center gap-3 border-b border-emerald-100 px-6 pb-5 pt-6">
                  <div className="rounded-full bg-emerald-600/10 p-2 text-emerald-700">
                    <Factory className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      PrairieSafe EHS
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Iowa farm safety AI
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <SiteSwitcher
                    sites={sites}
                    activeSiteId={activeSiteId}
                    onSiteChange={onSiteChange}
                    onSelect={() => setIsSheetOpen(false)}
                  />
                </div>
                <div className="space-y-4 px-4 pb-8">
                  <NavLinks
                    currentPath={currentPath}
                    onNavigate={() => setIsSheetOpen(false)}
                  />
                </div>
                <SheetClose className="sr-only" />
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex lg:flex-1">
              <SiteSwitcher
                sites={sites}
                activeSiteId={activeSiteId}
                onSiteChange={onSiteChange}
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 sm:flex">
                <BotMessageSquare className="h-3.5 w-3.5" />
                AI-first workflow
              </div>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 rounded-full border border-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Human-in-the-loop
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-8 pt-6 sm:px-6 lg:px-10 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
