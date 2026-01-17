import { z } from "zod";

export const EnquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  phone: z
    .string()
    .regex(/^[0-9\s\-\+()]+$/, "Invalid phone format")
    .min(10, "Phone must be at least 10 digits"),

  email: z.string().email("Invalid email address"),

  serviceType: z.enum([
    "installation",
    "maintenance",
    "repair",
    "modernization",
    "consultation",
    "emergency",
  ]),

  productType: z
    .enum([
      "passenger-elevator",
      "freight-elevator",
      "escalator",
      "dumbwaiter",
      "other",
    ])
    .optional(),

  city: z
    .string()
    .min(2, "City name required")
    .max(50, "City name too long"),

  state: z
    .string()
    .min(2, "State name required")
    .max(50, "State name too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),

  isEmergency: z.boolean().default(false),

  honeypot: z.string().optional(), // Should be empty
});

export type EnquiryFormData = z.infer<typeof EnquirySchema>;

// Voice file validation
export const VoiceFileSchema = z.object({
  name: z.string().regex(/\.wav$|\.mp3$|\.m4a$/, "Invalid audio format"),
  size: z.number().max(5 * 1024 * 1024, "File must be less than 5MB"),
  type: z.string().regex(/audio\//, "File must be an audio file"),
});
