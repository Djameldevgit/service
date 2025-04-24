import React from "react";
import { useLocation } from "react-router-dom";

const CardBodyTitle = ({ post }) => {
    const location = useLocation();
    const isDetailPage = location.pathname === `/post/${post._id}`;

    return (
        <div className="cardtitle">
            <div className="card-header">
                {!isDetailPage && (
                    <div>
                        <div className="title-post">
                            <div className="title0">{post.subCategory}:</div>
                                   <div className="title0">{post.title}</div>
                                
                         
                        </div>

                    </div>
                )}


            </div>

            {!isDetailPage && (

                <div className="titlelocation">


                    <span> <i className="fas fa-map-marker-alt" ></i></span>
                    
                    <div className="title4">{post.commune},</div><div className="title4">{post.wilaya}</div>
                   </div>
            )}

        </div>
    );
};

export default CardBodyTitle;




