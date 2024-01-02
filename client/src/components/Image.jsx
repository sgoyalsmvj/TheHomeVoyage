export default function Image({ src, ...rest }) {
  // Assuming you have a variable for the base URL in your environment configuration
  const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || '';

  // Combine the base URL with the provided src
  const completeSrc = src && src.includes('https://') ? src : baseUrl + '/uploads/' + src;

  return <img {...rest} src={completeSrc} alt={''} />;
}
