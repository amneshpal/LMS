// import prisma from "../../config/prisma";
// import { extractYoutubeVideoId } from "../../utils/youtube";
// interface CreateLessonInput {
//   title: string;
//   description?: string;
//   type: "VIDEO" | "PDF" | "QUIZ";
//   videoUrl?: string;
//   pdfUrl?: string;
//   duration?: number;
//   isPreview?: boolean;
//   order: number;
//   sectionId: string;
// }

// // export const createLesson = async (data: CreateLessonInput) => {
// //   const section = await prisma.section.findUnique({
// //     where: {
// //       id: data.sectionId,
// //     },
// //   });

// //   if (!section) {
// //     throw new Error("Section not found");
// //   }

// //   return prisma.lesson.create({
// //     data,
// //     include: {
// //       section: true,
// //     },
// //   });
// // };


// export const createLesson = async (data: any) => {
//   const section = await prisma.section.findUnique({
//     where: {
//       id: data.sectionId,
//     },
//   });

//   if (!section) {
//     throw new Error("Section not found");
//   }

//   let youtubeVideoId: string | null = null;

//   if (data.type === "VIDEO") {
//     if (!data.videoUrl) {
//       throw new Error("videoUrl is required");
//     }

//     youtubeVideoId = extractYoutubeVideoId(data.videoUrl);

//     data.pdfUrl = null;
//   }

//   if (data.type === "PDF") {
//     if (!data.pdfUrl) {
//       throw new Error("pdfUrl is required");
//     }

//     youtubeVideoId = null;
//   }

//   return prisma.lesson.create({
//     data: {
//       title: data.title,
//       description: data.description,
//       type: data.type,
//       youtubeVideoId,
//       pdfUrl: data.pdfUrl,
//       duration: data.duration,
//       isPreview: data.isPreview,
//       order: data.order,
//       sectionId: data.sectionId,
//     },
//     include: {
//       section: true,
//     },
//   });
// };
// export const getLessonsBySection = async (sectionId: string) => {
//   return prisma.lesson.findMany({
//     where: {
//       sectionId,
//     },
//     include: {
//       section: true,
//     },
//     orderBy: {
//       order: "asc",
//     },
//   });
// };

// export const getLessonById = async (id: string) => {
//   const lesson = await prisma.lesson.findUnique({
//     where: { id },
//     include: {
//       section: true,
//     },
//   });

//   if (!lesson) {
//     throw new Error("Lesson not found");
//   }

//   return lesson;
// };

// // export const updateLesson = async (
// //   id: string,
// //   data: Partial<CreateLessonInput>
// // ) => {
// //   const lesson = await prisma.lesson.findUnique({
// //     where: { id },
// //   });

// //   if (!lesson) {
// //     throw new Error("Lesson not found");
// //   }

// //   return prisma.lesson.update({
// //     where: { id },
// //     data,
// //     include: {
// //       section: true,
// //     },
// //   });
// // };

// export const updateLesson = async (
//   id: string,
//   data: any
// ) => {

//   let youtubeVideoId = undefined;

//   if (data.type === "VIDEO" && data.videoUrl) {
//     youtubeVideoId = extractYoutubeVideoId(data.videoUrl);

//     data.pdfUrl = null;
//   }

//   if (data.type === "PDF") {
//     youtubeVideoId = null;
//   }

//   return prisma.lesson.update({
//     where: {
//       id,
//     },
//     data: {
//       title: data.title,
//       description: data.description,
//       type: data.type,
//       youtubeVideoId,
//       pdfUrl: data.pdfUrl,
//       duration: data.duration,
//       isPreview: data.isPreview,
//       order: data.order,
//     },
//   });
// };
// export const deleteLesson = async (id: string) => {
//   const lesson = await prisma.lesson.findUnique({
//     where: { id },
//   });

//   if (!lesson) {
//     throw new Error("Lesson not found");
//   }

//   await prisma.lesson.delete({
//     where: { id },
//   });

//   return {
//     success: true,
//     message: "Lesson deleted successfully",
//   };
// };


import prisma from "../../config/prisma";
import { extractYoutubeVideoId } from "../../utils/youtube";

interface CreateLessonInput {
  title: string;
  description?: string;
  type: "VIDEO" | "PDF" | "QUIZ";
  videoUrl?: string;
  pdfUrl?: string;
  duration?: number;
  isPreview?: boolean;
  order: number;
  sectionId: string;
}

/* ============================================================
   Create Lesson
============================================================ */

export const createLesson = async (data: CreateLessonInput) => {
  const section = await prisma.section.findUnique({
    where: {
      id: data.sectionId,
    },
    include: {
      course: true,
    },
  });

  if (!section) {
    throw new Error("Section not found");
  }

  const existingOrder = await prisma.lesson.findFirst({
    where: {
      sectionId: data.sectionId,
      order: data.order,
    },
  });

  if (existingOrder) {
    throw new Error(
      `Lesson order ${data.order} already exists in this section`
    );
  }

  let youtubeVideoId: string | null = null;
  let pdfUrl: string | null = null;

  switch (data.type) {
    case "VIDEO":
      if (!data.videoUrl) {
        throw new Error("videoUrl is required");
      }

      youtubeVideoId = extractYoutubeVideoId(data.videoUrl);
      break;

    case "PDF":
      if (!data.pdfUrl) {
        throw new Error("pdfUrl is required");
      }

      pdfUrl = data.pdfUrl;
      break;

    case "QUIZ":
      break;
  }

  return prisma.lesson.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      youtubeVideoId,
      pdfUrl,
      duration: data.duration,
      isPreview: data.isPreview ?? false,
      order: data.order,
      sectionId: data.sectionId,
    },
    include: {
      section: {
        include: {
          course: true,
        },
      },
    },
  });
};

/* ============================================================
   Get Lessons By Section
============================================================ */

export const getLessonsBySection = async (
  sectionId: string
) => {
  return prisma.lesson.findMany({
    where: {
      sectionId,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      section: {
        include: {
          course: true,
        },
      },
    },
  });
};

/* ============================================================
   Get Lesson By ID
============================================================ */

export const getLessonById = async (
  id: string
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
    include: {
      section: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return lesson;
};

/* ============================================================
   Update Lesson
============================================================ */

export const updateLesson = async (
  id: string,
  data: Partial<CreateLessonInput>
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  let youtubeVideoId = lesson.youtubeVideoId;
  let pdfUrl = lesson.pdfUrl;

  if (
    data.type === "VIDEO" &&
    data.videoUrl
  ) {
    youtubeVideoId =
      extractYoutubeVideoId(data.videoUrl);

    pdfUrl = null;
  }

  if (data.type === "PDF") {
    youtubeVideoId = null;
    pdfUrl = data.pdfUrl ?? null;
  }

  return prisma.lesson.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      youtubeVideoId,
      pdfUrl,
      duration: data.duration,
      isPreview: data.isPreview,
      order: data.order,
    },
    include: {
      section: {
        include: {
          course: true,
        },
      },
    },
  });
};

/* ============================================================
   Delete Lesson
============================================================ */

export const deleteLesson = async (
  id: string
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  await prisma.lesson.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Lesson deleted successfully",
  };
};