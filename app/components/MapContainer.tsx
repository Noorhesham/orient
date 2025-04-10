"use client";
import Container from "@/app/components/Container";
import Head1 from "@/app/components/Head1";
import { Location, Phone } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import SearchBox from "@/app/components/SearchBox";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import { useState } from "react";
const MapComponent = dynamic(() => import("@/app/components/Map"), {
  loading: () => (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});

const MapContainer = ({ stores }: { stores: any[] }) => {
  const [location, setLoctation] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = ({ lat, lng }: { lat: number; lng: number }) => {
    setLoctation({ lat, lng });
  };
  const filteredContainers = stores?.filter(
    (container) =>
      container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      container.city?.title
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase() || container.locations_address.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
      container.state.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className=" flex flex-col gap-5 mt-3  col-span-2">
        <SearchBox nonactive onSearch={setSearchQuery} bg="blue" />
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          {filteredContainers?.map((container) => (
            <Container
              key={container.id}
              onClick={() => handleClick({ lat: container.lat, lng: container.lng })}
              className=" flex flex-wrap gap-3 px-4"
            >
              <Head1 text={container.name} />
              <div className=" flex  flex-wrap items-start w-full gap-2 ">
                {container.city && (
                  <h3
                    className="hover:bg-gray-100 rounded-full line-clamp-1  flex-grow  duration-150 border border-input py-2 px-4 text-xs"
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   handleClick({ lat: container.city.latitude, lng: container.city.longitude });
                    // }}
                  >
                    city : {container.city?.title}
                  </h3>
                )}
                <h3
                  className=" hover:bg-gray-100 rounded-full line-clamp-1  flex-grow   duration-150 border border-input py-2 px-4 text-xs"
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   handleClick({ lat: container.state.latitude, lng: container.state.longitude });
                  // }}
                >
                  state : {container.state.title}
                </h3>
              </div>
              <IconWidget paragraph={container.locations_address} header="" icon={<Location />} />
              <IconWidget paragraph={container?.phone_number} header="" icon={<Phone />} />
            </Container>
          ))}
        </div>
      </div>
      <div className="  rounded-xl mt-5   h-full relative w-full col-span-2">
        <div className=" sticky top-0 h-[30rem]">
          <MapComponent defaultLocation={location} />
        </div>
      </div>
    </>
  );
};

export default MapContainer;
