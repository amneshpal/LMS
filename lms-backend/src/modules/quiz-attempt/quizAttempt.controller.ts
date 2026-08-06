import { Request, Response } from "express";
import * as quizAttemptService from "./quizAttempt.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

const getParamValue = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

/* ===========================
   Submit Quiz
=========================== */

export const submitQuiz = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const result =
      await quizAttemptService.submitQuiz({

        studentId: req.user.id,

        quizId: getParamValue(req.params.quizId),

        answers: req.body.answers,

      });

    return res.status(201).json({

      success: true,

      message: "Quiz submitted successfully",

      data: result,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};

/* ===========================
   Get Result
=========================== */

export const getQuizResult = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const result =
      await quizAttemptService.getQuizResult(

        req.user.id,

        getParamValue(req.params.quizId)

      );

    return res.json({

      success: true,

      data: result,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};

/* ===========================
   Attempt History
=========================== */

export const getAttemptHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const history =
      await quizAttemptService.getAttemptHistory(
        req.user.id
      );

    return res.json({

      success: true,

      data: history,

    });

  } catch (error: any) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};