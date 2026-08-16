import api from "@/lib/api";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnail?: string | null;
  price: number;
  isPublished: boolean;
  teacherId?: string | null;
  categoryId: string;

  category?: {
    id: string;
    name: string;
    slug: string;
  };

  teacher?: {
    id: string;
    fullName: string;
    email: string;
  };

  sections?: Section[];

  reviews?: Review[];

  averageRating?: number;
  totalReviews?: number;
}

export interface Section {
  id: string;
  title: string;
  description?: string | null;
  order: number;

  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  type: "VIDEO" | "PDF" | "QUIZ";
  youtubeVideoId?: string | null;
  pdfUrl?: string | null;
  duration?: number | null;
  isPreview: boolean;
  order: number;
}

export interface Review {
  id: string;
  rating: number;
  review?: string | null;
  createdAt: string;

  student?: {
    id: string;
    fullName: string;
    avatar?: string | null;
  };
}

export interface CoursePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CourseResponse {
  success: boolean;
  data: Course[];
  pagination?: CoursePagination;
}

export interface CourseDetailsResponse {
  success: boolean;
  data: Course;
}

export interface CourseQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "latest" | "oldest" | "price_low" | "price_high";
}

export const getCourses = async (
  query: CourseQuery = {}
): Promise<CourseResponse> => {
  const response = await api.get<CourseResponse>("/courses", {
    params: query,
  });

  return response.data;
};

export const getCourseDetails = async (
  slug: string
): Promise<CourseDetailsResponse> => {
  const response = await api.get<CourseDetailsResponse>(
    `/courses/details/${encodeURIComponent(slug)}`
  );

  return response.data;
};