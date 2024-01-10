export type Student = {
  Id: number;
  FirstName: string;
  SecondName: string;
  LastName: string;
};

export type ColumnLesson = {
  Id: number;
  Title: string;
};

export type Rate = {
  Id: number;
  Title: string;
  SchoolboyId: number;
  ColumnId: number;
};

export type Data<T> = {
  Items: T[];
  Quantity: number;
};

export type MappedStudent = Student & {
  [key: string | number]: string | number | null;
};


/*
  Better construct data in backend 
  SQL request on 3 tables nothing coast
*/

export const studentsMapper = (
  students: Student[],
  columnsLesson: ColumnLesson[],
  rates: Rate[]
): Array<MappedStudent> => {
  return students.map((student) => {
    columnsLesson.forEach((column) => {
      Object.assign(student, {
        [column.Id]: null,
      });
    });

    rates.forEach((rate) => {
      if (rate.SchoolboyId === student.Id) {
        Object.assign(student, {
          [rate.ColumnId]: rate.Title,
        });
      }
    });
    return student;
  });
};
