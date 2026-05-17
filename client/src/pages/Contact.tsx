import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Zap } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "support@atonv.ai",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Available 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "San Francisco, CA",
    description: "Visit us in person",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all text-center"
              >
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 w-fit mx-auto mb-6">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-blue-400 font-medium mb-2">{method.value}</p>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={6}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-3 font-semibold"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 text-lg">What's your response time?</h3>
              <p className="text-gray-400">We typically respond to inquiries within 24 hours during business days.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Do you offer enterprise support?</h3>
              <p className="text-gray-400">Yes! Enterprise customers get dedicated support and custom SLAs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Can I schedule a demo?</h3>
              <p className="text-gray-400">Absolutely! Contact our sales team to schedule a personalized demo.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Do you have a community forum?</h3>
              <p className="text-gray-400">Yes, join our community to connect with other users and get help.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
