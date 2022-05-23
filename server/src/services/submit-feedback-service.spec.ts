import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example test.",
        screenshot: "data:image/png;base64,[testingotherstring]",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example test.",
        screenshot: "data:image/png;base64,[testingotherstring]",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,[testingotherstring]",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with invalid screenshot.", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example test.",
        screenshot: "invalid-screenshot.jpg",
      })
    ).rejects.toThrow();
  });
});
