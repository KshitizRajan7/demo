const MailosaurClient = require('mailosaur');

const MAILOSAUR_API_KEY = 'wIjBAKPFaJ4WU2H1vxtoZpSALsjVnT0f';
const SERVER_ID = 'dycq7pcr';
const mailosaur = new MailosaurClient(MAILOSAUR_API_KEY);

module.exports = { mailosaur, SERVER_ID }