// ===== 型データ(性格・恋愛・仕事タイプ診断から流用、絵文字+ニックネームのみ) =====
// 説明文(96件のFable執筆済み文章)はこのサイトでは使わない。相性診断はニックネーム対比のみで十分と判断し、
// 新規サイトを軽量に保つため意図的にニックネームのみ複製している。
const TYPE_MAPS = {
  personality: {
    ISTJ: ['🐢', '石橋を叩きすぎる亀'], ISFJ: ['🐕', '気づいたら支えてる柴犬'],
    INFJ: ['🦉', '全部お見通しのフクロウ'], INTJ: ['🐺', '頭の中はすでに勝ってる狼'],
    ISTP: ['🐱', 'やる気スイッチ気まぐれ猫'], ISFP: ['🐰', '静かに全部感じてるうさぎ'],
    INFP: ['🦌', '傷つきやすいけど譲れない鹿'], INTP: ['🦝', '気づいたら早口になるタヌキ'],
    ESTP: ['🐆', '考える前に動いてるチーター'], ESFP: ['🐬', 'その場のノリを生きるイルカ'],
    ENFP: ['🐶', '今日も新しい沼にハマる子犬'], ENTP: ['🦊', 'あえて反対意見を言いたいキツネ'],
    ESTJ: ['🦁', '仕切りたがりの生まれ変わりライオン'], ESFJ: ['🐕‍🦺', '頼まれると断れないゴールデン'],
    ENFJ: ['🦢', 'みんなの応援団長・白鳥'], ENTJ: ['🦅', 'もう次のこと考えてる鷲'],
  },
  love: {
    ISTJ: ['☀️', '絶対に崩れない快晴'], ISFJ: ['🌤️', '気づいたら側にいる陽だまり'],
    INFJ: ['🌫️', '一筋縄ではいかない霧'], INTJ: ['🌀', '静かなのに目が離せない台風の目'],
    ISTP: ['🍃', '捕まえようとすると逃げるそよ風'], ISFP: ['🌦️', 'そっと降ってそっと止む小雨'],
    INFP: ['🌇', '理由もなく泣きたくなる夕焼け'], INTP: ['❄️', '触れるとちょっと冷たい霜'],
    ESTP: ['⛈️', '来る時は来る、夕立'], ESFP: ['🏖️', '今日も絶好調な真夏の青空'],
    ENFP: ['🌦️', '読めない、にわか雨'], ENTP: ['🌬️', '急に空気を変える春一番'],
    ESTJ: ['☀️', '頼れる、晴天続き'], ESFJ: ['🌳', '気づけば癒される木漏れ日'],
    ENFJ: ['🌈', 'みんなが見上げる虹'], ENTJ: ['⛅', '存在感だけで空を占める入道雲'],
  },
  work: {
    ISTJ: ['🚃', '1分も遅れない電車'], ISFJ: ['🚌', '気づけば全員乗せてる路線バス'],
    INFJ: ['⛵', '静かに舵を切る帆船'], INTJ: ['🛥️', '見えないところで進む潜水艦'],
    ISTP: ['🏍️', '状況見て即対応するバイク'], ISFP: ['🛶', '自分のペースを崩さないカヌー'],
    INFP: ['🎈', '風向き任せの熱気球'], INTP: ['🧪', '目的地よりエンジンが気になる実験車両'],
    ESTP: ['🏎️', 'アクセル全開スポーツカー'], ESFP: ['🚗', 'みんなを乗せて走るオープンカー'],
    ENFP: ['🪂', '気流次第で行き先が変わるグライダー'], ENTP: ['🏁', 'コース取りで語りたいレーシングカート'],
    ESTJ: ['🚄', '遅延を許さない新幹線'], ESFJ: ['🚙', '全員のシートベルトを確認するファミリーカー'],
    ENFJ: ['🚍', '気づけば全員案内してる観光バス'], ENTJ: ['🚢', '艦隊を率いるフラッグシップ'],
  },
};
const CATEGORY_META = {
  personality: { label: '性格', icon: '✨', color: '#b892ff' },
  love: { label: '恋愛', icon: '💌', color: '#ff8fb3' },
  work: { label: '仕事', icon: '💼', color: '#5bc8b5' },
};

// ===== 気質グループ(16タイプ→4グループへ集約、関係性ニックネームの元データ) =====
const TEMPERAMENT = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};
const GROUP_PRIORITY = ['NT', 'NF', 'SJ', 'SP'];
function pairKey(g1, g2) {
  const i1 = GROUP_PRIORITY.indexOf(g1), i2 = GROUP_PRIORITY.indexOf(g2);
  return i1 <= i2 ? `${g1}_${g2}` : `${g2}_${g1}`;
}

// Fable(claude-fable-5)による書き起こし、2026-08-13。10組み合わせ(対称なので4x4→10種)。
const RELATIONSHIP_TABLE = {
  NT_NT: { name: '頭脳作戦本部コンビ', hook: '語り合うほど深まる、知的な同盟', desc: 'どちらも「なぜ?」を追いかけずにいられない探究派。理屈で納得したい姿勢はそっくりですが、興味の向く先や結論への道筋はそれぞれ違うはず。だからこそ会話は尽きず、相手の視点が自分の思考を一段深くしてくれます。ベタつかない距離感で、一緒に賢くなっていける関係かもしれません。' },
  NT_NF: { name: '未来設計コンビ', hook: '頭と心で、未来を一緒に描く2人', desc: '2人とも目の前より「これから」を見つめる未来志向。ただ、片方は論理で道筋を組み立て、もう片方は想いで意味を灯すタイプです。アプローチは違っても、目指す景色を語り合えば設計図に温度が宿ります。アイデアがちゃんと形になりやすい、創造的な組み合わせと言えそうです。' },
  NT_SJ: { name: '改革と土台コンビ', hook: '新しい発想を、確かな形にする2人', desc: '筋の通ったやり方を大事にする点は共通しています。違うのは時間の向き。片方は「もっと良くできる」と未来を見て、もう片方は「まず確実に」と足元を固めるタイプです。かみ合えば、アイデアが絵に描いた餅で終わらず、ちゃんと現実に着地します。頼れる実現力のある組み合わせです。' },
  NT_SP: { name: '頭脳と瞬発コンビ', hook: '考える人×動く人の、痛快タッグ', desc: '2人とも縛られるのが苦手な自由人。ただ、片方は頭の中で戦略を練り、もう片方は体が先に動くタイプです。考えすぎて止まりそうな時は背中を押してもらい、勢い任せになりそうな時は軌道を整えてもらう。お互いの足りない半分を補い合える、痛快な分業ができる関係です。' },
  NF_NF: { name: '以心伝心コンビ', hook: '言葉にする前に、もう伝わってる', desc: '相手の気持ちの機微に気づける者同士、深いところで通じ合いやすい組み合わせです。ただ、大事にしている理想の形は少しずつ違うので、察し合うだけでなく言葉にする時間も大切に。分かり合えた瞬間の喜びはひとしおで、お互いの理想を一緒に育てていける、あたたかい関係です。' },
  NF_SJ: { name: '安心基地コンビ', hook: '思いやりが循環する、ほっとする関係', desc: '「誰かのために」が原動力なのは2人の共通点。片方は気持ちに寄り添うことで、もう片方は日々の約束を守ることで、それぞれのやり方で愛情を表します。形は違っても向いている方向は同じ。歯車がかみ合えば、周りの人まであたたかくなるような、安心感のある関係になりそうです。' },
  NF_SP: { name: '感性ふたり旅コンビ', hook: '感じたままに、世界を楽しむ2人', desc: '理屈より「心が動くかどうか」を大事にする感性派同士。片方は体験の中に意味を見つけ、もう片方は体験そのものを全力で楽しむタイプです。一緒にいると、何気ない一日が思い出に変わりやすいはず。互いの感動を分かち合ううちに、世界がどんどん彩り豊かになっていく関係です。' },
  SJ_SJ: { name: '鉄壁の信頼コンビ', hook: '約束を守り合える、揺るがない2人', desc: 'コツコツ積み上げる誠実さは2人の共通言語。信頼の築き方はそっくりですが、それぞれが大事にする「正しい手順」は別々の場所で育まれたもの。すり合わせの手間を惜しまなければ、これ以上ないほど安定した土台ができます。長く続くほど強くなる、堅実で頼もしい関係です。' },
  SJ_SP: { name: '錨と帆コンビ', hook: '安定と刺激の、ちょうどいいバランス', desc: '現実をしっかり見ている実際派同士、地に足がついた感覚は共通しています。ただ、片方は計画と安定を、もう片方はその場の楽しさを大事にするタイプ。予定通りに進む安心と、予定外の面白さ。両方を知っている2人だからこそ、日常が窮屈にも退屈にもならない関係を築けます。' },
  SP_SP: { name: 'ノンストップコンビ', hook: '思い立ったが吉日、を地で行く2人', desc: '「やってみたい」と思ったら体が動く行動派同士。ノリとテンポが合うので、一緒にいる時間はとにかく楽しくなりやすい組み合わせです。ただ、楽しみ方のスタイルはそれぞれ違うので、時にはブレーキ役を交代で担当するのも手。退屈とは無縁の、笑いの絶えない関係になりそうです。' },
};
function relationshipFor(myType, otherType) {
  const g1 = TEMPERAMENT[myType] || 'SJ';
  const g2 = TEMPERAMENT[otherType] || 'SJ';
  return RELATIONSHIP_TABLE[pairKey(g1, g2)];
}

// ===== スコアリング =====
// 軸ごとに「同じ/違う」どちらが高得点かを変える(全軸同じ=高得点、という単調な設計にしない)。
// 常に79〜98点に収まるよう配点し、露骨に低い相性が出ないようにする(既存2サイトと同じくエンタメ目的)。
const AXIS_ORDER = ['EI', 'SN', 'TF', 'JP'];
const AXIS_TABLE = {
  EI: { same: 22, diff: 25, sameReason: '同じテンポで過ごせる居心地の良さ', diffReason: '一方が場を動かし、一方が支える好バランス' },
  SN: { same: 25, diff: 19, sameReason: '物の見方が近く、話が早い', diffReason: '視点の違いが新鮮な発見にもすれ違いにもなる' },
  TF: { same: 21, diff: 24, sameReason: '波長は合うが同じ盲点も持ちやすい', diffReason: '論理と感情、両方の視点でバランスよく判断できる' },
  JP: { same: 24, diff: 17, sameReason: '生活のペースが合いやすい', diffReason: '計画派と自由派、すり合わせが一番必要な軸' },
};
const AXIS_LABEL = { EI: 'E / I', SN: 'S / N', TF: 'T / F', JP: 'J / P' };

function compatibilityScore(myType, otherType) {
  let score = 0;
  AXIS_ORDER.forEach((axis, i) => {
    const same = myType[i] === otherType[i];
    score += AXIS_TABLE[axis][same ? 'same' : 'diff'];
  });
  return score;
}
function axisBreakdown(myType, otherType) {
  return AXIS_ORDER.map((axis, i) => {
    const same = myType[i] === otherType[i];
    return { axis, label: AXIS_LABEL[axis], same, reason: AXIS_TABLE[axis][same ? 'sameReason' : 'diffReason'] };
  });
}
function scoreTier(score) {
  if (score >= 95) return '運命的な相棒';
  if (score >= 91) return 'かなり良い相棒';
  if (score >= 87) return '息の合う相性';
  if (score >= 83) return '噛み合ってきた相性';
  return '違いを楽しむ相性';
}

// ===== コード解析 =====
// 「性格・恋愛・仕事タイプ診断」の結果URL(?r=INFPESFJENTJ)またはコード単体の貼り付け、両方を受け付ける。
function extractCode(raw) {
  if (!raw) return null;
  let s = raw.trim();
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s);
      s = u.searchParams.get('r') || u.searchParams.get('me') || u.searchParams.get('you') || s;
    } catch (e) { /* URLとして解析できない場合はそのまま文字列処理を試みる */ }
  }
  s = s.toUpperCase().replace(/[^A-Z]/g, '');
  return /^[A-Z]{12}$/.test(s) ? s : null;
}
function decodeTriple(code12) {
  return { personality: code12.slice(0, 4), love: code12.slice(4, 8), work: code12.slice(8, 12) };
}

// ===== お相手のタイプを推測する4問 =====
const GUESS_QUESTIONS = [
  { axis: 'EI', text: '大人数の場で、その人はどちらかというと…', a: { letter: 'E', text: '自分から輪の中心に入っていくタイプ' }, b: { letter: 'I', text: '気づいたら端の方で誰かと話しているタイプ' } },
  { axis: 'SN', text: '話していて多いのは…', a: { letter: 'S', text: '具体的な事実や経験の話' }, b: { letter: 'N', text: '抽象的な考えやアイデアの話' } },
  { axis: 'TF', text: '相談すると、その人はまず…', a: { letter: 'T', text: '論理的に整理してくれる' }, b: { letter: 'F', text: '気持ちに寄り添ってくれる' } },
  { axis: 'JP', text: '約束や予定に対して、その人は…', a: { letter: 'J', text: '早めにきっちり決めたがる' }, b: { letter: 'P', text: '直前まで決めない・柔軟な方' } },
];

// ===== 状態・DOM =====
const screens = {
  start: document.getElementById('screen-start'),
  guess: document.getElementById('screen-guess'),
  result: document.getElementById('screen-result'),
};
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo(0, 0);
}

let state = {
  me: null,        // 12文字コード
  you: null,       // 12文字コード(実コード時) or null
  guessedPersonality: null, // 4文字推測コード(お相手のコード不明時)
  guessAnswers: {}, // { EI: 'E', ... }
};

document.getElementById('code-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const errorEl = document.getElementById('code-error');
  errorEl.classList.remove('show');

  const me = extractCode(document.getElementById('input-me').value);
  if (!me) {
    errorEl.classList.add('show');
    return;
  }
  state.me = me;

  const youRaw = document.getElementById('input-you').value.trim();
  if (!youRaw) {
    state.you = null;
    startGuessQuiz();
    return;
  }
  const you = extractCode(youRaw);
  if (!you) {
    errorEl.textContent = 'お相手のコードの形式が正しくないようです。空欄のままでも診断できます(4問で推測します)。';
    errorEl.classList.add('show');
    return;
  }
  state.you = you;
  showResult();
});

// ===== 推測クイズ =====
function startGuessQuiz() {
  state.guessAnswers = {};
  const wrap = document.getElementById('guess-questions');
  wrap.innerHTML = '';
  GUESS_QUESTIONS.forEach((q, qi) => {
    const box = document.createElement('div');
    box.className = 'guess-question';
    box.innerHTML = `
      <div class="q-num">Q${qi + 1} / ${GUESS_QUESTIONS.length}</div>
      <div class="q-text">${q.text}</div>
      <div class="guess-options">
        <button type="button" class="option-btn" data-axis="${q.axis}" data-letter="${q.a.letter}">${q.a.text}</button>
        <button type="button" class="option-btn" data-axis="${q.axis}" data-letter="${q.b.letter}">${q.b.text}</button>
      </div>
    `;
    wrap.appendChild(box);
  });
  wrap.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const axis = btn.dataset.axis;
      state.guessAnswers[axis] = btn.dataset.letter;
      wrap.querySelectorAll(`.option-btn[data-axis="${axis}"]`).forEach(b => b.classList.toggle('selected', b === btn));
      if (Object.keys(state.guessAnswers).length === GUESS_QUESTIONS.length) {
        setTimeout(() => {
          state.guessedPersonality = AXIS_ORDER.map(a => state.guessAnswers[a]).join('');
          showResult();
        }, 350);
      }
    });
  });
  showScreen('guess');
}

// ===== 結果計算・表示 =====
let lastResultData = null;

function computeCategoryResult(category, myCode, otherCode) {
  const score = compatibilityScore(myCode, otherCode);
  return {
    category, myCode, otherCode, score,
    tier: scoreTier(score),
    relation: relationshipFor(myCode, otherCode),
    breakdown: axisBreakdown(myCode, otherCode),
  };
}

function showResult() {
  const myTypes = decodeTriple(state.me);
  const isGuess = !state.you;
  const otherTypes = state.you ? decodeTriple(state.you) : { personality: state.guessedPersonality, love: null, work: null };

  const results = {};
  results.personality = computeCategoryResult('personality', myTypes.personality, otherTypes.personality);
  if (!isGuess) {
    results.love = computeCategoryResult('love', myTypes.love, otherTypes.love);
    results.work = computeCategoryResult('work', myTypes.work, otherTypes.work);
  }

  lastResultData = { myTypes, otherTypes, isGuess, results };
  renderScoreHero(lastResultData);
  renderResultCards(lastResultData);
  renderCardPreview(lastResultData);
  showScreen('result');
}

function renderScoreHero(data) {
  const hero = document.getElementById('score-hero');
  const main = data.results.personality;
  const avgScore = Object.values(data.results).reduce((s, r) => s + r.score, 0) / Object.keys(data.results).length;
  hero.innerHTML = `
    <div class="vs-row">
      <div class="vs-person">
        <img class="vs-avatar" src="img/animals/${data.myTypes.personality}.jpg" alt="">
        <div class="vs-name">${TYPE_MAPS.personality[data.myTypes.personality][0]} あなた</div>
      </div>
      <div class="vs-mark">×</div>
      <div class="vs-person">
        <img class="vs-avatar" src="img/animals/${data.otherTypes.personality}.jpg" alt="">
        <div class="vs-name">${TYPE_MAPS.personality[data.otherTypes.personality][0]} お相手${data.isGuess ? '(推測)' : ''}</div>
      </div>
    </div>
    <div class="relation-name">${main.relation.name}</div>
    <div><span class="score-num">${Math.round(avgScore)}</span><span class="score-suffix">点</span></div>
    <div class="score-tier">${scoreTier(avgScore)}</div>
    <p class="score-hook">${main.relation.hook}</p>
  `;
}

function renderResultCards(data) {
  const wrap = document.getElementById('result-cards');
  wrap.innerHTML = '';

  ['personality', 'love', 'work'].forEach((cat, i) => {
    const meta = CATEGORY_META[cat];
    const r = data.results[cat];

    if (!r) {
      const locked = document.createElement('div');
      locked.className = 'locked-card';
      locked.innerHTML = `
        <div class="lock-emoji">🔒</div>
        <p>${meta.icon} ${meta.label}の相性は、お相手が実際に診断すると分かります。<br>推測だけでは性格タイプ以外までは分かりません。</p>
        <a class="btn-secondary" href="https://deskanimals114510-ai.github.io/personality-type-quiz/" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none;">お相手を診断に誘う 🔮</a>
      `;
      wrap.appendChild(locked);
      return;
    }

    const myInfo = TYPE_MAPS[cat][r.myCode];
    const otherInfo = TYPE_MAPS[cat][r.otherCode];
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.setProperty('--accent', meta.color);
    card.style.animationDelay = `${i * 0.12}s`;
    card.innerHTML = `
      <div class="cat-name">${meta.icon} ${meta.label}の相性</div>
      <div class="type-name">${r.relation.name}</div>
      <div class="cat-score"><span class="num">${r.score}</span><span class="tier">点・${r.tier}</span></div>
      <div class="vs-row" style="margin:14px 0;">
        <div class="vs-person">
          <div style="font-size:1.6rem;">${myInfo[0]}</div>
          <div class="vs-name">${myInfo[1]}</div>
        </div>
        <div class="vs-mark">×</div>
        <div class="vs-person">
          <div style="font-size:1.6rem;">${otherInfo[0]}</div>
          <div class="vs-name">${otherInfo[1]}</div>
        </div>
      </div>
      <div class="desc">${r.relation.desc}</div>
      <div class="axis-chips">
        ${r.breakdown.map(b => `<span class="axis-chip ${b.same ? 'match' : ''}">${b.label} ${b.same ? '一致' : '違い'}</span>`).join('')}
      </div>
    `;
    wrap.appendChild(card);
  });

  if (data.isGuess) {
    const note = document.createElement('p');
    note.className = 'guess-disclaimer';
    note.textContent = '※お相手の性格タイプはあなたの回答からの推測です。お相手が実際に診断すると、より正確な相性が分かります。';
    wrap.appendChild(note);
  }
}

// ===== 結果URL・シェア =====
function resultUrl() {
  if (!lastResultData) return location.href;
  const base = `${location.origin}${location.pathname}?me=${lastResultData.myTypes ? state.me : ''}`;
  if (lastResultData.isGuess) {
    return `${base}&you=${lastResultData.otherTypes.personality}&guess=1`;
  }
  return `${base}&you=${state.you}`;
}

function copyResultUrl() {
  if (!lastResultData) return;
  const btn = document.getElementById('btn-copy-url');
  navigator.clipboard.writeText(resultUrl()).then(() => {
    const original = btn.textContent;
    btn.textContent = 'コピーしました ✓';
    setTimeout(() => { btn.textContent = original; }, 2000);
  });
}

function shareResult() {
  if (!lastResultData) return;
  const main = lastResultData.results.personality;
  const avgScore = Math.round(Object.values(lastResultData.results).reduce((s, r) => s + r.score, 0) / Object.keys(lastResultData.results).length);
  const text = `相性診断やってみた!\n私とお相手は「${main.relation.name}」・相性${avgScore}点でした\n#相性診断 #MBTI診断`;
  const url = encodeURIComponent(resultUrl());
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank', 'noopener,noreferrer');
}
function shareResultLine() {
  if (!lastResultData) return;
  const url = encodeURIComponent(resultUrl());
  window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank', 'noopener,noreferrer');
}
function restartQuiz() {
  document.getElementById('code-form').reset();
  document.getElementById('code-error').classList.remove('show');
  state = { me: null, you: null, guessedPersonality: null, guessAnswers: {} };
  showScreen('start');
}

// ===== 結果カード画像生成(Canvas、性格・恋愛・仕事タイプ診断と同じ方式を移植) =====
const CARD_PAL = { bg1: '#ffe9f3', bg2: '#f4e9ff', bg3: '#fff6e9', primaryDark: '#ef6b96', text: '#55404f', sub: '#a3899e' };

function cardRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function cardDrawBackground(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, CARD_PAL.bg1); g.addColorStop(0.55, CARD_PAL.bg2); g.addColorStop(1, CARD_PAL.bg3);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  [[w * 0.85, h * 0.15, w * 0.30, '#ffd8e8'], [w * 0.15, h * 0.92, w * 0.28, '#e2d4ff'], [w * 0.65, h * 0.88, w * 0.22, '#fff0d8']]
    .forEach(([x, y, r, c]) => {
      const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, c); rg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    });
}
function cardCoverImage(ctx, img, x, y, w, h) {
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s, dh = img.height * s;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}
function cardFitTextMultiline(ctx, text, maxWidth, weight, family, maxSize, minSize, maxLines) {
  function wrapAtSize(size) {
    ctx.font = `${weight} ${size}px ${family}`;
    const hasSpaces = /\s/.test(text);
    const units = hasSpaces ? text.split(' ') : text.split('');
    const sep = hasSpaces ? ' ' : '';
    const lines = []; let cur = '';
    units.forEach(u => {
      const trial = cur ? cur + sep + u : u;
      if (!cur || ctx.measureText(trial).width <= maxWidth) cur = trial;
      else { lines.push(cur); cur = u; }
    });
    if (cur) lines.push(cur);
    return lines;
  }
  let size = maxSize, lines = wrapAtSize(size);
  while (lines.length > maxLines && size > minSize) { size -= 1; lines = wrapAtSize(size); }
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    ctx.font = `${weight} ${size}px ${family}`;
    let last = lines[maxLines - 1];
    while (last.length > 1 && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
    lines[maxLines - 1] = last + '…';
  }
  return { size, lines };
}
function loadCardImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCompatCardX(ctx, imgMe, imgYou, data) {
  const W = 1200, H = 630;
  cardDrawBackground(ctx, W, H);

  // 2人の丸アバターを左上で重ね気味に配置
  const r1 = 150, cx1 = 210, cy1 = 190;
  const r2 = 150, cx2 = 330, cy2 = 310;
  ctx.save();
  ctx.shadowColor = 'rgba(120,90,130,0.28)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6;
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx1, cy1, r1 + 8, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx1, cy1, r1, 0, Math.PI * 2); ctx.clip();
  cardCoverImage(ctx, imgMe, cx1 - r1, cy1 - r1, r1 * 2, r1 * 2); ctx.restore();

  ctx.save();
  ctx.shadowColor = 'rgba(120,90,130,0.28)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6;
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx2, cy2, r2 + 8, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx2, cy2, r2, 0, Math.PI * 2); ctx.clip();
  cardCoverImage(ctx, imgYou, cx2 - r2, cy2 - r2, r2 * 2, r2 * 2); ctx.restore();

  const cx = 486, rightMax = 1144;
  const maxTextWidth = rightMax - cx;
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 24px 'Zen Maru Gothic', sans-serif";
  ctx.fillText('相性診断の結果', cx, 70);

  const main = data.results.personality;
  const avgScore = Math.round(Object.values(data.results).reduce((s, r) => s + r.score, 0) / Object.keys(data.results).length);
  const nameFit = cardFitTextMultiline(ctx, main.relation.name, maxTextWidth, '900', "'Zen Maru Gothic', sans-serif", 46, 30, 2);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `900 ${nameFit.size}px 'Zen Maru Gothic', sans-serif`;
  let y = 130;
  nameFit.lines.forEach((line, i) => { ctx.fillText(line, cx, y + i * nameFit.size * 1.15); });
  y += nameFit.lines.length * nameFit.size * 1.15 + 20;

  ctx.font = "800 64px Poppins, sans-serif";
  const grad = ctx.createLinearGradient(cx, 0, cx + 200, 0);
  grad.addColorStop(0, '#ff8fb3'); grad.addColorStop(1, '#b892ff');
  ctx.fillStyle = grad;
  ctx.fillText(`${avgScore}`, cx, y + 20);
  const numWidth = ctx.measureText(`${avgScore}`).width;
  ctx.font = "700 22px 'Zen Maru Gothic', sans-serif";
  ctx.fillStyle = CARD_PAL.sub;
  ctx.fillText('点', cx + numWidth + 8, y + 24);
  y += 60;

  ctx.font = "700 22px 'Zen Maru Gothic', sans-serif";
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.fillText(scoreTier(avgScore), cx, y);
  y += 50;

  ctx.strokeStyle = 'rgba(160,130,175,0.28)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(rightMax, y); ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 25px 'Zen Maru Gothic', sans-serif";
  ctx.fillText('あなたとお相手の相性は? 無料診断', cx, y + 44);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 18px Poppins, sans-serif";
  ctx.fillText('Desk Animals | 相性診断', cx, y + 78);
}

function drawCompatCardStory(ctx, imgMe, imgYou, data) {
  const W = 1080, H = 1920;
  cardDrawBackground(ctx, W, H);

  const r = 260;
  const cx1 = W / 2 - 165, cy1 = 400;
  const cx2 = W / 2 + 165, cy2 = 580;
  [[cx1, cy1, imgMe], [cx2, cy2, imgYou]].forEach(([x, y, img]) => {
    ctx.save();
    ctx.shadowColor = 'rgba(120,90,130,0.3)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, r + 10, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
    cardCoverImage(ctx, img, x - r, y - r, r * 2, r * 2); ctx.restore();
  });

  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = "800 70px Poppins, sans-serif";
  ctx.fillStyle = CARD_PAL.text;
  ctx.fillText('×', W / 2, 490);

  const main = data.results.personality;
  const avgScore = Math.round(Object.values(data.results).reduce((s, r) => s + r.score, 0) / Object.keys(data.results).length);
  let y = 1030;
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 30px 'Zen Maru Gothic', sans-serif";
  ctx.fillText('相性診断の結果', W / 2, y);
  y += 70;

  const nameFit = cardFitTextMultiline(ctx, main.relation.name, W - 160, '900', "'Zen Maru Gothic', sans-serif", 56, 36, 2);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `900 ${nameFit.size}px 'Zen Maru Gothic', sans-serif`;
  nameFit.lines.forEach((line, i) => { ctx.fillText(line, W / 2, y + i * nameFit.size * 1.15); });
  y += nameFit.lines.length * nameFit.size * 1.15 + 60;

  ctx.font = "800 90px Poppins, sans-serif";
  const grad = ctx.createLinearGradient(W / 2 - 100, 0, W / 2 + 100, 0);
  grad.addColorStop(0, '#ff8fb3'); grad.addColorStop(1, '#b892ff');
  ctx.fillStyle = grad;
  ctx.fillText(`${avgScore}点`, W / 2, y);
  y += 80;

  ctx.font = "700 30px 'Zen Maru Gothic', sans-serif";
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.fillText(scoreTier(avgScore), W / 2, y);
  y += 90;

  ctx.strokeStyle = 'rgba(160,130,175,0.3)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(150, y); ctx.lineTo(930, y); ctx.stroke();
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 40px 'Zen Maru Gothic', sans-serif";
  ctx.fillText('あなたとお相手の相性は?', W / 2, y + 65);
  ctx.font = "700 30px 'Zen Maru Gothic', sans-serif";
  ctx.fillText('無料診断', W / 2, y + 120);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 24px Poppins, sans-serif";
  ctx.fillText('Desk Animals | 相性診断', W / 2, y + 175);
  ctx.textAlign = 'left';
}

async function buildCompatCardCanvas(data, mode) {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* フォント読み込み待ちに失敗しても既定フォントで続行 */ }
  }
  const [imgMe, imgYou] = await Promise.all([
    loadCardImage(`img/animals/${data.myTypes.personality}.jpg`),
    loadCardImage(`img/animals/${data.otherTypes.personality}.jpg`),
  ]);
  const canvas = document.createElement('canvas');
  if (mode === 'story') {
    canvas.width = 1080; canvas.height = 1920;
    drawCompatCardStory(canvas.getContext('2d'), imgMe, imgYou, data);
  } else {
    canvas.width = 1200; canvas.height = 630;
    drawCompatCardX(canvas.getContext('2d'), imgMe, imgYou, data);
  }
  return canvas;
}

async function renderCardPreview(data) {
  const preview = document.getElementById('result-card-preview');
  preview.innerHTML = '';
  try {
    const canvas = await buildCompatCardCanvas(data, 'x');
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.alt = 'compatibility card preview';
    preview.appendChild(img);
  } catch (e) {
    console.error('結果カードプレビューの生成に失敗しました', e);
    preview.remove();
  }
}

async function downloadResultCard(mode) {
  if (!lastResultData) return;
  const btnId = mode === 'story' ? 'btn-save-card-story' : 'btn-save-card';
  const btn = document.getElementById(btnId);
  const original = btn.textContent;
  btn.textContent = '生成中…';
  btn.disabled = true;
  try {
    const canvas = await buildCompatCardCanvas(lastResultData, mode);
    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `aisho-shindan-${mode}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        resolve();
      }, 'image/png');
    });
  } catch (e) {
    console.error('結果カード生成に失敗しました', e);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

// ===== イベント =====
document.getElementById('btn-share').addEventListener('click', shareResult);
document.getElementById('btn-share-line').addEventListener('click', shareResultLine);
document.getElementById('btn-copy-url').addEventListener('click', copyResultUrl);
document.getElementById('btn-restart').addEventListener('click', restartQuiz);
document.getElementById('btn-save-card').addEventListener('click', () => downloadResultCard('x'));
document.getElementById('btn-save-card-story').addEventListener('click', () => downloadResultCard('story'));

// ===== 起動時: URLパラメータ復元(共有リンク経由のアクセス) =====
// 関数・状態の宣言が全て済んだ後に実行する必要がある(lastResultData等の let 宣言より前で
// showResult() を呼ぶとTDZ(Temporal Dead Zone)エラーになるため、ファイル末尾に配置)。
(function initFromUrl() {
  const params = new URLSearchParams(location.search);
  const meParam = params.get('me');
  const youParam = params.get('you');
  const guessParam = params.get('guess');
  if (meParam) document.getElementById('input-me').value = meParam;
  if (youParam) document.getElementById('input-you').value = youParam;

  // ?me=と?you=が両方揃っている共有リンクなら、入力画面を飛ばして直接結果を表示する
  if (meParam && youParam) {
    const me = extractCode(meParam);
    const you = guessParam === '1' ? null : extractCode(youParam);
    if (me) {
      state.me = me;
      if (you) {
        state.you = you;
        showResult();
      } else if (/^[A-Z]{4}$/.test(youParam.toUpperCase())) {
        state.guessedPersonality = youParam.toUpperCase();
        showResult();
      }
    }
  }
})();
