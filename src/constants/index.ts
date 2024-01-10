import { ChangeEvent } from "react"

 interface FormDataType{
    firstName:string,
    secondName:string,
    ID:string,
    Age:string,
    Q1: boolean,
    Q2: boolean,
    Q3: boolean,
    Q4: boolean,
    Q5: boolean,
    Q6: boolean,
    Q7: boolean,
    Q8: boolean,
    Q9: boolean,
    Q10: boolean,
    Q11: boolean,
    Q12: boolean,
    Q13: boolean,
    Q14: boolean,
    date:Date,
    signature:string
}
export interface FormComponentsProps {
    formData:FormDataType,
    handleInputChange:(event:ChangeEvent<HTMLInputElement>)=> void;
}
