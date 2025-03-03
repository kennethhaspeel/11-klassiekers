"use server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";


interface Props {
  bestemmelingen: string[];
  onderwerp: string;
  boodschap: string;
}
export async function ZendMail({
  bestemmelingen,
  onderwerp,
  boodschap,
}: Props) {
  const {
    MAIL_SERVER,
    MAIL_PASSWORD,
    MAIL_USERNAME,
    MAIL_SENDER_EMAIL,
    MAIL_PORT,
  } = process.env;
  console.log(
    MAIL_SERVER,
    MAIL_PASSWORD,
    MAIL_USERNAME,
    MAIL_SENDER_EMAIL,
    MAIL_PORT
  );
  const options: SMTPTransport.Options = {
    host: MAIL_SERVER,
    port: Number(MAIL_PORT),
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
    requireTLS: true,
    sender: `Do not REPLY <${MAIL_SENDER_EMAIL}>`,
  };
  const transport = nodemailer.createTransport(options);
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  try {
    for (const bestemmeling of bestemmelingen) {
      try {
        const sendResult = await transport.sendMail({
          from: MAIL_SENDER_EMAIL,
          to: bestemmeling,
          subject: onderwerp,
          html: boodschap,
        });

        console.log(sendResult);
        await delay(1500);
      } catch (error) {
        console.log(error);
      }
    }
    return { success: true, data: null };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}
