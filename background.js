chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Accessibility Assistant Installed");
    chrome.storage.local.set({
        ttsEnabled: false,
        ttsLang: "en-US",
        dyslexiaFontEnabled: false,
        highContrastEnabled: false,
        voiceCommandEnabled: false
    });

    chrome.contextMenus.create({
        id: "speakText",
        title: "Read Aloud",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "speakText") {
        chrome.storage.local.get(["ttsLang"], function(data) {
            const lang = data.ttsLang || "en-US";
            chrome.tabs.sendMessage(tab.id, {
                action: "readAloud",
                text: info.selectionText,
                lang: lang
            });
        });
    }
});

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//     if (info.menuItemId === "speakText") {
//         chrome.storage.local.get(["ttsLang"], function(data) {
//             const lang = data.ttsLang || "en-US";
//             chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 function: readTextAloud,
//                 args: [info.selectionText, lang]
//             });
//         });
//     }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "readAloud") {
//         readTextAloud(message.text, message.lang);
//         sendResponse({ status: "reading" });
//     }
//     return true;
// });

// function readTextAloud(text, lang) {
//     if (!text || !lang) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang;
//     utterance.onerror = (event) => console.error('Speech error:', event.error);
//     speechSynthesis.speak(utterance);
// }