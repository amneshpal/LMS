"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  PlayCircle,
  RefreshCw,
} from "lucide-react";

import {
  getMyCourses,
  Enrollment,
} from "@/services/enrollment.service";

function MyCoursesContent() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMyCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMyCourses();

      setEnrollments(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (error: any) {
      console.error(
        "MY COURSES ERROR:",
        error?.response?.data || error
      );

      setError(
        error?.response?.data?.message ||
          "My courses load nahi ho paaye. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-wider text-blue-100">
            STUDENT AREA
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            My Courses
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Continue learning from where you left off.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Loading */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="h-48 animate-pulse bg-gray-200" />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                  <div className="h-11 animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
            <BookOpen
              size={48}
              className="mx-auto text-red-300"
            />

            <h2 className="mt-4 text-xl font-bold text-red-700">
              Unable to load courses
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadMyCourses}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          enrollments.length === 0 && (
            <div className="rounded-2xl border bg-white p-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <BookOpen size={30} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                You haven't enrolled in any course
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Explore our courses and start your learning
                journey today.
              </p>

              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Courses
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

        {/* Courses */}
        {!loading &&
          !error &&
          enrollments.length > 0 && (
            <>
              {/* Section heading */}
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Learning
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {enrollments.length}{" "}
                    {enrollments.length === 1
                      ? "course"
                      : "courses"}{" "}
                    enrolled
                  </p>
                </div>
              </div>

              {/* Course Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrollments.map((enrollment) => {
                  const course = enrollment.course;

                  return (
                    <article
                      key={enrollment.id}
                      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <BookOpen
                              size={58}
                              className="text-white"
                              strokeWidth={1.3}
                            />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/5" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                          {course.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                          {course.description ||
                            "Continue learning through structured lessons."}
                        </p>

                        {/* Enrollment Date */}
                        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                          <CalendarDays
                            size={16}
                            className="shrink-0"
                          />

                          <span>
                            Enrolled{" "}
                            {new Date(
                              enrollment.enrolledAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Course Status */}
                        <div className="mt-4">
                          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            Enrolled
                          </span>
                        </div>

                        {/* Continue */}
                        <Link
                          href={`/course/${course.slug}`}
                          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                          <PlayCircle size={18} />
                          Continue Learning
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
      </section>
    </main>
  );
}

export default function MyCoursesPage() {
  return (
    <AuthGuard role="STUDENT">
      <MyCoursesContent />
    </AuthGuard>
  );
}