import { useForm } from "@tanstack/react-form";
import { FieldInfo } from "../components/FieldInfo";
import { Link, useNavigate } from "react-router";

const Signup = () => {

    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            try {
                console.log(value);
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(value),
                })

                console.log(response);

                const data = await response.json();

                console.log(data);
                form.reset();
                navigate("/signin");
            } catch (error) {
                form.reset();
                console.log("Signup error: ", error);
            }
        }
    })

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center p-4">
            <div className="absolute w-full h-full flex items-center justify-center overflow-hidden lg:opacity-100 opacity-0">
                <style>
                    {`
                        @keyframes shadowLtToBr{
                            0%   { text-shadow: 0px 0px 0 #aaa; opacity: 0.5; }
                            10%  { text-shadow: -1px -1px 0 #aaa; }
                            15%  { text-shadow: -0.75px -1px 0 #aaa; }
                            20%  { text-shadow: -0.5px -1px 0 #aaa; }
                            25%  { text-shadow: -0.25px -1px 0 #aaa; }
                            30%  { text-shadow: 0px -1px 0 #aaa; }
                            35%  { text-shadow: 0.25px -1px 0 #aaa; }
                            40%  { text-shadow: 0.5px -1px 0 #aaa; }
                            45%  { text-shadow: 0.75px -1px 0 #aaa; }
                            50%  { text-shadow: 1px -1px 0 #aaa; }
                            55%  { text-shadow: 1px -0.75px 0 #aaa; }
                            60%  { text-shadow: 1px -0.5px 0 #aaa; }
                            65%  { text-shadow: 1px -0.25px 0 #aaa; }
                            70%  { text-shadow: 1px 0px 0 #aaa; }
                            75%  { text-shadow: 1px 0.25px 0 #aaa; }
                            80%  { text-shadow: 1px 0.5px 0 #aaa; }
                            85%  { text-shadow: 1px 0.75px 0 #aaa; }
                            90%  { text-shadow: 1px 0.85px 0 #aaa; }
                            95%  { text-shadow: 1px 0.95px 0 #aaa; }
                            100% { text-shadow: 1px 1px 0 #aaa; opacity: 1;}
                        }
                    `}
                </style>
                <h1
                    className="text-[20rem] text-black font-extrabold [text-shadow:1px_1px_0px_#aaa]"
                    style={{ animation: "shadowLtToBr 3s ease-in-out" }}
                >
                    TODOIST
                </h1>            
            </div>
            <div className="absolute w-full top-0 px-4 p-2">
                <Link to={"/"}>
                    <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-400 to-slate-500 tracking-tighter">TODOIST</h1>
                </Link>            </div>
            <div className="w-full max-w-xl p-10 rounded-3xl [box-shadow:inset_0px_0px_10px_#aaa] bg-neutral-800/50 backdrop-blur-sm relative text-white flex flex-col items-center justify-center gap-4">
                <div className="mb-4">
                    <h1 className="text-3xl">Sign Up...</h1>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="flex flex-col gap-4 w-full"
                >
                    <form.Field
                        name="username"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Username is required'
                                    : undefined,
                        }}
                        children={(field) => {
                            return (
                                <>
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor={field.name} className="px-2 mb-1">Username:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="username"
                                            className="bg-black rounded-md p-1 px-2 [box-shadow:0px_0px_4px_#aaa] focus:outline-none"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                </>
                            )
                        }}
                    />
                    <form.Field
                        name="email"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Email is required'
                                    : undefined,
                        }}
                        children={(field) => {
                            return (
                                <>
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor={field.name} className="px-2 mb-1">Email:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="email"
                                            className="bg-black rounded-md p-1 px-2 [box-shadow:0px_0px_4px_#aaa] focus:outline-none"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                </>
                            )
                        }}
                    />
                    <form.Field
                        name="password"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Password is required'
                                    : undefined,
                        }}
                        children={(field) => {
                            return (
                                <>
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor={field.name} className="px-2 mb-1">Password:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            type="password"
                                            placeholder="password"
                                            className="bg-black rounded-md p-1 px-2 [box-shadow:0px_0px_4px_#aaa] focus:outline-none"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                </>
                            )
                        }}
                    />

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <>
                                <div className="mt-4 w-full p-1.5 bg-black [box-shadow:0px_0px_6px_#aaa] rounded-2xl">
                                    <button type="submit" disabled={!canSubmit} className=" [box-shadow:inset_0px_0px_4px_#aaa] hover:[box-shadow:inset_0px_0px_6px_#aaa] hover:scale-105 w-full rounded-xl p-2 transition-all duration-300">
                                        {isSubmitting ? 'Signing up...' : 'Sign up'}
                                    </button>
                                </div>
                                {/* <button
                                    type="reset"
                                    onClick={(e) => {
                                        // Avoid unexpected resets of form elements (especially <select> elements)
                                        e.preventDefault()
                                        form.reset()
                                    }}
                                >
                                    Reset
                                </button> */}
                            </>
                        )}
                    />
                </form>
                <div>
                    <p className="text-sm italic text-neutral-500">Already registered! <Link to={"/signin"} className="text-blue-500 underline not-italic pl-1">Sign in</Link> Now</p>
                </div>
            </div>
        </div>
    )
}

export default Signup