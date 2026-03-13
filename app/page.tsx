import { PRODUCTS, BRANDS, CITIES } from "@/constants";
import { HomePageContent } from "@/components/home/home-page-content";

export default function HomePage() {
  return (
    <HomePageContent products={PRODUCTS} brands={BRANDS} cities={CITIES} />
  );
}
