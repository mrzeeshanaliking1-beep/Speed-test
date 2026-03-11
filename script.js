// Internet Speed Checker Script

// Function to check download speed
async function checkDownloadSpeed() {
    const startTime = new Date().getTime();
    const response = await fetch('https://speed.hetzner.de/100MB.bin');
    const data = await response.blob();
    const endTime = new Date().getTime();

    const speedMbps = (data.size * 8) / ((endTime - startTime) / 1000) / (1024 * 1024);
    return speedMbps;
}

// Function to check upload speed
async function checkUploadSpeed() {
    const startTime = new Date().getTime();
    const data = new Blob(new Array(1024 * 1024 * 10).fill('a')); // 10 MB of data
    const response = await fetch('https://example.com/upload', { // replace with actual upload URL
        method: 'POST',
        body: data,
    });
    const endTime = new Date().getTime();

    const speedMbps = (data.size * 8) / ((endTime - startTime) / 1000) / (1024 * 1024);
    return speedMbps;
}

// Function to check ping
function checkPing() {
    const startTime = new Date().getTime();
    return new Promise((resolve) => {
        fetch('https://www.google.com', { method: 'HEAD' })
            .then(() => {
                const endTime = new Date().getTime();
                resolve(endTime - startTime);
            });
    });
}

// Function to save speed test history
function saveSpeedHistory(downloadSpeed, uploadSpeed, ping) {
    const history = JSON.parse(localStorage.getItem('speedHistory')) || [];
    history.push({ downloadSpeed, uploadSpeed, ping, date: new Date().toISOString() });
    localStorage.setItem('speedHistory', JSON.stringify(history));
}

// Main function to test speed
async function testInternetSpeed() {
    const downloadSpeed = await checkDownloadSpeed();
    const uploadSpeed = await checkUploadSpeed();
    const ping = await checkPing();
    saveSpeedHistory(downloadSpeed, uploadSpeed, ping);
    return { downloadSpeed, uploadSpeed, ping };
}

// To run the speed test
testInternetSpeed().then(result => console.log(result));
