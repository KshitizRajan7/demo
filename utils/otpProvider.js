const { mailosaur, SERVER_ID } = require("../config/mailosaur");

async function getOtp(tempEmail) {
    const message = await mailosaur.messages.get(SERVER_ID, {
        sentTo: tempEmail
    });
    const otp = message.text.body.match(/\d{6}/)[0];
    return otp;
}
module.exports = { getOtp };
