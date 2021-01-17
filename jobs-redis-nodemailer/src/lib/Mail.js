import nodemailer from 'nodemailer'
import mailConfog from '../config/mail'

export default nodemailer.createTransport(mailConfog)