import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Metadata } from "next";
import { pageMetadata } from "../../lib/metadata";
import AddEmployeeButton from "@/components/AddEmployeeButton";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

export default function Home() {
  return (
    <GlobalContainer>
      <AddEmployeeButton />
      <SearchEmployees />
    </GlobalContainer>
  );
}
