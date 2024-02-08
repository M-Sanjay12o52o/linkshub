import SignupForm from '@/components/SignUpForm'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div>
        <SignupForm />
    </div>
}

export default page