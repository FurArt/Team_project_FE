import { Select } from "@base-ui-components/react/select"
import "./DinamicSelect.scss"

export function SelectIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.88 0.453125L8 6.55979L14.12 0.453125L16 2.33312L8 10.3331L0 2.33312L1.88 0.453125Z"
        fill="white"
      />
    </svg>
  )
}

export function SelectedIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 9.4L0 5.4L1.4 4L4 6.6L10.6 0L12 1.4L4 9.4Z" fill="white" />
    </svg>
  )
}

type Option = {
  value: string;
  label: string;
};

type DinamicSelectProps = {
  defaultValue?: string;
  placeholder?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
};


const DinamicSelect: React.FC<DinamicSelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    options,
    onValueChange,
  } = props

  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger className="select-trigger">
        <Select.Value
          placeholder={placeholder}
        />
        <Select.Icon className="select-arrow">
          <SelectIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className="select-positioner" sideOffset={8}>
          <Select.Popup className="select-popup">
            {options?.map(option => (
              <Select.Item
                key={option.value}
                className="select-item"
                value={option.value}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <SelectedIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

export default DinamicSelect
