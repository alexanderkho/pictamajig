import React from 'react';
import axios from 'axios';
import './App.css';

const Gallery = ({ pictures }) => {
    const likeImage = async (id) => {
        try {
            await axios.put(`/${id}`);

        } catch (e) {
            console.log(e);
        }
    }
    return(
        <div className="row">
            {pictures.map(picture => {
                return (
                    <div className="col-md-4 pic-container" key={picture._id}>
                        <div className="thumbnail">
                            <a href={picture.path} target="_blank">
                                <img src={picture.path} alt={picture._id}></img>
                                <div className="caption">
                                    <p>Posted by {picture.username}</p>
                                    <p>{picture.likes} people liked this.</p>
                                </div>
                            </a>
                            <button onClick={() => likeImage(picture._id)}>Like</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery;