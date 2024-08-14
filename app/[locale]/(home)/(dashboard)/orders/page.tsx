import Head1 from "@/app/components/Head1";
import Paragraph from "@/app/components/Paragraph";
import { TableDemo } from "@/app/components/TableComponent";
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

const page = () => {
  return (
    <div>
      <Head1 text="MY ORDERS" className=" text-4xl font-bold" />
      
      <Paragraph
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, molestiae officia et numquam amet odit nemo
        in sunt quisquam molestias eos pariatur aut magnam atque cum magni fugiat vitae architecto."
      />
      <TableDemo   data={productsData} />
    </div>
  );
};

export default page;
