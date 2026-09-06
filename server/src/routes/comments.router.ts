import express, { type Router } from "express";
import { authUser } from "../middleware/auth.middleware";
import handleUpdateComment, {
    handleAddComment,
    handleDeleteComment,
    handleGetComments,
} from "../controllers/comments.controller";

const router: Router = express.Router();

router.get("/:id", authUser, handleGetComments);
router.post("/", authUser, handleAddComment);
router.patch("/:id", authUser, handleUpdateComment);
router.delete("/:id", authUser, handleDeleteComment);

export default router;
