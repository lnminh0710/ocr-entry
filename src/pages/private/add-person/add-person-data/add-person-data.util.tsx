import { FieldModel } from "../add-person-capture/add-person-capture.hook";

const generateDataByFieldName = (fields: Array<FieldModel>) => {
    const datas: Array<FieldModel> = [];
    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            const element = fields[key];
            element.value = "";
            datas.push(element);
        }
    }
    return datas;
};

export { generateDataByFieldName };
