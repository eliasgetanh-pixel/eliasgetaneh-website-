import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowUpRight,
  Camera,
  ChevronDown,
  Download,
  FileText,
  Globe,
  Image as ImageIcon,
  Languages,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Moon,
  Navigation,
  Palette,
  Phone,
  Save,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  Upload,
  User,
  X,
} from "lucide-react";
import "./style.css";

const SITE_KEY = "elias-getaneh";
const LOCAL_KEY = "elias-v3-profile";
const LANG_KEY = "elias-v3-lang";
const THEME_KEY = "elias-v3-theme";
const STORAGE_BUCKET = "portfolio-media";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const cloudEnabled = Boolean(supabaseUrl && supabaseAnonKey);

const supabase = cloudEnabled
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

const defaults = {
  name: "Elias Getaneh",
  location: "Dubai, United Arab Emirates",
  experience: "6+",
  license: "UAE Light Vehicle License",
  languages: "English • Amharic",
  phone: "",
  email: "",
  whatsapp: "",
  cvUrl: "",

  photoUrl: "/elias_portrait.jpg",
  heroBackgroundUrl: "",
  pageBackgroundUrl: "",

  themePreset: "midnight",
  accent: "#d7b26d",
  accent2: "#68d5d0",

  roleEn: "Professional Light Vehicle Driver",
  roleAm: "ፕሮፌሽናል ቀላል ተሽከርካሪ አሽከርካሪ",
  roleAr: "سائق مركبة خفيفة محترف",
  roleOm: "Konkolaachisaa Konkolaataa Salphaa Ogummaa",

  availabilityEn: "Available for professional opportunities",
  availabilityAm: "ለሙያዊ የሥራ እድሎች ዝግጁ",
  availabilityAr: "متاح للفرص المهنية",
  availabilityOm: "Carraa hojii ogummaaf qophaa'e",

  aboutEn:
    "Professional driver with strong knowledge of Dubai and UAE roads. Focused on safe journeys, punctuality, respectful customer service and reliable transportation.",

  aboutAm:
    "የዱባይን እና የUAE መንገዶችን በደንብ የሚያውቅ ፕሮፌሽናል አሽከርካሪ። ደህንነት፣ ሰዓት አክባሪነት፣ አክብሮት ያለው የደንበኛ አገልግሎት እና ታማኝ መጓጓዣ ዋና ትኩረቴ ናቸው።",

  aboutAr:
    "سائق محترف يتمتع بمعرفة قوية بطرق دبي والإمارات، مع التركيز على السلامة والالتزام بالمواعيد وخدمة العملاء باحترام والنقل الموثوق.",

  aboutOm:
    "Konkolaachisaa ogummaa kan daandiiwwan Dubai fi UAE beekumsa gaarii qabu. Nageenya, yeroo kabajuu, tajaajila maamilaa kabajaa qabu fi geejjiba amanamaa irratti xiyyeeffadha.",
};

const UI = {
  en: {
    home: "Home",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    services: "Services",
    contact: "Contact",

    heroTop: "DUBAI • UAE • PROFESSIONAL DRIVER",
    heroA: "DRIVE WITH",
    heroB: "CONFIDENCE.",
    heroText:
      "Safe journeys. Professional service. UAE road knowledge.",

    contactMe: "Contact me",
    viewProfile: "Explore profile",

    years: "Years experience",
    roads: "UAE road knowledge",
    safety: "Safety first",

    quick: "Quick profile",
    license: "License",
    location: "Location",
    languages: "Languages",

    aboutMe: "About me",
    aboutTitle: "Professional on every journey.",
    aboutSub: "Reliable by design.",
    print: "Print / Save PDF",

    experienceTitle: "Experience built on the road.",
    experienceSub: "Calm. Practical. Dependable.",

    skillsTitle: "Core strengths.",
    skillsSub: "Focused on the details that matter.",

    serviceTitle: "What I bring.",
    serviceSub: "A premium standard of driving service.",

    connect: "Let's connect.",
    connectSub: "Your next journey starts here.",

    generalArea: "General service area — not live location",
    ready: "Ready to talk?",
    quickMessage: "Quick message",
    yourName: "Your name",
    message: "Write a short message about the opportunity…",
    sendWhatsApp: "Send via WhatsApp",
    sendEmail: "Send via Email",
    share: "Share this page",
    backTop: "Back to top",

    owner: "Owner",
    studio: "Owner Studio",
    ownerOnly: "Owner controls",
    signIn: "Owner sign in",
    password: "Password",
    login: "Sign in",
    logout: "Sign out",

    cloudNotConnected: "Secure cloud owner mode is not connected yet.",
    localPreview: "Use local preview editor",
    localNote:
      "Local preview changes stay only in this browser and are not shared with visitors.",

    content: "Content",
    media: "Media",
    theme: "Theme",
    save: "Save changes",
    close: "Close",

    profilePhoto: "Profile photo",
    heroBackground: "Hero background",
    pageBackground: "Page background",
    cv: "CV / Resume",
    upload: "Upload",
    remove: "Remove",

    themePreset: "Theme preset",
    accent: "Accent",
    accent2: "Secondary accent",

    publicInfo: "Public profile",
    role: "Professional title",
    availability: "Availability status",
    aboutText: "About text",
    phone: "Phone",
    whatsapp: "WhatsApp",
    cvUrl: "CV URL",

    cloudSave: "Saved to cloud.",
    localSave: "Saved locally on this device.",
    uploading: "Uploading…",
    notOwner: "This account is not the owner of this portfolio.",

    exp1Title: "Professional Driving",
    exp1Meta: "Dubai • UAE",
    exp1Desc:
      "Safe, punctual and professional passenger transportation with a strong customer-service mindset.",

    exp2Title: "Route & Navigation",
    exp2Meta: "Dubai & UAE Roads",
    exp2Desc:
      "Confident route planning using local road knowledge, GPS and modern navigation tools.",

    exp3Title: "Service & Reliability",
    exp3Meta: "Professional Standard",
    exp3Desc:
      "Calm communication, dependable scheduling and attention to passenger comfort.",

    skill1: "Safe & Defensive Driving",
    skill2: "Dubai / UAE Road Knowledge",
    skill3: "GPS & Route Planning",
    skill4: "Punctuality & Reliability",
    skill5: "Customer Service",
    skill6: "Vehicle Care Awareness",

    service1: "Local Navigation",
    service1d:
      "Practical knowledge of Dubai routes and wider UAE roads.",

    service2: "Safety Mindset",
    service2d:
      "Responsible driving with passenger safety and comfort first.",

    service3: "Professional Service",
    service3d:
      "Respectful communication, punctual pickup and polished presentation.",

    visualNote:
      "Skill bars are a visual portfolio summary, not test scores.",
  },

  am: {
    home: "መነሻ",
    about: "ስለ እኔ",
    experience: "የሥራ ልምድ",
    skills: "ችሎታዎች",
    services: "አገልግሎቶች",
    contact: "መገናኛ",

    heroTop: "ዱባይ • UAE • ፕሮፌሽናል አሽከርካሪ",
    heroA: "በእምነት",
    heroB: "ይጓዙ።",
    heroText:
      "ደህንነታዊ ጉዞ። ፕሮፌሽናል አገልግሎት። የUAE መንገድ እውቀት።",

    contactMe: "አግኙኝ",
    viewProfile: "መገለጫዬን ይመልከቱ",

    years: "ዓመት ልምድ",
    roads: "የUAE መንገድ እውቀት",
    safety: "ደህንነት ቅድሚያ",

    quick: "ፈጣን መገለጫ",
    license: "መንጃ ፈቃድ",
    location: "አካባቢ",
    languages: "ቋንቋዎች",

    aboutMe: "ስለ እኔ",
    aboutTitle: "በእያንዳንዱ ጉዞ ፕሮፌሽናል።",
    aboutSub: "በታማኝነት የተገነባ።",
    print: "አትም / PDF አስቀምጥ",

    experienceTitle: "በመንገድ ላይ የተገነባ ልምድ።",
    experienceSub: "የተረጋጋ። ተግባራዊ። ታማኝ።",

    skillsTitle: "ዋና ጥንካሬዎች።",
    skillsSub: "አስፈላጊ ዝርዝሮች ላይ ትኩረት።",

    serviceTitle: "የማመጣው እሴት።",
    serviceSub: "ከፍተኛ ደረጃ የመንዳት አገልግሎት።",

    connect: "እንገናኝ።",
    connectSub: "ቀጣዩ ጉዞ እዚህ ይጀምራል።",

    generalArea:
      "አጠቃላይ የአገልግሎት አካባቢ — live location አይደለም",

    ready: "ለመነጋገር ዝግጁ ነዎት?",
    quickMessage: "ፈጣን መልዕክት",
    yourName: "ስምዎ",
    message: "ስለ የሥራ እድሉ አጭር መልዕክት ይጻፉ…",
    sendWhatsApp: "በWhatsApp ላክ",
    sendEmail: "በኢሜይል ላክ",
    share: "ገጹን አጋራ",
    backTop: "ወደ ላይ",

    owner: "ባለቤት",
    studio: "የባለቤት ስቱዲዮ",
    ownerOnly: "የባለቤት መቆጣጠሪያ",
    signIn: "የባለቤት መግቢያ",
    password: "የይለፍ ቃል",
    login: "ግባ",
    logout: "ውጣ",

    cloudNotConnected:
      "Secure cloud owner mode ገና አልተገናኘም።",

    localPreview: "Local preview editor ተጠቀም",

    localNote:
      "Local preview ለውጦች በዚህ browser ብቻ ይቀመጣሉ።",

    content: "ይዘት",
    media: "ፎቶ / ፋይል",
    theme: "ዲዛይን",
    save: "ለውጥ አስቀምጥ",
    close: "ዝጋ",

    profilePhoto: "የፕሮፋይል ፎቶ",
    heroBackground: "ዋና ባክግራውንድ",
    pageBackground: "የገጽ ባክግራውንድ",
    cv: "CV / Resume",
    upload: "ጫን",
    remove: "አስወግድ",

    themePreset: "የዲዛይን አይነት",
    accent: "ዋና ቀለም",
    accent2: "ሁለተኛ ቀለም",

    publicInfo: "የህዝብ መገለጫ",
    role: "የሙያ ርዕስ",
    availability: "የሥራ ዝግጁነት",
    aboutText: "ስለ እኔ ጽሑፍ",
    phone: "ስልክ",
    whatsapp: "WhatsApp",
    cvUrl: "የCV ሊንክ",

    cloudSave: "ወደ cloud ተቀምጧል።",
    localSave: "በዚህ መሣሪያ ላይ ተቀምጧል።",
    uploading: "በመጫን ላይ…",
    notOwner: "ይህ account የportfolioው ባለቤት አይደለም።",

    exp1Title: "ፕሮፌሽናል መንዳት",
    exp1Meta: "ዱባይ • UAE",
    exp1Desc:
      "ደህንነታዊ፣ በሰዓቱ እና ፕሮፌሽናል የተሳፋሪ መጓጓዣ ከጥሩ የደንበኛ አገልግሎት ጋር።",

    exp2Title: "መንገድ እና ናቪጌሽን",
    exp2Meta: "ዱባይ እና UAE መንገዶች",
    exp2Desc:
      "የአካባቢ መንገድ እውቀትን፣ GPSን እና ዘመናዊ ናቪጌሽንን በመጠቀም ትክክለኛ የመንገድ እቅድ።",

    exp3Title: "አገልግሎት እና ታማኝነት",
    exp3Meta: "ፕሮፌሽናል ደረጃ",
    exp3Desc:
      "የተረጋጋ ግንኙነት፣ ታማኝ የጊዜ እቅድ እና ለተሳፋሪ ምቾት ትኩረት።",

    skill1: "ደህንነታዊ እና መከላከያዊ መንዳት",
    skill2: "የዱባይ / UAE መንገድ እውቀት",
    skill3: "GPS እና የመንገድ እቅድ",
    skill4: "ሰዓት አክባሪነት እና ታማኝነት",
    skill5: "የደንበኛ አገልግሎት",
    skill6: "የተሽከርካሪ እንክብካቤ",

    service1: "የአካባቢ መንገድ እውቀት",
    service1d:
      "የዱባይ እና የUAE መንገዶች ተግባራዊ እውቀት።",

    service2: "የደህንነት አስተሳሰብ",
    service2d:
      "ለተሳፋሪ ደህንነትና ምቾት ቅድሚያ የሚሰጥ ኃላፊነት ያለው መንዳት።",

    service3: "ፕሮፌሽናል አገልግሎት",
    service3d:
      "አክብሮት ያለው ግንኙነት፣ በሰዓቱ መድረስ እና ንጹህ አቀራረብ።",

    visualNote:
      "የችሎታ መስመሮቹ የፖርትፎሊዮ ምስላዊ ማጠቃለያ ናቸው፣ የፈተና ውጤት አይደሉም።",
  },

  ar: {
    home: "الرئيسية",
    about: "نبذة عني",
    experience: "الخبرة",
    skills: "المهارات",
    services: "الخدمات",
    contact: "تواصل",

    heroTop: "دبي • الإمارات • سائق محترف",
    heroA: "قُدْ بثقة",
    heroB: "واحتراف.",
    heroText:
      "رحلات آمنة. خدمة احترافية. معرفة بطرق الإمارات.",

    contactMe: "تواصل معي",
    viewProfile: "استكشف الملف",

    years: "سنوات الخبرة",
    roads: "معرفة طرق الإمارات",
    safety: "السلامة أولاً",

    quick: "ملف سريع",
    license: "الرخصة",
    location: "الموقع",
    languages: "اللغات",

    aboutMe: "نبذة عني",
    aboutTitle: "احتراف في كل رحلة.",
    aboutSub: "موثوقية بتصميم واضح.",
    print: "طباعة / حفظ PDF",

    experienceTitle: "خبرة بُنيت على الطريق.",
    experienceSub: "هادئ. عملي. موثوق.",

    skillsTitle: "نقاط القوة.",
    skillsSub: "تركيز على التفاصيل المهمة.",

    serviceTitle: "ما أقدمه.",
    serviceSub: "مستوى راقٍ من خدمة القيادة.",

    connect: "لنتواصل.",
    connectSub: "رحلتك القادمة تبدأ هنا.",

    generalArea: "منطقة خدمة عامة — ليست موقعاً مباشراً",
    ready: "جاهز للتواصل؟",
    quickMessage: "رسالة سريعة",
    yourName: "اسمك",
    message: "اكتب رسالة قصيرة عن الفرصة…",
    sendWhatsApp: "إرسال عبر واتساب",
    sendEmail: "إرسال عبر البريد",
    share: "مشاركة الصفحة",
    backTop: "إلى الأعلى",

    owner: "المالك",
    studio: "استوديو المالك",
    ownerOnly: "تحكم المالك",
    signIn: "تسجيل دخول المالك",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",

    cloudNotConnected:
      "وضع المالك السحابي الآمن غير متصل بعد.",
    localPreview: "استخدام محرر محلي تجريبي",
    localNote:
      "التغييرات المحلية تبقى في هذا المتصفح فقط.",

    content: "المحتوى",
    media: "الوسائط",
    theme: "التصميم",
    save: "حفظ التغييرات",
    close: "إغلاق",

    profilePhoto: "صورة الملف",
    heroBackground: "خلفية الواجهة",
    pageBackground: "خلفية الصفحة",
    cv: "السيرة الذاتية",
    upload: "رفع",
    remove: "إزالة",

    themePreset: "نمط التصميم",
    accent: "اللون الرئيسي",
    accent2: "اللون الثانوي",

    publicInfo: "الملف العام",
    role: "المسمى المهني",
    availability: "حالة التوفر",
    aboutText: "نص التعريف",
    phone: "الهاتف",
    whatsapp: "واتساب",
    cvUrl: "رابط السيرة",

    cloudSave: "تم الحفظ في السحابة.",
    localSave: "تم الحفظ محلياً.",
    uploading: "جارٍ الرفع…",
    notOwner: "هذا الحساب ليس مالك هذا الملف.",

    exp1Title: "قيادة احترافية",
    exp1Meta: "دبي • الإمارات",
    exp1Desc:
      "نقل آمن ومنضبط واحترافي مع اهتمام قوي بخدمة العملاء.",

    exp2Title: "المسارات والملاحة",
    exp2Meta: "طرق دبي والإمارات",
    exp2Desc:
      "تخطيط واثق للمسارات باستخدام المعرفة المحلية وGPS وأدوات الملاحة الحديثة.",

    exp3Title: "الخدمة والموثوقية",
    exp3Meta: "معيار احترافي",
    exp3Desc:
      "تواصل هادئ والتزام بالمواعيد واهتمام براحة الركاب.",

    skill1: "قيادة آمنة ودفاعية",
    skill2: "معرفة طرق دبي والإمارات",
    skill3: "GPS وتخطيط المسارات",
    skill4: "الالتزام بالمواعيد والموثوقية",
    skill5: "خدمة العملاء",
    skill6: "العناية بالمركبة",

    service1: "الملاحة المحلية",
    service1d: "معرفة عملية بطرق دبي والإمارات.",

    service2: "عقلية السلامة",
    service2d:
      "قيادة مسؤولة تضع سلامة وراحة الركاب أولاً.",

    service3: "خدمة احترافية",
    service3d:
      "تواصل محترم ووصول في الوقت ومظهر احترافي.",

    visualNote:
      "أشرطة المهارات ملخص بصري وليست درجات اختبار.",
  },

  om: {
    home: "Fuula Jalqabaa",
    about: "Waa'ee Koo",
    experience: "Muuxannoo",
    skills: "Dandeettii",
    services: "Tajaajila",
    contact: "Quunnamtii",

    heroTop: "DUBAI • UAE • KONKOLAACHISAA OGUMMAA",
    heroA: "AMANAMUMMAAN",
    heroB: "OORI.",
    heroText:
      "Imala nageenya qabu. Tajaajila ogummaa. Beekumsa daandii UAE.",

    contactMe: "Na qunnami",
    viewProfile: "Profaayilii ilaali",

    years: "Waggaa muuxannoo",
    roads: "Beekumsa daandii UAE",
    safety: "Nageenyi dursa",

    quick: "Profaayilii gabaabaa",
    license: "Hayyama konkolaachisummaa",
    location: "Bakka",
    languages: "Afaanota",

    aboutMe: "Waa'ee Koo",
    aboutTitle: "Imala hunda keessatti ogummaa.",
    aboutSub: "Amanamummaa irratti ijaarame.",
    print: "Maxxansi / PDF olkaa’i",

    experienceTitle: "Muuxannoo daandii irratti ijaarame.",
    experienceSub: "Tasgabbaa’aa. Hojii irraa oolu. Amanamaa.",

    skillsTitle: "Cimina ijoo.",
    skillsSub: "Bal’ina barbaachisaa irratti xiyyeeffata.",

    serviceTitle: "Waan ani fidu.",
    serviceSub: "Tajaajila konkolaachisummaa sadarkaa olaanaa.",

    connect: "Wal qunnamaa.",
    connectSub: "Imalli itti aanu as irraa jalqaba.",

    generalArea:
      "Naannoo tajaajilaa waliigalaa — live location miti",

    ready: "Haasa’uuf qophooftanii?",
    quickMessage: "Ergaa saffisaa",
    yourName: "Maqaa keessan",
    message: "Waa’ee carraa hojii ergaa gabaabaa barreessaa…",
    sendWhatsApp: "WhatsAppn ergi",
    sendEmail: "Emailn ergi",
    share: "Fuula qoodi",
    backTop: "Gara gubbaatti",

    owner: "Abbaa",
    studio: "Owner Studio",
    ownerOnly: "To’annoo abbaa",
    signIn: "Seensa abbaa",
    password: "Password",
    login: "Seeni",
    logout: "Ba’i",

    cloudNotConnected:
      "Secure cloud owner mode amma hin walqabanne.",

    localPreview: "Local preview editor fayyadami",
    localNote:
      "Jijjiiramni local browser kana qofa keessatti tura.",

    content: "Qabiyyee",
    media: "Miidiyaa",
    theme: "Dizaayinii",
    save: "Jijjiirama olkaa’i",
    close: "Cufi",

    profilePhoto: "Suuraa profaayilii",
    heroBackground: "Hero background",
    pageBackground: "Page background",
    cv: "CV / Resume",
    upload: "Olkaa’i",
    remove: "Haqi",

    themePreset: "Theme",
    accent: "Halluu ijoo",
    accent2: "Halluu lammaffaa",

    publicInfo: "Profaayilii uummataa",
    role: "Mata-duree hojii",
    availability: "Haala qophii",
    aboutText: "Waa'ee koo",
    phone: "Bilbila",
    whatsapp: "WhatsApp",
    cvUrl: "CV link",

    cloudSave: "Cloud irratti olkaa’ame.",
    localSave: "Meeshaa kana irratti olkaa’ame.",
    uploading: "Olkaa’aa jira…",
    notOwner: "Account kun abbaa portfolio kanaa miti.",

    exp1Title: "Konkolaachisummaa Ogummaa",
    exp1Meta: "Dubai • UAE",
    exp1Desc:
      "Geejjiba nageenya qabu, yeroo eeggate fi ogummaa qabu tajaajila maamilaa gaarii waliin.",

    exp2Title: "Daandii fi Navigation",
    exp2Meta: "Daandii Dubai fi UAE",
    exp2Desc:
      "Beekumsa naannoo, GPS fi navigation ammayyaa fayyadamuun karaa sirrii qopheessuu.",

    exp3Title: "Tajaajila fi Amanamummaa",
    exp3Meta: "Sadarkaa Ogummaa",
    exp3Desc:
      "Quunnamtii tasgabbaa’aa, yeroo amanamaa fi mijannaa imaltootaa irratti xiyyeeffachuu.",

    skill1: "Konkolaachisummaa Nageenya Qabu",
    skill2: "Beekumsa Daandii Dubai / UAE",
    skill3: "GPS fi Route Planning",
    skill4: "Yeroo Eeguu fi Amanamummaa",
    skill5: "Tajaajila Maamilaa",
    skill6: "Kunuunsa Konkolaataa",

    service1: "Navigation Naannoo",
    service1d:
      "Beekumsa hojii irraa oolu daandii Dubai fi UAE.",

    service2: "Nageenya Dursa",
    service2d:
      "Konkolaachisummaa itti gaafatamummaa qabu kan nageenya fi mijannaa imaltootaa dursa kennu.",

    service3: "Tajaajila Ogummaa",
    service3d:
      "Quunnamtii kabajaa, yeroo irratti gahuu fi bifa ogummaa.",

    visualNote:
      "Skill bars gabaasa mul’ataa qofa; bu’aa qormaataa miti.",
  },
};

const PRESETS = {
  midnight: {
    accent: "#d7b26d",
    accent2: "#68d5d0",
  },
  royal: {
    accent: "#9e8cff",
    accent2: "#5dd6ff",
  },
  emerald: {
    accent: "#6be0b2",
    accent2: "#d9b46f",
  },
  sunset: {
    accent: "#ff8b70",
    accent2: "#ffc66d",
  },
};

function loadLocal() {
  try {
    return {
      ...defaults,
      ...JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}"),
    };
  } catch {
    return defaults;
  }
}

function fileToDataUrl(file, max = 1800, quality = 0.84) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;

    reader.onload = () => {
      if (!file.type.startsWith("image/")) {
        resolve(reader.result);
        return;
      }

      const img = new Image();

      img.onerror = reject;

      img.onload = () => {
        const scale = Math.min(
          1,
          max / Math.max(img.width, img.height)
        );

        const canvas = document.createElement("canvas");

        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );

        resolve(
          canvas.toDataURL("image/jpeg", quality)
        );
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

function App() {
  const [profile, setProfile] = useState(loadLocal);
  const [draft, setDraft] = useState(loadLocal);

  const [dark, setDark] = useState(
    localStorage.getItem(THEME_KEY) !== "light"
  );

  const [lang, setLang] = useState(
    localStorage.getItem(LANG_KEY) || "en"
  );

  const [menu, setMenu] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const [studioOpen, setStudioOpen] = useState(false);
  const [studioTab, setStudioTab] = useState("content");

  const [sessionUser, setSessionUser] = useState(null);
  const [cloudOwnerId, setCloudOwnerId] = useState(null);
  const [localOwner, setLocalOwner] = useState(false);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const loginEmail = useRef(null);
  const loginPassword = useRef(null);

  const c = UI[lang] || UI.en;

  const rtl = lang === "ar";

  const suffix =
    lang === "am"
      ? "Am"
      : lang === "ar"
      ? "Ar"
      : lang === "om"
      ? "Om"
      : "En";

  const role =
    profile[`role${suffix}`] ||
    profile.roleEn;

  const about =
    profile[`about${suffix}`] ||
    profile.aboutEn;

  const availability =
    profile[`availability${suffix}`] ||
    profile.availabilityEn;

  const preset =
    PRESETS[profile.themePreset] ||
    PRESETS.midnight;

  const accent =
    profile.accent ||
    preset.accent;

  const accent2 =
    profile.accent2 ||
    preset.accent2;

  const whats =
    (profile.whatsapp || "").replace(/\D/g, "");

  const isOwner = cloudEnabled
    ? Boolean(
        sessionUser &&
          (!cloudOwnerId ||
            cloudOwnerId === sessionUser.id)
      )
    : localOwner;

  const rootStyle = useMemo(
    () => ({
      "--accent": accent,
      "--accent2": accent2,

      "--hero-image": profile.heroBackgroundUrl
        ? `url("${profile.heroBackgroundUrl}")`
        : "none",

      "--page-image": profile.pageBackgroundUrl
        ? `url("${profile.pageBackgroundUrl}")`
        : "none",
    }),
    [
      accent,
      accent2,
      profile.heroBackgroundUrl,
      profile.pageBackgroundUrl,
    ]
  );

  useEffect(() => {
    document.documentElement.dataset.theme =
      dark ? "dark" : "light";

    localStorage.setItem(
      THEME_KEY,
      dark ? "dark" : "light"
    );
  }, [dark]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);

    document.documentElement.lang = lang;
    document.documentElement.dir =
      rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  useEffect(() => {
    document.title =
      `${profile.name} | ${role}`;

    const meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute(
        "content",
        `${profile.name} — ${role} in ${profile.location}. Professional driver portfolio, experience, skills and contact information.`
      );
    }
  }, [
    profile.name,
    profile.location,
    role,
  ]);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "in-view"
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    document
      .querySelectorAll(".reveal")
      .forEach((el) =>
        observer.observe(el)
      );

    return () => observer.disconnect();
  }, [profile, lang]);

  useEffect(() => {
    if (!cloudEnabled || !supabase) return;

    let unsubscribe;

    async function initCloud() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSessionUser(
        session?.user || null
      );

      const { data } = await supabase
        .from("portfolio_profile")
        .select("data,owner_id")
        .eq("site_key", SITE_KEY)
        .maybeSingle();

      if (data?.data) {
        const cloudProfile = {
          ...defaults,
          ...data.data,
        };

        setProfile(cloudProfile);
        setDraft(cloudProfile);

        setCloudOwnerId(
          data.owner_id || null
        );
      }

      const { data: listener } =
        supabase.auth.onAuthStateChange(
          (_event, nextSession) => {
            setSessionUser(
              nextSession?.user || null
            );
          }
        );

      unsubscribe = () =>
        listener.subscription.unsubscribe();
    }

    initCloud();

    return () => unsubscribe?.();
  }, []);

  async function signIn(e) {
    e.preventDefault();

    if (!supabase) return;

    setBusy(true);
    setStatus("");

    const email =
      loginEmail.current?.value.trim();

    const password =
      loginPassword.current?.value;

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setStatus(error.message);
      setBusy(false);
      return;
    }

    setSessionUser(data.user);

    const { data: row } =
      await supabase
        .from("portfolio_profile")
        .select("owner_id,data")
        .eq("site_key", SITE_KEY)
        .maybeSingle();

    if (
      row?.owner_id &&
      row.owner_id !== data.user.id
    ) {
      setCloudOwnerId(row.owner_id);
      setStatus(c.notOwner);
      setBusy(false);
      return;
    }

    if (row?.data) {
      const next = {
        ...defaults,
        ...row.data,
      };

      setProfile(next);
      setDraft(next);
    }

    setCloudOwnerId(
      row?.owner_id || null
    );

    setBusy(false);
  }

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }

    setSessionUser(null);
    setLocalOwner(false);
    setStudioOpen(false);
  }

  async function saveProfile() {
    setBusy(true);
    setStatus("");

    const clean = {
      ...draft,
    };

    if (
      cloudEnabled &&
      supabase &&
      sessionUser
    ) {
      if (
        cloudOwnerId &&
        cloudOwnerId !== sessionUser.id
      ) {
        setStatus(c.notOwner);
        setBusy(false);
        return;
      }

      const { error } =
        await supabase
          .from("portfolio_profile")
          .upsert(
            {
              site_key: SITE_KEY,
              owner_id: sessionUser.id,
              data: clean,
              updated_at:
                new Date().toISOString(),
            },
            {
              onConflict: "site_key",
            }
          );

      if (error) {
        setStatus(error.message);
        setBusy(false);
        return;
      }

      setCloudOwnerId(
        sessionUser.id
      );

      setProfile(clean);
      setStatus(c.cloudSave);
    } else {
      localStorage.setItem(
        LOCAL_KEY,
        JSON.stringify(clean)
      );

      setProfile(clean);
      setStatus(c.localSave);
    }

    setBusy(false);
  }

  async function uploadFile(
    kind,
    file
  ) {
    if (!file) return;

    setBusy(true);
    setStatus(c.uploading);

    try {
      if (
        cloudEnabled &&
        supabase &&
        sessionUser &&
        isOwner
      ) {
        const extension =
          file.name
            .split(".")
            .pop()
            ?.toLowerCase() ||
          "bin";

        const path =
          `${sessionUser.id}/` +
          `${kind}-${Date.now()}.${extension}`;

        const { error } =
          await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, file, {
              upsert: true,
              contentType: file.type,
              cacheControl: "3600",
            });

        if (error) {
          throw error;
        }

        const { data } =
          supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(path);

        const key =
          kind === "photo"
            ? "photoUrl"
            : kind === "hero"
            ? "heroBackgroundUrl"
            : kind === "page"
            ? "pageBackgroundUrl"
            : "cvUrl";

        setDraft((current) => ({
          ...current,
          [key]: data.publicUrl,
        }));

        setStatus(c.cloudSave);
      } else {
        if (kind === "cv") {
          setStatus(
            "Connect Supabase for persistent PDF upload. You can use the CV URL field for now."
          );

          setBusy(false);
          return;
        }

        const dataUrl =
          await fileToDataUrl(file);

        const key =
          kind === "photo"
            ? "photoUrl"
            : kind === "hero"
            ? "heroBackgroundUrl"
            : "pageBackgroundUrl";

        setDraft((current) => ({
          ...current,
          [key]: dataUrl,
        }));

        setStatus(c.localNote);
      }
    } catch (error) {
      setStatus(
        error?.message ||
          String(error)
      );
    }

    setBusy(false);
  }

  function applyPreset(name) {
    const colors =
      PRESETS[name];

    setDraft((current) => ({
      ...current,
      themePreset: name,
      accent: colors.accent,
      accent2: colors.accent2,
    }));
  }

  function sendInquiry(e) {
    e.preventDefault();

    const data =
      new FormData(e.currentTarget);

    const sender =
      (data.get("name") || "")
        .toString()
        .trim();

    const message =
      (data.get("message") || "")
        .toString()
        .trim();

    if (!sender || !message) return;

    const raw =
      `Hello ${profile.name},\n\n` +
      `My name is ${sender}.\n` +
      message;

    const body =
      encodeURIComponent(raw);

    if (whats) {
      window.open(
        `https://wa.me/${whats}?text=${body}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (profile.email) {
      window.location.href =
        `mailto:${profile.email}` +
        `?subject=${encodeURIComponent(
          "Website enquiry for " +
            profile.name
        )}` +
        `&body=${body}`;
    }

    e.currentTarget.reset();
  }

  const experience = [
    [
      "01",
      c.exp1Title,
      c.exp1Meta,
      c.exp1Desc,
    ],
    [
      "02",
      c.exp2Title,
      c.exp2Meta,
      c.exp2Desc,
    ],
    [
      "03",
      c.exp3Title,
      c.exp3Meta,
      c.exp3Desc,
    ],
  ];

  const skills = [
    [c.skill1, 96],
    [c.skill2, 94],
    [c.skill3, 92],
    [c.skill4, 95],
    [c.skill5, 91],
    [c.skill6, 88],
  ];

  const services = [
    [
      Navigation,
      c.service1,
      c.service1d,
    ],
    [
      ShieldCheck,
      c.service2,
      c.service2d,
    ],
    [
      Sparkles,
      c.service3,
      c.service3d,
    ],
  ];

  return (
    <div
      className={`site-shell preset-${profile.themePreset}`}
      style={rootStyle}
    >
      <div
        className="ambient-bg"
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </div>

      <header className="topbar">
        <div className="wrap nav">
          <a
            href="#home"
            className="brand"
          >
            <span className="brand-mark">
              EG
            </span>

            <span className="brand-name">
              ELIAS{" "}
              <b>GETANEH</b>
            </span>
          </a>

          <nav
            className={
              menu
                ? "navlinks show"
                : "navlinks"
            }
          >
            {[
              ["#home", c.home],
              ["#about", c.about],
              [
                "#experience",
                c.experience,
              ],
              ["#skills", c.skills],
              [
                "#services",
                c.services,
              ],
              ["#contact", c.contact],
            ].map(
              ([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() =>
                    setMenu(false)
                  }
                >
                  {label}
                </a>
              )
            )}
          </nav>

          <div className="navtools">
            <div className="language-wrap">
              <button
                className="icon-btn lang-btn"
                onClick={() =>
                  setLanguageOpen(
                    (value) => !value
                  )
                }
              >
                <Globe size={17} />
                <span>
                  {lang.toUpperCase()}
                </span>
                <ChevronDown size={14} />
              </button>

              {languageOpen && (
                <div className="language-menu">
                  {[
                    ["en", "English"],
                    ["am", "አማርኛ"],
                    ["ar", "العربية"],
                    [
                      "om",
                      "Afaan Oromoo",
                    ],
                  ].map(
                    ([code, label]) => (
                      <button
                        key={code}
                        className={
                          lang === code
                            ? "active"
                            : ""
                        }
                        onClick={() => {
                          setLang(code);
                          setLanguageOpen(
                            false
                          );
                        }}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              className="icon-btn"
              onClick={() =>
                setDark(
                  (value) => !value
                )
              }
            >
              {dark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              className="icon-btn mobile-only"
              onClick={() =>
                setMenu(
                  (value) => !value
                )
              }
            >
              {menu ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero"
        >
          <div
            className="hero-photo-bg"
            aria-hidden="true"
          />

          <div className="wrap hero-grid">
            <div className="hero-copy reveal in-view">
              <div className="hero-kicker">
                <span className="status-dot" />
                {availability}
              </div>

              <p className="micro-label">
                {c.heroTop}
              </p>

              <h1>
                <span>{c.heroA}</span>
                <em>{c.heroB}</em>
              </h1>

              <p className="hero-role">
                {profile.name}
                <i />
                {role}
              </p>

              <p className="hero-description">
                {c.heroText}
              </p>

              <div className="hero-actions">
                <a
                  className="btn primary"
                  href="#contact"
                >
                  {c.contactMe}
                  <ArrowUpRight
                    size={18}
                  />
                </a>

                <a
                  className="btn ghost"
                  href="#about"
                >
                  {c.viewProfile}
                  <ChevronDown
                    size={17}
                  />
                </a>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>
                    {profile.experience}
                  </strong>
                  <span>
                    {c.years}
                  </span>
                </div>

                <div>
                  <strong>UAE</strong>
                  <span>
                    {c.roads}
                  </span>
                </div>

                <div>
                  <strong>01</strong>
                  <span>
                    {c.safety}
                  </span>
                </div>
              </div>
            </div>

            <div className="portrait-stage reveal">
              <div className="portrait-halo" />

              <div className="portrait-card">
                <img
                  src={
                    profile.photoUrl ||
                    "/elias_portrait.jpg"
                  }
                  alt={profile.name}
                />

                <div className="portrait-overlay">
                  <span>
                    {profile.location}
                  </span>
                  <strong>
                    {role}
                  </strong>
                </div>
              </div>

              <div className="floating-badge badge-a">
                <ShieldCheck
                  size={18}
                />
                <span>
                  {c.safety}
                </span>
              </div>

              <div className="floating-badge badge-b">
                <Navigation
                  size={18}
                />
                <span>
                  {c.roads}
                </span>
              </div>

              <div className="signature-mark">
                EG
                <span>2026</span>
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>SCROLL</span>
            <i />
          </div>
        </section>

        <section className="quick-facts">
          <div className="wrap">
            <div className="section-chip">
              {c.quick}
            </div>

            <div className="facts-grid">
              <article>
                <span>01</span>
                <small>
                  {c.experience}
                </small>
                <strong>
                  {profile.experience}{" "}
                  {c.years}
                </strong>
              </article>

              <article>
                <span>02</span>
                <small>
                  {c.license}
                </small>
                <strong>
                  {profile.license}
                </strong>
              </article>

              <article>
                <span>03</span>
                <small>
                  {c.location}
                </small>
                <strong>
                  {profile.location}
                </strong>
              </article>

              <article>
                <span>04</span>
                <small>
                  {c.languages}
                </small>
                <strong>
                  {profile.languages}
                </strong>
              </article>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section about-section"
        >
          <div className="wrap about-grid">
            <div className="section-index reveal">
              01{" "}
              <span>
                / {c.aboutMe}
              </span>
            </div>

            <div className="about-copy reveal">
              <h2>
                {c.aboutTitle}
                <br />
                <em>
                  {c.aboutSub}
                </em>
              </h2>

              <p>{about}</p>

              <div className="about-meta">
                <span>
                  <MapPin size={18} />
                  {profile.location}
                </span>

                <span>
                  <Languages size={18} />
                  {profile.languages}
                </span>
              </div>

              <div className="inline-actions">
                {profile.cvUrl && (
                  <a
                    className="text-action"
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileText
                      size={17}
                    />
                    CV
                  </a>
                )}

                <button
                  className="text-action"
                  onClick={() =>
                    window.print()
                  }
                >
                  <Download
                    size={17}
                  />
                  {c.print}
                </button>
              </div>
            </div>

            <div className="about-visual reveal">
              <div className="about-image">
                <img
                  src={
                    profile.photoUrl ||
                    "/elias_portrait.jpg"
                  }
                  alt={profile.name}
                />
              </div>

              <div className="about-card">
                <Sparkles size={20} />
                <b>
                  {profile.name}
                </b>
                <span>{role}</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="section experience-section"
        >
          <div className="wrap">
            <div className="section-index reveal">
              02{" "}
              <span>
                / {c.experience}
              </span>
            </div>

            <div className="section-head reveal">
              <h2>
                {c.experienceTitle}
                <br />
                <em>
                  {c.experienceSub}
                </em>
              </h2>
            </div>

            <div className="timeline">
              {experience.map(
                ([
                  number,
                  title,
                  meta,
                  description,
                ]) => (
                  <article
                    className="timeline-item reveal"
                    key={number}
                  >
                    <span className="timeline-num">
                      {number}
                    </span>

                    <div className="timeline-main">
                      <small>
                        {meta}
                      </small>

                      <h3>
                        {title}
                      </h3>

                      <p>
                        {description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={22}
                    />
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="section skills-section"
        >
          <div className="wrap">
            <div className="section-index reveal">
              03{" "}
              <span>
                / {c.skills}
              </span>
            </div>

            <div className="section-head reveal">
              <h2>
                {c.skillsTitle}
                <br />
                <em>
                  {c.skillsSub}
                </em>
              </h2>
            </div>

            <div className="skills-bento">
              <div className="skills-panel reveal">
                {skills.map(
                  ([label, value]) => (
                    <div
                      className="skill"
                      key={label}
                    >
                      <div className="skill-top">
                        <span>
                          {label}
                        </span>
                        <b>
                          {value}%
                        </b>
                      </div>

                      <div className="skill-track">
                        <i
                          style={{
                            width:
                              `${value}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}

                <small className="visual-note">
                  {c.visualNote}
                </small>
              </div>

              <aside className="skills-highlight reveal">
                <ShieldCheck
                  size={34}
                />

                <span>
                  SAFETY / SERVICE /
                  RELIABILITY
                </span>

                <strong>
                  {profile.experience}
                </strong>

                <p>{c.years}</p>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="section services-section"
        >
          <div className="wrap">
            <div className="section-index reveal">
              04{" "}
              <span>
                / {c.services}
              </span>
            </div>

            <div className="section-head reveal">
              <h2>
                {c.serviceTitle}
                <br />
                <em>
                  {c.serviceSub}
                </em>
              </h2>
            </div>

            <div className="service-grid">
              {services.map(
                (
                  [
                    Icon,
                    title,
                    description,
                  ],
                  index
                ) => (
                  <article
                    className="service-card reveal"
                    key={title}
                  >
                    <div className="service-icon">
                      <Icon
                        size={27}
                      />
                    </div>

                    <span>
                      0{index + 1}
                    </span>

                    <h3>{title}</h3>

                    <p>
                      {description}
                    </p>

                    <ArrowUpRight
                      className="service-arrow"
                      size={20}
                    />
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section className="cinematic">
          <div className="wrap cinematic-inner reveal">
            <span>
              ELIAS GETANEH • DRIVER
              PORTFOLIO
            </span>

            <h2>
              Professionalism
              <br />
              <em>
                in every mile.
              </em>
            </h2>

            <div className="road-line">
              <i />
              <i />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
        >
          <div className="wrap contact-grid">
            <div className="contact-copy reveal">
              <div className="section-index">
                05{" "}
                <span>
                  / {c.contact}
                </span>
              </div>

              <h2>
                {c.connect}
                <br />
                <em>
                  {c.connectSub}
                </em>
              </h2>

              <a
                className="location-card"
                href="https://www.google.com/maps/search/?api=1&query=Dubai%2C+UAE"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={22} />

                <div>
                  <strong>
                    {profile.location}
                  </strong>

                  <span>
                    {c.generalArea}
                  </span>
                </div>

                <ArrowUpRight
                  size={19}
                />
              </a>
            </div>

            <div className="contact-panel reveal">
              <span className="panel-label">
                {c.ready}
              </span>

              {profile.phone && (
                <a
                  className="contact-row"
                  href={
                    "tel:" +
                    profile.phone
                  }
                >
                  <Phone size={20} />
                  <span>
                    {profile.phone}
                  </span>
                  <ArrowUpRight
                    size={18}
                  />
                </a>
              )}

              {whats && (
                <a
                  className="contact-row"
                  href={
                    "https://wa.me/" +
                    whats
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowUpRight
                    size={20}
                  />
                  <span>
                    WhatsApp
                  </span>
                  <ArrowUpRight
                    size={18}
                  />
                </a>
              )}

              {profile.email && (
                <a
                  className="contact-row"
                  href={
                    "mailto:" +
                    profile.email
                  }
                >
                  <Mail size={20} />
                  <span>
                    {profile.email}
                  </span>
                  <ArrowUpRight
                    size={18}
                  />
                </a>
              )}

              {(whats ||
                profile.email) && (
                <form
                  className="quick-form"
                  onSubmit={
                    sendInquiry
                  }
                >
                  <label>
                    {c.quickMessage}
                  </label>

                  <input
                    name="name"
                    required
                    placeholder={
                      c.yourName
                    }
                  />

                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder={
                      c.message
                    }
                  />

                  <button
                    className="btn primary"
                    type="submit"
                  >
                    {whats
                      ? c.sendWhatsApp
                      : c.sendEmail}

                    <ArrowUpRight
                      size={17}
                    />
                  </button>
                </form>
              )}

              <button
                className="share-btn"
                onClick={() =>
                  navigator.share
                    ? navigator
                        .share({
                          title:
                            document.title,
                          url:
                            location.href,
                        })
                        .catch(
                          () => {}
                        )
                    : navigator.clipboard?.writeText(
                        location.href
                      )
                }
              >
                <Share2 size={17} />
                {c.share}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <div>
            <strong>
              ELIAS GETANEH
            </strong>

            <span>
              ©{" "}
              {new Date().getFullYear()}
            </span>
          </div>

          <a href="#home">
            {c.backTop} ↑
          </a>

          <button
            className="owner-entry"
            onClick={() => {
              setDraft(profile);
              setStudioOpen(true);
            }}
          >
            <Lock size={14} />
            {c.owner}
          </button>
        </div>
      </footer>

      {(profile.phone || whats) && (
        <div className="floating-contact">
          {whats && (
            <a
              className="floating whatsapp"
              href={
                "https://wa.me/" +
                whats
              }
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight
                size={20}
              />
            </a>
          )}

          {profile.phone && (
            <a
              className="floating call"
              href={
                "tel:" +
                profile.phone
              }
            >
              <Phone size={19} />
            </a>
          )}
        </div>
      )}

      {studioOpen && (
        <div
          className="studio-overlay"
          onClick={() =>
            setStudioOpen(false)
          }
        >
          <section
            className="studio"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <header className="studio-head">
              <div>
                <span>
                  {c.ownerOnly}
                </span>

                <h2>
                  {c.studio}
                </h2>
              </div>

              <button
                className="icon-btn"
                onClick={() =>
                  setStudioOpen(
                    false
                  )
                }
              >
                <X />
              </button>
            </header>

            {!isOwner ? (
              <div className="studio-login">
                {cloudEnabled ? (
                  <form
                    onSubmit={signIn}
                  >
                    <div className="login-icon">
                      <Lock
                        size={30}
                      />
                    </div>

                    <h3>
                      {c.signIn}
                    </h3>

                    <label>
                      Email

                      <input
                        ref={loginEmail}
                        type="email"
                        required
                        autoComplete="username"
                      />
                    </label>

                    <label>
                      {c.password}

                      <input
                        ref={
                          loginPassword
                        }
                        type="password"
                        required
                        autoComplete="current-password"
                      />
                    </label>

                    <button
                      className="btn primary"
                      disabled={busy}
                    >
                      {c.login}
                      <ArrowUpRight
                        size={17}
                      />
                    </button>

                    {status && (
                      <p className="studio-status">
                        {status}
                      </p>
                    )}
                  </form>
                ) : (
                  <div className="local-preview-card">
                    <div className="login-icon">
                      <Settings
                        size={30}
                      />
                    </div>

                    <h3>
                      {
                        c.cloudNotConnected
                      }
                    </h3>

                    <p>
                      {c.localNote}
                    </p>

                    <button
                      className="btn primary"
                      onClick={() => {
                        setLocalOwner(
                          true
                        );
                        setStatus("");
                      }}
                    >
                      {c.localPreview}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <nav className="studio-tabs">
                  <button
                    className={
                      studioTab ===
                      "content"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setStudioTab(
                        "content"
                      )
                    }
                  >
                    <User size={17} />
                    {c.content}
                  </button>

                  <button
                    className={
                      studioTab ===
                      "media"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setStudioTab(
                        "media"
                      )
                    }
                  >
                    <ImageIcon
                      size={17}
                    />
                    {c.media}
                  </button>

                  <button
                    className={
                      studioTab ===
                      "theme"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setStudioTab(
                        "theme"
                      )
                    }
                  >
                    <Palette
                      size={17}
                    />
                    {c.theme}
                  </button>
                </nav>

                <div className="studio-body">
                  {studioTab ===
                    "content" && (
                    <div className="editor-grid">
                      <label>
                        Name

                        <input
                          value={
                            draft.name
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              name:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        {c.location}

                        <input
                          value={
                            draft.location
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              location:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        {c.experience}

                        <input
                          value={
                            draft.experience
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              experience:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        {c.license}

                        <input
                          value={
                            draft.license
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              license:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        {c.languages}

                        <input
                          value={
                            draft.languages
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              languages:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        {c.phone}

                        <input
                          value={
                            draft.phone
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              phone:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Email

                        <input
                          value={
                            draft.email
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              email:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label>
                        {c.whatsapp}

                        <input
                          value={
                            draft.whatsapp
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              whatsapp:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <label className="wide">
                        {c.cvUrl}

                        <input
                          value={
                            draft.cvUrl
                          }
                          onChange={(
                            e
                          ) =>
                            setDraft({
                              ...draft,
                              cvUrl:
                                e
                                  .target
                                  .value,
                            })
                          }
                        />
                      </label>

                      <div className="translation-block wide">
                        <b>English</b>

                        <label>
                          {c.role}

                          <input
                            value={
                              draft.roleEn
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                roleEn:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.availability}

                          <input
                            value={
                              draft.availabilityEn
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                availabilityEn:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.aboutText}

                          <textarea
                            rows="4"
                            value={
                              draft.aboutEn
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                aboutEn:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="translation-block wide">
                        <b>አማርኛ</b>

                        <label>
                          {c.role}

                          <input
                            value={
                              draft.roleAm
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                roleAm:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.availability}

                          <input
                            value={
                              draft.availabilityAm
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                availabilityAm:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.aboutText}

                          <textarea
                            rows="4"
                            value={
                              draft.aboutAm
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                aboutAm:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="translation-block wide">
                        <b>العربية</b>

                        <label>
                          {c.role}

                          <input
                            value={
                              draft.roleAr
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                roleAr:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.availability}

                          <input
                            value={
                              draft.availabilityAr
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                availabilityAr:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.aboutText}

                          <textarea
                            rows="4"
                            value={
                              draft.aboutAr
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                aboutAr:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="translation-block wide">
                        <b>
                          Afaan Oromoo
                        </b>

                        <label>
                          {c.role}

                          <input
                            value={
                              draft.roleOm
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                roleOm:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.availability}

                          <input
                            value={
                              draft.availabilityOm
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                availabilityOm:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.aboutText}

                          <textarea
                            rows="4"
                            value={
                              draft.aboutOm
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                aboutOm:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {studioTab ===
                    "media" && (
                    <div className="media-grid">
                      {[
                        [
                          "photo",
                          c.profilePhoto,
                          draft.photoUrl,
                          "image/*",
                        ],
                        [
                          "hero",
                          c.heroBackground,
                          draft.heroBackgroundUrl,
                          "image/*",
                        ],
                        [
                          "page",
                          c.pageBackground,
                          draft.pageBackgroundUrl,
                          "image/*",
                        ],
                        [
                          "cv",
                          c.cv,
                          draft.cvUrl,
                          "application/pdf",
                        ],
                      ].map(
                        ([
                          kind,
                          label,
                          url,
                          accept,
                        ]) => (
                          <article
                            className="media-card"
                            key={kind}
                          >
                            <div className="media-preview">
                              {kind ===
                              "cv" ? (
                                <FileText
                                  size={42}
                                />
                              ) : url ? (
                                <img
                                  src={
                                    url
                                  }
                                  alt=""
                                />
                              ) : (
                                <ImageIcon
                                  size={42}
                                />
                              )}
                            </div>

                            <div>
                              <b>
                                {label}
                              </b>

                              <small>
                                {kind ===
                                "cv"
                                  ? ".pdf"
                                  : "JPG / PNG / WEBP"}
                              </small>
                            </div>

                            <label className="upload-btn">
                              <Upload
                                size={16}
                              />

                              {c.upload}

                              <input
                                hidden
                                type="file"
                                accept={
                                  accept
                                }
                                onChange={(
                                  e
                                ) =>
                                  uploadFile(
                                    kind,
                                    e
                                      .target
                                      .files?.[0]
                                  )
                                }
                              />
                            </label>

                            {url && (
                              <button
                                className="remove-btn"
                                onClick={() => {
                                  const key =
                                    kind ===
                                    "photo"
                                      ? "photoUrl"
                                      : kind ===
                                        "hero"
                                      ? "heroBackgroundUrl"
                                      : kind ===
                                        "page"
                                      ? "pageBackgroundUrl"
                                      : "cvUrl";

                                  setDraft(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      [key]:
                                        "",
                                    })
                                  );
                                }}
                              >
                                {c.remove}
                              </button>
                            )}
                          </article>
                        )
                      )}
                    </div>
                  )}

                  {studioTab ===
                    "theme" && (
                    <div className="theme-editor">
                      <label>
                        {c.themePreset}
                      </label>

                      <div className="preset-grid">
                        {Object.entries(
                          PRESETS
                        ).map(
                          ([
                            name,
                            colors,
                          ]) => (
                            <button
                              key={name}
                              className={
                                draft.themePreset ===
                                name
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                applyPreset(
                                  name
                                )
                              }
                            >
                              <span
                                style={{
                                  background:
                                    `linear-gradient(135deg,${colors.accent},${colors.accent2})`,
                                }}
                              />

                              <b>
                                {name}
                              </b>
                            </button>
                          )
                        )}
                      </div>

                      <div className="color-grid">
                        <label>
                          {c.accent}

                          <input
                            type="color"
                            value={
                              draft.accent
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                accent:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>

                        <label>
                          {c.accent2}

                          <input
                            type="color"
                            value={
                              draft.accent2
                            }
                            onChange={(
                              e
                            ) =>
                              setDraft({
                                ...draft,
                                accent2:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <footer className="studio-actions">
                  <div>
                    {status && (
                      <span className="studio-status">
                        {status}
                      </span>
                    )}
                  </div>

                  <button
                    className="btn ghost studio-logout"
                    onClick={signOut}
                  >
                    <LogOut size={16} />
                    {c.logout}
                  </button>

                  <button
                    className="btn primary"
                    onClick={
                      saveProfile
                    }
                    disabled={busy}
                  >
                    <Save size={16} />
                    {c.save}
                  </button>
                </footer>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);