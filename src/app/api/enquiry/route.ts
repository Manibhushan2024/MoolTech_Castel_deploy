import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const enquiry = {
      timestamp: new Date().toISOString(),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      serviceArea: formData.get("serviceArea"),
      address: formData.get("address"),
      requestType: formData.get("requestType"),
      productType: formData.get("productType"),
      description: formData.get("description"),
      hasVoiceNote: formData.has("voiceNote"),
    }

    console.log("New Enquiry Received:", enquiry)

    return NextResponse.json({
      success: true,
      message: "Enquiry received successfully. We will contact you soon!",
      enquiry,
    })
  } catch (error) {
    console.error("Error processing enquiry:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error processing your enquiry. Please try again.",
      },
      { status: 500 }
    )
  }
}