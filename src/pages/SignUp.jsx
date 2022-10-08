import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const { name, email, password } = formData
    const navigate = useNavigate();


    const handleChange = (e) => {

        setFormData((prevstate) => ({
            ...prevstate,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {

            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name,
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')

        } catch (error) {
            toast.error('Something went wrong')
        }

    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}>
            <div className="pageContainer">
                <header>
                    <h2 className='pageHeader'>Sign Up</h2>
                </header>

                <main>
                    <form onSubmit={onSubmit}>
                        <input type="text" className='nameInput' onChange={handleChange}
                            placeholder='Name' id='name' value={name} />

                        <input type="email" className='emailInput' onChange={handleChange}
                            placeholder='Email' id='email' value={email} />

                        <div className="passwordInputDiv">

                            <input type={showPassword ? 'text' : 'password'} className='passwordInput' onChange={handleChange}
                                placeholder='Password' id='password' value={password} />

                            <img src={visibilityIcon} alt='Show Password' className='showPassword' onClick={() => {
                                setShowPassword((prevState) => !prevState)
                            }} />
                        </div>

                        <div className="signUpBar">
                            <p className='signUpText'>Sign Up</p>

                            <button className='signUpButton'>
                                <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                            </button>
                        </div>
                    </form>

                    <OAuth />
                    <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
                </main>
            </div>
        </motion.div>
    )
}

export default SignUp
