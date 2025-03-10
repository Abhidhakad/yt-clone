import React from 'react';
import { CiSearch } from "react-icons/ci";

const SearchSuggestions = ({searchSuggestions}) => {
  return (
    <div className='absolute top-11 w-[91%] rounded-xl shadow-xl border border-gray-400 border-t-0 mt-1 bg-stone-50 z-50 py-4 px-4'>
    <ul className='flex flex-col gap-1 overflow-y-auto scroll-smooth max-h-96'>
      {searchSuggestions.map((s, index) => (
        <li key={index} className='flex gap-3 items-center font-medium text-[17px] px-2 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-xl'>
          <span><CiSearch className='text-2xl' /></span> {s}
        </li>
      ))}
    </ul>
  </div>  
  )
}

export default SearchSuggestions;