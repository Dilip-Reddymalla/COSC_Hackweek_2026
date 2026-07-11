document.getElementById("replaceBtn").addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    console.log(tab);

    chrome.tabs.sendMessage(tab.id, {
        action: "replaceImages"
    }, () => {
        console.log(chrome.runtime.lastError);
    });

});