import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://app.cal.com/embed/",
  "script-src-attr 'none'",
  "style-src 'self'",
  // The Cal.com embed (/contact) injects these exact <style> blocks for its loading animation; no
  // nonce support, so they're allowed by hash. If Cal.com changes them, the booking calendar still
  // works but its loader goes blank and the console reports the new sha256 values to put here.
  "style-src-elem 'self' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-NliechZJ/bTlyUGYDwsrgz1fmzczt4Lgm7VVMb92AtM=' 'sha256-coIJnNWZtf0X55vkQ0SfV/Q+RsEOnnAYv1v+LyO4V4Q=' 'sha256-//YfAG+LW5KVyGGKBzB07ksGwYtKO7MYgNCIrQ6oNLU=' 'sha256-1te/TckYC2ZeWab6hObs3kGk97QY9mQjGtRoOyTMDcU='",
  "style-src-attr 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io/f/xkjgojzw https://www.google.com/recaptcha/",
  "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/ https://app.cal.com https://cal.com",
  "media-src 'self'",
  "worker-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(self), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), usb=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    // Allows popups the site opens (such as Cal.com booking) while isolating this window.
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about", destination: "/company", permanent: true },
      { source: "/capabilities", destination: "/services", permanent: true },
      { source: "/capabilities/:path*", destination: "/services", permanent: true },
      { source: "/process", destination: "/services", permanent: true },
      { source: "/solutions", destination: "/services", permanent: true },
      // The operating businesses moved from case-study pages to the About page.
      { source: "/work/dawood-rcc-pipe", destination: "/company#foundation", statusCode: 301 },
      { source: "/work/dawood-traders", destination: "/company#foundation", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
