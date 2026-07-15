import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Card, CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from "@/components/ui/card";

function Login() {
  const { login } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const loggedInUser = await login(
  formData.email,
  formData.password
);

if (loggedInUser.role === "admin") {
  navigate("/admindash");
} else {
  navigate("/dashboard");
}
const [formData, setFormData] = useState({email: "",password: ""});
const [error, setError] = useState("");
const [isSubmitting, setIsSubmitting] =useState(false);
const [showPassword, setShowPassword] =useState(false);
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
};

  return (
    <div>
        
    </div>
  )
}

export default Login