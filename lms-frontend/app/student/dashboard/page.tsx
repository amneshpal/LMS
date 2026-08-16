"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import AuthGuard from "@/components/AuthGuard";
import {
  getStudentDashboard,
  StudentDashboard,
} from "@/services/student.service";
import { getStoredUser } from "@/lib/auth";

function DashboardContent() {
  const [dashboard, setDashboard] =
    useState<StudentDashboard | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getStoredUser();

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("DASHBOARD: loading...");

      // Check token before API request
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      console.log(
        "DASHBOARD TOKEN:",
        token ? "TOKEN_EXISTS" : "NO_TOKEN"
      );

      if (!token) {
        setError("Please login again.");
        return;
      }

      // API request
      const result = await getStudentDashboard();

      console.log("DASHBOARD RESPONSE:", result);

      if (!result?.data) {
        throw new Error(
          "Dashboard data not received from server"
        );
      }

      setDashboard(result.data);
    } catch (error: any) {
      const status = error?.response?.status;
      const responseData = error?.response?.data;

      console.error("STUDENT DASHBOARD ERROR:", {
        message: error?.message || "Unknown error",
        status: status || null,
        responseData: responseData || null,
        url: error?.config?.url || null,
        method: error?.config?.method || null,
      });

      // Unauthorized
      if (status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setError(
          "Your session has expired. Please login again."
        );

        return;
      }

      // Forbidden
      if (status === 403) {
        setError(
          "You are not authorized to access the student dashboard."
        );

        return;
      }

      // Server error
      if (status && status >= 500) {
        setError(
          "Server error. Please try again later."
        );

        return;
      }

      // Normal API / network error
      setError(
        responseData?.message ||
          error?.message ||
          "Dashboard load nahi ho paaya."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">

            <div>
              <div className="h-8 w-64 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-96 rounded bg-gray-200" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-32 rounded-2xl bg-white"
                  />
                )
              )}
            </div>

            <div className="h-72 rounded-2xl bg-white" />

          </div>
        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

          <BookOpen
            size={48}
            className="mx-auto text-red-300"
          />

          <h2 className="mt-4 text-xl font-bold text-red-700">
            Dashboard unavailable
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              type="button"
              onClick={loadDashboard}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCw size={17} />
              Try Again
            </button>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-700 transition hover:bg-red-100"
            >
              Login Again
            </Link>

          </div>

        </div>
      </main>
    );
  }

  /* =========================
     NO DATA
  ========================= */

  if (!dashboard) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border bg-white p-10 text-center">

          <BookOpen
            size={48}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No dashboard data
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Dashboard data is currently unavailable.
          </p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>
      </main>
    );
  }

  const {
    stats,
    continueLearning,
    recentCourses,
  } = dashboard;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =========================
          HERO
      ========================= */}

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            Student Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Welcome back, {user?.fullName || "Student"} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Continue your learning journey and
            keep making progress.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* =========================
            STATS
        ========================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<BookOpen size={22} />}
            description="Enrolled courses"
          />

          <StatCard
            title="In Progress"
            value={stats.inProgressCourses}
            icon={<Clock3 size={22} />}
            description="Courses in progress"
          />

          <StatCard
            title="Completed"
            value={stats.completedCourses}
            icon={<CheckCircle2 size={22} />}
            description="Completed courses"
          />

          <StatCard
            title="Certificates"
            value={stats.certificates}
            icon={<Award size={22} />}
            description="Certificates earned"
          />

        </div>

        {/* =========================
            CONTINUE LEARNING
        ========================= */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Continue Learning
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pick up where you left off.
              </p>
            </div>

          </div>

          {continueLearning.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <PlayCircle size={28} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Nothing to continue
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Start a course and your progress will
                appear here.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Browse Courses
              </Link>

            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">

              {continueLearning.map((item) => {
                const course =
                  item.lesson.section.course;

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                  >

                    <div className="flex flex-col sm:flex-row">

                      <div className="h-44 w-full shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 sm:h-auto sm:w-52">

                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full min-h-44 items-center justify-center">
                            <BookOpen
                              size={48}
                              className="text-white"
                            />
                          </div>
                        )}

                      </div>

                      <div className="flex flex-1 flex-col p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          Continue Learning
                        </p>

                        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
                          {course.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                          {item.lesson.title}
                        </p>

                        <Link
                          href={`/course/${course.slug}`}
                          className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          <PlayCircle size={17} />
                          Continue
                        </Link>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* =========================
            RECENT COURSES
        ========================= */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Courses
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your recently enrolled courses.
              </p>
            </div>

            <Link
              href="/student/courses"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>

          </div>

          {recentCourses.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center">

              <BookOpen
                size={42}
                className="mx-auto text-gray-300"
              />

              <p className="mt-4 text-gray-500">
                No courses found.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Browse Courses
              </Link>

            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {recentCourses.map((course) => (
                <Link
                  href={`/course/${course.slug}`}
                  key={course.id}
                  className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="h-44 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">

                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BookOpen
                          size={50}
                          className="text-white"
                        />
                      </div>
                    )}

                  </div>

                  <div className="p-5">

                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
                      {course.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <TrendingUp size={15} />

                      Enrolled{" "}
                      {new Date(
                        course.enrolledAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Enrolled
                      </span>

                      <span className="text-sm font-semibold text-blue-600">
                        Open →
                      </span>

                    </div>

                  </div>

                </Link>
              ))}

            </div>
          )}

        </section>

      </section>

    </main>
  );
}

/* =========================
   STAT CARD
========================= */

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================
   PAGE
========================= */

export default function StudentDashboardPage() {
  return (
    <AuthGuard role="STUDENT">
      <DashboardContent />
    </AuthGuard>
  );
}