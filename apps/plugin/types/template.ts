export interface Template {
  short: string;
  description: string;
  template: string;
  params: TemplateParam[];
}

export interface TemplateParam {
  name: string;
  description: string;
  type: "text" | "options";
  required: boolean;
  default: string;
}
