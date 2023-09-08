import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface CustomInputProps {
  defaultPlaceHolder?: string;
}

type InputProps = CustomInputProps &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ defaultPlaceHolder, placeholder, disabled, onChange, ...rest }, ref) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapper__block}>
          <input
            className={cn(
              styles.floatingInput,
              !placeholder && styles.floatingInput_nonePlaceholder,
            )}
            ref={ref}
            disabled={disabled}
            placeholder={placeholder ? placeholder : defaultPlaceHolder}
            onChange={onChange}
            {...rest}
          />
          <label className={styles.label}>{defaultPlaceHolder || placeholder}</label>
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
