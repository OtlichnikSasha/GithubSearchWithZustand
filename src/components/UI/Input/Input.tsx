import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputProps {
  defaultPlaceHolder?: string;
}

export const Input: FC<
  InputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ defaultPlaceHolder, ref, placeholder, disabled, onChange, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={cn(styles.floatingInput, !placeholder && styles.floatingInput_nonePlaceholder)}
        ref={ref}
        disabled={disabled}
        placeholder={placeholder ? placeholder : defaultPlaceHolder}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

Input.displayName = 'Input';
