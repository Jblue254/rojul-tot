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
   login(email, password);
   const navigate = useNavigate();
  return (
    <div>
        
    </div>
  )
}

export default Login