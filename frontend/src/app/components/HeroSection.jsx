import Image from "next/image";
import Link from "next/link";
import Left from "@/assets/left.png";
import Top from "@/assets/top.png";
import Right from "@/assets/right.png";
import Bottom from "@/assets/bottom.png";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-12 gap-4 mx-auto py-10 max-w-7xl px-4">
      <div className="col-span-3 rounded-lg overflow-hidden">
        <Image src={Left} alt="Left Image" className="w-full h-full object-cover" />
      </div>

      <div className="col-span-6 rounded-lg overflow-hidden flex flex-col justify-between">
        <div className="h-1/3 mb-2">
          <Image src={Top} alt="Center Top Image" className="w-full h-full object-cover" />
        </div>

        <div className="h-2/3 bg-gray-100 flex flex-col items-center justify-center rounded-lg relative p-6">
          <h1 className="text-5xl font-bold text-[var(--primary-color)]">ULTIMATE</h1>
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#0D1F2D] to-[#0D1F2D]/50 mb-4">SALE</h2>
          <p className="text-lg font-semibold text-gray-800 mb-4">NEW COLLECTION</p>
          <Link href="/shop">
            <button className="bg-[var(--primary-color)] text-white py-2 px-6 mt-4 rounded-lg shadow-lg hover:bg-[var(--primary-hover-color)]">SHOP NOW</button>
          </Link>
        </div>

        <div className="h-1/3 mt-2">
          <Image src={Bottom} alt="Center Bottom Image" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right Image */}
      <div className="col-span-3 rounded-lg overflow-hidden">
        <Image src={Right} alt="Right Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
