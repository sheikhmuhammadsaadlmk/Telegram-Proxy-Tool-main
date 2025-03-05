document.addEventListener('DOMContentLoaded', function() {
    let currentProxyData = null;
    const proxyLinks = [];

    // Fetch proxy data from file
    async function fetchProxyData() {
        try {
            const response = await fetch('/assets/data.txt');
            const text = await response.text();
            return text.split('\n').filter(line => line.trim());
        } catch (error) {
            console.error('Error fetching proxy data:', error);
            return [];
        }
    }

    // Parse proxy URL
    function parseProxyUrl(url) {
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        return {
            server: params.get('server'),
            port: params.get('port'),
            secret: params.get('secret'),
            fullUrl: url
        };
    }

    // Update UI with proxy data
    function updateProxyDisplay(proxyData) {
        document.getElementById('server').textContent = proxyData.server;
        document.getElementById('port').textContent = proxyData.port;
        document.getElementById('secret').textContent = proxyData.secret;
        currentProxyData = proxyData;
    }

    // Generate random proxy
    function getRandomProxy() {
        const randomIndex = Math.floor(Math.random() * proxyLinks.length);
        return parseProxyUrl(proxyLinks[randomIndex]);
    }

    // Initialize proxy tool
    async function initProxyTool() {
        const links = await fetchProxyData();
        proxyLinks.push(...links);
        
        if (proxyLinks.length > 0) {
            const initialProxy = getRandomProxy();
            updateProxyDisplay(initialProxy);
        }
    }

    // Event Listeners
    document.getElementById('generateNew').addEventListener('click', function() {
        const newProxy = getRandomProxy();
        updateProxyDisplay(newProxy);
    });

    document.getElementById('openTelegram').addEventListener('click', function() {
        if (currentProxyData) {
            window.location.href = currentProxyData.fullUrl;
        }
    });

    // Initialize
    initProxyTool();
});
