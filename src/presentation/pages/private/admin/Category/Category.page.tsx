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
import { AddCategoryDialog } from "./components";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const CategoryPage = () => {
  const { dishCategories, startLoadingDishCategories } = useDishCategoryStore();
  const [selectedCategories, setSelectedCategories] = useState<
    DishCategoryModel[]
  >([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [addCategoryDialog, setAddCategoryDialog] = useState(false);
  const dt = useRef<DataTableRef>(null);

  useEffect(() => {
    startLoadingDishCategories();
  }, []);

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
                onClick={() => setAddCategoryDialog(true)}
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
          editMode="row"
          ref={dt}
          onRowEditComplete={(e) => console.log(e)}
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
          <Column rowEditor showAddButton exportable={false} />
        </DataTable>

        <AddCategoryDialog
          visible={addCategoryDialog}
          onHide={() => setAddCategoryDialog(false)}
        />
      </div>
    </AdminLayout>
  );
};

export default CategoryPage;
