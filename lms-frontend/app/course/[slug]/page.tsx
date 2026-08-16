"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  PlayCircle,
  Star,
  User,
  Users,
  Loader2,
} from "lucide-react";

import {
  getCourseDetails,
  Course,
} from "@/services/course.service";

import {
  enrollInCourse,
  getMyCourses,
} from "@/services/enrollment.service";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [course, setCourse] =
    useState<Course | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openSection, setOpenSection] =
    useState<string | null>(null);

  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] =
    useState("");
  const [enrollError, setEnrollError] =
    useState("");

  const [isEnrolled, setIsEnrolled] =
    useState(false);

  const [checkingEnrollment, setCheckingEnrollment] =
    useState(true);

  /* =========================
     LOAD COURSE
  ========================== */

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getCourseDetails(slug);

        setCourse(result.data);

        if (result.data.sections?.length) {
          setOpenSection(
            result.data.sections[0].id
          );
        }
      } catch (error) {
        console.error(
          "COURSE DETAILS ERROR:",
          error
        );

        setError(
          "Course details load nahi ho paaye."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadCourse();
    }
  }, [slug]);

  /* =========================
     CHECK ENROLLMENT
  ========================== */

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        setCheckingEnrollment(true);

        setEnrollError("");

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem(
                "accessToken"
              )
            : null;

        if (!token || !course?.id) {
          setIsEnrolled(false);
          return;
        }

        const result = await getMyCourses();

        const enrollments =
          Array.isArray(result.data)
            ? result.data
            : [];

        const enrolled =
          enrollments.some(
            (item) =>
              item.courseId === course.id ||
              item.course?.id === course.id
          );

        setIsEnrolled(enrolled);
      } catch (error: any) {
        console.error(
          "ENROLLMENT CHECK ERROR:",
          {
            message:
              error?.message ||
              "Unknown error",

            status:
              error?.response?.status ||
              null,

            responseData:
              error?.response?.data ||
              null,

            url:
              error?.config?.url ||
              null,
          }
        );

        /*
          Enrollment check fail hone par
          course ko enrolled nahi maanenge.
        */

        setIsEnrolled(false);

        /*
          Sirf expired/invalid token par
          local authentication clear karo.
        */

        if (
          error?.response?.status === 401
        ) {
          localStorage.removeItem(
            "accessToken"
          );

          localStorage.removeItem("user");
        }
      } finally {
        setCheckingEnrollment(false);
      }
    };

    if (course?.id) {
      checkEnrollment();
    }
  }, [course?.id]);

  /* =========================
     ENROLL NOW
  ========================== */

  const handleEnroll = async () => {
    try {
      setEnrollError("");
      setEnrollMessage("");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem(
              "accessToken"
            )
          : null;

      /*
        Login check
      */

      if (!token) {
        router.push(
          `/login?redirect=/course/${course?.slug}`
        );

        return;
      }

      /*
        Course check
      */

      if (!course?.id) {
        setEnrollError(
          "Course not found."
        );

        return;
      }

      /*
        Already enrolled
      */

      if (isEnrolled) {
        router.push(
          "/student/courses"
        );

        return;
      }

      setEnrolling(true);

      /*
        Actual enrollment API
      */

      const result =
        await enrollInCourse(
          course.id
        );

      console.log(
        "ENROLLMENT SUCCESS:",
        result
      );

      setIsEnrolled(true);

      setEnrollMessage(
        "Successfully enrolled in this course!"
      );

      /*
        Go to My Courses
      */

      setTimeout(() => {
        router.push(
          "/student/courses"
        );
      }, 800);
    } catch (error: any) {
      console.error(
        "ENROLLMENT ERROR:",
        {
          message:
            error?.message ||
            "Unknown error",

          status:
            error?.response?.status ||
            null,

          responseData:
            error?.response?.data ||
            null,

          url:
            error?.config?.url ||
            null,
        }
      );

      const status =
        error?.response?.status;

      /*
        Unauthorized
      */

      if (status === 401) {
        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem("user");

        router.push(
          `/login?redirect=/course/${course?.slug}`
        );

        return;
      }

      /*
        Forbidden
      */

      if (status === 403) {
        setEnrollError(
          error?.response?.data?.message ||
            "Student account se login karein. Current account ko course enroll karne ki permission nahi hai."
        );

        return;
      }

      /*
        Already enrolled / validation /
        other backend errors
      */

      setEnrollError(
        error?.response?.data?.message ||
          error?.message ||
          "Enrollment failed. Please try again."
      );
    } finally {
      setEnrolling(false);
    }
  };

  /* =========================
     LOADING
  ========================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse">

            <div className="h-5 w-32 rounded bg-gray-200" />

            <div className="mt-8 grid gap-10 lg:grid-cols-3">

              <div className="lg:col-span-2">

                <div className="h-12 w-3/4 rounded bg-gray-200" />

                <div className="mt-5 h-5 w-full rounded bg-gray-200" />

                <div className="mt-3 h-5 w-2/3 rounded bg-gray-200" />

                <div className="mt-8 h-64 rounded-2xl bg-gray-200" />

              </div>

              <div className="h-96 rounded-2xl bg-gray-200" />

            </div>

          </div>
        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================== */

  if (error || !course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">

          <BookOpen
            size={48}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Course Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            {error ||
              "This course does not exist."}
          </p>

          <Link
            href="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>

        </div>

      </main>
    );
  }

  /* =========================
     COURSE DATA
  ========================== */

  const averageRating =
    course.averageRating ?? 0;

  const totalReviews =
    course.totalReviews ??
    course.reviews?.length ??
    0;

  const totalLessons =
    course.sections?.reduce(
      (total, section) =>
        total +
        (section.lessons?.length ?? 0),
      0
    ) ?? 0;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =========================
          COURSE HERO
      ========================== */}

      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Courses
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">

            {/* Course Information */}

            <div className="lg:col-span-2">

              {course.category && (
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                  {course.category.name}
                </span>
              )}

              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
                {course.description ||
                  "Learn this course with structured lessons and practical learning."}
              </p>

              {/* Rating */}

              <div className="mt-6 flex flex-wrap items-center gap-5">

                <div className="flex items-center gap-2">

                  <Star
                    size={19}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-semibold">
                    {averageRating}
                  </span>

                  <span className="text-blue-100">
                    ({totalReviews} reviews)
                  </span>

                </div>

                <div className="flex items-center gap-2 text-blue-100">
                  <BookOpen size={18} />
                  {totalLessons} Lessons
                </div>

                {course.teacher && (
                  <div className="flex items-center gap-2 text-blue-100">
                    <User size={18} />
                    {course.teacher.fullName}
                  </div>
                )}

              </div>

            </div>

            {/* Purchase Card */}

            <div className="lg:col-span-1">

              <div className="overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl">

                <div className="flex h-52 items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">

                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BookOpen
                      size={65}
                      className="text-blue-600"
                      strokeWidth={1.3}
                    />
                  )}

                </div>

                <div className="p-6">

                  <div className="flex items-end gap-2">

                    <span className="text-3xl font-bold">
                      ₹{course.price}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Lifetime access to this course
                  </p>

                  {/* Enrollment Error */}

                  {enrollError && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                      {enrollError}
                    </div>
                  )}

                  {/* Enrollment Success */}

                  {enrollMessage && (
                    <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700">
                      {enrollMessage}
                    </div>
                  )}

                  {/* Enroll Button */}

                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={
                      enrolling ||
                      checkingEnrollment
                    }
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {enrolling ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Enrolling...
                      </>
                    ) : checkingEnrollment ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />
                        Checking...
                      </>
                    ) : isEnrolled ? (
                      <>
                        <CheckCircle2 size={19} />
                        Go to My Courses
                      </>
                    ) : (
                      <>
                        Enroll Now
                      </>
                    )}

                  </button>

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />
                      Full course access
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />
                      Practical lessons
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />
                      Course certificate
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          COURSE CONTENT
      ========================== */}

      <section className="py-14">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-3">

            {/* Main */}

            <div className="lg:col-span-2">

              {/* About */}

              <div className="rounded-2xl border bg-white p-6 sm:p-8">

                <h2 className="text-2xl font-bold text-gray-900">
                  About This Course
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  {course.description ||
                    "This course provides structured learning through lessons, practical exercises and assessments."}
                </p>

              </div>

              {/* Curriculum */}

              <div className="mt-8">

                <h2 className="text-2xl font-bold text-gray-900">
                  Course Content
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {course.sections?.length ?? 0} sections •{" "}
                  {totalLessons} lessons
                </p>

                <div className="mt-6 space-y-3">

                  {course.sections?.map(
                    (section) => {

                      const isOpen =
                        openSection ===
                        section.id;

                      return (
                        <div
                          key={section.id}
                          className="overflow-hidden rounded-2xl border bg-white"
                        >

                          {/* Section Header */}

                          <button
                            type="button"
                            onClick={() =>
                              setOpenSection(
                                isOpen
                                  ? null
                                  : section.id
                              )
                            }
                            className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-gray-50"
                          >

                            <div>

                              <h3 className="font-semibold text-gray-900">
                                {section.title}
                              </h3>

                              {section.description && (
                                <p className="mt-1 text-sm text-gray-500">
                                  {section.description}
                                </p>
                              )}

                              <p className="mt-2 text-xs text-gray-400">
                                {section.lessons?.length ?? 0}{" "}
                                lessons
                              </p>

                            </div>

                            {isOpen ? (
                              <ChevronUp
                                size={20}
                                className="shrink-0 text-gray-500"
                              />
                            ) : (
                              <ChevronDown
                                size={20}
                                className="shrink-0 text-gray-500"
                              />
                            )}

                          </button>

                          {/* Lessons */}

                          {isOpen && (
                            <div className="border-t">

                              {section.lessons?.map(
                                (lesson) => (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-b-0"
                                  >

                                    <div className="flex min-w-0 items-center gap-3">

                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                                        {lesson.type ===
                                        "VIDEO" ? (
                                          <PlayCircle
                                            size={18}
                                          />
                                        ) : lesson.type ===
                                          "PDF" ? (
                                          <FileText
                                            size={18}
                                          />
                                        ) : (
                                          <BookOpen
                                            size={18}
                                          />
                                        )}

                                      </div>

                                      <div className="min-w-0">

                                        <p className="truncate text-sm font-medium text-gray-800">
                                          {lesson.title}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                          {lesson.type}
                                        </p>

                                      </div>

                                    </div>

                                    <div className="flex shrink-0 items-center gap-3">

                                      {lesson.duration && (
                                        <span className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
                                          <Clock size={14} />
                                          {lesson.duration} min
                                        </span>
                                      )}

                                      {lesson.isPreview && (
                                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                                          Preview
                                        </span>
                                      )}

                                    </div>

                                  </div>
                                )
                              )}

                            </div>
                          )}

                        </div>
                      );
                    }
                  )}

                  {(!course.sections ||
                    course.sections.length === 0) && (
                    <div className="rounded-2xl border bg-white p-8 text-center">

                      <BookOpen
                        size={42}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-4 font-medium text-gray-700">
                        Course content will be available soon.
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* Reviews */}

              <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-900">
                  Student Reviews
                </h2>

                <div className="mt-6 space-y-4">

                  {course.reviews &&
                  course.reviews.length > 0 ? (
                    course.reviews.map(
                      (review) => (
                        <div
                          key={review.id}
                          className="rounded-2xl border bg-white p-6"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                <User size={19} />
                              </div>

                              <div>

                                <p className="font-semibold text-gray-900">
                                  {review.student?.fullName ||
                                    "Student"}
                                </p>

                                <div className="mt-1 flex items-center gap-1">

                                  {Array.from({
                                    length: 5,
                                  }).map(
                                    (_, index) => (
                                      <Star
                                        key={index}
                                        size={14}
                                        className={
                                          index <
                                          review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }
                                      />
                                    )
                                  )}

                                </div>

                              </div>

                            </div>

                          </div>

                          {review.review && (
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                              {review.review}
                            </p>
                          )}

                        </div>
                      )
                    )
                  ) : (
                    <div className="rounded-2xl border bg-white p-8 text-center">

                      <Star
                        size={40}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-4 font-medium text-gray-700">
                        No reviews yet
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Be the first student to review this course.
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Sidebar */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 rounded-2xl border bg-white p-6">

                <h3 className="font-bold text-gray-900">
                  This course includes
                </h3>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <PlayCircle
                      size={18}
                      className="text-blue-600"
                    />
                    Video lessons
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FileText
                      size={18}
                      className="text-blue-600"
                    />
                    PDF resources
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <BookOpen
                      size={18}
                      className="text-blue-600"
                    />
                    Quizzes & assignments
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users
                      size={18}
                      className="text-blue-600"
                    />
                    Student support
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2
                      size={18}
                      className="text-blue-600"
                    />
                    Certificate
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}