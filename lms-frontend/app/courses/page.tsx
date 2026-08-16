"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Star,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getCourses,
  Course,
} from "@/services/course.service";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<
    "latest" | "oldest" | "price_low" | "price_high"
  >("latest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

const loadCourses = async () => {
  try {
    setLoading(true);
    setError("");

    const result = await getCourses({
      page,
      limit: 9,
      search: search || undefined,
      category: category || undefined,
      sort,
    });

    console.log("========== COURSE API ==========");
    console.log("FULL RESPONSE:", result);
    console.log("SUCCESS:", result?.success);
    console.log("DATA:", result?.data);
    console.log("IS ARRAY:", Array.isArray(result?.data));
    console.log("DATA LENGTH:", result?.data?.length);
    console.log("PAGINATION:", result?.pagination);
    console.log("================================");

    const coursesData = Array.isArray(result?.data)
      ? result.data
      : [];

    setCourses(coursesData);

    setTotalPages(
      result?.pagination?.totalPages || 1
    );

  } catch (error) {
    console.error("COURSES API ERROR:", error);

    setError("Courses load nahi ho paaye.");

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadCourses();
  }, [page, category, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setPage(1);
    loadCourses();
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="font-semibold text-blue-100">
            EXPLORE & LEARN
          </p>

          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Browse Courses
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Learn new skills with structured courses designed for
            practical and career-focused learning.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search courses..."
                className="w-full py-3 text-gray-900 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border bg-white p-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Courses
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Find the right course for you.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-600"
            >
              <option value="">
                All Categories
              </option>

              <option value="web-development">
                Web Development
              </option>

              <option value="programming">
                Programming
              </option>

              <option value="database">
                Database
              </option>
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(
                  e.target.value as
                    | "latest"
                    | "oldest"
                    | "price_low"
                    | "price_high"
                );

                setPage(1);
              }}
              className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-600"
            >
              <option value="latest">
                Latest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="price_low">
                Price: Low to High
              </option>

              <option value="price_high">
                Price: High to Low
              </option>
            </select>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border bg-white"
                >
                  <div className="h-48 bg-gray-200" />

                  <div className="space-y-4 p-6">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-600">
              {error}
            </p>

            <button
              onClick={loadCourses}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          courses.length === 0 && (
            <div className="rounded-2xl border bg-white p-16 text-center">
              <BookOpen
                size={48}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No courses found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search or category.
              </p>
            </div>
          )}

        {/* Courses */}
        {!loading &&
          !error &&
          courses.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* Thumbnail */}
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">

                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <BookOpen
                          size={55}
                          className="text-white"
                          strokeWidth={1.3}
                        />
                      )}

                      {!course.isPublished && (
                        <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">

                      <div className="flex items-center justify-between gap-3">

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                          {course.category?.name ||
                            "Course"}
                        </span>

                        <div className="flex items-center gap-1 text-sm">
                          <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />

                          <span className="font-medium text-gray-700">
                            {course.averageRating ??
                              0}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-4 line-clamp-2 text-xl font-bold text-gray-900">
                        {course.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {course.description ||
                          "Learn this course with practical lessons and projects."}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t pt-4">

                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users size={16} />
                          {course.totalReviews ?? 0} reviews
                        </div>

                        <span className="text-xl font-bold text-gray-900">
                          ₹{course.price}
                        </span>
                      </div>

                      <Link
                        href={`/course/${course.slug}`}
                        className="mt-5 flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Course
                      </Link>

                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">

                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="px-4 text-sm font-medium text-gray-600">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((current) =>
                        Math.min(
                          totalPages,
                          current + 1
                        )
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>

                </div>
              )}
            </>
          )}
      </section>
    </main>
  );
}