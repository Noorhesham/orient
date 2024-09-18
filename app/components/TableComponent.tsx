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
import { formatPrice } from "../helpers/utils";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import ModalCustom from "./ModalCustom";
import MiniHeader from "./MiniHeader";
import Container from "./Container";
import CartItem from "./CartItem";
import Paragraph from "./Paragraph";
import PriceWithSale from "./PriceWithSale";

export function TableDemo({ data }: { data: any }) {
  return (
    <div className=" max-w-full overflow-x-auto">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="   lg:w-full  w-0">
          <TableRow className="  w-full">
            <TableHead className="   px-3  py-1.5 w-fit h-auto flex-grow bg-main2 rounded-full  text-gray-50 font-semibold text-center">
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
                <div className=" rounded-lg aspect-square lg:w-12 w-8 lg:h-12 h-8 relative">
                  <Image src={product.image} className=" rounded-lg object-cover" alt="product image" fill />
                </div>
                <p className=" max-w-[10rem] text-xs lg:text-base font-semibold text-main2">{product.name}</p>
              </TableCell>
              <TableCell className=" text-xs lg:text-sm text-main2">{product.status}</TableCell>
              <TableCell className="text-xs lg:text-sm">{product.date}</TableCell>
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
                  content={
                    <div className=" px-10">
                      <MiniHeader heading="ORDER N019836438" date="05-05-2023" status="DELIVRED" />
                      <div className=" grid items-center  py-3 gap-8 grid-cols-1 lg:grid-cols-2">
                        <Container CustomePadding="py-10 px-10" className="flex gap-5  mt-4 flex-col ">
                          <CartItem
                            size="sm"
                            wishlist
                            img="/Product (1).jpg"
                            price="443"
                            discount="324"
                            text="putty (acrylic 1000) 233"
                          />
                          <CartItem
                            wishlist
                            size="sm"
                            img="/Product (2).jpg"
                            price="443"
                            discount="324"
                            text="putty (acrylic 1000) 233"
                          />
                        </Container>
                        <div className=" self-start  py-4 text-base">
                          <h1 className=" text-main font-semibold  mb-4">ORDER INFORMATION</h1>
                          <div className=" mt-2 flex flex-col gap-2">
                            <h2 className=" text-base text-main2">SHIPPING ADDRESS:</h2>
                            <Paragraph description="90th Street, 5th settlement, New Cairo, Egypt" />
                          </div>
                          <div className=" mt-2 flex flex-col gap-2">
                            <h2 className=" text-base text-main2">SHIPPING ADDRESS:</h2>
                            <Paragraph description="90th Street, 5th settlement, New Cairo, Egypt" />
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
