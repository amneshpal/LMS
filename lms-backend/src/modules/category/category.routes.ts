// import { Router } from "express";
// import { create, getAll } from "./category.controller";
// import { authenticate } from "../../middlewares/auth.middleware";
// import { authorize } from "../../middlewares/role.middleware";

// const router = Router();

// router.post(
//   "/",
//   authenticate,
//   authorize("ADMIN"),
//   create
// );

// router.get("/", getAll);

// export default router;

import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "./category.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  create
);

router.get("/", getAll);

router.get("/:id", getById);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  remove
);
export default router;