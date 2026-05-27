import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/**
 * Button primitive (T016). The single accent is the primary fill (FR-009);
 * secondary is a subordinate, accent-outlined action. Renders as a <button>,
 * a router <Link>, or a plain <a> depending on props — so a CTA and a link can
 * share one look without misusing semantics.
 */
type Variant = 'primary' | 'secondary';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type RouterLinkProps = BaseProps & { as: 'link'; to: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  >;
type AnchorProps = BaseProps & { as: 'anchor'; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonComponentProps = ButtonProps | RouterLinkProps | AnchorProps;

function classFor(variant: Variant, extra?: string): string {
  return [styles.button, styles[variant], extra].filter(Boolean).join(' ');
}

export function Button(props: ButtonComponentProps) {
  const { variant = 'primary', children, className, ...rest } = props as ButtonComponentProps & {
    className?: string;
  };

  if (props.as === 'link') {
    const { to, as: _as, ...anchorRest } = rest as RouterLinkProps & { as?: string; to: string };
    return (
      <Link to={to} className={classFor(variant, className)} {...anchorRest}>
        {children}
      </Link>
    );
  }

  if (props.as === 'anchor') {
    const { as: _as, ...anchorRest } = rest as AnchorProps & { as?: string };
    return (
      <a className={classFor(variant, className)} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonProps & { as?: string };
  return (
    <button className={classFor(variant, className)} {...buttonRest}>
      {children}
    </button>
  );
}
