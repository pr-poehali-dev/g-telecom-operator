import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CABINET_USER, TARIFFS } from "@/components/GTelecomData";

export function Cabinet({ onClose }: { onClose: () => void }) {
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
