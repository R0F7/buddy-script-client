import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import Stories from "../Stories/Stories";
import CreatePost from "../CreatePost/CreatePost";
import TimelinePost from "../TimelinePost/TimelinePost";
import RightSidebar from "../RightSidebar/RightSidebar";
import {
  friendReq,
  profile1,
  people1,
  people2,
  people3,
  feedEvent1,
} from "../../assets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

// Mock Data
const notificationsData = [
  {
    id: 1,
    name: "Steve Jobs",
    action: "posted a link in your timeline.",
    time: "42 minutes ago",
    img: friendReq,
  },
  {
    id: 2,
    name: "Admin",
    action: "changed the name of the group...",
    time: "42 minutes ago",
    img: profile1,
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
    img: people1,
    link: "profile.html",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: people2,
    link: "profile.html",
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    img: people3,
    link: "profile.html",
  },
];

const events = [
  {
    date: "10",
    month: "Jul",
    title: "No terrorism no cry",
    going: "17 People Going",
    img: feedEvent1,
  },
];

const friendsList = [
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: people1,
    status: "inactive",
    time: "5 minute ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: people2,
    status: "active",
  },
  { name: "Dylan Field", role: "CEO of Figma", img: people3, status: "active" },
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: people1,
    status: "inactive",
    time: "5 minute ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: people2,
    status: "active",
  },
  { name: "Dylan Field", role: "CEO of Figma", img: people3, status: "active" },
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    img: people1,
    status: "inactive",
    time: "5 minute ago",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    img: people2,
    status: "active",
  },
  { name: "Dylan Field", role: "CEO of Figma", img: people3, status: "active" },
];

const Feed = () => {
  const { user } = useAuth();
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTimelineDropdown, setActiveTimelineDropdown] = useState(null);
  const [postText, setPostText] = useState("");

  const notifyRef = useRef(null);
  const profileRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts", user?.uid],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await axiosSecure.get(
          `/posts?page=${pageParam}&size=5`,
        );
        return res.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 5) {
          return allPages.length;
        }

        return undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target))
        setIsNotifyOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setIsProfileOpen(false);
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
                <LeftSidebar
                  exploreItems={exploreItems}
                  suggestedPeople={suggestedPeople}
                  events={events}
                />
              </div>

              {/* Middle Feed */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <Stories />
                  <CreatePost postText={postText} setPostText={setPostText} />

                  {status === "loading" ? (
                    <p className="text-center mt-4">Loading posts...</p>
                  ) : (
                    <>
                      {data?.pages.map((page, i) => (
                        <React.Fragment key={i}>
                          {page.map((post) => (
                            <TimelinePost
                              key={post._id}
                              post={post}
                              isActive={activeTimelineDropdown === post._id}
                              onToggleDropdown={toggleTimelineDropdown}
                            />
                          ))}
                        </React.Fragment>
                      ))}

                      <div
                        ref={ref}
                        className="text-center py-4"
                        style={{ minHeight: "100px" }}
                      >
                        {isFetchingNextPage ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : hasNextPage ? (
                          <span className="text-muted">
                            Loading more posts...
                          </span>
                        ) : (
                          <p className="text-muted">No more posts available.</p>
                        )}
                      </div>
                    </>
                  )}
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
