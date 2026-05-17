import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for small teams and startups",
    features: [
      "Up to 10k API calls/month",
      "Basic analytics dashboard",
      "Email support",
      "2 team members",
      "Standard API rate limits",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Up to 100k API calls/month",
      "Advanced analytics & reporting",
      "Priority email & chat support",
      "10 team members",
      "Higher API rate limits",
      "Custom integrations",
      "Dedicated account manager",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations",
    features: [
      "Unlimited API calls",
      "Custom analytics & dashboards",
      "24/7 phone & email support",
      "Unlimited team members",
      "Enterprise API rate limits",
      "Custom integrations",
      "Dedicated infrastructure",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business. Scale as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/50 scale-105"
                  : "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              <Button
                className={`w-full mb-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    : "bg-white/10 border border-white/20 hover:border-white/40"
                }`}
              >
                Get Started
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer discounts for annual billing?</h3>
              <p className="text-gray-400">Yes! Get 20% off when you pay annually. Contact our sales team for enterprise discounts.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, bank transfers, and wire transfers for enterprise customers.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-400">Yes! Start with our free tier and get 1,000 API calls to test the platform.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
