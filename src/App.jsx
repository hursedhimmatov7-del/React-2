import  Formik  from './components/Formik.jsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function getUsers() {
    const users = localStorage.getItem('user')
    return users ? JSON.parse(users) : []
}

function App() {
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isValid}
    } = useForm({
      mod : 'onBlur',
       defaeultValues: {
        name: '',
        email: ''
    }
       
    })

    const onSubmit = (data) => {
        const users = getUsers()

        localStorage.setItem('user', JSON.stringify([...users, data]))

        setSuccess(true)

       setTimeout(() => {
            setSuccess(false)
        }, 2000)

        reset()
    }

    return (
        <div className="p-10">
<div className='w-325 m-auto my-15 flex items-start justify-between'>
    <div className='flex items-start flex-col gap-10'>
         <h1 className='font-semibold text-2xl '>React Hook Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-80">

                <input
                    {...register('name', {
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Minimum 3 characters'
                        }
                    })}
                    placeholder="Name"
                    className="border p-2 rounded"
                />

                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Invalid email'
                        }
                    })}
                    placeholder="Email"
                    className="border p-2 rounded"
                />

                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <button
    disabled={!isValid}
    type="submit"
    className={`p-2 rounded text-white ${
        isValid ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
    }`} 
>
    Send
</button>

            </form>

           
    </div>
    <div className='flex items-start flex-col gap-10'>
         <h1 className='font-semibold text-2xl '>Formik</h1>
  <Formik/>
    </div>
</div>

            <div className={`mt-4 bg-green-200 w-100 text-center m-auto absolute top-50 left-150 text-white p-3 rounded transition-all duration-500 ${
                success ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}>
                ✓ User added successfully! 
            </div>

           

        </div>
    )
}

export default App

