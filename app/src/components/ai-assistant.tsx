import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Loader2,
  Mic,
  Pause,
  Send,
  Sparkles,
  User,
  Volume2,
} from "lucide-react";

type MessageRole = "assistant" | "user" | "system";

type Message = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
};

const cannedPlaybooks = [
  "Draft a confined space entry plan for the grain elevator.",
  "Review pesticide storage compliance for Site 3.",
  "Summarize incidents from the past 30 days and suggest mitigations.",
  "Create today’s safety briefing for the planting crew.",
  "Audit OSHA recordkeeping for livestock operations.",
];

function createMessage(role: MessageRole, content: string): Message {
  return {
    id: Math.random().toString(36).slice(2),
    role,
    content,
    createdAt: new Date(),
  };
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    createMessage(
      "assistant",
      "Morning! I’ve reviewed your overnight sensor data—no new hazards flagged. Would you like me to prep an EHS briefing for the corn harvest crew?"
    ),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    [messages]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const speechConstructor = (
      (window as Window & typeof globalThis).SpeechRecognition ??
      (window as Window & {
        webkitSpeechRecognition?: { new (): SpeechRecognition };
      }).webkitSpeechRecognition
    ) as (new () => SpeechRecognition) | undefined;

    if (!speechConstructor) return;

    recognitionRef.current = new speechConstructor();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const handleSend = async (message?: string) => {
    const content = message ?? input.trim();
    if (!content) return;
    const newUserMessage = createMessage("user", content);
    setInput("");
    setMessages((prev) => [...prev, newUserMessage]);
    setIsSending(true);

    // Simulate AI reply to keep focus on UI/UX.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const aiResponse = createMessage(
      "assistant",
      "Got it. I’ll pull in OSHA 1928 requirements, Iowa DNR guidance, and last month’s field notes. You’ll get a ready-to-review plan in a few minutes."
    );

    setMessages((prev) => [...prev, aiResponse]);
    setIsSending(false);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white/80 shadow-sm backdrop-blur">
      <div className="border-b border-emerald-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              Prairie AI Steward
            </div>
            <p className="text-xs text-muted-foreground">
              Ask for incident reports, audit prep, hazard analysis, or daily
              safety briefings.
            </p>
          </div>
          <Badge variant="outline" className="border-emerald-200 text-emerald-700">
            GPT-powered
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="chat" className="flex h-full flex-1 flex-col">
        <TabsList className="mx-6 mt-4 w-auto self-start rounded-full bg-emerald-50">
          <TabsTrigger value="chat" className="rounded-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Messages
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="rounded-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Playbooks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex h-full flex-1 flex-col">
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {sortedMessages.map((message) => (
                <div
                  key={message.id}
                  className={cnMessageWrapper(message.role)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cnAvatar(message.role)}>
                      {message.role === "assistant" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 rounded-2xl bg-white/90 p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                          {message.role === "assistant" ? "Prairie AI" : "You"}
                        </p>
                        <span className="text-[10px] uppercase text-emerald-500">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex items-center gap-3 rounded-2xl bg-white/90 p-4 text-sm text-muted-foreground shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                  Drafting response tailored to Iowa regs…
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="space-y-4 border-t border-emerald-100 bg-white/70 px-6 py-4 backdrop-blur">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tell Prairie AI what you need—incident log, safety plan, training checklist…"
              className="min-h-[90px] resize-none rounded-2xl border-emerald-200 bg-emerald-50/40"
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Button
                  type="button"
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  className={isListening ? "bg-emerald-600 text-white" : ""}
                  onClick={toggleListening}
                >
                  {isListening ? (
                    <>
                      <Pause className="mr-2 h-3.5 w-3.5" />
                      Listening
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-3.5 w-3.5" />
                      Voice input
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => handleSend()} disabled={isSending}>
                Send
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="playbooks" className="flex-1">
          <ScrollArea className="h-64 px-6 py-4">
            <div className="grid gap-3">
              {cannedPlaybooks.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50/60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cnMessageWrapper(role: MessageRole) {
  return role === "assistant"
    ? "flex justify-start"
    : role === "user"
    ? "flex justify-end text-right"
    : "flex justify-center";
}

function cnAvatar(role: MessageRole) {
  return role === "assistant"
    ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow"
    : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 shadow-sm";
}
