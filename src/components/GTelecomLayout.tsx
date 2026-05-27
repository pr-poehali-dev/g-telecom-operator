import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "@/components/GTelecomData";

export function NetworkBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-700" />
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="30%" y2="45%" stroke="#00c2ff" strokeWidth="0.5" />
        <line x1="30%" y1="45%" x2="55%" y2="25%" stroke="#00c2ff" strokeWidth="0.5" />
        <line x1="55%" y1="25%" x2="80%" y2="60%" stroke="#00c2ff" strokeWidth="0.5" />
        <line x1="80%" y1="60%" x2="65%" y2="80%" stroke="#00c2ff" strokeWidth="0.5" />
        <line x1="30%" y1="45%" x2="65%" y2="80%" stroke="#00c2ff" strokeWidth="0.5" />
        <line x1="15%" y1="70%" x2="30%" y2="45%" stroke="#00c2ff" strokeWidth="0.5" />
        <circle cx="10%" cy="20%" r="3" fill="#00c2ff" opacity="0.8" />
        <circle cx="30%" cy="45%" r="3" fill="#00c2ff" opacity="0.8" />
        <circle cx="55%" cy="25%" r="3" fill="#00c2ff" opacity="0.8" />
        <circle cx="80%" cy="60%" r="3" fill="#00c2ff" opacity="0.8" />
        <circle cx="65%" cy="80%" r="3" fill="#00c2ff" opacity="0.8" />
        <circle cx="15%" cy="70%" r="3" fill="#00c2ff" opacity="0.8" />
      </svg>
    </div>
  );
}

export function NavBar({ activeSection, onNav, onCabinet }: { activeSection: string; onNav: (id: string) => void; onCabinet: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-cyan-500/10 py-3" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNav("hero")}>
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center">
              <span className="font-bold text-black text-lg" style={{ fontFamily: "Oswald" }}>G</span>
            </div>
            <div className="absolute -inset-1 rounded-lg bg-cyan-500/20 blur-sm animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: "Oswald" }}>G-TELECOM</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className={`text-sm font-medium transition-all duration-200 hover:text-cyan-400 ${activeSection === link.id ? "text-cyan-400" : "text-white/60"}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCabinet}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm font-medium text-cyan-400 border border-cyan-500/20"
          >
            <Icon name="User" size={15} />
            Личный кабинет
          </button>
          <button className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors glow-cyan-sm">
            Подключиться
          </button>
          <button className="lg:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden glass border-t border-cyan-500/10 mt-2">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => { onNav(link.id); setMenuOpen(false); }}
                className="text-left text-white/70 hover:text-cyan-400 transition-colors py-1"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => { onCabinet(); setMenuOpen(false); }} className="text-left text-cyan-400 py-1 flex items-center gap-2">
              <Icon name="User" size={15} /> Личный кабинет
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer className="py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <span className="font-bold text-black" style={{ fontFamily: "Oswald" }}>G</span>
              </div>
              <span className="text-white font-bold tracking-wider" style={{ fontFamily: "Oswald" }}>G-TELECOM</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">Связь нового поколения для каждого</p>
          </div>
          {[
            { title: "Услуги", links: ["Интернет", "Мобильная связь", "Цифровое ТВ", "Бизнес-решения"] },
            { title: "Компания", links: ["О компании", "Новости", "Карьера", "Контакты"] },
            { title: "Поддержка", links: ["FAQ", "Онлайн-чат", "Личный кабинет", "Техническая поддержка"] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-white font-semibold mb-4 text-sm">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <button className="text-white/30 text-sm hover:text-cyan-400 transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-white/20 text-xs">© 2026 G-Telecom. Все права защищены.</p>
          <div className="flex gap-5">
            {["Политика конфиденциальности", "Пользовательское соглашение", "Cookie"].map((link, i) => (
              <button key={i} className="text-white/20 text-xs hover:text-white/50 transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
