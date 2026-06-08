export default function ButtonLink({ children, to, href, variant = "primary", ...props }) {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a className={className} href={to} {...props}>
      {children}
    </a>
  );
}
