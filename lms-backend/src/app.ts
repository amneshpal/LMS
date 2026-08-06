// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import authRoutes from "./routes/auth.routes";
// import categoryRoutes from "./modules/category/category.routes";
// import courseRoutes from "./modules/course/course.routes";
// import lessonRoutes from "./modules/lesson/lesson.routes";
// import sectionRoutes from "./modules/section/section.routes";
// import enrollmentRoutes from "./modules/enrollment/enrollment.routes";
// import studentRoutes from "./modules/student/student.routes";
// import progressRoutes from "./modules/progress/progress.routes"; 
// import quizRoutes from "./modules/quiz/quiz.routes";
// import questionRoutes from "./modules/question/question.routes";
// import optionRoutes from "./modules/option/option.routes";
// import quizAttemptRoutes from "./modules/quiz-attempt/quizAttempt.routes";
// import router from "./routes/auth.routes";
// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(helmet());

// app.use(compression());

// app.use(morgan("dev"));


// app.use("/api/v1/auth", authRoutes);

// app.use("/api/v1/categories", categoryRoutes);
// app.use("/api/v1/courses", courseRoutes);
// app.use("/api/v1/sections", sectionRoutes);
// app.use("/api/v1/lessons", lessonRoutes);
// app.use("/api/v1/enrollments", enrollmentRoutes);
// app.use("/api/v1/progress", progressRoutes);
// app.use("/api/v1/quizzes", quizRoutes);

// app.use(
//     "/api/v1/student",
//     studentRoutes
// );
// app.use("/api/v1/questions", questionRoutes);
// app.use("/api/v1/options", optionRoutes);
// app.use("/api/v1/quiz-attempts", quizAttemptRoutes);
// router.use("/quiz-attempts", quizAttemptRoutes);
// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "LMS Backend Running"
//     });
// });

// export default app;


import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";

import categoryRoutes from "./modules/category/category.routes";
import courseRoutes from "./modules/course/course.routes";
import sectionRoutes from "./modules/section/section.routes";
import lessonRoutes from "./modules/lesson/lesson.routes";
import enrollmentRoutes from "./modules/enrollment/enrollment.routes";
import studentRoutes from "./modules/student/student.routes";
import progressRoutes from "./modules/progress/progress.routes";
import quizRoutes from "./modules/quiz/quiz.routes";
import questionRoutes from "./modules/question/question.routes";
import optionRoutes from "./modules/option/option.routes";
import quizAttemptRoutes from "./modules/quiz-attempt/quizAttempt.routes";
import reviewRoutes from "./modules/review/review.routes";
import wishlistRoutes from "./modules/wishlist/wishlist.routes";
import paymentRoutes from "./modules/payment/payment.routes";
import adminRoutes from "./modules/admin/admin.routes";
import userManagementRoutes from "./modules/user-management/userManagement.routes";
import certificateRoutes from "./modules/certificate/certificate.routes";
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));


/* ===========================
   AUTH
=========================== */

app.use("/api/v1/auth", authRoutes);

/* ===========================
   LMS
=========================== */

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/sections", sectionRoutes);
app.use("/api/v1/lessons", lessonRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/progress", progressRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/options", optionRoutes);
app.use("/api/v1/quiz-attempts", quizAttemptRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin", userManagementRoutes);
app.use("/api/v1/certificates", certificateRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "LMS Backend Running",
  });
});

export default app;