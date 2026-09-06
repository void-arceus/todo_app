import { useEffect, useState } from "react";
import submitIcon from "../../../assets/icons/submit_icon.png";
import { useTask } from "../context/TaskContext";
import { getComments } from "../services/comments.service";

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
    const { selectedTaskId } = useTask();

    useEffect(() => {
        handleTaskComments();
    }, []);

    async function handleTaskComments() {
        console.log("Task id:", selectedTaskId);
        try {
            const res = await getComments(selectedTaskId);
            setCommentData(res.comments);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    function createdAt(myDate: Date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const customDate = myDate.toLocaleDateString("en-US", options);
    }

    return (
        <div className="p-2 w-full flex flex-col items-start">
            <button className="text-sm text-text-dark font-medium cursor-pointer select-none py-2 px-4">
                Comments
            </button>
            {/* comments for later */}
            {commentData.length > 0 ? (
                commentData.map((comment) => (
                    <div
                        key={comment?._id}
                        className="flex items-start gap-2 px-4 my-4"
                    >
                        <div className="px-3 py-1 border border-border-hover bg-black/10 rounded-full">
                            <h1 className="text-md font-medium">v</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>
                                <p className="text-xs font-bold text-text-dark">
                                    void_arceus
                                </p>
                                <span>{formatDate(comment?.createdAt)}</span>
                            </div>
                            <span className="text-xs font-medium text-text-grey">
                                {comment?.message}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div>No Comments </div>
            )}

            {/*  */}

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
                        className="text-xs text-text-grey outline-0 border border-border-primary w-full p-2 rounded-full focus:border-border-hover"
                    />
                    <button className="absolute right-8 top-2 text-xs font-semibold cursor-pointer select-none z-10">
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
