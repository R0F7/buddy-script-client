import React from 'react';
import Icon from '../Icon/Icon';
import { txtImg } from '../../assets';

const CreatePost = ({ postText, setPostText }) => {
  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img src={txtImg} alt="Image" className="_txt_img" />
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

      {/* For Desktop */}
      <div className="_feed_inner_text_area_bottom d-none d-md-flex">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_mar_img"><Icon name="photo" /></span> Photo
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_mar_img"><Icon name="video" /></span> Video
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_mar_img"><Icon name="event" /></span> Event
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_mar_img"><Icon name="article" /></span> Article
            </button>
          </div>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button type="button" className="_feed_inner_text_area_btn_link">
            <Icon name="postSend" /> <span>Post</span>
          </button>
        </div>
      </div>

      {/* For Mobile */}
      <div className="_feed_inner_text_area_bottom_mobile d-flex d-md-none">
        <div className="_feed_inner_text_mobile w-100">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link">
                <Icon name="photo" />
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_video _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link">
                <Icon name="video" />
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link">
                <Icon name="event" />
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_article _feed_common">
              <button type="button" className="_feed_inner_text_area_bottom_photo_link">
                <Icon name="article" />
              </button>
            </div>
          </div>

          <div className="_feed_inner_text_area_btn">
            <button type="button" className="_feed_inner_text_area_btn_link">
              <Icon name="postSend" /> <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;