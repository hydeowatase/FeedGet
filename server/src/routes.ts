import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8083cfd7c54f31",
    pass: "7656d85b3b16f0",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: { type, comment, screenshot },
  });

  await transport.sendMail({
    from: "Equipe HMW - Solution - Feedget",
    to: "Hydeo Watase <hydeowatase@gmail.com>",
    subject: "New feedget",
    html: [
      `<div style="font-family: sans-serif font-size: 16px color: #222">`,
      `<p>Feedget type: ${type}</p>`,
      `<p>Comment: ${comment}</p>`,
      `<div>`,
    ].join("\n"),
  });

  return res.status(201).json(feedback);
});
