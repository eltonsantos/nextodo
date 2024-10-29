import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full h-56 bg-gray-900 flex flex-col justify-center items-center">
      <Image className="w-48" src="/logo.svg" height={60} width={120} alt="logo" />
    </div>
  );
}
