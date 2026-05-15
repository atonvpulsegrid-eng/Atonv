"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { Check } from "lucide-react";

const plans = [
  { name: "Starter", price: "$29", period: "/month", desc: "Perfect for small teams getting started with AI", features: ["5 Team Members", "1,000 AI Queries/mo", "Basic Lead Management", "Email Support", "3 Connectors", "Basic Analytics"], cta: "Start Free Trial", popular: false },
  { name: "Pro", price: "$99", period: "/month", desc: "For growing businesses that need more power", features: ["25 Team Members", "10,000 AI Queries/mo", "Advanced Lead Management", "Priority Support", "All Connectors", "Full Analytics Dashboard", "Custom Reports", "API Access"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For organizations that need full control", features: ["Unlimited Members", "Unlimited AI Queries", "Full CRM Suite", "24/7 Dedicated Support", "All Connectors", "Advanced Analytics", "Custom Integrations", "SLA Guarantee", "On-premise Option", "Dedicated Account Manager"], cta: "Contact Sales", popular: false },
];

export default function PricingPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Choose the plan that fits your business. All plans include a 14-day free trial.</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div className={`card-glass p-8 h-full flex flex-col ${plan.popular ? "ring-2 ring-indigo-500 relative" : ""}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-primary text-white text-xs font-semibold">Most Popular</div>}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-2"><span className="text-5xl font-bold">{plan.price}</span><span className="text-gray-500 dark:text-gray-400 text-lg">{plan.period}</span></div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-500 flex-shrink-0" />{f}</li>))}
                </ul>
                <button className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}>{plan.cta}</button>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.3}>
          <div className="mt-16 text-center card-glass p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Need a custom solution?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">We offer tailored plans for large organizations with specific requirements.</p>
            <button className="btn-primary">Contact Our Sales Team</button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
