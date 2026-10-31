import { useState } from 'react'
import './App.css'

const scenarios = [
  {
    id: 'prompt_injection',
    name: 'Prompt Injection',
    type: 'HIGH',
    description: {
      ar: 'محاولة إدخال تعليمات خبيثة داخل محتوى يقرأه نموذج الذكاء الاصطناعي.',
      en: 'An attempt to insert malicious instructions into content read by an AI model.'
    },
    path: ['User Input', 'MCP Client', 'Malicious Prompt', 'AI Model'],
    recommendation: {
      ar: 'تحقق من المدخلات، وافصل التعليمات الموثوقة عن المحتوى الخارجي.',
      en: 'Validate inputs and separate trusted instructions from external content.'
    }
  },
  {
    id: 'unauthorized_access',
    name: 'Unauthorized Tool Access',
    type: 'CRITICAL',
    description: {
      ar: 'محاولة استدعاء أداة دون امتلاك الصلاحيات المناسبة.',
      en: 'An attempt to invoke a tool without the required permissions.'
    },
    path: ['External Request', 'MCP Server', 'Tool Permission Check', 'Protected Tool'],
    recommendation: {
      ar: 'طبّق مبدأ أقل صلاحية وتحقق من هوية المستخدم.',
      en: 'Apply least privilege and verify the user identity.'
    }
  },
  {
    id: 'data_exposure',
    name: 'Sensitive Data Exposure',
    type: 'MEDIUM',
    description: {
      ar: 'احتمال ظهور بيانات حساسة ضمن استجابة إحدى الأدوات.',
      en: 'Sensitive information may be exposed in a tool response.'
    },
    path: ['MCP Tool', 'Server Response', 'Sensitive Data', 'Client'],
    recommendation: {
      ar: 'قم بتنقية المخرجات وإخفاء البيانات الحساسة قبل إرسالها.',
      en: 'Filter outputs and mask sensitive data before sending responses.'
    }
  }
]

const copy = {
  ar: {
    menu: 'القائمة الرئيسية',
    dashboard: 'لوحة التحكم',
    attackLab: 'مختبر الهجمات',
    threatAnalysis: 'تحليل التهديدات',
    defenseCenter: 'مركز الدفاع',
    online: 'النظام يعمل',
    operational: 'جميع الخدمات تعمل',
    live: 'مراقبة مباشرة',
    breadcrumb: 'الأمن',
    welcomeEyebrow: 'بيئة أمن MCP',
    welcomeTitle: 'مرحباً بك في',
    welcomeText: 'منصة لمحاكاة وتحليل التهديدات الأمنية في أنظمة Model Context Protocol.',
    servers: 'خوادم MCP',
    connectedServers: 'خوادم متصلة',
    tools: 'الأدوات النشطة',
    availableTools: 'أدوات متاحة',
    threats: 'التهديدات المكتشفة',
    simulatedIndicators: 'مؤشرات تجريبية',
    score: 'مستوى الأمان',
    overallProtection: 'مستوى الحماية العام',
    networkOverview: 'نظرة عامة على الشبكة',
    networkMap: 'خريطة شبكة MCP',
    simulated: 'بيئة افتراضية',
    secureConnection: 'اتصال آمن',
    threatPath: 'مسار التهديد',
    userInterface: 'واجهة المستخدم',
    gateway: 'بوابة البروتوكول',
    available: 'متاحة',
    illustrative: 'مخطط توضيحي يستخدم بيانات افتراضية.',
    recentEvents: 'أحدث الأحداث الأمنية',
    latest: 'الأحدث',
    promptEvent: 'مؤشر حقن التعليمات',
    permissionEvent: 'تم التحقق من صلاحية الأداة',
    dataEvent: 'تم فحص نمط كشف البيانات',
    minAgo: 'منذ دقيقتين',
    eightMinAgo: 'منذ 8 دقائق',
    fifteenMinAgo: 'منذ 15 دقيقة',
    health: 'الحالة الأمنية',
    normal: 'بيئة MCP الافتراضية تعمل بصورة طبيعية.',
    accessControl: 'التحكم بالوصول',
    permissions: 'صلاحيات الأدوات',
    dataProtection: 'حماية البيانات',
    secure: 'آمن',
    monitoring: 'تحت المراقبة',
    safeEnvironment: 'بيئة محاكاة آمنة',
    attackTitle: 'مختبر محاكاة الهجمات',
    chooseScenario: 'اختر سيناريو لمحاكاة مسار تهديد أمني افتراضي. لن يتم تنفيذ أي هجوم حقيقي.',
    selected: 'السيناريو المحدد',
    run: 'تشغيل المحاكاة الآمنة',
    running: 'جارٍ تشغيل المحاكاة...',
    completed: 'اكتملت المحاكاة',
    severity: 'مستوى الخطورة',
    simulationOnly: 'محاكاة فقط',
    yes: 'نعم',
    no: 'لا',
    pathExplanation: 'شرح مسار التهديد',
    pathText: 'بدأ السيناريو من',
    then: 'ثم انتقل عبر المراحل الموضحة حتى وصل إلى نقطة الخطر.',
    recommendation: 'التوصية الأمنية',
    educationalNote: 'هذه نتيجة محاكاة تعليمية وليست إثباتاً لوجود ثغرة حقيقية.',
    intelligence: 'مركز المعلومات',
    analysisTitle: 'تحليل التهديدات',
    analysisIntro: 'أدخل مؤشراً أمنياً لتحليله باستخدام محرك التحليل في الخادم.',
    analyzeEvent: 'تحليل حدث أمني',
    placeholder: 'أدخل وصف الحدث الأمني...',
    analyze: 'تحليل التهديد',
    analyzing: 'جارٍ تحليل التهديد...',
    analysisCompleted: 'اكتمل التحليل',
    threat: 'التهديد',
    indicators: 'المؤشرات المكتشفة',
    noneDetected: 'لم يتم اكتشاف مؤشرات معروفة.',
    explanation: 'التوضيح',
    confirmed: 'ثغرة مؤكدة',
    catalog: 'كتالوج التهديدات',
    knownScenarios: 'سيناريوهات أمنية معروفة',
    protection: 'الحماية والمعالجة',
    defenseTitle: 'مركز الدفاع',
    defenseIntro: 'اختر نوع التهديد للحصول على توصيات الحماية من الخادم.',
    category: 'اختر فئة التهديد',
    getRecommendations: 'عرض توصيات الحماية',
    loadingRecommendations: 'جارٍ تحميل التوصيات...',
    defenseRecommendations: 'توصيات الحماية',
    actions: 'إجراءات الحماية المقترحة',
    controls: 'ضوابط أمنية',
    strategies: 'استراتيجيات الدفاع العامة',
    leastPrivilege: 'أقل صلاحية',
    leastPrivilegeText: 'امنح كل أداة أقل قدر ممكن من الصلاحيات اللازمة.',
    inputValidation: 'التحقق من المدخلات',
    inputValidationText: 'تحقق من المدخلات قبل تمريرها إلى الأدوات أو النماذج.',
    outputFiltering: 'تنقية المخرجات',
    outputFilteringText: 'افحص المخرجات واحجب البيانات الحساسة.',
    accessControlText: 'تحقق من هوية المستخدم وصلاحياته قبل تنفيذ الطلبات.',
    footer: 'محاكي أمني تعليمي',
    backendError: 'تعذر الاتصال بالخادم. تأكد من تشغيل Backend على المنفذ 8000.',
    analysisError: 'تعذر تحليل التهديد. تأكد من تشغيل Backend.',
    defenseError: 'تعذر تحميل توصيات الحماية. تأكد من تشغيل Backend.',
    emptyError: 'اكتب وصف التهديد أولاً.',
    language: 'English'
  },

  en: {
    menu: 'MAIN MENU',
    dashboard: 'Dashboard',
    attackLab: 'Attack Lab',
    threatAnalysis: 'Threat Analysis',
    defenseCenter: 'Defense Center',
    online: 'System Online',
    operational: 'All services operational',
    live: 'LIVE MONITORING',
    breadcrumb: 'SECURITY',
    welcomeEyebrow: 'MCP SECURITY ENVIRONMENT',
    welcomeTitle: 'Welcome to',
    welcomeText: 'A platform for simulating and analyzing security threats in Model Context Protocol systems.',
    servers: 'MCP SERVERS',
    connectedServers: 'Connected servers',
    tools: 'ACTIVE TOOLS',
    availableTools: 'Available tools',
    threats: 'THREATS DETECTED',
    simulatedIndicators: 'Simulated indicators',
    score: 'SECURITY SCORE',
    overallProtection: 'Overall protection',
    networkOverview: 'NETWORK OVERVIEW',
    networkMap: 'MCP Network Map',
    simulated: 'SIMULATED ENVIRONMENT',
    secureConnection: 'Secure connection',
    threatPath: 'Threat path',
    userInterface: 'User Interface',
    gateway: 'Protocol Gateway',
    available: 'Available',
    illustrative: 'Network topology is illustrative and uses simulated data.',
    recentEvents: 'Recent Security Events',
    latest: 'LATEST',
    promptEvent: 'Prompt injection indicator',
    permissionEvent: 'Tool permission verified',
    dataEvent: 'Data exposure pattern checked',
    minAgo: '2 min ago',
    eightMinAgo: '8 min ago',
    fifteenMinAgo: '15 min ago',
    health: 'Security Health',
    normal: 'Your simulated MCP environment is operating normally.',
    accessControl: 'Access Control',
    permissions: 'Tool Permissions',
    dataProtection: 'Data Protection',
    secure: 'Secure',
    monitoring: 'Monitoring',
    safeEnvironment: 'SAFE SIMULATION ENVIRONMENT',
    attackTitle: 'Attack Simulation Lab',
    chooseScenario: 'Choose a scenario to simulate a virtual security threat path. No real attack will be performed.',
    selected: 'Selected Scenario',
    run: 'Run Safe Simulation',
    running: 'Running simulation...',
    completed: 'Simulation Completed',
    severity: 'Severity',
    simulationOnly: 'Simulation only',
    yes: 'Yes',
    no: 'No',
    pathExplanation: 'Threat Path Explanation',
    pathText: 'The scenario started at',
    then: 'and moved through the stages shown until it reached the risk point.',
    recommendation: 'Security Recommendation',
    educationalNote: 'This is an educational simulation result, not proof of a real vulnerability.',
    intelligence: 'INTELLIGENCE CENTER',
    analysisTitle: 'Threat Analysis',
    analysisIntro: 'Enter a security indicator to analyze it using the backend analysis engine.',
    analyzeEvent: 'Analyze Security Event',
    placeholder: 'Enter a security event...',
    analyze: 'Analyze Threat',
    analyzing: 'Analyzing threat...',
    analysisCompleted: 'Analysis Completed',
    threat: 'Threat',
    indicators: 'Detected Indicators',
    noneDetected: 'No known indicators detected.',
    explanation: 'Explanation',
    confirmed: 'Confirmed Vulnerability',
    catalog: 'THREAT CATALOG',
    knownScenarios: 'Known Security Scenarios',
    protection: 'PROTECTION & MITIGATION',
    defenseTitle: 'Defense Center',
    defenseIntro: 'Choose a threat category to get defense recommendations from the backend.',
    category: 'Select Threat Category',
    getRecommendations: 'Get Defense Recommendations',
    loadingRecommendations: 'Loading recommendations...',
    defenseRecommendations: 'Defense Recommendations',
    actions: 'Recommended Security Actions',
    controls: 'SECURITY CONTROLS',
    strategies: 'General Defense Strategies',
    leastPrivilege: 'Least Privilege',
    leastPrivilegeText: 'Give each tool only the minimum permissions it needs.',
    inputValidation: 'Input Validation',
    inputValidationText: 'Validate inputs before passing them to tools or models.',
    outputFiltering: 'Output Filtering',
    outputFilteringText: 'Inspect outputs and block sensitive information.',
    accessControlText: 'Verify user identity and permissions before processing requests.',
    footer: 'EDUCATIONAL SECURITY SIMULATOR',
    backendError: 'Could not connect to the backend. Make sure it is running on port 8000.',
    analysisError: 'Threat analysis failed. Make sure the backend is running.',
    defenseError: 'Could not load defense recommendations. Make sure the backend is running.',
    emptyError: 'Please enter a threat description first.',
    language: 'العربية'
  }
}

function App() {
  const [language, setLanguage] = useState('ar')
  const [activePage, setActivePage] = useState('Dashboard')
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [simulation, setSimulation] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [defenseResults, setDefenseResults] = useState(null)
  const [eventText, setEventText] = useState('prompt injection detected')
  const [isLoading, setIsLoading] = useState(false)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [defenseLoading, setDefenseLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [analysisError, setAnalysisError] = useState('')
  const [defenseError, setDefenseError] = useState('')

  const t = copy[language]
  const isArabic = language === 'ar'
  const currentScenario = scenarios[selectedScenario]

  const navItems = [
    { name: 'Dashboard', label: t.dashboard, icon: '◫' },
    { name: 'Attack Lab', label: t.attackLab, icon: '⌘' },
    { name: 'Threat Analysis', label: t.threatAnalysis, icon: '⌕' },
    { name: 'Defense Center', label: t.defenseCenter, icon: '⬡' }
  ]

  async function runSimulation() {
    setIsLoading(true)
    setApiError('')
    setSimulation(null)

    try {
      const response = await fetch('http://localhost:8000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: currentScenario.id })
      })

      if (!response.ok) throw new Error('Server error')

      const result = await response.json()

      if (result.error) throw new Error(result.error)

      setSimulation(result)
    } catch {
      setApiError(t.backendError)
    } finally {
      setIsLoading(false)
    }
  }

  async function runAnalysis() {
    if (!eventText.trim()) {
      setAnalysisError(t.emptyError)
      return
    }

    setAnalysisLoading(true)
    setAnalysisError('')
    setAnalysis(null)

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventText })
      })

      if (!response.ok) throw new Error('Analysis request failed')

      const result = await response.json()
      setAnalysis(result)
    } catch {
      setAnalysisError(t.analysisError)
    } finally {
      setAnalysisLoading(false)
    }
  }

  async function loadDefense() {
    setDefenseLoading(true)
    setDefenseError('')
    setDefenseResults(null)

    try {
      const response = await fetch('http://localhost:8000/api/defense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: currentScenario.id })
      })

      if (!response.ok) throw new Error('Defense request failed')

      const result = await response.json()
      setDefenseResults(result)
    } catch {
      setDefenseError(t.defenseError)
    } finally {
      setDefenseLoading(false)
    }
  }

  const severityLabel = (value) => {
    if (language === 'en') return value

    return {
      HIGH: 'مرتفع',
      CRITICAL: 'حرج',
      MEDIUM: 'متوسط',
      LOW: 'منخفض',
      SAFE: 'آمن'
    }[value] || value
  }

  return (
    <div
      className={`app ${isArabic ? 'is-rtl' : 'is-ltr'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={language}
    >
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>

          <div>
            <h2>MCP<span>SENTINEL</span></h2>
            <small>SECURITY SIMULATOR</small>
          </div>
        </div>

        <div className="side-label">{t.menu}</div>

        <nav>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? 'active' : ''}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot" />

            <div>
              <strong>{t.online}</strong>
              <small>{t.operational}</small>
            </div>
          </div>

          <p className="version">MCP SENTINEL v1.0.0</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">
            <div className="breadcrumb">
              {t.breadcrumb} / <span>{activePage.toUpperCase()}</span>
            </div>

            <h1>
              {navItems.find((item) => item.name === activePage)?.label}
            </h1>
          </div>

          <div className="topbar-right">
            <button
              className="language-button"
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
            >
              {t.language}
            </button>

            <span className="live-badge">
              <i /> {t.live}
            </span>

            <div className="avatar">AF</div>
          </div>
        </header>

        {activePage === 'Dashboard' && (
          <>
            <section className="welcome">
              <div>
                <span className="eyebrow">{t.welcomeEyebrow}</span>

                <h2>
                  {t.welcomeTitle} <span>MCP SENTINEL</span>
                </h2>

                <p>{t.welcomeText}</p>
              </div>

              <div className="shield-art">⬡</div>
            </section>

            <section className="stats-grid">
              <StatCard label={t.servers} value="04" detail={t.connectedServers} icon="▤" />
              <StatCard label={t.tools} value="12" detail={t.availableTools} icon="⌘" />
              <StatCard label={t.threats} value={analysis ? '13' : '12'} detail={t.simulatedIndicators} icon="⚠" />
              <StatCard label={t.score} value="94%" detail={t.overallProtection} icon="⬡" />
            </section>

            <div className="section-heading">
              <div>
                <span className="eyebrow">{t.networkOverview}</span>
                <h3>{t.networkMap}</h3>
              </div>

              <span className="small-tag">{t.simulated}</span>
            </div>

            <section className="network-card">
              <div className="network-info">
                <span className="legend">
                  <i className="green-dot" /> {t.secureConnection}
                </span>

                <span className="legend">
                  <i className="red-dot" /> {t.threatPath}
                </span>
              </div>

              <div className="network-map">
                <div className="network-node">
                  <span>◉</span>
                  <strong>MCP CLIENT</strong>
                  <small>{t.userInterface}</small>
                </div>

                <div className="connection" />

                <div className="network-node">
                  <span>⬡</span>
                  <strong>MCP SERVER</strong>
                  <small>{t.gateway}</small>
                </div>

                <div className="connection" />

                <div className="network-node">
                  <span>⌘</span>
                  <strong>TOOLS</strong>
                  <small>12 {t.available}</small>
                </div>
              </div>

              <p className="map-caption">{t.illustrative}</p>
            </section>

            <div className="bottom-grid">
              <section className="panel">
                <div className="panel-heading">
                  <h3>{t.recentEvents}</h3>
                  <span className="small-tag">{t.latest}</span>
                </div>

                <Event name={t.promptEvent} level="HIGH" time={t.minAgo} severityLabel={severityLabel} />
                <Event name={t.permissionEvent} level="SAFE" time={t.eightMinAgo} severityLabel={severityLabel} />
                <Event name={t.dataEvent} level="MEDIUM" time={t.fifteenMinAgo} severityLabel={severityLabel} />
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h3>{t.health}</h3>
                  <span className="health-value">94%</span>
                </div>

                <div className="progress-track">
                  <div className="progress-fill" />
                </div>

                <p className="muted">{t.normal}</p>

                <div className="health-row">
                  <span>{t.accessControl}</span>
                  <b>{t.secure}</b>
                </div>

                <div className="health-row">
                  <span>{t.permissions}</span>
                  <b>{t.secure}</b>
                </div>

                <div className="health-row">
                  <span>{t.dataProtection}</span>
                  <b>{t.monitoring}</b>
                </div>
              </section>
            </div>
          </>
        )}

        {activePage === 'Attack Lab' && (
          <section className="content-panel">
            <span className="eyebrow">{t.safeEnvironment}</span>
            <h2>{t.attackTitle}</h2>
            <p className="muted">{t.chooseScenario}</p>

            <div className="scenario-grid">
              {scenarios.map((scenario, index) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  selected={selectedScenario === index}
                  onClick={() => {
                    setSelectedScenario(index)
                    setSimulation(null)
                    setApiError('')
                  }}
                  language={language}
                  severityLabel={severityLabel}
                />
              ))}
            </div>

            <div className="simulation-box">
              <h3>{t.selected}: {currentScenario.name}</h3>
              <p>{currentScenario.description[language]}</p>

              <button
                className="primary-button"
                onClick={runSimulation}
                disabled={isLoading}
              >
                {isLoading ? t.running : `▶ ${t.run}`}
              </button>

              {apiError && (
                <div className="result-box error-message">
                  <p>{apiError}</p>
                </div>
              )}

              {simulation && (
                <div className="result-box">
                  <h3>✓ {t.completed}</h3>
                  <p>{simulation.result}</p>

                  <p>
                    <strong>{t.severity}:</strong>{' '}
                    <span className={`severity ${String(simulation.severity).toLowerCase()}`}>
                      {severityLabel(simulation.severity)}
                    </span>
                  </p>

                  <small>
                    {t.simulationOnly}: {simulation.simulation_only ? t.yes : t.no}
                  </small>

                  <div className="attack-path">
                    {currentScenario.path.map((step, index) => (
                      <div className="path-step" key={step}>
                        <span>{index + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>

                  <h4>{t.pathExplanation}</h4>
                  <p>
                    {t.pathText} {currentScenario.path[0]} {t.then}
                  </p>

                  <h4>{t.recommendation}</h4>
                  <p>{currentScenario.recommendation[language]}</p>

                  <small>{t.educationalNote}</small>
                </div>
              )}
            </div>
          </section>
        )}

        {activePage === 'Threat Analysis' && (
          <section className="content-panel">
            <span className="eyebrow">{t.intelligence}</span>
            <h2>{t.analysisTitle}</h2>
            <p className="muted">{t.analysisIntro}</p>

            <div className="analysis-card">
              <h3>{t.analyzeEvent}</h3>

              <textarea
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                placeholder={t.placeholder}
                rows="4"
              />

              <button
                className="primary-button"
                onClick={runAnalysis}
                disabled={analysisLoading}
              >
                {analysisLoading ? t.analyzing : `⌕ ${t.analyze}`}
              </button>

              {analysisError && (
                <div className="result-box error-message">
                  <p>{analysisError}</p>
                </div>
              )}

              {analysis && (
                <div className="result-box">
                  <h3>✓ {t.analysisCompleted}</h3>

                  <p>
                    <strong>{t.threat}:</strong> {analysis.threat}
                  </p>

                  <p>
                    <strong>{t.severity}:</strong>{' '}
                    <span className={`severity ${String(analysis.severity).toLowerCase()}`}>
                      {severityLabel(analysis.severity)}
                    </span>
                  </p>

                  <h4>{t.indicators}</h4>

                  {analysis.indicators?.length > 0 ? (
                    <ul>
                      {analysis.indicators.map((indicator, index) => (
                        <li key={index}>{indicator}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t.noneDetected}</p>
                  )}

                  <h4>{t.explanation}</h4>
                  <p>{analysis.explanation}</p>

                  <h4>{t.recommendation}</h4>
                  <p>{analysis.recommendation}</p>

                  <small>
                    {t.confirmed}: {analysis.confirmed_vulnerability ? t.yes : t.no}
                  </small>
                </div>
              )}
            </div>

            <div className="section-heading">
              <div>
                <span className="eyebrow">{t.catalog}</span>
                <h3>{t.knownScenarios}</h3>
              </div>
            </div>

            {scenarios.map((scenario) => (
              <div className="analysis-card" key={scenario.id}>
                <span className={`severity ${scenario.type.toLowerCase()}`}>
                  {severityLabel(scenario.type)}
                </span>

                <h3>{scenario.name}</h3>
                <p>{scenario.description[language]}</p>

                <p>
                  <strong>{t.recommendation}:</strong>{' '}
                  {scenario.recommendation[language]}
                </p>
              </div>
            ))}
          </section>
        )}

        {activePage === 'Defense Center' && (
          <section className="content-panel">
            <span className="eyebrow">{t.protection}</span>
            <h2>{t.defenseTitle}</h2>
            <p className="muted">{t.defenseIntro}</p>

            <div className="simulation-box">
              <h3>{t.category}</h3>

              <div className="scenario-grid">
                {scenarios.map((scenario, index) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    selected={selectedScenario === index}
                    onClick={() => {
                      setSelectedScenario(index)
                      setDefenseResults(null)
                      setDefenseError('')
                    }}
                    language={language}
                    severityLabel={severityLabel}
                  />
                ))}
              </div>

              <button
                className="primary-button"
                onClick={loadDefense}
                disabled={defenseLoading}
              >
                {defenseLoading ? t.loadingRecommendations : `⬡ ${t.getRecommendations}`}
              </button>

              {defenseError && (
                <div className="result-box error-message">
                  <p>{defenseError}</p>
                </div>
              )}

              {defenseResults && (
                <div className="result-box">
                  <h3>✓ {t.defenseRecommendations}</h3>

                  <p>
                    <strong>{t.category}:</strong> {defenseResults.category}
                  </p>

                  <h4>{t.actions}</h4>

                  <ul>
                    {defenseResults.recommendations.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="section-heading">
              <div>
                <span className="eyebrow">{t.controls}</span>
                <h3>{t.strategies}</h3>
              </div>
            </div>

            <div className="defense-grid">
              <DefenseCard title={t.leastPrivilege} text={t.leastPrivilegeText} />
              <DefenseCard title={t.inputValidation} text={t.inputValidationText} />
              <DefenseCard title={t.outputFiltering} text={t.outputFilteringText} />
              <DefenseCard title={t.accessControl} text={t.accessControlText} />
            </div>
          </section>
        )}

        <footer className="site-footer">
          <div className="footer-brand">
            <strong>
              {language === 'ar'
                ? 'عبير ف. الشمري'
                : 'Abeer F. Alshammari'}
            </strong>

            <span>
              {language === 'ar'
                ? 'مهندسة برمجيات'
                : 'Software Engineer'}
            </span>

            <span>
              {language === 'ar'
                ? 'عضو في المجتمع السعودي للمطورين'
                : 'Member of Saudi Developers Community'}
            </span>
          </div>

          <a href="https://sdcsa.org" target="_blank" rel="noreferrer">
            {language === 'ar'
              ? 'المجتمع السعودي للمطورين ↗'
              : 'Saudi Developers Community ↗'}
          </a>

          <span>
            © 2026 MCP SENTINEL · {t.footer}
          </span>
        </footer>
      </main>
    </div>
  )
}

function StatCard({ label, value, detail, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <b>{icon}</b>
      </div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  )
}

function Event({ name, level, time, severityLabel }) {
  return (
    <div className="event-row">
      <span className={`event-level ${level.toLowerCase()}`} />

      <div>
        <strong>{name}</strong>
        <small>{time}</small>
      </div>

      <span className={`severity ${level.toLowerCase()}`}>
        {severityLabel(level)}
      </span>
    </div>
  )
}

function ScenarioCard({ scenario, selected, onClick, language, severityLabel }) {
  return (
    <button
      className={`scenario-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className={`severity ${scenario.type.toLowerCase()}`}>
        {severityLabel(scenario.type)}
      </span>

      <h3>{scenario.name}</h3>
      <p>{scenario.description[language]}</p>
    </button>
  )
}

function DefenseCard({ title, text }) {
  return (
    <div className="defense-card">
      <span className="defense-icon">⬡</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default App