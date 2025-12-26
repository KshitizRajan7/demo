function generateTempEmail() {
    return `testuser${Date.now()}@dycq7pcr.mailosaur.net`;
}

function generateRandomPhone() {
    return '9' + Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
}

module.exports = { generateTempEmail, generateRandomPhone };
