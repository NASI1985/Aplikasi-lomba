// Bilah progres. onLight = true untuk latar putih; default untuk latar hijau.
export default function ProgressBar({ percent, onLight = false, label = 'Progres' }) {
  return (
    <div
      className={'progress' + (onLight ? ' on-light' : '')}
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{ width: percent + '%' }} />
    </div>
  )
}
