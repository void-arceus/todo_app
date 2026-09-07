import { useEffect, useState } from "react";
import submitIcon from "../../../assets/icons/submit_icon.png";
import { useTask } from "../context/TaskContext";
import { addComment, getComments } from "../services/comments.service";
import { useToast } from "../../../core/Toaster/Context/ToastContext";
import { type IPostCommentData } from "../services/comments.service";
import menuIcon from "../../../assets/icons/menu_dots.png";
import editIcon from "../../../assets/icons/edit_icon.png";
import deleteIcon from "../../../assets/icons/delete.png";

interface ICommentData {
    _id: string;
    message: string;
    userId: string;
    taskId: string;
    createdAt: Date;
    updatedAt: Date;
}

function Comments() {
    const [commentData, setCommentData] = useState<ICommentData[]>([]);
    const [selectedCommentId, setSelectedCommentId] = useState<string>("");
    const [commentMessage, setCommentMessage] = useState<string>("");
    const [displayCommentOptions, setDisplayCommentOptions] =
        useState<boolean>(false);
    const [displayCommentEditor, setDisplayCommentEditor] =
        useState<boolean>(false);
    const [editedComment, setEditedComment] = useState<string>("");
    const { selectedTaskId } = useTask();
    const { handleShowToast } = useToast();

    useEffect(() => {
        handleTaskComments();
    }, []);

    async function handleTaskComments() {
        try {
            const res = await getComments(selectedTaskId);
            if (res?.status) {
                setCommentData(res?.data?.comments);
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function handleAddComment() {
        try {
            if (!commentMessage || commentMessage.trim() === "") {
                handleShowToast({
                    message: "Comment cannot be empty",
                    status: false,
                });
                return;
            }
            const data: IPostCommentData = {
                comment: commentMessage,
                taskId: selectedTaskId,
            };
            const res = await addComment(data);
            if (res?.status) {
                setCommentMessage("");
                setCommentData((prev) => [res?.data?.newComment, ...prev]);
                handleShowToast({
                    message: "Comment added successfully",
                    status: true,
                });
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    function formatDate(myDate: Date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const customDate = new Date(myDate).toLocaleDateString(
            "en-US",
            options as any,
        );
        return customDate;
    }

    return (
        <div
            onClick={() => {
                setDisplayCommentOptions(false);
            }}
            className="p-2 flex-1 w-full flex flex-col items-start"
        >
            <button className="text-sm text-text-dark font-semibold cursor-pointer select-none py-2 px-4">
                Comments
            </button>
            {/* comments for later */}
            {commentData.length > 0 ? (
                commentData.map((comment) =>
                    displayCommentEditor &&
                    selectedCommentId === comment._id ? (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            key={comment._id}
                            className="w-full p-2"
                        >
                            <div className="border border-border-primary">
                                <input />
                                <div>
                                    <button
                                        onClick={() => {
                                            setDisplayCommentEditor(false);
                                            setSelectedCommentId("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button>Update</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            key={comment?._id}
                            className="relative w-full flex items-start justify-between gap-2 px-4 py-2"
                        >
                            {displayCommentOptions &&
                            selectedCommentId === comment._id ? (
                                <div className="absolute w-25 top-8 right-4 bg-white border border-border-primary shadow-md p-1 rounded-lg hover:border-border-hover z-40 flex flex-col items-center">
                                    <button
                                        onClick={() =>
                                            setDisplayCommentEditor(true)
                                        }
                                        className="w-full flex items-center justify-start gap-2 px-2 py-1 hover:bg-active rounded-sm hover:cursor-pointer active:scale-[0.98]"
                                    >
                                        <img
                                            src={editIcon}
                                            alt="edit-icon.png"
                                            className="h-4"
                                        />
                                        <span className="text-xs text-text-dark font-medium">
                                            Edit
                                        </span>
                                    </button>
                                    <button className="w-full flex items-center justify-start gap-2 px-2 py-1 hover:bg-active rounded-sm hover:cursor-pointer active:scale-[0.98]">
                                        <img
                                            src={deleteIcon}
                                            alt="delete_icon.png"
                                            className="h-4"
                                        />
                                        <span className="text-xs font-medium text-text-dark">
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            ) : null}
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 flex items-center justify-center border border-border-hover bg-black/10 rounded-full">
                                    <h1 className="text-md font-medium">v</h1>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-bold text-text-dark">
                                            void_arceus
                                        </p>
                                        <span className="text-[12px] font-medium text-text-grey">
                                            {formatDate(comment?.createdAt)}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-text-grey">
                                        {comment?.message}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedCommentId(
                                        selectedCommentId === comment._id
                                            ? ""
                                            : comment._id,
                                    );
                                    setDisplayCommentOptions((prev) => !prev);
                                }}
                                className="cursor-pointer active:scale-[0.96]"
                            >
                                <img
                                    src={menuIcon}
                                    alt="menu_icon.png"
                                    className="h-4 cursor-pointer active:scale-[0.96]"
                                />
                            </button>
                        </div>
                    ),
                )
            ) : (
                <div className="px-4">
                    <p className="text-xs text-text-grey font-medium">
                        No Comments
                    </p>
                </div>
            )}

            {/* add comment section */}
            <div className="w-full my-3">
                <div className="w-full px-4 relative flex items-center gap-2">
                    <div className="px-3 py-1 border border-border-hover rounded-full bg-black/10 cursor-pointer">
                        <h1 className="text-md select-none cursor-pointer">
                            v
                        </h1>
                    </div>
                    <input
                        placeholder="Add a comment"
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                        className="text-xs text-text-grey outline-0 border border-border-primary w-full p-2 rounded-full focus:border-border-hover"
                    />
                    <button
                        onClick={handleAddComment}
                        className="absolute right-8 top-2 text-xs font-semibold cursor-pointer select-none z-10"
                    >
                        <img
                            src={submitIcon}
                            alt="submit_icon.png"
                            className="h-4"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Comments;
