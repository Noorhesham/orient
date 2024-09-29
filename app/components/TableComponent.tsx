"use client";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight } from "./Icons";
import ModalCustom from "./ModalCustom";
import PriceWithSale from "./PriceWithSale";
import OrderDetails from "./OrderDetails";
import { format } from "date-fns";
import { formatPriceWithCommas } from "@/lib/utils";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl"; // Import useTranslations

export function TableDemo({ data }: { data: any }) {
  const { generalSettings, loading } = useAuth();
  const t = useTranslations("table"); // Translation hook
  const locale = useLocale();
  if (loading) return <Skeleton />;
  const { default_currency } = generalSettings;

  return (
    <div className=" max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="lg:w-[90%] w-0">
          <TableRow className="w-full">
            <TableHead className="px-3 py-1.5 w-fit h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("orderSerial")}
            </TableHead>
            <TableHead className="w-fit px-3 py-1.5 h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("status")}
            </TableHead>
            <TableHead className="w-fit px-3 py-1.5 h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("date")}
            </TableHead>
            <TableHead className="px-3 py-1.5 w-fit h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("total")}
            </TableHead>
            <TableHead className="px-3 py-1.5 w-fit h-auto flex-grow bg-main2 rounded-full text-gray-50 font-semibold text-center">
              {t("action")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-scroll">
          {data.map((product: any) => (
            <TableRow key={product.name}>
              <TableCell className="flex items-center gap-2">
                <p className="max-w-[10rem] text-xs lg:text-base font-semibold text-main2">{product.uuid}</p>
              </TableCell>
              <TableCell className="text-xs lg:text-sm text-main2">{product.status}</TableCell>
              <TableCell className="text-xs lg:text-sm">{format(new Date(product.date), "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-xs lg:text-sm">
                <PriceWithSale size="sm" price={product.total} />
              </TableCell>
              <TableCell className="text-right">
                <ModalCustom
                  cancelBtn={false}
                  btn={
                    <div
                      className={`cursor-pointer text-xs lg:text-sm flex items-center gap-2 ${
                        locale === "ar" && "flex-row-reverse"
                      }`}
                    >
                      {t("viewDetails")} <ArrowRight />
                    </div>
                  }
                  content={<OrderDetails id={product.id} />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>{t("totalLabel")}</TableCell>
            <TableCell className="text-right">
              {formatPriceWithCommas(data.reduce((a: number, b: any) => a + b.total, 0))} {default_currency.code}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
