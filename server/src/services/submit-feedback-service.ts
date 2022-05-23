import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "New Feedback",
      body: [
        `<div style="font-family: sans-serif font-size: 16px color: #222">`,
        `<p>Feedget type: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        `<div>`,
      ].join("\n"),
    });
  }
}
