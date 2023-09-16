import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

export interface ITypographyProps {
  children: ReactNode;
  as?: keyof HTMLElementTagNameMap;
  mobileResponse?: string | number;
  tabletResponse?: string | number;
  fontFamily?: 'Inter';
  fontWeight?: '400' | '500' | '600' | '900' | 'bold';
  color?:
    | 'ffffff'
    | 'ffffffa3'
    | 'dcdbdd'
    | '252129'
    | '666666'
    | 'a2a2a3'
    | '17212b8f'
    | '9f9f9f'
    | '7d8590'
    | '2f81f7';
  variant?: variants;
  tabletVariant?: variants;
  mobileVariant?: variants;
  textDecoration?: 'underline' | 'none';
  textAlign?: 'center' | 'left' | 'right';
  className?: string;
  href?: string;
  rel?: string;
  target?: HTMLAttributeAnchorTarget;
}

type variants =
  | 'variant_20_24'
  | 'variant_18_24'
  | 'variant_16_20'
  | 'variant_12_14'
  | 'variant_14_16';
