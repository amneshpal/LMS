"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

import {
  getStoredUser,
  logout,
} from "@/lib/auth";

export default function Navbar() {
  const [user, setUser] = useState<
    ReturnType<typeof getStoredUser>
  >(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] =
    useState(false);

  useEffect(() => {
    setUser(getStoredUser());

    const handleStorage = () => {
      setUser(getStoredUser());
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
    setMobileOpen(false);

    logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BookOpen size={20} />
          </div>

          <span className="text-xl font-bold text-gray-900">
            ExamHelp
          </span>
        </Link>

        {/* =========================
            DESKTOP NAV
        ========================== */}

        <div className="hidden items-center gap-7 md:flex">

          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/courses"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Courses
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Contact
          </Link>

        </div>

        {/* =========================
            DESKTOP AUTH
        ========================== */}

        <div className="hidden items-center gap-3 md:flex">

          {user ? (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setUserMenuOpen(
                    !userMenuOpen
                  )
                }
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 transition hover:bg-gray-50"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={17} />
                </div>

                <div className="hidden text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
                    {user.fullName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.role}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className="text-gray-500"
                />

              </button>

              {/* Dropdown */}

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white py-2 shadow-xl">

                  <div className="border-b px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.fullName}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {/* Student */}

                  {user.role === "STUDENT" && (
                    <>
                      <Link
                        href="/student/dashboard"
                        onClick={() =>
                          setUserMenuOpen(false)
                        }
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>

                      <Link
                        href="/student/courses"
                        onClick={() =>
                          setUserMenuOpen(false)
                        }
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Courses
                      </Link>

                      <Link
                        href="/student/profile"
                        onClick={() =>
                          setUserMenuOpen(false)
                        }
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                    </>
                  )}

                  {/* Teacher */}

                  {user.role === "TEACHER" && (
                    <Link
                      href="/teacher/dashboard"
                      onClick={() =>
                        setUserMenuOpen(false)
                      }
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Teacher Dashboard
                    </Link>
                  )}

                  {/* Admin */}

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() =>
                        setUserMenuOpen(false)
                      }
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="my-1 border-t" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </nav>

      {/* =========================
          MOBILE MENU
      ========================== */}

      {mobileOpen && (
        <div className="border-t bg-white md:hidden">

          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">

            <Link
              href="/"
              onClick={() =>
                setMobileOpen(false)
              }
              className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>

            <Link
              href="/courses"
              onClick={() =>
                setMobileOpen(false)
              }
              className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Courses
            </Link>

            <Link
              href="/about"
              onClick={() =>
                setMobileOpen(false)
              }
              className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() =>
                setMobileOpen(false)
              }
              className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Contact
            </Link>

            <div className="my-3 border-t" />

            {user ? (
              <>
                <div className="rounded-xl bg-gray-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <User size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">
                        {user.fullName}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                  </div>

                </div>

                {user.role === "STUDENT" && (
                  <>
                    <Link
                      href="/student/dashboard"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/student/courses"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      My Courses
                    </Link>

                    <Link
                      href="/student/profile"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                  </>
                )}

                {user.role === "TEACHER" && (
                  <Link
                    href="/teacher/dashboard"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Teacher Dashboard
                  </Link>
                )}

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">

                <Link
                  href="/login"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  Register
                </Link>

              </div>
            )}

          </div>
        </div>
      )}

    </header>
  );
}