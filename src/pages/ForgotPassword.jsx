import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'



function ForgotPassword() {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const onChange = (e) => setEmail(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('Email was sent')

            navigate('/sign-in')

        } catch (error) {
            toast.error('Could not sent reset email')
        }

    }

    return (
        <div className="pageContainer">
            <header>
                <h2 className='pageHeader'>Forgot Password</h2>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input type="email" className='emailInput' placeholder='Email'
                        id='email' value={email} onChange={onChange} />

                    <div className="forgotPassword">
                        <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
                    </div>

                    <div className="signInBar">
                        <div className="signInText">Set Reset Link</div>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword
