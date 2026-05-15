import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2, Globe, Circle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type ConnectionStatus = "active" | "error" | "disconnected";

const statusConfig: Record<ConnectionStatus, { color: string; icon: any; label: string }> = {
  active: { color: "text-green-400", icon: CheckCircle, label: "Active" },
  error: { color: "text-red-400", icon: AlertCircle, label: "Error" },
  disconnected: { color: "text-gray-400", icon: Circle, label: "Disconnected" },
};

const services = [
  { name: "OpenAI", status: "active" as ConnectionStatus },
  { name: "Gemini", status: "active" as ConnectionStatus },
  { name: "Groq", status: "active" as ConnectionStatus },
  { name: "Perplexity", status: "error" as ConnectionStatus },
  { name: "ElevenLabs", status: "active" as ConnectionStatus },
  { name: "Custom API", status: "disconnected" as ConnectionStatus },
];

export default function ConnectorsPage() {
  const [micEnabled, setMicEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(70);
  const [speakerMuted, setSpeakerMuted] = useState(false);
  const [activeBrowserTab, setActiveBrowserTab] = useState("tab1");
  const [connectorStates, setConnectorStates] = useState<Record<string, ConnectionStatus>>(
    services.reduce((acc, service) => ({ ...acc, [service.name]: service.status }), {})
  );

  const handleMicToggle = () => {
    if (!micEnabled) {
      setMicEnabled(true);
      setTimeout(() => setIsRecording(true), 500);
    } else {
      setIsRecording(false);
      setMicEnabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Connectors</h1>
          <p className="text-gray-400">Manage your input/output controls and service connections</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Input/Output Controls */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Microphone Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Mic className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">Microphone</h3>
              </div>
              <Switch checked={micEnabled} onCheckedChange={handleMicToggle} />
            </div>

            {micEnabled && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Status</span>
                    <div className="flex items-center gap-2">
                      {isRecording && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-red-500"
                        />
                      )}
                      <span className="text-sm font-medium">
                        {isRecording ? "Recording..." : "Ready"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-8 items-end">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={isRecording ? { height: [4, 20, 4] } : { height: 4 }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">Microphone is active and ready to capture audio</p>
              </motion.div>
            )}
          </motion.div>

          {/* Speaker Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold">Speaker</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Volume</span>
                  <span className="text-sm font-medium">{speakerMuted ? 0 : speakerVolume}%</span>
                </div>
                <Slider
                  value={[speakerMuted ? 0 : speakerVolume]}
                  onValueChange={(value) => {
                    setSpeakerVolume(value[0]);
                    if (speakerMuted) setSpeakerMuted(false);
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm">Mute</span>
                <Switch checked={speakerMuted} onCheckedChange={setSpeakerMuted} />
              </div>
            </div>
          </motion.div>

          {/* Browser Tab Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-pink-400" />
              <h3 className="text-lg font-semibold">Browser Tab</h3>
            </div>

            <div className="space-y-2">
              {[
                { id: "tab1", label: "Dashboard" },
                { id: "tab2", label: "Analytics" },
                { id: "tab3", label: "Settings" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBrowserTab(tab.id)}
                  className={`w-full px-4 py-2 rounded-lg transition-all ${
                    activeBrowserTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-white/5 border border-white/10 hover:border-white/20 text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Service Connectors Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Service Connectors</h2>
            <p className="text-gray-400">Manage your connected services and APIs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const status = connectorStates[service.name];
              const config = statusConfig[status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>

                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                      status === "active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : status === "error"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}>
                      <Circle className="w-2 h-2 fill-current" />
                      {config.label}
                    </span>
                  </div>

                  {status === "active" && (
                    <div className="text-xs text-gray-400 mb-4">Connected and operational</div>
                  )}
                  {status === "error" && (
                    <div className="text-xs text-red-400 mb-4">Connection failed. Check credentials.</div>
                  )}
                  {status === "disconnected" && (
                    <div className="text-xs text-gray-400 mb-4">Not connected. Click to configure.</div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10"
                    onClick={() => {
                      const newStatus: ConnectionStatus[] = ["active", "error", "disconnected"];
                      const currentIdx = newStatus.indexOf(status);
                      const nextStatus = newStatus[(currentIdx + 1) % newStatus.length];
                      setConnectorStates({
                        ...connectorStates,
                        [service.name]: nextStatus,
                      });
                    }}
                  >
                    {status === "disconnected" ? "Configure" : "Manage"}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
