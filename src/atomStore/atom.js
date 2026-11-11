import { atom } from "jotai";

export const dataAtom = atom([
         {
                id:1,
                name : "Alex" ,
                job : 'Teacher' ,
                status : true
            },
            {
                id:2,
                name : "John" ,
                job : 'Racer' ,
                status : false
            },
            {
                id:3,
                name : "Will" ,
                job : 'Coder' ,
                status : true
            },
])
