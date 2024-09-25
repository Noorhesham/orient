import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ArrowRight } from "./Icons";
import ModalCustom from "./ModalCustom";

import PriceWithSale from "./PriceWithSale";
import OrderDetails from "./OrderDetails";
import { format } from "date-fns";

export function TableDemo({ data }: { data: any }) {
  return (
    <div className=" max-w-full overflow-x-auto">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="   lg:w-[90%]  w-0">
          <TableRow className="  w-full">
            <TableHead className="   px-3   py-1.5 w-fit h-auto flex-grow bg-main2 rounded-full  text-gray-50 font-semibold text-center">
              NAME PRODUCTS
            </TableHead>
            <TableHead className="w-fit px-3 py-1.5  h-auto flex-grow bg-main2 rounded-full  text-gray-50 font-semibold text-center">
              Status
            </TableHead>
            <TableHead className=" w-fit px-3 py-1.5 h-auto flex-grow bg-main2 rounded-full  text-gray-50 font-semibold text-center">
              DATE
            </TableHead>
            <TableHead className="   px-3 py-1.5  w-fit h-auto flex-grow bg-main2 rounded-full  text-gray-50 font-semibold text-center">
              TOTAL
            </TableHead>
            <TableHead className="   px-3 py-1.5  w-fit h-auto flex-grow bg-main2 rounded-full  text-gray-50 font-semibold text-center">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" overflow-x-scroll">
          {data.map((product: any) => (
            <TableRow key={product.name}>
              <TableCell className="flex  items-center gap-2">
                <p className=" max-w-[10rem] text-xs lg:text-base font-semibold text-main2">{product.uuid}</p>
              </TableCell>
              <TableCell className=" text-xs lg:text-sm text-main2">{product.status}</TableCell>
              <TableCell className="text-xs lg:text-sm">{format(new Date(product.date), "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-xs lg:text-sm">
                <PriceWithSale size="sm" price={product.total} />
              </TableCell>
              <TableCell className="text-right ">
                <ModalCustom
                  cancelBtn={false}
                  btn={
                    <div className=" cursor-pointer  text-xs lg:text-sm flex items-center gap-1">
                      VIEW DETAILS <ArrowRight />
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
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{data.reduce((a: number, b: any) => a + b.total, 0)} EGP</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
