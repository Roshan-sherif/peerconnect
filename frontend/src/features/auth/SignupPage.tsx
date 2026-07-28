import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import {signup} from '../../api/auth.api' 
const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    // const responce= axios.post('http://localhost:5000/api/auth/signup' , data,
    //   {
    //     withCredentials:true
    //   }
    // )
    try{
    const responce = signup(data)
    console.log(responce)
    navigate('/dashboard')
    console.log(data)

    }catch(error){
alert(error)
    }
  };


  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
        <p className="text-slate-500">Join PeerConnect and start collaborating</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="Enter your full name" 
            {...register("fullName")}
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Create a password" 
            {...register("password")}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Confirm your password" 
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-destructive" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input type="checkbox" id="terms" required className="mt-1 rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" />
          <Label htmlFor="terms" className="font-normal text-slate-600 text-sm leading-tight">
            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </Label>
        </div>

        <Button type="submit" className="w-full h-12 text-lg rounded-xl mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <span className="text-slate-500 text-sm">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
