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

// ===== EN版タイプ名(MBTI診断script.jsのANIMAL_MAP_EN/WEATHER_MAP_EN/VEHICLE_MAP_ENから
// ニックネーム部分のみ抽出・流用。長文説明はこのサイトでは使わないため未使用) =====
const TYPE_MAPS_EN = {
  personality: {
  ISTJ: ["🐢", "The Turtle Who Triple-Checks the Bridge"],
  ISFJ: ["🐕", "The Golden Retriever Who's Already Got You Covered"],
  INFJ: ["🦉", "The Owl Who Sees Right Through You"],
  INTJ: ["🐺", "The Wolf Who's Already Won the Argument in Their Head"],
  ISTP: ["🐱", "The Cat With the Mood-Dependent 'Go' Switch"],
  ISFP: ["🐰", "The Rabbit Quietly Feeling Everything"],
  INFP: ["🦌", "The Deer Who's Easily Hurt but Never Bends"],
  INTP: ["🦝", "The Raccoon Who Suddenly Starts Talking Fast"],
  ESTP: ["🐆", "The Cheetah Who Moves Before Thinking"],
  ESFP: ["🐬", "The Dolphin Riding the Vibe of the Room"],
  ENFP: ["🐶", "The Puppy Falling Down a New Rabbit Hole Today"],
  ENTP: ["🦊", "The Fox Who Just Has to Play Devil's Advocate"],
  ESTJ: ["🦁", "The Lion Born to Run the Show"],
  ESFJ: ["🐕‍🦺", "The Golden Who Can Never Say No"],
  ENFJ: ["🦢", "Everyone's Head Cheerleader, the Swan"],
  ENTJ: ["🦅", "The Eagle Already Three Moves Ahead"],
  },
  love: {
  ISTJ: ["☀️", "The Clear Sky That Never Clouds Over"],
  ISFJ: ["🌤️", "The Sunbeam You Didn't Notice Warming You"],
  INFJ: ["🌫️", "The Fog That's Hard to Pin Down"],
  INTJ: ["🌀", "The Calm Eye of a Very Focused Storm"],
  ISTP: ["🍃", "The Breeze That Slips Away If You Chase It"],
  ISFP: ["🌦️", "The Soft Rain That Falls and Fades Quietly"],
  INFP: ["🌇", "The Sunset That Makes You Want to Cry for No Reason"],
  INTP: ["❄️", "The Frost That's a Little Cold to the Touch"],
  ESTP: ["⛈️", "The Sudden Downpour That Comes When It Comes"],
  ESFP: ["🏖️", "The Blue Summer Sky, Always in Top Form"],
  ENFP: ["🌦️", "The Unpredictable Passing Shower"],
  ENTP: ["🌬️", "The First Spring Wind That Changes the Whole Mood"],
  ESTJ: ["☀️", "The Reliable Stretch of Clear Skies"],
  ESFJ: ["🌳", "The Dappled Sunlight You Didn't Know You Needed"],
  ENFJ: ["🌈", "The Rainbow Everyone Looks Up At"],
  ENTJ: ["⛅", "The Towering Cloud That Owns the Whole Sky"],
  },
  work: {
  ISTJ: ["🚃", "The Train That's Never a Minute Late"],
  ISFJ: ["🚌", "The Local Bus Quietly Carrying Everyone"],
  INFJ: ["⛵", "The Sailboat Steering Quietly Toward Its Goal"],
  INTJ: ["🛥️", "The Submarine Moving Unseen Beneath the Surface"],
  ISTP: ["🏍️", "The Motorcycle That Reads the Situation and Reacts"],
  ISFP: ["🛶", "The Canoe That Never Breaks Its Own Pace"],
  INFP: ["🎈", "The Hot-Air Balloon Riding the Wind of an Idea"],
  INTP: ["🧪", "The Experimental Vehicle More Interested in the Engine Than the Destination"],
  ESTP: ["🏎️", "The Sports Car with the Pedal Always Down"],
  ESFP: ["🚗", "The Convertible Giving Everyone a Ride"],
  ENFP: ["🪂", "The Glider Whose Destination Changes With the Wind"],
  ENTP: ["🏁", "The Go-Kart That Wants to Talk Racing Lines"],
  ESTJ: ["🚄", "The Bullet Train That Refuses to Run Late"],
  ESFJ: ["🚙", "The Family Car Checking Everyone's Seatbelt"],
  ENFJ: ["🚍", "The Tour Bus Guide Who Somehow Guides Everyone"],
  ENTJ: ["🚢", "The Flagship Commanding the Whole Fleet"],
  },
};
const CATEGORY_META_EN = {
  personality: { label: 'Personality', icon: '✨', color: '#b892ff' },
  love: { label: 'Love', icon: '💌', color: '#ff8fb3' },
  work: { label: 'Career', icon: '💼', color: '#5bc8b5' },
};
let LANG = 'ja';
function getTypeMaps() { return LANG === 'en' ? TYPE_MAPS_EN : TYPE_MAPS; }
function getCategoryMeta() { return LANG === 'en' ? CATEGORY_META_EN : CATEGORY_META; }

const UI_TEXT = {
  ja: {
    pageTitle: 'MBTI相性診断 | あなたとお相手の相性を診断',
    pageDescription: '性格・恋愛・仕事タイプ診断の結果コードから、あなたとお相手の相性を3カテゴリで診断。お相手のコードが無くても4問で推測できます。',
    eyebrowStart: 'COMPATIBILITY TEST',
    titleHtml: 'あなたと<span class="grad-text">お相手の相性</span>、診断します',
    lead: '「性格・恋愛・仕事タイプ診断」の結果コードを使って、<br>2人の相性を3カテゴリで診断します。',
    badges: ['✨ 性格', '💌 恋愛', '💼 仕事', 'の相性がわかります'],
    hubLink: '🔮 相性10パターンを先にチェックする',
    labelMe: 'あなたの結果コード',
    placeholderMe: 'INFPESFJENTJ または結果URL',
    hintMe: 'まだ診断していない方は<a id="link-to-quiz" href="https://deskanimals114510-ai.github.io/personality-type-quiz/" target="_blank" rel="noopener">性格・恋愛・仕事タイプ診断</a>を先にどうぞ(無料・約3分)',
    labelYou: 'お相手の結果コード(お持ちなら)',
    placeholderYou: 'ESTJINTJESFJ または結果URL',
    hintYou: 'お相手のコードが分からなくても大丈夫。次の画面で4つの質問に答えると、性格タイプだけ推測できます',
    codeError: 'コードの形式が正しくないようです。結果URL全体を貼り付けてみてください。',
    submitBtn: '相性を診断する 🔮',
    guessEyebrow: '4 QUESTIONS',
    guessTitleHtml: 'お相手について<br>教えてください',
    guessLead: '直感で選んでOKです。すべて答えると診断に進みます。',
    youLabel: 'あなた',
    otherLabel: 'お相手',
    guessSuffix: '(推測)',
    scoreSuffix: '点',
    lockedText: (meta) => `${meta.icon} ${meta.label}の相性は、お相手が実際に診断すると分かります。<br>推測だけでは性格タイプ以外までは分かりません。`,
    lockedFreeBadge: '🆓 無料で解放されます',
    lockedCta: '招待リンクをコピーして誘う 🔮',
    inviteCopiedLabel: 'リンクをコピーしました ✓',
    catNameSuffix: 'の相性',
    scoreTierSep: '点・',
    matchLabel: '一致',
    diffLabel: '違い',
    guessDisclaimer: '※お相手の性格タイプはあなたの回答からの推測です。お相手が実際に診断すると、より正確な相性が分かります。',
    shareBtn: '結果をXでシェア 🚀',
    lineBtn: 'LINEでシェア',
    copyUrlBtn: '結果URLをコピー 🔗',
    copiedLabel: 'コピーしました ✓',
    restartBtn: 'もう一度診断する',
    saveCardBtn: '結果カードを保存 🖼️',
    saveCardStoryBtn: 'ストーリーズ用に保存 📱',
    cardPreviewHint: '画像を長押し(スマホ)または右クリックで保存できます',
    followLabel: '🐹 Desk Animalsをフォローする',
    followLabel2: '🔮 気になる方はこちらもどうぞ',
    footerDisclaimer: '本診断はエンタメ目的のコンテンツです。科学的な心理診断に代わるものではありません。',
    shareText: (name, score) => `相性診断やってみた!\n私とお相手は「${name}」・相性${score}点でした\nお相手のコードがなくても4問で診断できるよ→\n#相性診断 #MBTI診断`,
    cardEyebrow: '相性診断の結果',
    cardCta: 'あなたとお相手の相性は? 無料診断',
    cardCtaStoryLine1: 'あなたとお相手の相性は?',
    cardCtaStoryLine2: '無料診断',
    cardBrand: 'Desk Animals | 相性診断',
  },
  en: {
    pageTitle: 'MBTI Compatibility Quiz | Check Your Match',
    pageDescription: "Using your result code from the Personality/Love/Career Type Quiz, check your compatibility with someone across 3 categories. Don't have their code? Guess it with 4 quick questions.",
    eyebrowStart: 'COMPATIBILITY TEST',
    titleHtml: 'Find Out <span class="grad-text">Your Compatibility</span>',
    lead: 'Using your result code from the Personality/Love/Career Type Quiz,<br>we\'ll check your compatibility across 3 categories.',
    badges: ['✨ Personality', '💌 Love', '💼 Career', 'compatibility, revealed'],
    hubLink: '🔮 Browse the 10 Compatibility Patterns First',
    labelMe: 'Your Result Code',
    placeholderMe: 'INFPESFJENTJ or result URL',
    hintMe: 'Haven\'t taken the quiz yet? Try the <a id="link-to-quiz" href="https://deskanimals114510-ai.github.io/personality-type-quiz/" target="_blank" rel="noopener">Personality/Love/Career Type Quiz</a> first (free, about 3 minutes)',
    labelYou: "Their Result Code (if you have it)",
    placeholderYou: 'ESTJINTJESFJ or result URL',
    hintYou: "Don't know their code? No problem — answer 4 quick questions on the next screen and we'll guess their personality type",
    codeError: "That code doesn't look quite right. Try pasting the whole result URL instead.",
    submitBtn: 'Check Compatibility 🔮',
    guessEyebrow: '4 QUESTIONS',
    guessTitleHtml: 'Tell Us About<br>Your Match',
    guessLead: "Go with your gut — once you've answered all 4, we'll show your results.",
    youLabel: 'You',
    otherLabel: 'Your Match',
    guessSuffix: ' (Guessed)',
    scoreSuffix: ' pts',
    lockedText: (meta) => `${meta.icon} ${meta.label} compatibility unlocks once your match takes the real quiz.<br>Guessing alone can only tell us their personality type.`,
    lockedFreeBadge: '🆓 Unlocks for free',
    lockedCta: 'Copy Invite Link 🔮',
    inviteCopiedLabel: 'Link copied ✓',
    catNameSuffix: ' Compatibility',
    scoreTierSep: ' pts · ',
    matchLabel: 'Match',
    diffLabel: 'Different',
    guessDisclaimer: "*Your match's personality type here is guessed from your answers. Have them take the real quiz for a more accurate compatibility read.",
    shareBtn: 'Share on X 🚀',
    lineBtn: 'Share on LINE',
    copyUrlBtn: 'Copy Result URL 🔗',
    copiedLabel: 'Copied ✓',
    restartBtn: 'Take the Test Again',
    saveCardBtn: 'Save Result Card 🖼️',
    saveCardStoryBtn: 'Save for Stories 📱',
    cardPreviewHint: 'Long-press (mobile) or right-click the image to save it',
    followLabel: '🐹 Follow Desk Animals',
    followLabel2: '🔮 You might also like',
    footerDisclaimer: 'This test is for entertainment purposes only and is not a substitute for a scientific psychological assessment.',
    shareText: (name, score) => `Just checked our compatibility!\nWe're a "${name}" — ${score}% match\nNo code from them? You can still guess it in 4 questions →\n#CompatibilityQuiz #MBTI`,
    pendingTranslationNote: '🌐 English write-up for this pair is coming soon — shown in Japanese for now.',
    cardEyebrow: 'Your Compatibility Result',
    cardCta: 'Check Your Compatibility — Free Quiz',
    cardCtaStoryLine1: 'Check Your Compatibility',
    cardCtaStoryLine2: 'Free Quiz',
    cardBrand: 'Desk Animals | Compatibility Quiz',
  },
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
// name/hookは組み合わせ単位で共通、本文(personality/love/work)はカテゴリごとに別の文章
// (2026-08-13改訂: 当初は3カテゴリで同一文を使い回していたが、同じ気質ペアだと3枚のカードに
// 一言一句同じ文章が並ぶ問題があったため、カテゴリ別に書き分けた)。
const RELATIONSHIP_TABLE = {
  NT_NT: {
    name: '頭脳作戦本部コンビ', hook: '語り合うほど深まる、知的な同盟',
    personality: '二人とも「なぜ？」から会話が始まる論理派で、知的な議論が何時間でも続く珍しい組み合わせです。ただ同じ土俵に立てるからこそ、どちらも正しさを譲らず議論が平行線になることも。それでも、感情論に流されず対等に語り合える相手は貴重で、お互いの思考を磨き合う同志のような関係になれます。たまには結論を出さずに「あなたはどう感じた？」と気持ちの側を聞いてみると、会話がもう一段深まるかもしれません。',
    love: '束縛やベタベタした駆け引きを好まない二人なので、お互いの時間を尊重できる風通しのいい恋になります。ただ、愛情を言葉にするのがどちらも得意ではなく、気づけば同志のような距離感に落ち着きがち。それでも、対等に本音で話せる相手の希少さを一番わかっているのはお互いのはず。理屈では説明できない「好きだから好き」を月に一度でも言葉にしてみると、関係の温度がじんわり上がるかもしれません。',
    work: '戦略を立てさせたら最強のタッグで、課題の本質を掴む速さは他のペアの追随を許しません。ただ二人とも大きな絵を描くのが好きな分、地道な実行や細部の詰めが後回しになりがちという同じ弱点を抱えています。役割は上下ではなく専門分野で分け、それぞれの領域に決定権を持たせると衝突が減り、互いの知見が掛け算になります。締め切りと進捗の管理だけは、最初に仕組みとして決めておくとうまく回るかもしれません。',
  },
  NT_NF: {
    name: '未来設計コンビ', hook: '頭と心で、未来を一緒に描く2人',
    personality: 'どちらも目の前の事実より可能性や未来の話にわくわくする直感派で、抽象的なテーマで何時間でも語り合えます。違うのは判断の軸で、戦略家は筋が通っているかを、共感家は気持ちが納得できるかを大切にします。この差は噛み合うと最高で、一つの話題を論理と感情の両面から眺められる贅沢な会話になります。意見が分かれたときは、まず「その視点はなかった」と相手の軸を認める一言から始めると、対話がぐっと柔らかくなるかもしれません。',
    love: '共感家は愛を言葉で確かめたい人、戦略家は行動と誠実さで示す人。この温度差が、この組み合わせの一番のすれ違いポイントです。それでも共感家は戦略家のぶれない芯に安心し、戦略家は共感家の温かさに救われるという、足りない部分を埋め合う引力があります。戦略家側は照れくさくても週に一度は気持ちを言葉に、共感家側は言葉にならない愛情表現を汲んであげる。この歩み寄りができれば、長く深く続く関係になれるかもしれません。',
    work: '「何のためにやるのか」というビジョンで熱く一致できるペアです。得意分野は綺麗に分かれていて、戦略家は戦略と仕組みの設計、共感家は人の心を動かして巻き込むこと。意思決定ではデータを重んじる戦略家とメンバーの気持ちを重んじる共感家で意見が割れることもありますが、その両方を通った決定は強く、チームが自然とついてきます。反対したくなったときこそ、まず相手の案の意図を言葉にして返してみると、議論が前に進むかもしれません。',
  },
  NT_SJ: {
    name: '改革と土台コンビ', hook: '新しい発想を、確かな形にする2人',
    personality: '感情論より事実で話せる、まじめな会話が成立する二人です。ただ拠り所が違い、戦略家は「こうすればもっと良くなる」という新しい理屈を、守り手は「これでうまくいってきた」という実績を信じます。新しもの好きと安定志向のこの差は、噛み合えば革新と堅実さを兼ね備えた強い関係に。戦略家側は変化を提案するとき理由と手順をセットで、守り手側は頭ごなしに退けず一度は聞いてみる。それだけで空気がだいぶ変わるかもしれません。',
    love: '派手な駆け引きより誠実さを重んじる点で、根っこの価値観が合う二人です。違いが出るのは日常の過ごし方で、記念日や決まった習慣を大切にしたい守り手と、形式にこだわらず自由でいたい戦略家。ここを「愛が足りない」と誤解しないことが鍵です。守り手の安定感は戦略家の帰る場所になり、戦略家の視点は守り手の世界を広げてくれます。守り手が大切にしている習慣を一つだけ一緒に続けてみると、信頼が静かに深まっていくかもしれません。',
    work: '戦略家が仕組みを設計し、守り手が確実に運用する、実は相性のいい実務ペアです。衝突するのは決まって「前例を変えるか守るか」の場面で、戦略家には改善案が、守り手には急な変更のリスクが見えています。どちらも組織のためを思っての主張なので、対立ではなく役割の違いと捉えられれば強い。変更はいきなり全部ではなく小さく試して結果で判断する、というルールを共有しておくと、二人の強みが素直に噛み合うかもしれません。',
  },
  NT_SP: {
    name: '頭脳と瞬発コンビ', hook: '考える人×動く人の、痛快タッグ',
    personality: 'どちらも束縛が嫌いで合理的、湿っぽくならないさっぱりした空気感が心地いい二人です。違うのはエンジンのかけ方で、戦略家はまず頭で考えてから動き、冒険家はまず動きながら考えます。考えすぎて止まる戦略家を冒険家が外へ連れ出し、勢いで突っ走る冒険家を戦略家が一歩引いて見てあげる、いい中和が起きる組み合わせです。ときには自分の流儀を脇に置いて、相手のペースに丸一日乗ってみると、思わぬ発見があるかもしれません。',
    love: 'お互いに重たい束縛をしない、風通しのいい恋ができる二人です。ただ時間の向きが違い、戦略家は将来の設計図を描きたく、冒険家は今日を最高に楽しみたい。将来の話を避ける冒険家に戦略家が不安になったり、先の話ばかりで冒険家が窮屈さを感じたりすることも。それでも冒険家の行動力は戦略家の世界を広げ、深い思考は冒険家に新しい視点をくれます。デートの半分は未来の話、半分はその日の思いつきに委ねるとバランスが取れるかもしれません。',
    work: '戦略家が青写真を描き、冒険家が現場で即座に形にする、スピード感のあるペアです。計画通りに進めたい戦略家と状況を見て柔軟に変えたい冒険家で進め方が食い違うこともありますが、冒険家の現場感覚は机上の計画の穴を教えてくれる貴重な情報源です。戦略家は大枠と目的だけ決めて細部の裁量を渡し、冒険家は変えた理由を一言共有する。この分担ができると、精度と瞬発力を両方備えた頼れるチームになれるかもしれません。',
  },
  NF_NF: {
    name: '以心伝心コンビ', hook: '言葉にする前に、もう伝わってる',
    personality: '言葉にしない気持ちまで察し合える、深い共感でつながる二人です。一緒にいるだけで「わかってもらえている」と感じられる稀有な関係ですが、似ているからこその落とし穴も。お互いに気を遣いすぎて本音を飲み込んだり、相手の機嫌を深読みしすぎて疲れてしまったりすることがあります。それでも、安心して弱さを見せられる居場所になれるのはこのペアならでは。遠慮して言えずにいることを先に一つだけ打ち明けてみると、関係がもう一段楽になるかもしれません。',
    love: 'どちらも深い心のつながりを求めるロマンチストで、理想の恋を一緒に育てていける組み合わせです。ただ期待値が高くなりやすく、「わかってくれるはず」が外れた小さなすれ違いで、人一倍傷ついてしまう面もあります。察する力が高い二人だからこそ、察してもらうことに頼りすぎないのが長続きの秘訣です。してほしいことは我慢せず言葉にする、と最初に約束しておくと、繊細さが弱点ではなく絆の深さに変わっていくかもしれません。',
    work: '「この仕事に意味があるか」を大切にする二人で、チームの雰囲気づくりや人を励ますことにかけては最高のコンビです。一方で、数字の管理や厳しい決断、耳の痛いフィードバックはどちらも苦手で、優しさがときに停滞につながることも。人が安心して育つ環境を作れるのはこのペアの財産なので、苦手を放置しないことだけが課題です。数字と締め切りの番人役を週替わりでもいいので決めておくと、温かさと成果を両立できるかもしれません。',
  },
  NF_SJ: {
    name: '安心基地コンビ', hook: '思いやりが循環する、ほっとする関係',
    personality: '誰かのために動くことが自然にできる、思いやりベースの温かい二人です。違うのは目線の先で、共感家は「こうなったら素敵」という可能性を、守り手は「これを崩さないように」という現実を見ています。夢見がちと堅実の差でじれったくなる瞬間はあっても、守り手の安定が共感家の理想に足場を与え、共感家の想像力が守り手の日常に彩りを添える補完関係です。相手の話を「でも」ではなく「いいね、それなら」で受けてみると、会話が優しく回り出すかもしれません。',
    love: '誠実で献身的、恋人を大切にする姿勢は共通の二人です。すれ違いやすいのは愛情表現の言語で、共感家は特別な言葉やサプライズに愛を感じ、守り手は毎日の食事や送り迎えのような行動で愛を示します。相手の愛し方を自分の物差しで測ると「愛されていない」と誤解しがちですが、翻訳できれば実はどちらも深い愛情です。相手の「愛の方言」に気づいたら、その場で「嬉しかった」と伝えてみると、表現の違いが豊かさに変わるかもしれません。',
    work: '共感家が目的と人の気持ちを、守り手が計画と実務を担う、夢を現実に着地させる組み合わせです。新しい試みへの温度差で揉めることはあり、共感家の「やってみよう」に守り手は「準備が先」とブレーキをかけがち。でもこのブレーキは反対ではなく、実現までの道を整える力です。共感家は提案に大まかな段取りを添えて、守り手は計画の先にある意義を時々思い出す。お互いの得意を一枚の企画書の中で合体させると、通る提案が作れるかもしれません。',
  },
  NF_SP: {
    name: '感性ふたり旅コンビ', hook: '感じたままに、世界を楽しむ2人',
    personality: '一緒にいる時間そのものを楽しめる、ノリの合う二人です。人懐っこさとフットワークの軽さは共通ですが、共感家は体験に意味や物語を見出したい人、冒険家は体験そのものを味わいたい人。冒険家の軽やかさに救われる日もあれば、共感家の深掘りに冒険家が少し疲れる日もあります。それでも、深さと軽さを行き来できるのはこのペアの特権です。じっくり語る夜と何も考えず遊ぶ休日、両方を意識して混ぜてみると、心地よさが長続きするかもしれません。',
    love: '冒険家の思い切りのいい行動力に共感家がときめき、共感家の深い愛情に冒険家が安らぐ、惹かれ合う理由がはっきりしたペアです。壁になりやすいのは将来の話や気持ちの深掘りで、真剣に語りたい共感家と、重い空気が苦手な冒険家で噛み合わない瞬間があります。ただ冒険家は愛情がないのではなく、今を一緒に楽しむことが愛情表現なのです。大事な話は楽しい時間のあとに短く、を合言葉にすると、深さと軽やかさの両方がある恋になれるかもしれません。',
    work: '共感家が仕事の意義とメンバーのケアを、冒険家が現場の即応と実行を担う、勢いのあるチームです。ムードメーカー同士で職場は明るくなりますが、長期計画や細かい管理はどちらも得意ではなく、盛り上がったまま締め切り直前に慌てるパターンには注意が必要です。逆にそこさえ押さえれば、人を巻き込む力と行動力で立ち上げ期に無類の強さを発揮します。締め切りと進捗だけはツールや第三者の仕組みに任せてしまうと、二人の良さが存分に活きるかもしれません。',
  },
  SJ_SJ: {
    name: '鉄壁の信頼コンビ', hook: '約束を守り合える、揺るがない2人',
    personality: '約束を守る、時間を守る、言ったことをやる。当たり前を当たり前にできる者同士、静かで揺るがない信頼を築ける二人です。ただ、それぞれが経験の中で身につけた「正しいやり方」が違うと、真面目同士だからこそ一歩も譲れなくなることも。どちらの手順にも実績という根拠があるので、正解は一つと思わないのが平和の鍵です。たまには予定を決めない日を作って、どちらのルールもない時間を過ごしてみると、新しい風が入るかもしれません。',
    love: '交際から結婚、その先まで、安心して将来を描ける堅実なパートナー同士です。誠実さと継続力は申し分ない一方、関係が安定するほど役割やデートのパターンが固定化し、気づけばときめきよりも習慣が勝ってしまうことも。でも土台の信頼が固いこのペアは、少しの冒険が大きなスパイスになります。月に一度だけ、行ったことのない場所や食べたことのない料理に二人で挑戦してみると、安心の中に新鮮さが同居する関係になれるかもしれません。',
    work: '納期と品質にかけては随一、任せて安心の鉄壁コンビです。計画・手順・チェックが揃った仕事ぶりは信頼の塊ですが、共通の弱点は前例のない事態への対応で、どちらも慎重なぶん変化への一歩が遅れがちです。とはいえ運用を安心して任せられる安定感はこのペアにしか出せない価値なので、守りを土台に小さな攻めを足すのが理想形。四半期に一つだけ「新しいやり方を試す枠」をあらかじめ計画に組み込んでおくと、無理なく進化できるかもしれません。',
  },
  SJ_SP: {
    name: '錨と帆コンビ', hook: '安定と刺激の、ちょうどいいバランス',
    personality: '正反対に見えて、実は「抽象論より目の前の現実」を見ている点は同じ二人です。違うのは動き方で、守り手は段取りを整えてから、冒険家は思い立ったらすぐ。急な誘いに守り手が振り回されたり、慎重さに冒険家が待ちくたびれたりもしますが、冒険家は守り手の世界を広げ、守り手は冒険家の暴走を優しく止められる、名コンビの素質があります。相手の流儀を「間違い」ではなく「別のやり方」と呼ぶようにすると、違いを面白がれるようになるかもしれません。',
    love: '自分にないものに惹かれ合う典型で、守り手は冒険家の自由さに風を感じ、冒険家は守り手の安定感に安心して羽を伸ばせます。衝突しやすいのは約束の時間やお金の使い方といった生活のリズムで、きちんとしたい守り手と縛られたくない冒険家の綱引きになりがち。ただ、刺激と安心を一つの関係で味わえるのはこの組み合わせならではの贅沢です。デートの企画役を交互に担当してお互いの世界に招待し合う形にすると、違いがそのまま楽しさになるかもしれません。',
    work: '守り手が計画と管理を、冒険家が現場対応と突発トラブルを引き受ける、守りと攻めが揃った実務ペアです。ルール通りに進めたい守り手と状況次第で動きたい冒険家はやり方で揉めがちですが、冒険家の機転は計画外の事態でチームを救い、守り手の管理は冒険家の自由な動きを支える土台になります。ルールを渡すときは「なぜ必要か」を添え、例外時の裁量をあらかじめ預けておく。この取り決め一つで、現場力の高い頼れるチームになれるかもしれません。',
  },
  SP_SP: {
    name: 'ノンストップコンビ', hook: '思い立ったが吉日、を地で行く2人',
    personality: '思い立ったら即行動、今この瞬間を楽しむ天才が二人揃った、退屈とは無縁の組み合わせです。ノリが合いフットワークも軽い最高の遊び仲間ですが、どちらも飽きっぽく気分で動くため、興味の方向がずれると自然と別行動が増えていくことも。それでも、お互いの自由を責めずにいられる気楽さはこのペアの宝物です。「これだけは二人で続ける」という楽しみを一つだけ決めておくと、自由なままでつながりが途切れない関係になれるかもしれません。',
    love: '一緒にいて飽きない、毎日がイベントのような恋ができる二人です。盛り上がりの熱量は最高ですが、どちらも計画や管理が得意でないため、お金や生活設計といった現実的な話題が後回しになりがちで、熱しやすく冷めやすい面も共通しています。ただ、楽しさを全力で共有できる相手としてこれ以上の組み合わせはありません。楽しいことは今まで通り思い切り、そのうえで月に一度だけ現実の話をする日を決めておくと、この楽しさを長く続けられるかもしれません。',
    work: 'スピードと現場力なら右に出る者のいないコンビで、急なトラブルや立ち上げ期の混沌にはめっぽう強い二人です。その一方、長期計画や書類仕事、地道な継続管理はどちらも後回しにしがちで、瞬発力で乗り切るパターンが続くと息切れの心配も。短期決戦の突破力はこのペアの武器なので、苦手分野で消耗しない設計が鍵になります。管理系のタスクはツールや得意な人に思い切って任せてしまうと、強みに集中して成果を出せるかもしれません。',
  },
};
// EN翻訳(Fable執筆、2026-08-29完了。10組み合わせ全て翻訳済み)。
const RELATIONSHIP_TABLE_EN = {
  NT_NT: {
    name: "War Room Duo", hook: "An intellectual alliance that only deepens the longer you talk",
    personality: "You're both the type whose conversations start with 'why?' — a rare pairing where an intellectual debate can happily run for hours. The flip side of being so evenly matched: neither of you likes conceding a point, and discussions can stall out in a stalemate. Even so, a partner who'll talk with you as a true equal without drifting into emotional appeals is a precious find, and you two can become the kind of comrades who sharpen each other's thinking. Every once in a while, skip the conclusion and ask 'so how did that make you feel?' — the conversation might go one level deeper.",
    love: "Neither of you goes in for clinginess or mind games, so this becomes a refreshingly open romance where each other's time is genuinely respected. The catch: neither of you is great at putting affection into words, and before you know it you've settled into something more like comrades than lovers. Still, nobody understands better than you two how rare it is to find someone you can be completely honest with, as an equal. Try saying the thing logic can't explain — 'I love you because I love you' — even just once a month, and there's a good chance the temperature of the relationship warms right up.",
    work: "Put you two on strategy and you're an unbeatable tag team — no other pair grasps the heart of a problem faster. But you share the same blind spot: you both love the big picture, so the unglamorous execution and fine-grained details tend to get shoved to later. Split roles by specialty rather than seniority, give each of you final say in your own domain, and the friction drops while your combined expertise multiplies. The one thing to lock in from day one is a system for deadlines and progress tracking — do that, and this machine might just run beautifully.",
  },
  NT_NF: {
    name: "Future Architects Duo", hook: "Sketching the future together, with head and heart",
    personality: "You're both intuitive types who light up over possibilities and the future rather than the facts on the table, and you can lose hours together to wonderfully abstract topics. Where you differ is the yardstick: the Strategist asks whether it holds up logically, while the Empath asks whether it sits right emotionally. When those two mesh, it's glorious — the luxury of examining a single idea from both the head side and the heart side. When opinions split, open with a simple 'I hadn't seen it from that angle' — acknowledging the other person's yardstick first could soften the whole conversation.",
    love: "The Empath wants love confirmed out loud; the Strategist shows it through actions and quiet steadfastness. That temperature gap is this pairing's number-one source of crossed wires. And yet there's a real gravitational pull here — the Empath finds security in the Strategist's unshakable core, and the Strategist is quietly rescued by the Empath's warmth, each filling in what the other lacks. Strategist: even if it makes you cringe, put the feelings into words once a week. Empath: learn to read the love that never gets said aloud. Meet in the middle like that, and this could become the long, deep kind.",
    work: "This is a pair that can align, passionately, on the 'what are we doing this for' vision. Your strengths divide cleanly: the Strategist designs the strategy and the systems, while the Empath moves people's hearts and brings them along. Decisions can split you — the Strategist trusting the data, the Empath weighing how the team feels — but a decision that passes both of those tests is a strong one, and people follow it naturally. When you're itching to object, try reflecting back the intent behind the other person's idea first; the discussion might actually move forward.",
  },
  NT_SJ: {
    name: "Innovation and Bedrock Duo", hook: "The pair that turns fresh ideas into something solid",
    personality: "You two can talk in facts rather than feelings, which means serious conversations actually work here. What differs is what you each lean on: the Strategist trusts the fresh logic of 'here's how we make it better,' while the Guardian trusts the track record of 'this is what's always worked.' Novelty-lover meets stability-seeker — and when it clicks, you get a relationship that's both innovative and rock-solid. Strategist: when you pitch a change, bring the reasoning and the steps as a set. Guardian: hear it out once before waving it off. That alone could change the whole atmosphere.",
    love: "At the root, your values match: sincerity over flashy games. Where you diverge is everyday life — the Guardian treasures anniversaries and steady rituals, while the Strategist bristles at formality and wants room to breathe. The key is not misreading that gap as 'you don't love me enough.' The Guardian's steadiness becomes the place the Strategist comes home to, and the Strategist's perspective stretches the Guardian's world wider. Try keeping just one of the Guardian's treasured rituals together, and trust might deepen quietly, all on its own.",
    work: "The Strategist designs the system, the Guardian runs it reliably — honestly, a better-matched working pair than you'd guess. The clashes always come at the same spot: change the precedent, or protect it? The Strategist sees the improvement; the Guardian sees the risk of sudden change. You're both arguing for the good of the organization, so if you can frame it as a difference in roles rather than a conflict, you're formidable. Agree on one ground rule — never change everything at once; test small and let the results decide — and your strengths might just click neatly into place.",
  },
  NT_SP: {
    name: "Brains and Reflexes Duo", hook: "Thinker meets doer — one exhilarating tag team",
    personality: "You both hate being fenced in, you're both rational, and the refreshingly unsentimental air between you feels good. The difference is how your engines start: the Strategist thinks first and then moves, while the Explorer moves first and thinks en route. The Explorer drags the overthinking, stalled-out Strategist into the open air; the Strategist steps back and keeps a level eye on the Explorer's full-speed charges. It's a genuinely good neutralizing act. Now and then, set your own style aside and ride the other person's pace for a whole day — you might stumble onto something unexpected.",
    love: "Neither of you does heavy-handed possessiveness, so this romance gets plenty of fresh air. But your clocks point in different directions: the Strategist wants to sketch the blueprint for the future, while the Explorer wants to squeeze everything out of today. The Strategist can get anxious when the Explorer dodges the future talk; the Explorer can feel boxed in when every conversation is about someday. Still, the Explorer's momentum widens the Strategist's world, and the Strategist's deep thinking hands the Explorer a fresh perspective. Split your dates half-and-half — half future plans, half whatever that day brings — and you might find your balance.",
    work: "The Strategist draws the blueprint, the Explorer turns it into reality on the spot — a pair with real velocity. You'll butt heads over process sometimes, the Strategist wanting to stick to the plan while the Explorer adapts to conditions on the fly, but the Explorer's ground-level instincts are priceless intel, exposing the holes no desk-bound plan can see. Strategist: set the frame and the goal, then hand over the details. Explorer: when you change something, share the why in one line. Nail that division of labor, and you could become a team with both precision and lightning reflexes.",
  },
  NF_NF: {
    name: "Telepathy Duo", hook: "It's already understood before anyone says a word",
    personality: "You two pick up on feelings that never get said out loud — a connection built on deep, mutual empathy. It's the rare relationship where simply being together feels like being understood. But being so alike has its trapdoors: you can both be so considerate that you swallow your real feelings, or exhaust yourselves reading too much into each other's moods. Even so, only this pair can be a true safe harbor — the place where showing weakness is finally okay. Try going first: confess just one thing you've been too polite to say, and the relationship might get a whole notch easier to breathe in.",
    love: "You're both romantics who crave a deep connection of the heart, and together you can genuinely grow the ideal love you've each imagined. The trouble is that expectations climb high, and when 'they should just understand' misses the mark, the small misfire cuts deeper than it would for most. Precisely because you're both so good at reading each other, the secret to lasting is not leaning too hard on being read. Make a pact early on — say what you need instead of enduring in silence — and your sensitivity stops being a weakness and becomes the depth of the bond itself.",
    work: "You both care whether the work actually means something, and when it comes to team morale and lifting people up, no duo does it better. The flip side: managing the numbers, making the hard calls, delivering feedback that stings — you'd both rather not, and all that kindness can occasionally curdle into stagnation. Building a place where people feel safe enough to grow is this pair's real treasure; your only assignment is not to leave the weak spots unattended. Appoint a keeper of numbers and deadlines — rotating weekly is fine — and you might just get warmth and results in the same package.",
  },
  NF_SJ: {
    name: "Home Base Duo", hook: "Kindness flows both ways in this relationship where you can finally exhale",
    personality: "You're both the kind of people who help others without thinking twice — a warm pairing built on a foundation of genuine care. Where you differ is in where you're looking: the Empath sees possibility ('wouldn't it be wonderful if...'), while the Guardian sees reality ('let's not break what works'). The dreamer-versus-pragmatist gap can get frustrating at times, but this is a truly complementary match — the Guardian's steadiness gives the Empath's ideals solid ground to stand on, and the Empath's imagination adds color to the Guardian's everyday world. Try receiving each other's ideas with 'nice — so then we could...' instead of 'but' — the conversation might start turning gently in your favor.",
    love: "Sincere, devoted, and serious about cherishing a partner — that much you share completely. Where you tend to miss each other is in the language of love: the Empath feels loved through special words and surprises, while the Guardian shows love through actions — the daily meals, the rides home. Measure your partner's way of loving with your own yardstick and you'll misread it as 'not being loved,' but translate it properly and you'll find deep affection on both sides. When you catch your partner speaking their 'love dialect,' say 'that made me happy' right then and there — the difference in expression might just become the richness of the relationship.",
    work: "With the Empath carrying the purpose and the people, and the Guardian carrying the plan and the execution, you're the pair that lands dreams safely in reality. You will clash over enthusiasm for new ventures — the Empath's 'let's try it!' tends to meet the Guardian's 'preparation first' brake. But that brake isn't opposition; it's the force that paves the road to actually getting there. Let the Empath attach a rough game plan to every proposal, and let the Guardian occasionally look up and remember what the plan is for. Merge both strengths into a single pitch document, and you might find yourselves writing proposals that actually get approved.",
  },
  NF_SP: {
    name: "Road Trip Duo", hook: "Two people savoring the world exactly as they feel it",
    personality: "You're a pair that can enjoy simply being together — the vibes just match. You share the same friendliness and light footwork, but the Empath wants to find meaning and story in every experience, while the Explorer wants to taste the experience itself. Some days the Explorer's lightness is exactly the rescue the Empath needs; other days the Empath's deep-diving wears the Explorer out a little. Even so, being able to travel between depth and lightness is this pair's special privilege. Try deliberately mixing both — nights of long heart-to-hearts and days of playing without a single thought — and the comfort between you might last a very long time.",
    love: "The Empath falls for the Explorer's fearless spontaneity; the Explorer finds rest in the Empath's deep affection — a pairing where the attraction makes perfect sense. The wall you'll hit is talk of the future and the deeper feelings: the Empath wants to go there seriously, the Explorer bolts from heavy air, and the gears grind. But understand this — the Explorer isn't short on love. Enjoying right now, together, is the love. Make it your shared motto that the big conversations come short and after the fun, and you might end up with a romance that has both depth and lightness in the same package.",
    work: "With the Empath tending the work's meaning and the team's hearts, and the Explorer handling rapid response on the ground, you're a team with real momentum. Two mood-makers means a brighter workplace — but long-term planning and fine-grained management aren't either of your strong suits, and the pattern to watch for is riding the high straight into a deadline panic. Nail that one weakness, though, and your combined people-power and drive make you unbeatable in a launch phase. Hand deadlines and progress tracking entirely over to a tool or a third party, and the best of both of you might get room to shine.",
  },
  SJ_SJ: {
    name: "Ironclad Duo", hook: "Two people who keep their word — and never waver",
    personality: "Keeping promises, showing up on time, doing what you said you'd do — you're two people who make the ordinary reliably ordinary, and that builds a quiet, unshakable trust. The catch: each of you has learned your own 'right way of doing things' through hard experience, and precisely because you're both so conscientious, neither will give an inch when those ways collide. Both procedures come backed by a track record, so the key to peace is letting go of the idea that there's only one correct answer. Once in a while, schedule a day with no schedule — time governed by neither of your rulebooks — and some fresh air might find its way in.",
    love: "From dating to marriage and everything beyond, you're steady partners who can sketch a future together without a flicker of doubt. Sincerity and staying power are beyond reproach — but the more stable the relationship gets, the more the roles and date-night patterns calcify, until one day habit has quietly outvoted butterflies. Here's the good news: with a foundation of trust this solid, even a small adventure becomes a big spice. Just once a month, take on a place you've never been or a dish you've never tried, together — and you might build a relationship where freshness lives comfortably inside the security.",
    work: "When it comes to deadlines and quality, nobody touches you — the ironclad pair everyone trusts with anything. Your planning, procedures, and double-checks are reliability incarnate, but you share one weak spot: situations with no precedent, where two cautious people means two slow first steps toward change. Still, the steadiness to run operations people never have to worry about is value only this pair can offer, so the ideal shape is defense as your foundation with small offensive plays on top. Build one 'try a new approach' slot into the plan each quarter — pre-scheduled, just one — and you might find yourselves evolving without ever breaking stride.",
  },
  SJ_SP: {
    name: "Anchor & Sail Duo", hook: "Stability and excitement, in just the right ratio",
    personality: "You look like polar opposites, but you actually share something fundamental: you both trust the reality in front of you over abstract theory. The difference is how you move — the Guardian lines up the steps first, the Explorer is already out the door. The Guardian gets whiplash from sudden invitations; the Explorer gets tired of waiting on all that caution. But the Explorer expands the Guardian's world, and the Guardian can gently rein in the Explorer's runaway moments — the makings of a legendary duo are all here. Try calling your partner's style 'a different way' instead of 'the wrong way,' and you might find the differences becoming genuinely fun.",
    love: "This is the classic case of falling for what you don't have: the Guardian feels a fresh breeze in the Explorer's freedom, and the Explorer stretches out safely in the Guardian's steadiness. The friction points are the rhythms of daily life — punctuality, money habits — where the tidy-minded Guardian and the hate-being-tied-down Explorer end up in a tug of war. But tasting both thrill and security inside a single relationship? That's a luxury only this combination gets. Take turns playing date planner and invite each other into your respective worlds, and the differences themselves might turn straight into the fun.",
    work: "The Guardian takes planning and management, the Explorer takes field response and surprise fires — a working pair with both defense and offense covered. The by-the-book Guardian and the read-the-room Explorer will butt heads over methods, but the Explorer's quick thinking saves the team when the plan falls apart, and the Guardian's management is the very foundation that lets the Explorer move freely. When handing over a rule, attach the 'here's why it matters' — and grant discretion for exceptions in advance. That one agreement might be all it takes to become the team everyone calls when things get real.",
  },
  SP_SP: {
    name: "Nonstop Duo", hook: "Two people who live by 'no time like the present'",
    personality: "Two geniuses at acting on impulse and squeezing the joy out of this exact moment — boredom simply doesn't exist in this combination. You're the ultimate playmates, matched in vibe and quick on your feet, but you're both easily bored and mood-driven, so when your interests drift apart, so do your afternoons — naturally, without anyone deciding it. Even so, the easy grace of never blaming each other for being free is this pair's real treasure. Pick just one thing — 'this, we always do together' — and you might stay connected without either of you giving up an ounce of freedom.",
    love: "Never a dull moment — this is the romance where every day feels like an event. The energy is off the charts, but neither of you is built for planning or management, so the practical conversations — money, what life actually looks like — keep getting postponed, and you share the same quick-to-ignite, quick-to-cool streak. Still, as a partner for sharing fun at full throttle, there is no better match on the board. Keep the fun exactly as reckless as it is now, and just set one day a month for the reality talk — that might be all it takes to keep this good thing running for years.",
    work: "For pure speed and field instinct, nobody outdoes this pair — sudden crises and the beautiful chaos of a launch are where you thrive. On the other hand, long-term planning, paperwork, and patient upkeep get postponed by both of you, and if you keep surviving on burst power alone, burnout starts circling. Short, decisive breakthroughs are this duo's weapon, so the key is designing things so your weak areas never drain you. Hand the administrative tasks boldly over to a tool or to someone who actually enjoys them, and you might find yourselves free to focus on your strengths — and deliver.",
  },
};
function getRelationshipTable() {
  return LANG === 'en' ? RELATIONSHIP_TABLE_EN : RELATIONSHIP_TABLE;
}
function relationshipFor(myType, otherType) {
  const g1 = TEMPERAMENT[myType] || 'SJ';
  const g2 = TEMPERAMENT[otherType] || 'SJ';
  const key = pairKey(g1, g2);
  const table = getRelationshipTable();
  if (table[key]) return table[key];
  // EN未翻訳の組み合わせはJA版にフォールバックしつつ、翻訳待ちであることを明示するフラグを立てる
  return { ...RELATIONSHIP_TABLE[key], isPendingTranslation: LANG === 'en' };
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
  if (LANG === 'en') {
    if (score >= 95) return 'Soulmate-Level Match';
    if (score >= 91) return 'Excellent Match';
    if (score >= 87) return 'In Sync';
    if (score >= 83) return 'Finding Your Groove';
    return 'Opposites Worth Exploring';
  }
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
const GUESS_QUESTIONS_EN = [
  { axis: 'EI', text: 'In a big group, are they more the type who…', a: { letter: 'E', text: 'Jumps right into the center of things' }, b: { letter: 'I', text: 'Ends up quietly talking with one person off to the side' } },
  { axis: 'SN', text: 'When you talk, they tend to bring up more…', a: { letter: 'S', text: 'Concrete facts and real experiences' }, b: { letter: 'N', text: 'Abstract ideas and possibilities' } },
  { axis: 'TF', text: 'When you go to them for advice, they usually…', a: { letter: 'T', text: 'Break it down logically first' }, b: { letter: 'F', text: 'Meet your feelings first' } },
  { axis: 'JP', text: 'When it comes to plans and commitments, they…', a: { letter: 'J', text: 'Like to lock things in early' }, b: { letter: 'P', text: 'Keep it flexible until the last minute' } },
];
function getGuessQuestions() { return LANG === 'en' ? GUESS_QUESTIONS_EN : GUESS_QUESTIONS; }

// ===== 状態・DOM =====
const screens = {
  start: document.getElementById('screen-start'),
  guess: document.getElementById('screen-guess'),
  result: document.getElementById('screen-result'),
};
// 画面遷移のたびに新しい画面の見出し(相当の要素)へフォーカスを移し、スクリーンリーダー・
// キーボードユーザーに遷移が起きたことを伝える(MBTI診断のfocusScreenHeading()と同じ方式)。
// 直前にwindow.scrollTo(0,0)で明示的にスクロール済みのため、focus側はpreventScroll:trueにして二重スクロールを防ぐ。
function focusScreenHeading(name) {
  const headingIds = { start: 'start-title', guess: 'guess-title', result: 'score-hero' };
  const el = document.getElementById(headingIds[name]);
  if (!el) return;
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo(0, 0);
  focusScreenHeading(name);
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
// 2026-09-05改訂: 4問を最初から縦に全展開表示すると誤タップが起きやすいため、
// 1問ずつ表示+プログレスバーに変更(MBTI診断のチャット形式クイズと同様の考え方)。
let guessQuizIndex = 0;
function startGuessQuiz() {
  trackEvent('guess_quiz_start');
  state.guessAnswers = {};
  guessQuizIndex = 0;
  renderGuessQuestion();
  showScreen('guess');
}
function updateGuessProgress() {
  const questions = getGuessQuestions();
  const fill = document.getElementById('guess-progress-fill');
  const text = document.getElementById('guess-progress-text');
  const pct = Math.round((guessQuizIndex / questions.length) * 100);
  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `${guessQuizIndex + 1} / ${questions.length}`;
}
function renderGuessQuestion() {
  const questions = getGuessQuestions();
  const q = questions[guessQuizIndex];
  const wrap = document.getElementById('guess-questions');
  wrap.innerHTML = `
    <div class="guess-question">
      <div class="q-num">Q${guessQuizIndex + 1} / ${questions.length}</div>
      <div class="q-text">${q.text}</div>
      <div class="guess-options">
        <button type="button" class="option-btn" data-axis="${q.axis}" data-letter="${q.a.letter}">${q.a.text}</button>
        <button type="button" class="option-btn" data-axis="${q.axis}" data-letter="${q.b.letter}">${q.b.text}</button>
      </div>
    </div>
  `;
  updateGuessProgress();
  wrap.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.option-btn').forEach(b => { b.classList.toggle('selected', b === btn); b.disabled = true; });
      state.guessAnswers[q.axis] = btn.dataset.letter;
      setTimeout(() => {
        if (guessQuizIndex < questions.length - 1) {
          guessQuizIndex++;
          renderGuessQuestion();
        } else {
          state.guessedPersonality = AXIS_ORDER.map(a => state.guessAnswers[a]).join('');
          showResult();
        }
      }, 350);
    });
  });
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

// relationshipFor()・scoreTier()はどちらもモジュール変数LANGを見て言語別のテキストを返すため、
// 一度computeCategoryResult()した結果(lastResultData.results)は特定言語の値を抱えたまま固定される。
// 言語切替後にrenderだけ呼び直しても古い言語の相性文章が残ってしまうバグを防ぐため、
// showResult()と「言語切替時の再計算」の両方からこの関数を呼ぶ形に共通化する。
function computeResults(myTypes, otherTypes, isGuess) {
  const results = {};
  results.personality = computeCategoryResult('personality', myTypes.personality, otherTypes.personality);
  if (!isGuess) {
    results.love = computeCategoryResult('love', myTypes.love, otherTypes.love);
    results.work = computeCategoryResult('work', myTypes.work, otherTypes.work);
  }
  return results;
}

function showResult() {
  const myTypes = decodeTriple(state.me);
  const isGuess = !state.you;
  const otherTypes = state.you ? decodeTriple(state.you) : { personality: state.guessedPersonality, love: null, work: null };

  const results = computeResults(myTypes, otherTypes, isGuess);

  lastResultData = { myTypes, otherTypes, isGuess, results };
  renderScoreHero(lastResultData);
  renderResultCards(lastResultData);
  renderCardPreview(lastResultData);
  showScreen('result');
}

function renderScoreHero(data) {
  const t = UI_TEXT[LANG];
  const typeMaps = getTypeMaps();
  const hero = document.getElementById('score-hero');
  const main = data.results.personality;
  const avgScore = Object.values(data.results).reduce((s, r) => s + r.score, 0) / Object.keys(data.results).length;
  hero.innerHTML = `
    <div class="vs-row">
      <div class="vs-person">
        <img class="vs-avatar" src="img/animals/thumb/${data.myTypes.personality}.jpg" alt="" width="84" height="84">
        <div class="vs-name">${typeMaps.personality[data.myTypes.personality][0]} ${t.youLabel}</div>
      </div>
      <div class="vs-mark">×</div>
      <div class="vs-person">
        <img class="vs-avatar" src="img/animals/thumb/${data.otherTypes.personality}.jpg" alt="" width="84" height="84">
        <div class="vs-name">${typeMaps.personality[data.otherTypes.personality][0]} ${t.otherLabel}${data.isGuess ? t.guessSuffix : ''}</div>
      </div>
    </div>
    <div class="relation-name">${main.relation.name}</div>
    <div><span class="score-num">${Math.round(avgScore)}</span><span class="score-suffix">${t.scoreSuffix}</span></div>
    <div class="score-tier">${scoreTier(avgScore)}</div>
    <p class="score-hook">${main.relation.hook}</p>
  `;
}

function renderResultCards(data) {
  const t = UI_TEXT[LANG];
  const typeMaps = getTypeMaps();
  const categoryMeta = getCategoryMeta();
  const wrap = document.getElementById('result-cards');
  wrap.innerHTML = '';

  ['personality', 'love', 'work'].forEach((cat, i) => {
    const meta = categoryMeta[cat];
    const r = data.results[cat];

    if (!r) {
      const locked = document.createElement('div');
      locked.className = 'locked-card';
      locked.innerHTML = `
        <div class="lock-emoji">🔒</div>
        <span class="badge lock-free-badge">${t.lockedFreeBadge}</span>
        <p>${t.lockedText(meta)}</p>
        <button type="button" class="btn-secondary btn-invite">${t.lockedCta}</button>
      `;
      locked.querySelector('.btn-invite').addEventListener('click', (e) => inviteToQuiz(e.currentTarget));
      wrap.appendChild(locked);
      return;
    }

    const myInfo = typeMaps[cat][r.myCode];
    const otherInfo = typeMaps[cat][r.otherCode];
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.setProperty('--accent', meta.color);
    card.style.animationDelay = `${i * 0.12}s`;
    card.innerHTML = `
      <div class="cat-name">${meta.icon} ${meta.label}${t.catNameSuffix}</div>
      <div class="type-name">${r.relation.name}</div>
      <div class="cat-score"><span class="num">${r.score}</span><span class="tier">${t.scoreTierSep}${r.tier}</span></div>
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
      ${r.relation.isPendingTranslation ? `<p class="lang-note" style="display:block;">${t.pendingTranslationNote}</p>` : ''}
      <div class="desc">${r.relation[cat]}</div>
      <div class="axis-chips">
        ${r.breakdown.map(b => `<span class="axis-chip ${b.same ? 'match' : ''}">${b.label} ${b.same ? t.matchLabel : t.diffLabel}</span>`).join('')}
      </div>
    `;
    wrap.appendChild(card);
  });

  if (data.isGuess) {
    const note = document.createElement('p');
    note.className = 'guess-disclaimer';
    note.textContent = t.guessDisclaimer;
    wrap.appendChild(note);
  }
}

// ===== 結果URL・シェア =====
function resultUrl() {
  if (!lastResultData) return location.href;
  const base = `${location.origin}${location.pathname}?me=${lastResultData.myTypes ? state.me : ''}`;
  if (lastResultData.isGuess) {
    return `${base}&you=${lastResultData.otherTypes.personality}&guess=1&lang=${LANG}`;
  }
  return `${base}&you=${state.you}&lang=${LANG}`;
}

function copyResultUrl() {
  if (!lastResultData) return;
  const t = UI_TEXT[LANG];
  const btn = document.getElementById('btn-copy-url');
  navigator.clipboard.writeText(resultUrl()).then(() => {
    const original = btn.textContent;
    btn.textContent = t.copiedLabel;
    setTimeout(() => { btn.textContent = original; }, 2000);
  });
  trackEvent('share', { method: 'copy_url' });
}

// ===== お相手を診断に誘う(2026-09-05追加) =====
// 招待リンク(?invite=自分のコード)をコピーし、お相手が診断サイトで自分のコードを取得後に
// このサイトへ戻れば「お相手の結果コード」欄に招待者(自分)のコードが自動で入るようにする。
// 単なる外部リンクだった「誘う」CTAを、実際に相性診断が完了しやすくなる導線に変える。
function inviteUrl() {
  return `${location.origin}${location.pathname}?invite=${encodeURIComponent(state.me || '')}&lang=${LANG}`;
}
function inviteToQuiz(btn) {
  const t = UI_TEXT[LANG];
  trackEvent('invite_copy');
  const original = btn.textContent;
  navigator.clipboard.writeText(inviteUrl()).then(() => {
    btn.textContent = t.inviteCopiedLabel;
    setTimeout(() => { btn.textContent = original; }, 2500);
  }).catch(() => { /* クリップボード権限が無い環境でも診断導線自体は続行する */ });
  window.open('https://deskanimals114510-ai.github.io/personality-type-quiz/', '_blank', 'noopener,noreferrer');
}

function shareText() {
  const t = UI_TEXT[LANG];
  const main = lastResultData.results.personality;
  const avgScore = Math.round(Object.values(lastResultData.results).reduce((s, r) => s + r.score, 0) / Object.keys(lastResultData.results).length);
  return t.shareText(main.relation.name, avgScore);
}
function shareResult() {
  if (!lastResultData) return;
  const text = shareText();
  const url = encodeURIComponent(resultUrl());
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank', 'noopener,noreferrer');
  trackEvent('share', { method: 'x' });
}
function shareResultLine() {
  if (!lastResultData) return;
  const text = shareText();
  const url = encodeURIComponent(resultUrl());
  window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  trackEvent('share', { method: 'line' });
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
  const t = UI_TEXT[LANG];
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
  ctx.fillText(t.cardEyebrow, cx, 70);

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
  ctx.fillText(t.scoreSuffix, cx + numWidth + 8, y + 24);
  y += 60;

  ctx.font = "700 22px 'Zen Maru Gothic', sans-serif";
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.fillText(scoreTier(avgScore), cx, y);
  y += 50;

  ctx.strokeStyle = 'rgba(160,130,175,0.28)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(rightMax, y); ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 25px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, cx, y + 44);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 18px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, cx, y + 78);
}

function drawCompatCardStory(ctx, imgMe, imgYou, data) {
  const t = UI_TEXT[LANG];
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
  ctx.fillText(t.cardEyebrow, W / 2, y);
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
  ctx.fillText(`${avgScore}${t.scoreSuffix}`, W / 2, y);
  y += 80;

  ctx.font = "700 30px 'Zen Maru Gothic', sans-serif";
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.fillText(scoreTier(avgScore), W / 2, y);
  y += 90;

  ctx.strokeStyle = 'rgba(160,130,175,0.3)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(150, y); ctx.lineTo(930, y); ctx.stroke();
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 40px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCtaStoryLine1, W / 2, y + 65);
  ctx.font = "700 30px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCtaStoryLine2, W / 2, y + 120);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 24px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, W / 2, y + 175);
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
    img.width = canvas.width;
    img.height = canvas.height;
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
    trackEvent('save_card', { mode });
  } catch (e) {
    console.error('結果カード生成に失敗しました', e);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

// ===== アクセス解析(任意) =====
// GA4の測定IDが決まったらここに設定してください(空文字の間は何も読み込みません、追加コストなし)
const GA_MEASUREMENT_ID = 'G-WJX05F8Z8B';
// ローカル開発サーバー(_devserver.ps1)からのアクセスを除外するガード。
// これがないと動作確認のたびに本番GA4にダミーのpageview/eventが記録されてしまう(2026-08-28判明)。
const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
if (GA_MEASUREMENT_ID && !isLocalDev) {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

// 効果測定用のカスタムイベント送信(gtag未読み込み時は何もしない、計測失敗が機能を止めないよう安全に呼ぶ)
function trackEvent(name, params) {
  if (typeof gtag === 'function') gtag('event', name, params || {});
}

// ===== イベント =====
document.getElementById('btn-share').addEventListener('click', shareResult);
document.getElementById('btn-share-line').addEventListener('click', shareResultLine);
document.getElementById('btn-copy-url').addEventListener('click', copyResultUrl);
document.getElementById('btn-restart').addEventListener('click', restartQuiz);
document.getElementById('btn-save-card').addEventListener('click', () => downloadResultCard('x'));
document.getElementById('btn-save-card-story').addEventListener('click', () => downloadResultCard('story'));

// ===== JA/EN切替(2026-08-29、10組み合わせを1日5組ペースでFable翻訳中。
// 未翻訳分はgetRelationshipTable()がJA版へ自動フォールバックする) =====
function applyLangUI() {
  const t = UI_TEXT[LANG];
  document.title = t.pageTitle;
  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) metaDescEl.setAttribute('content', t.pageDescription);
  document.getElementById('start-eyebrow').textContent = t.eyebrowStart;
  document.getElementById('start-title').innerHTML = t.titleHtml;
  document.getElementById('start-lead').innerHTML = t.lead;
  document.getElementById('start-badges').innerHTML = t.badges.map(b => `<span class="badge">${b}</span>`).join('');
  document.getElementById('hub-link-text').textContent = t.hubLink;
  document.getElementById('label-me').textContent = t.labelMe;
  document.getElementById('input-me').setAttribute('placeholder', t.placeholderMe);
  document.getElementById('hint-me').innerHTML = t.hintMe;
  document.getElementById('label-you').textContent = t.labelYou;
  document.getElementById('input-you').setAttribute('placeholder', t.placeholderYou);
  document.getElementById('hint-you').textContent = t.hintYou;
  document.getElementById('code-error').textContent = t.codeError;
  document.getElementById('btn-submit-code').textContent = t.submitBtn;
  document.getElementById('guess-eyebrow').textContent = t.guessEyebrow;
  document.getElementById('guess-title').innerHTML = t.guessTitleHtml;
  document.getElementById('guess-lead').textContent = t.guessLead;
  document.getElementById('btn-share').textContent = t.shareBtn;
  document.getElementById('btn-share-line').textContent = t.lineBtn;
  document.getElementById('btn-copy-url').textContent = t.copyUrlBtn;
  document.getElementById('btn-restart').textContent = t.restartBtn;
  document.getElementById('btn-save-card').textContent = t.saveCardBtn;
  document.getElementById('btn-save-card-story').textContent = t.saveCardStoryBtn;
  document.getElementById('result-card-preview-hint').textContent = t.cardPreviewHint;
  document.getElementById('follow-label-1').textContent = t.followLabel;
  document.getElementById('follow-label-2').textContent = t.followLabel2;
  document.getElementById('footer-disclaimer').textContent = t.footerDisclaimer;
  document.documentElement.lang = LANG;
  // 結果画面が既に表示中なら、結果(relation/tier等、言語依存の値)を再計算してから再描画する。
  // render関数を呼び直すだけだとlastResultData.resultsに古い言語の相性文章が残ったままになる。
  if (lastResultData) {
    lastResultData.results = computeResults(lastResultData.myTypes, lastResultData.otherTypes, lastResultData.isGuess);
    renderScoreHero(lastResultData);
    renderResultCards(lastResultData);
    renderCardPreview(lastResultData);
  }
}
function setLang(lang) {
  LANG = lang;
  document.getElementById('btn-lang-ja').classList.toggle('active', lang === 'ja');
  document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');
  applyLangUI();
  trackEvent('lang_switch', { lang });
}
document.getElementById('btn-lang-ja').addEventListener('click', () => setLang('ja'));
document.getElementById('btn-lang-en').addEventListener('click', () => setLang('en'));

// ===== 起動時: URLパラメータ復元(共有リンク経由のアクセス) =====
// 関数・状態の宣言が全て済んだ後に実行する必要がある(lastResultData等の let 宣言より前で
// showResult() を呼ぶとTDZ(Temporal Dead Zone)エラーになるため、ファイル末尾に配置)。
(function initFromUrl() {
  const params = new URLSearchParams(location.search);
  const meParam = params.get('me');
  const youParam = params.get('you');
  const guessParam = params.get('guess');
  const langParam = params.get('lang');
  const inviteParam = params.get('invite');
  if (langParam === 'en' || langParam === 'ja') setLang(langParam);
  if (meParam) document.getElementById('input-me').value = meParam;
  if (youParam) document.getElementById('input-you').value = youParam;
  // 招待リンク(?invite=招待者のコード)経由のアクセスなら、招待者を「お相手」欄に自動入力する
  if (!youParam && inviteParam) {
    const inviteCode = extractCode(inviteParam);
    if (inviteCode) document.getElementById('input-you').value = inviteCode;
  }

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
