import { FC, useMemo } from 'react';
import { ITypographyProps } from './Typography.interface';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import styles from './Typography.module.scss';

export const Typography: FC<ITypographyProps> = ({
  children,
  as: Tag = 'p',
  fontFamily = 'Inter',
  color = '252129',
  fontWeight = '400',
  tabletResponse = '768',
  mobileResponse = '425',
  mobileVariant,
  tabletVariant,
  variant,
  textDecoration,
  textAlign,
  className,
  ...rest
}) => {
  const isTablet = useMediaQuery({
    query: `(max-width: ${tabletResponse}px)`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileResponse}px)`,
  });

  const variantWithResponse = useMemo((): string | undefined => {
    if (!mobileVariant && !tabletVariant) return variant;
    if (tabletVariant && isTablet && !isMobile) return tabletVariant;
    if (tabletVariant && isTablet && isMobile && !mobileVariant) return tabletVariant;
    if (mobileVariant && isMobile) return mobileVariant;
    return variant;
  }, [mobileVariant, tabletVariant, variant, isMobile, isTablet]);

  return (
    <Tag
      className={cn(
        className,
        styles[`font_family_${fontFamily}`],
        styles[`font_weight_${fontWeight}`],
        styles[`color_${color}`],
        {
          [styles[`text_decoration_${textDecoration}`]]: textDecoration !== undefined,
          [styles[`text_align_${textAlign}`]]: textAlign !== undefined,
          [styles[`${variantWithResponse}`]]: variantWithResponse !== undefined,
        },
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
