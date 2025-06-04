import * as React from "react";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { SelectedIcon } from "./DinamicSelect";
import { CategoryTypes } from "../../types/vibe";

interface Category {
  label: string;
  value: CategoryTypes;
  checked: boolean;
}

interface CheckboxMapProps {
  categories: Category[];
  onCategoryChange: (updatedCategories: Category[]) => void;
}

const CheckboxMap: React.FC<CheckboxMapProps> = ({ categories, onCategoryChange }) => {
  const handleCheckboxChange = (index: number) => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, checked: !category.checked } : category
    );
    onCategoryChange(updatedCategories);
  };

  return (
    <>
      {categories.map((category, index) => (
        <label key={index} className="movie-picker-label--checkbox">
          {category.label}
          <Checkbox.Root
            className="movie-picker--checkbox"
            checked={category.checked}
            onCheckedChange={() => handleCheckboxChange(index)}
          >
            <Checkbox.Indicator className="movie-picker--checkbox-indicator">
              <SelectedIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </label>
      ))}
    </>
  );
};

export default CheckboxMap;
