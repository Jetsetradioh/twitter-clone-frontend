import React, {useState} from "react";
import './sidebar.css';

const Sidebar = () =>{
    return(
        <div id="side">
            <h3>Trends for you</h3>
            <p><small>Trending in sweden <span class="dots">⋯</span></small></p>
            <p>Samt</p>
            <p><small>2,840 Tweets</small></p>
            <br/>
            <p><small>politics-Trending <span class="dots">⋯</span></small></p>
            <p>China</p>
            <p><small>572k Tweets</small></p>
            <br/>
            <p><small>Trending in sweden <span class="dots">⋯</span></small></p>
            <p>Israel</p>
            <p><small>10,2k Tweets</small></p>
            <br/>
            <p><small>Trending in sweden <span class="dots">⋯</span></small></p>
            <p>#babygirl</p>
            <br/>
            <p><small>Trending in sweden <span class="dots">⋯</span></small></p>
            <p>Newroz</p>
            <p><small>60,4k Tweets</small></p>
        </div>
    )
}
export default Sidebar;