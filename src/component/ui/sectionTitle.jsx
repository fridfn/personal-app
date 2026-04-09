
export const SectionTitle = ({ data, reverse }) => {
  if (!data) return null
  const { highlight, normal } = data.title;
  
  return (
    <p className={`title ${reverse && 'reverse'}`}>
      { highlight && (
        <span id="highlight">{highlight}</span>
      )}
      {normal}
    </p>
  )
}