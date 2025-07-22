import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${options.to}`);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  // Welcome email template
  async sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E3A8A; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { background: #333; color: white; padding: 10px; text-align: center; }
          .btn { background: #2563EB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Techno Computers!</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Thank you for joining Techno Computers. We're excited to have you as part of our community!</p>
            <p>You can now:</p>
            <ul>
              <li>Browse our extensive collection of computer products</li>
              <li>Add items to your cart and place orders</li>
              <li>Track your order history</li>
              <li>Manage your profile and preferences</li>
            </ul>
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Happy shopping!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Techno Computers. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: userEmail,
      subject: 'Welcome to Techno Computers!',
      html,
      text: `Welcome to Techno Computers, ${userName}! Thank you for joining our community.`
    });
  }

  // Order confirmation email template
  async sendOrderConfirmationEmail(
    userEmail: string, 
    userName: string, 
    orderId: string, 
    orderTotal: number,
    items: any[]
  ): Promise<void> {
    const itemsHtml = items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${item.price.toLocaleString()}.00</td>
        <td>Rs. ${(item.price * item.quantity).toLocaleString()}.00</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E3A8A; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { background: #333; color: white; padding: 10px; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .total { font-weight: bold; font-size: 1.2em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Thank you for your order! Your order has been confirmed and is being processed.</p>
            
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h3>Items Ordered:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <p class="total">Total Amount: Rs. ${orderTotal.toLocaleString()}.00</p>
            
            <p>We'll send you another email when your order ships. You can track your order status in your account.</p>
            
            <p>Thank you for choosing Techno Computers!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Techno Computers. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: userEmail,
      subject: `Order Confirmation - ${orderId}`,
      html,
      text: `Your order ${orderId} has been confirmed. Total: Rs. ${orderTotal.toLocaleString()}.00`
    });
  }

  // Order status update email template
  async sendOrderStatusUpdateEmail(
    userEmail: string, 
    userName: string, 
    orderId: string, 
    newStatus: string
  ): Promise<void> {
    const statusMessages = {
      processing: 'Your order is now being processed and will be shipped soon.',
      shipped: 'Great news! Your order has been shipped and is on its way to you.',
      delivered: 'Your order has been delivered successfully. Thank you for shopping with us!',
      cancelled: 'Your order has been cancelled. If you have any questions, please contact our support team.'
    };

    const message = statusMessages[newStatus as keyof typeof statusMessages] || 'Your order status has been updated.';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E3A8A; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { background: #333; color: white; padding: 10px; text-align: center; }
          .status { background: #2563EB; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>We have an update on your order <strong>${orderId}</strong>.</p>
            
            <div class="status">
              <h3>Status: ${newStatus.toUpperCase()}</h3>
            </div>
            
            <p>${message}</p>
            
            <p>You can track your order status anytime by logging into your account.</p>
            
            <p>Thank you for choosing Techno Computers!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Techno Computers. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: userEmail,
      subject: `Order Update - ${orderId}`,
      html,
      text: `Order ${orderId} status updated to: ${newStatus}. ${message}`
    });
  }
}

export default new EmailService();