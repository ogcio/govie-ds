export const drawerBody = `
  <ul>
    <li><a aria-label="News" href="#" class="gi-list-item"><span class="gi-text-sm gi-ml-1">News</span></a></li>
    <li><a aria-label="Departments" href="#" class="gi-list-item"><span class="gi-text-sm gi-ml-1">Departments</span></a></li>
    <li><a aria-label="Services" href="#" class="gi-list-item"><span class="gi-text-sm gi-ml-1">Services</span></a></li>
    <li><a aria-label="Search" class="gi-list-item"><span class="gi-text-sm gi-ml-1">Search</span></a></li>
    <li><a aria-label="English" href="#" class="gi-list-item"><span class="gi-text-sm gi-ml-1">English</span></a></li>
    <li><a aria-label="Gaeilge" href="#" class="gi-list-item"><span class="gi-text-sm gi-ml-1">Gaeilge</span></a></li>
    <li class="gi-mt-8 xs:gi-hidden">
        <form class="gi-max-w-md gi-mx-auto" data-testid="header-search-form" aria-label="Search Form">
          <h4 class="gi-heading-sm">Search the website</h4>
          <div class="gi-flex gi-items-end gi-mt-4">
              <div class="gi-flex-auto gi-input-text-container">
                <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" aria-label="Search the website" placeholder="Enter search term" id="search" type="text" name="search_query"></div>
              </div>
              <div class="gi-ml-1 gi-flex-none gi-hidden md:gi-block"><button aria-label="Submit search" class="gi-btn gi-btn-primary gi-btn-regular">Search</button></div>
              <div class="gi-ml-1 gi-flex-none gi-block md:gi-hidden"><button role="button" data-testid="govieIconButton-undefined-undefined-undefined-undefined" class="gi-btn gi-btn-primary gi-icon-btn-regular"><span data-testid="govie-icon" role="presentation" class="gi-block material-symbols-outlined" style="font-size: 24px;">search</span></button></div>
          </div>
        </form>
    </li>
  </ul>
`;

export const drawerFooter = `
  <div data-orientation="unset">
    <button class="gi-btn gi-btn-secondary-dark gi-btn-regular gi-justify-center xs:gi-justify-start gi-justify-center sm:gi-justify-start">Cancel</button>
    <button class="gi-btn gi-btn-primary gi-btn-regular gi-justify-center xs:gi-justify-start gi-justify-center sm:gi-justify-start">Primary</button>
  </div>
`;
