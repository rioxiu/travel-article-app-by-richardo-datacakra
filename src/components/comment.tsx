import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../redux/reducer/commentReducer";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface IdocumentId {
  documentId: string | undefined;
}
const CommentSection: FC<IdocumentId> = ({ documentId }) => {
  const [newComment, setNewComment] = useState<string>("");
  //   const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/comments", {
        method: "POST",
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            content: newComment,
            article: documentId,
          },
        }),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Failed to post comment",
          icon: "error",
          confirmButtonText: "Cool",
        });
        throw new Error("Failed to post comment");
      }
      Swal.fire({
        title: "Success",
        text: "Comment posted successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="flex flex-col gap-4"></div>
      <form onSubmit={handleCommentSubmit} className="flex flex-col mt-4">
        <textarea
          className="textarea textarea-bordered"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit" className="btn btn-primary mt-2">
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
