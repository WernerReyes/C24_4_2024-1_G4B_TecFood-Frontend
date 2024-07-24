import { useEffect, useRef, useState } from "react";
import {
  DataTable,
  type DataTableSelectionMultipleChangeEvent,
  type DataTableRef,
  InputSearch,
  Column,
  Toolbar,
  Button,
  Image,
} from "@/presentation/core/components";
import { AdminLayout } from "../layout";
import { useDishCategoryStore } from "@/presentation/hooks";
import type { DishCategoryModel } from "@/model";
import { CategoryDialog } from "./components";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const CategoryPage = () => {
  const { dishCategories, startLoadingDishCategories } = useDishCategoryStore();
  const [selectedCategories, setSelectedCategories] = useState<
    DishCategoryModel[]
  >([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<DishCategoryModel | null>(null);
  const dt = useRef<DataTableRef>(null);

  useEffect(() => {
    startLoadingDishCategories();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      setShowCategoryDialog(true);
    } else {
      setShowCategoryDialog(false);
    }
  }, [currentCategory]);

  return (
    <AdminLayout>
      <div className="m-5 rounded-md border-2 dark:border-slate-700 md:m-10">
        <Toolbar
          className=""
          end={() => (
            <Button
              label="Export"
              icon="pi pi-upload"
              className="bg-transparent dark:text-white"
              onClick={() => dt.current?.exportCSV()}
            />
          )}
          start={() => (
            <div className="flex flex-wrap gap-2">
              <Button
                label="New"
                icon="pi pi-plus"
                severity="success"
                className="bg-transparent dark:text-white"
                onClick={() => setShowCategoryDialog(true)}
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                className="bg-transparent dark:text-white"
                disabled={!selectedCategories.length}
              />
            </div>
          )}
        />
        <DataTable
          ref={dt}
          value={dishCategories}
          selection={selectedCategories}
          onSelectionChange={(
            e: DataTableSelectionMultipleChangeEvent<DishCategoryModel[]>,
          ) => {
            if (Array.isArray(e.value)) setSelectedCategories(e.value);
          }}
          dataKey="id"
          paginator
          paginatorPosition="both"
          footerColumnGroup
          rows={ROWS_PER_PAGE_OPTIONS[0]}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter.length ? globalFilter : undefined}
          header={() => (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="m-0">Manage Categories</h4>
              <InputSearch
                type="search"
                className="border-none"
                placeholder="Search..."
                onInput={(e) =>
                  setGlobalFilter((e.target as HTMLInputElement).value)
                }
              />
            </div>
          )}
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" exportable={false} />
          <Column field="id" header="Code" sortable />
          <Column field="name" header="Name" sortable />
          <Column
            field="imageUrl"
            header="Image"
            body={(rowData: DishCategoryModel) => (
              <Image
                src={rowData.imageUrl}
                alt={rowData.name}
                imageClassName="w-40 h-24 object-cover"
              />
            )}
          />
          <Column field="createdAt" header="Created At" sortable />
          <Column field="updatedAt" header="Updated At" sortable />
          <Column
            body={(category: DishCategoryModel) => (
              <div className="flex items-center justify-evenly gap-x-4">
                <Button
                  unstyled
                  icon="pi pi-pencil"
                  rounded
                  outlined
                  onClick={() => setCurrentCategory(category)}
                />
                <Button
                  unstyled
                  icon="pi pi-trash"
                  rounded
                  outlined
                  severity="danger"
                  // onClick={() => {
                  //   setConfirmDialog({
                  //     visible: true,
                  //     message:
                  //       "Are you sure you want to delete: " + dish.name + "?",
                  //     dishId: dish.id,
                  //   });
                  // }}
                />
              </div>
            )}
            exportable={false}
          ></Column>
        </DataTable>

        <CategoryDialog
          currentCategory={currentCategory}
          visible={showCategoryDialog}
          onHide={() => setShowCategoryDialog(false)}
          setCurrentCategory={setCurrentCategory}
        />
      </div>
    </AdminLayout>
  );
};

export default CategoryPage;
