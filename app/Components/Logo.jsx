import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../public/logo.svg";

const Logo = () => {
  return (
    <>
      <div className="hidden lg:flex">
        <Link href="/">
          <Image
            className="w-auto h-6"
            src={logoIcon}
            width={100}
            height={24}
            alt="Protocol"
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
