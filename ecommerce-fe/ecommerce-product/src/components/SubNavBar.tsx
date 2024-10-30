import { Category } from "../../types/category.types";
import { useAppSelector } from "../store/store";

export const SubNavBar = () => {
  const categories = useAppSelector((state) => state.category.categories);
  return (
    <div className="bg-neutral-900 h-14">
      <div className="relative w-full h-full">
        <div className="overflow-x-auto custom-scrollbar h-full">
          <div className="flex items-center h-full min-w-full px-4">
            <div className="flex items-center space-x-8 mx-auto">
              {categories?.map((category: Category) => (
                <button
                  key={category._id}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
