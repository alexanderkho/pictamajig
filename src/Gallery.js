import React from 'react';
import axios from 'axios';

const Gallery = ({ pictures }) => {
    const likeImage = async (id) => {
        try {
            await axios.put(`/${id}`);

        } catch (e) {
            console.log(e);
        }
    }
    return(
        <div className="gallery">
            {pictures.map(picture => {
                return (
                    <div key={picture._id}>
                        <img src={picture.path}/>
                        <div>Posted by {picture.username}</div>
                        <div>{picture.likes} people liked this</div>
                        <button onClick={() => likeImage(picture._id)}>Like</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery;