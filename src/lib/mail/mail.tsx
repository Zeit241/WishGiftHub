"use server"

import { createTransport } from "nodemailer"
import { render } from '@react-email/render';
import MyTemplate from "@/lib/mail/emails/email-template";
import AuthEmail from "./emails/email-auth";

export default async function CustomSendVerificationRequest(params: any) {
    const { identifier, url, provider, theme } = params
    console.log(111)
    const { host } = new URL(url)
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT!),
        secure: false,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    })
    const result = await transport.sendMail({
        to: "to@example.com",
        from: "from1@example.com",
        subject: `Sign in to WISHGIFTHUB`,
        text: text({ url, host }),
        html: html({ url, host, theme }),
    })
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
    }
}

function html(params: { url: string; host: string; theme: any }) {
    const { url, host, theme } = params

    const escapedHost = host.replace(/\./g, "&#8203;.")

    const brandColor = theme?.brandColor || "#346df1"
    const color = {
        background: "#f9f9f9",
        text: "#444",
        mainBackground: "#fff",
        buttonBackground: brandColor,
        buttonBorder: brandColor,
        buttonText: theme?.buttonText || "#fff",
    }

    const htmlPage = render((<MyTemplate children={<AuthEmail BaseLink="https://localhost:3000/api/test" AuthLink="" />} />), {
        pretty: true,
    });

    return htmlPage
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}