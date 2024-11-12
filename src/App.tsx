import { useMemo, useState } from 'react'
import './App.css'
import { ImageCard } from './components/ImageCard'
import { Navbar } from './components/Navbar'
import { useInfiniteScroll } from './hooks/UseInfinityScroll'

export const App = () => {

  const { images, isLoading, bottomRef } = useInfiniteScroll()
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

 const filteredImages = useMemo(() => {
    if (!searchText) return images
    return images.filter((image) =>
      image.title.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [images, searchText])

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="p-4 sm:p-6 md:p-8 min-h-[calc(100vh-90rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {filteredImages.map((image) => (
              <ImageCard 
                key={image.unique_id}
                id={image.id}
                imageUrl={image.main_attachment.small} 
                title={image.title} 
                author={image.author}
                liked={image.liked}
                likesCountNumber={image.likes_count}
              />
            ))}
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
      <div ref={bottomRef} />
    </>
  )
}
