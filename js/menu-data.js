/**
 * Quetta Arfat Hotel - Menu Catalog Data
 * 81 Authentic Karachi Chai, Desi Parathas, Food, and Refreshment Items
 */

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'paratha', name: 'Paratha' },
  { id: 'omelette', name: 'Omelette' },
  { id: 'rolls', name: 'Rolls' },
  { id: 'tea', name: 'Tea & Coffee' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'addons', name: 'Addons' }
];

const MENU_ITEMS = [
  // TEA & COFFEE
  {
    id: "milk-tea-cup",
    name: "Milk Tea Cup",
    nameUrdu: "دودھ چائے کپ",
    price: 120,
    category: "tea",
    description: "Classic Karak milk tea brewed with premium black tea and full cream milk.",
    image: "images/product1.png",
    isPopular: true
  },
  {
    id: "milk-tea-cream",
    name: "Milk Tea (Cream)",
    nameUrdu: "دودھ چائے کریم",
    price: 160,
    category: "tea",
    description: "Rich, velvety milk tea topped with a generous dollop of fresh thick cream.",
    image: "images/product2.png",
    isPopular: true
  },
  {
    id: "special-milk-tea",
    name: "Special Milk Tea",
    nameUrdu: "اسپیشل دودھ چائے",
    price: 160,
    category: "tea",
    description: "Special secret blend milk tea with fragrant spices and slow-cooked milk.",
    image: "images/product3.jpeg",
    isPopular: true
  },
  {
    id: "alamgir-special-tea",
    name: "Alamgir Special Tea",
    nameUrdu: "علمگیر اسپیشل چائے",
    price: 300,
    category: "tea",
    description: "Our legendary house signature tea with saffron essence, crushed almonds, and rich malai.",
    image: "images/product4.jpeg",
    isPopular: true
  },
  {
    id: "matka-tea",
    name: "Matka Tea",
    nameUrdu: "مٹکا چائے",
    price: 200,
    category: "tea",
    description: "Tandoor-baked earthenware clay pot tea infused with a rich smoky, earthy aroma.",
    image: "images/product19.jpeg",
    isPopular: true
  },
  {
    id: "cardamom-tea",
    name: "Cardamom Tea",
    nameUrdu: "الائچی چائے",
    price: 150,
    category: "tea",
    description: "Aromatic black tea simmered with freshly ground green cardamom pods.",
    image: "images/product6.jpeg",
    isPopular: true
  },
  {
    id: "sulemani-tea",
    name: "Sulemani Tea",
    nameUrdu: "سلیمانی چائے",
    price: 100,
    category: "tea",
    description: "Traditional golden spiced black tea with a squeeze of fresh lemon.",
    image: "images/product7.jpeg"
  },
  {
    id: "milk-gurr-tea",
    name: "Milk Gurr Tea",
    nameUrdu: "گڑ والی دودھ چائے",
    price: 150,
    category: "tea",
    description: "Wholesome Karak tea naturally sweetened with pure organic jaggery (gurr).",
    image: "images/product8.jpeg"
  },
  {
    id: "kashmiri-tea",
    name: "Kashmiri Tea",
    nameUrdu: "کشمیری چائے",
    price: 260,
    category: "tea",
    description: "Traditional slow-brewed pink tea garnished with chopped pistachios and almonds.",
    image: "images/product7.jpeg"
  },
  {
    id: "kashmiri-tea-cream",
    name: "Kashmiri Tea (Cream)",
    nameUrdu: "کشمیری چائے کریم",
    price: 300,
    category: "tea",
    description: "Authentic Kashmiri pink tea served extra creamy with fresh malai and nuts.",
    image: "images/product10.jpeg"
  },
  {
    id: "matka-kashmiri-tea",
    name: "Matka Kashmiri Tea",
    nameUrdu: "مٹکا کشمیری چائے",
    price: 300,
    category: "tea",
    description: "Pink Kashmiri chai served piping hot in traditional earthenware clay cups.",
    image: "images/product7.jpeg"
  },
  {
    id: "nutella-tea",
    name: "Nutella Tea",
    nameUrdu: "نوٹیلا چائے",
    price: 300,
    category: "tea",
    description: "Indulgent hazelnut-chocolate infused Karak chai for chocolate lovers.",
    image: "images/product12.jpeg"
  },
  {
    id: "special-honey-tea",
    name: "Special Honey Tea",
    nameUrdu: "شہد والی چائے",
    price: 200,
    category: "tea",
    description: "Smooth Karak chai sweetened with 100% pure mountain honey.",
    image: "images/product13.jpeg"
  },
  {
    id: "plain-tea",
    name: "Plain Tea",
    nameUrdu: "سادہ چائے",
    price: 70,
    category: "tea",
    description: "Light, everyday traditional home-style tea.",
    image: "images/product1.png"
  },
  {
    id: "special-green-tea",
    name: "Special Green Tea",
    nameUrdu: "اسپیشل گرین ٹی",
    price: 100,
    category: "tea",
    description: "Refreshing green tea leaves brewed with gentle aromatic herbs.",
    image: "images/product15.jpeg"
  },
  {
    id: "honey-green-kehwa",
    name: "Honey Green Kehwa",
    nameUrdu: "شہد قہوہ",
    price: 160,
    category: "tea",
    description: "Herbal green kehwa with fresh lemon, crushed cardamom, and natural honey.",
    image: "images/product14.jpeg"
  },
  {
    id: "special-gurr-green-tea",
    name: "Special Gurr Green Tea",
    nameUrdu: "گڑ گرین ٹی",
    price: 120,
    category: "tea",
    description: "Herbal green tea paired with rustic desi jaggery.",
    image: "images/product15.jpeg"
  },
  {
    id: "milk-kahwa",
    name: "Milk Kahwa",
    nameUrdu: "دودھ قہوہ",
    price: 180,
    category: "tea",
    description: "Pashtun style milk kehwa infused with cardamom, cinnamon, and saffron notes.",
    image: "images/product16.jpeg"
  },
  {
    id: "alamgir-special-coffee",
    name: "Alamgir Special Coffee",
    nameUrdu: "علمگیر اسپیشل کافی",
    price: 300,
    category: "tea",
    description: "Frothy, hand-beaten hot coffee made with rich steamed milk.",
    image: "images/product17.jpeg"
  },
  {
    id: "black-coffee",
    name: "Black Coffee",
    nameUrdu: "بلیک کافی",
    price: 180,
    category: "tea",
    description: "Bold and intense roasted black coffee for an instant energy boost.",
    image: "images/product18.jpeg"
  },
  {
    id: "alamgir-matka-coffee",
    name: "Alamgir Matka Coffee",
    nameUrdu: "علمگیر مٹکا کافی",
    price: 350,
    category: "tea",
    description: "Creamy beaten hot coffee served steaming hot in an earthy matka.",
    image: "images/product19.jpeg"
  },
  {
    id: "hot-milk",
    name: "Hot Milk",
    nameUrdu: "گرم دودھ",
    price: 100,
    category: "tea",
    description: "Fresh buffalo milk boiled with crushed cardamom.",
    image: "images/product20.jpeg"
  },

  // OMELETTE & EGG DISHES
  {
    id: "egg-omelette",
    name: "Egg Omelette",
    nameUrdu: "انڈے کا آملیٹ",
    price: 70,
    category: "omelette",
    description: "Fluffy desi omelette pan-fried with onions, green chilies, and fresh coriander.",
    image: "images/food1.jpeg"
  },
  {
    id: "egg-cheese-omelette",
    name: "Egg Cheese Omelette",
    nameUrdu: "چیز آملیٹ",
    price: 200,
    category: "omelette",
    description: "Melted cheddar and mozzarella cheese folded inside a golden spicy omelette.",
    image: "images/food2.jpeg"
  },
  {
    id: "egg-ghotala",
    name: "Egg Ghotala",
    nameUrdu: "انڈا گھوٹالہ",
    price: 320,
    category: "omelette",
    description: "Karachi's famous street specialty: spicy butter scrambled eggs mashed in rich tomato gravy.",
    image: "images/food3.jpeg"
  },
  {
    id: "chicken-omelette",
    name: "Chicken Omelette",
    nameUrdu: "چکن آملیٹ",
    price: 180,
    category: "omelette",
    description: "Savory omelette packed with shredded spiced chicken breast.",
    image: "images/food4.jpeg"
  },
  {
    id: "chicken-cheese-omelette",
    name: "Chicken Cheese Omelette",
    nameUrdu: "چکن چیز آملیٹ",
    price: 280,
    category: "omelette",
    description: "Gooey melted cheese combined with tender spiced chicken pieces in an omelette.",
    image: "images/food5.jpeg"
  },
  {
    id: "egg-paratha",
    name: "Egg Paratha",
    nameUrdu: "انڈا پراٹھا",
    price: 150,
    category: "omelette",
    description: "Crisp paratha with a seasoned egg coated and roasted on the crust.",
    image: "images/paratha8.jpeg"
  },
  {
    id: "egg-cheese-paratha",
    name: "Egg Cheese Paratha",
    nameUrdu: "انڈا چیز پراٹھا",
    price: 280,
    category: "omelette",
    description: "Delicious combination of spiced egg and melted cheese inside crispy paratha.",
    image: "images/paratha9.jpeg"
  },
  {
    id: "egg-red-flour-paratha",
    name: "Egg with Red Flour’s Paratha",
    nameUrdu: "انڈا لال آٹا پراٹھا",
    price: 160,
    category: "omelette",
    description: "Whole wheat red flour paratha topped with seasoned egg.",
    image: "images/paratha10.jpeg"
  },
  {
    id: "egg-chana-plate",
    name: "Egg Chana Plate",
    nameUrdu: "انڈا چنا پلیٹ",
    price: 230,
    category: "omelette",
    description: "Spicy chana masala served with a fried or boiled egg.",
    image: "images/food10.jpeg"
  },

  // ROLLS & BOTI PARATHAS
  {
    id: "special-malai-boti-paratha",
    name: "Special Malai Boti Paratha",
    nameUrdu: "ملائی بوٹی پراٹھا",
    price: 450,
    category: "rolls",
    description: "Tender, smoky barbecue chicken malai boti pieces wrapped in paratha.",
    image: "images/paratha26.jpeg",
    isPopular: true
  },
  {
    id: "special-malai-boti-cheese-paratha",
    name: "Special Malai Boti Cheese Paratha",
    nameUrdu: "ملائی بوٹی چیز پراٹھا",
    price: 550,
    category: "rolls",
    description: "Smoky chicken malai boti smothered in melted cheese.",
    image: "images/paratha27.jpeg",
    isPopular: true
  },
  {
    id: "chicken-paratha",
    name: "Chicken Paratha",
    nameUrdu: "چکن پراٹھا",
    price: 270,
    category: "rolls",
    description: "Tender shredded chicken marinated in special spices inside flaky paratha.",
    image: "images/pizza3.jpeg"
  },
  {
    id: "chicken-cheese-paratha",
    name: "Chicken Cheese Paratha",
    nameUrdu: "چکن چیز پراٹھا",
    price: 400,
    category: "rolls",
    description: "Spiced chicken and melted cheese filling.",
    image: "images/pizza4.jpeg"
  },
  {
    id: "chicken-double-cheese-paratha",
    name: "Chicken Double Cheese Paratha",
    nameUrdu: "چکن ڈبل چیز پراٹھا",
    price: 500,
    category: "rolls",
    description: "Double the mozzarella cheese with our spicy chicken filling.",
    image: "images/pizza5.jpeg"
  },
  {
    id: "chicken-egg-paratha",
    name: "Chicken Egg Paratha",
    nameUrdu: "چکن انڈا پراٹھا",
    price: 300,
    category: "rolls",
    description: "Generously stuffed with spiced minced chicken and fried egg.",
    image: "images/paratha11.jpeg"
  },
  {
    id: "chicken-egg-cheese-paratha",
    name: "Chicken Egg Cheese Paratha",
    nameUrdu: "چکن انڈا چیز پراٹھا",
    price: 500,
    category: "rolls",
    description: "Loaded with spiced chicken chunks, egg, and gooey melted cheese.",
    image: "images/paratha12.jpeg"
  },
  {
    id: "shami-kabab-paratha",
    name: "Shami Kabab Paratha",
    nameUrdu: "شامی کباب پراٹھا",
    price: 280,
    category: "rolls",
    description: "Authentic beef shami kabab mashed and stuffed inside a hot paratha.",
    image: "images/paratha18.jpeg"
  },
  {
    id: "shami-kabab-cheese-paratha",
    name: "Shami Kabab Cheese Paratha",
    nameUrdu: "شامی کباب چیز پراٹھا",
    price: 400,
    category: "rolls",
    description: "Shami kabab and stringy mozzarella melted inside crispy paratha.",
    image: "images/paratha19.jpeg"
  },
  {
    id: "special-shami-kabab-cheese-paratha",
    name: "Special Shami Kabab Cheese Paratha",
    nameUrdu: "اسپیشل شامی چیز پراٹھا",
    price: 500,
    category: "rolls",
    description: "Double shami kabab, double cheese, and egg stuffed paratha.",
    image: "images/paratha20.jpeg",
    isPopular: true
  },
  {
    id: "double-paratha",
    name: "Double Paratha (Chicken, Potato, Cheese, Kabab, Egg)",
    nameUrdu: "ڈبل اسپیشل پراٹھا",
    price: 600,
    category: "rolls",
    description: "Monster mega paratha loaded with chicken, potatoes, shami kabab, cheese, and egg.",
    image: "images/paratha21.jpeg",
    isPopular: true
  },

  // PARATHAS
  {
    id: "lachchay-dar-paratha",
    name: "Lachchay Dar Paratha",
    nameUrdu: "لچھے دار پراٹھا",
    price: 70,
    category: "paratha",
    description: "Iconic spiral layered paratha, crispy on the outside and soft on the inside.",
    image: "images/paratha1.jpeg"
  },
  {
    id: "lachchay-dar-cheese-paratha",
    name: "Lachchay Dar Cheese Paratha",
    nameUrdu: "لچھے دار چیز پراٹھا",
    price: 200,
    category: "paratha",
    description: "Golden flaky paratha stuffed with rich gooey melted cheese.",
    image: "images/paratha2.jpeg",
    isPopular: true
  },
  {
    id: "lachchay-dar-double-cheese-paratha",
    name: "Lachchay Dar Double Cheese Paratha",
    nameUrdu: "ڈبل چیز پراٹھا",
    price: 300,
    category: "paratha",
    description: "Double loaded mozzarella & cheddar inside crispy layers of paratha.",
    image: "images/paratha3.jpeg",
    isPopular: true
  },
  {
    id: "lachchay-dar-paratha-desi-ghee",
    name: "Lachchay Dar Paratha Fry in Desi Ghee",
    nameUrdu: "دیسی گھی پراٹھا",
    price: 120,
    category: "paratha",
    description: "Layered paratha fried to perfection in 100% pure aromatic Desi Ghee.",
    image: "images/paratha4.jpeg"
  },
  {
    id: "red-flour-paratha",
    name: "Red Flour’s Paratha",
    nameUrdu: "لال آٹے کا پراٹھا",
    price: 90,
    category: "paratha",
    description: "Nutritious whole wheat (lal aata) crispy flatbread.",
    image: "images/paratha5.jpeg"
  },
  {
    id: "red-flour-paratha-desi-ghee",
    name: "Red Flour’s Paratha Fry in Desi Ghee",
    nameUrdu: "لال آٹے کا دیسی گھی پراٹھا",
    price: 140,
    category: "paratha",
    description: "Whole wheat healthy paratha roasted in pure desi ghee.",
    image: "images/paratha6.jpeg"
  },
  {
    id: "lachchay-dar-sugar-paratha",
    name: "Lachchay Dar Sugar Paratha",
    nameUrdu: "چینی والا پراٹھا",
    price: 200,
    category: "paratha",
    description: "Sweet nostalgic paratha caramelized with crystalline sugar inside.",
    image: "images/paratha7.jpeg"
  },
  {
    id: "potato-paratha",
    name: "Potato Paratha",
    nameUrdu: "آلو پراٹھا",
    price: 200,
    category: "paratha",
    description: "Stuffed with seasoned mashed potatoes, cumin, and green herbs.",
    image: "images/paratha13.jpeg"
  },
  {
    id: "potato-cheese-paratha",
    name: "Potato Cheese Paratha",
    nameUrdu: "آلو چیز پراٹھا",
    price: 300,
    category: "paratha",
    description: "Aloo stuffing paired with velvety melted cheese in crispy layers.",
    image: "images/paratha14.jpeg"
  },
  {
    id: "potato-double-cheese-paratha",
    name: "Potato Double Cheese Paratha",
    nameUrdu: "آلو ڈبل چیز پراٹھا",
    price: 330,
    category: "paratha",
    description: "Double the cheese with our classic spicy potato stuffing.",
    image: "images/paratha15.jpeg"
  },
  {
    id: "chicken-potato-mix-paratha",
    name: "Chicken Potato Mix Paratha",
    nameUrdu: "چکن آلو پراٹھا",
    price: 350,
    category: "paratha",
    description: "Hearty mix of shredded spiced chicken and seasoned potatoes.",
    image: "images/paratha16.jpeg"
  },
  {
    id: "chicken-potato-mix-cheese-paratha",
    name: "Chicken Potato Mix Cheese Paratha",
    nameUrdu: "چکن آلو چیز پراٹھا",
    price: 450,
    category: "paratha",
    description: "Chicken, potatoes, and cheese together in a crispy golden crust.",
    image: "images/paratha1.jpeg"
  },
  {
    id: "nutella-lachchay-dar-paratha",
    name: "Nutella Lachchay Dar Paratha",
    nameUrdu: "نوٹیلا پراٹھا",
    price: 450,
    category: "paratha",
    description: "Crispy layered paratha smothered with creamy Nutella chocolate hazelnut spread.",
    image: "images/paratha22.jpeg"
  },
  {
    id: "nutella-lachchay-dar-cheese-paratha",
    name: "Nutella Lachchay Dar Cheese Paratha",
    nameUrdu: "نوٹیلا چیز پراٹھا",
    price: 550,
    category: "paratha",
    description: "Unique sweet & savory combo of rich Nutella and melted cheese.",
    image: "images/paratha23.jpeg"
  },
  {
    id: "nutella-cheese-cream-paratha",
    name: "Nutella Cheese Cream Paratha",
    nameUrdu: "نوٹیلا کریم پراٹھا",
    price: 600,
    category: "paratha",
    description: "Nutella, thick milk cream, and cheese inside warm flaky paratha.",
    image: "images/paratha24.jpeg"
  },
  {
    id: "nutella-dry-fruit-paratha",
    name: "Nutella Dry Fruit Paratha",
    nameUrdu: "نوٹیلا ڈرائی فروٹ پراٹھا",
    price: 600,
    category: "paratha",
    description: "Nutella spread topped with crushed almonds, pistachios, and walnuts.",
    image: "images/paratha25.jpeg"
  },
  {
    id: "cream-paratha",
    name: "Cream Paratha",
    nameUrdu: "کریم پراٹھا",
    price: 280,
    category: "paratha",
    description: "Fresh buffalo milk cream layered inside hot flaky paratha.",
    image: "images/paratha28.jpeg"
  },
  {
    id: "alamgir-special-pizza-paratha",
    name: "Alamgir Special Pizza Paratha",
    nameUrdu: "علمگیر پیزا پراٹھا",
    price: 950,
    category: "paratha",
    description: "Full giant pizza paratha loaded with chicken fajita, capsicum, olives, pizza sauce, and mozzarella.",
    image: "images/pizza1.jpeg"
  },
  {
    id: "alamgir-special-pizza-paratha-half",
    name: "Alamgir Special Pizza Paratha (Half)",
    nameUrdu: "ہاف پیزا پراٹھا",
    price: 500,
    category: "paratha",
    description: "Half-size version of our famous cheesy pizza paratha.",
    image: "images/pizza2.jpeg"
  },
  {
    id: "honey-cream-paratha",
    name: "Honey Cream Paratha",
    nameUrdu: "شہد کریم پراٹھا",
    price: 350,
    category: "paratha",
    description: "Sweet natural honey and fresh malai stuffed inside crispy layers.",
    image: "images/pizza6.jpeg"
  },
  {
    id: "honey-paratha",
    name: "Honey Paratha",
    nameUrdu: "شہد پراٹھا",
    price: 250,
    category: "paratha",
    description: "Golden paratha drizzled and stuffed with sweet mountain honey.",
    image: "images/pizza7.jpeg"
  },

  // DRINKS
  {
    id: "slice-juice",
    name: "Slice Juice",
    nameUrdu: "سلائس جوس",
    price: 70,
    category: "drinks",
    description: "Chilled sweet mango nectar juice pack.",
    image: "images/juice1.jpeg"
  },
  {
    id: "cold-drink-500ml",
    name: "Cold Drink 500ml",
    nameUrdu: "کولڈرنک 500ml",
    price: 130,
    category: "drinks",
    description: "Chilled 500ml soft drink bottle (Pepsi, 7Up, Mirinda, Coke).",
    image: "images/juice2.jpeg"
  },
  {
    id: "string-cold-drink-300ml",
    name: "String Cold Drink 300ml",
    nameUrdu: "کولڈرنک 300ml",
    price: 110,
    category: "drinks",
    description: "Ice cold 300ml Sting energy drink.",
    image: "images/juice3.jpeg"
  },
  {
    id: "cold-drink-15ltr",
    name: "Cold Drink 1.5 Ltr",
    nameUrdu: "کولڈرنک 1.5 لیٹر",
    price: 230,
    category: "drinks",
    description: "Family size 1.5 Litre chilled soft drink bottle.",
    image: "images/juice4.jpeg"
  },
  {
    id: "pakola-300ml",
    name: "Pakola 300ml",
    nameUrdu: "پکولا 300ml",
    price: 80,
    category: "drinks",
    description: "National favorite Karachi ice-cream soda can.",
    image: "images/juice5.jpeg"
  },
  {
    id: "water-bottle-small",
    name: "Water Bottle Small",
    nameUrdu: "پانی کی بوتل چھوٹی",
    price: 60,
    category: "drinks",
    description: "500ml pure mineral water bottle.",
    image: "images/juice6.jpeg"
  },
  {
    id: "water-bottle-large",
    name: "Water Bottle Large",
    nameUrdu: "پانی کی بوتل بڑی",
    price: 120,
    category: "drinks",
    description: "1.5 Litre pure mineral water bottle.",
    image: "images/juice7.jpeg"
  },

  // ADDONS & FOOD SPECIALS
  {
    id: "special-shami-kabab",
    name: "Special Shami Kabab",
    nameUrdu: "اسپیشل شامی کباب",
    price: 100,
    category: "addons",
    description: "Melt-in-mouth beef and lentils patty seasoned with aromatic whole garam masala.",
    image: "images/food6.jpeg",
    isPopular: true
  },
  {
    id: "special-shami-kabab-cheese",
    name: "Special Shami Kabab Cheese",
    nameUrdu: "شامی کباب چیز",
    price: 150,
    category: "addons",
    description: "Crispy fried shami kabab topped with a melted slice of cheese.",
    image: "images/food7.jpeg",
    isPopular: true
  },
  {
    id: "special-shami-egg-kabab-cheese",
    name: "Special Shami Egg Kabab Cheese",
    nameUrdu: "شامی انڈا چیز",
    price: 210,
    category: "addons",
    description: "Ultimate breakfast combo: Shami kabab topped with fried egg and cheese.",
    image: "images/food8.jpeg"
  },
  {
    id: "chana-plate",
    name: "Chana Plate",
    nameUrdu: "چنا پلیٹ",
    price: 170,
    category: "addons",
    description: "Lahori-style slow-cooked chickpeas simmered in spicy masala gravy.",
    image: "images/food9.jpeg"
  },
  {
    id: "chicken-broast-channa",
    name: "Chicken Broast Channa",
    nameUrdu: "چکن بروسٹ چنا",
    price: 400,
    category: "addons",
    description: "Golden crispy fried chicken broast served over hot chickpea masala.",
    image: "images/food11.jpeg",
    isPopular: true
  },
  {
    id: "special-beef-keema-fry",
    name: "Special Beef Keema Fry",
    nameUrdu: "بیف قیمہ فرائی",
    price: 380,
    category: "addons",
    description: "Tawa-fried minced beef tossed with onions, green chilies, ginger julienne, and butter.",
    image: "images/food12.jpeg"
  },
  {
    id: "special-halwa",
    name: "Special Halwa",
    nameUrdu: "اسپیشل حلوہ",
    price: 170,
    category: "addons",
    description: "Traditional fragrant suji halwa cooked in ghee with cardamom and roasted nuts.",
    image: "images/food13.jpeg"
  },
  {
    id: "milks-cream",
    name: "Milk’s Cream",
    nameUrdu: "دودھ کی کریم",
    price: 180,
    category: "addons",
    description: "Freshly skimmed thick buffalo malai (cream) served chilled.",
    image: "images/food14.jpeg"
  },
  {
    id: "honeys-cream",
    name: "Honey’s Cream",
    nameUrdu: "شہد کریم",
    price: 250,
    category: "addons",
    description: "Fresh buffalo malai drizzled with pure amber honey — best with hot parathas.",
    image: "images/food15.jpeg"
  },
  {
    id: "disposable-cup",
    name: "Disposable Cup",
    nameUrdu: "ڈسپوزیبل کپ",
    price: 10,
    category: "addons",
    description: "High quality insulated paper takeaway cup.",
    image: "images/dispose1.jpeg"
  },
  {
    id: "special-disposable-cup-with-cap",
    name: "Special Disposable Cup with Cap",
    nameUrdu: "ڈھکن والا ڈسپوزیبل کپ",
    price: 40,
    category: "addons",
    description: "Premium double-wall hot chai takeaway cup with tight-seal sipping lid.",
    image: "images/dispose2.jpeg"
  }
];

// Export for node or browser window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, MENU_ITEMS };
}
