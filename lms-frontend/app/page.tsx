import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  Laptop,
  PlayCircle,
  Search,
  Star,
  Users,
} from "lucide-react";

const categories = [
  {
    title: "Web Development",
    courses: "25+ Courses",
    icon: Code2,
  },
  {
    title: "Programming",
    courses: "30+ Courses",
    icon: Laptop,
  },
  {
    title: "Database & SQL",
    courses: "15+ Courses",
    icon: Database,
  },
  {
    title: "Computer Science",
    courses: "20+ Courses",
    icon: BookOpen,
  },
];

const courses = [
  {
    title: "React.js Masterclass",
    description: "Learn React.js from basics to advanced concepts.",
    price: "₹999",
    rating: "4.8",
    students: "1.2K",
    level: "Beginner to Advanced",
  },
  {
    title: "Node.js Backend Development",
    description: "Build scalable REST APIs with Node.js and Express.",
    price: "₹1,499",
    rating: "4.9",
    students: "980",
    level: "Intermediate",
  },
  {
    title: "Complete JavaScript",
    description: "Master JavaScript fundamentals and modern ES6+.",
    price: "₹799",
    rating: "4.7",
    students: "2.1K",
    level: "Beginner to Advanced",
  },
];

const features = [
  "Learn at your own pace",
  "Practical projects and assignments",
  "Quizzes and assessments",
  "Course completion certificates",
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Learn. Practice. Succeed.
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Build your skills.
              <span className="block text-blue-600">
                Build your future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Learn programming, technology and professional skills through
              structured courses, practical assignments, quizzes and projects.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Get Started
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                Expert instructors
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                Practical learning
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                Certificates
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-blue-200/50 blur-2xl" />
              <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-indigo-200/50 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-2xl">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100">
                        Featured Learning
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">
                        Master Modern Development
                      </h2>
                    </div>

                    <PlayCircle size={42} strokeWidth={1.5} />
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-2xl font-bold">100+</p>
                      <p className="mt-1 text-xs text-blue-100">
                        Lessons
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-2xl font-bold">50+</p>
                      <p className="mt-1 text-xs text-blue-100">
                        Projects
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-2xl font-bold">24/7</p>
                      <p className="mt-1 text-xs text-blue-100">
                        Access
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <Users size={20} className="text-blue-600" />
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      5K+
                    </p>
                    <p className="text-sm text-gray-500">
                      Active Students
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <BookOpen size={20} className="text-blue-600" />
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      100+
                    </p>
                    <p className="text-sm text-gray-500">
                      Courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="flex flex-col gap-3 rounded-2xl border bg-white p-3 shadow-lg sm:flex-row">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search size={21} className="text-gray-400" />

              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full bg-transparent py-3 outline-none placeholder:text-gray-400"
              />
            </div>

            <Link
              href="/courses"
              className="rounded-xl bg-blue-600 px-7 py-3 text-center font-semibold text-white hover:bg-blue-700"
            >
              Search Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold text-blue-600">
                EXPLORE
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Popular Categories
              </h2>

              <p className="mt-3 max-w-2xl text-gray-600">
                Choose a category and start learning skills that matter.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  href="/courses"
                  key={category.title}
                  className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 font-bold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {category.courses}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold text-blue-600">
                LEARN SOMETHING NEW
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Featured Courses
              </h2>

              <p className="mt-3 text-gray-600">
                Start learning with our popular courses.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              View all courses
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.title}
                className="overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                  <BookOpen size={58} strokeWidth={1.4} />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {course.level}
                    </span>

                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-medium">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {course.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {course.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{course.students} students</span>

                    <span className="font-bold text-gray-900">
                      {course.price}
                    </span>
                  </div>

                  <Link
                    href="/courses"
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                  >
                    View Course
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-semibold text-blue-600">
              WHY EXAMHELP
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to become better at what you do.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Our platform combines structured learning with practical
              exercises so you can build real-world skills instead of just
              watching videos.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Learning
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <CheckCircle2
                  size={25}
                  className="text-blue-600"
                />

                <h3 className="mt-4 font-semibold text-gray-900">
                  {feature}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Learn with a structured curriculum designed for practical
                  understanding.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start learning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join ExamHelp and start building the skills you need for your
            career.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}