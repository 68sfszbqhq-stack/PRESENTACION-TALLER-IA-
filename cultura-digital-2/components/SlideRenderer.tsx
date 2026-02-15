import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SlideData, SlideType, Tool } from '../types.ts';
import {
  Layout,
  Edit3,
  MessageSquare,
  Zap,
  CheckCircle,
  Target,
  Users,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  X,
  Square,
  CheckSquare
} from 'lucide-react';

interface SlideRendererProps {
  data: SlideData;
}

const IconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-8 h-8 text-brand-primary" />,
  Edit3: <Edit3 className="w-8 h-8 text-brand-primary" />,
  MessageSquare: <MessageSquare className="w-8 h-8 text-brand-primary" />,
  Zap: <Zap className="w-8 h-8 text-brand-primary" />,
};

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4 } }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ data }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [checkedTools, setCheckedTools] = useState<Record<string, boolean>>({});

  const toggleCheck = (toolName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedTools(prev => ({ ...prev, [toolName]: !prev[toolName] }));
  };

  const openTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const closeTool = () => {
    setSelectedTool(null);
  };

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-brand-dark/80 z-10" />
              <img src={data.image} alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="z-10 max-w-4xl">
              <motion.h2
                variants={childVariants}
                className="text-brand-primary text-xl font-bold tracking-widest uppercase mb-4"
              >
                {data.title}
              </motion.h2>
              <motion.h1
                variants={childVariants}
                className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
              >
                {data.subtitle}
              </motion.h1>
              <motion.div variants={childVariants} className="h-1 w-24 bg-brand-accent mx-auto mb-6" />
              <motion.p variants={childVariants} className="text-xl text-gray-300">
                {data.footer}
              </motion.p>
            </div>
          </div>
        );

      case SlideType.SPLIT_IMAGE_RIGHT:
        return (
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 flex flex-col justify-center p-12 md:p-16 bg-brand-dark">
              <motion.h2 variants={childVariants} className="text-4xl font-serif font-bold text-white mb-2">{data.title}</motion.h2>
              <motion.h3 variants={childVariants} className="text-xl text-brand-primary mb-6">{data.subtitle}</motion.h3>
              <motion.p variants={childVariants} className="text-lg text-gray-300 mb-8 leading-relaxed">{data.content}</motion.p>
              {data.bullets && (
                <ul className="space-y-4">
                  {data.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      variants={childVariants}
                      className="flex items-start text-gray-300"
                    >
                      <CheckCircle className="w-6 h-6 text-brand-accent mr-3 shrink-0" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex-1 h-64 md:h-auto relative">
              <img src={data.image} alt="Visual" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent opacity-50 md:opacity-100 md:w-24" />
            </div>
          </div>
        );

      case SlideType.SPLIT_IMAGE_LEFT:
        return (
          <div className="flex flex-col md:flex-row-reverse h-full">
            <div className="flex-1 flex flex-col justify-center p-12 md:p-16 bg-brand-dark">
              <motion.h2 variants={childVariants} className="text-4xl font-serif font-bold text-white mb-2">{data.title}</motion.h2>
              <motion.h3 variants={childVariants} className="text-xl text-brand-accent mb-6">{data.subtitle}</motion.h3>
              <motion.p variants={childVariants} className="text-lg text-gray-300 mb-8 leading-relaxed">{data.content}</motion.p>
              {data.bullets && (
                <ul className="space-y-4">
                  {data.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      variants={childVariants}
                      className="flex items-start text-gray-300"
                    >
                      <Target className="w-6 h-6 text-brand-primary mr-3 shrink-0" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex-1 h-64 md:h-auto relative">
              <img src={data.image} alt="Visual" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-brand-dark to-transparent opacity-50 md:opacity-100 md:w-24 left-auto right-0" />
            </div>
          </div>
        );

      case SlideType.BIG_QUOTE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12 relative">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-brand-dark/90 z-10" />
              <img src={data.image} alt="Background" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="z-10 max-w-5xl">
              <motion.div variants={childVariants} className="mb-8">
                <Users className="w-16 h-16 text-brand-accent mx-auto opacity-80" />
              </motion.div>
              <motion.h2 variants={childVariants} className="text-2xl text-gray-400 mb-6 uppercase tracking-widest">{data.title}</motion.h2>
              <motion.blockquote variants={childVariants} className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-8">
                {data.highlightText}
              </motion.blockquote>
              <motion.p variants={childVariants} className="text-xl text-brand-primary font-medium">
                — {data.subtitle}
              </motion.p>
              <motion.p variants={childVariants} className="mt-8 text-gray-400 max-w-2xl mx-auto">
                {data.content}
              </motion.p>
            </div>
          </div>
        );

      case SlideType.GRID_CARDS:
        return (
          <div className="flex flex-col h-full bg-brand-dark p-8 md:p-16 relative">
            <div className="mb-8">
              <motion.h2 variants={childVariants} className="text-4xl font-serif font-bold text-white mb-2">{data.title}</motion.h2>
              <motion.p variants={childVariants} className="text-xl text-gray-400">{data.subtitle}</motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full mx-auto pb-24 overflow-y-auto">
              {data.cards?.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={childVariants}
                  className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col space-y-4 hover:border-brand-primary/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-brand-primary">
                      {IconMap[card.icon]}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{card.title}</h4>
                      <p className="text-sm text-gray-400">{card.description}</p>
                    </div>
                  </div>

                  {/* Tool List */}
                  {card.tools && (
                    <div className="space-y-2 mt-4">
                      {card.tools.map((tool, tIdx) => (
                        <div
                          key={tIdx}
                          onClick={() => openTool(tool)}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-700 cursor-pointer group transition-colors border border-transparent hover:border-slate-600"
                        >
                          <div className="flex items-center space-x-3">
                            <div onClick={(e) => toggleCheck(tool.name, e)} className="text-gray-400 hover:text-brand-accent transition-colors">
                              {checkedTools[tool.name] ?
                                <CheckSquare className="w-5 h-5 text-brand-accent" /> :
                                <Square className="w-5 h-5" />
                              }
                            </div>
                            <span className={`font-medium ${checkedTools[tool.name] ? 'text-brand-accent line-through opacity-70' : 'text-slate-200'}`}>
                              {tool.name}
                            </span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Tool Detail Modal */}
            <AnimatePresence>
              {selectedTool && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                  onClick={closeTool}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative"
                  >
                    <button
                      onClick={closeTool}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-brand-primary/20 rounded-xl">
                        <ExternalLink className="w-8 h-8 text-brand-primary" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{selectedTool.name}</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">Descripción</h4>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {selectedTool.explanation}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">Beneficios Clave</h4>
                        <ul className="grid gap-3">
                          {selectedTool.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start text-gray-300">
                              <CheckCircle className="w-5 h-5 text-brand-accent mr-3 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => window.open(selectedTool.url, '_blank')}
                          className="bg-brand-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg hover:shadow-brand-primary/25"
                        >
                          Visitar Sitio Web <ExternalLink size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case SlideType.STATISTIC:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12 bg-gradient-to-br from-brand-dark to-slate-900">
            <motion.div variants={childVariants} className="mb-8">
              <TrendingUp className="w-20 h-20 text-brand-primary" />
            </motion.div>
            <motion.h2 variants={childVariants} className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tighter">
              {data.highlightText}
            </motion.h2>
            <motion.h3 variants={childVariants} className="text-2xl md:text-3xl text-brand-accent mb-8 font-serif">
              {data.subtitle}
            </motion.h3>
            <motion.p variants={childVariants} className="text-xl text-gray-400 max-w-3xl">
              {data.content}
            </motion.p>
            <motion.div variants={childVariants} className="mt-12 p-4 border-t border-slate-700 text-sm text-gray-500">
              {data.footer}
            </motion.div>
          </div>
        );

      case SlideType.CALL_TO_ACTION:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8 bg-brand-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <motion.div variants={childVariants} className="z-10 max-w-4xl">
              <h2 className="text-2xl opacity-90 mb-4">{data.title}</h2>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">{data.highlightText}</h1>
              <p className="text-2xl md:text-3xl mb-12 font-serif italic opacity-90">{data.content}</p>
              <button className="bg-white text-brand-primary px-10 py-4 rounded-full text-xl font-bold hover:bg-brand-dark hover:text-white transition-all flex items-center mx-auto gap-3 shadow-xl">
                Comenzar Proyecto <ArrowRight />
              </button>
              <p className="mt-12 text-sm opacity-60">{data.footer}</p>
            </motion.div>
          </div>
        );

      default: // Bullet Points fallback
        return (
          <div className="flex flex-col h-full bg-brand-dark p-12 md:p-24 justify-center">
            <motion.h2 variants={childVariants} className="text-5xl font-serif font-bold text-white mb-4">{data.title}</motion.h2>
            <motion.h3 variants={childVariants} className="text-2xl text-brand-primary mb-12">{data.subtitle}</motion.h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.p variants={childVariants} className="text-xl text-gray-300 leading-relaxed">
                {data.content}
              </motion.p>
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <ul className="space-y-6">
                  {data.bullets?.map((bullet, idx) => (
                    <motion.li key={idx} variants={childVariants} className="flex items-center text-lg text-white">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mr-4" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full"
    >
      {renderContent()}
    </motion.div>
  );
};