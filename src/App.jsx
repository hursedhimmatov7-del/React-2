import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function getUsers() {
    const users = localStorage.getItem('user')
    return users ? JSON.parse(users) : []
}

function App() {
    const [success, setSuccess] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Minimum 3 characters')
            .required('Name is required'),

        email: Yup.string()
            .email('Invalid email')
            .required('Email is required')
    })

    const onSubmit = (data, {resetForm}) => {
        const users = getUsers()

        localStorage.setItem('user', JSON.stringify([...users, data]))

        setSuccess(true)

        setTimeout(() => {
            setSuccess(false)
        }, 2000)

        resetForm()
    }

    return (
        <div >

            <Formik
                initialValues={{
                    name: '',
                    email: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form className="flex flex-col gap-3 w-80">

                    <Field
                        name="name"
                        placeholder="Name"
                        className="border p-2 rounded"
                    />

                    <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500"
                    />

                    <Field
                        name="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                    />

                    <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500"
                    />

                    <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                        Send
                    </button>

                </Form>

            </Formik>

            <div className={`mt-4 bg-green-500 text-white p-3 rounded transition-all duration-500 ${
                success ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}>
                ✓ User added successfully!
            </div>

        </div>
    )
}

export default App