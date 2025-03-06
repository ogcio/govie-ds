const generateColumns = (count: number) => {
  return Array.from({ length: count }, (_, index) => index + 1);
};

export function GridPrimitives() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-bold mb-4">Grid System Documentation</h2>
        <p className="mb-6">
          Our design system uses a responsive grid that adapts across different
          screen sizes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>Desktop (lg): 12-column layout</li>
          <li>Tablet (md): 8-column layout</li>
          <li>Mobile (sm): 4-column layout</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">
          12-Column Grid (Desktop) <pre>gi-grid-12-column</pre>
        </h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-12-column">
            {generateColumns(12).map((col) => (
              <div key={col} className="bg-gold-200 p-4 shadow-sm">
                <p className="text-center font-medium">{col}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">
          8-Column Grid (Tablet) <pre>gi-grid-8-column</pre>
        </h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-8-column">
            {generateColumns(8).map((col) => (
              <div key={col} className={'bg-gold-200 p-4 shadow-sm'}>
                <p className="text-center font-medium">{col}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">
          4-Column Grid (Mobile) <pre>gi-grid-4-column</pre>
        </h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-4-column">
            {generateColumns(4).map((col) => (
              <div key={col} className={'bg-gold-200 p-4 shadow-sm'}>
                <p className="text-center font-medium">{col}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">
          Responsive Grid Example <pre>gi-grid-responsive</pre>
        </h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-responsive">
            {generateColumns(12).map((col) => (
              <div key={col} className={'bg-gold-200 p-4 shadow-sm'}>
                <p className="text-center font-medium">{col}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Alternative Columns</h2>
        <p className="mb-2">
          Different column spans in a 12-column grid system
        </p>
        <div className="p-8 border border-gray-300">
          <div className="space-y-6">
            <div className="mx-4 md:mx-6 lg:mx-8 grid grid-cols-12 gap-4 md:gap-6 lg:gap-6">
              {generateColumns(12).map((index) => (
                <div
                  key={`row1-${index}`}
                  className="col-span-1 bg-gold-200 p-4 shadow-sm"
                >
                  <p className="text-center font-medium">1</p>
                </div>
              ))}
              {generateColumns(6).map((index) => (
                <div
                  key={`row2-${index}`}
                  className="col-span-2 bg-gold-200 p-4 shadow-sm"
                >
                  <p className="text-center font-medium">2</p>
                </div>
              ))}
              {generateColumns(4).map((index) => (
                <div
                  key={`row3-${index}`}
                  className="col-span-3 bg-gold-200 p-4 shadow-sm"
                >
                  <p className="text-center font-medium">3</p>
                </div>
              ))}
              {generateColumns(3).map((index) => (
                <div
                  key={`row4-${index}`}
                  className="col-span-4 bg-gold-200 p-4 shadow-sm"
                >
                  <p className="text-center font-medium">4</p>
                </div>
              ))}
              {generateColumns(2).map((index) => (
                <div
                  key={`row5-${index}`}
                  className="col-span-6 bg-gold-200 p-4 shadow-sm"
                >
                  <p className="text-center font-medium">6</p>
                </div>
              ))}
              <div className="col-span-12 bg-gold-200 p-4 shadow-sm">
                <p className="text-center max-w-none font-medium">12</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Sidebar Layout (desktop)</h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-12-column h-[400px]">
            {generateColumns(3).map((col) => (
              <div
                key={`sidebar-${col}`}
                className="bg-blue-200 p-4 shadow-sm"
              ></div>
            ))}
            {generateColumns(9).map((col) => (
              <div
                key={`content-${col}`}
                className="bg-gold-200 p-4 shadow-sm"
              ></div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200"></div>
              <span>Sidebar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gold-200"></div>
              <span>Content</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Sidebar Layout (tablet)</h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-8-column h-[400px]">
            {generateColumns(2).map((col) => (
              <div
                key={`sidebar-${col}`}
                className="bg-blue-200 p-4 shadow-sm"
              ></div>
            ))}
            {generateColumns(6).map((col) => (
              <div
                key={`content-${col}`}
                className="bg-gold-200 p-4 shadow-sm"
              ></div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200"></div>
              <span>Sidebar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gold-200"></div>
              <span>Content</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Sidebar Layout (mobile)</h2>
        <div className="p-8 border border-gray-300">
          <div className="gi-grid-4-column h-[400px]">
            {generateColumns(4).map((col) => (
              <div
                key={`sidebar-${col}`}
                className="bg-gold-200 p-4 shadow-sm"
              ></div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gold-200"></div>
              <span>Content</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
