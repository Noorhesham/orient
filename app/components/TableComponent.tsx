"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ModalCustom from "./ModalCustom";
import PriceWithSale from "./PriceWithSale";
import OrderDetails from "./OrderDetails";
import { format } from "date-fns";

import { useLocale, useTranslations } from "next-intl"; // Import useTranslations
import { ArrowRight } from "lucide-react";

export function TableDemo({ data }: { data: any }) {
  const t = useTranslations("table"); // Translation hook
  const locale = useLocale();

  return (
    <div className=" max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="lg:w-full lg:table-row-group hidden w-0">
          <TableRow className="w-full">
            <TableHead className="px-3 py-1.5  w-[60%] h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("orderSerial")}
            </TableHead>
            <TableHead className=" w-full px-3 py-1.5 h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("status")}
            </TableHead>
            <TableHead className=" w-full px-3 py-1.5 h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("date")}
            </TableHead>
            <TableHead className="px-3 py-1.5  w-full h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("total")}
            </TableHead>
            <TableHead className="px-3 py-1.5  w-full h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("action")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-scroll">
          {data.map((product: any) => (
            <TableRow key={product.name}>
              <TableCell className=" items-center gap-2">
                <p className="text-xs lg:text-base font-semibold text-main2">{product.uuid}</p>
              </TableCell>
              <TableCell className="text-xs lg:text-sm text-main2">{t(product.status)}</TableCell>
              <TableCell className="text-xs lg:text-sm">{format(new Date(product.date), "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-xs lg:text-sm">
                <PriceWithSale size="sm" price={product.total} />
              </TableCell>
              <TableCell className="text-right">
                <ModalCustom
                  cancelBtn={false}
                  btn={
                    <div className={`cursor-pointer text-nowrap text-xs lg:text-sm flex items-center gap-2`}>
                      {t("viewDetails")}{" "}
                      <ArrowRight className={`${locale === "ar" ? "rotate-180" : "rotate-0"}  text-main`} />
                    </div>
                  }
                  content={<OrderDetails id={product.id} />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
