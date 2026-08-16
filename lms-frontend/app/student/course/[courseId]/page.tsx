"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  Loader2,
  PlayCircle,
} from "lucide-react";

import api from "@/lib/api";

export type LessonType = "VIDEO" | "PDF" | "TEXT";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration?: number | null;
  videoUrl?: string | null;
  pdfUrl?: string | null;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface StudentCourse {
  id: string;
  title: string;
  sections: Section[];
}

const getMyCourse = async (courseId: string) => {
  const response = await api.get<StudentCourse>(
    `/student/courses/${courseId}`
  );

  return { data: response.data };
};

const getCourseProgress = async (courseId: string) => {
  const response = await api.get<{
    totalLessons: number;
    completedLessons: number;
    progress: number;
  }>(`/student/courses/${courseId}/progress`);

  return { data: response.data };
};

export default function StudentCoursePage() {
  const params = useParams();

  const courseId = params.courseId as string;

  const [course, setCourse] =
    useState<StudentCourse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [progress, setProgress] = useState({
    totalLessons: 0,
    completedLessons: 0,
    progress: 0,
  });

  const [selectedLesson, setSelectedLesson] =
    useState<Lesson | null>(null);

  const [openSections, setOpenSections] =
    useState<string[]>([]);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const [courseResult, progressResult] =
          await Promise.all([
            getMyCourse(courseId),
            getCourseProgress(courseId),
          ]);

        setCourse(courseResult.data);

        setProgress(progressResult.data);

        if (
          courseResult.data.sections?.length > 0
        ) {
          const firstSection =
            courseResult.data.sections[0];

          setOpenSections([firstSection.id]);

          if (
            firstSection.lessons?.length > 0
          ) {
            setSelectedLesson(
              firstSection.lessons[0]
            );
          }
        }
      } catch (error: any) {
        console.error(
          "STUDENT COURSE ERROR:",
          error?.response?.data || error
        );

        setError(
          error?.response?.data?.message ||
            "Course load nahi ho saka."
        );
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  const allLessons = useMemo(() => {
    if (!course) {
      return [];
    }

    return course.sections.flatMap(
      (section: Section): Lesson[] =>
        section.lessons
    );
  }, [course]);

  const currentLessonIndex =
    selectedLesson
      ? allLessons.findIndex(
          (lesson: Lesson) =>
            lesson.id === selectedLesson.id
        )
      : -1;

  const previousLesson =
    currentLessonIndex > 0
      ? allLessons[currentLessonIndex - 1]
      : null;

  const nextLesson =
    currentLessonIndex >= 0 &&
    currentLessonIndex <
      allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const toggleSection = (
    sectionId: string
  ) => {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter(
            (id) => id !== sectionId
          )
        : [...current, sectionId]
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2
            size={24}
            className="animate-spin"
          />

          Loading course...
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <BookOpen
            size={50}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Unable to load course
          </h1>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <Link
            href="/student/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            My Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4">

          <div className="min-w-0">
            <Link
              href="/student/courses"
              className="mb-1 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              My Courses
            </Link>

            <h1 className="truncate text-xl font-bold text-gray-900">
              {course.title}
            </h1>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-sm text-gray-500">
              Course Progress
            </span>

            <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${progress.progress}%`,
                }}
              />
            </div>

            <span className="text-sm font-semibold text-blue-600">
              {progress.progress}%
            </span>
          </div>

        </div>
      </header>

      {/* Main */}

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[320px_1fr]">

        {/* Sidebar */}

        <aside className="border-r bg-white lg:min-h-[calc(100vh-81px)]">

          <div className="border-b p-5">
            <h2 className="font-bold text-gray-900">
              Course Content
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {progress.completedLessons} of{" "}
              {progress.totalLessons} lessons completed
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${progress.progress}%`,
                }}
              />
            </div>
          </div>

          <div className="max-h-[calc(100vh-220px)] overflow-y-auto">

            {course.sections.map(
              (section: Section) => {
                const isOpen =
                  openSections.includes(
                    section.id
                  );

                return (
                  <div
                    key={section.id}
                    className="border-b"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        toggleSection(
                          section.id
                        )
                      }
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50"
                    >

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">
                          {section.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {section.lessons.length}{" "}
                          {section.lessons.length ===
                          1
                            ? "lesson"
                            : "lessons"}
                        </p>
                      </div>

                      {isOpen ? (
                        <ChevronDown
                          size={18}
                          className="shrink-0"
                        />
                      ) : (
                        <ChevronRight
                          size={18}
                          className="shrink-0"
                        />
                      )}

                    </button>

                    {isOpen && (
                      <div className="pb-2">

                        {section.lessons.map(
                          (lesson: Lesson) => {
                            const active =
                              selectedLesson?.id ===
                              lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                onClick={() =>
                                  setSelectedLesson(
                                    lesson
                                  )
                                }
                                className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${
                                  active
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                              >

                                <div className="shrink-0">
                                  {lesson.type ===
                                  "VIDEO" ? (
                                    <PlayCircle
                                      size={18}
                                    />
                                  ) : (
                                    <FileText
                                      size={18}
                                    />
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium">
                                    {lesson.title}
                                  </p>

                                  {lesson.duration && (
                                    <p className="mt-1 text-xs text-gray-400">
                                      {lesson.duration}{" "}
                                      min
                                    </p>
                                  )}
                                </div>

                              </button>
                            );
                          }
                        )}

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>
        </aside>

        {/* Learning Area */}

        <section className="min-w-0">

          {selectedLesson ? (
            <>

              {/* Video / Content */}

              <div className="bg-black">

                {selectedLesson.type ===
                  "VIDEO" &&
                selectedLesson.videoUrl ? (
                  <video
                    key={selectedLesson.id}
                    controls
                    className="mx-auto aspect-video max-h-[650px] w-full"
                    src={selectedLesson.videoUrl}
                  />
                ) : selectedLesson.type ===
                    "PDF" &&
                  selectedLesson.pdfUrl ? (
                  <iframe
                    src={selectedLesson.pdfUrl}
                    title={selectedLesson.title}
                    className="h-[650px] w-full bg-white"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gray-900 text-white">
                    <div className="text-center">

                      <BookOpen
                        size={55}
                        className="mx-auto text-gray-500"
                      />

                      <p className="mt-4 text-lg font-semibold">
                        Content not available
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        This lesson content will
                        be available soon.
                      </p>

                    </div>
                  </div>
                )}

              </div>

              {/* Lesson Information */}

              <div className="bg-white px-5 py-6 sm:px-8">

                <div className="mx-auto max-w-5xl">

                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                    <div>
                      <p className="text-sm font-medium text-blue-600">
                        Lesson{" "}
                        {currentLessonIndex + 1} of{" "}
                        {allLessons.length}
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        {selectedLesson.title}
                      </h2>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                    >
                      <CheckCircle2 size={18} />
                      Mark Complete
                    </button>

                  </div>

                  {/* Navigation */}

                  <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6">

                    {previousLesson ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedLesson(
                            previousLesson
                          )
                        }
                        className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        ← Previous
                      </button>
                    ) : (
                      <div />
                    )}

                    {nextLesson ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedLesson(
                            nextLesson
                          )
                        }
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Next Lesson →
                      </button>
                    ) : (
                      <Link
                        href="/student/courses"
                        className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        Finish Course
                      </Link>
                    )}

                  </div>

                </div>
              </div>

            </>
          ) : (
            <div className="flex min-h-[600px] items-center justify-center">
              <div className="text-center">

                <BookOpen
                  size={55}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-4 text-xl font-bold">
                  Select a lesson
                </h2>

                <p className="mt-2 text-gray-500">
                  Choose a lesson from the course
                  content.
                </p>

              </div>
            </div>
          )}

        </section>
      </div>

    </main>
  );
}