import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  CircleDollarSign,
  Coffee,
  CreditCard,
  GraduationCap,
  Home,
  KeyRound,
  Landmark,
  Laptop,
  Map,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Text,
  Train,
  WalletCards
} from "lucide-react";
import { type ElementType, type ReactNode, useMemo, useState } from "react";
import buddiesImage from "../assets/generated/student-life-buddies.png";
import heroImage from "../assets/generated/student-life-coach-hero.png";

type StepId = "start" | "scan" | "chat" | "tuition" | "housing" | "insurance" | "banking" | "budget" | "summary";
type Concern = "Paying tuition" | "Finding rent money" | "OSAP" | "Building credit" | "Managing monthly spending" | "Working part-time" | "I'm not sure";
type Living = "Residence" | "Renting off-campus" | "Living at home";
type Transport = "Transit" | "Car" | "Ride share" | "Walking/biking";

type Profile = {
  name: string;
  university: string;
  program: string;
  year: string;
  international: boolean;
  living: Living;
  transport: Transport;
  tuition: number;
  books: number;
  rent: number;
  utilities: number;
  groceries: number;
  phone: number;
  entertainment: number;
  carCosts: number;
  osapStatus: "Not started" | "Applied" | "Approved";
  osapTotal: number;
  savings: number;
  familySupport: number;
  partTimeIncome: number;
  emergencyBuffer: number;
  hasCibcAccount: boolean;
  hasCreditCard: boolean;
  concern: Concern;
  utilitiesIncluded: boolean;
  needsGuarantor: boolean;
  needsDeposit: boolean;
  furnitureBudget: number;
  tenantInsurance: boolean;
};

type ResourceCard = {
  title: string;
  category: string;
  description: string;
  url: string;
  icon: ElementType;
};

const cibcLinks = {
  studentHub: "https://www.cibc.com/en/student/student-hub.html",
  studentBanking: "https://www.cibc.com/en/student/bank-accounts.html",
  studentBankingProducts: "https://www.cibc.com/en/student/banking-products.html",
  bundle: "https://www.cibc.com/en/student/credit-card-bank-accounts-bundle.html",
  creditCards: "https://www.cibc.com/en/student/credit-cards.html",
  creditGuide: "https://www.cibc.com/en/student/student-life/scoring-high-with-credit.html",
  creditBasics: "https://www.cibc.com/en/student/student-life/credit-card-101.html",
  educationLineOfCredit: "https://www.cibc.com/en/student/student-lines-of-credit/education-line-of-credit.html",
  professionalEdge: "https://www.cibc.com/en/student/student-lines-of-credit/professional-students.html",
  internationalStudents: "https://www.cibc.com/en/student/student-hub/international-students.html",
  internationalGic: "https://www.cibc.com/en/special-offers/international-student-gic.html",
  budgeting: "https://www.cibc.com/en/student/student-life/getting-smart-about-budgets.html",
  studentBudgetCalculator: "https://www.cibc.com/en/personal-banking/smart-advice/tools-calculators/student-budget-calculator.html",
  alerts: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/set-alerts.html",
  appointment: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/appointment-booking.html"
};

const steps: { id: StepId; label: string }[] = [
  { id: "start", label: "Start" },
  { id: "scan", label: "Profile" },
  { id: "chat", label: "Setup" },
  { id: "tuition", label: "Funding" },
  { id: "housing", label: "Living" },
  { id: "insurance", label: "Safety" },
  { id: "banking", label: "Banking" },
  { id: "budget", label: "Budget" },
  { id: "summary", label: "Ready" }
];

const timelineStages = [
  { label: "Today", detail: "Scan profile", step: 1, icon: Sparkles },
  { label: "Before July", detail: "Funding picture", step: 3, icon: ReceiptText },
  { label: "Before August", detail: "Banking setup", step: 6, icon: WalletCards },
  { label: "Move-in", detail: "Deposit and keys", step: 4, icon: KeyRound },
  { label: "Tuition deadline", detail: "OSAP and gap", step: 3, icon: CalendarDays },
  { label: "First week", detail: "Alerts and safety", step: 5, icon: ShieldCheck },
  { label: "First month", detail: "Budget test", step: 7, icon: Coffee }
];

const initialProfile: Profile = {
  name: "Maya",
  university: "Western University",
  program: "Business",
  year: "First year",
  international: false,
  living: "Renting off-campus",
  transport: "Transit",
  tuition: 9800,
  books: 1100,
  rent: 1125,
  utilities: 95,
  groceries: 420,
  phone: 70,
  entertainment: 210,
  carCosts: 0,
  osapStatus: "Approved",
  osapTotal: 5200,
  savings: 2800,
  familySupport: 2500,
  partTimeIncome: 640,
  emergencyBuffer: 250,
  hasCibcAccount: false,
  hasCreditCard: false,
  concern: "Managing monthly spending",
  utilitiesIncluded: false,
  needsGuarantor: true,
  needsDeposit: true,
  furnitureBudget: 650,
  tenantInsurance: true
};

const concernOptions: Concern[] = [
  "Paying tuition",
  "Finding rent money",
  "OSAP",
  "Building credit",
  "Managing monthly spending",
  "Working part-time",
  "I'm not sure"
];

const cibcResources: Record<string, ResourceCard> = {
  studentBanking: {
    title: "CIBC Smart for Students",
    category: "No-monthly-fee student banking",
    description: "A student chequing setup for everyday payments, deposits, and school-year cash flow.",
    url: cibcLinks.studentBanking,
    icon: Landmark
  },
  bundle: {
    title: "CIBC Best Student Life Bundle",
    category: "Student banking bundle",
    description: "Review chequing, savings, credit, and everyday banking needs together.",
    url: cibcLinks.bundle,
    icon: WalletCards
  },
  creditCard: {
    title: "Student Credit Cards",
    category: "Credit building",
    description: "Use it to build credit history, not to spend beyond your budget.",
    url: cibcLinks.creditCards,
    icon: CreditCard
  },
  lineOfCredit: {
    title: "CIBC Education Line of Credit",
    category: "Funding discussion option",
    description: "Worth discussing if timing, tuition, or living costs create a funding gap.",
    url: cibcLinks.educationLineOfCredit,
    icon: CircleDollarSign
  },
  professionalEdge: {
    title: "Professional Edge Student Program",
    category: "Professional program support",
    description: "A resource to review if your path leads into a professional degree.",
    url: cibcLinks.professionalEdge,
    icon: BriefcaseBusiness
  },
  internationalAccount: {
    title: "International Student Bank Account",
    category: "Arrival banking",
    description: "Start Canadian banking setup before and during your move to campus.",
    url: cibcLinks.internationalStudents,
    icon: Building2
  },
  gic: {
    title: "International Student GIC Program",
    category: "Study permit planning",
    description: "Review the CIBC GIC pathway for eligible international students before arrival.",
    url: cibcLinks.internationalGic,
    icon: PiggyBank
  },
  creditGuide: {
    title: "Credit Score Guide",
    category: "Credit education",
    description: "Learn how payment history, limits, and utilization affect a student credit profile.",
    url: cibcLinks.creditGuide,
    icon: BookOpen
  },
  tips: {
    title: "Student Budgeting Tips",
    category: "Money habits",
    description: "Short tips for tuition deadlines, fraud awareness, alerts, and everyday spending.",
    url: cibcLinks.budgeting,
    icon: Sparkles
  },
  advisor: {
    title: "Book a CIBC Student Banking Appointment",
    category: "Advisor / banking centre",
    description: "Bring your plan, funding questions, and product shortlist to a guided conversation.",
    url: cibcLinks.appointment,
    icon: CalendarDays
  },
  alerts: {
    title: "CIBC Account Alerts",
    category: "Safety controls",
    description: "Set up transaction, profile, credit card, and fraud alerts through CIBC digital banking.",
    url: cibcLinks.alerts,
    icon: ShieldCheck
  },
  budgetCalculator: {
    title: "Student Budget Calculator",
    category: "Student planning tool",
    description: "Use CIBC's student budget calculator to estimate school costs, funding, and results.",
    url: cibcLinks.studentBudgetCalculator,
    icon: ReceiptText
  }
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function calculateBudget(profile: Profile) {
  const rent = profile.living === "Living at home" ? 0 : profile.rent;
  const utilities = profile.utilitiesIncluded || profile.living === "Living at home" ? 0 : profile.utilities;
  const transport =
    profile.transport === "Car" ? profile.carCosts : profile.transport === "Ride share" ? 160 : profile.transport === "Transit" ? 128 : 20;
  const expenses = rent + utilities + profile.groceries + transport + profile.phone + profile.entertainment + profile.emergencyBuffer;
  const osapMonthly = profile.osapStatus === "Approved" ? Math.round(profile.osapTotal / 8) : profile.osapStatus === "Applied" ? Math.round(profile.osapTotal / 10) : 0;
  const income = profile.partTimeIncome + profile.familySupport / 8 + osapMonthly;
  const surplus = Math.round(income - expenses);
  const readiness = surplus >= 150 ? "green" : surplus >= -150 ? "yellow" : "red";
  return { rent, utilities, transport, expenses, osapMonthly, income, surplus, readiness };
}

function budgetLabel(value: number) {
  return value >= 0 ? `${formatCurrency(value)} surplus` : `${formatCurrency(Math.abs(value))} shortfall`;
}

function scenarioImpact(before: number, after: number) {
  const worsened = after < before;
  const improved = after > before;
  if (worsened) return `Your monthly position moves from ${budgetLabel(before)} to ${budgetLabel(after)}.`;
  if (improved) return `Your monthly position improves from ${budgetLabel(before)} to ${budgetLabel(after)}.`;
  return `Your monthly position stays near ${budgetLabel(after)}.`;
}

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [scenarioNote, setScenarioNote] = useState("Your base plan is ready to test.");
  const step = steps[stepIndex].id;

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile((current) => ({ ...current, ...updates }));
  };

  const funding = useMemo(() => {
    const tuitionNeed = profile.tuition + profile.books;
    const upfrontHousing =
      profile.living === "Renting off-campus" ? profile.rent + (profile.needsDeposit ? profile.rent : 0) + profile.furnitureBudget : 0;
    const need = tuitionNeed + upfrontHousing;
    const osap = profile.osapStatus === "Approved" ? profile.osapTotal : profile.osapStatus === "Applied" ? profile.osapTotal * 0.65 : 0;
    const available = osap + profile.savings + profile.familySupport;
    return { tuitionNeed, upfrontHousing, need, osap, available, gap: Math.max(0, need - available) };
  }, [profile]);

  const budget = useMemo(() => calculateBudget(profile), [profile]);

  const next = () => setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const back = () => setStepIndex((current) => Math.max(current - 1, 0));

  const applyScenario = (scenario: string) => {
    const before = budget;
    let nextProfile = profile;
    let lead = "";
    if (scenario === "work") {
      nextProfile = { ...profile, partTimeIncome: 880 };
      lead = "Working 8 hrs/week helps, as long as it does not crowd out class time.";
    }
    if (scenario === "rent") {
      nextProfile = { ...profile, rent: profile.rent + 150 };
      lead = "Rent is fixed once the lease is signed, so test increases before committing.";
    }
    if (scenario === "car") {
      nextProfile = { ...profile, transport: "Car", carCosts: 520 };
      lead = "A car increases your monthly cost by about $520. Transit may be safer for first semester.";
    }
    if (scenario === "home") {
      nextProfile = { ...profile, living: "Living at home", rent: 0, utilities: 0, transport: "Transit", carCosts: 0 };
      lead = "Living at home frees up cash for tuition, books, and an emergency buffer.";
    }
    if (scenario === "osap") {
      nextProfile = { ...profile, osapStatus: "Not started" };
      lead = "If OSAP is delayed, your first-month cash gap can jump before aid arrives.";
    }
    if (scenario === "books") {
      nextProfile = { ...profile, books: profile.books + 450, entertainment: Math.max(0, profile.entertainment - 40) };
      lead = "Textbooks often arrive early. Plan them before the first credit card bill.";
    }
    const after = calculateBudget(nextProfile);
    setProfile(nextProfile);
    setScenarioNote(`${lead} ${scenarioImpact(before.surplus, after.surplus)}`);
  };

  return (
    <main className="app-shell">
      {step !== "start" && (
        <header className="topbar">
          <button className="brand-button" onClick={() => setStepIndex(0)}>
            <span className="brand-mark">CIBC</span>
            <span>
              <strong>Student Life Financial Coach</strong>
              <small>From confusion to first-semester readiness</small>
            </span>
          </button>
          <ReadinessTimeline stepIndex={stepIndex} />
        </header>
      )}

      {step === "start" && <StartScreen profile={profile} updateProfile={updateProfile} next={next} />}
      {step === "scan" && <ScanScreen profile={profile} updateProfile={updateProfile} next={next} back={back} />}
      {step === "chat" && <ChatScreen profile={profile} updateProfile={updateProfile} next={next} back={back} fundingGap={funding.gap} />}
      {step === "tuition" && <TuitionScreen profile={profile} updateProfile={updateProfile} next={next} back={back} funding={funding} />}
      {step === "housing" && <HousingScreen profile={profile} updateProfile={updateProfile} next={next} back={back} budget={budget} />}
      {step === "insurance" && <InsuranceScreen profile={profile} next={next} back={back} />}
      {step === "banking" && <BankingScreen profile={profile} updateProfile={updateProfile} next={next} back={back} />}
      {step === "budget" && (
        <BudgetScreen
          profile={profile}
          updateProfile={updateProfile}
          next={next}
          back={back}
          budget={budget}
          scenarioNote={scenarioNote}
          applyScenario={applyScenario}
        />
      )}
      {step === "summary" && <SummaryScreen profile={profile} back={back} setStepIndex={setStepIndex} funding={funding} budget={budget} />}
    </main>
  );
}

function ReadinessTimeline({ stepIndex }: { stepIndex: number }) {
  const activeStep = steps[stepIndex];
  return (
    <div className="readiness-timeline" aria-label="First Semester Readiness Timeline">
      <div className="progress-meta">
        <span>First Semester Readiness Timeline</span>
        <strong>{Math.round((stepIndex / (steps.length - 1)) * 100)}%</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }} />
      </div>
      <div className="timeline-steps">
        {timelineStages.map((stage) => {
          const Icon = stage.icon;
          const isDone = stepIndex >= stage.step;
          const isActive = activeStep.id !== "summary" && stepIndex === stage.step;
          return (
            <div key={stage.label} className={`${isDone ? "done" : ""} ${isActive ? "current" : ""}`}>
              <span>{isDone ? <Check size={13} /> : <Icon size={13} />}</span>
              <strong>{stage.label}</strong>
              <small>{stage.detail}</small>
            </div>
          );
        })}
      </div>
      <div className="current-journey">
        {timelineStages
          .filter((stage) => stage.step <= stepIndex)
          .slice(-1)
          .map((stage) => (
            <span key={stage.label}>Now preparing: {stage.label}</span>
          ))}
        {stepIndex === 0 && <span>Start with today’s plan</span>}
      </div>
    </div>
  );
}

function MiniJourney({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="mini-journey" aria-hidden="true">
      {timelineStages.map((stage) => (
        <span key={stage.label} className={stepIndex >= stage.step ? "done" : ""} />
      ))}
    </div>
  );
}

function TransitionNote({ text }: { text: string }) {
  return (
    <div className="transition-note">
      <Sparkles size={18} />
      <span>{text}</span>
    </div>
  );
}

function RevealCards({ cards }: { cards: { title: string; text: string; icon: ElementType }[] }) {
  const [openCard, setOpenCard] = useState(0);
  return (
    <div className="reveal-grid">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const open = openCard === index;
        return (
          <button key={card.title} className={open ? "reveal-card open" : "reveal-card"} onClick={() => setOpenCard(open ? -1 : index)}>
            <Icon size={22} />
            <strong>{card.title}</strong>
            <p>{open ? card.text : "Tap to see why this matters."}</p>
          </button>
        );
      })}
    </div>
  );
}

function JourneySnapshot({ profile, fundingGap, budgetSurplus }: { profile: Profile; fundingGap: number; budgetSurplus: number }) {
  const items: [string, string, ElementType][] = [
    ["Tuition deadline", fundingGap > 0 ? "Needs a conversation" : "Covered on paper", ReceiptText],
    ["Move-in", profile.needsDeposit ? "Deposit pending" : "Deposit checked", KeyRound],
    ["Before August", profile.hasCibcAccount ? "Banking started" : "Student account next", WalletCards],
    ["First month", budgetLabel(budgetSurplus), Coffee]
  ];
  return (
    <div className="journey-snapshot">
      {items.map(([label, value, icon]) => {
        const Icon = icon as ElementType;
        return (
          <div key={String(label)}>
            <Icon size={18} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        );
      })}
    </div>
  );
}

function buddyForStep(stepIndex = 0) {
  if (stepIndex <= 3) return "tuition";
  if (stepIndex <= 5) return "movein";
  return "budget";
}

function SupportBuddy({ variant = "tuition", compact = false }: { variant?: string; compact?: boolean }) {
  return (
    <span className={`support-buddy ${variant} ${compact ? "compact" : ""}`}>
      <img src={buddiesImage} alt="" />
    </span>
  );
}

function CharacterBand() {
  return (
    <div className="character-band">
      <img src={buddiesImage} alt="Friendly student guide characters with tuition, move-in, and everyday spending items" />
      <div>
        <span>Your student-life guides</span>
        <strong>Tuition, move-in, banking, and first-month spending, one step at a time.</strong>
      </div>
    </div>
  );
}

function StartScreen({ profile, updateProfile, next }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void }) {
  return (
    <section className="start-screen page">
      <div className="start-copy">
        <div className="cibc-lockup">
          <span>CIBC</span>
          <strong>Student Life Financial Coach</strong>
        </div>
        <h1>Start university with a clear money plan.</h1>
        <p>CIBC Student Life Financial Coach helps you plan tuition, housing, banking, credit, and everyday spending before the semester starts.</p>
        <div className="start-actions">
          <button className="primary-button" onClick={next}>
            Start my student plan <ArrowRight size={18} />
          </button>
          <button
            className={`secondary-button ${profile.international ? "selected" : ""}`}
            onClick={() => {
              updateProfile({ international: true, osapStatus: "Not started", osapTotal: 0, familySupport: 4200 });
              next();
            }}
          >
            I&apos;m an international student
          </button>
        </div>
        <div className="promise-strip">
          <span><GraduationCap size={17} /> Tuition</span>
          <span><KeyRound size={17} /> Rent</span>
          <span><Train size={17} /> Transit</span>
          <span><CreditCard size={17} /> Credit</span>
        </div>
        <div className="start-map" aria-label="First semester readiness preview">
          {timelineStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.label}>
                <Icon size={16} />
                <span>{stage.label}</span>
              </div>
            );
          })}
        </div>
        <CharacterBand />
      </div>
      <div className="hero-panel">
        <img src={heroImage} alt="Student desk with laptop, transit card, notebook, coffee, dorm key, tuition bill, and a friendly AI orb" />
        <div className="floating-card tuition-card">
          <ReceiptText size={19} />
          <span>Tuition deadline</span>
          <strong>Plan before September</strong>
        </div>
        <div className="floating-card coffee-card">
          <Coffee size={19} />
          <span>Everyday spend</span>
          <strong>Know the monthly number</strong>
        </div>
      </div>
    </section>
  );
}

function ScanScreen({ profile, updateProfile, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void }) {
  const scanItems = [
    ["University", profile.university],
    ["Program", profile.program],
    ["Year", profile.year],
    ["Living", profile.living],
    ["Expected tuition", formatCurrency(profile.tuition)],
    ["Expected rent", formatCurrency(profile.rent)],
    ["OSAP", profile.international ? "Not applicable" : profile.osapStatus],
    ["CIBC account", profile.hasCibcAccount ? "Already has one" : "Not yet"],
    ["Credit card", profile.hasCreditCard ? "Yes" : "No"],
    ["Part-time job", "Considering"]
  ];

  return (
    <FlowScreen
      eyebrow="AI Student Profile Scan"
      title={`Welcome, ${profile.name}. I’ll help you prepare for your first semester.`}
      coach="I won’t ask everything at once. We’ll build your student money plan step by step."
      transition="Since tuition and monthly spending are connected, let’s pick the first thing to calm down."
      nextLabel="Set my first priority"
      next={next}
      back={back}
      timelineIndex={1}
    >
      <div className="scan-layout">
        <div className="orb-card">
          <div className="ai-orb" />
          <Sparkles size={22} />
          <strong>Profile scan complete</strong>
          <p>Known context plus a few editable assumptions are enough to start.</p>
        </div>
        <div className="context-grid">
          {scanItems.map(([label, value]) => (
            <div className="context-tile" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
      <JourneySnapshot profile={profile} fundingGap={profile.tuition + profile.books - profile.savings - profile.familySupport} budgetSurplus={calculateBudget(profile).surplus} />
      <div className="choice-row">
        <button className={!profile.international ? "choice active" : "choice"} onClick={() => updateProfile({ international: false, osapTotal: 5200 })}>
          Domestic student
        </button>
        <button className={profile.international ? "choice active" : "choice"} onClick={() => updateProfile({ international: true, osapTotal: 0, familySupport: 4200 })}>
          International student
        </button>
      </div>
    </FlowScreen>
  );
}

function ChatScreen({ profile, updateProfile, next, back, fundingGap }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void; fundingGap: number }) {
  const understood = [
    ["Main concern", profile.concern],
    ["Funding gap", fundingGap > 0 ? formatCurrency(fundingGap) : "No clear gap yet"],
    ["Housing need", profile.living],
    ["Transportation need", profile.transport],
    ["Credit readiness", profile.hasCreditCard ? "Has credit card" : "Needs careful setup"],
    ["Banking needs", profile.hasCibcAccount ? "Review alerts" : "Open student account"],
    ["Risk area", fundingGap > 0 ? "Payment timing" : "Monthly consistency"]
  ];

  return (
    <FlowScreen
      eyebrow="Student Life Setup Chat"
      title="What are you most worried about before school starts?"
      coach="Pick one worry. I’ll use it to decide which part of the plan to build first."
      transition="Since tuition is the deadline that can block registration, let’s solve that first."
      nextLabel="Build my first-semester plan"
      next={next}
      back={back}
      timelineIndex={2}
    >
      <div className="chat-panel">
        <div className="chat-bubble ai">What are you most worried about before school starts?</div>
        <div className="option-grid">
          {concernOptions.map((option) => (
            <button key={option} className={profile.concern === option ? "option active" : "option"} onClick={() => updateProfile({ concern: option })}>
              {option}
            </button>
          ))}
        </div>
        <div className="understood-card">
          <span className="section-kicker">Here’s what I understood</span>
          <div className="understood-grid">
            {understood.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FlowScreen>
  );
}

function TuitionScreen({ profile, updateProfile, next, back, funding }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void; funding: { tuitionNeed: number; upfrontHousing: number; need: number; osap: number; available: number; gap: number } }) {
  const max = Math.max(funding.need, 1);
  return (
    <FlowScreen
      eyebrow="Tuition + Funding Plan"
      title="How will the first semester get paid on time?"
      coach={funding.gap > 0 ? "You may want to discuss a student line of credit or payment timing with CIBC." : "Your current inputs cover the estimated school-start need. Now confirm timing."}
      transition="Great. Tuition is clearer now. Your next biggest fixed cost is housing."
      nextLabel="Plan housing and transportation"
      next={next}
      back={back}
      timelineIndex={3}
    >
      <div className="two-column">
        <div className="planner-card">
          <Slider label="Expected tuition" value={profile.tuition} min={4000} max={28000} step={250} onChange={(tuition) => updateProfile({ tuition })} />
          <Slider label="Books and supplies" value={profile.books} min={300} max={2500} step={50} onChange={(books) => updateProfile({ books })} />
          <div className="status-row">
            {(["Not started", "Applied", "Approved"] as const).map((status) => (
              <button key={status} className={profile.osapStatus === status ? "choice active" : "choice"} onClick={() => updateProfile({ osapStatus: status })} disabled={profile.international}>
                {profile.international && status !== "Not started" ? "N/A" : status}
              </button>
            ))}
          </div>
          <Slider label="Scholarships / savings ready" value={profile.savings} min={0} max={12000} step={250} onChange={(savings) => updateProfile({ savings })} />
          <Slider label="Family support" value={profile.familySupport} min={0} max={16000} step={250} onChange={(familySupport) => updateProfile({ familySupport })} />
          <div className="deadline-line">
            <CalendarDays size={18} />
            <span>Payment deadline timeline: deposit now, tuition in late summer, books before classes.</span>
          </div>
          <div className="scenario-grid funding-actions">
            <button onClick={() => updateProfile({ osapStatus: "Approved", osapTotal: Math.max(profile.osapTotal, 5200) })} disabled={profile.international}>OSAP approved</button>
            <button onClick={() => updateProfile({ savings: profile.savings + 1000 })}>Scholarship +$1,000</button>
            <button onClick={() => updateProfile({ familySupport: profile.familySupport + 500 })}>Family support +$500</button>
            <button onClick={() => updateProfile({ books: profile.books + 450 })}>Books cost more</button>
            <button onClick={() => updateProfile({ needsDeposit: true })}>Deposit due earlier</button>
          </div>
          <RevealCards
            cards={[
              { title: "Approval timing", text: "Aid may be approved after a school deposit is due. Keep a first-payment backup plan.", icon: CalendarDays },
              { title: "Deposit deadlines", text: "Housing deposits can arrive before OSAP money lands, so they belong in the tuition plan.", icon: KeyRound },
              { title: "First-month cash gap", text: "Books, transit, and rent can all hit before routine income starts.", icon: Coffee }
            ]}
          />
        </div>
        <div className="stack-card">
          <span className="section-kicker">Funding stack</span>
          <StackLine label="Tuition + books" value={funding.tuitionNeed} max={max} tone="need" />
          <StackLine label="Residence or rent impact" value={funding.upfrontHousing} max={max} tone="need-soft" />
          <StackLine label="Minus OSAP" value={funding.osap} max={max} tone="credit" />
          <StackLine label="Minus savings" value={profile.savings} max={max} tone="credit" />
          <StackLine label="Minus family support" value={profile.familySupport} max={max} tone="credit" />
          <div className={`gap-result ${funding.gap > 0 ? "warn" : "ok"}`}>
            <span>Equals funding gap</span>
            <strong>{formatCurrency(funding.gap)}</strong>
          </div>
        </div>
      </div>
      <ResourceGrid resources={[cibcResources.lineOfCredit, cibcResources.professionalEdge, cibcResources.advisor]} />
    </FlowScreen>
  );
}

function HousingScreen({ profile, updateProfile, next, back, budget }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void; budget: { rent: number; utilities: number; transport: number; expenses: number; readiness: string } }) {
  const livingOptions: Living[] = ["Residence", "Renting off-campus", "Living at home"];
  const transportOptions: { id: Transport; icon: ElementType }[] = [
    { id: "Transit", icon: Train },
    { id: "Car", icon: Car },
    { id: "Ride share", icon: Map },
    { id: "Walking/biking", icon: Home }
  ];

  return (
    <FlowScreen
      eyebrow="Housing + Transportation Plan"
      title="Where will you live, and how will you get around?"
      coach="Rent is your largest fixed cost. I’ll check if your monthly cash flow can support it."
      transition="Before move-in, let’s check deposits, tenant insurance, and transportation."
      nextLabel="Run a safety check"
      next={next}
      back={back}
      timelineIndex={4}
    >
      <div className="two-column">
        <div className="planner-card">
          <div className="choice-row compact">
            {livingOptions.map((option) => (
              <button key={option} className={profile.living === option ? "choice active" : "choice"} onClick={() => updateProfile({ living: option })}>
                {option}
              </button>
            ))}
          </div>
          {profile.living === "Renting off-campus" && (
            <>
              <Slider label="Monthly rent" value={profile.rent} min={650} max={2200} step={25} onChange={(rent) => updateProfile({ rent })} />
              <Slider label="Furniture budget" value={profile.furnitureBudget} min={0} max={1600} step={50} onChange={(furnitureBudget) => updateProfile({ furnitureBudget })} />
              <Toggle label="Utilities included?" checked={profile.utilitiesIncluded} onChange={(utilitiesIncluded) => updateProfile({ utilitiesIncluded })} />
              <Toggle label="Need guarantor?" checked={profile.needsGuarantor} onChange={(needsGuarantor) => updateProfile({ needsGuarantor })} />
              <Toggle label="First/last month deposit?" checked={profile.needsDeposit} onChange={(needsDeposit) => updateProfile({ needsDeposit })} />
              <Toggle label="Tenant insurance needed?" checked={profile.tenantInsurance} onChange={(tenantInsurance) => updateProfile({ tenantInsurance })} />
            </>
          )}
          <div className="transport-grid">
            {transportOptions.map(({ id, icon: Icon }) => (
              <button key={id} className={profile.transport === id ? "transport active" : "transport"} onClick={() => updateProfile({ transport: id, carCosts: id === "Car" ? 520 : 0 })}>
                <Icon size={19} />
                {id}
              </button>
            ))}
          </div>
          {profile.transport === "Car" && <Slider label="Car payment, gas, parking, insurance" value={profile.carCosts} min={250} max={1000} step={25} onChange={(carCosts) => updateProfile({ carCosts })} />}
          <RevealCards
            cards={[
              { title: "Utilities", text: "Students often budget rent but forget hydro, water, or heat if they are not included.", icon: Home },
              { title: "Furniture", text: "A desk, bed basics, cookware, and small move-in items can add up quickly.", icon: Laptop },
              { title: "Internet", text: "If internet is separate, treat it like rent: fixed, recurring, and hard to skip.", icon: Text }
            ]}
          />
        </div>
        <div className="movein-panel">
          <MoveInChecklist profile={profile} budget={budget} />
          <BreakdownCard
            title="Monthly living cost"
            items={[
              ["Rent", budget.rent],
              ["Utilities", budget.utilities],
              ["Groceries", profile.groceries],
              ["Transit / car", budget.transport],
              ["Phone", profile.phone],
              ["Subscriptions", profile.entertainment],
              ["Emergency buffer", profile.emergencyBuffer]
            ]}
            total={budget.expenses}
          />
        </div>
      </div>
    </FlowScreen>
  );
}

function InsuranceScreen({ profile, next, back }: { profile: Profile; next: () => void; back: () => void }) {
  const checklist = [
    ["Tenant insurance", profile.living === "Renting off-campus" ? "Review before signing" : "Check if needed"],
    ["Car insurance", profile.transport === "Car" ? "Include in monthly costs" : "Not in current plan"],
    ["Phone / laptop protection", "Know replacement cost"],
    ["Emergency fund", `${formatCurrency(profile.emergencyBuffer)} monthly target`],
    ["Fraud / scam awareness", "Watch tuition and rent payment requests"],
    ["Credit card alerts", "Turn on payment and spending alerts"]
  ];

  return (
    <FlowScreen
      eyebrow="Insurance + Safety Check"
      title="What should be protected before the semester starts?"
      coach="This is a light safety pass: protect essentials, add alerts, and avoid first-year surprises."
      transition="Good. Now that move-in risks are visible, let’s set up the banking habits that protect the plan."
      nextLabel="Set up banking and credit"
      next={next}
      back={back}
      timelineIndex={5}
    >
      <div className="safety-grid">
        {checklist.map(([label, value]) => (
          <div className="safety-item" key={label}>
            <ShieldCheck size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <RevealCards
        cards={[
          { title: "Spending alerts", text: "Alerts help a student catch overspending before rent or tuition money gets touched.", icon: CreditCard },
          { title: "Online banking security", text: "First year brings new landlords, clubs, roommates, and payment links. Verify before sending money.", icon: ShieldCheck },
          { title: "Credit card controls", text: "Set payment reminders and keep the card for planned purchases, not emergency guessing.", icon: CalendarDays }
        ]}
      />
      <ResourceGrid resources={[cibcResources.alerts, cibcResources.creditGuide, cibcResources.creditCard]} />
    </FlowScreen>
  );
}

function BankingScreen({ profile, updateProfile, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void }) {
  const resources = profile.international
    ? [cibcResources.internationalAccount, cibcResources.gic, cibcResources.bundle]
    : [cibcResources.studentBanking, cibcResources.bundle, cibcResources.creditCard];
  const setup = [
    ["Student chequing account", profile.hasCibcAccount ? "Started" : "Needs setup"],
    ["Savings pocket for tuition / rent", "Create before payments begin"],
    ["Student credit card for credit building", profile.hasCreditCard ? "Review limits" : "Consider carefully"],
    ["Alerts and budget controls", "Turn on right away"],
    ["Emergency buffer", formatCurrency(profile.emergencyBuffer)],
    ["Optional line of credit discussion", "Only if funding gap or timing issue remains"]
  ];

  return (
    <FlowScreen
      eyebrow="Banking + Credit Setup"
      title="What banking setup will support the first semester?"
      coach="Use a student credit card to build credit history, not to spend beyond your budget."
      transition="Now let’s test whether the monthly plan survives real student-life surprises."
      nextLabel="Open monthly simulator"
      next={next}
      back={back}
      timelineIndex={6}
    >
      <div className="two-column">
        <div className="setup-list">
          {setup.map(([label, value], index) => (
            <div className="setup-item" key={label}>
              <span>{index + 1}</span>
              <div>
                <strong>{label}</strong>
                <small>{value}</small>
              </div>
            </div>
          ))}
          <div className="choice-row compact">
            <button className={profile.hasCibcAccount ? "choice active" : "choice"} onClick={() => updateProfile({ hasCibcAccount: true })}>
              I have CIBC
            </button>
            <button className={profile.hasCreditCard ? "choice active" : "choice"} onClick={() => updateProfile({ hasCreditCard: !profile.hasCreditCard })}>
              Student credit card
            </button>
          </div>
          <RevealCards
            cards={[
              { title: "Pay on time", text: "Payment history matters most. Set an alert before the first statement arrives.", icon: CalendarDays },
              { title: "Keep utilization low", text: "A small planned balance is better than using most of the limit.", icon: CreditCard },
              { title: "Not extra income", text: "Credit can build history, but it should never hide a monthly shortfall.", icon: WalletCards }
            ]}
          />
        </div>
        <ResourceGrid resources={resources} compact />
      </div>
    </FlowScreen>
  );
}

function BudgetScreen({ profile, updateProfile, next, back, budget, scenarioNote, applyScenario }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void; budget: { rent: number; utilities: number; transport: number; expenses: number; income: number; osapMonthly: number; surplus: number; readiness: string }; scenarioNote: string; applyScenario: (scenario: string) => void }) {
  const scenarios = [
    ["work", "I work 8 hrs/week"],
    ["rent", "Rent increases by $150"],
    ["car", "I buy a car"],
    ["home", "I live at home"],
    ["osap", "OSAP is delayed"],
    ["books", "Textbooks cost more than expected"]
  ];

  return (
    <FlowScreen
      eyebrow="Monthly Budget Simulator"
      title="Can the monthly plan survive a real student-life surprise?"
      coach={scenarioNote}
      transition="You’ve tested the first month. Let’s turn this into a readiness plan you can bring to CIBC."
      nextLabel="See readiness summary"
      next={next}
      back={back}
      timelineIndex={7}
    >
      <div className="simulator-layout">
        <div className="planner-card">
          <Slider label="Monthly rent" value={profile.rent} min={0} max={2200} step={25} onChange={(rent) => updateProfile({ rent, living: rent === 0 ? "Living at home" : profile.living })} />
          <Slider label="Groceries" value={profile.groceries} min={200} max={800} step={25} onChange={(groceries) => updateProfile({ groceries })} />
          <Slider label="Transit / car" value={budget.transport} min={0} max={1000} step={20} onChange={(transportCost) => updateProfile({ transport: transportCost > 240 ? "Car" : profile.transport, carCosts: transportCost })} />
          <Slider label="Phone" value={profile.phone} min={35} max={140} step={5} onChange={(phone) => updateProfile({ phone })} />
          <Slider label="Entertainment" value={profile.entertainment} min={0} max={500} step={25} onChange={(entertainment) => updateProfile({ entertainment })} />
          <Slider label="Part-time income" value={profile.partTimeIncome} min={0} max={1600} step={40} onChange={(partTimeIncome) => updateProfile({ partTimeIncome })} />
          <Slider label="Family support monthly equivalent" value={Math.round(profile.familySupport / 8)} min={0} max={1600} step={25} onChange={(monthly) => updateProfile({ familySupport: monthly * 8 })} />
          <Slider label="OSAP monthly equivalent" value={budget.osapMonthly} min={0} max={1200} step={25} onChange={(monthly) => updateProfile({ osapStatus: monthly > 0 ? "Approved" : "Not started", osapTotal: monthly * 8 })} />
          <Slider label="Emergency buffer target" value={profile.emergencyBuffer} min={0} max={650} step={25} onChange={(emergencyBuffer) => updateProfile({ emergencyBuffer })} />
        </div>
        <div className="budget-results">
          <div className={`readiness ${budget.readiness}`}>
            <span>Monthly readiness</span>
            <strong>{budgetLabel(budget.surplus)}</strong>
          </div>
          <Waterfall budget={budget} profile={profile} />
          <div className="scenario-grid">
            {scenarios.map(([id, label]) => (
              <button key={id} onClick={() => applyScenario(id)}>
                <Sparkles size={16} />
                {label}
              </button>
            ))}
          </div>
          <SemesterTimeline readiness={budget.readiness} />
        </div>
      </div>
    </FlowScreen>
  );
}

function SummaryScreen({ profile, back, setStepIndex, funding, budget }: { profile: Profile; back: () => void; setStepIndex: (index: number) => void; funding: { gap: number; tuitionNeed: number; osap: number }; budget: { surplus: number; expenses: number; readiness: string } }) {
  const badges = [
    ["Tuition", funding.gap > 0 ? "Needs funding conversation" : "Payment path looks clear", funding.gap > 0 ? "red" : "green"],
    ["Housing", profile.needsDeposit || profile.tenantInsurance ? "Deposit and insurance pending" : "Move-in basics checked", profile.needsDeposit || profile.tenantInsurance ? "yellow" : "green"],
    ["Banking", profile.hasCibcAccount ? "Student account started" : "Student account not set up", profile.hasCibcAccount ? "green" : "red"],
    ["Budget", budget.surplus < 0 ? "Monthly shortfall detected" : "Monthly buffer detected", budget.readiness]
  ];
  const planSections = [
    {
      title: "What is ready",
      items: [
        `${profile.university} ${profile.year.toLowerCase()} context is mapped`,
        `${profile.living} housing scenario is priced`,
        `${profile.transport} transportation is included in monthly costs`
      ]
    },
    {
      title: "What still needs attention",
      items: [
        funding.gap > 0 ? `${formatCurrency(funding.gap)} funding gap before deadline` : "Confirm payment dates with the school",
        profile.hasCibcAccount ? "Turn on student banking alerts" : "Open a no-monthly-fee student account",
        profile.hasCreditCard ? "Keep credit use planned and paid on time" : "Review student credit card fit carefully"
      ]
    },
    {
      title: "Key risks before move-in",
      items: [
        profile.needsDeposit ? "First/last month deposit may arrive before regular cash flow" : "Deposit timing looks reviewed",
        profile.tenantInsurance ? "Tenant insurance still needs confirmation" : "Tenant insurance is not currently flagged",
        budget.surplus < 0 ? "First-month spending is higher than expected income" : "First-month buffer can absorb small surprises"
      ]
    },
    {
      title: "Questions to ask CIBC",
      items: [
        "Which student account setup fits tuition and rent payments?",
        "How should alerts be configured before September?",
        funding.gap > 0 ? "Is a student line of credit worth discussing for timing only?" : "How should extra savings be separated for tuition and rent?"
      ]
    }
  ];

  return (
    <FlowScreen
      eyebrow="Student Readiness Summary"
      title="Your First-Semester Money Plan"
      coach="CIBC helps students move from financial confusion to first-semester readiness."
      nextLabel="Compare another scenario"
      next={() => setStepIndex(7)}
      back={back}
      timelineIndex={8}
    >
      <div className="summary-layout">
        <div className={`summary-hero ${budget.readiness}`}>
          <SupportBuddy variant="budget" />
          <GraduationCap size={30} />
          <span>{profile.name} at {profile.university}</span>
          <strong>{budget.readiness === "green" ? "Ready with buffer" : budget.readiness === "yellow" ? "Almost ready" : "Needs a funding conversation"}</strong>
          <p>{budget.surplus >= 0 ? "Your plan has room for everyday changes." : "Your plan needs an adjustment before move-in."}</p>
          <div className="next-action">
            <span>Next best action</span>
            <strong>{funding.gap > 0 ? "Book a CIBC student banking appointment" : "Open student account and turn on alerts"}</strong>
          </div>
        </div>
        <div className="readiness-plan">
          <div className="badge-grid">
            {badges.map(([label, value, tone]) => (
              <div key={label} className={`readiness-badge ${tone}`}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          {planSections.map((section) => (
            <div key={section.title} className="plan-section">
              <strong>{section.title}</strong>
              {section.items.map((item) => (
                <p key={item}><Check size={15} /> {item}</p>
              ))}
            </div>
          ))}
          <div className="plan-section resources">
            <strong>CIBC resources to review</strong>
            <p><ChevronRight size={15} /> <a href={profile.international ? cibcLinks.internationalStudents : cibcLinks.studentBanking} target="_blank" rel="noreferrer">{profile.international ? "International student banking" : "CIBC Smart for Students"}</a></p>
            <p><ChevronRight size={15} /> <a href={cibcLinks.creditCards} target="_blank" rel="noreferrer">Student credit cards</a> and <a href={cibcLinks.creditGuide} target="_blank" rel="noreferrer">credit education</a></p>
            <p><ChevronRight size={15} /> <a href={cibcLinks.appointment} target="_blank" rel="noreferrer">Advisor / banking centre appointment</a></p>
          </div>
        </div>
      </div>
      <div className="cta-row">
        <a className="primary-button" href={cibcLinks.appointment} target="_blank" rel="noreferrer"><CalendarDays size={18} /> Book CIBC student banking appointment</a>
        <button className="secondary-button" onClick={() => window.print()}><Check size={18} /> Save plan</button>
        <a className="secondary-button" href={cibcLinks.studentBanking} target="_blank" rel="noreferrer"><Landmark size={18} /> Open student account</a>
        <a className="secondary-button" href={cibcLinks.creditCards} target="_blank" rel="noreferrer"><CreditCard size={18} /> Review student credit card options</a>
      </div>
    </FlowScreen>
  );
}

function MoveInChecklist({ profile, budget }: { profile: Profile; budget: { rent: number; utilities: number; transport: number; expenses: number; readiness: string } }) {
  const items: [string, string, boolean, ElementType][] = [
    ["Rent", formatCurrency(budget.rent), true, Home],
    ["First/last deposit", profile.needsDeposit ? formatCurrency(profile.rent) : "Not flagged", !profile.needsDeposit, KeyRound],
    ["Utilities", profile.utilitiesIncluded ? "Included" : formatCurrency(profile.utilities), profile.utilitiesIncluded, ReceiptText],
    ["Furniture", formatCurrency(profile.furnitureBudget), profile.furnitureBudget <= 600, Laptop],
    ["Tenant insurance", profile.tenantInsurance ? "Pending" : "Not flagged", !profile.tenantInsurance, ShieldCheck],
    ["Transit / car", profile.transport, true, Train]
  ];
  return (
    <div className="movein-checklist">
      <span className="section-kicker">Move-in readiness check</span>
      <div className="movein-grid">
        {items.map(([label, value, done, icon]) => {
          const Icon = icon as ElementType;
          return (
            <div key={String(label)} className={done ? "done" : ""}>
              <Icon size={18} />
              <div>
                <strong>{label}</strong>
                <small>{value}</small>
              </div>
              <Check size={16} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlowScreen({ eyebrow, title, coach, children, nextLabel, next, back, transition, timelineIndex }: { eyebrow: string; title: string; coach: string; children: ReactNode; nextLabel: string; next: () => void; back: () => void; transition?: string; timelineIndex?: number }) {
  return (
    <section className="flow-screen page">
      <div className="flow-heading">
        {typeof timelineIndex === "number" && <MiniJourney stepIndex={timelineIndex} />}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="coach-note">
          <SupportBuddy variant={buddyForStep(timelineIndex)} compact />
          <p>{coach}</p>
        </div>
      </div>
      <div className="flow-content">{children}</div>
      {transition && <TransitionNote text={transition} />}
      <div className="flow-actions">
        <button className="ghost-button" onClick={back}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="primary-button" onClick={next}>
          {nextLabel} <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <label className="slider-row">
      <span>
        <strong>{label}</strong>
        <em>{formatCurrency(value)}</em>
      </span>
      <input type="range" min={min} max={max} step={step} value={clamp(value, min, max)} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button className={checked ? "toggle active" : "toggle"} onClick={() => onChange(!checked)}>
      <span>{label}</span>
      <i>{checked ? "Yes" : "No"}</i>
    </button>
  );
}

function StackLine({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return (
    <div className={`stack-line ${tone}`}>
      <div>
        <span>{label}</span>
        <strong>{formatCurrency(value)}</strong>
      </div>
      <i><b style={{ width: `${Math.max(4, (value / max) * 100)}%` }} /></i>
    </div>
  );
}

function ResourceGrid({ resources, compact = false }: { resources: ResourceCard[]; compact?: boolean }) {
  return (
    <div className={compact ? "resource-grid compact" : "resource-grid"}>
      {resources.map((resource) => {
        const Icon = resource.icon;
        return (
          <a href={resource.url} className="resource-card" key={resource.title} target="_blank" rel="noreferrer" aria-label={`${resource.title}: official CIBC resource`}>
            <Icon size={22} />
            <span>{resource.category}</span>
            <strong>{resource.title}</strong>
            <p>{resource.description}</p>
            <small>Official CIBC resource <ChevronRight size={14} /></small>
          </a>
        );
      })}
    </div>
  );
}

function BreakdownCard({ title, items, total }: { title: string; items: [string, number][]; total: number }) {
  const max = Math.max(...items.map((item) => item[1]), 1);
  return (
    <div className="breakdown-card">
      <span className="section-kicker">{title}</span>
      {items.map(([label, value]) => (
        <div className="breakdown-line" key={label}>
          <span>{label}</span>
          <i><b style={{ width: `${Math.max(5, (value / max) * 100)}%` }} /></i>
          <strong>{formatCurrency(value)}</strong>
        </div>
      ))}
      <div className="total-row">
        <span>Total monthly cost</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </div>
  );
}

function Waterfall({ budget, profile }: { budget: { rent: number; utilities: number; transport: number; expenses: number; income: number; osapMonthly: number; surplus: number }; profile: Profile }) {
  const max = Math.max(budget.income, budget.expenses, 1);
  const bars: [string, number, string][] = [
    ["Income", budget.income, "positive"],
    ["Rent", budget.rent, "negative"],
    ["Groceries", profile.groceries, "negative"],
    ["Transit / car", budget.transport, "negative"],
    ["Phone", profile.phone, "negative"],
    ["Life", profile.entertainment, "negative"],
    ["Buffer", profile.emergencyBuffer, "buffer"]
  ];
  return (
    <div className="waterfall-card">
      <div className="waterfall-top">
        <span>Cash flow waterfall</span>
        <strong>{formatCurrency(budget.income)} in / {formatCurrency(budget.expenses)} out</strong>
      </div>
      <div className="waterfall-bars">
        {bars.map(([label, value, tone]) => (
          <div className={`waterfall-bar ${tone}`} key={label}>
            <i style={{ height: `${Math.max(12, (value / max) * 100)}%` }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemesterTimeline({ readiness }: { readiness: string }) {
  const points = ["Deposit", "Tuition", "Books", "Move-in", "First month", "Midterm"];
  return (
    <div className="timeline">
      {points.map((point, index) => (
        <div key={point} className={index < (readiness === "green" ? 6 : readiness === "yellow" ? 4 : 3) ? "done" : ""}>
          <span />
          <strong>{point}</strong>
        </div>
      ))}
    </div>
  );
}

export default App;
