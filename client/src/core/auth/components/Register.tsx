import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type Inputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({});
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve("foo");
                }, 1000);
            } catch (error: any) {
                reject("foo");
            }
        });
        console.log("Logged in temporarily...");
        console.log(data);
    };

    return (
        <main className="h-screen w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md flex flex-col items-center justify-center gap-4 border border-gray-200  px-4 py-8 shadow-md rounded-xs"
            >
                <h1 className="text-3xl text-text-dark font-semibold">
                    New Account
                </h1>
                <div className="w-full flex flex-col items-start gap-1">
                    <label
                        htmlFor="username"
                        className="text-text-grey font-semibold text-sm"
                    >
                        Username:
                    </label>
                    <input
                        id="username"
                        type="username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                        placeholder="username"
                        className="w-full border border-border-primary focus:border-border-hover px-2 py-3 rounded-sm outline-0 text-md"
                    />
                    {errors.username && (
                        <span className="text-sm text-error font-medium">
                            {errors.username.message}
                        </span>
                    )}
                </div>
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
                <div className="w-full flex flex-col items-start gap-1">
                    <label
                        htmlFor="confirmPassword"
                        className="text-text-grey font-semibold text-sm"
                    >
                        Confirm Password:
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must contain at least 6 chararacters",
                            },
                            validate: (value) => {
                                if (value !== watch("password"))
                                    return "Passwords do not match";
                                return true;
                            },
                        })}
                        placeholder="password"
                        className="w-full border border-border-primary focus:border-border-hover px-2 py-3 rounded-sm outline-0 text-sm"
                    />
                    {errors.confirmPassword && (
                        <span className="text-sm text-error font-medium">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-button-primary text-text-light font-medium py-3 hover:cursor-pointer hover:shadow-md rounded-xs hover:bg-button-hover"
                    >
                        {isSubmitting ? "..." : "Create"}
                    </button>
                    <p className="text-sm text-text-dark font-medium">
                        Already have an account?&nbsp;
                        <a
                            onClick={() => navigate("/login")}
                            className="font-semibold hover:cursor-pointer text-text-red hover:text-text-red-hover hover:underline"
                        >
                            login
                        </a>
                    </p>
                </div>
            </form>
        </main>
    );
}

export default Register;
