import { useState } from "react";
import api from "../../services/api";

import type { KanbanTask } from "./kanbanTypes";

type Props = {
  task: KanbanTask;
  onRefresh: () => void;
};

export default function CommentPanel({
  task,
  onRefresh,
}: Props) {
  const [text, setText] = useState("");

  async function addComment() {
    if (!text.trim()) return;

    try {
      await api.post(
        `/tasks/${task._id}/comment`,
        {
          text,
        }
      );

      setText("");

      onRefresh();

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="comment-panel">

      <h3>Comments</h3>

      <div className="comment-list">

        {task.comments?.length ? (

          task.comments.map((comment, index) => (

            <div
              key={index}
              className="comment-item"
            >
              <strong>
                {comment.user?.name || "User"}
              </strong>

              <p>{comment.text}</p>

            </div>

          ))

        ) : (

          <p>No comments yet.</p>

        )}

      </div>

      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={addComment}>
        Add Comment
      </button>

    </div>
  );
}