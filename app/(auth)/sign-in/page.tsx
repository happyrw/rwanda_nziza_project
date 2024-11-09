// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignIn from '@/components/auth/signIn'
// import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'

const SignInPage = () => {

    // const session = await getServerSession(authOptions as any);
    // if (session) redirect("/");

    return (
        <div className='bg-gray-500 h-screen overflow-y-auto px-2 md:px-10 no-scrollbar'>
            <SignIn />
        </div>
    )
}

export default SignInPage;
