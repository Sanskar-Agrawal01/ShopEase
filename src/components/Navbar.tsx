import React from 'react';
import { ShoppingBag, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onSignOut }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="h-8 w-8 mr-2 text-primary" />
              <h1 className="text-2xl font-bold text-primary">
                ShopEase
              </h1>
            </motion.div>
          </div>
          
          <nav className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'submit' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
              onClick={() => setActiveTab('submit')}
            >
              Submit Product
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'products' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
              onClick={() => setActiveTab('products')}
            >
              My Products
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors duration-200 flex items-center gap-2"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;