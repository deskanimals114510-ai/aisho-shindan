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
        <img class="vs-avatar" src="img/animals/thumb/${data.myTypes.personality}.jpg" alt="" width="84" height="84">
        <div class="vs-name">${TYPE_MAPS.personality[data.myTypes.personality][0]} あなた</div>
      </div>
      <div class="vs-mark">×</div>
      <div class="vs-person">
        <img class="vs-avatar" src="img/animals/thumb/${data.otherTypes.personality}.jpg" alt="" width="84" height="84">
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
      <div class="desc">${r.relation[cat]}</div>
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

function shareText() {
  const main = lastResultData.results.personality;
  const avgScore = Math.round(Object.values(lastResultData.results).reduce((s, r) => s + r.score, 0) / Object.keys(lastResultData.results).length);
  return `相性診断やってみた!\n私とお相手は「${main.relation.name}」・相性${avgScore}点でした\nお相手のコードがなくても4問で診断できるよ→\n#相性診断 #MBTI診断`;
}
function shareResult() {
  if (!lastResultData) return;
  const text = shareText();
  const url = encodeURIComponent(resultUrl());
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank', 'noopener,noreferrer');
}
function shareResultLine() {
  if (!lastResultData) return;
  const text = shareText();
  const url = encodeURIComponent(resultUrl());
  window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
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
