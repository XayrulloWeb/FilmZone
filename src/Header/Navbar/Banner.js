import React from 'react';

function Banner(props) {
    return (
        <div className='banner'>
            <div className="container">
                <div className="banner_start">
                    <div className="banner_info">
                        <div className="genre">
                            <span>Series</span>
                        </div>
                        <h1>The Last Of Us Season 1</h1>
                        <p>9 Episodes • 2022 • Fantasy • Actions</p>
                        <div className="banner_btns">
                            <div className="btn_watch">
                                <button className="btn-main"><i className="fa-solid fa-circle-play"></i>
                                    Continue Watching
                                </button>
                                <button className='btn-watchlist'><i className="fa-regular fa-bookmark"></i> Add
                                    Watchlist
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="banner_links">
                        <div className="banner_links-btns">
                            <button><i className="fa-solid fa-download"></i> Download</button>
                            <button><i className="fa-solid fa-share"></i> Share</button>
                            <button><i className="fa-regular fa-thumbs-up"></i> Like</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
