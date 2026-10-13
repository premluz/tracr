import * as React from "react"
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "@/components/ui/input"
import { iconStrokeWidth } from "@/components/custom/icons/icon-weight"

export interface FormFieldProps extends InputProps {
  label?: string
  /** Rendered inline after the label text, e.g. an info icon */
  labelIcon?: React.ReactNode
  hint?: string
  success?: string
  error?: string
  id?: string
  wrapperClassName?: string
}

function FormField({
  label,
  labelIcon,
  hint,
  success,
  error,
  id: idProp,
  wrapperClassName,
  className,
  ...inputProps
}: FormFieldProps) {
  const id = idProp ?? React.useId()

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <div className="flex items-center gap-1.5">
          <label htmlFor={id} className="text-sm text-text-secondary">
            {label}
          </label>
          {labelIcon}
        </div>
      )}
      <Input
        id={id}
        aria-invalid={!!error}
        data-success={success ? "true" : undefined}
        aria-describedby={hint || error || success ? `${id}-desc` : undefined}
        className={className}
        {...inputProps}
      />
      {(hint || error || success) && (
        <p
          id={`${id}-desc`}
          className={cn(
            "flex items-center gap-1.5 text-sm",
            error ? "text-status-error" : success ? "text-status-success" : "text-text-muted"
          )}
        >
          {error && <AlertCircleIcon className="size-3.5 shrink-0" strokeWidth={iconStrokeWidth.regular} />}
          {success && <CheckCircle2Icon className="size-3.5 shrink-0" strokeWidth={iconStrokeWidth.regular} />}
          {error ?? success ?? hint}
        </p>
      )}
    </div>
  )
}

export { FormField }
