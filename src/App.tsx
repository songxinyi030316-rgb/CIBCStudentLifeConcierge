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
  Copy,
  Coffee,
  CreditCard,
  Download,
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
  countryOfOrigin: string;
  studyPermitStatus: "Not applicable" | "Preparing" | "Submitted" | "Approved";
  gicStatus: "Not applicable" | "Not started" | "In progress" | "Ready";
  arrivalDate: string;
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
  scholarship: number;
  partTimeIncome: number;
  emergencyBuffer: number;
  hasCibcAccount: boolean;
  hasCreditCard: boolean;
  concern: Concern;
  utilitiesIncluded: boolean;
  needsDeposit: boolean;
  furnitureBudget: number;
  tenantInsurance: boolean;
  temporaryHousing: number;
  arrivalEssentials: number;
  winterClothing: number;
  familyTransfer: number;
  gicAmount: number;
};

type ResourceCard = {
  title: string;
  category: string;
  description: string;
  url: string;
  icon: ElementType;
};

type FutureReminder = {
  title: string;
  body: string;
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
  internationalBankAccount: "https://www.cibc.com/en/special-offers/international-student-bank-account.html",
  internationalStudentPay: "https://pay.cibc.com/payment/",
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
    category: "Worth discussing with CIBC",
    description: "Review only if a remaining shortfall still needs a backup after lower-borrowing options.",
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
    url: cibcLinks.internationalBankAccount,
    icon: Building2
  },
  gic: {
    title: "International Student GIC Program",
    category: "Before landing",
    description: "Review the CIBC GIC pathway for eligible international students.",
    url: cibcLinks.internationalGic,
    icon: PiggyBank
  },
  internationalStudentPay: {
    title: "CIBC International Student Pay",
    category: "Tuition payment option",
    description: "Review a CIBC-supported option for paying Canadian tuition from outside Canada.",
    url: cibcLinks.internationalStudentPay,
    icon: ReceiptText
  },
  internationalHub: {
    title: "International student resources",
    category: "Arrival banking",
    description: "Explore CIBC guidance for studying, arriving, and banking in Canada.",
    url: cibcLinks.internationalStudents,
    icon: Building2
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
  { label: "Before July", detail: "Funding strategy", unlockStep: 3, icon: ReceiptText },
  { label: "Before August", detail: "Banking setup", unlockStep: 5, icon: WalletCards },
  { label: "Move-in", detail: "Deposit ready", unlockStep: 4, icon: KeyRound },
  { label: "Tuition deadline", detail: "Payment timing", unlockStep: 3, icon: CalendarDays },
  { label: "First week", detail: "Credit routine", unlockStep: 5, icon: ShieldCheck },
  { label: "First month", detail: "Budget tested", unlockStep: 6, icon: Coffee }
];

const habitItems = [
  "Tuition reviewed",
  "Move-in costs checked",
  "Student banking reviewed",
  "Credit basics learned",
  "First-month budget tested",
  "Emergency buffer planned"
];

const initialProfile: Profile = {
  name: "Maya",
  university: "Western University",
  program: "Business",
  intake: "September 2026",
  city: "London, Ontario",
  international: false,
  countryOfOrigin: "Canada",
  studyPermitStatus: "Not applicable",
  gicStatus: "Not applicable",
  arrivalDate: "August 2026",
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
  scholarship: 800,
  partTimeIncome: 640,
  emergencyBuffer: 250,
  hasCibcAccount: false,
  hasCreditCard: false,
  concern: "Managing monthly spending",
  utilitiesIncluded: false,
  needsDeposit: true,
  furnitureBudget: 650,
  tenantInsurance: true,
  temporaryHousing: 0,
  arrivalEssentials: 0,
  winterClothing: 0,
  familyTransfer: 0,
  gicAmount: 0
};

const internationalProfile: Profile = {
  name: "Maya",
  university: "University of Toronto",
  program: "Computer Science",
  intake: "September 2026",
  city: "Toronto, Ontario",
  international: true,
  countryOfOrigin: "China",
  studyPermitStatus: "Preparing",
  gicStatus: "Not started",
  arrivalDate: "August 2026",
  living: "Renting off-campus",
  transport: "Transit",
  tuition: 62000,
  books: 1600,
  rent: 1850,
  utilities: 140,
  groceries: 560,
  phone: 85,
  entertainment: 240,
  carCosts: 0,
  osapStatus: "Not started",
  osapTotal: 0,
  savings: 9500,
  familySupport: 0,
  scholarship: 3000,
  partTimeIncome: 0,
  emergencyBuffer: 500,
  hasCibcAccount: false,
  hasCreditCard: false,
  concern: "Managing monthly spending",
  utilitiesIncluded: false,
  needsDeposit: true,
  furnitureBudget: 900,
  tenantInsurance: true,
  temporaryHousing: 1200,
  arrivalEssentials: 850,
  winterClothing: 650,
  familyTransfer: 52000,
  gicAmount: 20635
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
  const osapMonthly = !profile.international && profile.osapStatus === "Approved" ? Math.round(profile.osapTotal / 8) : !profile.international && profile.osapStatus === "Applied" ? Math.round(profile.osapTotal / 10) : 0;
  const monthlySupport = profile.international ? Math.round(profile.familyTransfer / 8) : Math.round(profile.familySupport / 8);
  const income = profile.partTimeIncome + monthlySupport + osapMonthly;
  const surplus = Math.round(income - expenses);
  return { rent, utilities, transport, expenses, osapMonthly, monthlySupport, income, surplus, readiness: surplus >= 150 ? "green" : surplus >= -150 ? "yellow" : "red" };
}

function calculateFunding(profile: Profile) {
  const tuitionNeed = profile.tuition + profile.books;
  const upfrontHousing = profile.living === "Renting off-campus" ? profile.rent + (profile.needsDeposit ? profile.rent : 0) + profile.furnitureBudget : 0;
  if (profile.international) {
    const proofFunds = profile.gicStatus === "Ready" ? profile.gicAmount : profile.gicStatus === "In progress" ? Math.round(profile.gicAmount * 0.75) : 0;
    const firstMonthCash = profile.temporaryHousing + profile.arrivalEssentials + profile.winterClothing + profile.groceries + profile.phone + 128;
    const available = proofFunds + profile.savings + profile.familyTransfer + profile.scholarship;
    const need = tuitionNeed + upfrontHousing + firstMonthCash;
    const gap = Math.max(0, need - available);
    return { tuitionNeed, upfrontHousing, firstMonthCash, osap: 0, proofFunds, available, need, gap };
  }
  const osap = profile.international ? 0 : profile.osapStatus === "Approved" ? profile.osapTotal : profile.osapStatus === "Applied" ? Math.round(profile.osapTotal * 0.65) : 0;
  const available = osap + profile.savings + profile.familySupport + profile.scholarship;
  const need = tuitionNeed + upfrontHousing;
  const gap = Math.max(0, need - available);
  return { tuitionNeed, upfrontHousing, firstMonthCash: 0, osap, proofFunds: 0, available, need, gap };
}

const borrowLessActions = [
  { id: "work", label: "I can work 8 hrs/week", amount: (profile: Profile) => Math.max(360, Math.round(profile.partTimeIncome * 0.75)) },
  { id: "scholarship", label: "I received a $1,000 scholarship", amount: () => 1000 },
  { id: "parents", label: "My parents can help with rent", amount: (profile: Profile) => (profile.living === "Living at home" ? 0 : Math.min(600, Math.round(profile.rent * 0.5))) },
  { id: "furniture", label: "I can delay buying furniture", amount: (profile: Profile) => Math.min(500, profile.furnitureBudget) },
  { id: "home-month", label: "I'll live at home for one month", amount: (profile: Profile) => (profile.living === "Living at home" ? 0 : profile.rent) },
  { id: "spending", label: "I'll reduce first-month spending", amount: () => 300 }
];

function roundUpToHundred(value: number) {
  return Math.ceil(value / 100) * 100;
}

function calculateBorrowingStrategy(profile: Profile, funding: ReturnType<typeof calculateFunding>, selectedActionIds: string[] = []) {
  const selectedActionValue = borrowLessActions
    .filter((action) => selectedActionIds.includes(action.id))
    .reduce((sum, action) => sum + action.amount(profile), 0);
  const remainingGap = Math.max(0, funding.gap - selectedActionValue);
  const partTimeBeforeDeadline = profile.partTimeIncome > 0 ? Math.round(profile.partTimeIncome * 1.25) : 0;
  const delayableMoveIn = profile.living === "Renting off-campus" ? Math.min(400, Math.round(profile.furnitureBudget * 0.45)) : 0;
  const spendingFlex = 250;
  const flexibleCoverage = Math.min(remainingGap, partTimeBeforeDeadline + delayableMoveIn + spendingFlex);
  const recommendedBorrowing = remainingGap === 0 ? 0 : roundUpToHundred(Math.max(0, remainingGap - flexibleCoverage));
  const recommendedHigh = recommendedBorrowing === 0 ? 0 : Math.min(remainingGap, recommendedBorrowing + 500);
  const repaymentImpact = Math.round((recommendedBorrowing * 0.07) / 12);
  return {
    selectedActionValue,
    remainingGap,
    partTimeBeforeDeadline,
    delayableMoveIn,
    spendingFlex,
    flexibleCoverage,
    recommendedBorrowing,
    recommendedHigh,
    repaymentImpact
  };
}

function calculateFinancialPosition(profile: Profile, funding: ReturnType<typeof calculateFunding>, budget: ReturnType<typeof calculateBudget>, borrowingStrategy: ReturnType<typeof calculateBorrowingStrategy>) {
  const osapGrant = profile.international ? 0 : Math.min(funding.osap, profile.osapStatus === "Approved" ? 2200 : profile.osapStatus === "Applied" ? 1400 : 0);
  const osapLoan = profile.international ? 0 : Math.max(0, funding.osap - osapGrant);
  const firstLastRent = profile.living === "Renting off-campus" ? profile.rent + (profile.needsDeposit ? profile.rent : 0) : 0;
  const moveInCosts = profile.furnitureBudget + (profile.international ? profile.temporaryHousing + profile.arrivalEssentials + profile.winterClothing : 0);
  const monthlyLiving = Math.max(0, budget.expenses - budget.rent - profile.emergencyBuffer) * 4;
  const totalCost = profile.tuition + profile.books + firstLastRent + moveInCosts + monthlyLiving + profile.emergencyBuffer;
  const partTimeSemester = profile.partTimeIncome * 4;
  const confirmedFunding = profile.international
    ? funding.proofFunds + profile.savings + profile.familyTransfer + profile.scholarship + partTimeSemester
    : osapGrant + osapLoan + profile.savings + profile.familySupport + profile.scholarship + partTimeSemester;
  const remainingGap = Math.max(0, totalCost - confirmedFunding);
  const partTimeBeforeSeptember = profile.partTimeIncome > 0 ? Math.round(profile.partTimeIncome * 1.25) : 0;
  const moneyNeededBeforeSeptember = profile.tuition + profile.books + firstLastRent + moveInCosts + profile.emergencyBuffer;
  const moneyAvailableBeforeSeptember = profile.international
    ? profile.savings + profile.familyTransfer + profile.scholarship
    : profile.savings + profile.familySupport + profile.scholarship + osapGrant + partTimeBeforeSeptember;
  const timingGap = Math.max(0, moneyNeededBeforeSeptember - moneyAvailableBeforeSeptember);
  const delayableExpenses = profile.living === "Renting off-campus" ? Math.min(profile.furnitureBudget, profile.international ? 700 : 500) : 0;
  const postFlexGap = Math.max(0, Math.min(remainingGap || funding.gap, timingGap) - delayableExpenses - partTimeBeforeSeptember);
  const borrowingLow = postFlexGap === 0 ? 0 : roundUpToHundred(Math.max(0, postFlexGap));
  const borrowingHigh = borrowingLow === 0 ? 0 : roundUpToHundred(Math.max(borrowingLow + 500, borrowingStrategy.recommendedHigh));
  const incoming: [string, number][] = profile.international
    ? [
        ["GIC / proof of funds", funding.proofFunds],
        ["Savings / RESP", profile.savings],
        ["Family transfer", profile.familyTransfer],
        ["Scholarship", profile.scholarship],
        ["Part-time income", partTimeSemester]
      ]
    : [
        ["OSAP grant", osapGrant],
        ["OSAP loan", osapLoan],
        ["Savings / RESP", profile.savings],
        ["Family support", profile.familySupport],
        ["Scholarship", profile.scholarship],
        ["Part-time income", partTimeSemester]
      ];
  const outgoing: [string, number][] = [
    ["Tuition", profile.tuition],
    ["Books", profile.books],
    ["First/last rent", firstLastRent],
    ["Move-in costs", moveInCosts],
    ["Monthly living", monthlyLiving],
    ["Emergency buffer", profile.emergencyBuffer]
  ];
  return {
    osapGrant,
    osapLoan,
    firstLastRent,
    moveInCosts,
    monthlyLiving,
    totalCost: Math.round(totalCost),
    confirmedFunding: Math.round(confirmedFunding),
    remainingGap: Math.round(remainingGap),
    moneyNeededBeforeSeptember: Math.round(moneyNeededBeforeSeptember),
    moneyAvailableBeforeSeptember: Math.round(moneyAvailableBeforeSeptember),
    timingGap: Math.round(timingGap),
    delayableExpenses,
    partTimeBeforeSeptember,
    borrowingLow,
    borrowingHigh,
    incoming,
    outgoing
  };
}

function getFundingResourceSet(profile: Profile, funding: ReturnType<typeof calculateFunding>, position: ReturnType<typeof calculateFinancialPosition>) {
  if (profile.international) {
    return [
      resources.internationalAccount,
      position.timingGap > 0 || profile.gicStatus === "Not started" ? resources.gic : resources.internationalStudentPay,
      resources.internationalHub,
      resources.creditCard
    ];
  }
  const cards = [
    resources.budgetCalculator,
    resources.studentBanking,
    resources.bundle
  ];
  if (funding.gap > 0 || position.borrowingLow > 0) {
    cards.push(resources.lineOfCredit);
  } else {
    cards.push(resources.creditCard);
  }
  return cards;
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
  const tuition = profile.international
    ? funding.gap === 0 && profile.gicStatus !== "Not started" ? 84 : funding.gap < 5000 ? 64 : 48
    : funding.gap === 0 ? 88 : funding.gap < 1500 ? 70 : funding.gap < 3500 ? 55 : 42;
  const housing = clamp(84 - (profile.needsDeposit ? 12 : 0) - (profile.tenantInsurance ? 10 : 0) - (profile.furnitureBudget > 800 ? 6 : 0), 30, 95);
  const cashFlow = clamp(52 + budget.surplus / 12, 20, 94);
  const banking = profile.hasCibcAccount ? 86 : 54;
  const credit = profile.hasCreditCard ? 68 : 44;
  const buffer = clamp((profile.emergencyBuffer / 700) * 100, 22, 92);
  const dimensions = profile.international
    ? [
        { label: "Arrival Funding", short: "Arrival", value: Math.round(tuition), icon: ReceiptText },
        { label: "Housing & Move-in", short: "Housing", value: Math.round(housing), icon: Home },
        { label: "Banking Setup", short: "Banking", value: Math.round(banking), icon: Landmark },
        { label: "First-Month Cash Flow", short: "Cash Flow", value: Math.round(cashFlow), icon: TrendingUp },
        { label: "Credit Foundation", short: "Credit", value: Math.round(credit), icon: CreditCard },
        { label: "Emergency Buffer", short: "Buffer", value: Math.round(buffer), icon: ShieldCheck }
      ]
    : [
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
  const [companionOpen, setCompanionOpen] = useState(false);
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
    if (scenario === "exchange") {
      nextProfile = { ...profile, familyTransfer: Math.max(0, profile.familyTransfer - 1800) };
      lead = "If the exchange rate moves against you, arrival funds need a larger cushion.";
    }
    if (scenario === "transfer") {
      nextProfile = { ...profile, savings: Math.max(0, profile.savings - 1500) };
      lead = "If a family transfer is delayed, immediately accessible cash matters more.";
    }
    if (scenario === "winter") {
      nextProfile = { ...profile, emergencyBuffer: profile.emergencyBuffer + 450, winterClothing: profile.winterClothing + 450 };
      lead = "Winter clothing is a real arrival cost, especially before the first cold month.";
    }
    if (scenario === "laptop") {
      nextProfile = { ...profile, emergencyBuffer: profile.emergencyBuffer + 900, arrivalEssentials: profile.arrivalEssentials + 900 };
      lead = "A laptop purchase can quickly reduce first-month flexibility.";
    }
    if (scenario === "temporary-housing") {
      nextProfile = { ...profile, temporaryHousing: profile.temporaryHousing + 650, emergencyBuffer: profile.emergencyBuffer + 250 };
      lead = "Temporary housing costs more when leases or move-in dates do not line up.";
    }
    if (scenario === "phone-transit") {
      nextProfile = { ...profile, phone: profile.phone + 40, entertainment: Math.max(0, profile.entertainment - 40) };
      lead = "Phone and transit setup are small costs, but they arrive immediately after landing.";
    }
    if (scenario === "rent-deposit") {
      nextProfile = { ...profile, needsDeposit: true, emergencyBuffer: profile.emergencyBuffer + 500 };
      lead = "If first rent deposit is due before arrival, keep more cash accessible before landing.";
    }
    const after = calculateBudget(nextProfile).surplus;
    setProfile(nextProfile);
    setScenarioNote(`${lead} Your monthly position moves from ${budgetLabel(before)} to ${budgetLabel(after)}.`);
  };

  if (companionOpen) {
    return (
      <main className="app-shell v2-shell">
        <CompanionPage profile={profile} budget={budget} onBack={() => setCompanionOpen(false)} />
      </main>
    );
  }

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
      {step === "score" && <ScoreScreen profile={profile} readiness={readiness} semesterMoney={semesterMoney} funding={funding} budget={budget} next={next} back={back} />}
      {step === "summary" && <SummaryScreen profile={profile} readiness={readiness} semesterMoney={semesterMoney} funding={funding} budget={budget} back={back} setStepIndex={setStepIndex} openCompanion={() => setCompanionOpen(true)} />}
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
          <AIOrb compact />
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
  const useSampleOffer = (sampleProfile: Profile, fileName: string) => {
    setOfferName(fileName);
    updateProfile(sampleProfile);
  };
  return (
    <DecisionScreen
      eyebrow="Onboarding"
      title="Upload your admission offer."
      coach="I'll use the offer to understand your school, city, intake, and likely tuition before we make any money decisions."
      thinkingText="Preparing secure offer scan..."
      aiTip="Your offer letter is a useful starting point because it usually confirms the school, program, intake, city, and tuition range."
      nextAction="Scan your admission offer"
      completedHabits={0}
      back={back}
      ctaLabel="Scan admission letter"
      next={next}
    >
      <div className="single-visual offer-upload-card">
        <div className="offer-icon"><Upload size={34} /></div>
        <strong>{offerName}</strong>
        <p>Upload a PDF/image or use a sample domestic or international offer.</p>
        <label className="file-picker">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(event) => setOfferName(event.target.files?.[0]?.name || offerName)}
          />
          Choose file
        </label>
        <div className="sample-offer-row">
          <button
            className={profile.international ? "secondary-button" : "primary-button"}
            onClick={() => useSampleOffer(initialProfile, "Sample_Western_Business_Offer.pdf")}
          >
            Use Domestic Sample Offer
          </button>
          <button
            className={profile.international ? "primary-button" : "secondary-button"}
            onClick={() => useSampleOffer(internationalProfile, "Sample_UofT_International_Computer_Science_Offer.pdf")}
          >
            Use International Sample Offer
          </button>
        </div>
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
      coach={done ? profile.international ? "I noticed you are preparing to arrive in Canada as an international student. Before we talk about products, let's make sure your arrival money, banking setup, and first-month cash flow are ready." : "Great. I found your admission offer. Before we think about banking products, let's understand your first semester." : "I'm reading the offer first, so I do not have to ask for everything manually."}
      thinkingText={done ? "Building your readiness path..." : "Reading admission details..."}
      aiTip="Students often make better money decisions when they separate admission costs from first-month living costs."
      nextAction="Begin the readiness journey"
      completedHabits={0}
      futureReminder={{ title: "Upcoming reminder", body: "Your tuition payment is due in 5 days.", icon: CalendarDays }}
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
            {profile.international && (
              <>
                <div><span>Country</span><strong>{profile.countryOfOrigin}</strong></div>
                <div><span>Study permit</span><strong>{profile.studyPermitStatus}</strong></div>
                <div><span>GIC status</span><strong>{profile.gicStatus}</strong></div>
                <div><span>Arrival</span><strong>{profile.arrivalDate}</strong></div>
              </>
            )}
          </div>
        )}
      </div>
    </DecisionScreen>
  );
}

function FundingScreen({ profile, updateProfile, funding, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; funding: ReturnType<typeof calculateFunding>; next: () => void; back: () => void }) {
  const [reveal, setReveal] = useState(0);
  const [selectedBorrowLess, setSelectedBorrowLess] = useState<string[]>([]);
  const budget = calculateBudget(profile);
  const semesterMoney = calculateSemesterMoney(profile, funding, budget);
  const borrowingStrategy = calculateBorrowingStrategy(profile, funding, selectedBorrowLess);
  const financialPosition = calculateFinancialPosition(profile, funding, budget, borrowingStrategy);
  const fundingResources = getFundingResourceSet(profile, funding, financialPosition);
  const max = Math.max(funding.need, 1);
  const isInternational = profile.international;
  const toggleBorrowLess = (id: string) => {
    setSelectedBorrowLess((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };
  const positionBorrowingRange = financialPosition.borrowingLow === 0
    ? "$0"
    : `${formatCurrency(financialPosition.borrowingLow)}-${formatCurrency(financialPosition.borrowingHigh)}`;
  const heroLabel = isInternational ? "Arrival funding gap" : funding.gap > 0 ? "Estimated borrowing needed" : "First payment coverage";
  const heroValue = isInternational ? formatCurrency(funding.gap) : funding.gap > 0 ? positionBorrowingRange : formatCurrency(0);
  const heroBody = isInternational
    ? funding.gap > 0
      ? "Focus on arrival cash, proof of funds, transfer timing, and what can wait until after landing."
      : "Your arrival funding is covered based on current assumptions. Confirm timing before booking travel."
    : funding.gap > 0
      ? `Not the full ${formatCurrency(funding.gap)} shortfall. Borrow only what you actually need.`
      : "No immediate shortfall based on current inputs.";
  return (
    <DecisionScreen
      eyebrow="Tuition deadline"
      title={isInternational ? "What money should I have ready before I land?" : "How can I cover my first semester with confidence?"}
      coach={isInternational ? "Before products, let’s make sure tuition, proof of funds, transfer timing, and first-month cash are ready." : financialPosition.timingGap > 0 ? "Your total funding may be close, but timing is the issue. Let’s see what has to be covered before September." : funding.gap > 0 ? "Before borrowing, I’ll look for the smallest amount you may actually need." : `${profile.name}, your tuition path looks covered. Now confirm timing before September.`}
      thinkingText={reveal === 0 ? "Checking funding sources..." : reveal === 1 ? isInternational ? "Checking arrival cash timing..." : "Reducing unnecessary borrowing..." : "Matching CIBC resources..."}
      aiTip={isInternational ? "Before landing, keep some money accessible immediately. Transfer timing, deposits, and phone setup can happen before campus routines begin." : "Before relying on OSAP, check whether approval timing lines up with tuition, deposits, and first-month cash needs."}
      nextAction={reveal < 2 ? isInternational ? "Review arrival funding timing" : "Review tuition timing" : isInternational ? "Review arrival banking resources" : "Discuss the smallest backup amount"}
      completedHabits={1}
      futureReminder={{ title: isInternational ? "Arrival reminder" : "Tuition reminder", body: isInternational ? "Confirm tuition payment method, GIC status, and accessible first-month cash before departure." : "Your payment deadline is approaching. Confirm OSAP timing and backup funds before the due date.", icon: ReceiptText }}
      back={back}
      ctaLabel={reveal === 0 ? "Show me why" : reveal === 1 ? isInternational ? "Show arrival checklist" : "Show borrowing strategy" : "Plan move-in costs"}
      next={reveal < 2 ? () => setReveal((current) => current + 1) : next}
    >
      <div className="single-visual funding-decision">
        <div className={`gap-hero ${funding.gap > 0 ? "warn" : "ok"}`}>
          <span>{heroLabel}</span>
          <strong>{heroValue}</strong>
          <p>{heroBody}</p>
        </div>
        {reveal >= 1 && (
          <div className="stack-card v2-stack">
            <StackLine label={isInternational ? "International tuition + books" : "Tuition + books"} value={funding.tuitionNeed} max={max} tone="need" />
            <StackLine label={isInternational ? "Move-in + first landing cash" : "Move-in impact"} value={isInternational ? funding.upfrontHousing + funding.firstMonthCash : funding.upfrontHousing} max={max} tone="need-soft" />
            <StackLine label={isInternational ? "Minus GIC / proof of funds" : "Minus OSAP"} value={isInternational ? funding.proofFunds : funding.osap} max={max} tone="credit" />
            <StackLine label="Minus savings" value={profile.savings} max={max} tone="credit" />
            <StackLine label={isInternational ? "Minus family transfer" : "Minus family support"} value={isInternational ? profile.familyTransfer : profile.familySupport} max={max} tone="credit" />
            <div className="funding-totals">
              <div><span>{isInternational ? "Arrival money number" : "Total first-semester need"}</span><strong>{formatCurrency(isInternational ? funding.need : semesterMoney.totalNeed)}</strong></div>
              <div><span>{isInternational ? "Arrival funding gap" : "First-payment shortfall"}</span><strong>{formatCurrency(funding.gap)}</strong></div>
              <div><span>Covered before borrowing</span><strong>{formatCurrency(funding.available)}</strong></div>
            </div>
          </div>
        )}
        {reveal >= 2 && (
          <div className="progressive-panel">
            <FinancialPositionCalculator position={financialPosition} />
            <TimingGapBar position={financialPosition} isInternational={isInternational} />
            {isInternational ? (
              <div className="funding-strategy-card">
                <div className="strategy-head">
                  <Sparkles size={18} />
                  <div>
                    <span>CampusGo analysis</span>
                    <strong>Before You Land in Canada</strong>
                  </div>
                </div>
                <div className="strategy-grid international-arrival-grid">
                  <p><Check size={14} /> Study permit: {profile.studyPermitStatus}</p>
                  <p><Check size={14} /> GIC / proof of funds: {profile.gicStatus}</p>
                  <p><Check size={14} /> Canadian bank account setup</p>
                  <p><Check size={14} /> Tuition payment method</p>
                  <p><Check size={14} /> Temporary housing</p>
                  <p><Check size={14} /> Phone plan and transit setup</p>
                  <p><Check size={14} /> SIN application reminder</p>
                  <p><Check size={14} /> First 30 days cash estimate</p>
                </div>
                <div className="borrow-estimate">
                  <div><span>Accessible savings</span><strong>{formatCurrency(profile.savings)}</strong></div>
                  <div><span>Family transfer planned</span><strong>{formatCurrency(profile.familyTransfer)}</strong></div>
                  <div><span>Arrival gap to review</span><strong>{formatCurrency(funding.gap)}</strong><small>Planning estimate only. Confirm with CIBC and your school.</small></div>
                </div>
                <p className="advisor-note">I would review payment timing first: when tuition is due, when your transfer clears, and how much cash you can access during your first week in Canada.</p>
              </div>
            ) : (
              <>
                <div className="funding-strategy-card">
              <div className="strategy-head">
                <Sparkles size={18} />
                <div>
                  <span>CampusGo analysis</span>
                  <strong>How I reduced your borrowing estimate</strong>
                </div>
              </div>
              <div className="strategy-grid">
                <p><Check size={14} /> Applied confirmed OSAP funding</p>
                <p><Check size={14} /> Included family contribution</p>
                <p><Check size={14} /> Counted available savings</p>
                <p><Check size={14} /> Estimated part-time income before tuition</p>
                <p><Check size={14} /> Considered possible scholarship income only when confirmed</p>
                <p><Check size={14} /> Identified expenses that can be delayed</p>
              </div>
              <div className="borrow-estimate">
                <div><span>Initial gap</span><strong>{formatCurrency(financialPosition.remainingGap)}</strong></div>
                <div><span>After timing and delayable costs</span><strong>{financialPosition.borrowingLow === 0 ? "$0" : `${formatCurrency(financialPosition.borrowingLow)}-${formatCurrency(financialPosition.borrowingHigh)}`}</strong></div>
                <div><span>Example monthly interest impact</span><strong>{formatCurrency(borrowingStrategy.repaymentImpact)}</strong><small>Planning estimate only. Your advisor can confirm rates and terms.</small></div>
              </div>
              <p className="advisor-note">Initial gap: {formatCurrency(financialPosition.remainingGap)}. After delayable expenses and expected income, {financialPosition.borrowingLow > 0 ? `discuss approximately ${formatCurrency(financialPosition.borrowingLow)}-${formatCurrency(financialPosition.borrowingHigh)} with an advisor.` : "borrowing may not be needed based on this planning estimate."} This is an advisor discussion option, not a recommendation to borrow.</p>
                </div>
                <div className="borrow-less-simulator">
              <div>
                <span>Borrow Less simulator</span>
                <strong>How can I reduce my borrowing?</strong>
              </div>
              <div className="borrow-less-actions">
                {borrowLessActions.map((action) => {
                  const active = selectedBorrowLess.includes(action.id);
                  return (
                    <button key={action.id} className={active ? "active" : ""} onClick={() => toggleBorrowLess(action.id)}>
                      {active ? <Check size={14} /> : <ChevronRight size={14} />}
                      {action.label}
                    </button>
                  );
                })}
              </div>
                </div>
              </>
            )}
            <p><CalendarDays size={16} /> {isInternational ? "Tuition, deposits, transfers, and arrival expenses may not happen in the same week. Keep some first-month money accessible when you land." : "OSAP and deposits may not arrive in the same week. Keep a first-payment backup before the tuition deadline."}</p>
            <details>
              <summary>Adjust funding assumptions</summary>
              <Slider label="Tuition" value={profile.tuition} min={isInternational ? 25000 : 4000} max={isInternational ? 85000 : 28000} step={250} onChange={(tuition) => updateProfile({ tuition })} />
              <Slider label="Books" value={profile.books} min={300} max={3000} step={50} onChange={(books) => updateProfile({ books })} />
              <Slider label="Savings" value={profile.savings} min={0} max={isInternational ? 40000 : 12000} step={250} onChange={(savings) => updateProfile({ savings })} />
              {isInternational && (
                <>
                  <Slider label="Family transfer" value={profile.familyTransfer} min={0} max={90000} step={500} onChange={(familyTransfer) => updateProfile({ familyTransfer })} />
                  <Slider label="GIC / proof of funds" value={profile.gicAmount} min={0} max={35000} step={500} onChange={(gicAmount) => updateProfile({ gicAmount, gicStatus: gicAmount > 0 ? "In progress" : "Not started" })} />
                </>
              )}
            </details>
            <ProductFitGrid resources={fundingResources} isInternational={isInternational} />
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
      title={profile.international ? "What do I need ready for arrival and move-in?" : "Am I ready to move in without a cash surprise?"}
      coach={profile.international ? "International students often pay for temporary housing, deposits, phone setup, and arrival essentials before routines settle." : "Students usually underestimate move-in costs. Let's make sure there are no surprises."}
      thinkingText="Checking deposit and move-in costs..."
      aiTip={profile.international ? "A temporary stay can overlap with rent deposits. Keep arrival cash separate from tuition money." : "Most students forget that first and last month's rent can happen before classes begin."}
      nextAction="Confirm deposit and tenant insurance"
      completedHabits={2}
      futureReminder={{ title: "Move-in reminder", body: profile.international ? "Confirm temporary housing, airport transportation, and tenant insurance before signing a lease." : "Remember to budget for first and last month's rent before you pick up the keys.", icon: Home }}
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
        {profile.international && (
          <div className="progressive-panel international-movein-panel">
            <span className="section-kicker">International move-in checks</span>
            <div className="strategy-grid">
              <p><Check size={14} /> Temporary accommodation</p>
              <p><Check size={14} /> Guarantor or lease requirement</p>
              <p><Check size={14} /> First/last month deposit</p>
              <p><Check size={14} /> Airport transportation</p>
              <p><Check size={14} /> Phone plan setup</p>
              <p><Check size={14} /> Winter clothing and essentials</p>
            </div>
          </div>
        )}
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
  const creditRules = profile.international
    ? [
        ["Canadian credit starts here", "Your credit history may not transfer to Canada, so first habits matter."],
        ["Statement vs minimum", "Know the full statement balance, not only the minimum payment."],
        ["Utilization", "Keep usage low. Do not treat credit as extra income."],
        ["Autopay reminder", "Set reminders before the first payment due date."]
      ]
    : [
        ["Statement balance", "Know the full amount owed, not only the minimum payment."],
        ["Due date", "Set a reminder before the first statement arrives."],
        ["Utilization", "Use a small share of the limit. Credit is not extra income."],
        ["Canada note", "Paying on time helps build a Canadian credit history."]
      ];
  const resourceSet = profile.international ? [resources.creditCard, resources.creditGuide, resources.studentBanking] : [resources.studentBanking, resources.creditCard, resources.creditGuide];
  return (
    <DecisionScreen
      eyebrow="First week"
      title="How do I build healthy credit habits?"
      coach={profile.international ? "Your credit history may not transfer to Canada. I’ll help you start with safe habits from day one." : "Canada builds credit through responsible repayment. I’ll help you build good habits from day one."}
      thinkingText="Preparing first credit routine..."
      aiTip="Paying the full statement balance builds stronger credit habits than paying only the minimum."
      nextAction="Learn how Canadian credit works"
      completedHabits={4}
      futureReminder={{ title: "Credit reminder", body: "Your first statement arrives next week. Pay the full statement balance to build healthy credit.", icon: CreditCard }}
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
            <p><Building2 size={16} /> International note: Canada rewards responsible repayment, not simply spending more. Start slowly and pay on time.</p>
          </div>
        )}
        <ResourceGrid resources={resourceSet} />
      </div>
    </DecisionScreen>
  );
}

function BudgetScreen({ profile, updateProfile, budget, scenarioNote, applyScenario, next, back }: { profile: Profile; updateProfile: (updates: Partial<Profile>) => void; budget: ReturnType<typeof calculateBudget>; scenarioNote: string; applyScenario: (scenario: string) => void; next: () => void; back: () => void }) {
  const scenarios = profile.international
    ? [
        ["exchange", "Exchange rate drops"],
        ["transfer", "Family transfer delayed"],
        ["winter", "Need winter clothes"],
        ["laptop", "Need laptop"],
        ["temporary-housing", "Temporary housing costs more"],
        ["phone-transit", "Phone + transit setup"],
        ["rent-deposit", "Rent deposit due before arrival"]
      ]
    : [
        ["work", "I work 8 hrs/week"],
        ["rent", "Rent +$150"],
        ["car", "I buy a car"],
        ["home", "I live at home"],
        ["osap", "OSAP is delayed"]
      ];
  return (
    <DecisionScreen
      eyebrow="First month"
      title={profile.international ? "Will my first month in Canada work?" : "Can I survive my first month?"}
      coach={scenarioNote === "Your base plan is ready to test." ? profile.international ? "Let’s test the first month after real arrival costs happen." : "Let's see if your monthly plan still works after real life happens." : scenarioNote}
      thinkingText="Comparing student scenarios..."
      aiTip={profile.international ? "The first month in Canada often includes one-time setup costs: phone, transit, basics, winter items, and temporary housing." : "Students usually spend 20-30% more than expected during their first month."}
      nextAction={profile.international ? "Check accessible cash before landing" : "Estimate your first grocery budget"}
      completedHabits={5}
      futureReminder={{ title: "Budget check", body: "Your first-month budget check is ready after move-in costs settle.", icon: BarChart3 }}
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

function ScoreScreen({ profile, readiness, semesterMoney, funding, budget, next, back }: { profile: Profile; readiness: ReturnType<typeof calculateReadiness>; semesterMoney: ReturnType<typeof calculateSemesterMoney>; funding: ReturnType<typeof calculateFunding>; budget: ReturnType<typeof calculateBudget>; next: () => void; back: () => void }) {
  return (
    <DecisionScreen
      eyebrow="Readiness score"
      title="First Semester Readiness Score"
      coach="You have finished the journey. Here is where I would focus first."
      thinkingText="Building your readiness profile..."
      aiTip="A readiness score is most useful when it points to the next conversation, not when it tries to answer everything at once."
      nextAction="Review your highest-risk area"
      completedHabits={6}
      back={back}
      ctaLabel="Create action plan"
      next={next}
    >
      <div className="single-visual score-decision">
        <ReadinessDashboard readiness={readiness} />
        <div className="score-context-grid">
          <div className="context-tile"><span>Money number</span><strong>{formatCurrency(semesterMoney.totalNeed)}</strong></div>
          <div className="context-tile"><span>{profile.international ? "Arrival gap" : "Funding gap"}</span><strong>{formatCurrency(funding.gap)}</strong></div>
          <div className="context-tile"><span>Monthly result</span><strong>{budgetLabel(budget.surplus)}</strong></div>
        </div>
      </div>
    </DecisionScreen>
  );
}

function SummaryScreen({ profile, readiness, semesterMoney, funding, budget, back, setStepIndex, openCompanion }: { profile: Profile; readiness: ReturnType<typeof calculateReadiness>; semesterMoney: ReturnType<typeof calculateSemesterMoney>; funding: ReturnType<typeof calculateFunding>; budget: ReturnType<typeof calculateBudget>; back: () => void; setStepIndex: (index: number) => void; openCompanion: () => void }) {
  const [showAdvisorBrief, setShowAdvisorBrief] = useState(false);
  const [copied, setCopied] = useState(false);
  const borrowingStrategy = calculateBorrowingStrategy(profile, funding);
  const financialPosition = calculateFinancialPosition(profile, funding, budget, borrowingStrategy);
  const resourceSet = profile.international
    ? [resources.internationalAccount, funding.gap > 0 ? resources.gic : resources.internationalStudentPay, resources.advisor]
    : [resources.studentBanking, funding.gap > 0 ? resources.lineOfCredit : resources.budgetCalculator, resources.advisor];
  const advisorResources = profile.international
    ? [resources.internationalAccount, resources.gic, resources.internationalStudentPay, resources.budgetCalculator, resources.creditGuide, resources.advisor]
    : [resources.studentBanking, resources.bundle, resources.creditCard, resources.lineOfCredit, resources.budgetCalculator, resources.advisor];
  const advisorQuestions = profile.international
    ? [
        "Do I need to set up an international student account before I arrive?",
        "How should I prepare my GIC or proof-of-funds?",
        "What is the safest way to pay tuition from overseas?"
      ]
    : [
        "Which student account setup best separates tuition, rent, and everyday spending?",
        "How should I cover the temporary timing gap before OSAP arrives?",
        "Should I adjust payment timing before considering borrowing?",
        "What is the smallest amount worth discussing if a line of credit is needed?",
        "Which credit routine should be set before the first statement arrives?"
      ];
  const briefText = createAdvisorBriefText(profile, funding, budget);
  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };
  const handleDownloadBrief = () => {
    const blob = new Blob([briefText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "cibc-campusgo-advisor-brief.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return (
    <DecisionScreen
      eyebrow="Action plan"
      title="Your First-Semester Money Plan"
      coach={profile.international ? "You have done the hard part. Bring this arrival plan to your CIBC advisor, and you will start the conversation prepared." : "You have done the hard part. Bring this plan to your CIBC advisor, and you will start the conversation prepared."}
      thinkingText="Preparing advisor-ready next steps..."
      aiTip={`Your highest-risk area is ${readiness.focus.label.toLowerCase()}. Handle that before adding more decisions.`}
      nextAction="Book a student banking conversation"
      completedHabits={6}
      futureReminder={{ title: "Next conversation", body: profile.international ? "Bring your arrival funding, GIC/proof-of-funds, tuition payment, and credit questions to your advisor discussion." : "Bring your plan, funding gap, and credit questions to your advisor discussion.", icon: CalendarDays }}
      back={back}
      ctaLabel="Compare another scenario"
      next={() => setStepIndex(6)}
    >
      <div className="single-visual action-plan">
        <div className="summary-hero">
          <Gauge size={30} />
          <span>{profile.name} at {profile.university}</span>
          <strong>{readiness.score}% first-semester ready</strong>
          <p>{profile.international ? `${formatCurrency(funding.need)} arrival money number. ` : `${formatCurrency(semesterMoney.totalNeed)} estimated money number. `}{profile.international ? funding.gap > 0 ? `${formatCurrency(funding.gap)} arrival funding gap to review.` : "Arrival funding appears covered." : semesterMoney.gap > 0 ? `${formatCurrency(semesterMoney.gap)} still needs a plan.` : `${formatCurrency(Math.abs(semesterMoney.gap))} projected surplus.`}</p>
        </div>
        <div className="plan-section">
          <strong>Questions to ask CIBC</strong>
          {advisorQuestions.map((question) => <p key={question}><ChevronRight size={15} /> {question}</p>)}
        </div>
        <div className="plan-section plan-position-section">
          <strong>Funding position to bring forward</strong>
          <p><ChevronRight size={15} /> Total first-semester money number: {formatCurrency(financialPosition.totalCost)}</p>
          <p><ChevronRight size={15} /> Confirmed funding: {formatCurrency(financialPosition.confirmedFunding)}</p>
          <p><ChevronRight size={15} /> Timing gap before September: {formatCurrency(financialPosition.timingGap)}</p>
          <p><ChevronRight size={15} /> Borrow-only-if-needed estimate: {financialPosition.borrowingLow > 0 ? `${formatCurrency(financialPosition.borrowingLow)}-${formatCurrency(financialPosition.borrowingHigh)}` : "$0"}</p>
        </div>
        <ResourceGrid resources={resourceSet} />
        <button className="advisor-brief-generate" onClick={() => setShowAdvisorBrief(true)}>
          <Sparkles size={20} />
          <span>
            <strong>Generate My Advisor Brief</strong>
            <small>Prepare the conversation before booking an appointment.</small>
          </span>
        </button>
        {showAdvisorBrief && (
          <AdvisorBrief
            profile={profile}
            funding={funding}
            budget={budget}
            resources={advisorResources}
            copied={copied}
            onCopy={handleCopyBrief}
            onDownload={handleDownloadBrief}
          />
        )}
        <div className="cta-row">
          <button className="secondary-button" onClick={() => window.print()}><Check size={18} /> Save plan</button>
          <a className="primary-button" href={cibcLinks.appointment} target="_blank" rel="noreferrer"><CalendarDays size={18} /> Book CIBC student banking appointment</a>
          <a className="secondary-button" href={profile.international ? cibcLinks.internationalBankAccount : cibcLinks.studentBanking} target="_blank" rel="noreferrer"><Landmark size={18} /> Open student account</a>
          <a className="secondary-button" href={cibcLinks.creditCards} target="_blank" rel="noreferrer"><CreditCard size={18} /> Review student credit card options</a>
          <a className="secondary-button" href={profile.international ? cibcLinks.internationalStudentPay : cibcLinks.educationLineOfCredit} target="_blank" rel="noreferrer"><CircleDollarSign size={18} /> {profile.international ? "Review tuition payment options" : "Learn about Education Line of Credit"}</a>
        </div>
        <CampusCompanionTeaser onEnable={openCompanion} />
      </div>
    </DecisionScreen>
  );
}

function createAdvisorBriefText(profile: Profile, funding: ReturnType<typeof calculateFunding>, budget: ReturnType<typeof calculateBudget>) {
  const borrowingStrategy = calculateBorrowingStrategy(profile, funding);
  const position = calculateFinancialPosition(profile, funding, budget, borrowingStrategy);
  if (profile.international) {
    return [
      "AI Advisor Brief",
      "",
      "What I am trying to do",
      "I am arriving in Canada for university and want to prepare my tuition, GIC/proof-of-funds, banking setup, first-month spending, and credit-building plan.",
      "",
      "My current situation",
      `University: ${profile.university}`,
      `Program: ${profile.program}`,
      `Student type: International`,
      `Country of origin: ${profile.countryOfOrigin}`,
      `City: ${profile.city}`,
      `Arrival date: ${profile.arrivalDate}`,
      `Tuition estimate: ${formatCurrency(profile.tuition)}`,
      `Total first-semester money number: ${formatCurrency(position.totalCost)}`,
      `Confirmed funding: ${formatCurrency(position.confirmedFunding)}`,
      `Arrival funding gap: ${formatCurrency(funding.gap)}`,
      `Timing gap before arrival: ${formatCurrency(position.timingGap)}`,
      `Borrow-only-if-needed estimate: ${position.borrowingLow > 0 ? `${formatCurrency(position.borrowingLow)}-${formatCurrency(position.borrowingHigh)}` : "$0"}`,
      `GIC / proof-of-funds status: ${profile.gicStatus}`,
      `Study permit: ${profile.studyPermitStatus}`,
      `First-month result: ${budgetLabel(budget.surplus)}`,
      `Canadian bank account: ${profile.hasCibcAccount ? "Opened" : "Not yet"}`,
      `Credit card: ${profile.hasCreditCard ? "Already has one" : "Not yet"}`,
      "",
      "Biggest risk before landing",
      "The biggest remaining risk is timing: tuition payment, family transfer, GIC/proof-of-funds, rent deposit, and first-month cash may not all be accessible at the same time.",
      "",
      "Questions to ask my CIBC advisor",
      "- Do I need to set up an international student account before I arrive?",
      "- How should I prepare my GIC or proof-of-funds?",
      "- What is the safest way to pay tuition from overseas?",
      "- How much money should I have accessible when I land?",
      "- Should I adjust payment timing before considering borrowing?",
      "- What should I do first after arriving in Canada?",
      "- How can I start building Canadian credit safely?",
      "- What alerts or automatic payments should I set up?",
      "",
      "AI summary",
      "Based on my readiness journey, I would start the advisor conversation with arrival timing: when tuition, GIC/proof-of-funds, family transfer, rent deposit, and first-month expenses happen."
    ].join("\n");
  }
  return [
    "AI Advisor Brief",
    "",
    "What I am trying to do",
    "I am starting university this September and want to make sure I can afford tuition, move-in costs, first-month spending, and credit setup without surprises.",
    "",
    "My current situation",
    `University: ${profile.university}`,
    `Program: ${profile.program}`,
    `Student type: ${profile.international ? "International" : "Domestic"}`,
    `Living plan: ${profile.living}`,
    `Tuition estimate: ${formatCurrency(profile.tuition)}`,
    `Total first-semester money number: ${formatCurrency(position.totalCost)}`,
    `Confirmed funding: ${formatCurrency(position.confirmedFunding)}`,
    `Funding gap: ${formatCurrency(funding.gap)}`,
    `Timing gap before September: ${formatCurrency(position.timingGap)}`,
    `Borrow-only-if-needed estimate: ${position.borrowingLow > 0 ? `${formatCurrency(position.borrowingLow)}-${formatCurrency(position.borrowingHigh)}` : "$0"}`,
    `First-month result: ${budgetLabel(budget.surplus)}`,
    `OSAP: ${profile.international ? "Not applicable" : profile.osapStatus}`,
    `Student account: ${profile.hasCibcAccount ? "Opened" : "Not yet opened"}`,
    `Credit card: ${profile.hasCreditCard ? "Already has one" : "Not yet"}`,
    "Part-time job: Considering",
    "",
    "Biggest risk before semester starts",
    "The biggest remaining risk is cash flow timing. Tuition, rent deposit, books, and first-month expenses may happen before all funding arrives.",
    "",
    "Questions to ask my CIBC advisor",
    "- Should I open a CIBC student account before tuition payment deadlines?",
    "- How should I separate tuition money, rent money, and everyday spending?",
    "- How should I cover the temporary timing gap before OSAP arrives?",
    "- Should I adjust payment timing before considering borrowing?",
    "- What is the smallest amount worth discussing if a line of credit is needed?",
    "- Which student credit card option is appropriate if I want to build credit safely?",
    "- What alerts or automatic payments should I set up before school starts?",
    "- What should I prepare if OSAP or family support arrives later than expected?",
    "",
    "AI summary",
    "Based on my readiness journey, I would not start the advisor conversation with a product. I would start with my timing risk: when tuition, rent, OSAP, and first-month expenses happen."
  ].join("\n");
}

function AdvisorBrief({ profile, funding, budget, resources: advisorResources, copied, onCopy, onDownload }: { profile: Profile; funding: ReturnType<typeof calculateFunding>; budget: ReturnType<typeof calculateBudget>; resources: ResourceCard[]; copied: boolean; onCopy: () => void; onDownload: () => void }) {
  const borrowingStrategy = calculateBorrowingStrategy(profile, funding);
  const position = calculateFinancialPosition(profile, funding, budget, borrowingStrategy);
  const situation = profile.international
    ? [
        ["University", profile.university],
        ["Program", profile.program],
        ["Student type", "International"],
        ["Country of origin", profile.countryOfOrigin],
        ["Arrival date", profile.arrivalDate],
        ["Tuition estimate", formatCurrency(profile.tuition)],
        ["Money number", formatCurrency(position.totalCost)],
        ["Confirmed funding", formatCurrency(position.confirmedFunding)],
        ["Arrival funding gap", formatCurrency(funding.gap)],
        ["Timing gap", formatCurrency(position.timingGap)],
        ["Borrow-if-needed estimate", position.borrowingLow > 0 ? `${formatCurrency(position.borrowingLow)}-${formatCurrency(position.borrowingHigh)}` : "$0"],
        ["GIC / proof of funds", profile.gicStatus],
        ["Study permit", profile.studyPermitStatus],
        ["Canadian bank account", profile.hasCibcAccount ? "Opened" : "Not yet"],
        ["Credit card", profile.hasCreditCard ? "Already has one" : "Not yet"]
      ]
    : [
        ["University", profile.university],
        ["Program", profile.program],
        ["Student type", "Domestic"],
        ["Living plan", profile.living],
        ["Tuition estimate", formatCurrency(profile.tuition)],
        ["Money number", formatCurrency(position.totalCost)],
        ["Confirmed funding", formatCurrency(position.confirmedFunding)],
        ["Funding gap", formatCurrency(funding.gap)],
        ["Timing gap", formatCurrency(position.timingGap)],
        ["Borrow-if-needed estimate", position.borrowingLow > 0 ? `${formatCurrency(position.borrowingLow)}-${formatCurrency(position.borrowingHigh)}` : "$0"],
        ["First-month result", budgetLabel(budget.surplus)],
        ["OSAP", profile.osapStatus],
        ["Student account", profile.hasCibcAccount ? "Opened" : "Not yet opened"],
        ["Credit card", profile.hasCreditCard ? "Already has one" : "Not yet"],
        ["Part-time job", "Considering"]
      ];
  const questions = profile.international
    ? [
        "Do I need to set up an international student account before I arrive?",
        "How should I prepare my GIC or proof-of-funds?",
        "What is the safest way to pay tuition from overseas?",
        "How much money should I have accessible when I land?",
        "Should I adjust payment timing before considering borrowing?",
        "What should I do first after arriving in Canada?",
        "How can I start building Canadian credit safely?",
        "What alerts or automatic payments should I set up?"
      ]
    : [
        "Should I open a CIBC student account before tuition payment deadlines?",
        "How should I separate tuition money, rent money, and everyday spending?",
        "How should I cover the temporary timing gap before OSAP arrives?",
        "Should I adjust payment timing before considering borrowing?",
        "What is the smallest amount worth discussing if a line of credit is needed?",
        "Which student credit card option is appropriate if I want to build credit safely?",
        "What alerts or automatic payments should I set up before school starts?",
        "What should I prepare if OSAP or family support arrives later than expected?"
      ];
  const intent = profile.international
    ? "I am arriving in Canada for university and want to prepare my tuition, GIC/proof-of-funds, banking setup, first-month spending, and credit-building plan."
    : "I am starting university this September and want to make sure I can afford tuition, move-in costs, first-month spending, and credit setup without surprises.";
  const risk = profile.international
    ? "The biggest remaining risk is timing: tuition payment, family transfer, GIC/proof-of-funds, rent deposit, and first-month cash may not all be accessible at the same time."
    : "The biggest remaining risk is cash flow timing. Tuition, rent deposit, books, and first-month expenses may happen before all funding arrives.";
  const summary = profile.international
    ? "Based on your readiness journey, I would start the advisor conversation with arrival timing: when tuition, GIC/proof-of-funds, family transfer, rent deposit, and first-month expenses happen."
    : "Based on your readiness journey, I would not start the advisor conversation with a product. I would start with your timing risk: when tuition, rent, OSAP, and first-month expenses happen.";
  return (
    <section className="advisor-brief" aria-label="AI Advisor Brief">
      <div className="advisor-brief-head">
        <AIOrb compact />
        <div>
          <span>AI-generated handoff</span>
          <h2>AI Advisor Brief</h2>
          <p>Bring this to your CIBC appointment so you do not have to start from scratch.</p>
        </div>
      </div>

      <div className="brief-intent-card">
        <span>What I am trying to do</span>
        <p>{intent}</p>
      </div>

      <div className="brief-grid">
        <div className="brief-section">
          <span>My current situation</span>
          <div className="brief-facts">
            {situation.map(([label, value]) => (
              <div key={label}><small>{label}</small><strong>{value}</strong></div>
            ))}
          </div>
        </div>
        <div className="brief-risk-card">
          <ShieldCheck size={22} />
          <span>{profile.international ? "Biggest risk before landing" : "Biggest risk before semester starts"}</span>
          <p>{risk}</p>
        </div>
      </div>

      <div className="brief-section">
        <span>Questions to ask my CIBC advisor</span>
        <div className="advisor-question-grid">
          {questions.map((question) => (
            <article key={question}>
              <ChevronRight size={15} />
              <p>{question}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="brief-section">
        <span>Matched CIBC resources to review</span>
        <ResourceGrid resources={advisorResources} />
      </div>

      <div className="advisor-summary-note">
        <AIOrb compact />
        <p>{summary}</p>
      </div>

      <div className="advisor-brief-actions">
        <button className="secondary-button" onClick={onCopy}><Copy size={18} /> {copied ? "Copied" : "Copy advisor brief"}</button>
        <button className="secondary-button" onClick={onDownload}><Download size={18} /> Download brief</button>
        <a className="primary-button" href={cibcLinks.appointment} target="_blank" rel="noreferrer"><CalendarDays size={18} /> Book appointment</a>
      </div>
    </section>
  );
}

function CampusCompanionTeaser({ onEnable }: { onEnable: () => void }) {
  const bullets = [
    "Tuition deadline reminders",
    "Credit card payment reminders",
    "Monthly budget check-ins",
    "Emergency buffer tracker",
    "First-semester milestone support"
  ];
  return (
    <section className="companion-teaser" aria-label="Campus Companion optional next phase">
      <div className="companion-teaser-copy">
        <AIOrb compact />
        <div>
          <span>Campus Companion</span>
          <h2>CampusGo can stay with you through your first semester.</h2>
          <div className="companion-teaser-list">
            {bullets.map((bullet) => (
              <p key={bullet}><Check size={14} /> {bullet}</p>
            ))}
          </div>
        </div>
      </div>
      <button className="primary-button" onClick={onEnable}><Sparkles size={18} /> Enable Campus Companion</button>
    </section>
  );
}

function CompanionPage({ profile, budget, onBack }: { profile: Profile; budget: ReturnType<typeof calculateBudget>; onBack: () => void }) {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const checkInResponses: Record<string, string> = {
    well: "Great. Keep the routine simple: confirm tuition timing, pay statements on time, and review your budget once a month.",
    tight: "Let's update your monthly budget together and look for one spending category to reduce first.",
    expense: "Let's protect your emergency buffer and decide what can wait until next month."
  };
  const timeline = [
    ["Today", "Financial plan completed.", true],
    [profile.international ? "August" : "September", profile.international ? "Arrival date and tuition payment check." : "Tuition payment reminder.", false],
    ["Late September", profile.international ? "First credit routine setup." : "First credit card statement.", false],
    ["October", "First month budget review.", false],
    ["November", "Emergency fund check.", false],
    ["December", "Prepare for next semester.", false]
  ] as const;
  const inboxItems: [ElementType, string][] = profile.international
    ? [
        [CalendarDays, "Your arrival date is coming up."],
        [ReceiptText, "Confirm your tuition payment method."],
        [PiggyBank, "Check whether your GIC setup is complete."],
        [WalletCards, "Prepare first-month cash before landing."],
        [Home, "Review tenant insurance before signing."]
      ]
    : [
        [BookOpen, "Tuition deadline is coming next week."],
        [CreditCard, "Your first statement may arrive this month."],
        [Home, "Have you finished your tenant insurance?"],
        [Train, "Student transit pass registration is now available."],
        [CalendarDays, "Winter semester planning starts next month."]
      ];
  const companionCards: [ElementType, string][] = profile.international
    ? [
        [ReceiptText, "Confirm your tuition payment method before sending money from overseas."],
        [PiggyBank, "Check whether your GIC/proof-of-funds setup is complete."],
        [WalletCards, "Keep first-month cash accessible when you land."],
        [CreditCard, "Set a reminder for your first credit card payment."]
      ]
    : [
        [ReceiptText, "Tuition payment is due in 6 days. Review your funding plan."],
        [CreditCard, "Your first credit statement may arrive this month. Pay the statement balance before the due date."],
        [PiggyBank, `Your emergency buffer goal is ${formatCurrency(profile.emergencyBuffer)}. You currently have ${formatCurrency(Math.max(0, profile.emergencyBuffer - 80))}.`],
        [BarChart3, budget.surplus < 0 ? "Food spending may be tighter than expected. Review your first-month budget." : "Your first-month budget is on track. Keep checking it monthly."]
      ];
  return (
    <section className="campus-companion page" aria-label="Campus Companion">
      <button className="ghost-button companion-back" onClick={onBack}><ArrowLeft size={18} /> Back to money plan</button>
      <div className="companion-head">
        <AIOrb compact />
        <div>
          <span>Campus Companion</span>
          <h1>Campus Companion</h1>
          <p>Your first-semester financial check-ins, after the plan is built.</p>
        </div>
      </div>

      <div className="companion-grid">
        <div className="companion-panel whats-next">
          <span className="section-kicker">What's Next Timeline</span>
          <div className="semester-timeline">
            {timeline.map(([label, body, done]) => (
              <div key={label} className={done ? "done" : ""}>
                <i>{done ? <Check size={13} /> : null}</i>
                <strong>{label}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="companion-panel checkin-panel">
          <span className="section-kicker">Monthly Check-in</span>
          <div className="checkin-card">
            <AIOrb compact />
            <div>
              <strong>Hi {profile.name}. How has your first month been?</strong>
              <div className="checkin-actions">
                <button onClick={() => setCheckIn("well")}>Everything is going well</button>
                <button onClick={() => setCheckIn("tight")}>Money is tighter than expected</button>
                <button onClick={() => setCheckIn("expense")}>I had an unexpected expense</button>
              </div>
              {checkIn && (
                <div className="checkin-response">
                  <p>{checkInResponses[checkIn]}</p>
                  <button>Update Budget</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="companion-panel campus-inbox">
          <span className="section-kicker">CampusGo Inbox</span>
          {inboxItems.map(([Icon, text]) => (
            <div key={text}>
              <Icon size={17} />
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="companion-panel companion-cards">
          <span className="section-kicker">AI Companion Cards</span>
          <div>
            {companionCards.map(([Icon, text]) => (
              <article key={text}>
                <Icon size={17} />
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="companion-ending">
        <Sparkles size={24} />
        <div>
          <strong>CampusGo starts before university. Campus Companion continues through the first semester.</strong>
          <p>Reminder, check-in, and milestone support only. No transaction monitoring.</p>
        </div>
      </div>
    </section>
  );
}

function DecisionScreen({
  eyebrow,
  title,
  coach,
  children,
  ctaLabel,
  next,
  back,
  ctaDisabled = false,
  thinkingText = "Thinking through the next step...",
  aiTip,
  nextAction,
  completedHabits = 0,
  futureReminder
}: {
  eyebrow: string;
  title: string;
  coach: string;
  children: ReactNode;
  ctaLabel: string;
  next: () => void;
  back: () => void;
  ctaDisabled?: boolean;
  thinkingText?: string;
  aiTip?: string;
  nextAction?: string;
  completedHabits?: number;
  futureReminder?: FutureReminder;
}) {
  const [thinking, setThinking] = useState(true);
  useEffect(() => {
    setThinking(true);
    const timer = window.setTimeout(() => setThinking(false), 850);
    return () => window.clearTimeout(timer);
  }, [title, coach, thinkingText]);

  return (
    <section className="flow-screen page v2-decision">
      <div className="flow-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="coach-note v2-coach-note">
          <SupportBuddy />
          <p>{coach}</p>
        </div>
        {thinking && <ThinkingMoment text={thinkingText} />}
      </div>
      <div className="flow-content">{children}</div>
      {aiTip && nextAction && (
        <AIInsightCard
          tip={aiTip}
          nextAction={nextAction}
          completedHabits={completedHabits}
          futureReminder={futureReminder}
        />
      )}
      <div className="flow-actions">
        <button className="ghost-button" onClick={back}><ArrowLeft size={18} /> Back</button>
        <button className="primary-button" onClick={next} disabled={ctaDisabled}>{ctaLabel} <ArrowRight size={18} /></button>
      </div>
    </section>
  );
}

function SupportBuddy() {
  return <AIOrb compact />;
}

function AIOrb({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "ai-orb compact" : "ai-orb"} aria-hidden="true">
      <span className="ai-orb-glow" />
      <span className="ai-orb-face">
        <i />
        <i />
        <b />
      </span>
    </span>
  );
}

function ThinkingMoment({ text }: { text: string }) {
  return (
    <div className="thinking-moment" aria-live="polite">
      <AIOrb compact />
      <span>{text}</span>
      <i><b /></i>
    </div>
  );
}

function AIInsightCard({ tip, nextAction, completedHabits, futureReminder }: { tip: string; nextAction: string; completedHabits: number; futureReminder?: FutureReminder }) {
  const ReminderIcon = futureReminder?.icon;
  return (
    <aside className="ai-insight-card" aria-label="AI companion insight">
      <div className="ai-tip">
        <Sparkles size={17} />
        <div>
          <span>Today's AI Tip</span>
          <p>{tip}</p>
        </div>
      </div>
      <div className="next-best-action">
        <Check size={17} />
        <div>
          <span>Next Best Action</span>
          <strong>{nextAction}</strong>
        </div>
      </div>
      <div className="habit-panel">
        <span>Financial Habit</span>
        <div>
          {habitItems.map((habit, index) => (
            <small key={habit} className={index < completedHabits ? "complete" : ""}>
              {index < completedHabits ? <Check size={11} /> : null}
              {habit}
            </small>
          ))}
        </div>
      </div>
      {futureReminder && ReminderIcon && (
        <div className="future-reminder">
          <ReminderIcon size={18} />
          <div>
            <span>{futureReminder.title}</span>
            <p>{futureReminder.body}</p>
          </div>
        </div>
      )}
    </aside>
  );
}

function MiniMoneyRow({ label, value, max, tone }: { label: string; value: number; max: number; tone: "in" | "out" }) {
  return (
    <div className={`mini-money-row ${tone}`}>
      <span>{label}</span>
      <i><b style={{ width: `${Math.max(3, (value / Math.max(max, 1)) * 100)}%` }} /></i>
      <strong>{formatCurrency(value)}</strong>
    </div>
  );
}

function FinancialPositionCalculator({ position }: { position: ReturnType<typeof calculateFinancialPosition> }) {
  const maxIncoming = Math.max(...position.incoming.map((item) => item[1]), 1);
  const maxOutgoing = Math.max(...position.outgoing.map((item) => item[1]), 1);
  return (
    <section className="financial-position-card" aria-label="Financial Position Calculator">
      <div className="financial-position-head">
        <div>
          <span>Financial Position Calculator</span>
          <strong>What comes in vs. what goes out</strong>
        </div>
        <div>
          <small>Total first-semester cost</small>
          <b>{formatCurrency(position.totalCost)}</b>
        </div>
        <div>
          <small>Total confirmed funding</small>
          <b>{formatCurrency(position.confirmedFunding)}</b>
        </div>
        <div className={position.remainingGap > 0 ? "warn" : "ok"}>
          <small>Remaining funding gap</small>
          <b>{formatCurrency(position.remainingGap)}</b>
        </div>
      </div>
      <div className="financial-position-grid">
        <div>
          <span className="section-kicker">Money coming in</span>
          {position.incoming.map(([label, value]) => <MiniMoneyRow key={label} label={label} value={value} max={maxIncoming} tone="in" />)}
        </div>
        <div>
          <span className="section-kicker">Money going out</span>
          {position.outgoing.map(([label, value]) => <MiniMoneyRow key={label} label={label} value={value} max={maxOutgoing} tone="out" />)}
        </div>
      </div>
    </section>
  );
}

function TimingGapBar({ position, isInternational }: { position: ReturnType<typeof calculateFinancialPosition>; isInternational: boolean }) {
  const max = Math.max(position.moneyNeededBeforeSeptember, position.moneyAvailableBeforeSeptember, 1);
  return (
    <section className="timing-gap-card" aria-label="Timing Gap Bar">
      <div className="timing-gap-copy">
        <span>{isInternational ? "Before arrival timing gap" : "Pre-September timing gap"}</span>
        <strong>{position.timingGap > 0 ? `${formatCurrency(position.timingGap)} temporary timing gap` : "No timing gap flagged"}</strong>
        <p>{isInternational ? "Your total funding may be close, but tuition, deposits, transfer timing, and arrival costs can happen before all money is accessible." : "Your total funding may be close, but tuition, deposits, and move-in costs can happen before OSAP or later support arrives."}</p>
      </div>
      <div className="timing-bars">
        <div>
          <span>Money needed before September</span>
          <i><b className="need" style={{ width: `${(position.moneyNeededBeforeSeptember / max) * 100}%` }} /></i>
          <strong>{formatCurrency(position.moneyNeededBeforeSeptember)}</strong>
        </div>
        <div>
          <span>Money available before September</span>
          <i><b className="available" style={{ width: `${(position.moneyAvailableBeforeSeptember / max) * 100}%` }} /></i>
          <strong>{formatCurrency(position.moneyAvailableBeforeSeptember)}</strong>
        </div>
      </div>
    </section>
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
          <a href={resource.url} className="resource-card" key={resource.title} target="_blank" rel="noreferrer" aria-label={`${resource.title}: official CIBC website`}>
            <Icon size={22} />
            <span>{resource.category}</span>
            <strong>{resource.title}</strong>
            <p>{resource.description}</p>
            <small>Official CIBC website <ChevronRight size={14} /></small>
          </a>
        );
      })}
    </div>
  );
}

function ProductFitGrid({ resources: cards, isInternational }: { resources: ResourceCard[]; isInternational: boolean }) {
  return (
    <section className="product-fit-section" aria-label="Matched CIBC resources">
      <div className="product-fit-head">
        <span>Matched CIBC resources</span>
        <strong>{isInternational ? "Ranked for international arrival needs" : "Ranked for this funding position"}</strong>
        <p>{isInternational ? "Student account and pre-arrival setup come first. Credit cards come later, after banking and cash access are clear." : "Education Line of Credit appears only when a real gap remains after confirmed funding, timing, and delayable costs."}</p>
      </div>
      <div className="resource-grid compact v2-resource-grid product-fit-grid">
        {cards.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a href={resource.url} className="resource-card" key={resource.title} target="_blank" rel="noreferrer" aria-label={`${resource.title}: official CIBC website`}>
              <em>{index + 1}</em>
              <Icon size={22} />
              <span>{resource.category}</span>
              <strong>{resource.title}</strong>
              <p>{resource.description}</p>
              <small>Official CIBC website <ChevronRight size={14} /></small>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default App;
