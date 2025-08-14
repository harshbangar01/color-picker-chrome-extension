console.log('Extension installed');

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('color', (result) => {
        if (!result.color) {
            chrome.storage.sync.set({ color: 'red' }, () => {
                console.log('Default color set to red');
            });
        } else {
            console.log('Color already set to:', result.color);
        }
    });
});
