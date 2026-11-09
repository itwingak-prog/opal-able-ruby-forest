import { createFileRoute } from "@tanstack/react-router";
import { CitizenApp } from "@/components/citizen/CitizenApp";

export const Route = createFileRoute("/citizen")({ component: CitizenApp });
