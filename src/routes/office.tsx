import { createFileRoute } from "@tanstack/react-router";
import { OfficeApp } from "@/components/office/OfficeApp";

export const Route = createFileRoute("/office")({ component: OfficeApp });
