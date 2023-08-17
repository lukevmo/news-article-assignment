import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 bg-neutral-200 z-50">
      <div className="sm:container mx-auto lg:px-20">
        <div className="px-4 py-3 lg:py-5 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg lg:text-3xl font-extrabold font-martelSans inline-block cursor-pointer"
          >
            Handshake by DC
          </Link>
          <div>
            <Link
              className="text-blue-500 font-martelSans font-bold hover:underline text-sm lg:text-lg"
              to="/new-article"
            >
              New article
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
