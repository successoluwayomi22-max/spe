import type { LanguageCode } from '../../types/terraguard';

export interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaUploadScan: string;
  ctaViewSample: string;
  scamLossMetric: string;
  auditsCompletedMetric: string;
  accuracyMetric: string;
  tabScanner: string;
  tabDashboard: string;
  tabAuditor: string;
  tabPricing: string;
  tabWatchlist: string;
  scanModalTitle: string;
  dropzoneText: string;
  orManualBeacons: string;
  trustScoreLabel: string;
  acquisitionLabel: string;
  closureMathLabel: string;
  unlockReportCta: string;
  downloadPdfCta: string;
  signIn: string;
  signOut: string;
  liveRates: string;
}

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_REGISTRY: Record<LanguageCode, LanguageMeta> = {
  en: { code: 'en', label: 'English', nativeLabel: 'English (US/UK)' },
  fr: { code: 'fr', label: 'French', nativeLabel: 'Français' },
  es: { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  de: { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  ar: { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  zh: { code: 'zh', label: 'Chinese', nativeLabel: '中文 (简体)' },
  pcm: { code: 'pcm', label: 'West African English', nativeLabel: 'Pidgin (Diaspora)' },
};

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'TerraGuard Cadastre',
    tagline: 'Global Land Due-Diligence & Cadastral Risk Auditor',
    heroHeadline: 'Never Buy Land Blind. Audit Before You Pay.',
    heroSubheadline: 'Automated beacon coordinate validation, statutory acquisition gazette matching, and traverse boundary closure verification for institutional and diaspora real estate acquisitions.',
    ctaUploadScan: 'Upload Survey & Run Audit',
    ctaViewSample: 'Inspect Live Demo Scans',
    scamLossMetric: '$42.8M Fraud Prevented',
    auditsCompletedMetric: '14,820+ Audits Run',
    accuracyMetric: '99.8% Gazette Match',
    tabScanner: 'Due-Diligence Scanner',
    tabDashboard: 'Executive Console',
    tabAuditor: 'Auditor & Surveyor Desk',
    tabPricing: 'Pricing & Services',
    tabWatchlist: 'Property Vault',
    scanModalTitle: 'Upload Property Documents or Coordinates',
    dropzoneText: 'Drop Survey Plan, Deed of Assignment, or C of O (PDF/JPG)',
    orManualBeacons: 'Or enter Survey Beacon Numbers & Coordinates',
    trustScoreLabel: 'Overall Property Trust Score',
    acquisitionLabel: 'Government Acquisition Status',
    closureMathLabel: 'Mathematical Boundary Closure',
    unlockReportCta: 'Unlock Full Due-Diligence Pack',
    downloadPdfCta: 'Download Official PDF Certificate',
    signIn: 'Sign In / Authenticate',
    signOut: 'Sign Out',
    liveRates: 'Live FX Volatility Ticker',
  },
  fr: {
    appName: 'TerraGuard Cadastre',
    tagline: 'Audit Foncier International & Détection des Fraudes Cadastrales',
    heroHeadline: 'N’achetez Jamais de Terrain à l’Aveugle. Auditez Avant de Payer.',
    heroSubheadline: 'Validation automatisée des balises topographiques, recoupement avec les gazettes domaniales de l’État et calcul géodésique de fermeture polygonale.',
    ctaUploadScan: 'Téléverser le Plan et Lancer l’Audit',
    ctaViewSample: 'Consulter les Audits Témoins',
    scamLossMetric: '42,8 M$ de Fraudes Évitées',
    auditsCompletedMetric: '14 820+ Parcelles Vérifiées',
    accuracyMetric: 'Précision Cadastrale 99,8%',
    tabScanner: 'Scanner Due-Diligence',
    tabDashboard: 'Console Direction Générale',
    tabAuditor: 'Poste Géomètre & Auditeur',
    tabPricing: 'Tarification Institutionnelle',
    tabWatchlist: 'Coffre Foncier',
    scanModalTitle: 'Téléverser les Documents Topographiques',
    dropzoneText: 'Déposer le Plan de Bornage, l’Acte de Cession ou le Titre Foncier',
    orManualBeacons: 'Ou saisir manuellement les coordonnées des bornes',
    trustScoreLabel: 'Score de Fiabilité Juridique Globale',
    acquisitionLabel: 'Statut d’Expropriation Publique',
    closureMathLabel: 'Fermeture Mathématique Géodésique',
    unlockReportCta: 'Débloquer le Dossier d’Audit Complet',
    downloadPdfCta: 'Télécharger l’Attestation Officielle PDF',
    signIn: 'Connexion / Authentification',
    signOut: 'Déconnexion',
    liveRates: 'Cours des Devises en Direct',
  },
  es: {
    appName: 'TerraGuard Cadastre',
    tagline: 'Auditoría Catastral y Prevención de Fraudes Inmobiliarios',
    heroHeadline: 'Nunca Compre Terrenos a Ciegas. Audite Antes de Pagar.',
    heroSubheadline: 'Validación computacional de mojones topográficos, concordancia con gacetas de expropiación estatal y cálculo de cierre poligonal perimétrico.',
    ctaUploadScan: 'Subir Plano e Iniciar Auditoría',
    ctaViewSample: 'Examinar Casos de Prueba',
    scamLossMetric: '$42.8M Fraude Evitado',
    auditsCompletedMetric: '14.820+ Predios Auditados',
    accuracyMetric: '99.8% Precisión Catastral',
    tabScanner: 'Escáner de Diligencia',
    tabDashboard: 'Consola Ejecutiva CEO',
    tabAuditor: 'Mesa de Topógrafo y Auditor',
    tabPricing: 'Tarifas y Paquetes',
    tabWatchlist: 'Bóveda de Propiedades',
    scanModalTitle: 'Subir Planos Catastrales o Coordenadas',
    dropzoneText: 'Arrastre el Plano Topográfico, Escritura o Certificado de Título',
    orManualBeacons: 'O ingrese coordenadas de mojones geodésicos',
    trustScoreLabel: 'Puntuación de Confianza Registral',
    acquisitionLabel: 'Estado de Afectación Estatal',
    closureMathLabel: 'Cierre Matemático del Polígono',
    unlockReportCta: 'Desbloquear Informe Completo',
    downloadPdfCta: 'Descargar Certificado Oficial en PDF',
    signIn: 'Iniciar Sesión',
    signOut: 'Cerrar Sesión',
    liveRates: 'Cotizaciones de Divisas en Vivo',
  },
  de: {
    appName: 'TerraGuard Cadastre',
    tagline: 'Internationale Katasterprüfung & Betrugsprävention für Immobilien',
    heroHeadline: 'Niemals Grundbesitz Blind Kaufen. Vor Zahlung Prüfen.',
    heroSubheadline: 'Automatisierte Verifikation von Vermessungskoordinaten, Abgleich mit amtlichen Enteignungsregistern und mathematische Polygon-Schlussfehlerberechnung.',
    ctaUploadScan: 'Lageplan Hochladen & Prüfung Starten',
    ctaViewSample: 'Live-Prüfbeispiele Einsehen',
    scamLossMetric: '$42,8M Schaden Verhütet',
    auditsCompletedMetric: '14.820+ Grundstücke Geprüft',
    accuracyMetric: '99,8% Katastergenauigkeit',
    tabScanner: 'Due-Diligence Scanner',
    tabDashboard: 'Vorstandskonsole',
    tabAuditor: 'Vermesser & Rechtsaudit',
    tabPricing: 'Preise & Tarife',
    tabWatchlist: 'Immobilien-Tresor',
    scanModalTitle: 'Vermessungsdokumente Hochladen',
    dropzoneText: 'Lageplan, Notarielle Abtretung oder Eigentumstitel ablegen',
    orManualBeacons: 'Oder UTM-Grenzpunktkoordinaten manuell eingeben',
    trustScoreLabel: 'Gesamter Vertrauensindex',
    acquisitionLabel: 'Staatlicher Erwerbsstatus',
    closureMathLabel: 'Geodätischer Polygon-Schluss',
    unlockReportCta: 'Vollständigen Prüfbericht Freischalten',
    downloadPdfCta: 'Offizielles PDF-Zertifikat Herunterladen',
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    liveRates: 'Echtzeit-Währungsticker',
  },
  ar: {
    appName: 'TerraGuard Cadastre',
    tagline: 'التدقيق المساحي والقانوني الدولي لمنع احتيال الأراضي والعقارات',
    heroHeadline: 'لا تشترِ أرضاً دون تدقيق. تحقق قبل سداد الأموال.',
    heroSubheadline: 'مطابقة آلية لإحداثيات العلامات المساحية مع الجرائد الرسمية لنزع الملكية وحساب إغلاق المضلع الهندسي بدقة متناهية للمستثمرين في المهجر.',
    ctaUploadScan: 'رفع المخطط المساحي والتدقيق',
    ctaViewSample: 'معاينة النماذج الحية',
    scamLossMetric: '42.8 مليون دولار خسائر ممنوعة',
    auditsCompletedMetric: 'أكثر من 14,820 مخطط مدقق',
    accuracyMetric: 'دقة مطابقة مساحية 99.8%',
    tabScanner: 'ماسح التدقيق النافي للجهالة',
    tabDashboard: 'لوحة تحكم الرئيس التنفيذي',
    tabAuditor: 'مكتب المساح والمدقق القانوني',
    tabPricing: 'حزم الأسعار والخدمات',
    tabWatchlist: 'خزينة العقارات الموثقة',
    scanModalTitle: 'رفع وثائق المخطط المساحي أو الإحداثيات',
    dropzoneText: 'أسقط المخطط المساحي أو سند الملكية أو العقد',
    orManualBeacons: 'أو أدخل إحداثيات النقاط المساحية يدوياً',
    trustScoreLabel: 'مؤشر الموثوقية الشامل للعقار',
    acquisitionLabel: 'حالة نزع الملكية للمنفعة العامة',
    closureMathLabel: 'الإغلاق الرياضي للمضلع المساحي',
    unlockReportCta: 'فتح تقرير التدقيق الشامل',
    downloadPdfCta: 'تحميل الشهادة الرسمية بصيغة PDF',
    signIn: 'تسجيل الدخول المؤسسي',
    signOut: 'تسجيل الخروج',
    liveRates: 'شريط أسعار الصرف المباشر',
  },
  zh: {
    appName: 'TerraGuard Cadastre',
    tagline: '国际土地尽职调查与地籍防欺诈核验平台',
    heroHeadline: '严防土地欺诈。付款前务必进行法定地籍审核。',
    heroSubheadline: '针对海外华侨与跨国地产机构，提供地标坐标自动验证、政府征地官方公报碰撞比对及闭合导线测绘数学验算。',
    ctaUploadScan: '上传测绘图并启动审核',
    ctaViewSample: '查看实时演示用例',
    scamLossMetric: '累计拦截 4,280 万美元欺诈',
    auditsCompletedMetric: '已审核 14,820+ 宗土地',
    accuracyMetric: '公报地籍比对精度 99.8%',
    tabScanner: '尽职调查扫描仪',
    tabDashboard: '执行总裁控制台',
    tabAuditor: '注册测绘师与法务工作台',
    tabPricing: '定价与机构套餐',
    tabWatchlist: '专属地产保险库',
    scanModalTitle: '上传地籍测绘图或边界坐标',
    dropzoneText: '拖拽上传测绘图、转让契约或所有权证书 (PDF/JPG)',
    orManualBeacons: '或直接输入测量界址点坐标',
    trustScoreLabel: '土地法定综合信任指数',
    acquisitionLabel: '政府强制征地与规划红线状态',
    closureMathLabel: '测绘闭合导线精度验算',
    unlockReportCta: '解锁完整法定调查报告',
    downloadPdfCta: '下载官方权威 PDF 证书',
    signIn: '机构登录 / 身份验证',
    signOut: '退出登录',
    liveRates: '实时汇率波动看板',
  },
  pcm: {
    appName: 'TerraGuard Cadastre',
    tagline: 'Number One Land Verification & Scam Buster',
    heroHeadline: 'No Go Buy Land Weh Government Dey Claim. Check Am First.',
    heroSubheadline: 'Automated computer verification weh dey check survey plan, government gazette, and boundary coordinates so that omo-onile no go chop your money.',
    ctaUploadScan: 'Upload Survey Make We Check Am',
    ctaViewSample: 'See Sample Land Weh We Don Catch',
    scamLossMetric: '₦65 Billion Scam Saved',
    auditsCompletedMetric: '14,820+ Land Weh We Don Check',
    accuracyMetric: '99.8% Correct Match',
    tabScanner: 'Land Due-Diligence Scanner',
    tabDashboard: 'CEO Money Console',
    tabAuditor: 'Surveyor & Lawyer Desk',
    tabPricing: 'Price & Service Packs',
    tabWatchlist: 'My Property Box',
    scanModalTitle: 'Upload Property Paper or Coordinates',
    dropzoneText: 'Drop Survey Plan, Deed of Assignment, or C of O (PDF/JPG)',
    orManualBeacons: 'Or type the Beacon Numbers & Coordinates',
    trustScoreLabel: 'Overall Property Trust Score',
    acquisitionLabel: 'Government Acquisition Status',
    closureMathLabel: 'Mathematical Boundary Closure',
    unlockReportCta: 'Unlock Full Due-Diligence Report',
    downloadPdfCta: 'Download Official PDF Certificate',
    signIn: 'Log In',
    signOut: 'Log Out',
    liveRates: 'Money Exchange Rate Ticker',
  },
};
