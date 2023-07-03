import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.mailerUser,
    pass: config.mailerPass
  }
})

const sendMail = async (targetMail, ticket, cart) => {
  const subjectText = "Order confirmation from The Coffeeshop"
  const body = `
  <html>
    <h1>Thank you for your purchase</h1>
    <p>Your order number ${ticket.code} has been recieved<p>
    <p>Order details:</p>
    <ul>
      ${cart.products.map(product => `<li>${product.quantity}x ${product.product.title} --- Unit Price $${product.product.price} = $${product.product.price * product.quantity}</li>`)}
    </ul>
    <p>Total: ${ticket.amount}</p>
  </html>`

  return await transporter.sendMail({
    from: config.mailerUser,
    to: targetMail,
    subject: subjectText,
    html: body
  })
}

export default sendMail