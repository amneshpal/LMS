import { Request, Response } from "express";
import * as adminDashboardService from "./adminDashboard.service";

/* ===========================
   Dashboard Overview
=========================== */

export const getDashboardOverview = async (
  req: Request,
  res: Response
) => {
  try {

    const dashboard =
      await adminDashboardService.getDashboardOverview();

    return res.json({
      success: true,
      data: dashboard,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Recent Students
=========================== */

export const getRecentStudents = async (
  req: Request,
  res: Response
) => {
  try {

    const students =
      await adminDashboardService.getRecentStudents();

    return res.json({
      success: true,
      data: students,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Recent Payments
=========================== */

export const getRecentPayments = async (
  req: Request,
  res: Response
) => {
  try {

    const payments =
      await adminDashboardService.getRecentPayments();

    return res.json({
      success: true,
      data: payments,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Recent Enrollments
=========================== */

export const getRecentEnrollments = async (
  req: Request,
  res: Response
) => {
  try {

    const enrollments =
      await adminDashboardService.getRecentEnrollments();

    return res.json({
      success: true,
      data: enrollments,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Recent Reviews
=========================== */

export const getRecentReviews = async (
  req: Request,
  res: Response
) => {
  try {

    const reviews =
      await adminDashboardService.getRecentReviews();

    return res.json({
      success: true,
      data: reviews,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Top Selling Courses
=========================== */

export const getTopSellingCourses = async (
  req: Request,
  res: Response
) => {
  try {

    const courses =
      await adminDashboardService.getTopSellingCourses();

    return res.json({
      success: true,
      data: courses,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Top Rated Courses
=========================== */

export const getTopRatedCourses = async (
  req: Request,
  res: Response
) => {
  try {

    const courses =
      await adminDashboardService.getTopRatedCourses();

    return res.json({
      success: true,
      data: courses,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Revenue Analytics
=========================== */

export const getRevenueAnalytics = async (
  req: Request,
  res: Response
) => {
  try {

    const revenue =
      await adminDashboardService.getRevenueAnalytics();

    return res.json({
      success: true,
      data: revenue,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================
   Enrollment Analytics
=========================== */

export const getEnrollmentAnalytics = async (
  req: Request,
  res: Response
) => {
  try {

    const enrollments =
      await adminDashboardService.getEnrollmentAnalytics();

    return res.json({
      success: true,
      data: enrollments,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};