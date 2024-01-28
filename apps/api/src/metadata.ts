/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./draw-dates/dto/draw-dates.dto"), { "drawDatesDto": { year: { required: false, type: () => String, maxLength: 4 } } }], [import("./draw-dates/entities/draw-dates.entity"), { "DrawDateEntity": { date: { required: true, type: () => Date } } }], [import("./companies/entities/companies.entity"), { "CompanyEntity": { code: { required: true, type: () => String }, name: { required: true, type: () => String } } }]], "controllers": [[import("./draw-dates/draw-dates.controller"), { "DrawDatesController": { "findAll": { type: [Object] } } }], [import("./companies/companies.controller"), { "CompaniesController": { "findAll": {} } }]] } };
};