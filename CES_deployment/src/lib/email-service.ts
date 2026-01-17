import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  hasRecording?: boolean
  recordingSizeInKB?: number
  recordingPresent?: boolean
}

// Email to admin
export async function sendAdminNotification(data: ContactFormData) {
  try {
    const { name, email, phone, service, message, recordingPresent } = data

    const emailContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <div style="border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin: 0; font-size: 28px;">🎉 New Inquiry Received!</h2>
            <p style="color: #666; margin: 5px 0 0 0;">Time: ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #eff6ff; border-left: 4px solid #1e40af; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Customer Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 30%;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #1e40af; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #1e40af; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td>
                <td style="padding: 8px 0; color: #333;"><strong>${service}</strong></td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #d97706;">Message</h3>
            <p style="margin: 0; color: #333; line-height: 1.6;">${message}</p>
          </div>

          ${recordingPresent ? `
            <div style="background: #dbeafe; border-left: 4px solid #0284c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0284c7;">🎤 Voice Recording Attached</h3>
              <p style="margin: 0; color: #333;"><strong>✓ Customer has included a voice message with this inquiry</strong></p>
              <p style="margin: 10px 0 0 0; color: #0284c7; font-size: 12px;"><em>Note: Voice recording is stored in our system and available for playback in the admin dashboard</em></p>
            </div>
          ` : ''}

          <div style="text-align: center; margin: 20px 0;">
            <a href="mailto:${email}?subject=Re: Your CastleElevator Inquiry" style="display: inline-block; background: #1e40af; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-right: 10px;">📧 Reply Email</a>
            <a href="tel:${phone}" style="display: inline-block; background: #059669; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">📞 Call Now</a>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 5px 0;">CastleElevator - Premium Elevator Solutions</p>
            <p style="margin: 5px 0;">© 2025 All rights reserved</p>
          </div>

        </div>
      </div>
    `

    const response = await resend.emails.send({
      from: 'CastleElevator <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `🔔 New Inquiry from ${name} - ${service}${recordingPresent ? ' 🎤' : ''}`,
      html: emailContent,
    })

    console.log('Admin email sent successfully:', response)
    return { success: true, data: response }
  } catch (error) {
    console.error('Admin email error:', error)
    return { success: false, error }
  }
}

// Confirmation email to customer
export async function sendCustomerConfirmation(data: ContactFormData) {
  try {
    const { name, email, service } = data

    const emailContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 48px; margin-bottom: 10px;">🏢</div>
            <h1 style="color: #1e40af; margin: 0; font-size: 32px;">CastleElevator</h1>
            <p style="color: #666; margin: 5px 0;">Premium Elevator Solutions</p>
          </div>

          <div style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
            <h2 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h2>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">We've received your inquiry</p>
          </div>

          <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #059669;">What Happens Next?</h3>
            <div style="color: #333; line-height: 1.8;">
              <p>✓ Our team has received your ${service} service inquiry</p>
              <p>✓ We will review your request immediately</p>
              <p>✓ You'll be contacted within <strong>24 hours</strong></p>
              <p>✓ We'll provide you with a customized solution</p>
            </div>
          </div>

          <div style="background: #eff6ff; border-left: 4px solid #1e40af; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Your Inquiry Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #bfdbfe;">
                <td style="padding: 10px 0; color: #666;"><strong>Service Type:</strong></td>
                <td style="padding: 10px 0; color: #333; text-align: right;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #bfdbfe;">
                <td style="padding: 10px 0; color: #666;"><strong>Contact:</strong></td>
                <td style="padding: 10px 0; color: #333; text-align: right;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Submitted:</strong></td>
                <td style="padding: 10px 0; color: #333; text-align: right;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #d97706;">💡 While You Wait...</h3>
            <p style="margin: 10px 0; color: #333;">Check out our helpful resources:</p>
            <ul style="margin: 10px 0; padding-left: 20px; color: #333;">
              <li style="margin: 8px 0;"><a href="https://castlelevator.com/blog/elevator-safety-tips" style="color: #1e40af; text-decoration: none;">🔒 Elevator Safety Tips</a></li>
              <li style="margin: 8px 0;"><a href="https://castlelevator.com/blog/elevator-maintenance" style="color: #1e40af; text-decoration: none;">🔧 Maintenance Best Practices</a></li>
              <li style="margin: 8px 0;"><a href="https://castlelevator.com/blog" style="color: #1e40af; text-decoration: none;">📚 Read All Articles</a></li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://castlelevator.com" style="display: inline-block; background: #1e40af; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Visit Our Website</a>
          </div>

          <div style="background: white; border: 2px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Got Questions?</h3>
            <p style="margin: 10px 0; color: #333;">Feel free to reach out to us directly:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>📞 Call:</strong></td>
                <td style="padding: 8px 0; color: #333;"><a href="tel:+918285266082" style="color: #1e40af; text-decoration: none;">+91 828-5266-082</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>📧 Email:</strong></td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:support@castelelevator.com" style="color: #1e40af; text-decoration: none;">support@castelelevator.com</a></td>
              </tr>
            </table>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 5px 0;">CastleElevator - Premium Elevator Solutions</p>
            <p style="margin: 5px 0;">© 2025 All rights reserved</p>
          </div>

        </div>
      </div>
    `

    const response = await resend.emails.send({
      from: 'CastleElevator <onboarding@resend.dev>',
      to: email,
      subject: 'Thank You for Your Inquiry - CastleElevator ✅',
      html: emailContent,
    })

    console.log('Customer email sent successfully:', response)
    return { success: true, data: response }
  } catch (error) {
    console.error('Customer email error:', error)
    return { success: false, error }
  }
}
