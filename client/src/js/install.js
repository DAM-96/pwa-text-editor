const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.hidden = false
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptMessage = window.deferredPrompt;
    if (!promptMessage) return null;
    promptMessage.prompt();

    // Reset and hide button
    window.deferredPrompt = null;
    butInstall.hidden = true;
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
