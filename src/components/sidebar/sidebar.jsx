import React from "react";
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h3 className="title">Trends for you</h3>

            <div className="trend">
                <p className="meta">Trending in Sweden <span className="dots">⋯</span></p>
                <p className="topic">Samt</p>
                <p className="tweets">2,840 Tweets</p>
            </div>

            <div className="trend">
                <p className="meta">Politics · Trending <span className="dots">⋯</span></p>
                <p className="topic">China</p>
                <p className="tweets">572K Tweets</p>
            </div>

            <div className="trend">
                <p className="meta">Trending in Sweden <span className="dots">⋯</span></p>
                <p className="topic">Israel</p>
                <p className="tweets">10.2K Tweets</p>
            </div>

            <div className="trend">
                <p className="meta">Trending in Sweden <span className="dots">⋯</span></p>
                <p className="topic">#babygirl</p>
            </div>

            <div className="trend">
                <p className="meta">Trending in Sweden <span className="dots">⋯</span></p>
                <p className="topic">Newroz</p>
                <p className="tweets">60.4K Tweets</p>
            </div>
        </div>
    );
};

export default Sidebar;
