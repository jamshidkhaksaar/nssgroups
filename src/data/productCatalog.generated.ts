import type { CatalogProduct } from './productCatalogTypes'

export const PRODUCT_CATALOG = [
  {
    "sku": "UZ-001",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Wheat Grade 3",
      "fa": "گندم درجه ۳",
      "ps": "د درېیمې درجې غنم",
      "ru": "Пшеница 3-го сорта",
      "uz": "3-navli bug‘doy",
      "ar": "القمح الصف 3",
      "zh": "小麦3级"
    },
    "specification": {
      "en": "Grade 3, bulk",
      "fa": "درجه 3، عمده",
      "ps": "درېیمه درجه، په عمده ډول",
      "ru": "3-й сорт, насыпью",
      "uz": "3-nav, quyma",
      "ar": "الصف 3، السائبة",
      "zh": "3 级，散装"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-002",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Premium Wheat Flour",
      "fa": "آرد گندم درجه اول",
      "ps": "پریمیم د غنمو اوړه",
      "ru": "Пшеничная мука премиум-класса",
      "uz": "Premium bug'doy uni",
      "ar": "دقيق القمح الفاخر",
      "zh": "优质小麦粉"
    },
    "specification": {
      "en": "50 kg bags",
      "fa": "کیسه های 50 کیلویی",
      "ps": "50 کیلو ګرامه کڅوړه",
      "ru": "мешки по 50 кг.",
      "uz": "50 kg sumkalar",
      "ar": "أكياس 50 كجم",
      "zh": "50公斤袋装"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-003",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Standard Wheat Flour",
      "fa": "آرد گندم درجه دوم",
      "ps": "د غنمو معیاري اوړه",
      "ru": "Стандартная пшеничная мука",
      "uz": "Standart bug'doy uni",
      "ar": "دقيق القمح القياسي",
      "zh": "标准小麦粉"
    },
    "specification": {
      "en": "50 kg bags",
      "fa": "کیسه های 50 کیلویی",
      "ps": "50 کیلو ګرامه کڅوړه",
      "ru": "мешки по 50 кг.",
      "uz": "50 kg sumkalar",
      "ar": "أكياس 50 كجم",
      "zh": "50公斤袋装"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-004",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Semolina",
      "fa": "سمولینا",
      "ps": "سیمالټ",
      "ru": "Манная крупа",
      "uz": "Semolina",
      "ar": "سميد",
      "zh": "粗面粉"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-005",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Barley",
      "fa": "جو",
      "ps": "وربشی",
      "ru": "Ячмень",
      "uz": "Arpa",
      "ar": "الشعير",
      "zh": "大麦"
    },
    "specification": {
      "en": "Feed/food grade",
      "fa": "درجه خوراک/غذا",
      "ps": "د خوړو / د خوړو درجه",
      "ru": "Кормовой/пищевой класс",
      "uz": "Ozuqa/oziq-ovqat darajasi",
      "ar": "تغذية/الغذاء الصف",
      "zh": "饲料/食品级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-006",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Yellow Corn",
      "fa": "ذرت زرد",
      "ps": "زرد جوار",
      "ru": "Желтая кукуруза",
      "uz": "Sariq makkajo'xori",
      "ar": "الذرة الصفراء",
      "zh": "黄玉米"
    },
    "specification": {
      "en": "Feed grade",
      "fa": "درجه خوراک",
      "ps": "د تغذیې درجه",
      "ru": "Кормовой сорт",
      "uz": "Oziqlanish darajasi",
      "ar": "درجة التغذية",
      "zh": "饲料级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-007",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "White Corn",
      "fa": "ذرت سفید",
      "ps": "سپینه جوار",
      "ru": "Белая кукуруза",
      "uz": "Oq makkajo'xori",
      "ar": "الذرة البيضاء",
      "zh": "白玉米"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-008",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Long Grain Rice",
      "fa": "برنج دانه بلند",
      "ps": "اوږده غلې دانې",
      "ru": "Длиннозерный рис",
      "uz": "Uzun donli guruch",
      "ar": "أرز حبة طويلة",
      "zh": "长粒米"
    },
    "specification": {
      "en": "5% broken",
      "fa": "5 درصد شکسته",
      "ps": "5٪ مات شوی",
      "ru": "5% сломано",
      "uz": "5% buzilgan",
      "ar": "5% مكسورة",
      "zh": "5% 破损"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-009",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Medium Grain Rice",
      "fa": "برنج متوسط",
      "ps": "منځنۍ غلې دانې",
      "ru": "Среднезерновой рис",
      "uz": "O'rta donli guruch",
      "ar": "أرز حبة متوسطة",
      "zh": "中粒米"
    },
    "specification": {
      "en": "Standard grade",
      "fa": "درجه استاندارد",
      "ps": "معیاري درجه",
      "ru": "Стандартный класс",
      "uz": "Standart daraja",
      "ar": "الصف القياسي",
      "zh": "标准级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-010",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Broken Rice",
      "fa": "برنج شکسته",
      "ps": "مات شوي وريجې",
      "ru": "Сломанный рис",
      "uz": "Buzilgan guruch",
      "ar": "الأرز المكسور",
      "zh": "碎米"
    },
    "specification": {
      "en": "Food/feed",
      "fa": "غذا/خوراک",
      "ps": "خواړه / خواړه",
      "ru": "Еда/корм",
      "uz": "Oziq-ovqat / ozuqa",
      "ar": "الغذاء / الأعلاف",
      "zh": "食品/饲料"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-011",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Bulgur Wheat",
      "fa": "بلغور گندم",
      "ps": "بلګور غنم",
      "ru": "Булгур Пшеничный",
      "uz": "Bulgur bug'doyi",
      "ar": "البرغل",
      "zh": "干小麦"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-012",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Barley Groats",
      "fa": "بلغور جو",
      "ps": "د وربشی غلو",
      "ru": "Ячменная крупа",
      "uz": "Arpa yormalari",
      "ar": "جريش الشعير",
      "zh": "大麦碎粒"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-013",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Oats",
      "fa": "جو دوسر",
      "ps": "اوښ",
      "ru": "Овес",
      "uz": "Yulaf",
      "ar": "الشوفان",
      "zh": "燕麦"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-014",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Buckwheat",
      "fa": "گندم سیاه",
      "ps": "غوښه",
      "ru": "Гречка",
      "uz": "Karabuğday",
      "ar": "الحنطة السوداء",
      "zh": "荞麦"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-015",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Millet",
      "fa": "ارزن",
      "ps": "جوار",
      "ru": "Просо",
      "uz": "Tariq",
      "ar": "الدخن",
      "zh": "粟"
    },
    "specification": {
      "en": "Food/feed grade",
      "fa": "درجه غذا/خوراک",
      "ps": "د خوړو / تغذیه درجه",
      "ru": "Пищевой/кормовой сорт",
      "uz": "Oziq-ovqat / ozuqa darajasi",
      "ar": "درجة الغذاء/العلف",
      "zh": "食品/饲料级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-016",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Wheat Starch",
      "fa": "نشاسته گندم",
      "ps": "د غنمو نشایسته",
      "ru": "Пшеничный крахмал",
      "uz": "Bug'doy kraxmal",
      "ar": "نشا القمح",
      "zh": "小麦淀粉"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-017",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Corn Starch",
      "fa": "نشاسته ذرت",
      "ps": "د جوارو نشایسته",
      "ru": "Кукурузный крахмал",
      "uz": "Makkajo'xori kraxmal",
      "ar": "نشا الذرة",
      "zh": "玉米淀粉"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-018",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Wheat Bran",
      "fa": "سبوس گندم",
      "ps": "د غنمو برن",
      "ru": "Пшеничные отруби",
      "uz": "Bug'doy kepagi",
      "ar": "نخالة القمح",
      "zh": "麦麸"
    },
    "specification": {
      "en": "Feed grade",
      "fa": "درجه خوراک",
      "ps": "د تغذیې درجه",
      "ru": "Кормовой сорт",
      "uz": "Oziqlanish darajasi",
      "ar": "درجة التغذية",
      "zh": "饲料级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-019",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Poultry Feed",
      "fa": "خوراک آماده مرغ",
      "ps": "د چرګانو تغذیه",
      "ru": "Корм для птицы",
      "uz": "Parranda yemi",
      "ar": "أعلاف الدواجن",
      "zh": "家禽饲料"
    },
    "specification": {
      "en": "Starter/grower",
      "fa": "شروع کننده / رشد دهنده",
      "ps": "پیل کونکی / کرونکی",
      "ru": "Стартер/производитель",
      "uz": "Boshlovchi / yetishtiruvchi",
      "ar": "المبتدئ/المزارع",
      "zh": "发酵剂/种植者"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-020",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Cattle Feed",
      "fa": "خوراک آماده گاو",
      "ps": "د غواګانو خواړه",
      "ru": "Корм для скота",
      "uz": "Qoramol yemi",
      "ar": "أعلاف الماشية",
      "zh": "牛饲料"
    },
    "specification": {
      "en": "Pellet/mash",
      "fa": "گلوله / پوره",
      "ps": "ګولۍ/ماش",
      "ru": "Пеллеты/маш",
      "uz": "Pellet / mash",
      "ar": "بيليه / الهريس",
      "zh": "颗粒/糊状"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-021",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Refined Cottonseed Oil",
      "fa": "روغن پنبه‌دانه تصفیه‌شده",
      "ps": "د پنبې اصلاح شوي غوړ",
      "ru": "Рафинированное хлопковое масло",
      "uz": "Qayta qilingan paxta yog'i",
      "ar": "زيت بذرة القطن المكرر",
      "zh": "精炼棉籽油"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-022",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Refined Sunflower Oil",
      "fa": "روغن آفتابگردان تصفیه‌شده",
      "ps": "د لمر ګل غوړي",
      "ru": "Рафинированное подсолнечное масло",
      "uz": "Qayta qilingan kungaboqar yog'i",
      "ar": "زيت عباد الشمس المكرر",
      "zh": "精炼葵花籽油"
    },
    "specification": {
      "en": "Bulk or bottled",
      "fa": "فله یا بطری",
      "ps": "غټ یا بوتل",
      "ru": "Насыпью или в бутылках",
      "uz": "Ommaviy yoki shishaga solingan",
      "ar": "السائبة أو المعبأة في زجاجات",
      "zh": "散装或瓶装"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-023",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Corn Oil",
      "fa": "روغن ذرت",
      "ps": "د جوارو غوړي",
      "ru": "Кукурузное масло",
      "uz": "Makkajo'xori yog'i",
      "ar": "زيت الذرة",
      "zh": "玉米油"
    },
    "specification": {
      "en": "Refined",
      "fa": "تصفیه شده",
      "ps": "اصلاح شوی",
      "ru": "изысканный",
      "uz": "Tozalangan",
      "ar": "المكرر",
      "zh": "精制"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-024",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Soybean Oil",
      "fa": "روغن سویا",
      "ps": "د سویابین غوړ",
      "ru": "Соевое масло",
      "uz": "Soya yog'i",
      "ar": "زيت فول الصويا",
      "zh": "豆油"
    },
    "specification": {
      "en": "Refined",
      "fa": "تصفیه شده",
      "ps": "اصلاح شوی",
      "ru": "изысканный",
      "uz": "Tozalangan",
      "ar": "المكرر",
      "zh": "精制"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-025",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Sesame Oil",
      "fa": "روغن کنجد",
      "ps": "د سیسم غوړ",
      "ru": "Кунжутное масло",
      "uz": "Susan yog'i",
      "ar": "زيت السمسم",
      "zh": "香油"
    },
    "specification": {
      "en": "Cold/expeller pressed",
      "fa": "فشار سرد/اخراج کننده",
      "ps": "سړه / اخراج کونکی فشار",
      "ru": "Холодное/экспеллерное прессование",
      "uz": "Sovuq/ekspeller bosilgan",
      "ar": "معصور على البارد/الطارد",
      "zh": "冷压/压榨"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-026",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "White Sugar",
      "fa": "شکر سفید",
      "ps": "سپینه بوره",
      "ru": "Белый сахар",
      "uz": "Oq shakar",
      "ar": "السكر الأبيض",
      "zh": "白砂糖"
    },
    "specification": {
      "en": "ICUMSA standard",
      "fa": "استاندارد ICUMSA",
      "ps": "ICUMSA معیاري",
      "ru": "Стандарт ICUMSA",
      "uz": "ICUMSA standarti",
      "ar": "معيار إيكومسا",
      "zh": "国际计算机管理协会标准"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-027",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Brown Sugar",
      "fa": "شکر قهوه‌ای",
      "ps": "نسواري شکر",
      "ru": "Коричневый сахар",
      "uz": "Jigarrang shakar",
      "ar": "السكر البني",
      "zh": "红糖"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-028",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Chickpeas",
      "fa": "نخود",
      "ps": "مرغۍ",
      "ru": "Нут",
      "uz": "No'xat",
      "ar": "الحمص",
      "zh": "鹰嘴豆"
    },
    "specification": {
      "en": "7-9 mm",
      "fa": "7-9 میلی متر",
      "ps": "7-9 ملي متره",
      "ru": "7-9 мм",
      "uz": "7-9 mm",
      "ar": "7-9 ملم",
      "zh": "7-9毫米"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-029",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "White Beans",
      "fa": "لوبیا سفید",
      "ps": "سپين لوبيا",
      "ru": "Белая фасоль",
      "uz": "Oq loviya",
      "ar": "الفاصوليا البيضاء",
      "zh": "白豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-030",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Red Kidney Beans",
      "fa": "لوبیا سرخ",
      "ps": "سور پښتورګي",
      "ru": "Красная фасоль",
      "uz": "Qizil loviya",
      "ar": "الفاصوليا الحمراء",
      "zh": "红芸豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-031",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Mung Beans",
      "fa": "ماش",
      "ps": "د منګ لوبیا",
      "ru": "Бобы мунг",
      "uz": "Mung loviya",
      "ar": "مونج الفول",
      "zh": "绿豆"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-032",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Red Lentils",
      "fa": "عدس سرخ",
      "ps": "سور دال",
      "ru": "Красная чечевица",
      "uz": "Qizil yasmiq",
      "ar": "العدس الأحمر",
      "zh": "红扁豆"
    },
    "specification": {
      "en": "Split",
      "fa": "تقسیم کنید",
      "ps": "ویشل",
      "ru": "Расколоть",
      "uz": "Split",
      "ar": "ينقسم",
      "zh": "分裂"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-033",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Green Lentils",
      "fa": "عدس سبز",
      "ps": "شنه دال",
      "ru": "Зеленая чечевица",
      "uz": "Yashil yasmiq",
      "ar": "العدس الأخضر",
      "zh": "绿扁豆"
    },
    "specification": {
      "en": "Whole",
      "fa": "کل",
      "ps": "ټول",
      "ru": "Весь",
      "uz": "Butun",
      "ar": "جميع",
      "zh": "所有的"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-034",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Dried Green Peas",
      "fa": "نخود سبز خشک",
      "ps": "وچې شنه نخود",
      "ru": "Сушеный зеленый горошек",
      "uz": "Quritilgan yashil no'xat",
      "ar": "البازلاء الخضراء المجففة",
      "zh": "干青豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-035",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Soybeans",
      "fa": "سویا دانه",
      "ps": "سویابین",
      "ru": "Соевые бобы",
      "uz": "Soya loviyalari",
      "ar": "فول الصويا",
      "zh": "大豆"
    },
    "specification": {
      "en": "Feed/food",
      "fa": "خوراک/غذا",
      "ps": "خواړه / خواړه",
      "ru": "Корм/еда",
      "uz": "Oziq-ovqat / ovqat",
      "ar": "تغذية / طعام",
      "zh": "饲料/食品"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-036",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Soybean Meal",
      "fa": "کنجاله سویا",
      "ps": "د سویابین خواړه",
      "ru": "Соевый шрот",
      "uz": "Soya ovqati",
      "ar": "وجبة فول الصويا",
      "zh": "豆粕"
    },
    "specification": {
      "en": "44-48% protein",
      "fa": "44-48 درصد پروتئین",
      "ps": "44-48٪ پروټین",
      "ru": "44-48% белка",
      "uz": "44-48% protein",
      "ar": "44-48% بروتين",
      "zh": "44-48% 蛋白质"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-037",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Cottonseed Meal",
      "fa": "کنجاله پنبه‌دانه",
      "ps": "د پنبې تخم خواړه",
      "ru": "Хлопковый шрот",
      "uz": "Paxta ovqati",
      "ar": "وجبة بذور القطن",
      "zh": "棉籽粕"
    },
    "specification": {
      "en": "Feed grade",
      "fa": "درجه خوراک",
      "ps": "د تغذیې درجه",
      "ru": "Кормовой сорт",
      "uz": "Oziqlanish darajasi",
      "ar": "درجة التغذية",
      "zh": "饲料级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-038",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Sunflower Seeds",
      "fa": "تخم آفتابگردان",
      "ps": "د لمر ګل تخم",
      "ru": "Семена подсолнечника",
      "uz": "Ayçiçek urug'lari",
      "ar": "بذور عباد الشمس",
      "zh": "葵花籽"
    },
    "specification": {
      "en": "Confectionery/oilseed",
      "fa": "شیرینی/دانه روغنی",
      "ps": "کنفیکشنري/تیلو تخم",
      "ru": "Кондитерские изделия/масличные",
      "uz": "Qandolat mahsulotlari/moyli urug'lar",
      "ar": "الحلويات / البذور الزيتية",
      "zh": "糖果/油籽"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-039",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Pumpkin Seeds",
      "fa": "تخم کدو",
      "ps": "د کدو تخم",
      "ru": "Семена тыквы",
      "uz": "Qovoq urug'lari",
      "ar": "بذور اليقطين",
      "zh": "南瓜子"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-040",
    "originCountry": "UZ",
    "categoryId": "food-staples",
    "name": {
      "en": "Flax Seeds",
      "fa": "تخم کتان",
      "ps": "د زعفرانو تخم",
      "ru": "Семена льна",
      "uz": "Zig'ir urug'lari",
      "ar": "بذور الكتان",
      "zh": "亚麻籽"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-041",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Golden Raisins",
      "fa": "کشمش طلایی",
      "ps": "طلایی ممیز",
      "ru": "Золотой изюм",
      "uz": "Oltin mayiz",
      "ar": "الزبيب الذهبي",
      "zh": "黄金葡萄干"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-042",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Black Raisins",
      "fa": "کشمش سیاه",
      "ps": "تور ممیز",
      "ru": "Черный изюм",
      "uz": "Qora mayiz",
      "ar": "الزبيب الأسود",
      "zh": "黑葡萄干"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-043",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Apricots",
      "fa": "زردآلوی خشک",
      "ps": "وچ زردالو",
      "ru": "Курага",
      "uz": "Quritilgan o'riklar",
      "ar": "المشمش المجفف",
      "zh": "杏干"
    },
    "specification": {
      "en": "Whole/pitted",
      "fa": "کامل/حفره دار",
      "ps": "بشپړ/پټ شوی",
      "ru": "Целый/без косточек",
      "uz": "Butun / chuqurchaga aylangan",
      "ar": "كامل/محفور",
      "zh": "整颗/去核"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-044",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Plums",
      "fa": "آلو خشک",
      "ps": "وچ شوي بیر",
      "ru": "сушеные сливы",
      "uz": "Quritilgan olxo'ri",
      "ar": "البرقوق المجفف",
      "zh": "梅干"
    },
    "specification": {
      "en": "Pitted",
      "fa": "حفره دار",
      "ps": "پیټ شوی",
      "ru": "без косточек",
      "uz": "Pitted",
      "ar": "حرض",
      "zh": "有坑"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-045",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Apples",
      "fa": "سیب خشک",
      "ps": "وچې مڼې",
      "ru": "Сушеные яблоки",
      "uz": "Quritilgan olma",
      "ar": "التفاح المجفف",
      "zh": "苹果干"
    },
    "specification": {
      "en": "Slices",
      "fa": "برش ها",
      "ps": "ټوټې",
      "ru": "Ломтики",
      "uz": "Dilimlar",
      "ar": "شرائح",
      "zh": "切片"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-046",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Cherries",
      "fa": "گیلاس خشک",
      "ps": "وچ چیری",
      "ru": "Сушеная вишня",
      "uz": "Quritilgan gilos",
      "ar": "الكرز المجفف",
      "zh": "樱桃干"
    },
    "specification": {
      "en": "Pitted",
      "fa": "حفره دار",
      "ps": "پیټ شوی",
      "ru": "без косточек",
      "uz": "Pitted",
      "ar": "حرض",
      "zh": "有坑"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-047",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Peanuts",
      "fa": "بادام زمینی",
      "ps": "مونګ",
      "ru": "Арахис",
      "uz": "Yong'oq",
      "ar": "الفول السوداني",
      "zh": "花生"
    },
    "specification": {
      "en": "Shelled",
      "fa": "گلوله باران شد",
      "ps": "مرمۍ شوې",
      "ru": "Обстрелянный",
      "uz": "Oqlangan",
      "ar": "قصفت",
      "zh": "带壳"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-048",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Walnuts in Shell",
      "fa": "گردو با پوست",
      "ps": "اخروټ په شیل کې",
      "ru": "Грецкие орехи в скорлупе",
      "uz": "Shelldagi yong'oqlar",
      "ar": "الجوز في شل",
      "zh": "带壳核桃"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-049",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Walnut Kernels",
      "fa": "مغز گردو",
      "ps": "د اخروټ دانه",
      "ru": "Ядра грецкого ореха",
      "uz": "Yong'oq yadrolari",
      "ar": "حبات الجوز",
      "zh": "核桃仁"
    },
    "specification": {
      "en": "Light halves/mixed",
      "fa": "نیمه سبک / مخلوط",
      "ps": "رڼا نیمه برخه / مخلوط",
      "ru": "Легкие половинки/смешанные",
      "uz": "Yengil yarmi / aralash",
      "ar": "نصفين خفيفين/مختلطين",
      "zh": "轻半/混合"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-050",
    "originCountry": "UZ",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Almonds",
      "fa": "بادام",
      "ps": "بادام",
      "ru": "Миндаль",
      "uz": "Bodom",
      "ar": "اللوز",
      "zh": "杏仁"
    },
    "specification": {
      "en": "Shelled",
      "fa": "گلوله باران شد",
      "ps": "مرمۍ شوې",
      "ru": "Обстрелянный",
      "uz": "Oqlangan",
      "ar": "قصفت",
      "zh": "带壳"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-051",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Fresh Apples",
      "fa": "سیب تازه",
      "ps": "تازه مڼې",
      "ru": "Свежие яблоки",
      "uz": "Yangi olma",
      "ar": "التفاح الطازج",
      "zh": "新鲜苹果"
    },
    "specification": {
      "en": "Class I/II",
      "fa": "کلاس I/II",
      "ps": "ټولګي I/II",
      "ru": "Класс I/II",
      "uz": "I/II sinf",
      "ar": "الدرجة الأولى/الثانية",
      "zh": "一类/二类"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-052",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Fresh Grapes",
      "fa": "انگور تازه",
      "ps": "تازه انګور",
      "ru": "Свежий виноград",
      "uz": "Yangi uzum",
      "ar": "العنب الطازج",
      "zh": "新鲜葡萄"
    },
    "specification": {
      "en": "Table grapes",
      "fa": "انگور سفره",
      "ps": "د میز انګور",
      "ru": "Столовый виноград",
      "uz": "Stol uzumlari",
      "ar": "عنب المائدة",
      "zh": "鲜食葡萄"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-053",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Fresh Cherries",
      "fa": "گیلاس تازه",
      "ps": "تازه چیری",
      "ru": "Свежая вишня",
      "uz": "Yangi gilos",
      "ar": "الكرز الطازج",
      "zh": "新鲜樱桃"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "1 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-054",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Fresh Apricots",
      "fa": "زردآلوی تازه",
      "ps": "تازه زردالو",
      "ru": "Свежие абрикосы",
      "uz": "Yangi o'riklar",
      "ar": "المشمش الطازج",
      "zh": "新鲜杏子"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "3 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-055",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Fresh Peaches",
      "fa": "هلو تازه",
      "ps": "تازه پیچ",
      "ru": "Свежие персики",
      "uz": "Yangi shaftoli",
      "ar": "الخوخ الطازج",
      "zh": "新鲜桃子"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "3 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-056",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Fresh Tomatoes",
      "fa": "گوجه فرنگی تازه",
      "ps": "تازه روميان",
      "ru": "Свежие помидоры",
      "uz": "Yangi pomidor",
      "ar": "الطماطم الطازجة",
      "zh": "新鲜西红柿"
    },
    "specification": {
      "en": "Grade A/B",
      "fa": "درجه A/B",
      "ps": "A/B درجه",
      "ru": "Оценка А/Б",
      "uz": "A/B darajasi",
      "ar": "الصف أ/ب",
      "zh": "A/B级"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-057",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Yellow Onions",
      "fa": "پیاز زرد",
      "ps": "ژیړ پیاز",
      "ru": "Желтый лук",
      "uz": "Sariq piyoz",
      "ar": "بصل أصفر",
      "zh": "黄洋葱"
    },
    "specification": {
      "en": "50 kg bags",
      "fa": "کیسه های 50 کیلویی",
      "ps": "50 کیلو ګرامه کڅوړه",
      "ru": "мешки по 50 кг.",
      "uz": "50 kg sumkalar",
      "ar": "أكياس 50 كجم",
      "zh": "50公斤袋装"
    },
    "unit": "KG",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-058",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Potatoes",
      "fa": "سیب زمینی",
      "ps": "کچالو",
      "ru": "Картофель",
      "uz": "Kartoshka",
      "ar": "البطاطس",
      "zh": "土豆"
    },
    "specification": {
      "en": "Washed/unwashed",
      "fa": "شسته/شسته نشده",
      "ps": "مینځل شوی / نه مینځل شوی",
      "ru": "Мытый/немытый",
      "uz": "Yuvilgan / yuvilmagan",
      "ar": "مغسول/غير مغسول",
      "zh": "已洗/未洗"
    },
    "unit": "KG",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-059",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Carrots",
      "fa": "هویج",
      "ps": "گاجر",
      "ru": "Морковь",
      "uz": "Sabzi",
      "ar": "الجزر",
      "zh": "胡萝卜"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-060",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "White Cabbage",
      "fa": "کلم سفید",
      "ps": "سپین کباب",
      "ru": "Белокочанная капуста",
      "uz": "Oq karam",
      "ar": "الملفوف الأبيض",
      "zh": "白菜"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-061",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Tomato Paste 28-30 Brix",
      "fa": "رب گوجه",
      "ps": "د روميانو پیسټ 28-30 Brix",
      "ru": "Томатная паста 28-30 Брикс",
      "uz": "Tomat pastasi 28-30 Brix",
      "ar": "معجون الطماطم 28-30 بريكس",
      "zh": "番茄酱 28-30 白利糖度"
    },
    "specification": {
      "en": "Aseptic/drums",
      "fa": "آسپتیک/درام",
      "ps": "اسپټیک / ډرمونه",
      "ru": "Асептика/бочки",
      "uz": "Aseptik / barabanlar",
      "ar": "العقيم / الطبول",
      "zh": "无菌/桶装"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-062",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Canned Green Peas",
      "fa": "کنسرو نخود سبز",
      "ps": "شنه نخود کین شوی",
      "ru": "Консервированный зеленый горошек",
      "uz": "Konservalangan yashil no'xat",
      "ar": "البازلاء الخضراء المعلبة",
      "zh": "青豆罐头"
    },
    "specification": {
      "en": "12-24 cans",
      "fa": "12-24 قوطی",
      "ps": "12-24 کین",
      "ru": "12-24 банки",
      "uz": "12-24 quti",
      "ar": "12-24 علبة",
      "zh": "12-24罐"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-063",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Canned Beans",
      "fa": "کنسرو لوبیا",
      "ps": "کین شوي لوبیا",
      "ru": "Консервированная фасоль",
      "uz": "Konservalangan loviya",
      "ar": "الفاصوليا المعلبة",
      "zh": "豆类罐头"
    },
    "specification": {
      "en": "12-24 cans",
      "fa": "12-24 قوطی",
      "ps": "12-24 کین",
      "ru": "12-24 банки",
      "uz": "12-24 quti",
      "ar": "12-24 علبة",
      "zh": "12-24罐"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-064",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Apricot Compote",
      "fa": "کمپوت زردآلو",
      "ps": "د زردالو کمپوټ",
      "ru": "Абрикосовый компот",
      "uz": "O'rik kompoti",
      "ar": "كومبوت المشمش",
      "zh": "杏蜜饯"
    },
    "specification": {
      "en": "Glass/tin",
      "fa": "شیشه/قلع",
      "ps": "شیشه / ټین",
      "ru": "Стекло/жесть",
      "uz": "Shisha / qalay",
      "ar": "زجاج/قصدير",
      "zh": "玻璃/锡"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-065",
    "originCountry": "UZ",
    "categoryId": "fresh-produce",
    "name": {
      "en": "Mixed Fruit Juice",
      "fa": "آبمیوه مخلوط",
      "ps": "د میوو مخلوط",
      "ru": "Смешанный фруктовый сок",
      "uz": "Aralashtirilgan meva sharbati",
      "ar": "عصير فواكه مشكلة",
      "zh": "混合果汁"
    },
    "specification": {
      "en": "1L/200ml packs",
      "fa": "بسته های 1 لیتری / 200 میلی لیتری",
      "ps": "1L/200ml کڅوړه",
      "ru": "Пакеты 1л/200мл",
      "uz": "1 l/200 ml paketlar",
      "ar": "عبوات سعة 1 لتر/200 مل",
      "zh": "1L/200ml装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-066",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "UHT Milk 1L",
      "fa": "شیر UHT یک لیتری",
      "ps": "UHT شیدې 1L",
      "ru": "Ультрапастеризованное молоко 1л",
      "uz": "UHT suti 1 l",
      "ar": "الحليب المعقم 1 لتر",
      "zh": "超高温灭菌牛奶 1L"
    },
    "specification": {
      "en": "12 x 1L",
      "fa": "12×1 لیتر",
      "ps": "12 x 1L",
      "ru": "12 х 1л",
      "uz": "12 x 1 l",
      "ar": "12 × 1 لتر",
      "zh": "12×1升"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-067",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Whole Milk Powder",
      "fa": "شیر خشک کامل",
      "ps": "د ټول شیدو پوډر",
      "ru": "Сухое цельное молоко",
      "uz": "To'liq sut kukuni",
      "ar": "مسحوق الحليب كامل الدسم",
      "zh": "全脂奶粉"
    },
    "specification": {
      "en": "25 kg bags",
      "fa": "کیسه های 25 کیلویی",
      "ps": "25 کیلو ګرامه کڅوړه",
      "ru": "мешки по 25 кг.",
      "uz": "25 kg sumkalar",
      "ar": "أكياس 25 كجم",
      "zh": "25公斤袋装"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-068",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Skim Milk Powder",
      "fa": "شیر خشک بدون چربی",
      "ps": "د شیدو پوډر سکیم",
      "ru": "Сухое обезжиренное молоко",
      "uz": "Yog'sizlangan sut kukuni",
      "ar": "مسحوق الحليب خالي الدسم",
      "zh": "脱脂奶粉"
    },
    "specification": {
      "en": "25 kg bags",
      "fa": "کیسه های 25 کیلویی",
      "ps": "25 کیلو ګرامه کڅوړه",
      "ru": "мешки по 25 кг.",
      "uz": "25 kg sumkalar",
      "ar": "أكياس 25 كجم",
      "zh": "25公斤袋装"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-069",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Butter",
      "fa": "کره حیوانی",
      "ps": "مکھن",
      "ru": "Масло",
      "uz": "Sariyog'",
      "ar": "سمنة",
      "zh": "黄油"
    },
    "specification": {
      "en": "82% fat",
      "fa": "82 درصد چربی",
      "ps": "82% غوړ",
      "ru": "82% жира",
      "uz": "82% yog '",
      "ar": "82% دهون",
      "zh": "82%脂肪"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-070",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Hard Cheese",
      "fa": "پنیر سخت",
      "ps": "سخت پنیر",
      "ru": "Твердый сыр",
      "uz": "Qattiq pishloq",
      "ar": "الجبن الصلب",
      "zh": "硬质奶酪"
    },
    "specification": {
      "en": "Vacuum packed",
      "fa": "بسته بندی وکیوم",
      "ps": "ویکیوم پیکل شوی",
      "ru": "В вакуумной упаковке",
      "uz": "Vakuumli qadoqlangan",
      "ar": "معبأة بالفراغ",
      "zh": "真空包装"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-071",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Packaged Yogurt",
      "fa": "ماست بسته‌بندی",
      "ps": "بسته شوي مستې",
      "ru": "Упакованный йогурт",
      "uz": "Qadoqlangan yogurt",
      "ar": "الزبادي المعبأ",
      "zh": "袋装酸奶"
    },
    "specification": {
      "en": "Assorted sizes",
      "fa": "اندازه های متنوع",
      "ps": "ډول ډول اندازې",
      "ru": "Различные размеры",
      "uz": "Turli o'lchamlar",
      "ar": "أحجام متنوعة",
      "zh": "各种尺寸"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-072",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Plain Biscuits",
      "fa": "بیسکویت ساده",
      "ps": "ساده بسکیټ",
      "ru": "Простое печенье",
      "uz": "Oddiy pechene",
      "ar": "بسكويت سادة",
      "zh": "原味饼干"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-073",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Cream Biscuits",
      "fa": "بیسکویت کرم‌دار",
      "ps": "کریم بسکټ",
      "ru": "Кремовое печенье",
      "uz": "Kremli pechene",
      "ar": "بسكويت بالكريمة",
      "zh": "奶油饼干"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-074",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Wafers",
      "fa": "ویفر",
      "ps": "وافرونه",
      "ru": "Вафли",
      "uz": "Gofretlar",
      "ar": "الرقائق",
      "zh": "晶圆"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-075",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Chocolate Bars",
      "fa": "شکلات تخته‌ای",
      "ps": "چاکلیټ بارونه",
      "ru": "Шоколадные батончики",
      "uz": "Shokolad barlari",
      "ar": "ألواح الشوكولاتة",
      "zh": "巧克力棒"
    },
    "specification": {
      "en": "Assorted",
      "fa": "متنوع",
      "ps": "ډوله",
      "ru": "Ассорти",
      "uz": "Turli xil",
      "ar": "متنوعة",
      "zh": "什锦"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-076",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Hard Candy",
      "fa": "آبنبات",
      "ps": "سخت کینډی",
      "ru": "леденец",
      "uz": "Qattiq konfet",
      "ar": "هارد كاندي",
      "zh": "硬糖"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-077",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Sunflower Halva",
      "fa": "حلوا آفتابگردان",
      "ps": "د لمر ګل حلوا",
      "ru": "Халва подсолнечная",
      "uz": "Ayçiçek halvasi",
      "ar": "حلاوة عباد الشمس",
      "zh": "向日葵哈尔瓦"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-078",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Pasta",
      "fa": "ماکارونی",
      "ps": "پاستا",
      "ru": "макароны",
      "uz": "Makaron",
      "ar": "المعكرونة",
      "zh": "面食"
    },
    "specification": {
      "en": "400g/5kg packs",
      "fa": "بسته های 400 گرمی / 5 کیلوگرمی",
      "ps": "400g/5kg کڅوړه",
      "ru": "пакеты по 400г/5кг.",
      "uz": "400 g / 5 kg paketlar",
      "ar": "عبوات 400 جرام/5 كجم",
      "zh": "400克/5公斤包装"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-079",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Instant Noodles",
      "fa": "نودل فوری",
      "ps": "فوري نوډلز",
      "ru": "Лапша быстрого приготовления",
      "uz": "Tez tayyorlanadigan noodles",
      "ar": "المعكرونة الفورية",
      "zh": "方便面"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-080",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Iodized Salt",
      "fa": "نمک یددار",
      "ps": "آیوډین شوی مالګه",
      "ru": "Йодированная соль",
      "uz": "Yodlangan tuz",
      "ar": "الملح المعالج باليود",
      "zh": "加碘盐"
    },
    "specification": {
      "en": "1kg/50kg",
      "fa": "1 کیلوگرم / 50 کیلوگرم",
      "ps": "1kg/50kg",
      "ru": "1 кг/50 кг",
      "uz": "1kg/50kg",
      "ar": "1 كجم/50 كجم",
      "zh": "1公斤/50公斤"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-081",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Packaged Black Tea",
      "fa": "چای سیاه بسته‌بندی",
      "ps": "بسته بندي تور چای",
      "ru": "Пакетированный черный чай",
      "uz": "Qadoqlangan qora choy",
      "ar": "الشاي الأسود المعبأ",
      "zh": "包装红茶"
    },
    "specification": {
      "en": "100g-1kg",
      "fa": "100 گرم - 1 کیلوگرم",
      "ps": "100 ګرامه - 1 کیلو ګرامه",
      "ru": "100г-1кг",
      "uz": "100 g - 1 kg",
      "ar": "100 جرام-1 كجم",
      "zh": "100克-1公斤"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-082",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Instant Coffee",
      "fa": "قهوه فوری",
      "ps": "فوري کافي",
      "ru": "Растворимый кофе",
      "uz": "Tez tayyorlanadigan kofe",
      "ar": "قهوة فورية",
      "zh": "速溶咖啡"
    },
    "specification": {
      "en": "Sachets/jars",
      "fa": "کیسه / شیشه",
      "ps": "کڅوړې / جارونه",
      "ru": "Пакетики/банки",
      "uz": "Paketlar / bankalar",
      "ar": "أكياس / الجرار",
      "zh": "小袋/罐子"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-083",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Mayonnaise",
      "fa": "سس مایونز",
      "ps": "میونیز",
      "ru": "Майонез",
      "uz": "Mayonez",
      "ar": "مايونيز",
      "zh": "蛋黄酱"
    },
    "specification": {
      "en": "Retail jars",
      "fa": "کوزه های خرده فروشی",
      "ps": "پرچون جار",
      "ru": "Розничные банки",
      "uz": "Chakana idishlar",
      "ar": "الجرار التجزئة",
      "zh": "零售罐"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-084",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Ketchup",
      "fa": "سس کچاپ",
      "ps": "کیچپ",
      "ru": "Кетчуп",
      "uz": "Ketchup",
      "ar": "كاتشب",
      "zh": "番茄酱"
    },
    "specification": {
      "en": "Retail bottles",
      "fa": "بطری های خرده فروشی",
      "ps": "پرچون بوتلونه",
      "ru": "Розничные бутылки",
      "uz": "Chakana butilkalar",
      "ar": "زجاجات البيع بالتجزئة",
      "zh": "零售瓶"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-085",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "White Vinegar",
      "fa": "سرکه سفید",
      "ps": "سپینه سرکه",
      "ru": "Белый уксус",
      "uz": "Oq sirka",
      "ar": "الخل الأبيض",
      "zh": "白醋"
    },
    "specification": {
      "en": "1L bottles",
      "fa": "بطری های 1 لیتری",
      "ps": "1L بوتلونه",
      "ru": "1л бутылки",
      "uz": "1 litrli idishlar",
      "ar": "زجاجات 1 لتر",
      "zh": "1L瓶"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-086",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Mineral Water 1.5L",
      "fa": "آب معدنی 1.5 لیتری",
      "ps": "منرال اوبه 1.5L",
      "ru": "Минеральная вода 1,5л",
      "uz": "Mineral suv 1,5 l",
      "ar": "مياه معدنية 1.5 لتر",
      "zh": "矿泉水1.5L"
    },
    "specification": {
      "en": "6 bottles",
      "fa": "6 بطری",
      "ps": "6 بوتلونه",
      "ru": "6 бутылок",
      "uz": "6 shisha",
      "ar": "6 زجاجات",
      "zh": "6瓶"
    },
    "unit": "Pack",
    "moq": "500 packs",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-087",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Carbonated Soft Drinks",
      "fa": "نوشابه گازدار",
      "ps": "کاربونیټ شوي نرم مشروبات",
      "ru": "Газированные безалкогольные напитки",
      "uz": "Gazlangan gazlangan ichimliklar",
      "ar": "المشروبات الغازية",
      "zh": "碳酸软饮料"
    },
    "specification": {
      "en": "PET/cans",
      "fa": "PET / قوطی",
      "ps": "PET / کین",
      "ru": "ПЭТ/банки",
      "uz": "PET / qutilar",
      "ar": "PET/علب",
      "zh": "聚酯/罐"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-088",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Laundry Soap",
      "fa": "صابون لباسشویی",
      "ps": "د مینځلو صابون",
      "ru": "Хозяйственное мыло",
      "uz": "Kir yuvish sovuni",
      "ar": "صابون الغسيل",
      "zh": "洗衣皂"
    },
    "specification": {
      "en": "Retail bars",
      "fa": "میله های خرده فروشی",
      "ps": "پرچون بارونه",
      "ru": "Розничные бары",
      "uz": "Chakana barlar",
      "ar": "قضبان البيع بالتجزئة",
      "zh": "零售酒吧"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-089",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Dishwashing Liquid",
      "fa": "مایع ظرفشویی",
      "ps": "د لوښو مینځلو مایع",
      "ru": "Жидкость для мытья посуды",
      "uz": "Idish yuvish suyuqligi",
      "ar": "سائل غسيل الصحون",
      "zh": "洗碗液"
    },
    "specification": {
      "en": "0.5-1L",
      "fa": "0.5-1 لیتر",
      "ps": "0.5-1L",
      "ru": "0,5-1л",
      "uz": "0,5-1 l",
      "ar": "0.5-1 لتر",
      "zh": "0.5-1L"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-090",
    "originCountry": "UZ",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Laundry Detergent Powder",
      "fa": "پودر لباسشویی",
      "ps": "د کالو مینځلو پاکولو پوډر",
      "ru": "Стиральный порошок",
      "uz": "Kir yuvish kukuni",
      "ar": "مسحوق غسيل الملابس",
      "zh": "洗衣粉"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-091",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Cumin Seeds",
      "fa": "زیره سبز",
      "ps": "د جیرو تخم",
      "ru": "Семена тмина",
      "uz": "Zira urug'lari",
      "ar": "بذور الكمون",
      "zh": "小茴香种子"
    },
    "specification": {
      "en": "Whole, cleaned",
      "fa": "کامل، تمیز شده",
      "ps": "بشپړ، پاک شوی",
      "ru": "Целый, очищенный",
      "uz": "To'liq, tozalangan",
      "ar": "كاملة، نظيفة",
      "zh": "整体，清洗干净"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-092",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Coriander Seeds",
      "fa": "تخم گشنیز",
      "ps": "د غوړیو تخم",
      "ru": "Семена кориандра",
      "uz": "Koriander urug'lari",
      "ar": "بذور الكزبرة",
      "zh": "香菜种子"
    },
    "specification": {
      "en": "Whole",
      "fa": "کل",
      "ps": "ټول",
      "ru": "Весь",
      "uz": "Butun",
      "ar": "جميع",
      "zh": "所有的"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-093",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Red Chili",
      "fa": "فلفل قرمز خشک",
      "ps": "وچ سور مرچ",
      "ru": "Сушеный красный перец чили",
      "uz": "Quritilgan qizil chili",
      "ar": "الفلفل الأحمر المجفف",
      "zh": "干红辣椒"
    },
    "specification": {
      "en": "Whole/powder",
      "fa": "کامل/پودر",
      "ps": "ټول / پوډر",
      "ru": "Цельное/порошок",
      "uz": "To'liq / chang",
      "ar": "كامل/مسحوق",
      "zh": "整体/粉末"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-094",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Paprika Powder",
      "fa": "پاپریکا",
      "ps": "د پاپریکا پوډر",
      "ru": "Порошок паприки",
      "uz": "Paprika kukuni",
      "ar": "مسحوق البابريكا",
      "zh": "辣椒粉"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-095",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Turmeric Powder",
      "fa": "زردچوبه پودر",
      "ps": "د تورمریک پوډر",
      "ru": "Куркума Порошок",
      "uz": "Zerdeçal kukuni",
      "ar": "مسحوق الكركم",
      "zh": "姜黄粉"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-096",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Black Pepper",
      "fa": "فلفل سیاه",
      "ps": "تور مرچ",
      "ru": "Черный перец",
      "uz": "Qora qalampir",
      "ar": "فلفل اسود",
      "zh": "黑胡椒"
    },
    "specification": {
      "en": "Whole/powder",
      "fa": "کامل/پودر",
      "ps": "ټول / پوډر",
      "ru": "Цельное/порошок",
      "uz": "To'liq / chang",
      "ar": "كامل/مسحوق",
      "zh": "整体/粉末"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-097",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Garlic Granules",
      "fa": "سیر خشک گرانول",
      "ps": "د وچ شوي لہسن دانه",
      "ru": "Гранулы сушеного чеснока",
      "uz": "Quritilgan sarimsoq granulalari",
      "ar": "حبيبات الثوم المجفف",
      "zh": "干蒜粒"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-098",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Onion Flakes",
      "fa": "پیاز خشک",
      "ps": "د وچ پیاز ټوټې",
      "ru": "Сушеные луковые хлопья",
      "uz": "Quritilgan piyoz parchalari",
      "ar": "رقائق البصل المجففة",
      "zh": "干洋葱片"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-099",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Dill",
      "fa": "شوید خشک",
      "ps": "وچ شوی ډیل",
      "ru": "Сушеный укроп",
      "uz": "Quritilgan arpabodiyon",
      "ar": "الشبت المجفف",
      "zh": "干莳萝"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-100",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Basil",
      "fa": "ریحان خشک",
      "ps": "وچ شوی بیسل",
      "ru": "Сушеный базилик",
      "uz": "Quritilgan reyhan",
      "ar": "الريحان المجفف",
      "zh": "干罗勒"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-101",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Mint",
      "fa": "نعناع خشک",
      "ps": "وچ شوی پودینه",
      "ru": "Сушеная мята",
      "uz": "Quritilgan yalpiz",
      "ar": "نعناع مجفف",
      "zh": "干薄荷"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-102",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Thyme",
      "fa": "آویشن",
      "ps": "تیم",
      "ru": "Тимьян",
      "uz": "timyan",
      "ar": "زعتر",
      "zh": "百里香"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-103",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Bay Leaves",
      "fa": "برگ بو",
      "ps": "د خلیج پاڼي",
      "ru": "лавровый лист",
      "uz": "Dafna barglari",
      "ar": "أوراق الغار",
      "zh": "月桂叶"
    },
    "specification": {
      "en": "Whole",
      "fa": "کل",
      "ps": "ټول",
      "ru": "Весь",
      "uz": "Butun",
      "ar": "جميع",
      "zh": "所有的"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-104",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Seasoning Salt",
      "fa": "نمک طعم‌دار",
      "ps": "د مصالحې مالګه",
      "ru": "Приправа Соль",
      "uz": "Ziravorlar tuzi",
      "ar": "ملح التوابل",
      "zh": "调味盐"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-105",
    "originCountry": "UZ",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Pilaf Spice Mix",
      "fa": "مخلوط ادویه پلو",
      "ps": "د پیلاف مساله مخلوط",
      "ru": "Смесь специй для плова",
      "uz": "Palov ziravorlar aralashmasi",
      "ar": "خليط بهارات بيلاف",
      "zh": "抓饭香料混合"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-106",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Raw Cotton Lint",
      "fa": "پنبه خام",
      "ps": "خام پنبه لینټ",
      "ru": "Сырой хлопковый ворс",
      "uz": "Xom paxta linti",
      "ar": "لينت القطن الخام",
      "zh": "原棉皮棉"
    },
    "specification": {
      "en": "Middling grade",
      "fa": "درجه متوسط",
      "ps": "منځنۍ درجه",
      "ru": "Средний сорт",
      "uz": "O'rta sinf",
      "ar": "درجة متوسطة",
      "zh": "中等等级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-107",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Combed Cotton Fiber",
      "fa": "الیاف پنبه شانه‌شده",
      "ps": "د پنبې فایبر کمبډ",
      "ru": "Чесаное хлопковое волокно",
      "uz": "Taroqli paxta tolasi",
      "ar": "ألياف القطن الممشط",
      "zh": "精梳棉纤维"
    },
    "specification": {
      "en": "Textile grade",
      "fa": "درجه نساجی",
      "ps": "د ټوکر درجه",
      "ru": "Текстильный сорт",
      "uz": "To'qimachilik darajasi",
      "ar": "درجة النسيج",
      "zh": "纺织级"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-108",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Yarn 20/1",
      "fa": "نخ پنبه 20/1",
      "ps": "د پنبې سوت 20/1",
      "ru": "Хлопчатобумажная пряжа 20/1",
      "uz": "Paxta iplari 20/1",
      "ar": "غزل القطن 20/1",
      "zh": "棉纱20/1"
    },
    "specification": {
      "en": "Ring/open-end",
      "fa": "حلقه / انتهای باز",
      "ps": "حلقه / خلاص پای",
      "ru": "Кольцо/открытый конец",
      "uz": "Ring/och-uch",
      "ar": "حلقة / نهاية مفتوحة",
      "zh": "环形/开口"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-109",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Yarn 30/1",
      "fa": "نخ پنبه 30/1",
      "ps": "د پنبې سوت 30/1",
      "ru": "Хлопчатобумажная пряжа 30/1",
      "uz": "Paxta iplari 30/1",
      "ar": "غزل القطن 30/1",
      "zh": "棉纱30/1"
    },
    "specification": {
      "en": "Ring spun",
      "fa": "حلقه چرخیده",
      "ps": "حلقه وهل",
      "ru": "Кольцо вращается",
      "uz": "Halqa aylantirildi",
      "ar": "نسج الدائري",
      "zh": "环锭纺"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-110",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Yarn 40/1",
      "fa": "نخ پنبه 40/1",
      "ps": "د پنبې سوت 40/1",
      "ru": "Хлопчатобумажная пряжа 40/1",
      "uz": "Paxta iplari 40/1",
      "ar": "غزل القطن 40/1",
      "zh": "棉纱40/1"
    },
    "specification": {
      "en": "Combed",
      "fa": "شانه شده",
      "ps": "ګډ شوی",
      "ru": "Причесанный",
      "uz": "Taroqli",
      "ar": "بتمشيط",
      "zh": "精梳"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-111",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Greige Cotton Fabric",
      "fa": "پارچه پنبه‌ای خام",
      "ps": "د ګریګ کاټن پارچه",
      "ru": "Серая хлопчатобумажная ткань",
      "uz": "Greige paxta matosi",
      "ar": "قماش قطن جريج",
      "zh": "棉坯布"
    },
    "specification": {
      "en": "Various GSM",
      "fa": "GSM های مختلف",
      "ps": "مختلف جی ایس ایم",
      "ru": "Различные GSM",
      "uz": "Har xil GSM",
      "ar": "جي إس إم مختلفة",
      "zh": "各种GSM"
    },
    "unit": "Meter",
    "moq": "10,000 m",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-112",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Dyed Cotton Fabric",
      "fa": "پارچه پنبه‌ای رنگ‌شده",
      "ps": "رنګ شوي پنبه ټوکر",
      "ru": "Окрашенная хлопчатобумажная ткань",
      "uz": "Bo'yalgan paxta matosi",
      "ar": "نسيج القطن المصبوغ",
      "zh": "染色棉织物"
    },
    "specification": {
      "en": "Various GSM",
      "fa": "GSM های مختلف",
      "ps": "مختلف جی ایس ایم",
      "ru": "Различные GSM",
      "uz": "Har xil GSM",
      "ar": "جي إس إم مختلفة",
      "zh": "各种GSM"
    },
    "unit": "Meter",
    "moq": "5,000 m",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-113",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Denim Fabric",
      "fa": "پارچه جین",
      "ps": "ډینم پارچه",
      "ru": "Джинсовая Ткань",
      "uz": "Daniy mato",
      "ar": "قماش الدنيم",
      "zh": "牛仔布"
    },
    "specification": {
      "en": "8-14 oz",
      "fa": "8-14 اونس",
      "ps": "8-14 اوز",
      "ru": "8-14 унций",
      "uz": "8-14 oz",
      "ar": "8-14 أونصة",
      "zh": "8-14 盎司"
    },
    "unit": "Meter",
    "moq": "3,000 m",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-114",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Terry Fabric",
      "fa": "پارچه حوله‌ای",
      "ps": "ټیری پارچه",
      "ru": "Терри Ткань",
      "uz": "Terri mato",
      "ar": "تيري النسيج",
      "zh": "毛圈布"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "KG",
    "moq": "1 MT",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-115",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Bath Towel",
      "fa": "حوله حمام",
      "ps": "د حمام تولیه",
      "ru": "Банное полотенце",
      "uz": "Hammom sochiq",
      "ar": "منشفة حمام",
      "zh": "浴巾"
    },
    "specification": {
      "en": "Cotton, assorted sizes",
      "fa": "پنبه، اندازه های مختلف",
      "ps": "پنبه، مختلف اندازې",
      "ru": "Хлопок, разные размеры.",
      "uz": "Paxta, turli o'lchamlar",
      "ar": "قطن، مقاسات متنوعة",
      "zh": "棉质，各种尺寸"
    },
    "unit": "Piece",
    "moq": "500 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-116",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Hand Towel",
      "fa": "حوله دست",
      "ps": "لاسي تولیه",
      "ru": "Полотенце для рук",
      "uz": "Qo'l sochiq",
      "ar": "منشفة يد",
      "zh": "手巾"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "Piece",
    "moq": "1000 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-117",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Bed Sheet Set",
      "fa": "ملحفه پنبه‌ای",
      "ps": "د پنبې بستر شیټ سیټ",
      "ru": "Комплект постельного белья из хлопка",
      "uz": "Paxta choyshab to'plami",
      "ar": "مجموعة ملاءات السرير القطنية",
      "zh": "棉质床单套装"
    },
    "specification": {
      "en": "Single/double",
      "fa": "تک / دو نفره",
      "ps": "واحد/ډبل",
      "ru": "Одноместный/двухместный",
      "uz": "Yagona/ikki kishilik",
      "ar": "مفردة/مزدوجة",
      "zh": "单人/双人"
    },
    "unit": "Set",
    "moq": "200 sets",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-118",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Blanket",
      "fa": "پتو پنبه‌ای",
      "ps": "د پنبې کمبل",
      "ru": "Хлопковое одеяло",
      "uz": "Paxta ko'rpa",
      "ar": "بطانية قطن",
      "zh": "棉毯"
    },
    "specification": {
      "en": "Assorted",
      "fa": "متنوع",
      "ps": "ډوله",
      "ru": "Ассорти",
      "uz": "Turli xil",
      "ar": "متنوعة",
      "zh": "什锦"
    },
    "unit": "Piece",
    "moq": "200 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-119",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Men's T-Shirt",
      "fa": "تی‌شرت مردانه",
      "ps": "د نارینه ټي شرټ",
      "ru": "Мужская футболка",
      "uz": "Erkaklar futbolkasi",
      "ar": "تي شيرت رجالي",
      "zh": "男士 T 恤"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "Piece",
    "moq": "1000 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-120",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Women's T-Shirt",
      "fa": "تی‌شرت زنانه",
      "ps": "د ښځو ټي شرټ",
      "ru": "Женская футболка",
      "uz": "Ayollar futbolkasi",
      "ar": "تي شيرت نسائي",
      "zh": "女式 T 恤"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "Piece",
    "moq": "1000 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-121",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Men's Shirt",
      "fa": "پیراهن مردانه",
      "ps": "د نارینه کمیس",
      "ru": "Мужская рубашка",
      "uz": "Erkaklar ko'ylagi",
      "ar": "قميص رجالي",
      "zh": "男士衬衫"
    },
    "specification": {
      "en": "Cotton blend",
      "fa": "ترکیب پنبه",
      "ps": "د پنبې مخلوط",
      "ru": "Смешанный хлопок",
      "uz": "Paxta aralashmasi",
      "ar": "مزيج القطن",
      "zh": "棉混纺"
    },
    "unit": "Piece",
    "moq": "500 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-122",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Workwear Set",
      "fa": "لباس کار",
      "ps": "د کار جامې سیټ",
      "ru": "Комплект спецодежды",
      "uz": "Ish kiyimlari to'plami",
      "ar": "مجموعة ملابس العمل",
      "zh": "工作服套装"
    },
    "specification": {
      "en": "Cotton/poly",
      "fa": "پنبه/پلی",
      "ps": "پنبه/پولي",
      "ru": "Хлопок/полиэтилен",
      "uz": "Paxta/poli",
      "ar": "قطن/بولي",
      "zh": "棉/涤"
    },
    "unit": "Set",
    "moq": "200 sets",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-123",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Medical Scrubs",
      "fa": "لباس طبی",
      "ps": "طبي سکربونه",
      "ru": "Медицинские скрабы",
      "uz": "Tibbiy skrablar",
      "ar": "مقشرات طبية",
      "zh": "医疗磨砂膏"
    },
    "specification": {
      "en": "Cotton/poly",
      "fa": "پنبه/پلی",
      "ps": "پنبه/پولي",
      "ru": "Хлопок/полиэтилен",
      "uz": "Paxta/poli",
      "ar": "قطن/بولي",
      "zh": "棉/涤"
    },
    "unit": "Set",
    "moq": "200 sets",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-124",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Socks",
      "fa": "جوراب پنبه‌ای",
      "ps": "د پنبې جرابې",
      "ru": "Хлопковые носки",
      "uz": "Paxta paypoq",
      "ar": "الجوارب القطنية",
      "zh": "棉袜"
    },
    "specification": {
      "en": "Assorted",
      "fa": "متنوع",
      "ps": "ډوله",
      "ru": "Ассорти",
      "uz": "Turli xil",
      "ar": "متنوعة",
      "zh": "什锦"
    },
    "unit": "Pair",
    "moq": "3000 pairs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-125",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Men's Underwear",
      "fa": "لباس زیر مردانه",
      "ps": "د نارینه زیرمې",
      "ru": "Мужское нижнее белье",
      "uz": "Erkaklar ichki kiyimi",
      "ar": "ملابس داخلية رجالية",
      "zh": "男士内衣"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "Piece",
    "moq": "2000 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-126",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Women's Underwear",
      "fa": "لباس زیر زنانه",
      "ps": "د ښځو زیرمه",
      "ru": "Женское нижнее белье",
      "uz": "Ayollar ichki kiyimlari",
      "ar": "ملابس داخلية نسائية",
      "zh": "女士内衣"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "Piece",
    "moq": "2000 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-127",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Children's Clothing Set",
      "fa": "لباس کودک",
      "ps": "د ماشومانو د جامو سیټ",
      "ru": "Комплект детской одежды",
      "uz": "Bolalar kiyimlari to'plami",
      "ar": "مجموعة ملابس الأطفال",
      "zh": "儿童服装套装"
    },
    "specification": {
      "en": "Cotton",
      "fa": "پنبه",
      "ps": "پنبه",
      "ru": "Хлопок",
      "uz": "Paxta",
      "ar": "قطن",
      "zh": "棉布"
    },
    "unit": "Set",
    "moq": "500 sets",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-128",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cotton Work Gloves",
      "fa": "دستکش پنبه‌ای",
      "ps": "د پنبې کاري دستکشې",
      "ru": "Хлопковые рабочие перчатки",
      "uz": "Paxta ish uchun qo'lqoplar",
      "ar": "قفازات العمل القطنية",
      "zh": "棉质工作手套"
    },
    "specification": {
      "en": "Knitted",
      "fa": "بافتنی",
      "ps": "اوبدل شوی",
      "ru": "Вязаный",
      "uz": "Trikotaj",
      "ar": "محبوك",
      "zh": "针织"
    },
    "unit": "Pair",
    "moq": "5000 pairs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-129",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Medical Absorbent Cotton",
      "fa": "پنبه طبی",
      "ps": "طبي جاذبه پنبه",
      "ru": "Медицинский впитывающий хлопок",
      "uz": "Tibbiy changni yutish paxta",
      "ar": "قطن طبي ماص",
      "zh": "医用脱脂棉"
    },
    "specification": {
      "en": "Medical grade",
      "fa": "درجه پزشکی",
      "ps": "طبي درجه",
      "ru": "Медицинский класс",
      "uz": "Tibbiy daraja",
      "ar": "الصف الطبي",
      "zh": "医疗级"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-130",
    "originCountry": "UZ",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Medical Gauze Roll",
      "fa": "گاز طبی",
      "ps": "د طبي ګازو رول",
      "ru": "Медицинский марлевый рулон",
      "uz": "Tibbiy doka rulosi",
      "ar": "رول شاش طبي",
      "zh": "医用纱布卷"
    },
    "specification": {
      "en": "Sterile/non-sterile",
      "fa": "استریل/غیر استریل",
      "ps": "جراثیمي / غیر جراثیم",
      "ru": "Стерильный/нестерильный",
      "uz": "Steril/steril bo'lmagan",
      "ar": "معقمة / غير معقمة",
      "zh": "无菌/非无菌"
    },
    "unit": "Roll",
    "moq": "5000 rolls",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-131",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Soda Ash",
      "fa": "کربنات سدیم",
      "ps": "سوډا ایش",
      "ru": "кальцинированная сода",
      "uz": "Sodali suv",
      "ar": "رماد الصودا",
      "zh": "纯碱"
    },
    "specification": {
      "en": "Industrial grade",
      "fa": "درجه صنعتی",
      "ps": "صنعتي درجه",
      "ru": "Промышленный класс",
      "uz": "Sanoat darajasi",
      "ar": "الصف الصناعي",
      "zh": "工业级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-132",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Caustic Soda",
      "fa": "سود سوزآور",
      "ps": "کاسټیک سوډا",
      "ru": "Каустическая сода",
      "uz": "Kaustik soda",
      "ar": "الصودا الكاوية",
      "zh": "烧碱"
    },
    "specification": {
      "en": "Flakes/liquid",
      "fa": "پولک / مایع",
      "ps": "فلیکس / مایع",
      "ru": "Хлопья/жидкость",
      "uz": "Yoriqlar/suyuqlik",
      "ar": "رقائق / سائل",
      "zh": "片状/液体"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-133",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Urea 46%",
      "fa": "اوره 46%",
      "ps": "یوریا 46%",
      "ru": "Мочевина 46%",
      "uz": "Karbamid 46%",
      "ar": "يوريا 46%",
      "zh": "尿素46%"
    },
    "specification": {
      "en": "Granular/prilled",
      "fa": "گرانول/پریل",
      "ps": "دانه/پرل شوی",
      "ru": "Гранулированный/приллированный",
      "uz": "Donador/prilled",
      "ar": "حبيبي/محبب",
      "zh": "粒状/丸状"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-134",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Ammonium Nitrate",
      "fa": "نیترات آمونیوم",
      "ps": "امونیم نایتریت",
      "ru": "Нитрат аммония",
      "uz": "Ammoniy nitrat",
      "ar": "نترات الأمونيوم",
      "zh": "硝酸铵"
    },
    "specification": {
      "en": "Fertilizer grade",
      "fa": "درجه کود",
      "ps": "د سرې درجه",
      "ru": "Марка удобрений",
      "uz": "O'g'it darajasi",
      "ar": "درجة الأسمدة",
      "zh": "肥料级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-135",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "NPK Fertilizer",
      "fa": "کود NPK",
      "ps": "NPK سرې",
      "ru": "НПК удобрения",
      "uz": "NPK o'g'itlari",
      "ar": "سماد NPK",
      "zh": "氮磷钾肥料"
    },
    "specification": {
      "en": "Various formulas",
      "fa": "فرمول های مختلف",
      "ps": "مختلف فورمولونه",
      "ru": "Различные формулы",
      "uz": "Har xil formulalar",
      "ar": "صيغ مختلفة",
      "zh": "各种公式"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-136",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Ammonium Sulfate",
      "fa": "سولفات آمونیوم",
      "ps": "امونیم سلفیټ",
      "ru": "Сульфат аммония",
      "uz": "Ammoniy sulfat",
      "ar": "كبريتات الأمونيوم",
      "zh": "硫酸铵"
    },
    "specification": {
      "en": "Fertilizer grade",
      "fa": "درجه کود",
      "ps": "د سرې درجه",
      "ru": "Марка удобрений",
      "uz": "O'g'it darajasi",
      "ar": "درجة الأسمدة",
      "zh": "肥料级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-137",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "LDPE Resin",
      "fa": "پلی‌اتیلن سبک LDPE",
      "ps": "LDPE رال",
      "ru": "Смола ПВД",
      "uz": "LDPE qatroni",
      "ar": "راتنج البولي إثيلين المنخفض الكثافة",
      "zh": "低密度聚乙烯树脂"
    },
    "specification": {
      "en": "Film grade",
      "fa": "درجه فیلم",
      "ps": "د فلم درجه",
      "ru": "Оценка пленки",
      "uz": "Film darajasi",
      "ar": "درجة الفيلم",
      "zh": "薄膜级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-138",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "HDPE Resin",
      "fa": "پلی‌اتیلن سنگین HDPE",
      "ps": "HDPE رال",
      "ru": "HDPE смола",
      "uz": "HDPE qatroni",
      "ar": "راتنج البولي إيثيلين عالي الكثافة",
      "zh": "高密度聚乙烯树脂"
    },
    "specification": {
      "en": "Injection/blow",
      "fa": "تزریق / ضربه",
      "ps": "انجکشن / ضربه",
      "ru": "Инъекция/удар",
      "uz": "In'ektsiya / zarba",
      "ar": "حقن/ضربة",
      "zh": "注射/吹塑"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-139",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Polypropylene Resin",
      "fa": "پلی‌پروپیلن PP",
      "ps": "پولی پروپیلین رال",
      "ru": "Полипропиленовая смола",
      "uz": "Polipropilen qatroni",
      "ar": "راتنجات البولي بروبيلين",
      "zh": "聚丙烯树脂"
    },
    "specification": {
      "en": "Raffia/injection",
      "fa": "رافیا / تزریق",
      "ps": "رافیا / انجیکشن",
      "ru": "Рафия/инъекция",
      "uz": "Rafiya / in'ektsiya",
      "ar": "الرافية/الحقن",
      "zh": "拉菲草/注塑"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-140",
    "originCountry": "UZ",
    "categoryId": "industrial-materials",
    "name": {
      "en": "PVC Resin",
      "fa": "گرانول PVC",
      "ps": "د PVC رال",
      "ru": "ПВХ смола",
      "uz": "PVX qatroni",
      "ar": "راتنج بي في سي",
      "zh": "聚氯乙烯树脂"
    },
    "specification": {
      "en": "Suspension grade",
      "fa": "درجه تعلیق",
      "ps": "د تعلیق درجه",
      "ru": "Класс подвески",
      "uz": "To'xtatib turish darajasi",
      "ar": "درجة التعليق",
      "zh": "悬浮级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-141",
    "originCountry": "UZ",
    "categoryId": "construction-materials",
    "name": {
      "en": "Portland Cement 42.5",
      "fa": "سمنت پرتلند 42.5",
      "ps": "پورټلینډ سیمنټ 42.5",
      "ru": "Портландцемент 42,5",
      "uz": "Portlend tsement 42.5",
      "ar": "أسمنت بورتلاند 42.5",
      "zh": "波特兰水泥 42.5"
    },
    "specification": {
      "en": "50 kg bags",
      "fa": "کیسه های 50 کیلویی",
      "ps": "50 کیلو ګرامه کڅوړه",
      "ru": "мешки по 50 кг.",
      "uz": "50 kg sumkalar",
      "ar": "أكياس 50 كجم",
      "zh": "50公斤袋装"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-142",
    "originCountry": "UZ",
    "categoryId": "construction-materials",
    "name": {
      "en": "Construction Gypsum",
      "fa": "گچ ساختمانی",
      "ps": "ساختماني جپسم",
      "ru": "Строительный гипс",
      "uz": "Qurilish gipsi",
      "ar": "الجبس البناء",
      "zh": "建筑石膏"
    },
    "specification": {
      "en": "Bagged",
      "fa": "کیسه دار",
      "ps": "کڅوړه",
      "ru": "в мешках",
      "uz": "Qoplangan",
      "ar": "معبأ",
      "zh": "袋装"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-143",
    "originCountry": "UZ",
    "categoryId": "construction-materials",
    "name": {
      "en": "Ceramic Floor Tiles",
      "fa": "کاشی سرامیکی",
      "ps": "د سیرامیک فرش ټیلونه",
      "ru": "Керамическая напольная плитка",
      "uz": "Zamin uchun keramik plitkalar",
      "ar": "بلاط ارضيات سيراميك",
      "zh": "陶瓷地砖"
    },
    "specification": {
      "en": "Various sizes",
      "fa": "اندازه های مختلف",
      "ps": "د مختلفو اندازو",
      "ru": "Различные размеры",
      "uz": "Har xil o'lchamlar",
      "ar": "أحجام مختلفة",
      "zh": "各种尺寸"
    },
    "unit": "M2",
    "moq": "1000 m2",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-144",
    "originCountry": "UZ",
    "categoryId": "construction-materials",
    "name": {
      "en": "Float Glass",
      "fa": "شیشه فلوت",
      "ps": "فلوټ شیشه",
      "ru": "Флоат-стекло",
      "uz": "Float shisha",
      "ar": "تعويم الزجاج",
      "zh": "浮法玻璃"
    },
    "specification": {
      "en": "4-10 mm",
      "fa": "4-10 میلی متر",
      "ps": "4-10 ملي متره",
      "ru": "4-10 мм",
      "uz": "4-10 mm",
      "ar": "4-10 ملم",
      "zh": "4-10毫米"
    },
    "unit": "M2",
    "moq": "500 m2",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-145",
    "originCountry": "UZ",
    "categoryId": "construction-materials",
    "name": {
      "en": "Steel Rebar",
      "fa": "میلگرد فولادی",
      "ps": "د فولادو ریبار",
      "ru": "Стальная арматура",
      "uz": "Chelik armatura",
      "ar": "حديد التسليح",
      "zh": "钢筋"
    },
    "specification": {
      "en": "8-32 mm",
      "fa": "8-32 میلی متر",
      "ps": "8-32 ملي متره",
      "ru": "8-32 мм",
      "uz": "8-32 mm",
      "ar": "8-32 ملم",
      "zh": "8-32毫米"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-146",
    "originCountry": "UZ",
    "categoryId": "packaging",
    "name": {
      "en": "PP Woven Bag 50kg",
      "fa": "بوجی پلی‌پروپیلن 50 کیلو",
      "ps": "PP اوبدل کڅوړه 50kg",
      "ru": "ПП тканый мешок 50 кг",
      "uz": "PP to'quv sumkasi 50 kg",
      "ar": "حقيبة منسوجة من البولي بروبيلين 50 كجم",
      "zh": "PP编织袋50kg"
    },
    "specification": {
      "en": "Printed/plain",
      "fa": "چاپ شده/ساده",
      "ps": "چاپ شوی / ساده",
      "ru": "Печатный/обычный",
      "uz": "Chop etilgan / tekis",
      "ar": "مطبوعة/عادي",
      "zh": "印刷/普通"
    },
    "unit": "Piece",
    "moq": "50,000 pcs",
    "representativeImage": "/card_images/row1/packaging and printing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-147",
    "originCountry": "UZ",
    "categoryId": "packaging",
    "name": {
      "en": "5-Ply Corrugated Carton",
      "fa": "کارتن پنج‌لایه",
      "ps": "5-پلی کورروګیډ کارټن",
      "ru": "5-слойный гофрированный картон",
      "uz": "5 qavatli gofrirovka qilingan karton",
      "ar": "كرتون مموج 5 طبقات",
      "zh": "五层瓦楞纸箱"
    },
    "specification": {
      "en": "Custom size",
      "fa": "اندازه سفارشی",
      "ps": "دودیز اندازه",
      "ru": "Нестандартный размер",
      "uz": "Maxsus o'lcham",
      "ar": "حجم مخصص",
      "zh": "定制尺寸"
    },
    "unit": "Piece",
    "moq": "5000 pcs",
    "representativeImage": "/card_images/row1/packaging and printing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-148",
    "originCountry": "UZ",
    "categoryId": "packaging",
    "name": {
      "en": "1L PET Bottle",
      "fa": "بطری PET یک لیتری",
      "ps": "1L PET بوتل",
      "ru": "ПЭТ-бутылка 1 л",
      "uz": "1 litr PET shisha",
      "ar": "زجاجة سعة 1 لتر",
      "zh": "1L PET瓶"
    },
    "specification": {
      "en": "With/without cap",
      "fa": "با / بدون درپوش",
      "ps": "پرته له کیپ سره",
      "ru": "С/без крышки",
      "uz": "Qopqoqli/qopqoqsiz",
      "ar": "مع/بدون غطاء",
      "zh": "有盖/无盖"
    },
    "unit": "Piece",
    "moq": "50,000 pcs",
    "representativeImage": "/card_images/row1/packaging and printing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-149",
    "originCountry": "UZ",
    "categoryId": "packaging",
    "name": {
      "en": "Shrink Film",
      "fa": "فلم شرینک",
      "ps": "فلم کم کړئ",
      "ru": "термоусадочная пленка",
      "uz": "Kichkina film",
      "ar": "يتقلص الفيلم",
      "zh": "收缩膜"
    },
    "specification": {
      "en": "Industrial grade",
      "fa": "درجه صنعتی",
      "ps": "صنعتي درجه",
      "ru": "Промышленный класс",
      "uz": "Sanoat darajasi",
      "ar": "الصف الصناعي",
      "zh": "工业级"
    },
    "unit": "KG",
    "moq": "1 MT",
    "representativeImage": "/card_images/row1/packaging and printing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "UZ-150",
    "originCountry": "UZ",
    "categoryId": "packaging",
    "name": {
      "en": "Packing Tape",
      "fa": "نوار چسب بسته‌بندی",
      "ps": "د بسته بندۍ ټیپ",
      "ru": "Упаковочная лента",
      "uz": "Qadoqlash lentasi",
      "ar": "شريط التعبئة",
      "zh": "封箱胶带"
    },
    "specification": {
      "en": "48 mm",
      "fa": "48 میلی متر",
      "ps": "48 ملي متره",
      "ru": "48 мм",
      "uz": "48 mm",
      "ar": "48 ملم",
      "zh": "48毫米"
    },
    "unit": "Roll",
    "moq": "5000 rolls",
    "representativeImage": "/card_images/row1/packaging and printing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-001",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Green Raisins",
      "fa": "کشمش سبز",
      "ps": "شنه ممیز",
      "ru": "Зеленый изюм",
      "uz": "Yashil mayiz",
      "ar": "الزبيب الأخضر",
      "zh": "绿葡萄干"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-002",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Red Raisins",
      "fa": "کشمش سرخ",
      "ps": "سور ممیز",
      "ru": "Красный изюм",
      "uz": "Qizil mayiz",
      "ar": "الزبيب الأحمر",
      "zh": "红葡萄干"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-003",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Black Raisins",
      "fa": "کشمش سیاه",
      "ps": "تور ممیز",
      "ru": "Черный изюм",
      "uz": "Qora mayiz",
      "ar": "الزبيب الأسود",
      "zh": "黑葡萄干"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-004",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Shindokhani Raisins",
      "fa": "کشمش شندرخانی",
      "ps": "شیندوخانی ممیز",
      "ru": "Шиндокхани Изюм",
      "uz": "Shindokhani mayizlari",
      "ar": "شيندوخاني زبيب",
      "zh": "新多哈尼葡萄干"
    },
    "specification": {
      "en": "Premium",
      "fa": "حق بیمه",
      "ps": "پریمیم",
      "ru": "Премиум",
      "uz": "Premium",
      "ar": "غالي",
      "zh": "优质的"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-005",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Figs",
      "fa": "انجیر خشک",
      "ps": "وچې انځر",
      "ru": "Сушеный инжир",
      "uz": "Quritilgan anjir",
      "ar": "التين المجفف",
      "zh": "无花果干"
    },
    "specification": {
      "en": "Premium/export",
      "fa": "حق بیمه / صادرات",
      "ps": "پریمیم / صادرات",
      "ru": "Премиум/экспорт",
      "uz": "Premium/eksport",
      "ar": "قسط / التصدير",
      "zh": "优质/出口"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-006",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Apricots",
      "fa": "زردآلو خشک",
      "ps": "وچ زردالو",
      "ru": "Курага",
      "uz": "Quritilgan o'riklar",
      "ar": "المشمش المجفف",
      "zh": "杏干"
    },
    "specification": {
      "en": "Whole/pitted",
      "fa": "کامل/حفره دار",
      "ps": "بشپړ/پټ شوی",
      "ru": "Целый/без косточек",
      "uz": "Butun / chuqurchaga aylangan",
      "ar": "كامل/محفور",
      "zh": "整颗/去核"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-007",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Apricot Slabs",
      "fa": "برگه زردآلو",
      "ps": "د زردالو سلیبونه",
      "ru": "Абрикосовые плиты",
      "uz": "O'rik plitalari",
      "ar": "ألواح المشمش",
      "zh": "杏板"
    },
    "specification": {
      "en": "Natural",
      "fa": "طبیعی",
      "ps": "طبیعي",
      "ru": "Естественный",
      "uz": "Tabiiy",
      "ar": "طبيعي",
      "zh": "自然的"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-008",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Plums",
      "fa": "آلو بخارا",
      "ps": "وچ شوي بیر",
      "ru": "сушеные сливы",
      "uz": "Quritilgan olxo'ri",
      "ar": "البرقوق المجفف",
      "zh": "梅干"
    },
    "specification": {
      "en": "Pitted/unpitted",
      "fa": "حفره دار / بدون حفره",
      "ps": "پټه شوې / بې پته",
      "ru": "Без косточек/без косточек",
      "uz": "Chuqursiz/tozasiz",
      "ar": "محفور/غير محفور",
      "zh": "有坑/无坑"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-009",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried White Mulberries",
      "fa": "توت خشک سفید",
      "ps": "وچ شوي سپین توت",
      "ru": "Сушеная белая шелковица",
      "uz": "Quritilgan oq tut",
      "ar": "التوت الأبيض المجفف",
      "zh": "白桑葚干"
    },
    "specification": {
      "en": "Natural",
      "fa": "طبیعی",
      "ps": "طبیعي",
      "ru": "Естественный",
      "uz": "Tabiiy",
      "ar": "طبيعي",
      "zh": "自然的"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-010",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Black Mulberries",
      "fa": "توت خشک سیاه",
      "ps": "وچ شوي تور توت",
      "ru": "Сушеная черная шелковица",
      "uz": "Quritilgan qora tut",
      "ar": "التوت الأسود المجفف",
      "zh": "黑桑葚干"
    },
    "specification": {
      "en": "Natural",
      "fa": "طبیعی",
      "ps": "طبیعي",
      "ru": "Естественный",
      "uz": "Tabiiy",
      "ar": "طبيعي",
      "zh": "自然的"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-011",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Oleaster",
      "fa": "سنجد خشک",
      "ps": "وچ شوی Oleaster",
      "ru": "Сушеный лох",
      "uz": "Quritilgan oleaster",
      "ar": "زيت الزيتون المجفف",
      "zh": "干油橄榄"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-012",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Paper-Shell Almonds",
      "fa": "بادام کاغذی با پوست",
      "ps": "د کاغذ-شیل بادام",
      "ru": "Миндаль в бумажной скорлупе",
      "uz": "Qog'oz qobig'i bodomlari",
      "ar": "ورقة شل اللوز",
      "zh": "纸壳杏仁"
    },
    "specification": {
      "en": "In shell",
      "fa": "در پوسته",
      "ps": "په شیل کې",
      "ru": "В оболочке",
      "uz": "Qobiqda",
      "ar": "في القشرة",
      "zh": "带壳"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-013",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Sweet Almond Kernels",
      "fa": "مغز بادام شیرین",
      "ps": "خواږه بادام دانه",
      "ru": "Ядра сладкого миндаля",
      "uz": "Shirin bodom yadrolari",
      "ar": "حبات اللوز الحلو",
      "zh": "甜杏仁仁"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-014",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Bitter Almond Kernels",
      "fa": "مغز بادام تلخ",
      "ps": "تریخ بادام دانه",
      "ru": "Ядра горького миндаля",
      "uz": "Achchiq bodom yadrolari",
      "ar": "حبات اللوز المر",
      "zh": "苦杏仁仁"
    },
    "specification": {
      "en": "Industrial/food",
      "fa": "صنعتی/غذایی",
      "ps": "صنعتي / خواړه",
      "ru": "Промышленное/пищевое",
      "uz": "Sanoat/oziq-ovqat",
      "ar": "الصناعية/الغذائية",
      "zh": "工业/食品"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-015",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Badghis Pistachios",
      "fa": "پسته بادغیس",
      "ps": "د بادغیس پسته",
      "ru": "Бадгис Фисташки",
      "uz": "Badghis pistasi",
      "ar": "فستق بادغيس",
      "zh": "巴德吉斯开心果"
    },
    "specification": {
      "en": "In shell",
      "fa": "در پوسته",
      "ps": "په شیل کې",
      "ru": "В оболочке",
      "uz": "Qobiqda",
      "ar": "في القشرة",
      "zh": "带壳"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-016",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Pistachio Kernels",
      "fa": "مغز پسته",
      "ps": "د پستې دانه",
      "ru": "Ядра фисташек",
      "uz": "Pista yadrolari",
      "ar": "حبات الفستق",
      "zh": "开心果仁"
    },
    "specification": {
      "en": "Premium",
      "fa": "حق بیمه",
      "ps": "پریمیم",
      "ru": "Премиум",
      "uz": "Premium",
      "ar": "غالي",
      "zh": "优质的"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-017",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Walnuts in Shell",
      "fa": "گردو با پوست",
      "ps": "اخروټ په شیل کې",
      "ru": "Грецкие орехи в скорлупе",
      "uz": "Shelldagi yong'oqlar",
      "ar": "الجوز في شل",
      "zh": "带壳核桃"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-018",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Light Walnut Kernels",
      "fa": "مغز گردو روشن",
      "ps": "رڼا د اخروټ دانه",
      "ru": "Светлые ядра грецкого ореха",
      "uz": "Yengil yong'oq yadrolari",
      "ar": "حبات الجوز الخفيفة",
      "zh": "轻质核桃仁"
    },
    "specification": {
      "en": "Light halves",
      "fa": "نیمه های سبک",
      "ps": "رڼا نیمایي",
      "ru": "Легкие половинки",
      "uz": "Yengil yarmi",
      "ar": "نصفين خفيفين",
      "zh": "轻一半"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-019",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Mixed Walnut Kernels",
      "fa": "مغز گردو مخلوط",
      "ps": "د اخروټ دانو مخلوط",
      "ru": "Смешанные ядра грецких орехов",
      "uz": "Aralashtirilgan yong'oq yadrolari",
      "ar": "حبات الجوز المختلطة",
      "zh": "混合核桃仁"
    },
    "specification": {
      "en": "Mixed pieces",
      "fa": "قطعات مخلوط",
      "ps": "مخلوط ټوټې",
      "ru": "Смешанные кусочки",
      "uz": "Aralashtirilgan qismlar",
      "ar": "قطع مختلطة",
      "zh": "混合件"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-020",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Pine Nuts in Shell",
      "fa": "جلغوزه با پوست",
      "ps": "په شیل کې د انارو مغز",
      "ru": "Кедровые орехи в скорлупе",
      "uz": "Shelldagi qarag'ay yong'oqlari",
      "ar": "الصنوبر في شل",
      "zh": "带壳松子"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-021",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Pine Nut Kernels",
      "fa": "مغز جلغوزه",
      "ps": "د جلغوزي دانه",
      "ru": "Ядра кедровых орехов",
      "uz": "Qarag'ay yong'og'i yadrolari",
      "ar": "حبات الصنوبر",
      "zh": "松子仁"
    },
    "specification": {
      "en": "Premium",
      "fa": "حق بیمه",
      "ps": "پریمیم",
      "ru": "Премиум",
      "uz": "Premium",
      "ar": "غالي",
      "zh": "优质的"
    },
    "unit": "KG",
    "moq": "50 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-022",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Roasted Chickpeas",
      "fa": "نخودچی بو داده",
      "ps": "غوړ شوي مرغان",
      "ru": "Жареный нут",
      "uz": "Qovurilgan no'xat",
      "ar": "الحمص المحمص",
      "zh": "烤鹰嘴豆"
    },
    "specification": {
      "en": "Snack grade",
      "fa": "درجه میان وعده",
      "ps": "د ډوډۍ درجه",
      "ru": "Закусочный сорт",
      "uz": "Snack darajasi",
      "ar": "درجة وجبة خفيفة",
      "zh": "零食级"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-023",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Pumpkin Seeds",
      "fa": "تخم کدو",
      "ps": "د کدو تخم",
      "ru": "Семена тыквы",
      "uz": "Qovoq urug'lari",
      "ar": "بذور اليقطين",
      "zh": "南瓜子"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-024",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Watermelon Seeds",
      "fa": "تخم هندوانه",
      "ps": "د هندواڼو تخم",
      "ru": "Семена арбуза",
      "uz": "Tarvuz urug'lari",
      "ar": "بذور البطيخ",
      "zh": "西瓜籽"
    },
    "specification": {
      "en": "Snack grade",
      "fa": "درجه میان وعده",
      "ps": "د ډوډۍ درجه",
      "ru": "Закусочный сорт",
      "uz": "Snack darajasi",
      "ar": "درجة وجبة خفيفة",
      "zh": "零食级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-025",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Peanuts",
      "fa": "بادام زمینی",
      "ps": "مونګ",
      "ru": "Арахис",
      "uz": "Yong'oq",
      "ar": "الفول السوداني",
      "zh": "花生"
    },
    "specification": {
      "en": "Shelled",
      "fa": "گلوله باران شد",
      "ps": "مرمۍ شوې",
      "ru": "Обстрелянный",
      "uz": "Oqlangan",
      "ar": "قصفت",
      "zh": "带壳"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-026",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Afghan-Packed Dates",
      "fa": "خرمای وارداتی بسته‌بندی افغانستان",
      "ps": "د افغانی پیکل شوی تاریخ",
      "ru": "Афганские финики",
      "uz": "Afg'on xurmolari",
      "ar": "التمور الأفغانية المعبأة",
      "zh": "阿富汗枣子"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-027",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Four-Nut Mix",
      "fa": "مخلوط چهارمغز",
      "ps": "څلور مغز لرونکی مخلوط",
      "ru": "Четырехореховый микс",
      "uz": "To'rt yong'oq aralashmasi",
      "ar": "مزيج من أربعة مكسرات",
      "zh": "四坚果混合"
    },
    "specification": {
      "en": "Premium mix",
      "fa": "ترکیب برتر",
      "ps": "پریمیم مخلوط",
      "ru": "Премиум микс",
      "uz": "Premium aralash",
      "ar": "مزيج ممتاز",
      "zh": "优质组合"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-028",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Mixed Dried Fruits",
      "fa": "میوه خشک مخلوط",
      "ps": "مخلوط وچې میوې",
      "ru": "Смесь сухофруктов",
      "uz": "Aralashtirilgan quritilgan mevalar",
      "ar": "فواكه مجففة مشكلة",
      "zh": "混合干果"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-029",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Raisins 500g Pack",
      "fa": "کشمش بسته‌بندی 500 گرام",
      "ps": "د ممیزو 500 ګرامه کڅوړه",
      "ru": "Изюм 500г упаковка",
      "uz": "Mayiz 500 g paket",
      "ar": "علبة زبيب 500 جرام",
      "zh": "葡萄干500g装"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-030",
    "originCountry": "AF",
    "categoryId": "dried-fruit",
    "name": {
      "en": "Dried Figs 500g Pack",
      "fa": "انجیر بسته‌بندی 500 گرام",
      "ps": "وچې انځر 500 ګرامه بسته",
      "ru": "Инжир сушеный 500г упаковка",
      "uz": "Quritilgan anjir 500 g paket",
      "ar": "علبة تين مجفف 500 جرام",
      "zh": "无花果干 500g 包"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-031",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Herat Saffron Premium",
      "fa": "زعفران هرات درجه ممتاز",
      "ps": "د هرات ممتاز زعفران",
      "ru": "Шафран Герата премиум-класса",
      "uz": "Heratning premium za’faroni",
      "ar": "زعفران هرات الممتاز",
      "zh": "赫拉特特级藏红花"
    },
    "specification": {
      "en": "Negin/Sargol",
      "fa": "نگین/سرگل",
      "ps": "نیګین/سرګول",
      "ru": "Негин/Саргол",
      "uz": "Negin/Sargol",
      "ar": "نيجين/سرجول",
      "zh": "内金/萨尔戈尔"
    },
    "unit": "KG",
    "moq": "1 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-032",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Saffron Pushal",
      "fa": "زعفران پوشال",
      "ps": "د زعفرانو پشکال",
      "ru": "Шафрановый Пушал",
      "uz": "Za'faron Pushal",
      "ar": "زعفران بوشال",
      "zh": "藏红花普沙尔"
    },
    "specification": {
      "en": "Pushal grade",
      "fa": "درجه پوشال",
      "ps": "د پشال ټولګي",
      "ru": "Пушал сорт",
      "uz": "Pushal darajasi",
      "ar": "درجة بوشال",
      "zh": "普什尔级"
    },
    "unit": "KG",
    "moq": "1 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-033",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Black Cumin",
      "fa": "زیره سیاه بدخشان",
      "ps": "تور جیره",
      "ru": "Черный тмин",
      "uz": "Qora zira",
      "ar": "الكمون الأسود",
      "zh": "黑孜然"
    },
    "specification": {
      "en": "Wild/cleaned",
      "fa": "وحشی/پاک شده",
      "ps": "وحشي/پاک شوی",
      "ru": "Дикий/очищенный",
      "uz": "Yovvoyi/tozalangan",
      "ar": "البرية / تنظيفها",
      "zh": "野生/清洁"
    },
    "unit": "KG",
    "moq": "50 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-034",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Green Cumin",
      "fa": "زیره سبز",
      "ps": "شنه جیره",
      "ru": "Зеленый тмин",
      "uz": "Yashil zira",
      "ar": "الكمون الأخضر",
      "zh": "绿孜然"
    },
    "specification": {
      "en": "Whole",
      "fa": "کل",
      "ps": "ټول",
      "ru": "Весь",
      "uz": "Butun",
      "ar": "جميع",
      "zh": "所有的"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-035",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Asafoetida Resin",
      "fa": "انغوزه",
      "ps": "Asafoetida Resin",
      "ru": "Смола асафетиды",
      "uz": "Asafoetida qatroni",
      "ar": "راتنج الحلتيت",
      "zh": "阿魏树脂"
    },
    "specification": {
      "en": "Grade dependent",
      "fa": "وابسته به درجه",
      "ps": "د درجې پورې اړه لري",
      "ru": "Зависит от оценки",
      "uz": "Darsga bog'liq",
      "ar": "تعتمد الدرجة",
      "zh": "取决于年级"
    },
    "unit": "KG",
    "moq": "20 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-036",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Licorice Root",
      "fa": "شیرین‌بیان خشک",
      "ps": "Licorice ريښه",
      "ru": "Корень солодки",
      "uz": "Qizilmiya ildizi",
      "ar": "جذر عرق السوس",
      "zh": "甘草根"
    },
    "specification": {
      "en": "Dried root",
      "fa": "ریشه خشک شده",
      "ps": "وچه ریښه",
      "ru": "Сушеный корень",
      "uz": "Quritilgan ildiz",
      "ar": "الجذر المجفف",
      "zh": "干根"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-037",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Frankincense",
      "fa": "کُندر",
      "ps": "فرانکنسنس",
      "ru": "Ладан",
      "uz": "Tutqoq",
      "ar": "اللبان",
      "zh": "乳香"
    },
    "specification": {
      "en": "Natural resin",
      "fa": "رزین طبیعی",
      "ps": "طبیعي رال",
      "ru": "Натуральная смола",
      "uz": "Tabiiy qatron",
      "ar": "الراتنج الطبيعي",
      "zh": "天然树脂"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-038",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Rose Petals",
      "fa": "گل سرخ خشک",
      "ps": "وچ شوي ګلاب پاڼي",
      "ru": "Сушеные лепестки роз",
      "uz": "Quritilgan atirgul barglari",
      "ar": "بتلات الورد المجففة",
      "zh": "干玫瑰花瓣"
    },
    "specification": {
      "en": "Food/cosmetic grade",
      "fa": "درجه مواد غذایی/آرایشی",
      "ps": "خواړه / کاسمیټیک درجه",
      "ru": "Пищевой/косметический класс",
      "uz": "Oziq-ovqat/kosmetika darajasi",
      "ar": "درجة الغذاء/مستحضرات التجميل",
      "zh": "食品/化妆品级"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-039",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Mint",
      "fa": "نعناع خشک",
      "ps": "وچ شوی پودینه",
      "ru": "Сушеная мята",
      "uz": "Quritilgan yalpiz",
      "ar": "نعناع مجفف",
      "zh": "干薄荷"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-040",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Wild Thyme",
      "fa": "آویشن کوهی",
      "ps": "وحشي تیم",
      "ru": "Дикий тимьян",
      "uz": "Yovvoyi kekik",
      "ar": "الزعتر البري",
      "zh": "野生百里香"
    },
    "specification": {
      "en": "Dried",
      "fa": "خشک شده",
      "ps": "وچ شوی",
      "ru": "Сушеный",
      "uz": "Quritilgan",
      "ar": "المجففة",
      "zh": "干的"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-041",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Chamomile Flowers",
      "fa": "بابونه",
      "ps": "کیمومائل ګلونه",
      "ru": "Цветы ромашки",
      "uz": "Moychechak gullari",
      "ar": "زهور البابونج",
      "zh": "洋甘菊花"
    },
    "specification": {
      "en": "Dried flowers",
      "fa": "گل های خشک شده",
      "ps": "وچ شوي ګلونه",
      "ru": "Сухоцветы",
      "uz": "Quritilgan gullar",
      "ar": "زهور مجففة",
      "zh": "干花"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-042",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Nigella Seeds",
      "fa": "سیاه‌دانه",
      "ps": "د نایجیلا تخمونه",
      "ru": "Семена нигеллы",
      "uz": "Nigella urug'lari",
      "ar": "بذور حبة البركة",
      "zh": "黑种草种子"
    },
    "specification": {
      "en": "Cleaned",
      "fa": "تمیز شد",
      "ps": "پاک شوی",
      "ru": "Очищенный",
      "uz": "Tozalangan",
      "ar": "تنظيفها",
      "zh": "已清洁"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-043",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Coriander Seeds",
      "fa": "تخم گشنیز",
      "ps": "د غوړیو تخم",
      "ru": "Семена кориандра",
      "uz": "Koriander urug'lari",
      "ar": "بذور الكزبرة",
      "zh": "香菜种子"
    },
    "specification": {
      "en": "Whole",
      "fa": "کل",
      "ps": "ټول",
      "ru": "Весь",
      "uz": "Butun",
      "ar": "جميع",
      "zh": "所有的"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-044",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Fennel Seeds",
      "fa": "رازیانه",
      "ps": "د سونف تخم",
      "ru": "Семена фенхеля",
      "uz": "Arpabodiyon urug'lari",
      "ar": "بذور الشمر",
      "zh": "茴香籽"
    },
    "specification": {
      "en": "Whole",
      "fa": "کل",
      "ps": "ټول",
      "ru": "Весь",
      "uz": "Butun",
      "ar": "جميع",
      "zh": "所有的"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-045",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "White Sesame Seeds",
      "fa": "کنجد سفید",
      "ps": "د سپینو تیو تخمونه",
      "ru": "Семена белого кунжута",
      "uz": "Oq kunjut urug'lari",
      "ar": "بذور السمسم الأبيض",
      "zh": "白芝麻"
    },
    "specification": {
      "en": "Cleaned",
      "fa": "تمیز شد",
      "ps": "پاک شوی",
      "ru": "Очищенный",
      "uz": "Tozalangan",
      "ar": "تنظيفها",
      "zh": "已清洁"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-046",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Black Sesame Seeds",
      "fa": "کنجد سیاه",
      "ps": "د تور سیسم تخم",
      "ru": "Семена черного кунжута",
      "uz": "Qora kunjut urug'lari",
      "ar": "بذور السمسم الأسود",
      "zh": "黑芝麻"
    },
    "specification": {
      "en": "Cleaned",
      "fa": "تمیز شد",
      "ps": "پاک شوی",
      "ru": "Очищенный",
      "uz": "Tozalangan",
      "ar": "تنظيفها",
      "zh": "已清洁"
    },
    "unit": "KG",
    "moq": "300 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-047",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Afghan-Packed Green Cardamom",
      "fa": "هل سبز بسته‌بندی افغانستان",
      "ps": "د افغاني ډک شنه الائچی",
      "ru": "Зеленый кардамон в афганской упаковке",
      "uz": "Afg'onistonda qadoqlangan yashil kardamom",
      "ar": "الهيل الأخضر الأفغاني المعبأ",
      "zh": "阿富汗包装的绿色小豆蔻"
    },
    "specification": {
      "en": "Imported/packed locally",
      "fa": "وارداتی/بسته بندی محلی",
      "ps": "په محلي توګه وارد شوي / بسته شوي",
      "ru": "Импортировано/упаковано локально",
      "uz": "Mahalliy import qilingan/qadoqlangan",
      "ar": "مستورد/معبأ محليًا",
      "zh": "进口/本地包装"
    },
    "unit": "KG",
    "moq": "50 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-048",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Afghan-Packed Black Pepper",
      "fa": "فلفل سیاه بسته‌بندی افغانستان",
      "ps": "افغاني تور مرچ",
      "ru": "Черный перец в афганской упаковке",
      "uz": "Afg'onistonda qadoqlangan qora qalampir",
      "ar": "فلفل أسود أفغاني معبأ",
      "zh": "阿富汗包装黑胡椒"
    },
    "specification": {
      "en": "Packed locally",
      "fa": "بسته بندی محلی",
      "ps": "په محلي توګه بسته شوي",
      "ru": "Упаковано локально",
      "uz": "Mahalliy qadoqlangan",
      "ar": "معبأة محليا",
      "zh": "本地包装"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-049",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Afghan-Packed Turmeric",
      "fa": "زردچوبه بسته‌بندی افغانستان",
      "ps": "افغاني بسته شوي تورتم",
      "ru": "Куркума в афганской упаковке",
      "uz": "Afg'onistonda qadoqlangan zerdeçal",
      "ar": "الكركم الأفغاني المعبأ",
      "zh": "阿富汗包装姜黄"
    },
    "specification": {
      "en": "Powder",
      "fa": "پودر",
      "ps": "پوډر",
      "ru": "Пудра",
      "uz": "Kukun",
      "ar": "مسحوق",
      "zh": "粉末"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-050",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Afghan-Packed Cinnamon",
      "fa": "دارچین بسته‌بندی افغانستان",
      "ps": "افغانی پیکی شوی دارچینی",
      "ru": "Корица в афганской упаковке",
      "uz": "Afg'onistonda qadoqlangan doljin",
      "ar": "القرفة الأفغانية المعبأة",
      "zh": "阿富汗包装肉桂"
    },
    "specification": {
      "en": "Whole/powder",
      "fa": "کامل/پودر",
      "ps": "ټول / پوډر",
      "ru": "Цельное/порошок",
      "uz": "To'liq / chang",
      "ar": "كامل/مسحوق",
      "zh": "整体/粉末"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-051",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Qabili Spice Mix",
      "fa": "مخلوط ادویه قابلی",
      "ps": "د کابلي مصالحو مخلوط",
      "ru": "Смесь специй Кабили",
      "uz": "Qabili ziravorlar aralashmasi",
      "ar": "خلطة بهارات قبيلي",
      "zh": "卡比利混合香料"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-052",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Herbal Green Tea Blend",
      "fa": "چای سبز گیاهی",
      "ps": "د شنه چای د بوټو ترکیب",
      "ru": "Смесь травяного зеленого чая",
      "uz": "O'simlik yashil choy aralashmasi",
      "ar": "مزيج الشاي الأخضر العشبي",
      "zh": "草本绿茶混合物"
    },
    "specification": {
      "en": "Local blend",
      "fa": "ترکیب محلی",
      "ps": "محلي ترکیب",
      "ru": "Местная смесь",
      "uz": "Mahalliy aralash",
      "ar": "مزيج محلي",
      "zh": "当地混合"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-053",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Henna Powder",
      "fa": "حنا پودر",
      "ps": "د هینا پوډر",
      "ru": "Порошок хны",
      "uz": "Xina kukuni",
      "ar": "مسحوق الحناء",
      "zh": "指甲花粉"
    },
    "specification": {
      "en": "Cosmetic grade",
      "fa": "درجه آرایشی و بهداشتی",
      "ps": "د کاسمیټیک درجه",
      "ru": "Косметический класс",
      "uz": "Kosmetik daraja",
      "ar": "درجة مستحضرات التجميل",
      "zh": "化妆品级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-054",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Syrian Rue Seeds",
      "fa": "اسپند",
      "ps": "د سوریې ریو تخمونه",
      "ru": "Семена сирийской руты",
      "uz": "Suriya rue urug'lari",
      "ar": "بذور الحرمل السوري",
      "zh": "叙利亚芸香种子"
    },
    "specification": {
      "en": "Cleaned",
      "fa": "تمیز شد",
      "ps": "پاک شوی",
      "ru": "Очищенный",
      "uz": "Tozalangan",
      "ar": "تنظيفها",
      "zh": "已清洁"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-055",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Almond Gum",
      "fa": "صمغ بادام",
      "ps": "د بادامو غوښه",
      "ru": "Миндальная камедь",
      "uz": "Bodom saqich",
      "ar": "صمغ اللوز",
      "zh": "杏仁胶"
    },
    "specification": {
      "en": "Natural gum",
      "fa": "آدامس طبیعی",
      "ps": "طبیعي ګوم",
      "ru": "Натуральная камедь",
      "uz": "Tabiiy saqich",
      "ar": "اللثة الطبيعية",
      "zh": "天然树胶"
    },
    "unit": "KG",
    "moq": "50 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-056",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Tragacanth Gum",
      "fa": "کتیرا",
      "ps": "ټریګاکانت ګم",
      "ru": "Трагакантовая камедь",
      "uz": "Tragacanth Gum",
      "ar": "صمغ الكثيراء",
      "zh": "黄芪胶"
    },
    "specification": {
      "en": "Grade dependent",
      "fa": "وابسته به درجه",
      "ps": "د درجې پورې اړه لري",
      "ru": "Зависит от оценки",
      "uz": "Darsga bog'liq",
      "ar": "تعتمد الدرجة",
      "zh": "取决于年级"
    },
    "unit": "KG",
    "moq": "20 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-057",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Dried Barberry",
      "fa": "زرشک خشک",
      "ps": "وچ باربیری",
      "ru": "Барбарис сушеный",
      "uz": "Quritilgan zirk",
      "ar": "البرباريس المجففة",
      "zh": "干伏牛花"
    },
    "specification": {
      "en": "Cleaned",
      "fa": "تمیز شد",
      "ps": "پاک شوی",
      "ru": "Очищенный",
      "uz": "Tozalangan",
      "ar": "تنظيفها",
      "zh": "已清洁"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-058",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Sumac",
      "fa": "سماق",
      "ps": "سماک",
      "ru": "Сумах",
      "uz": "Sumalak",
      "ar": "السماق",
      "zh": "漆树"
    },
    "specification": {
      "en": "Whole/powder",
      "fa": "کامل/پودر",
      "ps": "ټول / پوډر",
      "ru": "Цельное/порошок",
      "uz": "To'liq / chang",
      "ar": "كامل/مسحوق",
      "zh": "整体/粉末"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-059",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Local Garlic Powder",
      "fa": "پودر سیر محلی",
      "ps": "د محلي لہسن پوډر",
      "ru": "Местный чесночный порошок",
      "uz": "Mahalliy sarimsoq kukuni",
      "ar": "مسحوق الثوم المحلي",
      "zh": "当地大蒜粉"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-060",
    "originCountry": "AF",
    "categoryId": "spices-herbs",
    "name": {
      "en": "Local Dried Onion",
      "fa": "پیاز خشک محلی",
      "ps": "ځایی وچ پیاز",
      "ru": "Местный сушеный лук",
      "uz": "Mahalliy quritilgan piyoz",
      "ar": "بصل مجفف محلي",
      "zh": "当地干洋葱"
    },
    "specification": {
      "en": "Flakes/powder",
      "fa": "پولک/پودر",
      "ps": "فلیکس / پوډر",
      "ru": "Хлопья/порошок",
      "uz": "Yoriqlar/chang",
      "ar": "رقائق / مسحوق",
      "zh": "片状/粉末"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-061",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Kandahar Pomegranates",
      "fa": "انار قندهار",
      "ps": "د کندهار انار",
      "ru": "Кандагарские гранаты",
      "uz": "Qandahor anorlari",
      "ar": "قندهار الرمان",
      "zh": "坎大哈石榴"
    },
    "specification": {
      "en": "Export grade",
      "fa": "درجه صادرات",
      "ps": "د صادراتو درجه",
      "ru": "Экспортный сорт",
      "uz": "Eksport darajasi",
      "ar": "درجة التصدير",
      "zh": "出口级"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-062",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Shindokhani Grapes",
      "fa": "انگور شندرخانی",
      "ps": "د شیندوخانی انګور",
      "ru": "Виноград Шиндокхани",
      "uz": "Shindokhani uzumlari",
      "ar": "عنب شيندوخاني",
      "zh": "新多卡尼葡萄"
    },
    "specification": {
      "en": "Fresh export",
      "fa": "صادرات تازه",
      "ps": "تازه صادرات",
      "ru": "Свежий экспорт",
      "uz": "Yangi eksport",
      "ar": "تصدير طازج",
      "zh": "生鲜出口"
    },
    "unit": "KG",
    "moq": "3 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-063",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Raisin Grapes",
      "fa": "انگور کشمشی",
      "ps": "ممیز انګور",
      "ru": "Изюм Виноград",
      "uz": "Uzum uzumlari",
      "ar": "العنب الزبيب",
      "zh": "葡萄干葡萄"
    },
    "specification": {
      "en": "Fresh/process",
      "fa": "تازه / فرآیند",
      "ps": "تازه / پروسس",
      "ru": "Свежий/процесс",
      "uz": "Yangi / ishlov berish",
      "ar": "طازجة/عملية",
      "zh": "新鲜/加工"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-064",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Wardak Apples",
      "fa": "سیب میدان وردک",
      "ps": "د وردګو مڼې",
      "ru": "Вардак Яблоки",
      "uz": "Vardak olmalari",
      "ar": "وارداك التفاح",
      "zh": "瓦尔达克苹果"
    },
    "specification": {
      "en": "Class I/II",
      "fa": "کلاس I/II",
      "ps": "ټولګي I/II",
      "ru": "Класс I/II",
      "uz": "I/II sinf",
      "ar": "الدرجة الأولى/الثانية",
      "zh": "一类/二类"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-065",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Bamyan Apricots",
      "fa": "زردآلوی بامیان",
      "ps": "د بامیان زردالو",
      "ru": "Бамианские абрикосы",
      "uz": "Bamyan o'riklari",
      "ar": "مشمش باميان",
      "zh": "巴米扬杏子"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "3 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-066",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Fresh Cherries",
      "fa": "گیلاس",
      "ps": "تازه چیری",
      "ru": "Свежая вишня",
      "uz": "Yangi gilos",
      "ar": "الكرز الطازج",
      "zh": "新鲜樱桃"
    },
    "specification": {
      "en": "Fresh export",
      "fa": "صادرات تازه",
      "ps": "تازه صادرات",
      "ru": "Свежий экспорт",
      "uz": "Yangi eksport",
      "ar": "تصدير طازج",
      "zh": "生鲜出口"
    },
    "unit": "KG",
    "moq": "1 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-067",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Melons",
      "fa": "خربوزه",
      "ps": "خټکي",
      "ru": "Дыни",
      "uz": "Qovunlar",
      "ar": "البطيخ",
      "zh": "瓜类"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-068",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Watermelons",
      "fa": "هندوانه",
      "ps": "هندواڼه",
      "ru": "Арбузы",
      "uz": "Tarvuzlar",
      "ar": "البطيخ",
      "zh": "西瓜"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-069",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Onions",
      "fa": "پیاز",
      "ps": "پیاز",
      "ru": "Лук",
      "uz": "Piyoz",
      "ar": "البصل",
      "zh": "洋葱"
    },
    "specification": {
      "en": "50 kg bags",
      "fa": "کیسه های 50 کیلویی",
      "ps": "50 کیلو ګرامه کڅوړه",
      "ru": "мешки по 50 кг.",
      "uz": "50 kg sumkalar",
      "ar": "أكياس 50 كجم",
      "zh": "50公斤袋装"
    },
    "unit": "KG",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-070",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Bamyan Potatoes",
      "fa": "سیب زمینی بامیان",
      "ps": "د بامیان کچالو",
      "ru": "Бамианский картофель",
      "uz": "Bamyan kartoshkasi",
      "ar": "بطاطس باميان",
      "zh": "巴米扬土豆"
    },
    "specification": {
      "en": "Washed/unwashed",
      "fa": "شسته/شسته نشده",
      "ps": "مینځل شوی / نه مینځل شوی",
      "ru": "Мытый/немытый",
      "uz": "Yuvilgan / yuvilmagan",
      "ar": "مغسول/غير مغسول",
      "zh": "已洗/未洗"
    },
    "unit": "KG",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-071",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Tomatoes",
      "fa": "گوجه فرنگی",
      "ps": "روميان",
      "ru": "Помидоры",
      "uz": "Pomidorlar",
      "ar": "الطماطم",
      "zh": "西红柿"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-072",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Cucumbers",
      "fa": "خیار",
      "ps": "ککرۍ",
      "ru": "Огурцы",
      "uz": "Bodring",
      "ar": "خيار",
      "zh": "黄瓜"
    },
    "specification": {
      "en": "Fresh",
      "fa": "تازه",
      "ps": "تازه",
      "ru": "Свежий",
      "uz": "Yangi",
      "ar": "طازج",
      "zh": "新鲜的"
    },
    "unit": "KG",
    "moq": "3 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-073",
    "originCountry": "AF",
    "categoryId": "agricultural-products",
    "name": {
      "en": "Sun-Dried Tomatoes",
      "fa": "بادنجان رومی خشک",
      "ps": "د لمر وچ شوي روميان",
      "ru": "Вяленые помидоры",
      "uz": "Quyoshda quritilgan pomidorlar",
      "ar": "الطماطم المجففة بالشمس",
      "zh": "晒干的西红柿"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-074",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Local Wheat",
      "fa": "گندم محلی",
      "ps": "محلي غنم",
      "ru": "Местная пшеница",
      "uz": "Mahalliy bug'doy",
      "ar": "القمح المحلي",
      "zh": "当地小麦"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-075",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Local Wheat Flour",
      "fa": "آرد گندم محلی",
      "ps": "د محلي غنمو اوړه",
      "ru": "Местная пшеничная мука",
      "uz": "Mahalliy bug'doy uni",
      "ar": "دقيق القمح المحلي",
      "zh": "当地小麦粉"
    },
    "specification": {
      "en": "50 kg bags",
      "fa": "کیسه های 50 کیلویی",
      "ps": "50 کیلو ګرامه کڅوړه",
      "ru": "мешки по 50 кг.",
      "uz": "50 kg sumkalar",
      "ar": "أكياس 50 كجم",
      "zh": "50公斤袋装"
    },
    "unit": "MT",
    "moq": "10 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-076",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Barley",
      "fa": "جو",
      "ps": "وربشی",
      "ru": "Ячмень",
      "uz": "Arpa",
      "ar": "الشعير",
      "zh": "大麦"
    },
    "specification": {
      "en": "Feed/food",
      "fa": "خوراک/غذا",
      "ps": "خواړه / خواړه",
      "ru": "Корм/еда",
      "uz": "Oziq-ovqat / ovqat",
      "ar": "تغذية / طعام",
      "zh": "饲料/食品"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-077",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Corn",
      "fa": "ذرت",
      "ps": "جوار",
      "ru": "Кукуруза",
      "uz": "Makkajo'xori",
      "ar": "حبوب ذرة",
      "zh": "玉米"
    },
    "specification": {
      "en": "Feed/food",
      "fa": "خوراک/غذا",
      "ps": "خواړه / خواړه",
      "ru": "Корм/еда",
      "uz": "Oziq-ovqat / ovqat",
      "ar": "تغذية / طعام",
      "zh": "饲料/食品"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-078",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Local Rice",
      "fa": "برنج محلی",
      "ps": "ځايي وريجې",
      "ru": "Местный рис",
      "uz": "Mahalliy guruch",
      "ar": "الأرز المحلي",
      "zh": "当地大米"
    },
    "specification": {
      "en": "Variety dependent",
      "fa": "وابسته به تنوع",
      "ps": "په ډول پورې اړه لري",
      "ru": "Зависит от сорта",
      "uz": "Turli xillikka bog'liq",
      "ar": "يعتمد التنوع",
      "zh": "品种依赖"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-079",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Chickpeas",
      "fa": "نخود",
      "ps": "مرغۍ",
      "ru": "Нут",
      "uz": "No'xat",
      "ar": "الحمص",
      "zh": "鹰嘴豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-080",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Lentils",
      "fa": "عدس",
      "ps": "دانه",
      "ru": "Чечевица",
      "uz": "Yasmiq",
      "ar": "العدس",
      "zh": "扁豆"
    },
    "specification": {
      "en": "Whole/split",
      "fa": "کل / تقسیم",
      "ps": "ټول / ویشل",
      "ru": "Целое/разделенное",
      "uz": "Butun/bo'lingan",
      "ar": "كامل/انقسام",
      "zh": "整体/分割"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-081",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Red Beans",
      "fa": "لوبیا سرخ",
      "ps": "سور لوبیا",
      "ru": "Красная фасоль",
      "uz": "Qizil loviya",
      "ar": "الفاصوليا الحمراء",
      "zh": "红豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-082",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "White Beans",
      "fa": "لوبیا سفید",
      "ps": "سپين لوبيا",
      "ru": "Белая фасоль",
      "uz": "Oq loviya",
      "ar": "الفاصوليا البيضاء",
      "zh": "白豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-083",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Mung Beans",
      "fa": "ماش",
      "ps": "د منګ لوبیا",
      "ru": "Бобы мунг",
      "uz": "Mung loviya",
      "ar": "مونج الفول",
      "zh": "绿豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-084",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Dried Fava Beans",
      "fa": "باقلا خشک",
      "ps": "وچ شوي فاوا لوبیا",
      "ru": "Фава сушеная фасоль",
      "uz": "Quritilgan fava loviya",
      "ar": "الفول المدمس المجفف",
      "zh": "干蚕豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-085",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Dried Green Peas",
      "fa": "نخود سبز خشک",
      "ps": "وچې شنه نخود",
      "ru": "Сушеный зеленый горошек",
      "uz": "Quritilgan yashil no'xat",
      "ar": "البازلاء الخضراء المجففة",
      "zh": "干青豆"
    },
    "specification": {
      "en": "Food grade",
      "fa": "درجه غذا",
      "ps": "د خوړو درجه",
      "ru": "Пищевой класс",
      "uz": "Oziq-ovqat darajasi",
      "ar": "درجة الغذاء",
      "zh": "食品级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-086",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Sesame Seeds",
      "fa": "کنجد",
      "ps": "د سیسم تخم",
      "ru": "Семена кунжута",
      "uz": "Susan urug'lari",
      "ar": "بذور السمسم",
      "zh": "芝麻"
    },
    "specification": {
      "en": "Cleaned",
      "fa": "تمیز شد",
      "ps": "پاک شوی",
      "ru": "Очищенный",
      "uz": "Tozalangan",
      "ar": "تنظيفها",
      "zh": "已清洁"
    },
    "unit": "MT",
    "moq": "2 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-087",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Sunflower Seeds",
      "fa": "تخم آفتابگردان",
      "ps": "د لمر ګل تخم",
      "ru": "Семена подсолнечника",
      "uz": "Ayçiçek urug'lari",
      "ar": "بذور عباد الشمس",
      "zh": "葵花籽"
    },
    "specification": {
      "en": "Oil/snack grade",
      "fa": "درجه روغن / میان وعده",
      "ps": "د تیلو / ناشته درجه",
      "ru": "Масло/закуска",
      "uz": "Yog '/snack darajasi",
      "ar": "درجة الزيت/الوجبة الخفيفة",
      "zh": "油/零食级"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-088",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Local Sesame Oil",
      "fa": "روغن کنجد محلی",
      "ps": "د محلي سیسم غوړ",
      "ru": "Местное кунжутное масло",
      "uz": "Mahalliy kunjut yog'i",
      "ar": "زيت السمسم المحلي",
      "zh": "当地芝麻油"
    },
    "specification": {
      "en": "Cold pressed",
      "fa": "پرس سرد",
      "ps": "سړه فشار",
      "ru": "Холодного прессования",
      "uz": "Sovuq presslangan",
      "ar": "معصور على البارد",
      "zh": "冷压"
    },
    "unit": "KG",
    "moq": "200 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-089",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Traditional Ghee",
      "fa": "روغن زرد حیوانی",
      "ps": "دودیز غوړي",
      "ru": "Традиционное гхи",
      "uz": "An'anaviy gi",
      "ar": "السمن التقليدي",
      "zh": "传统酥油"
    },
    "specification": {
      "en": "Cow/sheep",
      "fa": "گاو/گوسفند",
      "ps": "غوا/ پسه",
      "ru": "Корова/овца",
      "uz": "Sigir / qo'y",
      "ar": "بقرة / خروف",
      "zh": "牛/羊"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-090",
    "originCountry": "AF",
    "categoryId": "food-staples",
    "name": {
      "en": "Natural Honey",
      "fa": "عسل طبیعی",
      "ps": "طبیعي شات",
      "ru": "Натуральный мед",
      "uz": "Tabiiy asal",
      "ar": "العسل الطبيعي",
      "zh": "天然蜂蜜"
    },
    "specification": {
      "en": "Floral/wild",
      "fa": "گلی/وحشی",
      "ps": "ګلان / ځنګلي",
      "ru": "Цветочный/дикий",
      "uz": "Gulli/yovvoyi",
      "ar": "الأزهار / البرية",
      "zh": "花香/野味"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Food Products.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-091",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Herati Handwoven Carpet",
      "fa": "قالین دست‌باف هراتی",
      "ps": "هراتي لاسي غالۍ",
      "ru": "Ковер ручной работы Герати",
      "uz": "Herati qo'lda to'qilgan gilam",
      "ar": "سجادة هيراتي منسوجة يدوياً",
      "zh": "Herati 手织地毯"
    },
    "specification": {
      "en": "Knot/quality dependent",
      "fa": "وابسته به گره/کیفیت",
      "ps": "غوټۍ/ کیفیت پورې اړه لري",
      "ru": "Зависит от узла/качества",
      "uz": "Tugun/sifatga bog'liq",
      "ar": "عقدة/الجودة تعتمد",
      "zh": "取决于结/质量"
    },
    "unit": "M2",
    "moq": "20 m2",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-092",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Turkmen Handwoven Carpet",
      "fa": "قالین دست‌باف ترکمنی",
      "ps": "د ترکمن په لاس اوبدل شوې غالۍ",
      "ru": "Туркменский ковер ручной работы",
      "uz": "Turkman qo'lda to'qilgan gilam",
      "ar": "سجاد تركماني منسوج يدوياً",
      "zh": "土库曼手工编织地毯"
    },
    "specification": {
      "en": "Knot/quality dependent",
      "fa": "وابسته به گره/کیفیت",
      "ps": "غوټۍ/ کیفیت پورې اړه لري",
      "ru": "Зависит от узла/качества",
      "uz": "Tugun/sifatga bog'liq",
      "ar": "عقدة/الجودة تعتمد",
      "zh": "取决于结/质量"
    },
    "unit": "M2",
    "moq": "20 m2",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-093",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Baluchi Carpet",
      "fa": "قالین بلوچی",
      "ps": "بلوڅي غالۍ",
      "ru": "Белуджский ковер",
      "uz": "Baluchi gilami",
      "ar": "السجاد البلوشي",
      "zh": "俾路支地毯"
    },
    "specification": {
      "en": "Handwoven",
      "fa": "دست بافته",
      "ps": "لاسي",
      "ru": "Ручная работа",
      "uz": "Qo'lda to'qilgan",
      "ar": "منسوجة يدوياً",
      "zh": "手工编织"
    },
    "unit": "M2",
    "moq": "20 m2",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-094",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Kilim",
      "fa": "گلیم",
      "ps": "کلیم",
      "ru": "Килим",
      "uz": "Kilim",
      "ar": "الكليم",
      "zh": "基里姆"
    },
    "specification": {
      "en": "Handwoven",
      "fa": "دست بافته",
      "ps": "لاسي",
      "ru": "Ручная работа",
      "uz": "Qo'lda to'qilgan",
      "ar": "منسوجة يدوياً",
      "zh": "手工编织"
    },
    "unit": "M2",
    "moq": "50 m2",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-095",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Felt Rug",
      "fa": "نمد",
      "ps": "د غالۍ احساس",
      "ru": "Войлочный ковер",
      "uz": "Kigiz gilam",
      "ar": "سجادة اللباد",
      "zh": "毛毡地毯"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "M2",
    "moq": "50 m2",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-096",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Afghan Chapan",
      "fa": "چپن افغانی",
      "ps": "افغان چپن",
      "ru": "Афганский Чапан",
      "uz": "Afg'on Chopani",
      "ar": "شابان الأفغاني",
      "zh": "阿富汗查潘"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "50 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-097",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Men's Perahan Tunban",
      "fa": "پیراهن و تنبان مردانه",
      "ps": "د نارینه پیرهان تونبان",
      "ru": "Мужской перахан тунбан",
      "uz": "Erkaklar Perahan Tunban",
      "ar": "بيراهان تونبان للرجال",
      "zh": "男子 Perahan Tunban"
    },
    "specification": {
      "en": "Cotton/poly",
      "fa": "پنبه/پلی",
      "ps": "پنبه/پولي",
      "ru": "Хлопок/полиэтилен",
      "uz": "Paxta/poli",
      "ar": "قطن/بولي",
      "zh": "棉/涤"
    },
    "unit": "Set",
    "moq": "200 sets",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-098",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Women's Afghan Dress",
      "fa": "لباس افغانی زنانه",
      "ps": "د ښځو افغاني جامې",
      "ru": "Женское афганское платье",
      "uz": "Afg'on ayollar libosi",
      "ar": "اللباس الأفغاني النسائي",
      "zh": "女式阿富汗连衣裙"
    },
    "specification": {
      "en": "Hand embroidery",
      "fa": "گلدوزی با دست",
      "ps": "لاسي ګنډل",
      "ru": "Ручная вышивка",
      "uz": "Qo'lda kashta tikish",
      "ar": "التطريز اليدوي",
      "zh": "手工刺绣"
    },
    "unit": "Piece",
    "moq": "50 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-099",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Karakul Hat",
      "fa": "کلاه قره‌قل",
      "ps": "د کارکول خولۍ",
      "ru": "Каракульская шапка",
      "uz": "Qorako'l qalpoq",
      "ar": "قبعة كاراكول",
      "zh": "卡拉库尔帽子"
    },
    "specification": {
      "en": "Natural/faux",
      "fa": "طبیعی / مصنوعی",
      "ps": "طبیعي / غلط",
      "ru": "Натуральный/искусственный",
      "uz": "Tabiiy/soxta",
      "ar": "طبيعي/صناعي",
      "zh": "天然/人造"
    },
    "unit": "Piece",
    "moq": "50 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-100",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Pakol Hat",
      "fa": "پکول",
      "ps": "پاکول خولۍ",
      "ru": "Пакол Шляпа",
      "uz": "Pakol shlyapa",
      "ar": "قبعة باكول",
      "zh": "帕科尔帽子"
    },
    "specification": {
      "en": "Wool",
      "fa": "پشم",
      "ps": "وړۍ",
      "ru": "Шерсть",
      "uz": "Jun",
      "ar": "صوف",
      "zh": "羊毛"
    },
    "unit": "Piece",
    "moq": "200 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-101",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Wool Shawl",
      "fa": "شال پشمی",
      "ps": "وړۍ شال",
      "ru": "Шерстяная шаль",
      "uz": "Jun ro'mol",
      "ar": "شال صوف",
      "zh": "羊毛披肩"
    },
    "specification": {
      "en": "Handwoven",
      "fa": "دست بافته",
      "ps": "لاسي",
      "ru": "Ручная работа",
      "uz": "Qo'lda to'qilgan",
      "ar": "منسوجة يدوياً",
      "zh": "手工编织"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-102",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Silk Scarf",
      "fa": "شال ابریشمی",
      "ps": "ورېښمو سکارف",
      "ru": "Шелковый шарф",
      "uz": "Ipak sharf",
      "ar": "وشاح حريري",
      "zh": "真丝围巾"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-103",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Tanned Leather",
      "fa": "چرم دباغی‌شده",
      "ps": "رنګ شوی چرمی",
      "ru": "Дубленая кожа",
      "uz": "Tanlangan teri",
      "ar": "الجلود المدبوغة",
      "zh": "鞣制皮革"
    },
    "specification": {
      "en": "Goat/cow",
      "fa": "بز/گاو",
      "ps": "وزه/ غوا",
      "ru": "Коза/корова",
      "uz": "Echki / sigir",
      "ar": "الماعز / البقرة",
      "zh": "山羊/牛"
    },
    "unit": "M2",
    "moq": "200 m2",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-104",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Handmade Leather Boots",
      "fa": "بوت چرمی دست‌دوز",
      "ps": "د لاس جوړ چرمی بوټان",
      "ru": "Кожаные Сапоги Ручной Работы",
      "uz": "Qo'lda ishlangan charm etiklar",
      "ar": "الأحذية الجلدية المصنوعة يدويا",
      "zh": "手工皮靴"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Pair",
    "moq": "100 pairs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-105",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Leather Bag",
      "fa": "کیف چرمی",
      "ps": "د چرم کڅوړه",
      "ru": "Кожаная сумка",
      "uz": "Teri sumkasi",
      "ar": "حقيبة جلدية",
      "zh": "皮包"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-106",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Embroidered Bag",
      "fa": "کیف گلدوزی",
      "ps": "ګنډل شوې کڅوړه",
      "ru": "Вышитая сумка",
      "uz": "Naqshli sumka",
      "ar": "حقيبة مطرزة",
      "zh": "绣花袋"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "200 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-107",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Embroidered Cushion Cover",
      "fa": "روکش بالشت سوزن‌دوزی",
      "ps": "ګنډل شوي کشن پوښ",
      "ru": "Вышитый чехол на подушку",
      "uz": "Naqshli yostiq qoplamasi",
      "ar": "غطاء وسادة مطرز",
      "zh": "刺绣靠垫套"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "300 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-108",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Embroidered Tablecloth",
      "fa": "رومیزی گلدوزی",
      "ps": "ګنډل شوي میز کالي",
      "ru": "Вышитая скатерть",
      "uz": "Naqshli dasturxon",
      "ar": "مفرش المائدة المطرزة",
      "zh": "绣花桌布"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-109",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Copperware",
      "fa": "ظروف مسی",
      "ps": "د مسو سامان",
      "ru": "Медная посуда",
      "uz": "Mis buyumlar",
      "ar": "النحاسيات",
      "zh": "铜器"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-110",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Brassware",
      "fa": "ظروف برنجی",
      "ps": "پیتل",
      "ru": "изделия из латуни",
      "uz": "Guruch buyumlari",
      "ar": "أدوات نحاسية",
      "zh": "黄铜器皿"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "KG",
    "moq": "100 KG",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-111",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Turquoise Stone",
      "fa": "فیروزه نیشابوری/افغان",
      "ps": "فیروزي ډبره",
      "ru": "Бирюзовый камень",
      "uz": "Turkuaz tosh",
      "ar": "حجر الفيروز",
      "zh": "绿松石"
    },
    "specification": {
      "en": "Grade dependent",
      "fa": "وابسته به درجه",
      "ps": "د درجې پورې اړه لري",
      "ru": "Зависит от оценки",
      "uz": "Darsga bog'liq",
      "ar": "تعتمد الدرجة",
      "zh": "取决于年级"
    },
    "unit": "Gram",
    "moq": "100 g",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-112",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Raw Lapis Lazuli",
      "fa": "لاجورد بدخشان خام",
      "ps": "خام لاپیس لازولی",
      "ru": "Сырой лазурит",
      "uz": "Xom Lapis Lazuli",
      "ar": "اللازورد الخام",
      "zh": "生青金石"
    },
    "specification": {
      "en": "Grade dependent",
      "fa": "وابسته به درجه",
      "ps": "د درجې پورې اړه لري",
      "ru": "Зависит от оценки",
      "uz": "Darsga bog'liq",
      "ar": "تعتمد الدرجة",
      "zh": "取决于年级"
    },
    "unit": "KG",
    "moq": "50 KG",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-113",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Cut Lapis Lazuli",
      "fa": "لاجورد تراش‌خورده",
      "ps": "Lapis Lazuli پرې کړئ",
      "ru": "Огранка лазурита",
      "uz": "Lapis Lazulini kesib oling",
      "ar": "قطع اللازورد",
      "zh": "切割青金石"
    },
    "specification": {
      "en": "Polished/cut",
      "fa": "جلا/برش",
      "ps": "پالش / پرې کول",
      "ru": "Полированный/разрезанный",
      "uz": "Jilolangan/kesilgan",
      "ar": "مصقول / قطع",
      "zh": "抛光/切割"
    },
    "unit": "KG",
    "moq": "10 KG",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-114",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Lapis Jewelry",
      "fa": "زیورآلات لاجورد",
      "ps": "د لاپیس زیورات",
      "ru": "Ювелирные изделия из ляписа",
      "uz": "Lapis zargarlik buyumlari",
      "ar": "مجوهرات اللازورد",
      "zh": "青金石首饰"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-115",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Silver Jewelry",
      "fa": "زیورآلات نقره",
      "ps": "د سرو زرو ګاڼې",
      "ru": "Серебряные украшения",
      "uz": "Kumush taqinchoqlar",
      "ar": "مجوهرات فضية",
      "zh": "银首饰"
    },
    "specification": {
      "en": "925 silver + workmanship",
      "fa": "نقره 925 + طرز کار",
      "ps": "925 د سپینو زرو + کاریگری",
      "ru": "Серебро 925 + качество изготовления",
      "uz": "925 kumush + mahorat",
      "ar": "925 فضة + صناعه",
      "zh": "925银+做工"
    },
    "unit": "Gram",
    "moq": "500 g",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-116",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Gemstone Beads",
      "fa": "مهره‌های سنگی",
      "ps": "د قیمتي ډبرو موتی",
      "ru": "Бусины из драгоценных камней",
      "uz": "Qimmatbaho tosh boncuklar",
      "ar": "حبات الأحجار الكريمة",
      "zh": "宝石珠"
    },
    "specification": {
      "en": "Stone dependent",
      "fa": "وابسته به سنگ",
      "ps": "د ډبرې انحصار",
      "ru": "Камень зависит",
      "uz": "Toshga bog'liq",
      "ar": "يعتمد على الحجر",
      "zh": "石头依赖"
    },
    "unit": "String",
    "moq": "100 strings",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-117",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Wooden Handicrafts",
      "fa": "صنایع دستی چوبی",
      "ps": "د لرګیو لاسي صنایع",
      "ru": "Деревянные изделия ручной работы",
      "uz": "Yog'ochdan yasalgan qo'l san'atlari",
      "ar": "الحرف اليدوية الخشبية",
      "zh": "木制工艺品"
    },
    "specification": {
      "en": "Carved",
      "fa": "کنده کاری شده",
      "ps": "نقاشي",
      "ru": "Резной",
      "uz": "Oʻyilgan",
      "ar": "منحوتة",
      "zh": "雕刻"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-118",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Afghan Miniature Art",
      "fa": "مینیاتور افغانی",
      "ps": "د افغاني مینیچر هنر",
      "ru": "Афганское миниатюрное искусство",
      "uz": "Afg'on miniatyura san'ati",
      "ar": "الفن الأفغاني المصغر",
      "zh": "阿富汗微型艺术"
    },
    "specification": {
      "en": "Hand-painted",
      "fa": "نقاشی شده با دست",
      "ps": "لاسي رنګ شوی",
      "ru": "Ручная роспись",
      "uz": "Qo'lda bo'yalgan",
      "ar": "مرسومة باليد",
      "zh": "手绘"
    },
    "unit": "Piece",
    "moq": "20 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-119",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Pottery",
      "fa": "سفالینه",
      "ps": "لوښي",
      "ru": "Керамика",
      "uz": "Kulolchilik",
      "ar": "الفخار",
      "zh": "陶器"
    },
    "specification": {
      "en": "Handmade",
      "fa": "دست ساز",
      "ps": "لاس جوړ شوی",
      "ru": "Ручной работы",
      "uz": "Qo'lda ishlangan",
      "ar": "صناعة يدوية",
      "zh": "手工制作的"
    },
    "unit": "Piece",
    "moq": "200 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-120",
    "originCountry": "AF",
    "categoryId": "textiles-handicrafts",
    "name": {
      "en": "Woven Basket",
      "fa": "سبد بافته‌شده",
      "ps": "اوبدل شوی ټوکر",
      "ru": "Тканая корзина",
      "uz": "To'qilgan savat",
      "ar": "سلة منسوجة",
      "zh": "编织篮"
    },
    "specification": {
      "en": "Natural fiber",
      "fa": "فیبر طبیعی",
      "ps": "طبیعي فایبر",
      "ru": "Натуральное волокно",
      "uz": "Tabiiy tola",
      "ar": "الألياف الطبيعية",
      "zh": "天然纤维"
    },
    "unit": "Piece",
    "moq": "200 pcs",
    "representativeImage": "/card_images/row1/Textile and clothing.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-121",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Afghan Raw Cotton",
      "fa": "پنبه خام افغانستان",
      "ps": "افغان خام پنبه",
      "ru": "Афганский хлопок-сырец",
      "uz": "Afg'on paxta xomashyosi",
      "ar": "القطن الخام الأفغاني",
      "zh": "阿富汗原棉"
    },
    "specification": {
      "en": "Grade dependent",
      "fa": "وابسته به درجه",
      "ps": "د درجې پورې اړه لري",
      "ru": "Зависит от оценки",
      "uz": "Darsga bog'liq",
      "ar": "تعتمد الدرجة",
      "zh": "取决于年级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-122",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Sheep Wool",
      "fa": "پشم گوسفند",
      "ps": "د پسونو وړۍ",
      "ru": "Овечья шерсть",
      "uz": "Qo'y jun",
      "ar": "صوف الأغنام",
      "zh": "绵羊毛"
    },
    "specification": {
      "en": "Washed/unwashed",
      "fa": "شسته/شسته نشده",
      "ps": "مینځل شوی / نه مینځل شوی",
      "ru": "Мытый/немытый",
      "uz": "Yuvilgan / yuvilmagan",
      "ar": "مغسول/غير مغسول",
      "zh": "已洗/未洗"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-123",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Karakul Pelts",
      "fa": "پوست قره‌قل",
      "ps": "د کاراکول پټۍ",
      "ru": "Каракульские шкурки",
      "uz": "Qorako'l terilari",
      "ar": "جلود كاراكول",
      "zh": "卡拉库尔毛皮"
    },
    "specification": {
      "en": "Grade dependent",
      "fa": "وابسته به درجه",
      "ps": "د درجې پورې اړه لري",
      "ru": "Зависит от оценки",
      "uz": "Darsga bog'liq",
      "ar": "تعتمد الدرجة",
      "zh": "取决于年级"
    },
    "unit": "Piece",
    "moq": "100 pcs",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-124",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Goat Hides",
      "fa": "پوست بز",
      "ps": "وزه پټوي",
      "ru": "Козья шкура",
      "uz": "Echki terisi",
      "ar": "جلود الماعز",
      "zh": "山羊皮"
    },
    "specification": {
      "en": "Salted/raw",
      "fa": "شور/خام",
      "ps": "مالګه / خام",
      "ru": "Соленый/сырой",
      "uz": "Tuzlangan / xom",
      "ar": "مملح / خام",
      "zh": "咸/生"
    },
    "unit": "Piece",
    "moq": "500 pcs",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-125",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Cow Hides",
      "fa": "پوست گاو",
      "ps": "د غوا پټول",
      "ru": "Коровьи шкуры",
      "uz": "Sigir terisi",
      "ar": "جلود البقر",
      "zh": "牛皮"
    },
    "specification": {
      "en": "Salted/raw",
      "fa": "شور/خام",
      "ps": "مالګه / خام",
      "ru": "Соленый/сырой",
      "uz": "Tuzlangan / xom",
      "ar": "مملح / خام",
      "zh": "咸/生"
    },
    "unit": "Piece",
    "moq": "200 pcs",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-126",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Herat Marble",
      "fa": "سنگ مرمر هرات",
      "ps": "د هرات مرمر",
      "ru": "Гератский мрамор",
      "uz": "Hirot marmar",
      "ar": "هيرات للرخام",
      "zh": "赫拉特大理石"
    },
    "specification": {
      "en": "Slab/tile",
      "fa": "دال / کاشی",
      "ps": "سلیب / ټایل",
      "ru": "Плита/плитка",
      "uz": "Plitka / plitka",
      "ar": "بلاطة / بلاط",
      "zh": "板/瓦"
    },
    "unit": "M2",
    "moq": "500 m2",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-127",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Nangarhar Marble",
      "fa": "سنگ مرمر ننگرهار",
      "ps": "د ننګرهار مرمر",
      "ru": "Нангархарский мрамор",
      "uz": "Nangarhar marmar",
      "ar": "ننكرهار للرخام",
      "zh": "楠格哈尔大理石"
    },
    "specification": {
      "en": "Slab/tile",
      "fa": "دال / کاشی",
      "ps": "سلیب / ټایل",
      "ru": "Плита/плитка",
      "uz": "Plitka / plitka",
      "ar": "بلاطة / بلاط",
      "zh": "板/瓦"
    },
    "unit": "M2",
    "moq": "500 m2",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-128",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Travertine Stone",
      "fa": "تراورتن",
      "ps": "Travertine ډبره",
      "ru": "Травертиновый камень",
      "uz": "Travertin tosh",
      "ar": "حجر الترافرتين",
      "zh": "洞石"
    },
    "specification": {
      "en": "Cut slabs",
      "fa": "اسلب ها را برش دهید",
      "ps": "سلیبونه پرې کړئ",
      "ru": "Разрезанные плиты",
      "uz": "Plitalarni kesib oling",
      "ar": "قطع الألواح",
      "zh": "切割板材"
    },
    "unit": "M2",
    "moq": "500 m2",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-129",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Raw Talc",
      "fa": "تالک خام",
      "ps": "خام ټالک",
      "ru": "Сырой тальк",
      "uz": "Xom talk",
      "ar": "التلك الخام",
      "zh": "滑石粉原料"
    },
    "specification": {
      "en": "Industrial grade",
      "fa": "درجه صنعتی",
      "ps": "صنعتي درجه",
      "ru": "Промышленный класс",
      "uz": "Sanoat darajasi",
      "ar": "الصف الصناعي",
      "zh": "工业级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-130",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Talc Powder",
      "fa": "تالک پودر",
      "ps": "د تالک پوډر",
      "ru": "Тальк Порошок",
      "uz": "Talk kukuni",
      "ar": "بودرة التلك",
      "zh": "滑石粉"
    },
    "specification": {
      "en": "Micronized",
      "fa": "میکرونیزه",
      "ps": "مایکرون شوی",
      "ru": "Микронизированный",
      "uz": "Mikronlashtirilgan",
      "ar": "ميكرون",
      "zh": "微粉化"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-131",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Chromite Ore",
      "fa": "کرومیت",
      "ps": "کرومایټ ایسک",
      "ru": "Хромитовая руда",
      "uz": "Xromit rudasi",
      "ar": "خام الكروميت",
      "zh": "铬铁矿矿石"
    },
    "specification": {
      "en": "Cr content dependent",
      "fa": "وابسته به محتوای C",
      "ps": "د Cr منځپانګې پورې اړه لري",
      "ru": "Cr зависит от контента",
      "uz": "Cr tarkibiga bog'liq",
      "ar": "يعتمد محتوى الكروم",
      "zh": "Cr 含量相关"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-132",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Coal",
      "fa": "زغال سنگ",
      "ps": "سکاره",
      "ru": "Уголь",
      "uz": "Ko'mir",
      "ar": "الفحم",
      "zh": "煤炭"
    },
    "specification": {
      "en": "Thermal grade",
      "fa": "درجه حرارتی",
      "ps": "د حرارت درجه",
      "ru": "Термический класс",
      "uz": "Issiqlik darajasi",
      "ar": "الدرجة الحرارية",
      "zh": "耐热等级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-133",
    "originCountry": "AF",
    "categoryId": "industrial-materials",
    "name": {
      "en": "Rock Salt",
      "fa": "نمک سنگی",
      "ps": "د ډبرې مالګه",
      "ru": "Каменная соль",
      "uz": "Tosh tuzi",
      "ar": "الملح الصخري",
      "zh": "岩盐"
    },
    "specification": {
      "en": "Food/industrial",
      "fa": "غذایی/صنعتی",
      "ps": "خواړه / صنعتي",
      "ru": "Пищевая/промышленная промышленность",
      "uz": "Oziq-ovqat/sanoat",
      "ar": "الغذائية/الصناعية",
      "zh": "食品/工业"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/row1/industrial low materials.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-134",
    "originCountry": "AF",
    "categoryId": "construction-materials",
    "name": {
      "en": "Fired Clay Bricks",
      "fa": "آجر پخته",
      "ps": "د خټو خښتو توغول شوي",
      "ru": "Обожженные глиняные кирпичи",
      "uz": "Pishgan loy g'ishtlari",
      "ar": "الطوب الطيني المحروق",
      "zh": "粘土砖"
    },
    "specification": {
      "en": "Standard size",
      "fa": "اندازه استاندارد",
      "ps": "معیاري اندازه",
      "ru": "Стандартный размер",
      "uz": "Standart o'lcham",
      "ar": "الحجم القياسي",
      "zh": "标准尺寸"
    },
    "unit": "1000 pcs",
    "moq": "10,000 pcs",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-135",
    "originCountry": "AF",
    "categoryId": "construction-materials",
    "name": {
      "en": "Construction Gypsum",
      "fa": "گچ ساختمانی",
      "ps": "ساختماني جپسم",
      "ru": "Строительный гипс",
      "uz": "Qurilish gipsi",
      "ar": "الجبس البناء",
      "zh": "建筑石膏"
    },
    "specification": {
      "en": "Bagged",
      "fa": "کیسه دار",
      "ps": "کڅوړه",
      "ru": "в мешках",
      "uz": "Qoplangan",
      "ar": "معبأ",
      "zh": "袋装"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-136",
    "originCountry": "AF",
    "categoryId": "construction-materials",
    "name": {
      "en": "Afghan-Made Cement",
      "fa": "سمنت تولید افغانستان",
      "ps": "افغان جوړ شوی سمنټو",
      "ru": "Цемент афганского производства",
      "uz": "Afg'onistonda ishlab chiqarilgan sement",
      "ar": "الاسمنت الافغاني الصنع",
      "zh": "阿富汗制造的水泥"
    },
    "specification": {
      "en": "42.5 grade",
      "fa": "درجه 42.5",
      "ps": "42.5 درجه",
      "ru": "42,5 класс",
      "uz": "42,5 daraja",
      "ar": "42.5 درجة",
      "zh": "42.5级"
    },
    "unit": "MT",
    "moq": "20 MT",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-137",
    "originCountry": "AF",
    "categoryId": "construction-materials",
    "name": {
      "en": "Sand and Gravel",
      "fa": "شن و جغل",
      "ps": "شګه او جغل",
      "ru": "Песок и Гравий",
      "uz": "Qum va shag'al",
      "ar": "الرمال والحصى",
      "zh": "沙子和砾石"
    },
    "specification": {
      "en": "Delivered locally",
      "fa": "تحویل محلی",
      "ps": "په ځایی توګه تحویل شوی",
      "ru": "Доставка на месте",
      "uz": "Mahalliy yetkazib beriladi",
      "ar": "سلمت محليا",
      "zh": "本地交付"
    },
    "unit": "M3",
    "moq": "100 m3",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-138",
    "originCountry": "AF",
    "categoryId": "construction-materials",
    "name": {
      "en": "Cut Building Stone",
      "fa": "سنگ ساختمانی تراش‌شده",
      "ps": "د ودانۍ ډبره پرې کړئ",
      "ru": "Вырезать строительный камень",
      "uz": "Qurilish toshini kesish",
      "ar": "قطع حجر البناء",
      "zh": "切割建筑石材"
    },
    "specification": {
      "en": "Various stones",
      "fa": "سنگ های مختلف",
      "ps": "مختلف ډبرې",
      "ru": "Различные камни",
      "uz": "Har xil toshlar",
      "ar": "حجارة مختلفة",
      "zh": "各种石头"
    },
    "unit": "M2",
    "moq": "300 m2",
    "representativeImage": "/card_images/extra/Construction Material.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-139",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Soft Drinks",
      "fa": "نوشابه تولید افغانستان",
      "ps": "افغاني نرم مشروبات",
      "ru": "Афганские безалкогольные напитки",
      "uz": "Afg'on gazlangan ichimliklar",
      "ar": "المشروبات الغازية الأفغانية",
      "zh": "阿富汗软饮料"
    },
    "specification": {
      "en": "PET/cans",
      "fa": "PET / قوطی",
      "ps": "PET / کین",
      "ru": "ПЭТ/банки",
      "uz": "PET / qutilar",
      "ar": "PET/علب",
      "zh": "聚酯/罐"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-140",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Mineral Water",
      "fa": "آب معدنی افغانستان",
      "ps": "افغان منرال اوبه",
      "ru": "Афганская минеральная вода",
      "uz": "Afg'on mineral suvi",
      "ar": "المياه المعدنية الأفغانية",
      "zh": "阿富汗矿泉水"
    },
    "specification": {
      "en": "6 x 1.5L",
      "fa": "6 × 1.5 لیتر",
      "ps": "6 x 1.5L",
      "ru": "6 х 1,5 л",
      "uz": "6 x 1,5 l",
      "ar": "6 × 1.5 لتر",
      "zh": "6×1.5升"
    },
    "unit": "Pack",
    "moq": "500 packs",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-141",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Biscuits",
      "fa": "بیسکویت تولید افغانستان",
      "ps": "افغانی بسکیټ",
      "ru": "Афганское печенье",
      "uz": "Afg'on pechene",
      "ar": "البسكويت الأفغاني",
      "zh": "阿富汗饼干"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-142",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Potato Chips",
      "fa": "چیپس کچالو",
      "ps": "د کچالو چپس",
      "ru": "Картофельные чипсы",
      "uz": "Kartoshka chiplari",
      "ar": "رقائق البطاطس",
      "zh": "薯片"
    },
    "specification": {
      "en": "Retail packs",
      "fa": "بسته های خرده فروشی",
      "ps": "پرچون بسته بندي",
      "ru": "Розничные упаковки",
      "uz": "Chakana savdo paketlari",
      "ar": "حزم البيع بالتجزئة",
      "zh": "零售包装"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-143",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Pasta",
      "fa": "ماکارونی تولید افغانستان",
      "ps": "افغان پاسته",
      "ru": "Афганская паста",
      "uz": "Afg'on makaron",
      "ar": "المعكرونة الأفغانية",
      "zh": "阿富汗面食"
    },
    "specification": {
      "en": "Retail/bulk",
      "fa": "خرده فروشی/فله",
      "ps": "پرچون/بلیک",
      "ru": "Розница/оптом",
      "uz": "Chakana / ommaviy",
      "ar": "التجزئة / السائبة",
      "zh": "零售/散装"
    },
    "unit": "MT",
    "moq": "5 MT",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-144",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Traditional Noodles",
      "fa": "رشته آش",
      "ps": "دودیز نوډل",
      "ru": "Традиционная лапша",
      "uz": "An'anaviy noodle",
      "ar": "الشعرية التقليدية",
      "zh": "传统面条"
    },
    "specification": {
      "en": "Dry noodles",
      "fa": "رشته فرنگی خشک",
      "ps": "وچ نوډل",
      "ru": "Сухая лапша",
      "uz": "Quruq noodle",
      "ar": "الشعرية الجافة",
      "zh": "干面条"
    },
    "unit": "KG",
    "moq": "500 KG",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-145",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Tomato Paste",
      "fa": "رب گوجه تولید افغانستان",
      "ps": "د افغاني ټماټو پیسټ",
      "ru": "Афганская томатная паста",
      "uz": "Afg'on tomat pastasi",
      "ar": "معجون الطماطم الأفغاني",
      "zh": "阿富汗番茄酱"
    },
    "specification": {
      "en": "Cans/jars",
      "fa": "قوطی / شیشه",
      "ps": "کین / جار",
      "ru": "Банки/баночки",
      "uz": "Bankalar / bankalar",
      "ar": "علب / الجرار",
      "zh": "罐/罐"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-146",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Fruit Jam",
      "fa": "مربای میوه",
      "ps": "د میوو جام",
      "ru": "Фруктовый джем",
      "uz": "Meva murabbosi",
      "ar": "مربى الفاكهة",
      "zh": "果酱"
    },
    "specification": {
      "en": "Local fruits",
      "fa": "میوه های محلی",
      "ps": "محلي میوې",
      "ru": "Местные фрукты",
      "uz": "Mahalliy mevalar",
      "ar": "الفواكه المحلية",
      "zh": "当地水果"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-147",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Mixed Pickles",
      "fa": "ترشی مخلوط",
      "ps": "مخلوط اچار",
      "ru": "Смешанные соленые огурцы",
      "uz": "Aralashtirilgan tuzlangan bodring",
      "ar": "مخللات مشكلة",
      "zh": "混合泡菜"
    },
    "specification": {
      "en": "Jars",
      "fa": "کوزه ها",
      "ps": "جار",
      "ru": "Банки",
      "uz": "Idishlar",
      "ar": "الجرار",
      "zh": "罐子"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-148",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Soap",
      "fa": "صابون تولید افغانستان",
      "ps": "افغان صابون",
      "ru": "Афганское мыло",
      "uz": "Afg'on sovuni",
      "ar": "الصابون الأفغاني",
      "zh": "阿富汗肥皂"
    },
    "specification": {
      "en": "Bath/laundry",
      "fa": "حمام / لباسشویی",
      "ps": "حمام / کالي مینځل",
      "ru": "Баня/прачечная",
      "uz": "Hammom / kir yuvish",
      "ar": "حمام / مغسلة",
      "zh": "洗澡/洗衣"
    },
    "unit": "Carton",
    "moq": "200 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-149",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Dishwashing Liquid",
      "fa": "مایع ظرفشویی تولید افغانستان",
      "ps": "د افغاني لوښو مینځلو مایع",
      "ru": "Афганская жидкость для мытья посуды",
      "uz": "Afg'on idish yuvish uchun suyuqlik",
      "ar": "سائل غسيل الصحون الأفغاني",
      "zh": "阿富汗洗碗液"
    },
    "specification": {
      "en": "Retail bottles",
      "fa": "بطری های خرده فروشی",
      "ps": "پرچون بوتلونه",
      "ru": "Розничные бутылки",
      "uz": "Chakana butilkalar",
      "ar": "زجاجات البيع بالتجزئة",
      "zh": "零售瓶"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  },
  {
    "sku": "AF-150",
    "originCountry": "AF",
    "categoryId": "supermarket-goods",
    "name": {
      "en": "Afghan Tissue Paper",
      "fa": "دستمال کاغذی تولید افغانستان",
      "ps": "په افغانستان کې تولید شوي کاغذي دستمالونه",
      "ru": "Бумажные салфетки афганского производства",
      "uz": "Afg‘onistonda ishlab chiqarilgan qog‘oz salfetkalar",
      "ar": "المناديل الورقية الأفغانية",
      "zh": "阿富汗卫生纸"
    },
    "specification": {
      "en": "Various packs",
      "fa": "بسته های مختلف",
      "ps": "مختلف بسته بندي",
      "ru": "Различные пакеты",
      "uz": "Har xil paketlar",
      "ar": "حزم مختلفة",
      "zh": "各种包"
    },
    "unit": "Carton",
    "moq": "100 cartons",
    "representativeImage": "/card_images/extra/Textiles & Consumer Goods.png",
    "priceStatus": "RFQ_ONLY"
  }
] satisfies CatalogProduct[]
