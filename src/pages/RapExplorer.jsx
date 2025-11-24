import { useState } from 'react';

const initialArtists = [
  {
    id: 1,
    name: 'MF DOOM',
    bars: [
      'I used to cop a lot, but never copped no drop',
      'Had a plan in mind but didn\'t know where to start'
    ],
    bio: 'Legendary underground rapper known for multisyllabic rhymes.'
  },
  {
    id: 2,
    name: 'Nas',
    bars: [
      'I never sleep, cause sleep is the cousin of death',
      'Life\'s a bitch and then you die, that\'s why we get high'
    ],
    bio: 'Queensbridge icon with poetic storytelling.'
  }
];

export default function RapExplorer() {
  const [view, setView] = useState('grid');
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <main className="p-8 text-paperWhite">
      <h1 className="text-3xl font-bold mb-4">Rap Map Explorer</h1>
      <div className="mb-4">
        <button
          className={`mr-2 ${view === 'grid' ? 'btn-primary' : 'btn'}`}
          onClick={() => setView('grid')}
        >
          Grid View
        </button>
        <button
          className={`${view === 'list' ? 'btn-primary' : 'btn'}`}
          onClick={() => setView('list')}
        >
          List View
        </button>
      </div>
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {initialArtists.map((artist) => (
            <div
              key={artist.id}
              className="border border-white/20 p-4 rounded-2xl bg-ink/60 hover:border-crystal cursor-pointer"
              onClick={() => setSelectedArtist(artist)}
            >
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p className="text-sm mt-2">{artist.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {initialArtists.map((artist) => (
            <li
              key={artist.id}
              className="border border-white/20 p-4 rounded-2xl bg-ink/60 hover:border-crystal cursor-pointer"
              onClick={() => setSelectedArtist(artist)}
            >
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p className="text-sm mt-2">{artist.bio}</p>
            </li>
          ))}
        </ul>
      )}
      {selectedArtist && (
        <div className="mt-8 p-4 border border-crystal rounded-2xl bg-ink/80">
          <h3 className="text-2xl font-semibold mb-2">{selectedArtist.name} Bars</h3>
          <ul className="list-disc pl-5">
            {selectedArtist.bars.map((bar, index) => (
              <li key={index} className="mb-1">
                {bar}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
