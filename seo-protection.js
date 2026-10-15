(() => {
  'use strict';

  const siteName = 'Multicore Technologies';
  const keywordPhrases = [
    'cloud computing course', 'cloud computing training',
    'cybersecurity course', 'cybersecurity training',
    'data analytics course', 'data analytics training',
    'data science course', 'data science training',
    'data science with AI course', 'data science with Gen AI course',
    'digital marketing course', 'digital marketing training',
    'full stack development course', 'full stack developement course',
    'SAP FICO course', 'SAP FICO training',
    'SAP MM HANA course', 'SAP MM Hano course',
    'software testing course', 'software testing training'
  ];

  const courseSearch = {
    cloud: ['Cloud Computing', 'Cloud Computing course and practical cloud training in Chennai. Learn AWS, Linux, networking, containers, CI/CD and cloud security with Multicore Technologies.'],
    security: ['Cybersecurity', 'Cybersecurity course and practical security training in Chennai. Learn network security, SIEM, vulnerability assessment and incident response with Multicore Technologies.'],
    analytics: ['Data Analytics', 'Data Analytics course in Chennai covering Excel, SQL, Power BI, dashboards and data storytelling with Multicore Technologies.'],
    science: ['Data Science', 'Data Science course in Chennai covering Python, statistics, machine learning and portfolio projects with Multicore Technologies.'],
    ai: ['Data Science with AI', 'Data Science with AI course in Chennai. Build Python, machine learning and responsible AI skills with Multicore Technologies.'],
    genai: ['Data Science with Gen AI', 'Data Science with Gen AI course in Chennai. Learn data preparation, LLM foundations, prompting, retrieval and evaluation with Multicore Technologies.'],
    marketing: ['Digital Marketing', 'Digital Marketing course in Chennai covering SEO, Google Ads, social media, analytics and campaign planning with Multicore Technologies.'],
    fullstack: ['Full Stack Development', 'Full Stack Development course in Chennai covering HTML, CSS, JavaScript, React, backend APIs, SQL and deployment with Multicore Technologies.'],
    fico: ['SAP FICO', 'SAP FICO course in Chennai covering financial accounting, controlling, reporting and enterprise workflows with Multicore Technologies.'],
    mm: ['SAP MM HANA', 'SAP MM HANA course in Chennai covering procurement, inventory, master data and S/4HANA concepts with Multicore Technologies.'],
    testing: ['Software Testing', 'Software Testing course in Chennai covering manual testing, SQL, API testing, Selenium basics and quality assurance with Multicore Technologies.']
  };

  const page = location.pathname.split('/').pop() || 'index.html';
  const courseKey = new URLSearchParams(location.search).get('course');
  const details = page === 'course.html' ? courseSearch[courseKey] : null;
  const pageTitles = {
    'index.html': 'Technology Courses in Chennai | Multicore Technologies',
    'career-programs.html': 'Career Programs in Cloud, Data, AI, SAP & Software | Multicore Technologies',
    'corporate-training.html': 'Corporate Technology Training | Multicore Technologies'
  };
  const pageDescriptions = {
    'index.html': 'Career-focused technology courses in Chennai: Cloud Computing, Cybersecurity, Data Analytics, Data Science, AI, Digital Marketing, Full Stack Development, SAP and Software Testing.',
    'career-programs.html': 'Explore career-focused Cloud Computing, Cybersecurity, Data Analytics, Data Science, AI, Digital Marketing, Full Stack Development, SAP and Software Testing programs in Chennai.',
    'corporate-training.html': 'Corporate technology training in cloud, data, AI, cybersecurity, software development, testing and SAP from Multicore Technologies.'
  };

  const title = details ? `${details[0]} Course in Chennai | ${siteName}` : pageTitles[page];
  const description = details ? details[1] : pageDescriptions[page];
  const cleanUrl = new URL(location.href);
  if (page === 'course.html' && courseKey && courseSearch[courseKey]) cleanUrl.search = `?course=${courseKey}`;
  cleanUrl.hash = '';

  const setMeta = (selector, attribute, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      const [name, key] = attribute;
      element.setAttribute(name, key);
      document.head.append(element);
    }
    element.content = value;
  };
  const setCanonical = () => {
    let element = document.head.querySelector('link[rel="canonical"]');
    if (!element) {
      element = document.createElement('link');
      element.rel = 'canonical';
      document.head.append(element);
    }
    element.href = cleanUrl.href;
  };
  const addSchema = (data) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.append(script);
  };

  if (title) document.title = title;
  if (description) setMeta('meta[name="description"]', ['name', 'description'], description);
  setMeta('meta[name="keywords"]', ['name', 'keywords'], keywordPhrases.join(', '));
  setMeta('meta[property="og:title"]', ['property', 'og:title'], title || document.title);
  setMeta('meta[property="og:description"]', ['property', 'og:description'], description || 'Technology training from Multicore Technologies.');
  setMeta('meta[property="og:type"]', ['property', 'og:type'], 'website');
  setMeta('meta[property="og:url"]', ['property', 'og:url'], cleanUrl.href);
  setMeta('meta[name="twitter:card"]', ['name', 'twitter:card'], 'summary');
  setCanonical();

  addSchema({
    '@context': 'https://schema.org', '@type': 'Organization', name: siteName,
    url: new URL('index.html', location.href).href,
    address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' }
  });
  if (details) addSchema({
    '@context': 'https://schema.org', '@type': 'Course', name: details[0],
    description: details[1], provider: { '@type': 'Organization', name: siteName },
    url: cleanUrl.href, inLanguage: 'en-IN'
  });
  if (page === 'career-programs.html') addSchema({
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Multicore Technologies Career Programs',
    itemListElement: Object.entries(courseSearch).map(([key, value], position) => ({
      '@type': 'ListItem', position: position + 1, name: value[0], url: new URL(`course.html?course=${key}`, location.href).href
    }))
  });

  // Browser-level deterrents. An operating system can always capture its own screen,
  // so this cannot guarantee prevention of Snipping Tool or mobile screenshots.
  const shield = document.createElement('div');
  shield.className = 'capture-shield';
  shield.setAttribute('aria-hidden', 'true');
  document.addEventListener('DOMContentLoaded', () => document.body.append(shield));
  let shieldTimer;
  const revealShield = () => {
    window.clearTimeout(shieldTimer);
    shield.classList.add('capture-shield--active');
  };
  const concealShield = (delay = 250) => {
    window.clearTimeout(shieldTimer);
    shieldTimer = window.setTimeout(() => shield.classList.remove('capture-shield--active'), delay);
  };

  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('dragstart', event => event.preventDefault());
  document.addEventListener('copy', event => event.preventDefault());
  document.addEventListener('cut', event => event.preventDefault());
  document.addEventListener('selectstart', event => {
    if (!event.target.matches('input, textarea, select, option')) event.preventDefault();
  });
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;
    const blocked = event.key === 'PrintScreen'
      || event.key === 'F12'
      || (modifier && ['a', 'c', 'p', 's', 'u', 'x'].includes(key))
      || (modifier && event.shiftKey && ['c', 'i', 'j', 's'].includes(key));
    if (!blocked) return;
    event.preventDefault();
    revealShield();
    concealShield(900);
  });

  // A browser cannot see every OS capture command. Showing the shield as the page
  // loses focus covers the capture flows where the browser does receive that signal.
  window.addEventListener('blur', revealShield);
  window.addEventListener('focus', () => concealShield());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) revealShield();
    else concealShield();
  });
  window.addEventListener('beforeprint', revealShield);
  window.addEventListener('afterprint', () => concealShield());
})();
