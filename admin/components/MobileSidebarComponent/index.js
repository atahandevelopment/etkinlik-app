import MobileSidebar from "./MobileSidebarMenu";
import { RxHamburgerMenu } from "react-icons/rx";

export default function MobileMenuOpen({
  setMobileSidebarOpen,
  mobileSidebarOpen,
}) {
  return (
    <>
      {mobileSidebarOpen ? (
        <div className="w-full flex justify-start items-start">
          <MobileSidebar
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="w-11/12 h-10 lg:hidden flex justify-start items-center">
        <RxHamburgerMenu
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className={`text-black font-semibold size-5`}
        />
      </div>
    </>
  );
}
