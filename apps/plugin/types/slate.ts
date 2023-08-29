// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type PillElement = {
  type: "pill";
  children: CustomText[];
  key: string;
};

export type Commands = {
  type: "commands";
  children: Array<CustomElement>;
};

export type CustomElement = ParagraphElement | PillElement | Commands;

export type FormattedText = { text: string };

export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
