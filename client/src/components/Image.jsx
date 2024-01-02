export default function Image({ src, ...rest }) {
  const baseUrl = import.meta.env.VITE_BASEURL + '/uploads/'; // Use VITE_BASEURL in production

  src = src && src.includes('https://') ? src : baseUrl + src;

  return <img {...rest} src={src} alt={''} />;
}
