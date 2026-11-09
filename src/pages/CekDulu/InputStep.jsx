import { INPUT_CATEGORIES, SAMPLE_MESSAGE } from '../../data/checkInput.js'

export default function InputStep({ categoryIndex, onCategoryChange, text, onTextChange, onCheck }) {
  return (
    <div className="grid-2">
      <div className="card">
        <span className="eyebrow">Kenali · Langkah 1 dari 3</span>
        <h2>Apa yang mau dicek?</h2>
        {INPUT_CATEGORIES.map((category, i) => (
          <button
            key={category.label}
            className={'choice' + (i === categoryIndex ? ' selected' : '')}
            aria-pressed={i === categoryIndex}
            onClick={() => onCategoryChange(i)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="card">
        <span className="eyebrow">Langkah 2 · Tempel teks</span>
        <h2>Tempel pesannya</h2>
        <textarea
          className="text-input"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={INPUT_CATEGORIES[categoryIndex].placeholder}
          aria-label="Teks yang mau dicek"
        />
        <button
          className="pill"
          style={{ alignSelf: 'flex-start' }}
          onClick={() => onTextChange(SAMPLE_MESSAGE)}
        >
          Coba contoh fiktif
        </button>
        <div className="notice">
          Hapus nama, nomor, dan rekening asli dulu. Teks diproses di browsermu dan tidak dikirim ke server.
        </div>
        <button className="btn push-down" onClick={onCheck}>
          Periksa (langkah 3: lihat hasil)
        </button>
      </div>
    </div>
  )
}
