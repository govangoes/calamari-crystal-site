export default function PlayerEmbed(){
  return (
    <div className="card overflow-hidden">
      <div className="aspect-video flex items-center justify-center" style={{background:"rgba(0,0,0,.12)"}}>
        <p className="p-4 text-center text-sm" style={{opacity:.8}}>
          Player goes here. Link out:{' '}
          <a className="underline" href="https://www.youtube.com/@govangoes" target="_blank" rel="noreferrer">
            youtube.com/@govangoes
          </a>
        </p>
      </div>
    </div>
  );
}
