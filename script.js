const modal = document.querySelector('#enquiry-modal');
const form = document.querySelector('#enquiry-form');
const statusClasses = ['is-showing-status', 'is-success', 'is-farewell'];
let statusTimer;

const resetModal = () => modal.classList.remove(...statusClasses);
const showStatus = (type) => {
  const isSuccess = type === 'success';
  modal.classList.add('is-showing-status', isSuccess ? 'is-success' : 'is-farewell');
  modal.querySelector('.status-success').hidden = !isSuccess;
  modal.querySelector('.status-farewell').hidden = isSuccess;
  clearTimeout(statusTimer);
  if (!isSuccess) {
    statusTimer = setTimeout(() => {
      modal.classList.add('is-hidden');
      resetModal();
    }, 2600);
  }
};
const closeModal = () => {
  if (modal.classList.contains('is-showing-status')) return;
  showStatus('farewell');
};
const openModal = () => {
  clearTimeout(statusTimer);
  resetModal();
  modal.classList.remove('is-hidden');
};

document.querySelectorAll('.open-enquiry').forEach((button) => button.addEventListener('click', openModal));
document.querySelector('.close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (modal.classList.contains('is-showing-status')) return;
  const values = new FormData(form);
  const enquiry = [
    'Hello Multicore Technologies,',
    '',
    'New course enquiry',
    `Name: ${values.get('name')}`,
    `Email: ${values.get('email')}`,
    `Contact number: ${values.get('phone')}`,
    `Preferred training mode: ${values.get('mode')}`,
    `Program of interest: ${values.get('course')}`,
    `Career goal: ${values.get('message') || 'Not provided'}`
  ].join('\n');
  const button = form.querySelector('.submit-button');
  button.innerHTML = 'Enquiry received <i data-lucide="check"></i>';
  lucide.createIcons();
  showStatus('success');
  setTimeout(() => {
    window.location.assign(`https://wa.me/918825808110?text=${encodeURIComponent(enquiry)}`);
  }, 3000);
});

const counters = document.querySelectorAll('.counter');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || '';
  const duration = 1500;
  const startTime = performance.now();
  const format = new Intl.NumberFormat('en-IN');

  const update = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.max(1, Math.round(target * easedProgress));
    counter.textContent = `${format.format(value)}${suffix}`;

    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

if (reducedMotion) {
  counters.forEach((counter) => {
    counter.textContent = `${new Intl.NumberFormat('en-IN').format(Number(counter.dataset.count))}${counter.dataset.suffix || ''}`;
  });
} else {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  const trustStrip = document.querySelector('.trust-strip');
  if (trustStrip) counterObserver.observe(trustStrip);
}

lucide.createIcons();

const story = document.querySelector('.our-story');
const storyHighlights = story ? story.querySelectorAll('.story-highlight') : [];

const prepareStoryHighlights = () => {
  storyHighlights.forEach((highlight) => {
    const words = highlight.textContent.trim().split(/(\s+)/);
    highlight.textContent = '';
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'story-word';
      span.style.setProperty('--word-index', index);
      span.textContent = word;
      highlight.append(span);
    });
  });
};

if (story && storyHighlights.length) {
  prepareStoryHighlights();
  const revealStoryHighlights = () => {
    storyHighlights.forEach((highlight, index) => {
      setTimeout(() => highlight.classList.add('is-highlighted'), index * 1450);
    });
  };

  if (reducedMotion) {
    revealStoryHighlights();
  } else {
    const storyObserver = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      setTimeout(revealStoryHighlights, 2000);
      observer.unobserve(story);
    }, { threshold: 0.45 });
    storyObserver.observe(story);
  }
}

const advantageJourney = document.querySelector('.advantage-journey');
if (advantageJourney) {
  const advantageCards = [...advantageJourney.querySelectorAll('.advantage-card')];
  const revealAdvantages = () => {
    advantageCards.forEach((card, index) => {
      setTimeout(() => card.classList.add('is-revealed'), index * 620);
    });
  };
  const activateAdvantageLabels = () => {
    advantageCards.forEach((card, index) => {
      setTimeout(() => card.classList.add('is-label-active'), index * 420);
    });
  };

  if (reducedMotion) {
    revealAdvantages();
    activateAdvantageLabels();
  } else {
    const advantageObserver = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      revealAdvantages();
      setTimeout(activateAdvantageLabels, 2000);
      observer.unobserve(advantageJourney);
    }, { threshold: 0.2 });
    advantageObserver.observe(advantageJourney);
  }
}

// Duplicate each supplied-logo sequence so both marquee rows loop seamlessly.
document.querySelectorAll('.career-logo-lane').forEach((lane) => {
  const [sourceTrack, duplicateTrack] = lane.querySelectorAll('.career-logo-track');
  if (sourceTrack && duplicateTrack && !duplicateTrack.children.length) {
    duplicateTrack.append(...[...sourceTrack.children].map((logo) => logo.cloneNode(true)));
  }
});

const certificateFeature = document.querySelector('.certificate-feature');
if (certificateFeature && !reducedMotion) {
  const typingTargets = certificateFeature.querySelectorAll('.certificate-feature__copy > p, .certificate-feature__copy > h2');
  let elapsed = 280;

  typingTargets.forEach((target) => {
    const textNodes = [];
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      textNode.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(part);
          return;
        }
        const word = document.createElement('span');
        const duration = Math.max(100, part.length * 38);
        word.className = 'certificate-type-word';
        word.textContent = part;
        word.style.setProperty('--typing-delay', `${elapsed}ms`);
        word.style.setProperty('--typing-duration', `${duration}ms`);
        word.style.setProperty('--typing-characters', part.length);
        fragment.append(word);
        elapsed += duration + 72;
      });
      textNode.replaceWith(fragment);
    });
  });

  certificateFeature.querySelectorAll('.certificate-type-word').forEach((word) => {
    word.style.setProperty('--word-width', `${word.getBoundingClientRect().width}px`);
  });
  certificateFeature.classList.add('is-animation-ready');

  const certificateObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    certificateFeature.classList.add('is-revealed');
    observer.unobserve(certificateFeature);
  }, { threshold: 0.2 });
  certificateObserver.observe(certificateFeature);
}

