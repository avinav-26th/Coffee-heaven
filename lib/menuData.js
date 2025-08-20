const menuCategories = [
  {
    name: "Hot Beverages",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/hot-beverages_slg38s.png",
    items: [
      {
        name: "Hot Chocolate",
        price: "₹190",
        description:
          "A rich blend of fresh cocoa, melted chocolate, and warm milk, perfect for chocolate lovers.",
      },
      {
        name: "Cappuccino",
        price: "₹170",
        description:
          "A classic espresso-based coffee with a thick layer of frothy milk and a touch of cinnamon.",
      },
      {
        name: "Masala Chai",
        price: "₹110",
        description:
          "Aromatic Indian-style tea brewed with a mix of fresh spices and herbs for a comforting taste.",
      },
      {
        name: "Green Tea",
        price: "₹180",
        description:
          "A soothing pot of hot water infused with premium organic green tea leaves.",
      },
      {
        name: "Melange",
        price: "₹180",
        description:
          "A creamy cappuccino topped generously with whipped cream for extra indulgence.",
      },
    ],
  },
  {
    name: "Cold Beverages",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/cold-beverages_ecjpx1.png",
    items: [
      {
        name: "Cold Chocolate",
        price: "₹220",
        description:
          "A heavenly blend of chilled chocolate, cocoa, and milk, topped with chocolate shavings.",
      },
      {
        name: "Coffee Frappe",
        price: "₹230",
        description:
          "A smooth and icy espresso-based drink, blended with milk and a hint of sweetness.",
      },
      {
        name: "Vietnamese Iced Coffee",
        price: "₹190",
        description:
          "Bold, strong coffee poured over ice and sweetened condensed milk for a refreshing kick.",
      },
      {
        name: "Mint Lime Cooler",
        price: "₹140",
        description:
          "A zesty and invigorating mix of fresh mint, lime juice, and soda for a cooling effect.",
      },
      {
        name: "Iced Tea",
        price: "₹170",
        description:
          "Chilled Nilgiri tea infused with fresh lemon juice and a hint of sugar syrup.",
      },
    ],
  },
  {
    name: "Smoothies",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/smoothies_jeldl5.jpg",
    items: [
      {
        name: "Berry Blast",
        price: "₹210",
        description:
          "A delicious blend of strawberries, blueberries, and yogurt.",
      },
      {
        name: "Mango Delight",
        price: "₹200",
        description:
          "Ripe mangoes blended with creamy yogurt and a touch of honey.",
      },
      {
        name: "Green Detox",
        price: "₹230",
        description:
          "Spinach, kale, banana, and apple for a healthy green boost.",
      },
      {
        name: "Chocolate Banana",
        price: "₹220",
        description:
          "Banana and chocolate blended with milk for a rich, smooth taste.",
      },
      {
        name: "Peanut Butter Protein",
        price: "₹250",
        description:
          "Peanut butter, banana, and whey protein for an energy-packed drink.",
      },
    ],
  },
  {
    name: "Soups",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/soups_bfpv2w.png",
    items: [
      {
        name: "Minestrone",
        price: "₹170",
        description:
          "A hearty Italian vegetable soup with tomato broth, pasta, and fresh herbs.",
      },
      {
        name: "Cream of Broccoli",
        price: "₹170",
        description:
          "A velvety soup made from fresh broccoli blended with creamy goodness.",
      },
      {
        name: "Brazilian Chicken Soup",
        price: "₹180",
        description:
          "A nourishing bowl of chicken cooked with vegetables, garlic, and rice in a flavorful broth.",
      },
      {
        name: "Chicken Noodle Soup",
        price: "₹180",
        description:
          "A comforting soup featuring chicken, noodles, and garden-fresh vegetables in a delicious broth.",
      },
    ],
  },
  {
    name: "Salads",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/salads_ro02fr.png",
    items: [
      {
        name: "Mexican Bell Pepper Salad",
        price: "₹210",
        description:
          "A crunchy mix of bell peppers, sweet corn, and jalapenos, topped with nachos and salsa.",
      },
      {
        name: "Chef’s Special Salad",
        price: "₹230",
        description:
          "A wholesome combination of zucchini, broccoli, and baby corn, tossed in olive oil and herbs.",
      },
      {
        name: "Thai Cucumber Salad",
        price: "₹210",
        description:
          "A refreshing summer salad with cucumber, onions, cilantro, and roasted peanuts.",
      },
      {
        name: "Sprout Salad",
        price: "₹200",
        description:
          "A protein-rich blend of fresh sprouts, vegetables, and herbs with a drizzle of olive oil.",
      },
      {
        name: "Cold Potato Salad",
        price: "₹190",
        description:
          "Boiled potatoes tossed with egg whites, onions, and a homemade dressing for a creamy finish.",
      },
    ],
  },
  {
    name: "Breakfast Options",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/breakfast_hnfdxe.png",
    items: [
      {
        name: "English Breakfast",
        price: "₹360",
        description:
          "A hearty plate with eggs, sausages, grilled tomatoes, baked beans, and fresh juice.",
      },
      {
        name: "Everyday Breakfast",
        price: "₹280",
        description:
          "A balanced spread of eggs, French toast, sausages, and baked beans to start your day.",
      },
      {
        name: "Healthy Breakfast",
        price: "₹340",
        description:
          "A nutritious mix of grilled veggies, sprouts, toast, and fresh watermelon slices.",
      },
      {
        name: "Waffle",
        price: "₹180",
        description:
          "Warm and fluffy waffles dusted with powdered sugar for a simple yet delightful treat.",
      },
      {
        name: "French Toast",
        price: "₹200",
        description:
          "Thick slices of bread soaked in a vanilla batter and cooked until golden brown.",
      },
      {
        name: "Pancake",
        price: "₹190",
        description:
          "Soft, golden pancakes lightly dusted with sugar for a sweet breakfast delight.",
      },
    ],
  },
  {
    name: "Toasts",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/toasts_ijaf5g.png",
    items: [
      {
        name: "Wheat Toast",
        price: "₹100",
        description:
          "Homemade vanilla brown bread served with a side of butter.",
      },
      {
        name: "Garlic Toast",
        price: "₹120",
        description:
          "Toasted homemade bread infused with garlic butter for a rich flavor.",
      },
      {
        name: "Cheese Toast",
        price: "₹160",
        description: "White bread layered with melted mozzarella cheese.",
      },
      {
        name: "Chilli Cheese Toast",
        price: "₹140",
        description:
          "Spiced-up garlic butter toast with a cheesy spread and a hint of chili.",
      },
    ],
  },
  {
    name: "Vegetarian Starters",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-starters_oljxtz.png",
    items: [
      {
        name: "Cheese Balls",
        price: "₹240",
        description:
          "A delightful mix of three varieties of cheese blended with potato and herbs, deep-fried to perfection.",
      },
      {
        name: "Onion Rings",
        price: "₹200",
        description:
          "Crispy onion rings coated in a homemade batter, served with honey mustard and hot garlic sauce.",
      },
      {
        name: "French Croquettes",
        price: "₹200",
        description:
          "Vegetable and peanut croquettes, served with cilantro pesto, mayo, and hot garlic sauce.",
      },
      {
        name: "Fries",
        price: "₹230",
        description:
          "Golden crispy fries, available in Peri-Peri or classic, served with tomato sauce.",
      },
      {
        name: "Cheddar-Stuffed Mushrooms",
        price: "₹250",
        description:
          "Mushroom caps filled with cheddar cheese, served with tartar sauce and sweet chili sauce.",
      },
    ],
  },
  {
    name: "Non-Vegetarian Starters",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/non-veg-starters_zdchoc.png",
    items: [
      {
        name: "California Fried Chicken",
        price: "₹230",
        description:
          "Crispy fried chicken supreme, coated with oats and cornflakes, served with honey mustard and hot garlic sauce.",
      },
      {
        name: "Chicken Schnitzel",
        price: "₹250",
        description:
          "Thinly sliced chicken, breaded and fried, served with tartar sauce and fries.",
      },
      {
        name: "Chicken Cutlet",
        price: "₹240",
        description:
          "A classic combination of minced chicken, potatoes, and spices, deep-fried to golden perfection.",
      },
      {
        name: "Fish Fingers",
        price: "₹240",
        description:
          "Crispy batter-fried fish fillets, served with tartar sauce and fries.",
      },
      {
        name: "Chicken Winglets",
        price: "₹230",
        description:
          "Tender chicken wings tossed in your choice of BBQ or honey-glazed sauce.",
      },
    ],
  },
  {
    name: "Omelettes",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/omelettes_idsypn.png",
    items: [
      {
        name: "Plain Omelette",
        price: "₹180",
        description:
          "A simple yet delicious 3-egg omelette, served with buttered toast.",
      },
      {
        name: "Scrambled Omelette",
        price: "₹180",
        description:
          "Soft and fluffy scrambled eggs, served with toast and butter.",
      },
      {
        name: "Egg White Omelette",
        price: "₹230",
        description:
          "A protein-rich 4-egg-white omelette, served with toast and butter.",
      },
      {
        name: "Masala Omelette",
        price: "₹240",
        description:
          "A flavorful omelette with onion, capsicum, carrot, tomato, and green chilies, served with toast.",
      },
      {
        name: "Cheese Omelette",
        price: "₹240",
        description:
          "A fluffy omelette stuffed with gooey melted cheese for an extra creamy taste.",
      },
    ],
  },
  {
    name: "Vegetarian Sandwiches",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-sandwiches_kzifus.png",
    items: [
      {
        name: "Herb Cheese Sandwich",
        price: "₹190",
        description:
          "A refreshing sandwich with homemade cottage cheese, cheese spread, tomato, cucumber, and fresh herbs.",
      },
      {
        name: "Mushroom Cheese Sandwich",
        price: "₹200",
        description:
          "A toasted sandwich packed with sautéed mushrooms and melted cheese.",
      },
      {
        name: "Roasted Vegetable Sandwich",
        price: "₹240",
        description:
          "A wholesome sandwich with roasted veggies, layered with light seasoning.",
      },
      {
        name: "Banana Sandwich",
        price: "₹150",
        description:
          "A unique sweet sandwich with fresh banana slices for a light snack.",
      },
    ],
  },
  {
    name: "Non-Vegetarian Sandwiches",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/non-veg-sandwiches_foylqc.png",
    items: [
      {
        name: "Chicken Melt Sandwich",
        price: "₹220",
        description:
          "Grilled chicken with melted cheese in a warm, crispy sandwich.",
      },
      {
        name: "Roasted Chicken Sandwich",
        price: "₹240",
        description:
          "A delicious sandwich with roasted chicken, lettuce, tomato, homemade sauce, and cheese.",
      },
      {
        name: "Tuna Melt Sandwich",
        price: "₹230",
        description:
          "A comforting sandwich with savory tuna salad topped with melted cheese.",
      },
      {
        name: "Chicken Club Sandwich",
        price: "₹290",
        description:
          "A three-layer sandwich filled with flavorful chicken and fresh veggies.",
      },
      {
        name: "Tuna Club Sandwich",
        price: "₹290",
        description:
          "A stacked sandwich with tuna, lettuce, tomato, and cucumber.",
      },
    ],
  },
  {
    name: "Vegetarian Burgers",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-burgers_nli334.png",
    items: [
      {
        name: "Vegetable Burger",
        price: "₹280",
        description:
          "A classic veggie burger with a crispy patty, lettuce, tomato, and cheese.",
      },
      {
        name: "Cheesy Mushroom Burger",
        price: "₹320",
        description:
          "A rich cheese patty topped with creamy mushrooms, tomato, lettuce, and cheese.",
      },
      {
        name: "Cottage Cheese Burger",
        price: "₹290",
        description:
          "A homemade paneer patty with fresh tomato, lettuce, and cheese.",
      },
    ],
  },
  {
    name: "Non-Vegetarian Burgers",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/non-veg-burgers_vtxtlh.png",
    items: [
      {
        name: "Chicken Steak Burger",
        price: "₹330",
        description:
          "A juicy chicken steak burger with lettuce, caramelized onions, tomato, and cheese.",
      },
      {
        name: "Crispy Chicken Burger",
        price: "₹330",
        description:
          "A crunchy fried chicken burger with tomato, lettuce, mayonnaise, and cheese.",
      },
      {
        name: "Lamb Burger",
        price: "₹380",
        description:
          "A gourmet burger with a tender minced lamb patty, lettuce, tomato, and caramelized onions.",
      },
    ],
  },
  {
    name: "Vegetarian Pizzas",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-pizzas_eljbls.png",
    items: [
      {
        name: "Margherita Pizza",
        price: "₹320",
        description:
          "A classic pizza with fresh tomato, oregano, mozzarella, basil, and parmesan cheese.",
      },
      {
        name: "Italiano Pizza",
        price: "₹370",
        description:
          "A Mediterranean-style pizza with spinach, olives, sun-dried tomatoes, mushrooms, and cheese.",
      },
      {
        name: "Spicy Roasted Vegetable Pizza",
        price: "₹370",
        description:
          "A spicy cilantro pesto base with onion, chili, capsicum, baby corn, and mushrooms.",
      },
    ],
  },
  {
    name: "Non-Vegetarian Pizzas",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/non-veg-pizzas_m9mwce.png",
    items: [
      {
        name: "Chicken All-Meat Pizza",
        price: "₹420",
        description:
          "Loaded with minced chicken, salami, sausage, pepperoni, and ham with mozzarella.",
      },
      {
        name: "Spicy Roasted Chicken Pizza",
        price: "₹410",
        description:
          "Topped with spiced chicken, onion, capsicum, chili, baby corn, and mushrooms.",
      },
    ],
  },
  {
    name: "Main Course",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/main-course_d8jihn.png",
    items: [
      {
        name: "Pasta Varieties",
        price: "₹340",
        description: "A selection of pasta served with rich and creamy sauces.",
      },
      {
        name: "Grilled Paneer",
        price: "₹340",
        description:
          "Pesto-marinated paneer with butter rice, green pea salad, and BBQ sauce.",
      },
      {
        name: "Chicken Florentine",
        price: "₹400",
        description:
          "Grilled chicken stuffed with creamy spinach, served with white sauce and boiled vegetables.",
      },
      {
        name: "Roasted Chicken Leg",
        price: "₹370",
        description:
          "Oven-roasted chicken leg, topped with herbs, brown sauce, and served over baby potatoes.",
      },
    ],
  },
  {
    name: "Pastries & Bakes",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/pastries_xpp6ia.jpg",
    items: [
      {
        name: "Blueberry Muffin",
        price: "₹160",
        description: "Soft and fluffy muffin bursting with juicy blueberries.",
      },
      {
        name: "Almond Croissant",
        price: "₹180",
        description:
          "Flaky croissant filled with almond paste and topped with sliced almonds.",
      },
      {
        name: "Cinnamon Roll",
        price: "₹190",
        description:
          "Soft dough swirled with cinnamon sugar and topped with icing.",
      },
      {
        name: "Chocolate Eclair",
        price: "₹220",
        description:
          "Choux pastry filled with creamy custard and coated in chocolate.",
      },
      {
        name: "Strawberry Tart",
        price: "₹250",
        description:
          "Crisp tart shell filled with vanilla cream and fresh strawberries.",
      },
    ],
  },
  {
    name: "Desserts",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/desserts_n1kxbe.png",
    items: [
      {
        name: "Banoffee Pie",
        price: "₹180",
        description:
          "A luscious dessert with layers of banana, toffee, and fluffy whipped cream.",
      },
      {
        name: "Key Lime Pie",
        price: "₹180",
        description:
          "A sweet and tangy lime-infused pie with a crumbly biscuit base.",
      },
      {
        name: "Tender Coconut Pudding",
        price: "₹180",
        description:
          "A light coconut-flavored pudding made with fresh pulp and china grass.",
      },
      {
        name: "Baked Cheesecake",
        price: "₹190",
        description:
          "A creamy and rich cheesecake, available in plain or salted caramel flavors.",
      },
      {
        name: "Creme Brulee",
        price: "₹190",
        description:
          "A smooth custard dessert topped with a crisp caramelized sugar layer.",
      },
      {
        name: "Chocolate Cake",
        price: "₹190",
        description:
          "A rich and moist chocolate cake served with our signature chocolate sauce.",
      },
    ],
  },
  {
    name: "Waffles & Pancakes",
    image: "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/waffles_prhayk.png",
    items: [
      {
        name: "Blueberry Cheesecake Waffles",
        price: "₹249",
        description:
          "Crispy waffles loaded with cream cheese and tangy blueberry sauce.",
      },
      {
        name: "Oat My Goodness Pancakes",
        price: "₹279",
        description:
          "Oat pancakes stacked with peanut butter, banana, syrup, and choco chips!",
      },
      {
        name: "Choco Oatmeal Pancakes",
        price: "₹259",
        description:
          "Chocolate oat pancakes drizzled with chocolate sauce and whipped cream.",
      },
      {
        name: "Oreo Chocolate Pancakes",
        price: "₹289",
        description:
          "Chocolate pancakes layered with cream, Oreo crunch, ice cream & choco drizzle.",
      },
      {
        name: "Tiramisu Those Pancakes",
        price: "₹299",
        description:
          "Mocha-infused pancakes dusted with coffee powder & chocolate shavings.",
      },
      {
        name: "The Apple Pie Waffle",
        price: "₹269",
        description:
          "Golden waffles topped with caramelized apples, caramel sauce & ice cream.",
      },
      {
        name: "Banoffee Pie Waffle",
        price: "₹259",
        description:
          "Waffles stacked with fresh bananas, caramel drizzle, and whipped cream.",
      },
      {
        name: "All Rounder Mango Chocolate Waffles",
        price: "₹279",
        description:
          "Crispy waffles topped with vanilla ice cream, mango chocolate & dark choco chips.",
      },
    ],
  },
];

export default menuCategories;
