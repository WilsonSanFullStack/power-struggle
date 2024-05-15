import { Router, Request, Response,  } from "express";
import dotenv from "dotenv";
dotenv.config()
const router = Router();
import { Resend } from "resend";
console.log(process.env.resendApiKey)
const resend = new Resend(process.env.resendApiKey);

router.get("/", async (req: Request, res: Response) => {
  try {
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "hello world",
      html: "<strong>it works!</strong>",
    });
    
   return  res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
