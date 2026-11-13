import { useForm } from 'react-hook-form'

function App() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input {...register('name', {
                required: true
            })} />

            <div>{errors.name && <p>{errors.name.message || "errorewf"}</p>}</div>

            <input {...register('email', {
                required: 'Email required'
            })} />

            {errors.email && <p>{errors.email.message}</p>}

            <button type="submit">Send</button>

        </form>
    )
}

export default App