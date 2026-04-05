import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import Stories from '../Stories/Stories';
import CreatePost from '../CreatePost/CreatePost';
import TimelinePost from '../TimelinePost/TimelinePost';
import RightSidebar from '../RightSidebar/RightSidebar';
import { friendReq, profile1, people1, people2, people3, feedEvent1, timelineImg } from '../../assets';

// Mock Data
const notificationsData = [
  { id: 1, name: "Steve Jobs", action: "posted a link in your timeline.", time: "42 minutes ago", img: friendReq },
  { id: 2, name: "Admin", action: "changed the name of the group Freelacer usa to Freelacer usa", time: "42 minutes ago", img: profile1 },
  { id: 3, name: "Steve Jobs", action: "posted a link in your timeline.", time: "42 minutes ago", img: friendReq },
  { id: 4, name: "Admin", action: "changed the name of the group Freelacer usa to Freelacer usa", time: "42 minutes ago", img: profile1 },
];

const exploreItems = [
  { name: "Learning", icon: "learning", isNew: true, link: "#0" },
  { name: "Insights", icon: "insights", isNew: false, link: "#0" },
  { name: "Find friends", icon: "find-friends", isNew: false, link: "find-friends.html" },
  { name: "Bookmarks", icon: "bookmarks", isNew: false, link: "#0" },
  { name: "Group", icon: "group", isNew: false, link: "group.html" },
  { name: "Gaming", icon: "gaming", isNew: true, link: "#0" },
  { name: "Settings", icon: "settings", isNew: false, link: "#0" },
  { name: "Save post", icon: "save-post", isNew: false, link: "#0" },
];

const suggestedPeople = [
  { name: "Steve Jobs", role: "CEO of Apple", img: people1, link: "profile.html" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: people2, link: "profile.html" },
  { name: "Dylan Field", role: "CEO of Figma", img: people3, link: "profile.html" },
];

const events = [
  { date: "10", month: "Jul", title: "No more terrorism no more cry", going: "17 People Going", img: feedEvent1 },
  { date: "10", month: "Jul", title: "No more terrorism no more cry", going: "17 People Going", img: feedEvent1 },
];

const timelinePosts = [
  { id: 1, name: "Karim Saif", time: "5 minute ago", privacy: "Public", title: "-Healthy Tracking App", img: timelineImg, likes: 9, comments: 12, shares: 122, reacted: true },
  { id: 2, name: "Karim Saif", time: "5 minute ago", privacy: "Public", title: "-Healthy Tracking App", img: timelineImg, likes: 9, comments: 12, shares: 122, reacted: false },
];

const friendsList = [
  { name: "Steve Jobs", role: "CEO of Apple", img: people1, status: "inactive", time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: people2, status: "active" },
  { name: "Dylan Field", role: "CEO of Figma", img: people3, status: "active" },
  { name: "Steve Jobs", role: "CEO of Apple", img: people1, status: "inactive", time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: people2, status: "active" },
  { name: "Dylan Field", role: "CEO of Figma", img: people3, status: "active" },
];

const Feed = () => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTimelineDropdown, setActiveTimelineDropdown] = useState(null);
  const [postText, setPostText] = useState("");
  const notifyRef = useRef(null);
  const profileRef = useRef(null);

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

  const toggleTimelineDropdown = (id) => {
    setActiveTimelineDropdown(activeTimelineDropdown === id ? null : id);
  };

  return (
    <div className="_layout _layout_main_wrapper">
      <Navbar
        isNotifyOpen={isNotifyOpen}
        setIsNotifyOpen={setIsNotifyOpen}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        notifyRef={notifyRef}
        profileRef={profileRef}
        notificationsData={notificationsData}
      />

      <div className="_main_layout">
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar exploreItems={exploreItems} suggestedPeople={suggestedPeople} events={events} />
              </div>

              {/* Middle Feed */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <Stories />
                  <CreatePost postText={postText} setPostText={setPostText} />
                  {timelinePosts.map((post) => (
                    <TimelinePost
                      key={post.id}
                      post={post}
                      isActive={activeTimelineDropdown === post.id}
                      onToggleDropdown={toggleTimelineDropdown}
                    />
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar friendsList={friendsList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;