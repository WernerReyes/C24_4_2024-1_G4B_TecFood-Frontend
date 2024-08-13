import type { DishCategoryModel } from "@/model";
import {
  Button,
  Column,
  ConfirmDialog,
  DataTable,
  type DataTableRef,
  type DataTableSelectionMultipleChangeEvent,
  Image,
  InputSearch,
  ProgressSpinner,
  Toolbar,
} from "@/presentation/core/components";
import { useDishCategoryStore } from "@/presentation/hooks";
import { useEffect, useRef, useState } from "react";
import { AdminLayout } from "../layout";
import { CategoryDialog } from "./components";
import { ActionsLayout } from "../../layout";
import { StatusColor } from "../../components";

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
    isLoading,
    startLoadingDishCategory,
    startUpdatingDishCategoryStatus,
    startLoadingDishCategories,
  } = useDishCategoryStore();
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
      {isLoading && (
        <ProgressSpinner
          containerClassName="z-[999] fixed inset-0 flex items-center justify-center bg-opacity-50"
          darkColor="
        dark:bg-slate-900/40"
          lightColor="bg-white/40"
        />
      )}
      <ConfirmDialog
        message={message}
        accept={handleAcceptDelete}
        visible={visible}
        onHide={() => setConfirmDialog(INITIAL_CONFIRM_DIALOG)}
        reject={() => setConfirmDialog(INITIAL_CONFIRM_DIALOG)}
      />
      <div className="m-5 rounded-md border-2 dark:border-slate-700 md:m-10">
        <Toolbar
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
              setSelectedCategories(e.value.filter((c) => !c.isUsed));
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
              <StatusColor status={category.status} />
            )}
          />
          <Column field="createdAt" header="Created At" sortable />
          <Column field="updatedAt" header="Updated At" sortable />
          <Column
            className="min-w-36"
            body={(category: DishCategoryModel) => (
              <ActionsLayout
                id={category.id}
                status={category.status}
                startUpdatingStatus={startUpdatingDishCategoryStatus}
                isLoading={isLoading}
                positionCheckbox="right"
              >
                <Button
                  unstyled
                  icon="pi pi-pencil"
                  rounded
                  outlined
                  onClick={() => {
                    startLoadingDishCategory(category);
                    setShowCategoryDialog(true);
                  }}
                />

                {!category.isUsed && (
                  <Button
                    unstyled
                    icon="pi pi-trash"
                    rounded
                    outlined
                    className="disabled:opacity-50"
                    disabled={isLoading}
                    onClick={() =>
                      setConfirmDialog({
                        visible: true,
                        message: `Are you sure you want to delete "${category.name}"?`,
                        dishCategoryId: category.id,
                      })
                    }
                  />
                )}
              </ActionsLayout>
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
