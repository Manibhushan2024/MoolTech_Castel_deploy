import { NextRequest, NextResponse } from "next/server"
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email-service"
import { checkRateLimit, getRateLimitInfo } from "@/lib/rate-limit"
import { EnquirySchema, VoiceFileSchema } from "@/lib/validation"
import { z } from "zod"

// Generate unique enquiry ID
function generateEnquiryId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `ENQ-${timestamp}-${random}`.toUpperCase()
}

// Get client IP
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  return forwarded ? forwarded.split(",")[0].trim() : "unknown"
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Rate limiting check
    if (!checkRateLimit(clientIp)) {
      const rateLimitInfo = getRateLimitInfo(clientIp);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(
            (rateLimitInfo.resetTime - Date.now()) / 1000
          ),
        },
        { status: 429 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    let formData: Record<string, any> = {};
    let voiceFile: Buffer | null = null;
    let voiceFileName: string | null = null;

    // Parse request body
    if (contentType.includes("application/json")) {
      formData = await request.json();
    } else if (contentType.includes("multipart/form-data")) {
      const data = await request.formData();
      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          voiceFile = Buffer.from(await value.arrayBuffer());
          voiceFileName = value.name;
          // Validate voice file
          try {
            VoiceFileSchema.parse({
              name: value.name,
              size: value.size,
              type: value.type,
            });
          } catch (error) {
            return NextResponse.json(
              { success: false, error: "Invalid voice file" },
              { status: 400 }
            );
          }
        } else {
          formData[key] = value;
        }
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid content type" },
        { status: 400 }
      );
    }

    // Honeypot check (spam protection)
    if (formData.honeypot && formData.honeypot.trim() !== "") {
      console.warn("Honeypot triggered from IP:", clientIp);
      return NextResponse.json(
        { success: true, enquiryId: generateEnquiryId() }, // Fake success
        { status: 200 }
      );
    }

    // Parse boolean isEmergency
    formData.isEmergency =
      formData.isEmergency === "true" || formData.isEmergency === true;

    // Validate form data
    const validatedData = EnquirySchema.parse(formData);

    // Generate unique ID
    const enquiryId = generateEnquiryId();

    // TODO: Save to database (Phase 4.2)
    // const enquiry = await db.enquiries.create({
    //   id: enquiryId,
    //   ...validatedData,
    //   voiceFileName,
    //   ipAddress: clientIp,
    //   createdAt: new Date(),
    // });

    // Send email to admin
    await sendAdminNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.serviceType || "general",
      message: validatedData.message,
      recordingPresent: !!voiceFileName,
      recordingSizeInKB: voiceFileName ? Math.round(voiceFileName.length / 1024) : undefined,
    })

    // Send confirmation email to customer
    await sendCustomerConfirmation({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.serviceType || "general",
      message: validatedData.message,
    })

    return NextResponse.json(
      {
        success: true,
        enquiryId,
        message:
          "Your enquiry has been received. We will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Enquiry API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "Enquiry API is running",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
