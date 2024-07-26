import type { DishModel } from "@/model";
import {
  Button,
  Column,
  ConfirmDialog,
  DataTable,
  type DataTableRef,
  type DataTableSelectionMultipleChangeEvent,
  Image,
  InputSearch,
  Toolbar,
} from "@/presentation/core/components";
import { useDishStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import { exportTableToExcel, exportTableToPdf } from "@/presentation/utilities";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../layout/Admin.layout";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const {
  ADMIN,
  common: { DETAIL_DISH },
  admin: { ADD_DISH, EDIT_DISH },
} = PrivateRoutes;

const INITIAL_CONFIRM_DIALOG = {
  visible: false,
  message: "",
  dishId: undefined,
};

type ColumnMeta = {
  field: keyof DishModel;
  header: string;
};

const COLS_TO_EXPORT: ColumnMeta[] = [
  { field: "id", header: "Code" },
  { field: "name", header: "Name" },
  { field: "price", header: "Price" },
  { field: "createdAt", header: "Created At" },
  { field: "updatedAt", header: "Updated At" },
];

const ListDishesPage = () => {
  const navigate = useNavigate();
  const { dishes, startDeletingDish, startDeletingManyDishes } = useDishStore();
  const [selectedDishes, setSelectedDishes] = useState<DishModel[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const dt = useRef<DataTableRef>(null);
  const [{ visible, message, dishId }, setConfirmDialog] = useState<{
    visible: boolean;
    message: string;
    dishId?: number;
  }>(INITIAL_CONFIRM_DIALOG);

  const handleAcceptDelete = async () => {
    if (dishId) await startDeletingDish(dishId);
    else await startDeletingManyDishes(selectedDishes.map((d) => d.id));
    setConfirmDialog(INITIAL_CONFIRM_DIALOG);
  };

  const handleExportPdf = () => {
    exportTableToPdf("Dishes", COLS_TO_EXPORT, dishes, "dishes.pdf");
  };

  const handleExportExcel = () => {
    exportTableToExcel(COLS_TO_EXPORT, dishes, "dishes.xlsx");
  };

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
          end={() => (
            <>
              <Button
                label="Export PDF"
                icon="pi pi-file-pdf"
                className="bg-transparent dark:text-white"
                onClick={handleExportPdf}
              />
              <Button
                label="Export Excel"
                icon="pi pi-file-excel"
                className="bg-transparent dark:text-white"
                onClick={handleExportExcel}
              />
            </>
          )}
          start={() => (
            <div className="flex flex-wrap gap-2">
              <Button
                label="New"
                icon="pi pi-plus"
                severity="success"
                className="bg-transparent dark:text-white"
                onClick={() => navigate(`${ADMIN}/${ADD_DISH}`)}
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                className="bg-transparent dark:text-white"
                onClick={() => {
                  setConfirmDialog({
                    visible: true,
                    message: `Are you sure you want to delete ${selectedDishes.length} category${
                      selectedDishes.length > 1 ? "s" : ""
                    }?`,
                  });
                }}
                disabled={!selectedDishes.length}
              />
            </div>
          )}
        />
        <DataTable
          ref={dt}
          value={dishes}
          selection={selectedDishes}
          onSelectionChange={(
            e: DataTableSelectionMultipleChangeEvent<DishModel[]>,
          ) => {
            if (Array.isArray(e.value)) setSelectedDishes(e.value);
          }}
          dataKey="id"
          paginator
          paginatorPosition="both"
          rows={ROWS_PER_PAGE_OPTIONS[0]}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter.length ? globalFilter : undefined}
          header={() => (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="m-0">Manage Dishes</h4>
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
            field="images"
            header="Image"
            body={(dish: DishModel) => {
              const image = dish.images[0];
              return (
                <Image
                  src={image.url}
                  alt={dish.name}
                  imageClassName="w-40 h-24 object-cover"
                />
              );
            }}
            className="min-w-32"
          />
          <Column
            field="price"
            header="Price"
            body={(dish: DishModel) => `S/.${dish.price}`}
            sortable
          />
          <Column field="createdAt" header="Created At" sortable />
          <Column field="updatedAt" header="Updated At" sortable />

          <Column
            body={(dish: DishModel) => (
              <div className="flex items-center justify-evenly gap-x-4">
                <Button
                  unstyled
                  icon="pi pi-pencil"
                  rounded
                  outlined
                  onClick={() => navigate(`${ADMIN}/${EDIT_DISH(dish.id)}`)}
                />
                <Button
                  unstyled
                  icon="pi pi-eye"
                  rounded
                  outlined
                  onClick={() => navigate(`${ADMIN}/${DETAIL_DISH(dish.id)}`)}
                />
                <Button
                  unstyled
                  icon="pi pi-trash"
                  rounded
                  outlined
                  severity="danger"
                  onClick={() => {
                    setConfirmDialog({
                      visible: true,

                      message: `Are you sure you want to delete "${dish.name}"?`,
                      dishId: dish.id,
                    });
                  }}
                />
              </div>
            )}
            exportable={false}
          ></Column>
        </DataTable>
      </div>
    </AdminLayout>
  );
};

export default ListDishesPage;
