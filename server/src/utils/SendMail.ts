import nodemailer from "nodemailer";

export const sendMail = async (userMail: string, subject: string, content: string) => {
    if (!userMail) {
        throw new Error("User email is required.");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 2525,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"Todoist" <hermanjoshi123@gmail.com>',
            to: userMail,
            subject: subject || "",
            text: content,
        });

        console.log("Message sent: ", info.messageId);

    } catch (error) {
        console.error("Error while sending mail:", error);
    }
}