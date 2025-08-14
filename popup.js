const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },
        async (results) => {
            const [data] = results;
            if (data && data.result) {
                const color = data.result.sRGBHex;
                colorGrid.style.backgroundColor = color;
                colorValue.textContent = color;

                chrome.storage.sync.set({ color });

                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error('Clipboard write failed:', err);
                }
            }
        }
    );
});

function pickColor() {
    return new EyeDropper().open();
}
