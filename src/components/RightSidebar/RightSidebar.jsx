import React from 'react';
import Icon from '../Icon/Icon';
import { avatar } from '../../assets';

const RightSidebar = ({ friendsList }) => {
  return (
    <div className="_layout_right_sidebar_wrap">
      <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <div className="_right_inner_area_info_content _mar_b24">
          <h4 className="_title5">You Might Like</h4>
          <span><a href="#0">See All</a></span>
        </div>
        <hr className="_underline" />
        <div className="_right_inner_area_info_ppl">
          <div className="_right_inner_area_info_box">
            <div className="_right_inner_area_info_box_image">
              <a href="profile.html">
                <img src={avatar} alt="Avatar" className="_ppl_img" />
              </a>
            </div>
            <div className="_right_inner_area_info_box_txt">
              <a href="profile.html">
                <h4>Radovan SkillArena</h4>
              </a>
              <p>Founder & CEO at Trophy</p>
            </div>
          </div>
          <div className="_right_info_btn_grp">
            <button>Ignore</button>
            <button className="_right_info_btn_link_active">Follow</button>
          </div>
        </div>
      </div>

      <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <div className="_feed_top_fixed">
          <div className="_feed_right_inner_area_card_content _mar_b24">
            <h4 className="_title5">Your Friends</h4>
            <span><a href="find-friends.html">See All</a></span>
          </div>
          <form className="_feed_right_inner_area_card_form">
            <Icon name="search" />
            <input className="form-control me-2" type="search" placeholder="input search text" />
          </form>
        </div>
        <div className="_feed_bottom_fixed">
          {friendsList.map((friend, idx) => (
            <div
              key={idx}
              className={`_feed_right_inner_area_card_ppl ${friend.status === "inactive" ? "_feed_right_inner_area_card_ppl_inactive" : ""}`}
            >
              <div className="_feed_right_inner_area_card_ppl_box">
                <div className="_feed_right_inner_area_card_ppl_image">
                  <a href="profile.html">
                    <img src={friend.img} alt={friend.name} className="_box_ppl_img" />
                  </a>
                </div>
                <div className="_feed_right_inner_area_card_ppl_txt">
                  <a href="profile.html">
                    <h4>{friend.name}</h4>
                  </a>
                  <p>{friend.role}</p>
                </div>
              </div>
              <div className="_feed_right_inner_area_card_ppl_side">
                {friend.status === "active" ? <span>🟢</span> : <span>{friend.time}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;