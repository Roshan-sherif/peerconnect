import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";

const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    // Mock API call
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <MailCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Check your email</h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          We've sent a password reset link to your email address. Please check your inbox and spam folder.
        </p>
        <Link to="/login">
          <Button variant="outline" className="w-full h-12 text-lg rounded-xl">
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to login
      </Link>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset your password</h2>
        <p className="text-slate-500">
          Enter your registered email and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <Button type="submit" className="w-full h-12 text-lg rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? "Sending link..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
