import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/auth.server";

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface LoginInputs {
    email: string;
    password: string;
    rememberme: boolean;
}

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInputs>({
        defaultValues: {
            rememberme: false,
        },
    });
    const { handleLoggedIn, handleSetUserData } = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const res = await handleLogin(data);
            handleSetUserData(res.data);
            handleLoggedIn(true);
            navigate("/homepage");
        } catch (error: any) {
            handleLoggedIn(false);
            throw new Error(error);
        }
    };

    return (
        <main className="h-screen w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md flex flex-col items-center justify-center gap-4 border border-gray-200  px-4 py-8 shadow-md rounded-xs"
            >
                <h1 className="text-3xl text-text-dark font-semibold">Login</h1>
                <div className="w-full flex flex-col items-start gap-1">
                    <label
                        htmlFor="email"
                        className="text-text-grey font-semibold text-sm"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: (value) => {
                                if (!regex.test(value)) {
                                    return "Invalid email address";
                                }
                                return true;
                            },
                        })}
                        placeholder="email"
                        className="w-full border border-border-primary focus:border-border-hover px-2 py-3 rounded-sm outline-0 text-md"
                    />
                    {errors.email && (
                        <span className="text-sm text-error font-medium">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                    <label
                        htmlFor="password"
                        className="text-text-grey font-semibold text-sm"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 6,
                                message:
                                    "Password must contain at least 6 chararacters",
                            },
                        })}
                        placeholder="password"
                        className="w-full border border-border-primary focus:border-border-hover px-2 py-3 rounded-sm outline-0 text-sm"
                    />
                    {errors.password && (
                        <span className="text-sm text-error font-medium">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                        <input
                            id="rememberme"
                            type="checkbox"
                            className="cursor-pointer"
                            {...register("rememberme")}
                        />
                        <label
                            htmlFor="rememberme"
                            className="text-sm text-dark font-regular cursor-pointer"
                        >
                            Remember me
                        </label>
                    </div>
                    <p className="text-sm text-text-red font-medium hover:cursor-pointer hover:underline hover:text-text-red-hover">
                        Forgot Password!
                    </p>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-button-primary text-text-light font-medium py-3 hover:cursor-pointer hover:shadow-md rounded-xs hover:bg-button-hover"
                    >
                        {isSubmitting ? "..." : "Login"}
                    </button>
                    <p className="text-sm text-text-dark font-medium">
                        Don't have an account?&nbsp;
                        <a
                            onClick={() => navigate("/register")}
                            className="font-semibold hover:cursor-pointer text-text-red hover:text-text-red-hover hover:underline"
                        >
                            Create
                        </a>
                    </p>
                </div>
            </form>
        </main>
    );
}

export default Login;
