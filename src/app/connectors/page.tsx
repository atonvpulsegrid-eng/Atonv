"use client";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Mic, Volume2, Globe, VolumeX, Plus, Settings } from "lucide-react";

type ConnectorStatus = "active" | "error" | "disconnected";
interface Connector { id: string; name: string; icon: string; status: ConnectorStatus; category: string; }

const statusStyles: Record<ConnectorStatus, { dot: string; text: string }> = {
  active: { dot: "bg-green-500", text: "text-green-600 dark:text-green-400" },
  error: { dot: "bg-red-500", text: "text-red-600 dark:text-red-400" },
  disconnected: { dot: "bg-gray-400", text: "text-gray-500 dark:text-gray-400" },
};

const initialConnectors: Connector[] = [
  { id: "openai", name: "OpenAI", icon: "🤖", status: "active", category: "AI Models" },
  { id: "gemini", name: "Google Gemini", icon: "✨", status: "active", category: "AI Models" },
  { id: "groq", name: "Groq", icon: "⚡", status: "active", category: "AI Models" },
  { id: "perplexity", name: "Perplexity", icon: "🔍", status: "disconnected", category: "AI Models" },
  { id: "elevenlabs", name: "ElevenLabs", icon: "🗣️", status: "active", category: "Voice" },
  { id: "mailchimp", name: "Mailchimp", icon: "📧", status: "disconnected", category: "Marketing" },
  { id: "whatsapp", name: "WhatsApp", icon: "💬", status: "error", category: "Communication" },
  { id: "slack", name: "Slack", icon: "💼", status: "active", category: "Communication" },
];

export default function ConnectorsPage() {
  const [connectors, setConnectors] = useState(initialConnectors);
  const [micActive, setMicActive] = useState(false);
  const [speakerMuted, setSpeakerMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [activeTab, setActiveTab] = useState("tab1");

  const toggleConnector = (id: string) => {
    setConnectors(connectors.map((c) => c.id === id ? { ...c, status: c.status === "active" ? "disconnected" : "active" } : c));
  };

  const categories = [...new Set(connectors.map((c) => c.category))];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Universal <span className="gradient-text">Connectors</span></h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your hardware and service connections in one place.</p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 self-start"><Plus className="w-4 h-4" /> Add Connector</button>
          </div>
        </AnimatedSection>

        {/* Hardware Connectors */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-xl font-semibold mb-4">Hardware Controls</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {/* Microphone */}
            <div className="card-glass p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${micActive ? "bg-red-100 dark:bg-red-900/50" : "bg-gray-100 dark:bg-gray-800"}`}>
                    <Mic className={`w-5 h-5 ${micActive ? "text-red-500 animate-pulse" : "text-gray-500"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Microphone</p>
                    <p className={`text-xs ${micActive ? "text-red-500" : "text-gray-400"}`}>{micActive ? "Recording..." : "Idle"}</p>
                  </div>
                </div>
                <button onClick={() => setMicActive(!micActive)} className={`relative w-12 h-6 rounded-full transition-colors ${micActive ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${micActive ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              {micActive && <div className="flex gap-1 items-end h-8">{Array.from({ length: 20 }).map((_, i) => (<div key={i} className="flex-1 bg-red-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.05}s` }} />))}</div>}
            </div>

            {/* Speaker */}
            <div className="card-glass p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {speakerMuted ? <VolumeX className="w-5 h-5 text-gray-500" /> : <Volume2 className="w-5 h-5 text-indigo-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Speaker</p>
                    <p className="text-xs text-gray-400">{speakerMuted ? "Muted" : `Volume: ${volume}%`}</p>
                  </div>
                </div>
                <button onClick={() => setSpeakerMuted(!speakerMuted)} className={`relative w-12 h-6 rounded-full transition-colors ${!speakerMuted ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${!speakerMuted ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} disabled={speakerMuted} className="w-full" />
            </div>

            {/* Browser Tab */}
            <div className="card-glass p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Browser Tabs</p>
                  <p className="text-xs text-gray-400">3 tabs active</p>
                </div>
              </div>
              <div className="flex gap-1">
                {["tab1", "tab2", "tab3"].map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === t ? "gradient-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                    Tab {t.slice(-1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Service Connectors */}
        {categories.map((cat) => (
          <AnimatedSection key={cat} delay={0.2}>
            <h2 className="text-xl font-semibold mb-4 mt-8">{cat}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {connectors.filter((c) => c.category === cat).map((c) => (
                <div key={c.id} className="card-glass p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className={`text-xs capitalize ${statusStyles[c.status].text}`}>{c.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${statusStyles[c.status].dot}`} />
                      <button onClick={() => toggleConnector(c.id)} className={`relative w-10 h-5 rounded-full transition-colors ${c.status === "active" ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${c.status === "active" ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
