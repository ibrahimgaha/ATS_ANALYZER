import type { Lang } from "@/components/LanguageProvider";

export const t = {

  /* ─── Navbar ─────────────────────────────── */
  nav: {
    howItWorks: { en: "How it works", fr: "Comment ça marche" },
    features:   { en: "Features",     fr: "Fonctionnalités" },
    pricing:    { en: "Pricing",      fr: "Tarifs" },
    faq:        { en: "FAQ",          fr: "FAQ" },
    analyzeCV:  { en: "Analyse CV",   fr: "Analyser mon CV" },
  },

  /* ─── Footer ─────────────────────────────── */
  footer: {
    tagline:    { en: "ATS resume checker for job seekers. Evaluate formatting, structure, and keyword alignment instantly.", fr: "Vérificateur ATS pour chercheurs d'emploi. Évaluez la mise en forme, la structure et la correspondance des mots-clés instantanément." },
    noStorage:  { en: "Zero data storage", fr: "Aucune donnée stockée" },
    product:    { en: "Product",      fr: "Produit" },
    privacy:    { en: "Privacy",      fr: "Confidentialité" },
    privacyText:{ en: "Your CV is processed in memory during your session only. It is never stored, indexed, or shared with third parties.", fr: "Votre CV est traité en mémoire uniquement durant votre session. Il n'est jamais stocké, indexé ou partagé." },
    rights:     { en: "All rights reserved.", fr: "Tous droits réservés." },
    disclaimer: { en: "Algorithmic analysis — not a guarantee of employment outcomes.", fr: "Analyse algorithmique — sans garantie d'embauche." },
    analyzeCV:  { en: "Analyse CV",   fr: "Analyser mon CV" },
  },

  /* ─── Homepage: Hero ─────────────────────── */
  hero: {
    badge:      { en: "ATS Resume Checker", fr: "Vérificateur ATS de CV" },
    h1a:        { en: "Know if your CV will", fr: "Sachez si votre CV" },
    h1b:        { en: "survive the ATS filter", fr: "passe le filtre ATS" },
    body:       { en: "Most companies auto-screen applications before a recruiter sees them. Upload your CV to get an instant compatibility score, detect formatting issues, and match keywords to any job posting.", fr: "La plupart des entreprises filtrent automatiquement les candidatures avant qu'un recruteur les lise. Importez votre CV pour obtenir un score instantané, détecter les erreurs de mise en forme et matcher les mots-clés." },
    cta:        { en: "Analyse My CV — Free", fr: "Analyser mon CV — Gratuit" },
    ctaSub:     { en: "How it works", fr: "Comment ça marche" },
    foot:       { en: "Free · Text-based PDF · Max 5 MB · Nothing stored", fr: "Gratuit · PDF textuel · Max 5 Mo · Aucune donnée conservée" },
    sampleLabel:{ en: "Sample analysis", fr: "Exemple d'analyse" },
    passes:     { en: "Passes standard filters", fr: "Passe les filtres standard" },
    minor:      { en: "Minor improvements needed", fr: "Quelques améliorations nécessaires" },
    kwLabel:    { en: "Keyword relevance", fr: "Pertinence des mots-clés" },
    fmtLabel:   { en: "Structure & formatting", fr: "Structure et mise en forme" },
    kwDetected: { en: "Keywords detected", fr: "Mots-clés détectés" },
    tip:        { en: "Tip:", fr: "Conseil :" },
    atsScore:   { en: "ATS Score", fr: "Score ATS" },
  },

  /* ─── Homepage: social proof ─────────────── */
  proof: [
    { en: "Instant score — no signup",          fr: "Score instantané — sans inscription" },
    { en: "Works with any PDF CV",              fr: "Compatible tout CV PDF" },
    { en: "Supports 50+ job categories",        fr: "Plus de 50 catégories d'emploi" },
    { en: "No data stored after analysis",      fr: "Aucune donnée conservée après analyse" },
  ],

  /* ─── Homepage: Features ─────────────────── */
  features: {
    sectionLabel: { en: "What we check",    fr: "Ce que nous vérifions" },
    h2:           { en: "Built for how ATS systems actually work", fr: "Conçu pour le fonctionnement réel des ATS" },
    body:         { en: "ATS scanners reject candidates for structural and keyword reasons, not qualifications. CVScore analyses what matters.", fr: "Les ATS rejettent les candidats pour des raisons structurelles et de mots-clés, pas de qualifications. CVScore analyse ce qui compte." },
    items: [
      {
        title: { en: "Structure audit",    fr: "Audit de structure" },
        desc:  { en: "Detects multi-column layouts, non-standard headings, and elements that break ATS parsers.", fr: "Détecte les mises en page multi-colonnes, les titres non standard et les éléments qui bloquent les ATS." },
      },
      {
        title: { en: "Keyword matching",   fr: "Correspondance des mots-clés" },
        desc:  { en: "Compares your CV against a pasted job description to surface missing and matched terms.", fr: "Compare votre CV avec l'offre d'emploi pour identifier les termes manquants et présents." },
      },
      {
        title: { en: "Rewrite suggestions", fr: "Suggestions de réécriture" },
        desc:  { en: "Turns passive duty descriptions into action-oriented bullet points with measurable impact.", fr: "Transforme les descriptions passives en points d'action orientés résultats mesurables." },
      },
      {
        title: { en: "No data stored",    fr: "Aucune donnée conservée" },
        desc:  { en: "Your resume is processed in memory per request. Nothing is retained after analysis.", fr: "Votre CV est traité en mémoire pour chaque requête. Rien n'est conservé après l'analyse." },
      },
    ],
  },

  /* ─── Homepage: How it works ─────────────── */
  how: {
    sectionLabel: { en: "Process",            fr: "Processus" },
    h2:           { en: "Three steps to a better CV", fr: "Trois étapes vers un meilleur CV" },
    steps: [
      {
        title: { en: "Upload your PDF",      fr: "Importez votre PDF" },
        desc:  { en: "Select your CV file. We extract text, headings, and layout structure for analysis.", fr: "Sélectionnez votre CV. Nous extrayons le texte, les titres et la structure de mise en page." },
      },
      {
        title: { en: "Add a job description", fr: "Ajoutez une offre d'emploi" },
        desc:  { en: "Optionally paste the job posting. We compare keyword density and role requirements.", fr: "Collez optionnellement l'offre d'emploi. Nous comparons la densité de mots-clés et les exigences du poste." },
      },
      {
        title: { en: "Read your report",     fr: "Lisez votre rapport" },
        desc:  { en: "Get a score, formatting warnings, missing skills, and clear improvement steps.", fr: "Obtenez un score, des avertissements de mise en forme, les compétences manquantes et des étapes d'amélioration claires." },
      },
    ],
    cta: { en: "Get started — it's free", fr: "Commencer — c'est gratuit" },
  },

  /* ─── Homepage: Pricing ──────────────────── */
  pricing: {
    sectionLabel: { en: "Plans & Access",       fr: "Plans & Accès" },
    h2:           { en: "Straightforward pricing", fr: "Tarification transparente" },
    body:         { en: "Start free. Upgrade when you need deeper analysis.", fr: "Commencez gratuitement. Passez à la version supérieure pour une analyse approfondie." },
    active:       { en: "Active now",           fr: "Actif maintenant" },
    comingSoon:   { en: "Coming soon",          fr: "Bientôt disponible" },
    forever:      { en: "/forever",             fr: "/pour toujours" },
    month:        { en: "/month",               fr: "/mois" },
    free: {
      name:  { en: "Free",   fr: "Gratuit" },
      sub:   { en: "Core ATS check for any job seeker.", fr: "Vérification ATS de base pour tout chercheur d'emploi." },
      cta:   { en: "Analyse My CV", fr: "Analyser mon CV" },
      items: [
        { en: "Overall ATS score",          fr: "Score ATS global" },
        { en: "ATS compatibility rating",   fr: "Indice de compatibilité ATS" },
        { en: "Formatting score",           fr: "Score de mise en forme" },
        { en: "Top 3 strengths",            fr: "3 points forts" },
        { en: "Top 3 areas to improve",     fr: "3 axes d'amélioration" },
        { en: "3 key recommendations",      fr: "3 recommandations clés" },
      ],
    },
    pro: {
      name:  { en: "Pro",    fr: "Pro" },
      sub:   { en: "Detailed analysis and AI rewriting tools.", fr: "Analyse détaillée et outils de réécriture IA." },
      cta:   { en: "Coming Soon", fr: "Bientôt disponible" },
      items: [
        { en: "Everything in Free",          fr: "Tout ce qui est dans Gratuit" },
        { en: "Full keyword match report",   fr: "Rapport complet de correspondance" },
        { en: "Job-specific gap analysis",   fr: "Analyse des lacunes par poste" },
        { en: "AI summary & bullet rewrites", fr: "Résumé IA et réécriture de bullets" },
        { en: "Downloadable PDF report",     fr: "Rapport PDF téléchargeable" },
        { en: "Unlimited analyses",          fr: "Analyses illimitées" },
      ],
    },
    builder: {
      name:  { en: "CV Builder", fr: "Créateur de CV" },
      sub:   { en: "Build ATS-ready CVs from scratch.", fr: "Créez des CV prêts pour les ATS de zéro." },
      cta:   { en: "Coming Soon", fr: "Bientôt disponible" },
      items: [
        { en: "Everything in Pro",            fr: "Tout ce qui est dans Pro" },
        { en: "AI CV generation from scratch", fr: "Génération IA de CV de zéro" },
        { en: "ATS-optimised templates",      fr: "Modèles optimisés ATS" },
        { en: "Job-tailored CV creation",     fr: "Création de CV sur mesure" },
        { en: "Multiple CV versions",         fr: "Plusieurs versions de CV" },
        { en: "Export PDF & Word",            fr: "Export PDF & Word" },
      ],
    },
  },

  /* ─── Homepage: FAQ ──────────────────────── */
  faq: {
    sectionLabel: { en: "FAQ",             fr: "FAQ" },
    h2:           { en: "Common questions", fr: "Questions fréquentes" },
    cta:          { en: "Analyse My CV — Free", fr: "Analyser mon CV — Gratuit" },
    items: [
      {
        q: { en: "Is my CV stored on your servers?", fr: "Mon CV est-il stocké sur vos serveurs ?" },
        a: { en: "No. Your CV is processed in memory only to generate your analysis. It is not stored, indexed, or retained after the request completes.", fr: "Non. Votre CV est traité uniquement en mémoire pour générer votre analyse. Il n'est pas stocké, indexé ou conservé après la fin de la requête." },
      },
      {
        q: { en: "What file types are supported?", fr: "Quels types de fichiers sont pris en charge ?" },
        a: { en: "CVScore supports text-based PDF files. Scanned image PDFs are not supported as there is no readable text to extract.", fr: "CVScore prend en charge les fichiers PDF textuels. Les PDF scannés ne sont pas pris en charge car il n'y a pas de texte extractible." },
      },
      {
        q: { en: "Does a high score guarantee an interview?", fr: "Un score élevé garantit-il un entretien ?" },
        a: { en: "No. The score is an algorithmic estimate based on ATS parsing rules and keyword density. It helps you improve your CV but does not guarantee any outcome.", fr: "Non. Le score est une estimation algorithmique basée sur les règles des ATS et la densité de mots-clés. Il vous aide à améliorer votre CV mais ne garantit aucun résultat." },
      },
      {
        q: { en: "Do I need to paste a job description?", fr: "Dois-je coller une offre d'emploi ?" },
        a: { en: "No, it is optional. Without a job posting your CV is evaluated against general ATS best practices.", fr: "Non, c'est optionnel. Sans offre d'emploi, votre CV est évalué selon les bonnes pratiques ATS générales." },
      },
      {
        q: { en: "What does the free plan include?", fr: "Que comprend le plan gratuit ?" },
        a: { en: "The free plan gives you an overall ATS score, compatibility and formatting scores, your top 3 strengths, top 3 things to improve, and 3 priority recommendations.", fr: "Le plan gratuit vous donne un score ATS global, des scores de compatibilité et de mise en forme, vos 3 points forts, 3 axes d'amélioration et 3 recommandations prioritaires." },
      },
    ],
  },

  /* ─── Analyze page ───────────────────────── */
  analyze: {
    sectionLabel:  { en: "ATS Evaluation",       fr: "Évaluation ATS" },
    h1:            { en: "Upload your CV for analysis", fr: "Importez votre CV pour l'analyser" },
    body:          { en: "ATS systems score resumes on heading structure, clean text, and keyword density before a recruiter ever reads them.", fr: "Les ATS évaluent les CV sur la structure des titres, le texte propre et la densité de mots-clés avant qu'un recruteur les lise." },
    tipsTitle:     { en: "For best results",     fr: "Pour de meilleurs résultats" },
    tips: [
      { en: "Export directly from Word or Google Docs — not a scanned image.", fr: "Exportez directement depuis Word ou Google Docs — pas une image scannée." },
      { en: "Use standard section names: Experience, Education, Skills.", fr: "Utilisez des noms de sections standards : Expérience, Formation, Compétences." },
      { en: "Plain single-column layout performs best in ATS systems.", fr: "Une mise en page simple en une colonne fonctionne mieux dans les ATS." },
    ],
    privacyNote:   { en: "Your CV is analysed in memory for this request only. Nothing is stored or retained.", fr: "Votre CV est analysé en mémoire uniquement pour cette requête. Rien n'est stocké." },
    cvLabel:       { en: "CV / Resume (PDF)", fr: "CV / Curriculum Vitae (PDF)" },
    jdLabel:       { en: "Job description",   fr: "Description du poste" },
    optional:      { en: "Optional",          fr: "Optionnel" },
    jdPlaceholder: { en: "Paste the job description here to get keyword-matched analysis...", fr: "Collez la description du poste ici pour une analyse avec correspondance des mots-clés..." },
    submit:        { en: "Analyse My CV",     fr: "Analyser mon CV" },
    submitting:    { en: "Analysing...",      fr: "Analyse en cours..." },
    errFile:       { en: "Please upload your CV before submitting.", fr: "Veuillez importer votre CV avant de soumettre." },
    errPdf:        { en: "Only PDF files are supported. Please upload a .pdf file.", fr: "Seuls les fichiers PDF sont pris en charge. Veuillez importer un fichier .pdf." },
    errSize:       { en: "File size exceeds 5 MB", fr: "La taille du fichier dépasse 5 Mo" },
  },

  /* ─── Results page ───────────────────────── */
  results: {
    sectionLabel:   { en: "Free ATS Report",     fr: "Rapport ATS Gratuit" },
    h1:             { en: "CV Analysis Overview", fr: "Vue d'ensemble de l'analyse" },
    analyzeAnother: { en: "Analyse another CV",  fr: "Analyser un autre CV" },
    summary:        { en: "Summary",             fr: "Résumé" },
    atsCompat:      { en: "ATS Compatibility",   fr: "Compatibilité ATS" },
    formatting:     { en: "Formatting Score",    fr: "Score de mise en forme" },
    strengths:      { en: "Top 3 Strengths",     fr: "3 Points Forts" },
    improvements:   { en: "Top 3 To Improve",   fr: "3 Axes d'Amélioration" },
    recs:           { en: "3 Priority Recommendations", fr: "3 Recommandations Prioritaires" },
    proLabel:       { en: "Pro Analysis",        fr: "Analyse Pro" },
    proSoon:        { en: "Coming Soon · $4.99/mo", fr: "Bientôt · 4,99 $/mois" },
    proH3:          { en: "Unlock the full breakdown", fr: "Débloquez l'analyse complète" },
    proBody:        { en: "Keyword cloud, gap analysis, AI bullet rewrites, and a downloadable PDF report.", fr: "Nuage de mots-clés, analyse des lacunes, réécriture IA et rapport PDF téléchargeable." },
    viewPlans:      { en: "View Plans",          fr: "Voir les plans" },
    proItems: [
      { icon: "🔑", title: { en: "Full Keyword Cloud",       fr: "Nuage de mots-clés complet" }, desc: { en: "Every matched and missing term from the job posting", fr: "Chaque terme présent ou manquant de l'offre d'emploi" } },
      { icon: "📊", title: { en: "Job-Specific Gap Analysis", fr: "Analyse des lacunes par poste" }, desc: { en: "Side-by-side role requirement comparison",          fr: "Comparaison côte-à-côte des exigences du poste" } },
      { icon: "✍️", title: { en: "AI Bullet Rewrites",       fr: "Réécriture IA des bullets" }, desc: { en: "Action-oriented, metric-driven rewritten bullets",   fr: "Points d'action orientés métriques réécrits par IA" } },
      { icon: "📄", title: { en: "Exportable PDF Report",    fr: "Rapport PDF exportable" }, desc: { en: "Full ATS breakdown ready to download",              fr: "Analyse ATS complète prête à télécharger" } },
    ],
    disclaimer:     { en: "Algorithmic analysis — not a guarantee of employment outcomes.", fr: "Analyse algorithmique — sans garantie d'embauche." },
    analyzeMore:    { en: "Analyse Another", fr: "Analyser un autre" },
    home:           { en: "Home",            fr: "Accueil" },
    errNotFound:    { en: "No analysis found. Please upload a CV first.", fr: "Aucune analyse trouvée. Veuillez d'abord importer un CV." },
    errLoad:        { en: "Could not load results. Please try again.", fr: "Impossible de charger les résultats. Veuillez réessayer." },
    errAnalyze:     { en: "Analyse a CV",    fr: "Analyser un CV" },
    statusLabels: {
      strong: { en: "Strong ATS Compatibility",   fr: "Forte compatibilité ATS" },
      good:   { en: "Good ATS Compatibility",     fr: "Bonne compatibilité ATS" },
      needs:  { en: "Needs Improvement",          fr: "Amélioration nécessaire" },
      low:    { en: "Low ATS Compatibility",      fr: "Faible compatibilité ATS" },
    },
    statusDescs: {
      strong: { en: "Your CV passes standard automated filters with a solid layout and keyword structure.", fr: "Votre CV passe les filtres automatisés standard avec une bonne structure et des mots-clés solides." },
      good:   { en: "Passes most ATS systems. Minor keyword or formatting improvements recommended.",       fr: "Passe la plupart des ATS. Quelques améliorations de mots-clés ou de mise en forme recommandées." },
      needs:  { en: "Some sections or missing keywords may cause issues with automated screening tools.",   fr: "Certaines sections ou mots-clés manquants peuvent poser problème aux outils de filtrage automatisé." },
      low:    { en: "Key structural sections and keywords are missing. Significant revisions recommended.", fr: "Des sections structurelles clés et des mots-clés sont manquants. Des révisions importantes sont recommandées." },
    },
  },

  /* ─── Upload dropzone ────────────────────── */
  dropzone: {
    drop:     { en: "Drop your CV here",      fr: "Déposez votre CV ici" },
    upload:   { en: "Upload your CV",         fr: "Importez votre CV" },
    hint:     { en: "PDF format · Max 5 MB",  fr: "Format PDF · Max 5 Mo" },
    choose:   { en: "Choose File",            fr: "Choisir un fichier" },
    change:   { en: "Click to change file",   fr: "Cliquer pour changer le fichier" },
  },

  /* ─── Loading overlay ────────────────────── */
  loading: {
    steps: [
      { label: { en: "Reading your CV",              fr: "Lecture de votre CV" },              sub: { en: "Extracting text and structure...",             fr: "Extraction du texte et de la structure..." } },
      { label: { en: "Checking ATS compatibility",   fr: "Vérification de la compatibilité ATS" }, sub: { en: "Analysing headers, sections and formatting...",  fr: "Analyse des titres, sections et mise en forme..." } },
      { label: { en: "Scoring keyword density",      fr: "Calcul de la densité de mots-clés" }, sub: { en: "Matching against job description...",            fr: "Correspondance avec la description du poste..." } },
      { label: { en: "Generating recommendations",   fr: "Génération des recommandations" },   sub: { en: "Building your personalised report...",          fr: "Construction de votre rapport personnalisé..." } },
      { label: { en: "Almost done",                  fr: "Presque terminé" },                  sub: { en: "Finalising your analysis...",                   fr: "Finalisation de votre analyse..." } },
    ],
    wait: { en: "This usually takes 10–20 seconds.", fr: "Cela prend généralement 10 à 20 secondes." },
  },
};

/** Helper: resolve a translation entry to the correct language string */
export function tr(entry: { en: string; fr: string }, lang: Lang): string {
  return entry[lang];
}
