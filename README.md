markdown
# xibs-btn

> Interactive buttons for Baileys 7.x.x WhatsApp bot

[![npm version](https://badge.fury.io/js/xibs-btn.svg)](https://www.npmjs.com/package/xibs-btn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- ✅ **5 Button Types** - Quick reply, URL, Copy, Call, and List menus
- ✅ **One Simple Function** - `sendButtons()` handles everything
- ✅ **Auto Detection** - No need to specify button types
- ✅ **Image Support** - Add images with your buttons
- ✅ **Groups & Private Chats** - Works everywhere
- ✅ **Baileys 7.x.x** - Built for latest version

## 📦 Installation

```bash
npm install xibs-btn
```

🚀 Quick Start

```javascript
const { sendButtons } = require('xibs-btn');

await sendButtons(sock, jid, {
  text: "Hello! Choose an option:",
  buttons: [
    { text: "Help", id: "help" },
    { text: "About", id: "about" }
  ]
});
```

📖 Button Types

1. Quick Reply Button

Sends back the ID when clicked.

```javascript
{ text: "Yes", id: "answer_yes" }
{ text: "No", id: "answer_no" }
```

2. URL Button

Opens a website when clicked.

```javascript
{ text: "Visit Website", url: "https://example.com" }
{ text: "Documentation", url: "https://docs.example.com" }
```

3. Copy Button

Copies text to clipboard.

```javascript
{ text: "Copy Code", code: "ABC123XYZ" }
{ text: "Get Promo", code: "WELCOME50" }
```

4. Call Button

Opens phone dialer.

```javascript
{ text: "Call Support", number: "+1234567890" }
{ text: "Contact Us", number: "+9876543210" }
```

5. List Menu (Single Select)

Dropdown list with multiple options.

```javascript
{
  title: "Choose Option",
  sections: [
    {
      title: "Main Menu",
      rows: [
        { id: "opt1", title: "Option 1", description: "First choice" },
        { id: "opt2", title: "Option 2", description: "Second choice" }
      ]
    },
    {
      title: "Advanced",
      rows: [
        { id: "opt3", title: "Option 3", description: "Third choice" }
      ]
    }
  ]
}
```

💡 Examples

Mixed Buttons

```javascript
await sendButtons(sock, jid, {
  text: "What would you like to do?",
  footer: "Select an action",
  buttons: [
    { text: "Start", id: "start" },
    { text: "Website", url: "https://example.com" },
    { text: "Copy Code", code: "FREE100" },
    { text: "Call Us", number: "+1234567890" }
  ]
});
```

With Image

```javascript
await sendButtons(sock, jid, {
  text: "Check out our product!",
  image: "https://example.com/product.jpg",
  buttons: [
    { text: "Buy Now", url: "https://store.com/product" },
    { text: "Save for Later", id: "save" }
  ]
});
```

List Menu

```javascript
await sendButtons(sock, jid, {
  text: "Select your preference:",
  buttons: [
    {
      title: "Settings",
      sections: [
        {
          title: "Language",
          rows: [
            { id: "lang_en", title: "English", description: "Switch to English" },
            { id: "lang_es", title: "Spanish", description: "Cambiar a español" }
          ]
        },
        {
          title: "Notifications",
          rows: [
            { id: "notif_on", title: "Enable", description: "Turn on notifications" },
            { id: "notif_off", title: "Disable", description: "Turn off notifications" }
          ]
        }
      ]
    }
  ]
});
```

Complete Example

```javascript
const { sendButtons } = require('xibs-btn');

async function sendWelcomeMessage(sock, jid) {
  await sendButtons(sock, jid, {
    text: "🎉 Welcome to our bot!",
    footer: "How can I help you today?",
    image: "https://example.com/welcome.jpg",
    buttons: [
      { text: "📖 Guide", id: "guide" },
      { text: "🌐 Website", url: "https://example.com" },
      { text: "📞 Support", number: "+1234567890" },
      { text: "🎁 Promo", code: "WELCOME50" },
      {
        title: "⚙️ Quick Actions",
        sections: [
          {
            title: "Account",
            rows: [
              { id: "profile", title: "Profile", description: "View your profile" },
              { id: "settings", title: "Settings", description: "Change preferences" }
            ]
          },
          {
            title: "Help",
            rows: [
              { id: "faq", title: "FAQ", description: "Common questions" },
              { id: "contact", title: "Contact", description: "Talk to human" }
            ]
          }
        ]
      }
    ]
  });
}
```

📚 API Reference

sendButtons(sock, jid, config)

Parameter Type Description
sock Object Baileys socket instance
jid String WhatsApp JID (user@c.us or group@g.us)
config Object Configuration object

Config Object

Field Type Description
text String Main message text
footer String Optional footer text
image String/Buffer/Object Image URL, buffer, or object
buttons Array Array of button objects
ephemeralExpiration Number Optional disappearing messages duration

Button Object Types

Quick Reply:

```javascript
{ text: string, id?: string }  // id defaults to text
```

URL Button:

```javascript
{ text: string, url: string }
```

Copy Button:

```javascript
{ text: string, code: string }
```

Call Button:

```javascript
{ text: string, number: string }
```

List Menu:

```javascript
{
  title: string,
  sections: [{
    title?: string,
    rows: [{
      id: string,
      title: string,
      description?: string
    }]
  }]
}
```

🔧 Requirements

· Node.js 20+
· Baileys 7.0.0+

🤝 Contributing

Contributions are welcome! Please open an issue or PR.

📄 License

MIT © xibsx

🌟 Support

· ⭐ Star this repo if you find it useful
· 🐛 Report issues on GitHub
· 💬 Questions? Open a discussion
