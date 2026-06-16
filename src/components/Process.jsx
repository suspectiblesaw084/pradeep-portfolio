import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "Define the goal, audience, brand mood, and visual direction."
  },
  {
    num: "02",
    title: "Explore",
    desc: "Build references, moodboards, rough layouts, and visual possibilities."
  },
  {
    num: "03",
    title: "Design",
    desc: "Create polished visuals with strong hierarchy, composition, and typography."
  },
  {
    num: "04",
    title: "Refine",
    desc: "Improve spacing, color, details, consistency, and final presentation."
  },
  {
    num: "05",
    title: "Deliver",
    desc: "Prepare clean final assets for social, print, web, video, or presentation use."
  }
];

export default function Process() {
  return (
    <section className="py-24 md:py-32 border-b border-neutral-900 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-3">
            WORKFLOW
          </span>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            Process
          </h2>
        </div>

        {/* Steps Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-b border-neutral-900 divide-y md:divide-y-0 md:divide-x divide-neutral-900">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-6 lg:p-8 flex flex-col gap-6 bg-transparent hover:bg-neutral-950/40 transition-colors duration-300 group"
            >
              {/* Step number */}
              <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors duration-300">
                {step.num}
              </span>

              {/* Step info */}
              <div className="flex flex-col gap-2 mt-4 md:mt-8">
                <h3 className="text-lg font-bold text-white tracking-tight font-display">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
