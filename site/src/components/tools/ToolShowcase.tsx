import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ToolShowcaseProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: Feature[];
  href?: string;
  reverse?: boolean;
  imageUrl?: string;
}

export default function ToolShowcase({
  id,
  name,
  tagline,
  description,
  features,
  href,
  reverse = false,
  imageUrl,
}: ToolShowcaseProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-12 items-center`}
    >
      {/* Image/Icon */}
      <ScrollReveal
        animation={reverse ? 'slideInRight' : 'slideInLeft'}
        className="flex-1"
      >
        <div className="relative aspect-square max-w-md mx-auto">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                <span className="text-8xl font-bold text-white opacity-90">{name[0]}</span>
              </div>
            )}
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Content */}
      <ScrollReveal
        animation={reverse ? 'slideInLeft' : 'slideInRight'}
        className="flex-1"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {name}
            </h2>
            <p className="text-xl text-accent mb-4">{tagline}</p>
            <p className="text-text-secondary text-lg">{description}</p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">核心功能：</h3>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={href || `/tools/${id}`}
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all group"
          >
            <span>深入了解</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
