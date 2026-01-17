import { sendAdminNotification, sendCustomerConfirmation } from '@/lib/email-service'
import { NextRequest, NextResponse } from 'next/server'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, recordingUrl } = body

    // Validation
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Check if recording URL is too large (base64 strings can be huge)
    // If it's too large, we'll just indicate recording was received without sending it
    const hasRecording = recordingUrl ? recordingUrl.length > 0 : false
    const recordingSizeInKB = hasRecording ? Math.round(recordingUrl.length / 1024) : 0
    const shouldIncludeRecording = recordingSizeInKB < 500 // Only include if less than 500KB

    // Prepare email data (without base64 recording if too large)
    const contactData = {
      name,
      email,
      phone,
      service,
      message,
      hasRecording: hasRecording && shouldIncludeRecording,
      recordingSizeInKB,
      recordingPresent: hasRecording, // Always indicate if recording was present
    }

    // Send both emails in parallel
    const [adminResult, customerResult] = await Promise.all([
      sendAdminNotification(contactData),
      sendCustomerConfirmation(contactData),
    ])

    if (!adminResult.success || !customerResult.success) {
      console.error('Email sending failed:', { adminResult, customerResult })
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been submitted successfully! We will contact you within 24 hours.',
        recordingNote: hasRecording ? 'Voice message received and will be available in our system.' : '',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
