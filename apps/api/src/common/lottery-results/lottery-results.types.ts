export type Result = {
  companyId: number;
  date: Date;
  drawNumber: string;
  result: { t: string[]; s: string[]; c: string[] };
};
