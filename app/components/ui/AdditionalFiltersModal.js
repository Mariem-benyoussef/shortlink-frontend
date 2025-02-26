import { Input } from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

export const AdditionalFiltersModal = ({
  isOpen,
  onClose,
  onApply,
  filters,
  setFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Ajouter des filtres
        </h2>
        <div className="space-y-4">
          {/* Filtre par statut */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Statut
            </label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="masked">Masqué</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtre par nombre de clics */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Nombre de clics
            </label>
            <Input
              type="number"
              placeholder="Nombre de clics minimum"
              value={filters.minClicks}
              onChange={(e) =>
                setFilters({ ...filters, minClicks: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded dark:bg-[#5a80e1] dark:hover:bg-[#5a80e1]/90"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};
