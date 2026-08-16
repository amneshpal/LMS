import api from "@/lib/api";

export interface DashboardStats {
  totalCourses: number;
  inProgressCourses: number;
  completedCourses: number;
  certificates: number;
}

export interface RecentCourse {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  enrolledAt: string;
}

export interface ContinueLearning {
  id: string;
  watchedSeconds: number;
  completed: boolean;
  lesson: {
    id: string;
    title: string;
    section: {
      id: string;
      title: string;
      course: {
        id: string;
        title: string;
        slug: string;
        thumbnail?: string | null;
      };
    };
  };
}

export interface StudentDashboard {
  stats: DashboardStats;
  continueLearning: ContinueLearning[];
  recentCourses: RecentCourse[];
}

export interface StudentDashboardResponse {
  success: boolean;
  data: StudentDashboard;
}

export const getStudentDashboard =
  async (): Promise<StudentDashboardResponse> => {
    const response =
      await api.get<StudentDashboardResponse>(
        "/student/dashboard"
      );

    return response.data;
  };