const UKFlag = ({ size = '1em' }) => (
  <svg
    viewBox="0 0 60 30"
    width={size}
    height={size}
    style={{ display: 'inline-block', verticalAlign: 'middle', borderRadius: '3px' }}
  >
    {/* Blue background */}
    <rect width="60" height="30" fill="#012169" />
    {/* White diagonal cross */}
    <line x1="0" y1="0" x2="60" y2="30" stroke="#FFF" strokeWidth="6" />
    <line x1="60" y1="0" x2="0" y2="30" stroke="#FFF" strokeWidth="6" />
    {/* Red diagonal cross (St Patrick) */}
    <line x1="0" y1="0" x2="60" y2="30" stroke="#C8102E" strokeWidth="2" />
    <line x1="60" y1="0" x2="0" y2="30" stroke="#C8102E" strokeWidth="2" />
    {/* White vertical/horizontal cross */}
    <rect x="25" y="0" width="10" height="30" fill="#FFF" />
    <rect x="0" y="10" width="60" height="10" fill="#FFF" />
    {/* Red vertical/horizontal cross (St George) */}
    <rect x="27" y="0" width="6" height="30" fill="#C8102E" />
    <rect x="0" y="12" width="60" height="6" fill="#C8102E" />
  </svg>
)

export default UKFlag
