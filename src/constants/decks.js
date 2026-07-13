export const PRESET_DECKS = {
  greetings: {
    label: "Greetings",
    icon: "挨",
    cards: [
      ["こんにちは", "konnichiwa", "hello / good afternoon"],
      ["おはよう ございます", "ohayō gozaimasu", "good morning (polite)"],
      ["こんばんは", "konbanwa", "good evening"],
      ["さようなら", "sayōnara", "goodbye"],
      ["ありがとう ございます", "arigatō gozaimasu", "thank you (polite)"],
      ["すみません", "sumimasen", "excuse me / sorry"],
      ["はじめまして", "hajimemashite", "nice to meet you"],
      ["おげんき ですか", "o-genki desu ka", "how are you?"],
      ["はい", "hai", "yes"],
      ["いいえ", "iie", "no"],
    ],
  },
  food: {
    label: "Food",
    icon: "食",
    cards: [
      ["ごはん", "gohan", "rice / meal"],
      ["みず", "mizu", "water"],
      ["おいしい", "oishii", "delicious"],
      ["レストラン", "resutoran", "restaurant"],
      ["メニュー", "menyū", "menu"],
      ["おかいけい", "o-kaikei", "the check / bill"],
      ["すきです", "suki desu", "I like it"],
      ["たべます", "tabemasu", "to eat"],
      ["のみます", "nomimasu", "to drink"],
      ["やさい", "yasai", "vegetables"],
    ],
  },
  travel: {
    label: "Travel",
    icon: "旅",
    cards: [
      ["えき", "eki", "station"],
      ["くうこう", "kūkō", "airport"],
      ["ホテル", "hoteru", "hotel"],
      ["きっぷ", "kippu", "ticket"],
      ["どこですか", "doko desu ka", "where is it?"],
      ["みぎ", "migi", "right"],
      ["ひだり", "hidari", "left"],
      ["タクシー", "takushī", "taxi"],
      ["でんしゃ", "densha", "train"],
      ["パスポート", "pasupōto", "passport"],
    ],
  },
  numbers: {
    label: "Numbers",
    icon: "数",
    cards: [
      ["いち", "ichi", "one"],
      ["に", "ni", "two"],
      ["さん", "san", "three"],
      ["よん", "yon", "four"],
      ["ご", "go", "five"],
      ["ろく", "roku", "six"],
      ["なな", "nana", "seven"],
      ["はち", "hachi", "eight"],
      ["きゅう", "kyū", "nine"],
      ["じゅう", "jū", "ten"],
    ],
  },
}

export const SCENARIOS = [
  { id: "coffee", label: "Order coffee", jp: "喫茶店" },
  { id: "meet", label: "Meet someone", jp: "自己紹介" },
  { id: "airport", label: "At the airport", jp: "空港" },
  { id: "restaurant", label: "At a restaurant", jp: "レストラン" },
  { id: "directions", label: "Asking directions", jp: "道案内" },
  { id: "free", label: "Free chat", jp: "自由会話" },
]

export const TABS = [
  { id: "chat", label: "Chat", jp: "会話" },
  { id: "lessons", label: "Lessons", jp: "レッスン" },
  { id: "alphabet", label: "Alphabet", jp: "文字" },
  { id: "vocab", label: "Vocab", jp: "単語" },
  { id: "dictionary", label: "Dictionary", jp: "辞書" },
  { id: "translate", label: "Translate", jp: "翻訳" },
]
