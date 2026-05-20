import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/06ca4f87-fe66-46f3-81b5-95ccb14b3166/files/397986b6-78df-479b-aa03-e5732996ca51.jpg";
const MAP_IMAGE = "https://cdn.poehali.dev/projects/06ca4f87-fe66-46f3-81b5-95ccb14b3166/files/abf630aa-9ac1-4a1a-8f0c-f585fe2ba1aa.jpg";

const NAV_LINKS = [
  { id: "services", label: "Услуги" },
  { id: "tariffs", label: "Тарифы" },
  { id: "coverage", label: "Покрытие" },
  { id: "blog", label: "Блог" },
  { id: "support", label: "Поддержка" },
  { id: "contacts", label: "Контакты" },
  { id: "about", label: "О компании" },
];

const SERVICES = [
  { icon: "Wifi", title: "Интернет", desc: "Высокоскоростной доступ до 10 Гбит/с для дома и бизнеса", tag: "до 10 Гбит/с" },
  { icon: "Smartphone", title: "Мобильная связь", desc: "5G-покрытие в 85 регионах России, безлимитные звонки", tag: "5G" },
  { icon: "Tv", title: "Цифровое ТВ", desc: "Более 300 каналов в HD и 4K качестве с записью передач", tag: "300+ каналов" },
  { icon: "Shield", title: "Кибербезопасность", desc: "Защита корпоративных сетей, DDoS-защита и мониторинг 24/7", tag: "24/7" },
  { icon: "Cloud", title: "Облачные решения", desc: "Гибкая инфраструктура для бизнеса любого масштаба", tag: "Enterprise" },
  { icon: "Network", title: "VPN & MPLS", desc: "Безопасные корпоративные сети между офисами по всей стране", tag: "Бизнес" },
];

const TARIFFS = [
  {
    name: "Старт",
    price: "490",
    speed: "200 Мбит/с",
    features: ["Безлимитный интернет", "100 ТВ-каналов", "Поддержка 8/5"],
    popular: false,
  },
  {
    name: "Оптимальный",
    price: "890",
    speed: "1 Гбит/с",
    features: ["Безлимитный интернет", "200 ТВ-каналов", "Мобильная связь 20 ГБ", "Поддержка 24/7"],
    popular: true,
  },
  {
    name: "Максимум",
    price: "1 490",
    speed: "10 Гбит/с",
    features: ["Безлимитный интернет", "300+ ТВ-каналов", "Мобильная связь 100 ГБ", "5G", "Выделенный менеджер"],
    popular: false,
  },
];

const STATS = [
  { value: "12М+", label: "Абонентов" },
  { value: "85", label: "Регионов" },
  { value: "99.9%", label: "Uptime сети" },
  { value: "24 года", label: "На рынке" },
];

const BLOG_POSTS = [
  { date: "15 мая 2026", tag: "Технологии", title: "G-Telecom запускает 5G в 12 новых городах", excerpt: "Сеть пятого поколения теперь доступна в Казани, Екатеринбурге, Новосибирске и ещё 9 городах." },
  { date: "8 мая 2026", tag: "Бизнес", title: "Новые корпоративные тарифы для малого бизнеса", excerpt: "Специальные условия подключения для компаний от 5 до 50 сотрудников — экономия до 40%." },
  { date: "1 мая 2026", tag: "Продукт", title: "Обновление личного кабинета: новые возможности", excerpt: "Управление несколькими устройствами, детализация расходов и умная аналитика потребления." },
];

const FAQ = [
  { q: "Как подключиться к G-Telecom?", a: "Оставьте заявку на сайте или позвоните по номеру 8-800-555-0100. Наш специалист приедет в удобное время и подключит вас бесплатно." },
  { q: "Можно ли сохранить номер телефона при переходе?", a: "Да, мы поддерживаем MNP (мобильную переносимость номера). Процедура займёт не более 8 рабочих дней и абсолютно бесплатна." },
  { q: "Какие документы нужны для подключения?", a: "Для физических лиц достаточно паспорта. Для юридических лиц — реквизиты компании и доверенность представителя." },
  { q: "Есть ли покрытие в моём районе?", a: "Воспользуйтесь интерактивной картой покрытия на нашем сайте или позвоните в службу поддержки для уточнения." },
];

const CABINET_USER = {
  name: "Алексей Петров",
  phone: "+7 (916) 234-56-78",
  tariff: "Оптимальный",
  balance: "2 340",
  nextPayment: "1 июня 2026",
  internet: { used: 45, total: 100 },
  calls: { used: 120, total: 300 },
  sms: { used: 34, total: 100 },
};

function NetworkBackground() {
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

function NavBar({ activeSection, onNav, onCabinet }: { activeSection: string; onNav: (id: string) => void; onCabinet: () => void }) {
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

function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="bg" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 animate-fade-up">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Связь нового поколения · 5G уже доступен
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 animate-fade-up delay-100" style={{ fontFamily: "Oswald", letterSpacing: "-0.02em" }}>
          МИР БЕЗ<br />
          <span className="gradient-text text-glow">ГРАНИЦ СВЯЗИ</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
          G-Telecom — оператор связи, которому доверяют 12 миллионов абонентов.
          Интернет, мобильная связь, ТВ и облачные решения для бизнеса.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
          <button
            onClick={() => onNav("tariffs")}
            className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-bold text-lg hover:bg-cyan-400 transition-all hover:scale-105 glow-cyan"
          >
            Выбрать тариф
          </button>
          <button
            onClick={() => onNav("services")}
            className="px-8 py-4 rounded-xl glass glass-hover font-semibold text-lg text-white border border-white/10"
          >
            Наши услуги
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up delay-400">
          {STATS.map((s, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center glass-hover">
              <div className="text-3xl font-black text-cyan-400 mb-1" style={{ fontFamily: "Oswald" }}>{s.value}</div>
              <div className="text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <Icon name="ChevronDown" size={20} />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Что мы предлагаем</div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>УСЛУГИ G-TELECOM</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Полный спектр телекоммуникационных решений для частных клиентов и бизнеса</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 glass-hover group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Icon name={s.icon} size={22} className="text-cyan-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">{s.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Oswald" }}>{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Подробнее <Icon name="ArrowRight" size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tariffs() {
  return (
    <section id="tariffs" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Выберите план</div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>ТАРИФЫ</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Прозрачные цены, без скрытых платежей. Подключайтесь и меняйте тариф в любое время.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TARIFFS.map((t, i) => (
            <div key={i} className={`relative rounded-2xl p-7 border transition-all hover:scale-[1.02] cursor-pointer ${t.popular ? "bg-gradient-to-b from-cyan-900/40 to-blue-900/40 border-cyan-500/50 glow-cyan" : "bg-gradient-to-b from-slate-800 to-slate-900 border-white/5"}`}>
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500 text-black text-xs font-bold tracking-wide">
                  ПОПУЛЯРНЫЙ
                </div>
              )}
              <div className="mb-6">
                <div className="text-white/50 text-sm mb-1">{t.name}</div>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>{t.price}</span>
                  <span className="text-white/40 mb-2">₽/мес</span>
                </div>
                <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-white/5">
                  <Icon name="Zap" size={14} className="text-cyan-400" />
                  <span className="text-cyan-400 font-semibold text-sm">{t.speed}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-7">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={11} className="text-cyan-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all ${t.popular ? "bg-cyan-500 text-black hover:bg-cyan-400" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"}`}>
                Подключить
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-sm mt-8">Корпоративные тарифы и индивидуальные условия — по запросу</p>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section id="coverage" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Карта сети</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "Oswald" }}>
              ПОКРЫТИЕ<br />ПО ВСЕЙ СТРАНЕ
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Сеть G-Telecom охватывает 85 регионов России — от Калининграда до Владивостока.
              5G уже работает в 30 крупнейших городах. Мы продолжаем расширять покрытие каждый день.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Radio", label: "Базовых станций", value: "180 000+" },
                { icon: "MapPin", label: "Регионов", value: "85" },
                { icon: "Zap", label: "5G городов", value: "30" },
                { icon: "Globe", label: "Роуминг стран", value: "200+" },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-4 glass-hover">
                  <Icon name={item.icon} size={18} className="text-cyan-400 mb-2" />
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "Oswald" }}>{item.value}</div>
                  <div className="text-white/40 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 glow-cyan-sm">
              <img src={MAP_IMAGE} alt="Карта покрытия" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/60 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Icon name="Search" size={14} className="text-cyan-400" />
                  </div>
                  <input
                    className="bg-transparent text-white/70 text-sm flex-1 outline-none placeholder-white/30"
                    placeholder="Введите ваш адрес для проверки..."
                  />
                  <button className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-semibold">
                    Проверить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Новости</div>
            <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>БЛОГ</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
            Все новости <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <article key={i} className="glass rounded-2xl overflow-hidden glass-hover group cursor-pointer">
              <div className="h-40 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name="FileText" size={24} className="text-cyan-400" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">{post.tag}</span>
                  <span className="text-white/30 text-xs">{post.date}</span>
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "Oswald", fontSize: "1.05rem" }}>{post.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="support" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Помощь</div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>ПОДДЕРЖКА</h2>
          <p className="text-white/50 mt-4">Мы на связи 24/7 и готовы помочь с любым вопросом</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {[
            { icon: "Phone", title: "Горячая линия", info: "8-800-555-0100", note: "Бесплатно, 24/7" },
            { icon: "MessageCircle", title: "Онлайн-чат", info: "Напишите нам", note: "Ответ за 5 минут" },
            { icon: "Mail", title: "Email", info: "support@g-telecom.ru", note: "Ответ за 24 часа" },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center glass-hover cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                <Icon name={item.icon} size={20} className="text-cyan-400" />
              </div>
              <div className="text-white font-semibold mb-1">{item.title}</div>
              <div className="text-cyan-400 font-medium text-sm mb-1">{item.info}</div>
              <div className="text-white/30 text-xs">{item.note}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white mb-5" style={{ fontFamily: "Oswald" }}>ЧАСТЫЕ ВОПРОСЫ</h3>
          {FAQ.map((item, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-white font-medium">{item.q}</span>
                <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-cyan-400 flex-shrink-0 ml-4" />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-white/50 text-sm leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Свяжитесь с нами</div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>КОНТАКТЫ</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-7">
            <h3 className="text-xl font-bold text-white mb-5" style={{ fontFamily: "Oswald" }}>ОСТАВИТЬ ЗАЯВКУ</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Имя</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors placeholder-white/20" placeholder="Иван Петров" />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Телефон</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors placeholder-white/20" placeholder="+7 (___) ___-__-__" />
                </div>
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1.5 block">Email</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors placeholder-white/20" placeholder="email@example.com" />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1.5 block">Сообщение</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors placeholder-white/20 resize-none h-24" placeholder="Опишите ваш вопрос..." />
              </div>
              <button className="w-full py-3.5 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all glow-cyan-sm">
                Отправить заявку
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: "MapPin", title: "Главный офис", info: "г. Москва, ул. Тверская, 15, стр. 1" },
              { icon: "Phone", title: "Единый номер", info: "8-800-555-0100 (бесплатно)" },
              { icon: "Mail", title: "Email", info: "info@g-telecom.ru" },
              { icon: "Clock", title: "Часы работы", info: "Колл-центр: 24/7 · Офисы: 9:00–21:00" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-5 flex items-center gap-4 glass-hover">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-0.5">{item.title}</div>
                  <div className="text-white font-medium text-sm">{item.info}</div>
                </div>
              </div>
            ))}
            <div className="glass rounded-xl p-5">
              <div className="text-white/40 text-xs mb-3">Социальные сети</div>
              <div className="flex gap-3">
                {[
                  { icon: "MessageSquare", label: "Telegram" },
                  { icon: "Globe", label: "VK" },
                  { icon: "Youtube", label: "YouTube" },
                ].map((s, i) => (
                  <button key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 transition-all text-sm text-white/60 hover:text-cyan-400">
                    <Icon name={s.icon} size={14} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Наша история</div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Oswald" }}>О КОМПАНИИ</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-white/60 leading-relaxed text-lg mb-6">
              G-Telecom основан в 2002 году. За 24 года мы стали одним из крупнейших
              телекоммуникационных операторов России, предоставляя услуги связи миллионам
              абонентов по всей стране.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Наша миссия — обеспечить доступную, быструю и надёжную связь каждому человеку,
              вне зависимости от места проживания. Мы инвестируем в инфраструктуру будущего:
              5G-сети, оптические магистрали и облачные решения.
            </p>
            <div className="flex flex-wrap gap-3">
              {["ISO 27001", "SOC 2 Type II", "Лицензия Минцифры", "Топ-3 оператора РФ"].map((cert, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg glass border border-cyan-500/20 text-cyan-400 text-sm">{cert}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { year: "2002", event: "Основание компании, первые 10 000 абонентов" },
              { year: "2008", event: "Запуск сети 3G, выход в 20 регионов" },
              { year: "2015", event: "Старт 4G LTE, 5 миллионов абонентов" },
              { year: "2021", event: "Пилотный запуск 5G в Москве и СПб" },
              { year: "2026", event: "5G в 30 городах, 12 миллионов абонентов" },
            ].map((item, i, arr) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-6 bg-cyan-500/20 mt-1" />}
                </div>
                <div className="pb-2 pt-2">
                  <span className="text-cyan-400 font-bold text-sm" style={{ fontFamily: "Oswald" }}>{item.year}</span>
                  <p className="text-white/50 text-sm mt-0.5">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "Shield", title: "Надёжность", desc: "99.9% uptime сети" },
            { icon: "Zap", title: "Скорость", desc: "Топовые скорости передачи данных" },
            { icon: "Heart", title: "Клиент в центре", desc: "NPS 72 — лучший в отрасли" },
            { icon: "Leaf", title: "Экология", desc: "Нейтральный углеродный след к 2030" },
          ].map((v, i) => (
            <div key={i} className="glass rounded-xl p-5 text-center glass-hover">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                <Icon name={v.icon} size={18} className="text-cyan-400" />
              </div>
              <div className="text-white font-bold mb-1" style={{ fontFamily: "Oswald" }}>{v.title}</div>
              <div className="text-white/40 text-xs">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cabinet({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "tariff" | "payments">("overview");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl glass rounded-2xl border border-cyan-500/20 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Icon name="User" size={18} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-white font-semibold">{CABINET_USER.name}</div>
              <div className="text-white/40 text-xs">{CABINET_USER.phone}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="flex border-b border-white/5">
          {[{ id: "overview", label: "Обзор" }, { id: "tariff", label: "Тариф" }, { id: "payments", label: "Платежи" }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "tariff" | "payments")}
              className={`flex-1 py-3.5 text-sm font-medium transition-all ${activeTab === tab.id ? "text-cyan-400 border-b-2 border-cyan-500" : "text-white/40 hover:text-white/70"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="glass rounded-xl p-5 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/40 text-sm">Баланс счёта</span>
                  <span className="text-xs text-green-400 px-2 py-0.5 rounded-full bg-green-500/10">Активен</span>
                </div>
                <div className="text-4xl font-black text-white" style={{ fontFamily: "Oswald" }}>
                  {CABINET_USER.balance} <span className="text-cyan-400">₽</span>
                </div>
                <div className="text-white/30 text-xs mt-1">Следующий платёж: {CABINET_USER.nextPayment}</div>
                <button className="mt-4 px-5 py-2.5 rounded-xl bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-400 transition-colors">
                  Пополнить баланс
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Интернет", icon: "Wifi", used: CABINET_USER.internet.used, total: CABINET_USER.internet.total, unit: "ГБ" },
                  { label: "Минуты", icon: "Phone", used: CABINET_USER.calls.used, total: CABINET_USER.calls.total, unit: "мин" },
                  { label: "СМС", icon: "MessageSquare", used: CABINET_USER.sms.used, total: CABINET_USER.sms.total, unit: "шт" },
                ].map((item, i) => {
                  const pct = Math.round((item.used / item.total) * 100);
                  return (
                    <div key={i} className="glass rounded-xl p-4">
                      <Icon name={item.icon} size={14} className="text-cyan-400 mb-2" />
                      <div className="text-white font-bold text-sm">{item.used}<span className="text-white/30">/{item.total}</span></div>
                      <div className="text-white/30 text-xs mb-2">{item.unit}</div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-white/30 text-xs mt-1">{pct}%</div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "RefreshCw", label: "Сменить тариф" },
                  { icon: "FileText", label: "Детализация" },
                  { icon: "Settings", label: "Настройки" },
                  { icon: "Headphones", label: "Поддержка" },
                ].map((action, i) => (
                  <button key={i} className="flex items-center gap-3 glass rounded-xl p-3.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all glass-hover">
                    <Icon name={action.icon} size={15} className="text-cyan-400" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tariff" && (
            <div className="space-y-4">
              <div className="glass rounded-xl p-5 border border-cyan-500/20">
                <div className="text-white/40 text-xs mb-1">Текущий тариф</div>
                <div className="text-2xl font-black text-white mb-3" style={{ fontFamily: "Oswald" }}>{CABINET_USER.tariff}</div>
                <div className="space-y-2">
                  {["1 Гбит/с интернет", "200 ТВ-каналов", "20 ГБ мобильного интернета", "Поддержка 24/7"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <Icon name="Check" size={12} className="text-cyan-400" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-3">Доступные тарифы</div>
                {TARIFFS.map((t, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl mb-2 ${t.name === CABINET_USER.tariff ? "border border-cyan-500/40 bg-cyan-500/5" : "glass glass-hover"}`}>
                    <div>
                      <div className="text-white font-medium text-sm">{t.name}</div>
                      <div className="text-white/40 text-xs">{t.speed}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{t.price} ₽</span>
                      {t.name === CABINET_USER.tariff
                        ? <span className="text-xs text-cyan-400 px-2 py-1 rounded-lg bg-cyan-500/10">Текущий</span>
                        : <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors">Сменить</button>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-4">
              <div className="glass rounded-xl p-5">
                <div className="text-white/40 text-xs mb-1">К оплате</div>
                <div className="text-3xl font-black text-white" style={{ fontFamily: "Oswald" }}>890 <span className="text-cyan-400">₽</span></div>
                <div className="text-white/30 text-xs mt-1">до {CABINET_USER.nextPayment}</div>
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors">Оплатить</button>
                  <button className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-white text-sm font-medium">Автоплатёж</button>
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-3">История платежей</div>
                {[
                  { date: "1 мая 2026", sum: "890 ₽", status: "Оплачено" },
                  { date: "1 апр 2026", sum: "890 ₽", status: "Оплачено" },
                  { date: "1 мар 2026", sum: "890 ₽", status: "Оплачено" },
                ].map((pay, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
                    <div>
                      <div className="text-white text-sm">{pay.sum}</div>
                      <div className="text-white/30 text-xs">{pay.date}</div>
                    </div>
                    <span className="text-green-400 text-xs px-2 py-1 rounded-full bg-green-500/10">{pay.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Footer({ onNav }: { onNav: (id: string) => void }) {
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

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [cabinetOpen, setCabinetOpen] = useState(false);

  const scrollTo = (id: string) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = ["hero", ...NAV_LINKS.map(n => n.id)];
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-white">
      <NetworkBackground />
      <NavBar activeSection={activeSection} onNav={scrollTo} onCabinet={() => setCabinetOpen(true)} />
      <Hero onNav={scrollTo} />
      <Services />
      <Tariffs />
      <Coverage />
      <Blog />
      <Support />
      <Contacts />
      <About />
      <Footer onNav={scrollTo} />
      {cabinetOpen && <Cabinet onClose={() => setCabinetOpen(false)} />}
    </div>
  );
}