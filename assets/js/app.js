/* ============================================================
   PIXORA — App logic (shared for all pages)
   ============================================================ */

/* ---------------- helpers ---------------- */
function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

function fmtNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}

function uid() {
  return 'p-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function catName(id) {
  const c = PIXORA_CATEGORIES.find(x => x.id === id);
  return c ? c.name : (id || 'General');
}

function toast(msg, emoji) {
  let t = $('#toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = '<span class="em">' + (emoji || '✨') + '</span>' + esc(msg);
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

function parseYouTubeId(url) {
  if (!url) return '';
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i);
  return m ? m[1] : '';
}

/* ---------------- ads ---------------- */
function renderAds() {
  const codes = getAdCodes();
  $all('[data-ad]').forEach(el => {
    const slot = el.dataset.ad;
    const code = (codes[slot] || PIXORA_DEFAULT_ADS[slot] || '').trim();
    if (code) {
      el.classList.add('ad-live');
      el.innerHTML = code;
      // make injected scripts run (e.g. AdSense)
      $all('script', el).forEach(old => {
        const s = document.createElement('script');
        Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
        s.textContent = old.textContent;
        old.replaceWith(s);
      });
      // if the ad network does not fill the slot, show a smartlink fallback
      if (/<script/i.test(code)) {
        setTimeout(() => {
          const hasVisual = el.querySelector('iframe, img, ins, object, embed');
          const nativeBox = el.querySelector('div[id^="container-"]');
          const nativeFilled = nativeBox && nativeBox.children.length > 0;
          if (!hasVisual && !nativeFilled && el.isConnected) {
            el.classList.remove('ad-live');
            el.innerHTML = pixoraSmartBanner((slot === 'left' || slot === 'right') ? 'box' : 'wide');
          }
        }, 3500);
      }
    } else {
      el.classList.remove('ad-live');
      const labels = {
        top: ['Top Banner Ad', 'Your ad shows here — highest view spot'],
        left: ['Left Sidebar Ad', 'Your ad shows here (300×250)'],
        right: ['Right Sidebar Ad', 'Your ad shows here (300×250)'],
        video: ['Video Size Ad (16:9)', 'Big player-size ad — your video ad shows here'],
        inline: ['In-Feed Video Ad', 'Your video-size ad shows here inside the feed'],
        bottom: ['Footer Banner Ad', 'Your ad shows here — bottom of every page']
      };
      const info = labels[slot] || ['Advertisement', 'Your ad shows here'];
      el.innerHTML =
        '<div class="ad-placeholder">' +
        '<span class="ad-label">Advertisement</span>' +
        '<strong>' + info[0] + '</strong>' +
        '<p>' + info[1] + '</p>' +
        '</div>';
    }
  });
}

/* ---------------- nav ---------------- */
function initNav() {
  const burger = $('.hamburger');
  const menu = $('#mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    $all('a', menu).forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }
}

/* ---------------- feed ---------------- */
let feedState = { filter: 'all', query: '' };

function initFeed() {
  const grid = $('#feedGrid');
  if (!grid) return;

  // chips (top filter row)
  $all('.filter-row .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $all('.filter-row .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      feedState.filter = chip.dataset.filter;
      renderFeed();
    });
  });

  // category list (left sidebar)
  $all('.cat-list button').forEach(btn => {
    btn.addEventListener('click', () => {
      $all('.cat-list button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      feedState.filter = btn.dataset.filter;
      $all('.filter-row .chip').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === btn.dataset.filter);
      });
      renderFeed();
    });
  });

  // tag cloud
  $all('.tag-cloud .tag').forEach(tag => {
    tag.addEventListener('click', () => {
      feedState.query = tag.dataset.tag.toLowerCase();
      const s = $('#searchInput');
      if (s) s.value = tag.dataset.tag;
      renderFeed();
    });
  });

  // search
  const searchBtn = $('#searchBtn');
  const searchInput = $('#searchInput');
  if (searchBtn && searchInput) {
    const doSearch = () => {
      feedState.query = searchInput.value.trim().toLowerCase();
      renderFeed();
    };
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
    searchInput.addEventListener('input', doSearch);
  }

  renderFeed();
  renderTrend();
}

function matchesFeed(p) {
  const f = feedState.filter;
  let ok = true;
  if (f === 'video') ok = p.type === 'video';
  else if (f === 'image') ok = p.type === 'image';
  else if (f !== 'all') ok = p.category === f;

  if (ok && feedState.query) {
    const q = feedState.query;
    ok = (p.title + ' ' + (p.desc || '') + ' ' + (p.category || '')).toLowerCase().includes(q);
  }
  return ok;
}

function renderFeed() {
  const grid = $('#feedGrid');
  if (!grid) return;
  const posts = getPosts().filter(matchesFeed);
  const countEl = $('#feedCount');
  if (countEl) countEl.textContent = posts.length;

  if (!posts.length) {
    grid.innerHTML =
      '<div class="empty"><div class="big">🔍</div>' +
      '<h3>Nothing found</h3><p>Try a different filter or search word.</p></div>';
    return;
  }

  const liked = getLikedIds();
  let html = '';
  posts.forEach((p, i) => {
    const isLiked = liked.includes(p.id);
    html +=
      '<article class="card" data-id="' + esc(p.id) + '">' +
        '<div class="thumb" style="background-image:url(\'' + esc(p.thumb) + '\')">' +
          '<span class="badge ' + (p.type === 'video' ? 'video' : 'image') + '">' + (p.type === 'video' ? '▶ Video' : '🖼 Image') + '</span>' +
          (p.type === 'video' && p.duration ? '<span class="duration">' + esc(p.duration) + '</span>' : '') +
          (p.type === 'video'
            ? '<button class="play" aria-label="Play">▶</button>'
            : '<button class="play" aria-label="View">🔎</button>') +
        '</div>' +
        '<div class="card-body">' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<div class="card-meta">' +
            '<span class="who"><span class="av">P</span>Pixora</span>' +
            '<span>•</span><span>' + fmtNum(p.views || 0) + ' views</span>' +
            '<span>•</span><span>' + esc(p.age || 'just now') + '</span>' +
          '</div>' +
          (p.tags && p.tags.length
            ? '<div class="tags-row">' + p.tags.slice(0, 3).map(t => '<span class="tag-mini">' + esc(t) + '</span>').join('') + '</div>'
            : '') +
          '<div class="card-foot">' +
            '<button class="like-btn ' + (isLiked ? 'liked' : '') + '" data-id="' + esc(p.id) + '">' +
              '<span class="hrt">' + (isLiked ? '❤️' : '🤍') + '</span>' +
              '<span class="cnt">' + fmtNum((p.likes || 0) + (isLiked ? 1 : 0)) + '</span>' +
            '</button>' +
            '<span class="cat-pill">' + esc(catName(p.category)) + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';

    // in-feed video-size native ad after every 5 posts
    if ((i + 1) % 5 === 0 && i + 1 < posts.length) {
      html +=
        '<article class="card ad-native-card">' +
          '<div class="thumb ad-thumb">' +
            '<span class="badge video">Ad</span>' +
            '<div class="ad ad-canvas" data-ad="inline"></div>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3 style="min-height:0">Sponsored Content</h3>' +
            '<div class="card-meta"><span class="who"><span class="av">Ad</span>Advertisement</span><span>•</span><span>Video Ad</span></div>' +
          '</div>' +
        '</article>';
    }
  });
  grid.innerHTML = html;

  // events
  $all('.card', grid).forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.like-btn')) return;
      openModal(card.dataset.id);
    });
  });
  $all('.like-btn', grid).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleLike(btn);
    });
  });

  renderAds(); // re-render inline ads inside grid
}

function toggleLike(btn) {
  const id = btn.dataset.id;
  let liked = getLikedIds();
  const post = getPosts().find(p => p.id === id);
  const base = post ? (post.likes || 0) : 0;
  let isLiked;
  if (liked.includes(id)) {
    liked = liked.filter(x => x !== id);
    isLiked = false;
  } else {
    liked.push(id);
    isLiked = true;
  }
  pixoraSave(PIXORA_STORE.likes, liked);
  btn.classList.toggle('liked', isLiked);
  $('.hrt', btn).textContent = isLiked ? '❤️' : '🤍';
  $('.cnt', btn).textContent = fmtNum(base + (isLiked ? 1 : 0));
  btn.classList.remove('pop');
  void btn.offsetWidth;
  btn.classList.add('pop');
}

function renderTrend() {
  const box = $('#trendList');
  if (!box) return;
  const posts = getPosts().slice().sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
  box.innerHTML = posts.map(p =>
    '<div class="trend-item" data-id="' + esc(p.id) + '">' +
      '<div class="t-thumb" style="background-image:url(\'' + esc(p.thumb) + '\')"></div>' +
      '<div><b>' + esc(p.title.slice(0, 46)) + (p.title.length > 46 ? '…' : '') + '</b>' +
      '<span>' + fmtNum(p.views || 0) + ' views</span></div>' +
    '</div>'
  ).join('');
  $all('.trend-item', box).forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.id));
  });
}

/* ---------------- modal ---------------- */
function openModal(id) {
  const p = getPosts().find(x => x.id === id);
  const overlay = $('#modalOverlay');
  if (!p || !overlay) return;

  const liked = getLikedIds().includes(p.id);
  const mediaHtml = (p.type === 'video' && p.yt)
    ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(p.yt) + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="video"></iframe>'
    : '<img src="' + esc(p.thumb) + '" alt="' + esc(p.title) + '">';

  $('.media', overlay).innerHTML =
    '<button class="close" id="modalClose">✕</button>' + mediaHtml;
  $('.body', overlay).innerHTML =
    '<h2>' + esc(p.title) + '</h2>' +
    '<div class="meta">' +
      '<span class="cat-pill">' + esc(catName(p.category)) + '</span>' +
      '<span>' + fmtNum(p.views || 0) + ' views</span>' +
      '<span>•</span><span>' + esc(p.age || 'just now') + '</span>' +
    '</div>' +
    '<p>' + esc(p.desc || '') + '</p>' +
    (p.tags && p.tags.length
      ? '<div class="tags-row">' + p.tags.map(t => '<span class="tag-mini">' + esc(t) + '</span>').join('') + '</div>'
      : '') +
    '<button class="like-btn ' + (liked ? 'liked' : '') + '" data-id="' + esc(p.id) + '">' +
      '<span class="hrt">' + (liked ? '❤️' : '🤍') + '</span>' +
      '<span class="cnt">' + fmtNum((p.likes || 0) + (liked ? 1 : 0)) + '</span>' +
      '<span>&nbsp;Like</span>' +
    '</button>';

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  $('#modalClose').addEventListener('click', closeModal);
  $('.like-btn', overlay).addEventListener('click', function () { toggleLike(this); renderFeed(); });
}

function closeModal() {
  const overlay = $('#modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  $('.media', overlay).innerHTML = '';
  document.body.style.overflow = '';
}

function initModal() {
  const overlay = $('#modalOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ---------------- suggest form ---------------- */
function initSuggestForm() {
  const form = $('#suggestForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#sName').value.trim();
    const link = $('#sLink').value.trim();
    const type = $('#sType').value;
    const category = $('#sCategory').value;
    const message = $('#sMessage').value.trim();
    const email = $('#sEmail') ? $('#sEmail').value.trim() : '';

    if (!name || !link) {
      toast('Please fill name and content link', '⚠️');
      return;
    }

    const list = getSuggestions();
    list.unshift({
      id: uid(),
      name, link, email, type, category, message,
      status: 'pending',
      date: new Date().toLocaleString()
    });
    const ok = pixoraSave(PIXORA_STORE.suggestions, list);
    if (!ok) {
      toast('Could not save — browser storage is full', '⚠️');
      return;
    }
    form.reset();
    toast('Suggestion sent! The team will review it soon 🎉', '✅');
  });
}

/* ---------------- admin ---------------- */
function initAdmin() {
  const root = $('#adminRoot');
  if (!root) return;

  // tabs
  $all('.admin-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $all('.admin-tabs .tab').forEach(t => t.classList.remove('active'));
      $all('.admin-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = $('#panel-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  renderAdminStats();
  renderSuggestions();
  initAdminPostForm();
  initAdminAds();
}

function renderAdminStats() {
  const posts = getPosts();
  const sugg = getSuggestions();
  const ads = getAdCodes();
  const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  set('#statPosts', posts.length);
  set('#statPending', sugg.filter(s => s.status === 'pending').length);
  set('#statApproved', sugg.filter(s => s.status === 'approved').length);
  set('#statAds', Object.values(ads).filter(v => (v || '').trim()).length + '/5');
}

function renderSuggestions() {
  const box = $('#suggList');
  if (!box) return;
  const list = getSuggestions();
  if (!list.length) {
    box.innerHTML =
      '<div class="empty"><div class="big">📭</div>' +
      '<h3>No suggestions yet</h3><p>Visitor suggestions from the Suggest page will appear here.</p></div>';
    return;
  }
  box.innerHTML = list.map(s =>
    '<div class="sugg-item" data-id="' + esc(s.id) + '">' +
      '<div class="info">' +
        '<b>' + esc(s.name) + '</b>' +
        '<p><strong>Link:</strong> ' + esc(s.link) + '<br>' +
        (s.message ? '<strong>Message:</strong> ' + esc(s.message) : '') + '</p>' +
        '<div class="tags">' +
          '<span>' + esc(s.type || 'video') + '</span>' +
          '<span>' + esc(catName(s.category)) + '</span>' +
          '<span>' + esc(s.date || '') + '</span>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">' +
        '<span class="status-pill ' + esc(s.status) + '">' + esc(s.status) + '</span>' +
        (s.status === 'pending'
          ? '<div style="display:flex;gap:8px">' +
              '<button class="btn btn-sm btn-ok" data-act="approve">✔ Approve</button>' +
              '<button class="btn btn-sm btn-danger" data-act="reject">✕ Reject</button>' +
            '</div>'
          : '') +
      '</div>' +
    '</div>'
  ).join('');

  $all('.sugg-item button[data-act]', box).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.sugg-item').dataset.id;
      const act = btn.dataset.act;
      const list2 = getSuggestions();
      const s = list2.find(x => x.id === id);
      if (!s) return;
      s.status = act === 'approve' ? 'approved' : 'rejected';
      pixoraSave(PIXORA_STORE.suggestions, list2);

      if (act === 'approve') {
        const posts = pixoraLoad(PIXORA_STORE.posts, []);
        const isImg = (s.type || '').toLowerCase().includes('image');
        const yt = isImg ? '' : parseYouTubeId(s.link);
        posts.unshift({
          id:g ? 'image' : 'video',
          title: (s.message ? s.message.slice(0, 70) : 'Visitor suggestion'),
          category: s.category || 'fun',
          thumb: isImg && /^https?:\/\//.test(s.link) ? s.link : 'assets/img/art.jpg',
          yt: yt,
          duration: '',
          views: Math.floor(Math.random() * 900) + 100,
          likes: Math.floor(Math.random() * 90) + 10,
          age: 'just now',
          desc: 'Suggested by ' + s.name + '. ' + (s.message || '')
        });
        pixoraSave(PIXORA_STORE.posts, posts);
        toast('Approved & published to the feed!', '🎉');
      } else {
        toast('Suggestion rejected', '🗑️');
      }
      renderSuggestions();
      renderAdminStats();
    });
  });
}

function initAdminPostForm() {
  const form = $('#postForm');
  if (!form) return;
  const typeSel = $('#pType');
  typeSel.addEventListener('change', () => {
    $('#pYouTubeGroup').style.display = typeSel.value === 'video' ? '' : 'none';
    $('#pImageGroup').style.display = typeSel.value === 'image' ? '' : 'none';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = $('#pTitle').value.trim();
    const category = $('#pCategory').value;
    const type = $('#pType').value;
    const desc = $('#pDesc').value.trim();
    const file = $('#pFile').files[0];
    const url = $('#pYouTube').value.trim();

    if (!title) { toast('Please add a title', '⚠️'); return; }

    const finish = (thumb, yt) => {
      const posts = pixoraLoad(PIXORA_STORE.posts, []);
      posts.unshift({
        id: uid(),
        type,
        title,
        category,
        thumb: thumb || 'assets/img/art.jpg',
        yt: yt || '',
        duration: type === 'video' ? '0:00' : '',
        views: 0,
        likes: 0,
        age: 'just now',
        desc
      });
      if (!pixoraSave(PIXORA_STORE.posts, posts)) {
        toast('Image too large for browser storage — try a smaller file', '⚠️');
        return;
      }
      form.reset();
      typeSel.dispatchEvent(new Event('change'));
      renderAdminStats();
      toast('Post published to the feed!', '🚀');
    };

    if (type === 'video') {
      finish('assets/img/art.jpg', parseYouTubeId(url));
    } else if (file) {
      if (file.size > 1200 * 1024) {
        toast('Please choose an image under 1.2MB', '⚠️');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => finish(reader.result, '');
      reader.readAsDataURL(file);
    } else {
      toast('Please choose an image file', '⚠️');
    }
  });
}

function initAdminAds() {
  const wrap = $('#adAdminGrid');
  if (!wrap) return;
  const codes = getAdCodes();
  const slots = [
    ['top', 'Top Banner', 'Shows at the top of every page'],
    ['left', 'Left Sidebar', 'Shows on the left side of the feed'],
    ['right', 'Right Sidebar', 'Shows on the right side of the feed'],
    ['video', 'Video Size Ad (16:9)', 'Big player-size ad — between slider and feed'],
    ['inline', 'In-Feed Video Ad', 'Video-size native ad inside the feed'],
    ['bottom', 'Footer Banner', 'Shows at the bottom of every page']
  ];

  wrap.innerHTML = slots.map(([id, name, where]) =>
    '<div class="ad-admin-card">' +
      '<h4>' + name + ' <span class="where">' + where + '</span></h4>' +
      '<textarea data-slot="' + id + '" placeholder="Paste your ad code here (AdSense, banner HTML, script...)">' + esc(codes[id] || PIXORA_DEFAULT_ADS[id] || '') + '</textarea>' +
      '<div class="row">' +
        '<button class="btn btn-sm btn-grad" data-save="' + id + '">💾 Save</button>' +
        '<button class="btn btn-sm btn-danger" data-clear="' + id + '">Clear</button>' +
      '</div>' +
    '</div>'
  ).join('');

  $all('[data-save]', wrap).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.save;
      const all = getAdCodes();
      all[id] = $('textarea[data-slot="' + id + '"]', wrap).value;
      pixoraSave(PIXORA_STORE.ads, all);
      renderAdminStats();
      toast('Ad slot saved! It is now live on the site', '📢');
    });
  });
  $all('[data-clear]', wrap).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.clear;
      const all = getAdCodes();
      delete all[id];
      pixoraSave(PIXORA_STORE.ads, all);
      $('textarea[data-slot="' + id + '"]', wrap).value = '';
      renderAdminStats();
      toast('Ad slot cleared — placeholder returns', '🧹');
    });
  });
}

/* ---------------- featured slider ---------------- */
function initSlider() {
  const wrap = $('#slider');
  if (!wrap) return;
  let posts = getPosts().filter(p => p.featured);
  if (posts.length < 2) posts = getPosts().slice(0, 5);
  posts = posts.slice(0, 5);

  const track = $('#sliderTrack', wrap);
  const dotsBox = $('#sliderDots', wrap);
  if (!track || !posts.length) return;

  track.innerHTML = posts.map(p =>
    '<div class="slide" data-id="' + esc(p.id) + '">' +
      '<div class="slide-bg" style="background-image:url(\'' + esc(p.thumb) + '\')"></div>' +
      '<div class="slide-content">' +
        '<div class="s-tags">' +
          '<span class="tag-mini">' + (p.type === 'video' ? '▶ Video' : '🖼 Image') + '</span>' +
          '<span class="tag-mini">' + esc(catName(p.category)) + '</span>' +
          ((p.tags && p.tags[0]) ? '<span class="tag-mini">' + esc(p.tags[0]) + '</span>' : '') +
        '</div>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc((p.desc || '').slice(0, 120)) + ((p.desc || '').length > 120 ? '…' : '') + '</p>' +
        '<div><button class="btn btn-white btn-watch">' + (p.type === 'video' ? '▶ Watch Now' : '🔎 View Image') + '</button></div>' +
      '</div>' +
    '</div>'
  ).join('');

  dotsBox.innerHTML = posts.map((_, i) =>
    '<span class="dot ' + (i === 0 ? 'active' : '') + '" data-i="' + i + '"></span>'
  ).join('');

  let idx = 0;
  const go = i => {
    idx = (i + posts.length) % posts.length;
    track.style.transform = 'translateX(-' + idx * 100 + '%)';
    $all('.dot', dotsBox).forEach((d, j) => d.classList.toggle('active', j === idx));
  };

  let timer = setInterval(() => go(idx + 1), 5500);
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 5500);
  };

  const prevBtn = $('#sliderPrev', wrap);
  const nextBtn = $('#sliderNext', wrap);
  if (prevBtn) prevBtn.addEventListener('click', () => { go(idx - 1); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { go(idx + 1); restart(); });
  $all('.dot', dotsBox).forEach(d => d.addEventListener('click', () => { go(+d.dataset.i); restart(); }));
  $all('.slide', wrap).forEach(s => {
    s.addEventListener('click', () => openModal(s.dataset.id));
  });

  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', restart);
}

/* ---------------- boot ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderAds();
  initSlider();
  initFeed();
  initModal();
  initSuggestForm();
  initAdmin();
});
;
