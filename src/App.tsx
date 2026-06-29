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
import { useEffect, useState } from "react";
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
  { route: "dashboard", label: "Home", icon: LayoutDashboard },
  { route: "ai", label: "Family Advisor", icon: Sparkles },
  { route: "family", label: "My Household", icon: UsersRound },
  { route: "planning", label: "Journeys", icon: Gauge },
  { route: "investments", label: "Product Learning", icon: PiggyBank },
  { route: "insights", label: "Advisor Summary", icon: ClipboardCheck },
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
  const [householdType, setHouseholdType] = useState("Multi-generation household");
  const [preparingFor, setPreparingFor] = useState("Education");
  const [comingSoon, setComingSoon] = useState("University");
  const [sharingComfort, setSharingComfort] = useState("Approximate ranges");
  const [scanStep, setScanStep] = useState(0);
  const [members, setMembers] = useState(familyMembers);
  const steps = [
    "Household",
    "Members",
    "Priorities",
    "Upcoming",
    "Comfort",
    "Scan"
  ];

  useEffect(() => {
    if (step !== 5) return;
    setScanStep(0);
    const interval = window.setInterval(() => {
      setScanStep((value) => Math.min(4, value + 1));
    }, 520);
    return () => window.clearInterval(interval);
  }, [step]);

  const scanItems = [
    "Understanding your household",
    "Finding upcoming moments",
    "Reviewing financial goals",
    "Matching CIBC support",
    "Preparing your first recommendation"
  ];

  const removeMember = (name: string) => setMembers((current) => current.filter((member) => member.name !== name));
  const addEmmaBack = () => {
    if (!members.some((member) => member.name === "Emma Chen")) {
      setMembers((current) => [...current, familyMembers[2]]);
    }
  };

  return (
    <main className="concierge-onboarding">
      <div className="onboarding-header">
        <BrandMark />
        <div>
          <span>Step {step + 1} of {steps.length}</span>
          <h1>Hi Alex. Let's get to know your household.</h1>
        </div>
      </div>
      <div className="concierge-stepper">
        {steps.map((item, index) => (
          <button key={item} className={index <= step ? "active" : ""} onClick={() => setStep(index)}>
            <span>{item}</span>
          </button>
        ))}
      </div>
      <section className="concierge-question-card">
        {step === 0 && (
          <div className="question-layout">
            <div>
              <span className="section-kicker">One person still counts as a household</span>
              <h2>Who is in your household?</h2>
              <p>This helps FamilyOS understand whether it should watch for individual, partner, child, or caregiving moments.</p>
              <ChoiceGrid
                value={householdType}
                onChange={setHouseholdType}
                options={["Just me", "Couple", "Family with children", "Multi-generation household", "Custom"]}
              />
            </div>
            <SmallIllustration image={onboardingImage} caption="Family context helps recommendations feel relevant." />
          </div>
        )}
        {step === 1 && (
          <div>
            <span className="section-kicker">Your household members</span>
            <h2>Does this look right?</h2>
            <p>You can edit this later. FamilyOS uses roles and ages to notice upcoming moments, not to judge anyone.</p>
            <div className="simple-member-list">
              {members.map((member) => (
                <article key={member.name}>
                  <div className="member-avatar">{member.name.split(" ").map((part) => part[0]).join("")}</div>
                  <div>
                    <strong>{member.name}</strong>
                    <span>{member.age}, {member.relationship}</span>
                  </div>
                  <button className="ghost-button compact" onClick={() => removeMember(member.name)}>Remove</button>
                </article>
              ))}
            </div>
            <div className="onboarding-inline-actions">
              <button className="secondary-button compact" onClick={addEmmaBack}>Add Emma back</button>
              <button className="secondary-button compact">Add someone else</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="question-layout">
            <div>
              <span className="section-kicker">Household priorities</span>
              <h2>What is your household preparing for?</h2>
              <p>Choose the closest answer. If you are not sure, FamilyOS can guide you.</p>
              <ChoiceGrid
                value={preparingFor}
                onChange={setPreparingFor}
                options={["Education", "Home / mortgage", "Retirement", "Caregiving", "Emergency fund", "Learning about investing", "Not sure yet"]}
              />
            </div>
            <SmallIllustration image={educationImage} caption="A clear priority gives the concierge one place to start." />
          </div>
        )}
        {step === 3 && (
          <div>
            <span className="section-kicker">Upcoming moments</span>
            <h2>Is anything important coming up soon?</h2>
            <p>FamilyOS will use this as a gentle reminder layer, not a deadline.</p>
            <ChoiceGrid
              value={comingSoon}
              onChange={setComingSoon}
              options={["University", "First job", "Buying a home", "Mortgage renewal", "Caring for parent", "Retirement", "No major event right now"]}
            />
          </div>
        )}
        {step === 4 && (
          <div className="question-layout">
            <div>
              <span className="section-kicker">Privacy first</span>
              <h2>How much financial context are you comfortable sharing?</h2>
              <p>You can skip anything. More context helps FamilyOS give more relevant guidance, but you stay in control.</p>
              <ChoiceGrid value={sharingComfort} onChange={setSharingComfort} options={["Exact numbers", "Approximate ranges", "Skip for now"]} />
              <div className="trust-chip-row">
                {["Optional", "Editable anytime", "Consent-based", "Used for planning only"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <SmallIllustration image={caregivingImage} caption="FamilyOS explains what it uses and why." />
          </div>
        )}
        {step === 5 && (
          <div className="scan-finish-layout">
            <div>
              <span className="section-kicker">Household scan</span>
              <h2>Here is what I found.</h2>
              <p>You do not need to think about everything today. Let's start with one thing.</p>
              <div className="scan-list">
                {scanItems.map((item, index) => (
                  <div className={index <= scanStep ? "complete" : ""} key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="first-recommendation-card">
              <Sparkles size={24} />
              <span>First recommendation</span>
              <h3>Emma starts university in about 10 months.</h3>
              <p>FamilyOS can walk you through tuition, rent, RESP timing, student banking, and questions for an advisor.</p>
            </div>
          </div>
        )}
      </section>
      <div className="onboarding-actions">
        <button className="secondary-button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>
          Back
        </button>
        {step < steps.length - 1 ? (
          <button className="primary-button" onClick={() => setStep(step + 1)}>
            Continue
          </button>
        ) : (
          <button className="primary-button" onClick={() => onNavigate("dashboard")}>
            Enter FamilyOS
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
      return <MyHouseholdPage activeTab={familySubRoute} onTabChange={setFamilySubRoute} onNavigate={onNavigate} />;
    case "planning":
      return <JourneysPage onNavigate={onNavigate} />;
    case "investments":
      return <ProductLearningPage onNavigate={onNavigate} />;
    case "ai":
      return <FamilyAdvisorPage onNavigate={onNavigate} />;
    case "insights":
      return <AdvisorSummaryPage onNavigate={onNavigate} />;
    case "settings":
      return <SettingsPage />;
    default:
      return <DashboardPage onNavigate={onNavigate} />;
  }
}

function DashboardPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const upcomingMoments = [
    ["4 days", "Subscription trials convert", "Set a cap or cancel before charges begin.", "subscriptions"],
    ["This quarter", "Grace care review", "Review permissioned care spending and fraud alerts.", "caregiving"],
    ["10 months", "Emma university", "Prepare tuition, rent, RESP, and student banking.", "ai"],
    ["14 months", "Mortgage renewal", "Start gathering renewal questions and rate scenarios.", "housing"]
  ] as const;

  return (
    <main className="concierge-home">
      <section className="home-priority-card">
        <div className="home-priority-copy">
          <span className="section-kicker">Today's household scan</span>
          <h2>Good afternoon, Alex.</h2>
          <p>I reviewed your household today. Here's what I'd recommend working on.</p>
        </div>
        <div className="primary-recommendation-card">
          <div>
            <span>Primary recommendation</span>
            <h3>Emma starts university in 10 months.</h3>
            <p>FamilyOS noticed an active RESP, an education goal, and a funding review still to complete.</p>
          </div>
          <div className="recommendation-progress">
            <ProgressBar label="Journey progress" value={35} />
            <strong>Next step: Review RESP funding</strong>
          </div>
          <button className="primary-button" onClick={() => onNavigate("ai")}>
            Continue Journey
          </button>
        </div>
      </section>

      <section className="concierge-section compact-continuity">
        <div>
          <span className="section-kicker">Continue current journey</span>
          <h2>Emma University Journey</h2>
          <p>Current stage: Review available funding. Next: learn short-term CIBC options in plain language.</p>
        </div>
        <button className="secondary-button" onClick={() => onNavigate("ai")}>
          Resume
        </button>
      </section>

      <section className="concierge-section">
        <div className="section-heading">
          <h2>Other household opportunities</h2>
          <p>These are secondary. FamilyOS will bring them forward when they become the next best action.</p>
        </div>
        <div className="secondary-opportunity-list">
          {upcomingMoments.map(([time, title, detail, route]) => (
            <button key={title} onClick={() => onNavigate(route as Route)}>
              <span>{time}</span>
              <div>
                <strong>{title}</strong>
                <small>{detail}</small>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </section>

      <section className="concierge-section saved-plan-panel">
        <div className="section-heading">
          <h2>Completed and saved plans</h2>
          <p>Progress you can return to before an advisor conversation.</p>
        </div>
        <div className="saved-plan-list">
          {[
            ["Education plan", "Draft saved today"],
            ["Subscription cleanup", "2 trials to review"],
            ["Care plan", "Grace alert pending"]
          ].map(([title, detail]) => (
            <article key={title}>
              <CheckCircle2 size={17} />
              <div>
                <strong>{title}</strong>
                <span>{detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function FamilyAdvisorPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const [selectedPrompt, setSelectedPrompt] = useState("Prepare Emma for university");
  const prompts = [
    "Prepare Emma for university",
    "Review Grace's care plan",
    "Understand investment options",
    "Plan for mortgage renewal",
    "Improve household cash flow",
    "I'm not sure - guide me"
  ];

  return (
    <main className="family-advisor-page">
      <section className="advisor-welcome-card advisor-next-step-card">
        <div>
          <span className="section-kicker">Family Advisor</span>
          <h2>Let's continue Emma's university journey.</h2>
          <p>FamilyOS recommends starting here because university is the next major household moment.</p>
          <button className="primary-button" onClick={() => setSelectedPrompt("Prepare Emma for university")}>Continue recommended journey</button>
        </div>
        <SmallIllustration image={onboardingImage} caption="A guided place to work through household decisions." />
      </section>

      <div className="section-heading secondary-choice-heading">
        <h2>Need a different focus?</h2>
        <p>These are available, but FamilyOS will keep Emma's journey as today's primary path.</p>
      </div>
      <section className="advisor-prompt-grid">
        {prompts.map((prompt) => (
          <button key={prompt} className={selectedPrompt === prompt ? "active" : ""} onClick={() => setSelectedPrompt(prompt)}>
            <Sparkles size={18} />
            <span>{prompt}</span>
          </button>
        ))}
      </section>

      {selectedPrompt === "Prepare Emma for university" ? (
        <EmmaUniversityJourney onNavigate={onNavigate} />
      ) : (
        <section className="concierge-placeholder">
          <span className="section-kicker">Guided journey</span>
          <h2>{selectedPrompt}</h2>
          <p>FamilyOS will walk through this one step at a time. For the demo, the strongest complete path is Emma's university journey.</p>
          <button className="primary-button" onClick={() => setSelectedPrompt("Prepare Emma for university")}>
            Open Emma University Journey
          </button>
        </section>
      )}
    </main>
  );
}

function EmmaUniversityJourney({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const [journeyStep, setJourneyStep] = useState(0);
  const steps = [
    "Understand situation",
    "Estimate first-year cost",
    "Review funding",
    "Learn CIBC options",
    "Compare strategies",
    "AI summary",
    "Save / advisor"
  ];
  const costRows = [
    ["Tuition", "$12,500"],
    ["Rent", "$13,800"],
    ["Books", "$1,200"],
    ["Food / transport / personal", "$10,200"],
    ["One-time setup costs", "$1,800"]
  ];
  const fundingRows = [
    ["RESP balance", "$32,000"],
    ["Available monthly cash flow", "$3,860"],
    ["Parent support plan", "$850/month"],
    ["Estimated first-year gap", "$7,800"]
  ];

  return (
    <section className="emma-journey">
      <div className="journey-intro">
        <div>
          <span className="section-kicker">Emma University Journey</span>
          <h2>Emma starts university in about 10 months.</h2>
          <p>Let's make this easier by walking through one step at a time.</p>
        </div>
        <SmallIllustration image={educationImage} caption="Education planning becomes easier when it is broken into small steps." />
      </div>

      <div className="journey-progress">
        {steps.map((stepLabel, index) => (
          <button key={stepLabel} className={index === journeyStep ? "active" : index < journeyStep ? "complete" : ""} onClick={() => setJourneyStep(index)}>
            <span>{index + 1}</span>
            {stepLabel}
          </button>
        ))}
      </div>

      <article className="journey-step-card">
        {journeyStep === 0 && (
          <>
            <h3>Step 1: Understand the situation</h3>
            <p>FamilyOS noticed Emma's age, the university timeline, an active RESP, and an incomplete rent budget.</p>
            <div className="journey-fact-grid">
              {[
                ["Emma", "17, daughter"],
                ["Timeline", "University in about 10 months"],
                ["RESP", "$32,000"],
                ["Student banking", "Not yet reviewed"],
                ["Rent budget", "Not completed"]
              ].map(([label, value]) => (
                <MetricTile key={label} label={label} value={value} />
              ))}
            </div>
          </>
        )}
        {journeyStep === 1 && (
          <>
            <h3>Step 2: Estimate first-year cost</h3>
            <p>These are planning estimates, not commitments. You can adjust them later.</p>
            <DataTable headers={["Cost area", "Estimate"]} rows={costRows} />
          </>
        )}
        {journeyStep === 2 && (
          <>
            <h3>Step 3: Review available funding</h3>
            <p>FamilyOS compares available funding with near-term liquidity so tuition planning does not weaken emergency cash.</p>
            <DataTable headers={["Funding source", "Planning value"]} rows={fundingRows} />
          </>
        )}
        {journeyStep === 3 && (
          <>
            <h3>Step 4: Learn relevant CIBC options</h3>
            <p>Before comparing strategies, FamilyOS explains products in plain language.</p>
            <ProductLearningGrid compact />
          </>
        )}
        {journeyStep === 4 && (
          <>
            <h3>Step 5: Compare possible strategies</h3>
            <p>Explore trade-offs between liquidity, principal protection, and market uncertainty.</p>
            <button className="primary-button" onClick={() => onNavigate("investments")}>
              Open Product Learning & Strategy Builder
            </button>
          </>
        )}
        {journeyStep === 5 && (
          <>
            <h3>Step 6: AI Summary</h3>
            <div className="advisor-summary-plain">
              <strong>Recommended educational path</strong>
              <p>Start with RESP withdrawal review, student banking setup, and a short-term savings strategy that preserves liquidity.</p>
              <strong>Key risks</strong>
              <p>Rent could be higher than expected, market-linked products may not fit near-term tuition timing, and advisor review is needed before product decisions.</p>
              <strong>Questions for advisor</strong>
              <p>RESP withdrawal timing, whether a cashable or non-redeemable GIC fits, and how much parent support should be automated.</p>
            </div>
          </>
        )}
        {journeyStep === 6 && (
          <>
            <h3>Step 7: Save and prepare for advisor review</h3>
            <p>Nice work. Emma's education plan is clearer now.</p>
            <div className="advisor-action-row">
              <button className="primary-button">Save this plan</button>
              <button className="secondary-button" onClick={() => onNavigate("insights")}>Open Advisor Summary</button>
              <button className="secondary-button">Share with household member</button>
              <button className="ghost-button" onClick={() => onNavigate("dashboard")}>Return home</button>
            </div>
          </>
        )}
        <div className="journey-step-actions">
          <button className="secondary-button compact" disabled={journeyStep === 0} onClick={() => setJourneyStep(Math.max(0, journeyStep - 1))}>
            Back
          </button>
          <button className="primary-button compact" disabled={journeyStep === steps.length - 1} onClick={() => setJourneyStep(Math.min(steps.length - 1, journeyStep + 1))}>
            Continue
          </button>
        </div>
      </article>
    </section>
  );
}

function JourneysPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const moments = [
    ["Now", "Emma University", "Review RESP funding", "35%", "Continue", "ai"],
    ["4 days", "Subscription trials", "Set cap or cancel before charges begin", "20%", "Review", "subscriptions"],
    ["This quarter", "Grace Care", "Confirm unusual activity and care permissions", "55%", "Review", "caregiving"],
    ["14 months", "Mortgage Renewal", "Prepare renewal questions and rate scenarios", "18%", "Plan", "housing"],
    ["Long term", "Retirement and Legacy", "Review documents and beneficiary readiness", "12%", "Preview", "family"]
  ] as const;

  return (
    <main className="module-page journey-page">
      <section className="module-hero with-image">
        <div className="module-hero-copy">
          <div className="module-icon"><Sparkles size={28} /></div>
          <div>
            <span>Household Moments</span>
            <h2>FamilyOS noticed these moments in your household.</h2>
            <p>Life stages are not always age-based. FamilyOS uses age, goals, accounts, events, and permissions as signals.</p>
          </div>
        </div>
        <img className="module-art" src={onboardingImage} alt="Family reviewing household moments" />
      </section>
      <section className="family-journey-timeline-card">
        <div className="section-heading">
          <h2>Your household journey</h2>
          <p>FamilyOS prioritizes the next moment, then keeps upcoming moments in sequence.</p>
        </div>
        <div className="family-journey-timeline">
          {moments.map(([time, title, nextStep, progress, cta, route], index) => (
            <article className={index === 0 ? "active" : ""} key={title}>
              <div className="timeline-marker">
                <span>{index + 1}</span>
              </div>
              <div className="timeline-content">
                <small>{time}</small>
                <h3>{title}</h3>
                <p>Next milestone: {nextStep}</p>
                <ProgressBar label="Progress" value={Number(progress.replace("%", ""))} />
              </div>
              <button className={index === 0 ? "primary-button compact" : "secondary-button compact"} onClick={() => onNavigate(route as Route)}>
                {cta}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductLearningPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const [showStrategyBuilder, setShowStrategyBuilder] = useState(false);
  return (
    <main className="product-learning-page">
      <section className="strategy-builder-entry primary-learning-entry">
        <div>
          <span className="section-kicker">Strategy Builder</span>
          <h2>Ready to compare financial strategies?</h2>
          <p>Let's build one together for Emma's education timeline, then prepare questions for advisor review.</p>
        </div>
        <button className="primary-button" onClick={() => setShowStrategyBuilder(!showStrategyBuilder)}>
          {showStrategyBuilder ? "Hide Strategy Builder" : "Start Strategy Builder"}
        </button>
      </section>
      {showStrategyBuilder && <GoalAdvisorConversation />}

      <section className="product-learning-conversation">
        <div>
          <span className="section-kicker">Product Learning</span>
          <h2>What would you like to understand today?</h2>
          <p>Open one topic at a time. FamilyOS explains products in plain language, not as a product catalogue.</p>
        </div>
        <SmallIllustration image={legacyImage} caption="Learn only what you need for the next decision." />
      </section>

      <ProductLearningGrid />
      <div className="advisor-action-row">
        <button className="secondary-button" onClick={() => onNavigate("ai")}>Return to Family Advisor</button>
      </div>
    </main>
  );
}

function ProductLearningGrid({ compact = false }: { compact?: boolean }) {
  const [openProduct, setOpenProduct] = useState("RESP");
  const products = [
    {
      name: "RESP",
      question: "How does education savings help?",
      what: "A registered plan designed to help families save for post-secondary education.",
      goodFor: "Education planning and grant conversations.",
      watchOut: "Withdrawal timing, grant treatment, and beneficiary rules need review.",
      returns: "Contribution rhythm, investment choice, grants, and timing.",
      support: "RESP review and advisor conversation"
    },
    {
      name: "Student Banking",
      question: "When should Emma start banking independently?",
      what: "Everyday banking support for student life, spending, and account ownership.",
      goodFor: "Preparing debit, direct deposit, rent, and spending habits.",
      watchOut: "Privacy and parent visibility should reset as account ownership changes.",
      returns: "Not an investment product; value comes from habit-building and account readiness.",
      support: "Student banking setup"
    },
    {
      name: "Cashable GIC",
      question: "What if we need access to the money?",
      what: "A lower-return savings option that may offer easier access than locked GICs.",
      goodFor: "Short-term goals and emergency liquidity.",
      watchOut: "Usually lower return than locked options.",
      returns: "Interest rates, term length, and cashability.",
      support: "Short-term savings option review"
    },
    {
      name: "Non-redeemable GIC",
      question: "When does locking in make sense?",
      what: "A predictable fixed-return option where funds are generally locked until maturity.",
      goodFor: "Known timelines where money is not needed early.",
      watchOut: "Less flexibility if tuition, rent, or emergencies arrive sooner.",
      returns: "Term length, rate environment, and maturity timing.",
      support: "GIC term comparison"
    },
    {
      name: "Market Linked GIC",
      question: "Can we keep principal protection with market upside?",
      what: "A principal-protected product with return linked to market performance if held to maturity.",
      goodFor: "Longer timelines where upside is useful and uncertainty is understood.",
      watchOut: "Return is uncertain and product details matter.",
      returns: "Underlying index performance, term, participation rules, and caps.",
      support: "Advisor-reviewed product suitability"
    },
    {
      name: "TFSA",
      question: "Where does flexible tax-efficient saving fit?",
      what: "A registered account where growth may be tax-free, subject to contribution room.",
      goodFor: "Eligible adults and medium-term savings.",
      watchOut: "Contribution room and ownership must be confirmed.",
      returns: "Product held inside the TFSA, time horizon, and market conditions.",
      support: "Contribution room and account review"
    },
    {
      name: "Mutual Funds",
      question: "What if the goal is longer-term growth?",
      what: "Professionally managed diversified investments.",
      goodFor: "Longer-term goals with tolerance for market movement.",
      watchOut: "Market value can move up or down and suitability matters.",
      returns: "Market performance, fund mix, fees, and time horizon.",
      support: "Risk profile and advisor review"
    },
    {
      name: "Portfolio Solutions",
      question: "Can we use a managed all-in-one option?",
      what: "Managed portfolio solutions using funds and/or ETFs.",
      goodFor: "Diversified long-term planning.",
      watchOut: "Risk profile, fees, and suitability should be reviewed.",
      returns: "Asset mix, market performance, rebalancing, and time horizon.",
      support: "Portfolio suitability conversation"
    }
  ];
  const visibleProducts = compact ? products.slice(0, 6) : products;

  if (compact) {
    return (
      <div className="product-learning-grid compact-learning">
        {visibleProducts.map((product) => (
          <article key={product.name}>
            <span>{product.name}</span>
            <p>{product.what}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="product-accordion">
      {visibleProducts.map((product) => (
        <article className={openProduct === product.name ? "open" : ""} key={product.name}>
          <button onClick={() => setOpenProduct(openProduct === product.name ? "" : product.name)}>
            <div>
              <span>{product.name}</span>
              <strong>{product.question}</strong>
            </div>
            <ChevronRight size={18} />
          </button>
          {openProduct === product.name && (
            <div className="product-accordion-body">
              <div>
                <strong>What is it?</strong>
                <p>{product.what}</p>
              </div>
              <div>
                <strong>Good for</strong>
                <p>{product.goodFor}</p>
              </div>
              <div>
                <strong>Watch out for</strong>
                <p>{product.watchOut}</p>
              </div>
              <div>
                <strong>What affects returns</strong>
                <p>{product.returns}</p>
              </div>
              <div>
                <strong>Related CIBC support</strong>
                <p>{product.support}</p>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function AdvisorSummaryPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <main className="advisor-summary-page">
      <section className="advisor-ready-card">
        <div>
          <span className="section-kicker">Advisor Summary</span>
          <h2>Emma University Preparation</h2>
          <p>This summary helps the Chen family arrive at an advisor conversation more prepared.</p>
        </div>
        <SmallIllustration image={educationImage} caption="A clearer plan means a better conversation." />
      </section>
      <div className="advisor-summary-grid">
        <Panel title="Household">
          <p>Chen Family: Alex, Jamie, Emma, Ethan, and Grace.</p>
        </Panel>
        <Panel title="Main topic">
          <p>Emma starts university in about 10 months.</p>
        </Panel>
        <Panel title="What FamilyOS reviewed">
          <ul className="task-list">
            {["University timeline", "RESP balance", "Estimated first-year cost", "Household cash flow", "Liquidity preference", "Relevant CIBC product options"].map((item) => (
              <li key={item}><CheckCircle2 size={16} />{item}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="What the family may want to discuss">
          <ul className="task-list">
            {["RESP withdrawal timing", "Student banking", "Short-term savings options", "Whether advisor-reviewed products fit the timeline", "Parent support plan"].map((item) => (
              <li key={item}><CheckCircle2 size={16} />{item}</li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="advisor-action-row">
        <button className="primary-button">Book advisor</button>
        <button className="secondary-button">Save summary</button>
        <button className="secondary-button" onClick={() => onNavigate("dashboard")}>Return home</button>
      </div>
    </main>
  );
}

function MyHouseholdPage({
  activeTab,
  onTabChange,
  onNavigate
}: {
  activeTab: FamilySubRoute;
  onTabChange: (subRoute: FamilySubRoute) => void;
  onNavigate: (route: Route) => void;
}) {
  return <FamilyAdminPage activeTab={activeTab} onTabChange={onTabChange} onNavigate={onNavigate} />;
}

function FamilyAdminPage({
  activeTab,
  onTabChange,
  onNavigate
}: {
  activeTab: FamilySubRoute;
  onTabChange: (subRoute: FamilySubRoute) => void;
  onNavigate: (route: Route) => void;
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
      kicker="My Household"
      title="What is happening across your family"
      summary="FamilyOS starts with the household journey, then keeps ownership, permissions, and documents available when they matter."
      insight="Access still stays consent-based. FamilyOS can explain household moments without exposing private transactions or granting account control."
    >
      <HouseholdTimeline onNavigate={onNavigate} />
      <section className="household-admin-lower">
        <div className="section-heading">
          <h2>Household controls</h2>
          <p>Permissions, ownership, and documents stay available below the timeline.</p>
        </div>
      <InternalTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "members" && <FamilyMembersAdmin />}
      {activeTab === "accounts" && <AccountsPage compact />}
      {activeTab === "permissions" && <PermissionsPage compact />}
      {activeTab === "documents" && <DocumentsVault compact />}
      </section>
    </ModulePage>
  );
}

function HouseholdTimeline({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const householdTracks = [
    {
      name: "Emma",
      age: 17,
      route: "ai" as Route,
      steps: ["University", "Student Banking", "Credit Building", "FHSA", "Career"]
    },
    {
      name: "Grace",
      age: 72,
      route: "caregiving" as Route,
      steps: ["Care Planning", "Fraud Protection", "POA", "Estate Review"]
    },
    {
      name: "Alex",
      age: 42,
      route: "housing" as Route,
      steps: ["Mortgage Renewal", "Caregiving Support", "Retirement Review"]
    },
    {
      name: "Ethan",
      age: 11,
      route: "education" as Route,
      steps: ["Money Habits", "Allowance", "First Debit", "First Job"]
    }
  ];

  return (
    <section className="household-timeline-panel">
      <div className="section-heading with-action">
        <div>
          <h2>Household Timeline</h2>
          <p>See what each family member is moving toward before opening permissions or admin details.</p>
        </div>
        <button className="primary-button" onClick={() => onNavigate("ai")}>View Emma Timeline</button>
      </div>
      <div className="member-timeline-list">
        {householdTracks.map((track) => (
          <article key={track.name}>
            <div className="member-timeline-person">
              <strong>{track.name}</strong>
              <span>{track.age}</span>
            </div>
            <div className="member-timeline-steps">
              {track.steps.map((step, index) => (
                <div className={index === 0 ? "active" : ""} key={step}>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <button className="secondary-button compact" onClick={() => onNavigate(track.route)}>Continue</button>
          </article>
        ))}
      </div>
    </section>
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

type AdvisorGoalId = "education" | "home" | "retirement" | "protection" | "emergency" | "growth";
type AdvisorPreference = "High" | "Balanced" | "Low";
type AdvisorRisk = "Conservative" | "Balanced" | "Growth";
type StrategyName = "Conservative" | "Balanced" | "Growth";
type AdvisorProductId = "cashable" | "noncashable" | "fund" | "portfolio";
type ConversationStep = "recommend" | "customize" | "compare" | "scenario" | "action";
type ConversationProductId =
  | "bonusGic"
  | "flexibleGic"
  | "variableGic"
  | "easyBuilder"
  | "marketLinkedGic"
  | "ppn"
  | "mutualFunds"
  | "etfs"
  | "portfolioSolutions";
type ConversationProductShape =
  | "fixed"
  | "flexible"
  | "variable"
  | "ladder"
  | "marketLinked"
  | "protectedNote"
  | "mutualFund"
  | "etf"
  | "portfolio";
type MarketOutlook = "conservative" | "base" | "optimistic" | "custom";
type RateEnvironment = "similar" | "moderate" | "increase" | "decrease" | "custom";

function Investments() {
  return <GoalAdvisorExperience />;

  const goalOptions: Array<{
    id: AdvisorGoalId;
    title: string;
    description: string;
    icon: LucideIcon;
    context: string;
    focus: string;
  }> = [
    {
      id: "education",
      title: "Education",
      description: "Plan tuition, RESP withdrawals, rent, student banking, and parent support.",
      icon: GraduationCap,
      context: "Emma is expected to begin university within 10 months.",
      focus: "Preserve liquidity while closing the first-year funding gap."
    },
    {
      id: "home",
      title: "Home Purchase",
      description: "Compare down payment timing, mortgage readiness, renewal pressure, and reserves.",
      icon: Home,
      context: "The Chen household has a mortgage renewal window approaching in 14 months.",
      focus: "Keep housing plans flexible while protecting family cash flow."
    },
    {
      id: "retirement",
      title: "Retirement",
      description: "Review RRSP/TFSA momentum, retirement timeline, income planning, and advisor fit.",
      icon: CalendarClock,
      context: "Alex and Jamie are in peak responsibility years with education and caregiving overlap.",
      focus: "Balance retirement contributions with near-term family obligations."
    },
    {
      id: "protection",
      title: "Family Protection",
      description: "Review insurance, beneficiaries, disability coverage, and family risk gaps.",
      icon: HeartPulse,
      context: "Mortgage, dependents, and caregiving responsibilities create protection needs.",
      focus: "Confirm coverage before a family transition creates avoidable risk."
    },
    {
      id: "emergency",
      title: "Emergency Fund",
      description: "Plan safe cash reserves for care needs, subscriptions, housing, and family surprises.",
      icon: ShieldCheck,
      context: "Emergency reserve covers about 2.1 months of household expenses.",
      focus: "Improve resilience without locking away money needed soon."
    },
    {
      id: "growth",
      title: "Long-term Growth",
      description: "Compare GIC, TFSA, RRSP, managed portfolio, and goal-aligned investment pathways.",
      icon: PiggyBank,
      context: "The family has registered and non-registered savings connected to several goals.",
      focus: "Match time horizon, liquidity, risk, and tax treatment to the right pathway."
    }
  ];
  const scanSteps = [
    "Household cash flow",
    "Existing CIBC accounts",
    "Family goals",
    "Life Stage recommendations",
    "Liquidity needs",
    "Product eligibility",
    "Time horizon"
  ];
  const [selectedGoalId, setSelectedGoalId] = useState<AdvisorGoalId | null>(null);
  const [scanRunning, setScanRunning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(25000);
  const [investmentHorizon, setInvestmentHorizon] = useState(2);
  const [liquidityPreference, setLiquidityPreference] = useState<AdvisorPreference>("Balanced");
  const [riskPreference, setRiskPreference] = useState<AdvisorRisk>("Balanced");
  const [activeStrategy, setActiveStrategy] = useState<StrategyName>("Balanced");
  const [advisorNotice, setAdvisorNotice] = useState("");

  const selectedGoal = goalOptions.find((goal) => goal.id === selectedGoalId) ?? goalOptions[0];

  const startAdvisorSession = (goalId: AdvisorGoalId) => {
    setSelectedGoalId(goalId);
    setScanRunning(true);
    setScanComplete(false);
    setScanStep(0);
    setAdvisorNotice("");
    scanSteps.forEach((_, index) => {
      window.setTimeout(() => setScanStep(index + 1), 300 * (index + 1));
    });
    window.setTimeout(() => {
      setScanRunning(false);
      setScanComplete(true);
    }, 2600);
  };

  const rateByStrategy: Record<StrategyName, number> = {
    Conservative: 3.15,
    Balanced: investmentHorizon <= 2 ? 4.05 : 4.25,
    Growth: 5.4
  };
  const strategySeeds: Array<{
    name: StrategyName;
    label: string;
    mix: string;
    why: string;
    tradeOff: string;
    products: string;
    advisor: string;
    liquidity: number;
    risk: number;
  }> = [
    {
      name: "Conservative",
      label: "RESP + cashable GIC",
      mix: "High liquidity, lower projected return",
      why: "Works when the family wants education money available quickly and prefers principal stability.",
      tradeOff: "Lower return potential and less upside if the timeline extends.",
      products: "RESP, high-interest savings, cashable GIC",
      advisor: "Optional",
      liquidity: 92,
      risk: 22
    },
    {
      name: "Balanced",
      label: "RESP + 2-year GIC + monthly contributions",
      mix: "Balanced liquidity, return, and timing",
      why: "Matches Emma's near-term education timeline while preserving emergency reserves.",
      tradeOff: "Some money is planned around maturity timing, so withdrawal dates should be reviewed.",
      products: "RESP, short-term GIC, student banking, advisor meeting",
      advisor: "Recommended",
      liquidity: 68,
      risk: 42
    },
    {
      name: "Growth",
      label: "RESP + balanced mutual fund pathway",
      mix: "Higher growth potential, higher market risk",
      why: "Can help longer horizons, but it may be less suitable for money needed in the next school year.",
      tradeOff: "Market value can fluctuate when tuition and rent are due.",
      products: "RESP, TFSA education, managed portfolio review",
      advisor: "Recommended",
      liquidity: 48,
      risk: 72
    }
  ];
  const strategyMetrics = strategySeeds.map((strategy) => {
    const annualRate = rateByStrategy[strategy.name] + (investmentHorizon >= 5 && strategy.name === "Growth" ? 0.6 : 0);
    const projectedValue = investmentAmount * Math.pow(1 + annualRate / 100, investmentHorizon);
    const expectedReturn = projectedValue - investmentAmount;
    const preferenceScore =
      (liquidityPreference === "High" && strategy.name === "Conservative" ? 16 : 0) +
      (liquidityPreference === "Balanced" && strategy.name === "Balanced" ? 14 : 0) +
      (liquidityPreference === "Low" && strategy.name === "Growth" ? 12 : 0) +
      (riskPreference === strategy.name ? 16 : 0) +
      (riskPreference === "Balanced" && strategy.name === "Balanced" ? 10 : 0);
    const horizonScore =
      investmentHorizon <= 2 && strategy.name === "Balanced" ? 12 : investmentHorizon >= 5 && strategy.name === "Growth" ? 12 : 0;
    const educationScore = selectedGoalId === "education" && strategy.name === "Balanced" ? 10 : 0;
    const score = Math.min(98, 62 + preferenceScore + horizonScore + educationScore);
    const goalFit = Math.min(96, score + (strategy.name === "Conservative" && liquidityPreference === "High" ? 5 : 0));
    return {
      ...strategy,
      annualRate,
      projectedValue,
      expectedReturn,
      returnScore: Math.min(96, Math.round(annualRate * 13 + investmentHorizon * 2)),
      liquidityScore: strategy.liquidity,
      riskScore: strategy.risk,
      goalFit,
      confidence: score >= 88 ? "High" : score >= 76 ? "Medium-high" : "Medium",
      score
    };
  });
  const recommendedStrategy = [...strategyMetrics].sort((a, b) => b.score - a.score)[0];
  const activeStrategyData = strategyMetrics.find((strategy) => strategy.name === activeStrategy) ?? recommendedStrategy;

  return (
    <main className="advisor-session-page">
      <section className="advisor-session-hero">
        <div>
          <span className="eyebrow">AI Financial Advisor Session</span>
          <h2>What would you like to plan today?</h2>
          <p>
            Choose one family goal. FamilyOS will scan the Chen Family context, explain its assumptions, compare pathways,
            and prepare an advisor-ready next step.
          </p>
        </div>
        <div className="advisor-hero-note">
          <Sparkles size={20} />
          <span>Educational prototype. Major decisions should be reviewed with a CIBC advisor.</span>
        </div>
      </section>

      <section className="goal-choice-grid" aria-label="Goal choices">
        {goalOptions.map((goal) => {
          const Icon = goal.icon;
          return (
            <button
              className={`goal-choice-card ${selectedGoalId === goal.id ? "active" : ""}`}
              key={goal.id}
              onClick={() => startAdvisorSession(goal.id)}
            >
              <Icon size={28} />
              <strong>{goal.title}</strong>
              <span>{goal.description}</span>
            </button>
          );
        })}
      </section>

      {selectedGoal && (
        <section className="advisor-workspace">
          <div className="advisor-scan-card">
            <div>
              <span className="eyebrow">{scanComplete ? "Analysis ready" : "AI scan in progress"}</span>
              <h3>{scanComplete ? `${selectedGoal.title} plan prepared` : "Analyzing family profile..."}</h3>
              <p>{selectedGoal.context}</p>
            </div>
            <div className="scan-progress-track">
              <i style={{ width: `${scanComplete ? 100 : Math.min(96, (scanStep / scanSteps.length) * 100)}%` }} />
            </div>
            <div className="scan-step-list">
              {scanSteps.map((step, index) => (
                <span className={index < scanStep ? "complete" : ""} key={step}>
                  <CheckCircle2 size={16} />
                  {step}
                </span>
              ))}
            </div>
          </div>

          {scanComplete && (
            <div className="advisor-results-flow">
              <section className="advisor-conversation-card">
                <span className="eyebrow">FamilyOS reasoning</span>
                <h3>Here is what we found.</h3>
                <p>
                  We found that <strong>{selectedGoal.context}</strong> The household currently has an RESP balance of
                  <strong> $32,000</strong>, monthly available cash flow of <strong>$3,860</strong>, and an emergency
                  reserve covering about <strong>2.1 months</strong> of expenses.
                </p>
                <p>
                  Because this goal may require cash within the selected horizon, FamilyOS is weighing liquidity, product fit,
                  risk, and advisor review before recommending a pathway.
                </p>
                <div className="advisor-assumption-row">
                  <span>Goal focus: {selectedGoal.focus}</span>
                  <span>Data used: Family profile + verified CIBC data</span>
                  <span>Confidence: High for context, medium for external ranges</span>
                </div>
              </section>

              <section className="advisor-strategy-section">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">Three pathways</span>
                    <h3>Choose a strategy style</h3>
                  </div>
                  <small>Values update when assumptions change.</small>
                </div>
                <div className="strategy-pathway-grid">
                  {strategyMetrics.map((strategy) => (
                    <button
                      className={`strategy-pathway-card ${strategy.name === recommendedStrategy.name ? "recommended" : ""} ${
                        strategy.name === activeStrategy ? "active" : ""
                      }`}
                      key={strategy.name}
                      onClick={() => setActiveStrategy(strategy.name)}
                    >
                      <span>{strategy.name === recommendedStrategy.name ? `${strategy.name} recommended` : strategy.name}</span>
                      <h4>{strategy.label}</h4>
                      <p>{strategy.why}</p>
                      <div className="strategy-stat-row">
                        <small>Projected value <strong>{formatCurrency(strategy.projectedValue)}</strong></small>
                        <small>Est. return <strong>{formatCurrency(strategy.expectedReturn)}</strong></small>
                        <small>Confidence <strong>{strategy.confidence}</strong></small>
                      </div>
                      <div className="tradeoff-note">
                        <strong>Trade-off</strong>
                        {strategy.tradeOff}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="advisor-interactive-grid">
                <div className="scenario-builder-card">
                  <span className="eyebrow">Interactive scenario builder</span>
                  <h3>Adjust the assumptions</h3>
                  <label className="advisor-range-field">
                    <span>Investment amount</span>
                    <strong>{formatCurrency(investmentAmount)}</strong>
                    <input
                      type="range"
                      min="10000"
                      max="50000"
                      step="1000"
                      value={investmentAmount}
                      onChange={(event) => setInvestmentAmount(Number(event.target.value))}
                    />
                  </label>
                  <label className="advisor-range-field">
                    <span>Investment horizon</span>
                    <strong>{investmentHorizon} {investmentHorizon === 1 ? "year" : "years"}</strong>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={investmentHorizon}
                      onChange={(event) => setInvestmentHorizon(Number(event.target.value))}
                    />
                  </label>
                  <div className="advisor-segment-field">
                    <span>Liquidity preference</span>
                    <div>
                      {(["High", "Balanced", "Low"] as AdvisorPreference[]).map((option) => (
                        <button
                          className={liquidityPreference === option ? "active" : ""}
                          key={option}
                          onClick={() => setLiquidityPreference(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="advisor-segment-field">
                    <span>Risk preference</span>
                    <div>
                      {(["Conservative", "Balanced", "Growth"] as AdvisorRisk[]).map((option) => (
                        <button
                          className={riskPreference === option ? "active" : ""}
                          key={option}
                          onClick={() => setRiskPreference(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="visual-comparison-card">
                  <span className="eyebrow">Live comparison</span>
                  <h3>{activeStrategyData.name} strategy</h3>
                  <p>{activeStrategyData.mix}</p>
                  <div className="comparison-metric-list">
                    {[
                      ["Expected return", activeStrategyData.returnScore],
                      ["Liquidity", activeStrategyData.liquidityScore],
                      ["Risk level", activeStrategyData.riskScore],
                      ["Goal fit", activeStrategyData.goalFit]
                    ].map(([label, value]) => (
                      <div className="advisor-comparison-metric" key={label}>
                        <span>{label}</span>
                        <i><b style={{ width: `${value}%` }} /></i>
                        <strong>{value}%</strong>
                      </div>
                    ))}
                  </div>
                  <div className="advisor-chart">
                    {strategyMetrics.map((strategy) => (
                      <div key={strategy.name}>
                        <i style={{ height: `${Math.max(26, (strategy.projectedValue / 64000) * 100)}%` }} />
                        <span>{strategy.name}</span>
                        <strong>{formatCurrency(strategy.projectedValue)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="advisor-summary-card">
                <Sparkles size={22} />
                <div>
                  <span className="eyebrow">AI summary</span>
                  <h3>FamilyOS recommends the {recommendedStrategy.name} Strategy.</h3>
                  <p>
                    This pathway fits the selected timeline, preserves enough liquidity for household surprises, matches current cash flow,
                    avoids locking emergency reserves, and connects to existing CIBC products.
                  </p>
                  <ul>
                    <li>Fits Emma's education timeline and first-year planning window.</li>
                    <li>Balances RESP use with a short-term GIC and monthly contribution rhythm.</li>
                    <li>Flags advisor review before product selection, tax treatment, or withdrawal timing decisions.</li>
                  </ul>
                </div>
              </section>

              <section className="advisor-next-actions">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">Next actions</span>
                    <h3>Move from analysis to decision</h3>
                  </div>
                  {advisorNotice && <small className="advisor-toast">{advisorNotice}</small>}
                </div>
                <div className="next-action-grid">
                  {[
                    ["Review RESP", "Check withdrawal timing, grant treatment, and tuition schedule."],
                    ["Compare 2-year GIC", "Review illustrative maturity timing and liquidity trade-off."],
                    ["Schedule advisor meeting", "Prepare questions before choosing a product pathway."],
                    ["Save this strategy", "Keep the current assumptions for the family plan."]
                  ].map(([title, detail]) => (
                    <article className="next-action-card" key={title}>
                      <CheckCircle2 size={18} />
                      <div>
                        <strong>{title}</strong>
                        <span>{detail}</span>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="advisor-action-row">
                  <button className="primary-button" onClick={() => setAdvisorNotice("Strategy saved for this prototype session.")}>
                    Save Strategy
                  </button>
                  <button className="secondary-button" onClick={() => {
                    setSelectedGoalId(null);
                    setScanComplete(false);
                  }}>
                    Compare Another Goal
                  </button>
                  <button className="secondary-button" onClick={() => setAdvisorNotice("Advisor meeting request prepared for review.")}>
                    Book Advisor
                  </button>
                  <button className="secondary-button" onClick={() => setAdvisorNotice("Summary export prepared for the prototype demo.")}>
                    Export Summary
                  </button>
                </div>
              </section>

              <div className="advisor-disclaimer">
                <AlertTriangle size={17} />
                <span>
                  Projected values are illustrative only. Actual rates, eligibility, tax treatment, market performance, and suitability
                  should be reviewed with a CIBC advisor.
                </span>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function GoalAdvisorExperience() {
  return <GoalAdvisorConversation />;

  const [showCustomize, setShowCustomize] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(25000);
  const [investmentHorizon, setInvestmentHorizon] = useState(2);
  const [liquidityPreference, setLiquidityPreference] = useState<AdvisorPreference>("Balanced");
  const [riskPreference, setRiskPreference] = useState<AdvisorRisk>("Balanced");
  const [marketOutlook, setMarketOutlook] = useState<MarketOutlook>("base");
  const [rateEnvironment, setRateEnvironment] = useState<RateEnvironment>("similar");
  const [showAdvancedMarket, setShowAdvancedMarket] = useState(false);
  const [showAdvancedRate, setShowAdvancedRate] = useState(false);
  const [expectedMarketReturn, setExpectedMarketReturn] = useState(7);
  const [primeRate, setPrimeRate] = useState(3.25);
  const [advisorNotice, setAdvisorNotice] = useState("");
  const [activeProducts, setActiveProducts] = useState<Record<AdvisorProductId, boolean>>({
    cashable: true,
    noncashable: true,
    fund: true,
    portfolio: true
  });

  const productOptions: Array<{
    id: AdvisorProductId;
    name: string;
    category: string;
    color: string;
    rate: number;
    band: number;
    fixed: boolean;
  }> = [
    {
      id: "cashable",
      name: "Cashable GIC",
      category: "Flexible reserve",
      color: "#2f80ed",
      rate: Math.max(2.2, primeRate - 0.15),
      band: 0.1,
      fixed: true
    },
    {
      id: "noncashable",
      name: "Non-cashable GIC",
      category: "Planned maturity",
      color: "#b9862c",
      rate: 4.05,
      band: 0.05,
      fixed: true
    },
    {
      id: "fund",
      name: "Balanced Mutual Fund",
      category: "Market-linked",
      color: "#2aa876",
      rate: expectedMarketReturn,
      band: 2,
      fixed: false
    },
    {
      id: "portfolio",
      name: "Managed Portfolio",
      category: "Advisor-managed",
      color: "#870f2d",
      rate: expectedMarketReturn + 0.75,
      band: 2.5,
      fixed: false
    }
  ];
  const strategySeeds: Array<{
    name: StrategyName;
    label: string;
    rate: number;
    liquidity: number;
    risk: number;
    why: string;
  }> = [
    {
      name: "Conservative",
      label: "RESP + cashable GIC",
      rate: Math.max(2.2, primeRate - 0.05),
      liquidity: 92,
      risk: 24,
      why: "Preserves access if tuition, rent, or emergency needs move sooner than expected."
    },
    {
      name: "Balanced",
      label: "RESP + 2-year GIC + monthly contributions",
      rate: investmentHorizon <= 2 ? 4.05 : (4.05 + expectedMarketReturn) / 2,
      liquidity: 74,
      risk: 44,
      why: "Matches Emma's near-term education timeline while keeping emergency reserves intact."
    },
    {
      name: "Growth",
      label: "RESP + market-linked portfolio review",
      rate: expectedMarketReturn,
      liquidity: 48,
      risk: 76,
      why: "May help longer timelines, but market movement can matter when tuition is close."
    }
  ];
  const strategyMetrics = strategySeeds.map((strategy) => {
    const projectedValue = investmentAmount * Math.pow(1 + strategy.rate / 100, investmentHorizon);
    const expectedReturn = projectedValue - investmentAmount;
    const preferenceScore =
      (liquidityPreference === "High" && strategy.name === "Conservative" ? 18 : 0) +
      (liquidityPreference === "Balanced" && strategy.name === "Balanced" ? 18 : 0) +
      (liquidityPreference === "Low" && strategy.name === "Growth" ? 14 : 0) +
      (riskPreference === strategy.name ? 16 : 0) +
      (riskPreference === "Balanced" && strategy.name === "Balanced" ? 10 : 0);
    const timelineScore =
      investmentHorizon <= 2 && strategy.name === "Balanced" ? 18 : investmentHorizon >= 5 && strategy.name === "Growth" ? 16 : 0;
    const score = Math.min(98, 60 + preferenceScore + timelineScore);
    return {
      ...strategy,
      projectedValue,
      expectedReturn,
      confidence: score >= 88 ? "High" : score >= 76 ? "Medium-high" : "Medium",
      goalFit: Math.min(98, score),
      score
    };
  });
  const recommendedStrategy = [...strategyMetrics].sort((a, b) => b.score - a.score)[0];
  const selectedProductSeries = productOptions.filter((product) => activeProducts[product.id]);
  const chartWidth = 760;
  const chartHeight = 330;
  const chartPadding = 42;
  const educationTarget = 33000;
  const balancedProjection = investmentAmount * Math.pow(1 + strategyMetrics[1].rate / 100, investmentHorizon);
  const expectedReturn = balancedProjection - investmentAmount;
  const goalProbability = Math.min(98, Math.max(54, Math.round((balancedProjection / educationTarget) * 100)));
  const maxProjectedValue = Math.max(
    educationTarget * 1.12,
    ...selectedProductSeries.flatMap((product) =>
      [product.rate + product.band, product.rate].map((rate) =>
        investmentAmount * Math.pow(1 + Math.max(0.01, rate) / 100, investmentHorizon)
      )
    )
  );
  const getPoint = (year: number, value: number) => {
    const x = chartPadding + (year / Math.max(1, investmentHorizon)) * (chartWidth - chartPadding * 2);
    const y = chartHeight - chartPadding - (value / maxProjectedValue) * (chartHeight - chartPadding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };
  const getSeriesPoints = (rate: number) =>
    Array.from({ length: investmentHorizon + 1 }, (_, year) => {
      const value = investmentAmount * Math.pow(1 + Math.max(0.01, rate) / 100, year);
      return getPoint(year, value);
    }).join(" ");
  const getBandPoints = (rate: number, band: number) => {
    const years = Array.from({ length: investmentHorizon + 1 }, (_, year) => year);
    const upper = years.map((year) =>
      getPoint(year, investmentAmount * Math.pow(1 + Math.max(0.01, rate + band) / 100, year))
    );
    const lower = years
      .slice()
      .reverse()
      .map((year) => getPoint(year, investmentAmount * Math.pow(1 + Math.max(0.01, rate - band) / 100, year)));
    return [...upper, ...lower].join(" ");
  };
  const getProjectedY = (value: number) => Number(getPoint(investmentHorizon, value).split(",")[1]);
  const liquidityScore = liquidityPreference === "High" ? 92 : liquidityPreference === "Balanced" ? 74 : 48;
  const riskScore = riskPreference === "Conservative" ? 24 : riskPreference === "Balanced" ? 46 : 72;
  const liveReason =
    investmentHorizon <= 1
      ? "You indicated funds may be needed within 12 months. FamilyOS is prioritizing flexibility and reducing long-term locked or market-linked recommendations."
      : investmentHorizon >= 5
        ? "You extended the horizon to five years or more. FamilyOS can now consider more long-term investment exposure because liquidity is less urgent."
        : liquidityPreference === "High"
          ? "You increased the need for liquidity. FamilyOS keeps the education strategy balanced but shifts more weight toward cashable options."
          : riskPreference === "Growth"
            ? "You selected a growth preference. FamilyOS raises the market-linked pathway, but keeps advisor review because Emma's tuition timeline is still near."
            : primeRate >= 4
              ? "You raised the prime rate assumption. FamilyOS gives more credit to flexible GIC-like options while monitoring borrowing and cash-flow pressure."
              : "Your current assumptions keep the Balanced Education Strategy first because it fits Emma's timeline without locking the emergency reserve.";
  const applyWhatIf = (scenario: string) => {
    setShowCustomize(true);
    setAdvisorNotice("");
    if (scenario === "increase") setInvestmentAmount((value) => Math.min(50000, value + 5000));
    if (scenario === "delay") setInvestmentHorizon((value) => Math.min(10, value + 1));
    if (scenario === "liquidity") setLiquidityPreference("High");
    if (scenario === "reduce") setInvestmentAmount((value) => Math.max(10000, value - 5000));
    if (scenario === "market") {
      setMarketOutlook("optimistic");
      setExpectedMarketReturn(9);
    }
    if (scenario === "rates") {
      setRateEnvironment("increase");
      setPrimeRate(4.75);
    }
  };

  return (
    <main className="advisor-session-page">
      <section className="advisor-recommendation-hero">
        <div className="advisor-recommendation-copy">
          <span className="eyebrow">AI Financial Advisor Experience</span>
          <h2>Based on everything I know about your household, here is the strategy I would recommend.</h2>
          <p>
            Emma's university starts in approximately 10 months. FamilyOS reviewed RESP balance, household cash flow,
            education goal, emergency reserve, and expected liquidity needs.
          </p>
          <div className="advisor-recommendation-badge">
            <Sparkles size={19} />
            <strong>FamilyOS recommends the Balanced Education Strategy.</strong>
          </div>
        </div>
        <div className="advisor-recommendation-panel">
          <div className="advisor-panel-header">
            <span>Recommended strategy</span>
            <strong>{strategyMetrics[1].label}</strong>
          </div>
          <div className="advisor-hero-metrics">
            <MoneyStat label="Estimated return" value={expectedReturn} />
            <MetricTile label="Goal fit" value={`${goalProbability}%`} />
            <MetricTile label="Liquidity" value={liquidityPreference} />
            <MetricTile label="Risk" value={riskPreference} />
          </div>
          <div className="goal-probability">
            <div>
              <span>Education goal probability</span>
              <strong>{goalProbability}%</strong>
            </div>
            <i><b style={{ width: `${goalProbability}%` }} /></i>
          </div>
        </div>
      </section>

      <section className="advisor-opening-grid">
        <div className="advisor-conversation-card">
          <span className="eyebrow">Why this recommendation</span>
          <h3>FamilyOS is optimizing for timing, not just return.</h3>
          <p>
            Emma's education expenses are close enough that preserving liquidity matters more than maximizing long-term return.
            The Balanced Education Strategy keeps RESP planning visible, adds a planned maturity window, and avoids using the
            emergency reserve for tuition or rent.
          </p>
          <div className="advisor-assumption-row">
            <span>RESP balance: $32,000</span>
            <span>Available monthly cash flow: $3,860</span>
            <span>Emergency reserve: 2.1 months</span>
          </div>
        </div>

        <div className="advisor-mini-chart-card">
          <span className="eyebrow">Simple projection</span>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Recommended strategy projected growth">
            <line x1={chartPadding} y1={chartHeight - chartPadding} x2={chartWidth - chartPadding} y2={chartHeight - chartPadding} />
            <line x1={chartPadding} y1={chartPadding} x2={chartPadding} y2={chartHeight - chartPadding} />
            <polyline points={getSeriesPoints(strategyMetrics[1].rate)} />
            <circle cx={chartWidth - chartPadding} cy={getProjectedY(balancedProjection)} r="7" />
          </svg>
          <div>
            <strong>{formatCurrency(balancedProjection)}</strong>
            <span>Projected value at {investmentHorizon} years using illustrative assumptions.</span>
          </div>
        </div>
      </section>

      {!showCustomize && (
        <section className="advisor-customize-gate">
          <div>
            <span className="eyebrow">Explore alternatives</span>
            <h3>Customize only when you want to change assumptions.</h3>
            <p>Open the workspace for live sliders, product curves, scenario bands, and what-if shortcuts.</p>
          </div>
          <button className="primary-button" onClick={() => setShowCustomize(true)}>
            Customize Recommendation
          </button>
        </section>
      )}

      {showCustomize && (
        <section className="advisor-workspace">
          <section className="advisor-interactive-grid">
            <div className="scenario-builder-card">
              <span className="eyebrow">Scenario explorer</span>
              <h3>Adjust assumptions live</h3>
              <label className="advisor-range-field">
                <span>Investment amount</span>
                <strong>{formatCurrency(investmentAmount)}</strong>
                <input type="range" min="10000" max="50000" step="1000" value={investmentAmount} onChange={(event) => setInvestmentAmount(Number(event.target.value))} />
              </label>
              <label className="advisor-range-field">
                <span>Time horizon</span>
                <strong>{investmentHorizon} {investmentHorizon === 1 ? "year" : "years"}</strong>
                <input type="range" min="1" max="10" step="1" value={investmentHorizon} onChange={(event) => setInvestmentHorizon(Number(event.target.value))} />
              </label>
              <div className="advisor-segment-field">
                <span>Liquidity preference</span>
                <div>
                  {(["High", "Balanced", "Low"] as AdvisorPreference[]).map((option) => (
                    <button className={liquidityPreference === option ? "active" : ""} key={option} onClick={() => setLiquidityPreference(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="advisor-segment-field">
                <span>Risk preference</span>
                <div>
                  {(["Conservative", "Balanced", "Growth"] as AdvisorRisk[]).map((option) => (
                    <button className={riskPreference === option ? "active" : ""} key={option} onClick={() => setRiskPreference(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <label className="advisor-range-field">
                <span>Expected market return</span>
                <strong>{expectedMarketReturn.toFixed(1)}%</strong>
                <input type="range" min="3" max="10" step="0.5" value={expectedMarketReturn} onChange={(event) => setExpectedMarketReturn(Number(event.target.value))} />
              </label>
              <label className="advisor-range-field">
                <span>Prime rate assumption</span>
                <strong>{primeRate.toFixed(2)}%</strong>
                <input type="range" min="2" max="6" step="0.25" value={primeRate} onChange={(event) => setPrimeRate(Number(event.target.value))} />
              </label>
            </div>

            <div className="advisor-curve-card">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Interactive product comparison</span>
                  <h3>Toggle curves to compare pathways</h3>
                </div>
                <small>Illustrative prototype rates</small>
              </div>
              <div className="product-toggle-grid">
                {productOptions.map((product) => (
                  <button
                    className={activeProducts[product.id] ? "active" : ""}
                    key={product.id}
                    onClick={() => setActiveProducts({ ...activeProducts, [product.id]: !activeProducts[product.id] })}
                  >
                    <i style={{ background: product.color }} />
                    <strong>{product.name}</strong>
                    <span>{product.rate.toFixed(2)}% {product.fixed ? "fixed" : "scenario band"}</span>
                  </button>
                ))}
              </div>
              <svg className="advisor-curve-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Product comparison projection chart">
                <line x1={chartPadding} y1={chartHeight - chartPadding} x2={chartWidth - chartPadding} y2={chartHeight - chartPadding} />
                <line x1={chartPadding} y1={chartPadding} x2={chartPadding} y2={chartHeight - chartPadding} />
                <text x={chartPadding} y={chartPadding - 12}>{formatCurrency(Math.round(maxProjectedValue))}</text>
                <text x={chartPadding} y={chartHeight - 12}>Now</text>
                <text x={chartWidth - chartPadding - 40} y={chartHeight - 12}>{investmentHorizon}Y</text>
                {selectedProductSeries.map((product) => (
                  <g key={product.id}>
                    {!product.fixed && <polygon className="scenario-band" points={getBandPoints(product.rate, product.band)} style={{ fill: product.color }} />}
                    <polyline className="product-curve" points={getSeriesPoints(product.rate)} style={{ stroke: product.color }} />
                    <circle
                      cx={chartWidth - chartPadding}
                      cy={getProjectedY(investmentAmount * Math.pow(1 + product.rate / 100, investmentHorizon))}
                      r="5"
                      style={{ fill: product.color }}
                    />
                  </g>
                ))}
              </svg>
              <div className="curve-legend-row">
                {selectedProductSeries.map((product) => (
                  <span key={product.id}><i style={{ background: product.color }} />{product.name}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="advisor-live-grid">
            <div className="advisor-summary-card">
              <Sparkles size={22} />
              <div>
                <span className="eyebrow">Live AI reasoning</span>
                <h3>{recommendedStrategy.name} Strategy is currently ranked first.</h3>
                <p>{liveReason}</p>
                <div className="advisor-assumption-row compact">
                  <span>Projected value: {formatCurrency(balancedProjection)}</span>
                  <span>Expected return: {formatCurrency(expectedReturn)}</span>
                  <span>Goal probability: {goalProbability}%</span>
                </div>
              </div>
            </div>

            <div className="visual-comparison-card">
              <span className="eyebrow">Goal progress</span>
              <h3>Education Goal</h3>
              <div className="goal-probability large">
                <div>
                  <span>Completion probability</span>
                  <strong>{goalProbability}%</strong>
                </div>
                <i><b style={{ width: `${goalProbability}%` }} /></i>
              </div>
              <div className="comparison-metric-list">
                {[
                  ["Goal fit", goalProbability],
                  ["Liquidity", liquidityScore],
                  ["Risk level", riskScore],
                  ["Confidence", recommendedStrategy.score]
                ].map(([label, value]) => (
                  <div className="advisor-comparison-metric" key={label}>
                    <span>{label}</span>
                    <i><b style={{ width: `${value}%` }} /></i>
                    <strong>{value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="what-if-panel">
            <div className="section-heading">
              <div>
                <span className="eyebrow">What if...</span>
                <h3>Try scenario shortcuts</h3>
              </div>
              <small>Each button updates the assumptions instantly.</small>
            </div>
            <div className="what-if-grid">
              {[
                ["increase", "Increase investment by $5,000"],
                ["delay", "Delay university by one year"],
                ["liquidity", "Need emergency liquidity"],
                ["reduce", "Reduce monthly savings"],
                ["market", "Higher market return"],
                ["rates", "Higher interest rates"]
              ].map(([scenario, label]) => (
                <button key={scenario} onClick={() => applyWhatIf(scenario)}>
                  {label}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </section>

          <section className="advisor-next-actions">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Recommended Action Plan</span>
                <h3>Finish with a decision path</h3>
              </div>
              {advisorNotice && <small className="advisor-toast">{advisorNotice}</small>}
            </div>
            <div className="next-action-grid">
              {[
                ["RESP Review", "Check withdrawal timing, grant treatment, and tuition schedule."],
                ["Compare 2-year GIC", "Review illustrative maturity timing and liquidity trade-off."],
                ["Monthly contribution schedule", "Set a small recurring top-up without weakening emergency cash."],
                ["Student banking", "Prepare account ownership, debit, credit education, and rent support."],
                ["Advisor meeting", "Review product suitability before acting."]
              ].map(([title, detail]) => (
                <article className="next-action-card" key={title}>
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="advisor-action-row">
              <button className="primary-button" onClick={() => setAdvisorNotice("Strategy saved for this prototype session.")}>Save Strategy</button>
              <button className="secondary-button" onClick={() => setAdvisorNotice("Scenario comparison reset is ready for the demo.")}>Compare Another Scenario</button>
              <button className="secondary-button" onClick={() => setAdvisorNotice("Advisor meeting request prepared for review.")}>Book Advisor</button>
            </div>
          </section>
        </section>
      )}

      <div className="advisor-disclaimer">
        <AlertTriangle size={17} />
        <span>
          Projected values are illustrative only. Actual rates, eligibility, tax treatment, market performance, and suitability should be
          reviewed with a CIBC advisor.
        </span>
      </div>
    </main>
  );
}

function GoalAdvisorConversation() {
  const [step, setStep] = useState<ConversationStep>("recommend");
  const [controlStep, setControlStep] = useState(0);
  const [isThinking, setIsThinking] = useState(true);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [expandedReasons, setExpandedReasons] = useState<Record<string, boolean>>({});
  const [investmentAmount, setInvestmentAmount] = useState(25000);
  const [investmentHorizon, setInvestmentHorizon] = useState(2);
  const [liquidityPreference, setLiquidityPreference] = useState<AdvisorPreference>("Balanced");
  const [riskPreference, setRiskPreference] = useState<AdvisorRisk>("Balanced");
  const [marketOutlook, setMarketOutlook] = useState<MarketOutlook>("base");
  const [rateEnvironment, setRateEnvironment] = useState<RateEnvironment>("similar");
  const [showAdvancedMarket, setShowAdvancedMarket] = useState(false);
  const [showAdvancedRate, setShowAdvancedRate] = useState(false);
  const [expectedMarketReturn, setExpectedMarketReturn] = useState(7);
  const [primeRate, setPrimeRate] = useState(3.25);
  const [actionProgress, setActionProgress] = useState(0);
  const [advisorNotice, setAdvisorNotice] = useState("");
  const [activeProducts, setActiveProducts] = useState<Record<ConversationProductId, boolean>>({
    bonusGic: true,
    flexibleGic: true,
    variableGic: true,
    easyBuilder: true,
    marketLinkedGic: true,
    ppn: true,
    mutualFunds: true,
    etfs: true,
    portfolioSolutions: true
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setThinkingStep((value) => Math.min(4, value + 1));
    }, 430);
    const timeoutId = window.setTimeout(() => {
      setIsThinking(false);
      window.clearInterval(intervalId);
    }, 2350);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const chartWidth = 760;
  const chartHeight = 330;
  const chartPadding = 46;
  const educationTarget = 33000;
  const marketOutlookOptions: Array<{
    id: MarketOutlook;
    label: string;
    value: number;
    note: string;
    recommended?: boolean;
  }> = [
    { id: "conservative", label: "Conservative", value: 5, note: "Lower market growth" },
    { id: "base", label: "Base Case", value: 7, note: "AI recommended", recommended: true },
    { id: "optimistic", label: "Optimistic", value: 9, note: "Higher market growth" }
  ];
  const rateEnvironmentOptions: Array<{
    id: RateEnvironment;
    label: string;
    value: number;
    note: string;
    recommended?: boolean;
  }> = [
    { id: "decrease", label: "Lower", value: 2.5, note: "Prime-rate relief" },
    { id: "similar", label: "Similar", value: 3.25, note: "AI base case", recommended: true },
    { id: "increase", label: "Higher", value: 4.75, note: "Higher-rate stress test" }
  ];
  const marketOutlookLabel =
    marketOutlookOptions.find((option) => option.id === marketOutlook)?.label ?? `Custom ${expectedMarketReturn.toFixed(1)}%`;
  const rateEnvironmentLabel =
    rateEnvironmentOptions.find((option) => option.id === rateEnvironment)?.label ?? `Custom ${primeRate.toFixed(2)}%`;
  const cashableRate = Math.max(2.2, primeRate - 0.15);
  const nonCashableRate = 4.05;
  const balancedRate =
    investmentHorizon <= 2 ? nonCashableRate : Number(((nonCashableRate + expectedMarketReturn) / 2).toFixed(2));
  const balancedProjection = investmentAmount * Math.pow(1 + balancedRate / 100, investmentHorizon);
  const expectedReturn = balancedProjection - investmentAmount;
  const goalProbability = Math.min(98, Math.max(52, Math.round((balancedProjection / educationTarget) * 100)));
  const liquidityScore = liquidityPreference === "High" ? 92 : liquidityPreference === "Balanced" ? 74 : 46;
  const riskScore = riskPreference === "Conservative" ? 28 : riskPreference === "Balanced" ? 46 : 74;

  const productOptions: Array<{
    id: ConversationProductId;
    name: string;
    category: string;
    color: string;
    rate: number;
    band: number;
    fixed: boolean;
    legend: string;
    shape: ConversationProductShape;
  }> = [
    {
      id: "bonusGic",
      name: "Bonus Rate GIC",
      category: "Non-redeemable fixed",
      color: "#3f7ee8",
      rate: nonCashableRate,
      band: 0.05,
      fixed: true,
      legend: "Locked fixed",
      shape: "fixed"
    },
    {
      id: "flexibleGic",
      name: "Flexible GIC",
      category: "Cashable fixed",
      color: "#bc8b2e",
      rate: cashableRate,
      band: 0.08,
      fixed: true,
      legend: "Cashable fixed",
      shape: "flexible"
    },
    {
      id: "variableGic",
      name: "Variable Rate GIC",
      category: "Prime-linked",
      color: "#2f9f86",
      rate: Math.max(2.15, primeRate - 0.2),
      band: 0.45,
      fixed: true,
      legend: "Prime-linked",
      shape: "variable"
    },
    {
      id: "easyBuilder",
      name: "EasyBuilder GIC",
      category: "1-5 year ladder",
      color: "#8b6fce",
      rate: 3.75,
      band: 0.1,
      fixed: true,
      legend: "Laddered",
      shape: "ladder"
    },
    {
      id: "marketLinkedGic",
      name: "Market Linked GIC",
      category: "Protected upside band",
      color: "#db7aa2",
      rate: expectedMarketReturn * 0.72,
      band: Math.max(1.6, expectedMarketReturn * 0.34),
      fixed: false,
      legend: "Protected band",
      shape: "marketLinked"
    },
    {
      id: "ppn",
      name: "Principal Protected Note",
      category: "Protected note",
      color: "#c85d3f",
      rate: expectedMarketReturn * 0.82,
      band: Math.max(1.8, expectedMarketReturn * 0.36),
      fixed: false,
      legend: "Protected band",
      shape: "protectedNote"
    },
    {
      id: "mutualFunds",
      name: "Mutual Funds",
      category: "Market-linked",
      color: "#49a76f",
      rate: expectedMarketReturn + 0.45,
      band: Math.max(2.4, expectedMarketReturn * 0.38),
      fixed: false,
      legend: "Volatile band",
      shape: "mutualFund"
    },
    {
      id: "etfs",
      name: "ETFs",
      category: "Market traded",
      color: "#2c7fb8",
      rate: expectedMarketReturn + 0.75,
      band: Math.max(3.1, expectedMarketReturn * 0.48),
      fixed: false,
      legend: "Higher volatility",
      shape: "etf"
    },
    {
      id: "portfolioSolutions",
      name: "Portfolio Solutions",
      category: "Managed diversified",
      color: "#870f2d",
      rate: expectedMarketReturn + 0.25,
      band: Math.max(1.8, expectedMarketReturn * 0.28),
      fixed: false,
      legend: "Diversified band",
      shape: "portfolio"
    }
  ];

  const selectedProductSeries = productOptions.filter((product) => activeProducts[product.id]);
  const comparisonTimeline = [
    { label: "Today", year: 0 },
    { label: "6M", year: 0.5 },
    { label: "1Y", year: 1 },
    { label: "2Y", year: 2 },
    { label: "3Y", year: 3 },
    { label: "4Y", year: 4 },
    { label: "5Y", year: 5 }
  ];
  const comparisonSeriesYears = Array.from({ length: 21 }, (_, index) => index / 4);
  const comparisonHorizon = 5;
  const getProductValue = (product: (typeof productOptions)[number], year: number, rate = product.rate) => {
    const annualRate = Math.max(0.01, rate) / 100;
    const progress = year / comparisonHorizon;
    const marketPulse =
      investmentAmount *
      progress *
      (Math.sin(year * 4.2) * 0.012 + Math.sin(year * 8.6 + 0.8) * 0.006);
    const protectedFloor = investmentAmount * (1 + 0.003 * Math.min(year, 5));
    if (product.shape === "fixed") return investmentAmount * Math.pow(1 + annualRate, year);
    if (product.shape === "flexible") return investmentAmount * (1 + annualRate * year * 0.92);
    if (product.shape === "variable") {
      const stepRate =
        Math.max(0.01, rate + (year >= 1 ? primeRate - 3.25 : 0) * 0.18 + (year >= 3 ? (primeRate - 3.25) * 0.1 : 0)) /
        100;
      const stepLift = year >= 2 ? investmentAmount * stepRate * 0.35 : 0;
      return investmentAmount * (1 + stepRate * year) + stepLift;
    }
    if (product.shape === "ladder") {
      const base = investmentAmount * Math.pow(1 + annualRate, year);
      const maturityBump =
        (year >= 1 ? investmentAmount * 0.004 : 0) +
        (year >= 2 ? investmentAmount * 0.006 : 0) +
        (year >= 3 ? investmentAmount * 0.007 : 0) +
        (year >= 4 ? investmentAmount * 0.008 : 0) +
        (year >= 5 ? investmentAmount * 0.009 : 0);
      return base + maturityBump;
    }
    if (product.shape === "marketLinked") {
      const upside = investmentAmount * (Math.pow(1 + annualRate, year) - 1) * (0.35 + progress * 0.75);
      return Math.max(protectedFloor, investmentAmount + upside + marketPulse * 0.55);
    }
    if (product.shape === "protectedNote") {
      const upside = investmentAmount * (Math.pow(1 + annualRate, year) - 1) * (0.45 + progress * 0.9);
      return Math.max(protectedFloor, investmentAmount + upside + marketPulse * 0.72);
    }
    if (product.shape === "mutualFund") {
      const comp = investmentAmount * Math.pow(1 + annualRate, year);
      const volatility = investmentAmount * progress * (Math.sin(year * 3.2 + 0.9) * 0.018 + Math.sin(year * 7.1) * 0.012);
      return comp + volatility;
    }
    if (product.shape === "etf") {
      const comp = investmentAmount * Math.pow(1 + annualRate, year);
      const volatility = investmentAmount * progress * (Math.sin(year * 3.8 + 1.4) * 0.032 + Math.sin(year * 9.2) * 0.018);
      return comp + volatility;
    }
    if (product.shape === "portfolio") {
      const curveLift = 1 + Math.pow(progress, 1.35) * annualRate * comparisonHorizon;
      const smootherPulse = marketPulse * 0.5 + investmentAmount * progress * Math.sin(year * 2.1) * 0.004;
      return investmentAmount * curveLift + smootherPulse;
    }
    return investmentAmount * Math.pow(1 + annualRate, year);
  };
  const maxProjectedValue = Math.max(
    educationTarget * 1.18,
    ...selectedProductSeries.flatMap((product) =>
      [product.rate + product.band, product.rate].flatMap((rate) =>
        comparisonSeriesYears.map((year) => getProductValue(product, year, rate))
      )
    )
  );
  const minProjectedValue = Math.min(
    investmentAmount * 0.92,
    ...selectedProductSeries.flatMap((product) =>
      [product.rate - product.band, product.rate].flatMap((rate) =>
        comparisonSeriesYears.map((year) => getProductValue(product, year, Math.max(0.01, rate)))
      )
    )
  );
  const yAxisTop = Math.ceil(maxProjectedValue / 5000) * 5000;
  const yAxisBottom = Math.max(0, Math.floor(minProjectedValue / 5000) * 5000);
  const getPoint = (year: number, value: number) => {
    const x = chartPadding + (year / Math.max(1, investmentHorizon)) * (chartWidth - chartPadding * 2);
    const y = chartHeight - chartPadding - (value / maxProjectedValue) * (chartHeight - chartPadding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };
  const getComparisonPoint = (year: number, value: number) => {
    const x = chartPadding + (year / comparisonHorizon) * (chartWidth - chartPadding * 2);
    const y =
      chartHeight -
      chartPadding -
      ((value - yAxisBottom) / Math.max(1, yAxisTop - yAxisBottom)) * (chartHeight - chartPadding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };
  const getSeriesPoints = (rate: number) =>
    Array.from({ length: investmentHorizon + 1 }, (_, year) =>
      getPoint(year, investmentAmount * Math.pow(1 + Math.max(0.01, rate) / 100, year))
    ).join(" ");
  const getComparisonSeriesPoints = (product: (typeof productOptions)[number], rate = product.rate) =>
    comparisonSeriesYears.map((year) => getComparisonPoint(year, getProductValue(product, year, rate))).join(" ");
  const getBandPoints = (rate: number, band: number) => {
    const years = Array.from({ length: investmentHorizon + 1 }, (_, year) => year);
    const upper = years.map((year) =>
      getPoint(year, investmentAmount * Math.pow(1 + Math.max(0.01, rate + band) / 100, year))
    );
    const lower = years
      .slice()
      .reverse()
      .map((year) => getPoint(year, investmentAmount * Math.pow(1 + Math.max(0.01, rate - band) / 100, year)));
    return [...upper, ...lower].join(" ");
  };
  const getComparisonBandPoints = (product: (typeof productOptions)[number]) => {
    const upper = comparisonSeriesYears.map((year) =>
      getComparisonPoint(year, getProductValue(product, year, product.rate + product.band))
    );
    const lower = comparisonSeriesYears
      .slice()
      .reverse()
      .map((year) =>
        getComparisonPoint(year, getProductValue(product, year, Math.max(0.01, product.rate - product.band)))
      );
    return [...upper, ...lower].join(" ");
  };
  const getComparisonRectY = (value: number) => Number(getComparisonPoint(0, value).split(",")[1]);
  const getProjectedY = (value: number) => Number(getPoint(investmentHorizon, value).split(",")[1]);
  const getComparisonY = (value: number) => Number(getComparisonPoint(comparisonHorizon, value).split(",")[1]);

  const strategyTitle =
    liquidityPreference === "High"
      ? "RESP + cashable reserve strategy"
      : riskPreference === "Growth" && investmentHorizon >= 5
        ? "RESP + long-term growth strategy"
        : "RESP + 2-year GIC + monthly contributions";
  const liveReason =
    investmentHorizon <= 1
      ? "Emma's education starts in less than one year. FamilyOS is prioritizing access to funds and reducing the weight of locked or volatile investments."
      : investmentHorizon >= 5
        ? "You extended the horizon. FamilyOS can now consider more long-term exposure because the family has more time before funds are needed."
        : liquidityPreference === "High"
          ? "You increased liquidity needs. FamilyOS is moving cashable products higher because tuition, rent, or emergency costs may arrive sooner."
          : riskPreference === "Growth"
            ? "You selected a growth preference. FamilyOS shows more market-linked upside, but keeps advisor review because Emma's tuition timeline is near."
            : primeRate >= 4
              ? "Interest-rate assumptions moved higher. FamilyOS is giving more weight to flexible GIC pathways while watching cash-flow pressure."
              : "FamilyOS keeps the balanced strategy first because it fits Emma's timeline, preserves emergency cash, and aligns with the existing RESP.";

  const thinkingSteps = [
    "Reviewing family timeline",
    "Checking household cash flow",
    "Reviewing existing CIBC products",
    "Comparing investment scenarios",
    "Building recommendation"
  ];
  const reasoningCards: Array<{
    id: string;
    icon: LucideIcon;
    title: string;
    line: string;
    expanded: string;
  }> = [
    {
      id: "timeline",
      icon: CalendarClock,
      title: "Time Horizon",
      line: "University starts in 10 months.",
      expanded: "Because funds may be needed within one year, FamilyOS gives greater weight to liquidity than long-term growth."
    },
    {
      id: "funding",
      icon: PiggyBank,
      title: "Current Funding",
      line: "RESP covers about 70% of the expected first-year cost.",
      expanded: "The plan focuses on closing the gap without disrupting emergency cash."
    },
    {
      id: "liquidity",
      icon: WalletCards,
      title: "Liquidity",
      line: "Your family still needs flexible access.",
      expanded: "FamilyOS avoids putting too much near-term education money into options that are hard to access."
    },
    {
      id: "context",
      icon: Home,
      title: "Household Context",
      line: "Emergency reserve covers 2.1 months.",
      expanded: "A stronger reserve would allow more aggressive options, but today the plan protects flexibility."
    },
    {
      id: "recommendation",
      icon: Sparkles,
      title: "Recommendation",
      line: "Balanced Strategy fits timing, access, and growth.",
      expanded: "It keeps the education plan moving while leaving room for advisor review before any real product decision."
    }
  ];

  const controls = [
    {
      title: "How much should FamilyOS plan with?",
      detail: "Start with funds the family is comfortable earmarking for Emma's education strategy.",
      control: (
        <label className="advisor-range-field advisor-single-range">
          <span>Investment amount</span>
          <strong>{formatCurrency(investmentAmount)}</strong>
          <input
            type="range"
            min="10000"
            max="50000"
            step="1000"
            value={investmentAmount}
            onChange={(event) => setInvestmentAmount(Number(event.target.value))}
          />
        </label>
      )
    },
    {
      title: "When does the family need the money?",
      detail: "The closer the timeline, the more FamilyOS protects liquidity.",
      control: (
        <label className="advisor-range-field advisor-single-range">
          <span>Investment horizon</span>
          <strong>{investmentHorizon} {investmentHorizon === 1 ? "year" : "years"}</strong>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={investmentHorizon}
            onChange={(event) => setInvestmentHorizon(Number(event.target.value))}
          />
        </label>
      )
    },
    {
      title: "How flexible should the money remain?",
      detail: "Liquidity changes which products are prioritized.",
      control: (
        <div className="advisor-segment-field advisor-single-segment">
          <span>Liquidity preference</span>
          <div>
            {(["High", "Balanced", "Low"] as AdvisorPreference[]).map((option) => (
              <button className={liquidityPreference === option ? "active" : ""} key={option} onClick={() => setLiquidityPreference(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "How much market movement feels acceptable?",
      detail: "Risk preference changes the balance between certainty and upside.",
      control: (
        <div className="advisor-segment-field advisor-single-segment">
          <span>Risk preference</span>
          <div>
            {(["Conservative", "Balanced", "Growth"] as AdvisorRisk[]).map((option) => (
              <button className={riskPreference === option ? "active" : ""} key={option} onClick={() => setRiskPreference(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Which market outlook should FamilyOS use?",
      detail: "Start with an AI baseline. Advanced users can still customize the percentage.",
      control: (
        <div className="advisor-preset-control">
          <span>Market Outlook</span>
          <div className="advisor-preset-grid">
            {marketOutlookOptions.map((option) => (
              <button
                className={marketOutlook === option.id ? "active" : ""}
                key={option.id}
                onClick={() => {
                  setMarketOutlook(option.id);
                  setExpectedMarketReturn(option.value);
                  setShowAdvancedMarket(false);
                }}
              >
                <i>{marketOutlook === option.id ? "●" : "○"}</i>
                <strong>{option.label}</strong>
                <small>{option.value}%</small>
                <em>{option.note}</em>
              </button>
            ))}
          </div>
          <button className="advanced-assumption-button" onClick={() => setShowAdvancedMarket((value) => !value)}>
            {showAdvancedMarket ? "Hide Advanced Assumptions" : "Advanced Assumptions"}
          </button>
          {showAdvancedMarket && (
            <label className="advisor-range-field advisor-advanced-range">
              <span>Custom expected market return</span>
              <strong>{expectedMarketReturn.toFixed(1)}%</strong>
              <input
                type="range"
                min="3"
                max="10"
                step="0.5"
                value={expectedMarketReturn}
                onChange={(event) => {
                  setMarketOutlook("custom");
                  setExpectedMarketReturn(Number(event.target.value));
                }}
              />
            </label>
          )}
        </div>
      )
    },
    {
      title: "Which interest-rate environment should FamilyOS assume?",
      detail: "Choose a plain-language scenario first. Manual prime-rate controls stay in advanced mode.",
      control: (
        <div className="advisor-preset-control">
          <span>Interest Rate Environment</span>
          <div className="advisor-preset-grid rate-grid">
            {rateEnvironmentOptions.map((option) => (
              <button
                className={rateEnvironment === option.id ? "active" : ""}
                key={option.id}
                onClick={() => {
                  setRateEnvironment(option.id);
                  setPrimeRate(option.value);
                  setShowAdvancedRate(false);
                }}
              >
                <i>{rateEnvironment === option.id ? "●" : "○"}</i>
                <strong>{option.label}</strong>
                <small>{option.value.toFixed(2)}%</small>
                <em>{option.note}</em>
              </button>
            ))}
          </div>
          <button className="advanced-assumption-button" onClick={() => setShowAdvancedRate((value) => !value)}>
            {showAdvancedRate ? "Hide Advanced Assumptions" : "Advanced Assumptions"}
          </button>
          {showAdvancedRate && (
            <label className="advisor-range-field advisor-advanced-range">
              <span>Custom prime-rate assumption</span>
              <strong>{primeRate.toFixed(2)}%</strong>
              <input
                type="range"
                min="2"
                max="6"
                step="0.25"
                value={primeRate}
                onChange={(event) => {
                  setRateEnvironment("custom");
                  setPrimeRate(Number(event.target.value));
                }}
              />
            </label>
          )}
        </div>
      )
    }
  ];

  const applyWhatIf = (scenario: string) => {
    setAdvisorNotice("");
    if (scenario === "increase") setInvestmentAmount((value) => Math.min(50000, value + 5000));
    if (scenario === "delay") setInvestmentHorizon((value) => Math.min(10, value + 1));
    if (scenario === "liquidity") setLiquidityPreference("High");
    if (scenario === "reduce") setInvestmentAmount((value) => Math.max(10000, value - 5000));
    if (scenario === "market") setExpectedMarketReturn((value) => Math.min(10, Number((value + 1).toFixed(1))));
    if (scenario === "rates") setPrimeRate((value) => Math.min(6, Number((value + 0.5).toFixed(2))));
  };
  const actionSteps = [
    ["Review RESP", "Check withdrawal timing, grant treatment, and tuition schedule."],
    ["Student Banking", "Prepare account ownership, debit, credit education, and rent support."],
    ["Rent Budget", "Build first-year rent, food, transit, and parent support assumptions."],
    ["Advisor Meeting", "Review suitability before acting on a real product decision."]
  ];
  const currentControl = controls[controlStep];

  return (
    <main className="advisor-session-page advisor-conversation-flow">
      {step !== "recommend" && (
        <section className="advisor-flow-status">
          {[
            ["customize", "1", "Customize"],
            ["compare", "2", "Compare"],
            ["scenario", "3", "What if"],
            ["action", "4", "Decision path"]
          ].map(([id, number, label]) => (
            <button
              className={step === id || ["customize", "compare", "scenario", "action"].indexOf(step) > ["customize", "compare", "scenario", "action"].indexOf(id) ? "active" : ""}
              key={id}
              onClick={() => setStep(id as ConversationStep)}
            >
              <i>{number}</i>
              <span>{label}</span>
            </button>
          ))}
        </section>
      )}

      {step === "recommend" && (
        isThinking ? (
          <section className="advisor-thinking-card">
            <span className="eyebrow">AI Financial Advisor Experience</span>
            <h2>FamilyOS is building today’s recommendation.</h2>
            <div className="thinking-step-list">
              {thinkingSteps.map((label, index) => (
                <span className={index <= thinkingStep ? "complete" : ""} key={label}>
                  <CheckCircle2 size={17} />
                  {label}
                </span>
              ))}
            </div>
          </section>
        ) : (
          <section className="advisor-first-screen">
            <div className="advisor-first-copy">
              <span className="eyebrow">AI Financial Advisor Experience</span>
              <h2>Based on everything I know about your household, this is the strategy I would recommend.</h2>
              <p>
                Emma's university starts in approximately 10 months. FamilyOS reviewed the family context and found one clear place to start.
              </p>
              <div className="advisor-recommendation-badge">
                <Sparkles size={19} />
                <strong>Recommended: Balanced Education Strategy</strong>
              </div>
              <button className="primary-button advisor-main-cta" onClick={() => setStep("customize")}>
                Customize Recommendation
              </button>
            </div>
            <div className="advisor-first-visual">
              <div className="advisor-panel-header">
                <span>Recommended strategy</span>
                <strong>{strategyTitle}</strong>
              </div>
              <AdvisorProjectionChart
                chartWidth={chartWidth}
                chartHeight={chartHeight}
                chartPadding={chartPadding}
                points={getSeriesPoints(balancedRate)}
                y={getProjectedY(balancedProjection)}
                value={balancedProjection}
                horizon={investmentHorizon}
              />
            </div>
            <div className="advisor-why-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Why this recommendation?</span>
                  <h3>Five signals FamilyOS used</h3>
                </div>
                <small>Tap a card for one more detail.</small>
              </div>
              <div className="advisor-reason-grid">
                {reasoningCards.map((reason) => {
                  const ReasonIcon = reason.icon;
                  return (
                    <button
                      className={expandedReasons[reason.id] ? "expanded" : ""}
                      key={reason.id}
                      onClick={() => setExpandedReasons({ ...expandedReasons, [reason.id]: !expandedReasons[reason.id] })}
                    >
                      <span>
                        <ReasonIcon size={22} />
                        <ChevronRight size={17} />
                      </span>
                      <strong>{reason.title}</strong>
                      <small>{reason.line}</small>
                      {expandedReasons[reason.id] && <em>{reason.expanded}</em>}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )
      )}

      {step === "customize" && (
        <section className="advisor-step-card">
          <div className="advisor-step-header">
            <span className="eyebrow">Customize Recommendation</span>
            <h2>{currentControl.title}</h2>
            <p>{currentControl.detail}</p>
          </div>
          <div className="advisor-control-summary">
            <span>Amount: {formatCurrency(investmentAmount)}</span>
            <span>Horizon: {investmentHorizon}Y</span>
            <span>Liquidity: {liquidityPreference}</span>
            <span>Risk: {riskPreference}</span>
            <span>Market: {marketOutlookLabel}</span>
            <span>Rates: {rateEnvironmentLabel}</span>
          </div>
          <div className="advisor-single-control">{currentControl.control}</div>
          <div className="advisor-live-note">
            <Sparkles size={20} />
            <p>{liveReason}</p>
          </div>
          <div className="advisor-step-actions">
            <small>Question {controlStep + 1} of {controls.length}</small>
            <button
              className="primary-button"
              onClick={() => {
                if (controlStep < controls.length - 1) setControlStep((value) => value + 1);
                else setStep("compare");
              }}
            >
              {controlStep < controls.length - 1 ? "Continue" : "Compare products"}
            </button>
          </div>
        </section>
      )}

      {step === "compare" && (
        <section className="advisor-step-card advisor-compare-stage">
          <div className="advisor-step-header compact">
            <span className="eyebrow">Interactive product comparison</span>
            <h2>Compare pathways across time.</h2>
            <p>Use the legend to turn products on or off. Market-linked products show scenario bands; stable products show tighter lines.</p>
          </div>
          <AdvisorComparisonChart
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            chartPadding={chartPadding}
            timeline={comparisonTimeline}
            yAxisTop={yAxisTop}
            yAxisBottom={yAxisBottom}
            targetBandLow={educationTarget * 0.85}
            targetBandHigh={educationTarget * 1.05}
            selectedProductSeries={selectedProductSeries}
            allProductSeries={productOptions}
            activeProducts={activeProducts}
            setActiveProducts={setActiveProducts}
            getBandPoints={getComparisonBandPoints}
            getSeriesPoints={getComparisonSeriesPoints}
            getRectY={getComparisonRectY}
            getProjectedY={(product) =>
              getComparisonY(getProductValue(product as (typeof productOptions)[number], comparisonHorizon, product.rate))
            }
          />
          <div className="advisor-live-note">
            <Sparkles size={20} />
            <p>{liveReason}</p>
          </div>
          <div className="advisor-step-actions">
            <button className="secondary-button" onClick={() => setStep("customize")}>Adjust assumptions</button>
            <button className="primary-button" onClick={() => setStep("scenario")}>Explore What If</button>
          </div>
        </section>
      )}

      {step === "scenario" && (
        <section className="advisor-step-card advisor-scenario-stage">
          <div className="advisor-step-header compact">
            <span className="eyebrow">What if...</span>
            <h2>Choose one scenario and watch the recommendation change.</h2>
            <p>Each button updates assumptions, the projection, the goal probability, and the AI explanation.</p>
          </div>
          <div className="what-if-grid advisor-what-if-grid">
            {[
              ["increase", "Increase investment by $5,000"],
              ["delay", "Delay university by one year"],
              ["liquidity", "Need emergency liquidity"],
              ["reduce", "Reduce monthly savings"],
              ["market", "Higher market return"],
              ["rates", "Higher interest rates"]
            ].map(([scenario, label]) => (
              <button key={scenario} onClick={() => applyWhatIf(scenario)}>
                {label}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <div className="advisor-scenario-result">
            <div className="advisor-summary-card">
              <Sparkles size={22} />
              <div>
                <span className="eyebrow">Live AI reasoning</span>
                <h3>{strategyTitle}</h3>
                <p>{liveReason}</p>
              </div>
            </div>
            <div className="visual-comparison-card">
              <span className="eyebrow">Education goal</span>
              <h3>{goalProbability}% completion probability</h3>
              <div className="comparison-metric-list">
                {[
                  ["Goal fit", goalProbability],
                  ["Liquidity", liquidityScore],
                  ["Risk level", riskScore],
                  ["Confidence", Math.min(98, goalProbability + 12)]
                ].map(([label, value]) => (
                  <div className="advisor-comparison-metric" key={label}>
                    <span>{label}</span>
                    <i><b style={{ width: `${value}%` }} /></i>
                    <strong>{value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="advisor-step-actions">
            <button className="secondary-button" onClick={() => setStep("compare")}>Back to comparison</button>
            <button className="primary-button" onClick={() => setStep("action")}>Build Action Plan</button>
          </div>
        </section>
      )}

      {step === "action" && (
        <section className="advisor-step-card advisor-action-stage">
          <div className="advisor-step-header compact">
            <span className="eyebrow">Recommended Action Plan</span>
            <h2>Finish with a guided decision path.</h2>
            <p>Complete one step at a time so the family leaves with a clear next action, not a stack of numbers.</p>
          </div>
          <div className="guided-action-list">
            {actionSteps.map(([title, detail], index) => {
              const isComplete = index < actionProgress;
              const isActive = index === actionProgress;
              return (
                <article className={`guided-action-step ${isComplete ? "complete" : ""} ${isActive ? "active" : "locked"}`} key={title}>
                  <i>{isComplete ? <CheckCircle2 size={18} /> : index + 1}</i>
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                  {isActive && (
                    <button className="secondary-button" onClick={() => setActionProgress((value) => Math.min(actionSteps.length, value + 1))}>
                      Continue
                    </button>
                  )}
                </article>
              );
            })}
          </div>
          {actionProgress >= actionSteps.length && (
            <section className="advisor-final-summary">
              <div>
                <span className="eyebrow">AI Summary</span>
                <h3>{strategyTitle}</h3>
              </div>
              <div className="summary-columns">
                <article>
                  <strong>Why this strategy fits</strong>
                  <ul>
                    <li>Matches Emma's university timeline without locking all funds.</li>
                    <li>Uses the existing RESP as the anchor.</li>
                    <li>Protects emergency cash while closing the education gap.</li>
                  </ul>
                </article>
                <article>
                  <strong>Potential risks</strong>
                  <ul>
                    <li>Tuition or rent may be higher than planned.</li>
                    <li>Market-linked options can move below the base case.</li>
                    <li>Advisor review is needed before acting on real products.</li>
                  </ul>
                </article>
                <article>
                  <strong>Key assumptions used</strong>
                  <ul>
                    <li>Market outlook: {marketOutlookLabel}</li>
                    <li>Prime-rate assumption: {rateEnvironmentLabel}</li>
                    <li>Timeline: {investmentHorizon} years</li>
                  </ul>
                </article>
              </div>
              <div className="advisor-action-row">
                <button className="primary-button" onClick={() => setAdvisorNotice("Planning path marked complete for this prototype.")}>Finish Planning</button>
                <button className="secondary-button" onClick={() => setAdvisorNotice("Strategy saved for this prototype session.")}>Save Strategy</button>
                <button className="secondary-button" onClick={() => setAdvisorNotice("Advisor meeting request prepared for review.")}>Book Advisor</button>
              </div>
            </section>
          )}
          {actionProgress < actionSteps.length && (
            <div className="advisor-action-row">
              <button className="primary-button" onClick={() => setAdvisorNotice("Strategy saved for this prototype session.")}>Save Strategy</button>
              <button className="secondary-button" onClick={() => setStep("scenario")}>Compare Another Scenario</button>
              <button className="secondary-button" onClick={() => setAdvisorNotice("Advisor meeting request prepared for review.")}>Book Advisor</button>
            </div>
          )}
          {advisorNotice && <small className="advisor-toast">{advisorNotice}</small>}
        </section>
      )}

      <div className="advisor-disclaimer">
        <AlertTriangle size={17} />
        <span>
          Projected values are illustrative only. Actual rates, eligibility, tax treatment, market performance, and suitability should be
          reviewed with a CIBC advisor.
        </span>
      </div>
    </main>
  );
}

function AdvisorProjectionChart({
  chartWidth,
  chartHeight,
  chartPadding,
  points,
  y,
  value,
  horizon
}: {
  chartWidth: number;
  chartHeight: number;
  chartPadding: number;
  points: string;
  y: number;
  value: number;
  horizon: number;
}) {
  return (
    <div className="advisor-focused-graph">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Recommended strategy projected growth">
        <line x1={chartPadding} y1={chartHeight - chartPadding} x2={chartWidth - chartPadding} y2={chartHeight - chartPadding} />
        <line x1={chartPadding} y1={chartPadding} x2={chartPadding} y2={chartHeight - chartPadding} />
        <polyline points={points} />
        <circle cx={chartWidth - chartPadding} cy={y} r="7" />
        <text x={chartPadding} y={chartHeight - 14}>Now</text>
        <text x={chartWidth - chartPadding - 36} y={chartHeight - 14}>{horizon}Y</text>
      </svg>
      <strong>{formatCurrency(value)}</strong>
      <span>Projected education value using illustrative prototype assumptions.</span>
    </div>
  );
}

function AdvisorComparisonChart({
  chartWidth,
  chartHeight,
  chartPadding,
  timeline,
  yAxisTop,
  yAxisBottom,
  targetBandLow,
  targetBandHigh,
  selectedProductSeries,
  allProductSeries,
  activeProducts,
  setActiveProducts,
  getBandPoints,
  getSeriesPoints,
  getRectY,
  getProjectedY
}: {
  chartWidth: number;
  chartHeight: number;
  chartPadding: number;
  timeline: Array<{ label: string; year: number }>;
  yAxisTop: number;
  yAxisBottom: number;
  targetBandLow: number;
  targetBandHigh: number;
  selectedProductSeries: Array<{
    id: ConversationProductId;
    name: string;
    category: string;
    color: string;
    rate: number;
    band: number;
    fixed: boolean;
    legend: string;
    shape: ConversationProductShape;
  }>;
  allProductSeries: Array<{
    id: ConversationProductId;
    name: string;
    category: string;
    color: string;
    rate: number;
    band: number;
    fixed: boolean;
    legend: string;
    shape: ConversationProductShape;
  }>;
  activeProducts: Record<ConversationProductId, boolean>;
  setActiveProducts: (products: Record<ConversationProductId, boolean>) => void;
  getBandPoints: (product: {
    id: ConversationProductId;
    name: string;
    category: string;
    color: string;
    rate: number;
    band: number;
    fixed: boolean;
    legend: string;
    shape: ConversationProductShape;
  }) => string;
  getSeriesPoints: (product: {
    id: ConversationProductId;
    name: string;
    category: string;
    color: string;
    rate: number;
    band: number;
    fixed: boolean;
    legend: string;
    shape: ConversationProductShape;
  }) => string;
  getRectY: (value: number) => number;
  getProjectedY: (product: { rate: number; shape: ConversationProductShape }) => number;
}) {
  const yTicks = [yAxisTop, Math.round((yAxisTop + yAxisBottom) / 2), yAxisBottom];
  const axisHeight = chartHeight - chartPadding * 2;
  const axisWidth = chartWidth - chartPadding * 2;
  const bandYTop = getRectY(targetBandHigh);
  const bandYBottom = getRectY(targetBandLow);
  const maxTimelineYear = timeline[timeline.length - 1]?.year ?? 5;

  return (
    <div className="advisor-curve-card advisor-curve-card-inline">
      <div className="advisor-chart-overview" aria-hidden="true">
        <i />
        <span />
      </div>
      <svg className="advisor-curve-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Product comparison projection chart">
        <line x1={chartPadding} y1={chartHeight - chartPadding} x2={chartWidth - chartPadding} y2={chartHeight - chartPadding} />
        <line x1={chartPadding} y1={chartPadding} x2={chartPadding} y2={chartHeight - chartPadding} />
        <text className="axis-title" x={chartPadding} y={chartPadding - 18}>Projected value ($)</text>
        <rect
          className="return-comfort-band"
          x={chartPadding}
          y={Math.min(bandYTop, bandYBottom)}
          width={axisWidth}
          height={Math.abs(bandYBottom - bandYTop)}
          rx="4"
        />
        <text className="band-label" x={chartWidth - chartPadding - 124} y={Math.min(bandYTop, bandYBottom) + 19}>
          Education target zone
        </text>
        {yTicks.map((tick, index) => {
          const y = chartPadding + (index / Math.max(1, yTicks.length - 1)) * axisHeight;
          return (
            <g className="axis-tick" key={tick}>
              <line x1={chartPadding} y1={y} x2={chartWidth - chartPadding} y2={y} />
              <text x={10} y={y + 5}>{formatCurrency(tick)}</text>
            </g>
          );
        })}
        {timeline.map((tick) => {
          const x = chartPadding + (tick.year / maxTimelineYear) * axisWidth;
          return (
            <g className="x-axis-tick" key={tick.label}>
              <line x1={x} y1={chartPadding} x2={x} y2={chartHeight - chartPadding} />
              <text x={x - 18} y={chartHeight - 12}>{tick.label}</text>
            </g>
          );
        })}
        {selectedProductSeries.map((product) => (
          <g key={product.id}>
            {!product.fixed && <polygon className="scenario-band" points={getBandPoints(product)} style={{ fill: product.color }} />}
            <polyline className="product-curve" points={getSeriesPoints(product)} style={{ stroke: product.color }} />
            <circle cx={chartWidth - chartPadding} cy={getProjectedY(product)} r="5" style={{ fill: product.color }} />
          </g>
        ))}
      </svg>
      <div className="curve-legend-row">
        {allProductSeries.map((product) => (
          <button
            className={activeProducts[product.id] ? "active" : ""}
            key={product.id}
            onClick={() => setActiveProducts({ ...activeProducts, [product.id]: !activeProducts[product.id] })}
          >
            <i style={{ background: product.color }} />
            <span>{product.name}</span>
            <small>{product.legend}</small>
          </button>
        ))}
      </div>
    </div>
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
  const journeyStages = [
    {
      id: "early",
      label: "Early Family",
      appliesTo: ["New parents", "Families with young children", "Parents setting household foundations"],
      why: "Early family setup creates a foundation for education savings, protection, beneficiaries, and emergency cash flow.",
      triggers: ["New child", "Childcare costs", "Family protection review", "Benefit cash flow changes"],
      support: ["RESP", "Protection review", "Advisor meeting", "Document vault"],
      nextActions: ["Review education savings", "Check protection", "Update beneficiaries"],
      recommendations: [
        {
          title: "Start or review RESP contributions",
          trigger: "A child joins the household or education savings have not been reviewed recently",
          whyNow: "Starting early gives the family more time to save and plan for education costs.",
          step: "Review education savings target and contribution rhythm.",
          support: "RESP, education savings advice, advisor meeting",
          advisor: "Optional",
          confidence: "Medium",
          route: "education" as Route,
          signals: {
            "Age signal": "Child or dependent in household",
            "Life stage signal": "Early family setup",
            "Goal signal": "Education goal can be created early",
            "Account/product signal": "RESP may be relevant",
            "Permission signal": "Parent-guided only",
            "Event signal": "Family cash flow changes"
          }
        },
        {
          title: "Family protection review",
          trigger: "Dependents and household responsibilities increase",
          whyNow: "Coverage needs can change when a family adds dependents or larger shared obligations.",
          step: "Review life, disability, home, and critical illness coverage assumptions.",
          support: "Insurance and protection review, advisor conversation",
          advisor: "Recommended",
          confidence: "Medium",
          route: "protection" as Route,
          signals: {
            "Age signal": "Dependent household",
            "Life stage signal": "Family responsibility expanding",
            "Goal signal": "Protect household obligations",
            "Account/product signal": "Mortgage, insurance, and savings context",
            "Permission signal": "Owner-controlled policy visibility",
            "Event signal": "Family setup or child benefit changes"
          }
        }
      ]
    },
    {
      id: "education",
      label: "Education",
      appliesTo: ["Teen approaching university", "University student", "Adult learner", "Parent supporting tuition", "Returning graduate student"],
      why: "Education planning is not just age-based. It can be triggered by tuition, retraining, rent, RESP withdrawals, or parent support.",
      triggers: ["University in 12 months", "RESP exists", "Rent budget needed", "Student banking decision", "Adult learner returning to school"],
      support: ["RESP", "Student banking", "Budgeting tools", "Advisor meeting"],
      nextActions: ["Review RESP withdrawal timing", "Estimate tuition and rent", "Prepare student banking"],
      recommendations: [
        {
          title: "RESP withdrawal planning",
          trigger: "Emma is expected to start university within 12 months",
          whyNow: "RESP withdrawal timing, tuition, and rent planning should be reviewed before the first semester.",
          step: "Review education plan and map withdrawal timing.",
          support: "RESP, student banking, budgeting tools, advisor meeting",
          advisor: "Optional",
          confidence: "High",
          route: "education" as Route,
          signals: {
            "Age signal": "Emma is 17",
            "Life stage signal": "University expected within 12 months",
            "Goal signal": "Education goal active",
            "Account/product signal": "RESP exists",
            "Permission signal": "Parents can assist; ownership transition is approaching",
            "Event signal": "First-year tuition and rent planning needed"
          }
        },
        {
          title: "Rent and living cost budget",
          trigger: "First-year housing costs are not fully planned",
          whyNow: "Living expenses often determine the real affordability gap, not tuition alone.",
          step: "Build a first-year rent, food, transport, and parent-support budget.",
          support: "Budgeting tools, student banking, parent support transfer planning",
          advisor: "No",
          confidence: "High",
          route: "education" as Route,
          signals: {
            "Age signal": "Emma is near university age",
            "Life stage signal": "First rental or residence decision",
            "Goal signal": "Education and independence goal active",
            "Account/product signal": "RESP and family cash-flow context",
            "Permission signal": "Student consent will matter at age 18",
            "Event signal": "Rent planning before first semester"
          }
        },
        {
          title: "Student banking and credit education",
          trigger: "Account ownership transition is approaching",
          whyNow: "Students may need banking independence, spending controls, and credit education before moving out.",
          step: "Review student account setup, credit education, and family visibility settings.",
          support: "Student banking, credit education, permissions",
          advisor: "No",
          confidence: "High",
          route: "education" as Route,
          signals: {
            "Age signal": "Emma turns 18 soon",
            "Life stage signal": "Student banking transition",
            "Goal signal": "Financial independence goal",
            "Account/product signal": "Student banking and credit education",
            "Permission signal": "Parent visibility should be reviewed",
            "Event signal": "Account ownership transition"
          }
        },
        {
          title: "Adult learner budget",
          trigger: "A family member plans retraining, graduate school, or part-time study",
          whyNow: "Education can happen at any age and may affect income, debt, and savings goals.",
          step: "Model tuition, income changes, emergency reserve, and repayment assumptions.",
          support: "Cash flow planning, savings, advisor conversation",
          advisor: "Optional",
          confidence: "Medium",
          route: "cashflow" as Route,
          signals: {
            "Age signal": "Not age-dependent",
            "Life stage signal": "Returning to school",
            "Goal signal": "Career or education goal",
            "Account/product signal": "Savings and cash-flow context",
            "Permission signal": "Individual owner controls shared visibility",
            "Event signal": "Program start date"
          }
        }
      ]
    },
    {
      id: "career",
      label: "Career & First Income",
      appliesTo: ["Teen with first job", "New graduate", "Adult changing income", "Family member starting full-time work"],
      why: "Income changes create moments to set up direct deposit, savings automation, emergency reserves, tax basics, and credit-building.",
      triggers: ["First paycheque", "New job", "Full-time income", "Tax season", "Subscription and spending changes"],
      support: ["Direct deposit", "Budgeting tools", "TFSA education", "Credit education"],
      nextActions: ["Set direct deposit", "Create first income budget", "Automate savings"],
      recommendations: [
        {
          title: "Direct deposit setup",
          trigger: "First income or new employer",
          whyNow: "First paycheques are a natural moment to introduce daily banking routines.",
          step: "Set up direct deposit and split income into spend, save, and future goals.",
          support: "Student banking, direct deposit setup, savings automation",
          advisor: "No",
          confidence: "High",
          route: "education" as Route,
          signals: {
            "Age signal": "Teen or early career member",
            "Life stage signal": "First income",
            "Goal signal": "Build savings habits",
            "Account/product signal": "Chequing, savings, direct deposit",
            "Permission signal": "Account owner controls access",
            "Event signal": "First job or new payroll"
          }
        },
        {
          title: "Emergency fund and TFSA education",
          trigger: "Income becomes more predictable",
          whyNow: "A steady income can support a reserve and introduce tax-efficient saving concepts.",
          step: "Set an emergency target and review TFSA education if eligible.",
          support: "Savings goals, TFSA education, advisor review if investing",
          advisor: "Optional",
          confidence: "Medium",
          route: "investments" as Route,
          signals: {
            "Age signal": "Often 18+, but context-driven",
            "Life stage signal": "Income stability",
            "Goal signal": "Emergency reserve and first investing",
            "Account/product signal": "Savings and TFSA education",
            "Permission signal": "Private account ownership respected",
            "Event signal": "Full-time work or tax season"
          }
        }
      ]
    },
    {
      id: "home",
      label: "Homeownership",
      appliesTo: ["First-time buyer", "Renewing homeowner", "Family renovating", "Adult buying later in life"],
      why: "Homeownership can happen at many ages and often connects mortgage, protection, cash flow, property tax, and renovation reserves.",
      triggers: ["Down payment goal", "Mortgage renewal", "HELOC change", "Property tax", "Renovation planning"],
      support: ["Mortgage readiness", "Renewal planning", "HELOC review", "Home insurance"],
      nextActions: ["Review mortgage readiness", "Plan renewal window", "Check protection"],
      recommendations: [
        {
          title: "Mortgage renewal preparation",
          trigger: "Renewal is 14 months away",
          whyNow: "Families benefit from preparing before renewal pressure begins.",
          step: "Review rate scenarios, monthly cash flow, and advisor timing.",
          support: "Mortgage renewal planning, advisor meeting",
          advisor: "Recommended",
          confidence: "High",
          route: "housing" as Route,
          signals: {
            "Age signal": "Not age-dependent",
            "Life stage signal": "Homeowner responsibility",
            "Goal signal": "Housing stability",
            "Account/product signal": "CIBC mortgage exists",
            "Permission signal": "Joint household visibility",
            "Event signal": "Renewal window approaching"
          }
        },
        {
          title: "Renovation reserve and HELOC caution",
          trigger: "Home upgrade and HELOC activity are active planning topics",
          whyNow: "Renovation goals should be balanced against cash flow and borrowing costs.",
          step: "Build a renovation reserve and review HELOC utilization.",
          support: "Housing Hub, HELOC review, savings goals",
          advisor: "Optional",
          confidence: "Medium",
          route: "housing" as Route,
          signals: {
            "Age signal": "Not age-dependent",
            "Life stage signal": "Home upgrade",
            "Goal signal": "Renovation and housing goal",
            "Account/product signal": "Mortgage and HELOC context",
            "Permission signal": "Shared owner visibility only",
            "Event signal": "Quarterly utilization change"
          }
        }
      ]
    },
    {
      id: "family",
      label: "Family Building",
      appliesTo: ["Partners combining goals", "Parents coordinating children", "Families supporting multiple generations"],
      why: "Family building connects shared cash flow, subscriptions, protection, beneficiaries, emergency reserve, and joint goals.",
      triggers: ["Shared bills", "Child expenses", "Partner planning", "Protection review", "Subscription overlap"],
      support: ["Cash flow", "Subscription Control", "Protection", "Goal Evaluator"],
      nextActions: ["Review shared cash flow", "Assign bill owners", "Check protection"],
      recommendations: [
        {
          title: "Shared household cash flow",
          trigger: "Multiple family responsibilities overlap",
          whyNow: "Education, caregiving, mortgage, and subscriptions all affect the safe-to-spend picture.",
          step: "Review shared bills, owners, and emergency reserve coverage.",
          support: "Cash flow manager, Subscription Control, Goal Evaluator",
          advisor: "No",
          confidence: "High",
          route: "cashflow" as Route,
          signals: {
            "Age signal": "Multiple family ages",
            "Life stage signal": "Peak family responsibility",
            "Goal signal": "Education, care, housing",
            "Account/product signal": "Cards, mortgage, savings",
            "Permission signal": "Role-based family view",
            "Event signal": "Monthly shared expenses"
          }
        },
        {
          title: "Family protection and beneficiary review",
          trigger: "Dependents, mortgage, and elder support are active",
          whyNow: "Coverage and beneficiaries should reflect actual family responsibilities.",
          step: "Review policy coverage, beneficiary status, and document ownership.",
          support: "Protection, Documents Vault, advisor meeting",
          advisor: "Recommended",
          confidence: "Medium",
          route: "protection" as Route,
          signals: {
            "Age signal": "Cross-generational household",
            "Life stage signal": "Family building and support",
            "Goal signal": "Protection and continuity",
            "Account/product signal": "Insurance and document context",
            "Permission signal": "Owner-controlled sharing",
            "Event signal": "Annual review window"
          }
        }
      ]
    },
    {
      id: "caregiving",
      label: "Caregiving",
      appliesTo: ["Adult child caregiver", "Older parent", "Family member with care expenses", "Trusted contact"],
      why: "Caregiving can start unexpectedly and needs permissioned visibility, care budgets, fraud alerts, POA readiness, and approved bill payment.",
      triggers: ["Care spending increase", "Unusual activity", "POA missing", "Approved bill payment needed"],
      support: ["Caregiving Mode", "Permissions", "Fraud alerts", "Documents Vault"],
      nextActions: ["Review care budget", "Confirm permissions", "Upload POA"],
      recommendations: [
        {
          title: "Care budget and unusual activity review",
          trigger: "Grace's care spending increased and an unusual transaction needs review",
          whyNow: "Care-related changes should be reviewed while keeping Grace in control of permissions.",
          step: "Review care budget, approved bill payment, and unusual activity alert.",
          support: "Caregiving Mode, fraud alerts, approved bill payment",
          advisor: "Optional",
          confidence: "High",
          route: "caregiving" as Route,
          signals: {
            "Age signal": "Grace is 72",
            "Life stage signal": "Light caregiving support",
            "Goal signal": "Support aging parent",
            "Account/product signal": "Permissioned care budget activity",
            "Permission signal": "Grace controls access and can revoke it",
            "Event signal": "Care spending increased this quarter"
          }
        },
        {
          title: "POA and trusted contact readiness",
          trigger: "Caregiving permissions are active but POA readiness is incomplete",
          whyNow: "Families need clarity before urgent decisions, not during them.",
          step: "Upload or confirm POA, trusted contacts, and emergency access settings.",
          support: "Documents Vault, Permissions, advisor prompt",
          advisor: "Recommended",
          confidence: "Medium",
          route: "documents" as Route,
          signals: {
            "Age signal": "Older parent in family profile",
            "Life stage signal": "Caregiving responsibility",
            "Goal signal": "Care continuity",
            "Account/product signal": "Document vault and permissions",
            "Permission signal": "Consent-based access only",
            "Event signal": "POA document missing"
          }
        }
      ]
    },
    {
      id: "retirement",
      label: "Retirement",
      appliesTo: ["Pre-retiree", "Retired parent", "Later-career adult", "Family managing income transition"],
      why: "Retirement planning connects income, simplified bills, fraud alerts, insurance, beneficiaries, and advisor review.",
      triggers: ["Income transition", "RRSP/RRIF education", "CPP/OAS education", "Simplified bill needs"],
      support: ["RRSP/RRIF education", "Advisor review", "Bill management", "Fraud alerts"],
      nextActions: ["Map income timing", "Review bill simplicity", "Check beneficiaries"],
      recommendations: [
        {
          title: "Retirement income and bill simplicity",
          trigger: "Grace is retired and has care-related spending",
          whyNow: "Predictable income, simpler bill management, and alerts can reduce stress.",
          step: "Review income timing, bill setup, and trusted alerts.",
          support: "Retirement income review, bill management, fraud alerts",
          advisor: "Recommended",
          confidence: "Medium",
          route: "investments" as Route,
          signals: {
            "Age signal": "Grace is 72",
            "Life stage signal": "Retirement income",
            "Goal signal": "Stable care and bills",
            "Account/product signal": "RRSP/RRIF education and account summary",
            "Permission signal": "Owner-approved visibility",
            "Event signal": "Care budget activity"
          }
        }
      ]
    },
    {
      id: "legacy",
      label: "Legacy",
      appliesTo: ["Parents", "Older adults", "Care recipients", "Families coordinating documents", "Wealth transfer conversations"],
      why: "Legacy planning organizes wills, POA, beneficiaries, insurance policies, document sharing, and advisor conversations.",
      triggers: ["Will outdated", "POA missing", "Beneficiary review due", "Family document sharing needed"],
      support: ["Documents Vault", "Wealth & Legacy", "Permissions", "Advisor meeting"],
      nextActions: ["Review will status", "Confirm beneficiaries", "Set document permissions"],
      recommendations: [
        {
          title: "Estate document and beneficiary review",
          trigger: "Legacy documents have not been reviewed recently",
          whyNow: "Document readiness reduces confusion when family responsibilities change.",
          step: "Review will, POA, beneficiaries, insurance policies, and sharing permissions.",
          support: "Documents Vault, Wealth & Legacy, advisor meeting",
          advisor: "Recommended",
          confidence: "Medium",
          route: "documents" as Route,
          signals: {
            "Age signal": "Cross-generational family",
            "Life stage signal": "Legacy and wealth transfer readiness",
            "Goal signal": "Estate document organization",
            "Account/product signal": "Insurance and document vault context",
            "Permission signal": "Document sharing is role-based",
            "Event signal": "Documents not updated recently"
          }
        }
      ]
    }
  ];

  const memberJourneys = [
    {
      name: "Alex Chen",
      age: 42,
      role: "Primary user / parent",
      stage: "Homeownership and parent support",
      image: onboardingImage,
      route: "housing" as Route,
      current: ["Mortgage renewal", "Family cash flow", "Parent caregiving"],
      upcoming: ["Retirement contribution review", "Protection planning"],
      support: ["Mortgage renewal", "Caregiving Mode", "Goal Evaluator"],
      journey: ["Homeownership", "Parent support", "Caregiving", "Retirement contribution review"],
      recommendation: {
        title: "Mortgage renewal and caregiving overlap",
        trigger: "Mortgage renewal is 14 months away while parent support is active",
        whyNow: "Alex may need to coordinate housing decisions with education and caregiving cash flow.",
        step: "Review renewal readiness and family cash-flow capacity.",
        support: "Housing Hub, Goal Evaluator, advisor meeting",
        advisor: "Recommended",
        confidence: "High",
        route: "housing" as Route,
        signals: {
          "Age signal": "Alex is 42",
          "Life stage signal": "Parent peak-responsibility years",
          "Goal signal": "Housing, education, caregiving",
          "Account/product signal": "Mortgage and family cash flow",
          "Permission signal": "Care access depends on Grace's consent",
          "Event signal": "Renewal window approaching"
        }
      }
    },
    {
      name: "Jamie Chen",
      age: 40,
      role: "Spouse / partner",
      stage: "Household coordination",
      image: onboardingImage,
      route: "protection" as Route,
      current: ["Household cash flow", "Protection review", "RESP planning"],
      upcoming: ["Retirement goal review"],
      support: ["Cash Flow", "Protection", "Education Planner"],
      journey: ["Household cash flow", "Protection review", "RESP planning", "Retirement goal review"],
      recommendation: {
        title: "Protection and RESP review",
        trigger: "Jamie shares household expenses and education planning responsibilities",
        whyNow: "Coverage and education planning should reflect dependents, mortgage, and family goals.",
        step: "Review protection coverage and RESP contribution assumptions.",
        support: "Protection, RESP, advisor meeting",
        advisor: "Optional",
        confidence: "Medium",
        route: "protection" as Route,
        signals: {
          "Age signal": "Jamie is 40",
          "Life stage signal": "Household coordination",
          "Goal signal": "Protection and education",
          "Account/product signal": "Insurance, RESP, cash flow",
          "Permission signal": "Shared household view",
          "Event signal": "Annual coverage review"
        }
      }
    },
    {
      name: "Emma Chen",
      age: 17,
      role: "Student",
      stage: "University transition",
      image: educationImage,
      route: "education" as Route,
      current: ["RESP withdrawal planning", "Student banking", "Rent budgeting"],
      upcoming: ["Account ownership transition", "Credit education"],
      support: ["RESP", "Student banking", "Budgeting tools"],
      journey: ["University transition", "Account ownership transition", "First apartment", "Early credit building", "Early investing"],
      recommendation: journeyStages[1].recommendations[0]
    },
    {
      name: "Ethan Chen",
      age: 11,
      role: "Dependent",
      stage: "Primary school money habits",
      image: educationImage,
      route: "education" as Route,
      current: ["Savings goal", "Allowance rhythm", "RESP tracking"],
      upcoming: ["Pre-teen debit preparation", "First job readiness"],
      support: ["Savings habits", "Family goal coaching", "RESP tracking"],
      journey: ["Primary school money habits", "Pre-teen spending", "First debit habits", "First job readiness"],
      recommendation: {
        title: "Parent-guided money habits",
        trigger: "Ethan is 11 and ready for simple savings and spending reflection",
        whyNow: "Primary school is a gentle window to build habits before teen independence.",
        step: "Create a savings goal and allowance rhythm.",
        support: "Savings goal, family coaching prompts",
        advisor: "No",
        confidence: "Medium",
        route: "education" as Route,
        signals: {
          "Age signal": "Ethan is 11",
          "Life stage signal": "Primary school money habits",
          "Goal signal": "Financial literacy and savings habit",
          "Account/product signal": "RESP tracking and savings goal",
          "Permission signal": "Parent-guided only",
          "Event signal": "Pre-teen spending window"
        }
      }
    },
    {
      name: "Grace Chen",
      age: 72,
      role: "Care recipient",
      stage: "Retirement and caregiving support",
      image: caregivingImage,
      route: "caregiving" as Route,
      current: ["Retirement income", "Simplified bills", "Caregiving permissions"],
      upcoming: ["Fraud alerts", "Legacy documents"],
      support: ["Caregiving Mode", "Permissions", "Documents Vault"],
      journey: ["Retirement income", "Simplified bills", "Caregiving permissions", "Fraud alerts", "Legacy documents"],
      recommendation: journeyStages[5].recommendations[0]
    }
  ];

  const [mode, setMode] = useState<"stage" | "age">("stage");
  const [selectedStageId, setSelectedStageId] = useState("education");
  const [selectedMemberName, setSelectedMemberName] = useState("Emma Chen");
  const [selectedRecommendationTitle, setSelectedRecommendationTitle] = useState("RESP withdrawal planning");

  const selectedJourneyStage = journeyStages.find((stage) => stage.id === selectedStageId) ?? journeyStages[1];
  const selectedMemberJourney = memberJourneys.find((member) => member.name === selectedMemberName) ?? memberJourneys[2];
  const recommendations = mode === "stage" ? selectedJourneyStage.recommendations : [selectedMemberJourney.recommendation];
  const selectedRecommendation =
    recommendations.find((recommendation) => recommendation.title === selectedRecommendationTitle) ?? recommendations[0];

  const chooseStage = (stageId: string) => {
    const nextStage = journeyStages.find((stage) => stage.id === stageId) ?? journeyStages[1];
    setSelectedStageId(stageId);
    setSelectedRecommendationTitle(nextStage.recommendations[0].title);
  };

  const chooseMember = (memberName: string) => {
    const nextMember = memberJourneys.find((member) => member.name === memberName) ?? memberJourneys[2];
    setSelectedMemberName(memberName);
    setSelectedRecommendationTitle(nextMember.recommendation.title);
  };

  const modeLabel = mode === "stage" ? "Explore by Life Stage" : "Explore by Age Timeline";

  return (
    <main className="module-page journey-engine-page">
      <section className="journey-hero-card">
        <div>
          <span className="section-kicker">Family Journey Engine</span>
          <h2>Explore your family's next financial moments.</h2>
          <p>
            FamilyOS combines age, life events, goals, accounts, and permissions to recommend what each family member
            may need next.
          </p>
          <blockquote>
            Life stages are not always age-based. FamilyOS uses age as one signal, but recommendations are driven by
            family context.
          </blockquote>
        </div>
        <img src={onboardingImage} alt="Family reviewing journey recommendations together" />
      </section>

      <section className="journey-mode-card">
        <div className="journey-mode-header">
          <div>
            <span className="section-kicker">{modeLabel}</span>
            <h3>{mode === "stage" ? "Start with context, not birthdays." : "See age-triggered moments across the Chen family."}</h3>
            <p>
              {mode === "stage"
                ? "Explore by life stage when your family's journey does not follow a traditional timeline."
                : "Explore by age timeline to see upcoming age-triggered milestones."}
            </p>
          </div>
          <div className="journey-mode-toggle" role="tablist" aria-label="Journey exploration mode">
            <button className={mode === "stage" ? "active" : ""} onClick={() => setMode("stage")}>
              Explore by Life Stage
            </button>
            <button className={mode === "age" ? "active" : ""} onClick={() => setMode("age")}>
              Explore by Age Timeline
            </button>
          </div>
        </div>

        {mode === "stage" ? (
          <>
            <div className="journey-stage-map" aria-label="Life stage journey map">
              {journeyStages.map((stage, index) => (
                <button key={stage.id} className={stage.id === selectedStageId ? "active" : ""} onClick={() => chooseStage(stage.id)}>
                  <i>{index + 1}</i>
                  <strong>{stage.label}</strong>
                </button>
              ))}
            </div>
            <div className="journey-detail-panel">
              <div>
                <span className="section-kicker">{selectedJourneyStage.label}</span>
                <h3>{selectedJourneyStage.why}</h3>
                <p>Life stage is flexible: this stage may apply because of a goal, event, family role, or responsibility.</p>
              </div>
              <div className="journey-detail-grid">
                <article>
                  <span>Who it applies to</span>
                  {selectedJourneyStage.appliesTo.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </article>
                <article>
                  <span>Common triggers</span>
                  {selectedJourneyStage.triggers.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </article>
                <article>
                  <span>Related CIBC support</span>
                  {selectedJourneyStage.support.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </article>
                <article>
                  <span>Recommended next actions</span>
                  {selectedJourneyStage.nextActions.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </article>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="age-timeline-visual" aria-label="Chen family age timeline">
              <div className="age-axis">
                {[0, 5, 10, 15, 20, 30, 40, 50, 60, 70].map((age) => (
                  <span key={age} style={{ left: `${Math.min(100, (age / 75) * 100)}%` }}>
                    {age === 70 ? "70+" : age}
                  </span>
                ))}
              </div>
              <div className="age-line" />
              {memberJourneys.map((member) => (
                <button
                  key={member.name}
                  className={member.name === selectedMemberName ? "active" : ""}
                  style={{ left: `${Math.min(100, (member.age / 75) * 100)}%` }}
                  onClick={() => chooseMember(member.name)}
                >
                  <strong>{member.name.split(" ")[0]}</strong>
                  <span>{member.age}</span>
                </button>
              ))}
            </div>
            <div className="member-age-detail">
              <img src={selectedMemberJourney.image} alt={`${selectedMemberJourney.name} journey`} />
              <div>
                <span className="section-kicker">{selectedMemberJourney.name} · Age {selectedMemberJourney.age}</span>
                <h3>{selectedMemberJourney.stage}</h3>
                <p>
                  Some recommendations are triggered by age, while others come from goals, events, permissions, or family
                  responsibilities.
                </p>
                <div className="member-signal-columns">
                  <article>
                    <strong>Current recommendations</strong>
                    {selectedMemberJourney.current.map((item) => (
                      <small key={item}>{item}</small>
                    ))}
                  </article>
                  <article>
                    <strong>Upcoming milestones</strong>
                    {selectedMemberJourney.upcoming.map((item) => (
                      <small key={item}>{item}</small>
                    ))}
                  </article>
                  <article>
                    <strong>Related CIBC support</strong>
                    {selectedMemberJourney.support.map((item) => (
                      <small key={item}>{item}</small>
                    ))}
                  </article>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="journey-recommendation-section">
        <div className="section-heading">
          <h2>{mode === "stage" ? `${selectedJourneyStage.label} recommendations` : `${selectedMemberJourney.name}'s recommendations`}</h2>
          <p>Each recommendation stays educational and routes to an existing FamilyOS module or CIBC support pathway.</p>
        </div>
        <div className="journey-recommendation-grid">
          {recommendations.map((recommendation) => (
            <button
              key={recommendation.title}
              className={recommendation.title === selectedRecommendation.title ? "active" : ""}
              onClick={() => setSelectedRecommendationTitle(recommendation.title)}
            >
              <span>{recommendation.confidence} confidence</span>
              <h3>{recommendation.title}</h3>
              <p><b>Trigger:</b> {recommendation.trigger}</p>
              <p><b>Why now:</b> {recommendation.whyNow}</p>
              <p><b>Next step:</b> {recommendation.step}</p>
              <div>
                <small>Advisor needed: {recommendation.advisor}</small>
                <small>{recommendation.support}</small>
              </div>
              <strong>View details</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="recommendation-logic-card">
        <div>
          <span className="section-kicker">Why FamilyOS recommends this</span>
          <h2>{selectedRecommendation.title}</h2>
          <p>{selectedRecommendation.step}</p>
          <button className="primary-button compact" onClick={() => onNavigate(selectedRecommendation.route)}>
            Open related module
          </button>
        </div>
        <div className="logic-signal-grid">
          {Object.entries(selectedRecommendation.signals).map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="member-journey-section">
        <div className="card-title-row">
          <div>
            <h2>Member-specific journey</h2>
            <p>Click a family member to see the path FamilyOS is watching for them.</p>
          </div>
        </div>
        <div className="member-journey-layout">
          <div className="member-journey-list">
            {memberJourneys.map((member) => (
              <button
                key={member.name}
                className={member.name === selectedMemberName ? "active" : ""}
                onClick={() => chooseMember(member.name)}
              >
                <span>{member.age}</span>
                <strong>{member.name}</strong>
                <small>{member.role}</small>
              </button>
            ))}
          </div>
          <div className="personal-journey-path">
            {selectedMemberJourney.journey.map((item, index) => (
              <article key={item} className={index === 0 ? "active" : ""}>
                <i>{index + 1}</i>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-principles-row">
        {[
          ["Context-driven", "Age is only one signal."],
          ["Consent-aware", "Recommendations do not expose personal details without permission."],
          ["Advisor-ready", "Major banking decisions route to review, not automatic action."]
        ].map(([title, text]) => (
          <article key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </article>
        ))}
      </section>
    </main>
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
  const items = compact ? readinessStatuses.filter(([label]) => label !== "Retirement") : readinessStatuses;
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

function ChoiceGrid({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="choice-grid">
      {options.map((option) => (
        <button key={option} className={value === option ? "active" : ""} onClick={() => onChange(option)}>
          <span>{option}</span>
        </button>
      ))}
    </div>
  );
}

function SmallIllustration({ image, caption }: { image: string; caption: string }) {
  return (
    <figure className="small-illustration">
      <img src={image} alt={caption} />
      <figcaption>{caption}</figcaption>
    </figure>
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
        <span>AI household financial concierge</span>
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
    dashboard: "Home",
    overview: "Home",
    ai: "Family Advisor",
    planning: "Journeys",
    investments: "Product Learning",
    family: "My Household",
    insights: "Advisor Summary"
  };
  return titles[route] ?? navItems.find((item) => item.route === route)?.label ?? "Home";
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
