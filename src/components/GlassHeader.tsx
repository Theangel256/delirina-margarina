import { useState } from "react";
import { personalInfo } from "@/lib/data";
import ThemeToggle from "./ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "galeria", label: "Imágenes", icon: "📷" },
];

export default function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 dark:bg-background/40 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href={import.meta.env.BASE_URL}
          className="text-lg font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {personalInfo.name}
        </motion.a>

        {/* Spacer to push nav to the right */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map(({ id, label, icon }, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="text-foreground/60 hover:text-foreground/80 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {icon} {label}
              </motion.a>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      id="mobile-menu"
      className="md:hidden px-4 py-4 border-t border-border/10 bg-background/90 dark:bg-background/40 origin-top"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.25 }}
      style={{ willChange: "transform" }}
    >
      <nav className="flex flex-col space-y-4 text-sm font-medium">
        {navItems.map(({ id, label, icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className="text-foreground/60 hover:text-foreground/80 transition-colors py-2"
            onClick={toggleMenu}
          >
            {icon} {label}
          </a>
        ))}
      </nav>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  );
}
