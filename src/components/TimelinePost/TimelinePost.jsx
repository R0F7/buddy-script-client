import React from 'react';
import Icon from '../Icon/Icon';
import { commentImg, postImg } from '../../assets';

const TimelinePost = ({ post, isActive, onToggleDropdown }) => {
  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src={postImg} alt="Post" className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4>{post.name}</h4>
              <p>
                {post.time} . <a href="#0">{post.privacy}</a>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                className="_feed_timeline_post_dropdown_link"
                onClick={() => onToggleDropdown(post.id)}
              >
                <Icon name="dots" />
              </button>
            </div>
            {isActive && (
              <div className="_feed_timeline_dropdown show">
                <ul className="_feed_timeline_dropdown_list">
                  <li><a href="#0" className="_feed_timeline_dropdown_link"><span>📌</span> Save Post</a></li>
                  <li><a href="#0" className="_feed_timeline_dropdown_link"><span>🔔</span> Turn On Notification</a></li>
                  <li><a href="#0" className="_feed_timeline_dropdown_link"><span>🙈</span> Hide</a></li>
                  <li><a href="#0" className="_feed_timeline_dropdown_link"><span>✏️</span> Edit Post</a></li>
                  <li><a href="#0" className="_feed_timeline_dropdown_link"><span>🗑️</span> Delete Post</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <h4 className="_feed_inner_timeline_post_title">{post.title}</h4>
        <div className="_feed_inner_timeline_image">
          <img src={post.img} alt="Timeline" className="_time_img" />
        </div>
      </div>
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          <span>👍❤️😮</span>
          <p className="_feed_inner_timeline_total_reacts_para">{post.likes}+</p>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p><span>{post.comments}</span> Comment</p>
          <p><span>{post.shares}</span> Share</p>
        </div>
      </div>
      <div className="_feed_inner_timeline_reaction">
        <button className={`_feed_reaction ${post.reacted ? "_feed_reaction_active" : ""}`}>
          😆 Haha
        </button>
        <button className="_feed_reaction">💬 Comment</button>
        <button className="_feed_reaction">↗️ Share</button>
      </div>
      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form">
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img src={commentImg} alt="Comment" className="_comment_img" />
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea className="form-control _comment_textarea" placeholder="Write a comment"></textarea>
              </div>
            </div>
            <div className="_feed_inner_comment_box_icon">
              <button className="_feed_inner_comment_box_icon_btn">📎</button>
              <button className="_feed_inner_comment_box_icon_btn">🖼️</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimelinePost;