/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./draw-dates/dto/draw-dates.dto"), { "drawDatesDto": { year: { required: false, type: () => String, maxLength: 4 }, day: { required: false, type: () => Number, minimum: 1, maximum: 7 } } }], [import("./draw-dates/entities/draw-dates.entity"), { "DrawDateEntity": { day: { required: true, type: () => Number }, date: { required: true, type: () => Date } } }]], "controllers": [[import("./draw-dates/draw-dates.controller"), { "DrawDatesController": { "findAll": { type: [Object] } } }], [import("./companies/companies.controller"), { "CompaniesController": { "findAll": { type: [String] } } }]] } };
};