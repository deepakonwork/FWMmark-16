// Options the user could type in
let date = new Date(); 
var currentdate = new Date().toLocaleDateString();
var time = new Date().toLocaleTimeString();

// Main prompt → reply pairs (exact or close match)
const prompts = [
  ["hi", "hey", "hello", "good morning", "good afternoon"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["no","not sure","maybe","no thanks"],
  [""],
  ["haha","ha","lol","hehe","funny","joke"],

  // Project / domain specific
  ["food donate","project", "what is this project", "what does this project do"],
  ["date"],
  ["time"],
  ["what can i donate","donate","what food can i donate","what items can i donate"],
  ["trust in madurai","ngos in madurai","ngo in madurai"],
  ["tell joke","joke please"],
  ["how can i package my cooked or raw food donations","cooked food donation","raw food donate","how to pack food"],
  ["how my donation is used","how will my donation be used","what happens after i donate"],
  ["can i donate cooked food","is cooked food allowed"],
  ["what are the guidelines for donating","donation guidelines","rules for donating"],
  ["how to donate food","how do i donate","steps to donate"],
  ["how does delivery work","how delivery works","delivery process"],
  ["how does admin work","what admin does","admin role"],
  ["how does user module work","user module","user role"]
];

// Possible responses, in corresponding order
const replies = [
  ["Hello!", "Hi!", "Hey!", "Hi there!","Howdy"],
  
  [
    "I'm doing well, thanks for asking! How are you?",
    "Pretty good, how are you feeling today?",
    "Fantastic, and ready to help you with food donation questions."
  ],
  [
    "Just helping people understand how to donate food 🙂",
    "I'm here to answer your questions about the Food Donate system.",
    "Thinking about how we can reduce food waste together."
  ],
  ["I don't really have an age, I'm a chatbot made for this project."],
  ["I am a support bot for the Food Donate website.", "I'm a chatbot that helps you use the Food Waste Management system."],
  
  ["I was created by the Food Donate project developers."],
  ["You can call me FoodDonate Bot."],
  ["That's sweet of you!", "I appreciate that 💚"],
  ["Glad to hear that!", "Awesome! Keep spreading kindness."],
  ["I'm sorry to hear that. Maybe helping someone by donating food can cheer you up.", "That happens, take a deep breath. Want to hear how our donation works?"],
  ["Sure, tell me what you need help with.", "I can help with questions about donating food, delivery, and how this project works."],
  ["Got it.", "Okay!", "Nice."],
  ["Bye", "Goodbye", "See you later!"],
  ["Maybe something simple and healthy today.", "How about sharing some of your extra food with someone in need?"],
  ["Bro!"],
  ["That's a good question. Can you be a bit more specific about food donation or delivery?"],
  ["That's ok","I understand","What do you want to talk about?"],
  ["Please type something, for example: 'how to donate food' or 'what can I donate?'"],
  ["Haha!","Good one!"],

  // Project / domain specific replies (aligned to prompts above)
  ["The Food Waste Management project collects excess or leftover food from donors such as hotels, restaurants, and individuals, and helps distribute it to people in need via admins (NGOs) and delivery partners."],
  [currentdate],
  [time],
  ["You can donate raw, cooked, and packed foods that are safe to eat and not expired."],
  ["One example is: Madurai Old Age Charitable Trust, 208, East Veli Street, Near Keshavan Hospital. You can also contact local NGOs in Madurai who work with food distribution."],
  ["Here’s a quick one: Why did the tomato turn red? Because it saw the salad dressing! 😄"],
  ["You can package cooked or raw food in clean, airtight containers (like boxes, food-grade plastic, or well-wrapped packs). Label with food type, date, and any special notes, and keep it at safe temperatures until pickup."],
  ["Your donation supports our mission to reduce food waste and feed people in need. Admins (NGOs/charities) select suitable donations and coordinate with delivery partners to get the food to the right place."],
  ["Yes, you can donate cooked food as long as it is freshly prepared, safely handled, properly packed, and not close to spoiling."],
  ["Basic guidelines: donate fresh and safe food, avoid expired items, pack it properly, label it, and provide accurate contact and address details so delivery can reach you."],
  ["To donate food, log in as a user, go to the food donate form, fill in food details, quantity, and your address, then submit. Admins and delivery partners will take it from there."],
  ["Admins see donations in their location, assign them to themselves or NGOs, and coordinate with delivery partners who pick up from donors and deliver to beneficiaries."],
  ["Admins manage donations and analytics, delivery persons pick up and drop donations, and users create food donations. Each module has its own login and dashboard."],
  ["Users register, log in, and create food donation requests with details like food type, quantity, and location. They can also see their past donations in the profile section."]
];

// Extra FAQ-style intents based on keywords (used for fuzzy matching)
const keywordIntents = [
  {
    keywords: ["donate","how"],
    replies: [
      "To donate: sign in as a user, open the food donation form, fill in food details, quantity, and address, and submit. Admin and delivery will handle the rest.",
      "You can donate by going to the donation form, describing your food, adding your contact and location, and clicking submit."
    ]
  },
  {
    keywords: ["what","donate"],
    replies: [
      "You can donate raw, cooked, or packed food that is safe, not expired, and properly packaged.",
      "Generally accepted: cooked meals, raw ingredients, and packed food in good condition."
    ]
  },
  {
    keywords: ["delivery","work"],
    replies: [
      "Delivery partners see assigned donations in their city, pick them up from donors, and deliver them to NGOs or beneficiaries defined by admin.",
      "Once an admin assigns a donation, a delivery person can accept the order and handle pickup and drop-off."
    ]
  },
  {
    keywords: ["admin","work"],
    replies: [
      "Admins review all incoming donations in their location, assign them, and track analytics like total users, feedbacks, and donations.",
      "Admin users are typically NGOs or trusts who coordinate which donations go where and when."
    ]
  }
];

// Random for any other user input
const alternative = [
  "I'm not sure I understood that. Try asking things like: 'how to donate food', 'what can I donate', 'how does delivery work', or 'what is this project?'.",
  "I didn't fully get that. You can ask me about donating food, delivery, admin module, or project details.",
  "Sorry, I’m not sure. Try a question such as 'can I donate cooked food?' or 'what are the donation guidelines?'."
];

// Whatever else you want :)
const coronavirus = [
  "Please stay home when you are sick and wash your hands regularly.",
  "Wear a mask in crowded places and follow local health guidelines.",
  "These are uncertain times, but small acts of kindness like food donation can help a lot."
];