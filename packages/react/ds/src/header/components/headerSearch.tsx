import SearchIcon from '../../../assets/icons/searchIcon.js';

function HeaderSearch({ className }: { className?: string }) {
  return (
    <div
      id="SearchContainer"
      className={`gi-flex gi-h-0 gi-bg-gray-50 gi-overflow-hidden gi-px-4 xs:gi-px-8 ${className}`}
    >
      <div className="sm:gi-w-3/6 gi-w-full gi-flex gi-mx-auto gi-flex-col gi-my-8">
        <label htmlFor="search" className="gi-text-md gi-font-bold gi-mb-4">
          Enter search term
        </label>
        <div className="gi-flex">
          <input
            type="text"
            className="gi-px-3 gi-py-1 gi-grow gi-w-full"
            id="search"
          />
          <button className="gi-bg-emerald-800 gi-text-white gi-p-md">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderSearch;
