'use client';

import Image from 'next/image';

const loader = ({ src }: { src: string }) => {
  return `http://localhost:3000/travel/cover?id=${src}`;
};

export default function TravelNoteCard({
  travelNote,
}: Readonly<{
  travelNote: TravelNote;
}>) {
  return (
    <div className="border border-white rounded-2xl overflow-hidden h-full">
      <div className="h-2/3 relative">
        <Image
          loader={loader}
          src={travelNote._id}
          alt="travel cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="h-1/3">
        <div className="text-black">{travelNote.title}</div>
        <div className="flex">
          <div className="flex-1"></div>
          <div className="w-4/5">{travelNote.author}</div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
