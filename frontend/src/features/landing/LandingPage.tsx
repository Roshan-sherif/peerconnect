import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Users, MessageSquare, MonitorPlay, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={itemVariants} className="mb-6">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  ✨ PeerConnect 2.0 is now live
                </Badge>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                Code Together. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Learn Together.
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Real-time collaborative coding, voice, video, and chat for students, developers, and teams. Built for seamless remote pair programming.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Get Started for Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="#demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-white hover:bg-slate-50">
                    Watch Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Image / Editor Mockup */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden relative z-0">
              <div className="flex items-center px-4 py-3 border-b border-slate-200/60 bg-slate-100/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto text-xs font-medium text-slate-500 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> main.py
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
                <div className="col-span-2 space-y-4 font-mono text-sm">
                  <div className="flex"><span className="text-slate-400 w-8">1</span><span className="text-primary font-medium">def</span> <span className="text-blue-600">binary_search</span>(arr, target):</div>
                  <div className="flex"><span className="text-slate-400 w-8">2</span><span className="ml-4 text-slate-600">left, right = 0, <span className="text-amber-600">len</span>(arr) - 1</span></div>
                  <div className="flex"><span className="text-slate-400 w-8">3</span><span className="ml-4"><span className="text-primary font-medium">while</span> left &lt;= right:</span></div>
                  <div className="flex"><span className="text-slate-400 w-8">4</span><span className="ml-8 text-slate-600">mid = (left + right) // 2</span></div>
                  <div className="flex"><span className="text-slate-400 w-8">5</span><span className="ml-8"><span className="text-primary font-medium">if</span> arr[mid] == target:</span></div>
                  <div className="flex"><span className="text-slate-400 w-8">6</span><span className="ml-12"><span className="text-primary font-medium">return</span> mid</span></div>
                  <div className="flex"><span className="text-slate-400 w-8">7</span><span className="ml-8 text-primary font-medium">elif</span> <span className="text-slate-600">arr[mid] &lt; target:</span></div>
                  <div className="flex"><span className="text-slate-400 w-8">8</span><span className="ml-12 text-slate-600">left = mid + 1</span></div>
                </div>
                <div className="hidden md:flex flex-col gap-4 border-l border-slate-200/60 pl-6">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Participants</h4>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=1" alt="User" className="w-8 h-8 rounded-full ring-2 ring-white" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium">Alex (You)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=2" alt="User" className="w-8 h-8 rounded-full ring-2 ring-white" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium">Sarah <span className="text-xs text-slate-400 ml-1">Typing...</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to collaborate</h2>
            <p className="text-lg text-slate-600">A complete toolset designed for pair programming, technical interviews, and team collaboration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Code2 className="w-6 h-6 text-primary" />,
                title: "Real-time Code Editor",
                description: "Collaborative code editing with syntax highlighting, auto-complete, and multiple cursors."
              },
              {
                icon: <MonitorPlay className="w-6 h-6 text-primary" />,
                title: "Video & Voice",
                description: "High quality video calls and screen sharing instantly inside your coding room."
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-primary" />,
                title: "Real-time Chat",
                description: "Instant messaging alongside your code to share links, snippets, and thoughts."
              },
              {
                icon: <Zap className="w-6 h-6 text-primary" />,
                title: "Run & Compile",
                description: "Execute your code in multiple languages directly in the browser and see the output."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / CTA Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ready to start coding together?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of developers and students using PeerConnect to improve their skills and collaborate faster.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg h-14 px-10 rounded-full shadow-lg shadow-primary/20">
              Create your free account
            </Button>
          </Link>
          <p className="mt-4 text-sm text-slate-500">No credit card required. Free forever plan available.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
