'use client'
import React from 'react'
import { Spinner } from "@material-tailwind/react";
 
export default function Loading() {
  return (<Spinner onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />);
}