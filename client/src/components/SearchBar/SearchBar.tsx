import React from 'react'
import { Search, Filters, Sorter } from "../../components/Filters/index";

const SearchBar: React.FC = () => {
  return (
    <nav className='bg-gray-800 py-4 relative border-t border-gray-400 w-full'>
            <div className='containter flex px-8 mx-6'>
                <div className='flex items-center'>
                    <Search/>
                </div>
                <div className='flex items-center ml-auto'>
                    <Sorter/>
                    <Filters/>
                </div>
            </div>
    </nav>
  )
}

export default SearchBar;