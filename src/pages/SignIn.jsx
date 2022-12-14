import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'



function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth,
                email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
        }
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="pageContainer">
                <header>
                    <h2 className='pageHeader'>Welcome Back</h2>
                </header>

                <main>
                    <form onSubmit={onSubmit}>
                        <input type="email" className="emailInput"
                            placeholder='Email' id='email' value={email}
                            onChange={onChange} />
                        <div className="passwordInputDiv">
                            <input type={showPassword ? 'text' : 'password'}
                                className='passwordInput' placeholder='Password'
                                id='password' value={password} onChange={onChange} />

                            <img src={visibilityIcon} alt='show password'
                                className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>

                        <div className='forgotPassword'>
                            <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
                        </div>

                        <div className="signInBar">
                            <p className="signInText">
                                Sign In
                            </p>

                            <button className="signInButton">
                                <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                            </button>
                        </div>
                    </form>

                    <OAuth />

                    <Link to='/sign-up' className='registerLink' >
                        Sign Up Instead
                    </Link>
                </main>
            </div>
        </motion.div >
    )
}

export default SignIn
