import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  Home,
  Mail,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards
} from "lucide-react";
import { useMemo, useState } from "react";

type Step = "signIn" | "scan" | "goal" | "priority" | "compare" | "playground" | "ready";
type Goal = "idle-cash" | "home" | "education" | "retirement" | "safety" | "growth";
type Priority = "access" | "safety" | "growth" | "tax" | "unsure";
type WhatIf = "sooner" | "longer" | "growth" | "safety" | "home";

type CoachState = {
  goal: Goal;
  amount: number;
  timelineMonths: number;
  priority: Priority;
  whatIf: WhatIf | null;
};

type Strategy = {
  id: string;
  name: string;
  rating: number;
  bestBecause: string;
  whyNot: string;
  accounts: string[];
  products: string[];
  risk: number;
  returnPotential: number;
  liquidity: number;
  values: number[];
};

type Resource = {
  title: string;
  description: string;
  href: string;
};

const examples = [
  "Use this money to buy a home.",
  "Build emergency savings.",
  "Start investing.",
  "Save for education.",
  "Prepare for retirement.",
  "I'm not sure yet."
];

const initialState: CoachState = {
  goal: "idle-cash",
  amount: 20000,
  timelineMonths: 18,
  priority: "unsure",
  whatIf: null
};

const goalLabels: Record<Goal, string> = {
  "idle-cash": "First investment",
  home: "First home",
  education: "Education",
  retirement: "Retirement",
  safety: "Safety-first",
  growth: "Growth"
};

const priorityLabels: Record<Priority, string> = {
  access: "Access",
  safety: "Safety",
  growth: "Growth",
  tax: "Account fit",
  unsure: "Not sure yet"
};

function inferGoal(text: string): CoachState {
  const lower = text.toLowerCase();
  const amountMatch = lower.match(/\$?\s?([0-9][0-9,]{3,})/);
  const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 20000;

  let goal: Goal = "idle-cash";
  if (lower.includes("home") || lower.includes("down payment") || lower.includes("house")) goal = "home";
  if (lower.includes("daughter") || lower.includes("child") || lower.includes("university") || lower.includes("education")) goal = "education";
  if (lower.includes("retirement") || lower.includes("retire")) goal = "retirement";
  if (lower.includes("safe") || lower.includes("soon") || lower.includes("emergency") || lower.includes("losing money")) goal = "safety";
  if (lower.includes("growth") || lower.includes("wealth")) goal = "growth";

  let timelineMonths = 18;
  if (lower.includes("soon") || lower.includes("year")) timelineMonths = 12;
  if (lower.includes("2 years")) timelineMonths = 24;
  if (lower.includes("retirement") || lower.includes("long")) timelineMonths = 84;

  let priority: Priority = "unsure";
  if (lower.includes("safe") || lower.includes("emergency") || lower.includes("losing")) priority = "safety";
  if (lower.includes("soon") || lower.includes("chequing")) priority = "access";
  if (lower.includes("growth") || lower.includes("retirement")) priority = "growth";
  if (lower.includes("home") || lower.includes("education")) priority = "tax";

  return { goal, amount, timelineMonths, priority, whatIf: null };
}

function buildStrategies(state: CoachState): Strategy[] {
  const isSoon = state.timelineMonths <= 12 || state.whatIf === "sooner";
  const isLong = state.timelineMonths >= 60 || state.whatIf === "longer";
  const access = state.priority === "access";
  const safety = state.priority === "safety" || state.whatIf === "safety";
  const growth = state.priority === "growth" || state.whatIf === "growth" || isLong;
  const home = state.goal === "home" || state.whatIf === "home";
  const education = state.goal === "education";
  const retirement = state.goal === "retirement";
  const base = state.amount;

  const strategyList: Strategy[] = [
    {
      id: "flexible",
      name: home ? "Flexible Home Savings Strategy" : "Flexible First Step Strategy",
      rating: isSoon || access || safety ? 5 : 4,
      bestBecause: isSoon ? "Because you may need the money soon, access matters more than return." : "It keeps the first move simple while preserving access.",
      whyNot: "It may not maximize long-term growth.",
      accounts: home ? ["FHSA", "TFSA"] : ["TFSA", "Savings"],
      products: ["High-interest savings", "Cashable GIC"],
      risk: 14,
      returnPotential: 28,
      liquidity: 94,
      values: [base, base * 1.008, base * 1.016, base * 1.024, base * 1.033]
    },
    {
      id: "fixed",
      name: home ? "Down Payment GIC Strategy" : "Fixed Return Strategy",
      rating: isSoon || access ? 3 : safety ? 4 : 5,
      bestBecause: "It can provide a clearer fixed-return conversation if you can lock some money.",
      whyNot: isSoon ? "It is not first because locked access may conflict with a short timeline." : "It is not first if flexibility matters more than the fixed rate.",
      accounts: home ? ["FHSA", "TFSA"] : ["TFSA", "Non-registered"],
      products: ["Cashable GIC", "Non-redeemable GIC"],
      risk: 18,
      returnPotential: 42,
      liquidity: isSoon ? 46 : 62,
      values: [base, base * 1.011, base * 1.023, base * 1.035, base * 1.048]
    },
    {
      id: "account",
      name: education ? "RESP Education Strategy" : retirement ? "RRSP / TFSA Retirement Strategy" : home ? "FHSA + TFSA Strategy" : "Registered Account Strategy",
      rating: education || retirement || home || state.priority === "tax" ? 5 : 4,
      bestBecause: "The account can matter as much as the product.",
      whyNot: "It needs advisor review for eligibility, contribution room, and withdrawal rules.",
      accounts: education ? ["RESP", "TFSA"] : retirement ? ["RRSP", "TFSA"] : home ? ["FHSA", "TFSA"] : ["TFSA", "Non-registered"],
      products: education || retirement ? ["Managed portfolios", "Mutual funds"] : ["Cashable GIC", "High-interest savings"],
      risk: education || retirement ? 42 : 24,
      returnPotential: education || retirement ? 62 : 36,
      liquidity: education || retirement ? 46 : 70,
      values: [base, base * 1.006, base * 1.025, base * 1.051, base * 1.082]
    },
    {
      id: "growth",
      name: "Longer-Term Growth Strategy",
      rating: growth ? 5 : isSoon || safety ? 2 : 3,
      bestBecause: "A longer timeline makes market growth more relevant.",
      whyNot: isSoon || safety ? "It is not first because market movement may not fit your timeline or comfort level." : "It needs a clear risk conversation before moving ahead.",
      accounts: retirement ? ["RRSP", "TFSA"] : ["TFSA", "Non-registered"],
      products: ["Mutual funds", "ETFs", "Portfolio solutions"],
      risk: 66,
      returnPotential: 78,
      liquidity: 48,
      values: [base, base * 0.99, base * 1.035, base * 1.02, base * 1.115]
    }
  ];

  return strategyList
    .sort((a, b) => b.rating - a.rating || b.liquidity - a.liquidity)
    .map((strategy, index) => ({ ...strategy, rating: Math.max(1, strategy.rating - Math.min(index, 1)) }));
}

function resourcesFor(state: CoachState, step: Step): Resource[] {
  if (step === "scan") {
    return [
      { title: "Investment Learning Hub", description: "Plain-language investing basics from CIBC.", href: "#" },
      { title: "TFSA Guide", description: "Understand how a TFSA may support eligible savings goals.", href: "#" },
      { title: "Book an Advisor", description: "Prepare for a suitability conversation with CIBC.", href: "#" }
    ];
  }

  if (state.goal === "home" || state.whatIf === "home") {
    return [
      { title: "FHSA Guide", description: "Learn how an FHSA may support a first home goal.", href: "#" },
      { title: "Mortgage Learning Centre", description: "Explore down payment and mortgage basics.", href: "#" },
      { title: "First Home Buyer Resources", description: "See tools for planning a home purchase.", href: "#" }
    ];
  }

  if (state.goal === "education") {
    return [
      { title: "RESP Guide", description: "Learn how education savings accounts work.", href: "#" },
      { title: "Education Savings Centre", description: "Plan for tuition timing and contributions.", href: "#" },
      { title: "Government Grant Information", description: "Review education grant considerations.", href: "#" }
    ];
  }

  if (state.goal === "retirement") {
    return [
      { title: "RRSP Guide", description: "Understand retirement account basics.", href: "#" },
      { title: "Retirement Planning Guide", description: "Explore long-term planning topics.", href: "#" },
      { title: "Retirement Calculator", description: "Try retirement planning assumptions.", href: "#" }
    ];
  }

  if (state.priority === "growth" || state.whatIf === "growth") {
    return [
      { title: "Mutual Fund Basics", description: "Learn how professionally managed funds work.", href: "#" },
      { title: "ETF Basics", description: "Review ETF concepts before an advisor conversation.", href: "#" },
      { title: "Investment Products Overview", description: "Compare broad CIBC investment categories.", href: "#" }
    ];
  }

  return [
    { title: "GIC Learning Centre", description: "Understand cashable and fixed-term GIC trade-offs.", href: "#" },
    { title: "Current GIC Rates", description: "Review current posted rates before speaking with CIBC.", href: "#" },
    { title: "CIBC Smart Planner", description: "Explore simple planning tools for next steps.", href: "#" }
  ];
}

function eliminatedCount(step: Step) {
  if (step === "signIn") return { considered: 0, remaining: 0 };
  if (step === "scan" || step === "goal") return { considered: 18, remaining: 18 };
  if (step === "priority") return { considered: 18, remaining: 8 };
  if (step === "compare" || step === "playground") return { considered: 18, remaining: 3 };
  return { considered: 18, remaining: 1 };
}

function reactionFor(step: Step, state: CoachState, top: Strategy) {
  if (step === "scan") return "I reviewed the mock profile and found one decision worth exploring.";
  if (step === "goal") return "I noticed available cash and no linked investment product. I only need to understand the goal.";
  if (step === "priority") return `Great, I understand. I found a ${goalLabels[state.goal].toLowerCase()} goal and narrowed 18 possibilities to 8.`;
  if (step === "compare") return "Interesting. That changes what I compare first.";
  if (step === "playground") return `I've narrowed it down. ${top.name} is currently ahead.`;
  return "You're advisor ready. You can explain the why, not just the option.";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}

function App() {
  const [step, setStep] = useState<Step>("signIn");
  const [message, setMessage] = useState("I have $20,000 available and want to understand what this money should do.");
  const [state, setState] = useState<CoachState>(initialState);
  const [openWhy, setOpenWhy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showScanDetails, setShowScanDetails] = useState(false);

  const strategies = useMemo(() => buildStrategies(state), [state]);
  const top = strategies[0];
  const progress = eliminatedCount(step);

  const analyze = (text = message) => {
    setMessage(text);
    setState(inferGoal(text));
    setStep("priority");
  };

  const choosePriority = (priority: Priority) => {
    setState((current) => ({ ...current, priority }));
    setStep("compare");
  };

  const applyWhatIf = (whatIf: WhatIf) => {
    setState((current) => ({
      ...current,
      whatIf,
      goal: whatIf === "home" ? "home" : current.goal,
      priority: whatIf === "growth" ? "growth" : whatIf === "safety" ? "safety" : whatIf === "sooner" ? "access" : current.priority,
      timelineMonths: whatIf === "sooner" ? 10 : whatIf === "longer" ? 72 : current.timelineMonths
    }));
  };

  if (step === "signIn") {
    return (
      <div className="app-shell sign-in-shell">
        <SignInPage onSignIn={() => setStep("scan")} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="top-nav">
        <button className="brand-mark" onClick={() => setStep("scan")} type="button">
          <span className="brand-symbol">C</span>
          <span>
            <strong>CIBC AI Financial Coach</strong>
            <small>Connected educational guidance</small>
          </span>
        </button>
        <nav aria-label="Prototype navigation">
          {[
            ["scan", "Scan"],
            ["goal", "Goal"],
            ["priority", "Matters most"],
            ["compare", "Compare"],
            ["playground", "Experiment"],
            ["ready", "Ready"]
          ].map(([id, label], index) => (
            <button className={step === id ? "nav-pill active" : "nav-pill"} key={id} onClick={() => setStep(id as Step)} type="button">
              <span>{index + 1}</span>
              {label}
            </button>
          ))}
        </nav>
      </header>

      {step === "scan" ? (
        <main className="scan-flow page-enter">
          <ScanPage
            showDetails={showScanDetails}
            onShowDetails={() => setShowScanDetails((value) => !value)}
            onStart={() => setStep("goal")}
            resources={resourcesFor(state, step)}
          />
        </main>
      ) : (
        <main className="coach-flow page-enter">
          <CoachRail reaction={reactionFor(step, state, top)} progress={progress} step={step} />

          {step === "goal" && (
            <section className="decision-card intake-card">
              <ScreenHeader eyebrow="Question 2" title="What do you want this money to help you achieve?" subtitle="I already know the account context. Let's focus on the decision, not paperwork." />
              <div className="coach-note">
                <Sparkles size={18} />
                <span>I noticed $20,000 available and no current investment product linked to this account.</span>
              </div>
              <div className="example-stack">
                {examples.map((example) => (
                  <button key={example} onClick={() => analyze(example)} type="button">
                    {example}
                  </button>
                ))}
              </div>
              <label className="chat-composer">
                <span>Or type naturally</span>
                <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
              </label>
              <button className="primary-button" onClick={() => analyze()} type="button">
                Use this goal
                <ArrowRight size={18} />
              </button>
              <LearnMore resources={resourcesFor(state, step)} />
            </section>
          )}

          {step === "priority" && (
            <section className="decision-card">
              <ScreenHeader eyebrow="Question 3" title="What matters most right now?" subtitle="One answer is enough. I’ll use it to eliminate poor fits." />
              <SignalPill label="Goal detected" value={goalLabels[state.goal]} />
              <div className="coach-note">
                <Check size={18} />
                <span>{state.timelineMonths <= 12 ? "Because your money may be needed within a year, access matters more than return." : "Got it. I’ll use that goal to narrow the options."}</span>
              </div>
              <div className="priority-grid">
                {([
                  ["access", "I may need the money soon", WalletCards],
                  ["safety", "I care most about safety", ShieldCheck],
                  ["growth", "I want more growth", TrendingUp],
                  ["tax", "I want the right account type", Home],
                  ["unsure", "I'm not sure yet", Sparkles]
                ] as const).map(([id, label, Icon]) => (
                  <button key={id} onClick={() => choosePriority(id)} type="button">
                    <Icon size={22} />
                    <strong>{label}</strong>
                  </button>
                ))}
              </div>
              <LearnMore resources={resourcesFor(state, step)} />
            </section>
          )}

          {step === "compare" && (
            <section className="decision-card compare-card">
              <ScreenHeader eyebrow="Question 4" title="Let’s compare only what still fits." subtitle="We’ve narrowed everything down to three strategies worth discussing." />
              <StrategyCards openWhy={openWhy} setOpenWhy={setOpenWhy} strategies={strategies.slice(0, 3)} />
              <VisualSuite state={state} strategies={strategies.slice(0, 3)} />
              <LearnMore resources={resourcesFor(state, step)} />
              <button className="primary-button" onClick={() => setStep("playground")} type="button">
                Try a what-if
                <RefreshCcw size={18} />
              </button>
            </section>
          )}

          {step === "playground" && (
            <section className="decision-card playground-card">
              <ScreenHeader eyebrow="Question 5" title="Let’s experiment." subtitle="Tap a what-if. I’ll update the ranking and explain what changed." />
              <div className="whatif-grid">
                {([
                  ["sooner", "I need the money sooner"],
                  ["longer", "I can wait longer"],
                  ["growth", "I care more about growth"],
                  ["safety", "I care more about safety"],
                  ["home", "I'm buying a house instead"]
                ] as const).map(([id, label]) => (
                  <button className={state.whatIf === id ? "active" : ""} key={id} onClick={() => applyWhatIf(id)} type="button">
                    {label}
                  </button>
                ))}
              </div>
              <div className="coach-note live">
                <Sparkles size={18} />
                <span>{playgroundReaction(state, strategies[0])}</span>
              </div>
              <StrategyCards openWhy={openWhy} setOpenWhy={setOpenWhy} strategies={strategies.slice(0, 3)} />
              <VisualSuite state={state} strategies={strategies.slice(0, 3)} compact />
              <LearnMore resources={resourcesFor(state, step)} />
              <button className="primary-button" onClick={() => setStep("ready")} type="button">
                Prepare my advisor summary
                <ClipboardCheck size={18} />
              </button>
            </section>
          )}

          {step === "ready" && (
            <AdvisorReady
              copied={copied}
              onCopy={() => setCopied(true)}
              onRestart={() => setStep("signIn")}
              onSimulate={() => setStep("playground")}
              state={state}
              strategies={strategies}
            />
          )}
        </main>
      )}
    </div>
  );
}

function SignInPage({ onSignIn }: { onSignIn: () => void }) {
  return (
    <main className="sign-in-page page-enter">
      <section className="sign-in-brand">
        <div className="brand-lockup">
          <span className="brand-symbol">C</span>
          <span>
            <strong>CIBC AI Financial Coach</strong>
            <small>See how a financial strategy is built.</small>
          </span>
        </div>
        <CoachAvatar mood="spark" />
        <h1>Sign in with CIBC Online Banking</h1>
        <p>Connect your permissioned banking context so the coach can start from what CIBC already knows.</p>
      </section>
      <section className="sign-in-card">
        <label>
          <span>Card number or username</span>
          <input autoComplete="username" defaultValue="alex.chen" />
        </label>
        <label>
          <span>Password</span>
          <input autoComplete="current-password" defaultValue="••••••••" type="password" />
        </label>
        <button className="primary-button" onClick={onSignIn} type="button">
          Sign in
          <ArrowRight size={18} />
        </button>
        <p>Your information is used to personalize educational guidance. Final product suitability should be reviewed with a CIBC advisor.</p>
      </section>
    </main>
  );
}

function ScanPage({
  onShowDetails,
  onStart,
  resources,
  showDetails
}: {
  onShowDetails: () => void;
  onStart: () => void;
  resources: Resource[];
  showDetails: boolean;
}) {
  return (
    <section className="decision-card scan-card">
      <div className="scan-hero">
        <CoachAvatar mood="spark" />
        <div>
          <ScreenHeader eyebrow="AI account scan" title="Welcome back, Alex. I reviewed your CIBC profile." subtitle="This saves you from answering questions CIBC already has context for." />
          <div className="coach-note">
            <Check size={18} />
            <span>I will not ask about information CIBC already knows. I only need to understand what you want this money to do.</span>
          </div>
        </div>
      </div>
      <div className="scan-grid">
        {[
          "Checking everyday banking",
          "Reviewing savings balance",
          "Looking for registered account opportunities",
          "Checking existing investment relationship",
          "Preparing one decision to explore"
        ].map((item, index) => (
          <div className="scan-step" key={item} style={{ animationDelay: `${index * 160}ms` }}>
            <Check size={17} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="detected-card">
        <div>
          <span>Detected opportunity</span>
          <strong>You may be ready to explore your first investment step.</strong>
          <p>I found available cash, unused registered-account opportunity, and no advisor conversation prepared yet.</p>
        </div>
        <button className="secondary-button" onClick={onShowDetails} type="button">
          {showDetails ? "Hide what I found" : "Show me what you found"}
          <ChevronDown size={16} />
        </button>
      </div>
      {showDetails && (
        <div className="known-context">
          {[
            "Everyday Chequing Account",
            "$20,000 sitting in chequing / savings",
            "TFSA available or not used",
            "No current investment products",
            "No advisor conversation prepared yet"
          ].map((item) => (
            <div key={item}>
              <Check size={16} />
              {item}
            </div>
          ))}
        </div>
      )}
      <LearnMore resources={resources} />
      <div className="scan-actions">
        <button className="primary-button" onClick={onStart} type="button">
          Start with my goal
          <ArrowRight size={18} />
        </button>
        <button className="text-button" onClick={onShowDetails} type="button">
          Show me what you found
        </button>
      </div>
    </section>
  );
}

function playgroundReaction(state: CoachState, top: Strategy) {
  if (state.whatIf === "sooner") return `Interesting. Liquidity is more important now, so ${top.name} moves ahead.`;
  if (state.whatIf === "longer") return `Nice catch. A longer timeline makes growth and account fit more relevant.`;
  if (state.whatIf === "growth") return "That changes things. I’m allowing more market movement in the comparison.";
  if (state.whatIf === "safety") return "I’ll prioritize capital preservation over higher return.";
  if (state.whatIf === "home") return "Now the account conversation shifts toward FHSA and TFSA.";
  return "Try a scenario to see the strategy change.";
}

function CoachRail({ progress, reaction, step }: { progress: { considered: number; remaining: number }; reaction: string; step: Step }) {
  return (
    <aside className="coach-rail">
      <CoachAvatar mood={step === "playground" ? "spark" : "calm"} />
      <div className="coach-bubble">
        <span>AI Coach</span>
        <p>{reaction}</p>
      </div>
      <div className="narrowing-meter">
        <span>Considered</span>
        <strong>{progress.considered}</strong>
        <i />
        <span>Still relevant</span>
        <strong>{progress.remaining}</strong>
      </div>
    </aside>
  );
}

function ScreenHeader({ eyebrow, subtitle, title }: { eyebrow: string; subtitle: string; title: string }) {
  return (
    <header className="screen-header">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

function SignalPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="signal-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StrategyCards({
  openWhy,
  setOpenWhy,
  strategies
}: {
  openWhy: string | null;
  setOpenWhy: (id: string | null) => void;
  strategies: Strategy[];
}) {
  return (
    <div className="strategy-grid">
      {strategies.map((strategy, index) => (
        <article className={index === 0 ? "strategy-card active" : "strategy-card"} key={strategy.id}>
          <div className="rank">#{index + 1}</div>
          <h2>{strategy.name}</h2>
          <Stars count={strategy.rating} />
          <p>{index === 0 ? strategy.bestBecause : strategy.whyNot}</p>
          <div className="mix-line">
            <span>{strategy.accounts.slice(0, 2).join(" + ")}</span>
            <ArrowRight size={16} />
            <span>{strategy.products.slice(0, 2).join(" + ")}</span>
          </div>
          <button className="why-button" onClick={() => setOpenWhy(openWhy === strategy.id ? null : strategy.id)} type="button">
            Why {index === 0 ? "ranked #1" : "not #1"}?
            <ChevronDown size={16} />
          </button>
          {openWhy === strategy.id && (
            <div className="why-panel">
              {index === 0 ? strategy.bestBecause : strategy.whyNot}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return <div className="stars">{"★".repeat(count)}{"☆".repeat(5 - count)}</div>;
}

function VisualSuite({ compact, state, strategies }: { compact?: boolean; state: CoachState; strategies: Strategy[] }) {
  return (
    <div className={compact ? "visual-suite compact" : "visual-suite"}>
      <LineVisual amount={state.amount} strategies={strategies} />
      <RiskMap strategies={strategies} />
      <Meters strategies={strategies} />
    </div>
  );
}

function LineVisual({ amount, strategies }: { amount: number; strategies: Strategy[] }) {
  const width = 760;
  const height = 340;
  const plot = { left: 76, right: 600, top: 48, bottom: 258 };
  const min = Math.min(...strategies.flatMap((s) => s.values)) * 0.99;
  const max = Math.max(...strategies.flatMap((s) => s.values)) * 1.01;
  const x = (i: number) => plot.left + i * ((plot.right - plot.left) / 4);
  const y = (v: number) => plot.top + ((max - v) / (max - min)) * (plot.bottom - plot.top);
  const colors = ["#8f0034", "#b88935", "#49686f"];
  return (
    <figure className="chart-card line-card">
      <figcaption>
        <strong>Projected path</strong>
        <span>Illustrative only</span>
      </figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Projected strategy paths">
        {[0, 1, 2, 3].map((line) => {
          const lineY = plot.top + line * ((plot.bottom - plot.top) / 3);
          return <line className="grid-line" key={line} x1={plot.left} x2={plot.right} y1={lineY} y2={lineY} />;
        })}
        {strategies.map((strategy, si) => {
          const d = strategy.values.map((value, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(value)}`).join(" ");
          return (
            <g className={si === 0 ? "series active" : "series"} key={strategy.id}>
              <path d={d} fill="none" stroke={colors[si]} />
              <circle cx={x(4)} cy={y(strategy.values[4])} r={si === 0 ? 7 : 6} fill={colors[si]} />
              <text fill={colors[si]} x={plot.right + 20} y={y(strategy.values[4]) + 5}>{formatCurrency(strategy.values[4])}</text>
            </g>
          );
        })}
        <text className="axis-label x-axis" x={plot.left} y="318">Now</text>
        <text className="axis-label x-axis" x={plot.left + (plot.right - plot.left) / 2} y="318">12M</text>
        <text className="axis-label x-axis" x={plot.right} y="318">24M</text>
        <text className="axis-label" x={plot.left - 10} y={plot.bottom + 4}>{formatCurrency(amount)}</text>
      </svg>
    </figure>
  );
}

function RiskMap({ strategies }: { strategies: Strategy[] }) {
  const shortName = (name: string) => name
    .replace(" Strategy", "")
    .replace("First Step", "First step")
    .replace("Registered Account", "Registered")
    .replace("Longer-Term Growth", "Growth");

  return (
    <figure className="chart-card risk-card">
      <figcaption>
        <strong>Risk vs return</strong>
        <span>Fit, not promises</span>
      </figcaption>
      <svg viewBox="0 0 760 340" role="img" aria-label="Risk return map">
        <line className="grid-line" x1="86" x2="668" y1="276" y2="276" />
        <line className="grid-line" x1="86" x2="86" y1="54" y2="276" />
        <text className="axis-label x-axis" x="584" y="318">Higher return potential</text>
        <text className="axis-label" x="72" y="62">Higher movement</text>
        <text className="map-note" x="104" y="314">Lower movement</text>
        {strategies.map((strategy, index) => {
          const cx = 100 + strategy.returnPotential * 6.5;
          const cy = 274 - strategy.risk * 3.05;
          const labelOffsets = [
            { dx: 26, dy: 6 },
            { dx: 24, dy: -26 },
            { dx: 24, dy: 34 }
          ];
          const { dx, dy } = labelOffsets[index] ?? labelOffsets[0];
          const labelX = Math.min(cx + dx, 612);
          const labelY = Math.max(70, Math.min(cy + dy, 262));
          return (
            <g className={index === 0 ? "point active" : "point"} key={strategy.id}>
              <circle cx={cx} cy={cy} r={index === 0 ? 20 : 15} />
              <line className="point-guide" x1={cx + 18} x2={labelX - 6} y1={cy} y2={labelY - 5} />
              <text x={labelX} y={labelY}>{shortName(strategy.name)}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function Meters({ strategies }: { strategies: Strategy[] }) {
  return (
    <div className="meter-card">
      <strong>Liquidity and confidence</strong>
      {strategies.map((strategy, index) => (
        <div className={index === 0 ? "meter-row active" : "meter-row"} key={strategy.id}>
          <span>{strategy.name}</span>
          <div><i style={{ width: `${strategy.liquidity}%` }} /></div>
          <b>{strategy.rating * 20}%</b>
        </div>
      ))}
    </div>
  );
}

function LearnMore({ resources }: { resources: Resource[] }) {
  return (
    <aside className="learn-more" aria-label="Learn more from CIBC">
      <div>
        <span>Learn more from CIBC</span>
        <p>I've selected resources that match this step.</p>
      </div>
      <div className="resource-grid">
        {resources.slice(0, 3).map((resource) => (
          <a href={resource.href} key={resource.title}>
            <strong>{resource.title}</strong>
            <small>{resource.description}</small>
          </a>
        ))}
      </div>
    </aside>
  );
}

function AdvisorReady({
  copied,
  onCopy,
  onRestart,
  onSimulate,
  state,
  strategies
}: {
  copied: boolean;
  onCopy: () => void;
  onRestart: () => void;
  onSimulate: () => void;
  state: CoachState;
  strategies: Strategy[];
}) {
  const top = strategies[0];
  const email = [
    "Hello,",
    "",
    "I used the CIBC AI Financial Coach to prepare for our conversation.",
    "",
    `Goal: ${goalLabels[state.goal]}`,
    `Amount: ${formatCurrency(state.amount)}`,
    `Priority: ${priorityLabels[state.priority]}`,
    `Strategy I would like to discuss: ${top.name}`,
    "",
    `Why it seems to fit: ${top.bestBecause}`,
    "",
    "Questions:",
    "- Which account type should I use first?",
    "- How much should stay accessible?",
    "- What should I avoid given my timeline?",
    "",
    "Please review suitability, eligibility, rates, tax treatment, and investment risk."
  ].join("\n");

  return (
    <section className="decision-card ready-card">
      <ScreenHeader eyebrow="Question 6" title="Now you’re ready." subtitle="You can explain why the strategy fits before your appointment." />
      <div className="readiness-card">
        <span>Advisor Readiness</span>
        <strong>100%</strong>
        <div className="readiness-meter"><i style={{ width: "100%" }} /></div>
      </div>
      <div className="summary-strip">
        <SignalPill label="Goal" value={goalLabels[state.goal]} />
        <SignalPill label="Top strategy" value={top.name} />
        <SignalPill label="Why" value={top.bestBecause} />
      </div>
      <div className="email-draft-card">
        <div className="email-draft-header">
          <strong>Draft email to your CIBC advisor</strong>
          <Mail size={22} />
        </div>
        <pre>{email}</pre>
        <div className="email-actions">
          <button className="primary-button" onClick={onCopy} type="button">
            {copied ? "Draft copied" : "Copy draft"}
            <Check size={18} />
          </button>
          <a className="secondary-button" href={`mailto:?subject=${encodeURIComponent("Prepared for my CIBC advisor conversation")}&body=${encodeURIComponent(email)}`}>
            Open email
            <Mail size={18} />
          </a>
        </div>
      </div>
      <LearnMore resources={resourcesFor(state, "ready")} />
      <div className="summary-actions">
        <button className="primary-button" type="button">
          Book a CIBC advisor
          <CalendarDays size={18} />
        </button>
        <button className="secondary-button" type="button">
          Save summary
          <Download size={18} />
        </button>
        <button className="secondary-button" onClick={onSimulate} type="button">
          Compare another scenario
          <RefreshCcw size={18} />
        </button>
        <button className="text-button" onClick={onRestart} type="button">
          Restart
        </button>
      </div>
      <p className="disclaimer">Information is educational and illustrative. Product suitability, rates, eligibility, tax treatment, and investment risk should be reviewed with a CIBC advisor.</p>
    </section>
  );
}

function CoachAvatar({ mood = "calm" }: { mood?: "calm" | "spark" }) {
  return (
    <div className={`coach-avatar ai-orb ${mood}`} aria-label="CIBC AI assistant mark" role="img">
      <span className="orb-halo halo-one" />
      <span className="orb-halo halo-two" />
      <span className="orb-ring ring-one" />
      <span className="orb-ring ring-two" />
      <span className="orb-core">
        <span className="orb-glow" />
        <span className="orb-sheen" />
        <span className="orb-symbol">
          <Sparkles size={28} strokeWidth={2.2} />
        </span>
        <span className="orb-chip">CIBC</span>
      </span>
      <span className="orb-dot dot-one" />
      <span className="orb-dot dot-two" />
      <span className="orb-dot dot-three" />
    </div>
  );
}

export default App;
