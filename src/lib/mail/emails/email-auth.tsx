import { Button } from "@react-email/button";

type AuthEmailProps = {
    AuthLink: string
    BaseLink: string
}

export default function AuthEmail({ AuthLink, BaseLink }: AuthEmailProps): JSX.Element {
    return <>
        <div className='bg-[#020817] text-white font-sans m-0 p-4'>
            <h1>Hello,</h1>
            <p>Welcome to WishGiftHub! We're excited to have you join our platform.</p>
            <p>This email is to confirm that your first-time login was successful.</p>
            <p>If you initiated this login, no further action is needed from your side.</p>
            <p>If you did not attempt to log in or have any concerns, please <a href={BaseLink}>contact our support</a> team immediately.</p>
            <div className='w-full flex items-center justify-center m-4'>
                <Button href={AuthLink} className='p-4 rounded-md bg-sky-500'>Join Us</Button>
            </div>

            <p>Thank you for choosing WishGiftHub as your platform of choice!</p>
        </div>
    </>
}