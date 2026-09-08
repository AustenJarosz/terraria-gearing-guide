export function ClassEffects() {
  return <div className="class-effects" aria-hidden="true">
    <div className="ambient-motes">
      {Array.from({ length: 12 }, (_, index) => <i key={index} style={{
        '--mote-x': `${46 + (index * 17) % 53}%`,
        '--mote-y': `${12 + (index * 29) % 76}%`,
        '--delay': `${index * -.7}s`,
        '--duration': `${6 + index % 4}s`,
      }} />)}
    </div>
  </div>
}
