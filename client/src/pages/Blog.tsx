import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Blog</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <p className="text-gray-400 text-lg">Latest insights and updates</p>
        </motion.div>
      </div>
    </div>
  );
}
