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
  ConfirmDialog,
} from "@/presentation/core/components";
import { AdminLayout } from "../layout";
import { useDishCategoryStore, useDishStore } from "@/presentation/hooks";
import type { DishCategoryModel } from "@/model";
import { CategoryActions, CategoryDialog } from "./components";
import { StatusEnum } from "@/domain/entities/enums";
import clsx from "clsx";
import { isCategotyUsed } from "./utilities";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const INITIAL_CONFIRM_DIALOG = {
  visible: false,
  message: "",
  dishCategoryId: undefined,
};

const DishCategoryPage = () => {
  const {
    dishCategories,
    startDeletingDishCategory,
    startDeletingManyDishCategories,
    startLoadingDishCategories,
  } = useDishCategoryStore();
  const { dishes } = useDishStore();
  const [selectedCategories, setSelectedCategories] = useState<
    DishCategoryModel[]
  >([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [{ visible, message, dishCategoryId }, setConfirmDialog] = useState<{
    visible: boolean;
    message: string;
    dishCategoryId?: number;
  }>(INITIAL_CONFIRM_DIALOG);
  const dt = useRef<DataTableRef>(null);

  const handleAcceptDelete = async () => {
    if (dishCategoryId) startDeletingDishCategory(dishCategoryId);
    else
      await startDeletingManyDishCategories(
        selectedCategories.map((c) => c.id),
      ).then(() => setSelectedCategories([]));
    setConfirmDialog(INITIAL_CONFIRM_DIALOG);
  };

  useEffect(() => {
    startLoadingDishCategories();
  }, []);

  return (
    <AdminLayout>
      <ConfirmDialog
        message={message}
        acceptClassName="bg-primary p-2 px-3"
        rejectClassName="bg-transparent p-2 px-3"
        accept={handleAcceptDelete}
        visible={visible}
        onHide={() => setConfirmDialog(INITIAL_CONFIRM_DIALOG)}
        reject={() => setConfirmDialog(INITIAL_CONFIRM_DIALOG)}
      />
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
                onClick={() => {
                  setConfirmDialog({
                    visible: true,
                    message: `Are you sure you want to delete ${selectedCategories.length} categor${
                      selectedCategories.length > 1 ? "ies" : "y"
                    }?`,
                  });
                }}
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
            if (Array.isArray(e.value)) {
              setSelectedCategories(
                e.value.filter((c) => !isCategotyUsed(c, dishes)),
              );
            }
          }}
          dataKey="id"
          paginator
          selectionPageOnly
          paginatorDropdownAppendTo={document.body}
          globalFilterFields={["name", "status"]}
          paginatorPosition="both"
          footerColumnGroup
          rows={ROWS_PER_PAGE_OPTIONS[0]}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
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
          <Column selectionMode="multiple" showAddButton exportable={false} />
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
          <Column
            field="status"
            header="Status"
            body={(category: DishCategoryModel) => (
              <span
                className={clsx(
                  "rounded-full p-4 py-2 text-center text-xs font-bold",
                  category.status === StatusEnum.PUBLISHED &&
                    "bg-green-500/10 text-green-500",
                  category.status === StatusEnum.PRIVATE &&
                    "bg-red-500/10 text-red-500",
                )}
              >
                {category.status}
              </span>
            )}
          />
          <Column field="createdAt" header="Created At" sortable />
          <Column field="updatedAt" header="Updated At" sortable />
          <Column
            className="min-w-36"
            body={(category: DishCategoryModel) => (
              <CategoryActions
                category={category}
                dishes={dishes}
                setShowCategoryDialog={setShowCategoryDialog}
                setConfirmDialog={setConfirmDialog}
              />
            )}
            exportable={false}
          ></Column>
        </DataTable>

        <CategoryDialog
          visible={showCategoryDialog}
          onHide={() => setShowCategoryDialog(false)}
        />
      </div>
    </AdminLayout>
  );
};

export default DishCategoryPage;
