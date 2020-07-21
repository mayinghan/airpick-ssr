import config from '../config/config'
import nodemailer from 'nodemailer';

const authInfo = config.mailer.authInfo;

const sendMail = (recipent, subject, body) => {
	var mailOptions = {
		from: authInfo.user,
		to: recipent,
		subject: subject,
		html: body
	};

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: authInfo
	});

	transporter.sendMail(mailOptions, (err, res) => {
		if (err) {
			return console.log(err);
		} else {
			console.log('Send mail to %s successfully', recipent);
		}
	});
};

export default sendMail;