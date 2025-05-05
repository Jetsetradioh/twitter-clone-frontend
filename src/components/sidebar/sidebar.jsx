import React from "react";
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-search">
                <input
                    type="text"
                    placeholder="Search"
                    className="sidebar-search-input"
                />
            </div>

            <div className="sidebar-sidebar">
                <h3 className="sidebar-title">Trends for you</h3>

                <div className="sidebar-trend">
                    <p className="sidebar-meta">Trending in Sweden <span className="sidebar-dots">⋯</span></p>
                    <p className="sidebar-topic">Samt</p>
                    <p className="sidebar-tweets">2,840 Tweets</p>
                </div>

                <div className="sidebar-trend">
                    <p className="sidebar-meta">Politics · Trending <span className="sidebar-dots">⋯</span></p>
                    <p className="sidebar-topic">China</p>
                    <p className="sidebar-tweets">572K Tweets</p>
                </div>

                <div className="sidebar-trend">
                    <p className="sidebar-meta">Trending in Sweden <span className="sidebar-dots">⋯</span></p>
                    <p className="sidebar-topic">Israel</p>
                    <p className="sidebar-tweets">10.2K Tweets</p>
                </div>

                <div className="sidebar-trend">
                    <p className="sidebar-meta">Trending in Sweden <span className="sidebar-dots">⋯</span></p>
                    <p className="sidebar-topic">#babygirl</p>
                </div>

                <div className="sidebar-trend">
                    <p className="sidebar-meta">Trending in Sweden <span className="sidebar-dots">⋯</span></p>
                    <p className="sidebar-topic">Newroz</p>
                    <p className="sidebar-tweets">60.4K Tweets</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
