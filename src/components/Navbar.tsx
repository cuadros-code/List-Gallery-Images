
interface NavbarProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar = ({ handleSearch }: NavbarProps) => {
  return (
    <div className="bg-white shadow-sm ">
      <div className="flex justify-between items-center py-9 max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="text-xl font-bold">
            Gallery
          </div>
        </div>
        <div className="flex items-center">
          <input
            onChange={handleSearch}
            type="text" 
            className="bg-gray-100 w-60 px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700 " 
            placeholder="You're looking for something?" 
          />
        </div>
      </div>
    </div>
  )
}