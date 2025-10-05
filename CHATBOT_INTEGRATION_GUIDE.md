# 🤖 Chatbot Integration Guide

## ✅ What's Been Added

A professional chatbot component with:
- ✅ Floating button (bottom-right corner)
- ✅ Smooth popup window animation
- ✅ Modern chat interface
- ✅ Typing indicator
- ✅ Message history
- ✅ Responsive design
- ✅ Ready for API integration

---

## 📁 Files Created

1. **`src/components/Chatbot/Chatbot.jsx`** - Main component
2. **`src/components/Chatbot/Chatbot.css`** - Professional styling
3. **`src/App.jsx`** - Updated to include chatbot

---

## 🔧 How to Integrate Your API

### Step 1: Add API Key to Environment Variables

Create or update `.env.local` file:

```env
VITE_CHATBOT_API_KEY=your_api_key_here
```

### Step 2: Update the API Call in Chatbot.jsx

Open `src/components/Chatbot/Chatbot.jsx` and find the `handleSendMessage` function (around line 45).

**Current code (placeholder):**
```javascript
// Simulate API response (replace this with actual API call)
setTimeout(() => {
  const botResponse = {
    type: 'bot',
    text: 'This is a placeholder response...',
    timestamp: new Date()
  };
  setMessages(prev => [...prev, botResponse]);
  setIsTyping(false);
}, 1000);
```

**Replace with your API integration:**

#### Option A: OpenAI ChatGPT
```javascript
const handleSendMessage = async (e) => {
  e.preventDefault();
  
  if (!inputMessage.trim()) return;

  const userMessage = {
    type: 'user',
    text: inputMessage,
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsTyping(true);

  try {
    const API_KEY = import.meta.env.VITE_CHATBOT_API_KEY;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are UrbanScope AI Assistant, helping users analyze urban health data, heat risk, green spaces, and healthcare accessibility.'
          },
          {
            role: 'user',
            content: inputMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    
    const botResponse = {
      type: 'bot',
      text: data.choices[0].message.content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  } catch (error) {
    console.error('Chatbot API error:', error);
    const errorResponse = {
      type: 'bot',
      text: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorResponse]);
    setIsTyping(false);
  }
};
```

#### Option B: Google Gemini
```javascript
const handleSendMessage = async (e) => {
  e.preventDefault();
  
  if (!inputMessage.trim()) return;

  const userMessage = {
    type: 'user',
    text: inputMessage,
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsTyping(true);

  try {
    const API_KEY = import.meta.env.VITE_CHATBOT_API_KEY;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are UrbanScope AI Assistant. ${inputMessage}`
          }]
        }]
      })
    });
    
    const data = await response.json();
    
    const botResponse = {
      type: 'bot',
      text: data.candidates[0].content.parts[0].text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  } catch (error) {
    console.error('Chatbot API error:', error);
    const errorResponse = {
      type: 'bot',
      text: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorResponse]);
    setIsTyping(false);
  }
};
```

#### Option C: Custom Backend API
```javascript
const handleSendMessage = async (e) => {
  e.preventDefault();
  
  if (!inputMessage.trim()) return;

  const userMessage = {
    type: 'user',
    text: inputMessage,
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsTyping(true);

  try {
    const response = await fetch('YOUR_BACKEND_URL/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: inputMessage,
        context: 'urban_health_analysis'
      })
    });
    
    const data = await response.json();
    
    const botResponse = {
      type: 'bot',
      text: data.response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  } catch (error) {
    console.error('Chatbot API error:', error);
    const errorResponse = {
      type: 'bot',
      text: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorResponse]);
    setIsTyping(false);
  }
};
```

---

## 🎨 Customization

### Change Colors

Edit `src/components/Chatbot/Chatbot.css`:

```css
/* Change button gradient */
.chatbot-toggle {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}

/* Change header gradient */
.chatbot-header {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Change Position

```css
.chatbot-toggle {
  bottom: 30px;  /* Change this */
  right: 30px;   /* Change this */
}
```

### Change Size

```css
.chatbot-window {
  width: 380px;   /* Change width */
  height: 550px;  /* Change height */
}
```

---

## 🚀 Testing

1. **Start your app:**
```bash
npm run dev
```

2. **Look for the chatbot button** in the bottom-right corner

3. **Click to open** the chat window

4. **Type a message** and press Enter or click Send

5. **See placeholder response** (until you integrate API)

---

## 📝 Features

### Current Features:
- ✅ Floating button with smooth animations
- ✅ Professional chat interface
- ✅ Message history
- ✅ Typing indicator
- ✅ Timestamp for each message
- ✅ Responsive design (mobile-friendly)
- ✅ Auto-scroll to latest message
- ✅ Input validation

### Ready for:
- 🔄 OpenAI ChatGPT integration
- 🔄 Google Gemini integration
- 🔄 Custom backend API
- 🔄 Context-aware responses
- 🔄 Message persistence

---

## 🔐 Security Best Practices

1. **Never commit API keys** to git
2. **Use environment variables** (`.env.local`)
3. **Add `.env.local` to `.gitignore`**
4. **For production:** Use Vercel environment variables

### Add to `.gitignore`:
```
.env.local
.env.*.local
```

---

## 🌐 Vercel Deployment

When deploying to Vercel:

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Settings** → **Environment Variables**
3. Add:
   - **Name:** `VITE_CHATBOT_API_KEY`
   - **Value:** Your actual API key
4. **Redeploy** your project

---

## 💡 Suggested Prompts for Urban Health Context

You can customize the initial message or add suggested prompts:

```javascript
const suggestedPrompts = [
  "What is urban heat island effect?",
  "How to analyze green space accessibility?",
  "Explain healthcare facility coverage",
  "What NASA data sources are used?"
];
```

---

## 🎯 Next Steps

1. ✅ Chatbot UI is ready
2. ⏳ Get your API key (OpenAI, Gemini, or custom)
3. ⏳ Add API key to `.env.local`
4. ⏳ Update `handleSendMessage` function
5. ⏳ Test locally
6. ⏳ Deploy to Vercel

---

**Your professional chatbot is ready to integrate!** 🤖✨
