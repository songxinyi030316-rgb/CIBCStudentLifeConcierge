import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  PiggyBank,
  ReceiptText,
  ScrollText,
  Search,
  Settings,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  Upload,
  UsersRound,
  WalletCards
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import heroImage from "../assets/familyos-hero.png";
import onboardingImage from "../assets/familyos-onboarding.png";
import educationImage from "../assets/familyos-education.png";
import caregivingImage from "../assets/familyos-caregiving.png";
import legacyImage from "../assets/familyos-legacy.png";
import subscriptionImage from "../assets/familyos-subscriptions.png";

type Route =
  | "landing"
  | "auth"
  | "onboarding"
  | "dashboard"
  | "planning"
  | "ai"
  | "overview"
  | "family"
  | "accounts"
  | "goals"
  | "education"
  | "housing"
  | "cashflow"
  | "subscriptions"
  | "caregiving"
  | "protection"
  | "investments"
  | "legacy"
  | "documents"
  | "permissions"
  | "insights"
  | "settings";

type FamilySubRoute = "members" | "accounts" | "permissions" | "documents";

type PlanningSubRoute =
  | "overview"
  | "education"
  | "housing"
  | "cashflow"
  | "subscriptions"
  | "caregiving"
  | "protection"
  | "legacy";

type Opportunity = {
  title: string;
  why: string;
  action: string;
  support: string;
  type: "Learn" | "Plan" | "Review" | "Book advisor";
  confidence: "High" | "Medium";
  consent: string;
  route: Route;
};

type LifeStage = {
  stage: string;
  appliesTo: string;
  trigger: string;
  why: string;
  risks: string[];
  products: string[];
  nextActions: string[];
  advisor: boolean;
  opportunities: Opportunity[];
};

type RoadmapItem = {
  title: string;
  timing: string;
  action: string;
  route: Route;
};

type MemberRoadmap = {
  member: string;
  age: string;
  role: string;
  focus: string;
  image: string;
  route: Route;
  roadmap: RoadmapItem[];
};

type FamilyMember = {
  name: string;
  relationship: string;
  age?: number;
  role: string;
  access: string;
  goal: string;
};

const familyMembers: FamilyMember[] = [
  {
    name: "Alex Chen",
    relationship: "Primary user",
    age: 42,
    role: "Parent",
    access: "Joint Account Access",
    goal: "Mortgage renewal readiness"
  },
  {
    name: "Jamie Chen",
    relationship: "Spouse",
    age: 40,
    role: "Partner",
    access: "Limited Actions",
    goal: "Shared bills and insurance"
  },
  {
    name: "Emma Chen",
    relationship: "Daughter",
    age: 17,
    role: "Student",
    access: "View Only",
    goal: "University transition"
  },
  {
    name: "Ethan Chen",
    relationship: "Son",
    age: 11,
    role: "Dependent",
    access: "No Access",
    goal: "Future RESP planning"
  },
  {
    name: "Grace Chen",
    relationship: "Parent / Elder",
    age: 72,
    role: "Care recipient",
    access: "Caregiver Mode",
    goal: "Care budget stability"
  }
];

const navItems: { route: Route; label: string; icon: LucideIcon }[] = [
  { route: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { route: "ai", label: "Life Stage Engine", icon: Sparkles },
  { route: "planning", label: "Family Status", icon: Gauge },
  { route: "investments", label: "Goal Evaluator", icon: PiggyBank },
  { route: "family", label: "Family Admin", icon: UsersRound },
  { route: "settings", label: "Settings", icon: Settings }
];

const readinessStatuses = [
  ["Housing", "On Track"],
  ["Education", "Needs Review"],
  ["Cash Flow", "On Track"],
  ["Caregiving", "Action Recommended"],
  ["Protection", "Needs Review"],
  ["Retirement", "Needs Review"],
  ["Legacy", "Missing Info"],
  ["Subscriptions", "Action Recommended"]
];

const planningProgress = [
  ["Housing readiness", 86],
  ["Education planning", 64],
  ["Emergency reserve", 72],
  ["Caregiving support", 61],
  ["Protection coverage", 70],
  ["Legacy readiness", 48]
];

const externalAssetRanges = [
  {
    label: "External savings",
    current: "$50K-$100K",
    options: ["Prefer not to say", "Under $25K", "$25K-$50K", "$50K-$100K", "$100K-$250K", "$250K+"]
  },
  {
    label: "External investments",
    current: "Prefer not to say",
    options: ["Prefer not to say", "Under $50K", "$50K-$100K", "$100K-$250K", "$250K-$500K", "$500K+"]
  },
  {
    label: "Property value",
    current: "$750K-$1M",
    options: ["Prefer not to say", "Under $500K", "$500K-$750K", "$750K-$1M", "$1M-$1.5M", "$1.5M+"]
  },
  {
    label: "Insurance coverage estimate",
    current: "Prefer not to say",
    options: ["Prefer not to say", "None / Not sure", "Under $100K", "$100K-$250K", "$250K-$500K", "$500K-$1M", "$1M+"]
  },
  {
    label: "International / overseas assets",
    current: "None",
    options: ["Prefer not to say", "None", "Under $50K", "$50K-$250K", "$250K-$500K", "$500K+"]
  },
  {
    label: "External debts or liabilities",
    current: "$25K-$100K",
    options: ["Prefer not to say", "None", "Under $25K", "$25K-$100K", "$100K-$250K", "$250K-$500K", "$500K+"]
  }
];

const selfReportedContext = [
  ["External savings range", "$50K-$100K"],
  ["External investments range", "Prefer not to say"],
  ["Property value range", "$750K-$1M"],
  ["Insurance coverage range", "Prefer not to say"],
  ["Overseas assets range", "None"],
  ["External debt range", "$25K-$100K"]
];

const subscriptions = [
  {
    merchant: "Netflix Family Plan",
    amount: "$20.99/month",
    method: "Jamie's card",
    owner: "Jamie",
    status: "Active",
    nextBilling: "June 29",
    action: "Review overlap"
  },
  {
    merchant: "Spotify Family",
    amount: "$18.99/month",
    method: "Alex's card",
    owner: "Alex",
    status: "Active",
    nextBilling: "July 3",
    action: "Keep"
  },
  {
    merchant: "Disney+",
    amount: "$14.99/month",
    method: "Alex's card",
    owner: "Alex",
    status: "Active",
    nextBilling: "June 27",
    action: "Compare usage"
  },
  {
    merchant: "Adobe Creative Cloud",
    amount: "$29.99/month",
    method: "Family student card",
    owner: "Emma",
    status: "Low recent usage",
    nextBilling: "July 1",
    action: "Confirm with Emma"
  },
  {
    merchant: "iCloud Storage",
    amount: "$12.99/month",
    method: "Family shared",
    owner: "Family",
    status: "Shared utility",
    nextBilling: "June 25",
    action: "Keep"
  },
  {
    merchant: "GoodLife Fitness",
    amount: "$69.99/month",
    method: "Alex's card",
    owner: "Alex",
    status: "Price changed",
    nextBilling: "June 30",
    action: "Review increase"
  },
  {
    merchant: "Meal Kit Trial",
    amount: "$0 now, $89.99 starts",
    method: "Virtual trial card",
    owner: "Jamie",
    status: "Trial ends in 4 days",
    nextBilling: "June 23",
    action: "Cancel or cap"
  },
  {
    merchant: "Streaming Sports Trial",
    amount: "$0 now, $24.99 starts",
    method: "Alex's card",
    owner: "Alex",
    status: "Trial ends in 2 days",
    nextBilling: "June 21",
    action: "Cancel or cap"
  }
];

const aiInsights = [
  {
    category: "Life Stage",
    title: "Emma is approaching the student banking moment",
    body: "Emma turns 18 before university. FamilyOS can help the family prepare account ownership, student banking, credit education, and RESP withdrawal planning.",
    confidence: "High",
    source: "Family profile age + verified RESP context",
    action: "Open Life Stage Plan"
  },
  {
    category: "Life Stage",
    title: "Ethan is ready for early money habits",
    body: "At age 11, Ethan may benefit from a parent-guided savings goal, allowance rhythm, and age-appropriate financial literacy prompts.",
    confidence: "Medium",
    source: "Family profile age only",
    action: "Create Money Habit Plan"
  },
  {
    category: "Education",
    title: "Emma's university living costs may exceed current savings plan",
    body: "Projected first-year cost is $28,500. Current RESP path may fall short by $7,800.",
    confidence: "High",
    source: "Verified CIBC data",
    action: "Adjust Education Plan"
  },
  {
    category: "Subscriptions",
    title: "Two free trials convert to paid plans this week",
    body: "Meal Kit Trial converts in 4 days and Streaming Sports Trial converts in 2 days.",
    confidence: "High",
    source: "Verified CIBC card transactions and recurring merchant pattern",
    action: "Open Subscription Control"
  },
  {
    category: "Subscriptions",
    title: "Recurring payment review could reduce monthly spend",
    body: "Your family could save approximately $96/month by reviewing unused or duplicate subscriptions.",
    confidence: "Medium",
    source: "Verified CIBC card transactions + subscription usage signals",
    action: "Review Savings"
  },
  {
    category: "Caregiving",
    title: "Grace's care spending increased this quarter",
    body: "Care-related spending is up 18% compared with last quarter, led by pharmacy and home support.",
    confidence: "Medium",
    source: "Permissioned care budget activity",
    action: "Review Care Budget"
  },
  {
    category: "Housing",
    title: "Mortgage renewal window is approaching",
    body: "Renewal is in 14 months. FamilyOS recommends preparing 6 months before renewal.",
    confidence: "High",
    source: "Verified CIBC mortgage data",
    action: "Open Housing Hub"
  },
  {
    category: "Cash Flow",
    title: "Emergency fund is below family target",
    body: "Current emergency fund covers 2.1 months of expenses. Recommended target is 4-6 months.",
    confidence: "Medium",
    source: "Verified CIBC data + self-reported ranges",
    action: "Build Reserve"
  },
  {
    category: "Investments",
    title: "A 2-year non-cashable GIC may align with Emma's education timeline",
    body: "A shorter locked option could support planned education funding without committing funds beyond the expected university start window.",
    confidence: "Medium",
    source: "Verified CIBC data + self-reported ranges",
    action: "Compare Education GIC Options"
  },
  {
    category: "Investments",
    title: "Emergency reserve funds may need a flexible option",
    body: "Funds intended for emergencies or caregiving should avoid long lock-in periods unless enough liquid cash remains available.",
    confidence: "Medium",
    source: "Verified CIBC data + self-reported ranges",
    action: "Compare Liquidity Options"
  },
  {
    category: "Investments",
    title: "TFSA contribution room may support tax-efficient growth",
    body: "TFSA contribution room may allow more efficient growth if limits and eligibility are confirmed.",
    confidence: "Medium",
    source: "Verified CIBC data only + missing external context",
    action: "Review TFSA Scenario"
  },
  {
    category: "Planning",
    title: "Approximate external ranges could improve planning context",
    body: "Adding approximate external investment and insurance ranges could improve education, retirement, and legacy planning recommendations.",
    confidence: "Medium / Missing external context",
    source: "Verified CIBC data only",
    action: "Update Data Sources"
  },
  {
    category: "Subscriptions",
    title: "Merchant-specific caps can reduce trial surprises",
    body: "A virtual trial card with a $1 cap or 14-day expiry may help prevent trial subscriptions from converting unexpectedly.",
    confidence: "High",
    source: "Verified CIBC card controls + merchant recurring payment detection",
    action: "Create Trial Card"
  },
  {
    category: "Protection",
    title: "Life insurance may be below household need",
    body: "Coverage may not fully reflect mortgage balance, dependents, and Grace's care reserve needs.",
    confidence: "Medium",
    source: "Verified CIBC data + self-reported ranges",
    action: "Book Advisor Review"
  },
  {
    category: "Wealth & Legacy",
    title: "Estate documents need a refresh",
    body: "Beneficiaries have not been reviewed in 2 years and Grace's POA document is missing.",
    confidence: "Medium",
    source: "Document vault status + optional context to add later",
    action: "Update Vault"
  }
];

const tasks = [
  "RESP contribution review",
  "Review 2 free trials before they convert",
  "Upload will / estate documents",
  "Review insurance coverage",
  "Confirm Grace's unusual transaction",
  "Prepare Emma's university rent budget"
];

const featureCards: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Life Stage Engine",
    text: "Detect upcoming family milestones and route them to the right FamilyOS module or CIBC support.",
    icon: Sparkles
  },
  {
    title: "Family Opportunity Dashboard",
    text: "A household-level view of what your family may need to do next and which CIBC pathway may help.",
    icon: LayoutDashboard
  },
  {
    title: "Education-to-Independence Planner",
    text: "Plan RESP, rent, student banking, and first-year cash flow in one path.",
    icon: GraduationCap
  },
  {
    title: "Subscription Control",
    text: "Detect free trials, duplicate subscriptions, recurring payments, and merchant-specific card controls.",
    icon: ReceiptText
  },
  {
    title: "Caregiving Mode",
    text: "Support aging parents with permissioned visibility and approved actions.",
    icon: HeartPulse
  },
  {
    title: "Family Wealth & Legacy Map",
    text: "Organize beneficiaries, documents, contacts, and wealth transfer readiness.",
    icon: ScrollText
  },
  {
    title: "AI Family Assistant",
    text: "Transparent, consent-aware prompts that connect family opportunities to existing CIBC pathways.",
    icon: Sparkles
  }
];

const lifeStageMoments = [
  {
    member: "Ethan Chen",
    age: "11",
    stage: "Early money habits",
    timing: "Now",
    trigger: "Pre-teen learning window",
    recommendation: "Start a parent-guided savings goal, allowance rhythm, and simple spending reflection.",
    pathway: "Youth savings habits + family goal coaching",
    cta: "Create habit plan",
    route: "education" as Route,
    status: "On Track",
    icon: PiggyBank
  },
  {
    member: "Emma Chen",
    age: "17",
    stage: "University transition",
    timing: "Next 10 months",
    trigger: "Turns 18 before first-year tuition",
    recommendation: "Prepare student banking, account ownership, credit education, RESP withdrawals, and rent support.",
    pathway: "Smart Start / student banking + RESP planning",
    cta: "Open Emma plan",
    route: "education" as Route,
    status: "Action Recommended",
    icon: GraduationCap
  },
  {
    member: "Alex & Jamie",
    age: "40s",
    stage: "Parent peak-responsibility years",
    timing: "This year",
    trigger: "Mortgage, education, subscriptions, and caregiving overlap",
    recommendation: "Coordinate cash flow, GIC liquidity, protection coverage, and advisor review around family goals.",
    pathway: "Goal Evaluator + CIBC advisor routing",
    cta: "Evaluate goals",
    route: "investments" as Route,
    status: "Needs Review",
    icon: Gauge
  },
  {
    member: "Grace Chen",
    age: "72",
    stage: "Caregiving and legacy support",
    timing: "This quarter",
    trigger: "Rising care spending and permissioned support",
    recommendation: "Review care budget, trusted access, unusual activity alerts, POA documents, and emergency contacts.",
    pathway: "Caregiving mode + documents vault",
    cta: "Review care plan",
    route: "caregiving" as Route,
    status: "Action Recommended",
    icon: HeartPulse
  }
];

const youthLifecyclePath = [
  ["Age 0-5", "Start education savings", "RESP education, contribution rhythm, family goal setup"],
  ["Age 6", "Primary school moment", "School cost planning, allowance basics, parent coaching prompts"],
  ["Age 12", "Money habit builder", "Savings goals, supervised spending, digital money confidence"],
  ["Age 16", "First job readiness", "Payroll deposit, budgeting, tax basics, spending alerts"],
  ["Age 18", "Student banking transition", "Own account, consent reset, credit education, RESP withdrawals"],
  ["Age 21-25", "Independent financial life", "Credit building, emergency reserve, TFSA education, first investing"]
] as const;

const engineSignals = [
  ["Ages", "Emma 17, Ethan 11, Grace 72"],
  ["Relationships", "Parents, child, elder parent"],
  ["Goals", "Education, housing, caregiving, legacy"],
  ["Accounts", "RESP, mortgage, cards, TFSA, RRSP"],
  ["Permissions", "Caregiver mode and view-only sharing"],
  ["Events", "University, free trials, renewal, care alerts"]
] as const;

const engineMilestones = [
  {
    category: "University transition",
    member: "Emma Chen",
    when: "Next 10 months",
    trigger: "Emma turns 18 before university starts.",
    nextAction: "Review RESP withdrawal planning, rent budgeting, student banking, and account ownership.",
    module: "Education Planner",
    route: "education" as Route,
    cibcPathway: "Student banking + RESP planning",
    confidence: "High",
    icon: GraduationCap,
    image: educationImage,
    imageAlt: "Student and parent planning university banking and RESP timing"
  },
  {
    category: "Teen money habits",
    member: "Ethan Chen",
    when: "Now",
    trigger: "Ethan is at an age where families often introduce allowance tracking and savings goals.",
    nextAction: "Create a parent-guided money habit plan that can later lead into youth banking.",
    module: "Education Planner",
    route: "education" as Route,
    cibcPathway: "Youth savings habits",
    confidence: "Medium",
    icon: PiggyBank,
    image: educationImage,
    imageAlt: "Family education planning illustration"
  },
  {
    category: "Caregiving",
    member: "Grace Chen",
    when: "This quarter",
    trigger: "Grace has rising care spending and permissioned caregiver support.",
    nextAction: "Review care permissions, unusual activity alerts, approved bill payment, and POA readiness.",
    module: "Caregiving Mode",
    route: "caregiving" as Route,
    cibcPathway: "Trusted access + fraud alerts",
    confidence: "Medium",
    icon: HeartPulse,
    image: caregivingImage,
    imageAlt: "Caregiving support planning illustration"
  },
  {
    category: "Homeownership",
    member: "Alex & Jamie",
    when: "14 months",
    trigger: "Mortgage renewal is approaching while education and caregiving costs are active.",
    nextAction: "Review the housing plan, renewal readiness, HELOC use, and advisor conversation timing.",
    module: "Housing Hub",
    route: "housing" as Route,
    cibcPathway: "Mortgage renewal planning",
    confidence: "High",
    icon: Home,
    image: onboardingImage,
    imageAlt: "Family reviewing home and milestone planning"
  }
] as const;

const actionAreas = [
  ["Education Planner", "Triggered by university, school, first job, and account ownership milestones.", "Emma age-18 transition", "education"],
  ["Housing Hub", "Triggered by homeownership and mortgage renewal milestones.", "Mortgage renewal", "housing"],
  ["Caregiving Mode", "Triggered by elder support, unusual activity, and trusted-access needs.", "Grace care support", "caregiving"],
  ["Goal Evaluator", "Triggered when milestone timing needs savings, GIC, liquidity, or advisor comparison.", "RESP and reserves", "investments"],
  ["Subscription Control", "Triggered by recurring payments, free trials, and shared family cards.", "Trials ending", "subscriptions"],
  ["Protection", "Triggered by dependents, mortgage balance, caregiving, and beneficiary review.", "Coverage review", "protection"],
  ["Documents", "Triggered by university leases, POA, wills, insurance, and property documents.", "POA readiness", "documents"],
  ["Permissions", "Triggered by age 18, caregiving access, shared accounts, and emergency access.", "Consent review", "permissions"]
] as const;

const lifeStageKnowledgeBase: LifeStage[] = [
  {
    stage: "Age 0-2: Newborn & Early Family Setup",
    appliesTo: "New parents and newborn children",
    trigger: "A new child joins the household and family cash flow changes.",
    why: "Early setup creates more time for education savings, protection planning, and family document readiness.",
    risks: ["Education savings delayed", "Beneficiaries not updated", "Emergency fund no longer sized for dependents"],
    products: ["RESP", "Family protection review", "CIBC advisor meeting", "Document vault"],
    nextActions: ["Open education goal", "Review protection", "Add beneficiary reminder"],
    advisor: true,
    opportunities: [
      {
        title: "Start or Review RESP Contributions",
        why: "Starting early gives the family more time to save for education and use available government grants.",
        action: "Review education savings target and contribution rhythm.",
        support: "RESP, education savings advice, advisor meeting",
        type: "Plan",
        confidence: "High",
        consent: "No child account access required.",
        route: "education"
      },
      {
        title: "Family Protection Review",
        why: "A new dependent can change insurance and emergency cash needs.",
        action: "Review life, disability, and critical illness coverage with a CIBC advisor.",
        support: "Protection review, advisor conversation",
        type: "Book advisor",
        confidence: "Medium",
        consent: "Uses household goal context, not private medical details.",
        route: "protection"
      },
      {
        title: "Beneficiary Update Reminder",
        why: "Beneficiary and estate documents often lag behind family changes.",
        action: "Add a beneficiary review task and upload relevant documents.",
        support: "Documents Vault, Wealth & Legacy checklist",
        type: "Review",
        confidence: "Medium",
        consent: "Document sharing remains controlled by the owner.",
        route: "documents"
      },
      {
        title: "Child Benefit Cash Flow Plan",
        why: "New benefits and new expenses can change the monthly budget.",
        action: "Create a family cash flow category for child benefits, childcare, and savings.",
        support: "Cash flow planning, savings account",
        type: "Plan",
        confidence: "Medium",
        consent: "Uses household-level planning categories only.",
        route: "cashflow"
      }
    ]
  },
  {
    stage: "Age 3-5: Early Childhood",
    appliesTo: "Preschool children and parents managing childcare",
    trigger: "Childcare, school preparation, and family budget needs become more predictable.",
    why: "Families can adjust education savings and monthly cash flow before school costs arrive.",
    risks: ["Childcare costs crowd out savings", "Education target becomes stale", "Protection needs not revisited"],
    products: ["RESP", "Budgeting support", "Insurance review", "Advisor check-in"],
    nextActions: ["Update education target", "Review childcare budget", "Check coverage"],
    advisor: false,
    opportunities: [
      {
        title: "RESP Progress Check",
        why: "A small annual check helps families stay aligned with the education goal.",
        action: "Compare current RESP rhythm with the family education target.",
        support: "RESP, education goal tracking",
        type: "Review",
        confidence: "High",
        consent: "Uses verified RESP balance where available.",
        route: "education"
      },
      {
        title: "Childcare Cost Planning",
        why: "Childcare costs can be one of the largest temporary household expenses.",
        action: "Build a childcare category into the family cash flow view.",
        support: "Cash flow planner, savings buffer",
        type: "Plan",
        confidence: "Medium",
        consent: "Uses categories, not itemized private transactions.",
        route: "cashflow"
      },
      {
        title: "Early Money Habit Introduction",
        why: "Simple save, share, and spend conversations can start before a child has an account.",
        action: "Create a parent-guided habit prompt for small family goals.",
        support: "Family goal coaching, savings goal",
        type: "Learn",
        confidence: "Medium",
        consent: "No child account is opened automatically.",
        route: "education"
      },
      {
        title: "Insurance Coverage Review",
        why: "Coverage may need to reflect childcare, mortgage, and family dependency needs.",
        action: "Review coverage assumptions and beneficiary information.",
        support: "Insurance & Protection, advisor review",
        type: "Review",
        confidence: "Medium",
        consent: "Recommendation is informational only.",
        route: "protection"
      }
    ]
  },
  {
    stage: "Age 6-11: Primary School",
    appliesTo: "Ethan Chen and school-age children",
    trigger: "Children begin handling small choices, school expenses, and goal-setting conversations.",
    why: "This is a gentle window to build savings habits before teen spending begins.",
    risks: ["Money habits start late", "RESP is not reviewed", "Parents miss teaching moments"],
    products: ["Savings goals", "RESP tracking", "Family financial literacy prompts"],
    nextActions: ["Start savings goal", "Set allowance rhythm", "Review RESP progress"],
    advisor: false,
    opportunities: [
      {
        title: "Basic Savings Goal",
        why: "A simple goal teaches progress, patience, and trade-offs.",
        action: "Create a parent-guided savings goal for Ethan.",
        support: "Savings goal, family coaching prompt",
        type: "Plan",
        confidence: "High",
        consent: "Parent-guided only; no independent account access required.",
        route: "education"
      },
      {
        title: "Allowance Rhythm",
        why: "A consistent rhythm makes spending and saving easier to discuss.",
        action: "Set a weekly or monthly allowance prompt and savings split.",
        support: "Family cash flow, savings habit",
        type: "Plan",
        confidence: "Medium",
        consent: "No transaction visibility is shared with the child.",
        route: "cashflow"
      },
      {
        title: "RESP Progress Tracking",
        why: "Primary school is a good checkpoint before high school costs and university planning accelerate.",
        action: "Review RESP balance, contribution rhythm, and education assumptions.",
        support: "RESP, Education Planner",
        type: "Review",
        confidence: "High",
        consent: "Uses verified CIBC RESP data if permissioned.",
        route: "education"
      },
      {
        title: "Parent-Guided Spending Reflection",
        why: "Families can discuss spending choices before a teen card is needed.",
        action: "Create a monthly reflection prompt for spend, save, and give choices.",
        support: "Family financial literacy, goal coaching",
        type: "Learn",
        confidence: "Medium",
        consent: "Educational prompt only.",
        route: "education"
      }
    ]
  },
  {
    stage: "Age 12-15: Pre-Teen Money Skills",
    appliesTo: "Pre-teens preparing for more independent spending",
    trigger: "The child may start making more digital purchases and asking for more financial independence.",
    why: "Families can introduce supervised habits before first job income or credit conversations.",
    risks: ["Unsupervised digital spending", "Subscription awareness is weak", "Savings goals are unclear"],
    products: ["Spending alerts", "Savings goals", "Subscription Control", "Digital banking education"],
    nextActions: ["Create spending guardrails", "Introduce digital banking basics", "Review subscriptions"],
    advisor: false,
    opportunities: [
      {
        title: "Supervised Debit Habits",
        why: "Pre-teens can learn payment basics with parent-guided guardrails.",
        action: "Discuss supervised spending rules and alert preferences.",
        support: "Spending alerts, youth banking education",
        type: "Learn",
        confidence: "Medium",
        consent: "Parent supervision depends on account ownership and permission.",
        route: "permissions"
      },
      {
        title: "Savings Goal Tracking",
        why: "Visible progress helps make saving feel concrete.",
        action: "Link a savings goal to a school, hobby, or family milestone.",
        support: "Savings goal, FamilyOS goal tracking",
        type: "Plan",
        confidence: "High",
        consent: "Goal visibility is family-controlled.",
        route: "education"
      },
      {
        title: "Family Subscription Awareness",
        why: "Teen digital services often create recurring charges parents miss.",
        action: "Review family subscriptions and set trial alerts.",
        support: "Subscription Control, card alerts",
        type: "Review",
        confidence: "Medium",
        consent: "Visibility depends on card ownership and sharing permissions.",
        route: "subscriptions"
      },
      {
        title: "Responsible Spending Discussion",
        why: "A short family conversation can prevent avoidable overdraft, impulse spending, or hidden subscriptions.",
        action: "Use a guided conversation checklist before more independent spending.",
        support: "Financial literacy prompts",
        type: "Learn",
        confidence: "Medium",
        consent: "Educational only; no account change is made.",
        route: "education"
      }
    ]
  },
  {
    stage: "Age 16-17: First Job / Teen Income",
    appliesTo: "Teens with part-time work or summer income",
    trigger: "First income creates a natural moment to introduce banking routines.",
    why: "Direct deposit, tax basics, and automated savings can make CIBC useful before adulthood.",
    risks: ["Income is spent without a plan", "Tax basics are missed", "Savings automation starts late"],
    products: ["Student account review", "Direct deposit", "Savings automation", "Spending alerts"],
    nextActions: ["Set income split", "Review student account", "Add tax basics reminder"],
    advisor: false,
    opportunities: [
      {
        title: "Direct Deposit Setup",
        why: "First paycheques are a natural reason to introduce daily banking.",
        action: "Prepare direct deposit details and income categories.",
        support: "Student banking, direct deposit setup",
        type: "Plan",
        confidence: "High",
        consent: "Teen account setup requires appropriate ownership and consent.",
        route: "education"
      },
      {
        title: "First Income Budgeting",
        why: "A simple split between spend, save, and future goals creates healthy routines.",
        action: "Create a first-income allocation plan.",
        support: "Budgeting tools, savings automation",
        type: "Plan",
        confidence: "High",
        consent: "Educational recommendation only.",
        route: "cashflow"
      },
      {
        title: "Tax Basics Education",
        why: "Teens with income may need help understanding slips, filing, and refunds.",
        action: "Add a tax-season preparation reminder.",
        support: "Financial literacy prompt, documents vault",
        type: "Learn",
        confidence: "Medium",
        consent: "Does not provide tax advice.",
        route: "documents"
      },
      {
        title: "Spending Alerts",
        why: "Alerts can help teens and parents catch overspending early.",
        action: "Review alert preferences and privacy settings.",
        support: "Card alerts, permissions",
        type: "Review",
        confidence: "Medium",
        consent: "Alerts depend on account owner consent.",
        route: "permissions"
      }
    ]
  },
  {
    stage: "Age 17-18: University Transition",
    appliesTo: "Emma Chen",
    trigger: "Emma is 17 and university is expected within the next 12 months.",
    why: "Tuition, rent, RESP withdrawals, banking, credit education, and parent support converge at once.",
    risks: ["RESP withdrawal timing missed", "Rent budget incomplete", "Student banking starts too late"],
    products: ["RESP", "Student banking", "Budgeting tools", "Advisor meeting"],
    nextActions: ["Review RESP withdrawal plan", "Estimate tuition and rent", "Discuss credit-building"],
    advisor: true,
    opportunities: [
      {
        title: "RESP Withdrawal Planning",
        why: "RESP withdrawals should be planned before first-year tuition and living costs arrive.",
        action: "Review withdrawal timing, education cost assumptions, and documentation.",
        support: "RESP, education savings advice, advisor meeting",
        type: "Review",
        confidence: "High",
        consent: "Uses verified RESP context and education goal data.",
        route: "education"
      },
      {
        title: "Rent and Living Cost Budget",
        why: "Rent, food, books, and transit can create a gap even when tuition is planned.",
        action: "Build Emma's first-year living expense budget.",
        support: "Education Planner, parent support transfer planning",
        type: "Plan",
        confidence: "High",
        consent: "Student sharing preferences should be reviewed.",
        route: "education"
      },
      {
        title: "Student Banking Setup",
        why: "The transition to university is a strong moment to introduce Emma to CIBC directly.",
        action: "Review student account options and direct deposit readiness.",
        support: "Student banking, CIBC advisor prompt",
        type: "Learn",
        confidence: "High",
        consent: "Account setup requires Emma's consent when applicable.",
        route: "education"
      },
      {
        title: "Credit Education",
        why: "Understanding credit before using it can prevent costly mistakes.",
        action: "Open the credit-building checklist and discuss responsible use.",
        support: "Credit education, student credit card education",
        type: "Learn",
        confidence: "Medium",
        consent: "Educational only; no credit product is opened.",
        route: "education"
      },
      {
        title: "Scholarship / OSAP Placeholder",
        why: "External funding can reduce parent support needs and RESP pressure.",
        action: "Add funding placeholders and required dates.",
        support: "Documents Vault, Education Planner",
        type: "Plan",
        confidence: "Medium",
        consent: "Self-reported education funding context only.",
        route: "documents"
      }
    ]
  },
  {
    stage: "Age 18: Account Ownership Transition",
    appliesTo: "Young adults turning 18 and their parents",
    trigger: "Legal adulthood changes account ownership, visibility, consent, and credit education needs.",
    why: "Families can reset privacy and support rules without losing helpful guidance.",
    risks: ["Parent visibility continues without review", "Credit begins without education", "Student misses eligible tools"],
    products: ["Student banking", "Credit education", "FHSA education", "Permissions"],
    nextActions: ["Review consent", "Update ownership expectations", "Discuss credit and privacy"],
    advisor: false,
    opportunities: [
      {
        title: "Review Parent Visibility and Permissions",
        why: "Turning 18 is a natural point to confirm what parents can still see or do.",
        action: "Review view-only, alerts, transfer, and document permissions.",
        support: "Permissions, consent management",
        type: "Review",
        confidence: "High",
        consent: "Account owner controls access.",
        route: "permissions"
      },
      {
        title: "Independent Account Ownership",
        why: "The young adult may need clearer ownership and self-management routines.",
        action: "Confirm which accounts are owned, shared, or parent-managed.",
        support: "Student banking, account ownership review",
        type: "Review",
        confidence: "High",
        consent: "Ownership is not changed automatically.",
        route: "accounts"
      },
      {
        title: "Student Credit Card Education",
        why: "Credit decisions can affect future borrowing and housing.",
        action: "Review credit concepts, payment reminders, and spending limits.",
        support: "Credit education, alerts",
        type: "Learn",
        confidence: "Medium",
        consent: "Educational only; no credit decision is made.",
        route: "education"
      },
      {
        title: "FHSA Education if Eligible",
        why: "Some young adults may benefit from learning about first-home savings early.",
        action: "Add an FHSA education prompt for future eligibility review.",
        support: "FHSA education, advisor prompt",
        type: "Learn",
        confidence: "Medium",
        consent: "Eligibility must be confirmed before action.",
        route: "investments"
      }
    ]
  },
  {
    stage: "Age 19-25: Early Independence",
    appliesTo: "Students, graduates, renters, and early-career adults",
    trigger: "Rent, income, credit, subscriptions, tax filing, and first investments begin to matter.",
    why: "CIBC can become the daily financial partner as the young adult becomes independent.",
    risks: ["Credit score damage", "No emergency fund", "Subscription creep", "Investing starts without basics"],
    products: ["TFSA education", "FHSA education", "CreditSmart-style education", "Subscription Control"],
    nextActions: ["Build emergency target", "Review credit habits", "Control subscriptions"],
    advisor: false,
    opportunities: [
      {
        title: "Emergency Fund Target",
        why: "Renters and early-career adults need a buffer before bigger goals.",
        action: "Set a starter emergency fund target.",
        support: "Savings account, cash flow planner",
        type: "Plan",
        confidence: "High",
        consent: "Uses self-managed budget context.",
        route: "cashflow"
      },
      {
        title: "Credit Score Building",
        why: "Good credit can affect rentals, phone plans, and future borrowing.",
        action: "Review payment reminders, utilization basics, and alert setup.",
        support: "Credit education, card alerts",
        type: "Learn",
        confidence: "High",
        consent: "No credit product is recommended without review.",
        route: "education"
      },
      {
        title: "TFSA and First Investment Guidance",
        why: "Young adults often need education before choosing investment products.",
        action: "Compare saving, GIC, and TFSA education pathways.",
        support: "TFSA education, GIC Planner, advisor review",
        type: "Learn",
        confidence: "Medium",
        consent: "Suitability requires advisor review.",
        route: "investments"
      },
      {
        title: "Subscription Control",
        why: "Streaming, apps, gyms, and trials can quietly reduce monthly flexibility.",
        action: "Review recurring charges and set trial controls.",
        support: "Subscription Control, card controls",
        type: "Review",
        confidence: "High",
        consent: "Requires card transaction visibility.",
        route: "subscriptions"
      },
      {
        title: "Tax Season Preparation",
        why: "Students and early-career adults often need help organizing slips and tuition forms.",
        action: "Create a tax document checklist.",
        support: "Documents Vault, financial literacy prompt",
        type: "Plan",
        confidence: "Medium",
        consent: "Does not provide tax advice.",
        route: "documents"
      }
    ]
  },
  {
    stage: "Adult Family Building",
    appliesTo: "Partners coordinating shared household decisions",
    trigger: "A couple begins sharing expenses, goals, dependents, or long-term plans.",
    why: "FamilyOS can route conversations into shared goals without forcing joint account control.",
    risks: ["Unclear bill ownership", "Protection gaps", "Emergency fund underbuilt"],
    products: ["Shared cash flow", "Joint goal planning", "Protection review", "Advisor prompt"],
    nextActions: ["Create shared goals", "Assign bill responsibilities", "Review beneficiaries"],
    advisor: true,
    opportunities: [
      {
        title: "Shared Household Cash Flow",
        why: "Shared bills are easier to manage when responsibilities are clear.",
        action: "Assign bill ownership and safe-to-spend targets.",
        support: "Cash Flow Manager, bill assignments",
        type: "Plan",
        confidence: "High",
        consent: "Only shared accounts and permissioned data are shown.",
        route: "cashflow"
      },
      {
        title: "Partner Financial Conversation",
        why: "Goals, debt, savings, and risk comfort should be discussed early.",
        action: "Open a guided partner conversation prompt.",
        support: "Family goal planning, advisor prompt",
        type: "Learn",
        confidence: "Medium",
        consent: "Private account details are not exposed automatically.",
        route: "planning"
      },
      {
        title: "Beneficiary Review",
        why: "Partnership, children, and property ownership can change beneficiary needs.",
        action: "Review beneficiaries and document locations.",
        support: "Wealth & Legacy, Documents Vault",
        type: "Review",
        confidence: "Medium",
        consent: "Document visibility is permission-based.",
        route: "documents"
      },
      {
        title: "Family Emergency Fund",
        why: "Shared responsibilities can increase the amount of cash the household should keep flexible.",
        action: "Estimate a household emergency reserve target.",
        support: "Savings, GIC liquidity comparison, cash flow planner",
        type: "Plan",
        confidence: "High",
        consent: "Uses household-level ranges and goals.",
        route: "investments"
      }
    ]
  },
  {
    stage: "Homeownership",
    appliesTo: "Homeowners, first-time buyers, and renewing mortgage clients",
    trigger: "Mortgage, property tax, insurance, HELOC, and home maintenance decisions converge.",
    why: "Housing moments are high-value opportunities for timely CIBC support and advisor routing.",
    risks: ["Renewal left too late", "HELOC use grows unchecked", "Insurance and property costs are underestimated"],
    products: ["Mortgage readiness", "HELOC review", "Home insurance", "Rate scenario planning"],
    nextActions: ["Review renewal clock", "Stress-test cash flow", "Check renovation reserve"],
    advisor: true,
    opportunities: [
      {
        title: "Mortgage Renewal Preparation",
        why: "Starting early gives the family time to compare scenarios and organize documents.",
        action: "Open the mortgage renewal checklist and advisor prompt.",
        support: "Housing Hub, CIBC mortgage advisor",
        type: "Book advisor",
        confidence: "High",
        consent: "Uses verified mortgage context where available.",
        route: "housing"
      },
      {
        title: "Down Payment or Home Upgrade Planning",
        why: "Families may need to balance education, emergency reserve, and housing goals.",
        action: "Compare savings and GIC liquidity scenarios.",
        support: "Goal Evaluator, GIC Planner, advisor review",
        type: "Plan",
        confidence: "Medium",
        consent: "Self-reported property ranges are optional.",
        route: "investments"
      },
      {
        title: "HELOC Caution",
        why: "HELOC utilization can quietly reduce future flexibility.",
        action: "Review repayment rhythm and alert thresholds.",
        support: "Housing Hub, cash flow review",
        type: "Review",
        confidence: "Medium",
        consent: "Only permissioned credit data is used.",
        route: "housing"
      },
      {
        title: "Home Insurance / Protection Review",
        why: "Mortgage balance, dependents, and property value can change protection needs.",
        action: "Review home and family protection coverage.",
        support: "Insurance & Protection, advisor conversation",
        type: "Review",
        confidence: "Medium",
        consent: "Informational prompt only.",
        route: "protection"
      }
    ]
  },
  {
    stage: "Caregiving",
    appliesTo: "Adult children, caregivers, and elder parents",
    trigger: "Care spending, trusted access, fraud monitoring, and POA readiness become active.",
    why: "FamilyOS can help support aging parents without implying unlimited control over their accounts.",
    risks: ["Fraud goes unnoticed", "Care budget unclear", "Permissions are too broad or too weak"],
    products: ["Caregiving Mode", "Trusted contact", "Fraud alerts", "Documents Vault"],
    nextActions: ["Review care permissions", "Set spending alerts", "Check POA readiness"],
    advisor: true,
    opportunities: [
      {
        title: "Parent Support Budget",
        why: "Care spending can become recurring and unpredictable.",
        action: "Set a care budget and review month-to-date spending.",
        support: "Caregiving Mode, cash flow planner",
        type: "Plan",
        confidence: "High",
        consent: "Care visibility depends on Grace's permission.",
        route: "caregiving"
      },
      {
        title: "Caregiving Permissions",
        why: "Family support works best when view, pay, and transfer permissions are explicit.",
        action: "Review Alex, Jamie, and Grace's care access settings.",
        support: "Permissions, caregiver mode",
        type: "Review",
        confidence: "High",
        consent: "Grace can grant or revoke access.",
        route: "permissions"
      },
      {
        title: "Fraud Monitoring",
        why: "Unusual transactions may need family attention if the account owner consents.",
        action: "Review unusual activity and trusted contact settings.",
        support: "Fraud alerts, unusual transaction review",
        type: "Review",
        confidence: "Medium",
        consent: "Alerts are permission-based and revocable.",
        route: "caregiving"
      },
      {
        title: "POA Document Readiness",
        why: "Families often need documents before a crisis, not during one.",
        action: "Upload or confirm POA and care documents.",
        support: "Documents Vault, Wealth & Legacy",
        type: "Review",
        confidence: "Medium",
        consent: "Documents are not shared unless permissioned.",
        route: "documents"
      },
      {
        title: "Long-Term Care Expense Planning",
        why: "Care reserves can run below target if monthly support increases.",
        action: "Estimate care reserve needs and advisor review timing.",
        support: "Caregiving Mode, advisor prompt",
        type: "Book advisor",
        confidence: "Medium",
        consent: "Uses care budget trends, not medical details.",
        route: "caregiving"
      }
    ]
  },
  {
    stage: "Retirement Transition",
    appliesTo: "Pre-retirees and retirees shifting from saving to income",
    trigger: "Income sources, registered plans, benefits, bills, and protection needs change.",
    why: "Retirement transition is a natural moment for advisor-supported planning and simpler account routines.",
    risks: ["Income timing unclear", "Fraud risk increases", "Documents are stale"],
    products: ["RRSP/RRIF education", "CPP/OAS education", "Bill management", "Advisor review"],
    nextActions: ["Map income sources", "Review fraud alerts", "Update beneficiaries"],
    advisor: true,
    opportunities: [
      {
        title: "Retirement Income Planning",
        why: "Families need to understand when income will arrive and how bills will be paid.",
        action: "Create a retirement income map.",
        support: "RRSP/RRIF education, advisor meeting",
        type: "Book advisor",
        confidence: "High",
        consent: "Suitability and tax treatment require advisor review.",
        route: "investments"
      },
      {
        title: "Simplified Bill Management",
        why: "A simpler bill flow can reduce missed payments and caregiver stress.",
        action: "Review autopay, alerts, and approved bill support.",
        support: "Bill payments, alerts, caregiver permissions",
        type: "Review",
        confidence: "Medium",
        consent: "Payment authority requires explicit permission.",
        route: "permissions"
      },
      {
        title: "Fraud Alerts",
        why: "Fraud and scams can become a bigger concern in retirement.",
        action: "Set unusual activity alerts and trusted contact preferences.",
        support: "Fraud alerts, trusted contact",
        type: "Review",
        confidence: "Medium",
        consent: "Alerts depend on account owner consent.",
        route: "caregiving"
      },
      {
        title: "Estate Document Review",
        why: "Documents should reflect current beneficiaries, contacts, and intentions.",
        action: "Review will, POA, insurance, and contact list status.",
        support: "Documents Vault, Wealth & Legacy",
        type: "Review",
        confidence: "Medium",
        consent: "Document sharing is role-based.",
        route: "documents"
      }
    ]
  },
  {
    stage: "Legacy & Wealth Transfer",
    appliesTo: "Families organizing documents, beneficiaries, and transfer intentions",
    trigger: "Wealth, property, insurance, care, and family roles need coordination.",
    why: "FamilyOS can make next steps visible without giving legal, tax, or investment advice.",
    risks: ["Will or POA missing", "Beneficiaries stale", "Family does not know where documents are"],
    products: ["Documents Vault", "Beneficiary checklist", "Advisor booking", "Permissions"],
    nextActions: ["Review document checklist", "Confirm beneficiaries", "Book advisor if needed"],
    advisor: true,
    opportunities: [
      {
        title: "Will Status",
        why: "A missing or stale will can create uncertainty for the family.",
        action: "Mark will status and add a document reminder.",
        support: "Documents Vault, Wealth & Legacy",
        type: "Review",
        confidence: "Medium",
        consent: "Document contents are not exposed automatically.",
        route: "documents"
      },
      {
        title: "POA Status",
        why: "POA readiness matters before caregiving needs become urgent.",
        action: "Confirm POA status for Grace and trusted contacts.",
        support: "Documents Vault, Caregiving Mode",
        type: "Review",
        confidence: "Medium",
        consent: "Access remains revocable and role-based.",
        route: "permissions"
      },
      {
        title: "Insurance Beneficiary Review",
        why: "Beneficiaries may not reflect current family intentions.",
        action: "Add a beneficiary review task and advisor prompt.",
        support: "Insurance & Protection, advisor review",
        type: "Book advisor",
        confidence: "Medium",
        consent: "Informational only; no beneficiary is changed in FamilyOS.",
        route: "protection"
      },
      {
        title: "Family Conversation Prompt",
        why: "Families often need a structured way to discuss roles, documents, and contacts.",
        action: "Generate a family discussion checklist.",
        support: "Wealth & Legacy, Documents Vault",
        type: "Learn",
        confidence: "Medium",
        consent: "Shared only with permissioned family members.",
        route: "documents"
      },
      {
        title: "Document Sharing Permissions",
        why: "The right people need access to the right documents, without broad account control.",
        action: "Review who can view, manage, or receive document alerts.",
        support: "Permissions, Documents Vault",
        type: "Review",
        confidence: "High",
        consent: "Access is consent-based and revocable.",
        route: "permissions"
      }
    ]
  }
];

const memberRoadmaps: MemberRoadmap[] = [
  {
    member: "Alex Chen",
    age: "42",
    role: "Primary user / parent",
    focus: "Housing, caregiving, retirement, and protection overlap.",
    image: onboardingImage,
    route: "housing",
    roadmap: [
      { title: "Mortgage renewal", timing: "14 months", action: "Prepare renewal scenarios", route: "housing" },
      { title: "Family cash flow", timing: "This month", action: "Review parent support and safe balance", route: "cashflow" },
      { title: "Parent caregiving", timing: "This quarter", action: "Confirm Grace's care permissions", route: "caregiving" },
      { title: "Retirement contribution review", timing: "This year", action: "Compare TFSA/RRSP/GIC pathways", route: "investments" },
      { title: "Protection planning", timing: "Annual", action: "Review coverage against mortgage and dependents", route: "protection" }
    ]
  },
  {
    member: "Jamie Chen",
    age: "40",
    role: "Spouse / partner",
    focus: "Shared bills, protection, RESP planning, and retirement goals.",
    image: heroImage,
    route: "cashflow",
    roadmap: [
      { title: "Household cash flow", timing: "This month", action: "Review shared bills and assignments", route: "cashflow" },
      { title: "Insurance/protection review", timing: "Annual", action: "Check coverage and beneficiaries", route: "protection" },
      { title: "RESP planning", timing: "Before tuition", action: "Confirm contribution rhythm and gap", route: "education" },
      { title: "Retirement goal review", timing: "This year", action: "Review Jamie RRSP goal alignment", route: "investments" }
    ]
  },
  {
    member: "Emma Chen",
    age: "17",
    role: "Student",
    focus: "University, student banking, rent budgeting, account ownership, and credit education.",
    image: educationImage,
    route: "education",
    roadmap: [
      { title: "University transition", timing: "Next 10 months", action: "Open first-year affordability plan", route: "education" },
      { title: "RESP withdrawal planning", timing: "Before tuition", action: "Review withdrawal timing and documents", route: "education" },
      { title: "Student banking", timing: "Before move-in", action: "Review student account setup", route: "education" },
      { title: "Rent budgeting", timing: "Before lease", action: "Build rent and living-cost budget", route: "cashflow" },
      { title: "Account ownership transition", timing: "At 18", action: "Review privacy and parent visibility", route: "permissions" },
      { title: "Credit education", timing: "At 18", action: "Open credit-building checklist", route: "education" },
      { title: "FHSA education if eligible", timing: "At 18+", action: "Add first-home savings education prompt", route: "investments" }
    ]
  },
  {
    member: "Ethan Chen",
    age: "11",
    role: "Dependent",
    focus: "Primary school money habits, savings goals, allowance rhythm, and RESP tracking.",
    image: educationImage,
    route: "education",
    roadmap: [
      { title: "Primary school money habits", timing: "Now", action: "Start save/spend/give prompt", route: "education" },
      { title: "Savings goal", timing: "Now", action: "Create parent-guided goal", route: "education" },
      { title: "Allowance rhythm", timing: "This month", action: "Set allowance and savings split", route: "cashflow" },
      { title: "RESP tracking", timing: "Annual", action: "Review education savings progress", route: "education" },
      { title: "Pre-teen debit preparation", timing: "Age 12+", action: "Discuss supervised spending guardrails", route: "permissions" }
    ]
  },
  {
    member: "Grace Chen",
    age: "72",
    role: "Care recipient",
    focus: "Retirement income, caregiving permissions, fraud alerts, bills, and legacy documents.",
    image: caregivingImage,
    route: "caregiving",
    roadmap: [
      { title: "Retirement income review", timing: "This year", action: "Map income and bill timing", route: "investments" },
      { title: "Caregiving permissions", timing: "This quarter", action: "Review Alex and Jamie access", route: "permissions" },
      { title: "POA readiness", timing: "This quarter", action: "Upload or confirm POA status", route: "documents" },
      { title: "Fraud alerts", timing: "Now", action: "Review unusual activity and trusted contacts", route: "caregiving" },
      { title: "Simplified bill management", timing: "This month", action: "Confirm approved bill payment settings", route: "caregiving" },
      { title: "Legacy document review", timing: "Annual", action: "Review will, beneficiaries, and contacts", route: "documents" }
    ]
  }
];

const topRecommendations = [
  {
    priority: "High",
    member: "Emma",
    title: "University transition",
    trigger: "Turns 18 before first-year tuition",
    cta: "Open Life Stage Engine",
    route: "ai" as Route
  },
  {
    priority: "Medium",
    member: "Ethan",
    title: "Money habit window",
    trigger: "Age 11 is a natural moment for savings goals",
    cta: "Create habit plan",
    route: "education" as Route
  },
  {
    priority: "High",
    member: "Grace",
    title: "Caregiving and fraud protection",
    trigger: "Care spending increased and unusual activity needs review",
    cta: "Review care plan",
    route: "caregiving" as Route
  },
  {
    priority: "Medium",
    member: "Alex + Jamie",
    title: "Mortgage renewal",
    trigger: "Renewal is 14 months away",
    cta: "Review housing plan",
    route: "housing" as Route
  },
  {
    priority: "Medium",
    member: "Family",
    title: "Subscription trial ending",
    trigger: "Two trials convert this week",
    cta: "Manage subscriptions",
    route: "subscriptions" as Route
  }
];

const scanSteps = [
  "Scanning family ages...",
  "Checking goals...",
  "Reviewing account context...",
  "Matching CIBC opportunities...",
  "Recommendations ready"
];

const gicRates = {
  Cashable: {
    "90 days": 2.65,
    "180 days": 2.85,
    "1 year": 3.1,
    "2 years": 3.0,
    "3 years": 2.95,
    "5 years": 2.9
  },
  "Non-cashable": {
    "90 days": 3.35,
    "180 days": 3.65,
    "1 year": 4.1,
    "2 years": 4.0,
    "3 years": 3.85,
    "5 years": 3.7
  },
  "Escalating rate": {
    "90 days": 3.0,
    "180 days": 3.0,
    "1 year": 3.0,
    "2 years": 3.35,
    "3 years": [3.0, 3.75, 4.5],
    "5 years": [3.0, 3.4, 3.8, 4.2, 4.6]
  }
} as const;

const gicTermYears: Record<string, number> = {
  "90 days": 90 / 365,
  "180 days": 180 / 365,
  "1 year": 1,
  "2 years": 2,
  "3 years": 3,
  "5 years": 5
};

type GicType = keyof typeof gicRates;

type GicScenario = {
  amount: number;
  accountType: string;
  gicType: GicType;
  term: string;
  payout: string;
  goal: string;
};

const recommendedGicOptions: Array<GicScenario & { title: string; suggestedAmount: number; why: string }> = [
  {
    title: "Best Balance",
    amount: 25000,
    suggestedAmount: 25000,
    accountType: "RESP",
    gicType: "Non-cashable",
    term: "2 years",
    payout: "Paid at maturity",
    goal: "Emma's education",
    why: "Matches Emma's education timeline while offering a higher projected return than cashable options."
  },
  {
    title: "Best Liquidity",
    amount: 15000,
    suggestedAmount: 15000,
    accountType: "TFSA",
    gicType: "Cashable",
    term: "1 year",
    payout: "Paid at maturity",
    goal: "Emergency reserve",
    why: "Useful for emergency reserve because funds may be accessed earlier."
  },
  {
    title: "Best Long-Term Growth",
    amount: 30000,
    suggestedAmount: 30000,
    accountType: "TFSA",
    gicType: "Escalating rate",
    term: "5 years",
    payout: "Annual",
    goal: "Retirement",
    why: "May support longer-term family goals such as retirement or future home upgrades."
  }
];

const getRate = (gicType: GicType, term: string): number | readonly number[] =>
  gicRates[gicType][term as keyof (typeof gicRates)[GicType]] as number | readonly number[];

const calculateGicProjection = (scenario: GicScenario) => {
  const years = gicTermYears[scenario.term] ?? 1;
  const rate = getRate(scenario.gicType, scenario.term);
  let maturityValue = scenario.amount;

  if (Array.isArray(rate)) {
    const usableRates = rate.slice(0, Math.max(1, Math.round(years)));
    usableRates.forEach((yearRate) => {
      maturityValue *= 1 + yearRate / 100;
    });
  } else {
    const fixedRate = rate as number;
    if (scenario.payout === "Monthly") {
      maturityValue = scenario.amount * Math.pow(1 + fixedRate / 100 / 12, years * 12);
    } else if (scenario.payout === "Annual" && years >= 1) {
      maturityValue = scenario.amount * Math.pow(1 + fixedRate / 100, years);
    } else {
      maturityValue = scenario.amount * (1 + (fixedRate / 100) * years);
    }
  }

  const interest = maturityValue - scenario.amount;
  const effectiveReturn = years > 0 ? (Math.pow(maturityValue / scenario.amount, 1 / years) - 1) * 100 : 0;

  return {
    annualRate: Array.isArray(rate) ? rate.reduce((sum, item) => sum + item, 0) / rate.length : rate,
    interest,
    maturityValue,
    effectiveReturn
  };
};

const liquidityForScenario = (scenario: GicScenario) => {
  if (scenario.gicType === "Cashable") return "Flexible access after initial holding period";
  if (scenario.term === "90 days" || scenario.term === "180 days") return "Short lock-in";
  return "Locked until maturity";
};

const goalFitForScenario = (scenario: GicScenario) => {
  if (scenario.goal === "Emergency reserve" && scenario.gicType === "Cashable") return "Strong fit for emergency liquidity";
  if (scenario.goal === "Emma's education" && scenario.term === "1 year") return "Strong fit for Emma's education timeline";
  if (scenario.goal === "Emma's education" && scenario.term === "2 years") return "Good fit if funds are not needed immediately";
  if (scenario.goal === "Caregiving reserve" && scenario.gicType !== "Cashable") return "Use caution because care costs can be unpredictable";
  if (scenario.goal === "Retirement" && scenario.gicType === "Escalating rate") return "Strong fit for longer-term family planning";
  return "Good fit for planned savings if liquidity needs are reviewed";
};

const taxNoteForAccount = (accountType: string) => {
  if (accountType === "TFSA") return "TFSA growth may be tax-free subject to contribution room.";
  if (accountType === "RRSP") return "RRSP growth may be tax-deferred, with withdrawals taxable under applicable rules.";
  if (accountType === "RRIF") return "RRIF income rules and minimum withdrawals should be reviewed before maturity planning.";
  if (accountType === "RESP") return "RESP treatment depends on plan rules, grants, and education withdrawals.";
  if (accountType === "RDSP") return "RDSP eligibility, grants, bonds, and withdrawal rules require specialist review.";
  if (accountType === "FHSA") return "FHSA use depends on age, residency, first-home eligibility, and contribution room.";
  if (accountType === "LIF / LRIF") return "Locked-in retirement income accounts have withdrawal limits and provincial rules.";
  return "Interest in non-registered accounts may be taxable and should be reviewed with an advisor.";
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);

export default function App() {
  const [route, setRoute, familySubRoute, setFamilySubRoute, planningSubRoute, setPlanningSubRoute] = useAppRoute();
  const [authTab, setAuthTab] = useState<"signin" | "create">("signin");

  if (route === "landing") {
    return (
      <LandingPage
        onSignIn={() => {
          setAuthTab("signin");
          setRoute("auth");
        }}
        onCreate={() => {
          setAuthTab("create");
          setRoute("auth");
        }}
      />
    );
  }

  if (route === "auth") {
    return <AuthPage initialTab={authTab} onNavigate={setRoute} />;
  }

  if (route === "onboarding") {
    return <OnboardingPage onNavigate={setRoute} />;
  }

  return (
    <DashboardShell route={route} onNavigate={setRoute}>
      {renderRoute(route, setRoute, familySubRoute, setFamilySubRoute, planningSubRoute, setPlanningSubRoute)}
    </DashboardShell>
  );
}

function useAppRoute(): [
  Route,
  (route: Route) => void,
  FamilySubRoute,
  (subRoute: FamilySubRoute) => void,
  PlanningSubRoute,
  (subRoute: PlanningSubRoute) => void
] {
  const [route, setRoute] = useState<Route>("landing");
  const [familySubRoute, setFamilySubRoute] = useState<FamilySubRoute>("members");
  const [planningSubRoute, setPlanningSubRoute] = useState<PlanningSubRoute>("overview");

  const navigate = (nextRoute: Route) => {
    const planningMap: Partial<Record<Route, PlanningSubRoute>> = {
      overview: "overview",
      education: "education",
      housing: "housing",
      subscriptions: "subscriptions",
      caregiving: "caregiving",
      protection: "protection"
    };
    const familyMap: Partial<Record<Route, FamilySubRoute>> = {
      accounts: "accounts",
      documents: "documents",
      permissions: "permissions",
      legacy: "documents"
    };

    if (nextRoute in planningMap) {
      setPlanningSubRoute(planningMap[nextRoute] ?? "overview");
      setRoute("planning");
      return;
    }
    if (nextRoute in familyMap) {
      setFamilySubRoute(familyMap[nextRoute] ?? "members");
      setRoute("family");
      return;
    }
    if (nextRoute === "insights") {
      setRoute("ai");
      return;
    }
    if (nextRoute === "goals" || nextRoute === "cashflow") {
      setRoute("investments");
      return;
    }
    setRoute(nextRoute);
  };

  return [route, navigate, familySubRoute, setFamilySubRoute, planningSubRoute, setPlanningSubRoute];
}

function LandingPage({ onSignIn, onCreate }: { onSignIn: () => void; onCreate: () => void }) {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <BrandMark />
        <button className="ghost-button" onClick={onSignIn}>
          Sign In
        </button>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <ShieldCheck size={16} />
            Consent-based family banking
          </div>
          <h1>Manage your family's financial life in one place.</h1>
          <p>
            Coordinate education, housing, subscription control, caregiving, shared cash flow, and long-term wealth
            planning through one intelligent family banking experience.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onSignIn}>
              Sign In <ChevronRight size={18} />
            </button>
            <button className="secondary-button" onClick={onCreate}>
              Create Family Profile
            </button>
          </div>
        </div>
        <div className="hero-media">
          <img src={heroImage} alt="Premium family banking dashboard displayed in a modern home office" />
          <div className="hero-stat">
            <span>Readiness</span>
            <strong>6/8</strong>
            <small>Areas visible</small>
          </div>
        </div>
      </section>
      <section className="feature-grid">
        {featureCards.map(({ title, text, icon: Icon }) => (
          <button className="feature-card" key={title} onClick={onCreate}>
            <Icon size={24} />
            <strong>{title}</strong>
            <span>{text}</span>
          </button>
        ))}
      </section>
    </main>
  );
}

function AuthPage({ initialTab, onNavigate }: { initialTab: "signin" | "create"; onNavigate: (route: Route) => void }) {
  const [tab, setTab] = useState<"signin" | "create">(initialTab);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onNavigate(tab === "signin" ? "dashboard" : "onboarding");
  };

  return (
    <main className="auth-page">
      <button className="back-link" onClick={() => onNavigate("landing")}>
        <ChevronRight size={16} /> Back to FamilyOS
      </button>
      <section className="auth-panel">
        <div>
          <BrandMark />
          <h1>{tab === "signin" ? "Welcome back, Alex" : "Create your family profile"}</h1>
          <p>
            FamilyOS connects individual accounts into a role-based family view without automatically granting control
            over another person's money.
          </p>
        </div>
        <div className="tabs">
          <button className={tab === "signin" ? "active" : ""} onClick={() => setTab("signin")}>
            Sign In
          </button>
          <button className={tab === "create" ? "active" : ""} onClick={() => setTab("create")}>
            Create Account
          </button>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {tab === "create" && <Field label="Full Name" value="Alex Chen" />}
          <Field label="Email" value="alex.chen@example.ca" />
          <Field label="Password" value="familyosdemo" type="password" />
          {tab === "create" && (
            <label className="field">
              Primary role in family
              <select defaultValue="Parent">
                <option>Parent</option>
                <option>Adult Child</option>
                <option>Spouse / Partner</option>
                <option>Caregiver</option>
                <option>Other</option>
              </select>
            </label>
          )}
          <button className="primary-button full" type="submit">
            {tab === "signin" ? "Sign In" : "Continue to Family Setup"}
          </button>
        </form>
      </section>
    </main>
  );
}

function OnboardingPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const [step, setStep] = useState(0);
  const steps = ["Family Members", "Household Goals", "Assets & Accounts", "Permissions & Consent", "Summary"];

  return (
    <main className="onboarding">
      <div className="onboarding-header">
        <BrandMark />
        <div>
          <span>Step {step + 1} of 5</span>
          <h1>{steps[step]}</h1>
        </div>
      </div>
      <div className="onboarding-visual">
        <img src={onboardingImage} alt="Family reviewing financial setup together around a tablet" />
        <div>
          <strong>Household setup, with consent at the center.</strong>
          <span>FamilyOS uses onboarding to connect goals, accounts, roles, permissions, and optional context families choose to share.</span>
        </div>
      </div>
      <div className="stepper">
        {steps.map((item, index) => (
          <button key={item} className={index <= step ? "active" : ""} onClick={() => setStep(index)}>
            {index + 1}
            <span>{item}</span>
          </button>
        ))}
      </div>
      <section className="onboarding-card">
        {step === 0 && <FamilyMembersStep />}
        {step === 1 && <HouseholdGoalsStep />}
        {step === 2 && <AssetsStep />}
        {step === 3 && <PermissionsConsentStep />}
        {step === 4 && <SummaryStep />}
      </section>
      <div className="onboarding-actions">
        <button className="secondary-button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>
          Back
        </button>
        {step < 4 ? (
          <button className="primary-button" onClick={() => setStep(step + 1)}>
            Continue
          </button>
        ) : (
          <button className="primary-button" onClick={() => onNavigate("dashboard")}>
            Enter Dashboard
          </button>
        )}
      </div>
    </main>
  );
}

function FamilyMembersStep() {
  return (
    <div>
      <div className="section-heading">
        <h2>Build the Chen Family profile</h2>
        <p>Each member can have a different role, data view, and action level.</p>
      </div>
      <div className="member-table">
        <div className="member-row header">
          <span>Name</span>
          <span>Relationship</span>
          <span>Age</span>
          <span>Role</span>
          <span>Access level</span>
        </div>
        {familyMembers.map((member) => (
          <div className="member-row" key={member.name}>
            <strong>{member.name}</strong>
            <span>{member.relationship}</span>
            <span>{member.age ?? "-"}</span>
            <span>{member.role}</span>
            <select defaultValue={member.access}>
              <option>No Access</option>
              <option>View Only</option>
              <option>Limited Actions</option>
              <option>Caregiver Mode</option>
              <option>Joint Account Access</option>
            </select>
          </div>
        ))}
      </div>
      <button className="secondary-button compact">Add family member</button>
    </div>
  );
}

function HouseholdGoalsStep() {
  const goals = [
    "Buy a home / renew mortgage",
    "Fund child education",
    "Support university rent and living expenses",
    "Build emergency fund",
    "Support aging parents",
    "Plan retirement",
    "Organize estate documents",
    "Manage family insurance",
    "Transfer wealth across generations"
  ];
  return (
    <div>
      <div className="section-heading">
        <h2>What is this household coordinating?</h2>
        <p>FamilyOS uses goals to connect accounts, permissions, and recommendations.</p>
      </div>
      <div className="checkbox-grid">
        {goals.map((goal, index) => (
          <label key={goal} className="check-card">
            <input type="checkbox" defaultChecked={index < 6 || goal.includes("estate")} />
            <span>{goal}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function AssetsStep() {
  const [ranges, setRanges] = useState(() => Object.fromEntries(externalAssetRanges.map((item) => [item.label, item.current])));
  const cibc = ["CIBC Chequing", "CIBC Savings", "CIBC Mortgage", "CIBC Credit Card", "CIBC RESP", "CIBC TFSA", "CIBC RRSP"];

  const skipExternalContext = () => {
    setRanges(Object.fromEntries(externalAssetRanges.map((item) => [item.label, item.options.includes("None") ? "None" : "Prefer not to say"])));
  };

  return (
    <div className="asset-split">
      <div>
        <DataLabel type="verified" />
        <h2>Verified CIBC Assets</h2>
        <div className="asset-list">
          {cibc.map((item) => (
            <label key={item} className="asset-line">
              <input type="checkbox" defaultChecked />
              <span>{item}</span>
              <CheckCircle2 size={17} />
            </label>
          ))}
        </div>
      </div>
      <div>
        <DataLabel type="reported" />
        <div className="card-title-row">
          <div>
            <h2>Shared by You: External Family Context</h2>
            <p className="fineprint">
              Optional: Add an approximate range for assets held outside CIBC. This helps FamilyOS create a more complete
              household picture, improve goal planning, and make recommendations more relevant. You can skip any question
              and update it later.
            </p>
            <p className="fineprint strong-note">We do not need exact values at this stage. Ranges are enough for planning.</p>
          </div>
          <button className="secondary-button compact" type="button" onClick={skipExternalContext}>
            Skip for now
          </button>
        </div>
        <div className="trust-card">
          <ShieldCheck size={20} />
          <div>
            <strong>Your privacy matters.</strong>
            <p>
              Self-reported information is used only to personalize your FamilyOS view and recommendations. It does not
              change account ownership, permissions, or access. You control what you share and can edit or remove it later.
            </p>
            <div className="trust-chip-row">
              {["Optional", "Range-based", "Editable anytime", "Used for planning only", "Consent-based"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="range-grid">
          {externalAssetRanges.map((item) => (
            <RangeSelect
              key={item.label}
              label={item.label}
              value={ranges[item.label]}
              options={item.options}
              onChange={(value) => setRanges((current) => ({ ...current, [item.label]: value }))}
            />
          ))}
        </div>
        <p className="fineprint">
          You can complete this later from Settings &gt; Data Sources or from any planning module. FamilyOS will continue
          normally if you skip or choose "Prefer not to say."
        </p>
      </div>
    </div>
  );
}

function PermissionsConsentStep() {
  const permissions = [
    "Share account balance",
    "Share transactions",
    "Allow bill payment",
    "Allow transfer",
    "Send unusual activity alerts",
    "Emergency access enabled"
  ];
  return (
    <div>
      <div className="section-heading">
        <h2>Permission-based access</h2>
        <p>Each family member controls what they share and what actions others can take.</p>
      </div>
      <div className="consent-grid">
        <div className="consent-copy">
          <p>Alex can view household dashboard.</p>
          <p>Jamie can view and manage shared bills.</p>
          <p>Alex can view Grace's care budget.</p>
          <p>Alex cannot move money from Grace's personal account unless authorized.</p>
          <p>Grace can grant or revoke access.</p>
        </div>
        <div className="toggle-stack">
          {permissions.map((item, index) => (
            <Toggle key={item} label={item} defaultChecked={index !== 3} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryStep() {
  return (
    <div className="summary-grid">
      <MetricCard icon={CheckCircle2} title="Family Profile Created" value="Chen Family" caption="5 members, 8 active goals" />
      <MetricCard
        icon={Gauge}
        title="Family Readiness Snapshot"
        value="Ready to review"
        caption="Housing and cash flow are on track. Education, caregiving, and legacy planning may benefit from review."
      />
      <MetricCard
        icon={AlertTriangle}
        title="Optional Context to Add Later"
        value="3 helpful items"
        caption="External investments range, insurance coverage range, and estate document status can be added later to improve recommendations."
      />
      <div className="wide-card">
        <h3>Your FamilyOS profile is ready</h3>
        <p className="fineprint">
          FamilyOS can still generate recommendations using verified CIBC data. Adding approximate ranges later may improve
          planning accuracy without requiring exact values.
        </p>
        <h3>Recommended first actions</h3>
        <ul className="task-list">
          {tasks.slice(0, 4).map((task) => (
            <li key={task}>
              <CheckCircle2 size={16} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DashboardShell({
  route,
  onNavigate,
  children
}: {
  route: Route;
  onNavigate: (route: Route) => void;
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <BrandMark />
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.route} className={route === item.route ? "active" : ""} onClick={() => onNavigate(item.route)}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div>
            <span>Welcome back, Alex</span>
            <h1>{routeTitle(route)}</h1>
          </div>
          <div className="topbar-actions">
            <button className="family-selector">
              <UsersRound size={17} />
              The Chen Family
            </button>
            <button className="icon-button" aria-label="Search">
              <Search size={19} />
            </button>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="avatar">AC</div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function renderRoute(
  route: Route,
  onNavigate: (route: Route) => void,
  familySubRoute: FamilySubRoute,
  setFamilySubRoute: (subRoute: FamilySubRoute) => void,
  planningSubRoute: PlanningSubRoute,
  setPlanningSubRoute: (subRoute: PlanningSubRoute) => void
) {
  switch (route) {
    case "dashboard":
    case "overview":
      return <DashboardPage onNavigate={onNavigate} />;
    case "family":
      return <FamilyAdminPage activeTab={familySubRoute} onTabChange={setFamilySubRoute} />;
    case "planning":
      return <PlanningPage activeTab={planningSubRoute} onTabChange={setPlanningSubRoute} onNavigate={onNavigate} />;
    case "investments":
      return <Investments />;
    case "ai":
    case "insights":
      return <AICoachPage onNavigate={onNavigate} />;
    case "settings":
      return <SettingsPage />;
    default:
      return <DashboardPage onNavigate={onNavigate} />;
  }
}

function DashboardPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <main className="family-dashboard">
      <section className="priority-banner">
        <div>
          <span>Life Stage Engine</span>
          <h2>Top AI recommendations for the Chen Family</h2>
          <p>
            FamilyOS helps families never miss the next important financial milestone by turning age, goals,
            accounts, permissions, and events into next best actions.
          </p>
          <button className="primary-button compact" onClick={() => onNavigate("ai")}>
            Run Life Stage Scan
          </button>
        </div>
        <div className="priority-visual">
          <img src={onboardingImage} alt="Family reviewing financial priorities together" />
        </div>
      </section>

      <section className="recommended-actions compact-recommendations">
        <div className="section-heading">
          <h2>Top AI Recommendations</h2>
          <p>
            Families do not miss opportunities because products do not exist. They miss them because they do not know
            the right moment to act.
          </p>
        </div>
        <div className="top-recommendation-grid">
          {topRecommendations.map((item) => (
            <article className="top-recommendation-card" key={item.title}>
              <div>
                <span className={`priority-pill ${item.priority.toLowerCase()}`}>{item.priority}</span>
                <small>{item.member}</small>
              </div>
              <h3>{item.title}</h3>
              <p>{item.trigger}</p>
              <button className="secondary-button compact" onClick={() => onNavigate(item.route)}>
                {item.cta}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="card calm-card">
        <div className="card-title-row">
          <div>
            <h2>Upcoming Timeline Preview</h2>
            <p>Who needs attention now, what comes next, and where FamilyOS routes the family.</p>
          </div>
          <button className="secondary-button compact" onClick={() => onNavigate("ai")}>
            Explore all stages
          </button>
        </div>
        <div className="dashboard-timeline-preview">
          {lifeStageMoments.map((moment) => (
            <article key={moment.member}>
              <span>{moment.timing}</span>
              <strong>{moment.member}</strong>
              <p>{moment.stage}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card calm-card">
        <div className="card-title-row">
          <div>
            <h2>Family Readiness Snapshot</h2>
            <p>A household-first view of what is on track, what needs review, and what needs action.</p>
          </div>
          <button className="secondary-button compact" onClick={() => onNavigate("planning")}>
            Open family status
          </button>
        </div>
        <ReadinessMatrix />
      </section>

      <section className="card calm-card">
        <div className="card-title-row">
          <div>
            <h2>Quick Actions</h2>
            <p>Open the action area behind each recommendation.</p>
          </div>
        </div>
        <div className="quick-action-row">
          {[
            ["Education Planner", "education"],
            ["Caregiving Mode", "caregiving"],
            ["Subscription Control", "subscriptions"],
            ["Goal Evaluator", "investments"],
            ["Family Admin", "family"]
          ].map(([label, route]) => (
            <button key={label} className="secondary-button compact" onClick={() => onNavigate(route as Route)}>
              {label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function FamilyAdminPage({
  activeTab,
  onTabChange
}: {
  activeTab: FamilySubRoute;
  onTabChange: (subRoute: FamilySubRoute) => void;
}) {
  const tabs: { id: FamilySubRoute; label: string; icon: LucideIcon }[] = [
    { id: "members", label: "Members", icon: UsersRound },
    { id: "accounts", label: "Accounts & Ownership", icon: WalletCards },
    { id: "permissions", label: "Permissions & Consent", icon: LockKeyhole },
    { id: "documents", label: "Documents Vault", icon: FileText }
  ];

  return (
    <ModulePage
      icon={UsersRound}
      kicker="Family Administration Center"
      title="Family, ownership, access, and documents"
      summary="Manage the people, accounts, permissions, and shared documents that make FamilyOS consent-based."
      insight="FamilyOS does not automatically grant control over another person's account. Access is consent-based, role-based, and revocable."
    >
      <InternalTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "members" && <FamilyMembersAdmin />}
      {activeTab === "accounts" && <AccountsPage compact />}
      {activeTab === "permissions" && <PermissionsPage compact />}
      {activeTab === "documents" && <DocumentsVault compact />}
    </ModulePage>
  );
}

function FamilyMembersAdmin() {
  return (
    <>
      <Panel title="Family Members">
        <div className="family-card-grid">
          {familyMembers.map((member) => (
            <article className="family-member-card" key={member.name}>
              <div className="member-avatar">{member.name.split(" ").map((part) => part[0]).join("")}</div>
              <div>
                <strong>{member.name}</strong>
                <span>{member.relationship}{member.age ? `, age ${member.age}` : ""}</span>
              </div>
              <div className="member-detail-grid">
                <small>Role <strong>{member.role}</strong></small>
                <small>Access <strong>{member.access}</strong></small>
                <small>Linked goal <strong>{member.goal}</strong></small>
              </div>
            </article>
          ))}
        </div>
      </Panel>
      <Panel title="Administration Focus">
        <div className="admin-summary-grid">
          {[
            ["Identity", "5 family members with separate roles and ownership"],
            ["Ownership", "Accounts remain individually owned unless joint access is authorized"],
            ["Consent", "Every sensitive family view depends on sharing permissions"],
            ["Documents", "Vault folders connect to education, care, insurance, property, tax, and legacy"]
          ].map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </Panel>
      <Panel title="Member-Specific Opportunity Suggestions">
        <p className="fineprint">
          These examples are educational prompts based on permissioned transaction patterns. FamilyOS avoids judgmental language and does not expose private transactions without consent.
        </p>
        <div className="member-suggestion-grid">
          {[
            ["Emma", "Student spending coach", "Dining and food delivery are trending above the mock student benchmark. Suggest a campus meal budget and weekly spending alert."],
            ["Alex", "Mortgage readiness", "HELOC utilization and mortgage renewal timing suggest reviewing repayment options before renewal season."],
            ["Jamie", "Shared bills optimization", "Utilities and insurance are assigned to Jamie. FamilyOS can suggest annual policy review and duplicate subscription checks."],
            ["Grace", "Care budget alert", "Care-related spending is up 18%. Suggest confirming pharmacy, home support, and unusual transaction alerts."],
            ["Ethan", "Future education planning", "RESP planning can be reviewed before high school to smooth contribution timing."]
          ].map(([member, title, text]) => (
            <article className="member-suggestion-card" key={member}>
              <span>{member}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Panel>
    </>
  );
}

function PlanningPage({
  activeTab,
  onTabChange,
  onNavigate
}: {
  activeTab: PlanningSubRoute;
  onTabChange: (subRoute: PlanningSubRoute) => void;
  onNavigate: (route: Route) => void;
}) {
  const tabs: { id: PlanningSubRoute; label: string; icon: LucideIcon }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "housing", label: "Housing", icon: Home },
    { id: "subscriptions", label: "Subscriptions", icon: ReceiptText },
    { id: "caregiving", label: "Caregiving", icon: HeartPulse },
    { id: "protection", label: "Protection", icon: ShieldCheck }
  ];

  return (
    <main className="planning-shell">
      <section className="module-hero">
        <div className="module-hero-copy">
          <div className="module-icon">
            <Gauge size={28} />
          </div>
          <div>
            <span>Planning Readiness</span>
            <h2>Family Status: daily household responsibilities</h2>
            <p>Monitor education, housing, subscriptions, caregiving, and protection as one family-status layer before moving into goal evaluation.</p>
          </div>
        </div>
      </section>
      <InternalTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "overview" && <PlanningOverview onNavigate={onNavigate} />}
      {activeTab === "education" && <EducationPlanner />}
      {activeTab === "housing" && <HousingHub />}
      {activeTab === "subscriptions" && <SubscriptionControl />}
      {activeTab === "caregiving" && <CaregivingMode />}
      {activeTab === "protection" && <Protection />}
    </main>
  );
}

function PlanningOverview({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const cards = [
    ["Family milestones", "Action Recommended", "Emma turns 18 before university; Ethan is ready for money habits.", "Open Life Stage Engine", "ai"],
    ["Education", "Needs Review", "RESP path may fall short by $7,800.", "Open Education Plan", "education"],
    ["Housing", "On Track", "Mortgage renewal preparation starts in 8 months.", "Open Housing Plan", "housing"],
    ["Subscriptions", "Action Recommended", "Two trials convert to paid plans this week.", "Manage Subscriptions", "subscriptions"],
    ["Caregiving", "Action Recommended", "Grace has an unusual transaction and higher care spend.", "Review Caregiving", "caregiving"],
    ["Protection", "Needs Review", "Beneficiaries and life coverage need review.", "Review Protection", "protection"]
  ] as const;

  return (
    <main className="module-page planning-overview">
      <div className="section-heading">
        <h2>Family Status Overview</h2>
        <p>Layer 2 summarizes the household's current responsibilities after Life Stage Engine identifies what is coming next.</p>
      </div>
      <FamilyStatusVisual />
      <div className="planning-card-grid">
        {cards.map(([title, status, text, cta, route]) => (
          <article className="planning-card" key={title}>
            <div>
              <span>{title}</span>
              <StatusChip status={status} />
            </div>
            <p>{text}</p>
            <button className="secondary-button compact" onClick={() => onNavigate(route)}>
              {cta}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

function EducationPlanner() {
  const transitionMilestones: Array<{
    label: string;
    date: string;
    status: string;
    tone: "active" | "review" | "future";
    detail: string;
  }> = [
    {
      label: "Grade 12",
      date: "Now - Spring 2027",
      status: "In progress",
      tone: "active",
      detail: "Finalize school choices, RESP withdrawal timing, OSAP/scholarship checklist, and student banking setup."
    },
    {
      label: "First year university",
      date: "Fall 2027",
      status: "Planning",
      tone: "review",
      detail: "Prepare tuition payments, monthly support transfers, rent budget, and first-year spending guardrails."
    },
    {
      label: "First rental lease",
      date: "Summer 2027",
      status: "Needs review",
      tone: "review",
      detail: "Estimate deposits, guarantor needs, tenant insurance, utilities, and a shared move-in expense plan."
    },
    {
      label: "First credit card",
      date: "Fall 2027",
      status: "Guided setup",
      tone: "future",
      detail: "Introduce credit-building with a low limit, payment reminders, and parent-visible education alerts if Emma consents."
    },
    {
      label: "First internship",
      date: "2029",
      status: "Future",
      tone: "future",
      detail: "Shift from parent support toward earned income, tax filing habits, and early TFSA contribution planning."
    },
    {
      label: "Graduation",
      date: "2031",
      status: "Future",
      tone: "future",
      detail: "Plan student debt repayment, emergency reserve, independent insurance, and long-term investing habits."
    }
  ];

  return (
    <ModulePage
      icon={GraduationCap}
      kicker="Education-to-Independence Planner"
      title="Emma Chen, age 17"
      summary="Plan RESP, tuition, rent, parent support, and student banking from Grade 12 to graduation."
      insight="Based on Emma's projected first-year cost, consider increasing monthly RESP contributions by $180 or setting up a dedicated university living expense fund."
      image={educationImage}
      imageAlt="Parent and student reviewing university planning on a tablet"
    >
      <Panel title="AI Age-Stage Pathway">
        <div className="age-pathway">
          {youthLifecyclePath.map(([age, moment, detail]) => (
            <article className={age === "Age 18" ? "active" : ""} key={age}>
              <span>{age}</span>
              <strong>{moment}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="advisor-disclaimer">
          <Sparkles size={17} />
          <span>
            FamilyOS does not replace CIBC products. It detects family opportunities and recommends when an existing
            CIBC tool, student banking path, RESP planning moment, or advisor conversation may be relevant.
          </span>
        </div>
      </Panel>
      <div className="module-grid">
        {[
          ["University target year", "2027"],
          ["Estimated tuition", "$12,500/year"],
          ["Estimated rent", "$1,150/month"],
          ["Books & supplies", "$1,200/year"],
          ["Food/transport/personal", "$850/month"],
          ["Total estimated first-year cost", "$28,500"],
          ["RESP balance", "$32,000"],
          ["Projected gap", "$7,800"]
        ].map(([label, value]) => (
          <MetricTile key={label} label={label} value={value} />
        ))}
      </div>
      <div className="two-column">
        <Panel title="Planner Features">
          {[
            "Tuition forecast",
            "University rent budget",
            "Parent monthly support transfer planner",
            "Scholarship / OSAP placeholder",
            "Student credit-building checklist",
            "Student chequing account recommendation"
          ].map((item) => (
            <CheckLine key={item}>{item}</CheckLine>
          ))}
        </Panel>
        <Panel title="Transition Timeline">
          <div className="education-timeline">
            {transitionMilestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.label}
                label={milestone.label}
                date={milestone.date}
                status={milestone.status}
                detail={milestone.detail}
                tone={milestone.tone}
                isLast={index === transitionMilestones.length - 1}
              />
            ))}
          </div>
        </Panel>
      </div>
    </ModulePage>
  );
}

function HousingHub() {
  return (
    <ModulePage
      icon={Home}
      kicker="Housing Hub"
      title="Mortgage and home responsibilities"
      summary="Coordinate ownership costs, renewal readiness, home protection, and renovation planning."
      insight="Mortgage renewal in 14 months. Start preparing 6 months before renewal."
    >
      <div className="module-grid">
        {[
          ["Current home value", "$950,000"],
          ["Mortgage balance", "$490,000"],
          ["Monthly mortgage payment", "$3,240"],
          ["Property tax", "$540/month"],
          ["Home insurance", "$186/month"],
          ["Utilities", "$420/month"],
          ["Renovation fund", "42% funded"],
          ["HELOC utilization", "31%"]
        ].map(([label, value]) => (
          <MetricTile key={label} label={label} value={value} />
        ))}
      </div>
      <div className="two-column">
        <Panel title="Renewal Readiness">
          <StatusSummary
            title="Preparation suggested"
            text="Documentation is progressing, but rate scenarios and debt planning should be reviewed before the renewal window."
          />
          <ProgressBar label="Income documentation" value={84} />
          <ProgressBar label="Rate scenario review" value={52} />
          <ProgressBar label="Debt repayment plan" value={61} />
        </Panel>
        <Panel title="AI Housing Insights">
          <InsightText text="Your HELOC utilization increased this quarter. Review repayment plan." />
          <InsightText text="Your renovation fund is 42% funded." />
        </Panel>
      </div>
    </ModulePage>
  );
}

function CashFlow() {
  const rows = [
    ["Mortgage", "Alex", "$3,240", "Verified CIBC data"],
    ["Utilities", "Jamie", "$420", "Self-reported"],
    ["Emma tuition savings", "Alex + Jamie", "$620", "Verified RESP + goal"],
    ["Grace care support", "Alex", "$1,200", "Permissioned care budget"],
    ["Insurance", "Jamie", "$386", "Self-reported policy values"]
  ];
  return (
    <ModulePage
      icon={CircleDollarSign}
      kicker="Household Cash Flow Manager"
      title="Family-level income and expense coordination"
      summary="See safe-to-spend, shared bills, parent support, child expenses, debt payments, and savings rate."
      insight="Your safe-to-spend amount for the next 14 days is $1,240."
    >
      <div className="module-grid">
        {[
          ["Combined household income", "$12,400"],
          ["Fixed expenses", "$5,640"],
          ["Variable expenses", "$1,700"],
          ["Child expenses", "$860"],
          ["Parent support", "$1,200"],
          ["Debt payments", "$740"],
          ["Savings rate", "14%"],
          ["Emergency coverage", "2.1 months"]
        ].map(([label, value]) => (
          <MetricTile key={label} label={label} value={value} />
        ))}
      </div>
      <Panel title="Shared Bill Assignment">
        <DataTable headers={["Bill", "Responsible", "Amount", "Source"]} rows={rows} />
      </Panel>
      <div className="insight-row">
        <InsightText text="This month's parent support spending is $320 above average." />
        <InsightText text="Emergency fund would cover 2.1 months of family expenses." />
      </div>
    </ModulePage>
  );
}

function SubscriptionControl() {
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState("");
  const familyFilters = ["All", "Alex", "Jamie", "Emma", "Ethan", "Grace"];
  const visibleSubscriptions = subscriptions.filter((item) => filter === "All" || item.owner === filter || item.owner === "Family");
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  return (
    <ModulePage
      icon={ReceiptText}
      kicker="CIBC Subscription Control Center"
      title="Subscription Control Center"
      summary="Track, manage, and take action on recurring payments across your family."
      insight="Meal Kit Trial converts to a paid plan in 4 days. Create a trial card or cancel before June 23 to avoid the $89.99 charge."
      image={subscriptionImage}
      imageAlt="Phone with subscription cards and merchant payment controls"
    >
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
      <div className="module-grid subscription-overview">
        <MetricTile label="Active subscriptions" value="8" />
        <MetricTile label="Estimated monthly cost" value="$412" />
        <MetricTile label="Potential savings identified" value="$96/month" />
        <MetricTile label="Free trials ending soon" value="2" />
        <MetricTile label="Duplicate subscriptions detected" value="1" />
      </div>
      <div className="family-filter">
        {familyFilters.map((item) => (
          <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <Panel title="Recurring Subscription List">
        <p className="fineprint">
          Subscription visibility depends on card ownership and family sharing permissions. FamilyOS does not expose
          personal transactions unless the account owner has granted access.
        </p>
        <div className="subscription-list">
          {visibleSubscriptions.map((item) => (
            <article className="subscription-row" key={item.merchant}>
              <div>
                <strong>{item.merchant}</strong>
                <span>{item.amount}</span>
              </div>
              <div>
                <small>Payment method</small>
                <span>{item.method}</span>
              </div>
              <div>
                <small>Owner</small>
                <span>{item.owner}</span>
              </div>
              <div>
                <small>Status</small>
                <StatusChip status={item.status.includes("Trial") || item.status.includes("Price") ? "Action Recommended" : "On Track"} />
              </div>
              <div>
                <small>Next billing</small>
                <span>{item.nextBilling}</span>
              </div>
              <div>
                <small>Suggested action</small>
                <span>{item.action}</span>
              </div>
              <div className="subscription-actions">
                {["Guided Cancellation", "Switch Payment Card", "Set Monthly Cap", "Pause Payment", "Keep Subscription"].map((action) => (
                  <button key={action} onClick={() => showToast(`${action} prepared for ${item.merchant}.`)}>
                    {action}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Panel>
      <div className="two-column">
        <Panel title="Alerts & Insights">
          <InsightText text="Meal Kit Trial becomes paid in 4 days. Cancel before June 23 to avoid $89.99 charge." />
          <InsightText text="Two video streaming services have overlapping usage. Review Disney+ and Netflix." />
          <InsightText text="Adobe Creative Cloud has not been used recently but costs $29.99/month." />
          <InsightText text="GoodLife Fitness payment increased by $8 this month." />
        </Panel>
        <Panel title="Merchant Payment Controls">
          <div className="merchant-control-card">
            <CreditCard size={26} />
            <div>
              <strong>Create a trial card that expires after 14 days or caps spending at $1.</strong>
              <span>Use merchant-specific card controls to reduce unwanted recurring charges.</span>
            </div>
          </div>
          {[
            "Create virtual card token for free trials",
            "Set expiry date for trial card",
            "Set merchant-specific monthly spending cap",
            "Freeze merchant payments",
            "Switch subscription to another CIBC card"
          ].map((item) => (
            <button className="action-line" key={item} onClick={() => showToast(`${item} flow opened.`)}>
              {item}
              <ChevronRight size={16} />
            </button>
          ))}
        </Panel>
      </div>
      <div className="family-use-case">
        <UsersRound size={20} />
        <span>FamilyOS helps households identify subscriptions that are spread across different family members, cards, and merchants.</span>
      </div>
    </ModulePage>
  );
}

function CaregivingMode() {
  return (
    <ModulePage
      icon={HeartPulse}
      kicker="Caregiving Mode"
      title="Grace Chen care finances"
      summary="Permission-based support for approved care bills, alerts, invoices, and shared visibility."
      insight="Grace's account had an unusual $640 transaction. Please review."
      image={caregivingImage}
      imageAlt="Adult child and elder parent reviewing care budget and calendar together"
    >
      <div className="module-grid">
        {[
          ["Monthly care budget", "$1,200 / $1,500 used"],
          ["Upcoming appointment", "June 24, 10:30 AM"],
          ["Care-related expenses", "$780"],
          ["Medication spending", "$214"],
          ["Home support spending", "$520"],
          ["Authorized family members", "2"],
          ["Emergency contact", "Alex Chen"],
          ["Unusual activity alert", "$640 flagged"]
        ].map(([label, value]) => (
          <MetricTile key={label} label={label} value={value} />
        ))}
      </div>
      <div className="two-column">
        <Panel title="Approved Actions">
          {[
            "View approved account summary",
            "Pay approved care-related bill",
            "Upload care invoice",
            "Share access with family member",
            "Set spending alert",
            "Review unusual transaction"
          ].map((item) => (
            <button className="action-line" key={item}>
              {item}
              <ChevronRight size={16} />
            </button>
          ))}
        </Panel>
        <Panel title="Permissions">
          <DataTable
            headers={["Member", "Access"]}
            rows={[
              ["Alex", "View balance + pay approved bills"],
              ["Jamie", "View care budget only"],
              ["Emma", "No access"],
              ["Grace", "Owner, can revoke permissions"]
            ]}
          />
          <p className="fineprint">FamilyOS does not imply unlimited control. Grace owns and can revoke access.</p>
        </Panel>
      </div>
    </ModulePage>
  );
}

function Protection() {
  return (
    <ModulePage
      icon={ShieldCheck}
      kicker="Insurance & Protection"
      title="Household protection picture"
      summary="Understand whether the family is financially protected across life, disability, property, travel, and illness."
      insight="Life insurance coverage may be insufficient based on mortgage balance and dependents."
    >
      <div className="module-grid">
        {["Life insurance", "Disability insurance", "Home insurance", "Auto insurance", "Travel insurance", "Critical illness coverage"].map(
          (item, index) => (
            <MetricTile key={item} label={item} value={index < 3 ? "Active" : "Review"} />
          )
        )}
        <MetricTile label="Coverage gap indicator" value="Moderate" />
        <MetricTile label="Beneficiary review" value="Due now" />
      </div>
      <Panel title="Protection Snapshot">
        <StatusSummary
          title="Coverage review suggested"
          text="Life insurance and beneficiary details may need a refresh based on mortgage balance and dependents."
        />
        <InsightText text="Beneficiary information has not been reviewed in 2 years." />
      </Panel>
    </ModulePage>
  );
}

function Investments() {
  const [scenario, setScenario] = useState<GicScenario>({
    amount: 25000,
    accountType: "TFSA",
    gicType: "Non-cashable",
    term: "2 years",
    payout: "Paid at maturity",
    goal: "Emma's education"
  });
  const projection = calculateGicProjection(scenario);
  const comparisonScenarios = [
    { label: "Starting amount", value: scenario.amount, type: "base" },
    {
      label: "Cashable",
      value: calculateGicProjection({ ...scenario, gicType: "Cashable" }).maturityValue,
      type: "cashable"
    },
    {
      label: "Non-cashable",
      value: calculateGicProjection({ ...scenario, gicType: "Non-cashable" }).maturityValue,
      type: "noncashable"
    },
    {
      label: "Escalating",
      value: calculateGicProjection({ ...scenario, gicType: "Escalating rate" }).maturityValue,
      type: "escalating"
    }
  ];
  const maxComparison = Math.max(...comparisonScenarios.map((item) => item.value));
  const rows = [
    ["Alex TFSA", "Alex", "Home upgrade goal", "$42,000", "Private, goal-linked only"],
    ["Jamie RRSP", "Jamie", "Retirement goal", "$126,000", "Summary shared"],
    ["Emma RESP", "Alex + Jamie", "Education goal", "$32,000", "Shared with parents"],
    ["Non-registered", "Alex", "Family emergency reserve", "$58,000", "Shared reserve"]
  ];
  return (
    <ModulePage
      icon={PiggyBank}
      kicker="Family Goal Evaluator"
      title="Cash flow capability, goals, and investment pathways"
      summary="Evaluate whether the Chen Family has enough cash-flow efficiency and product alignment to reach education, housing, caregiving, retirement, and legacy goals."
      insight="Goal recommendations should not default to a locked GIC. FamilyOS compares liquidity needs, time horizon, principal size, and CIBC product pathways before suggesting next steps."
    >
      <div className="advisor-disclaimer">
        <AlertTriangle size={17} />
        <span>These rates are illustrative for prototype purposes only.</span>
      </div>

      <GoalCapabilityBridge />

      <section className="goal-evaluator-grid">
        <Panel title="Family Goal Capability">
          <div className="module-grid">
            {[
              ["Monthly income", "$12,400"],
              ["Monthly expenses", "$8,540"],
              ["Available capacity", "$3,860"],
              ["Savings rate", "14%"],
              ["Emergency coverage", "2.1 months"],
              ["Goal funding readiness", "Moderate"]
            ].map(([label, value]) => (
              <MetricTile key={label} label={label} value={value} />
            ))}
          </div>
        </Panel>
        <Panel title="Goal Readiness Drivers">
          <ProgressBar label="Cash-flow efficiency" value={69} />
          <ProgressBar label="Education funding capacity" value={64} />
          <ProgressBar label="Emergency liquidity" value={52} />
          <ProgressBar label="Retirement contribution momentum" value={58} />
          <ProgressBar label="Caregiving reserve durability" value={61} />
        </Panel>
      </section>

      <Panel title="Suggested CIBC Product Pathways">
        <p className="fineprint">
          Mock pathways for prototype only. Actual product eligibility, rates, risk, and suitability should be confirmed with a CIBC advisor.
        </p>
        <div className="product-pathway-grid">
          {[
            ["Short-term liquidity", "High-interest savings or cashable GIC", "Emergency reserve and caregiving funds that should not be locked in."],
            ["Education timeline", "1-2 year non-cashable GIC or RESP ladder", "Emma's known university timeline may fit a short, planned maturity window."],
            ["Longer-term growth", "Balanced mutual fund / managed portfolio", "For goals beyond 3-5 years where liquidity and market risk can be reviewed."],
            ["Income-oriented reserve", "Monthly income fund", "For families that want distributions, with advisor review of risk and fees."],
            ["Tax-efficient growth", "TFSA / RRSP / RESP / FHSA education", "Registered account choice depends on owner, eligibility, contribution room, and goal."]
          ].map(([title, product, reason]) => (
            <article className="product-pathway-card" key={title}>
              <span>{title}</span>
              <strong>{product}</strong>
              <p>{reason}</p>
              <button className="secondary-button compact">Discuss with advisor</button>
            </article>
          ))}
        </div>
      </Panel>

      <section className="gic-planner-grid">
        <Panel title="GIC Scenario Builder">
          <div className="scenario-form">
            <label className="field">
              Investment amount
              <input
                type="number"
                min="1000"
                step="500"
                value={scenario.amount}
                onChange={(event) => setScenario({ ...scenario, amount: Number(event.target.value) || 0 })}
              />
            </label>
            <ScenarioSelect
              label="Account type"
              value={scenario.accountType}
              options={["Non-registered", "TFSA", "RRSP", "RRIF", "RESP", "RDSP", "FHSA", "LIF / LRIF"]}
              onChange={(value) => setScenario({ ...scenario, accountType: value })}
            />
            <ScenarioSelect
              label="GIC type"
              value={scenario.gicType}
              options={["Cashable", "Non-cashable", "Escalating rate"]}
              onChange={(value) => setScenario({ ...scenario, gicType: value as GicType })}
            />
            <ScenarioSelect
              label="Term length"
              value={scenario.term}
              options={["90 days", "180 days", "1 year", "2 years", "3 years", "5 years"]}
              onChange={(value) => setScenario({ ...scenario, term: value })}
            />
            <ScenarioSelect
              label="Interest payout"
              value={scenario.payout}
              options={["Paid at maturity", "Annual", "Monthly"]}
              onChange={(value) => setScenario({ ...scenario, payout: value })}
            />
            <ScenarioSelect
              label="Goal linked to"
              value={scenario.goal}
              options={["Emergency reserve", "Emma's education", "Home upgrade", "Retirement", "Caregiving reserve"]}
              onChange={(value) => setScenario({ ...scenario, goal: value })}
            />
          </div>
        </Panel>

        <Panel title="Projected Return Results">
          <div className="results-card">
            <MoneyStat label="Principal amount" value={scenario.amount} />
            <MoneyStat label="Estimated interest earned" value={projection.interest} />
            <MoneyStat label="Estimated maturity value" value={projection.maturityValue} />
          </div>
          <div className="result-facts">
            <span>Effective annual return <strong>{projection.effectiveReturn.toFixed(2)}%</strong></span>
            <span>Liquidity level <strong>{liquidityForScenario(scenario)}</strong></span>
            <span>Risk level <strong>Low principal risk, liquidity trade-off applies</strong></span>
            <span>Goal fit <strong>{goalFitForScenario(scenario)}</strong></span>
            <span>Tax note <strong>{taxNoteForAccount(scenario.accountType)}</strong></span>
          </div>
        </Panel>
      </section>

      <Panel title="GIC Classification Notes">
        <div className="product-pathway-grid">
          {[
            ["Liquidity", "Cashable, redeemable, non-redeemable, market-linked"],
            ["Registered accounts", "TFSA, RRSP, RRIF, RESP, RDSP, FHSA, LIF / LRIF"],
            ["Payout style", "Monthly, annual, compounded, or paid at maturity"],
            ["Household fit", "Use lock-in only when goal timing and liquidity reserve are clear"]
          ].map(([title, detail]) => (
            <article className="product-pathway-card compact" key={title}>
              <span>{title}</span>
              <strong>{detail}</strong>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Recommended Options for the Chen Family">
        <div className="gic-recommendation-grid">
          {recommendedGicOptions.map((option) => {
            const result = calculateGicProjection(option);
            return (
              <article className="gic-option-card" key={option.title}>
                <span>{option.title}</span>
                <h3>{option.gicType} {option.term} GIC</h3>
                <div className="option-facts">
                  <small>Suggested amount <strong>{formatCurrency(option.suggestedAmount)}</strong></small>
                  <small>Estimated return <strong>{formatCurrency(result.interest)}</strong></small>
                  <small>Maturity value <strong>{formatCurrency(result.maturityValue)}</strong></small>
                  <small>Liquidity <strong>{liquidityForScenario(option)}</strong></small>
                </div>
                <p>{option.why}</p>
                <button
                  className="secondary-button compact"
                  onClick={() =>
                    setScenario({
                      amount: option.suggestedAmount,
                      accountType: option.accountType,
                      gicType: option.gicType,
                      term: option.term,
                      payout: option.payout,
                      goal: option.goal
                    })
                  }
                >
                  View Scenario
                </button>
              </article>
            );
          })}
        </div>
      </Panel>

      <Panel title="Beyond GIC: Investment Suggestion Mix">
        <div className="investment-insight-grid">
          {[
            {
              text: "If principal is not large enough to make GIC interest meaningful, consider an advisor-reviewed balanced mutual fund pathway for longer-term goals.",
              source: "Cash-flow capacity + goal horizon",
              confidence: "Medium",
              action: "Compare fund pathways"
            },
            {
              text: "Short-term goals should preserve liquidity. A high-interest savings structure or cashable GIC may fit better than a locked 5-year product.",
              source: "Emergency reserve + caregiving reserve",
              confidence: "High",
              action: "Review liquidity reserve"
            },
            {
              text: "For Emma's education, a planned RESP withdrawal ladder can be paired with short GIC maturities and student banking education.",
              source: "Verified RESP + education timeline",
              confidence: "High",
              action: "Open education pathway"
            },
            {
              text: "For retirement, TFSA/RRSP contribution strategy and a managed portfolio conversation may matter more than one standalone GIC comparison.",
              source: "Contribution room + retirement goal",
              confidence: "Medium",
              action: "Book advisor review"
            }
          ].map((item) => (
            <article className="advisor-insight-card" key={item.text}>
              <Sparkles size={17} />
              <p>{item.text}</p>
              <div>
                <span>Data source: {item.source}</span>
                <span>Confidence: {item.confidence}</span>
                <span>Recommended action: {item.action}</span>
              </div>
              <button className="secondary-button compact">View pathway</button>
            </article>
          ))}
        </div>
      </Panel>

      <div className="two-column investment-analysis-grid">
        <Panel title="Projected Value Comparison">
          <p className="fineprint">Compare how different GIC structures may grow over the selected period.</p>
          <div className="comparison-chart">
            {comparisonScenarios.map((item) => (
              <div className={`comparison-bar ${item.type}`} key={item.label}>
                <span>{item.label}</span>
                <i style={{ height: `${Math.max(18, (item.value / maxComparison) * 100)}%` }} />
                <strong>{formatCurrency(item.value)}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Goal Fit Analysis">
          <div className="goal-fit-matrix">
            <div className="goal-fit-row header">
              <span>Family goal</span>
              <span>Cashable GIC</span>
              <span>Non-cashable GIC</span>
              <span>Escalating GIC</span>
            </div>
            {[
              ["Emergency reserve", "Strong fit", "Use caution", "Use caution"],
              ["Emma's education", "Good fit", "Strong fit", "Use caution"],
              ["Home upgrade", "Good fit", "Good fit", "Good fit"],
              ["Retirement", "Good fit", "Good fit", "Strong fit"],
              ["Caregiving reserve", "Strong fit", "Use caution", "Not recommended"]
            ].map((row) => (
              <div className="goal-fit-row" key={row[0]}>
                <strong>{row[0]}</strong>
                {row.slice(1).map((status) => (
                  <StatusChip key={status} status={status} />
                ))}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="AI Investment Insights">
        <div className="investment-insight-grid">
          {[
            {
              text: "Based on Emma's university timeline, a 1-2 year non-cashable GIC may fit better than a 5-year locked option.",
              source: "Verified CIBC data + self-reported ranges",
              confidence: "Medium",
              action: "Compare Education GIC Options"
            },
            {
              text: "Emergency reserve funds should remain flexible. Consider a cashable GIC or high-interest savings structure.",
              source: "Verified savings balance + household expense assumptions",
              confidence: "High",
              action: "Compare Liquidity Options"
            },
            {
              text: "Your TFSA contribution room may allow tax-efficient growth, but contribution limits should be confirmed.",
              source: "Verified CIBC data only + missing external context",
              confidence: "Medium",
              action: "Review TFSA Scenario"
            },
            {
              text: "Approximate external ranges can improve household liquidity recommendations without requiring exact balances.",
              source: "Verified CIBC data + optional shared ranges",
              confidence: "Medium",
              action: "Book Advisor Review"
            }
          ].map((item) => (
            <article className="advisor-insight-card" key={item.text}>
              <Sparkles size={17} />
              <p>{item.text}</p>
              <div>
                <span>Data source: {item.source}</span>
                <span>Confidence: {item.confidence}</span>
                <span>Recommended action: {item.action}</span>
              </div>
              <button className="secondary-button compact">Compare options</button>
            </article>
          ))}
        </div>
      </Panel>

      <div className="module-grid investment-account-summary">
        {[
          ["TFSA", "$42,000"],
          ["RRSP", "$126,000"],
          ["RESP", "$32,000"],
          ["Non-registered investments", "$58,000"],
          ["Risk profile", "Balanced growth"],
          ["Asset allocation", "63% equity / 37% income"],
          ["Contribution room", "$18,400"],
          ["Goal alignment", "74%"]
        ].map(([label, value]) => (
          <MetricTile key={label} label={label} value={value} />
        ))}
      </div>
      <Panel title="Current Family Investment Accounts">
        <DataTable headers={["Account", "Owner", "Family goal", "Balance", "Sharing status / permission"]} rows={rows} />
      </Panel>
      <div className="advisor-disclaimer">
        <AlertTriangle size={17} />
        <span>
          Projected returns are estimates based on illustrative prototype rates. RESP may allow joint original subscribers in some family situations,
          while TFSA, RRSP, FHSA, and RRIF are generally individual registered accounts. Actual rates, eligibility, tax treatment,
          ownership rules, and product suitability should be confirmed with a CIBC advisor.
        </span>
      </div>
    </ModulePage>
  );
}

function LegacyMap() {
  return (
    <ModulePage
      icon={ScrollText}
      kicker="Wealth & Legacy Map"
      title="Coordinate documents, beneficiaries, and wealth transfer"
      summary="A family asset map that makes legacy readiness visible without replacing advisor review."
      insight="Power of Attorney document missing for Grace."
      image={legacyImage}
      imageAlt="Secure folder and family legacy documents arranged on a table"
    >
      <div className="module-grid">
        {[
          ["Family asset map", "74% complete"],
          ["Beneficiary checklist", "Needs review"],
          ["Estate document checklist", "6 of 9 uploaded"],
          ["Will status", "Alex uploaded"],
          ["Power of Attorney status", "Grace missing"],
          ["Insurance policy list", "4 active"],
          ["Important contacts", "Advisor + lawyer"],
          ["Wealth transfer readiness", "Needs Review"]
        ].map(([label, value]) => (
          <MetricTile key={label} label={label} value={value} />
        ))}
      </div>
      <Panel title="Document Categories">
        <div className="tag-cloud">
          {["Will", "Power of Attorney", "Insurance policies", "Property documents", "Tax documents", "Care plan", "Funeral preferences optional"].map(
            (item) => (
              <span key={item}>{item}</span>
            )
          )}
        </div>
      </Panel>
      <div className="insight-row">
        <InsightText text="Beneficiary review recommended." />
        <InsightText text="Estate documents have not been updated in 3 years." />
      </div>
    </ModulePage>
  );
}

function DocumentsVault({ compact = false }: { compact?: boolean }) {
  const docs = [
    ["Wills", "2 files", "Verified owner uploaded"],
    ["POA", "1 missing", "Grace missing"],
    ["Insurance", "4 files", "Self-reported"],
    ["Property documents", "3 files", "Verified + uploaded"],
    ["University documents", "2 files", "Emma planning"],
    ["Lease agreements", "0 files", "Pending"],
    ["Care invoices", "7 files", "Caregiving Mode"],
    ["Tax documents", "5 files", "Private folder"]
  ];
  const content = (
    <>
      <button className="primary-button compact">
        <Upload size={17} /> Mock upload document
      </button>
      <Panel title="Vault">
        <DataTable headers={["Category", "Status", "Access note"]} rows={docs} />
      </Panel>
    </>
  );

  if (compact) return content;

  return (
    <ModulePage
      icon={FileText}
      kicker="Documents Vault"
      title="Secure family document list"
      summary="Organize important files by owner, goal, and permission level."
      insight="Upload Grace's POA to complete the caregiving readiness checklist."
    >
      {content}
    </ModulePage>
  );
}

function PermissionsPage({ compact = false }: { compact?: boolean }) {
  const columns = ["View balances", "View transactions", "Pay bills", "Transfer funds", "Manage documents", "Receive alerts", "Emergency access"];
  const content = (
    <>
      <div className="permission-actions">
        <button className="secondary-button">Request Access</button>
        <button className="primary-button compact">Grant Access</button>
        <button className="danger-button">Revoke Access</button>
      </div>
      <div className="permission-matrix">
        <div className="matrix-row header">
          <span>Family member</span>
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
        {familyMembers.map((member, rowIndex) => (
          <div className="matrix-row" key={member.name}>
            <strong>
              {member.name}
              <small>{member.access}</small>
            </strong>
            {columns.map((column, columnIndex) => (
              <Toggle key={column} label="" defaultChecked={(rowIndex + columnIndex) % 3 !== 0 && member.access !== "No Access"} />
            ))}
          </div>
        ))}
      </div>
      <div className="access-type-row">
        {["View Only", "Limited Actions", "Caregiver Mode", "Joint Account", "Emergency Access"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </>
  );

  if (compact) {
    return (
      <>
        <p className="fineprint">
          FamilyOS does not automatically grant control over another person's account. Access is consent-based,
          role-based, and revocable.
        </p>
        {content}
      </>
    );
  }

  return (
    <ModulePage
      icon={LockKeyhole}
      kicker="Permissions"
      title="Consent-based, role-based access"
      summary="FamilyOS does not automatically grant control over another person's account. Access is consent-based, role-based, and revocable."
      insight="Grace can grant or revoke access to care budget visibility at any time."
    >
      {content}
    </ModulePage>
  );
}

function AICoachPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const primaryMilestone = engineMilestones[0];
  const [selectedStageIndex, setSelectedStageIndex] = useState(5);
  const [revealedCount, setRevealedCount] = useState(lifeStageKnowledgeBase[5].opportunities.length);
  const [scanStatus, setScanStatus] = useState("Recommendations ready");
  const [scanning, setScanning] = useState(false);
  const [selectedMember, setSelectedMember] = useState(memberRoadmaps[2].member);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const selectedStage = lifeStageKnowledgeBase[selectedStageIndex];
  const activeMember = memberRoadmaps.find((member) => member.member === selectedMember) ?? memberRoadmaps[0];
  const visibleOpportunities = selectedStage.opportunities.slice(0, revealedCount);

  const selectStage = (index: number) => {
    setSelectedStageIndex(index);
    setRevealedCount(lifeStageKnowledgeBase[index].opportunities.length);
    setScanStatus("Recommendations ready");
    setScanning(false);
  };

  const runLifeStageScan = () => {
    setScanning(true);
    setRevealedCount(0);
    scanSteps.forEach((step, index) => {
      window.setTimeout(() => setScanStatus(step), index * 480);
    });
    selectedStage.opportunities.forEach((_, index) => {
      window.setTimeout(() => setRevealedCount(index + 1), 1650 + index * 260);
    });
    window.setTimeout(() => {
      setScanStatus("Recommendations ready");
      setScanning(false);
    }, 1650 + selectedStage.opportunities.length * 260 + 450);
  };

  return (
    <ModulePage
      icon={Sparkles}
      kicker="Life Stage Engine"
      title="Life-stage recommendations that know when to act"
      summary="FamilyOS helps families never miss the next important financial milestone by matching life stages to CIBC support pathways."
      insight="Families often miss opportunities not because CIBC products do not exist, but because they do not know the right moment to act."
    >
      <section className="detector-intro">
        <div>
          <span>Family milestone engine</span>
          <h2>Explore the next CIBC opportunity for every age and stage.</h2>
          <blockquote>
            CIBC FamilyOS doesn&rsquo;t wait for families to ask the right questions&mdash;it helps them discover what
            matters next.
          </blockquote>
          <p>
            It looks at family age stages, goals, accounts, and consent settings, then suggests the next helpful action.
          </p>
        </div>
        <div className="detector-visual-stack">
          <img src={onboardingImage} alt="Family reviewing milestones and financial next steps together" />
          <div className="detector-flow">
            {[
              ["1", "Review", "Family context"],
              ["2", "Detect", "Next milestone"],
              ["3", "Route", "Best action area"]
            ].map(([step, title, text]) => (
              <article key={title}>
                <span>{step}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="engine-focus-card">
        <div className="focus-copy">
          <span className="section-kicker">Next best action</span>
          <h2>{primaryMilestone.member}: {primaryMilestone.category}</h2>
          <p>{primaryMilestone.trigger}</p>
          <div className="focus-points">
            <span>Prepare student banking</span>
            <span>Review RESP withdrawals</span>
            <span>Plan first-year rent support</span>
          </div>
          <button className="primary-button compact" onClick={() => onNavigate(primaryMilestone.route)}>
            Open {primaryMilestone.module}
          </button>
        </div>
        <div className="focus-visual">
          <img src={primaryMilestone.image} alt={primaryMilestone.imageAlt} />
          <div>
            <strong>{primaryMilestone.when}</strong>
            <span>{primaryMilestone.confidence} confidence</span>
          </div>
        </div>
      </section>

      <section className="life-stage-explorer">
        <div className="card-title-row">
          <div>
            <span className="section-kicker">Explore Life Stage Opportunities</span>
            <h2>{selectedStage.stage}</h2>
            <p>
              Move across life stages to see what FamilyOS notices, why it matters, and how it routes the family to
              relevant CIBC support.
            </p>
          </div>
          <button className="primary-button compact" onClick={runLifeStageScan}>
            Run Life Stage Scan
          </button>
        </div>

        <div className="stage-slider-panel">
          <input
            aria-label="Life stage selector"
            type="range"
            min={0}
            max={lifeStageKnowledgeBase.length - 1}
            value={selectedStageIndex}
            onChange={(event) => selectStage(Number(event.target.value))}
            onInput={(event) => selectStage(Number(event.currentTarget.value))}
          />
          <div className="stage-chip-row">
            {lifeStageKnowledgeBase.map((stage, index) => (
              <button
                key={stage.stage}
                className={index === selectedStageIndex ? "active" : ""}
                onClick={() => selectStage(index)}
              >
                {stage.stage.split(":")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="scan-status">
          <div>
            <Sparkles size={18} />
            <strong>{scanStatus}</strong>
          </div>
          <span>{visibleOpportunities.length} of {selectedStage.opportunities.length} opportunities visible</span>
        </div>

        <div className="stage-detail-grid">
          <article className="stage-context-card">
            <span>Who it applies to</span>
            <strong>{selectedStage.appliesTo}</strong>
            <p>{selectedStage.why}</p>
            <div className="stage-meta-grid">
              <div>
                <small>Trigger</small>
                <b>{selectedStage.trigger}</b>
              </div>
              <div>
                <small>Advisor recommended</small>
                <b>{selectedStage.advisor ? "Yes" : "No"}</b>
              </div>
            </div>
          </article>

          <article className="stage-context-card">
            <span>Key risks</span>
            <div className="risk-chip-row">
              {selectedStage.risks.map((risk) => (
                <small key={risk}>{risk}</small>
              ))}
            </div>
            <span>Relevant CIBC support</span>
            <div className="support-chip-row">
              {selectedStage.products.map((product) => (
                <small key={product}>{product}</small>
              ))}
            </div>
          </article>
        </div>

        <div className="opportunity-engine-grid">
          {visibleOpportunities.map((opportunity, index) => (
            <button
              className={`engine-opportunity-card ${scanning ? "revealing" : ""}`}
              key={opportunity.title}
              onClick={() => setSelectedOpportunity(opportunity)}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span>{opportunity.type}</span>
              <h3>{opportunity.title}</h3>
              <p>{opportunity.why}</p>
              <div>
                <small>{opportunity.confidence} confidence</small>
                <small>{opportunity.support}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Panel title="How It Connects">
        <div className="context-chip-row" aria-label="Signals reviewed by the Life Stage Engine">
          <strong>Looks at</strong>
          {["Ages", "Relationships", "Goals", "Accounts", "Permissions", "Events"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="route-chip-grid">
          {actionAreas.slice(0, 5).map(([area, , trigger, route]) => (
            <button key={area} onClick={() => onNavigate(route as Route)}>
              <span>{trigger}</span>
              <strong>{area}</strong>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Member-Specific Roadmaps">
        <div className="member-roadmap-layout">
          <div className="roadmap-member-list">
            {memberRoadmaps.map((member) => (
              <button
                key={member.member}
                className={member.member === selectedMember ? "active" : ""}
                onClick={() => setSelectedMember(member.member)}
              >
                <span>{member.age}</span>
                <strong>{member.member}</strong>
                <small>{member.role}</small>
              </button>
            ))}
          </div>
          <div className="roadmap-detail-card">
            <img src={activeMember.image} alt={`${activeMember.member} roadmap`} />
            <div>
              <span className="section-kicker">{activeMember.member}</span>
              <h3>{activeMember.focus}</h3>
              <div className="roadmap-list">
                {activeMember.roadmap.map((item) => (
                  <button key={item.title} onClick={() => onNavigate(item.route)}>
                    <span>{item.timing}</span>
                    <strong>{item.title}</strong>
                    <small>{item.action}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Family Opportunity Timeline">
        <div className="full-stage-timeline">
          {lifeStageKnowledgeBase.map((stage, index) => (
            <button
              key={stage.stage}
              className={index === selectedStageIndex ? "active" : ""}
              onClick={() => selectStage(index)}
            >
              <span>{index + 1}</span>
              <strong>{stage.stage.split(":")[0]}</strong>
              <small>{stage.opportunities.length} opportunities</small>
            </button>
          ))}
        </div>
      </Panel>

      <section className="trust-mini-row">
        <article>
          <strong>Educational only</strong>
          <span>No automatic product decisions.</span>
        </article>
        <article>
          <strong>Consent-aware</strong>
          <span>Personal details stay permission-based.</span>
        </article>
        <article>
          <strong>Advisor-ready</strong>
          <span>Major decisions route to human review.</span>
        </article>
      </section>

      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          stage={selectedStage}
          onClose={() => setSelectedOpportunity(null)}
          onNavigate={onNavigate}
        />
      )}
    </ModulePage>
  );
}

function OpportunityModal({
  opportunity,
  stage,
  onClose,
  onNavigate
}: {
  opportunity: Opportunity;
  stage: LifeStage;
  onClose: () => void;
  onNavigate: (route: Route) => void;
}) {
  const noticed = [
    stage.trigger,
    `${stage.opportunities.length} related opportunities in this stage`,
    `${opportunity.confidence} confidence based on mock family context`
  ];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={opportunity.title}>
      <section className="opportunity-modal">
        <div className="modal-title-row">
          <div>
            <span>{stage.stage}</span>
            <h2>{opportunity.title}</h2>
          </div>
          <button className="ghost-button compact" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-grid">
          <article>
            <span>Trigger</span>
            <p>{stage.trigger}</p>
          </article>
          <article>
            <span>Why now</span>
            <p>{opportunity.why}</p>
          </article>
          <article>
            <span>What FamilyOS noticed</span>
            <ul>
              {noticed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>Recommended next steps</span>
            <ul>
              <li>{opportunity.action}</li>
              {stage.nextActions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="modal-support-card">
          <div>
            <strong>Related CIBC support</strong>
            <p>{opportunity.support}</p>
          </div>
          <div>
            <strong>Data used</strong>
            <p>Family profile age, active goals, verified CIBC context, and optional self-reported ranges where shared.</p>
          </div>
          <div>
            <strong>Confidence</strong>
            <p>{opportunity.confidence}</p>
          </div>
          <div>
            <strong>Consent / privacy note</strong>
            <p>{opportunity.consent}</p>
          </div>
        </div>

        <div className="advisor-disclaimer">
          <AlertTriangle size={17} />
          <span>Recommendations are educational and should be reviewed with a CIBC advisor for major decisions.</span>
        </div>

        <div className="modal-actions">
          <button className="secondary-button compact">Learn more</button>
          <button
            className="primary-button compact"
            onClick={() => {
              onClose();
              onNavigate(opportunity.route);
            }}
          >
            Open related module
          </button>
          <button className="secondary-button compact">Book advisor</button>
          <button className="ghost-button compact" onClick={onClose}>
            Remind me later
          </button>
        </div>
      </section>
    </div>
  );
}

function SettingsPage() {
  return (
    <ModulePage
      icon={Settings}
      kicker="Settings / Privacy"
      title="Data, consent, AI, and notifications"
      summary="Control what FamilyOS can use and how recommendations appear."
      insight="FamilyOS recommendations are informational and should be reviewed with a CIBC advisor for major financial decisions."
    >
      <Panel title="Self-Reported Family Context">
        <p>
          You can update, remove, or skip self-reported values at any time. These values are used to improve planning
          recommendations and are not verified by CIBC.
        </p>
        <div className="data-source-list">
          {selfReportedContext.map(([label, value]) => (
            <article key={label} className="data-source-row">
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>Shared by you, approximate range</small>
              </div>
              <div>
                <button className="secondary-button compact">Edit</button>
                <button className="ghost-button compact">Remove</button>
              </div>
            </article>
          ))}
        </div>
      </Panel>
      <div className="settings-grid">
        {[
          ["Data sources", "Verified CIBC accounts, uploaded documents, and optional family context shared by you"],
          ["Connected CIBC accounts", "Chequing, savings, mortgage, card, RESP, TFSA, RRSP"],
          ["Shared external ranges", "Approximate ranges for savings, investments, property, insurance, and liabilities"],
          ["Consent management", "Role-based sharing and revocable access"],
          ["AI recommendation settings", "Show data source, confidence, and context that can be added later"],
          ["Notification preferences", "Tasks, unusual activity, renewals, education timeline, care alerts"],
          ["Privacy disclaimer", "Recommendations are informational and require advisor review for major decisions"]
        ].map(([title, text]) => (
          <Panel key={title} title={title}>
            <p>{text}</p>
          </Panel>
        ))}
      </div>
    </ModulePage>
  );
}

function AccountsPage({ compact = false }: { compact?: boolean }) {
  const content = (
    <div className="module-grid">
      <MetricTile label="CIBC Chequing" value="$18,400" />
      <MetricTile label="CIBC Savings" value="$22,000" />
      <MetricTile label="CIBC Credit Card" value="$2,140 due" />
      <MetricTile label="CIBC Mortgage" value="$490,000" />
      <MetricTile label="CIBC RESP" value="$32,000" />
      <MetricTile label="CIBC TFSA" value="$42,000" />
      <MetricTile label="External investments range" value="Prefer not to say" />
      <MetricTile label="Property value range" value="$750K-$1M" />
      <MetricTile label="External assets estimate" value="$750K-$1M" />
      <MetricTile label="Liabilities estimate" value="$500K-$750K" />
    </div>
  );

  const ownershipRows = [
    ["CIBC Chequing", "Alex + Jamie", "Shared household visibility", "Joint Account Access"],
    ["CIBC Savings", "Alex", "Summary shared with Jamie", "Limited Actions"],
    ["CIBC Mortgage", "Alex + Jamie", "Shared obligation", "Joint Account Access"],
    ["Emma RESP", "Alex + Jamie", "Shared with parents", "Education goal"],
    ["Alex TFSA", "Alex", "Private, goal-linked only", "Goal visibility"],
    ["Jamie RRSP", "Jamie", "Summary shared", "Retirement goal"],
    ["CIBC Credit Card", "Alex", "Subscription-linked card", "Merchant controls enabled"]
  ];

  if (compact) {
    return (
      <>
        <Panel title="Shared Accounts & Ownership">
          <DataTable headers={["Account", "Owner", "Shared visibility", "Permission level"]} rows={ownershipRows} />
        </Panel>
        {content}
      </>
    );
  }

  return (
    <ModulePage
      icon={WalletCards}
      kicker="Accounts"
      title="Verified accounts and optional family context"
      summary="Combine a CIBC-verified view with approximate external ranges families choose to share."
      insight="Shared ranges are useful for planning but do not change ownership, permissions, or account access."
    >
      {content}
    </ModulePage>
  );
}

function GoalsPage() {
  return (
    <ModulePage
      icon={Gauge}
      kicker="Goals"
      title="Household goals across generations"
      summary="Track goals that cross account owners: education, housing, care, protection, retirement, and legacy."
      insight="Education and retirement are currently the most underfunded goals."
    >
      <div className="goal-grid">
        {[
          ["Emma university transition", 73],
          ["Mortgage renewal readiness", 68],
          ["Emergency fund target", 52],
          ["Grace care reserve", 61],
          ["Retirement confidence", 58],
          ["Estate readiness", 66]
        ].map(([label, value]) => (
          <div className="goal-card" key={label}>
            <h3>{label}</h3>
            <ProgressBar label="Progress" value={Number(value)} />
          </div>
        ))}
      </div>
    </ModulePage>
  );
}

function ReadinessMatrix({ compact = false }: { compact?: boolean }) {
  const items = compact ? readinessStatuses.filter(([label]) => !["Retirement", "Legacy"].includes(label)) : readinessStatuses;
  return (
    <div className={`readiness-matrix ${compact ? "compact" : ""}`}>
      {items.map(([label, status]) => (
        <div className="readiness-cell" key={label}>
          <span>{label}</span>
          <StatusChip status={String(status)} />
        </div>
      ))}
    </div>
  );
}

function PreviewCard({
  title,
  stats,
  route,
  onNavigate
}: {
  title: string;
  stats: string[][];
  route: Route;
  onNavigate: (route: Route) => void;
}) {
  return (
    <article className="preview-card">
      <div className="card-title-row">
        <h3>{title}</h3>
        <button className="secondary-button compact" onClick={() => onNavigate(route)}>
          Open
        </button>
      </div>
      <div className="preview-stat-list">
        {stats.map(([label, value]) => (
          <span key={label}>
            {label}
            <strong>{value}</strong>
          </span>
        ))}
      </div>
    </article>
  );
}

function ScenarioSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function RangeSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="range-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function StatusChip({ status }: { status: string }) {
  const normalized = status.toLowerCase().replace(/\s+/g, "-");
  return <small className={`status-chip ${normalized}`}>{status}</small>;
}

function StatusSummary({ title, text }: { title: string; text: string }) {
  return (
    <div className="status-summary">
      <SlidersHorizontal size={20} />
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function ModulePage({
  icon: Icon,
  kicker,
  title,
  summary,
  insight,
  image,
  imageAlt,
  children
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  summary: string;
  insight: string;
  image?: string;
  imageAlt?: string;
  children: ReactNode;
}) {
  return (
    <main className="module-page">
      <section className={`module-hero ${image ? "with-image" : ""}`}>
        <div className="module-hero-copy">
          <div className="module-icon">
            <Icon size={28} />
          </div>
          <div>
            <span>{kicker}</span>
            <h2>{title}</h2>
            <p>{summary}</p>
          </div>
        </div>
        {image && <img className="module-art" src={image} alt={imageAlt ?? ""} />}
      </section>
      <div className="ai-callout">
        <Sparkles size={18} />
        <strong>AI recommendation</strong>
        <span>{insight}</span>
      </div>
      {children}
    </main>
  );
}

function BrandMark() {
  return (
    <div className="brand">
      <div className="brand-icon">
        <Landmark size={19} />
      </div>
      <div>
        <strong>CIBC FamilyOS</strong>
        <span>Family opportunity command center</span>
      </div>
    </div>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="field">
      {label}
      <input defaultValue={value} type={type} />
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className={label ? "toggle-line" : "toggle-only"}>
      {label && <span>{label}</span>}
      <input type="checkbox" defaultChecked={defaultChecked} />
      <i />
    </label>
  );
}

function DataLabel({ type }: { type: "verified" | "reported" }) {
  return <span className={`data-label ${type}`}>{type === "verified" ? "Verified by CIBC" : "Shared by you"}</span>;
}

function MetricCard({ icon: Icon, title, value, caption }: { icon: LucideIcon; title: string; value: string; caption: string }) {
  return (
    <article className="metric-card">
      <Icon size={22} />
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{caption}</p>
    </article>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <article className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function MoneyStat({ label, value, badge, tone }: { label: string; value: number; badge?: string; tone?: "danger" }) {
  return (
    <div className="money-stat">
      <span>{label}</span>
      <strong className={tone}>{formatCurrency(value)}</strong>
      {badge && <small>{badge}</small>}
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  const status = value >= 75 ? "On track" : value >= 60 ? "Needs review" : "Action suggested";
  return (
    <div className="progress-line">
      <div>
        <span>{label}</span>
        <small>{status}</small>
      </div>
      <i>
        <b style={{ width: `${value}%` }} />
      </i>
    </div>
  );
}

function MiniChart() {
  return (
    <div className="mini-chart" aria-label="Net worth trend chart">
      {[42, 48, 54, 59, 64, 71, 78].map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

function CashFlowBars() {
  return (
    <div className="cash-bars">
      {[
        ["Income", 100],
        ["Expenses", 69],
        ["Savings", 14],
        ["Support", 10],
        ["Safe", 31]
      ].map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <i>
            <b style={{ width: `${value}%` }} />
          </i>
        </div>
      ))}
    </div>
  );
}

function InsightMini({ insight }: { insight: (typeof aiInsights)[number] }) {
  return (
    <article className="insight-mini">
      <span>{insight.category}</span>
      <p>{insight.body}</p>
    </article>
  );
}

function InsightText({ text }: { text: string }) {
  return (
    <div className="insight-text">
      <Sparkles size={16} />
      <span>{text}</span>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <div className="check-line">
      <CheckCircle2 size={17} />
      <span>{children}</span>
    </div>
  );
}

function MilestoneEngineSummary({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const topMilestone = engineMilestones[0];
  return (
    <section className="engine-summary">
      <div className="engine-summary-main">
        <div className="engine-badge">
          <Sparkles size={22} />
        </div>
        <div>
          <span>Life Stage Engine</span>
          <h2>One proactive layer connects every FamilyOS module.</h2>
          <p>
            The engine looks across ages, relationships, goals, CIBC accounts, permissions, and upcoming events, then
            turns them into clear next best actions.
          </p>
        </div>
      </div>
      <div className="engine-summary-action">
        <span>Top detected milestone</span>
        <strong>{topMilestone.member}: {topMilestone.category}</strong>
        <p>{topMilestone.nextAction}</p>
        <button className="secondary-button compact" onClick={() => onNavigate(topMilestone.route)}>
          Open {topMilestone.module}
        </button>
      </div>
    </section>
  );
}

function FamilyOSLayerMap({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const layers: Array<{ title: string; label: string; route: Route; icon: LucideIcon; items: string[] }> = [
    {
      title: "Layer 1",
      label: "Life Stage Engine",
      route: "ai",
      icon: Sparkles,
      items: ["Ages", "Goals", "Accounts", "Permissions", "Milestones"]
    },
    {
      title: "Layer 2",
      label: "Family Status",
      route: "planning",
      icon: Gauge,
      items: ["Education", "Housing", "Subscriptions", "Caregiving", "Protection"]
    },
    {
      title: "Layer 3",
      label: "Goal Evaluator",
      route: "investments",
      icon: PiggyBank,
      items: ["Cash flow", "Goals", "GIC", "Mutual funds", "Liquidity"]
    },
    {
      title: "Layer 4",
      label: "Family Admin",
      route: "family",
      icon: UsersRound,
      items: ["Members", "Ownership", "Permissions", "Documents"]
    }
  ];

  return (
    <section className="visual-panel">
      <div className="section-heading">
        <h2>How FamilyOS Thinks</h2>
        <p>A layered model where the Life Stage Engine detects the next milestone, then routes to the right action area.</p>
      </div>
      <div className="layer-map">
        {layers.map(({ title, label, route, icon: Icon, items }) => (
          <button className="layer-card" key={label} onClick={() => onNavigate(route)}>
            <span>{title}</span>
            <div>
              <Icon size={22} />
              <strong>{label}</strong>
            </div>
            <p>{items.join(" · ")}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function LifeStageMap({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <section className="visual-panel life-stage-panel">
      <div className="section-heading">
        <h2>Family Milestone Timeline</h2>
        <p>
          A simple timeline of who needs attention now, what is coming next, and how CIBC can help.
        </p>
      </div>
      <div className="family-opportunity-timeline">
        {lifeStageMoments.map(({ member, age, stage, timing, trigger, recommendation, pathway, cta, route, status, icon: Icon }) => (
          <article key={member}>
            <div className="timeline-age-badge">
              <span>{timing}</span>
              <strong>{age}</strong>
            </div>
            <div className="timeline-node">
              <Icon size={18} />
            </div>
            <div className="timeline-story-card">
              <div>
                <StatusChip status={status} />
                <small>{trigger}</small>
              </div>
              <h3>{member}</h3>
              <strong>{stage}</strong>
              <p>{trigger}</p>
              <em>{recommendation}</em>
              <div>
                <span>{pathway}</span>
                <button className="secondary-button compact" onClick={() => onNavigate(route)}>
                  {cta}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FamilyStatusVisual() {
  const statuses = [
    ["Education", "Needs Review", "64%"],
    ["Housing", "On Track", "86%"],
    ["Subscriptions", "Action", "2 trials"],
    ["Caregiving", "Action", "+18%"],
    ["Protection", "Review", "72%"]
  ];

  return (
    <section className="status-visual-panel">
      <div className="status-orbit" aria-label="Family status visual">
        <div className="orbit-core">
          <UsersRound size={24} />
          <strong>Chen Family</strong>
          <span>Current status</span>
        </div>
        {statuses.map(([label, status], index) => (
          <i key={label} className={`orbit-dot dot-${index + 1}`}>
            <span>{label}</span>
            <small>{status}</small>
          </i>
        ))}
      </div>
      <div className="status-legend-grid">
        {statuses.map(([label, status, metric]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{metric}</strong>
            <StatusChip status={status === "Action" ? "Action Recommended" : status} />
          </article>
        ))}
      </div>
    </section>
  );
}

function GoalCapabilityBridge() {
  const bridgeSteps: Array<[string, string, LucideIcon]> = [
    ["Cash Flow", "$3,860 available", CircleDollarSign],
    ["Goal Capacity", "Moderate readiness", Gauge],
    ["Product Mix", "GIC + fund pathway", PiggyBank],
    ["Advisor Review", "Suitability check", UsersRound]
  ];

  return (
    <section className="visual-panel">
      <div className="capability-bridge">
        {bridgeSteps.map(([title, detail, VisualIcon], index) => {
          return (
            <article key={title}>
              <div className="bridge-icon">
                <VisualIcon size={20} />
              </div>
              <span>Step {index + 1}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AIProductRoutingMap() {
  return (
    <section className="visual-panel">
      <div className="section-heading">
        <h2>From Family Milestone to CIBC Pathway</h2>
        <p>The assistant stays educational: it detects eligibility moments and routes to existing CIBC support.</p>
      </div>
      <div className="routing-map">
        {[
          ["Age 6 school start", "RESP goal refresh", "Money habits", "Parent prompt"],
          ["Age 12 habits", "Savings confidence", "Allowance goals", "FamilyOS"],
          ["Age 16 first job", "Payroll deposit", "Budget coaching", "Alerts"],
          ["Child turns 18", "Student banking", "Credit education", "Consent reset"],
          ["New baby", "RESP education", "Contribution plan", "Advisor"],
          ["Retirement age", "RRSP/RRIF education", "Income planning", "Advisor"]
        ].map(([trigger, path, action, destination]) => (
          <article key={trigger}>
            <span>{trigger}</span>
            <strong>{path}</strong>
            <p>{action}</p>
            <small>{destination}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function InternalTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange
}: {
  tabs: { id: T; label: string; icon: LucideIcon }[];
  activeTab: T;
  onTabChange: (id: T) => void;
}) {
  return (
    <div className="internal-tabs">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button key={id} className={activeTab === id ? "active" : ""} onClick={() => onTabChange(id)}>
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
}

function TimelineItem({
  label,
  date,
  status,
  detail,
  tone = "future",
  isLast
}: {
  label: string;
  date: string;
  status: string;
  detail: string;
  tone?: "active" | "review" | "future";
  isLast?: boolean;
}) {
  return (
    <div className={`timeline-item ${tone} ${isLast ? "last" : ""}`}>
      <div className="timeline-marker" aria-hidden="true">
        <i>{tone === "active" ? <CheckCircle2 size={16} /> : null}</i>
      </div>
      <div className="timeline-content">
        <div className="timeline-topline">
          <span className="timeline-date">
            <CalendarClock size={14} />
            {date}
          </span>
          <span className={`timeline-status ${tone}`}>{status}</span>
        </div>
        <strong>{label}</strong>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="data-table">
      <div className="table-row header" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
        {headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div className="table-row" key={index} style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
          {row.map((cell) => (
            <span key={cell}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function routeTitle(route: Route) {
  const titles: Partial<Record<Route, string>> = {
    overview: "Dashboard",
    insights: "Life Stage Engine",
    ai: "Life Stage Engine"
  };
  return titles[route] ?? navItems.find((item) => item.route === route)?.label ?? "Dashboard";
}

function routeFromAction(category: string, onNavigate: (route: Route) => void) {
  const routes: Record<string, Route> = {
    Education: "education",
    Housing: "housing",
    Caregiving: "caregiving",
    "Cash Flow": "cashflow",
    Subscriptions: "subscriptions",
    Investments: "investments",
    "Life Stage": "ai",
    Protection: "protection",
    "Wealth & Legacy": "legacy",
    Planning: "settings",
    Advisor: "settings",
    Family: "documents"
  };
  onNavigate(routes[category] ?? "dashboard");
}
