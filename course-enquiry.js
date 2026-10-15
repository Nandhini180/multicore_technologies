(() => {
  const programs = [
    'Cloud Computing', 'Cybersecurity', 'Data Analytics', 'Data Science',
    'Data Science with AI', 'Data Science with Gen AI', 'Digital Marketing',
    'Full Stack Developement', 'SAP FICO', 'SAP MM Hano', 'Software Testing'
  ];
  const currentProgram = typeof c !== 'undefined' && c?.title
    ? c.title
    : document.querySelector('main h1')?.textContent?.trim() || programs[0];
  const programOptions = programs.map(program =>
    `<option${program === currentProgram ? ' selected' : ''}>${program}</option>`
  ).join('');

  const modal = document.createElement('div');
  modal.className = 'brochure-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <section class="brochure-modal__card" role="dialog" aria-modal="true" aria-labelledby="brochure-title">
      <button class="brochure-modal__close" type="button" aria-label="Close enquiry form">×</button>
      <div class="brochure-modal__art" aria-hidden="true"><img src="assets/career-consultation.png" alt="" /></div>
      <form id="brochure-form">
        <div class="brochure-modal__heading"><h2 id="brochure-title">Your ambition<br><em>deserves a strategy.</em></h2><p>Tell us where you want to go. We'll help you map the skills to get there.</p></div>
        <label>Full Name<input name="name" required autocomplete="name" placeholder="Your full name"></label>
        <label>Professional Email<input name="email" type="email" required autocomplete="email" placeholder="you@company.com"></label>
        <label>Contact Number<input name="phone" type="tel" required autocomplete="tel" placeholder="Your contact number"></label>
        <label>Preferred Training Mode<select name="mode" required><option value="" selected disabled>Select a training mode</option><option>Online</option><option>Offline</option></select></label>
        <label class="brochure-modal__full">Program of Interest<select name="program" required>${programOptions}</select></label>
        <div class="brochure-modal__consult brochure-modal__full"><strong>REQUEST A PRIVATE<br>CAREER CONSULTATION <span>→</span></strong></div>
        <label class="brochure-modal__full">How can we help?<textarea name="message" rows="3" placeholder="Tell us about your career goal"></textarea></label>
        <button class="button brochure-modal__full" type="submit">Request consultation ↗</button>
        <p class="brochure-modal__privacy brochure-modal__full">🔒 Your details remain confidential. No unnecessary follow-ups.</p>
      </form>
    </section>
    <section class="brochure-status" aria-live="polite" hidden>
      <div class="brochure-status__panel brochure-status__success" hidden><p class="brochure-status__eyebrow">Enquiry received</p><h2>YOU'RE IN! 🚀</h2><p>Welcome to the beginning of something bigger.<br>Your enquiry is successfully received.</p><strong>Let's turn your ambition into achievement.</strong></div>
      <div class="brochure-status__panel brochure-status__farewell" hidden><p class="brochure-status__eyebrow">Your next step</p><h2>DON'T CLOSE THE DOOR JUST YET... 👀</h2><p>Your next big move could be one step away.<br>Come back when you're ready to take it.</p><strong>Your journey is still waiting.</strong></div>
    </section>`;
  document.body.append(modal);

  const form = modal.querySelector('#brochure-form');
  const closeButton = modal.querySelector('.brochure-modal__close');
  const status = modal.querySelector('.brochure-status');
  const success = modal.querySelector('.brochure-status__success');
  const farewell = modal.querySelector('.brochure-status__farewell');
  let lastTrigger = null;
  let statusTimer;
  const reset = () => {
    clearTimeout(statusTimer);
    modal.classList.remove('is-showing-status', 'is-success', 'is-farewell');
    status.hidden = true; success.hidden = true; farewell.hidden = true;
    form.hidden = false; closeButton.hidden = false;
  };
  const dismiss = () => {
    reset(); modal.hidden = true; document.body.style.overflow = '';
    lastTrigger?.focus();
  };
  const showStatus = type => {
    const isSuccess = type === 'success';
    form.hidden = true; closeButton.hidden = true; status.hidden = false;
    success.hidden = !isSuccess; farewell.hidden = isSuccess;
    modal.classList.add('is-showing-status', isSuccess ? 'is-success' : 'is-farewell');
    if (!isSuccess) statusTimer = window.setTimeout(dismiss, 2600);
  };
  const showFarewell = () => {
    if (!modal.hidden && !modal.classList.contains('is-showing-status')) showStatus('farewell');
  };

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-brochure-enquiry]');
    if (!trigger) return;
    event.preventDefault();
    lastTrigger = trigger;
    // Start every brochure request with the same clean form a visitor receives on first arrival.
    // Course pages can optionally set data-program; otherwise the page's current course is used.
    const requestedProgram = trigger.dataset.program || currentProgram;
    form.reset();
    reset();
    if (programs.includes(requestedProgram)) form.elements.program.value = requestedProgram;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => form.querySelector('input').focus(), 0);
  });
  closeButton.addEventListener('click', showFarewell);
  modal.addEventListener('click', event => { if (event.target === modal) showFarewell(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) showFarewell(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const enquiry = [
      'Hello Multicore Technologies,', '', 'New course enquiry',
      `Name: ${values.name}`, `Email: ${values.email}`,
      `Contact number: ${values.phone}`, `Preferred training mode: ${values.mode}`,
      `Program of interest: ${values.program}`,
      `Career goal: ${values.message || 'Not provided'}`
    ].join('\n');
    showStatus('success');
    statusTimer = window.setTimeout(() => {
      window.location.assign(`https://wa.me/918825808110?text=${encodeURIComponent(enquiry)}`);
    }, 3000);
  });

  const style = document.createElement('style');
  style.textContent = `
    .brochure-modal{position:fixed;z-index:1000;inset:0;display:grid;place-items:center;padding:22px;background:rgba(3,13,35,.76);backdrop-filter:blur(6px)}.brochure-modal[hidden],.brochure-status[hidden]{display:none!important}.brochure-modal__card{position:relative;z-index:1;width:min(1040px,100%);max-height:calc(100vh - 44px);overflow:auto;display:grid;grid-template-columns:.82fr 1.18fr;background:#fff;border-radius:9px;box-shadow:0 28px 80px rgba(0,0,0,.4);transition:opacity .25s,transform .25s,filter .25s}.brochure-modal__close{position:absolute;z-index:3;top:15px;right:15px;width:38px;height:38px;border:0;border-radius:50%;background:#35415f;color:#fff;font-size:27px;line-height:1;cursor:pointer}.brochure-modal__art{min-height:650px;overflow:hidden;background:#062462}.brochure-modal__art img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}
    .brochure-modal form{padding:43px 48px 30px;display:grid;grid-template-columns:1fr 1fr;gap:13px 16px;align-content:start}.brochure-modal__heading{grid-column:1/-1;padding-right:36px;margin-bottom:2px}.brochure-modal__heading h2{margin:0 0 11px;color:#142344;font-size:31px;line-height:1.13}.brochure-modal__heading h2 em{color:#7055ef;font-style:normal}.brochure-modal__heading p{margin:0 0 4px;color:#667088;font-size:13px;line-height:1.55}.brochure-modal label{display:grid;gap:6px;color:#172344;font-size:10px;font-weight:800}.brochure-modal input,.brochure-modal select,.brochure-modal textarea{width:100%;min-height:41px;border:1px solid #d4ddeb;border-radius:5px;background:#fff;padding:10px 11px;color:#172344;font:500 11px Manrope,Arial,sans-serif;outline-color:#7155ef}.brochure-modal textarea{resize:vertical;min-height:65px}.brochure-modal__full{grid-column:1/-1}.brochure-modal__consult{padding:12px 0 0;border-top:1px solid #dce3ee;color:#172344;font-size:14px;line-height:1.45}.brochure-modal__consult span{color:#7055ef}.brochure-modal .button{justify-content:center;margin-top:1px}.brochure-modal__privacy{margin:0;text-align:center;color:#78839a;font-size:10px}
    .brochure-status{position:absolute;z-index:2;inset:0;display:grid;place-items:center;padding:26px;pointer-events:none}.brochure-status__panel{width:min(510px,100%);padding:48px 45px 43px;background:#fff;color:#142344;text-align:center;border-radius:8px;box-shadow:0 25px 70px rgba(5,14,41,.38);animation:brochure-status-arrive .42s cubic-bezier(.22,.8,.3,1) both}.brochure-status__eyebrow{margin:0 0 19px;color:#7055ef;font:500 10px/1.2 'DM Mono',monospace;letter-spacing:.12em;text-transform:uppercase}.brochure-status h2{margin:0 0 18px;font-size:33px;line-height:1.16}.brochure-status p:not(.brochure-status__eyebrow){max-width:360px;margin:0 auto;color:#667088;font-size:14px;line-height:1.7}.brochure-status strong{display:block;margin-top:18px;font-size:15px;line-height:1.5}.is-showing-status .brochure-modal__card{pointer-events:none;opacity:.13;transform:scale(.96);filter:blur(3px)}.is-success .brochure-status__panel{border-top:5px solid #6c51ef}.is-success .brochure-status h2{color:#7055ef;animation:brochure-success-blink .8s step-end infinite}.is-farewell .brochure-status__panel{border-top:5px solid #a9afbd;animation:brochure-status-arrive .42s cubic-bezier(.22,.8,.3,1) both,brochure-farewell-fade 2.3s .3s ease-in forwards}.is-farewell .brochure-status h2{font-size:29px}.is-farewell .brochure-status strong{color:#596276}@keyframes brochure-status-arrive{from{transform:translateY(18px) scale(.95)}to{transform:translateY(0) scale(1)}}@keyframes brochure-success-blink{50%{opacity:.32}}@keyframes brochure-farewell-fade{0%,58%{opacity:1}100%{opacity:0;transform:translateY(16px) scale(.97)}}
    @media(max-width:760px){.brochure-modal__card{max-width:600px;grid-template-columns:1fr}.brochure-modal__art{min-height:230px;max-height:260px}.brochure-modal form{padding:28px 28px 25px}}@media(max-width:520px){.brochure-modal{padding:12px}.brochure-modal__card{max-height:calc(100vh - 24px)}.brochure-modal form{grid-template-columns:1fr;padding:25px 21px}.brochure-modal__heading,.brochure-modal__full{grid-column:1}.brochure-modal__heading h2{font-size:26px}.brochure-modal__art{min-height:185px;max-height:210px}.brochure-status{padding:18px}.brochure-status__panel{padding:38px 25px 34px}.brochure-status h2{font-size:28px}.is-farewell .brochure-status h2{font-size:25px}}@media(prefers-reduced-motion:reduce){.brochure-status__panel,.is-success .brochure-status h2{animation:none!important}}
  `;
  document.head.append(style);
})();
