import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white py-8">
      <div className="mx-auto px-4 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()} Alternative World Minecraft. All
              rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/privacy-policy"
              className="hover:text-amber-400 transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/tos"
              className="hover:text-amber-400 transition duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
