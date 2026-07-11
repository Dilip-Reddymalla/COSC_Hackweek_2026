function replaceImage(img) {
    img.src = `https://cataas.com/cat?${Math.random()}`;
    img.removeAttribute("srcset");
}

function replaceExistingImages() {
    document.querySelectorAll("img").forEach(replaceImage);
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {

            if (node.nodeType !== Node.ELEMENT_NODE) return;

            if (node.tagName === "IMG") {
                replaceImage(node);
            }

            node.querySelectorAll?.("img").forEach(replaceImage);

        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

chrome.runtime.onMessage.addListener((message) => {

    if (message.action === "replaceImages") {
        replaceExistingImages();
    }

});