import React from "react";
import Icon from "../Icon/Icon";

const LeftSidebar = ({ exploreItems, suggestedPeople, events }) => {
  return (
    <div className="_layout_left_sidebar_wrap">
      {/* Explore Section */}
      <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
        <h4 className="_left_inner_area_explore_title _title5 _mar_b24">
          Explore
        </h4>
        <ul className="_left_inner_area_explore_list">
          {exploreItems.map((item, idx) => (
            <li
              key={idx}
              className={`_left_inner_area_explore_item ${item.isNew ? "_explore_item" : ""}`}
            >
              <a href={item.link} className="_left_inner_area_explore_link">
                <Icon name={item.icon} />
                {item.name}
              </a>
              {item.isNew && (
                <span className="_left_inner_area_explore_link_txt">New</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested People */}
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_area_suggest_content _mar_b24">
            <h4 className="_left_inner_area_suggest_content_title _title5">
              Suggested People
            </h4>
            <span className="_left_inner_area_suggest_content_txt">
              <a
                className="_left_inner_area_suggest_content_txt_link"
                href="#0"
              >
                See All
              </a>
            </span>
          </div>

          {suggestedPeople.map((person, idx) => (
            <div className="_left_inner_area_suggest_info" key={idx}>
              <div className="_left_inner_area_suggest_info_box">
                <div className="_left_inner_area_suggest_info_image">
                  <a href={person.link}>
                    <img
                      src={person.img}
                      alt={person.name}
                      className={idx === 0 ? "_info_img" : "_info_img1"}
                    />
                  </a>
                </div>
                <div className="_left_inner_area_suggest_info_txt">
                  <a href={person.link}>
                    <h4 className="_left_inner_area_suggest_info_title">
                      {person.name}
                    </h4>
                  </a>
                  <p className="_left_inner_area_suggest_info_para">
                    {person.role}
                  </p>
                </div>
              </div>
              <div className="_left_inner_area_suggest_info_link">
                <a href="#0" className="_info_link">
                  Connect
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_event_content">
            <h4 className="_left_inner_event_title _title5">Events</h4>
            <a href="event.html" className="_left_inner_event_link">
              See all
            </a>
          </div>

          {events.map((event, idx) => (
            <div
              className="_left_inner_event_card_link"
              key={idx}
              style={{ cursor: 'pointer', display: 'block' }}
            >
              <div className="_left_inner_event_card">
                <a href="event-single.html" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="_left_inner_event_card_iamge">
                    <img
                        src={event.img}
                        alt={event.title}
                        className="_card_img"
                    />
                    </div>
                    <div className="_left_inner_event_card_content">
                    <div className="_left_inner_card_date">
                        <p className="_left_inner_card_date_para">{event.date}</p>
                        <p className="_left_inner_card_date_para1">{event.month}</p>
                    </div>
                    <div className="_left_inner_card_txt">
                        <h4 className="_left_inner_event_card_title">
                        {event.title}
                        </h4>
                    </div>
                    </div>
                </a>
                <hr className="_underline" />
                <div className="_left_inner_event_bottom">
                  <p className="_left_iner_event_bottom">{event.going}</p>
                  <a href="#0" className="_left_iner_event_bottom_link">
                    Going
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;