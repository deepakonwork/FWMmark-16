document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.keyCode===13) {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
      
    });
  });
  
  function output(input) {
    let product;
  
    // Normalize input: lowercase, remove punctuation/digits, trim
    let text = input.toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/[\d]/gi, "")
      .trim();

    // Basic phrase normalizations
    text = text
      .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you")
      .replace(/tell about /g,"");
  
    // 1) Try exact/close phrase match
    product = compare(prompts, replies, text);
  
    // 2) If not found, try keyword-based intents (FAQ-style)
    if (!product && typeof findByKeywords === "function") {
      product = findByKeywords(text);
    }
  
    // 3) Special handling for thanks / covid
    if (!product && text.match(/thank/gi)) {
      product = "You're welcome!";
    } else if (!product && text.match(/(corona|covid|virus)/gi)) {
      product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    }
  
    // 4) Fallback
    if (!product) {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
  
    // Update DOM
    addChat(input, product);
  }
  
  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;

    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        const prompt = promptsArray[x][y];

        // Exact match
        if (prompt === string) {
          let r = repliesArray[x];
          reply = r[Math.floor(Math.random() * r.length)];
          replyFound = true;
          break;
        }

        // Loose match: user text contains prompt or prompt contains user text
        if (string.includes(prompt) && prompt.length > 0) {
          let r = repliesArray[x];
          reply = r[Math.floor(Math.random() * r.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) {
        break;
      }
    }
    return reply;
  }

  // Keyword-based matching using keywordIntents from constants.js
  function findByKeywords(text) {
    if (typeof keywordIntents === "undefined" || !Array.isArray(keywordIntents)) {
      return null;
    }

    for (let i = 0; i < keywordIntents.length; i++) {
      const intent = keywordIntents[i];
      if (!intent.keywords || !Array.isArray(intent.keywords)) continue;

      const allMatch = intent.keywords.every((kw) => text.includes(kw));
      if (allMatch && intent.replies && intent.replies.length) {
        return intent.replies[Math.floor(Math.random() * intent.replies.length)];
      }
    }
    return null;
  }
  
  function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");
  
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="img/user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botImg.src = "img/bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
    // Keep messages at most recent
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
      textToSpeech(product)
    }, 2000
    )
  
  }