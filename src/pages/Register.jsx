import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";

const { register } = useAuth();
const navigate = useNavigate();

const [formData, setFormData] = useState({name: "",email: "",password: "",confirmPassword: ""});

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

function Register() {
  return (
    <div></div>
  )
}

export default Register