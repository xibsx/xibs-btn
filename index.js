const { proto } = require('@whiskeysockets/baileys');

/**
 * Send interactive buttons with Baileys 7.x.x
 * @param {Object} sock - Baileys socket instance
 * @param {String} jid - WhatsApp JID (user or group)
 * @param {Object} config - Button configuration
 * @param {String} config.text - Main message text
 * @param {String} [config.footer] - Optional footer text
 * @param {String|Object} [config.image] - Optional image (URL, buffer, or path)
 * @param {Array} config.buttons - Array of button objects
 * @returns {Promise<Object>} Sent message object
 */
async function sendButtons(sock, jid, config) {
  const { text, footer, image, buttons = [] } = config;
  
  // Build interactive message
  const interactiveMsg = {
    interactiveMessage: {
      body: { text: text || '' }
    }
  };
  
  // Add footer if provided
  if (footer) {
    interactiveMsg.interactiveMessage.footer = { text: footer };
  }
  
  // Add image if provided
  if (image) {
    interactiveMsg.interactiveMessage.header = {
      imageMessage: await processImage(image)
    };
  }
  
  // Convert buttons to native flow format
  const nativeButtons = [];
  for (const btn of buttons) {
    const converted = convertButton(btn);
    if (converted) {
      nativeButtons.push(converted);
    }
  }
  
  // Add native flow message
  if (nativeButtons.length > 0) {
    interactiveMsg.interactiveMessage.nativeFlowMessage = {
      buttons: nativeButtons
    };
  }
  
  // Prepare additional nodes for binary injection (required for buttons)
  const isGroup = jid.includes('@g.us');
  const additionalNodes = [];
  
  // Add biz node with interactive flow
  additionalNodes.push({
    tag: 'biz',
    attrs: {},
    content: [
      {
        tag: 'interactive',
        attrs: { native_flow: '1' },
        content: [
          {
            tag: 'native_flow',
            attrs: { name: 'mixed', v: '2' }
          }
        ]
      }
    ]
  });
  
  // Add bot node for private chats (enables AI features)
  if (!isGroup) {
    additionalNodes.push({
      tag: 'bot',
      attrs: { biz_bot: '1' }
    });
  }
  
  // Send with Baileys 7.x.x API
  return sock.sendMessage(jid, interactiveMsg, {
    additionalNodes,
    ephemeralExpiration: config.ephemeralExpiration
  });
}

/**
 * Convert button to native flow format
 */
function convertButton(btn) {
  // Auto-detect button type
  if (btn.sections) {
    // List menu (single_select)
    return {
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: btn.title || 'Select Option',
        sections: btn.sections
      })
    };
  }
  
  if (btn.url) {
    // URL button
    return {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: btn.text || 'Open Link',
        url: btn.url
      })
    };
  }
  
  if (btn.code) {
    // Copy button
    return {
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({
        display_text: btn.text || 'Copy',
        copy_code: btn.code
      })
    };
  }
  
  if (btn.number) {
    // Call button
    return {
      name: 'cta_call',
      buttonParamsJson: JSON.stringify({
        display_text: btn.text || 'Call',
        phone_number: btn.number
      })
    };
  }
  
  // Default: Quick reply button
  if (btn.text) {
    return {
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({
        display_text: btn.text,
        id: btn.id || btn.text.toLowerCase().replace(/\s/g, '_')
      })
    };
  }
  
  return null;
}

/**
 * Process image from URL, buffer, or path
 */
async function processImage(image) {
  if (typeof image === 'string') {
    // URL or path
    if (image.startsWith('http')) {
      // Download from URL
      const response = await fetch(image);
      const buffer = Buffer.from(await response.arrayBuffer());
      return {
        image: buffer,
        mimetype: response.headers.get('content-type') || 'image/jpeg'
      };
    }
    // Local path - you'd need fs.readFile here
    return { image, mimetype: 'image/jpeg' };
  }
  
  if (Buffer.isBuffer(image)) {
    return { image, mimetype: 'image/jpeg' };
  }
  
  return image;
}

module.exports = { sendButtons };