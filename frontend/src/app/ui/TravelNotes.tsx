'use client';

import React, { useEffect, useState } from 'react';
import TravelNoteCard from './TravelNoteCard';

export default function TravelNotes() {
  const [travelNotes, settravelNotes] = useState<TravelNote[]>([]);
  const [pageIndex, setpageIndex] = useState(0);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTravelNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/travels?page=${pageIndex}`);
        const data = await response.json();

        if (data && data.length > 0) {
          settravelNotes((prevNotes) => {
            const newNotes = data.filter((d: TravelNote) => !prevNotes.find((note) => note._id === d._id));
            return [...prevNotes, ...newNotes];
          });
        }
      } catch (e) {
        console.error('Failed to fetch travel notes: ', e);
      }
    };

    fetchTravelNotes();
  }, [pageIndex]);

  return (
    <div className="flex flex-col">
      {travelNotes.map((note, index) => {
        return (
          <li key={note._id ?? index} className="w-64 h-64 mx-auto list-none">
            <TravelNoteCard travelNote={note} />
          </li>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
}
