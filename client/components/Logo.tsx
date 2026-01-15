export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  const src = "https://cdn.builder.io/api/v1/image/assets%2Fffbdffacfb9e45418bd2a8c1820c180d%2Fa04b37d7c29c4515894f59e026bebccc?format=webp&width=800";

  return (
    <svg
      role="img"
      aria-label="Kafen Farm logo"
      viewBox="0 0 800 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>Kafen Farm</title>
      <defs>
        <clipPath id="logo-clip">
          <rect x="0" y="0" width="800" height="800" rx="40" />
        </clipPath>
      </defs>
      {/* raster image embedded inside an SVG to allow vector-style placement */}
      <image href={src} x="0" y="0" width="800" height="800" clipPath="url(#logo-clip)" preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
