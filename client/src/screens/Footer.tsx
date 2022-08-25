import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900bg-white dark:bg-gray-900 border-t border-gray-400 shadow">
      <div className="container max-w-4xl mx-auto flex py-8">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full md:w-1/2 ">
            <div className="px-8">
              <h3 className="font-bold text-white">About</h3>
              <p className="py-4 text-white text-sm">
                This website was built and developed by Duc Thai.
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-1/2">
            <div className="px-8">
              <h3 className="font-bold text-white">UI Sources</h3>
              <ul className="list-reset items-center text-sm pt-3">
                <li>
                  <a
                    className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                    href="https://flowbite.com/"
                  >
                    FlowBite 
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                    href="https://github.com/davidgrzyb"
                  >
                    David Grzyb
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1"
                    href="https://github.com/tailwindtoolbox"
                  >
                    TailwindToolBox
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
