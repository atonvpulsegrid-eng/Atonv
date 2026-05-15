"use client";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.</p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              {[
                { icon: Mail, title: "Email", info: "hello@atonv.com", sub: "We reply within 24 hours" },
                { icon: Phone, title: "Phone", info: "+1 (555) 123-4567", sub: "Mon-Fri, 9am-6pm EST" },
                { icon: MapPin, title: "Office", info: "San Francisco, CA", sub: "By appointment only" },
              ].map((c) => (
                <div key={c.title} className="card-glass p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{c.info}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card-glass p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@company.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="How can we help?" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Tell us more about your needs..." required />
              </div>
              <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                {sent ? "Message Sent! ✓" : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
