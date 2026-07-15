import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.password
      );

      setToast({
        name: formData.name,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };


  return (
     <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Sign up to 
          </CardDescription>
        </CardHeader>
 
        <CardContent>
          {toast ? (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <CheckCircle2 className="text-green-600" size={32} />
              <p className="font-medium">Welcome, {toast.name}!</p>
              <p className="text-sm text-muted-foreground">
                Account created — redirecting you to login…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
 
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
 
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
 
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="pr-10"
                    required
                    minLength={6}
                  />
 
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
 
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="pr-10"
                    required
                  />
                </div>
              </div>
 
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
 
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          )}
        </CardContent>
 
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-2 text-foreground">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register