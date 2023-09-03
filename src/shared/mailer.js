import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.MAILER_USER,
    pass: config.MAILER_PASS
  }
})

export const sendMail = async (targetMail, ticket, purchased, stillInCart ,paymentUrl) => {
  const subjectText = 'Order confirmation from The Coffeeshop'
  const body = `
  <html>
    <h1>One last Step!</h1>
    <p>Your order number ${ticket.code} will be recieved once you complete the payment<p>
    <p>Click on the following link to complete the payment</p>
    <a href='${paymentUrl}'>Complete payment</a>
    <p>Order details:</p>
    <ul>
      ${purchased.forEach(product => `<li>${product.quantity}x ${product.product.title} --- Unit Price $${product.product.price} = $${product.product.price * product.quantity}</li>`)}
    </ul>
    <p>Total: $${ticket.amount}</p>
    <br>
    ${stillInCart.length > 0 ? `<h3>Some products are out of stock</h3>` : ''}
    <ul>
    ${stillInCart.forEach(product => `<li>${product.quantity}x ${product.product.title} --- Unit Price $${product.product.price} = $${product.product.price * product.quantity}</li>`)}
    </ul>
  </html>`

  return await transporter.sendMail({
    from: config.MAILER_USER,
    to: targetMail,
    subject: subjectText,
    html: body
  })
}

export const forgotPasswordMailer = async (targetMail, token) => {
  const subjectText = 'Password reset request'
  const body = `
  <html>
    <h1>Reset your password</h1>
    <p><strong>Click on the following link to reset your password</strong></p>
    <a href='http://${config.HOST_URL}${config.PORT}/api/sessions/reset-password?token=${token}'>Reset password</a>
    <h4 color='red'>Don't share it with anyone!!</h4>
  </html>`
  return await transporter.sendMail({
    from: config.MAILER_USER,
    to: targetMail,
    subject: subjectText,
    html: body
  })
}