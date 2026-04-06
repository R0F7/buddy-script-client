import React, { useState } from "react";
import Icon from "../Icon/Icon";
import { commentImg, postImg } from "../../assets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const TimelinePost = ({ post, isActive, onToggleDropdown }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: like_unlike } = useMutation({
    mutationFn: async (postId) => {
      const { data } = await axiosSecure.patch(`/posts/${postId}/like`, {
        userId: user?.uid,
        userName: user?.displayName,
        userEmail: user?.email,
        userImage: user?.photoURL,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleLike = async (id) => {
    try {
      await like_unlike(id);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const isLiked = post?.likes?.some((like) => like.userId === user?.uid);

  const { mutateAsync: addComment } = useMutation({
    mutationFn: async ({ postId, commentData }) => {
      const { data } = await axiosSecure.post(
        `/posts/${postId}/comment`,
        commentData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setCommentText("");
    },
  });

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const commentData = {
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      text: commentText,
    };

    try {
      await addComment({ postId: post._id, commentData });
      console.log("Comment added successfully");
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const { mutateAsync: handleCommentLikeMutation } = useMutation({
    mutationFn: async ({ postId, commentId }) => {
      const { data } = await axiosSecure.post(
        `/posts/${postId}/comment/${commentId}/like`,
        {
          userId: user?.uid,
          userName: user?.displayName,
          userEmail: user?.email,
          userImage: user?.photoURL,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleCommentLike = async (postId, commentId) => {
    try {
      await handleCommentLikeMutation({ postId, commentId });
    } catch (err) {
      console.error("Comment like failed:", err);
    }
  };

  const { mutateAsync: addReply } = useMutation({
    mutationFn: async ({ postId, commentId, replyData }) => {
      const { data } = await axiosSecure.post(
        `/posts/${postId}/comment/${commentId}/reply`,
        replyData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleCommentReply = async (e, postId, commentId) => {
    e.preventDefault();
    const text = e.target.commentTextReply.value;

    if (!text.trim()) return;

    const replyData = {
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      text: text,
    };

    try {
      await addReply({ postId, commentId, replyData });
      e.target.reset();
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  const timeAgo = (timeString) => {
    const past = new Date(timeString);
    const now = new Date();

    const diffSec = Math.floor((now - past) / 1000);

    if (diffSec < 60) return "just now";

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return diffMin + " minutes ago";

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return diffHour + " hours ago";

    const diffDay = Math.floor(diffHour / 24);
    return diffDay + " days ago";
  };

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        {/* Post Header */}
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img
                src={post.userImage || postImg}
                alt=""
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author.name}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {timeAgo(post.time)} .
                {post.isPrivate ? (
                  <a href="#0"> Privacy</a>
                ) : (
                  <a href="#0"> Public</a>
                )}
              </p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                id="_timeline_show_drop_btn"
                className="_feed_timeline_post_dropdown_link"
                onClick={() => onToggleDropdown(post.id)}
              >
                <Icon name="dots" />
              </button>
            </div>

            {isActive && (
              <div
                id="_timeline_drop"
                className="_feed_timeline_dropdown _timeline_dropdown show"
              >
                <ul className="_feed_timeline_dropdown_list">
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icon name="savePost" />
                      </span>
                      Save Post
                    </a>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icon name="notification" />
                      </span>
                      Turn On Notification
                    </a>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icon name="hide" />
                      </span>
                      Hide
                    </a>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icon name="editPost" />
                      </span>
                      Edit Post
                    </a>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icon name="deletePost" />
                      </span>
                      Delete Post
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Post Title */}
        <h4 className="_feed_inner_timeline_post_title">{post.title}</h4>

        {/* Post Image */}
        <div className="_feed_inner_timeline_image">
          <img src={post.img} alt="" className="_time_img" />
        </div>
      </div>

      {/* Reactions Summary */}
      <div className="_feed_inner_timeline_total_reacts d-flex justify-content-between align-items-center px-3 mb-3">
        <div className="d-flex align-items-center gap-1">
          {post?.likes?.slice(0, 5).map((like, index) => (
            <img
              key={index}
              src={like.userImage || "https://i.ibb.co/cK1Vpwgb/demo-user.jpg"}
              alt={like.userName}
              referrerPolicy="no-referrer"
              className="rounded-circle border border-white"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "cover",
                marginLeft: index === 0 ? "0px" : "-20px",
                zIndex: index,
              }}
            />
          ))}

          {post?.likes?.length > 5 && (
            <span
              className="text-white d-inline-flex justify-content-center align-items-center border border-white"
              style={{
                width: "32px",
                height: "32px",
                marginLeft: "-20px",
                backgroundColor: "#1890FF",
                borderRadius: "50%",
                fontSize: "12px",
                zIndex: 6,
              }}
            >
              {post.likes.length - 5}+
            </span>
          )}

          {(!post?.likes || post?.likes?.length === 0) && (
            <span className="text-muted small ms-1">0 Likes</span>
          )}
        </div>

        <div className="d-flex gap-3">
          <p className="mb-0 text-muted small">
            <a href="#" className="text-decoration-none text-dark">
              <span className="fw-semibold">{post.comments?.length || 0}</span>{" "}
              Comment
            </a>
          </p>
          <p className="mb-0 text-muted small">
            <span className="fw-semibold">{post.shares?.length || 0}</span>{" "}
            Share
          </p>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="_feed_inner_timeline_reaction">
        <button
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? "_feed_reaction_active" : ""}`}
          onClick={() => handleLike(post._id)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              {isLiked ? <Icon name="liked" /> : <Icon name="like" />}
            </span>
          </span>
        </button>

        <button
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <Icon name="commentReaction" />
              Comment
            </span>
          </span>
        </button>

        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <Icon name="shareReaction" />
              Share
            </span>
          </span>
        </button>
      </div>

      {/* Main Comment Input Area */}
      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form
            className="_feed_inner_comment_box_form"
            onSubmit={(e) => handleComment(e, post._id)}
          >
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img src={commentImg} alt="" className="_comment_img" />
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a comment"
                  id="floatingTextarea2"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
            </div>
            {commentText.length <= 0 ? (
              <div className="_feed_inner_comment_box_icon">
                <button
                  type="button"
                  className="_feed_inner_comment_box_icon_btn"
                >
                  <Icon name="attachment" />
                </button>
                <button
                  type="button"
                  className="_feed_inner_comment_box_icon_btn"
                >
                  <Icon name="gallery" />
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="_feed_inner_comment_box_icon_btn"
                style={{ color: "red" }}
              >
                <Icon name="postSendFill" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Comments List Section */}
      <div className="_timline_comment_main">
        {/* View Previous Comments Button */}
        {post.comments?.length > 0 && (
          <div className="_previous_comment">
            <button
              type="button"
              className="_previous_comment_txt"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments
                ? "Hide comments"
                : `View ${post.comments.length} comments`}
            </button>
          </div>
        )}

        {showAllComments &&
          post.comments?.map((comment, idx) => (
            <div className="_comment_main mb-4" key={idx}>
              <div className="_comment_image">
                <a href="#0" className="_comment_image_link">
                  <img
                    src={
                      comment.userImage ||
                      "https://i.ibb.co/cK1Vpwgb/demo-user.jpg"
                    }
                    alt=""
                    className="_comment_img1"
                  />
                </a>
              </div>
              <div className="_comment_area">
                <div className="_comment_details" style={{ maxWidth: "100%" }}>
                  <div className="_comment_details_top">
                    <div className="_comment_name">
                      <a href="#0">
                        <h4 className="_comment_name_title">
                          {comment.userName}
                        </h4>
                      </a>
                    </div>
                  </div>
                  <div className="_comment_status">
                    <p className="_comment_status_text">
                      <span>{comment.text}</span>
                    </p>
                  </div>

                  {/* Reaction Summary */}
                  <div className="_total_reactions">
                    <div className="_total_react">
                      <span className="_reaction_like">
                        <Icon name="like" />
                      </span>
                      <span className="_reaction_heart">
                        <Icon name="heart" />
                      </span>
                    </div>
                    <span className="_total">{comment.likes?.length || 0}</span>
                  </div>

                  {/* Comment Action Links */}
                  <div className="_comment_reply">
                    <div className="_comment_reply_num">
                      <ul className="_comment_reply_list">
                        <li>
                          <span
                            className={
                              comment.likes?.some((l) => l.userId === user?.uid)
                                ? "text-primary"
                                : ""
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleCommentLike(post._id, comment.commentId)
                            }
                          >
                            Like.
                          </span>
                        </li>
                        <li>
                          <span style={{ cursor: "pointer" }}>Reply.</span>
                        </li>
                        <li>
                          <span>Share</span>
                        </li>
                        <li>
                          <span className="_time_link">
                            .{timeAgo(comment.time)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {comment.replies?.length > 0 && (
                  <div className="_comment_replies_list ms-5 mt-3">
                    {comment.replies.map((reply, ridx) => (
                      <div className="_comment_main mb-3" key={ridx}>
                        <div className="_comment_imag">
                          <img
                            src={
                              reply.userImage ||
                              "https://i.ibb.co/cK1Vpwgb/demo-user.jpg"
                            }
                            alt=""
                            className="_comment_img1"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div
                          className="_comment_area"
                          style={{ height: "auto" }}
                        >
                          <div
                            className="_comment_details p-2 rounded"
                            style={{
                              marginBottom: "6px",
                              minWidth: "100%",
                              background: "#F6F6F6",
                            }}
                          >
                            <h4
                              className="_comment_name_title"
                              style={{
                                fontSize: "13px",
                                margin: "0",
                                lineHeight: "1.2",
                              }}
                            >
                              {reply.userName}
                            </h4>
                            <p
                              className="_comment_status_text"
                              style={{
                                fontSize: "16px",
                                margin: "0",
                                marginTop: "4px",
                                lineHeight: "1.3",
                              }}
                            >
                              {reply.text}
                            </p>
                          </div>

                          <div
                            className="_comment_reply"
                            style={{ marginTop: "0" }}
                          >
                            <ul
                              className="_comment_reply_list"
                              style={{
                                fontSize: "11px",
                                margin: "0",
                                padding: "0",
                                listStyle: "none",
                                display: "flex",
                                gap: "10px",
                              }}
                            >
                              <li>
                                <span
                                  className="_time_link"
                                  style={{ color: "#65676b" }}
                                >
                                  {timeAgo(reply.time)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                <div className="_feed_inner_comment_box mt-2">
                  <form
                    className="_feed_inner_comment_box_form"
                    onSubmit={(e) =>
                      handleCommentReply(e, post._id, comment.commentId)
                    }
                  >
                    <div className="_feed_inner_comment_box_content">
                      <div className="_feed_inner_comment_box_content_image">
                        <img
                          src={user?.photoURL || commentImg}
                          alt=""
                          className="_comment_img"
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="_feed_inner_comment_box_content_txt">
                        <textarea
                          name="commentTextReply"
                          className="form-control _comment_textarea"
                          placeholder="Write a reply..."
                          rows="1"
                        />
                      </div>
                      <button
                        type="submit"
                        className="_feed_inner_comment_box_icon_btn"
                        style={{ color: "red" }}
                      >
                        <Icon name="postSendFill" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimelinePost;