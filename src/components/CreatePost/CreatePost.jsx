import React, { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Icon from "../Icon/Icon";
import { txtImg } from "../../assets";
import imageUpload from "../../utility/imageUpload";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CreatePost = ({ postText, setPostText }) => {
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const { mutateAsync: crate_post, isPending } = useMutation({
    mutationFn: async (newPost) => {
      const res = await axiosCommon.post("/crate-post", newPost);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      setPostText("");
      setSelectedImage(null);
      setPreviewUrl("");
      toast.success("Post created successfully");
    },
  });

  const handlePostSubmit = async () => {
    if (!postText.trim() && !selectedImage) return;

    let finalImageUrl = "";
    if (selectedImage) {
      finalImageUrl = await imageUpload(selectedImage);
    }

    crate_post({
      title: postText,
      img: finalImageUrl,
      author: {
        name: user.displayName,
        email: user.email,
        userImage: null,
      },
      isPrivate: false,
      likes: [],
      comments: [],
      shares: [],
    });
  };

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img
            src={user.photoURL || txtImg}
            referrerPolicy="no-referrer"
            alt="Image"
            className="_txt_img"
          />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea
            className="form-control _textarea"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <label className="_feed_textarea_label" htmlFor="floatingTextarea">
            Write something ... <Icon name="writeIcon" />
          </label>
        </div>
      </div>

      {previewUrl && (
        <div className="_mar_t16 position-relative d-inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="_b_radious6 shadow-sm"
            style={{
              width: "120px",
              height: "80px",
              objectFit: "cover",
              border: "1px solid #eee",
            }}
          />
          <button
            type="button"
            onClick={() => {
              setSelectedImage(null);
              setPreviewUrl("");
            }}
            className="btn btn-danger btn-sm rounded-circle position-absolute"
            style={{
              top: "-8px",
              right: "-8px",
              width: "20px",
              height: "20px",
              padding: 0,
              fontSize: "12px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* For Desktop */}
      <div className="_feed_inner_text_area_bottom d-none d-md-flex">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button
              type="button"
              onClick={handleIconClick}
              className="_feed_inner_text_area_bottom_photo_link border-0 bg-transparent"
            >
              <span className="_mar_img">
                <Icon name="photo" />
              </span>{" "}
              Photo
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_mar_img">
                <Icon name="video" />
              </span>{" "}
              Video
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_mar_img">
                <Icon name="event" />
              </span>
              Event
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_mar_img">
                <Icon name="article" />
              </span>
              Article
            </button>
          </div>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={handlePostSubmit}
            disabled={isPending || (!postText.trim() && !selectedImage)}
          >
            <Icon name="postSend" />{" "}
            <span>{isPending ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>

      {/* For Mobile */}
      <div className="_feed_inner_text_area_bottom_mobile d-flex d-md-none">
        <div className="_feed_inner_text_mobile w-100">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button
                type="button"
                onClick={handleIconClick}
                className="_feed_inner_text_area_bottom_photo_link border-0 bg-transparent"
              >
                <Icon name="photo" />
              </button>
            </div>

            <div className="_feed_inner_text_area_bottom_video _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_mar_img">
                  <Icon name="video" />
                </span>
              </button>
            </div>

            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_mar_img">
                  <Icon name="event" />
                </span>
              </button>
            </div>

            <div className="_feed_inner_text_area_bottom_article _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_mar_img">
                  <Icon name="article" />
                </span>
              </button>
            </div>
          </div>

          <div className="_feed_inner_text_area_btn">
            <button
              type="button"
              className="_feed_inner_text_area_btn_link"
              onClick={handlePostSubmit}
              disabled={isPending || (!postText.trim() && !selectedImage)}
            >
              <Icon name="postSend" /> <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
