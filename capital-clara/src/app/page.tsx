'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ee]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 py-6">
        <div className="max-w-[1180px] mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#173a35]">
            <span className="w-8 h-8 bg-[#173a35] rounded-lg flex items-center justify-center text-[#d4ae68]">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                <path d="M7.5 23.5V8.5h4.1l8.8 8.9V8.5h4.1v15h-4.1l-8.8-8.9v8.9H7.5Z" fill="currentColor" />
                <path d="M7.5 26.5h17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              capital<span className="text-[#d4ae68]">clara</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <a href="#enfoque" className="text-xs font-semibold text-[#42645d] hover:text-[#173a35] transition-colors">Enfoque</a>
            <a href="#oportunidades" className="text-xs font-semibold text-[#42645d] hover:text-[#173a35] transition-colors">Oportunidades</a>
            <a href="#proceso" className="text-xs font-semibold text-[#42645d] hover:text-[#173a35] transition-colors">Cómo funciona</a>
            <a href="#aprende" className="text-xs font-semibold text-[#42645d] hover:text-[#173a35] transition-colors">Aprendé</a>
            <a href="#preguntas" className="text-xs font-semibold text-[#42645d] hover:text-[#173a35] transition-colors">Preguntas</a>
            <Link
              href="/login"
              className="bg-[#173a35] text-[#f7f5ee] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#0d2a27] transition-colors"
            >
              Ingresar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[800px] pt-48 pb-12 overflow-hidden">
        <div className="absolute top-[90px] left-[-150px] w-[400px] h-[400px] border border-[#173a35]/10 rounded-full" />
        <div className="absolute top-[135px] left-[-100px] w-[270px] h-[270px] border border-[#d4ae68]/20 rounded-full" />

        <div className="max-w-[1180px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[70px] items-center">
            {/* Copy */}
            <div className="pb-10">
              <div className="inline-flex items-center gap-2 mb-6 text-[#2e6758] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Información que habilita decisiones
              </div>
              <h1 className="text-[clamp(3.4rem,6.3vw,6.1rem)] font-bold leading-[0.99] tracking-[-0.055em] text-[#173a35] mb-6">
                Invertir con claridad empieza por <em className="text-[#d4ae68] not-italic">entender.</em>
              </h1>
              <p className="max-w-[510px] text-lg text-[#42645d] leading-relaxed mb-8">
                Conocé las alternativas, comprendé los riesgos y hablá con una persona antes de dar el primer paso. Sin promesas fáciles, sin información escondida.
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-3 bg-[#d4ae68] text-[#173a35] px-6 py-4 rounded-full text-sm font-bold hover:bg-[#eed7a7] hover:-translate-y-[3px] transition-all shadow-[0_12px_25px_rgba(212,174,104,0.2)]"
                >
                  Quiero conversar
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
                    <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="#oportunidades" className="inline-flex items-center gap-2 text-sm font-bold text-[#173a35] border-b border-[#173a35]/30 pb-2 hover:gap-3 hover:text-[#2e6758] hover:border-[#d4ae68] transition-all">
                  Ver catálogo <span className="text-[#d4ae68]">↘</span>
                </a>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#42645d]">
                <div className="flex -ml-1">
                  <span className="w-7 h-7 rounded-full border-2 border-[#f7f5ee] bg-gradient-to-br from-[#9cb5a1] to-[#e5c88c]" />
                  <span className="w-7 h-7 rounded-full border-2 border-[#f7f5ee] bg-gradient-to-br from-[#4d786b] to-[#d3a45f] -ml-1" />
                  <span className="w-7 h-7 rounded-full border-2 border-[#f7f5ee] bg-gradient-to-br from-[#ddb176] to-[#7ca38d] -ml-1" />
                </div>
                <span>
                  <strong className="text-[#173a35] text-xs">Acompañamiento humano</strong>
                  <br />
                  Una conversación antes que una decisión automática.
                </span>
              </div>
            </div>

            {/* Visual */}
            <div className="relative min-h-[520px] px-6 py-11">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[470px] border border-[#173a35]/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#173a35]/5 rounded-full" />

              <div className="relative z-20 w-full max-w-[480px] min-h-[390px] mx-auto bg-gradient-to-br from-[#204d44] via-[#123b35] to-[#0d302d] text-[#f7f5ee] rounded-[23px] p-7 shadow-[18px_27px_60px_rgba(13,42,39,0.26),0_0_0_12px_rgba(255,255,255,0.08)] rotate-[2.5deg] animate-[card-float_7s_ease-in-out_infinite]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#c6dacb] opacity-85 mb-1">Panel de oportunidades</span>
                    <h2 className="text-xl font-bold tracking-[-0.04em] text-white">Una visión más clara</h2>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-2 text-[10px] font-bold tracking-[0.06em] uppercase text-[#c6dacb] bg-[#c6dacb]/10 border border-[#c6dacb]/20 rounded-full">
                    <span className="w-[5px] h-[5px] bg-[#c6dacb] rounded-full shadow-[0_0_0_4px_rgba(198,218,203,0.12)]" />
                    Informativo
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mt-12">
                  <span className="text-[clamp(3rem,5vw,4.4rem)] font-semibold tracking-[-0.08em] leading-none text-[#eed7a7]">5%–8%</span>
                  <span className="text-[11px] text-[#f7f5ee]/60">rendimiento estimado*</span>
                </div>
                <div className="h-[142px] mt-5">
                  <svg viewBox="0 0 420 150" preserveAspectRatio="none" className="w-full h-full overflow-visible" role="img" aria-label="Gráfico ilustrativo de tendencia, no datos históricos">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#c7a86a" stopOpacity=".3" />
                        <stop offset="1" stopColor="#c7a86a" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#a6c9b2" />
                        <stop offset="1" stopColor="#e2c488" />
                      </linearGradient>
                    </defs>
                    <path d="M0 125H420M0 88H420M0 51H420M0 14H420" stroke="#ffffff" strokeOpacity=".09" />
                    <path d="M0 125C32 122 37 108 65 111S100 119 126 94s39-18 61-5 38 13 58-9 39-32 58-16 37 12 55-6 36-16 62-36v138H0Z" fill="url(#chartFill)" />
                    <path d="M0 125C32 122 37 108 65 111S100 119 126 94s39-18 61-5 38 13 58-9 39-32 58-16 37 12 55-6 36-16 62-36" fill="none" stroke="url(#chartLine)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="420" cy="20" r="5" fill="#e2c488" stroke="#123b35" strokeWidth="3" />
                  </svg>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[10px] tracking-[0.04em] text-[#f7f5ee]/50">
                  <span>Visualización ilustrativa</span>
                  <span>→</span>
                </div>
              </div>

              <div className="absolute z-30 right-[-2px] bottom-[10px] flex items-center gap-3 min-w-[202px] p-3 bg-[#fffefa]/90 border border-[#173a35]/10 rounded-[13px] shadow-[0_18px_40px_rgba(13,42,39,0.13)] backdrop-blur-sm -rotate-4">
                <span className="w-[34px] h-[34px] bg-[#eed7a7] rounded-[10px] flex items-center justify-center text-[#173a35]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-[19px] h-[19px]">
                    <path d="M12 3v18M17 7.5c0-1.7-2.2-3-5-3S7 5.8 7 7.5 9.2 10 12 10s5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <strong className="block text-[11px] text-[#173a35]">Información primero</strong>
                  <small className="block text-[10px] text-[#42645d] mt-0.5">Antes de mover tu capital</small>
                </span>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="relative z-20 flex flex-wrap items-center gap-8 mt-8 pt-6 border-t border-[#173a35]/10">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#42645d]">
              <span className="w-[18px] h-[18px] bg-[#c6dacb] text-[#2e6758] rounded-full flex items-center justify-center text-[11px] font-bold">✓</span>
              Información transparente
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#42645d]">
              <span className="w-[18px] h-[18px] bg-[#c6dacb] text-[#2e6758] rounded-full flex items-center justify-center text-[11px] font-bold">✓</span>
              Lenguaje sencillo
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#42645d]">
              <span className="w-[18px] h-[18px] bg-[#c6dacb] text-[#2e6758] rounded-full flex items-center justify-center text-[11px] font-bold">✓</span>
              Consultá sin compromiso
            </div>
            <span className="ml-auto text-[10px] italic text-[#789087] text-right">*El rango es orientativo y no está garantizado.</span>
          </div>
        </div>
      </section>

      {/* Risk Banner */}
      <section className="bg-[#f7f5ee] py-4">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex flex-wrap items-center gap-4 p-4 bg-[#f1e8d6] border border-[#e6d6b5] rounded-[11px]">
            <span className="w-[22px] h-[22px] border border-[#c9a76d] text-[#8c6b31] rounded-full flex items-center justify-center font-serif text-sm font-bold flex-shrink-0">i</span>
            <p className="flex-1 text-[11px] leading-snug text-[#6c5a3c]">
              <strong className="text-[#5d4a2d]">Importante:</strong> esta web ofrece información general y canales de consulta. No constituye una recomendación de inversión ni garantiza resultados. Toda decisión debe evaluarse según tus objetivos, perfil y tolerancia al riesgo.
            </p>
            <a href="#legal" className="flex-shrink-0 text-[11px] font-bold text-[#7d5d2b] whitespace-nowrap">
              Ver aviso legal <span className="ml-1 text-sm">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Enfoque */}
      <section id="enfoque" className="bg-[#fffefa] py-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_0.65fr] gap-[100px] items-end mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 text-[#2e6758] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Un enfoque diferente
              </div>
              <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#173a35]">
                La información es el primer paso.
              </h2>
            </div>
            <p className="max-w-[405px] text-[15px] leading-relaxed text-[#42645d] mb-1">
              No se trata de prometer que una inversión sea "segura". Se trata de mostrarte el contexto necesario para entender qué estás evaluando y tomar una decisión verdaderamente propia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {/* Card 1 - Feature */}
            <article className="relative min-h-[400px] p-6 bg-[#173a35] text-[#f7f5ee] rounded-[18px] overflow-hidden">
              <span className="relative z-20 text-[11px] font-bold tracking-[0.1em] text-[#c6dacb]">01</span>
              <div className="absolute top-[34px] right-0 w-full h-[190px] overflow-hidden">
                <span className="absolute top-[22px] right-[74px] w-[76px] h-[76px] bg-[#d4ae68] rounded-full shadow-[0_0_0_16px_rgba(212,174,104,0.08),0_0_0_30px_rgba(212,174,104,0.04)]" />
                <span className="absolute bottom-[-65px] right-[170px] w-0 h-0 border-r-[150px] border-b-[190px] border-l-[150px] border-r-transparent border-b-[#28584e] border-l-transparent scale-90" />
                <span className="absolute bottom-[-65px] right-[-25px] w-0 h-0 border-r-[170px] border-b-[215px] border-l-[170px] border-r-transparent border-b-[#1c4b42] border-l-transparent scale-110" />
                <span className="absolute bottom-[-32px] right-[96px] w-[120px] h-[170px] border-2 border-[#eed7a7]/65 border-b-0 rounded-tl-[65%] rotate-[22deg]" />
                <span className="absolute bottom-[20px] right-[114px] w-[9px] h-[27px] bg-[#eed7a7] rounded-lg shadow-[0_-9px_0_-1px_#eed7a7]" />
              </div>
              <h3 className="relative z-20 max-w-[200px] mt-[210px] mb-3 text-xl font-bold leading-tight">Entender antes de elegir</h3>
              <p className="relative z-20 max-w-[265px] mb-5 text-[13px] leading-relaxed text-[#f7f5ee]/64">
                Traducimos los conceptos financieros a un lenguaje que puedas usar para comparar alternativas con criterio.
              </p>
              <a href="#aprende" className="relative z-20 inline-flex items-center gap-2 text-xs font-bold text-[#f7f5ee] hover:gap-3 transition-all">
                Conocé la guía <span className="text-[#d4ae68] text-base">↗</span>
              </a>
            </article>

            {/* Card 2 */}
            <article className="relative min-h-[400px] p-6 bg-[#f7f5ee] border border-[#dce3db] rounded-[18px] hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(22,58,52,0.09)] transition-all">
              <span className="relative z-20 text-[11px] font-bold tracking-[0.1em] text-[#7a948a]">02</span>
              <div className="relative w-[100px] h-[100px] mt-[54px] mb-[38px] bg-[#e2ebe1] rounded-full flex items-center justify-center">
                <span className="absolute w-[37px] h-[37px] border-2 border-[#2e6758] rounded-full" />
                <span className="absolute w-[2px] h-[52px] bg-[#2e6758] rotate-[38deg]" />
                <span className="absolute w-[13px] h-[13px] bg-[#d4ae68] border-[3px] border-[#e2ebe1] rounded-full translate-x-[5px] -translate-y-[5px]" />
              </div>
              <h3 className="relative z-20 max-w-[200px] mb-3 text-xl font-bold leading-tight text-[#173a35]">Decidir con contexto</h3>
              <p className="relative z-20 max-w-[265px] mb-5 text-[13px] leading-relaxed text-[#42645d]">
                Objetivos, plazos y riesgos forman parte de la conversación. No dejamos los detalles para después.
              </p>
              <a href="#proceso" className="relative z-20 inline-flex items-center gap-2 text-xs font-bold text-[#173a35] hover:gap-3 transition-all">
                Ver el proceso <span className="text-[#d4ae68] text-base">↗</span>
              </a>
            </article>

            {/* Card 3 */}
            <article className="relative min-h-[400px] p-6 bg-[#f7f5ee] border border-[#dce3db] rounded-[18px] hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(22,58,52,0.09)] transition-all">
              <span className="relative z-20 text-[11px] font-bold tracking-[0.1em] text-[#7a948a]">03</span>
              <div className="relative w-[100px] h-[100px] mt-[54px] mb-[38px] bg-[#f0e3ca] rounded-full flex items-center justify-center">
                <span className="absolute w-[41px] h-[31px] bg-[#2e6758] rounded-[18px_18px_18px_5px]" />
                <span className="absolute top-[51px] left-[39px] w-[10px] h-[10px] border-b-[3px] border-l-[3px] border-[#2e6758] -skew-x-15 -rotate-[20deg]" />
                <span className="absolute top-[48px] left-[49px] w-[4px] h-[4px] bg-[#eed7a7] rounded-full shadow-[10px_0_0_#eed7a7]" />
              </div>
              <h3 className="relative z-20 max-w-[200px] mb-3 text-xl font-bold leading-tight text-[#173a35]">Conversar con alguien</h3>
              <p className="relative z-20 max-w-[265px] mb-5 text-[13px] leading-relaxed text-[#42645d]">
                Escribinos por WhatsApp para resolver tus preguntas y entender qué alternativa podría encajar contigo.
              </p>
              <a href="#contacto" className="relative z-20 inline-flex items-center gap-2 text-xs font-bold text-[#173a35] hover:gap-3 transition-all">
                Hablar ahora <span className="text-[#d4ae68] text-base">↗</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Oportunidades */}
      <section id="oportunidades" className="bg-[#0d2a27] text-[#f7f5ee] py-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.65fr] gap-[100px] items-end mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 text-[#c6dacb] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Oportunidades para explorar
              </div>
              <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-white">
                Un catálogo para pensar,<br />
                <em className="text-[#d4ae68] not-italic">no para apurarse.</em>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#f7f5ee]/57 mb-1">
              Estos modelos son orientativos y forman parte del prototipo. Los valores definitivos, condiciones y documentación se confirman en una conversación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {[
              { id: 'inicial', index: '01 / exploratory', badge: 'Para empezar', title: 'Plan Inicial', desc: 'Una forma sencilla de conocer el proceso y evaluar si el camino se relaciona con tus objetivos.', monto: 'A definir', plazo: 'A definir' },
              { id: 'intermedio', index: '02 / balanced', badge: 'Más opciones', title: 'Plan Intermedio', desc: 'Una alternativa con más contexto para comparar plazos, objetivos y condiciones antes de consultar.', monto: 'A definir', plazo: 'A definir', highlight: true },
              { id: 'personalizado', index: '03 / personal', badge: 'A medida', title: 'Plan Personalizado', desc: 'Una conversación para revisar tu situación, preguntas y necesidades antes de explorar una alternativa.', monto: 'Según perfil', plazo: 'According perfil' },
            ].map((plan) => (
              <article
                key={plan.id}
                className={`flex flex-col min-h-[423px] p-6 rounded-[18px] border transition-all hover:-translate-y-1.5 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-[#d4ae68]/17 to-white/5 border-[#d4ae68]/56'
                    : 'bg-white/5 border-white/13 hover:bg-white/8 hover:border-[#d4ae68]/55'
                }`}
              >
                <div className="flex items-center justify-between min-h-[25px]">
                  <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#c6dacb]/65">{plan.index}</span>
                  <span className={`px-2.5 py-1.5 text-[9px] font-bold rounded-full ${plan.highlight ? 'bg-[#d4ae68]/16 text-[#eed7a7]' : 'bg-[#c6dacb]/10 text-[#c6dacb]'}`}>
                    {plan.badge}
                  </span>
                </div>
                <h3 className="mt-[58px] mb-3 text-3xl font-bold text-white">{plan.title}</h3>
                <p className="max-w-[285px] min-h-[69px] mb-8 text-[13px] leading-relaxed text-[#f7f5ee]/58">{plan.desc}</p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-[17px] py-5 border-t border-b border-white/12">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#c6dacb]/54">Monto mínimo</span>
                    <strong className="text-sm font-semibold text-white">{plan.monto}</strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#c6dacb]/54">Plazo</span>
                    <strong className="text-sm font-semibold text-white">{plan.plazo}</strong>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[10px] text-[#c6dacb]/54">Rendimiento estimado</span>
                    <strong className="text-sm font-semibold text-[#eed7a7]">5%–8%*</strong>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-5">
                  <span className="text-[9px] tracking-[0.03em] text-[#c6dacb]/53">Riesgo por evaluar</span>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-[#eed7a7] hover:gap-3 transition-all"
                  >
                    Ver detalle <span className="text-base">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-7 text-xs text-[#f7f5ee]/48">
            <span>¿No sabés cuál elegir?</span>
            <Link href="/login" className="font-bold text-[#eed7a7]">
              Contanos qué estás buscando <span className="ml-1 text-base">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="bg-[#f7f5ee] py-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-[120px] items-start">
            <div className="lg:sticky lg:top-[125px]">
              <div className="inline-flex items-center gap-2 mb-6 text-[#2e6758] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Un proceso simple
              </div>
              <h2 className="max-w-[420px] text-[clamp(2.5rem,4.5vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#173a35] mb-6">
                De la duda a la próxima pregunta.
              </h2>
              <p className="max-w-[310px] mb-7 text-[15px] leading-relaxed text-[#42645d]">
                No tenemos que resolverlo todo en un clic. Primero hacemos las preguntas correctas.
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#173a35] border-b border-[#173a35]/30 pb-2 hover:gap-3 hover:text-[#2e6758] hover:border-[#d4ae68] transition-all">
                Empezar una conversación <span className="text-[#d4ae68]">↘</span>
              </Link>
            </div>

            <div className="border-t border-[#dce3db]">
              {[
                { num: '01', title: 'Contanos qué buscás', desc: 'Objetivos, plazos disponibles y qué te gustaría entender.', active: true },
                { num: '02', title: 'Revisamos la información', desc: 'Miramos las condiciones, el riesgo y lo que todavía no está definido.', active: false },
                { num: '03', title: 'Evaluás con contexto', desc: 'Tomás una decisión informada, sin presión y con tiempo para pensar.', active: false },
              ].map((step) => (
                <article key={step.num} className={`grid grid-cols-[54px_1fr_30px] gap-5 items-start py-7 border-b border-[#dce3db] ${step.active ? 'pt-8' : ''}`}>
                  <span className="text-[11px] font-bold tracking-[0.08em] text-[#799389]">{step.num}</span>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-[#173a35]">{step.title}</h3>
                    <p className="max-w-[390px] text-[13px] text-[#42645d]">{step.desc}</p>
                  </div>
                  <span className={`w-[27px] h-[27px] border border-[#b5c8b7] text-[#2e6758] rounded-full flex items-center justify-center text-lg font-normal ${step.active ? 'bg-[#2e6758] text-[#f7f5ee] rotate-45' : ''}`}>
                    +
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aprende */}
      <section id="aprende" className="bg-[#fffefa] py-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="max-w-[660px] mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-6 text-[#2e6758] text-[11px] font-bold tracking-[0.15em] uppercase">
              <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
              Pequeños pasos, mejores preguntas
            </div>
            <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#173a35] mb-4">
              Aprender también es invertir.
            </h2>
            <p className="max-w-[520px] mx-auto text-[15px] leading-relaxed text-[#42645d]">
              Una base clara para reconocer riesgos, comparar opciones y detectar promesas que no son realistas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {[
              { num: '01', title: 'Qué es el riesgo', desc: 'No todos los caminos tienen el mismo nivel de incertidumbre.', color: 'text-[#2e6758] bg-[#dce9dc]' },
              { num: '02', title: 'Qué mirar antes de decidir', desc: 'Tres preguntas que te ayudan a ordenar lo que estás evaluando.', color: 'text-[#8b6d37] bg-[#f0e2c6]' },
              { num: '03', title: 'Promesas que hay que descartar', desc: 'La rentabilidad garantizada es una señal de alerta, no de oportunidad.', color: 'text-[#8d5944] bg-[#f1ded3]' },
            ].map((card) => (
              <a
                key={card.num}
                href="#preguntas"
                className="relative flex flex-col min-h-[255px] p-6 bg-[#f7f5ee] border border-[#dce3db] rounded-[18px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(22,58,52,0.09)] transition-all"
              >
                <span className={`w-11 h-11 ${card.color} rounded-full flex items-center justify-center text-[10px] font-bold tracking-[0.1em]`}>
                  {card.num}
                </span>
                <h3 className="mt-[35px] mb-2 text-lg font-bold text-[#173a35]">{card.title}</h3>
                <p className="max-w-[270px] text-[13px] leading-relaxed text-[#42645d]">{card.desc}</p>
                <span className="absolute right-6 bottom-6 text-xl text-[#d4ae68]">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="bg-[#f7f5ee] py-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[130px]">
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 mb-6 text-[#2e6758] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Preguntas frecuentes
              </div>
              <h2 className="max-w-[420px] text-[clamp(2.5rem,4.5vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#173a35] mb-6">
                Mejor una pregunta<br />
                <em className="text-[#d4ae68] not-italic">que una suposición.</em>
              </h2>
              <p className="max-w-[340px] mb-7 text-[15px] leading-relaxed text-[#42645d]">
                Encontrá respuestas iniciales. Si tu caso es particular, escribinos y lo vemos con más detalle.
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#173a35] border-b border-[#173a35]/30 pb-2 hover:gap-3 hover:text-[#2e6758] hover:border-[#d4ae68] transition-all">
                Hacer otra pregunta <span className="text-[#d4ae68]">↘</span>
              </Link>
            </div>

            <div className="border-t border-[#dce3db]">
              {[
                { q: '¿El 5%–8% está garantizado?', a: 'No. Es un rango orientativo del prototipo y no representa una promesa ni un resultado garantizado. Las condiciones reales dependen de cada alternativa y deben ser explicadas antes de tomar una decisión.' },
                { q: '¿Puedo invertir desde esta web?', a: 'En esta primera etapa, Capital Clara es un canal informativo y de contacto. No se realizan operaciones ni pagos desde el sitio.' },
                { q: '¿Qué debería tener en cuenta?', a: 'Tu objetivo, el plazo que necesitás, la tolerancia al riesgo, los costos y la documentación de la alternativa. Ningún dato aislado reemplaza una evaluación completa.' },
                { q: '¿Puedo hacer una consulta sin compromiso?', a: 'Sí. La conversación inicial sirve para ordenar tus preguntas. No estás obligado a elegir una alternativa ni a realizar una operación.' },
              ].map((faq, i) => (
                <details key={i} className="border-b border-[#dce3db]" open={i === 0}>
                  <summary className="flex items-center justify-between gap-5 py-[22px] text-base font-bold tracking-[-0.025em] text-[#173a35] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="relative flex-shrink-0 w-[22px] h-[22px] border border-[#a7bdb0] rounded-full transition-all group-open:bg-[#c6dacb] group-open:border-[#c6dacb] group-open:rotate-45">
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-px bg-[#2e6758]" />
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-2 bg-[#2e6758] transition-transform group-open:rotate-0" />
                    </span>
                  </summary>
                  <p className="max-w-[650px] mb-6 text-[13px] leading-relaxed text-[#42645d]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-[#f7f5ee] pt-0 pb-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-[95px] p-[75px_78px] bg-[#173a35] text-[#f7f5ee] rounded-[28px] shadow-[0_25px_70px_rgba(13,42,39,0.14)]">
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 mb-6 text-[#c6dacb] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Estamos para conversar
              </div>
              <h2 className="text-[clamp(2.8rem,4.5vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-white mb-6">
                Una buena decisión<br />
                <em className="text-[#d4ae68] not-italic">empieza con una pregunta.</em>
              </h2>
              <p className="max-w-[440px] mb-8 text-sm leading-relaxed text-[#f7f5ee]/63">
                Dejanos tu consulta y te ayudamos a ordenar el próximo paso. Respondemos de lunes a viernes, dentro del horario de atención.
              </p>
              <div className="flex flex-col gap-3">
                <a href="#" className="flex items-center gap-3 w-fit text-[#f7f5ee]">
                  <span className="w-[33px] h-[33px] bg-[#d4ae68] text-[#173a35] rounded-[9px] flex items-center justify-center text-xs font-extrabold">W</span>
                  <span>
                    <small className="block text-[10px] tracking-[0.1em] uppercase text-[#c6dacb]/58 mb-0.5">WhatsApp</small>
                    <strong className="block text-xs font-medium text-white">Número pendiente de configuración</strong>
                  </span>
                  <span className="ml-1 text-base text-[#eed7a7]">↗</span>
                </a>
                <a href="mailto:contacto@capitalclara.com" className="flex items-center gap-3 w-fit text-[#f7f5ee]">
                  <span className="w-[33px] h-[33px] bg-[#d4ae68] text-[#173a35] rounded-[9px] flex items-center justify-center text-xs font-extrabold">@</span>
                  <span>
                    <small className="block text-[10px] tracking-[0.1em] uppercase text-[#c6dacb]/58 mb-0.5">Email</small>
                    <strong className="block text-xs font-medium text-white">contacto@capitalclara.com</strong>
                  </span>
                  <span className="ml-1 text-base text-[#eed7a7]">↗</span>
                </a>
              </div>
            </div>

            <div className="p-[26px_27px_23px] bg-[#f7f5ee] rounded-2xl">
              <div className="flex justify-between mb-6 text-[10px] font-bold tracking-[0.1em] uppercase text-[#7a9388]">
                <span>01 / 03</span>
                <span className="text-[#173a35]">Consulta breve</span>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block mb-1.5 text-[11px] font-bold text-[#42645d]">¿Cómo te llamás?</label>
                  <input id="name" name="name" type="text" placeholder="Tu nombre" required className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9d4c9] text-[13px] text-[#173a35] outline-none focus:border-[#2e6758] focus:shadow-[0_1px_0_#2e6758] transition-all placeholder:text-[#9caea3]" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1.5 text-[11px] font-bold text-[#42645d]">Tu email</label>
                  <input id="email" name="email" type="email" placeholder="nombre@ejemplo.com" required className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9d4c9] text-[13px] text-[#173a35] outline-none focus:border-[#2e6758] focus:shadow-[0_1px_0_#2e6758] transition-all placeholder:text-[#9caea3]" />
                </div>
                <div>
                  <label htmlFor="interest" className="block mb-1.5 text-[11px] font-bold text-[#42645d]">¿Qué te gustaría entender?</label>
                  <select id="interest" name="interest" className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9d4c9] text-[13px] text-[#173a35] outline-none focus:border-[#2e6758] cursor-pointer">
                    <option>Quiero conocer las oportunidades</option>
                    <option>Tengo dudas sobre los riesgos</option>
                    <option>Quiero hablar con alguien</option>
                    <option>Otro tema</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1.5 text-[11px] font-bold text-[#42645d]">
                    Contanos un poco más <span className="font-normal text-[#9aab9e]">(opcional)</span>
                  </label>
                  <textarea id="message" name="message" rows={3} placeholder="Escribí tu consulta..." className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9d4c9] text-[13px] text-[#173a35] outline-none focus:border-[#2e6758] resize-y placeholder:text-[#9caea3]" />
                </div>
                <button type="submit" className="w-full py-3 bg-[#f7f5ee] text-[#173a35] font-bold rounded-full border border-[#173a35]/20 hover:bg-white transition-colors">
                  Preparar consulta <span className="ml-1">↗</span>
                </button>
                <p className="text-[9px] leading-snug text-[#8c9d91] text-center">
                  Al enviar, aceptás que usemos tus datos únicamente para responder esta consulta.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section id="legal" className="bg-[#efede3] py-[120px]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-[105px] items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 text-[#2e6758] text-[11px] font-bold tracking-[0.15em] uppercase">
                <span className="w-[7px] h-[7px] bg-[#d4ae68] rounded-full shadow-[0_0_0_5px_rgba(212,174,104,0.13)]" />
                Transparencia también es responsabilidad
              </div>
              <h2 className="text-[clamp(2.7rem,4.6vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#173a35] mb-6">
                Leé antes de<br />
                <em className="text-[#d4ae68] not-italic">avanzar.</em>
              </h2>
              <p className="max-w-[370px] text-sm leading-relaxed text-[#42645d]">
                Esta página es un prototipo informativo. Antes de tomar una decisión, revisá la documentación de la alternativa y confirmá si existe autorización, condiciones y normativa aplicable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[13px]">
              {[
                { num: '01', title: 'Aviso de riesgo', desc: 'Las inversiones pueden implicar pérdidas. Ningún rendimiento es cierto hasta que estén definidas las condiciones de la operación.' },
                { num: '02', title: 'Información, no asesoría', desc: 'El contenido de este sitio es general y no reemplaza una evaluación financiera, legal o personalizada.' },
                { num: '03', title: 'Privacidad', desc: 'Los datos enviados se usan para responder consultas. La política definitiva y el responsable de tratamiento deben completarse antes de publicar.' },
              ].map((card) => (
                <article key={card.num} className="min-h-[255px] p-5 bg-[#fffefa]/56 border border-[#173a35]/10 rounded-[11px]">
                  <span className="text-[10px] font-bold tracking-[0.1em] text-[#2e6758]">{card.num}</span>
                  <h3 className="mt-[55px] mb-3 text-base font-bold text-[#173a35]">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-[#42645d]">{card.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#f7f5ee] py-[130px] px-0 text-center">
        <div className="max-w-[1180px] mx-auto px-8 flex flex-col items-center">
          <span className="w-[45px] h-[45px] mb-6 border border-[#d4ae68]/55 text-[#d4ae68] rounded-full flex items-center justify-center text-2xl">✦</span>
          <h2 className="text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#173a35] mb-8">
            La claridad también<br />
            <em className="text-[#d4ae68] not-italic">es una decisión.</em>
          </h2>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 bg-[#d4ae68] text-[#173a35] px-6 py-4 rounded-full text-sm font-bold hover:bg-[#eed7a7] hover:-translate-y-[3px] transition-all shadow-[0_12px_25px_rgba(212,174,104,0.2)]"
          >
            Quiero saber más <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d2a27] text-[#f7f5ee]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr_0.8fr] gap-10 py-[68px]">
            <div>
              <Link href="/" className="flex items-center gap-2 text-[#f7f5ee]">
                <span className="w-8 h-8 bg-[#d4ae68] rounded-lg flex items-center justify-center text-[#173a35]">
                  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                    <path d="M7.5 23.5V8.5h4.1l8.8 8.9V8.5h4.1v15h-4.1l-8.8-8.9v8.9H7.5Z" fill="currentColor" />
                    <path d="M7.5 26.5h17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-lg font-extrabold tracking-tight">
                  capital<span className="text-[#d4ae68]">clara</span>
                </span>
              </Link>
              <p className="mt-5 text-xs leading-relaxed text-[#f7f5ee]/48">
                Información para decidir<br />
                con un poco más de contexto.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="mb-2 text-[10px] text-[#eed7a7]">Explorá</span>
              <a href="#enfoque" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Nuestro enfoque</a>
              <a href="#oportunidades" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Oportunidades</a>
              <a href="#aprende" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Aprendé</a>
              <a href="#preguntas" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Preguntas frecuentes</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="mb-2 text-[10px] text-[#eed7a7]">Hablemos</span>
              <a href="#" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">WhatsApp</a>
              <a href="mailto:contacto@capitalclara.com" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Email</a>
              <a href="#contacto" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Formulario de contacto</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="mb-2 text-[10px] text-[#eed7a7]">Seguinos</span>
              <a href="#" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">Instagram <span className="ml-1 text-[#d4ae68]">↗</span></a>
              <a href="#" className="text-xs text-[#f7f5ee]/58 hover:text-[#eed7a7] transition-colors">LinkedIn <span className="ml-1 text-[#d4ae68]">↗</span></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between min-h-[65px] border-t border-white/10 text-[10px] text-[#f7f5ee]/39 py-4">
            <span>© 2026 Capital Clara. Prototipo de marca.</span>
            <div className="flex gap-5">
              <a href="#legal" className="hover:text-[#eed7a7] transition-colors">Aviso legal</a>
              <a href="#legal" className="hover:text-[#eed7a7] transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
