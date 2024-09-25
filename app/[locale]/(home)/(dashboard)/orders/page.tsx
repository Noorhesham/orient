import Head1 from "@/app/components/Head1";
import NotFound from "@/app/components/NotFound";
import Paragraph from "@/app/components/Paragraph";
import { TableDemo } from "@/app/components/TableComponent";
import { Server } from "@/app/main/Server";
import React from "react";
const productsData = [
  {
    id: 1,
    name: "Product 1",
    status: "In Stock",
    date: "2024-08-01",
    total: 250.0,
    image: "/Product (1).jpg",
  },
  {
    id: 2,
    name: "PUTTY (ACRYLIC 1000) 233 2",
    status: "Out of Stock",
    date: "2024-08-02",
    total: 150.0,
    image: "/Product (2).jpg",
  },
  {
    id: 3,
    name: "PUTTY (ACRYLIC 1000) 233 3",
    status: "In Stock",
    date: "2024-08-03",
    total: 300.0,
    image: "/Product (3).jpg",
  },
  {
    id: 4,
    name: "PUTTY (ACRYLIC 1000) 233 4",
    status: "Low Stock",
    date: "2024-08-04",
    total: 200.0,
    image: "/Product (1).jpg",
  },
  {
    id: 5,
    name: "Product 5",
    status: "In Stock",
    date: "2024-08-05",
    total: 100.0,
    image: "/Product (1).jpg",
  },
  {
    id: 5,
    name: "Product 5",
    status: "In Stock",
    date: "2024-08-05",
    total: 100.0,
    image: "/Product (1).jpg",
  },
  {
    id: 5,
    name: "Product 5",
    status: "In Stock",
    date: "2024-08-05",
    total: 100.0,
    image: "/Product (1).jpg",
  },
];

const page = async () => {
  const { orders } = await Server({ resourceName: "my_orders" });

  console.log(orders);
  return (
    <div>
      <Head1 text="MY ORDERS" className=" text-4xl font-bold" />

      <Paragraph description="Here You Can See All Your Orders." />
      {orders.length === 0 ? (
        <NotFound message={"You have not made any orders yet !"} link="/shop" linkText="Go Shop Now" />
      ) : (
        <TableDemo data={orders} />
      )}
    </div>
  );
};

export default page;
