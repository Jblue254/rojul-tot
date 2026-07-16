import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";