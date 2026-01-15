import { Request, Response } from "express";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function handleContact(req: Request, res: Response) {
  try {
    const data = contactSchema.parse(req.body);

    // TODO: Implement actual email sending logic here
    // For now, just log the contact submission
    console.log("Contact form submission:", data);

    // In production, you would:
    // 1. Send email via service like SendGrid, AWS SES, etc.
    // 2. Save to database
    // 3. Send notification to admin

    res.json({ success: true, message: "Message received successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
