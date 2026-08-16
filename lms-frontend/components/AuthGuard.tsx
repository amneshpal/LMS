"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getToken, getStoredUser } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  role?: "ADMIN" | "TEACHER" | "STUDENT";
}

export default function AuthGuard({
  children,
  role,
}: AuthGuardProps) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user = getStoredUser();

    if (!token || !user) {
      router.replace("/login");
      return;
    }

    if (role && user.role !== role) {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [router, role]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}