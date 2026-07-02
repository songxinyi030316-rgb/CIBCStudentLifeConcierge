import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
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
  FileText,
  Gauge,
  GraduationCap,
  Home,
  KeyRound,
  Landmark,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Train,
  TrendingUp,
  Upload,
  WalletCards
} from "lucide-react";
import { type ElementType, type ReactNode, useEffect, useMemo, useState } from "react";
import buddiesImage from "../assets/generated/student-life-buddies.png";
import heroImage from "../assets/generated/student-life-coach-hero.png";

type StepId = "landing" | "offer" | "scan" | "funding" | "housing" | "credit" | "budget" | "score" | "summary";
type Concern = "Paying tuition" | "Finding rent money" | "OSAP" | "Building credit" | "Managing monthly spending" | "Working part-time" | "I'm not sure";
type Living = "Residence" | "Renting off-campus" | "Living at home";
type Transport = "Transit" | "Car" | "Ride share" | "Walking/biking";

type Profile = {
  name: string;
  university: string;
  program: string;
  intake: string;
  city: string;
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
  appointment: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/appointment-booking.html",
  smartAdvice: "https://www.cibc.com/en/personal-banking/smart-advice.html",
  smartPlanner: "https://www.cibc.com/en/personal-banking/ways-to-bank/smartplanner.html"
};

const resources: Record<string, ResourceCard> = {
  studentBanking: {
    title: "CIBC Smart for Students",
    category: "Matched next step",
    description: "No-monthly-fee student banking for everyday payments, deposits, rent, and tuition flow.",
    url: cibcLinks.studentBanking,
    icon: Landmark
  },
  bundle: {
    title: "CIBC Best Student Life Bundle",
    category: "Review this option",
    description: "Student banking essentials in one path for Canadian and international students.",
    url: cibcLinks.bundle,
    icon: WalletCards
  },
  creditCard: {
    title: "Student Credit Cards",
    category: "Credit foundation",
    description: "Build credit history carefully. Credit should not become extra income.",
    url: cibcLinks.creditCards,
    icon: CreditCard
  },
  creditGuide: {
    title: "Credit education",
    category: "Safe credit habits",
    description: "Learn how on-time payments, limits, and utilization affect credit history.",
    url: cibcLinks.creditGuide,
    icon: BookOpen
  },
  lineOfCredit: {
    title: "CIBC Education Line of Credit",
    category: "Advisor discussion option",
    description: "Worth discussing if tuition timing or living costs create a funding gap.",
    url: cibcLinks.educationLineOfCredit,
    icon: CircleDollarSign
  },
  professionalEdge: {
    title: "Professional Edge Student Program",
    category: "Advisor discussion option",
    description: "For professional programs where tuition and living costs are much higher.",
    url: cibcLinks.professionalEdge,
    icon: BriefcaseBusiness
  },
  internationalAccount: {
    title: "International student banking",
    category: "Before landing",
    description: "Start Canadian banking setup before and during the move to campus.",
    url: cibcLinks.internationalStudents,
    icon: Building2
  },
  gic: {
    title: "International Student GIC Program",
    category: "Before landing",
    description: "Review the CIBC GIC pathway for eligible international students.",
    url: cibcLinks.internationalGic,
    icon: PiggyBank
  },
  budgetCalculator: {
    title: "Student Budget Calculator",
    category: "Relevant CIBC tool",
    description: "Estimate school costs, funding, and student budget results.",
    url: cibcLinks.studentBudgetCalculator,
    icon: ReceiptText
  },
  advisor: {
    title: "Book a CIBC appointment",
    category: "Next action",
    description: "Bring your readiness plan and questions to a CIBC student banking conversation.",
    url: cibcLinks.appointment,
    icon: CalendarDays
  }
};

const steps: { id: StepId; label: string }[] = [
  { id: "landing", label: "Start" },
  { id: "offer", label: "Offer" },
  { id: "scan", label: "Scan" },
  { id: "funding", label: "Funding" },
  { id: "housing", label: "Move-in" },
  { id: "credit", label: "Credit" },
  { id: "budget", label: "Budget" },
  { id: "score", label: "Score" },
  { id: "summary", label: "Plan" }
];

const timelineStages = [
  { label: "Today", detail: "Offer scanned", unlockStep: 3, icon: Sparkles },
  { label: "Before July", detail: "Funding gap", unlockStep: 3, icon: ReceiptText },
  { label: "Before August", detail: "Banking setup", unlockStep: 5, icon: WalletCards },
  { label: "Move-in", detail: "Deposit ready", unlockStep: 4, icon: KeyRound },
  { label: "Tuition deadline", detail: "Payment timing", unlockStep: 3, icon: CalendarDays },
  { label: "First week", detail: "Credit routine", unlockStep: 5, icon: ShieldCheck },
  { label: "First month", detail: "Budget tested", unlockStep: 6, icon: Coffee }
];

const initialProfile: Profile = {
  name: "Maya",
  university: "Western University",
  program: "Business",
  intake: "September 2026",
  city: "London, Ontario",
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
  needsDeposit: true,
  furnitureBudget: 650,
  tenantInsurance: true
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
  const transport = profile.transport === "Car" ? profile.carCosts : profile.transport === "Ride share" ? 160 : profile.transport === "Transit" ? 128 : 20;
  const expenses = rent + utilities + profile.groceries + transport + profile.phone + profile.entertainment + profile.emergencyBuffer;
  const osapMonthly = profile.osapStatus === "Approved" ? Math.round(profile.osapTotal / 8) : profile.osapStatus === "Applied" ? Math.round(profile.osapTotal / 10) : 0;
  const income = profile.partTimeIncome + profile.familySupport / 8 + osapMonthly;
  const surplus = Math.round(income - expenses);
  return { rent, utilities, transport, expenses, osapMonthly, income, surplus, readiness: surplus >= 150 ? "green" : surplus >= -150 ? "yellow" : "red" };
}

function calculateFunding(profile: Profile) {
  const tuitionNeed = profile.tuition + profile.books;
  const upfrontHousing = profile.living === "Renting off-campus" ? profile.rent + (profile.needsDeposit ? profile.rent : 0) + profile.furnitureBudget : 0;
  const osap = profile.international ? 0 : profile.osapStatus === "Approved" ? profile.osapTotal : profile.osapStatus === "Applied" ? Math.round(profile.osapTotal * 0.65) : 0;
  const available = osap + profile.savings + profile.familySupport;
  const need = tuitionNeed + upfrontHousing;
  const gap = Math.max(0, need - available);
  return { tuitionNeed, upfrontHousing, osap, available, need, gap };
}

function calculateSemesterMoney(profile: Profile, funding: ReturnType<typeof calculateFunding>, budget: ReturnType<typeof calculateBudget>) {
  const semesterLiving = budget.expenses * 4;
  const partTime = profile.partTimeIncome * 4;
  const support = funding.available + partTime;
  const totalNeed = funding.need + semesterLiving;
  return { totalNeed: Math.round(totalNeed), support: Math.round(support), gap: Math.round(totalNeed - support) };
}

function budgetLabel(value: number) {
  return value >= 0 ? `${formatCurrency(value)} surplus` : `${formatCurrency(Math.abs(value))} shortfall`;
}

function calculateReadiness(profile: Profile, funding: ReturnType<typeof calculateFunding>, budget: ReturnType<typeof calculateBudget>) {
  const tuition = funding.gap === 0 ? 88 : funding.gap < 1500 ? 70 : funding.gap < 3500 ? 55 : 42;
  const housing = clamp(84 - (profile.needsDeposit ? 12 : 0) - (profile.tenantInsurance ? 10 : 0) - (profile.furnitureBudget > 800 ? 6 : 0), 30, 95);
  const cashFlow = clamp(52 + budget.surplus / 12, 20, 94);
  const banking = profile.hasCibcAccount ? 86 : 54;
  const credit = profile.hasCreditCard ? 68 : 44;
  const buffer = clamp((profile.emergencyBuffer / 700) * 100, 22, 92);
  const dimensions = [
    { label: "Tuition & Funding", short: "Tuition", value: Math.round(tuition), icon: ReceiptText },
    { label: "Housing & Move-in", short: "Housing", value: Math.round(housing), icon: Home },
    { label: "Cash Flow", short: "Cash Flow", value: Math.round(cashFlow), icon: TrendingUp },
    { label: "Banking Setup", short: "Banking", value: Math.round(banking), icon: Landmark },
    { label: "Credit Foundation", short: "Credit", value: Math.round(credit), icon: CreditCard },
    { label: "Emergency Buffer", short: "Buffer", value: Math.round(buffer), icon: ShieldCheck }
  ];
  const score = Math.round(dimensions.reduce((sum, item) => sum + item.value, 0) / dimensions.length);
  const focus = dimensions.reduce((lowest, item) => (item.value < lowest.value ? item : lowest), dimensions[0]);
  return { score, dimensions, focus };
}

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [offerName, setOfferName] = useState("Western_Business_Offer.pdf");
  const [scenarioNote, setScenarioNote] = useState("Your base plan is ready to test.");

  const step = steps[stepIndex].id;
  const funding = useMemo(() => calculateFunding(profile), [profile]);
  const budget = useMemo(() => calculateBudget(profile), [profile]);
  const semesterMoney = useMemo(() => calculateSemesterMoney(profile, funding, budget), [profile, funding, budget]);
  const readiness = useMemo(() => calculateReadiness(profile, funding, budget), [profile, funding, budget]);

  const next = () => setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const back = () => setStepIndex((current) => Math.max(current - 1, 0));
  const updateProfile = (updates: Partial<Profile>) => setProfile((current) => ({ ...current, ...updates }));

  const applyScenario = (scenario: string) => {
    const before = budget.surplus;
    let nextProfile = profile;
    let lead = "";
    if (scenario === "work") {
      nextProfile = { ...profile, partTimeIncome: 880 };
      lead = "Working 8 hrs/week improves the first-month picture.";
    }
    if (scenario === "rent") {
      nextProfile = { ...profile, rent: profile.rent + 150 };
      lead = "A rent increase becomes a fixed monthly pressure.";
    }
    if (scenario === "car") {
      nextProfile = { ...profile, transport: "Car", carCosts: 520 };
      lead = "A car adds about $520 in monthly costs. Transit may be safer first semester.";
    }
    if (scenario === "home") {
      nextProfile = { ...profile, living: "Living at home", rent: 0, utilities: 0, transport: "Transit", carCosts: 0 };
      lead = "Living at home creates more room for tuition and buffer.";
    }
    if (scenario === "osap") {
      nextProfile = { ...profile, osapStatus: "Not started" };
      lead = "If OSAP is delayed, the first-month gap becomes more serious.";
    }
    const after = calculateBudget(nextProfile).surplus;
    setProfile(nextProfile);
    setScenarioNote(`${lead} Your monthly position moves from ${budgetLabel(before)} to ${budgetLabel(after)}.`);
  };

  return (
    <main className="app-shell v2-shell">
      {stepIndex >= 3 && (
        <header className="topbar v2-topbar">
          <button className="brand-button" onClick={() => setStepIndex(0)}>
            <span className="brand-mark">CIBC</span>
            <span>
              <strong>CIBC CampusGo</strong>
              <small>One decision at a time</small>
            </span>
          </button>
          <FixedTimeline stepIndex={stepIndex} />
        </header>
      )}

      {step === "landing" && <LandingScreen next={next} />}
      {step === "offer" && <OfferScreen next={next} back={back} offerName={offerName} setOfferName={setOfferName} updateProfile={updateProfile} profile={profile} />}
      {step === "scan" && <ScanScreen next={next} back={back} profile={profile} offerName={offerName} />}
      {step === "funding" && <FundingScreen profile={profile} updateProfile={updateProfile} funding={funding} next={next} back={back} />}
      {step === "housing" && <HousingScreen profile={profile} updateProfile={updateProfile} budget={budget} next={next} back={back} />}
      {step === "credit" && <CreditScreen profile={profile} updateProfile={updateProfile} next={next} back={back} />}
      {step === "budget" && <BudgetScreen profile={profile} updateProfile={updateProfile} budget={budget} scenarioNote={scenarioNote} applyScenario={applyScenario} next={next} back={back} />}
      {step === "score" && <ScoreScreen readiness={readiness} semesterMoney={semesterMoney} funding={funding} budget={budget} next={next} back={back} />}
      {step === "summary" && <SummaryScreen profile={profile} readiness={readiness} semesterMoney={semesterMoney} funding={funding} budget={budget} back={back} setStepIndex={setStepIndex} />}
    </main>
  );
}

function FixedTimeline({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="readiness-timeline v2-fixed-timeline" aria-label="First Semester Readiness Timeline">
      <div className="progress-meta">
        <span>First Semester Readiness Timeline</span>
        <strong>{Math.round(((stepIndex - 2) / (steps.length - 3)) * 100)}%</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${((stepIndex - 2) / (steps.length - 3)) * 100}%` }} />
      </div>
      <div className="timeline-steps">
        {timelineStages.map((stage) => {
          const Icon = stage.icon;
          const done = stepIndex >= stage.unlockStep;
          return (
            <div key={stage.label} className={done ? "done" : ""}>
              <span>{done ? <Check size={13} /> : <Icon size={13} />}</span>
              <strong>{stage.label}</strong>
              <small>{stage.detail}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingScreen({ next }: { next: () => void }) {
  return (
    <section className="start-screen page v2-landing">
      <div className="start-copy">
        <div className="cibc-lockup">
          <span>CIBC</span>
        <strong>CIBC CampusGo</strong>
      </div>
        <h1>Start university with a clear first-semester money plan.</h1>
        <p>Upload your admission offer to build a guided plan for tuition, move-in costs, banking, credit, and first-month spending.</p>
        <div className="coach-line">
          <Sparkles size={18} />
          <span>CIBC CampusGo helps students understand what to do next before classes begin.</span>
        </div>
        <div className="start-actions">
          <button className="primary-button" onClick={next}>Start with my offer letter <ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="hero-panel v2-hero">
        <img src={heroImage} alt="Student desk with laptop, transit card, notebook, coffee, dorm key, tuition bill, and a friendly AI orb" />
        <div className="floating-card tuition-card">
          <FileText size={19} />
          <span>Offer letter</span>
          <strong>Becomes a readiness journey</strong>
        </div>
      </div>
    </section>
  );
}

function OfferScreen({ next, back, offerName, setOfferName, updateProfile, profile }: { next: () => void; back: () => void; offerName: string; setOfferName: (name: string) => void; updateProfile: (updates: Partial<Profile>) => void; profile: Profile }) {
  return (
    <DecisionScreen
      eyebrow="Onboarding"
      title="Upload your admission offer."
      coach="I will use the offer to understand your school, city, intake, and likely tuition before we make any money decisions."
      back={back}
      ctaLabel="Scan admission letter"
      next={next}
    >
      <div className="single-visual offer-upload-card">
        <div className="offer-icon"><Upload size={34} /></div>
        <strong>{offerName}</strong>
        <p>Upload a PDF/image or use the sample Western University offer.</p>
        <label className="file-picker">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(event) => setOfferName(event.target.files?.[0]?.name || offerName)}
          />
          Choose file
        </label>
        <button
          className="secondary-button"
          onClick={() => {
            setOfferName("Sample_Western_Business_Offer.pdf");
            updateProfile({ ...profile, university: "Western University", program: "Business", city: "London, Ontario", intake: "September 2026", tuition: 9800 });
          }}
        >
          Use sample offer
        </button>
      </div>
    </DecisionScreen>
  );
}

function ScanScreen({ next, back, profile, offerName }: { next: () => void; back: () => void; profile: Profile; offerName: string }) {
  const scanSteps = ["Reading your admission letter...", "Identifying your university...", "Estimating tuition...", "Building your financial profile..."];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => Math.min(current + 1, scanSteps.length)), 650);
    return () => window.clearInterval(timer);
  }, []);
  const done = active >= scanSteps.length;
  return (
    <DecisionScreen
      eyebrow="AI scan"
      title={done ? `Hi ${profile.name}. I found your admission offer.` : "Scanning your admission offer."}
      coach={done ? "You have approximately 9 weeks before your first semester. Let us prepare your finances step by step." : "I am reading the offer first, so I do not have to ask for everything manually."}
      back={back}
      ctaLabel="Begin the readiness journey"
      next={next}
      ctaDisabled={!done}
    >
      <div className="single-visual scan-card">
        <div className="scan-document">
          <FileText size={30} />
          <strong>{offerName}</strong>
          <span>{profile.university} - {profile.program}</span>
        </div>
        <div className="scan-steps">
          {scanSteps.map((label, index) => (
            <div key={label} className={active > index ? "done" : active === index ? "active" : ""}>
              <span>{active > index ? <Check size={14} /> : <Sparkles size={14} />}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
        {done && (
          <div className="scan-result-grid">
            <div><span>University</span><strong>{profile.university}</strong></div>
            <div><span>Program</span><strong>{profile.program}</strong></div>
            <div><span>Intake</span><strong>{profile.intake}</strong></div>
            <div><span>Tuition</span><strong>{formatCurrency(profile.tuition)}</strong></div>
            <div><span>City</span><strong>{profile.city}</strong></div>
          </div>
        )}
      </div>
    </DecisionScreen>
  );
}

function FundingScreen({ profile, updateProfile, funding, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; funding: ReturnType<typeof calculateFunding>; next: () => void; back: () => void }) {
  const [reveal, setReveal] = useState(0);
  const max = Math.max(funding.need, 1);
  return (
    <DecisionScreen
      eyebrow="Tuition deadline"
      title="Can I actually afford my first semester?"
      coach={funding.gap > 0 ? `${profile.name}, your biggest issue is the ${formatCurrency(funding.gap)} funding gap before September.` : `${profile.name}, your tuition path looks covered. Now confirm timing before September.`}
      back={back}
      ctaLabel={reveal === 0 ? "Show me why" : reveal === 1 ? "Show OSAP timing" : "Plan move-in costs"}
      next={reveal < 2 ? () => setReveal((current) => current + 1) : next}
    >
      <div className="single-visual funding-decision">
        <div className={`gap-hero ${funding.gap > 0 ? "warn" : "ok"}`}>
          <span>Funding gap</span>
          <strong>{formatCurrency(funding.gap)}</strong>
          <p>{funding.gap > 0 ? "Worth discussing payment timing or an Education Line of Credit with CIBC." : "No immediate gap based on current inputs."}</p>
        </div>
        {reveal >= 1 && (
          <div className="stack-card v2-stack">
            <StackLine label="Tuition + books" value={funding.tuitionNeed} max={max} tone="need" />
            <StackLine label="Move-in impact" value={funding.upfrontHousing} max={max} tone="need-soft" />
            <StackLine label="Minus OSAP" value={funding.osap} max={max} tone="credit" />
            <StackLine label="Minus savings" value={profile.savings} max={max} tone="credit" />
            <StackLine label="Minus family support" value={profile.familySupport} max={max} tone="credit" />
          </div>
        )}
        {reveal >= 2 && (
          <div className="progressive-panel">
            <p><CalendarDays size={16} /> OSAP and deposits may not arrive in the same week. Keep a first-payment backup before the tuition deadline.</p>
            <details>
              <summary>Adjust funding assumptions</summary>
              <Slider label="Tuition" value={profile.tuition} min={4000} max={28000} step={250} onChange={(tuition) => updateProfile({ tuition })} />
              <Slider label="Books" value={profile.books} min={300} max={2500} step={50} onChange={(books) => updateProfile({ books })} />
              <Slider label="Savings" value={profile.savings} min={0} max={12000} step={250} onChange={(savings) => updateProfile({ savings })} />
            </details>
            <ResourceGrid resources={[resources.budgetCalculator, resources.lineOfCredit, resources.advisor]} />
          </div>
        )}
      </div>
    </DecisionScreen>
  );
}

function HousingScreen({ profile, updateProfile, budget, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; budget: ReturnType<typeof calculateBudget>; next: () => void; back: () => void }) {
  return (
    <DecisionScreen
      eyebrow="Move-in"
      title="Am I ready to move in without a cash surprise?"
      coach="I noticed rent and deposits happen before the first month settles. Let us check move-in readiness only."
      back={back}
      ctaLabel="Set up credit routine"
      next={next}
    >
      <div className="single-visual movein-decision">
        <MoveInChecklist profile={profile} budget={budget} />
        <BreakdownCard
          title="Monthly living cost"
          items={[
            ["Rent", budget.rent],
            ["Utilities", budget.utilities],
            ["Groceries", profile.groceries],
            ["Transit / car", budget.transport],
            ["Phone", profile.phone],
            ["Buffer", profile.emergencyBuffer]
          ]}
          total={budget.expenses}
        />
        <details>
          <summary>Adjust move-in assumptions</summary>
          <div className="choice-row compact">
            {(["Residence", "Renting off-campus", "Living at home"] as Living[]).map((living) => (
              <button key={living} className={profile.living === living ? "choice active" : "choice"} onClick={() => updateProfile({ living })}>{living}</button>
            ))}
          </div>
          <Slider label="Monthly rent" value={profile.rent} min={0} max={2200} step={25} onChange={(rent) => updateProfile({ rent })} />
          <Slider label="Furniture budget" value={profile.furnitureBudget} min={0} max={1600} step={50} onChange={(furnitureBudget) => updateProfile({ furnitureBudget })} />
          <Toggle label="Tenant insurance needed?" checked={profile.tenantInsurance} onChange={(tenantInsurance) => updateProfile({ tenantInsurance })} />
        </details>
      </div>
    </DecisionScreen>
  );
}

function CreditScreen({ profile, updateProfile, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; next: () => void; back: () => void }) {
  const creditRules = [
    ["Statement balance", "Know the full amount owed, not only the minimum payment."],
    ["Due date", "Set a reminder before the first statement arrives."],
    ["Utilization", "Use a small share of the limit. Credit is not extra income."],
    ["Canada note", profile.international ? "Canada rewards responsible repayment, not spending more." : "Paying on time helps build a Canadian credit history."]
  ];
  const resourceSet = profile.international ? [resources.internationalAccount, resources.gic, resources.creditGuide] : [resources.studentBanking, resources.creditCard, resources.creditGuide];
  return (
    <DecisionScreen
      eyebrow="First week"
      title="How do I build healthy credit habits?"
      coach="A student credit card can help build history, but the first routine matters more than the application."
      back={back}
      ctaLabel="Test first-month budget"
      next={next}
    >
      <div className="single-visual credit-decision">
        <div className="routine-grid v2-routine">
          {creditRules.map(([title, body]) => (
            <div key={title}>
              <CreditCard size={18} />
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="choice-row compact">
          <button className={profile.hasCibcAccount ? "choice active" : "choice"} onClick={() => updateProfile({ hasCibcAccount: true })}>I have CIBC</button>
          <button className={profile.hasCreditCard ? "choice active" : "choice"} onClick={() => updateProfile({ hasCreditCard: !profile.hasCreditCard })}>Student credit card</button>
        </div>
        {profile.international && (
          <div className="progressive-panel">
            <p><Building2 size={16} /> Before landing: check GIC, arrival banking, first debit card, rent deposit, and first 30 days of spending.</p>
          </div>
        )}
        <ResourceGrid resources={resourceSet} />
      </div>
    </DecisionScreen>
  );
}

function BudgetScreen({ profile, updateProfile, budget, scenarioNote, applyScenario, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; budget: ReturnType<typeof calculateBudget>; scenarioNote: string; applyScenario: (scenario: string) => void; next: () => void; back: () => void }) {
  const scenarios = [
    ["work", "I work 8 hrs/week"],
    ["rent", "Rent +$150"],
    ["car", "I buy a car"],
    ["home", "I live at home"],
    ["osap", "OSAP is delayed"]
  ];
  return (
    <DecisionScreen
      eyebrow="First month"
      title="Can I survive my first month?"
      coach={scenarioNote}
      back={back}
      ctaLabel="Generate readiness score"
      next={next}
    >
      <div className="single-visual budget-decision">
        <div className={`readiness ${budget.readiness}`}>
          <span>Monthly result</span>
          <strong>{budgetLabel(budget.surplus)}</strong>
        </div>
        <Waterfall budget={budget} profile={profile} />
        <div className="scenario-grid">
          {scenarios.map(([id, label]) => (
            <button key={id} onClick={() => applyScenario(id)}><Sparkles size={16} /> {label}</button>
          ))}
        </div>
        <details>
          <summary>Adjust monthly numbers</summary>
          <Slider label="Groceries" value={profile.groceries} min={200} max={800} step={25} onChange={(groceries) => updateProfile({ groceries })} />
          <Slider label="Entertainment" value={profile.entertainment} min={0} max={500} step={25} onChange={(entertainment) => updateProfile({ entertainment })} />
          <Slider label="Part-time income" value={profile.partTimeIncome} min={0} max={1600} step={40} onChange={(partTimeIncome) => updateProfile({ partTimeIncome })} />
          <Slider label="Emergency buffer" value={profile.emergencyBuffer} min={0} max={800} step={25} onChange={(emergencyBuffer) => updateProfile({ emergencyBuffer })} />
        </details>
      </div>
    </DecisionScreen>
  );
}

function ScoreScreen({ readiness, semesterMoney, funding, budget, next, back }: { readiness: ReturnType<typeof calculateReadiness>; semesterMoney: ReturnType<typeof calculateSemesterMoney>; funding: ReturnType<typeof calculateFunding>; budget: ReturnType<typeof calculateBudget>; next: () => void; back: () => void }) {
  return (
    <DecisionScreen
      eyebrow="Readiness score"
      title="First Semester Readiness Score"
      coach="We are almost ready. Here is the diagnostic after completing the journey."
      back={back}
      ctaLabel="Create action plan"
      next={next}
    >
      <div className="single-visual score-decision">
        <ReadinessDashboard readiness={readiness} />
        <div className="score-context-grid">
          <div className="context-tile"><span>Money number</span><strong>{formatCurrency(semesterMoney.totalNeed)}</strong></div>
          <div className="context-tile"><span>Funding gap</span><strong>{formatCurrency(funding.gap)}</strong></div>
          <div className="context-tile"><span>Monthly result</span><strong>{budgetLabel(budget.surplus)}</strong></div>
        </div>
      </div>
    </DecisionScreen>
  );
}

function SummaryScreen({ profile, readiness, semesterMoney, funding, budget, back, setStepIndex }: { profile: Profile; readiness: ReturnType<typeof calculateReadiness>; semesterMoney: ReturnType<typeof calculateSemesterMoney>; funding: ReturnType<typeof calculateFunding>; budget: ReturnType<typeof calculateBudget>; back: () => void; setStepIndex: (index: number) => void }) {
  const resourceSet = [
    profile.international ? resources.internationalAccount : resources.studentBanking,
    funding.gap > 0 ? resources.lineOfCredit : resources.budgetCalculator,
    resources.advisor
  ];
  return (
    <DecisionScreen
      eyebrow="Action plan"
      title="Your First-Semester Money Plan"
      coach={`Great. Your score is ${readiness.score}%. The next step is to handle ${readiness.focus.label.toLowerCase()} before the semester starts.`}
      back={back}
      ctaLabel="Compare another scenario"
      next={() => setStepIndex(6)}
    >
      <div className="single-visual action-plan">
        <div className="summary-hero">
          <Gauge size={30} />
          <span>{profile.name} at {profile.university}</span>
          <strong>{readiness.score}% first-semester ready</strong>
          <p>{formatCurrency(semesterMoney.totalNeed)} estimated money number. {semesterMoney.gap > 0 ? `${formatCurrency(semesterMoney.gap)} still needs a plan.` : `${formatCurrency(Math.abs(semesterMoney.gap))} projected surplus.`}</p>
        </div>
        <div className="plan-section">
          <strong>Questions to ask CIBC</strong>
          <p><ChevronRight size={15} /> Which student account setup best separates tuition, rent, and everyday spending?</p>
          <p><ChevronRight size={15} /> Is the funding gap best handled through timing, savings, OSAP updates, or an advisor discussion option?</p>
          <p><ChevronRight size={15} /> Which credit routine should be set before the first statement arrives?</p>
        </div>
        <ResourceGrid resources={resourceSet} />
        <div className="cta-row">
          <button className="secondary-button" onClick={() => window.print()}><Check size={18} /> Save plan</button>
          <a className="primary-button" href={cibcLinks.appointment} target="_blank" rel="noreferrer"><CalendarDays size={18} /> Book CIBC student banking appointment</a>
          <a className="secondary-button" href={cibcLinks.studentBanking} target="_blank" rel="noreferrer"><Landmark size={18} /> Open student account</a>
          <a className="secondary-button" href={cibcLinks.creditCards} target="_blank" rel="noreferrer"><CreditCard size={18} /> Review student credit card options</a>
          <a className="secondary-button" href={cibcLinks.educationLineOfCredit} target="_blank" rel="noreferrer"><CircleDollarSign size={18} /> Learn about Education Line of Credit</a>
        </div>
      </div>
    </DecisionScreen>
  );
}

function DecisionScreen({ eyebrow, title, coach, children, ctaLabel, next, back, ctaDisabled = false }: { eyebrow: string; title: string; coach: string; children: ReactNode; ctaLabel: string; next: () => void; back: () => void; ctaDisabled?: boolean }) {
  return (
    <section className="flow-screen page v2-decision">
      <div className="flow-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="coach-note v2-coach-note">
          <SupportBuddy />
          <p>{coach}</p>
        </div>
      </div>
      <div className="flow-content">{children}</div>
      <div className="flow-actions">
        <button className="ghost-button" onClick={back}><ArrowLeft size={18} /> Back</button>
        <button className="primary-button" onClick={next} disabled={ctaDisabled}>{ctaLabel} <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function SupportBuddy() {
  return (
    <span className="support-buddy compact">
      <img src={buddiesImage} alt="" />
    </span>
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

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <label className="slider-row">
      <span><strong>{label}</strong><em>{formatCurrency(value)}</em></span>
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

function MoveInChecklist({ profile, budget }: { profile: Profile; budget: ReturnType<typeof calculateBudget> }) {
  const items: [string, string, boolean, ElementType][] = [
    ["Rent", formatCurrency(budget.rent), true, Home],
    ["First/last deposit", profile.needsDeposit ? formatCurrency(profile.rent) : "Not flagged", !profile.needsDeposit, KeyRound],
    ["Utilities", profile.utilitiesIncluded ? "Included" : formatCurrency(profile.utilities), profile.utilitiesIncluded, ReceiptText],
    ["Furniture", formatCurrency(profile.furnitureBudget), profile.furnitureBudget <= 650, GraduationCap],
    ["Tenant insurance", profile.tenantInsurance ? "Pending" : "Not flagged", !profile.tenantInsurance, ShieldCheck],
    ["Transit / car", profile.transport, true, Train]
  ];
  return (
    <div className="movein-checklist">
      <span className="section-kicker">Move-in readiness</span>
      <div className="movein-grid">
        {items.map(([label, value, done, icon]) => {
          const Icon = icon;
          return (
            <div key={label} className={done ? "done" : ""}>
              <Icon size={18} />
              <div><strong>{label}</strong><small>{value}</small></div>
              <Check size={16} />
            </div>
          );
        })}
      </div>
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
      <div className="total-row"><span>Total monthly cost</span><strong>{formatCurrency(total)}</strong></div>
    </div>
  );
}

function Waterfall({ budget, profile }: { budget: ReturnType<typeof calculateBudget>; profile: Profile }) {
  const max = Math.max(budget.income, budget.expenses, 1);
  const bars: [string, number, string][] = [
    ["Income", budget.income, "positive"],
    ["Rent", budget.rent, "negative"],
    ["Groceries", profile.groceries, "negative"],
    ["Transit", budget.transport, "negative"],
    ["Phone", profile.phone, "negative"],
    ["Buffer", profile.emergencyBuffer, "buffer"]
  ];
  return (
    <div className="waterfall-card">
      <div className="waterfall-top"><span>Cash flow waterfall</span><strong>{formatCurrency(budget.income)} in / {formatCurrency(budget.expenses)} out</strong></div>
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

function ReadinessDashboard({ readiness }: { readiness: ReturnType<typeof calculateReadiness> }) {
  const status = readiness.score >= 80 ? "Ready" : readiness.score >= 65 ? "On track" : "Needs attention";
  return (
    <div className="readiness-dashboard">
      <div className="score-head">
        <strong>{readiness.score}%</strong>
        <div><h2>First Semester Readiness Score</h2><p>This is the reward after finishing the journey: strengths, risk, and next actions.</p></div>
        <span>{status}</span>
      </div>
      <div className="score-body">
        <div className="dimension-list">
          {readiness.dimensions.map((dimension) => {
            const Icon = dimension.icon;
            return (
              <div className="dimension-row" key={dimension.label}>
                <Icon size={18} />
                <span>{dimension.label}</span>
                <i><b style={{ width: `${dimension.value}%` }} /></i>
                <strong>{dimension.value}%</strong>
              </div>
            );
          })}
        </div>
        <RadarChart dimensions={readiness.dimensions} />
      </div>
      <div className="focus-area">
        <span>Biggest remaining risk</span>
        <strong>{readiness.focus.label}</strong>
        <p>{readiness.focus.label === "Emergency Buffer" ? "Aim for $500-$1,000 before move-in. One unexpected cost should not derail the semester." : `Handle ${readiness.focus.label.toLowerCase()} before the semester starts.`}</p>
      </div>
    </div>
  );
}

function RadarChart({ dimensions }: { dimensions: { short: string; value: number }[] }) {
  const center = 120;
  const radius = 82;
  const points = dimensions.map((dimension, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / dimensions.length;
    const valueRadius = (dimension.value / 100) * radius;
    return {
      label: dimension.short,
      x: center + Math.cos(angle) * valueRadius,
      y: center + Math.sin(angle) * valueRadius,
      lx: center + Math.cos(angle) * (radius + 27),
      ly: center + Math.sin(angle) * (radius + 27),
      ax: center + Math.cos(angle) * radius,
      ay: center + Math.sin(angle) * radius
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");
  const rings = [0.33, 0.66, 1].map((scale) =>
    dimensions.map((_, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / dimensions.length;
      return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`;
    }).join(" ")
  );
  return (
    <svg className="radar-chart" viewBox="0 0 240 240" role="img" aria-label="Readiness radar chart">
      {rings.map((ring) => <polygon key={ring} points={ring} />)}
      {points.map((point) => <line key={`${point.label}-line`} x1={center} y1={center} x2={point.ax} y2={point.ay} />)}
      <polygon className="radar-fill" points={polygon} />
      {points.map((point) => <circle key={`${point.label}-dot`} cx={point.x} cy={point.y} r="5" />)}
      {points.map((point) => <text key={point.label} x={point.lx} y={point.ly}>{point.label}</text>)}
    </svg>
  );
}

function ResourceGrid({ resources: cards }: { resources: ResourceCard[] }) {
  return (
    <div className="resource-grid compact v2-resource-grid">
      {cards.map((resource) => {
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

export default App;
