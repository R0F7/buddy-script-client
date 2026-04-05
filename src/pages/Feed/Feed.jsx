import React, { useState, useRef, useEffect } from "react";
// Note: Bootstrap CSS and custom CSS are assumed to be imported globally in your project's root (e.g., index.js or App.js)
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/common.css';
// import './assets/css/main.css';
// import './assets/css/responsive.css';

// Helper component for SVG icons to keep JSX clean
const Icon = ({ name, ...props }) => {
  const icons = {
    moon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="16"
        fill="none"
        viewBox="0 0 11 16"
      >
        <path
          fill="#fff"
          d="M2.727 14.977l.04-.498-.04.498zm-1.72-.49l.489-.11-.489.11zM3.232 1.212L3.514.8l-.282.413zM9.792 8a6.5 6.5 0 00-6.5-6.5v-1a7.5 7.5 0 017.5 7.5h-1zm-6.5 6.5a6.5 6.5 0 006.5-6.5h1a7.5 7.5 0 01-7.5 7.5v-1zm-.525-.02c.173.013.348.02.525.02v1c-.204 0-.405-.008-.605-.024l.08-.997zm-.261-1.83A6.498 6.498 0 005.792 7h1a7.498 7.498 0 01-3.791 6.52l-.495-.87zM5.792 7a6.493 6.493 0 00-2.841-5.374L3.514.8A7.493 7.493 0 016.792 7h-1zm-3.105 8.476c-.528-.042-.985-.077-1.314-.155-.316-.075-.746-.242-.854-.726l.977-.217c-.028-.124-.145-.09.106-.03.237.056.6.086 1.165.131l-.08.997zm.314-1.956c-.622.354-1.045.596-1.31.792a.967.967 0 00-.204.185c-.01.013.027-.038.009-.12l-.977.218a.836.836 0 01.144-.666c.112-.162.27-.3.433-.42.324-.24.814-.519 1.41-.858L3 13.52zM3.292 1.5a.391.391 0 00.374-.285A.382.382 0 003.514.8l-.563.826A.618.618 0 012.702.95a.609.609 0 01.59-.45v1z"
        />
      </svg>
    ),
    sun: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="4.389"
          stroke="#fff"
          transform="rotate(-90 12 12)"
        />
        <path
          stroke="#fff"
          stroke-linecap="round"
          d="M3.444 12H1M23 12h-2.444M5.95 5.95L4.222 4.22M19.778 19.779L18.05 18.05M12 3.444V1M12 23v-2.445M18.05 5.95l1.728-1.729M4.222 19.779L5.95 18.05"
        />
      </svg>
    ),
    search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        fill="none"
        viewBox="0 0 17 17"
      >
        <circle cx="7" cy="7" r="6" stroke="#666" />
        <path stroke="#666" stroke-linecap="round" d="M16 16l-3-3" />
      </svg>
    ),
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="21"
        fill="none"
        viewBox="0 0 18 21"
      >
        <path
          className="_home_active"
          stroke="#000"
          strokeWidth="1.5"
          strokeOpacity=".6"
          d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z"
        />
        <path
          className="_home_active"
          stroke="#000"
          strokeOpacity=".6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857"
        />
      </svg>
    ),
    friends: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="20"
        fill="none"
        viewBox="0 0 26 20"
      >
        <path
          fill="#000"
          fillOpacity=".6"
          fillRule="evenodd"
          d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75zm7.27-.607a4.222 4.222 0 013.566 4.172c-.004 2.094-1.58 3.89-3.665 4.181a.88.88 0 01-.994-.745.875.875 0 01.75-.989 2.494 2.494 0 002.147-2.45 2.473 2.473 0 00-2.09-2.443.876.876 0 01-.726-1.005.881.881 0 011.013-.721zm-13.528.72a.876.876 0 01-.726 1.006 2.474 2.474 0 00-2.09 2.446A2.493 2.493 0 005.86 7.762a.875.875 0 11-.243 1.734c-2.085-.29-3.66-2.087-3.664-4.179 0-2.082 1.5-3.837 3.566-4.174a.876.876 0 011.012.72z"
          clipRule="evenodd"
        />
      </svg>
    ),
    notify: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="22"
        fill="none"
        viewBox="0 0 20 22"
      >
        <path
          fill="#000"
          fillOpacity=".6"
          fillRule="evenodd"
          d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
          clipRule="evenodd"
        />
      </svg>
    ),
    chat: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="22"
        fill="none"
        viewBox="0 0 23 22"
      >
        <path
          fill="#000"
          fillOpacity=".6"
          fillRule="evenodd"
          d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0111.43 0zm0 1.535A9.5 9.5 0 004.69 4.307a9.463 9.463 0 00-1.91 10.686c.241.592.474 1.17.474 1.77 0 .598-.207 1.201-.39 1.733-.15.439-.378 1.1-.231 1.245.143.147.813-.085 1.255-.235.53-.18 1.133-.387 1.73-.391.597 0 1.161.225 1.758.463 3.655 1.679 7.98.915 10.796-1.881 3.716-3.693 3.716-9.7 0-13.391a9.5 9.5 0 00-6.74-2.77zm4.068 8.867c.57 0 1.03.458 1.03 1.024 0 .566-.46 1.023-1.03 1.023a1.023 1.023 0 11-.01-2.047h.01zm-4.131 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.03 1.03 0 01-1.035-1.024c0-.566.455-1.023 1.025-1.023h.01zm-4.132 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.022 1.022 0 11-.01-2.047h.01z"
          clipRule="evenodd"
        />
      </svg>
    ),
    dots: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="17"
        fill="none"
        viewBox="0 0 4 17"
      >
        <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
        <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
        <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="8"
        fill="none"
        viewBox="0 0 9 8"
      >
        <path
          fill="#fff"
          d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z"
        />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="none"
        viewBox="0 0 10 10"
      >
        <path
          stroke="#fff"
          stroke-linecap="round"
          d="M.5 4.884h9M4.884 9.5v-9"
        />
      </svg>
    ),
    // Add other icons as needed... keeping it concise
  };
  return icons[name] || null;
};

// Mock Data
const notificationsData = [
  {
    id: 1,
    name: "Steve Jobs",
    action: "posted a link in your timeline.",
    time: "42 minutes ago",
    img: "assets/images/friend-req.png",
  },
  {
    id: 2,
    name: "Admin",
    action: "changed the name of the group Freelacer usa to Freelacer usa",
    time: "42 minutes ago",
    img: "assets/images/profile-1.png",
  },
  {
    id: 3,
    name: "Steve Jobs",
    action: "posted a link in your timeline.",
    time: "42 minutes ago",
    img: "assets/images/friend-req.png",
  },
  {
    id: 4,
    name: "Admin",
    action: "changed the name of the group Freelacer usa to Freelacer usa",
    time: "42 minutes ago",
    img: "assets/images/profile-1.png",
  },
];

const exploreItems = [
  { name: "Learning", icon: "learning", isNew: true, link: "#0" },
  { name: "Insights", icon: "insights", isNew: false, link: "#0" },
  {
    name: "Find friends",
    icon: "find-friends",
    isNew: false,
    link: "find-friends.html",
  },
  { name: "Bookmarks", icon: "bookmarks", isNew: false, link: "#0" },
  { name: "Group", icon: "group", isNew: false, link: "group.html" },
  { name: "Gaming", icon: "gaming", isNew: true, link: "#0" },
  { name: "Settings", icon: "settings", isNew: false, link: "#0" },
  { name: "Save post", icon: "save-post", isNew: false, link: "#0" },
];

const suggestedPeople = [
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "assets/images/people1.png",
    link: "profile.html",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: "assets/images/people2.png",
    link: "profile.html",
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "assets/images/people3.png",
    link: "profile.html",
  },
];

const events = [
  {
    date: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    going: "17 People Going",
    img: "assets/images/feed_event1.png",
  },
  {
    date: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    going: "17 People Going",
    img: "assets/images/feed_event1.png",
  },
];

const timelinePosts = [
  {
    id: 1,
    name: "Karim Saif",
    time: "5 minute ago",
    privacy: "Public",
    title: "-Healthy Tracking App",
    img: "assets/images/timeline_img.png",
    likes: 9,
    comments: 12,
    shares: 122,
    reacted: true,
  },
  {
    id: 2,
    name: "Karim Saif",
    time: "5 minute ago",
    privacy: "Public",
    title: "-Healthy Tracking App",
    img: "assets/images/timeline_img.png",
    likes: 9,
    comments: 12,
    shares: 122,
    reacted: false,
  },
];

const friendsList = [
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "assets/images/people1.png",
    status: "inactive",
    time: "5 minute ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: "assets/images/people2.png",
    status: "active",
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "assets/images/people3.png",
    status: "active",
  },
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: "assets/images/people1.png",
    status: "inactive",
    time: "5 minute ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: "assets/images/people2.png",
    status: "active",
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: "assets/images/people3.png",
    status: "active",
  },
];

const Feed = () => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTimelineDropdown, setActiveTimelineDropdown] = useState(null);
  const [postText, setPostText] = useState("");
  const notifyRef = useRef(null);
  const profileRef = useRef(null);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setIsNotifyOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotify = () => setIsNotifyOpen(!isNotifyOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleTimelineDropdown = (id) => {
    setActiveTimelineDropdown(activeTimelineDropdown === id ? null : id);
  };

  return (
    <div className="_layout _layout_main_wrapper">
      {/* Mode Switching Button */}
      <div className="_layout_mode_swithing_btn">
        <button type="button" className="_layout_swithing_btn_link">
          <div className="_layout_swithing_btn">
            <div className="_layout_swithing_btn_round"></div>
          </div>
          <div className="_layout_change_btn_ic1">
            <Icon name="moon" />
          </div>
          <div className="_layout_change_btn_ic2">
            <Icon name="sun" />
          </div>
        </button>
      </div>

      <div className="_main_layout">
        {/* Desktop Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
          <div className="container _custom_container">
            <div className="_logo_wrap">
              <a className="navbar-brand" href="feed.html">
                <img
                  src="assets/images/logo.svg"
                  alt="Image"
                  className="_nav_logo"
                />
              </a>
            </div>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="_header_form ms-auto">
                <form className="_header_form_grp">
                  <Icon name="search" />
                  <input
                    className="form-control me-2 _inpt1"
                    type="search"
                    placeholder="input search text"
                    aria-label="Search"
                  />
                </form>
              </div>
              <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
                <li className="nav-item _header_nav_item">
                  <a
                    className="nav-link _header_nav_link_active _header_nav_link"
                    aria-current="page"
                    href="feed.html"
                  >
                    <Icon name="home" />
                  </a>
                </li>
                <li className="nav-item _header_nav_item">
                  <a
                    className="nav-link _header_nav_link"
                    href="friend-request.html"
                  >
                    <Icon name="friends" />
                  </a>
                </li>
                <li className="nav-item _header_nav_item" ref={notifyRef}>
                  <span
                    id="_notify_btn"
                    className="nav-link _header_nav_link _header_notify_btn"
                    onClick={toggleNotify}
                  >
                    <Icon name="notify" />
                    <span className="_counting">6</span>
                    {isNotifyOpen && (
                      <div
                        id="_notify_drop"
                        className="_notification_dropdown show"
                      >
                        <div className="_notifications_content">
                          <h4 className="_notifications_content_title">
                            Notifications
                          </h4>
                          <div className="_notification_box_right">
                            <button
                              type="button"
                              className="_notification_box_right_link"
                            >
                              <Icon name="dots" />
                            </button>
                            <div className="_notifications_drop_right">
                              <ul className="_notification_list">
                                <li>
                                  <span className="_notification_link">
                                    Mark as all read
                                  </span>
                                </li>
                                <li>
                                  <span className="_notification_link">
                                    Notifications settings
                                  </span>
                                </li>
                                <li>
                                  <span className="_notification_link">
                                    Open Notifications
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="_notifications_drop_box">
                          <div className="_notifications_drop_btn_grp">
                            <button className="_notifications_btn_link">
                              All
                            </button>
                            <button className="_notifications_btn_link1">
                              Unread
                            </button>
                          </div>
                          <div className="_notifications_all">
                            {notificationsData.map((notif) => (
                              <div className="_notification_box" key={notif.id}>
                                <div className="_notification_image">
                                  <img
                                    src={notif.img}
                                    alt="Image"
                                    className="_notify_img"
                                  />
                                </div>
                                <div className="_notification_txt">
                                  <p className="_notification_para">
                                    <span className="_notify_txt_link">
                                      {notif.name}
                                    </span>{" "}
                                    {notif.action}
                                  </p>
                                  <div className="_nitification_time">
                                    <span>{notif.time}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </span>
                </li>
                <li className="nav-item _header_nav_item">
                  <a className="nav-link _header_nav_link" href="chat.html">
                    <Icon name="chat" />
                    <span className="_counting">2</span>
                  </a>
                </li>
              </ul>
              <div className="_header_nav_profile" ref={profileRef}>
                <div className="_header_nav_profile_image">
                  <img
                    src="assets/images/profile.png"
                    alt="Image"
                    className="_nav_profile_img"
                  />
                </div>
                <div className="_header_nav_dropdown">
                  <p className="_header_nav_para">Dylan Field</p>
                  <button
                    id="_profile_drop_show_btn"
                    className="_header_nav_dropdown_btn _dropdown_toggle"
                    type="button"
                    onClick={toggleProfile}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        fill="#112032"
                        d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
                      />
                    </svg>
                  </button>
                </div>
                {isProfileOpen && (
                  <div
                    id="_prfoile_drop"
                    className="_nav_profile_dropdown _profile_dropdown show"
                  >
                    <div className="_nav_profile_dropdown_info">
                      <div className="_nav_profile_dropdown_image">
                        <img
                          src="assets/images/profile.png"
                          alt="Image"
                          className="_nav_drop_img"
                        />
                      </div>
                      <div className="_nav_profile_dropdown_info_txt">
                        <h4 className="_nav_dropdown_title">Dylan Field</h4>
                        <a href="profile.html" className="_nav_drop_profile">
                          View Profile
                        </a>
                      </div>
                    </div>
                    <hr />
                    <ul className="_nav_dropdown_list">
                      <li>
                        <a href="#0" className="_nav_dropdown_link">
                          <div className="_nav_drop_info">
                            <span>⚙️</span>Settings
                          </div>
                          <button className="_nav_drop_btn_link">→</button>
                        </a>
                      </li>
                      <li>
                        <a href="#0" className="_nav_dropdown_link">
                          <div className="_nav_drop_info">
                            <span>❓</span>Help & Support
                          </div>
                          <button className="_nav_drop_btn_link">→</button>
                        </a>
                      </li>
                      <li>
                        <a href="#0" className="_nav_dropdown_link">
                          <div className="_nav_drop_info">
                            <span>🚪</span>Log Out
                          </div>
                          <button className="_nav_drop_btn_link">→</button>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <div className="_mobile_navigation_bottom_wrapper">
          <ul className="_mobile_navigation_bottom_list">
            <li>
              <a
                href="feed.html"
                className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active"
              >
                <Icon name="home" />
              </a>
            </li>
            <li>
              <a
                href="friend-request.html"
                className="_mobile_navigation_bottom_link"
              >
                <Icon name="friends" />
              </a>
            </li>
            <li>
              <a href="#" className="_mobile_navigation_bottom_link">
                <Icon name="notify" />
                <span className="_counting">6</span>
              </a>
            </li>
            <li>
              <a
                href="chat_list(for_mbl).html"
                className="_mobile_navigation_bottom_link"
              >
                <Icon name="chat" />
                <span className="_counting">2</span>
              </a>
            </li>
            <div className="_header_mobile_toggle">
              <button className="_header_mobile_btn_link">☰</button>
            </div>
          </ul>
        </div>

        {/* Main Layout */}
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
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
                          <a
                            href={item.link}
                            className="_left_inner_area_explore_link"
                          >
                            <span>🔹</span> {item.name}
                          </a>
                          {item.isNew && (
                            <span className="_left_inner_area_explore_link_txt">
                              New
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested People */}
                  <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_left_inner_area_suggest_content _mar_b24">
                      <h4 className="_title5">Suggested People</h4>
                      <span>
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
                                alt="Image"
                                className="_info_img"
                              />
                            </a>
                          </div>
                          <div className="_left_inner_area_suggest_info_txt">
                            <a href={person.link}>
                              <h4>{person.name}</h4>
                            </a>
                            <p>{person.role}</p>
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

                  {/* Events */}
                  <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_left_inner_event_content">
                      <h4 className="_title5">Events</h4>
                      <a href="event.html" className="_left_inner_event_link">
                        See all
                      </a>
                    </div>
                    {events.map((event, idx) => (
                      <a
                        className="_left_inner_event_card_link"
                        href="event-single.html"
                        key={idx}
                      >
                        <div className="_left_inner_event_card">
                          <div className="_left_inner_event_card_iamge">
                            <img
                              src={event.img}
                              alt="Image"
                              className="_card_img"
                            />
                          </div>
                          <div className="_left_inner_event_card_content">
                            <div className="_left_inner_card_date">
                              <p>{event.date}</p>
                              <p>{event.month}</p>
                            </div>
                            <div className="_left_inner_card_txt">
                              <h4>{event.title}</h4>
                            </div>
                          </div>
                          <hr className="_underline" />
                          <div className="_left_inner_event_bottom">
                            <p>{event.going}</p>
                            <a
                              href="#0"
                              className="_left_iner_event_bottom_link"
                            >
                              Going
                            </a>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Feed */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  {/* Stories */}
                  <div className="_feed_inner_ppl_card _mar_b16">
                    <div className="_feed_inner_story_arrow">
                      <button className="_feed_inner_story_arrow_btn">
                        <Icon name="arrow-right" />
                      </button>
                    </div>
                    <div className="row">
                      {[
                        "Your Story",
                        "Ryan Roslansky",
                        "Ryan Roslansky",
                        "Ryan Roslansky",
                      ].map((story, idx) => (
                        <div
                          className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col"
                          key={idx}
                        >
                          <div
                            className={`_b_radious6 ${idx === 0 ? "_feed_inner_profile_story" : "_feed_inner_public_story"}`}
                          >
                            <div
                              className={
                                idx === 0
                                  ? "_feed_inner_profile_story_image"
                                  : "_feed_inner_public_story_image"
                              }
                            >
                              <img
                                src={`assets/images/card_ppl${idx + 1}.png`}
                                alt="Image"
                                className={
                                  idx === 0
                                    ? "_profile_story_img"
                                    : "_public_story_img"
                                }
                              />
                              {idx === 0 ? (
                                <div className="_feed_inner_story_txt">
                                  <button className="_feed_inner_story_btn_link">
                                    <Icon name="plus" />
                                  </button>
                                  <p>Your Story</p>
                                </div>
                              ) : (
                                <>
                                  <div className="_feed_inner_pulic_story_txt">
                                    <p>{story}</p>
                                  </div>
                                  <div className="_feed_inner_public_mini">
                                    <img
                                      src="assets/images/mini_pic.png"
                                      alt="Image"
                                      className="_public_mini_img"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Create Post */}
                  <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                    <div className="_feed_inner_text_area_box">
                      <div className="_feed_inner_text_area_box_image">
                        <img
                          src="assets/images/txt_img.png"
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
                        <label
                          className="_feed_textarea_label"
                          htmlFor="floatingTextarea"
                        >
                          Write something ... ✏️
                        </label>
                      </div>
                    </div>
                    <div className="_feed_inner_text_area_bottom">
                      <div className="_feed_inner_text_area_item">
                        {["Photo", "Video", "Event", "Article"].map(
                          (item, idx) => (
                            <div key={idx} className="_feed_common">
                              <button className="_feed_inner_text_area_bottom_photo_link">
                                <span className="_mar_img">📷</span> {item}
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="_feed_inner_text_area_btn">
                        <button className="_feed_inner_text_area_btn_link">
                          ✈️ <span>Post</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Posts */}
                  {timelinePosts.map((post) => (
                    <div
                      key={post.id}
                      className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16"
                    >
                      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                        <div className="_feed_inner_timeline_post_top">
                          <div className="_feed_inner_timeline_post_box">
                            <div className="_feed_inner_timeline_post_box_image">
                              <img
                                src="assets/images/post_img.png"
                                alt=""
                                className="_post_img"
                              />
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
                                onClick={() => toggleTimelineDropdown(post.id)}
                              >
                                <Icon name="dots" />
                              </button>
                            </div>
                            {activeTimelineDropdown === post.id && (
                              <div className="_feed_timeline_dropdown show">
                                <ul className="_feed_timeline_dropdown_list">
                                  <li>
                                    <a
                                      href="#0"
                                      className="_feed_timeline_dropdown_link"
                                    >
                                      <span>📌</span> Save Post
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#0"
                                      className="_feed_timeline_dropdown_link"
                                    >
                                      <span>🔔</span> Turn On Notification
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#0"
                                      className="_feed_timeline_dropdown_link"
                                    >
                                      <span>🙈</span> Hide
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#0"
                                      className="_feed_timeline_dropdown_link"
                                    >
                                      <span>✏️</span> Edit Post
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#0"
                                      className="_feed_timeline_dropdown_link"
                                    >
                                      <span>🗑️</span> Delete Post
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <h4 className="_feed_inner_timeline_post_title">
                          {post.title}
                        </h4>
                        <div className="_feed_inner_timeline_image">
                          <img src={post.img} alt="" className="_time_img" />
                        </div>
                      </div>
                      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                        <div className="_feed_inner_timeline_total_reacts_image">
                          <span>👍❤️😮</span>
                          <p className="_feed_inner_timeline_total_reacts_para">
                            {post.likes}+
                          </p>
                        </div>
                        <div className="_feed_inner_timeline_total_reacts_txt">
                          <p>
                            <span>{post.comments}</span> Comment
                          </p>
                          <p>
                            <span>{post.shares}</span> Share
                          </p>
                        </div>
                      </div>
                      <div className="_feed_inner_timeline_reaction">
                        <button
                          className={`_feed_reaction ${post.reacted ? "_feed_reaction_active" : ""}`}
                        >
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
                                <img
                                  src="assets/images/comment_img.png"
                                  alt=""
                                  className="_comment_img"
                                />
                              </div>
                              <div className="_feed_inner_comment_box_content_txt">
                                <textarea
                                  className="form-control _comment_textarea"
                                  placeholder="Write a comment"
                                ></textarea>
                              </div>
                            </div>
                            <div className="_feed_inner_comment_box_icon">
                              <button className="_feed_inner_comment_box_icon_btn">
                                📎
                              </button>
                              <button className="_feed_inner_comment_box_icon_btn">
                                🖼️
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_right_sidebar_wrap">
                  <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_right_inner_area_info_content _mar_b24">
                      <h4 className="_title5">You Might Like</h4>
                      <span>
                        <a href="#0">See All</a>
                      </span>
                    </div>
                    <hr className="_underline" />
                    <div className="_right_inner_area_info_ppl">
                      <div className="_right_inner_area_info_box">
                        <div className="_right_inner_area_info_box_image">
                          <a href="profile.html">
                            <img
                              src="assets/images/Avatar.png"
                              alt="Image"
                              className="_ppl_img"
                            />
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
                        <button className="_right_info_btn_link_active">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                    <div className="_feed_top_fixed">
                      <div className="_feed_right_inner_area_card_content _mar_b24">
                        <h4 className="_title5">Your Friends</h4>
                        <span>
                          <a href="find-friends.html">See All</a>
                        </span>
                      </div>
                      <form className="_feed_right_inner_area_card_form">
                        <Icon name="search" />
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="input search text"
                        />
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
                                <img
                                  src={friend.img}
                                  alt=""
                                  className="_box_ppl_img"
                                />
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
                            {friend.status === "active" ? (
                              <span>🟢</span>
                            ) : (
                              <span>{friend.time}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
