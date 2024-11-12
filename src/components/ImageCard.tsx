import { useState } from 'react';
import { LikeIcon } from './LikeIcon';
import { postLike } from '../services/post-like';

interface CardProps {
  id: number;
  imageUrl: string;
  title: string;
  author: string;
  liked: boolean;
  likesCountNumber: number;
}

export const ImageCard = ({ id, imageUrl, title, author, liked, likesCountNumber }: CardProps) => {

  const [isliked, setLiked] = useState(liked)
  const [likesCount, setLikesCount] = useState(likesCountNumber)

  const handleLike = async (liked: boolean) => {
    try {
      const response = await postLike(id)
      if (response?.status === 204) {
        setLiked(!isliked)
        setLikesCount(liked ? likesCount + 1 : likesCount - 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-sm overflow-hidden shadow-sm bg-white" onDoubleClick={() => handleLike(!isliked)} >
      <div className='relative'>
        <img className="w-full sm:h-64 h-22 object-cover" src={imageUrl} alt={title} />
        <div className='absolute top-2 right-2 cursor-pointer' >
          <LikeIcon
            role='button'
            className='select-none'
            onClick={() => handleLike(!isliked)} 
            fill={isliked ? '#83f3c6' : 'white'} 
            />
          <p
            id="likesCount"
            className='text-sm text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]'
          >
            {likesCount}
          </p>
        </div>
        
      </div>
      <div className="py-4">
        <div className="font-light text-xl">{title}</div>
        <div className="text-sm">by {author}</div>        
      </div>
    </div>
  )
}
