import { useState } from "react";
import { CustomDatePicker } from "./CustomDatePicker";

export const DatePickerModal = ({
  isOpen,
  onClose,
  onApply,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Sélectionnez les dates
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Date de création
            </label>
            <CustomDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Date de création"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Date d&apos;expération
            </label>
            <CustomDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Date d'expération"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 text-sm font-medium text-white bg-[#4169E1] hover:bg-[#4169E1]/90 rounded dark:bg-[#5a80e1] dark:hover:bg-[#5a80e1]/90"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};
