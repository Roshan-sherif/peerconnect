import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1.5 rounded-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                PeerConnect
              </span>
            </Link>
            <p className="text-slate-500 text-sm mb-6">
              Learn Together. Code Together. Real-time collaborative coding platform for students and teams.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">X</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="#use-cases" className="hover:text-primary transition-colors">Use Cases</Link></li>
              <li><Link to="#changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="#blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="#docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="#community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="#help" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="#cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PeerConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
