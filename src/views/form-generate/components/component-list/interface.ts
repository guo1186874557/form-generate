import { ComponentCategory, ComponentType } from "@/types/enum";

export type ComponentListItemType = {
  id: string;
  name: string;
  icon: string;
  type: ComponentType;
};

export type ComponentListType = {
  title: string;
  name: ComponentCategory;
  options: ComponentListItemType[];
};
