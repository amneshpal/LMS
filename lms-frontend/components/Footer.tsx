import Link from "next/link";
import {
  BookOpen,
  Globe,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* =========================
              BRAND
          ========================== */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <BookOpen size={21} />
              </div>

              <span className="text-xl font-bold">
                ExamHelp
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Learn programming, technology and professional skills
              through structured courses, practical assignments,
              quizzes and projects.
            </p>

            {/* Social / Contact Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Website"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                <Globe size={18} />
              </a>

              <a
                href="mailto:support@examhelp.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                <Mail size={18} />
              </a>

              <a
                href="tel:+919999999999"
                aria-label="Phone"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* =========================
              PLATFORM
          ========================== */}
          <div>
            <h3 className="font-semibold text-white">
              Platform
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/courses"
                  className="transition hover:text-white"
                >
                  All Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-white"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              LEARNING
          ========================== */}
          <div>
            <h3 className="font-semibold text-white">
              Learning
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/student/dashboard"
                  className="transition hover:text-white"
                >
                  Student Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/student/courses"
                  className="transition hover:text-white"
                >
                  My Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/student/assignments"
                  className="transition hover:text-white"
                >
                  Assignments
                </Link>
              </li>

              <li>
                <Link
                  href="/student/quizzes"
                  className="transition hover:text-white"
                >
                  Quizzes
                </Link>
              </li>

              <li>
                <Link
                  href="/student/certificates"
                  className="transition hover:text-white"
                >
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              SUPPORT
          ========================== */}
          <div>
            <h3 className="font-semibold text-white">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/refund-policy"
                  className="transition hover:text-white"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================
            NEWSLETTER / CTA
        ========================== */}
        <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Start your learning journey
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Explore courses and build skills for your career.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Courses
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* =========================
            CONTACT
        ========================== */}
        <div className="mt-8 flex flex-col gap-3 border-b border-gray-800 pb-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:support@examhelp.com"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Mail size={16} />
            support@examhelp.com
          </a>

          <a
            href="tel:+919999999999"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Phone size={16} />
            +91 99999 99999
          </a>
        </div>

        {/* =========================
            COPYRIGHT
        ========================== */}
        <div className="flex flex-col gap-3 pt-7 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ExamHelp. All rights reserved.
          </p>

          <p>
            Learn. Practice. Succeed.
          </p>
        </div>
      </div>
    </footer>
  );
}