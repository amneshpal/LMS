// import api from "@/lib/api";

// export interface EnrollmentCourse {
//   id: string;
//   title: string;
//   slug: string;
//   description?: string | null;
//   thumbnail?: string | null;
//   price: number;
//   isPublished: boolean;
// }

// export interface Enrollment {
//   id: string;
//   studentId: string;
//   courseId: string;
//   enrolledAt: string;
//   course: EnrollmentCourse;
// }

// export interface MyCoursesResponse {
//   success: boolean;
//   data: Enrollment[];
// }

// export const getMyCourses =
//   async (): Promise<MyCoursesResponse> => {
//     const response =
//       await api.get<MyCoursesResponse>(
//         "/enrollments/my-courses"
//       );

//     return response.data;
//   };
import api from "@/lib/api";

export interface EnrollmentCourse {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnail?: string | null;
  price: number;
  isPublished: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  course: EnrollmentCourse;
}

export interface MyCoursesResponse {
  success: boolean;
  data: Enrollment[];
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  data: Enrollment;
}

/* =========================
   GET MY COURSES
========================= */

export const getMyCourses = async (): Promise<MyCoursesResponse> => {
  const response = await api.get<MyCoursesResponse>(
    "/enrollments/my-courses"
  );

  return response.data;
};

/* =========================
   ENROLL IN COURSE
========================= */

export const enrollInCourse = async (
  courseId: string
): Promise<EnrollmentResponse> => {
  const response = await api.post<EnrollmentResponse>(
    "/enrollments",
    {
      courseId,
    }
  );

  return response.data;
};